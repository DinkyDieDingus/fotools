function getImagePath(name) {
    let imgPrefix = '';
    if (process.env.NODE_ENV !== 'production') {
        imgPrefix = '/';
    }
    return imgPrefix + 'img/' + name;
}

export default getImagePath;