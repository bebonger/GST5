<script setup lang="ts">
import type { TeamInfo } from '@/Interfaces/team';
import { useUserDataStore } from '@/stores/userData';
defineProps<{
    team: TeamInfo
    seed: string
}>();
</script>


<script lang="ts">

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}


export default {
    data() {
        return {
            editing: false,
            teamName: "",
            avgBWS: 0,
        }
    },
    created() {
        this.avgBWS = Math.round((this.team.player1?.osu.global_rank**(0.9937**(this.team.player1?.osu.badges**2)) + this.team.player2?.osu.global_rank**(0.9937**(this.team.player2?.osu.badges**2))) * 0.5 );
    },
    methods: {
        isTeamEligible() {
            return this.avgBWS >= 1000;
        },
        isClientTeam() {
            //return true;
            return useUserDataStore().IsLoggedIn && (useUserDataStore().user?.osu.userID == this.team.player1?.osu.userID || useUserDataStore().user?.osu.userID == this.team.player2?.osu.userID);
        },
        StartEditName() {
            this.editing = true;
            this.teamName = this.team.name;
        },
        async EndEditName() {
            this.editing = false;
            const response = await this.$http.post('/api/teams/edit/name', { 'name': this.teamName });

            if (response.data.error) {
                this.$toast.error(response.data.error);
            } else if (response.data.success) {
                this.$toast.success(response.data.success);
                this.$emit("onEdit");
            }
        },
        CancelEditName() {
            this.editing = false;
        },
        SelectFiles: function() {
            let element = document.getElementById("fileUpload");
            if (element) element.click();
        },
        async OnFileSelected(event: any) {
            if (!event.target.files) return;

            const file = event.target?.files[0];
            const formData = new FormData();
            formData.append('image', file);

            const response = await this.$http.post('/api/teams/edit/banner', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.error) {
                this.$toast.error(response.data.error);
            } else if (response.data.success) {
                this.$toast.success(response.data.success);
                this.$emit("onEdit");
            }
        },
        getSeedColourPalette(seed: string) {
            const palette = {
                header: '#849591;',
                footer: 'rgba(128, 244, 217, 0.14);'
            }

            if (seed == 'A') {
                palette.header = '#849591;',
                palette.footer = 'rgba(128, 244, 217, 0.14);'
            }
            if (seed == 'B') {
                palette.header = '#858495;',
                palette.footer = 'rgba(128, 182, 244, 0.14);'
            }
            if (seed == 'C') {
                palette.header = '#95848E;',
                palette.footer = 'rgba(186, 128, 244, 0.14);'
            }
            if (seed == 'D') {
                palette.header = '#958A84;',
                palette.footer = 'rgba(244, 184, 128, 0.14);'
            }
            if (seed == 'E') {
                palette.header = '#A8A58D;',
                palette.footer = 'rgba(242, 244, 128, 0.14);'
            }

            return palette;
        }
    }
}

</script>

