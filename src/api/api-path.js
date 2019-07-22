const mockIp = process.env.NODE_ENV === 'test' ? 'http://localhost:8080' : '' // 此处的ip主要提供为单元测试时候用可以为任意ip
const server ='/matchName'

const apiPath = {
  login: `${server}/login`,
  getLucyData: `${mockIp}${server}/getLucyData`
}

export default apiPath
