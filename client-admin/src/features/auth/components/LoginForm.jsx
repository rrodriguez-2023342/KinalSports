import React from 'react'

export const LoginForm = ({ onForgot }) => {
    return (
        <form className="space-y-5">
            <div>
                <label 
                    htmlFor="emailOrUsername"
                    className="block text-sm font-mendium text-gray-800 mb-1.5"
                >
                    Email o Usuario
                </label>

                <input 
                    id="emailOrUsername"
                    type="text"
                    placeholder="correo@ejemplo.com o usuario"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label 
                    htmlFor="contraseña"
                    className="block text-sm font-mendium text-gray-800 mb-1.5"
                >
                    Contraseña
                </label>

                <input 
                    id="contraseña"
                    type="password"
                    placeholder="contraseña"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 rounded-lg
                            transition-colors duration-200 text-sm disable:opacity-50 cursor-pointer"
            >
                Iniciar Sesión
            </button>

            <p className="text-center text-sm">
                <button
                    type="button"
                    onClick={onForgot}
                    className="text-main-blue hover:underline cursor-pointer"
                >
                    Olvidaste tu contraseña?
                </button>
            </p>
        </form>
    )
}
