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

const Middleware = dirTree("app/middleware", {
    extensions: /\.js/
});

const parseController = (dir, controller) => {
    const directory = (typeof dir == "string") ? "app/controllers" + dir : "app/controllers";
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
    let reqFile = require(__basedir + "/" + cdirpath);
    return new reqFile();
};

let $injectController = (args, $inject) => {
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
        this.bindPrefix = null;
        this.inject = null;
        this.group = function () {
            if (this.inject != null) this.inject = null;
            let $prefix, $middleware, $callback;
            if (arguments.length === 2) {
                $prefix = (typeof arguments[0] == "string") ? arguments[0] : undefined;
                $callback = (typeof arguments[1] == "function") ? arguments[1] : undefined;
            } else if (arguments.length === 3) {
                $prefix = (typeof arguments[0] === "string") ? arguments[0] : undefined;
                $callback = (typeof arguments[2] == "function") ? arguments[2] : undefined;
                $middleware = (typeof arguments[1] == "object") ? arguments[1] : undefined;
            } else {
                console.error("Error Preparing router group invalid or missing arguments");
                return;
            }

            if (typeof $prefix !== undefined && typeof $callback == "function") {
                this.bindPrefix = (this.bindPrefix == null) ? $prefix : this.bindPrefix + $prefix;
                if (arguments.length === 3) {

                    for (let i = 0; i < $middleware.length; i++) {
                        for (let j = 0; j < Middleware.children.length; j++) {
                            let arr = Middleware.children[j].name.split("."),
                                fileName = arr[0];
                            if (fileName.toString().toLowerCase() === $middleware[i].toString().toLowerCase()) {
                                this.use(require(__basedir + "/app/" + Middleware.name + "/" + fileName));
                            }
                        }
                    }
                    $callback();

                } else $callback();
                return this.app.use(this.bindPrefix, this);
            }

        };
        this.get = function () {
            if (typeof arguments[1] == "function") {
                return this.route(arguments[0]).get(arguments[1]);
            } else if (typeof arguments[1] == "string") {
                let $args = arguments[1].split('@'),
                    controller = $controllerObject($injectController($args, this.inject));
                if (controller[$args[1]] !== undefined) {
                    this.route(arguments[0]).get(controller[$args[1]]);
                } else {
                    this.route(arguments[0]).get((Request, Response) => {
                        Response.status(404).send(`Invalid ${$args[1]} method`);
                    });
                }
            }
        };
        this.post = function () {
            if (typeof arguments[1] == "function") {
                return this.route(arguments[0]).post(arguments[1]);
            } else if (typeof arguments[1] == "string") {
                let $args = arguments[1].split('@'),
                    controller = $controllerObject($injectController($args, this.inject));
                if (controller[$args[1]] !== undefined) {
                    this.route(arguments[0]).post(controller[$args[1]]);
                } else {
                    this.route(arguments[0]).post((Request, Response) => {
                        Response.status(404).send(`Invalid ${$args[1]} method`);
                    });
                }
            }
        };
        this.put = function () {
            if (typeof arguments[1] == "function") {
                return this.route(arguments[0]).put(arguments[1]);
            } else if (typeof arguments[1] == "string") {
                let $args = arguments[1].split('@'),
                    controller = $controllerObject($injectController($args, this.inject));
                if (controller[$args[1]] !== undefined) {
                    this.route(arguments[0]).put(controller[$args[1]]);
                } else {
                    this.route(arguments[0]).put((Request, Response) => {
                        Response.status(404).send(`Invalid ${$args[1]} method`);
                    });
                }
            }
        };
        this.patch = function () {
            if (typeof arguments[1] == "function") {
                return this.route(arguments[0]).patch(arguments[1]);
            } else if (typeof arguments[1] == "string") {
                let $args = arguments[1].split('@'),
                    controller = $controllerObject($injectController($args, this.inject));
                if (controller[$args[1]] !== undefined) {
                    this.route(arguments[0]).patch(controller[$args[1]]);
                } else {
                    this.route(arguments[0]).patch((Request, Response) => {
                        Response.status(404).send(`Invalid ${$args[1]} method`);
                    });
                }
            }
        };
        this.delete = function () {
            if (typeof arguments[1] == "function") {
                return this.route(arguments[0]).delete(arguments[1]);
            } else if (typeof arguments[1] == "string") {
                let $args = arguments[1].split('@'),
                    controller = $controllerObject($injectController($args, this.inject));
                if (controller[$args[1]] !== undefined) {
                    this.route(arguments[0]).delete(controller[$args[1]]);
                } else {
                    this.route(arguments[0]).delete((Request, Response) => {
                        Response.status(404).send(`Invalid ${$args[1]} method`);
                    });
                }
            }
        };

    }
}



module.exports = $app => new Router($app);