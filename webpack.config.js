const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

console.log('isDev: ', isDev);
console.log('NODE_ENV: <', process.env.NODE_ENV, '>');

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions(),
    }]

    if (isDev) {
        //loaders.push('eslint-loader');
    }

    return loaders;
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            chunks: ['main'],
            template: path.resolve(__dirname, 'src/pages/index') + '/index.pug',
            minify: {
                collapseWhitespace: isProd
            }
        }),
         new CleanWebpackPlugin(),

         new CopyWebpackPlugin({
            patterns: [
        //     {
        //          from: path.resolve(__dirname, 'src/media/images/bgrd.jpg'),
        //          to: path.resolve(__dirname, 'dist/media/images/bgrd.jpg')
        //     }, 
            {
                from: path.resolve(__dirname, 'src/media/images'),
                to: path.resolve(__dirname, 'dist/media/images')
            },
            {
                from: path.resolve(__dirname, 'src/media/svg'),
                to: path.resolve(__dirname, 'dist/media/svg')
            },
        //    {
        //         from: path.resolve(__dirname, 'src/media/images/techs'),
        //         to: path.resolve(__dirname, 'dist/media/images/techs')
        //     },
        //     {
        //         from: path.resolve(__dirname, 'src/media/images/bgrd-contact.jpg'),
        //         to: path.resolve(__dirname, 'dist/media/images/bgrd-contact.jpg')
        //     }, 
            // {
            //     from: path.resolve(__dirname, 'src/scripts/send.php'),
            //     to: path.resolve(__dirname, 'dist/send.php')
            // },
        ]
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
            ignoreOrder: true,
        }), 
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        })
    ];

    if (isProd) {
        base.push(new BundleAnalyzerPlugin);
    }

    return base;
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    target: 'web',
    entry: {
        main: ['@babel/polyfill', './scripts/index', '@fancyapps/fancybox/dist/jquery.fancybox'],
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@blocks' : path.resolve(__dirname, 'src/common.blocks'),
            '@fonts' : path.resolve(__dirname, 'src/fonts'),
            '@styles' : path.resolve(__dirname, 'src/styles'),
            '@' : path.resolve(__dirname, 'src')
        }
    },

    optimization: optimization(),
    devServer: {
        port: 4200,
        open: isDev,
        hot: true,
        watchContentBase: true
    },
    devtool: isDev ? 'source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            // {
            //     test: /\.less$/,
            //     use: cssLoaders('less-loader')
            // },
            // {
            //     test: /\.s[ac]ss$/,
            //     use: cssLoaders('sass-loader')
            // },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            // {
            //     test: /\.xml$/,
            //     use: ['xml-loader']
            // },
            // {
            //     test: /\.csv$/,
            //     use: ['csv-loader']
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
                //loader: 'babel-loader',
                //options: babelOptions()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-typescript')
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-react')
            },
        ],
    } 
}



