import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggleBtn } from '../utils/theme-toggle'
import Image from 'next/image'

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
        <header className='w-full border-b bg-backgroundSecondary'>
            <div className='container flex items-center justify-between py-5'>
                <Link href='/' className='flex gap-3 items-center'>
                    <Image
                        src="/icon.png"
                        alt="pair_pro logo"
                        height={50}
                        width={50}
                    />
                    <h2 className='text-3xl font-bold'>Pair Pro</h2>
                </Link>
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