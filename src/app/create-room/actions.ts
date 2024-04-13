'use server'

import { zodValidate } from "@/components/utils/zodValidate";
import db from "@/db";
import { NewRoom, room } from "@/db/schema";
import getCurrentUser from "@/lib/getCurrentUser";
import { CreateRoomFormSchema, createRoomFormSchema } from "@/models/create-room.model";
import { revalidatePath } from "next/cache";

export const createRoom = async (formData: CreateRoomFormSchema) => {
    const parsedData = await zodValidate(formData, createRoomFormSchema)

    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    await db.insert(room).values({
        creatorId: user.id,
        ...parsedData
    }).returning();


    revalidatePath('/home')
}