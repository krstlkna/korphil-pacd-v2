
import { defineStore } from 'pinia'

export const useAddressStore = defineStore('address', {
    state: () => ({
        selectedRegion: '',
        selectedProvince: '',
        selectedCity: '',
        selectedBarangay: '',
        regions: [],
        provinces: [],
        cities: [],
        barangays: [],
    }),
    actions: {
        async getAllRegions() {
            let response = await fetch('http://localhost:3000/public/ph-json/region.json');
            this.regions = await response.json();
        },
        async getAllProvinces() {
            let response = await fetch('http://localhost:3000/public/ph-json/province.json');
            this.provinces = await response.json();
        },
        async getAllCities() {
            let response = await fetch('http://localhost:3000/public/ph-json/city.json');
            this.cities = await response.json();
        },
        async getAllBarangays() {
            let response = await fetch('http://localhost:3000/public/ph-json/barangay.json');
            this.barangays = await response.json();
        },

        filteredProvinces() {
            return this.provinces.filter((province) => {
                if (province.region_code == this.selectedRegion.region_code) {
                    return true;
                } else {
                    return false;
                }
            });
        },
        filteredCities() {
            return this.cities.filter((city) => {
                if (city.province_code == this.selectedProvince.province_code) {
                    return true;
                } else {
                    return false;
                }
            });
        },
        filteredBarangays() {
            return this.barangays.filter((barangay) => {
                if (barangay.city_code == this.selectedCity.city_code) {
                    return true;
                } else {
                    return false;
                }
            });
        },
    }
});

