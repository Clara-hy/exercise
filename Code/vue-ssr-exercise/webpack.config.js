const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = (process.env.NODE_ENV === 'development');
// console.log(isDev);

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',//这是开发环境，开发环境用chunkhash会报错
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            //一、给webpack编译过程中以及在页面上（就是我们自己写的js代码）能够用来判断当时是生产环境还是开发环境
            //二、vue，react会对不同的环境进行区分打包
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}

if (isDev) {//开发环境
    config.module.rules.push({//这是push，基于原rules上的添加
            test: /\.styl/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true//webpack进行编译的过程中如果有错误，会将错误显示到网页上面
        },
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {//生产环境
    // 抄别人的，不是老师讲的，老师讲的那个插件落后了。不懂...
    
    config.output.filename = '[name].[chunkhash:8].js';//生产（正式）环境要用chunkhash
    config.module.rules.push({
        test: /\.styl/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // 抄别人的，不是老师讲的，老师讲的那个插件落后了
                    // you can specify a publicPath here
                    // by default it uses publicPath in webpackOptions.output
                    publicPath: './',
                    hmr: process.env.NODE_ENV === 'development',
                },
            },
            'css-loader',
            {
                loader: 'postcss-loader',
                options: { sourceMap: true }
            },
            'stylus-loader'
        ]
    });
    // 抄别人的，不是老师讲的，老师讲的那个插件落后了
    config.plugins.push(
        new MiniCssExtractPlugin({
            // 用来指定输出的静态文件的名字
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'styles.[chunkhash].[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    );
}

module.exports = config;