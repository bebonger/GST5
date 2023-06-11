<script setup lang="ts">
import { ref } from 'vue';
import TeamInvite from './TeamInvite.vue';
import { useUserDataStore } from '@/stores/userData';
import type { UserInfo } from '../Interfaces/user';
import type { InviteInfo } from '../Interfaces/team';

defineProps<{
  mobile: boolean
}>();

</script>

<script lang="ts">

export default {
    data() {
        return {
            loaded: false,
            post: null,
            error: null,
            invitesJSON: [] as InviteInfo[],
            canInvite: false,

            // Search
            searchQuery: '',
            inputText: 'Enter username/userID',
            options: [] as UserInfo[],
            timeoutId: undefined as ReturnType<typeof setTimeout> | undefined,
        }
    },
    mounted() {
        // Emits on mount
        this.emitInterface();
    },
    created() {
        useUserDataStore().$subscribe(this.fetchData);
    },
    methods: {
        emitInterface() {
            this.$emit("interface", {
                asyncfetchData: async () => await this.checkUser()
            });
        },
        checkUser() {
            if (useUserDataStore().Loading) {
                window.setTimeout(this.checkUser, 100); /* this checks the flag every 100 milliseconds*/
            } else {
                this.fetchData();
            }
        },
        async fetchData() {
            this.loaded = false;
            console.log("fetching invites");
            this.error = this.post = null;
            try {
                const response = await this.$http.get("/api/teams/invites");
                this.invitesJSON = response.data;

                this.loaded = true;
                this.$emit("dataFetched", this.invitesJSON.length);
            }
            catch (err) {
                console.error(err);
            }
        },
        invitePlayer() {
            if (!this.canInvite) return;

            console.log(this.options);
            if (this.options.length <= 0) {
                this.$toast.error("Error: Invalid Player.");
                return;
            }

            this.invitePlayerAsync(this.options[0]);
        },
        async invitePlayerAsync(option: UserInfo) {
            const response = await this.$http.post('/api/teams/invites/send', {
                invitee: option.osu.userID
            });

            if (response.data.error) {
                this.$toast.error(response.data.error);
            } else if (response.data.success) {
                this.$toast.success(response.data.success);
            }
        },
        async fetchOptions() {
            try {
                if (this.searchQuery.trim().length == 0) return;
                const response = await this.$http.get('/api/user/search-exact', {
                    params: {
                        playerSearchQuery: this.searchQuery,
                    },
                });

                this.canInvite = true;
                if (response.data.error) {
                    this.inputText = response.data.error;
                } else {
                    this.options = response.data;
                    this.inputText = `Player '${this.options[0].osu.username}' found. Press button or 'enter' to invite.`;
                }

            } catch (error) {
                console.error('Error fetching options:', error);
            }
        },
        updateOptions() {
            this.options = [];
            this.canInvite = false;
            if (this.searchQuery.trim().length === 0) {
                this.inputText = 'Enter username/userID';
                return;
            }

            clearTimeout(this.timeoutId);
            this.inputText = "Searching...";
            this.timeoutId = setTimeout(() => {
                this.fetchOptions();
            }, 600); // Wait for 300 milliseconds before making the API call
        },
    },
}
</script>

