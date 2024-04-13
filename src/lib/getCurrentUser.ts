import db from "@/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export default async function getCurrentUser() {
    const clerkUser = await currentUser();

    if (!clerkUser) return null;

    const user = await db.query.users.findFirst({ where: eq(users.clerkId, clerkUser.id) });

    return user
}