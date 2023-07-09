<script setup lang="ts">
import { MatchStage, type MatchInfo } from '@/Interfaces/bracket';
import GroupScheduleComponent from '@/components/GroupScheduleComponent.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            loaded: false,
            post: null,
            error: null,
            schedules: {},
            currentStage: MatchStage.GroupStage,
            sort:false,

            test: false
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
        async fetchData() {
            this.error = this.post = null;
            try {
                const response = await this.$http.get("/api/matches");
                console.log(response.data["GS"]);
                this.schedules = response.data;
                this.loaded = true;
            }
            catch (err) {
                console.error(err);
            }
        },
        getStageName(stage: MatchStage): string {
            let name = Object.keys(MatchStage)[Object.values(MatchStage).indexOf(stage)];
            name = name.replace(/([a-z])([A-Z])/g, "$1 $2");
            name = name.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
            name = name.replace(/([a-zA-Z])([0-9])/g, "$1 $2");
            name = name.replace(/([0-9])([a-zA-Z])/g, "$1 $2");
            name = name.toUpperCase();       
            return name;
        },
        getSchedules(stage: MatchStage, prefix: string): MatchInfo[] {
            if (!this.schedules[stage]) return [];
            return this.schedules[stage].filter((schedule) => schedule.matchID.startsWith(prefix));
        }
    },
    components: { GroupScheduleComponent }
};
</script>

<template>
<div v-if="!loaded" class="flex w-full p-4 items-center justify-center"><div class="lds-dual-ring"></div></div>
<main v-else class="max-w-5xl h-full w-full pt-8 mx-auto p-3">
    <div class="flex flex-col gap-4 pb-6 items-center w-full">
        <div class="flex flex-row w-full gap-8 items-center">
            <h1 class="font-extrabold text-5xl">{{ getStageName(currentStage) }}</h1>
            <div class="flex flex-wrap gap-y-2 gap-x-14 justify-center ml-auto pr-6">
                <a class="link-button ml-auto pl-6 flex items-center justify-center" href='https://docs.google.com/spreadsheets/d/1EHBXBlY8J2Pbux-xb0oM-yQdxnJqIkIZuShX50TndBc'>
                    <div class="left-diamond flex items-center justify-center">
                        <div class="-rotate-45">
                            <svg width="24" height="24" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7745 0.0203857H1.57411C0.851221 0.0203857 0.259766 0.611841 0.259766 1.33473V10.5351C0.259766 11.258 0.851221 11.8495 1.57411 11.8495H10.7745C11.4974 11.8495 12.0889 11.258 12.0889 10.5351V1.33473C12.0889 0.611841 11.4974 0.0203857 10.7745 0.0203857ZM4.2028 9.2208H2.88845V7.90645H4.2028V9.2208ZM4.2028 6.59211H2.88845V5.27776H4.2028V6.59211ZM4.2028 3.96342H2.88845V2.64908H4.2028V3.96342ZM9.46018 9.2208H5.51714V7.90645H9.46018V9.2208ZM9.46018 6.59211H5.51714V5.27776H9.46018V6.59211ZM9.46018 3.96342H5.51714V2.64908H9.46018V3.96342Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                    <div class="right-diamond"></div>
                    <span>SHEET</span>
                </a>
            </div>
        </div>
        <div class="w-full">
            <input type="checkbox" v-model="sort" name="Sort by Time">
            <label for="vehicle3"> Sort by Time</label>
        </div>
        <div class="xl:absolute xl:left-0 w-full xl:w-0">
            <div class="xl:absolute xl:right-0 flex flex-row xl:flex-col gap-4 xl:m-4 xl:mt-16 transition-all">
                <button v-for="stage in Object.keys(schedules)" :key="stage" class="tab-button diamond" :class="{'active': currentStage == stage}" @click="currentStage = (stage as MatchStage)"> 
                    <div class="-rotate-45">
                        <span class="text-xl font-semibold">{{ stage }}</span>
                    </div>
                </button>
            </div>
        </div>
        <div v-if="currentStage==MatchStage.GroupStage" class="flex flex-wrap w-full gap-y-4 pt-4">
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">GROUP A</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(MatchStage.GroupStage, 'A')"/>
            </div>
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">GROUP B</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(MatchStage.GroupStage, 'B')"/>
            </div>
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">GROUP C</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(MatchStage.GroupStage, 'C')"/>
            </div>
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">GROUP D</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(MatchStage.GroupStage, 'D')"/>
            </div>
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">GROUP E</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(MatchStage.GroupStage, 'E')"/>
            </div>
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">GROUP F</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(MatchStage.GroupStage, 'F')"/>
            </div>
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">GROUP G</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(MatchStage.GroupStage, 'G')"/>
            </div>
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">GROUP H</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(MatchStage.GroupStage, 'H')"/>
            </div>
        </div>
        <div v-else class="flex flex-wrap w-full gap-y-4 pt-4">
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">WINNERS' BRACKET</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(currentStage, 'W')"/>
            </div>
            <div class="w-full flex flex-col justify-center gap-2">
                <h1 class="text-2xl font-bold">LOSERS' BRACKET</h1>
                <GroupScheduleComponent :sort="sort" :schedules="getSchedules(currentStage, 'L')"/>
            </div>
        </div>
    </div>
</main>
</template>

<style scoped lang="scss">
.left-diamond {
  position: absolute;
  background-color: #F49089;
  aspect-ratio: 1/1;
  height: 100%;

  top: 50%;
  left: -19%;
  transform: translate(0, -50%) rotate(45deg) scale(0.71);
}

.right-diamond {
  position: absolute;
  background-color: white;
  aspect-ratio: 1/1;
  height: 100%;

  top: 50%;
  right: -19%;
  transform: translate(0, -50%) rotate(45deg) scale(0.71);
}

.diamond {
    transform: rotate(45deg) scale(0.71);
    aspect-ratio: 1/1;
    width: 52px;
}

.tab-button {
    background-color:#F49089;
    transition: 0.1s ease-in;
}

.active {
    background-color: white;
    color: black;
    border: none;
    outline: 1px solid white;
    outline-offset: 4px;

}

.link-button {
    width: 6.5rem;
    min-width: 6.5rem;
    height: 2.5rem;
    color: black;
    background-color:white;

    transition: 0.1s ease-in;

    &:hover {
        filter: brightness(0.8);
    }
}

</style>