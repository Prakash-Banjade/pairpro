import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const oAuthProviderEnum = pgEnum('oAuth', ['google', 'github', 'linkedin'])

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    clerkId: varchar('clerkId'),
    first_name: varchar('first_name', { length: 255 }).notNull(),
    last_name: varchar('last_name', { length: 255 }),
    username: varchar('username').notNull().unique(),
    email: varchar('email', { length: 255 }).notNull(),
    profile: varchar('profile'),
    oAuth: oAuthProviderEnum('oAuth'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
    deleted_at: timestamp('deleted_at', { mode: 'date', precision: 3 }),
});

export type NewUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect