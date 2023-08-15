<template>
    <v-row>
        <v-col>
            <v-layout>
                <v-app-bar :elevation="0" color="primary" height="120" class="px-16">
                    <template v-slot:prepend>
                        <v-avatar size="80">
                            <v-img src="@/assets/rtc1.png"> </v-img>
                        </v-avatar>
                    </template>
                    <template v-slot:append>
                        <v-breadcrumbs :items="items" style="margin-left:auto; color: white">
                            <template v-slot:divider>
                            </template>

                        </v-breadcrumbs>
                        <v-menu :close-on-content-click="false" transition="scale-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" icon="mdi-account-outline">
                                </v-btn>
                            </template>

                            <v-form @submit.prevent="app.login()">

                                <v-sheet min-width="300">
                                    <v-card-title style="display: flex; justify-content: center;">
                                        <v-icon icon="mdi-account-outline" size="x-large" />

                                    </v-card-title>
                                    <v-card-title style="display: flex; justify-content: center;">Login as
                                        Admin</v-card-title>
                                    <v-list>

                                        <v-list>
                                            <v-list-item>
                                                <v-text-field label="Username"
                                                    v-model="app.credentials.email"></v-text-field>
                                            </v-list-item>

                                            <v-list-item>
                                                <v-text-field label="Password" v-model="app.credentials.password"
                                                    type="password"></v-text-field>
                                            </v-list-item>
                                        </v-list>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn variant="text" @click="menu = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn color="primary" variant="text" type="submit">
                                                Login
                                            </v-btn>
                                        </v-card-actions>
                                    </v-list>
                                </v-sheet>
                            </v-form>
                        </v-menu>
                        <v-menu open-on-hover>
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" size="large" style="background-color: white; color: #2C96F8">
                                    Feedback
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item>
                                    <v-list-item-title><v-btn to="/dasboard" variant="plain">Walk-in
                                            Form</v-btn></v-list-item-title>
                                    <v-list-item-title><v-btn to="/dasboard" variant="plain">Assessment
                                            Form</v-btn></v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                </v-app-bar>
            </v-layout>
            <v-carousel hide-delimiters cycle height="100vh" class="mb-n10" :show-arrows="false" overflow="hidden"
                style=" width:100%; top:0;">
                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>
            </v-carousel>
        </v-col>
        <v-col style="display: flex; flex-direction: column; justify-content: center;" class="my-auto">
            <h1 class="mb-5 mt-16 mx-auto">Customer Feedback Form
            </h1>
            <v-btn class="text-capitalize elevation-0 mt-2 border-button" to="/walkinfeedback"
                prepend-icon="mdi-arrow-left-circle">Go to Walkin Feedback Form</v-btn>
            <v-tabs v-model="tab" variant="outlined" class="elevation-0">
                <v-tab value="assessment">Assessment Form</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="page">
                    <v-window-item :value="1" v-model="page">
                        <v-sheet class="mb-10" style="display: flex; flex-direction: column; justify-content: center;"
                            border rounded height="420">
                            <v-form class="ml-15 mt-5">
                                <v-row>
                                    <v-col cols="7">
                                        <v-text-field label="Pangalan(Optional)" variant="outlined"
                                            v-model="assessmentItem.name"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field label="Edad" variant="outlined" type="number"
                                            v-model="assessmentItem.age"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-select clearable label="Kasarian" :items="['Lalaki', 'Babae']" variant="outlined"
                                            v-model="assessmentItem.sex">
                                        </v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="5">
                                        <v-text-field label="Kurso/Taon" variant="outlined"
                                            v-model="assessmentItem.course_year"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="Qualification" variant="outlined"
                                            v-model="assessmentItem.qualification"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="11">
                                        <v-text-field label="Paaralan/Institusyon" variant="outlined"
                                            v-model="assessmentItem.school"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="8">
                                        <v-text-field label="Tirahan/Tanggapan" variant="outlined"
                                            v-model="assessmentItem.address"></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field label="Action/Service" variant="outlined"
                                            v-model="assessmentItem.actionprovided"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                </v-row>
                            </v-form>
                        </v-sheet>
                    </v-window-item>
                    <v-window-item v-for="(feedback, index) in assessmentItem.feedbacks" :value="feedback.page"
                        v-model="page">
                        <v-sheet class="mb-10" style="display: flex; flex-direction: column; justify-content: center;"
                            border rounded height="400">
                            <div class="text-center">
                                <h1>{{ feedback.question }}</h1>
                                <FeedbackRating v-model="feedback.rating" color="primary"></FeedbackRating>
                            </div>
                        </v-sheet>
                    </v-window-item>
                    <v-window-item :value="9" v-model="page">
                        <v-sheet class="mb-10" style="display: flex; flex-direction: column; justify-content: center;"
                            border rounded height="400">
                            <div class="my-auto">
                                <h1 class="text-center">Irerekomenda nyo po na ang TESDA sa inyong kamag-anak at kaibigan?
                                </h1>
                                <v-radio-group v-model="assessmentItem.reco" inline
                                    style="display: flex; justify-content: center;">
                                    <v-radio label="Yes" value="1"></v-radio>
                                    <v-radio label="No" value="0"></v-radio>
                                </v-radio-group>

                            </div>
                        </v-sheet>
                        <div style="margin-left: 45%">
                            <v-btn v-if="page == 9" @click="dialog = true" color="primary">Submit</v-btn>
                        </div>
                    </v-window-item>

                </v-window>
                <v-pagination v-model="page" :length="9" class="hide-numbers" next-icon="mdi-chevron-right"
                    prev-icon="mdi-chevron-left">
                </v-pagination>
            </v-card-text>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent width="auto">
        <v-form @submit.prevent="saveAssessment()">
            <v-card height="450" width="400">
                <v-icon>mdi-information-variant-box</v-icon>
                <v-card-title class="text-h5 mb-10 mt-5 ma-5">
                    PACD Survey Consent Form
                </v-card-title>

                <v-checkbox-btn v-model="enabled" class="pe-2 mt-10 ma-5">
                    <template v-slot:label>
                        Ang mga impormasyon na aking inilahad sa form na ito ay tama at totoo. Boluntaryo kong
                        pinagkaloob ang mga hinihinging impormasyon ng
                        form na ito. Pinapayagan ko ang TESDA na isama sa kanilang database bilang bahagi ng
                        kanilang records at monitoring ang mga detalyeng ito.
                    </template>
                </v-checkbox-btn>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                        Disagree
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" type="submit" :disabled="!enabled">
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}

        <template v-slot:actions>
            <v-btn color="blue" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script setup>
