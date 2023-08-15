<template>
    <v-layout>
        <v-app-bar :elevation="0" color="#0058A9" class="pa-8" scroll-behavior="hide">
            <v-avatar size="110" class="ml-16">
                <v-img src="@/assets/rtc1.png"> </v-img>
            </v-avatar>

            <v-breadcrumbs :items="items" style="margin-left:auto; color: white; font-size: 1.5em; font-weight: bolder;">
                <template v-slot:divider>
                </template>

            </v-breadcrumbs>

            <v-btn size="large" style="background-color: white; color: #2C96F8; font-size: 1.5em; font-weight: bolder;"
                to="/walkinfeedback">
                Feedback
            </v-btn>
        </v-app-bar>
    </v-layout>
    
    <v-row class="main-container mt-16">
        <v-col style="display: flex; flex-direction: column; justify-content: center;" class="my-auto">
            <h1 class="mb-5 mt-16 mx-auto" style="color: white; font-size: 2.85em;">Customer Feedback Form
            </h1>

            <v-card-text>
                <v-window v-model="page">
                    <v-window-item :value="1" v-model="page">
                        <v-sheet class="mx-auto" style="display: flex; flex-direction: column; justify-content: center;"
                            border rounded height="500" width="900">
                            <v-form class="mx-5 mt-5">
                                <v-row>
                                    <v-col cols="8">
                                        <v-text-field label="Pangalan(Optional)" variant="outlined"
                                            v-model="walkinItem.name"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-text-field  label="Edad" variant="outlined" type="number"
                                            v-model="walkinItem.age" placeholder="Required"></v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-autocomplete clearable label="Kasarian" :items="['Male', 'Female']" variant="outlined"
                                            v-model="walkinItem.sex" placeholder="Required">
                                        </v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">
                                        <v-autocomplete v-model="addressStore.selectedRegion" return-object label="Region"
                                            :items="addressStore.regions" item-title="region_name"
                                            variant="outlined" placeholder="Required"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-autocomplete clearable v-model="addressStore.selectedProvince" return-object label="Province"
                                            :items="addressStore.filteredProvinces()" item-title="province_name"
                                            variant="outlined" placeholder="Required"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-autocomplete clearable v-model="addressStore.selectedCity" return-object label="City"
                                            :items="addressStore.filteredCities()" item-title="city_name"
                                            variant="outlined" placeholder="Required"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-autocomplete clearable v-model="addressStore.selectedBarangay" label="Barangay"
                                            :items="addressStore.filteredBarangays()" item-title="brgy_name"
                                            variant="outlined" placeholder="Required"></v-autocomplete>
                                    </v-col>

                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field label="Telepono/CP #" variant="outlined" type="number" maxlength="11"
                                            v-model="walkinItem.contact" placeholder="Required"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="Email Address" variant="outlined"
                                            v-model="walkinItem.email" placeholder="Required"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-autocomplete clearable label="Reason For Visit"
                                            :items="['Assessment & Certification', 'Registrar', 'Training ', 'Others (Procurement, Finance and Admin, Scholarship)']"
                                            variant="outlined" v-model="walkinItem.reason" placeholder="Required" hint="Required">
                                            <v-option placeholder="Required"></v-option>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="Action/Service" variant="outlined"
                                            v-model="walkinItem.actionprovided" placeholder="Required"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row style="display: flex; justify-content: center;">
                                </v-row>
                            </v-form>
                        </v-sheet>
                    </v-window-item>
                    <v-window-item v-for="(feedback, index) in walkinItem.feedbacks" :value="feedback.page" v-model="page">
                        <v-sheet class="mx-auto" style="display: flex; flex-direction: column; justify-content: center;"
                            border rounded height="500" width="900">
                            <div class="text-center">
                                <h1>{{ feedback.question }}</h1>
                                <FeedbackRating v-model="feedback.rating" color="primary" @click="nextPage">
                                </FeedbackRating>
                            </div>
                        </v-sheet>
                    </v-window-item>
                    <v-window-item :value="9" v-model="page">
                        <v-sheet class="mx-auto" style="display: flex; flex-direction: column; justify-content: center;"
                            border rounded height="500" width="900">
                            <div class="my-auto">
                                <h1 class="text-center">Irerekomenda nyo po ba ang TESDA sa inyong kamag-anak at kaibigan?
                                </h1>
                                <v-radio-group v-model="walkinItem.reco" inline
                                    style="display: flex; justify-content: center;">
                                    <v-radio label="Yes" value="1"></v-radio>
                                    <v-radio label="No" value="0"></v-radio>
                                </v-radio-group>

                            </div>
                            <div class="mx-auto mb-5">
                                <v-btn v-if="page == 9" @click="dialog = true" color="primary" size="x-large">Submit</v-btn>
                            </div>
                        </v-sheet>
                    </v-window-item>

                </v-window>
                <v-pagination v-model="page" :length="9" class="hide-numbers" next-icon="mdi-chevron-right-circle"
                    prev-icon="mdi-chevron-left-circle">
                </v-pagination>
            </v-card-text>
        </v-col>
    </v-row>
    <v-dialog persistent width="auto" v-model="dialog">
        <v-form @submit.prevent="saveWalkin()">
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
import { onMounted } from 'vue';
import { useAddressStore } from '@/stores/address';

let addressStore = useAddressStore();
let rules = {
    required: value => !!value || 'Field is required',
}

onMounted(async () => {
    addressStore.getAllRegions();
    addressStore.getAllProvinces();
    addressStore.getAllCities();
    addressStore.getAllBarangays();
});


let menu = ref(false)
let enabled = ref(false)
let dialog = ref(false)
const nextPage = () => {
    page.value++;
}
let snackbar = ref(false)
let text = ref('Thank You For Your Time!')
let timeout = ref(5000)
const reasonForVisit = ref([
    { text: 'Assessment & Certification' },
    { text: 'Registrar' },
    { text: 'Training ' },
    { text: 'Others (Procurement, Finance and Admin, Scholarship) ' },
])


const walkinItem = ref({
    name: '',
    age: null,
    sex: '',
    contact: '',
    email: '',
    region: '',
    province: '',
    city: '',
    barangay: '',
    actionprovided: '',
    reason: '',
    feedbacks: JSON.parse(JSON.stringify(count.feedbacks)),
    reco: '',
})
async function saveWalkin() {
    let feedbacks = walkinItem.value.feedbacks;
    for (let i = 0; i < feedbacks.length; i++) {
        delete feedbacks[i].question;
        delete feedbacks[i].type;
    }
    walkinItem.value.feedbacks = feedbacks;
    walkinItem.value.reco = walkinItem.value.reco;


    walkinItem.value.region = addressStore.selectedRegion.region_name;
    walkinItem.value.province = addressStore.selectedProvince.province_name;
    walkinItem.value.city = addressStore.selectedCity.city_name;
    walkinItem.value.barangay = addressStore.selectedBarangay;

    console.log('walkinitem', walkinItem.value);
    await axios.post("/api/createclient", walkinItem.value);
    dialog.value = false
    // setTimeout(() => {
    //     alert('Hello');
    // }, timeout.value);
    // snackbar.value = true;
    location.href = '/'

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

.main-container {
    min-height: 100vh;
    background-image: url(../../assets/bg-feedback.jpg);
    background-position: center;
    background-position-x: 25%;
    background-size: cover;
    background-repeat: no-repeat;
}

.mdi-chevron-right-circle::before {
    content: "\F0B2A";
    font-size: 2.5em;
    color: white;
}

.mdi-chevron-left-circle::before {
    content: "\F0B28";
    font-size: 2.5em;
    color: white;
}
</style>