<template>
    <h1 class="pl-10 mb-10 ">Client Data</h1>
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
                <v-combobox label="Year" v-model="sortByYear" :items="years" variant="solo" clearable>
                </v-combobox>
            </v-col>
            <v-col>
                <v-combobox label="Month"
                    :items="['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', ' September', 'October', 'November', 'December']"
                    variant="solo" clearable>
                </v-combobox>
            </v-col>
        </v-row>
    </v-sheet>
    <v-data-table :search="search" :sortByYear="sortByYear" :headers="headers" :items="data"
        class="v-table elevation-1 pt-5 mx-10 mb-5" style="border-radius: 15px;">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Client Information</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px" persistent>
                    <template v-slot:activator="{ props }">
                        <!-- <v-btn class="mb-2 mr-2 elevation-1" style="background-color: #3C59A6; color: white;"
                            v-bind="props">
                            New Item
                        </v-btn> -->
                        <v-btn class="mb-2 elevation-1" style="background-color: #3C59A6; color: white;"
                            @click="printItems()">
                            Refresh
                        </v-btn>
                    </template>
                    <v-sheet>
                        <v-card-title>
                            <span class="text-h5">{{ getFormTitle() }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.age" type="number" label="Age"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select :items="['Male', 'Female']" v-model="editedItem.sex"
                                            label="Sex"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.contact" type="number"
                                            label="Contact No."></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.email" label="Email Address"></v-text-field>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                                    </v-col> -->

                                </v-row>
                                <v-row cols="12">
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="editedItem.actionprovided" label="Action Provided"
                                            class="text-caption"></v-text-field>
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
                <v-dialog v-model="dialogDelete" max-width="500px" color="error">
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
                                @click="deleteItemConfirm(editedItem)">Delete {{ date }}</v-btn>
                            <v-spacer></v-spacer>

                        </v-card-actions>
                    </v-sheet>
                </v-dialog>

                <v-dialog v-model="showMoreDialog" max-width="500px" persistent>
                    <v-sheet>
                        <v-card-title>
                            <span class="text-h5">{{ 'Client Information' }}</span>
                        </v-card-title>

                        <v-card-text style="font-size:18px">
                            Name
                            <p class="color" style="margin-left: 15px;">{{ editedItem.name }}</p>
                        </v-card-text>
                        <v-card-text style="font-size:18px">
                            Age
                            <p class="color" style=" margin-left: 15px;">{{ editedItem.age }}</p>
                        </v-card-text>
                        <v-card-text style="font-size:18px">
                            Sex
                            <p class="color" style="margin-left: -15;"> {{ editedItem.sex }}</p>
                        </v-card-text>
                        <!-- <v-card-text style="font-size:18px">
                            Address
                            <p class="color" style=" margin-left: 15px">{{ editedItem.address }}</p>
                        </v-card-text> -->
                        <v-card-text style="font-size:18px">
                            Contact
                            <p class="color" style="margin-left: 15px ">{{ editedItem.contact }}</p>
                        </v-card-text>
                        <v-card-text style="font-size:18px">
                            Email
                            <p class="color" style="margin-left: 15px"> {{ editedItem.email }}</p>
                        </v-card-text>
                        <v-card-text style="font-size:18px">
                            Action Provided
                            <p class="color" style="margin-left: 15px">{{ editedItem.actionprovided }}</p>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" class="border-button"
                                @click="showMoreDialog = false">
                                Close
                            </v-btn>
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

        <template v-slot:item._created_at="{ item }">
            {{ moment(item.raw.created_at).format('YYYY-MM-DD') }}
        </template>
        <template v-slot:item.address="{ item }">
            {{ item.raw.region }}, {{ item.raw.province }}, {{ item.raw.city }}, {{ item.raw.barangay }}
        </template>

        <template v-slot:item.actions="{ item }">
            <!-- <v-icon size="small" @click="editItem(item.raw)">
                mdi-square-edit-outline
            </v-icon>
            <v-icon size="small" class="mx-2" @click="deleteItem(item.raw)" color="error">
                mdi-trash-can-outline
            </v-icon> -->
            <v-icon size="small" @click="showMore(item.raw)">
                mdi-plus
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                No Data Available
            </v-btn>
        </template>

    </v-data-table>
    <v-main></v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import moment from 'moment';
import { computed } from '@vue/reactivity';

onMounted(printItems);

const headers = [
    { title: 'Date', align: 'start', sortable: false, key: '_created_at' },
    { title: 'Name', align: 'start', sortable: true, key: 'name' },
    { title: 'Age', align: 'start', sortable: false, key: 'age' },
    { title: 'Sex', align: 'start', sortable: false, key: 'sex' },
    { title: 'Address', align: 'start', sortable: false, key: 'address' },
    { title: 'Contact No.', align: 'start', sortable: false, key: 'contact' },
    { title: 'Email Adr', align: 'start', sortable: false, key: 'email' },
    { title: 'Reason for Visit', align: 'start', sortable: false, key: 'reason' },
    { title: 'Action Provided', align: 'start', sortable: false, key: 'actionprovided' },
    { title: 'Actions', align: 'start', sortable: false, key: 'actions' },
]

const EditSnackbar = ref(false)
const showMoreDialog = ref(false)
const data = ref([]);
const search = ref('')
const dialog = ref(false)
const dialogDelete = ref(false)
const editedIndex = ref(-1)
const sortByYear = ref('');
const years = computed(() => {
    const year = new Date().getFullYear();
    return Array.from({ length: year - 1900 }, (_, index) => 1901 + index);
});

const editedItem = ref({
    name: '',
    age: '',
    sex: '',
    contact: '',
    email: '',
})

// function getSnackbarText() {
//     console.log(editedIndex.value)
//     return editedIndex.value === -1 ? 'Item saved successfully!' : 'Item edited successfully!';
// }

async function printItems() {
    let response = await axios.get("http://localhost/pacd-system-api/public/api/getclients");
    data.value = response.data;
}

function getFormTitle() {
    console.log(editedIndex.value)
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item';
}

function showMore(item) {
    editedIndex.value = this.data.indexOf(item)
    editedItem.value = Object.assign({}, item)
    showMoreDialog.value = true
}

function editItem(item) {
    editedIndex.value = this.data.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialog.value = true
}

// async function saveEditItem(item) {
//     await axios.post("http://localhost/pacd-system-api/public/api/updateclient", editedItem.value);
//     dialog.value = false
//     printItems();
// }

async function save() {
    if (editedIndex.value === -1) {
        await axios.post("http://localhost/pacd-system-api/public/api/createclient", editedItem.value);
        printItems();
        this.close()
        // EditSnackbar.value = true
    } else if (editedIndex.value >= 0) {
        await axios.post("http://localhost/pacd-system-api/public/api/updateclient", editedItem.value);
        dialog.value = false
        printItems();
        // EditSnackbar.value = true
    }
}

function close() {
    this.dialog = false
    this.editedItem = Object.assign({}, this.defaultItem)
    this.editedIndex = -1
}

function deleteItem(item) {
    this.editedIndex = this.data.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialogDelete = true
}

async function deleteItemConfirm(item) {
    await axios.post('http://localhost/pacd-system-api/public/api/deleteClient', item);
    dialogDelete.value = false;
    printItems();
}

function closeDelete() {
    this.dialogDelete = false
    this.editedItem = Object.assign({}, this.defaultItem)
    this.editedIndex = -1
}

</script>

<style>
.underline {
    text-decoration: underline;
    font-size: 18px;

}

.color {
    background-color: #F0F0F0;
    padding: 8px;
}

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

.v-icon--size-x-large {
    font-size: calc(var(--v-icon-size-multiplier) * 5em);
    margin: auto;
}

.text-truncate {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>