import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggleBtn } from '../utils/theme-toggle'

type Props = {}

export function SignInbBtn() {
    return <Button variant={'default'} asChild>
        <Link href="/sign-in">
            Sign In
        </Link>
    </Button>
}

export default function Header({ }: Props) {

    return (
        <header className='w-full border-b'>
            <div className='container flex items-center justify-between py-5'>
                <h1 className='text-3xl font-bold'>Pair Pro</h1>
                <section className='flex gap-5 items-center'>
                    <ThemeToggleBtn />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInbBtn />
                    </SignedOut>
                </section>
            </div>
        </header>
    )
}