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
    background-color: #d85a00;
    z-index: 99;
    width: 100%;
    height: 80px;
    position: fixed;
    transition: 0.5s ease all;
    color: #fff;
    padding: 0px;
    border-color: white;
    border-bottom-style: solid;
    border-width: 1px;

    .navigation {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav {
        display: flex;
        flex-direction: row;
        padding: 4px 0;
        transition: .5s ease all;
        width: 100%;
        margin: 0 0;

        a.router-link-exact-active {
            color:#00afea;
        }

    }

    .user-info {
        margin-left: auto;
    }

    ul, 
    .link {
        font-weight: 500;
        color: #fff;
        list-style:none;
        text-decoration: none;
    }

    li {
        padding: 16px;
        margin: left;
    }

    .link {
        font-size: 16px;
        transition: .5s ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
    }

    .link:hover {
        color:#00afea;
        border-color:transparent;
        background-color: transparent;
    }
}
</style>