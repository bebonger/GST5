<script setup lang="ts">
</script>

<template>
    <div class="background-image">
        <img class="bg" src="../assets/images/Bg only lol.png">
        <img class="girl" src="../assets/images/No bg.png">
    </div>
</template>

<style scoped lang="scss">
.background-image {
    position: fixed;

    .bg {
        z-index: -2;
        min-width: 100%;
        object-fit: cover;
        position: fixed;
    }

.girl {  
        height: 1000px;  /* Set height to auto */
        bottom:0;
        right: 0;
        z-index: -1;
        position: fixed;
    }

    @media (min-width: 1024px) {
        .girl {  
            height: 80%;  /* Set height to auto */
            bottom:0;
            right: 0;
            z-index: -1;
            position: fixed;
        }
    }
}
</style>