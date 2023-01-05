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
const yearNum = ref(date.getFullYear())
const monthNum = ref(date.getMonth() + 1)
const setLabels = () => {
    for (let i = 0; i < 6; i++) {
        if ((monthNum.value - i) > 0) {
            if ((monthNum.value - i) < 13) {
                const month = (monthNum.value - i).toString().padStart(2, '0') // 月の0埋め
                chartLabels.value.unshift(`${yearNum.value}-${month}`)
            } else {
                const month = ((monthNum.value - i) - 12).toString().padStart(2, '0')
                chartLabels.value.unshift(`${yearNum.value + 1}-${month}`)
            }
        } else {
            const month = (12 - (i - monthNum.value)).toString().padStart(2, '0')
            chartLabels.value.unshift(`${yearNum.value - 1}-${month}`)
        }
    }
    console.log(chartLabels.value)
}

const doughnutValue = ref<number[]>([])

const barValue = ref<number[]>([])
const barBg = ref<string[]>(['#ddd0bb', '#ddd0bb', '#ddd0bb', '#ddd0bb', '#ddd0bb', '#fdd835'])
const monthIndex = ref<string>(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`)
const monthIndexNum = ref<number>(5) // activeのbarValueが何番目かを保存
const activeValue = ref<number>()
const barPage = ref<number>(0) // 現在表示している月があるページを0とする

const setMonth = async (index: number) => {
    if (monthIndex.value !== chartLabels.value[index]) openDetail.value = false
    monthIndexNum.value = index
    monthIndex.value = chartLabels.value[index]
    activeValue.value = barValue.value[index]
    barPage.value = 0
    for (let i = 0; i < 6; i++) {
        barBg.value[i] = i == index ? '#fdd835' : '#ddd0bb'
    }
    doughnutValue.value = await getDoughnutValue(monthIndex.value)
}

const monthlyData = ref<DocumentData[]>([])
const openDetail = ref(false)
const openDelete = ref(false)

const deleteDocRef = ref<DocumentReference>()

onMounted(async () => {
    if (auth.currentUser) {
        setLabels()
        barValue.value = await getBarValue(chartLabels.value)
        doughnutValue.value = await getDoughnutValue(monthIndex.value)
        activeValue.value = barValue.value[5]
    }
})

// ページネーション
const navigateBar = async (margin: number) => {
    if (monthNum.value + margin <= -6) {
        yearNum.value = yearNum.value - 1
        monthNum.value = monthNum.value + margin + 12
    } else {
        monthNum.value = monthNum.value + margin
    }

    chartLabels.value.splice(0)
    setLabels()
    // barの背景色の設定
    barPage.value += margin > 0 ? 1 : -1
    for (let i = 0; i < 6; i++) {
        if (barPage.value == 0) {
            barBg.value[i] = i == monthIndexNum.value ? '#fdd835' : '#ddd0bb'
        } else {
            barBg.value[i] = '#ddd0bb'
        }
    }
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
    openDelete.value = false
}

</script>
        
<template>
    <div class="u-inner">
        <h2>統計</h2>
        <div class="chart-wrap">
            <q-card class="q-py-md q-mb-lg radius-8">
                <div class="amount-area">
                    {{ monthIndex.slice(0, 4) }}年 {{ monthIndex.slice(5, 7) }}月
                    <span v-if="(activeValue || activeValue == 0)">￥{{ activeValue.toLocaleString() }}</span>
                </div>
                <div v-if="barValue.length">
                    <BarChart :chart-value="barValue" :labels="chartLabels" :bg="barBg" :set-month="setMonth" />
                    <div class="pagination">
                        <q-btn @click="navigateBar(-6)" icon="sym_r_navigate_before" size="md" flat round class="q-mr-sm" />
                        <q-btn @click="navigateBar(6)" icon="sym_r_navigate_next" size="md" flat round />
                    </div>
                </div>
            </q-card>
            <q-card v-if="doughnutValue.length" class="radius-8">
                <DoughnutChart :chart-value="doughnutValue" />
            </q-card>
        </div>
        <div v-if="doughnutValue.length" class="detail-wrap">
            <q-card v-if="openDetail" transition="fade" class="full-width">
                <div class="detail-title">
                    {{ monthIndex.slice(0, 4) }}年 {{ new Date(monthIndex).getMonth() + 1 }}月
                </div>
                <q-card-section class="q-py-sm">
                    <q-list separator>
                        <q-item v-for="snap in monthlyData" class="q-pa-md">
                            <q-item-section avatar class="q-pr-lg">
                                <q-avatar color="primary" text-color="white" size="md" rounded>{{ snap.date.slice(8) }}
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>￥{{ snap.amount.toLocaleString() }} - {{ snap.category }}</q-item-label>
                                <q-item-label caption>{{ snap.memo }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-btn @click="showDeleteDialog(snap.createdAt)" icon="sym_r_delete" size="md" flat round />
                            </q-item-section>
                        </q-item>
                    </q-list>
                    <q-dialog v-model="openDelete">
                        <q-card class="dialog-card">
                            <q-card-section class="dialog-section">
                                <img src="../assets/honey.png" alt="" draggable="false">
                                <div>削除しますか？</div>
                            </q-card-section>
                            <q-card-actions class="justify-end">
                                <q-btn label="キャンセル" @click="openDelete = false" class="col" />
                                <q-btn label="OK" @click="deleteData" color="secondary" text-color="initial" class="col" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                </q-card-section>
            </q-card>
            <q-btn v-else @click="showDetail" label="詳細を表示" color="secondary" text-color="initial" padding="10px 32px" class="block q-mx-auto q-mt-sm" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
h2 {
    text-align: center;
    margin: 0 0 20px;
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
    margin: 10px auto 8px;
    padding: 16px 32px;
    border: 1px solid rgba(80, 73, 67, 0.16) !important;
    border-radius: 4px !important;
    background-color: rgba(80, 73, 67, 0.08);
}

.radius-8 {
    border-radius: 8px;
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
    max-width: 100%;
    padding: 0 16px 16px;
}
</style>