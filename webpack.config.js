var path = require('path')

var ROOT_PATH = path.resolve(__dirname);
var JSX_PATH = path.resolve(ROOT_PATH, "web")
var JS_PATH = path.resolve(ROOT_PATH, "public", "javascripts")

module.exports = {
    entry: {
        dotaother: path.resolve(JSX_PATH, 'dotaother.js'),
        league: path.resolve(JSX_PATH, 'league.js')
    },

    output: {
        path: JS_PATH,
        publicPath: "/javascripts/",
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: JSX_PATH,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            }
        ]
    }
}