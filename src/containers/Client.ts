import { readdir } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';
import chalk from 'chalk';
import { Client, Collection } from 'discord.js';
import { connect, ConnectOptions } from 'mongoose';
import ClientOptions from './ClientOptions.js';

export default class BotClient extends Client {
  commands: Collection<string, any>;

  constructor() {
    super(ClientOptions);
    this.commands = new Collection();
  }

  async loadCommands(client: BotClient): Promise<void> {
    const categories: string[] = await readdir('./src/resources/interactions');
    for await (const category of categories) {
      const commands: string[] = await readdir(`./src/resources/interactions/${category}`);
      for (const command of commands) {
        const { default: CommandClass } = await import(`../resources/interactions/${category}/${command}`);
        const cmd = new CommandClass(client);
        client.commands.set(cmd.name, cmd);
      }
    }
  }

  async loadEvents(client: BotClient): Promise<void> {
    const categories: string[] = await readdir('./src/resources/listenerIn');
    for await (const category of categories) {
      const events: string[] = await readdir(`./src/resources/listenerIn/${category}`);
      for (const event of events) {
        const { default: EventClass } = await import(`../resources/listenerIn/${category}/${event}`);
        const evt = new EventClass(client);
        client.on(evt.name, (...args: any[]) => evt.run(client, ...args));
      }
    }
  }

  async connectToDatabase(): Promise<void> {
    const dbOptions: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await connect(process.env.MONGO_DATABASE!, dbOptions);
    console.log(`${chalk.blue(`${new Date().toLocaleString('pt-br')}`)} Database Successfully`);
  }

  async start(): Promise<void> {
    await sleep(1_000);
    await this.loadCommands(this);
    await this.loadEvents(this);
    await this.connectToDatabase();
    await sleep(2_500);
    await this.login(process.env.TOKEN!);
  }
}