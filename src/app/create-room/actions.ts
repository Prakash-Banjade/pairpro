'use server'

import { zodValidate } from "@/components/utils/zodValidate";
import db from "@/db";
import { NewRoom, allowedUsersOnRoom, room } from "@/db/schema";
import { getCurrentUser } from "@/lib/user-data-access";
import { CreateRoomFormSchema, createRoomFormSchema } from "@/models/create-room.model";
import { revalidatePath } from "next/cache";

export const createRoom = async (formData: CreateRoomFormSchema) => {
    const parsedData = await zodValidate(formData, createRoomFormSchema)

    const currentUser = await getCurrentUser()
    if (!currentUser) throw new Error('Unauthorized')

    const newRoom = await db.insert(room).values({
        creatorId: currentUser.id,
        ...parsedData
    }).returning();

    if (parsedData.visibility === 'private') {
        try {
            parsedData.allowedUsers?.forEach(async ({ user }) => {
                user && await db.insert(allowedUsersOnRoom).values({
                    roomId: newRoom[0].id,
                    userId: currentUser.id
                })
            })
        } catch (e) {
            console.log(e)
        }
    }
    
    revalidatePath('/home')
}