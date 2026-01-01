import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("/projects").then((res) => setProjects(res.data));
    }, []);

    return (
        <div>
            <h2>Projects</h2>
            {projects.map((p) => (
                <Link key={p._id} to={`/board/${p._id}`}>
                    <div>{p.name}</div>
                </Link>
            ))}
        </div>
    );
};

export default Dashboard;
