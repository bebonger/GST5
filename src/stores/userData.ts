import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type internal from 'stream';
import type { UserInfo } from "../Interfaces/user";
import { getCurrentInstance } from 'vue';

export const useUserDataStore = defineStore('userData', ({
    state: () => ({
        user: null as UserInfo | null,
    }),
    getters: {
        IsLoggedIn: (state) => {
            return !!state.user
        },
        IsLoggedInDiscord: (state) => {
            return !!state.user?.discord.userID
        }
    },
    actions: {
        async SetUser() {
            const response = await useAxios().get("/api/user");
            console.log(response);
            this.user = response.data;
        }
    }
}));

export function useAxios() {
    const app = getCurrentInstance()?.appContext.app
  
    if (app) {
      return app.config.globalProperties.axios
    } else {
      throw new Error('Could not get app instance')
    }
  }