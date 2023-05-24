<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import { inject } from 'vue'
import { useUserDataStore } from './stores/userData'
import NavbarGap from './components/NavbarGap.vue'
import MainBackground from './components/MainBackground.vue'
</script>

<script lang="ts">

export default {
  name: "App",
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
  },
  components: { MainBackground },
  watch: {
    $route (to, from) {
      let path = to.path;
    },
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    }
  }
}
</script>

<template>
    
  <NavigationBar/>
  <NavbarGap/>

  <MainBackground/>
  <div class="dark-overlay" :class="{ 'fade-in': !isHomePage }"></div>

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

.dark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Adjust the opacity or color as needed */
  z-index: 0;
  pointer-events: none; /* Prevent the overlay from capturing mouse events */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.fade-in {
  opacity: 1;
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
