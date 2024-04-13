import { Room, User } from '@/db/schema'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { FaGithub } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

type RoomWithCreator = Room & { creator: Partial<User> }

type Props = {
    rooms: RoomWithCreator[]
}

function RoomCard({ room }: { room: RoomWithCreator }) {

    const createdDate = formatDistanceToNow(new Date(room.created_at), { addSuffix: true })

    return (
        <Card className='bg-backgroundSecondary'>
            <CardHeader>
                <CardTitle className='xl:text-2xl text-lg'>{room.roomName}</CardTitle>
                <CardDescription className='line-clamp-2'>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
                {room.githubRepo && <Link href={room.githubRepo} target='_blank' rel='noopener noreferrer' className='flex gap-2 hover:underline whitespace-pre-wrap break-words'><FaGithub size={24} /> {room.githubRepo}</Link>}
                <p>{room.creator.first_name + ' ' + room.creator.last_name}</p>
            </CardContent>
            <CardFooter className='flex justify-between flex-wrap w-full gap-4 items-baseline'>
                <p className='text-muted-foreground text-sm capitalize'>{createdDate}</p>
                <Button asChild>
                    <Link href={`/room/${room.id}`}>
                        Join room
                    </Link>
                </Button>
            </CardFooter>
        </Card>

    )
}

export default function RoomList({ rooms }: Props) {
    return (
        <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10'>
            {rooms.map((room) => (
                <RoomCard room={room} key={room.id} />
            ))}
        </div>
    )
}