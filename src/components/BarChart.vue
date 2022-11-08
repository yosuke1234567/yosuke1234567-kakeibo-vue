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
    Plugin,
    ChartOptions,
    ChartData
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.defaults.font.family = "'Asap', 'Zen Maru Gothic', sans-serif"

interface props {
    chartValue: number[],
    labels: string[],
    setMonth: Function
}

const props = defineProps<props>()

const chartData = ref<ChartData<'bar'>>({
    labels: [],
    datasets: []
})

const bgs = ref<string[]>(['#ddd0bb', '#ddd0bb', '#ddd0bb', '#ddd0bb', '#ddd0bb', '#fdd835'])

onMounted(() => {
    chartData.value = {
        labels: props.labels,
        datasets: [
            {
                borderColor: '#f5f2eb',
                borderRadius: 8,
                backgroundColor: bgs.value,
                data: props.chartValue
            }
        ]
    }
})

const options: ChartOptions<'bar'> = {
    scales: {
        x: { grid: { color: 'transparent' } }
    },
    onClick(event, elements, chart) {
        console.log(event, elements, chart)
        for (let i=0; i<6; i++) {
            bgs.value[i] = i == elements[0].index ? '#fdd835' : '#ddd0bb'
        }
        props.setMonth(elements[0].index)
    },
}
</script>
        
<template>
    <Bar :chart-data="chartData" :chart-options="options"></Bar>
</template>
        
<style lang="scss">

</style>