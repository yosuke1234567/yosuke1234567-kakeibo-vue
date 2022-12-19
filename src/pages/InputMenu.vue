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
    <div class="u-inner">
        <h2>入力</h2>
        <form @submit="onSubmit" class="q-gutter-y-lg">
            <q-input v-model="date" type="date" @keydown="onKeydown" stack-label label="日付 *"
                class="u-bg-white u-del-date-icon" :class="{ err: calendarErr }">
                <template v-slot:prepend>
                    <q-icon name="sym_r_calendar_today" />
                </template>
                <template v-slot:append>
                    <q-btn icon="sym_r_event" flat round size="md">
                        <q-popup-proxy transition="fade">
                            <q-date v-model="date" first-day-of-week="0" mask="YYYY-MM-DD" color="secondary"
                                text-color="dark" flat>
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="閉じる" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-btn>
                </template>
            </q-input>
            <q-select v-model="category" label="カテゴリー *" :options="options" :class="{ err: categoryErr }"
                class="u-bg-white">
                <template v-slot:prepend>
                    <q-icon name="sym_r_category" />
                </template>
            </q-select>
            <q-input v-model.number="amount" @keydown="onKeydown" label="金額 *" inputmode="numeric"
                :class="{ err: amountErr }" class="amount-input u-bg-white" autocomplete="off">
                <template v-slot:prepend>
                    <q-icon name="sym_r_currency_yen" />
                </template>
            </q-input>
            <q-input v-model="memo" label="メモ" autogrow class="u-bg-white">
                <template v-slot:prepend>
                    <q-icon name="sym_r_edit" />
                </template>
            </q-input>
            <q-btn type="submit" label="保存する" unelevated color="secondary" text-color="initial" padding="12px 0"
                class="full-width" />
        </form>
        <q-dialog v-model="openDialog">
            <q-card class="q-px-lg q-pb-md">
                <q-card-section class="dialog-section">
                    <img src="../assets/bear.png" alt="" class="dialog-img" draggable="false">
                    <div>保存しました</div>
                </q-card-section>
                <q-card-actions>
                    <q-btn label="閉じる" v-close-popup outline padding="8px 32px" class="q-mx-auto" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
            
<style scoped lang="scss">
h2 {
    margin: 0;
    padding: 0 0 20px;
    text-align: center;
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