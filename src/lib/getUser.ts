import db from "@/db";
import { User, users } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { User as ClerkUser } from "@clerk/nextjs/server";

type GetUserParams = { id: string } | { clerkId: string }

export default async function getUser(input: GetUserParams): Promise<User | ClerkUser | null | undefined> {
    if ('id' in input) {
        const user = db.query.users.findFirst({
            where: eq(users.id, input.id)
        })
        return user || null;
    } else if ('clerkId' in input) {
        const user = clerkClient.users.getUser(input.clerkId);
        return user || null;
    } else {
        return null;
    }
}