<template>
    <h1 class="thisH1">Walkin Client Dashboard
        <v-btn class="text-capitalize elevation-0 mt-2 border-button" to="/dashboard"
            prepend-icon="mdi-arrow-left-circle">Go to main
            Dashboard</v-btn>
    </h1>
    <v-layout>
        <v-container>
            <v-row justify="center">
                <v-col align="center">
                    <v-col cols="8">

                        <v-sheet class="mb-10 pa-3 elevation-3">
                            <BarGraph />
                        </v-sheet>
                    </v-col>


                    <v-row justify="center">
                        <v-col cols="4" class="pt-12">
                            <v-sheet class="pa-3 elevation-3">
                                <GenderPieGraph />
                            </v-sheet>
                        </v-col>
                        <v-col cols="4" class="pt-12">
                            <v-sheet class="pa-3 elevation-3">
                                <AgePieGraph />
                            </v-sheet>
                        </v-col>
                    </v-row>

                    <v-row justify="center">

                        <v-col cols="4" class="pt-12">
                            <v-sheet class="pa-3 elevation-3">
                                <ReasonForVisitPieGraph />
                            </v-sheet>
                        </v-col>

                        <v-col cols="4" class="pt-12">
                            <v-sheet class="pa-3 elevation-3">
                                <ActionProvidedPieGraph />
                            </v-sheet>
                        </v-col>

                    </v-row>
                </v-col>

            </v-row>
        </v-container>
    </v-layout>
</template>
  
<script setup>
import BarGraph from '@/components/dashboard/BarGraph.vue';
import GenderPieGraph from '@/components/dashboard/GenderPieGraph.vue';
import AgePieGraph from '@/components/dashboard/AgePieGraph.vue';
import ReasonForVisitPieGraph from '@/components/dashboard/ReasonForVisitPieGraph.vue';
import ActionProvidedPieGraph from '@/components/dashboard/ActionProvidedPieGraph.vue';

</script>

<style>
.thisH1 {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    flex-direction: column;
}

.border-button {
    border-width: 1px;
}
</style>
  