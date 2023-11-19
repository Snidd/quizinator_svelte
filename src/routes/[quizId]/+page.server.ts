import { nextQuestion } from '$lib/components/nextQuestion';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent, locals }) => {
	const parentData = await parent();

	if (!parentData.loggedIn || !parentData.userId) {
		throw redirect(302, '/user');
	}

	const nextUrl = await nextQuestion(locals.db, params.quizId, parentData.userId);
	throw redirect(302, nextUrl);
}) satisfies PageServerLoad;
