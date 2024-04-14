import db from "@/db"
import { getCurrentUser } from "./user-data-access"
import { redirect } from "next/navigation"

export default async function getRooms() {
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