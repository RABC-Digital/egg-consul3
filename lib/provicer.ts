import Consul from 'consul';
import { IConsulProviderInfoOptions, IConsulRegisterInfoOptions } from './interface';
import BanlancerService from './balancer';

export class ConsulProvider {
  private readonly consul: Consul.Consul;

  balancer: BanlancerService;

  constructor(providerOptions: IConsulProviderInfoOptions) {
    // should be, ignore config
    providerOptions.promisify = true;
    this.consul = new Consul(providerOptions);
  }

  getConsul(): Consul.Consul {
    return this.consul;
  }

  async registerService(
    registerOptions: IConsulRegisterInfoOptions,
  ): Promise<void> {
    await this.consul.agent.service.register(registerOptions);
  }

  async deregisterService(deregisterOptions: { id: string }): Promise<void> {
    await this.consul.agent.service.deregister(deregisterOptions);
  }
}
