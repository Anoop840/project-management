import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid email or password"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Login
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-2">{error}</p>
                )}

                <input
                    className="w-full p-2 border rounded mb-3"
                    type="email"
                    placeholder="Email" />

                <input
                    className="w-full p-2 border rounded mb-4"
                    type="password"
                    placeholder="Password" />

                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};


export default Login;
