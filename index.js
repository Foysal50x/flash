const fs = require('fs-extra');

module.exports = require("express");
module.exports.author = {
    name: "Faisal Ahmed",
    email: "hello@imfaisal.me",
    web: "http://imfaisal.me"
};
module.exports.router = (app) => {
    const required_dir = ['app','app/controllers','app/middleware'];
    required_dir.forEach( dir => {
        if(!fs.existsSync(__basedir+"/"+dir)){
            console.warn("Missing required directory\n Please Create [ "+dir+"] Directory\n");
            fs.mkdirsSync(__basedir+"/"+dir);
        }
        
    });
    return require('./bin/Router')(app);
};

module.exports.db = () => {
    const configdir = __basedir+"/app/config";
    const configfile = __basedir+"/app/config/config.js";
    if (!fs.existsSync(configdir)){
        fs.mkdirsSync(configdir);
    }else {
        if (!fs.existsSync(configdir+"/config.js")){

            fs.copyFile(__dirname+'/template/config.js',configfile, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        }else return require('./bin/Database')(configfile);

    }

};
module.exports.mongo = require('./bin/Database').nosql;
