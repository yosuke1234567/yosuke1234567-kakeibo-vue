<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const location = ref<string>(route.path)

// ナビゲーションの後に実行
router.afterEach(() => {
    // drawerのactiveを記憶
    location.value = route.path
})

const leftDrawerOpen = window.innerWidth > 1023 ? ref(true) : ref(false)

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
    
<template>
    <q-layout view="lHh Lpr fff">

        <q-header reveal class="header">
            <q-toolbar>
                <q-btn flat @click="toggleLeftDrawer" round dense icon="sym_r_menu" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" side="left" bordered class="drawer">
            <h2 class="heading"><img src="../assets/yen.svg" alt="">kakeibo</h2>
            <q-list class="u-align-items-center">
                <q-item class="item" clickable :active="location === '/yosuke1234567-kakeibo-vue/'" active-class="active-item"
                    @click="router.push('./')">
                    <q-item-section avatar>
                        <q-icon name="sym_r_home" />
                    </q-item-section>
                    <q-item-section>ホーム</q-item-section>
                </q-item>
                <q-item class="item" clickable :active="location === '/yosuke1234567-kakeibo-vue/input'" active-class="active-item"
                    @click="router.push('./input')">
                    <q-item-section avatar>
                        <q-icon name="sym_r_edit_square" />
                    </q-item-section>
                    <q-item-section>入力</q-item-section>
                </q-item>
                <q-item class="item" clickable :active="location === '/yosuke1234567-kakeibo-vue/stats'" active-class="active-item"
                    @click="router.push('./stats')">
                    <q-item-section avatar>
                        <q-icon name="sym_r_leaderboard" />
                    </q-item-section>
                    <q-item-section>統計</q-item-section>
                </q-item>
                <q-item class="item" clickable :active="location === '/yosuke1234567-kakeibo-vue/mypage'" active-class="active-item"
                    @click="router.push('./mypage')">
                    <q-item-section avatar>
                        <q-icon name="sym_r_person" />
                    </q-item-section>
                    <q-item-section>マイページ</q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container class="page-view">
            <router-view />
        </q-page-container>

    </q-layout>

    <div>
        <img src="../assets/bear.png" alt="" class="hidden">
        <img src="../assets/honey.png" alt="" class="hidden">
        <img src="../assets/pigbear.png" alt="" class="hidden">
    </div>
</template>
    
<style scoped lang="scss">
.header {
    background-color: transparent;
    color: #222;

    @media screen and (min-width: 1024px) {
        visibility: hidden;
        height: 8px;
    }
}
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