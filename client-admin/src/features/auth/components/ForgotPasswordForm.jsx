import { useForm } from "react-hook-form"
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";

export const ForgotPasswordForm = ({ onSwitch }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const forgotPassword = useAuthStore(state => state.forgotPassword);
  const loading = useAuthStore(state => state.loading);
  const error = useAuthStore(state => state.error);
  
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const onSubmit = async (data) => {
    const res = await forgotPassword(data.email);
    
    if (res.success) {
      setEmailSent(true);
      setSentEmail(data.email);
      reset();
      toast.success("Revisa tu email para recuperar tu contraseña", { duration: 4000 });
    } else {
      toast.error(res.error || "Error al solicitar recuperación");
    }
  };

  if (emailSent) {
    return (
      <div className="space-y-5 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 text-sm">
            ✓ Se ha enviado un enlace de recuperación a <br />
            <span className="font-medium">{sentEmail}</span>
          </p>
        </div>
        
        <p className="text-gray-600 text-sm">
          Revisa tu bandeja de entrada y haz clic en el enlace para restablecer tu contraseña.
        </p>

        <p className="text-gray-600 text-xs">
          El enlace expirará en 1 hora por seguridad.
        </p>

        <button
          type="button"
          onClick={() => {
            setEmailSent(false);
            setSentEmail("");
          }}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
        >
          Solicitar otro enlace
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿Recordaste tu contraseña?{" "}
          <button
            type="button"
            className="text-main-blue font-medium hover:opacity-80"
            onClick={onSwitch}
          >
            Iniciar Sesión
          </button>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Email
        </label>

        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Ingresa un email válido"
            }
          })}
        />
        
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">
            {errors.email.message}
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
        {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Recordaste tu contraseña?{" "}
        <button
          type="button"
          className="text-main-blue font-medium hover:opacity-80"
          onClick={onSwitch}
        >
          Iniciar Sesión
        </button>
      </p>
    </form>
  )
}
