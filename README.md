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

## Enable

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
  client: {
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

## As a client

For example, as client A, we need to call the interface of service B. Then we first find out the healthy service of B and then make an http request.

Here, for the convenience of understanding, we simulate the successful service that has just been registered:

```js
const service = await app.consul.balancer.getServiceBalancer().select('my-test-service');

// output
console.log(service);
```

```js
{
  ID: 'a8aed15d-fd37-3f1f-81c1-d169d52439ab',
  Node: '621b00c40467',
  Address: '127.0.0.1',
  Datacenter: 'dc1',
  TaggedAddresses: {
    lan: '127.0.0.1',
    lan_ipv4: '127.0.0.1',
    wan: '127.0.0.1',
    wan_ipv4: '127.0.0.1'
  },
  NodeMeta: { 'consul-network-segment': '' },
  ServiceKind: '',
  ServiceID: 'my-test-service:192.168.1.103:21010',
  ServiceName: 'my-test-service',
  ServiceTags: [],
  ServiceAddress: '192.168.1.103',
  ServiceTaggedAddresses: {
    lan_ipv4: { Address: '192.168.1.103', Port: 21010 },
    wan_ipv4: { Address: '192.168.1.103', Port: 21010 }
  },
  ServiceWeights: { Passing: 1, Warning: 1 },
  ServiceMeta: {},
  ServicePort: 21010,
  ServiceSocketPath: '',
  ServiceEnableTagOverride: false,
  ServiceProxy: { Mode: '', MeshGateway: {}, Expose: {} },
  ServiceConnect: {},
  CreateIndex: 1771,
  ModifyIndex: 1771
}
```


## Questions & Suggestions

Please open an issue [here](https://github.com/RABC-Digital/egg-consul3/issues).

## License

[MIT](LICENSE)
