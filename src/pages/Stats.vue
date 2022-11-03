<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { query, orderBy, collection, doc, getDoc, getDocs, DocumentData } from 'firebase/firestore'
import { auth, db } from '../firebase'
import BarChart from '../components/BarChart.vue';

const data = ref<Array<any>>([])

const chartLabels = ref<Array<any>>(['10月', '11月'])
const chartValue = ref<Array<any>>([])

onMounted(async () => {
    if (auth.currentUser) {
        const colRef = collection(db, auth.currentUser.uid)
        const q = query(colRef, orderBy('statsMonth'))
        const snap = await getDocs(q)
        snap.forEach(doc => data.value.push(doc.data().expense))
        console.log(data.value)

        for (let i = 0; i < data.value.length; i++) {
            let oneMonthAmount = 0
            for (let j = 0; j < data.value[i].length; j++) {
                oneMonthAmount += data.value[i][j].amount
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
        <BarChart v-if="chartValue.length" :chart-value="chartValue" :labels="chartLabels" />
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