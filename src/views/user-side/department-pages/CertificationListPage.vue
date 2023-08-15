
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
        <v-parallax src="@/assets/PARALLAX.svg" height="100vh">
            <v-row>
                <v-col cols="8" style="margin-left: 300px; margin-top: 200px">
                    <div>
                        <div class="text-h4 mb-3 font-weight-medium" style="color: white; text-align: center;">
                            Certification and Assessment FAQs
                        </div>
                    </div>
                    <v-text-field class="search-bar mt-10" hide-details prepend-inner-icon="mdi-magnify"
                        label="Search for question, keyword, etc." single-line variant="outlined"
                        style="background-color: white;" v-model="search"></v-text-field>
                    <div class="text-h5 mt-10 font-weight-medium" style="color: white; text-align: center;">
                        Select Questions:
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="8" style="margin: 0 auto;">
                    <v-row>
                        <v-col v-for="(faq, index) in filteredFaqs" :key="index" cols="6">
                            <v-card class="mb-4" @click="showAnswerDialog(index)" elevation="2">
                                <v-card-title style="white-space: normal !important;">{{ faq.question }}</v-card-title>
                                <v-card-text>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <div class="text-center">
                <v-btn icon="mdi-arrow-left" color="white" to="/departments-list"></v-btn>
            </div>

            <v-dialog v-model="showDialog" max-width="500">
                <v-card>
                    <v-card-title style="white-space: normal !important;">{{ selectedFaq.question }}</v-card-title>
                    <v-card-text>{{ selectedFaq.answer }}</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="showDialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-parallax>
    </v-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAppStore } from '@/stores/app';

let app = useAppStore();
let menu = ref(false);
const faqs = ref([]);
const search = ref('');
const showDialog = ref(false);
const selectedFaq = ref(null);

onMounted(printItems);

async function printItems() {
    try {
        const response = await axios.get("/api/getcertificationfaqs");
        faqs.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

const filteredFaqs = computed(() => {
    if (!search.value) {
        return faqs.value; // Return all FAQs if search text is empty
    }

    const searchTerm = search.value.toLowerCase();
    return faqs.value.filter(faq => faq.question.toLowerCase().includes(searchTerm));
});

function showAnswerDialog(index) {
    selectedFaq.value = faqs.value[index];
    showDialog.value = true;
}

function closeAnswerDialog() {
    selectedFaq.value = null;
    showDialog.value = false;
}

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
    }
]);
</script>

<style>
.mdi-frequently-asked-questions {
    font-size: xxx-large;
}

.mdi-arrow-left {
    font-size: xx-large;
}
</style>