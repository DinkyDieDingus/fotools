module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: { 'preload': 'src/electron/preload.js' },
            mainProcessFile: 'src/background.js',
            mainProcessWatch: ['src/electron/'],
            builderOptions: {
                productName: 'FoTools',
                extraResources: [{
                    "from": "./src/extra",
                    "to": "",
                    "filter": ["**/*"]
                }]
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'development' ? '/' : './'
}