<script setup lang="ts">
import { onAuthStateChanged } from '@firebase/auth';
import { onMounted, ref } from 'vue';
import { auth } from './firebase';
import MainPage from './pages/MainPage.vue';
import SignIn from './pages/SignIn.vue';

const signInState = ref<boolean>()

const unsubscribe = onAuthStateChanged(auth, (user) => {
    signInState.value = user ? true : false
    console.log('unsubscribe')
})

onMounted(() => unsubscribe())

const a = () => {
    signInState.value = auth.currentUser ? true : false
}
</script>

<template>
    <MainPage v-if="signInState" />
    <SignIn v-else-if="signInState === false" :a="a" />
    <div v-else class="loading"><QSpinnerOval size="3em" /></div>
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