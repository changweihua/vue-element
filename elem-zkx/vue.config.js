// vue.config.js for less-loader@6.0.0
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebpackVariableReplacer = require('webpack-stylesheet-variable-replacer-plugin')

module.exports = {
  // 基本路径
  // baseUrl: '/',
  // 输出文件目录
  publicPath: process.env.VUE_APP_BASE_URL || '/', // TODO: Remember to change this to fit your need
  outputDir: `dist/${process.env.VUE_APP_BASE_URL}`,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': process.env.VUE_APP_PRIMARY_COLOR,
            'link-color': process.env.VUE_APP_PRIMARY_COLOR,
            'font-family': 'PingFangSC, Avenir, Helvetica, Arial, sans-serif'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    host: process.env.VUE_APP_HOST, // can be overwritten by process.env.HOST
    port: process.env.VUE_APP_PORT,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_ROOT,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '/api': process.env.VUE_APP_RE_API_ROOT
        }
      }
    }
  },
  configureWebpack: (config) => {
    // if (isProduction) {
    //   config.externals = {
    //     vue: 'Vue',
    //     vuex: 'Vuex',
    //     'vue-router': 'VueRouter',
    //     'element-ui': 'ELEMENT',
    //     axios: 'axios'
    //   }
    // }
    // config.externals = {
    //   //格式为 '资源的名字' : '给外部引用的名字',
    //   //由对应的库自定。例如，vue为Vue，vue-router为VueRouter.
    //   vue: 'Vue',
    //   'element-ui': 'Element',
    //   'vue-router': 'VueRouter',
    //   axios: 'axios',
    //   vuex: 'Vuex'
    // }
    // config.resolve.extensions = ['.js', '.vue', '.json']
    //生产and测试环境
    const pluginsPro = [
      // new DefinePlugin({
      //   'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
      // }),
      // 生成仅包含颜色的替换样式（主题色等）
      // new ThemeColorReplacer({
      //   fileName: 'css/theme-colors.css',
      //   matchColors: getAntdSerials('#1890ff') // 主色系列
      // }),
      new WebpackVariableReplacer({
        publicPath: '',
        buildPath: 'static/',
        nextSupport: true,
        specifyEntry: /_app\.js/,
        matchVariables: {
          main: process.env.VUE_APP_PRIMARY_COLOR
        }
      }),
      new CompressionPlugin({
        //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 8192,
        minRatio: 0.8
      })
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     warnings: false,
      //     compress: {
      //       // eslint-disable-next-line @typescript-eslint/camelcase
      //       drop_debugger: true,
      //       // eslint-disable-next-line @typescript-eslint/camelcase
      //       drop_console: true,
      //       // eslint-disable-next-line @typescript-eslint/camelcase
      //       pure_funcs: ['console.log'] //移除console
      //     },
      //     output: {
      //       // 去掉注释内容
      //       comments: false
      //     }
      //   },
      //   sourceMap: false,
      //   parallel: true
      // })
    ]
    //开发环境

    const pluginsDev = [
      // 生成仅包含颜色的替换样式（主题色等）
      // new ThemeColorReplacer({
      //   fileName: 'css/theme-colors.css',
      //   matchColors: getAntdSerials('#1890ff') // 主色系列
      // })
      new WebpackVariableReplacer({
        publicPath: '',
        buildPath: 'static/',
        nextSupport: true,
        specifyEntry: /_app\.js/,
        matchVariables: {
          main: process.env.VUE_APP_PRIMARY_COLOR
        }
      })
    ]

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro]
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev]
    }
    config.performance = {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [
    // 可以是字符串或正则表达式
    'ant-design-vue',
    'vuex-persist',
    'vue-particles'
  ],
  chainWebpack: (config) => {
    // 可以提高第一个屏幕的速度，建议打开预加载，这句话使上面的9s的加载速度降低至7s，虽然不高，但是蚊子再小也是肉
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // 当页面很多时，它将导致太多无意义的请求
    config.plugins.delete('prefetch')

    // 加载markdown文件
    config.module
      .rule('md')
      .test(/\.md/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()

    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_HTML_TITLE
      return args
    })
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    if (process.env.VUE_APP_TITLE === 'alpha') {
      config.optimization.minimize(false)
    }

    config.when(process.env.NODE_ENV === 'production', (config) => {
      // 只打包第三方的依赖
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization // 使用optimization.splitChunks配置选项之后，可以移除重复的依赖模块。需要注意的是，插件将一些第三方模块分离到单独的块，减小了代码的体积，可以查看dist文件中文件块的体积
        .splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            },
            antdUI: {
              name: 'chunk-antdUI', // 我这边用的antdv 将antdv切割成一个包
              priority: 20,
              test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/
            }
          }
        })

      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })

    //打包文件带hash
    config.output.filename('[name].[hash].js').end()

    // set preserveWhitespace
    // 为了补删除换行而加的配置
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}
