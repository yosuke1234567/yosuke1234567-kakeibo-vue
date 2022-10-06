<script setup lang="ts">
import { arrayUnion, doc, getDoc, updateDoc } from '@firebase/firestore';
import { onMounted, ref } from 'vue';
import { auth, db } from '../firebase';

const date = ref<String>()
const amount = ref<any>()
const memo = ref('')

const category = ref('')
const options = ref([])

const uid = ref('')

const categoryErr = ref(false)
const amountErr = ref(false)

const amountReg = /^[1-9][0-9]*$/

onMounted(async () => {
    if (auth.currentUser) {
        const decRef = doc(db, auth.currentUser.uid, 'data')
        const docSnap = await getDoc(decRef)
        const docObj = docSnap.data()
        if (docObj) options.value = docObj.category

        uid.value = auth.currentUser.uid
    }
})

const onSubmit = async (e: Event) => {
    e.preventDefault()

    if (date.value === undefined) console.log('calendar error')
    categoryErr.value = category.value === '' ? true : false
    amountErr.value = !amountReg.test(amount.value) ? true : false

    if ((typeof (date.value) === 'string') && (category.value !== '') && amountReg.test(amount.value)) {
        console.log('succces')
        const docRef = doc(db, uid.value, 'expense')
        await updateDoc(docRef, {
            [date.value]: arrayUnion(
                {
                    date: date.value,
                    category: category.value,
                    amount: amount.value,
                    memo: memo.value,
                    id: Date.now()
                }
            )
        })
    }
}

const onKeydown = (e: KeyboardEvent) => {
    e.key === 'Enter' ? e.preventDefault() : null
}
</script>
        
<template>
    <div class="container">
        <form @submit="onSubmit" class="row items-center q-gutter-x-lg q-pa-lg shadow-2">
            <QDate v-model="date" mask="YYYY-MM-DD" flat></QDate>
            <div class="q-gutter-y-lg q-pl-xl q-pr-lg input-wrap">
                <QSelect v-model="category" label="カテゴリー *" :options="options" filled :class="{err: categoryErr}">
                    <template v-slot:prepend>
                        <q-icon name="category" />
                    </template>
                </QSelect>
                <QInput v-model.number="amount" @keydown="onKeydown" label="金額 *" filled inputmode="numeric"
                    :class="{err: amountErr}" class="amount-input" autocomplete="off">
                    <template v-slot:prepend>
                        <q-icon name="payments" />
                    </template>
                </QInput>
                <QInput v-model="memo" label="メモ" filled autogrow>
                    <template v-slot:prepend>
                        <q-icon name="edit" />
                    </template>
                </QInput>
                <QBtn type="submit" unelevated color="amber-4" text-color="initial" class="full-width">保存</QBtn>
            </div>
        </form>
    </div>
</template>
        
<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    padding: 32px;
}

form {
    background-color: #fff;
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