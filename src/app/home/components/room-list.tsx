import React from 'react'
import { ExtendedRoom } from '../../../../types'
import { RoomCard } from './roomCard'

type Props = {
    rooms: ExtendedRoom[],
    self: boolean,
}

export default function RoomList({ rooms, self }: Props) {
    return (
        <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10'>
            {rooms.map((room) => (
                <RoomCard room={room} key={room.id} self={self} />
            ))}
        </div>
    )
}