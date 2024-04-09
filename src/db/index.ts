import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../../environment';

// for query purposes
const queryClient = postgres(env.DATABASE_URL);
const db = drizzle(queryClient);

export default db