<template>
    <v-layout class="container">
        <v-app-bar :elevation="0" color="#0058A9" class="pa-8" scroll-behavior="hide" >
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


        <v-row>
            <v-col cols="6" style="margin-left: 300px; margin-top: 300px">


                <div>
                    <div class="text-h2 mb-10 font-weight-medium" style="color: white">
                        Public Assistance and Complaints Desk
                    </div>
                    <div class="text-h4 mb-3" style="color: white">
                        I am Ara, your virtual PACD officer
                    </div>
                    <div class="text-h4 mt-3" style="color: white">How can I help you?</div>
                    <v-card-actions class="link">
                        <v-btn class="text-capitalize px-5 mt-5 ml-n2" variant="outlined" size="x-large" color="white"
                            to="/departments-list">
                            Get Started
                        </v-btn>

                    </v-card-actions>
                </div>

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-img class="ml-auto" src="@/assets/ARA-01.svg"
                    style="min-width:600px; margin-top:150px; margin-right: 150px;"></v-img>

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
        title: 'HOME',
        disabled: false,
        href: '/'
    },
    // {
    //     title: 'About',
    //     disabled: false,
    //     href: '/about-us'
    // },
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
    border-bottom-left-radius: 400px !important;
    overflow: hidden;
    background: linear-gradient(30deg, #17446e, #00519d, #309CFF, #00519d, #23A6D5);
    animation: gradient 15s ease infinite;
    background-size: 400% 400%;
}

@-webkit-keyframes gradient {
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes gradient {
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
