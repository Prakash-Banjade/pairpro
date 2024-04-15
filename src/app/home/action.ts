'use server'

import db from "@/db"
import { room } from "@/db/schema"
import { getCurrentUser } from "@/lib/user-data-access"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function deleteRoom(id: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    // check if room exists
    const existingRoom = await db.query.room.findFirst({
        where: (room, { eq }) => eq(room.id, id)
    })
    if (!existingRoom) throw new Error('Room not found')

    if (existingRoom.creatorId !== user.id) throw new Error('Unauthorized')

    await db.delete(room).where(eq(room.id, id));

    revalidatePath('/home')
}