import { ClientStorage, Prisma } from '@prisma/client';

import { globalConfig } from '../constants';
import { prisma } from '../settings/prisma';

// Is not typesafe, returns only what is selected, but will say it contains everything.
export async function mahojiClientSettingsFetch(select: Prisma.ClientStorageSelect = { id: true }) {
	const clientSettings = await prisma.clientStorage.findFirst({
		where: {
			id: globalConfig.clientID
		},
		select
	});
	if (!clientSettings) {
		throw new Error(`No client settings?!?! ${globalConfig.clientID}`);
	}
	return clientSettings as ClientStorage;
}

export async function mahojiClientSettingsUpdate(data: Prisma.ClientStorageUpdateInput) {
	await prisma.clientStorage.update({
		where: {
			id: globalConfig.clientID
		},
		data,
		select: {
			id: true
		}
	});
}
