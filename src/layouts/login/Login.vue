<template>
    <v-layout style=" background-color: #3C59A6; height: 100vh;
background-size: cover;
">
        <v-btn class="mr-2 ml-n3" variant="text" icon="mdi-arrow-left-circle" color="white" to="/"></v-btn>


        <body>
            <section>
                <div class="custom-shape-divider-top-1683095677">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            class="shape-fill"></path>
                    </svg>
                </div>
            </section>
        </body>


        <v-card
            style="background-image: url(src/assets/tesda\ logo2.png); background-size: auto 30%; background-position: center calc(50% + -110px); background-repeat: no-repeat;"
            class="login-card">
            <v-row justify="center" align="center">
                <v-col cols="12" sm="8" md="6" lg="12">
                    <v-form @submit.prevent="app.login()">
                        <v-card-title class="text-center">
                            <br>
                        </v-card-title>
                        <v-card-text style="margin-top: 190px
                        ;"> <v-text-field label="Username" v-model="app.credentials.email" outlined></v-text-field>
                            <v-text-field label="Password" type="password" v-model="app.credentials.password"
                                outlined></v-text-field>
                        </v-card-text>
                        <v-btn type="submit" color="primary" block>Login</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
        <!-- <v-img src="@/assets/ARA-01.svg" class="ara"></v-img> -->

    </v-layout>
</template>

<script setup>
import { useAppStore } from '@/stores/app';
let app = useAppStore();
</script>



<style>
.v-card {
    height: 500px;
    width: 400px;
}


.v-layout {
    --v-scrollbar-offset: 0px;
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.form-container {
    margin-top: 190px;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}


.custom-shape-divider-top-1683095677 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-top-1683095677 svg {
    position: relative;
    display: block;
    width: calc(118% + 1.3px);
    height: 144px;
    transform: rotateY(180deg);
}

.custom-shape-divider-top-1683095677 .shape-fill {
    fill: #0761e9;
}



/* .ara {
    max-height: 40%;
    max-width: 40%;
    margin-right: -750px;
    margin-top: 500px;
} */
</style>