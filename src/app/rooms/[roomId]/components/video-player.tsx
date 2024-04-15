'use client'

import { User } from '@/db/schema';
import { RoomWithCreator } from '../../../../../types';
import { CallControls, PaginatedGridLayout, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { H2 } from '@/components/ui/typography';

type Props = {
    user: User | undefined,
    room: RoomWithCreator,
}

export const VideoPlayer = ({ user, room }: Props) => {

    const router = useRouter();
    const client = useStreamVideoClient();

    return (
        <>
            <PaginatedGridLayout />
            <CallControls onLeave={() => {
                router.push('/home')
            }} />
        </>
    );
};