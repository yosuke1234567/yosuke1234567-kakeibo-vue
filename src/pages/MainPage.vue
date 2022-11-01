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
            <h2 class="heading">Expense App</h2>
            <QList class="u-align-items-center" padding>
                <QItem clickable :active="location === '/'" active-class="active-item" @click="router.push('/')">ホーム
                </QItem>
                <QItem clickable :active="location === '/input'" active-class="active-item"
                    @click="router.push('./input')">入力</QItem>
                <QItem clickable :active="location === '/stats'" active-class="active-item"
                    @click="router.push('./stats')">統計</QItem>
                <QItem clickable :active="location === '/others'" active-class="active-item"
                    @click="router.push('./others')">その他</QItem>
            </QList>
        </QDrawer>

        <QPageContainer class="page-view">
            <router-view />
        </QPageContainer>

    </QLayout>
</template>
    
<style scoped lang="scss">
.heading {
    margin-left: 16px;
    color: $primary;
}
.active-item {
    background-color: #fdd83577;
    color: initial;
}
.page-view {
    background-color: #f5f2eb;
}
</style>