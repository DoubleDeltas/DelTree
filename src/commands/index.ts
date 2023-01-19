import { ChatInputApplicationCommandData, Client, CommandInteraction, Interaction } from "discord.js";
import FileUtil from "../utils/FileUtil";

export interface Command extends ChatInputApplicationCommandData {
	run: (client: Client, interaction: CommandInteraction) => void;
}

const commands: Command[] = [];

export function loadCommands(client: Client) {
	FileUtil.getFilesRecursively(__dirname, [".ts"]).forEach(filePath => {
		commands.push(require(filePath) as Command);
	});
	client.application.commands.set(commands)
}

export function getCommand(interaction: Interaction): Command {
	if (!interaction.isCommand() && !interaction.isContextMenuCommand())
		return null;
	return commands.find((cmd) => {cmd.name === interaction.commandName})
}