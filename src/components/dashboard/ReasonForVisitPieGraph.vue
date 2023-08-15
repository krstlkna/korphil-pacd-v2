<template>
    <div class="text-center">
        <h1>Reason For Visit</h1>
        <div>
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>
  
<script setup>
import { getCurrentInstance, onMounted, onBeforeUnmount, ref } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

const instance = getCurrentInstance();

let reasons = ref([
    {
        name: 'Assessment & Certification',
        clients: '',
    },
    {
        name: 'Registrar',
        clients: '',
    },
    {
        name: 'Training',
        clients: '',
    },
    {
        name: 'Others (Procurement, Finance and Admin, Scholarship)',
        clients: '',
    },
])

onMounted(async () => {
    try {
        const response = await axios.get('/api/getClientData');
        const { assessmentCount, registrarCount, trainingCount, othersCount } = response.data;

        reasons.value[0].clients = assessmentCount;
        reasons.value[1].clients = registrarCount;
        reasons.value[2].clients = trainingCount;
        reasons.value[3].clients = othersCount;

        updateChart();
    } catch (error) {
        console.error('Failed to fetch age group counts:', error);
    }
});

const updateChart = () => {
    const data = {
        labels: reasons.value.map((reason) => reason.name),
        datasets: [
            {
                label: 'Number of Clients',
                data: reasons.value.map((reason) => reason.clients),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
                hoverOffset: 4,
            },
        ],
    };

    if (chart) {
        chart.data = data;
        chart.update();
    } else {
        const config = {
            type: 'pie',
            data: data,
        };
        chart = new Chart(instance.refs.chartCanvas, config);
    }
};

let chart;

onBeforeUnmount(() => {
    if (chart) {
        chart.destroy();
    }
});
</script>
  