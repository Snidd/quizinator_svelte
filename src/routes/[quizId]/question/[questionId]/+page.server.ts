import postgres from 'postgres';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import type { Question, QuestionState } from '$lib/types/Question';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
	const parentData = await parent();

	if (!parentData.loggedIn || !parentData.userId) {
		throw redirect(302, '/user');
	}

	const sql = getDatabase();

	let state: QuestionState = {
		answered: false
	};

	const user_answers = await sql`
		select answer_id from user_answers where user_id = ${parentData.userId} and question_id = ${params.questionId}
	`;

	if (user_answers.length > 0) {
		state = {
			answered: true,
			pickedAnswer: user_answers[0].answer_id
		};
	}

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

	const shuffledAnswers = shuffle(
		answers.map((answer) => {
			return {
				id: answer.id,
				text: answer.text
			};
		})
	);

	const question = {
		id: questions[0].id,
		text: questions[0].text,
		ingress: questions[0].ingress,
		answers: shuffledAnswers,
		state
	} satisfies Question;

	return question;
}) satisfies PageServerLoad;

import type { Actions } from './$types';
import type { AnswerDb, QuestionDb } from '$lib/db/dbTypes';
import { getDatabase } from '$lib/db/getDatabase';
import { shuffle } from '$lib/components/shuffle';
import { nextQuestion } from '$lib/components/nextQuestion';

export const actions = {
	default: async ({ request, params, cookies }) => {
		const data = await request.formData();

		const userId = cookies.get('userId');
		const answerId = data.get('answerId');

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

		const nextUrl = await nextQuestion(sql, params.quizId, userId);
		throw redirect(301, nextUrl);
	}
} satisfies Actions;
