const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Automatically update your connected (+setrsn) account on CML every hour.'
		});
	}

	async run(msg) {
		if (!msg.author.settings.get('RSN')) {
			return msg.sendLocale('AUTO_UPDATE_NO_RSN', [msg.guild.settings.get('prefix')]);
		}
		await msg.author.settings.update('autoupdate', !msg.author.settings.get('autoupdate'));
		return msg.sendLocale('AUTO_UPDATE', [msg.author.settings.get('autoupdate')]);
	}
};
