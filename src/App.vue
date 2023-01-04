<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore'
import { auth, db } from './firebase';
import MainPage from './pages/MainPage.vue';
import SignIn from './pages/SignIn.vue';
import { palette } from './components/palette';

const signInState = ref<boolean>()

const unsubscribe = onAuthStateChanged(auth, (user) => {
    signInState.value = user ? true : false
    console.log('unsubscribe')
})

onMounted(() => unsubscribe())

const verify = async () => {
    if (auth.currentUser) {
        const docRef = doc(db, auth.currentUser.uid, 'data')
        const docData = (await getDoc(docRef)).data()

        // カテゴリー未設定の場合、初期設定
        if (docData === undefined) {
            await setDoc(docRef, {
                category: [
                    { type: '食費', color: palette[0] },
                    { type: '日用品', color: palette[1] },
                    { type: '交際費', color: palette[2] },
                    { type: '交通費', color: palette[4] },
                    { type: '衣服', color: palette[5] },
                    { type: '水道光熱費', color: palette[6] },
                    { type: 'その他', color: palette[15] }
                ]
            })
            console.log('set category')
        }

        signInState.value = true
    }
}
</script>

<template>
    <MainPage v-if="signInState" />
    <SignIn v-else-if="signInState === false" :verify="verify" />
    <div v-else class="loading">
        <q-spinner-oval size="3em" />
    </div>
</template>

<style scoped lang="scss">
.loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>