<template>
    <div class="team max-w-md w-full truncate">
        <div class="team flex flex-col">
            <div class="team-image truncate h-40 flex" :style="`border-bottom: 4px solid ${getSeedColourPalette(seed).header}`">
                <div class="z-20 image-overlay" :style="`background-color: ${getSeedColourPalette(seed).header}`">
                    <svg class="gst-svg" width="403" height="55" viewBox="0 0 403 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.33">
                        <path d="M19.8867 26.4562V14.5764L37.4044 14.5764V17.0091H26.3335V24.0235H31.503V21.4489H28.6648V19.523H37.4024V26.4562H19.8867Z" fill="white"/>
                        <path d="M39.8022 26.4562V24.0235H50.6482V21.6516H39.8022V14.5764L57.0949 14.5764V17.0091H46.2693V19.3811H57.0949V26.4562H39.8022Z" fill="white"/>
                        <path d="M81.2378 26.5148V24.0821H92.0837V21.7102H81.2378V14.635L98.5304 14.635V17.0677H87.7048V19.4397H98.5304V26.5148H81.2378Z" fill="white"/>
                        <path d="M72.4064 17.0091V26.4562H65.9597V17.0091H59.4927V14.5764L78.8552 14.5764V17.0091H72.4084H72.4064Z" fill="white"/>
                        <path d="M0.211426 12.3349L0.211426 0.455078L17.7291 0.455078V2.88781L6.65816 2.88781L6.65816 9.90218H11.8277V7.32754H8.98953V5.40163H17.7271V12.3349L0.211426 12.3349Z" fill="white"/>
                        <path d="M20.127 12.3349V9.90218H30.9729V7.53027L20.127 7.53027V0.455078L37.4196 0.455078V2.88781L26.594 2.88781V5.25972L37.4196 5.25972V12.3349L20.127 12.3349Z" fill="white"/>
                        <path d="M61.562 12.3935V9.96077H72.4079V7.58886L61.562 7.58886V0.513672L78.8547 0.513672V2.9464L68.029 2.9464V5.31831L78.8547 5.31831V12.3935L61.562 12.3935Z" fill="white"/>
                        <path d="M52.7306 2.88781V12.3349H46.2839V2.88781L39.8169 2.88781V0.455078L59.1794 0.455078V2.88781H52.7327H52.7306Z" fill="white"/>
                        <path d="M80.998 54.6989V42.8191H98.5157V45.2518H87.4448V52.2662H92.6143V49.6916H89.7761V47.7656H98.5137V54.6989H80.998Z" fill="white"/>
                        <path d="M100.914 54.6989V52.2662H111.759V49.8943H100.914V42.8191H118.206V45.2518H107.381V47.6237H118.206V54.6989H100.914Z" fill="white"/>
                        <path d="M142.349 54.7575V52.3248H153.195V49.9529H142.349V42.8777H159.641V45.3104H148.816V47.6823H159.641V54.7575H142.349Z" fill="white"/>
                        <path d="M133.517 45.2518V54.6989H127.071V45.2518H120.604V42.8191H139.966V45.2518H133.519H133.517Z" fill="white"/>
                        <path d="M61.3228 40.5776V28.6978H78.8404V31.1305H67.7695V38.1449H72.939V35.5702H70.1009V33.6443H78.8384V40.5776H61.3228Z" fill="white"/>
                        <path d="M81.2378 40.5776V38.1449H92.0837V35.7729H81.2378V28.6978H98.5304V31.1305H87.7048V33.5024H98.5304V40.5776H81.2378Z" fill="white"/>
                        <path d="M122.673 40.6362V38.2034H133.519V35.8315H122.673V28.7563H139.966V31.1891H129.14V33.561H139.966V40.6362H122.673Z" fill="white"/>
                        <path d="M113.842 31.1305V40.5776H107.395V31.1305H100.928V28.6978H120.291V31.1305H113.844H113.842Z" fill="white"/>
                        <path d="M243.237 54.6989V42.8191H260.755V45.2518H249.684V52.2662H254.854V49.6916H252.015V47.7656H260.753V54.6989H243.237Z" fill="white"/>
                        <path d="M263.153 54.6989V52.2662H273.999V49.8943H263.153V42.8191H280.445V45.2518H269.62V47.6237H280.445V54.6989H263.153Z" fill="white"/>
                        <path d="M304.588 54.7575V52.3248H315.434V49.9529H304.588V42.8777H321.881V45.3104H311.055V47.6823H321.881V54.7575H304.588Z" fill="white"/>
                        <path d="M295.757 45.2518V54.6989H289.31V45.2518H282.843V42.8191H302.206V45.2518H295.759H295.757Z" fill="white"/>
                        <path d="M223.562 40.5776V28.6978H241.08V31.1305H230.009V38.1449H235.178V35.5702H232.34V33.6443H241.078V40.5776H223.562Z" fill="white"/>
                        <path d="M243.478 40.5776V38.1449H254.323V35.7729H243.478V28.6978H260.77V31.1305H249.945V33.5024H260.77V40.5776H243.478Z" fill="white"/>
                        <path d="M284.913 40.6362V38.2034H295.759V35.8315H284.913V28.7563H302.205V31.1891H291.38V33.561H302.205V40.6362H284.913Z" fill="white"/>
                        <path d="M276.081 31.1305V40.5776H269.634V31.1305H263.167V28.6978H282.53V31.1305H276.083H276.081Z" fill="white"/>
                        <path d="M182.126 26.4562V14.5764L199.644 14.5764V17.0091H188.573V24.0235H193.743V21.4489H190.905V19.523H199.642V26.4562H182.126Z" fill="white"/>
                        <path d="M202.042 26.4562V24.0235H212.887V21.6516H202.042V14.5764L219.334 14.5764V17.0091H208.509V19.3811H219.334V26.4562H202.042Z" fill="white"/>
                        <path d="M243.477 26.5148V24.0821H254.323V21.7102H243.477V14.635L260.77 14.635V17.0677H249.944V19.4397H260.77V26.5148H243.477Z" fill="white"/>
                        <path d="M234.646 17.0091V26.4562H228.199V17.0091H221.732V14.5764L241.094 14.5764V17.0091H234.648H234.646Z" fill="white"/>
                        <path d="M162.451 12.3349V0.455078L179.968 0.455078V2.88781L168.897 2.88781V9.90218H174.067V7.32754H171.229V5.40163H179.966V12.3349L162.451 12.3349Z" fill="white"/>
                        <path d="M182.366 12.3349V9.90218H193.212V7.53027L182.366 7.53027V0.455078L199.659 0.455078V2.88781L188.833 2.88781V5.25972L199.659 5.25972V12.3349L182.366 12.3349Z" fill="white"/>
                        <path d="M223.802 12.3935V9.96077H234.648V7.58886L223.802 7.58886V0.513672L241.094 0.513672V2.9464L230.269 2.9464V5.31831L241.094 5.31831V12.3935L223.802 12.3935Z" fill="white"/>
                        <path d="M214.97 2.88781V12.3349H208.524V2.88781L202.057 2.88781V0.455078L221.419 0.455078V2.88781H214.972H214.97Z" fill="white"/>
                        <path d="M162.118 54.6989V42.8191H179.635V45.2518H168.564V52.2662H173.734V49.6916H170.896V47.7656H179.633V54.6989H162.118Z" fill="white"/>
                        <path d="M182.033 54.6989V52.2662H192.879V49.8943H182.033V42.8191H199.326V45.2518H188.5V47.6237H199.326V54.6989H182.033Z" fill="white"/>
                        <path d="M223.469 54.7575V52.3248H234.315V49.9529H223.469V42.8777H240.761V45.3104H229.936V47.6823H240.761V54.7575H223.469Z" fill="white"/>
                        <path d="M214.637 45.2518V54.6989H208.191V45.2518H201.724V42.8191H221.086V45.2518H214.639H214.637Z" fill="white"/>
                        <path d="M142.442 40.5776V28.6978H159.96V31.1305H148.889V38.1449H154.059V35.5702H151.22V33.6443H159.958V40.5776H142.442Z" fill="white"/>
                        <path d="M162.358 40.5776V38.1449H173.204V35.7729H162.358V28.6978H179.651V31.1305H168.825V33.5024H179.651V40.5776H162.358Z" fill="white"/>
                        <path d="M203.793 40.6362V38.2034H214.639V35.8315H203.793V28.7563H221.086V31.1891H210.26V33.561H221.086V40.6362H203.793Z" fill="white"/>
                        <path d="M194.962 31.1305V40.5776H188.515V31.1305H182.048V28.6978H201.41V31.1305H194.964H194.962Z" fill="white"/>
                        <path d="M101.007 26.4562V14.5764L118.525 14.5764V17.0091H107.454V24.0235H112.623V21.4489H109.785V19.523H118.522V26.4562H101.007Z" fill="white"/>
                        <path d="M120.922 26.4562V24.0235H131.768V21.6516H120.922V14.5764L138.215 14.5764V17.0091H127.389V19.3811H138.215V26.4562H120.922Z" fill="white"/>
                        <path d="M162.357 26.5148V24.0821H173.203V21.7102H162.357V14.635L179.65 14.635V17.0677H168.824V19.4397H179.65V26.5148H162.357Z" fill="white"/>
                        <path d="M153.526 17.0091V26.4562H147.079V17.0091H140.612V14.5764L159.975 14.5764V17.0091H153.528H153.526Z" fill="white"/>
                        <path d="M81.3311 12.3349V0.455078L98.8487 0.455078V2.88781L87.7778 2.88781V9.90218H92.9473V7.32754H90.1092V5.40163H98.8467V12.3349L81.3311 12.3349Z" fill="white"/>
                        <path d="M101.247 12.3349V9.90218H112.093V7.53027L101.247 7.53027V0.455078L118.539 0.455078V2.88781L107.714 2.88781V5.25972L118.539 5.25972V12.3349L101.247 12.3349Z" fill="white"/>
                        <path d="M142.682 12.3935V9.96077H153.528V7.58886L142.682 7.58886V0.513672L159.975 0.513672V2.9464L149.149 2.9464V5.31831L159.975 5.31831V12.3935L142.682 12.3935Z" fill="white"/>
                        <path d="M133.851 2.88781V12.3349H127.404V2.88781L120.937 2.88781V0.455078L140.3 0.455078V2.88781H133.853H133.851Z" fill="white"/>
                        <path d="M324.357 54.6989V42.8191H341.875V45.2518H330.804V52.2662H335.974V49.6916H333.136V47.7656H341.873V54.6989H324.357Z" fill="white"/>
                        <path d="M344.272 54.6989V52.2662H355.118V49.8943H344.272V42.8191H361.565V45.2518H350.739V47.6237H361.565V54.6989H344.272Z" fill="white"/>
                        <path d="M385.708 54.7575V52.3248H396.554V49.9529H385.708V42.8777H403.001V45.3104H392.175V47.6823H403.001V54.7575H385.708Z" fill="white"/>
                        <path d="M376.877 45.2518V54.6989H370.43V45.2518H363.963V42.8191H383.325V45.2518H376.879H376.877Z" fill="white"/>
                        <path d="M304.682 40.5776V28.6978H322.199V31.1305H311.128V38.1449H316.298V35.5702H313.46V33.6443H322.197V40.5776H304.682Z" fill="white"/>
                        <path d="M324.597 40.5776V38.1449H335.443V35.7729H324.597V28.6978H341.89V31.1305H331.064V33.5024H341.89V40.5776H324.597Z" fill="white"/>
                        <path d="M366.033 40.6362V38.2034H376.879V35.8315H366.033V28.7563H383.325V31.1891H372.5V33.561H383.325V40.6362H366.033Z" fill="white"/>
                        <path d="M357.201 31.1305V40.5776H350.755V31.1305H344.288V28.6978H363.65V31.1305H357.203H357.201Z" fill="white"/>
                        <path d="M263.246 26.4562V14.5764L280.764 14.5764V17.0091H269.693V24.0235H274.862V21.4489H272.024V19.523H280.762V26.4562H263.246Z" fill="white"/>
                        <path d="M283.162 26.4562V24.0235H294.008V21.6516H283.162V14.5764L300.454 14.5764V17.0091H289.629V19.3811H300.454V26.4562H283.162Z" fill="white"/>
                        <path d="M324.597 26.5148V24.0821H335.443V21.7102H324.597V14.635L341.89 14.635V17.0677H331.064V19.4397H341.89V26.5148H324.597Z" fill="white"/>
                        <path d="M315.765 17.0091V26.4562H309.319V17.0091H302.852V14.5764L322.214 14.5764V17.0091H315.767H315.765Z" fill="white"/>
                        <path d="M243.571 12.3349V0.455078L261.088 0.455078V2.88781L250.018 2.88781V9.90218H255.187V7.32754H252.349V5.40163H261.086V12.3349L243.571 12.3349Z" fill="white"/>
                        <path d="M263.486 12.3349V9.90218H274.332V7.53027L263.486 7.53027V0.455078L280.778 0.455078V2.88781L269.953 2.88781V5.25972L280.778 5.25972V12.3349L263.486 12.3349Z" fill="white"/>
                        <path d="M304.921 12.3935V9.96077H315.767V7.58886L304.921 7.58886V0.513672L322.214 0.513672V2.9464L311.388 2.9464V5.31831L322.214 5.31831V12.3935L304.921 12.3935Z" fill="white"/>
                        <path d="M296.09 2.88781V12.3349H289.643V2.88781L283.176 2.88781V0.455078L302.539 0.455078V2.88781H296.092H296.09Z" fill="white"/>
                        </g>
                    </svg>
                </div>

                <div class="z-30 absolute right-0 top-0 flex flex-col items-center justify-center h-3/4 w-1/5">
                    <p class="tracking-wide font-semibold leading-4" style="font-size: 0.6rem;">SEED</p>
                    <p class="text-6xl font-extrabold leading-9 drop-shadow-[0_3px_2px_rgba(0,0,0,0.5)]">{{ seed }}</p>
                </div>

                <button v-if="isClientTeam()" @click="SelectFiles" class="z-10 absolute h-full w-full transition-all bg-opacity-40 bg-black hover:bg-opacity-60 hover:bg-pink-p">
                    <div class="flex flex-row gap-4 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white"><path d="M6 20q-.825 0-1.412-.587Q4 18.825 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413Q18.825 20 18 20Zm5-4V7.85l-2.6 2.6L7 9l5-5 5 5-1.4 1.45-2.6-2.6V16Z"></path></svg>
                        <p>Change Banner</p>
                    </div>
                    <input id="fileUpload" type="file" accept=".png,.jpg,.jpeg,.gif" @change="OnFileSelected" hidden>
                </button>

                <img v-if="team.avatar" class="flex-1 object-cover" :src="team.avatar"/>
                <img v-else class="flex-1 object-cover" src="../assets/images/BG.png"/>
            </div>
            <div class="flex flex-col px-8 py-2 gap-2">
                <div v-if="!editing" class="flex flex-row gap-2 items-start">
                    <h1>{{ team.name }}</h1>
                    <button v-if="isClientTeam()" @click="StartEditName">
                        <svg viewBox="189.115 144.808 122.881 121.495" width="18" height="18">
                            <path d="M 217.775 146.433 L 247.995 146.433 L 233.575 161.503 L 217.775 161.503 C 214.173 161.505 210.722 162.945 208.185 165.503 C 205.628 168.039 204.188 171.491 204.185 175.093 L 204.185 251.233 L 280.325 251.233 C 283.928 251.232 287.38 249.792 289.915 247.233 C 292.475 244.698 293.915 241.245 293.915 237.643 L 293.915 222.093 L 308.985 206.353 L 308.985 237.643 C 308.976 245.232 305.95 252.505 300.575 257.863 L 300.575 257.913 C 295.221 263.277 287.955 266.295 280.375 266.303 L 200.615 266.303 C 197.575 266.297 194.662 265.085 192.515 262.933 C 190.347 260.778 189.124 257.85 189.115 254.793 L 189.115 175.093 C 189.125 167.507 192.151 160.236 197.525 154.883 L 197.575 154.793 C 202.928 149.425 210.194 146.403 217.775 146.393 L 217.775 146.433 Z M 262.115 221.263 L 232.695 227.263 L 236.945 195.953 L 262.115 221.263 Z M 246.245 186.473 L 285.415 145.703 C 286.281 144.753 287.691 144.532 288.805 145.173 L 311.285 166.933 C 312.305 167.939 312.216 169.61 311.095 170.503 L 271.395 211.793 L 246.245 186.473 Z" style="fill: rgb(255, 255, 255);"></path>
                        </svg>                    
                    </button>
                </div>
                <div v-else class="flex flex-col mt-4">
                    <p class="text-sm" style="color:#849591;">Enter new team name</p>
                    <div class="flex flex-row gap-2 items-center">
                        <input type="text" v-model="teamName" maxlength="24" v-on:keyup.enter="EndEditName"/>
                        <button @click="EndEditName" class="submit-button transition-all">
                            <p>SUBMIT</p>
                        </button>
                        <button @click="CancelEditName" class="cancel-button transition-all">
                            <p>CANCEL</p>
                        </button>
                    </div>
                </div>
                <div class="flex flex-row gap-2 items-center justify-end">
                    <p class="text-xs" style="color: #849591;">AVG. BWS</p>
                    <p class="text-2xl font-bold italic">#{{ avgBWS }}</p>
                </div>
            </div>
            <div class="players flex flex-row flex-wrap px-6 py-4" :style="`background-color: ${getSeedColourPalette(seed).footer}`">
                <div class="flex flex-row grow gap-2">
                    <a :href="`https://osu.ppy.sh/u/${team.player1?.osu.userID}`">
                        <img :src="team.player1?.osu.avatar"/>
                    </a>  
                    <div class="flex flex-col h-full">
                        <a :href="`https://osu.ppy.sh/u/${team.player1?.osu.userID}`">
                            <h2 class="truncate">{{team.player1?.osu.username}}</h2>
                        </a>
                        <div class="flex flex-row gap-1 items-start justify-start">
                            <p class="align-top" style="font-size: 0.6rem; color: #849591;">BWS RANK</p>
                            <p class="text-lg font-bold align-top">#{{  Math.round(team.player1?.osu.global_rank**(0.9937**(team.player1?.osu.badges**2))) }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row grow gap-2">
                    <a :href="`https://osu.ppy.sh/u/${team.player2?.osu.userID}`">
                        <img :src="team.player2?.osu.avatar"/>
                    </a>  
                    <div class="flex flex-col h-full">
                        <a :href="`https://osu.ppy.sh/u/${team.player2?.osu.userID}`">
                            <h2 class="truncate">{{team.player2?.osu.username}}</h2>
                        </a>
                        <div class="flex flex-row gap-1 items-start justify-start">
                            <p class="align-top" style="font-size: 0.6rem; color: #849591;">BWS RANK</p>
                            <p class="text-lg  font-bold align-top">#{{ Math.round(team.player2?.osu.global_rank**(0.9937**(team.player2?.osu.badges**2))) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.team {

    .submit-button {
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

    .cancel-button {
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 4px;
        padding-bottom: 4px;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: transparent;
        border: 1px solid #F49089;
        border-radius: 3px;
        color:#F49089;
        font-weight: 500;

        &:hover {
            cursor: pointer;
            background-color: #F49089;
            color: white;
        }
    }


    input {
        color: black;
        height: 35px;
        width: 200px;
        padding: 8px;
        background-color: transparent;
        border: 1px solid white;
        border-radius: 3px;
        caret-color: white;
        color: white;
        font-family: DIN;
        &:focus {
            outline: none;
        }
    }

    a {
        &:hover {
            background-color: transparent;
        }
    }

    background-color: rgba(17, 17, 17, 0.4);
    border-radius: 10px;

    h1 {
        font-weight: 700;
        font-style: italic;
        font-size: 1.5rem;
        line-height: 35px;
    }

    h2 {
        font-weight: 700;
        font-style: normal;
        font-size: 1.2rem;
        line-height: 1.9rem;
    }


    h3 {
        font-weight: 600;
        font-style: normal;
        font-size: 0.8rem;
        line-height: 1.9rem;
    }

    .team-image {
        overflow: hidden;

        .image-overlay {
            position: absolute;
            height: 24rem;
            aspect-ratio: 1/1;
            transform: rotate(-45deg);
            bottom: 0px;
            right: -230px;
            display: flex;
            align-items: center;
            overflow:hidden;

            .gst-svg {
                left: -75px;
                top: 52px;
            }
        }
    }

    .team-header {
        margin-left: 128px;
    }

    .bws {
        margin-left: 100px;
    }

    .players {
        img {
            height: 54px;
            width: 54px;
            border-radius: 10px;
            border: 1px solid white;
        }
    }
}
</style>