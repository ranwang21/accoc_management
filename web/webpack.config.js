const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    resolve: {
        alias: {
            component: path.resolve(__dirname, 'src/component/'),
            container: path.resolve(__dirname, 'src/container/'),
            service: path.resolve(__dirname, 'src/service/')
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader', options: { minimize: false } }]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'pictures'
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html',
            filename: './index.html'
        })
    ]

}
