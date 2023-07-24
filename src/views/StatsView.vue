<script lang="ts">
import  { MatchStage } from '@/Interfaces/bracket';

export default {
    data() {
        return {
            loaded: false,
            post: null,
            error: null,
            currentStage: MatchStage.GroupStage,
            sort: false,
            stats: {
                "GS": []
            },
        };
    },
    methods: {
        getStageName(stage: MatchStage): string {
            let name = Object.keys(MatchStage)[Object.values(MatchStage).indexOf(stage)];
            name = name.replace(/([a-z])([A-Z])/g, "$1 $2");
            name = name.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
            name = name.replace(/([a-zA-Z])([0-9])/g, "$1 $2");
            name = name.replace(/([0-9])([a-zA-Z])/g, "$1 $2");
            name = name.toUpperCase();       
            return name;
        },
    }
}
</script>

<template>
<main class="h-full w-full pt-8 p-3 overflow-x-auto min-h-max">
    <div class="w-[64rem] flex flex-col gap-4 pb-6 items-center mx-auto">
        <div class="flex flex-row w-full gap-8 items-center">
            <h1 class="font-extrabold text-5xl">{{ getStageName(currentStage) }}</h1>
            <div class="flex flex-wrap gap-y-2 gap-x-14 justify-center ml-auto pr-6">
            </div>
        </div>
        <div class="xl:absolute xl:left-0 w-full xl:w-0">
            <div class="xl:absolute xl:right-0 flex flex-row xl:flex-col gap-4 xl:m-4 xl:mt-16 transition-all">
                <button v-for="stage in Object.keys(stats)" :key="stage" class="tab-button diamond w-[52px]" :class="{'active': currentStage == stage}" @click="currentStage = (stage as MatchStage)"> 
                    <div class="-rotate-45">
                        <span class="text-xl font-semibold">{{ stage }}</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
</main>
</template>

<style lang="scss">
.diamond {
    transform: rotate(45deg) scale(0.71);
    aspect-ratio: 1/1;
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
</style>