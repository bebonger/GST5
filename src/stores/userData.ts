import { defineStore } from 'pinia';
import type { UserInfo } from "../Interfaces/user";
import { useAxios } from '../plugins/axios';

export const useUserDataStore = defineStore('userData', ({
    state: () => ({
        user: null as UserInfo | null,
        loaded: false as boolean
    }),
    getters: {
        Loading: (state) => {
            return !state.loaded;
        },
        IsLoggedIn: (state) => {
            return !!state.user?.osu;
        },
        IsLoggedInDiscord: (state) => {
            return !!state.user?.discord?.userID;
        },
    },
    actions: {
        async SetUser() {
            const response = await useAxios().get("/api/user/me");
            console.log(response);
            this.user = response.data;
            this.loaded = true;
        }
    }
}));