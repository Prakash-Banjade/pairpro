'use server'

import { getCurrentUser } from "@/lib/user-data-access";
import { StreamChat } from 'stream-chat';
import { Room, room } from "@/db/schema";
import db from "@/db";
import { eq } from "drizzle-orm";
import { CreateRoomFormSchema } from "@/models/create-room.model";
import { revalidatePath } from "next/cache";
import { env } from "@/config/env.config";

export default async function generateStreamToken() {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Unauthorized')

    const serverClient = StreamChat.getInstance(env.STREAM_API_KEY, env.STREAM_API_SECRET);
    // you can still use new StreamChat('api_key', 'api_secret');

    // generate a token for the user with id 'john'
    const token = serverClient.createToken(currentUser.id);
    // next, hand this token to the client in your in your login or registration response

    return token
}

export async function updateRoom(id: string, data: CreateRoomFormSchema) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Unauthorized')

    try {
        await db.update(room).set(data).where(eq(room.id, id));
    } catch (e) {
        console.log(e)
    }

    revalidatePath('/home')
}