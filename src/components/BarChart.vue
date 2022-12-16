<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
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
ChartJS.defaults.aspectRatio = 1.333

interface props {
    chartValue: number[]
    labels: string[]
    bg: string[]
    setMonth: Function
}

const props = defineProps<props>()

const chartData = ref<ChartData<'bar'>>({
    labels: [],
    datasets: []
})

const updateValue = () => {
    chartData.value.datasets[0].data = props.chartValue
    chartData.value.datasets[0].backgroundColor = props.bg
}

onMounted(() => {
    chartData.value = {
        labels: props.labels,
        datasets: [
            {
                borderColor: '#f5f2eb',
                borderRadius: 8,
                backgroundColor: props.bg,
                data: props.chartValue
            }
        ]
    }
})

watch(props, updateValue)

const options: ChartOptions<'bar'> = {
    scales: {
        x: { grid: { color: 'transparent' } },
        y: { ticks: { maxTicksLimit: 6 } }
    },
    plugins: {
        legend: { display: false }
    },
    layout: {
        padding: 20
    },
    onClick(event, elements, chart) {
        console.log(event, elements, chart)
        props.setMonth(elements[0].index)
    },
}
</script>
        
<template>
    <Bar :chart-data="chartData" :chart-options="options"></Bar>
</template>
        
<style lang="scss">

</style>