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
const express = require('express');
const dirTree = require('directory-tree');

const Middleware = dirTree("App/Middleware", {
    extensions: /\.js/
});

const parseController = (dir, controller) => {
    const directory = (typeof dir == "string") ? "App/Controllers" + dir : "App/Controllers";
    const path = dirTree(directory, {
        extensions: /\.js/
    });
    //console.log('path', typeof dir);
    for (let j = 0; j < path.children.length; j++) {
        let file = path.children[j].name.split("."),
            filePath = path.children[j].path.split(".")[0],
            fileName = file[0];
        if (fileName.toString().toLowerCase() === controller.toString().toLowerCase()) {
            return filePath;
        }
    }
};
const $controllerObject = ($args) => {
    //console.log("arguments", $args);
    let len = $args[0].split(".").length - 1,
        subdir = $args[0].split("."),
        inject = "";
    for (let i = 0; i < len; i++) {
        inject += "/" + subdir[i];
    }
    //console.log("inject", inject);
    let cdirpath = (inject == "") ?
        parseController(null, $args[0]) :
        parseController(inject, subdir[len]);
    //console.log("dirpath", __basedir + "/" + cdirpath)
    const reqFile = require(__basedir + "/" + cdirpath);
    return new reqFile();
};

const $injectController = (args, $inject) => {
    let cf = args[0].split(".");
    if ($inject != null) {
        let newInject = $inject[$inject.length - 1] === "." ? $inject.slice(0, -1) : $inject;
        let newArgs = [newInject + '.' + args[0], args[1]];
        return (cf.length > 1) ? args : newArgs;
    } else {
        return args;
    }

};

class Router extends express.Router {
    constructor($app) {
        super();
        this.app = $app;
        this.inject = null;
        this.bindPrefix = null;
        this.verbs = ["get","post","put","patch","delete"];
        this.group = (...args) => {
            if (this.inject != null) this.inject = null;
            let $prefix, $middleware, $callback;
            if (args.length === 2) {
                $prefix = (typeof args[0] == "string") ? args[0] : undefined;
                $callback = (typeof args[1] == "function") ? args[1] : undefined;
            } else if (args.length === 3) {
                $prefix = (typeof args[0] === "string") ? args[0] : undefined;
                $callback = (typeof args[2] == "function") ? args[2] : undefined;
                $middleware = (typeof args[1] == "object") ? args[1] : undefined;
            } else {
                console.error("Error Preparing router group invalid or missing arguments");
                return;
            }

            if (typeof $prefix !== undefined && typeof $callback == "function") {
                this.bindPrefix = (this.bindPrefix == null) ? $prefix : this.bindPrefix + $prefix;
                if (args.length === 3) {

                    for (let i = 0; i < $middleware.length; i++) {
                        for (let j = 0; j < Middleware.children.length; j++) {
                            let arr = Middleware.children[j].name.split("."),
                                fileName = arr[0];
                            if (fileName.toString().toLowerCase() === $middleware[i].toString().toLowerCase()) {
                                this.use(require(__basedir + "/App/" + Middleware.name + "/" + fileName));
                            }
                        }
                    }
                    $callback();

                } else $callback();
                return this.app.use($prefix, this);
            }

        };
        this.methods = () => {
            for(let i=0;i<this.verbs.length;i+=1){
                const method = this.verbs[i];
                Object.defineProperty(this, method, {
                    value: (...args) => {
                        if (typeof args[1] == "function") {
                            this.route(args[0])[method](args[1]);
                        } else if (typeof args[1] == "string") {
                            let $args = args[1].split('@');
                            let controller = $controllerObject($injectController($args, this.inject));
                            if (controller[$args[1]] !== undefined) {
                                return this.route(args[0])[method](controller[$args[1]]);
                            } else {
                                return this.route(args[0])[method]((Request, Response) => {
                                    Response.status(404).send(`Invalid ${$args[1]} method`);
                                });
                            }
                        }
                    },
                    writable: false
                });
            }
        };
        this.methods();

    }
}


module.exports = $app => new Router($app);