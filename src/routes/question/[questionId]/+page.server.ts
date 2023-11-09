import postgres from 'postgres';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import type { Question } from '$lib/types/Question';

export const load = (async ({ params }) => {
	const dbUrl = env.DATABASE_URL;

	if (dbUrl === undefined) throw new Error('Unable to connect to database!');

	const sql = postgres(dbUrl);

	const questions = await sql<QuestionDb[]>`
        select question_id, question_text, question_order from questions where question_id = ${params.questionId}
    `;

	if (!questions.length) {
		throw new Error('No question found!');
	}

	const answers = await sql<AnswerDb[]>`
        select answer_id, answer_text from answers where question_id = ${questions[0].question_id}
    `;

	if (!answers.length) {
		throw new Error('No answers found!');
	}

	const question = {
		id: questions[0].question_id,
		text: questions[0].question_text,
		ingress: 'Ingress',
		answers: answers.map((answer) => {
			return {
				id: answer.answer_id,
				text: answer.answer_text
			};
		})
	} satisfies Question;

	return question;
}) satisfies PageServerLoad;

interface QuestionDb {
	question_id: number;
	question_text: string;
	question_order: string;
}

interface AnswerDb {
	answer_id: number;
	answer_text: string;
}
