<script setup lang="ts">
defineProps<{
    group: string,
    data: {
        teams: {
            A: string,
            B: string,
            C: string,
            D: string,
            E: string,
        },
        scores: {
            A: unknown[],
            B: unknown[],
            C: unknown[],
            D: unknown[],
            E: unknown[],
        },
    }
}>()
</script>

<script lang="ts">
export default {
    data() {
        return {

        }
    }
};
</script>

<template>
<div class="flex flex-row max-w-md w-full group truncate">
    <div class="h-full group-header flex items-center justify-center">
        <h1 class="vertical">GROUP {{group}}</h1>
    </div>
    <table class="w-full">
        <tr>
            <th>SEED</th>
            <th class="w-96 min-w-sm">TEAM NAME</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
        </tr>
        <tr>
            <td class="font-extrabold text-xl bg-[#849591]">A</td>
            <td class="truncate-text">{{ data.teams.A }}</td>
            <td><hr></td>
            <td :class="{'bg-[#61BEA8]' : data.scores.A[0] == 4, 'bg-[#D04747]' : data.scores.A[0] != null && data.scores.A[0] != 4}">{{ data.scores.A[0] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.A[1] == 4, 'bg-[#D04747]' : data.scores.A[1] != null && data.scores.A[1] != 4}">{{ data.scores.A[1] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.A[2] == 4, 'bg-[#D04747]' : data.scores.A[2] != null && data.scores.A[2] != 4}">{{ data.scores.A[2] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.A[3] == 4, 'bg-[#D04747]' : data.scores.A[3] != null && data.scores.A[3] != 4}">{{ data.scores.A[3] }}</td>
        </tr>
        <tr>
            <td class="font-extrabold text-xl bg-[#858495]">B</td>
            <td class="truncate-text">{{ data.teams.B }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.B[0] == 4, 'bg-[#D04747]' : data.scores.B[0] != null && data.scores.B[0] != 4 }">{{ data.scores.B[0] }}</td>
            <td><hr></td>
            <td :class="{'bg-[#61BEA8]' : data.scores.B[1] == 4, 'bg-[#D04747]' : data.scores.B[1] != null && data.scores.B[1] != 4}">{{ data.scores.B[1] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.B[2] == 4, 'bg-[#D04747]' : data.scores.B[2] != null && data.scores.B[2] != 4}">{{ data.scores.B[2] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.B[3] == 4, 'bg-[#D04747]' : data.scores.B[3] != null && data.scores.B[3] != 4}">{{ data.scores.B[3] }}</td>
        </tr>
        <tr>
            <td class="font-extrabold text-xl bg-[#95848E]">C</td>
            <td class="truncate-text">{{ data.teams.C }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.C[0] == 4, 'bg-[#D04747]' : data.scores.C[0] != null && data.scores.C[0] != 4}">{{ data.scores.C[0] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.C[1] == 4, 'bg-[#D04747]' : data.scores.C[1] != null && data.scores.C[1] != 4}">{{ data.scores.C[1] }}</td>
            <td><hr></td>
            <td :class="{'bg-[#61BEA8]' : data.scores.C[2] == 4, 'bg-[#D04747]' : data.scores.C[2] != null && data.scores.C[2] != 4}">{{ data.scores.C[2] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.C[3] == 4, 'bg-[#D04747]' : data.scores.C[3] != null && data.scores.C[3] != 4}">{{ data.scores.C[3] }}</td>
        </tr>
        <tr>
            <td class="font-extrabold text-xl bg-[#958A84]">D</td>
            <td class="truncate-text">{{ data.teams.D }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.D[0] == 4, 'bg-[#D04747]' : data.scores.D[0] != null && data.scores.D[0] != 4}">{{ data.scores.D[0] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.D[1] == 4, 'bg-[#D04747]' : data.scores.D[1] != null && data.scores.D[1] != 4}">{{ data.scores.D[1] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.D[2] == 4, 'bg-[#D04747]' : data.scores.D[2] != null && data.scores.D[2] != 4}">{{ data.scores.D[2] }}</td>
            <td><hr></td>
            <td :class="{'bg-[#61BEA8]' : data.scores.D[3] == 4, 'bg-[#D04747]' : data.scores.D[3] != null && data.scores.D[3] != 4}">{{ data.scores.D[3] }}</td>
        </tr>
        <tr>
            <td class="font-extrabold text-xl bg-[#A8A58D]">E</td>
            <td class="truncate-text">{{ data.teams.E }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.E[0] == 4, 'bg-[#D04747]' : data.scores.E[0] != null && data.scores.E[0] != 4}">{{ data.scores.E[0] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.E[1] == 4, 'bg-[#D04747]' : data.scores.E[1] != null && data.scores.E[1] != 4}">{{ data.scores.E[1] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.E[2] == 4, 'bg-[#D04747]' : data.scores.E[2] != null && data.scores.E[2] != 4}">{{ data.scores.E[2] }}</td>
            <td :class="{'bg-[#61BEA8]' : data.scores.E[3] == 4, 'bg-[#D04747]' : data.scores.E[3] != null && data.scores.E[3] != 4}">{{ data.scores.E[3] }}</td>
            <td><hr></td>
        </tr>
    </table>
</div>
</template>

<style scoped lang="scss">
.group {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.6);
}

hr {
    transform: rotate(-45deg) scaleX(2.1);
}

.vertical {
    transform: rotate(-90deg);
}

.group-header {
    background-color: #2E3335;
    font-size: 2rem;
    font-weight: 800;
    max-width: 3rem;
}

td {
    text-align: center;
}

th, td {
  border: 1px solid white;
  padding: 6px;
}

td {
    min-width: 2.5rem;
    height: 2rem;
}

th {
    border-top: 0px;
    background-color: #2E3335;
    font-size: 0.7rem;
    font-weight: 600;
}

th:last-of-type {
    border-right: 0px;
}

td:last-of-type {
    border-right: 0px;
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

@media (max-width: 768px) {
    .truncate-text {
        max-width: 0px; /* Set the desired max-width as the width decreases */
    }
}

</style>