import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get("/projects");
                setProjects(res.data.data || res.data);
            } catch (err) {
                setError("Failed to load projects");
            }
        };

        fetchProjects();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Projects</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {projects.length === 0 && <p>No projects found.</p>}

            {projects.map((project) => (
                <div key={project._id} style={styles.card}>
                    <h4>{project.name}</h4>
                    <p>{project.description || "No description"}</p>

                    <Link to={`/board/${project._id}`}>
                        Open Board →
                    </Link>
                </div>
            ))}
        </div>
    );
};

const styles = {
    card: {
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "6px"
    }
};

export default Projects;
