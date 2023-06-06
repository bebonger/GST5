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

  p {
    color: white;
    font-size: 20px;
  }
}
</style>
