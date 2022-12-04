<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { DocumentData, deleteDoc, doc, DocumentReference } from 'firebase/firestore'
import { auth, db } from '../firebase'
import BarChart from '../components/BarChart.vue'
import DoughnutChart from '../components/DoughnutChart.vue'
import { getMonthlyData } from '../components/getMonthlyData'
import { updateMonthlyData } from '../components/updateMonthlyData'
import { getDoughnutValue } from '../components/getDoughnutValue'
import { getBarValue } from '../components/getBarValue'

const chartLabels = ref<string[]>([])
const date = new Date()
const monthNum = ref(date.getMonth() + 1)
const setLabels = () => {
    for (let i = 0; i < 6; i++) {
        if ((monthNum.value - i) > 0) {
            if ((monthNum.value - i) < 13) {
                const month = (monthNum.value - i).toString().padStart(2, '0') // 月の0埋め
                chartLabels.value.unshift(`${date.getFullYear()}-${month}`)
            } else {
                const month = ((monthNum.value - i) - 12).toString().padStart(2, '0')
                chartLabels.value.unshift(`${date.getFullYear() + 1}-${month}`)
            }
        } else {
            const month = (12 - (i - monthNum.value)).toString().padStart(2, '0')
            chartLabels.value.unshift(`${date.getFullYear() - 1}-${month}`)
        }
    }
    console.log(chartLabels.value)
}

const barValue = ref<number[]>([])
const doughnutValue = ref<number[]>([])
const doughnutSum = ref<number>()

const setDoughnutSum = () => {
    let sum = 0
    for (let i=0; i<doughnutValue.value.length; i++) {
        sum += doughnutValue.value[i]
    }
    doughnutSum.value = sum
}

const monthlyData = ref<DocumentData[]>([])

const monthIndex = ref<string>(`${date.getFullYear()}-${date.getMonth() + 1}`)
const monthIndexNum = ref<number>(5) // activeValue用のindex
const activeValue = ref<number>()
const setMonth = async (index: number) => {
    if (monthIndex.value !== chartLabels.value[index]) openDetail.value = false
    monthIndexNum.value = index
    monthIndex.value = chartLabels.value[index]
    activeValue.value = barValue.value[index]
    doughnutValue.value = await getDoughnutValue(monthIndex.value)
    setDoughnutSum()
}

const openDetail = ref(false)
const openDelete = ref(false)

const deleteDocRef = ref<DocumentReference>()

onMounted(async () => {
    if (auth.currentUser) {
        setLabels()
        barValue.value = await getBarValue(chartLabels.value)
        doughnutValue.value = await getDoughnutValue(monthIndex.value)
        activeValue.value = barValue.value[5]
        setDoughnutSum()
    }
})

// ページネーション
const navigateBar = async (margin: number) => {
    monthNum.value = monthNum.value + margin
    chartLabels.value.splice(0)
    setLabels()
    barValue.value = await getBarValue(chartLabels.value)
}

const showDetail = async () => {
    const time = new Date(monthIndex.value).getTime()
    monthlyData.value = await getMonthlyData(time)
    openDetail.value = true
}

const showDeleteDialog = (id: number) => {
    deleteDocRef.value = doc(db, auth.currentUser!.uid, `expense-${id}`)
    openDelete.value = true
}

const deleteData = async () => {
    const time = new Date(monthIndex.value).getTime()
    await deleteDoc(deleteDocRef.value!)
    await updateMonthlyData(time)

    monthlyData.value = await getMonthlyData(time)
    barValue.value = await getBarValue(chartLabels.value)
    doughnutValue.value = await getDoughnutValue(monthIndex.value)

    activeValue.value = barValue.value[monthIndexNum.value]
    setDoughnutSum()
    openDelete.value = false
}

</script>
        
<template>
    <h2>統計</h2>
    <div class="chart-wrap">
        <div class="amount-area">
            {{ monthIndex.slice(0, 4) }}年 {{ new Date(monthIndex).getMonth() + 1 }}月
            <span v-if="(activeValue || activeValue == 0)">￥{{ activeValue }}</span>
        </div>
        <div v-if="barValue.length">
            <BarChart :chart-value="barValue" :labels="chartLabels" :set-month="setMonth" />
            <div class="pagination">
                <QBtn @click="navigateBar(-6)" icon="sym_r_navigate_before" size="md" flat round class="q-mr-sm" />
                <QBtn @click="navigateBar(6)" icon="sym_r_navigate_next" size="md" flat round />
            </div>
        </div>
        <DoughnutChart v-if="doughnutSum" :chart-value="doughnutValue" />
    </div>
    <div v-if="doughnutSum" class="detail-wrap">
        <QCard v-if="openDetail" transition-show="fade" transition-hide="fade" class="full-width" flat bordered>
            <div class="detail-title">
                {{ monthIndex.slice(0, 4) }}年 {{ new Date(monthIndex).getMonth() + 1 }}月
            </div>
            <QCardSection class="q-py-sm">
                <QList separator>
                    <QItem v-for="snap in monthlyData" class="q-pa-md">
                        <QItemSection avatar class="q-pr-lg">
                            <QAvatar color="primary" text-color="white" size="md" rounded>{{ snap.date.slice(8) }}
                            </QAvatar>
                        </QItemSection>
                        <QItemSection>
                            <QItemLabel>￥{{ snap.amount }} - {{ snap.category }}</QItemLabel>
                            <QItemLabel caption class="">{{ snap.memo }}</QItemLabel>
                        </QItemSection>
                        <QItemSection side>
                            <QBtn @click="showDeleteDialog(snap.createdAt)" icon="sym_r_delete" size="md" flat round />
                        </QItemSection>
                    </QItem>
                </QList>
                <QDialog v-model="openDelete">
                    <QCard class="dialog-card">
                        <QCardSection class="dialog-section">
                            <img src="../assets/honey.png" alt="" draggable="false">
                            <div>削除しますか？</div>
                        </QCardSection>
                        <QCardActions class="justify-end">
                            <QBtn label="キャンセル" @click="openDelete = false" class="col" />
                            <QBtn label="OK" @click="deleteData" color="secondary" text-color="initial" class="col" />
                        </QCardActions>
                    </QCard>
                </QDialog>
            </QCardSection>
        </QCard>
        <QBtn v-else @click="showDetail" label="詳細を表示" outline padding="8px 32px" class="block q-mx-auto" />
    </div>
</template>

<style lang="scss" scoped>
h2 {
    text-align: center;
    margin: 0;
    padding: 32px 0 16px;
}

.chart-wrap,
.detail-wrap {
    width: 400px;
    margin: 0 auto;
}

.chart-wrap {
    min-height: 400px;
    text-align: center;
}

.pagination {
    margin-top: -16px;
}

.amount-area {
    width: fit-content;
    margin: 8px auto;
    padding: 16px 32px;
    border-radius: 4px;
    background-color: rgba(80, 73, 67, 0.08);
}

.detail-wrap {
    padding: 24px 0 48px;
}

.detail-title {
    padding: 16px 24px;
    background-color: $amber-4;
    font-size: 1.25em;
}

.dialog-section {
    text-align: center;
    font-size: 1.25rem;

    img {
        width: 200px;
        user-select: none;
    }
}

.dialog-card {
    width: 400px;
    padding: 0 16px 16px;
}
</style>