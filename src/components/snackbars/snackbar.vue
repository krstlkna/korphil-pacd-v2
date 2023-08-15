<template>
    <v-snackbar v-model="snack.EditSnackbar" :timeout="snack.timeout" color="info" vertical>
        <v-icon size="large" class="mr-2">mdi-check-circle-outline</v-icon>
        {{ snack.getSnackbarText }}

        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="EditSnackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script setup>
import { useSnackStore } from '@/stores/snackbar';


let snack = useSnackStore()
</script>