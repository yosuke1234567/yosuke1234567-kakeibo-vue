<script setup lang="ts">
import { doc, getDoc } from '@firebase/firestore';
import { onMounted, ref } from 'vue';
import { auth, db } from '../firebase';

const date = ref<String>()
const money = ref()
const memo = ref('')
const category = ref('')
const options = ref([])

const onSubmit = (e: Event) => {
    e.preventDefault()
}

onMounted(async () => {
    if (auth.currentUser) {
        const decRef = doc(db, auth.currentUser.uid, 'data')
        const docSnap = await getDoc(decRef)
        const docObj = docSnap.data()
        if (docObj) options.value = docObj.category
    }
})
</script>
        
<template>
    <div class="container">
        <form @submit="onSubmit" class="row items-center q-gutter-x-lg">
            <QDate v-model="date" flat></QDate>
            <div class="q-gutter-y-lg">
                <QSelect v-model="category" label="カテゴリー" :options="options" filled>
                    <template v-slot:prepend>
                        <q-icon name="category" />
                    </template>
                </QSelect>
                <QInput v-model="money" label="金額" required filled inputmode="numeric" pattern="[0-9]{1,9}"
                    autocomplete="off">
                    <template v-slot:prepend>
                        <q-icon name="payments" />
                    </template>
                </QInput>
                <QInput v-model="memo" label="メモ" filled autogrow>
                    <template v-slot:prepend>
                        <q-icon name="edit" />
                    </template>
                </QInput>
                <QBtn type="submit">保存</QBtn>
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
</style>