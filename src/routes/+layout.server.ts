import type { LayoutServerLoad } from './$types';

export const load = (({ cookies }) => {
	const userId = cookies.get('userId');

	if (userId) {
		return {
			loggedIn: true,
			userId: userId
		};
	}

	return {
		loggedIn: false,
		userId: undefined
	};
}) satisfies LayoutServerLoad;
