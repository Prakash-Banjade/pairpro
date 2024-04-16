import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, primaryKey, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

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
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
    deleted_at: timestamp('deleted_at', { mode: 'date', precision: 3 }),
});

export const usersRelations = relations(users, ({ many }) => ({
    createdRooms: many(room),
    allowedRooms: many(allowedUsersOnRoom),
}))

export type NewUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect

export const room = pgTable('room', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    creatorId: uuid('creatorId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    roomName: text('roomName').notNull(),
    description: text('description'),
    visibility: visibility('visibility').notNull().default('public'),
    tags: text('tags').notNull(),
    githubRepo: text('githubRepo'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
    deleted_at: timestamp('deleted_at', { mode: 'date', precision: 3 }),
})

export const roomRelations = relations(room, ({ many, one }) => ({
    creator: one(users, { fields: [room.creatorId], references: [users.id] }),
    allowedUsers: many(allowedUsersOnRoom),
}));

export const allowedUsersOnRoom = pgTable('allowedUsersOnRoom', { // join table for users that are allowed to join a room since M:N relationship
    roomId: uuid('roomId').notNull().references(() => room.id, { onDelete: 'cascade' }),
    userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
}, (table) => ({
    pk: primaryKey({ columns: [table.roomId, table.userId] }), // no need for separate pk, roomId and userId are unique, so the combination acts as primary key
}))

export const allowedUsersOnRoomRelations = relations(allowedUsersOnRoom, ({ one }) => ({
    user: one(users, { fields: [allowedUsersOnRoom.userId], references: [users.id] }),
    room: one(room, { fields: [allowedUsersOnRoom.roomId], references: [room.id] }),
}))

export type NewRoom = typeof room.$inferInsert
export type Room = typeof room.$inferSelect
