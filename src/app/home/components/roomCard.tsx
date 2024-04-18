import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { ExtendedRoom } from '../../../../types'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { FaGithub } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import TagsList from '@/components/utils/tags-list'
import { MoreOptionsBtn } from './room-options'

interface RoomCardProps {
    room: ExtendedRoom,
    self: boolean
}

export function GitHubLink({ repo }: { repo: string | null }) {
    if (!repo) return null

    const username = repo.split('/')[3]
    const repoName = repo.split('/')[4]

    return (
        <Link href={repo}
            target='_blank'
            rel='noopener noreferrer'
            className='flex gap-2 text-xs my-2 whitespace-pre-wrap font-medium break-words bg-backgroundSecondary px-3 py-2 w-fit rounded-full'>
            <FaGithub size={18} />
            <span>
                <span className='capitalize'>{username}</span>/<span>{repoName}</span>
            </span>
        </Link>
    )
}

export function RoomCard({ room, self = false }: RoomCardProps) {

    const createdDate = formatDistanceToNow(new Date(room.created_at), { addSuffix: true })

    return (
        <Card className='bg-secondary border hover:border-secondary-foreground transition-all relative'>
            <MoreOptionsBtn room={room} self={self} />
            <CardHeader className='pb-0'>
                <header className='flex justify-between gap-3'>
                    <div className='flex flex-col'>
                        <p className='text-xs text-muted-foreground'>{room.creator.first_name + ' ' + room.creator.last_name}</p>
                        <CardTitle className='xl:text-2xl text-lg mb-2 capitalize'>{room.roomName}</CardTitle>
                    </div>
                </header>
            </CardHeader>
            <CardContent>
                <GitHubLink repo={room.githubRepo} />
                <TagsList tags={room.tags} />
            </CardContent>
            <CardFooter className='flex justify-between flex-wrap w-full gap-4 items-baseline'>
                <p className='text-muted-foreground text-sm capitalize'>{createdDate}</p>
                <div className='flex gap-2'>
                    <Button asChild>
                        <Link href={`/rooms/${room.id}`}>
                            Join
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>

    )
}