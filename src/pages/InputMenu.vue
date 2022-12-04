<script setup lang="ts">
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { onMounted, ref } from 'vue';
import { updateMonthlyData } from '../components/updateMonthlyData';
import { auth, db } from '../firebase';

interface category {
    type: string,
    color: string
}

const date = ref('')
const amount = ref('')
const memo = ref('')

const category = ref('')
const options = ref<Array<category['type']>>([])

const calendarErr = ref(false)
const categoryErr = ref(false)
const amountErr = ref(false)

const amountReg = /^[1-9][0-9]*$/

const openDialog = ref(false)

onMounted(async () => {
    if (auth.currentUser) {
        const docRef = doc(db, auth.currentUser.uid, 'data')
        const docSnap = await getDoc(docRef)
        const docObj = docSnap.data()
        if (docObj) {
            options.value = docObj.category.map((e: category) => e.type)
        }
    }
})

const onSubmit = async (e: Event) => {
    e.preventDefault()

    calendarErr.value = date.value === '' ? true : false
    categoryErr.value = category.value === '' ? true : false
    amountErr.value = !amountReg.test(amount.value) ? true : false

    if ((typeof (date.value) === 'string') && (category.value !== '') && amountReg.test(amount.value)) {
        const monthIndex = new Date(date.value.slice(0, 7)).getTime()
        const id = Date.now()
        const docRef = doc(db, auth.currentUser!.uid, `expense-${id}`)
        await setDoc(docRef, {
            date: date.value,
            category: category.value,
            amount: amount.value,
            memo: memo.value,
            expenseMonthIndex: monthIndex,
            createdAt: id
        })

        await updateMonthlyData(monthIndex)

        date.value = ''
        amount.value = ''
        category.value = ''
        memo.value = ''

        openDialog.value = true
    }
}

const onKeydown = (e: KeyboardEvent) => {
    e.key === 'Enter' ? e.preventDefault() : null
}
</script>
            
<template>
    <div class="container">
        <h2>入力</h2>
        <form @submit="onSubmit" class="q-gutter-y-lg input-wrap">
            <QInput v-model="date" type="date" @keydown="onKeydown" stack-label label="日付 *"
                class="u-bg-white u-del-date-icon" :class="{ err: calendarErr }">
                <template v-slot:prepend>
                    <q-icon name="sym_r_calendar_today" />
                </template>
                <template v-slot:append>
                    <QBtn icon="sym_r_event" flat round size="md">
                        <QPopupProxy transition-show="fade" transition-hide="fade">
                            <QDate v-model="date" first-day-of-week="0" mask="YYYY-MM-DD" color="secondary"
                                text-color="dark" flat>
                                <div class="row items-center justify-end">
                                    <QBtn v-close-popup label="閉じる" color="primary" flat />
                                </div>
                            </QDate>
                        </QPopupProxy>
                    </QBtn>
                </template>
            </QInput>
            <QSelect v-model="category" label="カテゴリー *" :options="options" :class="{ err: categoryErr }"
                class="u-bg-white">
                <template v-slot:prepend>
                    <q-icon name="sym_r_category" />
                </template>
            </QSelect>
            <QInput v-model.number="amount" @keydown="onKeydown" label="金額 *" inputmode="numeric"
                :class="{ err: amountErr }" class="amount-input u-bg-white" autocomplete="off">
                <template v-slot:prepend>
                    <q-icon name="sym_r_currency_yen" />
                </template>
            </QInput>
            <QInput v-model="memo" label="メモ" autogrow class="u-bg-white">
                <template v-slot:prepend>
                    <q-icon name="sym_r_edit" />
                </template>
            </QInput>
            <QBtn type="submit" label="保存する" unelevated color="secondary" text-color="initial" padding="12px 0"
                class="full-width" />
        </form>
        <QDialog v-model="openDialog">
            <QCard class="q-px-lg q-pb-md">
                <QCardSection class="dialog-section">
                    <img src="../assets/bear.png" alt="" class="dialog-img" draggable="false">
                    <div>保存しました</div>
                </QCardSection>
                <QCardActions>
                    <QBtn label="閉じる" v-close-popup outline padding="8px 32px" class="q-mx-auto" />
                </QCardActions>
            </QCard>
        </QDialog>
    </div>
</template>
            
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
}

.input-wrap {
    width: 400px;
}

.err {
    position: relative;
    background-color: $red-2;
    margin-bottom: 36px;
}

.err::after {
    content: '選択してください。';
    position: absolute;
    bottom: -1.5em;
    color: $red-4;
    font-size: 0.75em;
}

.amount-input.err::after {
    content: '半角数字で入力してください。';
}

.dialog-section {
    text-align: center;
    font-size: 1.25rem;

    img {
        width: 250px;
        user-select: none;
    }
}
</style>