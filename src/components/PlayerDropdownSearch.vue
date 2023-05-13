<template>
  <h>Invite a player</h>
  <div class="dropdown-search">
    <input v-model="searchQuery" type="text" @input="updateOptions" placeholder="Username or ID..." />
    <ul v-if="options.length > 0" class="dropdown-options">
      <li v-for="option in options" :key="option.osu?.userID" @click="selectOption(option)">
        <img :src="option.osu.avatar">
        {{ option.osu?.username }} | #{{ option.osu?.global_rank}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { UserInfo } from "@/Interfaces/user";
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      options: [] as UserInfo[],
      timeoutId: undefined as ReturnType<typeof setTimeout> | undefined,
    };
  },
  methods: {
    async invitePlayer(option: UserInfo) {
      const response = await this.$http.post('/api/teams/send-invite', {
        invitee: option.osu.userID
      });

      if (response.data.error) {
        this.$toast.error(response.data.error);
      } else if (response.data.success) {
        this.$toast.success(response.data.success);
      }
    },
    async selectOption(option: UserInfo) {
      this.searchQuery = option.osu.username;
      await this.invitePlayer(option);
      
    },
    async fetchOptions() {
      try {
        const response = await axios.get('/api/user/search', {
          params: {
            playerSearchQuery: this.searchQuery,
          },
        });
        this.options = response.data;
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },
    updateOptions() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.fetchOptions();
      }, 300); // Wait for 300 milliseconds before making the API call
    },
  },
};
</script>

<style scoped lang="scss">
.dropdown-search {
  position: relative;
  color: black;
  font-style: normal;

  input {
    width: 200px;
  }
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #fff;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  vertical-align: middle;

  width: auto; /* Set the width to occupy the full available space */
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    width: 200px;
    padding: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    overflow: hidden;

    img {
      width: 24px;
      border-radius: 50%;
    }

  }

}

.dropdown-options li:hover {
  background-color: #f2f2f2;
}
</style>
