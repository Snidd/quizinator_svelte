import { env } from '$env/dynamic/private';
import postgres from 'postgres';

export function getDatabase() {
	const dbUrl = env.DATABASE_URL;
	if (dbUrl === undefined) throw new Error('Unable to connect to database!');

	const sql = postgres(dbUrl);

	return sql;
}
