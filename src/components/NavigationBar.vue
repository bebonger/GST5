<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useUserDataStore } from '../stores/userData';
</script>

<script lang="ts">
import UserInfoComponent from './UserInfoComponent.vue';
import InvitePanelComponent from './InvitePanelComponent.vue';

export default {
    components: { UserInfoComponent, InvitePanelComponent },
    data() {
        return {
            notification: false,
            mobile: false,
            mobileNav: false,
            windowWidth: 0,

            notifsAvailable: false
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods: {
        getInvitePanelInterface(invitePanelInterface: any) {
          this.$options.invitePanelInterface = invitePanelInterface;
        },

        async toggleNotificationBox() {
            this.notification = !this.notification;
            this.mobileNav = false;

            if (this.notification)
                await this.$options.invitePanelInterface.asyncfetchData();
        },

        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
            this.notification = false;
        },

        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 1024) {
                this.mobile = true;
                return;
            }

            this.mobile = false;
            this.mobileNav = false;
            return;
        },

        updateNotifIcon(numInvites: number) {
            this.notifsAvailable =  numInvites > 0;
        }
    }
}
</script>

<template>
    <header>
        <nav v-if="!mobile" class="flex flex-row w-full h-full items-center overflow-h">
            <RouterLink class="logo" :to="{name: 'home'}"><svg class="ml-16" width="206" height="32" viewBox="0 0 206 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.54834 31.1206V0.117493H46.2647V6.46626H17.3726V24.7719H30.8637V18.0528H23.4568V13.0266H46.2594V31.1206H0.54834Z" fill="white"/>
            <path d="M52.522 31.1206V24.7719H80.8269V18.5818H52.522V0.117493H97.6511V6.46626H69.3991V12.6563H97.6511V31.1206H52.522Z" fill="white"/>
            <path d="M160.657 31.2734V24.9246H188.962V18.7346H160.657V0.270264H205.786V6.61903H177.534V12.8091H205.786V31.2734H160.657Z" fill="white"/>
            <path d="M137.61 6.46626V31.1206H120.785V6.46626H103.908V0.117493H154.439V6.46626H137.615H137.61Z" fill="white"/>
            </svg></RouterLink>

            <ul class="flex items-center pl-16">
                <li><RouterLink class="link" :to="{name: 'info'}">INFORMATION</RouterLink></li>
                <li><RouterLink class="link" :to="{name: 'teams'}">TEAMS</RouterLink></li>
                <li><RouterLink class="link" :to="{name: 'mappool'}">MAPPOOL</RouterLink></li>
                <li><RouterLink class="link" :to="{name: 'schedules'}">SCHEDULES</RouterLink></li>
                <li v-if="useUserDataStore().IsAdmin"><RouterLink class="link" :to="{name: 'admin'}">ADMIN</RouterLink></li>
            </ul>
            <div class="flex ml-auto justify-center items-center">
                <div class="flex justify-center items-center">
                    <i v-if="false" @click="toggleNotificationBox" class="flex items-center justify-center notif-icon">
                        <p class="text-sm p-2 font-bold normal">INVITE</p>
                        <i v-if="notifsAvailable" class="notif-icon-indicator"></i>
                    </i>
                    <div v-show="false" class="fixed flex justify-center notification-box-wrapper">
                        <InvitePanelComponent @interface="getInvitePanelInterface" :mobile="false" @data-fetched="updateNotifIcon"/>
                    </div>
                </div>
                <UserInfoComponent class="ml-16"/>
            </div>
        </nav>
        <nav v-else class="flex flex-row w-full h-full items-center">
            <i @click="toggleMobileNav" class="flex items-center absolute fa bars-icon" :class="{'fa-bars' : !mobileNav, 'fa-times' : mobileNav }"></i>
            <transition name="mobile-nav">
                <ul v-show="mobileNav" class="flex-column w-full items-center justify-center fixed">
                    <li class="flex items-center"><RouterLink class="link" :to="{name: 'home'}">HOME</RouterLink></li>
                    <li class="flex items-center"><RouterLink class="link" :to="{name: 'info'}">INFO</RouterLink></li>
                    <li class="flex items-center"><RouterLink class="link" :to="{name: 'teams'}">TEAMS</RouterLink></li>
                    <li class="flex items-center w-full overflow-h justify-center"><UserInfoComponent/></li>
                </ul>
            </transition>
            <i v-if="false" @click="toggleNotificationBox" class="flex items-center justify-center notif-icon">
                <p class="text-sm p-2 font-bold normal">INVITE</p>
                <i v-if="notifsAvailable" class="notif-icon-indicator"></i>
            </i>
        </nav>
    </header>

    <div v-show="false" class="fixed flex justify-center w-full h-full notification-box-wrapper">
        <InvitePanelComponent @interface="getInvitePanelInterface" :mobile="true" @data-fetched="updateNotifIcon"/>
    </div>
</template>

<style scoped lang="scss">

.bars-icon {
    font-size: 24px;
    left: 24px;
}

.icon-active {
}

.logo {
    &:hover {
        background-color: transparent;
    }
}

header {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    width: 100%;
    height: 85px;
    position: fixed;
    color: #fff;
    padding: 0px;
    /*
    border-color: white;
    border-bottom-style: solid;
    border-width: 1px;
    */
    backdrop-filter: blur(30px);

    nav {

        a.router-link-exact-active {
            color:white;
            border-color:white;
        }

    }
    
    ul, 
    .link {
        font-weight: 700;
        color: #fff;
        list-style:none;
        text-decoration: none;
    }

    li {
        padding: 0px 16px;
        margin: left;
        height: 100%;
    }

    .link {
        letter-spacing: 3px;
        font-size: 1rem;
        transition: .25s ease all;
        padding: 10px 16px;
        border-bottom: 2px solid transparent;
    }

    .link:hover {
        color: white;
        border-color:white;
        background-color: transparent;
    }

    .notif-icon {
        font-size:24px;
        height: 32px;
        background-color: #F49089;
        border-radius: 5px;
        transition: 0.1s ease all;

        .notif-icon-indicator {
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: rgb(255, 78, 78);
            border-radius: 50%;
            top: -4px;
            right: -4px;
        }

        &:hover {
            cursor: pointer;

            background-color: #d37c76;
        }
    }
    

    .notification-box-wrapper {
        z-index: 100;
        transform: translateY(28px);
    }

}

@media (max-width: 64rem) {
    
    ul {
        padding: 0px;
        top: 60px;
        background-color: rgba(0, 0, 0, 1);

        li {
            height: 60px;
        }
    }

    header {
        height: 60px;
    }

    .notification-box-wrapper {
        z-index: 99;
        position: fixed;
        margin-top: 60px;
        height: calc(100% - 60px);
    }

    .notif-icon {
        position: fixed;
        right: 12px;
    }
}

</style>