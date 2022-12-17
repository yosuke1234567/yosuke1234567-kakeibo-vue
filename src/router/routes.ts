export const routes = [
    // {
    //     path: '/:catchAll(.*)*',
    //     component: () => import('pages/ErrorNotFound.vue'),
    // },
    {
        path: '/yosuke1234567-kakeibo-vue/',
        component: () => import('../pages/Home.vue'),
    },
    {
        path: '/yosuke1234567-kakeibo-vue/input',
        component: () => import('../pages/InputMenu.vue'),
    },
    {
        path: '/yosuke1234567-kakeibo-vue/stats',
        component: () => import('../pages/Stats.vue'),
    },
    {
        path: '/yosuke1234567-kakeibo-vue/mypage',
        component: () => import('../pages/MyPage.vue'),
    },
]