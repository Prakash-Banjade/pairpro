'use client'

import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { deleteRoom } from "../action"

type Props = {
    roomId: string,
}

export default function RoomDeleteBtn({ roomId }: Props) {
    const handleDelete = async () => {
        const result = deleteRoom(roomId);

        toast.promise(result, {
            loading: 'Deleting room...',
            success: 'Room deleted successfully',
            error: 'Failed to delete room',
        })

    }

    return (
        <Button variant={'destructive'} onClick={handleDelete}>Delete</Button>
    )
}