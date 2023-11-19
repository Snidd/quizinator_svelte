import { getDatabase } from "$lib/db/getDatabase";
import type { Handle } from "@sveltejs/kit";
import postgres from "postgres";

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.db = getDatabase();

    return resolve(event);
};