import { Client, Collection, GatewayIntentBits, Message, Events, Interaction, ChatInputCommandInteraction, CommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, CommandInteractionOptionResolver } from "discord.js"
import { Command, loadCommands, getCommand } from "./commands";
import 'module-alias/register'
import "./config/env";

(async () => {
	const client: Client<boolean> = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent
		]
	});

	client.on(Events.ClientReady, async () => {
		loadCommands(client);
		console.log("Login!");
	});

	client.on(Events.MessageCreate, async (msg: Message) => {
		if (msg.content === "내꺼!") {
			msg.reply("내꺼!!");
		}
	});

	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (!interaction.isCommand() && !interaction.isContextMenuCommand())
			return null;

		const cmd = getCommand(interaction);
		if (!cmd) return;
		
		await interaction.deferReply();
		cmd.run(client, interaction);
	});

	client.login(process.env.DISCORD_TOKEN);
})()
