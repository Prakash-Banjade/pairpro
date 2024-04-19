import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
    return (
        <div className='container'>
            <div className='py-10'>
                {children}
            </div>
        </div>
    )
}