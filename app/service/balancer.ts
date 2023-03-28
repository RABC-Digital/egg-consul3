import { Context, Service } from 'egg';
import { ConsulBalancer } from '../../lib/balancer';
import { IServiceBalancer } from '../../lib/interface';

export default class BanlancerService extends Service {
  private consulBalancer: ConsulBalancer;

  constructor(ctx: Context) {
    super(ctx);
    this.consulBalancer = new ConsulBalancer((ctx.app as any).consul.consul);
  }

  getServiceBalancer(strategy = 'random'): IServiceBalancer {
    return this.consulBalancer.getServiceBalancer(strategy);
  }
}
