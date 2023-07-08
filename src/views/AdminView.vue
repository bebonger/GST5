<script setup lang="ts">
import { useUserDataStore } from "../stores/userData";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/vue';
import { MatchStage } from "@/Interfaces/bracket";
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
                insert: {
                    id: null as string | unknown,
                    selectedStage: MatchStage.GroupStage,
                    team1: "Select Team" as TeamInfo | unknown,
                    team2: "Select Team" as TeamInfo | unknown,

                },
                remove: {
                    id: null as string | unknown,
                },
                edit: {
                    id: null as string | unknown,
                    date: null as string | unknown,
                    time: null as string | unknown,
                    link: null as string | unknown,
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
        },
        async editSchedule() {
            const res = await this.$http.post("/api/admin/match/edit", {
                id: this.matches.edit.id,
                date: this.matches.edit.date,
                time: this.matches.edit.time,
            });
            if (res.data.error) {
                this.$toast.error(res.data.error);
            } else if (res.data.success) {
                this.$toast.success(res.data.success);
            }
        },
        async editLink() {
            const res = await this.$http.post("/api/admin/match/edit", {
                id: this.matches.edit.id,
                mp_link: this.matches.edit.link,
            });
            if (res.data.error) {
                this.$toast.error(res.data.error);
            } else if (res.data.success) {
                this.$toast.success(res.data.success);
            }
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
    }
}
</script>

<template>
    <main v-if="useUserDataStore().IsAdmin" class="flex flex-wrap w-full gap-3 items-center justify-center p-3">
        <!-- Users -->
        <div class="admin-category min-w-md p-10 flex flex-col justify-center items-center gap-2">
            <p class="font-bold text-4xl">Users</p>
            <button @click="refreshUsers" class="w-full">Refresh Users</button>
        </div> 

        <!-- Mappool -->
        <div class="admin-category min-w-md p-10 flex flex-col justify-center items-center gap-4">
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
            <div v-if="!teams.loaded" class="flex w-full p-4 items-center justify-center"><div class="lds-dual-ring"></div></div>
            <div v-else class="flex flex-wrap gap-4 justify-center">
                <div class="flex flex-col items-center justify-center gap-1">
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
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="team in teams.data" :key="team" @click="() => { matches.insert.team1 = (team as TeamInfo).name }">{{ (team as TeamInfo).name }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Blue Team</p>
                            <CDropdown class="flex-1">
                                <CDropdownToggle color="dark">{{ matches.insert.team2 }}</CDropdownToggle>
                                <CDropdownMenu class="w-full">
                                    <CDropdownItem v-for="team in teams.data" :key="team" @click="() => { matches.insert.team2 = (team as TeamInfo).name }">{{ (team as TeamInfo).name }}</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <button @click="insertMatch">Insert</button>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <p class="text-xl">Remove match</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2 items-center">
                            <p>Match ID</p>
                            <input type="text" v-model="matches.remove.id" class="flex-1"/>  
                        </div>
                        <button @click="removeMatch">Remove</button>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <p class="text-xl">Edit Schedule</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2 items-center">
                            <p>Match ID</p>
                            <input type="text" v-model="matches.edit.id" class="flex-1"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Date</p>
                            <input type="text" v-model="matches.edit.date" class="flex-1"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>Time</p>
                            <input type="text" v-model="matches.edit.time" class="flex-1"/>  
                        </div>
                        <button @click="editSchedule">Edit</button>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <p class="text-xl">Edit MP Link</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-row gap-2 items-center">
                            <p>Match ID</p>
                            <input type="text" v-model="matches.edit.id" class="flex-1"/>  
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p>MP Link</p>
                            <input type="text" v-model="matches.edit.link" class="flex-1"/>  
                        </div>
                        <button @click="editLink">Edit</button>
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