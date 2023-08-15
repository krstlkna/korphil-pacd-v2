import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

export const useFaqsStore = defineStore('faqs', {
    state: () => ({
        dialog: ref(false),
        trainingData: ref([
            { question: '', answer: '' },
        ]),
        registrarData: ref([
            { question: 'Hello', answer: 'Registrar!' },
        ]),
        certData: ref([
            { question: 'Hello', answer: 'Certifification!' },
        ]),
        procurementData: ref([
            { question: 'Hello', answer: 'Procurement' },
        ]),
        accountingData: ref([
            { question: 'Hello', answer: 'Accounting!' },
        ]),
        adminData: ref([
            { question: 'Hello', answer: 'Admin!' },
        ]),

        headers: ref([
            { title: 'Question', align: 'start', sortable: true, key: 'question' },
            { title: 'Answer', align: 'start', sortable: true, key: 'answer' },
            { title: 'Actions', align: 'start', sortable: false, key: 'actions' },
        ])
    }),
    actions: {
        // async save() {
        //     await axios.post('/api/createtrainingfaqs')
        // }

    },
})