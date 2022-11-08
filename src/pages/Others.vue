<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '../firebase';

const email = auth.currentUser!.email

</script>
        
<template>
    <div>{{ email }}</div>
</template>
        
<style lang="scss">

</style>