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
const mongoose = require('mongoose');
const Sequelize = require('sequelize');

class Database {
    constructor(db) {
        this._connect(db)
    }
    _connect() {

        let arg = require(arguments[0]).database,
            envArr = arg["environment"].split(":"),
            env = envArr[0],
            activeDatabase = envArr[1],
            db = arg[env][activeDatabase];
        if (activeDatabase.toString().toLowerCase() === "mongodb") {
            let dbURI = (db.dbUser !== "" && db.dbPass !== "") ?
                `${db.dbUser}:${db.dbPass}@${db.host}:${db.port}/${db.dbName}` :
                `${db.host}:${db.port}/${db.dbName}`;

            return mongoose.connect(`mongodb://${dbURI}`, {
                    useNewUrlParser: true
                })
                .then(() => {
                    console.log('Database connection successful', dbURI);
                })
                .catch(err => {
                    console.error(`Database connection error: (${err.code}) `, err.errmsg)
                });
        } else if (activeDatabase.toString().toLowerCase() === "sql") {
            const Driver = db.driver.toLowerCase().toString();
            if (Driver === 'mysql' || Driver === 'postgres' || Driver === 'mssql') {

                let sequelize = new Sequelize(db.dbName, db.dbUser, db.dbPass, {
                    host: db.host,
                    dialect: db.driver,

                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    },
                    operatorsAliases: false
                });

                return sequelize;
            } else if (Driver === 'sqlite') {
                let sequelize = new Sequelize(db.dbName, null, null, {
                    dialect: db.driver,
                    storage: db.storage,
                    operatorsAliases: false
                });
                return sequelize;
            }

        }
    }
}

module.exports = config => new Database(config);
module.exports.nosql = mongoose;