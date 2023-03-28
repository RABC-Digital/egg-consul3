import 'egg';
import { ConsulProvider } from './lib/provicer';
import { ConsulConfig } from './lib/interface';
import BanlancerService from './app/service/balancer';

export type EggConsul = ConsulProvider;

declare module 'egg' {
  interface Application {
    consul: EggConsul;
  }

  // 扩展 service
  interface IService {
    balancer: BanlancerService;
  }

  interface EggAppConfig {
    consul: ConsulConfig;
  }
}
