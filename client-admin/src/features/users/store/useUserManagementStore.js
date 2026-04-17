import { create } from "zustand"
import * as authApi from "../../../shared/api/auth.js"

const getAllUsers = authApi.getAllUsers;

export const useUserManagementStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,
    filters: {},

    setFilters: (filters) => set({ filters }),

    setUsers: (users) => set({ users }),

    fetchUsers: async (apiFn = getAllUsers, options = {}) => {
        
        const { force = false } = options;

        const state = get();

        //Evitar llamadas duplicadas
        if(state.loading) return; 

        //Por si ya estan cargados, no volver a pedir a menos que se fuerce
        if(!force && state.users.length > 0) return;

        set({ loading: true, error: null })

        try {

            const fetcher = typeof apiFn === "function" ? apiFn : getAllUsers;
            
            const result = await fetcher();
            
            set({ users: result.users || result, loading: false })

        } catch (err) {
            set({ error: err.message || "Error al cargar usuarios", loading: false })
        }
    }
}))