<template>
  <h1 class="pl-10 mb-10 ">Summary Report</h1>
  <v-sheet width="54%" style="background-color: white; margin-left: 370px;" class="px-16 pt-5 mb-5 elevation-1">

    <v-row no-gutters>
      <v-col cols="1">
        <div class="my-5">Sort by:</div>
      </v-col>
      <v-col cols="3" class="mr-1">
        <v-combobox label="Month"
          :items="['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
          variant="solo" clearable v-model="sortByMonth">
        </v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox label="Year" v-model="sortByYear" :items="years" variant="solo" clearable>
        </v-combobox>
      </v-col>
      <!-- <v-col cols="2" class="mt-n2">
        <v-btn class="mt-3 ml-6" color="primary" @click="filterData" size="x-large">Filter</v-btn>
      </v-col> -->
      <v-col cols="2" class="mx-auto">
        <v-btn class="mt-3 ml-5" color="primary" @click="printSummary" size="x-large">Print</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
  <div style="margin-left: 20%; margin-right: 20%; margin-bottom: 50px;">
    <div class="main-container">
      <h4 class="mt-5 text-center">SUMMARY REPORT FOR FACE TO FACE TRANSACTION</h4>
      <h5 class="text-center">(Customer Feedback Form TESDA-OP-AS-03-F01)</h5>
      <h5 class="text-center">For the month of {{ sortByMonth }} {{ sortByYear }}</h5>
      <table class="summary-table">
        <thead>
          <tr>
            <th class="text-left" colspan="2">A. Total Number of Clients Served by Sex</th>
          </tr>
          <tr>
            <th>Gender</th>
            <th>No. of Clients</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center divider">Male</td>
            <td class="text-center">{{ count.countMale(clients) }}</td>
          </tr>
          <tr>
            <td class="text-center divider">Female</td>
            <td class="text-center">{{ count.countFemale(clients) }}</td>
          </tr>
          <tr>
            <th class="text-center divider">Total</th>
            <td class="text-center">{{ count.getTotalSexes(clients) }}</td>
          </tr>
        </tbody>
      </table>
      <table class="summary-table">
        <thead>
          <tr>
            <th class="text-left" colspan="2">B. Distribution of Clients Served by Age Group</th>
          </tr>
          <tr>
            <th>Age Group</th>
            <th>No. of Clients</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="age in ages" :key="age.name">
            <td class="text-center divider">{{ age.name }}</td>
            <td class="text-center">{{ age.clients }}</td>
          </tr>
          <tr>
            <th class="text-center divider">
              Total
            </th>
            <td class="text-center">{{ getTotalAges }}</td>
          </tr>
        </tbody>
      </table>
      <table class="summary-table">
        <thead>
          <tr>
            <th class="text-left" colspan="2">C. Total Number of Clients by Reason of Visit</th>
          </tr>
          <tr>
            <th>Reason for Visit</th>
            <th>No. of Clients</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reason in reasons" :key="reason.name">
            <td class="text-center divider">{{ reason.name }}</td>
            <td class="text-center">{{ reason.clients }}</td>
          </tr>
          <tr>
            <th class="text-center divider">
              Total
            </th>
            <td class="text-center">{{ getTotalReasons }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <table class="summary-table">
        <thead>
          <tr>
            <th class="text-left">D. Action Provided Relative to Purpose of Visit </th>
            <th></th>
          </tr>
          <tr>
            <th>Action Provided</th>
            <th>No. of Clients</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="action in count.actions" :key="action.name">
            <td class="divider">{{ count.getTotalActions(clients) }}</td>
            <td class="text-center">{{ action.clients }}</td>
          </tr>
          <tr>
            <th class="text-center divider">
              Total
            </th>
            <td class="text-center">{{ getTotalActions }}</td>
          </tr>
        </tbody>
      </table> -->
      <table class="summary-table">
        <thead>
          <tr>
            <th class="text-left" colspan="5">D. Drivers of Satisfaction</th>
          </tr>
          <tr>
            <th>Other Areas Rated</th>
            <th>VS</th>
            <th>S</th>
            <th>P</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(feedback, index) in count.feedbacks" :key="feedback.id">
            <td class="divider">{{ feedback.id }}. {{ feedback.question }}</td>
            <td class="text-center">{{ count.getRating(clients, feedback.id, 1) }}</td>
            <td class="text-center">{{ count.getRating(clients, feedback.id, 0) }}</td>
            <td class="text-center">{{ count.getRating(clients, feedback.id, -1) }}</td>
            <td class="text-center">{{ count.getTotalFeedbacks(clients, feedback.id) }}</td>
          </tr>
        </tbody>
      </table>
      <table class="summary-table">
        <thead>
          <tr>
            <th class="text-left" colspan="5">E. Overall Rating</th>
          </tr>
        </thead>
        <tr>
          <th colspan="4">Would you recommend TESDA to you relatives and friends?</th>
        </tr>
        <tr class="text-center">
          <td>Yes</td>
          <td>No</td>
          <td>No Answer</td>
          <td style="font-weight: bold;">Total</td>
        </tr>
        <tr>
          <td class="text-center"> {{ count.countYes(clients) }}</td>
          <td class="text-center">{{ count.countNo(clients) }}</td>
          <td class="text-center">{{ count.countNoAnswer(clients) }}</td>
          <td class="text-center">{{ count.getTotalReco(clients) }}</td>
        </tr>
      </table>

      <table class="mt-16">
        <tr>
          <td>Prepared by:</td>
          <td style="padding-left: 100px;">Noted by:</td>
        </tr>
        <tr>
          <td class="text-center" style="padding-top: 50px; padding-left: 100px;">JASMINNE N. OMALZA </td>
          <td class="text-center" style="padding-top: 50px; padding-left: 100px;">ENGR. CONSTANTINO B. PANES, Jr. Ed.D
          </td>
        </tr>
        <tr>
          <td class="text-center" style="padding-left: 100px;">TESD Specialist II</td>
          <td class="text-center" style="padding-left: 100px;">Center Administrator</td>
        </tr>
        <tr>
          <td class="text-center" style="padding-left: 100px;">Customer Satisfaction Focal</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import count from '@/helpers/count';

const sortByMonth = ref('');
const sortByYear = ref('');
function filterData() {

}


const years = computed(() => {
  const year = new Date().getFullYear();
  return Array.from({ length: year - 1900 }, (_, index) => 1901 + index);
});

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



const getTotalReasons = computed(() => {
  let total = 0;
  for (let reason of reasons.value) {
    total += reason.clients;
  }
  return total;
});


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
])

