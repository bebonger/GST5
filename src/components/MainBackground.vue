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

    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;

}
</style>