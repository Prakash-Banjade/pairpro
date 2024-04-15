'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import toast from "react-hot-toast"
import { deleteRoom } from "../action"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CircleBackslashIcon, TrashIcon } from "@radix-ui/react-icons"


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
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sure to delete room?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        <CircleBackslashIcon className="mr-2 h-4 w-4" />
                        Cancel
                        </AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={handleDelete}>
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}