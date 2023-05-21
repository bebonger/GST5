<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import UserInfo from './UserInfo.vue';
</script>

<script lang="ts">

export default {
    components: { UserInfo }
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
                <li class="user-info"><UserInfo/></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped lang="scss">
header {
    background-color: rgba(63, 155, 185, 0);
    z-index: 99;
    width: 100%;
    height: 60px;
    position: fixed;
    transition: 0.5s ease all;
    color: #fff;
    padding: 0px;
    /*
    border-color: white;
    border-bottom-style: solid;
    border-width: 1px;
    */

    .navigation {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav {
        display: flex;
        flex-direction: row;
        transition: .5s ease all;
        width: 100%;
        height: 100%;
        margin: 0 0;
        align-items: center;

        a.router-link-exact-active {
            color:white;
            border-color:#141414;
        }

    }

    .user-info {
        margin-left: auto;
    }

    
    ul, 
    .link {
        font-weight: 600;
        color: #fff;
        list-style:none;
        text-decoration: none;
    }

    li {
        padding: 0px 16px;
        margin: left;
        height: 100%;
    }

    .link {
        font-size: 18px;
        transition: .5s ease all;
        padding: 4px;
        border-bottom: 2px solid transparent;
    }

    .link:hover {
        color: white;
        border-color:#141414;
        background-color: transparent;
    }
}
</style>