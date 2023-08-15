<template>
    <h1 class="pl-10 mb-10 ">
        <v-btn size="2em" to="/faqlist" icon="mdi-arrow-left" variant="plain" />
        {{ $route.name }}
    </h1>
    <v-sheet style="border-radius: 15px; background-color: white;" class="px-16 pt-5 mx-10 mb-5 elevation-1">
        <v-row no-gutters>
            <v-col>
                <v-toolbar-title class="text-black; text-bold " style="font-weight: bold;">What are you looking
                    for?</v-toolbar-title>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col cols="9">
                <v-text-field v-model="search" solo prepend-inner-icon="mdi-magnify"
                    label="Search for category, name, keyword, etc." single-line></v-text-field>
            </v-col>
            <v-col>
                <div class="my-5 ml-8">Sort by:</div>
            </v-col>
            <v-col class="mx-1">
                <v-select label="Year" v-model="sortByYear" :items="years" variant="solo" clearable>
                </v-select>
            </v-col>
            <v-col>
                <v-select label="Select Month"
                    :items="['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', ' September', 'October', 'November', 'December']"
                    variant="solo">
                </v-select>
            </v-col>
        </v-row>
    </v-sheet>
    <v-data-table :search="search" :headers="headers" :items="data" class="v-table elevation-1 pt-5 mx-10 mb-5"
        style="border-radius: 15px;">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>{{ $route.name }} FAQ</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px" persistent>
                    <template v-slot:activator="{ props }">
                        <v-btn class="mb-2 elevation-1" style="background-color: #3C59A6; color: white;" v-bind="props">
                            New Item
                        </v-btn>
                        <v-btn class="mb-2 elevation-1 ml-1" style="background-color: #3C59A6; color: white;"
                            @click="printItems()">
                            Refresh
                        </v-btn>
                    </template>
                    <v-sheet>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.question" label="Question"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.answer" label="Answer"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" class="border-button" @click="close()">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" class="border-button" @click="save()">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-sheet>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px" color="error" persistent>
                    <v-sheet class="pa-2">
                        <v-icon size="x-large" color="#E12727"
                            style="display: flex; margin: auto;">mdi-alert-circle-outline</v-icon>
                        <v-card-title class="text-h5" style="display: flex; justify-content: center;">Are you
                            sure?</v-card-title>
                        <p class="text-h7" style="display: flex; justify-content: center;">Do you really want
                            to delete this item?</p>
                        <v-card-actions class="mt-6">
                            <v-spacer></v-spacer>
                            <v-btn class="text-capitalize px-5 border-button" style="border-color: #B4B2B2;" variant="flat"
                                @click="closeDelete()">Cancel</v-btn>
                            <v-btn class="text-capitalize px-5 border-button" style="border-color: #E12727;" variant="flat"
                                @click="deleteItemConfirm(editedItem)">Delete</v-btn>
                            <v-spacer></v-spacer>

                        </v-card-actions>
                    </v-sheet>
                </v-dialog>
            </v-toolbar>
            <v-snackbar v-model="EditSnackbar" :timeout="timeout" color="info" vertical>
                <v-icon size="large" class="mr-2">mdi-check-circle-outline</v-icon>
                {{ getSnackbarText() }}

                <template v-slot:actions>
                    <v-btn color="white" variant="text" @click="EditSnackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon size="small" class="me-2" @click="editItem(item.raw)">
                mdi-square-edit-outline
            </v-icon>
            <v-icon size="small" @click="deleteItem(item.raw)" color="error">
                mdi-trash-can-outline
            </v-icon>

        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                No Data Available
            </v-btn>
        </template>
    </v-data-table>
    <v-main class="ml-14" color="primary"></v-main>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const data = ref([])
const timeout = ref(1500)
const EditSnackbar = ref(false)
const search = ref('')
const dialog = ref(false)
const dialogDelete = ref(false)
const editedIndex = ref(-1)
const sortByYear = ref('');
const years = computed(() => {
    const year = new Date().getFullYear();
    return Array.from({ length: year - 1900 }, (_, index) => 1901 + index);
});

const headers = ref([
    { title: 'Question', align: 'start', sortable: true, key: 'question' },
    { title: 'Answer', align: 'start', sortable: true, key: 'answer' },
    { title: 'Actions', align: 'start', sortable: false, key: 'actions' },
])
const editedItem = ref({
    question: '',
    answer: '',
})

function getSnackbarText() {
    return editedIndex.value >= 0 ? 'Item edited successfully!' : 'Item saved successfully!';
}

const formTitle = computed(() => {
    console.log(editedIndex.value)
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})

function editItem(item) {
    editedIndex.value = this.data.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialog.value = true
}
onMounted(printItems);
async function printItems() {
    let response = await axios.get("/api/getadminfaqs");
    data.value = response.data;
}

async function save() {
    if (editedIndex.value === -1) {
        await axios.post("/api/createadminfaqs", editedItem.value);
        printItems();
        this.close()
        // EditSnackbar.value = true
    } else if (editedIndex.value >= 0) {
        await axios.post("/api/updateadminfaqs", editedItem.value);
        dialog.value = false
        printItems();
        // EditSnackbar.value = true
    }
}

function close() {
    this.dialog = false
    this.editedItem = Object.assign({}, this.defaultItem)
}

function deleteItem(item) {
    this.editedIndex = this.data.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialogDelete = true
}

async function deleteItemConfirm(item) {
    await axios.post('/api/deleteadminfaqs', item);
    dialogDelete.value = false;
    printItems();
}

function closeDelete() {
    this.dialogDelete = false
    this.editedItem = Object.assign({}, this.defaultItem)
    this.editedIndex = -1
}

function routeTo(item) {
    router.push(item.value.path);
}
</script>


<style>
.v-main {
    background-color: #F7F7FB;
}

.v-table {
    max-width: 95%;
}

.v-data-table__td.v-data-table-column--align-start.v-data-table__th.v-data-table__th {
    background-color: #F7F7FB;
}

.v-toolbar__content {
    background-color: white;
}

.border-button {
    border-width: 1px;
}

/* style for snackbar */

.v-icon--size-x-large {
    font-size: calc(var(--v-icon-size-multiplier) * 5em);
    margin: auto;
}

.color-white {
    grid-area: content;
    justify-content: center;
    white-space: nowrap;
    color: white;
}

.v-snackbar__wrapper.v-theme--light.bg-info.v-snackbar--variant-elevated {
    display: flex;
    flex-direction: row;
}

/* end */
</style>