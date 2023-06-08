<template>
    <div v-if="sender" class="invite-card flex flex-col items-start gap-2">
        <h1>TEAM INVITE</h1>
            <div class="flex flex-row gap-4 items-center w-full">
                <img :src="sender.osu.avatar" class="avatar">
                <span>{{ sender.osu.username }}</span>
                <div class="ml-auto flex gap-4 items-center justify-center">
                    <a class="accept-button flex items-center justify-center" @click="acceptInvite(sender)">
                        <i class="fa fa-check icon"></i>
                    </a>
                    <a class="decline-button flex items-center justify-center" @click="declineInvite(sender)">
                        <i class="fa fa-times icon"></i>
                    </a>
                </div>
            </div>
        <!--
        <div>|</div>
        <div>BWS #{{ Math.round(sender.osu.global_rank**(0.9937**(sender.osu.badges**2))) }}</div>
        <a class="accept-button" @click="acceptInvite(sender)">Accept</a>
        <a class="decline-button">Decline</a>
        -->
    </div>
</template>
  
<script setup lang="ts">
import type { UserInfo } from "../Interfaces/user";

defineProps<{
  sender: UserInfo
}>()

</script>

<script lang="ts">
export default {
    methods: {
        async acceptInvite(invite: UserInfo) {
            const response = await this.$http.post('/api/teams/invites/accept', {
                invite: { sender: invite.osu.userID }
            });

            if (response.data.error) {
                this.$toast.error(response.data.error);
            } else if (response.data.success) {
                this.$emit('inviteCallback');
                this.$toast.success(response.data.success);
            }
        },

        async declineInvite(invite: UserInfo) {
            const response = await this.$http.post('/api/teams/invites/decline', {
                invite: { sender: invite.osu.userID }
            });

            if (response.data.error) {
                this.$toast.error(response.data.error);
            } else if (response.data.success) {
                this.$emit('inviteCallback');
                this.$toast.success(response.data.success);
            }
        }
    }
}
</script>
  
<style scoped lang="scss">
.icon {
    font-size: 16px;
}

.invite-card {
    background-color: #462E2C;
    box-shadow: 0px 8px #F49089;
    padding: 5px 10px 10px 10px;
    border-radius: 5px;

    .avatar {
        height: 37px;
        background-color: rgb(46, 46, 46);
        border: 1px solid white;
    }

    i {
        transform: rotate(-45deg);
    }

    .accept-button {
        color: white;
        cursor: pointer;
        background-color: #6cdbc1;
        height: 24px;
        width: 24px;
        transform: rotate(45deg);

        box-shadow: 5px 5px white;
        

        &:hover{
            background-color: rgb(0, 155, 103);
        }
    }

    .decline-button {
        color: white;
        cursor: pointer;
        background-color: #F49089;
        height: 24px;
        width: 24px;
        transform: rotate(45deg);
        box-shadow: 5px 5px white;

        &:hover{
            background-color: rgb(185, 58, 58);
        }
    }

    h1 {
        font-size: 15px;
        font-style: italic;
        margin:0;
    }
    
    span {
        font-weight: 700;
        font-size: 24px;
    }
}
</style>
  