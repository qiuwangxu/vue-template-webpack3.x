import utils from './util.js'
import https from './http.js'
const plug = {
    install (Vue, options) {
        Vue.prototype.utils = utils
        Vue.prototype.https = https
        const on = Vue.prototype.$on
        // 节流处理
        /*
        Vue.prototype.$on = function (event, func) {
            let previous = 0
            let newFunc = func
            if (event === 'click') {
                newFunc = function () {
                    const now = new Date().getTime()
                    if (previous + 1000 <= now) {
                        func.apply(this, arguments)
                        previous = now
                    }
                }
            }
            on.call(this, event, newFunc)
		}
		*/

        // 防抖处理
        Vue.prototype.$on = function (event, func) {
            let timer
            let newFunc = func
            if (event === 'click') {
                newFunc = function () {
                    clearTimeout(timer)
                    timer = setTimeout(function () {
                        func.apply(this, arguments)
                    }, 500)
                }
            }
            on.call(this, event, newFunc)
        }

    }
}

export default plug
