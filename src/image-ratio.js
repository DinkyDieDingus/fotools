//import sizeOf from 'image-size';
const sizeOf = require('image-size');
const ratioList = [
    { val: 1 / 1, str: '1by1' },
    { val: 5 / 4, str: '5by4' },
    { val: 4 / 3, str: '4by3' },
    { val: 3 / 2, str: '3by2' },
    { val: 5 / 3, str: '5by3' },
    { val: 16 / 9, str: '16by9' },
    { val: 2 / 1, str: '2by1' },
    { val: 3 / 1, str: '3by1' },
    { val: 4 / 5, str: '4by5' },
    { val: 3 / 4, str: '3by4' },
    { val: 2 / 3, str: '2by3' },
    { val: 3 / 5, str: '3by5' },
    { val: 9 / 16, str: '9by16' },
    { val: 1 / 2, str: '1by2' },
    { val: 1 / 3, str: '1by3' }
];

function getImageRatio(imagePath) {
    let dims = sizeOf(imagePath);
    let real = dims.width / dims.height;
    let best = { val: 1 / 1, str: '1by1' };
    let bestDiff = 1000000;
    for (let ratio of ratioList) {
        let diff = Math.abs(ratio.val - real);
        if (diff < bestDiff) {
            best = ratio;
            bestDiff = diff;
        }
    }
    return best.str;
}

const { readdir } = require('fs/promises');

(async() => {
    try {
        const files = await readdir('public/img');
        for (const file of files)
            console.log(file, getImageRatio('public/img/' + file));
    } catch (err) {
        console.error(err);
    }
})();