/**
 * @author Faisal Ahmed
 * @email hello@imfaisal.me
 * @mobile 01788656451
 * 
 * Copyright (c) 2018-present, Faisal Ahmed.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the https://github.com/Faisal50x/flash/blob/master/LICENSE .
 */
const fs = require('fs-extra');

module.exports = require("express");
module.exports.author = {
    name: "Faisal Ahmed",
    email: "hello@imfaisal.me",
    web: "http://imfaisal.me"
};
module.exports.router = (app) => {
    const required_dir = ['App', 'App/Controllers', 'App/Middleware'];
    required_dir.forEach(dir => {
        if (!fs.existsSync(__basedir + "/" + dir)) {
            console.warn("Missing required directory\n Please Create [ " + dir + "] Directory\n");
            fs.mkdirsSync(__basedir + "/" + dir);
        }

    });
    return require('./bin/Router')(app);
};

module.exports.db = () => {
    const configdir = __basedir + "/App/Config";
    const configfile = __basedir + "/App/Config/config.js";
    if (!fs.existsSync(configdir)) {
        fs.mkdirsSync(configdir);
    } else {
        if (!fs.existsSync(configdir + "/config.js")) {

            fs.copyFile(__dirname + '/template/config.js', configfile, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        } else return require('./bin/Database')(configfile);

    }

};
module.exports.mongo = require('./bin/Database').nosql;