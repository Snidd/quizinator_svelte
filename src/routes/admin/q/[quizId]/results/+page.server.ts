import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const sql = locals.db;

	const quiz: ResultDb[] = await sql<ResultDb[]>`
    select users.name, user_id, 
        count(user_id) filter (where is_correct = true) as correct_count,
        count(user_id) as total_count
    from users, user_answers left join answers on user_answers.answer_id = answers.id
    where users.id = user_answers.user_id
    and user_answers.question_id in (select questions.id from questions where quiz_id=${params.quizId})
    group by users.name, user_id
	`;

	return { results: quiz };
}) satisfies PageServerLoad;

export interface ResultDb {
	user_id: number;
	name: string;
	correct_count: number;
	total_count: number;
}
