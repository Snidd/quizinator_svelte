import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import postgres from 'postgres';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent, cookies }) => {
	const parentData = await parent();
	if (parentData.loggedIn) {
		throw redirect(301, '/');
	}

	return { userId: cookies.get('userId') };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, getClientAddress, cookies }) => {
		const data = await request.formData();

		const ipAddress = getClientAddress();
		const username = data.get('username');

		if (username == null) {
			return fail(400, { username, missing: true });
		}

		const dbUrl = env.DATABASE_URL;
		const sql = postgres(dbUrl);
		const users = await sql<UserDb[]>`
        SELECT * FROM users
        WHERE name = ${username.toString()}
        ORDER BY id ASC LIMIT 100
        `;

		if (!users.length) {
			try {
				const newUser = await sql<UserDb[]>`
                insert into users
                  ("name", "unique")
                values
                  (${username.toString()}, ${ipAddress})
                returning "id", "name", "unique"
              `;

				console.log(`returning set-cookies to userId:${newUser[0].id.toString()}`);
				cookies.set('userId', newUser[0].id.toString(), { secure: false });

				return {
					success: true,
					user: newUser[0]
				};
			} catch (err) {
				console.log({ err });
				return {
					success: false,
					message: 'You already have a user?'
				};
			}
		}

		const existingUser = users.find((user) => user.unique === ipAddress);

		if (existingUser) {
			console.log(`returning set-cookies to userId:${existingUser.id.toString()}`);
			cookies.set('userId', existingUser.id.toString(), { secure: false });
			return {
				success: true,
				user: existingUser
			};
		}

		console.log('user not found!');

		return {
			success: false,
			message: 'userNotFound'
		};
	}
} satisfies Actions;

export interface UserDb {
	id: number;
	name: string;
	unique: string;
}
