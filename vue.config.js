const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      },
    },
  },
 
  configureWebpack: (config) => {
    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()],
      })
    );
    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver()],
      })
    );
  },

  devServer: {
    client: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "https://noda.ac.cn",
        // target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // pathRewrite: {
        //           '^/api': '' // 路径重写，移除路径中的/api
        //         },
      },
    },
  },
  //  devServer: {
  //   client: {
  //     overlay: false
  //   },
  //   proxy: {
  //     '/api': {
  //       target: 'https://noda.ac.cn',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, ''),
  //       // 关键配置：处理302重定向
  //       configure: (proxy, options) => {
  //         proxy.on('proxyRes', (proxyRes) => {
  //           if (proxyRes.headers.location && proxyRes.statusCode === 302) {
  //             proxyRes.headers.location = options.target + proxyRes.headers.location
  //           }
  //         })
  //       }
  //     }
  //   }
  // }
});
