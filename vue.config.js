module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: { 'electron/preload.js': 'src/electron/preload.js' },
            mainProcessFile: 'src/electron/background.js'
        }
    },
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './'
}