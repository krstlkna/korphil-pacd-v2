<template>
    <div class="text-center">
        <h1>Gender Group</h1>
        <div>
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

const instance = getCurrentInstance();

let clients = [];

const fetchData = async () => {
    try {
        const response = await axios.get('/api/getclients');
        clients = response.data;
        createChart();
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};

const countMale = (clients) => {
    let maleCount = 0;
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].sex == 'Male') {
            maleCount++;
        }
    }
    return maleCount;
};

const countFemale = (clients) => {
    let femaleCount = 0;
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].sex == 'Female') {
            femaleCount++;
        }
    }
    return femaleCount;
};

const createChart = () => {
    const data = {
        labels: ['Female', 'Male'],
        datasets: [{
            label: 'Number of Clients',
            data: [countMale(clients), countFemale(clients)],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };

    const chart = new Chart(instance.refs.chartCanvas, config);
    return chart;
};

onMounted(() => {
    fetchData();
});


</script>
