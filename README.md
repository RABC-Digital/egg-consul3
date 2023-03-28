# egg-consul3

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/RABC-Digital/egg-consul3/actions/workflows/nodejs.yml/badge.svg)](https://github.com/RABC-Digital/egg-consul3/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-consul3.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-consul3
[codecov-image]: https://img.shields.io/codecov/c/github/RABC-Digital/egg-consul3.svg?style=flat-square
[codecov-url]: https://codecov.io/github/RABC-Digital/egg-consul3?branch=master
[download-image]: https://img.shields.io/npm/dm/egg-consul3.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-consul3

[Consul](https://www.consul.io) plugin for Egg.js v2 and v3.

> NOTE: This plugin just for integrate Consul into Egg.js, more documentation please visit https://www.consul.io.


## Install

```bash
$ npm i egg-consul3 --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.consul = {
  enable: true,
  package: 'egg-consul3',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.consul = {
  provider: {
    // 注册本服务
    register: false,
    // 应用正常下线反注册
    deregister: true,
    // consul server 主机
    host: '127.0.0.1',
    // consul server 端口
    port: 8500,
    // 调用服务的策略(默认选取 random 具有随机性)
    strategy: 'random',
  },
  service: {
    id: null,
    name: null,
    tags: [],
    address: null,
    port: 7001,
    // others consul service definition
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/RABC-Digital/egg/issues).

## License

[MIT](LICENSE)
