export type Question = {
	id: number;
	text: string;
	ingress: string;
	answers: Answer[];
};

export type Answer = {
	id: number;
	text: string;
};