<template>
    <div class="invite-panel-wrapper">
        <svg v-if="!mobile" class="fixed" width="369" height="410" viewBox="0 0 369 410" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M166.954 18.2939H167.184L167.334 18.1197L180.829 2.41543C183.023 -0.13848 186.977 -0.138476 189.171 2.41544L202.666 18.1197L202.816 18.2939H203.046H352C361.113 18.2939 368.5 25.6812 368.5 34.7939V392.794C368.5 401.907 361.113 409.294 352 409.294H17C7.8873 409.294 0.5 401.907 0.5 392.794V34.7939C0.5 25.6812 7.8873 18.2939 17 18.2939H166.954Z" fill="#111111" fill-opacity="0.83" stroke="#F49089"/></svg>
        <div v-else class="background"></div>
        <div class="flex flex-col invite-panel">
            <h1>INVITE PLAYER</h1>
            <div class="w-full flex flex-row gap-2">
                <input type="text" v-model="searchQuery" @input="updateOptions" v-on:keyup.enter="invitePlayer"/> 
                <button class="transition-all" @click="invitePlayer">INVITE</button>
            </div>
            <p>{{ inputText }}</p>
            <div v-if="options[0]" class="user-placeholder w-full flex items-center gap-2 p-2">
                <img :src="options[0]?.osu.avatar">
                <div class="flex flex-col">
                    <h2>{{ options[0]?.osu.username }}</h2>
                    <p>BWS Rank {{Math.round(options[0]?.osu.global_rank**(0.9937**(options[0]?.osu.badges**2)))}}</p>
                </div>      
            </div>
            <div v-if="!loaded" class="flex w-full p-4 items-center justify-center"><div class="lds-dual-ring"></div></div>
            <div v-else v-for="invite in invitesJSON" :key="invite?.sender?.osu.userID" class="invite-container flex flex-col w-full h-full overflow-auto gap-4 rounded-lg">
                <TeamInvite :sender="invite.sender" @invite-callback="fetchData"/>
            </div>
        </div>
    </div>
    
</template>

<style scoped lang="scss">
.invite-panel-wrapper {
    background-color: transparent;
    width: 369px;
    height: 410px;

    z-index: 99;
    position: fixed;

    .background {
        position:absolute;
        width: 100%;
        height:100%;
        background-color: rgba(17, 17, 17, 0.83);
        border: 1px solid #F49089;
    }

    .invite-panel {
        width: 100%;
        height: 100%;

        padding-left: 20px;
        padding-top: 32px;
        padding-bottom: 20px;
        padding-right: 22px;

        .user-placeholder {
            background-color: rgba(70, 46, 44, 0.5);
            border-radius: 3px;
            height:48px;
            line-height: 1rem;
            margin-bottom: 5px;

            img {
                height:32px;
                background-color: rgb(46, 46, 46);
                border: 1px solid white;
            }

            h2 {
                font-size: 1rem;

            }
        }

        h1 {
            font-weight: 400;
            font-style: italic;
            font-size: 1rem;
        }

        input {
            width: 80%;
            height: 32px;
            padding: 8px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.2);
            border: 1px solid rgb(255, 255, 255);
            border-radius: 3px;
            caret-color: white;
            color: white;
            font-family: DIN;

            &:focus {
                outline: none;
            }
        }

        button {
            width: 20%;
            height: 32px;
            background-color: transparent;
            border: 1px solid #F49089;
            border-radius: 3px;
            color:#F49089;
            font-weight: 500;

            &:hover {
                cursor: pointer;
                background-color: #e2857f;
                color: white;
            }
        }

        p {
            font-weight: 500;
            font-style: normal;
            font-size: 0.7rem;

            color: #F49089;
        }

        .invite-container {
            scrollbar-gutter: stable;
            width: calc(100% + 11px);
            padding-right: 8px;
            padding-bottom: 15px;
        }

        .invite-container::-webkit-scrollbar {
            width: 4px;
            height: 6px;
        }

            /* Track */
        .invite-container::-webkit-scrollbar-track {
            background: var(--lightestgrey);
            margin-left: 0px;
            margin-top: 0px;
        }

            /* Handle */
        .invite-container::-webkit-scrollbar-thumb {
            background: #B7B7B7; 
            border-radius: 5px;
        }

            /* Handle on hover */
        .invite-container::-webkit-scrollbar-thumb:hover {
            background: #B7B7B7; 
        }
    }
}

@media (max-width: 64rem) {
    .invite-panel-wrapper {
        width: 100%;
        height: calc(100% - 60px);
        z-index: 100;
    }
}

</style>