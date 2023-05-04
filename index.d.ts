import 'egg';
import { ConsulProvider } from './lib/provicer';
import { ConsulConfig } from './lib/interface';

export type EggConsul = ConsulProvider;

declare module 'egg' {
  interface Application {
    consul: EggConsul;
  }

  interface EggAppConfig {
    consul: ConsulConfig;
  }
}
