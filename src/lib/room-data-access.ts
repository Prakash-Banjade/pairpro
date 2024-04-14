import db from "@/db"
import { getCurrentUser } from "./user-data-access"
import { redirect } from "next/navigation"

export async function getRooms() {
    const currentUser = await getCurrentUser()
    if (!currentUser) return redirect('/sign-in')

    const rooms = await db.query.room.findMany({
        with: {
            creator: {
                columns: {
                    id: true,
                    first_name: true,
                    last_name: true,
                }
            }
        }
    })
    return rooms
}

export async function getSingleRoom(roomId: string) {
    try {
        const room = await db.query.room.findFirst({
            where: (rooms, { eq }) => eq(rooms.id, roomId),
            with: {
                creator: {
                    columns: {
                        id: true,
                        first_name: true,
                        last_name: true,
                    }
                }
            }
        })
        return room
    } catch (e) {
        if (e instanceof Error) return undefined;
    }
}