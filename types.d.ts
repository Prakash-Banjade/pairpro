import { Room, User } from "@/db/schema";

export type RoomWithCreator = Room & { creator: Partial<User> }