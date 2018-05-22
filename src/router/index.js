/**
 * router.js 进行路由管理
 * 小程序路由问题
 *  1. redirect 不能清空 navigate 历史栈，页面左上角有返回键，
 *     且返回到执行 navigate 的页面，其页面栈逻辑需要管理
 *
 *  2. 路由历史只能保存 5 层，若超出则不能保存新的页面栈，需要有一个回收机制
 *
 * **---- 以下方法使用均需要传入页面实例 page ---**
 */

let targetUrl = ''
let targetParams = {}

// 自定义重定向，附带清空路由栈
export function customRedirect(page, url = './index', params = {}) {
  if (cleanRoutes(page)) {
    page.$redirect(url, params)
    return
  }
  // 记录地址，参数
  targetUrl = url
  targetParams = params
}

// tab跳转
export function customSwitch(page, url = './index') {
  page.$switch(url)
  // 记录地址，参数
  targetUrl = ''
  targetParams = {}
}

// 清空页面栈
export function cleanRoutes(page) {
  const length = page.getCurrentPages().length
  console.log(`当前路由层数: ${length}，需要清空：${length - 1}`)
  if (length > 1) {
    page.$back(length - 1)
    return false
  }
  // 已经是无历史记录情况下返回 true，直接跳转目标页
  return true
}

// 监听并刷新目标页面
export function watchRouteChange(page) {
  if (targetUrl) {
    page.$redirect(targetUrl, { targetParams })
    // 清空缓存
    targetUrl = ''
    targetParams = {}
  }
}
