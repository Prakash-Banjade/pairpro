'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaEdit } from 'react-icons/fa'

type Props = {
    roomId: string,
}

export default function EditRoomBtn({ roomId }: Props) {
    const router = useRouter();
    
    function handleEditClick(){
        router.push(`/rooms/${roomId}/edit`)
    }
    
    return (
        <Button variant={'outline'} size={'icon'} onClick={handleEditClick}>
            <FaEdit />
        </Button>
    )
}