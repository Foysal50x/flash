## Flash [![NPM Version][npm-image]][npm-url]

  Fast, unopinionated, minimalist web framework for [node](http://nodejs.org).
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]  
  

```js
const flash = require('@faisal50x/flash');
const app = flash();
const Router = flash.router(app);
app.get('/', function (req, res) {
  res.send('Welcome to Flash world');
});

Router.group('/',function() {
  Router.get('/',FlashController.index);
  Router.get('/welcome',function(req,res) {
    res.send("Welcome group route");
  });
  Router.post('/welcome',function(req,res) {
      res.send(`Welcome to ${req.path} Method ${req.method}`);
    });
});

//Laravel Style Callback
Router.group('/auth',function () {
  Router.post('/login',"FlashController@login");
});
//Middleware setup in group route
Router.group('/api/v1',["Authentication","Role"],function () {
  Router.get('/user/:id/profile',"UserController@profile");
});
app.listen(3000)
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install @faisal50x/flash
            or
$ npm i @faisal50x/flash
```

Follow [our installing guide](http://flash.imfaisal.me/en/starter/installing)
for more information.

## Features

  * Robust routing
  * Focus on high performance
  * Super-high test coverage
  * HTTP helpers (redirection, caching, etc)
  * View system supporting 14+ template engines
  * Content negotiation
  * Executable for generating applications quickly
  * Group routing supported (Inspired by laravel)
  * Middleware supported (Inspired by laravel)
  * Pre added database supported (Inspired by laravel) [mongodb, mysql, postgresql,sqlite,mssql]
  * ORM Database supported (Inspired by laravel)

## Docs & Community

  * [Website and Documentation](http://flash.imfaisal.me/) - [[website repo](https://github.com/faisal50x/flash)]
  * [GitHub Author](https://github.com/Faisal50x) for Official Middleware & Modules
  * Visit the [Wiki](https://github.com/faisal50x/flash/wiki)
  * [Gitter](https://gitter.im/flash-framework) for support and discussion


### Security Issues

If you discover a security vulnerability in Flash, please see [Security Policies and Procedures](Security.md) [Coming Soon].

## Quick Start

  The quickest way to get started with flash is to utilize the executable [`flash(1)`](https://github.com/faisal50x/flashcli) to generate an application as shown below:

  Install the executable. The executable's major version will match Flash's:

```bash
$ npm install -g @faisal50x/flashcli
```

  Create the app:

```bash
$ flash create demo-app
```

  Ready to go your project root:

```bash
$ cd demo-app
```

  Start the server:

```bash
$ npm start
```

## Philosophy

  The Flash philosophy is to provide small, robust tooling for HTTP servers, making
  it a great solution for single page applications, web sites, hybrids, or public
  HTTP APIs.

  Flash have build in  ORM or template engine. With support for over
  14 template engines via [Consolidate.js](https://github.com/tj/consolidate.js),
  you can quickly craft your perfect framework.


## People

The original author of Flash is [Faisal Ahmed](https://github.com/faisal50x)

[List of all contributors](https://github.com/faisal50x/flash/graphs/contributors)

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@faisal50x/flash.svg
[npm-url]: https://npmjs.org/package/@faisal50x/flash

[downloads-image]: https://img.shields.io/npm/dt/@faisal50x/flashcli.svg
[downloads-url]: https://npmjs.org/package/@faisal50x/flash
