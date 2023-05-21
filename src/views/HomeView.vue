<script setup lang="ts">
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
import MainBackground from "../components/MainBackground.vue";

export default {
    components: { MainBackground }
}
</script>

<template>
  <MainBackground/>
  <header v-if="windowWidth >= 1024">
    GREAT <br> 
    SINGAPORE <br> 
    TOURNAMENT 5
  </header>
  <header v-else>
    GST5
  </header>
</template>

<style scoped>

@media (max-width: 1024px) {
  header {
    font-size: 160px;
    color: white;
    font-weight: 600;
    text-align: center;
    text-shadow: -1px 1px 0 #000,
				  1px 1px 0 #000,
				 1px -1px 0 #000,
				-1px -1px 0 #000;
  }
}

@media (min-width: 1024px) {
  header {
    margin: 40px 60px;
    font-size: 100px;
    color: white;
    font-weight: 600;
    line-height: 100px;
    text-shadow: -1px 1px 0 #000,
				  1px 1px 0 #000,
				 1px -1px 0 #000,
				-1px -1px 0 #000;
  }
}
</style>
