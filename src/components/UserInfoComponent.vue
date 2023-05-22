<script setup lang="ts">
import { useUserDataStore } from '../stores/userData';
const userDataStore = useUserDataStore();

</script>

<script lang="ts">
export default {

}
</script>

<template>
    <div class="user-info">
        <a v-if="!userDataStore.IsLoggedIn" class="login-button" href="/api/login/osu">LOGIN</a>
        <div v-else-if="userDataStore.IsLoggedIn" class="flex-row">
            <div class="avatar-container">
                <img :src="userDataStore.user?.osu.avatar">
            </div>
            <div class="grid">
                <div class="name-container">

                </div>
                <div class="button-container">

                </div>
            </div>
        </div>
        <!--
        <a v-if ="!userDataStore.IsLoggedInDiscord && userDataStore.IsLoggedIn"  class="login-button" href="/api/login/discord">Discord Login</a>
        <div v-else-if="userDataStore.IsLoggedInDiscord"><img :src="userDataStore.user?.discord.avatar"><div>{{userDataStore.user?.discord.username}}</div></div>
        <a v-if ="userDataStore.IsLoggedIn"  class="login-button" href="/api/logout">Logout</a>
        -->
    </div>
</template>

<style scoped lang="scss">
@import '../assets/main.css';

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

    .avatar-container {
        z-index: 2;
        display: block;
        margin: 0 auto;
        aspect-ratio : 1 / 1;
        height: 100%;
        transform: rotate(45deg);
        overflow: hidden;
        background-color: rgb(46, 46, 46);
        border: 2px solid #F49089;

        img {
            max-width: 100%;
            transform: rotate(-45deg) scale(1.42);
        }
    }

    .name-container {
        margin: 0 -20px;
        width:150px;
        height: auto;
        background-color: #F49089;
        grid-row: 1;
    }
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