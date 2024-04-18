'use client'

import { User } from '@/db/schema';
import { ExtendedRoom } from '../../../../../types';
import { CallControls, PaginatedGridLayout, useCall, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

type Props = {
    user: User | undefined,
    room: ExtendedRoom,
}

export const VideoPlayer = ({ }: Props) => {

    const router = useRouter();
    const call = useCall()
    const client = useStreamVideoClient()

    return (
        <>
            <PaginatedGridLayout />
            <CallControls onLeave={async () => {
                router.push('/home')
                client?.disconnectUser()
            }} />
        </>
    );
};