const getTotalAges = computed(() => {
  let total = 0;
  for (let age of ages.value) {
    total += age.clients;
  }
  return total;
});

let actions = ref([
  {
    name: '',
    clients: '',
  },
]);

const getTotalActions = computed(() => {
  let total = 0;
  for (let action of actions.value) {
    total += action.clients;
  }
  return total;
});

let clients = ref([]);
onMounted(async () => {
  const response = await axios.get('/api/getclients');
  clients.value = response.data;
  console.log(clients.value);
  try {
    const response = await axios.get('/api/getClientData');
    const { assessmentCount, registrarCount, trainingCount, othersCount } = response.data;

    reasons.value[0].clients = assessmentCount;
    reasons.value[1].clients = registrarCount;
    reasons.value[2].clients = trainingCount;
    reasons.value[3].clients = othersCount;
    const ageCounts = response.data;

    ages.value.forEach((age) => {
      age.clients = ageCounts[age.name] || 0;
    });
  } catch (error) {
    //   console.error('Failed to fetch age group counts:', error);
  }
});

function printSummary() {
  const printContent = document.querySelector('.main-container');
  const originalContents = document.body.innerHTML;
  const printElement = printContent.cloneNode(true);

  document.body.innerHTML = '';
  document.body.appendChild(printElement);

  const printStyle = document.createElement('style');
  printStyle.innerHTML = `
    @media print {
      .main-container {
        width: 100%;
        border: none;

      }
      body {
        padding: 0;
        margin: 0;
      }
      @page {
        size: auto;
        margin: 0mm;
        margin-left: auto;
      }
    }
  `;
  document.head.appendChild(printStyle);

  window.print();
  document.body.innerHTML = originalContents;
  setTimeout(() => {
    document.body.innerHTML = originalContents;
    location.reload();
  }, 50);
}



</script>

<style scoped>
.main-container {
  align-items: center;
  margin: auto;
}

.print-button {
  margin-bottom: 1rem;
}

.summary-table {
  width: 90%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.summary-table th,
.summary-table td {
  border: 1px solid #ccc;
  padding: 0.02rem 0.1rem;
}
</style>
