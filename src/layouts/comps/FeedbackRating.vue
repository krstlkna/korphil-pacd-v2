<template>
    <v-row class="mt-10">
        <v-col class="ml-16 mr-n16">
            <v-btn @click="rate(-1)" :color="getColor(-1)" icon="mdi-emoticon-sad-outline" class="icon-button"
                size="x-large"></v-btn>
            <h3>Poor</h3>
        </v-col>
        <v-col class="mx-n16">
            <v-btn @click="rate(0)" :color="getColor(0)" icon="mdi-emoticon-neutral-outline" class="icon-button"
                size="x-large"></v-btn>
            <h3>Satisfactory</h3>
        </v-col>
        <v-col class="ml-n16 mr-16">
            <v-btn @click="rate(1)" :color="getColor(1)" icon="mdi-emoticon-happy-outline" class="icon-button"
                size="x-large"></v-btn>
            <h3>Very Satisfactory</h3>
        </v-col>
    </v-row>
</template>

<style>
.icon-button {
    font-size: 50px;
}

.v-btn--icon.v-btn--density-default {
    width: calc(var(--v-btn-height) + 25px);
    height: calc(var(--v-btn-height) + 25px);
}
</style>

<script setup>
let props = defineProps(['modelValue', 'color']);
let emit = defineEmits(['update:modelValue']);

function rate(newRating) {
    emit('update:modelValue', newRating);
}

function getColor(checkRating) {
    if (props.modelValue == checkRating) {
        return props.color;
    } else {
        return 'default';
    }
}

</script>