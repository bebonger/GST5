<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavigationBar from './components/NavigationBar.vue'
import { inject } from 'vue'
import { useUserDataStore } from './stores/userData'
import type { User } from './stores/userData'
</script>

<script lang="ts">
export default {
  name: 'App',
  created() {
    const user_cookie = this.$cookies.get("user_token");

    if (user_cookie) {
      const axios: any = inject('axios');
      axios.post('http://localhost:9000/api/get-user', {'token': user_cookie}).then((response: { data: any }) => {

        let user : User = {
          avatar_url: response.data.avatar_url,
          country_code: response.data.country_code,
          id: response.data.id,
          username: response.data.username,
          is_restricted: response.data.is_restricted,
          global_rank: response.data.global_rank,
          country_rank: response.data.country_rank
        }

        // let userObj: User = JSON.parse(response.data);
        // console.log(user)
        
        const userDataStore = useUserDataStore()
        userDataStore.SetUser(response.data, user_cookie)
        console.log(userDataStore.IsLoggedIn)
      })
    }
  }
}
</script>

<template>
    
  <NavigationBar/>
  <div class="yea">
    <header>
    
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/info">About</RouterLink>
        </nav>
      </div>
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
