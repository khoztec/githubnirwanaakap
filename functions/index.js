const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const a = require('./modules/users.js');
const b = require('./modules/city.js');


const nuxtConfig = require('./nuxt.config.js');
// console.log('ini difunction')
const config = {
    ...nuxtConfig,
    dev: false,
    buildDir: 'nuxt',
};
const nuxt = new Nuxt(config);

exports.ssrapp = functions.https.onRequest((req, res) => nuxt.render(req, res));

exports.usersFunction = a
exports.cityFunction = b