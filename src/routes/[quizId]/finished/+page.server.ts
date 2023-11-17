import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDatabase } from '$lib/db/getDatabase';
import type { QuestionDb } from '$lib/db/dbTypes';

export const load = (async ({ params, parent }) => {
	const pData = await parent();

	const userId = pData.userId;

	if (userId == null || userId == undefined) {
		throw redirect(301, '/user');
	}

	const sql = getDatabase();

	const questionsAndAnswers = await sql<QuestionsAndAnswers[]>`
		select questions.text, questions.order, questions.ingress,  string_agg(answers.text, '|') as answers, a2.text as picked_answer
		from questions 	
		left join answers on questions.id = answers.question_id	
		left join user_answers on questions."id" = user_answers.question_id and user_answers.user_id = ${userId}
		left join answers a2 on user_answers.answer_id = a2.id
		where questions.quiz_id = ${params.quizId}
		group by questions.id, a2.text
		order by "order"	
    `;

	return {
		questions: questionsAndAnswers
	};
}) satisfies PageServerLoad;

interface QuestionsAndAnswers extends QuestionDb {
	answers: string;
	picked_answer: string;
}
