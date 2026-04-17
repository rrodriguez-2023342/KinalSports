import { useEffect, useMemo, useState } from "react"
import { useUserManagementStore } from "../store/useUserManagementStore"
import { Spinner } from "../../../shared/components/layout/Spinner"
import { showError, showSuccess } from "../../../shared/utils/toast"

export const Users = () => {
    return (
        <div className="p-4">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">Usuarios</h1>
                    <p className="text-gray-500 text-sm">
                        Administra usuarios, consulta su información y cambia su rol
                    </p>
                </div>

                <button className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition">
                    + Agregar Usuario
                </button>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        placeholder="Buscar por nombre o username..."
                        className="md:col-span-2 w-full px-3 py-2 border rounded-lg"
                    />
                    <select className="w-full px-3 py-2 border rounded-lg">
                        <option>Todos los roles</option>
                        <option>ADMIN_ROLE</option>
                        <option>USER_ROLE</option>
                    </select>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">

                        {/* Head */}
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="text-left px-4 py-3">Nombre</th>
                                <th className="text-left px-4 py-3">Username</th>
                                <th className="text-left px-4 py-3">Rol</th>
                                <th className="text-right px-4 py-3">Acciones</th>
                            </tr>
                        </thead>

                        {/* Body (datos de ejemplo) */}
                        <tbody>
                            <tr className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    Juan Pérez
                                </td>
                                <td className="px-4 py-3 text-gray-700">@juanp</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                        ADMIN_ROLE
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="px-3 py-1.5 rounded-lg bg-main-blue text-white text-xs font-semibold hover:opacity-90">
                                        Ver / Editar
                                    </button>
                                </td>
                            </tr>

                            <tr className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    María López
                                </td>
                                <td className="px-4 py-3 text-gray-700">@maria</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                        USER_ROLE
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="px-3 py-1.5 rounded-lg bg-main-blue text-white text-xs font-semibold hover:opacity-90">
                                        Ver / Editar
                                    </button>
                                </td>
                            </tr>

                            {/* Estado vacío */}
                            <tr>
                                <td
                                    className="px-4 py-6 text-center text-gray-500"
                                    colSpan={4}
                                >
                                    No hay usuarios para mostrar.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
                    <p className="text-xs text-gray-600">
                        Mostrando 1 - 8 de 20
                    </p>

                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded border bg-white text-sm">
                            Anterior
                        </button>

                        <span className="px-2 py-1.5 text-sm text-gray-700">
                            1 / 3
                        </span>

                        <button className="px-3 py-1.5 rounded border bg-white text-sm">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
