
import 'babel-polyfill'  // webpack3.x
 
// 引入mockjs
process.env.Mock && require('../mock/index.js')

import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import router, {addRoutes} from './routes'
import ElementUI from 'element-ui'
import './css/index.css'
import 'element-ui/lib/theme-chalk/index.css'

import plug from './js/plug.js'
import getRoutes from './js/getrouter.js'

Vue.use(ElementUI)

Vue.use(plug)

router.beforeEach((to, from, next) => {
    if (to.meta.id) {
        store.dispatch('menu/getButton', {
            id: to.meta.id
        })
    }
    next()
})

new Vue({
    router,
    store,
    methods: {
        // 处理菜单树，让按钮路由动态添加进去
        handleMenuData (data) {
            data.forEach(item => {
                if (item.buttonList && item.buttonList.length > 0) {
                    item.buttonList.forEach((items) => {
                        if (item.childrenMenu) {
                            if (items.menuUrl) item.childrenMenu.push(items)
                        } else {
                            item.childrenMenu = []
                            if (items.menuUrl) item.childrenMenu.push(items)
                        }
                    })
                }
                if (item.childrenMenu) this.handleMenuData(item.childrenMenu)
            })
        },
        // 初始化获取菜单并添加路由
        init () {
            store.dispatch('init').then((menus) => {
                let routerMenu = JSON.parse(JSON.stringify(menus.menuList[0].childrenMenu))
                this.handleMenuData(routerMenu)
                addRoutes(getRoutes(routerMenu))
            })
        }
    },
    created () {
        this.init()
    },
    render: h => h(App)
}).$mount('#app')
