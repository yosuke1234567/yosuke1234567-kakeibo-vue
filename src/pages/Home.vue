<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { query, orderBy, limit, collection, doc, getDoc, getDocs, setDoc, where } from "firebase/firestore"
import { auth, db } from '../firebase'
import DoughnutChart from '../components/DoughnutChart.vue'

const timelineData = ref<Array<any>>([])
const thisMonthData = ref<Array<any>>([])

const chartLabels = ref<Array<any>>([])
const chartBgColor = ref<Array<any>>([])
const chartValue = ref<Array<any>>([])

interface category {
    type: String,
    color: String
}

onMounted(async () => {
    if (auth.currentUser) {
        const colRef = collection(db, auth.currentUser.uid)

        const tlq = query(colRef, orderBy('createdAt', 'desc'), limit(5))
        const tlSnap = await getDocs(tlq)
        tlSnap.forEach(doc => timelineData.value.push(doc.data()))
        console.log(timelineData.value)

        const date = new Date()
        const thisMonth = `${date.getFullYear()}-${date.getMonth() + 1}-01`
        const tmq = query(colRef, where('date', '>=', thisMonth))
        const tmSnap = await getDocs(tmq)
        tmSnap.forEach(doc => thisMonthData.value.push(doc.data()))
        console.log(thisMonthData.value)

        const docRef = doc(db, auth.currentUser.uid, 'data')
        const docSnap = await getDoc(docRef)
        const docObj = docSnap.data()
        let f: { amount: number; category: any; }[] = []
        if (docObj) {
            chartLabels.value = docObj.category.map((e: category) => e.type)
            chartBgColor.value = docObj.category.map((e: category) => e.color)

            chartLabels.value.forEach((e: any) => {
                f.push({
                    amount: 0,
                    category: e
                })
            })
        }

        const statsRef = doc(db, auth.currentUser!.uid, 'stats-2022-10')
        
        for (let i=0; i<thisMonthData.value.length; i++) {
            f.forEach((e: any) => {
                if (thisMonthData.value[i].category === e.category) {
                    e.amount += thisMonthData.value[i].amount
                }
            })
        }
        await setDoc(statsRef, {
            expense: f
        })
        chartValue.value = f.map((e: any) => e.amount)
        console.log(chartValue.value)
    }
})

</script>
        
<template>
    <div class="chart-wrap">
        <DoughnutChart :chart-value="chartValue" :labels="chartLabels" :background-color="chartBgColor" />
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
    width: 400px;
    margin: 0 auto;
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
        font-weight: 700;
    }
}
</style>