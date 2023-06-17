<script setup lang="ts">
import { useUserDataStore } from "../stores/userData";
</script>

<script lang="ts">
export default {
    methods: {
        async refreshUsers() {
            const res = await this.$http.post("/api/admin/user/refresh");
            console.log(res);
        }
    }
}
</script>

<template>
    <main v-if="useUserDataStore().IsAdmin">
        <button @click="refreshUsers">Refresh Users</button>
    </main>
</template>