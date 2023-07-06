<script setup lang="ts">
import { MatchStage } from '@/Interfaces/bracket';
</script>

<script lang="ts">
export default {
    data() {
        return {
            loaded: false,
            post: null,
            error: null,
            schedules: {},
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
    },
    components: { }
};
</script>

<template>
<div v-if="!loaded" class="flex w-full p-4 items-center justify-center"><div class="lds-dual-ring"></div></div>
<main v-else class="max-w-5xl h-full w-full pt-8 mx-auto p-3">
    <div class="flex flex-col gap-4 pb-6 items-center w-full">
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