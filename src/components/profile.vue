<template>
    <span class="ma-3">Howdy, {{ app.user?.firstname.charAt(0).toUpperCase() + app.user?.firstname.substring(1) }}?</span>
    <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
                <v-avatar size="large">
                    <v-icon size="45px">mdi-account-circle-outline</v-icon>
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet :height="250" :width="250">
            <v-card-text>
                <div class="mx-auto text-center">
                    <v-avatar color="brown" icon="mdi-account-circle-outline">
                    </v-avatar>
                    <h3>{{ app.user?.firstname.charAt(0).toUpperCase() + app.user?.firstname.substring(1) }}</h3>
                    <p class="text-caption mt-1">
                        Access: {{ app.user?.access }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-divider class="my-3"></v-divider>
                    <v-btn @click="app.logout()">Logout</v-btn>

                </div>
            </v-card-text>
        </v-sheet>
    </v-menu>
</template>

<script setup>
import { useAppStore } from '@/stores/app';
let app = useAppStore();
</script>