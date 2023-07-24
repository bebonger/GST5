<script setup lang="ts">
import { MatchStage } from '@/Interfaces/bracket';

defineProps<{
    stats: [],

}>();
</script>

<script lang="ts">
export default {
    data() {
        return {
            poolStructure: {
                GS: ["NM1", "NM2", "NM3", "NM4", "HD1", "HD2", "HR1", "HR2", "DT1", "DT2", "FM1", "FM2", "TB" ],
                RO16: ["NM1", "NM2", "NM3", "NM4", "NM5", "HD1", "HD2", "HR1", "HR2", "DT1", "DT2", "DT3", "FM1", "FM2", "TB" ],
                QF: ["NM1", "NM2", "NM3", "NM4", "NM5", "HD1", "HD2", "HD3", "HR1", "HR2", "HR3", "DT1", "DT2", "DT3", "FM1", "FM2", "FM3", "TB" ],
                SF: ["NM1", "NM2", "NM3", "NM4", "NM5", "HD1", "HD2", "HD3", "HR1", "HR2", "HR3", "DT1", "DT2", "DT3", "FM1", "FM2", "FM3", "TB" ],
                F: ["NM1", "NM2", "NM3", "NM4", "NM5", "NM6", "HD1", "HD2", "HD3", "HR1", "HR2", "HR3", "DT1", "DT2", "DT3", "DT4", "FM1", "FM2", "FM3", "TB" ],
                GF: ["NM1", "NM2", "NM3", "NM4", "NM5", "NM6", "HD1", "HD2", "HD3", "HR1", "HR2", "HR3", "DT1", "DT2", "DT3", "DT4", "FM1", "FM2", "FM3", "TB" ],
            }
        }
    }
}
</script>

<template>
<div>
    <table>
    </table>
</div>
</template>

<style scoped lang="scss">
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
</style>