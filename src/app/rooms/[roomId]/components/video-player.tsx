'use client'

import { User } from '@/db/schema';
import { ExtendedRoom } from '../../../../../types';
import { CallControls, PaginatedGridLayout, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

type Props = {
    user: User | undefined,
    room: ExtendedRoom,
}

export const VideoPlayer = ({ }: Props) => {

    const router = useRouter();
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