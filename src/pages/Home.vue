<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { query, orderBy, limit, collection, getDocs, DocumentData } from 'firebase/firestore'
import { auth, db } from '../firebase'
import DoughnutChart from '../components/DoughnutChart.vue'
import { getDoughnutValue } from '../components/getDoughnutValue';

const timelineData = ref<DocumentData[]>([])

const chartValue = ref<number[]>([])
const chartSum = ref<number>()

onMounted(async () => {
    if (auth.currentUser) {
        const colRef = collection(db, auth.currentUser.uid)

        const tlq = query(colRef, orderBy('createdAt', 'desc'), limit(5))
        const tlSnap = await getDocs(tlq)
        tlSnap.forEach(doc => timelineData.value.push(doc.data()))
        console.log(timelineData.value)

        const date = new Date()
        chartValue.value = await getDoughnutValue(`${date.getFullYear()}-${date.getMonth() + 1}`)

        let sum = 0
        for (let i = 0; i < chartValue.value.length; i++) {
            sum += chartValue.value[i]
        }
        chartSum.value = sum
    }
})

</script>

<template>
    <div class="u-inner">
        <h2>今月の出費</h2>
        <div class="chart-wrap">
            <div v-if="chartSum == 0" class="no-data">
                <img src="../assets/pigbear.png" alt="">
                今月のデータはありません。
            </div>
            <DoughnutChart v-else-if="chartValue.length" :chart-value="chartValue" />
            <span v-else>Loading</span>
        </div>
        <h2>最近の記録</h2>
        <div class="tl-wrap">
            <q-timeline color="secondary" class="tl">
                <q-timeline-entry v-for="snap in timelineData" :subtitle="snap.date" :title="snap.category">
                    <div class="tl-inner">
                        <p>{{ snap.memo }}</p>
                        <span>￥{{ snap.amount }}</span>
                    </div>
                </q-timeline-entry>
            </q-timeline>
        </div>
    </div>
</template>

<style scoped lang="scss">
h2 {
    margin: 0 0 16px;
}

h2:nth-of-type(2) {
    margin: 48px 0 16px;
}

.chart-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 176px;
    margin: 0 auto;
    box-shadow: rgba(80, 73, 67, 0.2) 0 2px 8px;
    // border: 1px solid rgba(80, 73, 67, 0.2);
    border-radius: 8px;
    background-color: #fffdfa;
}

.no-data {
    width: 100%;
    margin: 0;
    padding: 0 0 20px;
    // border: 1px solid rgba(80, 73, 67, 0.08);
    // background-color: rgba(80, 73, 67, 0.04);
    text-align: center;
    font-size: 1.375rem;

    img {
        display: block;
        margin: 0 auto;
        width: 200px;
    }
}

.tl-wrap {
    display: flex;
    justify-content: center;
}

.tl {
    margin: 0;
    padding: 0 8px;
}

.tl-inner {
    display: flex;
    justify-content: space-between;

    p {
        white-space: pre-wrap;
    }

    span {
        display: block;
        margin-left: 16px;
        font-size: 1.25em;
    }
}
</style>