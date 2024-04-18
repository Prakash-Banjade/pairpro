import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '@/config/env.config';

// for query purposes
const queryClient = postgres(env.DATABASE_URL);
const db = drizzle(queryClient, { schema });

export default db