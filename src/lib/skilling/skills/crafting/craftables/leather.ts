import { Bank } from 'oldschooljs';

import itemID from '../../../../util/itemID';
import { Craftable } from '../../../types';

const Leather: Craftable[] = [
	{
		name: 'Leather gloves',
		id: itemID('Leather gloves'),
		level: 1,
		xp: 13.8,
		inputItems: new Bank().add('Leather'),
		tickRate: 3
	},
	{
		name: 'Leather boots',
		id: itemID('Leather boots'),
		level: 7,
		xp: 16.2,
		inputItems: new Bank().add('Leather'),
		tickRate: 3
	},
	{
		name: 'Leather cowl',
		id: itemID('Leather cowl'),
		level: 9,
		xp: 18.5,
		inputItems: new Bank().add('Leather'),
		tickRate: 3
	},
	{
		name: 'Leather vambraces',
		id: itemID('Leather vambraces'),
		level: 11,
		xp: 22,
		inputItems: new Bank().add('Leather'),
		tickRate: 3
	},
	{
		name: 'Leather body',
		id: itemID('Leather body'),
		level: 14,
		xp: 25,
		inputItems: new Bank().add('Leather'),
		tickRate: 3
	},
	{
		name: 'Leather chaps',
		id: itemID('Leather chaps'),
		level: 18,
		xp: 27,
		inputItems: new Bank().add('Leather'),
		tickRate: 3
	},
	{
		name: 'Hardleather body',
		id: itemID('Hardleather body'),
		level: 28,
		xp: 35,
		inputItems: new Bank().add('Hard leather'),
		tickRate: 3
	},
	{
		name: 'Coif',
		id: itemID('Coif'),
		level: 38,
		xp: 37,
		inputItems: new Bank().add('Leather'),
		tickRate: 3
	},
	{
		name: 'Hardleather shield',
		id: itemID('Hardleather shield'),
		level: 41,
		xp: 70,
		inputItems: new Bank().add('Hard leather', 2).add('Oak shield', 1).add('Bronze nails', 15),
		tickRate: 5
	},
	{
		name: 'Studded body',
		id: itemID('Studded body'),
		level: 41,
		xp: 40,
		inputItems: new Bank().add('Leather body').add('Steel studs'),
		tickRate: 3
	},
	{
		name: 'Studded chaps',
		id: itemID('Studded chaps'),
		level: 44,
		xp: 42,
		inputItems: new Bank().add('Leather chaps').add('Steel studs'),
		tickRate: 3
	}
];

export default Leather;
