function getPaths (menus) {
    let arr = []
    menus.forEach((item) => {
        const { childrenMenu } = item
        if (item.menuUrl) {
            arr.push({
                path: item.menuUrl,
                menuName: item.menuName,
                id: item.id
            })
        }
        if (childrenMenu && childrenMenu.length > 0) {
            const result = getPaths(childrenMenu)
            arr = arr.concat(result)
        }
    })
    return arr
}

const importFile = (path) => {
    const componentName = path.split('/').map((str) => {
        if (str && str.indexOf('-') > -1) {
            let strs = ""
            str.split('-').map((item) => {
                return item && item.replace(item[0], item[0].toUpperCase())
            }).forEach((items) => {
                strs += items
            })
            str = strs
        }
        return str
    }).join('/')
    const MessageManage = () => import(/* webpackChunkName: "[request]" */`@/components${componentName}.vue`)
    return MessageManage
}
const getName = (path) => {
    const name = path.split('/').map((str) => {
        return str
    }).filter((item) => {
        if (item) return item
    }).join('-')
    return name
}

export default function getRoutes (data) {
    return getPaths(data).map(({ path, menuName, id }) => ({
        path,
        name: getName(path),
        component: importFile(path),
        meta: {
            title: menuName,
            id
        }
    }))
}
