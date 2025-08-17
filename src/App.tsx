import { useState } from "react";
import "./App.css";
import { useSearchParams } from "react-router-dom"

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();

    // token viene de los params de la URL
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const API_URL = import.meta.env.VITE_API_URL

        const url = `${API_URL}/users/resetPassword`

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.")
            return
        }

        try {
            // 1️⃣ Manda el token y la nueva contraseña al backend para cambiarla
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: password }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message || "Error al cambiar contraseña")

            setMessage("Contraseña actualizada con éxito ✅")
        } catch (err) {
            setMessage(err.message)
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>

                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Cambiar contraseña
                </button>

                {message && <p className="mt-3 text-sm text-red-500">{message}</p>}
            </form>
        </div>
    );
}
