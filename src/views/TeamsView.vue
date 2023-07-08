<script setup lang="ts">
import type { TeamInfo } from "@/Interfaces/team";
import TeamComponent from "../components/TeamComponent.vue";
import GroupComponent from "../components/GroupComponent.vue";
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
            myTeam: {} as TeamInfo,

            currentTab: "teams" // or groups
        };
    },
    mounted() {
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
        this.sortedTeams = this.sortByPP(this.teamsJSON);
        this.loaded = true;

        if (!useUserDataStore().IsLoggedIn) return;

        this.sortedTeams = this.sortedTeams.filter((team) => {
          if (
            team.player1.osu.userID === useUserDataStore().user?.osu.userID ||
            team.player2.osu.userID === useUserDataStore().user?.osu.userID
          ) {
            this.myTeam = team;
            return false; // Exclude the matching team from the filtered array
          }
          return true; // Keep all other teams in the filtered array
        });

        
      },
      sortByRank(teams: TeamInfo[]) {
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
      sortByPP(teams: TeamInfo[]) {
        const sortedTeams = [...teams];
        return sortedTeams.sort((a, b) => {
          const formulaA = (Number(a.player1?.osu.pp) + Number(a.player2?.osu.pp)) * 0.5;
          const formulaB = (Number(b.player1?.osu.pp) + Number(b.player2?.osu.pp)) * 0.5;
          return formulaB - formulaA;
        });
      },
      getTeamSeed(team: TeamInfo): string {
        const sortedTeams = this.sortByPP(this.teamsJSON);
        const position = sortedTeams.findIndex(t => t === team);

        const seeds = ['A', 'B', 'C', 'D', 'E'];
        const interval = Math.floor(position / 8);
        const adjustedIndex = interval % seeds.length;
        
        if (interval >= 5) return 'X';
        return seeds[adjustedIndex];
      }
    },
    components: { TeamComponent, GroupComponent }
}
</script>

<template>
  <div v-if="!loaded" class="flex w-full p-4 items-center justify-center"><div class="lds-dual-ring"></div></div>
  <main v-else class="max-w-5xl h-full w-full pt-8 mx-auto p-3">
    <div class="flex flex-col gap-10 pb-6 items-center w-full">
      <div v-if="myTeam.player1" class="flex flex-col max-w-md w-full justify-center items-center mx-auto gap-4">
        <h1 class="font-extrabold text-5xl w-full">YOUR TEAM</h1>
        <TeamComponent :team="myTeam" :seed="getTeamSeed(myTeam)" @on-edit="fetchData"/>
      </div>

      <div v-if="currentTab == 'teams'" class="grid lg:grid-cols-2 justify-center gap-4">
        <div class="col-span-1 lg:col-span-2 flex flex-row">
          <h1 class="font-extrabold text-5xl w-full">TEAM LIST</h1>
          <div class="flex items-center justify-center pr-6">
            <button @click="currentTab = 'groups'">
              <div class="left-diamond"></div>
              <div class="right-diamond"></div>
              <span>GROUP LIST</span>
            </button>
          </div>
        </div>
        <TeamComponent v-for="team in sortedTeams" :key="team.name" :team="team" :seed="getTeamSeed(team)"/>
      </div>

      <div v-else class="grid lg:grid-cols-2 justify-center gap-4">
        <div class="col-span-1 lg:col-span-2 flex flex-row">
          <h1 class="font-extrabold text-5xl w-full">GROUPS</h1>
          <div class="flex items-center justify-center pr-6">
            <button @click="currentTab = 'teams'">
              <div class="left-diamond"></div>
              <div class="right-diamond"></div>
              <span>TEAM LIST</span>
            </button>
          </div>
        </div>
        <GroupComponent :group="'A'" :data="{ teams: {A: 'bronseele kiss', B: 'horrible kids', C: '2 goofballs', D: 'yippee', E: 'arigato sumimasen'}, scores: {A: [], B: [], C: [], D: [], E: []} }"/>
        <GroupComponent :group="'B'" :data="{ teams: {A: 'we go maimai', B: 'mashallah 兄弟', C: ':nerd:', D: 'rice', E: 'kanye west'}, scores: {A: [], B: [], C: [], D: [], E: []} }"/>
        <GroupComponent :group="'C'" :data="{ teams: {A: 'KBBQ', B: 'PAP', C: 'pong xian', D: 'Baechuu osu pov', E: 'Robed Manifestion'}, scores: {A: [], B: [], C: [], D: [], E: []} }"/>
        <GroupComponent :group="'D'" :data="{ teams: {A: 'Soba Noodles', B: 'sacabambaspis', C: 'Team 1912', D: 'Stormtrooper Aim', E: 'idiot of the week'}, scores: {A: [], B: [], C: [], D: [], E: []} }"/>
        <GroupComponent :group="'E'" :data="{ teams: {A: 'pp ranchers', B: 'S U I P I S S', C: 'Glory Days', D: 'realmsniper', E: 'wah idk eh'}, scores: {A: [], B: [], C: [], D: [], E: []} }"/>
        <GroupComponent :group="'F'" :data="{ teams: {A: 'LOSER', B: 'eyjafjallajökull', C: 'HOOOG RIDAAAR', D: 'bana the carrot', E: 'Hoshinoumi Academy'}, scores: {A: [], B: [], C: [], D: [], E: []} }"/>
        <GroupComponent :group="'G'" :data="{ teams: {A: 'Tharman', B: 'chef', C: 'RyanGoBangGST', D: 'Pong!', E: 'gooni'}, scores: {A: [], B: [], C: [], D: [], E: []} }"/>
        <GroupComponent :group="'H'" :data="{ teams: {A: 'MekeB01', B: 'temporary name', C: 'bump', D: 'Mak Aku Pelacho', E: 'Ayase Enjoyer'}, scores: {A: [], B: [], C: [], D: [], E: []} }"/>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

.left-diamond {
  position: absolute;
  background-color: white;
  aspect-ratio: 1/1;
  height: 100%;

  top: 50%;
  left: -12.5%;
  transform: translate(0, -50%) rotate(45deg) scale(0.71);
}

.right-diamond {
  position: absolute;
  background-color: white;
  aspect-ratio: 1/1;
  height: 100%;

  top: 50%;
  right: -12.5%;
  transform: translate(0, -50%) rotate(45deg) scale(0.71);
}

button {
  width: 10rem;
  height: 2.5rem;
  color: black;
  background-color:white;

  transition: 0.1s ease-in;
}

button:hover {
  filter: brightness(0.8);
}
</style>
