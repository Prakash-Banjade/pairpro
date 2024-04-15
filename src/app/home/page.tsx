import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import { getRooms, getSelfRooms } from '@/lib/room-data-access'
import Link from 'next/link'
import React, { Suspense } from 'react'
import RoomList from './components/room-list'
import SearchInput from './components/search-input'
import { PlusIcon } from '@radix-ui/react-icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


type Props = {
    searchParams: {
        q: string | undefined,
    },
    self: boolean,
}

const Rooms = async (props: Props) => {
    const rooms = props.self ? await getSelfRooms(props.searchParams.q || '') : await getRooms(props.searchParams.q)

    return rooms.length > 0 ? (
        <RoomList rooms={rooms} self={props.self} />
    ) : (
        <div className='flex flex-col gap-1 mt-12'>
            <p className=' text-center text-lg'>No room found!</p>
            {!props.self && <p className='text-muted-foreground text-center'>
                Looks like everyone is enjoying on their own
            </p>}
            <p className='text-muted-foreground text-center'>You can create your own room</p>
        </div>
    )
}

export default async function HomePage(props: Omit<Props, 'self'>) {
    const q = props.searchParams.q?.length || 0;

    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList className='mb-5'>
                <TabsTrigger value="all">All rooms</TabsTrigger>
                <TabsTrigger value="my rooms">My rooms</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
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
                        <Rooms {...props} self={false} />
                    </Suspense>
                </div>
            </TabsContent>
            <TabsContent value="my rooms">
                <div>
                    <section className='flex justify-between items-center mb-8'>
                        <H1 className='capitalize mb-0'>My rooms</H1>
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
                        <Rooms {...props} self={true} />
                    </Suspense>
                </div>
            </TabsContent>
        </Tabs>
    )
}