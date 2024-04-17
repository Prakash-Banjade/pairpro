'use server'

import { zodValidate } from "@/components/utils/zodValidate";
import db from "@/db";
import { NewRoom, allowedUsersOnRoom, room, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/user-data-access";
import { CreateRoomFormSchema, createRoomFormSchema } from "@/models/create-room.model";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createRoom = async (formData: CreateRoomFormSchema) => {
    const parsedData = await zodValidate(formData, createRoomFormSchema)

    const currentUser = await getCurrentUser()
    if (!currentUser) throw new Error('Unauthorized')

    const allowedUsersList = parsedData.allowedUsersList || []

    const newRoom = await db.insert(room).values({
        creatorId: currentUser.id,
        allowedUsersList,
        ...parsedData
    }).returning();

    if (parsedData.visibility === 'private') {
        try {
            parsedData.allowedUsers?.forEach(async ({ user }) => {
                const foundUser = user && await db.query.users.findFirst({ where: eq(users.email, user) })

                if (foundUser) addUserToRoomAllowedList({ roomId: newRoom[0].id, userId: foundUser.id })
            })
        } catch (e) {
            console.log(e)
        }
    }

    revalidatePath('/home')
}

async function addUserToRoomAllowedList({ roomId, userId }: { roomId: string, userId: string }) {
    try {
        await db.insert(allowedUsersOnRoom).values({
            roomId,
            userId
        })
    } catch (e) {
        console.log(e)
    }
}