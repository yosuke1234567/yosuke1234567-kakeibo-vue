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

        <QDrawer v-model="leftDrawerOpen" side="left" bordered class="drawer">
            <h2 class="heading"><img src="../assets/yen.svg" alt="">Expense</h2>
            <QList class="u-align-items-center">
                <QItem class="item" clickable :active="location === '/'" active-class="active-item"
                    @click="router.push('/')">
                    <QItemSection avatar>
                        <QIcon name="sym_r_home" />
                    </QItemSection>
                    <QItemSection>ホーム</QItemSection>
                </QItem>
                <QItem class="item" clickable :active="location === '/input'" active-class="active-item"
                    @click="router.push('./input')">
                    <QItemSection avatar>
                        <QIcon name="sym_r_edit_square" />
                    </QItemSection>
                    <QItemSection>入力</QItemSection>
                </QItem>
                <QItem class="item" clickable :active="location === '/stats'" active-class="active-item"
                    @click="router.push('./stats')">
                    <QItemSection avatar>
                        <QIcon name="sym_r_leaderboard" />
                    </QItemSection>
                    <QItemSection>統計</QItemSection>
                </QItem>
                <QItem class="item" clickable :active="location === '/mypage'" active-class="active-item"
                    @click="router.push('./mypage')">
                    <QItemSection avatar>
                        <QIcon name="sym_r_person" />
                    </QItemSection>
                    <QItemSection>マイページ</QItemSection>
                </QItem>
            </QList>
        </QDrawer>

        <QPageContainer class="page-view">
            <router-view />
        </QPageContainer>

    </QLayout>
</template>
    
<style scoped lang="scss">
.drawer {
    background-color: #fffdfa;
}
.heading {
    width: 90%;
    margin: 0 auto;
    padding: 24px 16px;
    color: $primary;
    line-height: 1.25;

    img {
        height: 1.5em;
        vertical-align: bottom;
        margin-right: 0.5em;
    }
}

.page-view {
    background-color: #f5f2eb;
}

.item {
    width: 90%;
    padding: 12px 20px;
    margin: 12px auto;
    border-radius: 8px;
}

.active-item {
    background-color: #fdd83577;
    color: initial;
}
</style>