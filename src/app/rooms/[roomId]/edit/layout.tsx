import { H1 } from '@/components/ui/typography'
import BackBtn from '@/components/utils/back-btn'
import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode
}

export default function EditRoomLayout({
    children
}: Props) {
    return (
        <div className='container sm:py-10 py-5 pb-32'>
            <BackBtn />
            <H1>Edit Room</H1>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </div>
    )
}