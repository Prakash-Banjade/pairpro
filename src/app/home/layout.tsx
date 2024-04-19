import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
    return (
        <div className='container'>
            <div className='sm:py-10 py-5 pb-32'>
                {children}
            </div>
        </div>
    )
}