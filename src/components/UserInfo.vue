<script setup lang="ts">
import { useUserDataStore } from '../stores/userData';
const userDataStore = useUserDataStore();

</script>

<template>
    <div class="user-info">
        <a v-if="!userDataStore.IsLoggedIn" class="login-button" href="/api/login/osu">LOGIN</a>
        <div v-else-if="userDataStore.IsLoggedIn" class="flex-container"><img :src="userDataStore.user?.osu.avatar">{{userDataStore.user?.osu.username}}</div>
        <!--
        <a v-if ="!userDataStore.IsLoggedInDiscord && userDataStore.IsLoggedIn"  class="login-button" href="/api/login/discord">Discord Login</a>
        <div v-else-if="userDataStore.IsLoggedInDiscord"><img :src="userDataStore.user?.discord.avatar"><div>{{userDataStore.user?.discord.username}}</div></div>
        <a v-if ="userDataStore.IsLoggedIn"  class="login-button" href="/api/logout">Logout</a>
        -->
    </div>
</template>

<style scoped lang="scss">
header {
    background-color: rgba(0, 0, 0, 1);
    width: 100%;
    height: 80px;
}

.user-info {
    display:flex;
    height: 40px;
    position: relative;
    gap: 10px;
    line-height: auto;

    .flex-container {
        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: center;

        font-size: 18px;
        font-weight: 700;
    }
}

img {
    height: 28px;
    border-radius: 50%;
    background-color: rgb(3, 3, 3);
}

.login-button {
    background-color: 0;
    padding: 10px;
    border-radius: 0;
    color: rgb(255, 255, 255);
    vertical-align: middle;

    font-size: 18px;
    font-weight: 700;
}
</style>