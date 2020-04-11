require('dotenv').config();
const webpack = require('webpack');
const config = require('./config');
const path = require('path');
const isDebug = process.env.NODE_ENV === 'development';

const {VueLoaderPlugin} = require('vue-loader');
const terserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');

let configWebpack = {
    devServer:    {
        headers:        {
            'Access-Control-Allow-Origin':  '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        port:           process.env.WEBPACK_DEV_SERVER_PORT,
        public:         'http://localhost:' + process.env.WEBPACK_DEV_SERVER_PORT,
        overlay:        true,
        clientLogLevel: 'warning',
        host:           '0.0.0.0',
        stats:          {
            colors: true,
            chunks: false
        },
    },
    mode:         isDebug ? 'development' : 'production',
    optimization: {
        minimizer: [
            new terserPlugin({
                terserOptions: {
                    output: {comments: false, beautify: false}
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    entry:        config.entry,
    output:       {
        path:       path.resolve('./public/assets'),
        filename:   isDebug ? '[name].js' : '[name].[chunkhash:4].js',
        publicPath: `${isDebug ? ('http://localhost:' + process.env.WEBPACK_DEV_SERVER_PORT) : ''}/assets/`,
    },
    resolve:      {
        extensions: ['.js', '.vue', '.json'],
        alias:      {
            vue: 'vue/dist/vue.js'
        }
    },
    module:       {
        rules: [
            //scss
            {
                test: /\.scss$/,
                use:  [
                    isDebug ? {loader: 'vue-style-loader'} : MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: isDebug}},
                    {loader: 'postcss-loader', options: {sourceMap: isDebug}},
                    {loader: 'sass-loader', options: {sourceMap: isDebug}}
                ],
            },
            //css
            {
                test: /\.css$/,
                use:  [
                    isDebug ? {loader: 'vue-style-loader'} : MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: isDebug}},
                    {loader: 'postcss-loader', options: {sourceMap: isDebug}}
                ],
            },
            //vue
            {
                test:    /\.vue$/,
                exclude: /node_modules/,
                loader:  'vue-loader'
            },
            //fonts
            {
                test:    /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:  'file-loader',
                options: {name: 'fonts/[name]-[hash:3].[ext]'}
            },
            //images
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use:  [
                    {
                        loader:  'url-loader',
                        options: {limit: 8192, name: 'images/[name].[ext]'}
                    },
                    {
                        loader:  'img-loader',
                        options: {enabled: !isDebug}
                    }
                ]
            },
        ]
    },
    plugins:      [
        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].[hash:4].css',
            disable:  isDebug,
        }),
    ],
};

if (!isDebug) {
    configWebpack.plugins.push(
        new WebpackBundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),

        new ManifestPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    );
}

module.exports = configWebpack;
