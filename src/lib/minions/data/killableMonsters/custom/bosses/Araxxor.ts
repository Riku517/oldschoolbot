import { Time } from 'e';
import { Bank, Monsters } from 'oldschooljs';
import LootTable from 'oldschooljs/dist/structures/LootTable';

import { BitField } from '../../../../../constants';
import { GearStat } from '../../../../../gear';
import { addStatsOfItemsTogether } from '../../../../../structures/Gear';
import itemID from '../../../../../util/itemID';
import resolveItems from '../../../../../util/resolveItems';
import { CustomMonster } from '../customMonsters';

export const AraxxorLootTable = new LootTable()
	.every('Araxxor eggs')
	.tertiary(2, "Red spiders' eggs", [200, 1000])
	.tertiary(300, 'Araxxor webbing')
	.tertiary(300, 'Spiders leg bottom')
	.tertiary(100, 'Elder scroll piece');

export const Araxxor: CustomMonster = {
	id: 93_183,
	baseMonster: Monsters.AbyssalSire,
	name: 'Araxxor',
	aliases: ['araxxor'],
	timeToFinish: Time.Minute * 20,
	hp: 3330,
	table: AraxxorLootTable,
	difficultyRating: 5,
	qpRequired: 500,
	healAmountNeeded: 250 * 200,
	attackStyleToUse: GearStat.AttackSlash,
	attackStylesUsed: [GearStat.AttackSlash],
	levelRequirements: {
		hitpoints: 120,
		attack: 120,
		strength: 120,
		defence: 120,
		slayer: 120
	},
	pohBoosts: {
		pool: {
			'Ancient rejuvenation pool': 5
		}
	},
	deathProps: {
		hardness: 0.5,
		steepness: 0.999,
		lowestDeathChance: 5,
		highestDeathChance: 65
	},
	minimumFoodHealAmount: 22,
	allItems: resolveItems([]),
	minimumGearRequirements: {
		melee: {}
	},
	minimumWeaponShieldStats: {
		melee: addStatsOfItemsTogether(resolveItems(['Soulreaper axe']), [GearStat.AttackSlash])
	},
	itemCost: {
		itemCost: new Bank().add('Anti-venom+(4)').add('Sanfew serum(4)').add('Enhanced saradomin brew', 1),
		qtyPerKill: 1
	},
	tameCantKill: true,
	itemsRequired: resolveItems([]),
	setupsUsed: ['melee'],
	equippedItemBoosts: [
		{
			gearSetup: 'melee',
			items: [
				{
					boostPercent: 20,
					itemID: itemID('Axe of the high sungod')
				}
			]
		}
	],
	requiredBitfield: BitField.HasUnlockedAraxxor
};
