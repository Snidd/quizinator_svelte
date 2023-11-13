import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDatabase } from '$lib/db/getDatabase';
import type { QuestionDb, QuizDb } from '$lib/db/dbTypes';

export const load = (async ({ params }) => {
	const sql = getDatabase();

	const quiz = await sql<QuizDb[]>`
		select * from quiz where id = ${params.quizId}
	`;

	if (!quiz.length) {
		throw error(404, 'Not found');
	}

	const questions = await sql<QuestionDb[]>`
		select * from questions where quiz_id = ${quiz[0].id}
	`;

	const return_quiz = {
		...quiz[0],
		questions: questions
	};

	return {
		quiz: return_quiz
	};
}) satisfies PageServerLoad;

import type { Actions } from './$types';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();

		const text = data.get('text');
		const ingress = data.get('ingress');

		const answer_1 = data.get('answer_1');
		const answer_2 = data.get('answer_2');
		const answer_3 = data.get('answer_3');
		const answer_4 = data.get('answer_4');

		const order = data.get('order');

		const sql = getDatabase();

		if (!text || !ingress || !answer_1 || !answer_2 || !answer_3 || !answer_4 || !order) {
			return fail(500, { success: false, msg: 'Unknown error' });
		}

		try {
			await sql`
			WITH question_id AS (
				INSERT INTO "questions" (ingress, "text", quiz_id, "order")
				VALUES (${ingress.toString()}, ${text.toString()}, ${
				params.quizId
			}, ${order.toString()}) RETURNING "id"
			)
			
			INSERT INTO answers ("text", is_correct, question_id)
			VALUES 
				(${answer_1.toString()}, TRUE, (SELECT "id" from question_id)),
				(${answer_2.toString()}, FALSE, (SELECT "id" from question_id)),
				(${answer_3.toString()}, FALSE, (SELECT "id" from question_id)),
				(${answer_4.toString()}, FALSE, (SELECT "id" from question_id))
		  `;
		} catch (err) {
			return fail(500, { error: new String(err) });
		}

		return { success: true };
	}
} satisfies Actions;
