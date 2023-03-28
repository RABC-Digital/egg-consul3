'use strict';

exports.keys = 'plugin-consul';

exports.consul = {
  provider: {
    // 注册本服务
    register: true,
    // 应用正常下线反注册
    deregister: true,
    // consul server 主机
    host: '127.0.0.1', // 此处修改 consul server 的地址
    // consul server 端口
    port: '8500', // 端口也需要进行修改
    // 调用服务的策略(默认选取 random 具有随机性)
    strategy: 'random',
  },
  service: {
    address: '127.0.0.1', // 此处是当前这个 egg 应用的地址
    port: 7001, // midway应用的端口
    name: 'test-consul',
  },
};
