<template>
    <div class="text-center">
        <h1>Age Group</h1>
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

let ages = ref([
    {
        name: '15-25',
        clients: 0,
    },
    {
        name: '26-35',
        clients: 0,
    },
    {
        name: '36-45',
        clients: 0,
    },
    {
        name: '46-55',
        clients: 0,
    },
    {
        name: '56-65',
        clients: 0,
    },
    {
        name: '66 and Above',
        clients: 0,
    },
    {
        name: 'Age not indicated',
        clients: 0,
    },
]);

onMounted(async () => {
    try {
        const response = await axios.get('/api/getClientData');
        const ageCounts = response.data;

        ages.value.forEach((age) => {
            age.clients = ageCounts[age.name] || 0;
        });

        updateChart();
    } catch (error) {
        console.error('Failed to fetch age group counts:', error);
    }
});

const updateChart = () => {
    const data = {
        labels: ages.value.map((age) => age.name),
        datasets: [
            {
                label: 'Number of Clients',
                data: ages.value.map((age) => age.clients),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(209, 209, 209)',
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
  