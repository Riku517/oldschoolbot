import '../globalSetup';

import mitm from 'mitm';
import { afterEach, beforeEach, vi } from 'vitest';

import { prisma } from '../../src/lib/settings/prisma';

vi.mock('../../src/lib/util/handleMahojiConfirmation.ts', () => ({
	handleMahojiConfirmation: vi.fn()
}));
vi.mock('../../src/lib/util/interactionReply', () => ({
	deferInteraction: vi.fn(),
	interactionReply: vi.fn()
}));

export function randomMock(random = 0.1) {
	Math.random = () => random;
}

vi.mock('../../src/lib/util/webhook', async () => {
	const actual: any = await vi.importActual('../../src/lib/util/webhook');
	return {
		...actual,
		sendToChannelID: async (_args: any) => {}
	};
});

// @ts-ignore mock
globalClient.fetchUser = async (id: string | bigint) => ({
	id: typeof id === 'string' ? id : String(id),
	send: async () => {}
});

beforeEach(async () => {
	await prisma.$connect();
});

afterEach(async () => {
	await prisma.$disconnect();
});

async function init() {
	await prisma.$queryRaw`CREATE EXTENSION IF NOT EXISTS intarray;`;
}

init();

function setupRequestLogging() {
	const mitmInstance = mitm();

	mitmInstance.on('connect', (socket, opts) => {
		if (opts?.host) {
			console.trace(`Sending request to ${opts.host}`);
			socket.bypass();
		}
	});
}

setupRequestLogging();
