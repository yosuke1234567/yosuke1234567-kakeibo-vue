<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase'
import { doc, getDoc } from '@firebase/firestore'
import { Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const props = defineProps({
    chartValue: Array,
    labels: Array,
    backgroundColor: Array
})

interface chartData {
    labels: Array<String>,
    datasets: Array<any>
}

const chartData = ref<chartData>({
    labels: [],
    datasets: [
        {
            borderColor: '#f5f2eb',
            backgroundColor: props.backgroundColor,
            data: props.chartValue
        }
    ]
})

</script>
        
<template>
    <Doughnut :chart-data="chartData"></Doughnut>
</template>
        
<style lang="scss">

</style>