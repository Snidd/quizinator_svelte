// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: postgres.Sql<{}>
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
