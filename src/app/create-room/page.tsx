import CreateRoomForm from '@/app/create-room/components/create-room-form'
import { H1 } from '@/components/ui/typography'
import React from 'react'

type Props = {}

export default function CreateRoomPage({ }: Props) {
    return (
        <div className='container py-10'>
            <H1>Create Room</H1>
            <CreateRoomForm />
        </div>
    )
}