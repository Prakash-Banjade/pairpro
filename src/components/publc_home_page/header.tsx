import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

type Props = {}

export function SignInbBtn() {
    return <Button variant={'default'} className='bg-background text-foreground hover:bg-background/90' asChild>
        <Link href="/sign-in">
            Sign In
        </Link>
    </Button>
}

export default function PublicHeader({ }: Props) {

    return (
        <header className='w-full px-5 border-b border-[#121212]'>
            <div className='max-w-7xl px-5 flex items-center justify-between mx-auto py-5'>
                <h1 className='text-3xl font-bold text-background'>Pair Pro</h1>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInbBtn />
                </SignedOut>
            </div>
        </header>
    )
}