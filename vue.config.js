
module.exports = {
  publicPath: '/', // 默认输出的路径 就是在当前地址栏后面添加的路径 若为 'ccc' 则为  http://localhost:8085/ccc/
  outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
  lintOnSave: false,  // 关闭eslint
  productionSourceMap: true,  // 生产环境下css 分离文件
  devServer: {   // 配置服务器
    port: 8085, // 端口
    open: true,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
}