import FeedbackRating from '@/layouts/comps/FeedbackRating.vue';
import { useAppStore } from '@/stores/app';
import axios from 'axios';
import { ref } from 'vue';
import count from '@/helpers/count';
import router from '@/router';

let enabled = ref(false)
let dialog = ref(false)
let snackbar = ref(false)
let text = ref('Thank You For Your Time!')
let timeout = ref(2000)
const reasonForVisit = ref([
    { text: 'Assessment & Certification' },
    { text: 'Registrar' },
    { text: 'Training ' },
    { text: 'Others (Procurement, Finance and Admin, Scholarship) ' },
])
const assessmentItem = ref({
    name: 'John Doe',
    age: '25',
    sex: 'Male',
    course_year: 'DIT/2Y2S',
    qualification: 'VGD NCIII',
    school: 'Davao Sample School',
    address: 'Davao City',
    actionprovided: 'Provided Service',
    feedbacks: JSON.parse(JSON.stringify(count.feedbacks)),
    reco: '',
})
async function saveAssessment() {
    let feedbacks = assessmentItem.value.feedbacks;
    for (let i = 0; i < feedbacks.length; i++) {
        delete feedbacks[i].question;
        delete feedbacks[i].type;
    }
    assessmentItem.value.feedbacks = feedbacks;
    assessmentItem.value.reco = assessmentItem.value.reco;
    await axios.post("/api/createassessmentclient", assessmentItem.value);
    dialog.value = false
    snackbar.value = true;
    if (!dialog.value) {
        router.push('/');
    }
}


let page = ref(1);
let app = useAppStore()

const tab = ref(1)

const items = ref([
    {
        title: 'Home',
        disabled: false,
        href: '/'
    },
    {
        title: 'About',
        disabled: false,
    },
    {
        title: 'FAQ',
        disabled: false,
        href: '/departments-list'
    },
])


</script>

<style>
.hide-numbers .v-pagination__item:not(.v-pagination__item--prev):not(.v-pagination__item--next) {
    display: none;
}
</style>