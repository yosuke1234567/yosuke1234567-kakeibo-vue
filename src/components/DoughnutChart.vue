<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase';
import { Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    Plugin,
    ChartData,
    ChartOptions
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
ChartJS.defaults.font.family = "'Asap', 'Zen Maru Gothic', sans-serif"

interface props {
    chartValue: number[]
}

const props = defineProps<props>()

const chartData = ref<ChartData<'doughnut'>>({
    labels: [],
    datasets: []
})

const chartLabels = ref<string[]>([])
const chartBgColor = ref<string[]>([])

const setChartValue = () => {
    chartData.value = {
        labels: chartLabels.value,
        datasets: [
            {
                borderColor: '#f5f2eb',
                backgroundColor: chartBgColor.value,
                data: props.chartValue
            }
        ]
    }
}

onMounted(async () => {
    if (auth.currentUser) {
        const categoryRef = doc(db, auth.currentUser.uid, 'data')
        const categorySnap = await getDoc(categoryRef)
        const categories = categorySnap.data()!.category

        interface CategoryDocElm {
            color: string
            type: string
        }
        chartLabels.value = categories!.map((e: CategoryDocElm) => e.type)
        chartBgColor.value = categories!.map((e: CategoryDocElm) => e.color)

        setChartValue()
    }
})

watch(props, setChartValue)

const options: ChartOptions<'doughnut'> = {
    layout: {
        padding: 20
    }
}
</script>

<template>
    <Doughnut :chart-data="chartData" :chart-options="options"></Doughnut>
</template>

<style lang="scss">

</style>