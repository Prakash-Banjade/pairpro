import SingleRoomWrapper from '@/app/rooms/[roomId]/components/single-room-wrapper'
import { getSingleRoom } from '@/lib/room-data-access'
import { useRouter } from 'next/navigation'
import React, { Suspense } from 'react'
import toast from 'react-hot-toast'

type Props = {
    params: {
        roomId: string
    }
}

export default async function SingleRoomPage({ params }: Props) {

    const room = await getSingleRoom(params.roomId);


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SingleRoomWrapper room={room} />
        </Suspense>
    )
}