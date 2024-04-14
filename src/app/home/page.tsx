import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import getRooms from '@/lib/room-data-access'
import Link from 'next/link'
import React, { Suspense } from 'react'
import RoomList from './components/room-list'

type Props = {}

const Rooms = async () => {
    const rooms = await getRooms()

    return rooms.length > 0 ? (
        <RoomList rooms={rooms} />
    ) : (
        <p className='text-muted-foreground text-center pt-10'>No rooms found</p>
    )
}

export default async function HomePage({ }: Props) {
    return (
        <div>
            <section className='flex justify-between items-center'>
                <H1 className='capitalize mb-0'>find dev room here</H1>
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