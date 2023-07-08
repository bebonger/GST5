<script setup lang="ts">
import type { MatchInfo } from '@/Interfaces/bracket';

defineProps<{
    schedules: MatchInfo[]
}>();
</script>

<script lang="ts">
export default {
    methods: {
        getDateString(date: string): string {
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const dateObject = new Date(date);
            if (dateObject === undefined) return "";

            const dayOfWeek = daysOfWeek[dateObject.getDay()];
            const dateOfMonth = dateObject.getDate();
            const monthOfYear = monthsOfYear[dateObject.getMonth()];

            const formattedDate = `${dateOfMonth} ${monthOfYear} (${dayOfWeek})`;
            return formattedDate;
        },
        getTimeString(dateString: string): string {
            const date = new Date(dateString);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            return timeString;
        }
    }
}
</script>

<template>
    <div class="group-schedule w-full truncate rounded-lg">
        <table class="w-full">
            <tr>
                <th class="w-[7%] truncate-text">ID</th>
                <th class="w-[15%] truncate-text">DATE</th>
                <th class="w-[10%] truncate-text">TIME</th>
                <th>RED TEAM</th>
                <th>SCORE</th>
                <th>BLUE TEAM</th>
                <th>REFEREE</th>
                <th>
                    <svg class="block m-auto" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.85184 6.86829C7.70218 6.86829 7.55252 6.80415 7.42424 6.69725C7.18907 6.46207 7.18907 6.09862 7.42424 5.86344L9.32705 3.96063C9.96845 3.31923 9.96845 2.29299 9.32705 1.6516C8.68566 1.0102 7.65942 1.0102 7.01803 1.6516L5.22211 3.44751C4.98694 3.68269 4.62348 3.68269 4.3883 3.44751C4.15312 3.21233 4.15312 2.84887 4.3883 2.61369L6.18421 0.817781C7.27458 -0.272594 9.0705 -0.272594 10.1823 0.817781C11.2726 1.90816 11.2726 3.70407 10.1823 4.81582L8.27944 6.71863C8.17254 6.82553 8.0015 6.86829 7.85184 6.86829Z" fill="white"/>
                    <path d="M2.80611 11.016C2.05782 11.016 1.35228 10.7167 0.817781 10.1822C-0.272594 9.09184 -0.272594 7.29593 0.817781 6.18418L2.72059 4.28136C2.95577 4.04619 3.31923 4.04619 3.55441 4.28136C3.78959 4.51654 3.78959 4.88 3.55441 5.11518L1.6516 7.01799C1.0102 7.65939 1.0102 8.68562 1.6516 9.32702C2.27161 9.94704 3.34061 9.94704 3.96063 9.32702L5.77792 7.50973C6.0131 7.27455 6.37656 7.27455 6.61173 7.50973C6.84691 7.74491 6.84691 8.10837 6.61173 8.34355L4.79444 10.1608C4.25995 10.7167 3.55441 11.016 2.80611 11.016Z" fill="white"/>
                    <path d="M3.72556 7.85182C3.5759 7.85182 3.42625 7.78768 3.29797 7.68078C3.06279 7.4456 3.06279 7.08214 3.29797 6.84696L6.91117 3.23376C7.14635 2.99858 7.50981 2.99858 7.74499 3.23376C7.98016 3.46894 7.98016 3.83239 7.74499 4.06757L4.15316 7.68078C4.04626 7.78768 3.8966 7.85182 3.72556 7.85182Z" fill="white"/>
                    </svg>
                </th>
            </tr>
            <tr v-for="schedule in schedules" :key="schedule.matchID">
                <td class="truncate-text">{{ schedule.matchID }}</td>
                <td class="truncate-text">{{ schedule.schedule != null ? schedule.schedule.date : "" }}</td>
                <td class="truncate-text">{{ schedule.schedule != null ? schedule.schedule.time : "" }}</td>
                <td class="truncate-text">{{ schedule.redTeam.name }}</td>
                <td class="w-[1%]">{{ schedule.result.redTeamScore }} - {{ schedule.result.blueTeamScore }}</td>
                <td class="truncate-text">{{ schedule.blueTeam.name }}</td>
                <td class="truncate-text">{{ schedule.referee }}</td>
                <td class="w-[4%]"><a v-if="schedule.mp_link" :href="schedule.mp_link"><svg class="block m-auto" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.85184 6.86829C7.70218 6.86829 7.55252 6.80415 7.42424 6.69725C7.18907 6.46207 7.18907 6.09862 7.42424 5.86344L9.32705 3.96063C9.96845 3.31923 9.96845 2.29299 9.32705 1.6516C8.68566 1.0102 7.65942 1.0102 7.01803 1.6516L5.22211 3.44751C4.98694 3.68269 4.62348 3.68269 4.3883 3.44751C4.15312 3.21233 4.15312 2.84887 4.3883 2.61369L6.18421 0.817781C7.27458 -0.272594 9.0705 -0.272594 10.1823 0.817781C11.2726 1.90816 11.2726 3.70407 10.1823 4.81582L8.27944 6.71863C8.17254 6.82553 8.0015 6.86829 7.85184 6.86829Z" fill="white"/>
                    <path d="M2.80611 11.016C2.05782 11.016 1.35228 10.7167 0.817781 10.1822C-0.272594 9.09184 -0.272594 7.29593 0.817781 6.18418L2.72059 4.28136C2.95577 4.04619 3.31923 4.04619 3.55441 4.28136C3.78959 4.51654 3.78959 4.88 3.55441 5.11518L1.6516 7.01799C1.0102 7.65939 1.0102 8.68562 1.6516 9.32702C2.27161 9.94704 3.34061 9.94704 3.96063 9.32702L5.77792 7.50973C6.0131 7.27455 6.37656 7.27455 6.61173 7.50973C6.84691 7.74491 6.84691 8.10837 6.61173 8.34355L4.79444 10.1608C4.25995 10.7167 3.55441 11.016 2.80611 11.016Z" fill="white"/>
                    <path d="M3.72556 7.85182C3.5759 7.85182 3.42625 7.78768 3.29797 7.68078C3.06279 7.4456 3.06279 7.08214 3.29797 6.84696L6.91117 3.23376C7.14635 2.99858 7.50981 2.99858 7.74499 3.23376C7.98016 3.46894 7.98016 3.83239 7.74499 4.06757L4.15316 7.68078C4.04626 7.78768 3.8966 7.85182 3.72556 7.85182Z" fill="white"/>
                    </svg></a>
                </td>
            </tr>
        </table>
        <div >
            
        </div>
    </div>
</template>

<style scoped lang="scss">
.table-block {

}

.group-schedule {
    background-color: rgba(0, 0, 0, 0.57);
}

.match-info {
    background-color: #798783;
}

th {
    font-size: 10px;
}

th, td {
  border: 1px solid white;
  padding: 6px;
}

td {
    height: 2rem;
    text-align: center;
}

th {
    border-top: 0px;
    background-color: #2E3335;
    font-size: 0.7rem;
    font-weight: 600;
}

th:first-of-type {
    border-left: 0px;
}

td:first-of-type {
    border-left: 0px;
    background-color: #798783;
}


th:last-of-type {
    border-right: 0px;
}

td:last-of-type {
    border-right: 0px;
    background-color: #243632;
}

tr:last-child td {
    border-bottom: 0px;
}

.truncate-text {
    max-width: 100%; /* Set the initial max-width to 100% */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

@media (max-width: 64rem) {
    .truncate-text {
        max-width: 0px; /* Set the desired max-width as the width decreases */
    }
}

</style>