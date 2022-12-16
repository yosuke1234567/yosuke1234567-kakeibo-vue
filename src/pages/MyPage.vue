<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { doc, getDoc, setDoc } from '@firebase/firestore'
import { auth, db } from '../firebase'
import { useRouter } from 'vue-router'
import { palette } from '../components/palette'

const router = useRouter()

const confirmSignOut = ref(false)

const signOut = async () => {
    await auth.signOut()
    console.log('sign out')
    // ページを更新
    router.go(0)
}

interface Category {
    type: string,
    color: string
}
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

const isEditing = ref(false)
const pickedColor = ref<string>()
const editIndex = ref<number>()
const confirmDelete = ref(false)

const onEdit = (index: number) => {
    pickedColor.value = categories.value[index].color
    editIndex.value = index
    isEditing.value = true
}

const saveColor = async () => {
    categories.value[editIndex.value!].color = pickedColor.value!
    const docRef = doc(db, auth.currentUser!.uid, 'data')
    await setDoc(docRef, {
        category: categories.value
    })
    isEditing.value = false
}

const deleteCategory = async () => {
    categories.value.splice(editIndex.value!, 1)
    const docRef = doc(db, auth.currentUser!.uid, 'data')
    await setDoc(docRef, {
        category: categories.value
    })
    confirmDelete.value = false
    isEditing.value = false
}

const openAdd = ref(false)
const newCategory = ref<string>()
const newColor = ref('#999999')

const addCategory = async () => {
    const docRef = doc(db, auth.currentUser!.uid, 'data')
    if (newCategory.value) {
        categories.value.push({
            type: newCategory.value,
            color: newColor.value
        })
        await setDoc(docRef, {
            category: categories.value
        })
        openAdd.value = false
    }
}

</script>
        
<template>
    <div class="container">
        <h2 class="text-center">マイページ</h2>
        <div>{{ email }}</div>
        <q-card flat bordered class="q-mt-sm">
            <q-item @click="confirmSignOut = true" clickable class="q-px-lg q-py-md">
                <q-item-section avatar>
                    <q-icon name="sym_r_logout" />
                </q-item-section>
                <q-item-section>サインアウト</q-item-section>
            </q-item>
        </q-card>
        <q-dialog v-model="confirmSignOut">
            <q-card class="q-px-lg q-py-md">
                <q-card-section class="dialog-section">
                    <div>サインアウトしますか？</div>
                </q-card-section>
                <q-card-actions class="justify-end">
                    <q-btn label="キャンセル" @click="confirmSignOut = false" />
                    <q-btn label="OK" @click="signOut" color="secondary" text-color="initial" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <div class="category-wrap">
            <div class="category-head">
                <h3>カテゴリー</h3>
                <!-- <q-btn :label="(isEditing ? '完了' : '編集')" @click="(isEditing = !isEditing)" color="primary" flat /> -->
            </div>
            <q-card flat bordered class="q-mb-md">
                <q-item @click="openAdd = true" clickable class="q-px-lg q-py-md">
                    <q-item-section avatar>
                        <q-icon name="sym_r_add" />
                    </q-item-section>
                    <q-item-section>カテゴリーを追加</q-item-section>
                </q-item>
            </q-card>
            <q-dialog v-model="openAdd">
                <q-card class="add-dialog">
                    <h3 class="text-center">カテゴリーを追加</h3>
                    <q-input v-model="newCategory" label="カテゴリー名" class="q-mb-lg">
                        <template v-slot:prepend>
                            <q-icon name="sym_r_edit" />
                        </template>
                    </q-input>
                    <q-color v-model="newColor" :palette="palette" default-view="palette" no-header-tabs bordered
                        class="color-picker q-mx-auto" />
                    <q-btn label="保存" @click="addCategory" color="secondary" text-color="initial"
                        class="full-width q-mt-lg q-mb-md" />
                    <q-btn label="キャンセル" @click="openAdd = false" class="full-width" />
                </q-card>
            </q-dialog>
            <q-card v-if="categories" flat bordered>
                <q-list separator>
                    <q-item v-for="(category, index) in categories" clickable @click="onEdit(index)"
                        class="q-px-lg category-item">
                        <q-item-section side>
                            <div :style="{ backgroundColor: category.color }" class="category-color"></div>
                        </q-item-section>
                        <q-item-section>
                            {{ category.type }}
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card>
            <q-dialog v-model="isEditing">
                <q-card class="q-pa-lg">
                    <q-color v-model="pickedColor" :palette="palette" default-view="palette" no-header-tabs bordered
                        class="color-picker" />
                    <q-btn label="保存" @click="saveColor" color="secondary" text-color="initial"
                        class="full-width q-my-md" />
                    <q-btn label="キャンセル" @click="isEditing = false" class="full-width" />
                    <q-btn label="削除" @click="confirmDelete = true" text-color="red-5" outline class="full-width q-mt-xl" />
                </q-card>
            </q-dialog>
            <q-dialog v-model="confirmDelete">
                <q-card class="q-px-lg q-py-md">
                    <q-card-section class="dialog-section">
                        <div>削除しますか？</div>
                    </q-card-section>
                    <q-card-actions class="justify-end">
                        <q-btn label="キャンセル" @click="confirmDelete = false" />
                        <q-btn label="OK" @click="deleteCategory" color="secondary" text-color="initial" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
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

.add-dialog {
    width: 360px;
    padding: 24px 48px;
}

.category-item {
    height: 56px;
}

.category-color {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    border-radius: 50%;
}

.color-picker {
    width: 240px;
}
</style>