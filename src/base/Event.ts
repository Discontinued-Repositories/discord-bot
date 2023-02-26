import { Client } from 'discord.js';

interface EventOptions {
  name: string;
}

export default class Event {
  name: string;

  constructor(options: EventOptions) {
    this.name = options.name;
  }

  run(client: Client, ...args: any[]) {
    return { client, args };
  }
}
