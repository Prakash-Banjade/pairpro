'use client'

import React, { useEffect, useState } from 'react'
import { ExtendedRoom } from '../../../../../types'
import { H2, H3 } from '../../../../components/ui/typography'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { VideoPlayer } from './video-player'
import { User } from '@/db/schema'
import { RoomCard } from '@/app/home/components/room-list'
import { CallParticipantsList, StreamCallProvider, StreamTheme, StreamVideoClient, StreamVideoProvider } from '@stream-io/video-react-sdk'
import generateStreamToken from '../action'
import { Call } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { env } from '@/config/env.config'

type Props = {
    room: ExtendedRoom | undefined,
    currentUser: User,
}

export default function SingleRoomWrapper({ room, currentUser }: Props) {
    const [call, setCall] = useState<Call | undefined>()
    const [client, setClient] = useState<StreamVideoClient | undefined>()

    useEffect(() => {
        if (!room) return;

        const user_name = currentUser.first_name + ' ' + currentUser.last_name

        const client = new StreamVideoClient({
            apiKey: env.NEXT_PUBLIC_STREAM_API_KEY,
            user: {
                id: currentUser.id,
                name: user_name,
            },
            tokenProvider: () => generateStreamToken(),
        });
        setClient(client)

        client.connectUser({ id: currentUser.id, name: user_name }, room.id);

        const call = client.call('default', room.id);
        call.join({ create: true });
        setCall(call)

        return () => {
             client.disconnectUser();
             setClient(undefined)
        }
    }, [room, currentUser])

    // TODO:
    // useBeforeUnload(true);

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

    if (!client) return null;


    return (
        <StreamVideoProvider client={client}>
            <StreamTheme>
                <StreamCallProvider call={call}>
                    <div className='grid lg:grid-cols-4 grid-cols-1 gap-5'>
                        <section className='lg:col-span-3'>
                            <VideoPlayer room={room} user={currentUser} />
                        </section>
                        <section>
                            <RoomAsideContent room={room} />
                        </section>
                    </div>
                </StreamCallProvider>
            </StreamTheme>
        </StreamVideoProvider>
    )
}

function RoomAsideContent({ room }: { room: ExtendedRoom }) {
    return (
        <div className='space-y-5'>
            <section className=''>
                <H2 className='tracking-tight mb-0'>{room.roomName}</H2>
                <p className='line-clamp-2 text-xs mb-3'>{room.description}</p>
            </section>
            <RoomCard room={room} className='border-none mb-10' join={false} header={false} self={false} />
            {/* <ParticipantsList /> */}
            <CallParticipantsList onClose={() => { }} />
        </div>
    )
}