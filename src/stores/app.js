import router from '@/router';
import axios from 'axios'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        name: '',
        user: null,
        credentials: {
            email: '',
            password: '',
        },

        genders: [
            {
                name: 'Male',
                clients: 305,
            },
            {
                name: 'Female',
                clients: 305,
            },
        ],
    }),

    actions: {
        async login() {
            try {
                await axios.get('/sanctum/csrf-cookie');
                let response = await axios.post('/api/login', this.credentials);
                this.user = await response.data;
                console.log(this.user);
                router.push('/dashboard');
            } catch (error) {
                console.log(error);
                alert("Invalid credentials");
            }
        },

        async logout() {
            await axios.post('/api/logout');
            this.user = null;
            router.push('/');
            window.location.reload();
        },

        async loginCheck() {
            try {
                await axios.get('/sanctum/csrf-cookie');
                let response = await axios.get('/api/user');
                this.user = await response.data;
            } catch (error) {
                this.user = null;
            }
        }
    }

})