export type Question = {
	id: number;
	text: string;
	ingress: string | null;
	answers: Answer[];
};

export type Answer = {
	id: number;
	text: string;
};
