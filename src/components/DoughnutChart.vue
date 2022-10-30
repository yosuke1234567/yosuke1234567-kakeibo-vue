<script setup lang="ts">
import { onBeforeUpdate, ref } from 'vue'
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

interface chartData {
    labels: String[],
    datasets: any[]
}

interface props {
    chartValue: Number[],
    labels: String[],
    backgroundColor: String[]
}

const props = defineProps<props>()

const chartData = ref<chartData>({
    labels: [],
    datasets: []
})

onBeforeUpdate(() => {
    chartData.value = {
        labels: props.labels,
        datasets: [
            {
                borderColor: '#f5f2eb',
                backgroundColor: props.backgroundColor,
                data: props.chartValue
            }
        ]
    }
    console.log(chartData.value.datasets[0].data)
    console.log(props.labels)
})
</script>
        
<template>
    <Doughnut :chart-data="chartData"></Doughnut>
</template>
        
<style lang="scss">

</style>