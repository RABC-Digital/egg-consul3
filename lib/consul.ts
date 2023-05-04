import type { Application, Agent } from 'egg';
import { ConsulProvider } from './provicer';
import { ConsulConfig } from './interface';
import BanlancerService from './balancer';


export function initPlugin(app: Application) {
  app.addSingleton('consul', (config: ConsulConfig['client']) => {
    const consul = new ConsulProvider(config);

    const balancer = new BanlancerService(consul.getConsul());
    consul.balancer = balancer;
    return consul;
  });
  app.config.coreMiddleware.push('consul');
}

export function initAgentPlugin(agent: Agent) {
  agent.addSingleton('consul', (clientConfig: ConsulConfig['client']) => {
    const config = Object.assign({}, {
      client: clientConfig,
      service: agent.config.consul.service,
    });

    const { id, name, address, port } = config.service;

    if (config.client.register && address.length > 0 && port > 0) {

      config.service.name = name || agent.name;
      config.service.id = id || `${config.service.name}:${address}:${port}`;

      if (!config.service.check && (config.service.check as any) !== false) {
        config.service.check = {
          http: `http://${address}:${port}/consul/health/self/check`,
          interval: '3s',
        };
      }

      const consul = new ConsulProvider(clientConfig);

      agent.beforeStart(async () => {
        await consul.registerService(config.service);
      });

      agent.beforeClose(async () => {
        if (
          clientConfig.register &&
        clientConfig.deregister
        ) {
          const { id } = config.service;
          if (id) {
            await consul.deregisterService({ id });
          }
        }
      });

      return consul;
    }
  });

}
