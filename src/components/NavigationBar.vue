<script lang="ts">
import { RouterLink } from 'vue-router'

export default {
    created() {

    }
}
</script>

<template>
    <header>
        <nav>
            <ul class="navigation">
                <li><RouterLink class="link" :to="{name: 'home'}">HOME</RouterLink></li>
                <li><RouterLink class="link" :to="{name: 'info'}">INFO</RouterLink></li>
                <li><RouterLink class="link" :to="{name: ''}">TEAMS</RouterLink></li>
                <li><a class="login-button" href="/api/auth">osu! Login</a></li>
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
    border-color:#00afea;
}

header .login-button {
    background-color: #ff7cbb;
    padding: 10px;
    border-radius: 15px;
    color: rgb(255, 255, 255);
}

header li:last-of-type {
    margin-left: auto;
}

</style>