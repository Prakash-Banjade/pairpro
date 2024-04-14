'use client'

import {
    Call,
    CallControls,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
// import { env } from '../../../../../environment';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useEffect, useState } from 'react';
import { User } from '@/db/schema';
import { RoomWithCreator } from '../../../../../types';
import generateStreamToken from './action';

const apiKey = 'f2ns3n38gg4c';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWVmMjZkMDUtZjRjNy00YTI1LWFiYTctNGU1YjRjMjEzYTA5In0.9ky6S--xwTKgkECGuoGdlLMFR5aVNoY14frSAs7mDRY';

type Props = {
    user: User | undefined,
    room: RoomWithCreator | undefined,
}

export const VideoPlayer = ({ user, room }: Props) => {

    const [client, setClient] = useState<StreamVideoClient | null>()
    const [call, setCall] = useState<Call | null>()

    useEffect(() => {
        if (!user?.id || !room?.id) return;

        const client = new StreamVideoClient({
            apiKey, user: {
                id: user.id
            }, 
            tokenProvider: () => generateStreamToken(),
            // token,
        });
        setClient(client);
        const call = client.call('default', room.id);
        call.join({ create: true });
        setCall(call)

        return () => {
            call.leave();
            client.disconnectUser();
        }
    }, [user, room])


    return client && call && (
        <StreamVideo client={client}>
            <StreamTheme as="main">
                <StreamCall call={call}>
                    <SpeakerLayout />
                    <CallControls />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
};