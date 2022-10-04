<script setup lang="ts">
import { onAuthStateChanged } from '@firebase/auth';
import { onMounted, ref } from 'vue';
import { auth } from './firebase';
import MainPage from './pages/MainPage.vue';
import SignIn from './pages/SignIn.vue';

const signInState = ref<Boolean>()

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        // user ? router.push('/main') : router.push('/')
        signInState.value = user ? true : false
    })
})

</script>

<template>
    <MainPage v-if="signInState" />
    <SignIn v-else-if="signInState === false" />
    <div v-else>loading...</div>
</template>

<style lang="scss">

</style>