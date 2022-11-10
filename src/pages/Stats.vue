<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { query, orderBy, collection, getDocs, DocumentData } from 'firebase/firestore'
import { auth, db } from '../firebase'
import BarChart from '../components/BarChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';

const chartLabels = ref<Array<string>>([])
const date = new Date()
for (let i = 0; i < 6; i++) {
    (date.getMonth() + 1 - i) > 0
        ? chartLabels.value.unshift(`${date.getFullYear()}-${date.getMonth() + 1 - i}`)
        : chartLabels.value.unshift(`${date.getFullYear() - 1}-${12 - (i - date.getMonth() + 1)}`)
}
console.log(chartLabels.value)
console.log(chartLabels.value[0].slice(5))

const docData = ref<Array<DocumentData>>([])

const chartValue = ref<Array<number>>([])

const monthIndex = ref<string>(`${date.getFullYear()}-${date.getMonth() + 1}`)
const setMonth = (index: number) => {
    monthIndex.value = chartLabels.value[index]
    console.log(monthIndex.value)
}

onMounted(async () => {
    if (auth.currentUser) {
        const colRef = collection(db, auth.currentUser.uid)
        const q = query(colRef, orderBy('statsMonth'))
        const snap = await getDocs(q)
        snap.forEach(doc => docData.value.push(doc.data()))
        console.log(docData.value)

        const data: Array<Array<{amount: number; category?: string}>> = []
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < docData.value.length; j++) {
                if(chartLabels.value[i] === docData.value[j].statsMonth) {
                    data[i] = docData.value[j].expense
                    break
                } else {
                    data[i] = [{amount: 0}]
                }
            }
        }
        console.log(data)

        for (let i = 0; i < 6; i++) {
            let oneMonthAmount = 0
            for (let j = 0; j < data[i].length; j++) {
                oneMonthAmount += data[i][j].amount
            }
            chartValue.value.push(oneMonthAmount)
        }
        console.log(chartValue.value)
    }
})

</script>
        
<template>
    <h2>統計</h2>
    <div class="chart-wrap">
        <BarChart v-if="chartValue.length" :chart-value="chartValue" :labels="chartLabels" :set-month="setMonth" />
        <DoughnutChart :month="monthIndex" />
    </div>
</template>

<style lang="scss" scoped>
h2 {
    text-align: center;
    margin: 32px auto 16px;
}

.chart-wrap {
    width: 400px;
    margin: 0 auto;
}
</style>