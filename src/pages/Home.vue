<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { query, orderBy, limit, collection, doc, getDoc, getDocs, DocumentData } from 'firebase/firestore'
import { auth, db } from '../firebase'
import DoughnutChart from '../components/DoughnutChart.vue'

const timelineData = ref<Array<any>>([])
const thisMonthLoading = ref<Boolean>(true)

const chartLabels = ref<Array<any>>([])
const chartBgColor = ref<Array<any>>([])
const chartValue = ref<Array<any>>([])

onMounted(async () => {
    if (auth.currentUser) {
        const colRef = collection(db, auth.currentUser.uid)

        const tlq = query(colRef, orderBy('createdAt', 'desc'), limit(5))
        const tlSnap = await getDocs(tlq)
        tlSnap.forEach(doc => timelineData.value.push(doc.data()))
        console.log(timelineData.value)

        const categoryRef = doc(db, auth.currentUser!.uid, 'data')
        const categorySnap = await getDoc(categoryRef)
        const categories = categorySnap.data()!.category

        interface CategoryDocElm {
            color: String
            type: String
        }
        chartLabels.value = categories!.map((e: CategoryDocElm) => e.type)
        chartBgColor.value = categories!.map((e: CategoryDocElm) => e.color)

        const date = new Date()
        const thisMonth = `${date.getFullYear()}-${date.getMonth() + 1}` // YYYY-MM
        const statsRef = doc(db, auth.currentUser!.uid, `stats-${thisMonth}`)
        const statsData = (await getDoc(statsRef)).data()
        console.log(statsData)

        chartValue.value = await statsData!.expense.map((e: DocumentData) => e.amount)

        thisMonthLoading.value = false
    }
})

</script>
        
<template>
    <div class="chart-wrap">
        <span v-if="thisMonthLoading">Loading</span>
        <DoughnutChart v-else-if="chartValue.length" :chart-value="chartValue" :labels="chartLabels"
            :background-color="chartBgColor" />
        <p v-else-if="chartValue.length == 0">今月のデータはありません。</p>
    </div>
    <div class="container">
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
.chart-wrap {
    display: flex;
    align-items: center;
    width: 400px;
    min-height: 176px;
    margin: 0 auto;

    p {
        width: 100%;
        margin: 0;
        padding: 2rem 0;
        border-radius: 0.375rem;
        background-color: rgba(80, 73, 67, 0.1);
        text-align: center;
        font-size: 1.375rem;
    }
}

.container {
    display: flex;
    justify-content: center;
    padding: 24px;
}

.tl {
    width: 400px
}

.tl-inner {
    display: flex;
    justify-content: space-between;

    span {
        display: block;
        margin-left: 16px;
        font-size: 1.25em;
    }
}
</style>