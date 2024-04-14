import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { env } from '../../../../environment'
import db from '@/db'
import { users } from '@/db/schema'
import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getUser } from '@/lib/user-data-access'

export async function POST(req: NextRequest) {

    const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('No web hook secret found')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // Get the ID and type
    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    if (!id) return new NextResponse('Missing clerk Id', { status: 400 })

    switch (eventType) {
        case 'user.created':
            await createUser(id, attributes);
            break;
        case 'user.updated':
            await updateUser(id, attributes);
            break;
        case 'user.deleted':
            await deleteUser(id);
            break;
    }

    return NextResponse.json({
        id,
        eventType,
    });

}

async function createUser(clerkId: string, attributes: any) {
    console.log(attributes)

    const oAuth = attributes.external_accounts?.length === 0 ? null
        : attributes.external_accounts[0]?.google_id ? 'google'
            : attributes.external_accounts[0]?.provider === 'oauth_github' ? 'github'
                : 'linkedin'

    try {
        // Create the user
        await db.insert(users).values({
            email: attributes.email_addresses[0].email_address,
            first_name: attributes.first_name,
            last_name: attributes.last_name,
            clerkId: clerkId,
            oAuth,
            profile: attributes?.has_image ? attributes.image_url : null,
            username: attributes?.username,
        })
    } catch (e) {
        if (e instanceof Error) console.log(e.message);
    }
}

async function updateUser(clerkId: string, attributes: any) {
    const { first_name, last_name, email_address } = attributes;
    if (!first_name || !last_name || !email_address) {
        throw new Error('Missing required attributes')
    }

    // Get the user
    const user = await getUser({ clerkId });
    if (!user) {
        throw new Error('User not found')
    }

    // Update the user
    await db.update(users).set({
        email: email_address,
        first_name,
        last_name,
        profile: attributes?.has_image ? attributes.image_url : null,
        username: attributes?.username,
    }).where(eq(users.clerkId, clerkId))
}

async function deleteUser(clerkId: string) {
    console.log('delete web hook')
    const user = await db.query.users.findFirst({ where: eq(users.clerkId, clerkId) })
    if (!user) {
        throw new Error('User not found')
    }

    await db.update(users).set({
        deleted_at: new Date(),
    }).where(eq(users.clerkId, clerkId))
}