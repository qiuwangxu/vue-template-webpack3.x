import {Http} from 'vue-resource'

import {Message, Loading} from 'element-ui'

import apiPath from '@/api/api-path'

/** 请求拦截 */
Http.interceptors.push((request, next) => {
    next((response) => { // 对于session已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
        if (response.status === 403) {
            window.location.href = apiPath.logOut
        } else {
            return response
        }
    })
})

/**
 * @description http 200后code不对的错误处理
 * @param {obj} res
 * @param {function} callback
 * @returns obj
 */
const errorHand = (res, callback) => {
    if (res.body.code === 0) {
        if (typeof callback === 'function') {
            return callback(res.body)
        } else {
            throw new Error('callback should be a function')
        }
    } else {
        if (res.body && res.body.message) {
            Message.error(res.body.message)
        } else {
            Message.error("错误码" + res.body.code)
        }
    }
}

/**
 * @description GET 请求
 * @param {string} url  请求地址
 * @param {object} option 请求参数
 * @param {function} callback  成功回调函数
 * @param {object} config 请求设置
 */
const getRequest = (url, option, callback, config) => {
    config = config || {}
    let newObj = Object.assign({
        params: option
    }, config)
    return Http.get(url, newObj).then((res) => {
        return errorHand(res, callback)
    }, (err) => {
        Message.error(err.statusText)
    })
}

/**
 * @description post 请求
 * @param {string} url  请求地址
 * @param {object} option 请求参数
 * @param {function} callback  成功回调函数
 * @param {object} config 请求设置
 */
const postRequest = (url, option, callback, isLoading, config) => {
    let loading = ""
    if (isLoading) {
        loading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            fullscreen: false,
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }
    config = config || {}
    return Http.post(url, option, config).then((res) => {
        return errorHand(res, callback)
    }, (err) => {
        Message.error(err.statusText)
    }).finally(() => {
        if (isLoading) loading.close()
    })
}

/**
 * @description post 导出文件 (默认为excel)
 * @param {string} url  文件下载地址
 * @param {obj} option 参数
 * @param {string} fileName  想生成文件名
 * @param {string} fileType  想生成的文件类型
 */
const exportFile = (url, option, fileName, fileType) => {
    Http.post(url, option, {responseType: 'blob'}).then((res) => {
        // 根据请求获取下载文件的文件名
        // const re = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i
        // const disposition = res.headers.map['content-disposition']
        // const match = disposition && disposition[0].match(re)
        // const fileNames = match[1]
        if (res.body && res.body.code) {
            Message.error(res.body.message)
        } else {
            let blob = new Blob([res.body], {type: fileType || 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            if (blob.size > 0) {
                let elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                document.body.removeChild(elink)
            } else {
            // TODO 异常处理
                Message.error('系统异常，导出失败!')
            }
        }
    }, (err) => {
        Message.error(err.statusText)
    })
}

/**
 * @description 通过get请求url，下载文件
 * @param {any} url 文件下载路径
 */
const getFileToHttp = (url, option) => {
    let newObj = Object.assign({
        params: option
    }, {responseType: 'blob'})
    Http.get(url, newObj).then((res) => {
        let blob = new Blob([res.body])
        if (blob.size > 0) {
            let elink = document.createElement('a')
            if (option && option.fileName) {
                elink.download = option.fileName
            } else {
                let file = url.split('/')
                elink.download = file[file.length - 1]
            }
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
        } else {
            // TODO 异常处理
            Message.error('系统异常，文件下载失败!')
        }
    }, (err) => {
        Message.error(err.statusText)
    })
}

const http = {
    getRequest,
    postRequest,
    exportFile,
    getFileToHttp
}

export default http
