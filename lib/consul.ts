import type { Application, Agent } from 'egg';
import { ConsulProvider } from './provicer';


export function initPlugin(app: Application) {
  Object.defineProperty(app, 'consul', {
    get() {
      const symbol = Symbol('consulProvider');
      this[symbol] =
        this[symbol] || new ConsulProvider(app.config.consul.provider);
      return this[symbol];
    },
  });

  app.config.coreMiddleware.push('consul');
}

// function registerService(config: ConsulConfig, agent: Agent) {
//   const { address, port } = config.service;

//   if (config.provider.register && address.length > 0 && port > 0) {

//     config.service.name = config.service.name || agent.name;
//     config.service.id = config.service.id || `${config.service.name}:${address}:${port}`;

//     if (!config.service.check && (config.service.check as any) !== false) {
//       config.service.check = {
//         http: `http://${address}:${port}/consul/health/self/check`,
//         interval: '3s',
//       };
//     }

//     // 把原始的 consul 对象注入到容器
//     const consul = createOneClient(config, agent);

//     agent.beforeStart(async () => {
//       await consul.registerService(config.service);
//     });

//     agent.beforeClose(async () => {
//       if (
//         config.provider.register &&
//         config.provider.deregister
//       ) {
//         const { id } = config.service;
//         if (id) {
//           await consul.deregisterService({ id });
//         }
//       }
//     });

//     return consul;
//   }
// }

export function initAgentPlugin(agent: Agent) {
  const config = agent.config.consul;
  const { address, port } = config.service;

  if (config.provider.register && address.length > 0 && port > 0) {

    config.service.name = config.service.name || agent.name;
    config.service.id = config.service.id || `${config.service.name}:${address}:${port}`;

    if (!config.service.check && (config.service.check as any) !== false) {
      config.service.check = {
        http: `http://${address}:${port}/consul/health/self/check`,
        interval: '3s',
      };
    }

    Object.defineProperty(agent, 'consul', {
      get() {
        const symbol = Symbol('consulProvider');
        this[symbol] =
        this[symbol] || new ConsulProvider(agent.config.consul.provider);
        return this[symbol];
      },
    });

    agent.beforeStart(async () => {
      await (agent as any).consul.registerService(agent.config.consul.service);
    });

    agent.beforeClose(async () => {
      if (
        agent.config.consul.provider.register &&
      agent.config.consul.provider.deregister
      ) {
        const { id } = agent.config.consul.service;
        if (id) {
          await (agent as any).consul.deregisterService({ id });
        }
      }
    });
  }
}
