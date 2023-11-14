import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (() => {
	const defaultQuizId = 7;

	throw redirect(301, `/${defaultQuizId}`);
}) satisfies PageServerLoad;
