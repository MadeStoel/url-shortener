import prisma from '$lib/server/prisma';
import { PUBLIC_CLIENT_URL } from '$env/static/public';
import { fail, type Actions } from '@sveltejs/kit';

export function load({ cookies }) {
	const corruptUrl = cookies.get('corruptUrl');

	if (corruptUrl) cookies.delete('corruptUrl');

	return {
		corruptUrl
	};
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const url = formData.get('url') as string;

		if (!validUrl(url)) {
			console.log('invalid url');

			return fail(400, { invalidUrl: true });
		}

		const hash = Math.random().toString(36).substring(2, 7);

		await prisma.url.create({
			data: {
				link: url,
				hash
			}
		});

		return { shortUrl: `${PUBLIC_CLIENT_URL}/${hash}` };
	}
};

function validUrl(url: string) {
	let givenURL;

	try {
		givenURL = new URL(url);
	} catch {
		return false;
	}

	return givenURL.protocol === 'https:';
}
