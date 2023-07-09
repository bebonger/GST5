<script setup lang="ts">
import { useUserDataStore } from "../stores/userData";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/vue';
import { MatchStage, type MatchInfo } from "@/Interfaces/bracket";
</script>

<script lang="ts">
import '../assets/bootstrap-custom.scss';
import { PoolMod } from "@/Interfaces/mappool";
import type { TeamInfo } from "@/Interfaces/team";
export default {
    data() {
        return {
            mappool: {
                insert: {
                    id: null as string | unknown,
                    selectedStage: MatchStage.GroupStage,
                    selectedMod: PoolMod.NM,
                    ez_mult: null as number | unknown,
                    slot: 1
                },
                remove: {
                    selectedStage: MatchStage.GroupStage,
                    selectedMod: PoolMod.NM,
                    slot: 1
                }
            },
            matches: {
                loaded: false,
                data: [] as MatchInfo[],
                insert: {
                    id: null as string | unknown,
                    selectedStage: MatchStage.GroupStage,
                    team1: "Select Team" as TeamInfo | unknown,
                    team2: "Select Team" as TeamInfo | unknown,

                },
                remove: {
                    selectedStage: MatchStage.GroupStage,
                    id: null as string | unknown,
                },
                edit: {
                    id: null as string | unknown,
                    selectedStage: MatchStage.GroupStage,
                    date: null as string | unknown,
                    time: null as string | unknown,
                    link: null as string | unknown,
                    referee: null as string | unknown,
                    scores: {
                        red: 0,
                        blue: 0
                    }
                }
            },
            teams: {
                loaded: false,
                data: {}
            }
        }
    },
    mounted() {
        // watch the params of the route to fetch the data again
        this.$watch(() => this.$route.params, () => {
            this.fetchTeams();
            this.fetchMatches();
        }, 
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true });
    },
    methods: {
        async refreshUsers() {
            const res = await this.$http.post("/api/admin/user/refresh");
            console.log(res);
        },
        async insertMap() {
            const res = await this.$http.post("/api/admin/mappool/insert", {
                id: Number(this.mappool.insert.id),
                stage: this.mappool.insert.selectedStage,
                mod: this.mappool.insert.selectedMod,
                ez_mult: Number(this.mappool.insert.ez_mult),
                slot: Number(this.mappool.insert.slot)
            });
            if (res.data.error) {
                this.$toast.error(res.data.error);
            } else if (res.data.success) {
                this.$toast.success(res.data.success);
            }

            this.mappool.insert.ez_mult = null;
        },
        async removeMap() {
            const res = await this.$http.post("/api/admin/mappool/remove", {
                stage: this.mappool.remove.selectedStage,
                mod: this.mappool.remove.selectedMod,
                slot: Number(this.mappool.remove.slot)
            });
            if (res.data.error) {
                this.$toast.error(res.data.error);
            } else if (res.data.success) {
                this.$toast.success(res.data.success);
            }
        },
        async insertMatch() {
            const res = await this.$http.post("/api/admin/match/insert", {
                id: this.matches.insert.id,
                stage: this.matches.insert.selectedStage,
                team1: this.matches.insert.team1,
                team2: this.matches.insert.team2,
            });
            if (res.data.error) {
                this.$toast.error(res.data.error);
            } else if (res.data.success) {
                this.$toast.success(res.data.success);
            }
            this.fetchMatches();
        },
        async removeMatch() {
            const res = await this.$http.post("/api/admin/match/remove", {
                id: this.matches.remove.id,
            });
            if (res.data.error) {
                this.$toast.error(res.data.error);
            } else if (res.data.success) {
                this.$toast.success(res.data.success);
            }
            this.fetchMatches();
        },
        selectMatchToEdit(match: MatchInfo) {
            this.matches.edit.id = match.matchID;
            this.matches.edit.link = match.mp_link;
            this.matches.edit.date = match.schedule?.date;
            this.matches.edit.time = match.schedule?.time;
            this.matches.edit.referee = match.referee;
            this.matches.edit.scores.red = match.result.redTeamScore;
            this.matches.edit.scores.blue = match.result.blueTeamScore;
        },
        async editMatch() {
            const res = await this.$http.post("/api/admin/match/edit", {
                id: this.matches.edit.id,
                mp_link: this.matches.edit.link,
                referee: this.matches.edit.referee,
                date: this.matches.edit.date,
                time: this.matches.edit.time,
                scores: this.matches.edit.scores,
            });
            if (res.data.error) {
                this.$toast.error(res.data.error);
            } else if (res.data.success) {
                this.$toast.success(res.data.success);
            }
            this.fetchMatches();
        },
        async fetchTeams() {
            try {
                const response = await this.$http.get("/api/teams");
                this.teams.data = response.data;
                this.teams.loaded = true;
            }
            catch (err) {
                console.error(err);
            }
        },
        async fetchMatches() {
            try {
                this.matches.loaded = false;
                const response = await this.$http.get("/api/matches");
                this.matches.data = response.data;
                this.matches.loaded = true;
            }
            catch (err) {
                console.error(err);
            }
      },
    }
}
</script>

