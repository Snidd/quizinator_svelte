import type postgres from 'postgres';

export async function nextQuestion(sql: postgres.Sql, quizId: string, userId: string) {
	const questions = await sql`
    select questions.*, user_answers.answer_id
    from questions 
    left join user_answers on questions.id = user_answers.question_id and user_answers.user_id = ${userId}
    where quiz_id = ${quizId}
    and answer_id is null
    order by "order"
`;

	if (!questions.length) {
		return `/${quizId}/finished`;
	}

	return `/${quizId}/question/${questions[0].id}`;
}
