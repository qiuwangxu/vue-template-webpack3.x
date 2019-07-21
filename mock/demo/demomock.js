import apiPath from '@/api/api-path'
// 引入mockjs
const Mock = require('mockjs')
 
const getMockData = {
    info(options) {
        return {
            "code": 0,
            "data": {
                "userName": "132",
                "userCode": "123"
            },
            "message": "\u6210\u529F"
        }
    }
}
const postMockData = {
    code(options) {
        let argObj = JSON.parse(options.body)
        return {
            "code": 0,
            "data": Mock.mock({
                "deptCodeSet|1-20": [...new Set([
                    () => {
                        return argObj.node + Mock.mock('@string("upper", 3)')
                    }
                ])]
            }),
            "message": "\u6210\u529F"
        }
    }
    
}
 
/* Mock.mock( url, get , 返回的数据) */
Mock.mock(RegExp(url + ".*"), 'get', getMockData.info)
 
/* Mock.mock( url, post , 返回的数据) */
Mock.mock(url, 'post', postMockData.code)