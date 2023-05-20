<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import { inject } from 'vue'
import { useUserDataStore } from './stores/userData'
import NavbarGap from './components/NavbarGap.vue'
</script>

<script lang="ts">

export default {
  name: 'App',
  mounted() {
    const userStore = useUserDataStore();
    userStore.SetUser().then(() => {
      console.log("bruh");

      if (userStore.IsLoggedIn) {
        this.$toast.open({
          message: `Logged in as ${userStore.user?.osu.username}`
        });
      }
    });
  }
}
</script>

<template>
    
  <NavigationBar/>
  <NavbarGap/>
  <div class="yea">
    <header>

    </header>
  </div>
  <RouterView />
</template>

<style scoped>

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .yea {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
    justify-content: center;
    align-content: center;
  }

  .yea2 {
    display: flex;
    place-items: center;
    justify-content: center;
  }
      
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  
}
</style>
