import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const createRouter = () =>
    new Router({
        routes: [],
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        },
        strict: process.env.NODE_ENV !== 'production'
    })

const router = createRouter()
export default router

export const addRoutes = (routes) => {
    router.addRoutes([
        ...routes,
        {
            path: '/',
            redirect: 'router-path'
        },
        {
            path: '*',
            component: () => import('@/components/common/UnAuthorized.vue'),
            meta: { title: '页面找不到' }
        }
    ])
}

export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}
