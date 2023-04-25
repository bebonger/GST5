import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type internal from 'stream'

export const useUserDataStore = defineStore('userData', ({
    state: () => ({
        user: null as User | null,
    }),
    getters: {
        IsLoggedIn: (state) => {
            return !!state.user
        },
    },
    actions: {
        SetUser(user: User) {
            this.user = user

        }
    }
})) 

export interface User {
    avatar_url: String,
    country_code: String,
    default_group: String,
    id: Number,
    is_active: Boolean,
    is_bot: Boolean,
    is_deleted: Boolean,
    username: String,
    is_restricted: Boolean,
    global_rank: Number,
    country_rank: Number,
    badges: Number,
}