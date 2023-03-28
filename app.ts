import type { Application, IBoot } from 'egg';
import { initPlugin } from './lib/consul';

export default class AppBootHook implements IBoot {
  private readonly app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  configDidLoad() {
    if (this.app.config.consul.provider) {
      initPlugin(this.app);
    }
  }
}
