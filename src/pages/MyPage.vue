<script setup lang="ts">
import { ref } from 'vue';
import { getMonthlyData } from '../components/getMonthlyData';
import { updateMonthlyData } from '../components/updateMonthlyData';
import { auth } from '../firebase';

const email = auth.currentUser!.email

const a = async () => {
    const d = new Date('2022-10').getTime()
    console.log(d)

    const year = new Date(d).getFullYear()
    const month = (new Date(d).getMonth() + 1).toString().padStart(2, '0')

    console.log(`${year}-${month}`)
}


</script>
        
<template>
    <div class="container">
        <div class="text-center">
            <h2>マイページ</h2>
            {{ email }}
        </div>
        <button @click="a">aaaa</button>
    </div>
</template>
        
<style lang="scss">
.container {
    width: 400px;
    margin: 0 auto;
    padding: 32px 0;
}
</style>