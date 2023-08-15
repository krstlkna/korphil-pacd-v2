import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackStore = defineStore('snack', {
    state: () => ({
        EditSnackbar: ref(false),
        timeout: ref(1500)
    }),
    actions: {
        getSnackbarText() {
            return faqs.editedIndex.value >= 0 ? 'Item edited successfully!' : 'Item saved successfully!';
        }
    },
})