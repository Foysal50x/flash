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

module.exports = {
    /**
     * @var general
     * @description app general settings
     */
    general: {
        /**
         * @var VERSION
         * @description application current version
         */
        VERSION: require(__basedir + '/package.json').version,
        /**
         * @var PORT
         * @description application default port setup
         */
        PORT: process.env.PORT || 3000,
        /**
         * @var IP
         * @description application default ip address
         */
        IP: process.env.IP || '0.0.0.0',
        /**
         * @var APIPREFIX
         * @description this is api end point url setup
         * @example api/v1
         */
        APIPREFIX: '',
        /**
         * @var ROLES
         * @description application role management setup
         * @default ['guest','user','admin']
         */
        ROLES: ['guest', 'user', 'admin']
    },
    session: {
        /**
         * @var SECRET
         * @description this is session secret key change with your own secret key
         * @default i-am-super-secret-key
         */
        SECRET: 'i-am-super-secret-key',
        /**
         * @var EXPIRESIN
         * @description set your own session expire time
         * @default 60*60*24*7 1week
         */
        EXPIRESIN: 60 * 60 * 24 * 7
    }
};

module.exports.database = {
    /**
     * @description setup application environment
     * there are two environment setup option one is development another
     * one is production
     * setup development while your application is development mode
     * when prepare your full application to deploy change environment to production
     */
    environment: "development:mongodb",
    development: {
        /**
         * Mongo DB Setup
         * Use your own mongodb database connection
         */
        mongodb: {
            host: "127.0.0.1",
            port: "27017",
            dbName: "blog",
            dbUser: "",
            dbPass: ""
        },
        /**
         * SQL Database setup option
         * SQL Supported Driver
         * @supported mysql|sqlite|postgres|mssql
         * @default mysql
         */
        sql: {
            driver: 'mysql',
            host: 'localhost',
            dbName: 'test',
            dbPass: '',
            dbUser: 'root',

            // SQLite only
            storage: 'path/to/database.sqlite'
        }
    },
    production: {
        /**
         * Mongo DB Setup
         * Use your own mongodb database connection
         */
        mongodb: {
            host: "127.0.0.1",
            port: "27017",
            dbName: "blog",
            dbUser: "",
            dbPass: ""
        },
        /**
         * SQL Database setup option
         * SQL Supported Driver
         * @supported mysql|sqlite|postgres|mssql
         * @default mysql
         */
        sql: {
            driver: 'mysql',
            host: 'localhost',
            dbName: 'test',
            dbPass: '',
            dbUser: 'root',

            // SQLite only
            storage: 'path/to/database.sqlite'
        }
    }
};