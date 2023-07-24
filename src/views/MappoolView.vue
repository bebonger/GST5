<script setup lang="ts">
import { MatchStage } from '@/Interfaces/bracket';
import BeatmapComponent from '@/components/BeatmapComponent.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            loaded: false,
            post: null,
            error: null,
            mappools: {},
            currentPool: MatchStage.GroupStage,

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
                const response = await this.$http.get("/api/mappool");
                this.mappools = response.data;
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
    },
    components: { BeatmapComponent }
};
</script>

<template>
<div v-if="!loaded" class="flex w-full p-4 items-center justify-center"><div class="lds-dual-ring"></div></div>
<main v-else class="max-w-5xl h-full w-full pt-8 mx-auto p-3">
    <div class="flex flex-col gap-4 pb-6 items-center w-full">
        <div class="flex flex-row w-full gap-8 items-center">
            <h1 class="font-extrabold text-5xl">{{ getStageName(currentPool) }}</h1>
            <div class="flex flex-wrap gap-y-2 gap-x-14 justify-center ml-auto pr-6">
                <a class="link-button ml-auto pl-6 flex items-center justify-center" href='https://docs.google.com/spreadsheets/d/1aBLU2lThefnwsR1wv2-UouePGOHenhBpIOk_4qBL6Cw'>
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
                <a class="link-button ml-auto pl-6 flex items-center justify-center" href="https://drive.google.com/drive/folders/1ww2pSRkgFbEPyQ2B2DRMXmU0zbdX_Qvz?usp=drive_link">
                    <div class="left-diamond flex items-center justify-center">
                        <div class="-rotate-45">
                            <svg width="24" height="24" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.356 8.88977C10.9917 8.88977 10.696 9.18543 10.696 9.54973V11.1336C10.696 11.3501 10.5165 11.5296 10.3 11.5296H1.8526C1.63614 11.5296 1.45663 11.3501 1.45663 11.1336V9.54973C1.45663 9.18543 1.16097 8.88977 0.796674 8.88977C0.432379 8.88977 0.136719 9.18543 0.136719 9.54973V11.1336C0.136719 12.0787 0.907546 12.8495 1.8526 12.8495H10.3C11.2451 12.8495 12.0159 12.0787 12.0159 11.1336V9.54973C12.0159 9.18543 11.7202 8.88977 11.356 8.88977Z" fill="white"/>
                            <path d="M6.07567 0.969849C5.71137 0.969849 5.41571 1.26551 5.41571 1.6298V7.61163L3.33026 5.87463C3.05043 5.64233 2.63334 5.67929 2.40104 5.95911C2.16873 6.23893 2.20569 6.65602 2.48551 6.88832L5.6533 9.52814C5.68497 9.54926 5.72193 9.57038 5.75889 9.5915C5.78529 9.60734 5.80641 9.62318 5.8328 9.63374C5.98591 9.69709 6.16014 9.69709 6.31325 9.63374C6.33965 9.62318 6.36605 9.60734 6.38717 9.5915C6.42412 9.57566 6.46108 9.55454 6.49276 9.52814L9.66054 6.88832C9.94036 6.65602 9.97732 6.23893 9.74502 5.95911C9.61831 5.81128 9.43352 5.72152 9.23817 5.72152C9.08506 5.72152 8.93195 5.77432 8.8158 5.87463L6.73034 7.61163V1.6298C6.73034 1.26551 6.43468 0.969849 6.07039 0.969849H6.07567Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                    <div class="right-diamond"></div>
                    <span>MAPPACK</span>
                </a>
            </div>
        </div>
        <div class="xl:absolute xl:left-0 w-full xl:w-0">
            <div class="xl:absolute xl:right-0 flex flex-row xl:flex-col gap-4 xl:m-4 xl:mt-16 transition-all">
                <button v-for="stage in Object.keys(mappools)" :key="stage" class="tab-button diamond" :class="{'active': currentPool == stage}" @click="currentPool = (stage as MatchStage)"> 
                    <div class="-rotate-45">
                        <span class="text-xl font-semibold">{{ stage }}</span>
                    </div>
                </button>
            </div>
        </div>
        <BeatmapComponent v-for="beatmap in mappools[currentPool]" :key="beatmap" :mapInfo="beatmap"/>
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