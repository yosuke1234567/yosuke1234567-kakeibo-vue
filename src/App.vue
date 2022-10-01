<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext'

const value = ref("")
</script>

<template>
    <InputText type="text" placeholder="a" v-model="value" />
</template>

<style scoped>

</style>