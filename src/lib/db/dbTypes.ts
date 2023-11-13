export interface QuestionDb {
	id: number;
	text: string;
	ingress: string | null;
	order: string;
}

export interface AnswerDb {
	id: number;
	text: string;
}

export interface QuizDb {
	id: number;
	description: string;
}
