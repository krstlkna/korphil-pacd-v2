<template>
  <div class="p-5">
    <form @submit.prevent>
      <div class="col-sm-6">
        <h3>Address Selector - Philippines</h3>
      </div>
      <hr>
      <!-- Region -->
      <div class="col-sm-6 mb-3">
        <label class="form-label">Region *</label>
        <select v-model="selectedRegion" @change="loadProvinces" class="form-control form-control-md">
          <option disabled value="">Choose Region</option>
          <option v-for="region in regions" :key="region.region_code" :value="region.region_code">
            {{ region.region_name }}
          </option>
        </select>
      </div>

      <!-- Province -->
      <div class="col-sm-6 mb-3">
        <label class="form-label">Province *</label>
        <select v-model="selectedProvince" @change="loadCities" class="form-control form-control-md">
          <option disabled value="">Choose Province</option>
          <option v-for="province in provinces" :key="province.province_code" :value="province.province_code">
            {{ province.province_name }}
          </option>
        </select>
      </div>

      <!-- City -->
      <div class="col-sm-6 mb-3">
        <label class="form-label">City / Municipality *</label>
        <select v-model="selectedCity" @change="loadBarangays" class="form-control form-control-md">
          <option disabled value="">Choose City / Municipality</option>
          <option v-for="city in cities" :key="city.city_code" :value="city.city_code">
            {{ city.city_name }}
          </option>
        </select>
      </div>

      <!-- Barangay -->
      <div class="col-sm-6 mb-3">
        <label class="form-label">Barangay *</label>
        <select v-model="selectedBarangay" class="form-control form-control-md">
          <option disabled value="">Choose Barangay</option>
          <option v-for="barangay in barangays" :key="barangay.brgy_code" :value="barangay.brgy_code">
            {{ barangay.brgy_name }}
          </option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="col-md-6">
        <input type="submit" class="btn btn-success" value="Submit">
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedRegion: null,
      selectedProvince: null,
      selectedCity: null,
      selectedBarangay: null,
      regions: [],
      provinces: [],
      cities: [],
      barangays: [],
    };
  },
  async created() {
    const response = await axios.get('ph-json/region.json');
    this.regions = response.data;
  },
  methods: {
    async loadProvinces() {
      const response = await axios.get('ph-json/province.json');
      this.provinces = response.data.filter(province => province.region_code === this.selectedRegion);
    },
    async loadCities() {
      const response = await axios.get('ph-json/city.json');
      this.cities = response.data.filter(city => city.province_code === this.selectedProvince);
    },
    async loadBarangays() {
      const response = await axios.get('ph-json/barangay.json');
      this.barangays = response.data.filter(barangay => barangay.city_code === this.selectedCity);
    },
  },
};
</script>
