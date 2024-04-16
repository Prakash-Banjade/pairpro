import { H1 } from '@/components/ui/typography'
import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode
}

export default function EditRoomLayout({
    children
}: Props) {
    return (
        <div className='container py-10'>
            <H1>Edit Room</H1>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </div>
    )
}