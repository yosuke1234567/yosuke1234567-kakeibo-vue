<script setup lang="ts">
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ref } from 'vue';
import { auth } from '../firebase';

const email = ref("")
const pass = ref("")
const isPwd = ref(true)

const onSubmit = (e: Event) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email.value, pass.value)
    .then(() => console.log('sign in'))
}

</script>
    
<template>
    <div>
        <h2>サインイン</h2>
        <form @submit="onSubmit" class="q-gutter-y-lg">
            <QInput type="email" v-model="email" label="メールアドレス" filled class="full-width" />
            <QInput :type="isPwd ? 'password' : 'text'" v-model="pass" label="パスワード" filled class="full-width">
                <template v-slot:append>
                    <QIcon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                </template>
            </QInput>
            <QBtn type="submit" padding="12px 0" class="full-width">サインイン</QBtn>
        </form>
    </div>
</template>
    
<style scoped lang="scss">
div {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>