<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useUserDataStore } from '../stores/userData';
const userDataStore = useUserDataStore();
</script>

<script lang="ts">

export default {
    data() {

    },
    inject: ["axios"],
    methods: {
        async invite() {
            const response = await this.$http.post('api/teams/send-invite', {
                invitee: 8301957
            });
            
            console.log(response.data);
        }
    }
}
</script>

<template>
    <header>
        <nav>
            <ul class="navigation">
                <li><RouterLink class="link" :to="{name: 'home'}">HOME</RouterLink></li>
                <li><RouterLink class="link" :to="{name: 'info'}">INFO</RouterLink></li>
                <li><RouterLink class="link" :to="{name: 'teams'}">TEAMS</RouterLink></li>
                <li><RouterLink class="link" :to="{name: 'invites'}">INVITES</RouterLink></li>
                <li>
                    <a v-if="!userDataStore.IsLoggedIn" class="login-button" href="/api/login/osu">osu! Login</a>
                    <div v-else-if="userDataStore.IsLoggedIn"><img :src="userDataStore.user?.osu.avatar"><div>{{userDataStore.user?.osu.username}}</div></div>
                </li>
                <li>
                    <a v-if ="!userDataStore.IsLoggedInDiscord && userDataStore.IsLoggedIn"  class="login-button" href="/api/login/discord">Discord Login</a>
                    <div v-else-if="userDataStore.IsLoggedInDiscord"><img :src="userDataStore.user?.discord.avatar"><div>{{userDataStore.user?.discord.username}}</div></div>
                </li>
                <li>
                    <a v-if ="userDataStore.IsLoggedIn"  class="login-button" href="/api/logout">Logout</a>
                </li>
            </ul>
        </nav>
    </header>   
</template>

<style scoped>
header {
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: 0.5s ease all;
    color: #fff;
}

header .navigation {
    display: flex;
    align-items: baseline;
}

header .nav {
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: .5s ease all;
    width: 90%;
    margin: 0 auto;
}

header ul, header .link {
    font-weight: 500;
    color: #fff;
    list-style:none;
    text-decoration: none;
}

header li {
    padding: 16px;
    margin: left;
}

header .link {
    font-size: 14px;
    transition: .5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
}

header .link:hover {
    color:#00afea;
    border-color:transparent;
    background-color: transparent;
}

header .login-button {
    background-color: #ff7cbb;
    padding: 10px;
    border-radius: 20px;
    color: rgb(255, 255, 255);
}

header .login-button:hover {
    background-color: #fd68b0;
    padding: 12px;
    border-radius: 20px;
    color: rgb(255, 255, 255);
    cursor: pointer;
}

header li:last-of-type {
    margin-left: auto;
}

</style>