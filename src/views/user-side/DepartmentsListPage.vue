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

        <v-parallax src="@/assets/PARALLAX.svg" height="750">
            <v-row style=" display: flex; flex-wrap: wrap; flex: 1 1 auto; margin: 30px;">
                <v-col cols="8" style="margin-left: 300px; margin-top: 200px">


                    <div>
                        <div class="text-h4 mb-3 font-weight-medium" style="color: white; text-align: center;">
                            How can we help you?
                        </div>
                        <div class="text-h5 mb-3 sm-6" style="color: white; text-align: center;">
                            Explore our FAQ knowledge base page to find answers to your inquiries.
                        </div>
                    </div>

                    <!-- <v-text-field class="search-bar mt-10" hide-details prepend-inner-icon="mdi-magnify"
                        label="Search for category, name, keyword, etc." single-line variant="outlined"
                        style="background-color: white;"></v-text-field> -->

                    <div class="text-h5 mt-10 font-weight-medium" style="color: white; text-align: center;">
                        Select Department:
                    </div>

                </v-col>
            </v-row>
        </v-parallax>



    </v-layout>




    <v-layout class="pa-10">
        <v-row justify="center mb-4" style="margin: -250px;">

            <v-col cols="3" class="ml-16" align="right">
                <v-card style="background-color: #EAEAEA; border-radius: 25px; " width="350" height="350"
                    to="/training-list">
                    <v-img height="200" src="@/assets/training.jpeg" style="margin: 15px;"></v-img>
                    <h2 class="mt-10" style="text-align: center;">Training</h2>
                </v-card>
            </v-col>
            <!-- line here -->
            <v-col cols="3" align="center">

                <v-card style="background-color: #EAEAEA;; border-radius: 25px;" width="349" height="350"
                    to="/registrar-list">
                    <v-img class="align-end text-white" height="200" src="@/assets/registrar.jpeg"
                        style="margin: 15px;"></v-img>
                    <h2 class="mt-10" style="text-align: center;">Registrar</h2>
                </v-card>
            </v-col>
            <!-- line here -->
            <v-col cols="3" class="mr-16" align="left">

                <v-card style="background-color: #EAEAEA;; border-radius: 25px; " width="350" height="350"
                    to="/certification-list">
                    <v-img class="align-end text-white" height="200" src="@/assets/certification.jpeg"
                        style="margin: 15px;"></v-img>
                    <h2 class="mt-10" style="text-align: center;">Certification & Assessment</h2>
                </v-card>
            </v-col>
            <!-- line here -->
            <v-col cols="3" class="ml-16" align="right">

                <v-card style="background-color: #EAEAEA;; border-radius: 25px;" width="350" height="350"
                    to="/procurement-list">
                    <v-img class="align-end text-white" height="200" src="@/assets/procurement.jpeg"
                        style="margin: 15px;"></v-img>
                    <h2 class="mt-10" style="text-align: center;">Procurement</h2>
                </v-card>
            </v-col>
            <!-- line here -->
            <v-col cols="3" align="center">

                <v-card style="background-color: #EAEAEA;; border-radius: 25px;" width="350" height="350"
                    to="/accounting-list">
                    <v-img class="align-end text-white" height="200" src="@/assets/accounting.jpeg"
                        style="margin: 15px;"></v-img>
                    <h2 class="mt-10" style="text-align: center;">Accounting</h2>
                </v-card>
            </v-col>
            <!-- line here -->
            <v-col cols="3" class="mr-16" align="left">

                <v-card style="background-color: #EAEAEA;; border-radius: 25px;" width="350" height="350" to="/admin-list">
                    <v-img class="align-end text-white" height="200" src="@/assets/admin.jpeg"
                        style="margin: 15px;"></v-img>
                    <h2 class="mt-10" style="text-align: center;">Admin</h2>
                </v-card>
            </v-col>


        </v-row>
    </v-layout>
</template>

<script setup>
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';

const menu = ref(false)
let app = useAppStore()


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

 

