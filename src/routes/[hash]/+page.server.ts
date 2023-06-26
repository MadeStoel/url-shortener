import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const url = await prisma.url.findFirst({
		where: { hash: params.hash }
	});

	if (!url) throw redirect(300, '/');

	throw redirect(301, url.link);
};
