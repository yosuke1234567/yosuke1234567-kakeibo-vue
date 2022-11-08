<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { query, orderBy, limit, collection, doc, getDoc, getDocs, DocumentData } from 'firebase/firestore'
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
    month: string
}

const props = defineProps<props>()

const chartData = ref<ChartData<'doughnut'>>({
    labels: [],
    datasets: []
})

onMounted(async () => {
    if (auth.currentUser) {
        const categoryRef = doc(db, auth.currentUser!.uid, 'data')
        const categorySnap = await getDoc(categoryRef)
        const categories = categorySnap.data()!.category

        interface CategoryDocElm {
            color: string
            type: string
        }
        const chartLabels: string[] = categories!.map((e: CategoryDocElm) => e.type)
        const chartBgColor: string[] = categories!.map((e: CategoryDocElm) => e.color)

        const statsRef = doc(db, auth.currentUser!.uid, `stats-${props.month}`)
        const statsData = (await getDoc(statsRef)).data()
        const chartValue = await statsData!.expense.map((e: DocumentData) => e.amount)

        chartData.value = {
            labels: chartLabels,
            datasets: [
                {
                    borderColor: '#f5f2eb',
                    backgroundColor: chartBgColor,
                    data: chartValue
                }
            ]
        }
    }
})

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