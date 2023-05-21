<script setup lang="ts">
</script>

<template>
    <div class="background-image">
        <img class="bg" src="../assets/images/Bg only lol.png">
        <div class="girl-wrapper">
            <img class="girl" src="../assets/images/No bg.png">
        </div>
    </div>
</template>

<style scoped lang="scss">
.background-image {
    position: fixed;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
}

.bg {
    z-index: -2;
    min-width: 100%;
    object-fit: cover;
    position: fixed;
}

@media (max-width: 1024px) {

    .girl-wrapper {
        position: absolute;
        top: 80px;
        right: 0;
        z-index: 1;
        width: auto;
        height: 100%;
        overflow: hidden;
    }
    
    .girl {  
        height: 60%;  /* Set height to auto */
        z-index: -1;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}

@media (min-width: 1024px) {
    .girl-wrapper {
        position: absolute;
        top: 80px;
        right: 0;
        z-index: 1;
        width: auto;
        height: 100%;
        overflow: hidden;
    }

    .girl {  
        height: 800px;
        bottom: 0;
        right: 0;
        z-index: -1;
        position: fixed;
    }
}
</style>