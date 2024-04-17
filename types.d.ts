import { Room, User } from "@/db/schema";

export type ExtendedRoom = Room & {
    creator: Partial<User>,
    allowedUsers: { userId: string }[],
    allowedUsersList: string[] | null,
}