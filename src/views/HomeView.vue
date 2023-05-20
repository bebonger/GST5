<script lang="ts">
import MainBackground from "../components/MainBackground.vue";

export default {
    components: { MainBackground }
}
</script>

<template>
  <MainBackground/>
  <header>
    GREAT <br> 
    SINGAPORE <br> 
    TOURNAMENT 5
  </header>
</template>

<style scoped>
header {
  margin: 20px 30px;
  font-size: 100px;
  color: white;
  font-weight: 600;
}

@media (min-width: 1024px) {
  img {
    object-fit: contain;
  };
}
</style>
