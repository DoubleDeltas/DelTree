import { Client, Collection, GatewayIntentBits, Message, Events, Interaction, ChatInputCommandInteraction, CommandInteraction, ChatInputApplicationCommandData, ApplicationCommandType, CommandInteractionOptionResolver } from "discord.js"

import "./config/env";

interface Command extends ChatInputApplicationCommandData {
	run: (client: Client, interaction: CommandInteraction) => void;
}

const hello: Command = {
	name: "hello",
	description: "Returns a greeting",
	type: ApplicationCommandType.ChatInput,
	run: async (client: Client, interaction: CommandInteraction) => {
		const content = "Hello there!";

		await interaction.followUp({
			ephemeral: true,
			content
		});
	}
};

const cmds: Command[] = [hello];

(async () => {
	const client: Client<boolean> = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent
		]
	});

	client.on(Events.ClientReady, async () => {
		client.application.commands.set(cmds);
		console.log("Login!");
	});

	client.on(Events.MessageCreate, async (msg: Message) => {
		if (msg.content === "내꺼!") {
			msg.reply("내꺼!!");
		}
	});

	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (!interaction.isCommand() && !interaction.isContextMenuCommand())
			return;
		const cmd = cmds.find(c => c.name === interaction.commandName);
		if (!cmd)
			return;
		
		await interaction.deferReply();
		cmd.run(client, interaction);
	});

	client.login(process.env.DISCORD_TOKEN);
})()
