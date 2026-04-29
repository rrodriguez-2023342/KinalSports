import { useForm } from "react-hook-form"
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";

export const ResetPasswordForm = ({ token, onSuccess }) => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    
    const resetPassword = useAuthStore(state => state.resetPassword);
    const loading = useAuthStore(state => state.loading);
    const error = useAuthStore(state => state.error);
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const password = watch("password");

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        const res = await resetPassword(token, data.password);
    
        if (res.success) {
            toast.success("Contraseña actualizada exitosamente", { duration: 4000 });
            setTimeout(() => {
                onSuccess();
            }, 2000);
        } else {
            toast.error(res.error || "Error al cambiar la contraseña");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Nueva Contraseña
                </label>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres"
                            }
                        })}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>
            
                {errors.password && (
                    <p className="text-red-600 text-xs mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Confirmar Contraseña
                </label>

            <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...register("confirmPassword", {
                        required: "Confirma tu contraseña",
                        validate: (value) => 
                            value === password || "Las contraseñas no coinciden"
                    })}
                />

                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                >
                    {showConfirmPassword ? "🙈" : "👁️"}
                </button>
            </div>
            
            {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">
                    {errors.confirmPassword.message}
                </p>
                )}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg
                            transition-colors duration-200 text-sm disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Actualizando..." : "Actualizar Contraseña"}
            </button>
        </form>
    ) 
}
