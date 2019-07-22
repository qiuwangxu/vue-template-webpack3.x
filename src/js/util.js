
/**
 * @description 转换日期格式
 * @param {date} time
 * @param {boolean} isSecond  false 返回 yyy-MM-dd HH:mm:ss
 * @returns {string}  yyy-MM-dd || yyy-MM-dd HH:mm:ss
 */
const GMTToStr = (time, isSecond) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    if (isSecond === false) {
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    } else if (isSecond === true) {
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
    } else if (isSecond === "second") {
        str = a[3] + ':' + a[4] + ':' + a[5]
        return [hour, minute, second].map(formatNumber).join(':')
    } else {
        return [year, month, day].map(formatNumber).join('-')
    }
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


const utils = {
    GMTToStr
}
export default utils
