import { getDatabase } from '$lib/db/getDatabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const sql = getDatabase();

	const quiz = await sql<ResultDb[]>`
    SELECT user_id, users.name, count(user_id) as correct_answers
    from user_answers 
    left join answers on user_answers.answer_id = answers.id
    left join users on users.id = user_id
    where user_answers.question_id in (select id from questions where quiz_id = ${params.quizId})
    and answers.is_correct = true
    group by user_id, users.name
	`;

	return { results: quiz };
}) satisfies PageServerLoad;

interface ResultDb {
	user_id: number;
	name: string;
	correct_answers: number;
}
