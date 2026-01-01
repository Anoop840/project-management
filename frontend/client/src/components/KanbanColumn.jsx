const KanbanColumn = ({ status, tasks, onMove }) => (
    <div>
        <h3>{status}</h3>
        {tasks.map((task) => (
            <div key={task._id}>
                <p>{task.title}</p>
                {status !== "Done" && (
                    <button
                        onClick={() =>
                            onMove(
                                task._id,
                                status === "Todo" ? "In Progress" : "Done"
                            )
                        }
                    >
                        Move →
                    </button>
                )}
            </div>
        ))}
    </div>
);

export default KanbanColumn;
