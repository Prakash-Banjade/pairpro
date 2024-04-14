'use server'

import { getCurrentUser } from "@/lib/user-data-access";
import { env } from "../../../../../environment";
import { StreamChat } from 'stream-chat';

export default async function generateStreamToken() {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Unauthorized')

    console.log(env.STREAM_API_SECRET, env.STREAM_API_KEY)

    const serverClient = StreamChat.getInstance(env.STREAM_API_KEY, env.STREAM_API_SECRET);
    // you can still use new StreamChat('api_key', 'api_secret');

    // generate a token for the user with id 'john'
    const token = serverClient.createToken(currentUser.id);
    // next, hand this token to the client in your in your login or registration response

    return token
}