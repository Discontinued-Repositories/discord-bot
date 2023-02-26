import { Client } from 'discord.js';

interface CommandOptions {
  name: string;
  description: string;
  options?: any[];
}

interface CommandConfig {
  ephemeral: boolean;
  autoDefer: boolean;
  requireDatabase: boolean;
}

export default class Command {
  client: Client;
  name: string;
  description: string;
  options?: any[];
  config: CommandConfig;

  constructor(client: Client, options: CommandOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.options = options.options;
    this.config = {
      ephemeral: false,
      autoDefer: true,
      requireDatabase: false,
    };
  }
}
