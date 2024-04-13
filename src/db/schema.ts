import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const oAuthProviderEnum = pgEnum('oAuth', ['google', 'github', 'linkedin'])
export const visibility = pgEnum('visibility', ['public', 'private'])

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    clerkId: varchar('clerkId'),
    first_name: varchar('first_name', { length: 255 }).notNull(),
    last_name: varchar('last_name', { length: 255 }),
    username: varchar('username').notNull().unique(),
    email: varchar('email', { length: 255 }).notNull(),
    profile: varchar('profile'),
    oAuth: oAuthProviderEnum('oAuth'),
    roomId: text('roomId'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
    deleted_at: timestamp('deleted_at', { mode: 'date', precision: 3 }),
});

export const usersRelations = relations(users, ({ one }) => ({
    roomId: one(room, {
        fields: [users.roomId],
        references: [room.id],
    })
}))

export type NewUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect

export const room = pgTable('room', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    creator: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    roomName: text('roomName').notNull(),
    description: text('description'),
    visibility: visibility('visibility').notNull().default('public'),
    language: text('language').notNull(),
    githubRepo: text('githubRepo'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
    deleted_at: timestamp('deleted_at', { mode: 'date', precision: 3 }),
})

export const roomRelations = relations(room, ({ many }) => ({
    users: many(users),
    allowedUsers: many(users),
}));

export type NewRoom = typeof room.$inferInsert

// You do not need to define a column on the room table to reference users for a one-to-many relationship in Drizzle ORM.
// The "many" side (in this case, users) contains a foreign key column that references the primary key of the "one" side (room).
// This is sufficient to establish the relationship between the two tables.
