<script setup lang="ts">
</script>

<template>
    <div class="background-image">
        <div class="bg">
            <img src="../assets/images/BG.png">
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
    position: fixed; 
    top: -50%; 
    left: -50%; 
    width: 200%; 
    height: 200%;
}
.bg img {
    object-fit: cover;
    z-index: -2;
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    margin: auto; 
    min-width: 50%;
    min-height: 50%;
}

@media (max-width: 64rem) {

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

@media (min-width: 64rem) {
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