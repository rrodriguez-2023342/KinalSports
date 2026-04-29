import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [isValidToken, setIsValidToken] = useState(true);

    useEffect(() => {
        // Validar que el token exista
        if (!token || token.length < 40) {
            setIsValidToken(false);
        }
    }, [token]);

    const handleSuccess = () => {
        navigate('/auth');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-10">
                <div className="flex justify-center mb-6">
                    <img
                        src="/src/assets/img/kinal_sports.png"
                        alt="Kinal Sports"
                        className="h-20 w-auto"
                    />
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        Restablecer Contraseña
                    </h1>

                    <p className="text-gray-600 text-base max-w-md mx-auto">
                        Ingresa tu nueva contraseña para recuperar acceso a tu cuenta
                    </p>
                </div>

                {!isValidToken ? (
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h3 className="text-red-900 font-medium mb-2">Enlace Inválido o Expirado</h3>
                            <p className="text-red-600 text-sm">
                                El enlace de recuperación es inválido o ha expirado. Por favor, solicita uno nuevo.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/auth')}
                            className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg
                                        transition-colors duration-200 text-sm"
                        >
                            Volver a Inicio de Sesión
                        </button>
                    </div>
                ) : (
                    <ResetPasswordForm token={token} onSuccess={handleSuccess} />
                )}
            </div>
        </div>
    )
}
