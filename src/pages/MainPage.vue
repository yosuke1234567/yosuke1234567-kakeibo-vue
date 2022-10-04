<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const location = ref<String>(route.path)

// ナビゲーションの後に実行
router.afterEach(() => {
    location.value = route.path
    console.log('afterEach')
})

const leftDrawerOpen = ref(true)

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
    
<template>
    <QLayout view="hhh Lpr fff">

        <QDrawer v-model="leftDrawerOpen" side="left" bordered>
            <h2 class="heading">家計簿アプリ</h2>
            <QList padding>
                <QItem clickable :active="location === '/'" active-class="active-item" @click="router.push('/')">ホーム
                </QItem>
                <QItem clickable :active="location === '/others'" active-class="active-item"
                    @click="router.push('./others')">その他</QItem>
                <QItem></QItem>
            </QList>
        </QDrawer>

        <QPageContainer>
            <router-view />
        </QPageContainer>

    </QLayout>
</template>
    
<style scoped lang="scss">
.heading {
    margin-left: 18px;
}
.active-item {
    background-color: #e5e1e1;
}
</style>