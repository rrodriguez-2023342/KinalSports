import { useEffect, useMemo, useState } from "react";
import { useUserManagementStore } from "../store/useUserManagementStore";
import { Spinner } from "../../../shared/components/layout/Spinner";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { CreateUserModal } from "./CreateUserModal";
import { useAuthStore } from "../../auth/store/authStore";
import { UserDetailModal } from "./UserDetailModal";

const PAGE_SIZE = 8;

export const Users = () => {
    const { users, loading, error, fetchUsers } = useUserManagementStore();

    const registerUser = useAuthStore((state) => state.register);

    const [search, setSearch] = useState("");
    const [roleFilter, setFilter] = useState("ALL");
    const [page, setPage] = useState(1);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [selectUser, setSelectUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleOpenDetail = (user) => {
        setSelectUser(user)
        setOpenDetailModal(true)
    }

    const handleCreate = async (formData) => {
        const res = await registerUser(formData)
        if (res.success) {
            showSuccess("Usuario creado. Se envio correo de verificacion");
            await fetchUsers(undefined, { force: true });
            return true;
        }
        showError(res.error || "No se pudo crear el usuario");
        return false;
    };

    if (loading && users.length === 0) return <Spinner />;

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

            <button
                className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition"
                onClick={() => setOpenCreateModal(true)}
            >
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
                {users.length === 0 ? (
                <tr>
                    <td
                        className="px-4 py-6 text-center text-gray-500"
                        colSpan={4}
                    >
                        No hay usuarios para mostrar.
                    </td>
                </tr>
                ) : (
                users.map((u) => (
                    <tr key={u.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">
                            {[u.name, u.surname].filter(Boolean).join(" ") || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">@{u.username}</td>
                        <td className="px-4 py-3">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            u.role === "ADMIN_ROLE"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        >
                        {u.role}
                        </span>
                    </td>
                        <td className="px-4 py-3 text-right">
                            <button 
                                className="px-3 py-1.5 rounded-lg bg-main-blue text-white text-xs font-semibold hover:opacity-90"
                                onClick={() => handleOpenDetail(u)}
                            >
                                Ver / Editar
                            </button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <p className="text-xs text-gray-600">Mostrando 1 - 8 de 20</p>

            <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded border bg-white text-sm">
                    Anterior
                </button>

            <span className="px-2 py-1.5 text-sm text-gray-700">1 / 3</span>

                <button className="px-3 py-1.5 rounded border bg-white text-sm">
                    Siguiente
                </button>
            </div>
            </div>
        </div>

        <CreateUserModal
            isOpen={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            onCreate={handleCreate}
            loading={loading}
            error={error}
        />

        <UserDetailModal 
            key={selectUser?.id || "no-user"}
            isOpen={openDetailModal}
            onClose={() => {
                setOpenDetailModal(false)
                setSelectUser(null)
            }}
            user={selectUser}
            loading={loading}
        />
        </div>
    );
};
