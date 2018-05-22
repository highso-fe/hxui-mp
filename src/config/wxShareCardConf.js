// 统一配置微信分享卡片
export default {
  title: '邀请你和我一起通过考试',
  path: '/pages/login',
  imageUrl: '',
  success: () => {
    console.log('share wxCard success')
  },
  fail: () => {
    console.error('share wxCard fail')
  },
}
