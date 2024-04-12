import Header from '@/components/publc_home_page/header'
import React from 'react'

type Props = {
    children: React.ReactNode,
}

export default async function CreateRoomLayout({ children }: Props) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}