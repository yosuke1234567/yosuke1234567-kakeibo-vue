<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.defaults.font.family = "'Asap', 'Zen Maru Gothic', sans-serif"

interface chartData {
    labels: String[],
    datasets: any[]
}

interface props {
    chartValue: Number[],
    labels: String[]
}

const props = defineProps<props>()

const chartData = ref<chartData>({
    labels: [],
    datasets: []
})

onMounted(() => {
    chartData.value = {
        labels: props.labels,
        datasets: [
            {
                borderColor: '#f5f2eb',
                backgroundColor: '#746e6c',
                data: props.chartValue
            }
        ]
    }
    console.log(chartData.value.datasets[0].data)
    console.log(props.labels)
})
</script>
        
<template>
    <Bar :chart-data="chartData"></Bar>
</template>
        
<style lang="scss">

</style>