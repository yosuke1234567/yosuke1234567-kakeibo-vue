<script setup lang="ts">
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { onMounted, ref } from 'vue';
import { updateMonthData } from '../components/updateMonthData';
import { auth, db } from '../firebase';

const date = ref<any>()
const amount = ref<any>()
const memo = ref('')

const category = ref('')
const options = ref([])

const uid = ref('')

const categoryErr = ref(false)
const amountErr = ref(false)

const amountReg = /^[1-9][0-9]*$/

interface category {
    type: String,
    color: String
}

onMounted(async () => {
    if (auth.currentUser) {
        const docRef = doc(db, auth.currentUser.uid, 'data')
        const docSnap = await getDoc(docRef)
        const docObj = docSnap.data()
        if (docObj) {
            options.value = docObj.category.map((e: category) => e.type)
        }

        uid.value = auth.currentUser.uid
    }
})

const onSubmit = async (e: Event) => {
    e.preventDefault()

    if (date.value === undefined) console.log('calendar error')
    categoryErr.value = category.value === '' ? true : false
    amountErr.value = !amountReg.test(amount.value) ? true : false

    if ((typeof (date.value) === 'string') && (category.value !== '') && amountReg.test(amount.value)) {
        console.log('sent firebase')
        const id = Date.now()
        const docRef = doc(db, uid.value, `expense-${id}`)
        await setDoc(docRef, {
            date: date.value,
            category: category.value,
            amount: amount.value,
            memo: memo.value,
            createdAt: id
        })

        await updateMonthData()
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
            <QInput v-model="date" type="date" stack-label label="日付 *" class="u-bg-white u-del-date-icon">
                <template v-slot:prepend>
                    <QIcon name="sym_r_event" class="cursor-pointer">
                        <QPopupProxy cover transition-show="fade" transition-hide="fade">
                            <QDate v-model="date" first-day-of-week="0" mask="YYYY-MM-DD" flat>
                                <div class="row items-center justify-end">
                                    <QBtn v-close-popup label="閉じる" color="primary" flat />
                                </div>
                            </QDate>
                        </QPopupProxy>
                    </QIcon>
                </template>
            </QInput>
            <QSelect v-model="category" label="カテゴリー *" :options="options" :class="{err: categoryErr}"
                class="u-bg-white">
                <template v-slot:prepend>
                    <q-icon name="sym_r_category" />
                </template>
            </QSelect>
            <QInput v-model.number="amount" @keydown="onKeydown" label="金額 *" inputmode="numeric"
                :class="{err: amountErr}" class="amount-input u-bg-white" autocomplete="off">
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
</style>