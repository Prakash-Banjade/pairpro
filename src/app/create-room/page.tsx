import CreateRoomForm from '@/app/create-room/components/create-room-form'
import { H1 } from '@/components/ui/typography'
import BackBtn from '@/components/utils/back-btn'
import React from 'react'

type Props = {}

export default function CreateRoomPage({ }: Props) {
    return (
        <div className='container sm:py-10 py-5'>
            <BackBtn />
            <H1>Create Room</H1>
            <CreateRoomForm />
        </div>
    )
}