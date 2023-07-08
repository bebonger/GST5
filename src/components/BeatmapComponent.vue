<script setup lang="ts">
import { PoolMod, type MapInfo } from '@/Interfaces/mappool';

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
<div class="beatmap-info w-full rounded-2xl flex flex-col md:flex-row md:h-40 truncate md:items-center">
    <div class="truncate h-32 w-full md:h-full md:w-80 border-b-[4px] md:border-b-0" :style="`border-color: ${getModColourPalette(mapInfo.mod).main}`">
        <div class="absolute z-20 h-full w-22 flex items-end justify-center">
            <div class="cover-overlay" :style="`background-color: ${getModColourPalette(mapInfo.mod).main}`" ></div>
            <span class="bottom-0 p-3 pb-0 font-extrabold z-30">{{ mapInfo.mod }}{{ mapInfo.slot }}</span>
        </div>
        <img :src="mapInfo.info.cover" class="object-cover w-full h-full">
    </div>
    <div class="truncate flex-1 h-full">
        <div class="flex flex-col p-6 truncate gap-6 justify-center h-full">
            <div>
                <p class="italic text-xs truncate">MAP ID: {{ mapInfo.info.mapID }}</p>
                <div class="flex flex-row gap-2">
                    <p class="font-bold leading-5 text-lg truncate">{{ mapInfo.info.title }}</p>
                    <a class="block my-auto" :href="mapInfo.info.url">
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.85184 6.86829C7.70218 6.86829 7.55252 6.80415 7.42424 6.69725C7.18907 6.46207 7.18907 6.09862 7.42424 5.86344L9.32705 3.96063C9.96845 3.31923 9.96845 2.29299 9.32705 1.6516C8.68566 1.0102 7.65942 1.0102 7.01803 1.6516L5.22211 3.44751C4.98694 3.68269 4.62348 3.68269 4.3883 3.44751C4.15312 3.21233 4.15312 2.84887 4.3883 2.61369L6.18421 0.817781C7.27458 -0.272594 9.0705 -0.272594 10.1823 0.817781C11.2726 1.90816 11.2726 3.70407 10.1823 4.81582L8.27944 6.71863C8.17254 6.82553 8.0015 6.86829 7.85184 6.86829Z" fill="white"/>
                        <path d="M2.80611 11.016C2.05782 11.016 1.35228 10.7167 0.817781 10.1822C-0.272594 9.09184 -0.272594 7.29593 0.817781 6.18418L2.72059 4.28136C2.95577 4.04619 3.31923 4.04619 3.55441 4.28136C3.78959 4.51654 3.78959 4.88 3.55441 5.11518L1.6516 7.01799C1.0102 7.65939 1.0102 8.68562 1.6516 9.32702C2.27161 9.94704 3.34061 9.94704 3.96063 9.32702L5.77792 7.50973C6.0131 7.27455 6.37656 7.27455 6.61173 7.50973C6.84691 7.74491 6.84691 8.10837 6.61173 8.34355L4.79444 10.1608C4.25995 10.7167 3.55441 11.016 2.80611 11.016Z" fill="white"/>
                        <path d="M3.72556 7.85182C3.5759 7.85182 3.42625 7.78768 3.29797 7.68078C3.06279 7.4456 3.06279 7.08214 3.29797 6.84696L6.91117 3.23376C7.14635 2.99858 7.50981 2.99858 7.74499 3.23376C7.98016 3.46894 7.98016 3.83239 7.74499 4.06757L4.15316 7.68078C4.04626 7.78768 3.8966 7.85182 3.72556 7.85182Z" fill="white"/>
                        </svg>
                    </a>
                </div>
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
            <div v-if="mapInfo.mod == PoolMod.FM && mapInfo.data.ez_mult" class="basis-1/4 md:basis-1/3">
                <p class="text-xs font-semibold" :style="`color: ${getModColourPalette(mapInfo.mod).main};`">EZ</p>
                <p class="text-xs font-semibold">{{mapInfo.data.ez_mult}}x</p>
            </div>
        </div>
    </div>
</div>
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

a {
    &:hover {
        background-color: transparent;
    }
}

@media (max-width: 768px) {
    .cover-overlay {
        top: -20px;
    }
}
</style>