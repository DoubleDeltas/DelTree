import { ApplicationCommandType, Client, CommandInteraction } from "discord.js";
import { Command } from "..";

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

module.exports = hello;