<script setup lang="ts">
import { useUserDataStore } from '../stores/userData';
const userDataStore = useUserDataStore();

</script>

<script lang="ts">
export default {

}
</script>

<template>
    <div class="wrapper">
        <div class="white-border"></div>
        <div v-if="userDataStore.Loading"></div>
        <div v-else-if="!userDataStore.IsLoggedIn" class="login-button">
            <div class="pink-button"></div>
            <a href="/api/login/osu">osu! login</a>
        </div>
        <div v-else-if="userDataStore.IsLoggedIn" class="flex-row">
            <div class="avatar-container">
                <img :src="userDataStore.user?.osu.avatar">
            </div>
            <div class="grid">
                <div class="name-container flex-row">
                    <span>{{ userDataStore.user?.osu.username }}</span>
                    <span>/</span>
                    <span v-if="userDataStore.IsLoggedInDiscord">{{ userDataStore.user?.discord.username }}</span>
                </div>
                <div class="button-container flex-row items-center">
                    <a href="/api/logout"><span style="color: #F49089">//</span>LOG OUT</a>
                    <a href="/api/login/discord"><span style="color: #F49089">//</span>DISCORD AUTH</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/main.css';

header {
    background-color: rgba(0, 0, 0, 1);
    width: 100%;
    height: 80px;
}

.wrapper {
    display:flex;
    height: 50px;
    width: 310px;
    position: relative;
    line-height: auto;

    .white-border {
        z-index: 0;
        aspect-ratio: 1 / 1;
        height: 650%;
        transform: rotate(45deg);
        overflow: hidden;
        background-color: rgb(0, 0, 0, 0);
        border: 2px solid white;
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    .pink-button {
        z-index: -1;
        aspect-ratio: 1 / 1;
        height: 750%;
        transform: rotate(45deg);
        overflow: hidden;
        background-color: rgb(0, 0, 0, 0);
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: #F49089;
    }
    
    
    .avatar-container {
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        z-index: 2;
        aspect-ratio : 1 / 1;
        height: 100%;
        transform: rotate(45deg) scale(1.5);
        overflow: hidden;
        border: 2px solid #F49089;

        img {
            background-color: rgb(46, 46, 46);
            max-width: 100%;
            transform: rotate(-45deg) scale(1.42);
        }
    }

    .name-container {
        margin: 0 -20px;
        width: 300px;
        height: 25px;
        background-color: #F49089;
        grid-row: 1;
        padding: 0 0 0 40px;

        span {
            font-weight: 600;
            padding: 0 0 0 20px;
            font-size: 16px;
        }
    }

    .button-container {
        margin: 0 -20px;
        width: 300px;
        height: 25px;
        background-color: transparent;
        grid-row: 2;
        padding: 0 0 0 40px;


        a {
            color: white;
            font-style: italic;
            font-weight: 300;
            font-size:13px;
            padding: 0 20px;
            margin: 0px 5px 0 0;

            height: auto;
            border-bottom: 1px solid transparent;

            &:hover {
                cursor: pointer;
                background-color: transparent;
                border-color: white;
            }
        }
    }
}

.login-button {

    width: 100%;
    text-align: center;
    
    a {
        background-color: 0;
        border-radius: 0;
        color: rgb(255, 255, 255);

        font-size: 30px;
        font-weight: 700;
        letter-spacing: 3px;
        width: 100%;
        text-align: center;

        &:hover {
            cursor: pointer;
            background-color: transparent;
            border-color: white;
        }
    }
}
</style>