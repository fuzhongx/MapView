const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  css: {
    loaderOptions: {
      css: {
        
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    } 
  },

  configureWebpack: (config) => {
    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()]
      })
    )
    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver()]
      })
    )
 },
 devServer: {
    client: {
    overlay: false
  },
  proxy: {
    '/api': {
      target: 'https://noda.ac.cn',
      changeOrigin: true,
      secure: false,
      // pathRewrite: {
      //           '^/api': '' // 路径重写，移除路径中的/api
      //         }
    }
  }
},
//  devServer: {
//   open:false,
//   // host:"0.0.0.0",//外部访问
//   // port:9000,
//   client: {
//     overlay: false
//   },
//   proxy: {
//     '/api': {
//       target:'https://noda.ac.cn/', // 目标API地址
//       ws:false,
//       changeOrigin: true, // 开启代理，在本地创建一个虚拟服务器，然后发送请求的数据，会同时会收到请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//       pathRewrite: {
//         '^/api': '' // 路径重写，移除路径中的/api
//       }
//     }
//   }
// }
})
