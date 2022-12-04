<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { doc, getDoc } from '@firebase/firestore';
import { auth, db } from '../firebase'
import { useRouter } from 'vue-router';

const router = useRouter()

interface Category {
    type: string,
    color: string
}

const confirmSignOut = ref(false)
const categories = ref<Category[]>([])
const email = auth.currentUser!.email

onMounted(async () => {
    if (auth.currentUser) {
        const docRef = doc(db, auth.currentUser.uid, 'data')
        const docData = (await getDoc(docRef)).data()

        if (docData) {
            categories.value = docData.category
            console.log(categories.value)
        }
    }
})

const signOut = async () => {
    await auth.signOut()
    console.log('sign out')
    // ページを更新
    router.go(0)
}

</script>
        
<template>
    <div class="container">
        <h2 class="text-center">マイページ</h2>
        <div>{{ email }}</div>
        <QCard flat bordered class="q-mt-sm">
            <QItem @click="confirmSignOut = true" clickable class="q-px-lg q-py-md">
                <QItemSection avatar>
                    <QIcon name="sym_r_logout" />
                </QItemSection>
                <QItemSection>サインアウト</QItemSection>
            </QItem>
        </QCard>
        <QDialog v-model="confirmSignOut">
            <QCard class="q-px-lg q-py-md">
                <QCardSection class="dialog-section">
                    <div>サインアウトしますか？</div>
                </QCardSection>
                <QCardActions class="justify-end">
                    <QBtn label="キャンセル" @click="confirmSignOut = false" />
                    <QBtn label="OK" @click="signOut" color="secondary" text-color="initial" />
                </QCardActions>
            </QCard>
        </QDialog>
        <div class="category-wrap">
            <div class="category-head">
                <h3>カテゴリー</h3>
                <QBtn label="編集" color="primary" flat />
            </div>
            <QCard v-if="categories" flat bordered>
                <QList separator>
                    <QItem v-for="category in categories" class="q-px-lg q-py-md">
                        <QItemSection>
                            {{ category.type }}
                        </QItemSection>
                        <QItemSection side>
                            <div :style="{ backgroundColor: category.color }" class="category-color"></div>
                        </QItemSection>
                    </QItem>
                </QList>
            </QCard>
        </div>
    </div>
</template>
        
<style lang="scss" scoped>
.container {
    width: 400px;
    margin: 0 auto;
    padding: 32px 0;

    h2 {
        margin: 0 0 20px;
    }
}

.category-head {
    display: flex;
    align-items: center;
    padding: 24px 0 4px;

    h3 {
        margin: 0 auto 0 4px;
    }
}

.category-color {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
</style>