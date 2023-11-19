import { env } from '$env/dynamic/private';
import postgres from 'postgres';

let globalDatabase: postgres.Sql<{}> | undefined = undefined;

export function getDatabase() {

	if (globalDatabase !== undefined) {
		return globalDatabase;
	}

	const dbUrl = env.DATABASE_URL;
	if (dbUrl === undefined) throw new Error('Unable to connect to database!');

	globalDatabase = postgres(dbUrl, {
		idle_timeout: 10,
		max_lifetime: 60 * 30,
	})

	return globalDatabase;
}
