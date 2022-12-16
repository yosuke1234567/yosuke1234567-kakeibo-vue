<script setup lang="ts">
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ref } from 'vue';
import { auth } from '../firebase';

interface props {
    verify: Function
}
const props = defineProps<props>()

const email = ref('')
const pass = ref('')
const isPwd = ref(true)

const onSubmit = async (e: Event) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email.value, pass.value)
    console.log('sign in')
    props.verify()
}

</script>
    
<template>
    <div class="container">
        <h2>サインイン</h2>
        <form @submit="onSubmit" class="q-gutter-y-lg">
            <QInput type="email" v-model="email" label="メールアドレス" class="full-width u-bg-white" />
            <QInput :type="isPwd ? 'password' : 'text'" v-model="pass" label="パスワード" class="full-width u-bg-white">
                <template v-slot:append>
                    <QIcon :name="isPwd ? 'sym_r_visibility_off' : 'sym_r_visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                </template>
            </QInput>
            <QBtn type="submit" label="サインイン" unelevated color="secondary" text-color="initial" padding="12px 0" class="full-width" />
        </form>
    </div>
</template>
    
<style scoped lang="scss">
.container {
    width: 400px;
    max-width: 90%;
    margin: 0 auto;
}

h2 {
    margin: 0;
    padding: 48px 0 20px;
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>