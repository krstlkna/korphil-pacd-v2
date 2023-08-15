<template>
    <v-layout>
        <v-app-bar :elevation="0" color="transparent" class=" mt-7 pa-6">
            <v-avatar size="110" class="ml-16">
                <v-img src="@/assets/rtc1.png"> </v-img>
            </v-avatar>

            <v-breadcrumbs :items="items" style="margin-left:auto; color: white">
                <template v-slot:divider>
                </template>

            </v-breadcrumbs>
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

            <v-btn size="large" style="background-color: white; color: #2C96F8" to="/walkinfeedback">
                Feedback
            </v-btn>
        </v-app-bar>
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

<style></style>