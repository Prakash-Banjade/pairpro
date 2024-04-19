import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

export function LoadingCard() {
    return (
        <Skeleton className='rounded-xl bg-backgroundSecondary p-4 flex flex-col'>
            <div className='flex justify-between gap-3 rounded-xl'>
                <div className='flex flex-col gap-1 py-2'>
                    <Skeleton className='h-4 w-20 bg-background/50' />
                    <Skeleton className='h-8 w-72 bg-background/50' />
                </div>
            </div>
            <div className='mt-4'>
                <Skeleton className='text-muted-foreground rounded-full text-sm capitalize h-7 w-52 bg-background/50' />
                <div className='flex gap-2 mt-2'>
                    <Skeleton className='h-5 w-20 bg-background/50' />
                    <Skeleton className='h-5 w-20 bg-background/50' />
                </div>
            </div>

            <div className='flex justify-between mt-auto items-center'>
                <Skeleton className='h-5 w-32 bg-background/50' />
                <Skeleton className='h-10 w-[60px] rounded-lg bg-background/50' />
            </div>
        </Skeleton>
    )
}

export default function RoomsLoading({ }: Props) {
    return (
        <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10'>
            {
                new Array(10).fill('_').map((_, i) => <LoadingCard key={i} />)
            }
        </div>
    )
}