import { getSingleRoom } from '@/lib/room-data-access'
import { redirect } from 'next/navigation';
import React from 'react'
import EditRoomForm from './edit-room-form';
import { getCurrentUser } from '@/lib/user-data-access';
import { H1 } from '@/components/ui/typography';

type Props = {
    params: {
        roomId: string,
    }
}

export default async function EditPage({ params: { roomId } }: Props) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return redirect('/sign-in') // redirect user to sign-in if not logged in

    const room = await getSingleRoom(roomId);
    if (!room) return redirect('/home') // redirect user to home if room doesn't exist

    if (room.creatorId !== currentUser.id) return redirect('/home') // redirect user to home if they don't own the room

    return (
        <EditRoomForm room={room} />
    )
}