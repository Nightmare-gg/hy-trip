import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    // 映射关系： path => component
    routes: [
        {//重定向
            path: "/",
            redirect: "/home"

        },
        {
            path: "/home",
            component: () => import("@/views/home/home.vue")
        },
        {
            path: "/favor",
            component: () => import('@/views/favor/favor.vue')
        },
        {
            path: "/message",
            component: () => import('@/views/message/message.vue')
        },
        {
            path: "/order",
            component: () => import('@/views/order/order.vue')
        },
        {
            path: "/city",
            component: () => import('@/views/city/city.vue'),
            // meta: {
            //     hiddenTabBar: true
            // }
        }

    ]
})

// 导出
export default router