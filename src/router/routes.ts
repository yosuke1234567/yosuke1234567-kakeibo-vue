export const routes = [
    // {
    //     path: '/:catchAll(.*)*',
    //     component: () => import('pages/ErrorNotFound.vue'),
    // },
    {
        path: '/',
        component: () => import('../pages/Home.vue'),
    },
    {
        path: '/others',
        component: () => import('../pages/Others.vue'),
    },
]