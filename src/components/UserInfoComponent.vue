<script setup lang="ts">
import { useUserDataStore } from '../stores/userData';
const userDataStore = useUserDataStore();

</script>

<script lang="ts">
export default {
    data() {
        return {
            hover: false
        }
    }
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
        <div v-else-if="userDataStore.IsLoggedIn" class="flex flex-row">
            <div class="avatar-container">
                <img :src="userDataStore.user?.osu.avatar">
            </div>
            <div class="grid">
                <div class="name-container flex flex-row">
                    <span>{{ userDataStore.user?.osu.username }}</span>
                </div>
                <div class="button-container flex flex-row items-center gap-2">
                    <a v-if="userDataStore.IsLoggedInDiscord" href="/api/login/discord" class="discord-info h-full flex justify-center items-center gap-4 pl-2" @mouseenter="hover = true" @mouseleave="hover = false">
                        <div class="trapezoid trapezoid-down"></div>
                        <h3>DISCORD</h3>
                        <p>{{(userDataStore.IsLoggedInDiscord) ? userDataStore.user?.discord.username : "not logged in"}}</p>
                        <i class="bg-color p-absolute w-full h-full flex justify-center items-center" :class="{'opacity-0': !hover}">change discord?</i>
                    </a>
                    <a v-else href="/api/login/discord" class="logout-button"><span style="color: #F49089">//</span>DISCORD AUTH</a>
                    <a href="/api/logout" class="logout-button"><span style="color: #F49089">//</span>LOG OUT</a>
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

.bg-color {
    background-color: #242424;
    font-size: 11px;
    transition: 0.25s ease all;
}

.wrapper {
    display:flex;
    height: 50px;
    width: auto;
    position: relative;
    line-height: auto;

    .white-border {
        z-index: 0;
        aspect-ratio: 1 / 1;
        height: 900%;
        transform: rotate(45deg);
        overflow: hidden;
        background-color: rgb(0, 0, 0, 0);
        border: 2px solid white;
        position: absolute;
        top: 50%;
        left: 65%;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    .pink-button {
        z-index: -1;
        aspect-ratio: 1 / 1;
        height: 900%;
        transform: rotate(45deg);
        overflow: hidden;
        background-color: rgb(0, 0, 0, 0);
        position: absolute;
        top: 50%;
        left: 50%;
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
        width: calc(100% + 20px);
        height: 25px;
        background-color: #F49089;
        grid-row: 1;
        padding: 0 0 0 40px;

        span {
            font-weight: 700;
            padding: 0 0 0 20px;
            font-size: 16px;
        }
    }

    .button-container {
        margin: 0 -20px;
        width: 400px;
        height: 25px;
        background-color: transparent;
        grid-row: 2;
        padding: 0 0 0 40px;


        .logout-button {
            color: white;
            font-style: italic;
            font-weight: 400;
            font-size:13px;
            padding: 0 20px;
            margin: 0px 5px 0 0;

            height: auto;
            border-bottom: 1px solid transparent;

            &:hover {
                cursor: pointer;
                background-color: transparent;
                // border-color: white;
                text-decoration: underline;
            }
        }
        
        .discord-info {
            color: white;

            a {
            }
        }
    }

    h3 {
        color: #F49089;
        font-family: DIN;
        font-weight: 400;
        font-size: 7px;
    }

    p {
        font-size: 11px;
    }

    h3, p {
        margin: 0;
        padding: 0;
        line-height: 1;
    }

    .trapezoid {
        position: absolute;
        left: -20px;
        width:  calc(100% + 40px);
        height: 100%;
    }

    
    .trapezoid-down {
        border-right: 10px solid transparent;
        border-top: 25px solid #242424;
    }

}

.login-button {

    width: 100%;
    text-align: center;
    
    a {
        right: 120px;
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