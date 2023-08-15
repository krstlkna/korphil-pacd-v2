<template>
    <v-layout class="container">
        <v-app-bar :elevation="0" color="transparent" class=" mt-7 pa-6">
            <v-avatar size="110" class="ml-16">
                <v-img src="@/assets/rtc1.png"> </v-img>
            </v-avatar>

            <v-breadcrumbs :items="items" style="margin-left:auto; color: white">
                <template v-slot:divider>
                </template>

            </v-breadcrumbs>
            <!-- <v-btn class="mr-2 ml-n3" variant="text" icon="mdi-account-outline" color="white" to="/login"></v-btn> -->
            <v-menu :close-on-content-click="false" v-model="menu" transition="scale-transition">
                <template v-slot:activator="{ props }">
                    <v-btn color="white" v-bind="props" icon="mdi-account-outline">
                    </v-btn>
                </template>

                <v-form @submit.prevent="app.login()">

                    <v-sheet min-width="300">
                        <v-card-title style="display: flex; justify-content: center;">
                            <v-icon icon="mdi-account-outline" size="x-large" />

                        </v-card-title>
                        <v-card-title style="display: flex; justify-content: center;">Login as Admin</v-card-title>
                        <div class="text-center">
                            <v-btn to="/dashboard" variant="plain">
                                <v-icon icon="mdi-view-dashboard" size="x-large" />
                            </v-btn>
                        </div>
                        <v-list>

                            <v-list>
                                <v-list-item>
                                    <v-text-field label="Username" v-model="app.credentials.email"></v-text-field>
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

            <!-- <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" size="large" style="background-color: white; color: #2C96F8">
                        Feedback
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title><v-btn to="/walkinfeedback" variant="plain">Walk-in
                                Form</v-btn></v-list-item-title>
                        <v-list-item-title><v-btn to="/assessmentfeedback" variant="plain">Assessment
                                Form</v-btn></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu> -->

            <v-btn size="large" style="background-color: white; color: #2C96F8" to="/walkinfeedback">
                Feedback
            </v-btn>
        </v-app-bar>
        <!-- line here -->
        <v-row style="margin-left: 500px;">
            <v-col cols="8" style="margin-left: 300px; margin-top: 200px;">
                <v-sheet class="title text-h4 ma-3 pa-3 font-weight-medium elevation-0" style="color:white; text-align: center; max-width: 200px; 
                    background-image: linear-gradient(to bottom, #2A94F6, #2084E2);">About
                    Us
                </v-sheet>
            </v-col>
            <v-col style="margin-bottom: 190px;">
                <v-sheet class="ma-n16 pa-8" style="outline: 10px solid #309CFF; width: 1017px; height: 500px;  
                 background-image: linear-gradient(30deg, #0058A9, #309CFF); color: white; ">

                    <v-col>
                        <p class="font-weight-regular" style="text-align: justify; font-size: 1em; text-indent: 50px;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo
                            consequat.</p>
                    </v-col>
                    <v-col>
                        <p class="font-weight-regular" style="text-align: justify; font-size: 1em; text-indent: 50px;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo
                            consequat.</p>
                    </v-col>
                    <v-col>
                        <p class="font-weight-regular" style="text-align: justify; font-size: 1em; text-indent: 50px;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. </p>
                    </v-col>

                </v-sheet></v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <v-img src="@/assets/ARA1.png" style="min-width:300px; margin-top:460px; margin-right: 300px;
   "></v-img>

            </v-col>
        </v-row>



    </v-layout>
</template>

<script setup>
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';

let app = useAppStore()

const menu = ref(false)


const items = ref([
    {
        title: 'Home',
        disabled: false,
        href: '/'
    },
    {
        title: 'About',
        disabled: false,
        href: '/about-us'
    },
    {
        title: 'FAQ',
        disabled: false,
        href: '/departments-list'
    },
])


</script>






<style>
.container {
    min-height: 100vh;
    background-color: blanchedalmond;
    overflow: hidden;
    background-image: linear-gradient(30deg, #0058A9, #309CFF);
}
</style>