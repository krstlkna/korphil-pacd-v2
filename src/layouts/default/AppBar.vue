<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" app fixed clipped color="#4D68AF"
    light>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-list-item prepend-avatar="src/assets/logo.png" title="TESDA-PACD" style="color: white;" @click.stop="rail = !rail"
      nav>
      <template v-slot:append>
        <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav style="color: white;">
      <!-- <v-list-item prepend-icon="mdi-home" title="HOME" to="/" style="color: white;"></v-list-item> -->
      <v-list-item prepend-icon="mdi-view-dashboard" title="DASHBOARD" to="/dashboard"
        style="color: white;"></v-list-item>
      <v-list-item prepend-icon="mdi-frequently-asked-questions" title="FAQ LIST" to="/faqlist"
        style="color: white;"></v-list-item>
      <v-list-item prepend-icon="mdi-database" title="CLIENT DATA" to="/clientdata" style="color: white;"></v-list-item>
      <!-- <v-list-item prepend-icon="mdi-folder-account-outline" title="ASSESSMENT DATA" to="/assessmentdata"
        style="color: white;"></v-list-item> -->
      <v-list-item v-if="app.user.access?.indexOf('superadmin') >= 0" prepend-icon="mdi-account-multiple-plus"
        title="MANAGE ACCOUNTS" to="/manageaccount" style="color: white;"></v-list-item>
      <v-list-item prepend-icon="mdi-poll" title="SUMMARY REPORT" to="/summaryreport" style="color: white;"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>

    <v-app-bar-title>{{ $route.meta.title || "Default title" }}
    </v-app-bar-title>
    <profile />

  </v-app-bar>

  <v-main
    style="--v-layout-left:56px; --v-layout-right:0px; --v-layout-top:0px; --v-layout-bottom:0px; background-color: #F7F7FB;"></v-main>
</template>
<script setup>
import profile from '@/components/profile.vue'
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';

let app = useAppStore()

const drawer = ref(true)
const rail = ref(true)
const items = ref([
  { title: 'Home', icon: 'mdi-view-dashboard' },
  { title: 'FAQ LIST', icon: 'mdi-frequently-asked-questions' },
  { title: 'CLIENT DATA', icon: 'mdi-database' },
  { title: 'SUMMARY REPORT', icon: 'mdi-poll' },
])
</script>


<style>
.v-list-item.v-list-item--link.v-list-item--nav.v-theme--light {
  padding-top: 6px;
  padding-bottom: 10px;
}
</style>