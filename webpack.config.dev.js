const path = require('path'); // constante que nos va a ayudar a traer el elemento path. Path es un elementob disponible dentro de node
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Copyplugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack'); 

module.exports = { // creamos un modulo con un objeto para exportarlo con la config deseada
    entry: './src/index.js', // config que nos permite decir cual es el punto de entrada de nuestra aplicacion, que siempre es index.js
    output: { // config que nos permite decir hacia donde enviar lo que prepara webpack, que siempre es el directorio dist
        path: path.resolve(__dirname, 'dist'), // traemos la constante path, con .resolve sabemos donde se encuentra nuestro proyecto y poderlo usar
        // en path se va a preparar el proyecto
        filename: '[name].[contenthash].js', // poner nombre al resultante del js que se va unificar
        assetModuleFilename: 'assets/images/[hash][ext][query]'    
    },
    mode: 'development',
    watch: true,
    resolve: { // le pasamos otro objeto 
        extensions: ['.js'], // le pasamos las extensiones a utilizar
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, 
            {
               test: /\.(css|styl)$/i,
               use: [MiniCssExtractPlugin.loader, 
                'css-loader',
                'stylus-loader'
                ], 
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
         inject: true,
         template: './public/index.html',
         filename: 'index.html',   
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new Copyplugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(), 
    ],
}