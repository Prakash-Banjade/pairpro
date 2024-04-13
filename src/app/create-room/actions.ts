'use server'

import { zodValidate } from "@/components/utils/zodValidate";
import { CreateRoomFormSchema, createRoomFormSchema } from "@/models/create-room.model";

export const createRoom = async (formData: CreateRoomFormSchema) => {
    const parsedData = await zodValidate(formData, createRoomFormSchema)

    // TODO: create room
    console.log(parsedData)


}