<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import { inject } from 'vue'
import { useUserDataStore } from './stores/userData'
import NavbarGap from './components/NavbarGap.vue'
import MainBackground from './components/MainBackground.vue'
</script>

<script lang="ts">
import './assets/tailwind.css';

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
.dark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 1000%;
  height: 1000%;
  background-color: rgba(0, 0, 0, 0.7); /* Adjust the opacity or color as needed */
  z-index: 0;
  pointer-events: none; /* Prevent the overlay from capturing mouse events */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.fade-in {
  opacity: 1;
}
</style>