<template>
    <main v-if="useUserDataStore().IsAdmin || useUserDataStore().IsStaff" class="flex flex-wrap w-full gap-3 items-center justify-center p-3">
        <!-- Users -->
        <div v-if="useUserDataStore().IsAdmin" class="admin-category min-w-md p-10 flex flex-col justify-center items-center gap-2">
            <p class="font-bold text-4xl">Users</p>
            <button @click="refreshUsers" class="w-full">Refresh Users</button>
        </div> 

        <!-- Mappool -->
        <div v-if="useUserDataStore().IsAdmin" class="admin-category min-w-md p-10 flex flex-col justify-center items-center gap-4">
            <p class="font-bold text-4xl">Mappool</p>
            <div class="flex flex-wrap gap-4 justify-center">
                <div class="flex flex-col items-center justify-center gap-1">
                    <p class="text-xl">Insert map</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2 items-center">
                            <p>beatmap ID</p>
                            <input type="text" v-model="mappool.insert.id"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Stage</p>
                            <CDropdown class="w-full">
                                <CDropdownToggle color="dark">{{ mappool.insert.selectedStage }}</CDropdownToggle>
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="stage in Object.keys(MatchStage)" :key="stage" @click="() => { mappool.insert.selectedStage = MatchStage[stage as keyof typeof MatchStage] }">{{ stage }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Mod</p>
                            <CDropdown class="w-full">
                                <CDropdownToggle color="dark">{{ mappool.insert.selectedMod }}</CDropdownToggle>
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="mod in Object.keys(PoolMod)" :key="mod" @click="() => { mappool.insert.selectedMod = PoolMod[mod as keyof typeof PoolMod] }">{{ mod }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Slot</p>
                            <input type="text" v-model="mappool.insert.slot" class="w-full"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>EZ Multiplier</p>
                            <input type="text" v-model="mappool.insert.ez_mult" class="flex-1"/>  
                        </div>
                        <button @click="insertMap">Insert</button>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <p class="text-xl">Remove map</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2 items-center">
                            <p>Stage</p>
                            <CDropdown class="w-full">
                                <CDropdownToggle color="dark">{{ mappool.remove.selectedStage }}</CDropdownToggle>
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="stage in Object.keys(MatchStage)" :key="stage" @click="() => { mappool.remove.selectedStage = MatchStage[stage as keyof typeof MatchStage] }">{{ stage }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Mod</p>
                            <CDropdown class="w-full">
                                <CDropdownToggle color="dark">{{ mappool.remove.selectedMod }}</CDropdownToggle>
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="mod in Object.keys(PoolMod)" :key="mod" @click="() => { mappool.remove.selectedMod = PoolMod[mod as keyof typeof PoolMod] }">{{ mod }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Slot</p>
                            <input type="text" v-model="mappool.remove.slot" class="w-full"/>  
                        </div>
                        <button @click="removeMap">Remove</button>
                    </div>
                </div>
            </div>
        </div> 

        <!-- Matches -->
        <div class="admin-category min-w-md p-10 flex flex-col justify-center items-center gap-4">
            <p class="font-bold text-4xl">Matches</p>
            <div v-if="!teams.loaded && !matches.loaded" class="flex w-full p-4 items-center justify-center"><div class="lds-dual-ring"></div></div>
            <div v-else class="flex flex-wrap gap-4 justify-center">
                <div v-if="useUserDataStore().IsAdmin" class="flex flex-col items-center gap-1">
                    <p class="text-xl">Insert Match</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2 items-center">
                            <p>Match ID</p>
                            <input type="text" v-model="matches.insert.id"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Stage</p>
                            <CDropdown class="flex-1">
                                <CDropdownToggle color="dark">{{ matches.insert.selectedStage }}</CDropdownToggle>
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="stage in Object.keys(MatchStage)" :key="stage" @click="() => { matches.insert.selectedStage = MatchStage[stage as keyof typeof MatchStage] }">{{ stage }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Red Team</p>
                            <CDropdown class="flex-1">
                                <CDropdownToggle color="dark">{{ matches.insert.team1 }}</CDropdownToggle>
                                <CDropdownMenu class="w-full h-48 overflow-auto">
                                    <CDropdownItem v-for="team in teams.data" :key="team" @click="() => { matches.insert.team1 = (team as TeamInfo).name }">{{ (team as TeamInfo).name }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Blue Team</p>
                            <CDropdown class="flex-1">
                                <CDropdownToggle color="dark">{{ matches.insert.team2 }}</CDropdownToggle>
                                <CDropdownMenu class="w-full h-48 overflow-auto">
                                    <CDropdownItem v-for="team in teams.data" :key="team" @click="() => { matches.insert.team2 = (team as TeamInfo).name }">{{ (team as TeamInfo).name }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <button @click="insertMatch">Insert</button>
                    </div>
                </div>

                <div v-if="useUserDataStore().IsAdmin" class="flex flex-col items-center gap-1">
                    <p class="text-xl">Remove match</p>
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex flex-row gap-2 items-center w-full">
                            <p>Stage</p>
                            <CDropdown class="flex-1">
                                <CDropdownToggle color="dark">{{ matches.remove.selectedStage }}</CDropdownToggle>
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="stage in Object.keys(MatchStage)" :key="stage" @click="() => { matches.remove.selectedStage = MatchStage[stage as keyof typeof MatchStage] }">{{ stage }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Match ID</p>
                            <CDropdown class="flex-1">
                                <CDropdownToggle color="dark">{{ matches.remove.id }}</CDropdownToggle>
                                <CDropdownMenu class="w-96 h-48 overflow-auto">
                                    <CDropdownItem v-for="match in matches.data[matches.edit.selectedStage]" :key="match" @click="() => { matches.remove.id = (match as MatchInfo).matchID }">{{ (match as MatchInfo).matchID }} - {{ (match as MatchInfo).redTeam.name }} vs {{ (match as MatchInfo).blueTeam.name }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <button @click="removeMatch">Remove</button>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <p class="text-xl">Edit Match</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2 items-center w-full">
                            <p>Stage</p>
                            <CDropdown class="flex-1">
                                <CDropdownToggle color="dark">{{ matches.edit.selectedStage }}</CDropdownToggle>
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="stage in Object.keys(MatchStage)" :key="stage" @click="() => { matches.edit.selectedStage = MatchStage[stage as keyof typeof MatchStage] }">{{ stage }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Match ID</p>
                            <CDropdown class="flex-1">
                                <CDropdownToggle color="dark">{{ matches.edit.id }}</CDropdownToggle>
                                <CDropdownMenu class="w-96">
                                    <CDropdownItem v-for="match in matches.data[matches.edit.selectedStage]" :key="match" @click="() => selectMatchToEdit(match)">{{ (match as MatchInfo).matchID }} - {{ (match as MatchInfo).redTeam.name }} vs {{ (match as MatchInfo).blueTeam.name }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>MP Link</p>
                            <input type="text" v-model="matches.edit.link" class="flex-1"/>  
                        </div>

                        <br>
                        <h1 class="font-extrabold text-2xl">Schedules</h1>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Date</p>
                            <input type="date" v-model="matches.edit.date" class="flex-1"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Time</p>
                            <input type="time" v-model="matches.edit.time" class="flex-1"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Referee</p>
                            <input type="text" v-model="matches.edit.referee" class="flex-1"/>  
                        </div>

                        <br>
                        <h1 class="font-extrabold text-2xl">Scores</h1>

                        <div class="flex flex-row gap-2 items-center">
                            <p>Red Score</p>
                            <input type="text" v-model="matches.edit.scores.red" class="flex-1"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Blue Score</p>
                            <input type="text" v-model="matches.edit.scores.blue" class="flex-1"/>  
                        </div>
                        <button @click="editMatch">Edit</button>
                    </div>
                </div>
            </div>
        </div> 
    </main>
</template>

<style scoped lang="scss">
    button {
        border: 1px solid white;
        border-radius: 5px;
        padding: 6px;

        &:hover {
            background-color: white;
            color: black;
        }

        transition: 0.15s ease-in;
    }

    .admin-category {
        background-color: rgba(0, 0, 0, 0.3);
    }

    input {
        background-color: transparent;
        border: 1px solid white;
        padding-left: 6px;
        padding-right: 6px;
        color-scheme: dark;
    }

    p {
       margin-bottom: 0; 
    }
</style>