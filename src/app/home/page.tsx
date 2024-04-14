import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import { getRooms } from '@/lib/room-data-access'
import Link from 'next/link'
import React, { Suspense } from 'react'
import RoomList from './components/room-list'

type Props = {}

const Rooms = async () => {
    const rooms = await getRooms()

    return rooms.length > 0 ? (
        <RoomList rooms={rooms} />
    ) : (
        <div className='flex flex-col gap-1 mt-20'>
            <p className=' text-center text-lg'>No room found!</p>
            <p className='text-muted-foreground text-center'>
                Looks like everyone is enjoying on their own
            </p>
            <p className='text-muted-foreground text-center'>You can create your own room</p>
        </div>
    )
}

export default async function HomePage({ }: Props) {
    return (
        <div>
            <section className='flex justify-between items-center'>
                <H1 className='capitalize mb-0'>find dev rooms here</H1>
                <Button asChild>
                    <Link href="/create-room">Create room</Link>
                </Button>
            </section>
            <Suspense fallback={<div>Loading...</div>}>
                <Rooms />
            </Suspense>
        </div>
    )
}