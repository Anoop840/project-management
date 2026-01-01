import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import KanbanColumn from "../components/KanbanColumn";

const Board = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get(`/tasks?projectId=${projectId}`).then((res) => setTasks(res.data));
    }, [projectId]);

    const updateStatus = async (taskId, status) => {
        await api.patch(`/tasks/${taskId}/status`, { status });
        setTasks((prev) =>
            prev.map((t) => (t._id === taskId ? { ...t, status } : t))
        );
    };

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            {["Todo", "In Progress", "Done"].map((status) => (
                <KanbanColumn
                    key={status}
                    status={status}
                    tasks={tasks.filter((t) => t.status === status)}
                    onMove={updateStatus}
                />
            ))}
        </div>
    );
};

export default Board;
