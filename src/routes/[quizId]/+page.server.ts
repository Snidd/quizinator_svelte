import { nextQuestion } from '$lib/components/nextQuestion';
import { getDatabase } from '$lib/db/getDatabase';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const parentData = await parent();

	if (!parentData.loggedIn || !parentData.userId) {
		throw redirect(302, '/user');
	}

	const sql = getDatabase();
	const nextUrl = await nextQuestion(sql, params.quizId, parentData.userId);
	throw redirect(302, nextUrl);
}) satisfies PageServerLoad;
