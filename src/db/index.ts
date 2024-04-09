import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../../environment';
import * as schema from './schema';

// for query purposes
const queryClient = postgres(env.DATABASE_URL);
const db = drizzle(queryClient, { schema });

export default db