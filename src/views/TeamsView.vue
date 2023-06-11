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
            sortedTeams: [] as TeamInfo[],
            myTeam: {} as TeamInfo
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
              this.teamsJSON = response.data;
              this.parseData();
          }
          catch (err) {
              console.error(err);
          }
      },
      parseData() {
        if (!useUserDataStore().IsLoggedIn) return;

        this.sortedTeams = this.sortTeams(this.teamsJSON).filter((team) => {
          if (
            team.player1.osu.userID === useUserDataStore().user?.osu.userID ||
            team.player2.osu.userID === useUserDataStore().user?.osu.userID
          ) {
            this.myTeam = team;
            return false; // Exclude the matching team from the filtered array
          }
          return true; // Keep all other teams in the filtered array
        });

        this.loaded = true;
      },
      sortTeams(teams: TeamInfo[]) {
        const sortedTeams = [...teams];
        return sortedTeams.sort((a, b) => {
          const formulaA =
            Math.round(
              (a.player1?.osu.global_rank ** (0.9937 ** (a.player1?.osu.badges ** 2)) +
                a.player2?.osu.global_rank ** (0.9937 ** (a.player2?.osu.badges ** 2))) *
                0.5
            );

          const formulaB =
            Math.round(
              (b.player1?.osu.global_rank ** (0.9937 ** (b.player1?.osu.badges ** 2)) +
                b.player2?.osu.global_rank ** (0.9937 ** (b.player2?.osu.badges ** 2))) *
                0.5
            );

          return formulaA - formulaB;
        });
      },
      getTeamSeed(team: TeamInfo) {
        const sortedTeams = this.sortTeams(this.teamsJSON);
        const position = sortedTeams.findIndex(t => t === team);

        const seeds = ['A', 'B', 'C', 'D', 'E'];
        const interval = Math.floor(position / 8);
        const adjustedIndex = interval % seeds.length;
        
        return seeds[adjustedIndex];
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
        <TeamComponent :team="myTeam" :seed="this.getTeamSeed(team)" @on-edit="fetchData"/>
      </div>

      <h1 class="page-title">Teams</h1>
      <div class="flex flex-wrap justify-center gap-4">
        <TeamComponent v-for="team in sortedTeams" :key="team.name" :team="team" :seed="this.getTeamSeed(team)"/>
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
