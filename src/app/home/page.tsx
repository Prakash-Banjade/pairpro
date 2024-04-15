import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import { getRooms } from '@/lib/room-data-access'
import Link from 'next/link'
import React, { Suspense } from 'react'
import RoomList from './components/room-list'
import SearchInput from './components/search-input'
import { PlusIcon } from '@radix-ui/react-icons'

type Props = {
    searchParams: {
        q: string | undefined,
    }
}

const Rooms = async (props: Props) => {
    const rooms = await getRooms(props.searchParams.q)

    return rooms.length > 0 ? (
        <RoomList rooms={rooms} />
    ) : (
        <div className='flex flex-col gap-1 mt-12'>
            <p className=' text-center text-lg'>No room found!</p>
            <p className='text-muted-foreground text-center'>
                Looks like everyone is enjoying on their own
            </p>
            <p className='text-muted-foreground text-center'>You can create your own room</p>
        </div>
    )
}

export default async function HomePage(props: Props) {
    const q = props.searchParams.q?.length || 0;

    return (
        <div>
            <section className='flex justify-between items-center mb-8'>
                <H1 className='capitalize mb-0'>find dev rooms here</H1>
                <Button asChild className='flex gap-1'>
                    <Link href="/create-room">
                        <PlusIcon className='h-5 w-5' />
                        Create room
                    </Link>
                </Button>
            </section>
            <SearchInput />
            {q > 0 && <p className='mt-5'><strong>Showing results for:</strong> {props.searchParams.q}</p>}
            <Suspense fallback={<div>Loading...</div>}>
                <Rooms {...props} />
            </Suspense>
        </div>
    )
}