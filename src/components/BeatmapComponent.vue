<script setup lang="ts">
import type { MapInfo } from '@/Interfaces/mappool';

defineProps<{
    mapInfo: MapInfo
}>();

</script>

<script lang="ts">
export default {
    data() {
        return {
            windowWidth: 0,
            mobile: false,
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods: {
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 768) {
                this.mobile = true;
                return;
            }

            this.mobile = false;
            return;
        },
        secondsToMinutes(length): string {
            const minutes = Math.floor(length / 60);
            const seconds = Math.floor(length % 60);
            return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2, '0')}`;
        },
        getModColourPalette(mod: string) {
            const palette = {
                main: '#849591'
            }

            if (mod == 'NM') {
                palette.main = '#849591'
            }
            if (mod == 'HD') {
                palette.main = '#858495'
            }
            if (mod == 'HR') {
                palette.main = '#95848E'
            }
            if (mod == 'DT') {
                palette.main = '#958A84'
            }
            if (mod == 'FM') {
                palette.main = '#A8A58D'
            }
            if (mod == 'TB') {
                palette.main = '#5C6682'
            }

            return palette;
        }
    }
}
</script>

<template>
<a class="beatmap-info w-full rounded-2xl flex flex-col md:flex-row md:h-40 truncate md:items-center hover:cursor-pointer" :href="mapInfo.info.url">
    <div class="truncate h-32 w-full md:h-full md:w-80 border-b-[4px] md:border-b-0" :style="`border-color: ${getModColourPalette(mapInfo.mod).main}`">
        <div class="absolute z-20 h-full w-22 flex items-end justify-center">
            <div class="cover-overlay" :style="`background-color: ${getModColourPalette(mapInfo.mod).main}`" ></div>
            <span class="bottom-0 p-3 pb-0 font-extrabold z-30">{{ mapInfo.mod }}{{ mapInfo.slot }}</span>
        </div>
        <img :src="mapInfo.info.cover" class="object-cover w-full h-full">
    </div>
    <div class="truncate flex-1 h-full">
        <div class="flex flex-col p-6 truncate gap-6">
            <div>
                <p class="font-bold leading-5 text-lg truncate">{{ mapInfo.info.title }}</p>
                <p class="italic leading-5 text-base truncate">{{ mapInfo.info.artist }}</p>
            </div>
            <div class="flex flex-row items-center gap-8">
                <div class="md:basis-1/4">
                    <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">MAPPER</p>
                    <p>{{ mapInfo.info.mapper }}</p>
                </div>
                <div class="md:basis-3/4 truncate">
                    <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">DIFFICULTY</p>
                    <p class="truncate">{{ mapInfo.info.difficulty }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!mobile" class="vl" :style="`border-left: 1px solid ${getModColourPalette(mapInfo.mod).main};`"></div>
    <hr v-else :style="`border-top: 1px solid ${getModColourPalette(mapInfo.mod).main};`">
    <div class="truncate md:basis-64 h-full">
        <div class="flex md:flex-col flex-wrap p-6 truncate items-start md:h-full">
            <div class="basis-1/4 md:basis-1/3">
                <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">LENGTH</p>
                <p class="text-xs font-semibold">{{ secondsToMinutes(mapInfo.data.length) }}</p>
            </div>
            <div class="basis-1/4 md:basis-1/3">
                <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">BPM</p>
                <p class="text-xs font-semibold">{{ mapInfo.data.BPM }}</p>
            </div>
            <div class="basis-1/4 md:basis-1/3">
                <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">STAR</p>
                <p class="text-xs font-semibold">{{ mapInfo.data.star_rating }}</p>
            </div>
            <div class="basis-1/4 md:basis-1/3">
                <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">CS</p>
                <p class="text-xs font-semibold">{{ mapInfo.data.CS }}</p>
            </div>
            <div class="basis-1/4 md:basis-1/3">
                <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">HP</p>
                <p class="text-xs font-semibold">{{ mapInfo.data.HP }}</p>
            </div>
            <div class="basis-1/4 md:basis-1/3">
                <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">AR</p>
                <p class="text-xs font-semibold">{{ mapInfo.data.AR }}</p>
            </div>
            <div class="basis-1/4 md:basis-1/3">
                <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">OD</p>
                <p class="text-xs font-semibold">{{ mapInfo.data.OD }}</p>
            </div>
        </div>
    </div>
</a>
</template>

<style scoped lang="scss">

hr {
    width: calc(100% - 40px);
    transform: translateX(20px);
}

.vl {
    height: 70%;
}

.beatmap-info {
    background-color: rgba(0, 0, 0, 0.57);
}

.cover-overlay {
    position: absolute;
    height: 24rem;
    aspect-ratio: 1/1;
    transform: rotate(-45deg);
    top: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    overflow:hidden;
    z-index: 20;
}

span {
    font-size: 2rem;
    text-shadow: 0px 2px 3px black;
}

@media (max-width: 768px) {
    .cover-overlay {
        top: -20px;
    }
}
</style>