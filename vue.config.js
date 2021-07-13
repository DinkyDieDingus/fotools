module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js'
        }
    },
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './'
}