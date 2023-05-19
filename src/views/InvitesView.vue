<script lang="ts">
import TeamInvite from "@/components/TeamInvite.vue"
import { inject }  from "vue"
import type { UserInfo } from "@/Interfaces/user";
import type { InviteInfo } from "@/Interfaces/team"

export default {
    data() {
        return {
            loading: false,
            post: null,
            error: null,
            invitesJSON: [] as InviteInfo[]
        };
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(() => this.$route.params, () => {
            this.fetchData();
        }, 
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true });
    },
    mounted() {
    },
    methods: {
        async fetchData() {
            console.log("fetching invites");
            this.error = this.post = null;
            this.loading = true;
            try {
                const response = await this.$http.get("/api/teams/invites");
                this.invitesJSON = response.data;
            }
            catch (err) {
                console.error(err);
            }
        },
    },
    components: { TeamInvite }
}
</script>

<script setup lang="ts">
import { useUserDataStore } from "@/stores/userData";
</script>

<template>
<div class="invites-wrapper">
  <h>Your Invites</h>
  <div v-if="invitesJSON.length > 0">
    <div v-for="invite in invitesJSON" :key="invite?.sender.osu.userID" class="invites-layout">
      <TeamInvite :sender="(invite as InviteInfo).sender" @accept-invite="fetchData"/>
    </div>
  </div>
</div>
</template>

<style lang="scss">
.invites-wrapper {
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h {
    font-size: 32px;
  }

  .invites-layout {
    padding: 15px;
    box-shadow: 0 0 15px rgb(15, 15, 15);
    background-color: rgb(15, 15, 15);
    width: 500px;
  }

}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
