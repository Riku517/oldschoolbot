import { increaseNumByPercent, Time } from 'e';
import { Task } from 'klasa';
import { Bank } from 'oldschooljs';

import { Emoji, Events, MIN_LENGTH_FOR_PET } from '../../lib/constants';
import { calcMaxRCQuantity } from '../../lib/skilling/functions/calcMaxRCQuantity';
import Runecraft from '../../lib/skilling/skills/runecraft';
import { SkillsEnum } from '../../lib/skilling/types';
import { RunecraftActivityTaskOptions } from '../../lib/types/minions';
import { roll } from '../../lib/util';
import { handleTripFinish } from '../../lib/util/handleTripFinish';

export default class extends Task {
	async run(data: RunecraftActivityTaskOptions) {
		const { runeID, essenceQuantity, userID, channelID, imbueCasts, duration } = data;
		const user = await this.client.fetchUser(userID);

		const rune = Runecraft.Runes.find(_rune => _rune.id === runeID)!;

		const quantityPerEssence = calcMaxRCQuantity(rune, user);
		let runeQuantity = essenceQuantity * quantityPerEssence;
		if (rune.name === 'Elder rune') {
			runeQuantity = Math.max(1, Math.floor(runeQuantity / 3));
		}

		let xpReceived = essenceQuantity * rune.xp;

		const hasMaster = user.hasItemEquippedAnywhere(
			[
				'Master runecrafter hat',
				'Master runecrafter robe',
				'Master runecrafter skirt',
				'Master runecrafter boots'
			],
			true
		);
		if (hasMaster) {
			xpReceived = increaseNumByPercent(xpReceived, 10);
		}
		const magicXpReceived = imbueCasts * 86;

		let xpRes = `\n${await user.addXP({
			skillName: SkillsEnum.Runecraft,
			amount: xpReceived,
			duration
		})}`;
		if (magicXpReceived > 0) {
			xpRes += `\n${await user.addXP({ skillName: SkillsEnum.Magic, amount: magicXpReceived, duration })}`;
		}

		let str = `${user}, ${user.minionName} finished crafting ${runeQuantity} ${rune.name}. ${xpRes}`;
		if (hasMaster) {
			str += 'You received 10% bonus XP from your Master runecrafter outfit.';
		}
		const loot = new Bank({
			[rune.id]: runeQuantity
		});

		if (duration >= MIN_LENGTH_FOR_PET) {
			const minutes = duration / Time.Minute;
			if (roll(Math.floor(5000 / minutes))) {
				loot.add('Obis');
			}
		}

		if (roll((1_795_758 - user.skillLevel(SkillsEnum.Runecraft) * 25) / essenceQuantity)) {
			loot.add('Rift guardian');
			str += "\nYou have a funny feeling you're being followed...";
			this.client.emit(
				Events.ServerNotification,
				`${Emoji.Runecraft} **${user.username}'s** minion, ${
					user.minionName
				}, just received a Rift guardian while crafting ${rune.name}s at level ${user.skillLevel(
					SkillsEnum.Runecraft
				)} Runecrafting!`
			);
		}

		str += `\n\nYou received: ${loot}.`;

		await user.addItemsToBank(loot, true);

		handleTripFinish(
			this.client,
			user,
			channelID,
			str,
			['rc', [essenceQuantity, rune.name], true],
			undefined,
			data,
			loot.bank
		);
	}
}
