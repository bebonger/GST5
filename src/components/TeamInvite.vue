<template>
    <div class="invite-card">
        <img :src="sender.osu.avatar" class="avatar">
        <div>{{ sender.osu.username }}</div>
        <div>|</div>
        <div>BWS #{{ Math.round(sender.osu.global_rank**(0.9937**(sender.osu.badges**2))) }}</div>
        <a class="accept-button" @click="acceptInvite(sender)">Accept</a>
        <a class="decline-button">Decline</a>
    </div>
</template>
  
<script setup lang="ts">
import type { UserInfo } from "../Interfaces/user";
import InvitesView from "../views/InvitesView.vue";
import axios from 'axios';

defineProps<{
  sender: UserInfo
}>()

</script>

<script lang="ts">
export default {
    methods: {
        async acceptInvite(invite: UserInfo) {
            const response = await this.$http.post('/api/teams/invites/accept', {
                invite: invite.osu.userID
            });

            if (response.data.error) {
                this.$toast.error(response.data.error);
            } else if (response.data.success) {
                this.$toast.success(response.data.success);
            }

            this.$emit('acceptInvite');
        }
    }
}
</script>
  
<style scoped lang="scss">
.invite-card {
    background-color: rgb(59, 59, 59);
    display: flex;
    padding: 10px;
    gap: 10px;
    vertical-align: middle;
    text-align: left;
    align-items: center;
    border-radius: 15px;

    .avatar {
        height: 32px;
        border-radius: 50%;
        background-color: rgb(46, 46, 46);
    }

    a,
    .accept-button {
        color: white;
        cursor: pointer;
        background-color: hsla(160, 100%, 37%, 1);
        padding: 5px;
        border-radius: 10px;
        margin-left: auto;

        &:hover{
            background-color: rgb(0, 155, 103);
        }
    }

    .decline-button {
        color: white;
        cursor: pointer;
        background-color: rgb(248, 79, 79);
        padding: 5px;
        border-radius: 10px;
        margin: 0;

        &:hover{
            background-color: rgb(185, 58, 58);
        }
    }
}
</style>
  