import type { Agent, IBoot } from 'egg';
import { initAgentPlugin } from './lib/consul';

export default class AgentBootHook implements IBoot {
  private agent: Agent;
  constructor(agent: Agent) {
    this.agent = agent;
  }

  configDidLoad() {
    if (this.agent.config.consul.service) {
      initAgentPlugin(this.agent);
    }
  }
}
