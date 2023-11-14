export type Question = {
	id: number;
	text: string;
	ingress: string | null;
	answers: Answer[];
	state: QuestionState;
};

export type QuestionState = QuestionAnsweredState | QuestionNotAnsweredState;

export type QuestionAnsweredState = {
	answered: true;
	pickedAnswer: number;
};

export type QuestionNotAnsweredState = {
	answered: false;
};

export type Answer = {
	id: number;
	text: string;
};
