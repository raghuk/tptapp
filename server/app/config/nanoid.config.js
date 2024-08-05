const nanoid = require('nanoid');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const _nanoid = nanoid.customAlphabet(alphabet, 9);

module.exports = _nanoid;
