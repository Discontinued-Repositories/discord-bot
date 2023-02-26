import { GatewayIntentBits, PartialTypes } from 'discord.js';

export default {
  intents: [
    GatewayIntentBits.GUILDS,
    GatewayIntentBits.GUILD_VOICE_STATES,
    GatewayIntentBits.GUILD_MESSAGES,
    GatewayIntentBits.GUILD_MESSAGE_REACTIONS,
  ],
  partials: [PartialTypes.MESSAGE, PartialTypes.GUILD_MEMBER],
};
