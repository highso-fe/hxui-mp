/**
 * request.js
 * 1. 自定义 request
 * 2. 保存用户 session
 */
import wepy from 'wepy'
import { errorToast } from './util'

// w0 -> lite0.highso.com.cn
// w1 -> lite1.highso.com.cn
// w2 -> lite2.highso.com.cn
// pro -> lite.haixue.com

const domain = 'https://lite0.highso.com.cn'

let userSession = ''

export function customRequest(conf) {
  const { url, data, method = 'GET' } = conf

  const domainUrl = domain + url
  const header = userSession ? { 'Cookie': 'JSESSIONID=' + userSession } : {}

  const requestConf = {
    url: domainUrl,
    data: data || {},
    method,
    header,
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res = await wepy.request(requestConf)
      // 打印请求信息
      console.log(
        `request: ${domainUrl}\nconf:`, requestConf,
        'response:', res.data
      )
      // 500 时显示系统错误
      if (res.data && res.data.code === 500) {
        errorToast()
      }
      resolve(res.data)
    } catch (error) {
      console.error(error)
      errorToast()
      reject(error)
    }
  })
}

export function saveUserSession(session) {
  userSession = session
}
