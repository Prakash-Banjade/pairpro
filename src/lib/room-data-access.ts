import db from "@/db"
import { getCurrentUser } from "./user-data-access"
import { redirect } from "next/navigation"
import { ilike } from "drizzle-orm"
import { room } from "@/db/schema"

export async function getRooms(search: string | undefined) {
    const currentUser = await getCurrentUser()
    if (!currentUser) return redirect('/sign-in')

    const where = search ? ilike(room.tags, `%${search}%`) : undefined;

    const rooms = await db.query.room.findMany({
        where,
        with: {
            creator: {
                columns: {
                    id: true,
                    first_name: true,
                    last_name: true,
                }
            }
        },
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

export async function getSelfRooms(search: string) {
    const currentUser = await getCurrentUser()
    if (!currentUser) return redirect('/sign-in')

    const rooms = await db.query.room.findMany({
        where: (room, { eq, and }) => and(
            eq(room.creatorId, currentUser.id),
            ilike(room.tags, `%${search}%`)
        ),
        with: {
            creator: {
                columns: {
                    id: true,
                    first_name: true,
                    last_name: true,
                }
            }
        },
    })

    return rooms;
}