'use client'

import React from 'react'
import { RoomWithCreator } from '../../../../../types'
import { H3 } from '../../../../components/ui/typography'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { VideoPlayer } from './video-player'
import { User } from '@/db/schema'
import { RoomCard } from '@/app/home/components/room-list'

type Props = {
    room: RoomWithCreator | undefined,
    currentUser: User | undefined,
}

export default function SingleRoomWrapper({ room, currentUser }: Props) {


    if (!room) {
        return (
            <div className='flex items-center my-10 flex-col'>
                <Image
                    src={'/room-not-found.svg'}
                    alt='room not found'
                    width={400}
                    height={400}
                />
                <H3 className='mb-0 mt-10 tracking-normal'>Room not found</H3>
                <p>The room you are looking for does not exist or has been deleted by the creator.</p>
                <Button asChild className='mt-5'>
                    <Link href="/home">
                        Go back
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className='grid lg:grid-cols-4 grid-cols-1 gap-5'>
            <section className='col-span-3'>
                <VideoPlayer room={room} user={currentUser} />
            </section>
            <section>
                <RoomCard room={room} className='border-none' join={false} />
            </section>
        </div>
    )
}