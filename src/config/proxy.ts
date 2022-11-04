export default {
  isRequestProxy: false,
  development: {
    // 开发环境接口请求
    apiUrl: '',
    urlPrefix: '/api',
    proxy: [['/api', 'http://xxx.com', true]]
  },
  release: {
    // 正式环境接口地址
    apiUrl: '',
    urlPrefix: '/api',
    proxy: [['/api', 'http://xxx.com', true]]
  }
}
