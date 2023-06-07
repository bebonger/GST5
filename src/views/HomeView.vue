<script setup lang="ts">
import YuccaImage from '../components/YuccaImage.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

const handleResize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<script lang="ts">

export default {
    components: { YuccaImage }
}
</script>

<template>
  <YuccaImage/>

  <header id="desktop-header">
    GREAT <br> 
    SINGAPORE <br> 
    TOURNAMENT
  </header>
  <header id="mobile-header">
    GST
  </header>

  <a href="https://twitch.tv/osusg" class="twitch-banner flex flex-row gap-8 justify-end items-center p-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd"/></svg>
    <p class="font-bold text-2xl tracking-widest">TWITCH &#8594;</p>
  </a>
  <a href="https://discord.gg/DEYspsAjsd" class="discord-banner flex flex-row gap-8 justify-end items-center p-4">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 -28.5 256 256" version="1.1" preserveAspectRatio="xMidYMid">
      <g>
        <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#ffffff" fill-rule="nonzero">
        </path>
      </g>
    </svg>
    <p class="font-bold text-2xl tracking-widest">DISCORD &#8594;</p>
  </a>

  <div class="p-fixed">
  </div>

  <!--
  <div class="main-content">
    <p>
      jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus jingus bingus 
    </p>
  </div>
  -->
</template>

<style scoped lang="scss">

.twitch-banner {
  position: fixed;
  left: -10px;
  bottom: 420px;
  width: 320px;
  height: 65px;
  background-color: #BA97E8;
  transform: rotate(-7deg);

  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.5);
}

.discord-banner {
  position: fixed;
  left: -20px;
  bottom: 365px;
  width: 320px;
  height: 65px;
  background-color: #878ACE;
  transform: rotate(-7deg);

  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.5);

}

@media (max-width: 64rem) {
  #desktop-header {
    display: none;
  }

  #mobile-header {
    display: block;
    font-size: 160px;
    color: white;
    font-weight: 600;
    text-align: center;
    //text-shadow: -1px 1px 0 #000,
		//		  1px 1px 0 #000,
		//		 1px -1px 0 #000,
		//		-1px -1px 0 #000;
  }
}

@media (min-width: 64rem) {

  #mobile-header {
    display: none;
  }

  #desktop-header {
    // margin: 40px 60px;
    display:block;
    position:fixed;
    left: 30px;
    bottom: 100px;
    font-size: 100px;
    color: white;
    font-weight: 600;
    line-height: 80px;
    // text-shadow: -1px 1px 0 #000,
		// 		  1px 1px 0 #000,
		// 		 1px -1px 0 #000,
		// 		-1px -1px 0 #000;
  }

  .main-content {
    margin: 60px;
    width: 600px;
  }
}
</style>
