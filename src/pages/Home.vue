<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { query, orderBy, limit, collection, doc, getDoc, getDocs, DocumentData } from 'firebase/firestore'
import { auth, db } from '../firebase'
import DoughnutChart from '../components/DoughnutChart.vue'

const timelineData = ref<DocumentData[]>([])
const thisMonthLoading = ref<boolean>(true)

const chartValue = ref<number[]>([])

const date = new Date()
const thisMonth = `${date.getFullYear()}-${date.getMonth() + 1}` // YYYY-MM

onMounted(async () => {
    if (auth.currentUser) {
        const colRef = collection(db, auth.currentUser.uid)

        const tlq = query(colRef, orderBy('createdAt', 'desc'), limit(5))
        const tlSnap = await getDocs(tlq)
        tlSnap.forEach(doc => timelineData.value.push(doc.data()))
        console.log(timelineData.value)

        const statsRef = doc(db, auth.currentUser!.uid, `stats-${thisMonth}`)
        const statsData = (await getDoc(statsRef)).data()
        console.log(statsData)

        chartValue.value = await statsData!.expense.map((e: DocumentData) => e.amount)

        thisMonthLoading.value = false
    }
})

</script>

<template>
    <h2>今月の出費</h2>
    <div class="chart-wrap">
        <span v-if="thisMonthLoading">Loading</span>
        <DoughnutChart v-else-if="chartValue.length" :month="thisMonth" />
        <div v-else-if="chartValue.length == 0" class="no-data">
            <img src="../assets/pigbear.png" alt="">
            今月のデータはありません。
        </div>
    </div>
    <h2>最近の記録</h2>
    <div class="tl-wrap">
        <QTimeline color="secondary" class="tl">
            <QTimelineEntry v-for="snap in timelineData" :subtitle="snap.date" :title="snap.category">
                <div class="tl-inner">
                    <p>{{ snap.memo }}</p>
                    <span>￥{{ snap.amount }}</span>
                </div>
            </QTimelineEntry>
        </QTimeline>
    </div>
</template>

<style scoped lang="scss">
h2 {
    width: 400px;
    margin: 32px auto 16px;
    color: #504a44;
}

h2:nth-of-type(2) {
    margin: 48px auto 0;
}

.chart-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
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
    border: 1px solid rgba(80, 73, 67, 0.08);
    border-radius: 8px;
    background-color: rgba(80, 73, 67, 0.04);
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
    padding: 12px 24px;
}

.tl {
    width: 400px
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