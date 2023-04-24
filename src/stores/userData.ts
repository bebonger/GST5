import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type internal from 'stream'

export const useUserDataStore = defineStore('userData', ({
    state: () => ({
        user: null as User | null,
        token: null as string | null
    }),
    getters: {
        IsLoggedIn: (state) => {
            return !!state.token
        },
    },
    actions: {
        SetUser(user: User, token: any) {
            this.user = user
            this.token = token;
        }
    }
})) 

export interface User {
    avatar_url: string;
    country_code: string;
    id: number;
    username: string;
    is_restricted: boolean;
    global_rank: number;
    country_rank: number;
}