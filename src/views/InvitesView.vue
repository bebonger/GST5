<script lang="ts">
import { inject }  from "vue"

export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      invitesJSON: ""
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    async fetchData() {
      this.error = this.post = null
      this.loading = true

      try {
        const response = await this.$http.get("/api/teams/invites")
        this.invitesJSON = response.data
      }
      catch (err) {
        console.error(err);
      }
    },
  }
}
</script>

<template>
  <div class="about">
    <h1 v-if="loading">This is the invites page</h1>
    <h1 v-else-if="!loading">This is the invites page</h1>
    <h1 v-else>error</h1>
    <p>{{invitesJSON}}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
