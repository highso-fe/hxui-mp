/**
 * util.js
 * 工具类函数模块
 */

// 对象 stringify
export function obj2str(obj) {
  if (typeof obj !== 'object') { return obj }
  let str = ''
  for (let prop in obj) {
    str += `&${prop}=${obj[prop]}`
  }
  return str.substr(1)
}

// wx error toast
export function errorToast(title = '系统未知异常') {
  wx.showToast({
    title,
    icon: 'none',
  })
}

// 倒计时函数
export function countDown(limit, cb) {
  const countI = setInterval(() => {
    limit -= 1
    cb && cb(limit)
    if (limit <= 0) {
      clearInterval(countI)
    }
  }, 1000)
}

// showLoading
export function showLoading(title = '加载中...') {
  wx.showLoading({
    mask: false,
    title,
  })
}
// hideLoading
export function hideLoading() {
  wx.hideLoading()
}

// html to text
export function convertHtmlToText(inputText) {
  var returnText = '' + inputText
  returnText = returnText.replace(/<\/div>/ig, '\n')
  returnText = returnText.replace(/<\/li>/ig, '\n')
  returnText = returnText.replace(/<li>/ig, '  *  ')
  returnText = returnText.replace(/<\/ul>/ig, '\n')
  // -- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br\s*[\/]?>/gi, '\n')

  // -- remove P and A tags but preserve what's inside of them
  returnText = returnText.replace(/<p.*?>/gi, '\n')
  returnText = returnText.replace(/<a.*href='(.*?)'.*>(.*?)<\/a>/gi, ' $2 ($1)')

  // -- remove all inside SCRIPT and STYLE tags
  returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, '')
  returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, '')
  // -- remove all else
  returnText = returnText.replace(/<(?:.|\s)*?>/g, '')

  // -- get rid of more than 2 multiple line breaks:
  returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, '\n')

  // -- get rid of more than 2 spaces:
  returnText = returnText.replace(/<+(?=>)/g, '')

  // -- transform &nbsp;&emsp;&ensp;&thinsp;&zwnj;&zwj;
  returnText = returnText.replace(/&nbsp;|&emsp;|&ensp;|&thinsp;|&zwnj;|&zwj;/gi, '')

  return returnText
}

// 将富文本中的特殊标签，大于小于符号标准化
export function standardizeRichText(str) {
  if (str && str.replace) {
    // 小程序 rich-text 能支持的标签
    const tagArr = ['a', 'abbr', 'b', 'blockquote', 'br', 'code', 'col', 'colgroup', 'dd', 'del', 'div', 'dl', 'dt', 'em', 'fieldset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'ins', 'label', 'legend', 'li', 'ol', 'p', 'q', 'span', 'strong', 'sub', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',]
    // 替换公式中的大于小于符号
    str = str.replace(/(%|\d)(<|>|>=|<=)\d/gi, (formula) => {
      return formula.replace('<', '&lt;').replace('>', '&gt;')
    })
    // 替换空白符
    str = str.replace(/&nbsp;|&emsp;|&ensp;|&thinsp;|&zwnj;|&zwj;/gi, '')
    // 替换富文本中不规范的标签
    str = str.replace(/<.*?>/gi, (tag) => {
      if (!/^(<|<\/)(a|abbr|b|blockquote|br|code|col|colgroup|dd|del|div|dl|dt|em|fieldset|h1|h2|h3|h4|h5|h6|hr|i|img|ins|label|legend|li|ol|p|q|span|strong|sub|sup|table|tbody|td|tfoot|th|thead|tr|ul)(( .*?)?)>$/i.test(tag)) {
        return ''
      }
      return tag
    })
  }
  return str
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}
