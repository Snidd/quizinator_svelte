import postgres from 'postgres';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import type { Question } from '$lib/types/Question';
import { fail, redirect } from '@sveltejs/kit';

interface QuestionDb {
	id: number;
	text: string;
	ingress: string | null;
	order: string;
}

interface AnswerDb {
	id: number;
	text: string;
}

export const load = (async ({ params, parent }) => {
	const parentData = await parent();

	if (!parentData.loggedIn) {
		throw redirect(302, '/user');
	}

	const dbUrl = env.DATABASE_URL;

	if (dbUrl === undefined) throw new Error('Unable to connect to database!');

	const sql = postgres(dbUrl);

	const questions = await sql<QuestionDb[]>`
        select * from questions where id = ${params.questionId}
    `;

	if (!questions.length) {
		throw new Error('No question found!');
	}

	const answers = await sql<AnswerDb[]>`
        select * from answers where question_id = ${questions[0].id}
    `;

	if (!answers.length) {
		throw new Error('No answers found!');
	}

	const question = {
		id: questions[0].id,
		text: questions[0].text,
		ingress: questions[0].ingress,
		answers: answers.map((answer) => {
			return {
				id: answer.id,
				text: answer.text
			};
		})
	} satisfies Question;

	return question;
}) satisfies PageServerLoad;

import type { Actions } from './$types';

export const actions = {
	default: async ({ request, params, cookies }) => {
		const data = await request.formData();

		const userId = cookies.get('userId');
		const answerId = data.get('answerId');

		console.log(`question: ${params.questionId} answerId: ${answerId} `);

		//todo, store answer here and redirect to next question.

		if (!userId || !answerId) {
			return fail(500, { message: `Missing user: ${userId} or answer: ${answerId}` });
		}

		const dbUrl = env.DATABASE_URL;
		const sql = postgres(dbUrl);

		try {
			await sql`
				insert into user_answers
				(user_id, question_id, answer_id)
					values
				(${userId}, ${params.questionId}, ${answerId.toString()})
		  `;
		} catch (err) {
			return fail(500, { error: new String(err) });
		}

		const questions = await sql`
			select questions.*, user_answers.answer_id
			from questions 
			left join user_answers on questions.id = user_answers.question_id and user_answers.user_id = ${userId}
			where quiz_id = 6
			and answer_id is null
			order by "order"
		`;

		if (!questions.length) {
			console.log(questions.length);
			throw redirect(301, '/finished');
		}

		throw redirect(301, `/question/${questions[0].id}`);
	}
} satisfies Actions;
