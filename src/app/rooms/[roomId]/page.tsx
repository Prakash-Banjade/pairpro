import SingleRoomWrapper from '@/app/rooms/[roomId]/components/single-room-wrapper'
import { getSingleRoom } from '@/lib/room-data-access'
import { getCurrentUser } from '@/lib/user-data-access'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

type Props = {
    params: {
        roomId: string
    }
}

export default async function SingleRoomPage({ params }: Props) {

    const room = await getSingleRoom(params.roomId);
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect('/sign-in');

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='sm:py-10 py-5 pb-32 container relative'>
                <SingleRoomWrapper room={room} currentUser={currentUser} />
            </div>
        </Suspense>
    )
}