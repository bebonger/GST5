<script setup lang="ts">
import { RouterLink} from 'vue-router'
</script>

<template>
    <header>
        <nav>
            <ul class="navigation">
                <li><RouterLink class="link" :to="{name: 'home'}">Home</RouterLink></li>
                <li><RouterLink class="link" :to="{name: ''}">Info</RouterLink></li>
                <li><RouterLink class="link" :to="{name: ''}">Teams</RouterLink></li>
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
    text-transform: uppercase;
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
</style>