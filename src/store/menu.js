
import http from '@/js/http.js'

import apiPath from '@/api/api-path'

const menu = {
    namespaced: true,
    state: {
        items: [],
        permissionButton: []
    },
    mutations: {
        update (state, data) {
            state.items = data
        },
        clear (state) {
            state.items = []
        }
    },
    actions: {
        load ({ commit }) {
            return http.getRequest(apiPath.url, {}, (res) => {
                return res.data
            })
        },
        getButton ({ commit }, data) {
            return http.getRequest(apiPath.url, {menuId: data.id}, (res) => {
                //todo
            })
        }
    }
}

export default menu
