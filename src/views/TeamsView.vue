<script setup lang="ts">
import type { TeamInfo } from "@/Interfaces/team";
import TeamComponent from "../components/TeamComponent.vue";
import { useUserDataStore } from "../stores/userData"
const userDataStore = useUserDataStore();
</script>

<script lang="ts">
import { inject }  from "vue"

export default {
    data() {
        return {
            loaded: false,
            post: null,
            error: null,
            teamsJSON: [] as TeamInfo[],
            myTeam: {} as TeamInfo
        };
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(() => this.$route.params, () => {
            this.checkUser();
        }, 
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true });
    },
    methods: {
      checkUser() {
        if (useUserDataStore().Loading) {
          window.setTimeout(this.checkUser, 100); /* this checks the flag every 100 milliseconds*/
        } else {
          this.fetchData();
        }
      },
      async fetchData() {
          this.error = this.post = null;
          try {
              const response = await this.$http.get("/api/teams");
              this.parseData(response.data);
          }
          catch (err) {
              console.error(err);
          }
      },
      parseData(data: TeamInfo[]) {
        
        data = data.filter((team) => {
          if (
            team.player1.osu.userID === useUserDataStore().user?.osu.userID ||
            team.player2.osu.userID === useUserDataStore().user?.osu.userID
          ) {
            this.myTeam = team;
            return false; // Exclude the matching team from the filtered array
          }
          return true; // Keep all other teams in the filtered array
        });

        console.log(this.myTeam.player1);

        this.teamsJSON = data;
        this.loaded = true;
      }
    },
    components: { TeamComponent }
}
</script>

<template>
  <div v-if="!loaded" class="flex w-full p-4 items-center justify-center"><div class="lds-dual-ring"></div></div>
  <main v-else class="max-w-5xl h-full w-full pt-8 mx-auto">
    <div class="flex flex-col gap-10 pb-6">
      <div v-if="myTeam.player1" class="flex flex-col w-full justify-center items-center mx-auto gap-4">
        <h1 class="page-title">Your Team</h1>
        <div class="flex flex-row gap-4">
        </div>
        <TeamComponent :team="myTeam" @on-edit="fetchData"/>
      </div>

      <h1 class="page-title">Teams</h1>
      <div v-for="team in teamsJSON" :key="team.name" class="flex flex-wrap justify-center gap-4">
        <TeamComponent :team="team"/>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

.page-title {
  text-align: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 700;
}

button {
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border: 1px solid #849591;
  border-radius: 3px;
  color:#849591;
  font-weight: 500;

  &:hover {
      cursor: pointer;
      background-color: #849591;
      color: white;
  }
}

</style>
