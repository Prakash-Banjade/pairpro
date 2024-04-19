'use client'

import { ParticipantView, StreamCall, useCallStateHooks } from '@stream-io/video-react-sdk';

export default function ParticipantsList() {
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();

    console.log(participants)

    return (
        <>
            <StreamCall>
                {participants.map((p) => (
                    <ParticipantView participant={p} key={p.sessionId} />
                ))}
                hey
            </StreamCall>
        </>
    );
};