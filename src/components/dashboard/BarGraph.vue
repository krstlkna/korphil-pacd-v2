<template>
    <h1 class="subtitle-1">Statistical View</h1>
    <div>
        <canvas id="myChart"></canvas>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import Chart from 'chart.js/auto';
import { ref, onMounted } from 'vue';

let feedbacks = ref([
    {
        id: 1,
        question: 'Mabilis na serbisyo',
        rating: 1,
        page: 2,
    },
    {
        id: 2,
        question: 'Mahusay at may malakasakit na serbisyo',
        rating: 1,
        page: 3,
    },
    {
        id: 3,
        question: 'Magalang at tapat na serbisyo',
        rating: 1,
        page: 4,
    },
    {
        id: 4,
        question: 'Malinis at Maayos na tanggapan',
        rating: 1,
        page: 5,
    },
    {
        id: 5,
        question: 'Mapagkatiwalaan na serbisyo',
        rating: 1,
        page: 6,
    },
    {
        id: 6,
        question: 'Abot ang Lahat ang serbisyo ng TESDA',
        rating: 1,
        page: 7,
    },
    {
        id: 7,
        question: 'Kabuuang antas ng kasiyahan sa serbisyong natanggap',
        rating: 1,
        page: 8,
    },
]);

function getRating(clients, questionId, rating) {
    let total = 0;
    for (let i = 0; i < clients.length; i++) {
        let client = clients[i];
        let clientFeedbacks = client.feedbacks;
        for (let j = 0; j < clientFeedbacks.length; j++) {
            let feedback = clientFeedbacks[j];
            if (feedback.id == questionId && feedback.rating == rating) {
                total++;
            }
        }
    }
    return total;
}

function getVsTotal(clients, questionId) {
    let vsTotal = getRating(clients, questionId, 1);
    let total = + vsTotal;
    return total;
}
function getSTotal(clients, questionId) {
    let sTotal = getRating(clients, questionId, 0);
    let total = + sTotal;
    return total;
}
function getPTotal(clients, questionId) {
    let pTotal = getRating(clients, questionId, -1);
    let total = + pTotal;
    return total;
}

onMounted(async () => {
    const ctx = document.getElementById('myChart');
    const response = await axios.get('/api/getclients');
    const clients = ref(response.data);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Very Satisfactory', 'Satisfactory', 'Poor'],
            datasets: [
                {
                    label: 'Number of Feedback',
                    data: [
                        getVsTotal(clients.value, feedbacks.value[6].id),
                        getSTotal(clients.value, feedbacks.value[6].id),
                        getPTotal(clients.value, feedbacks.value[6].id),
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    console.log(clients.value);
});
</script>
  