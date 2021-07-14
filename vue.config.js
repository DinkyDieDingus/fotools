module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: { 'electron/preload.js': 'src/electron/preload.js' },
            mainProcessFile: 'src/electron/background.js',
            mainProcessWatch: ['src/electron/background.js', 'src/electron/preload.js', 'src/electron/ipc.js']
        }
    },
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './'
}