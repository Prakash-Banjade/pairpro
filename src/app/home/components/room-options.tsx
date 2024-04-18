'use client'

import React from 'react'
import { ExtendedRoom } from '../../../../types'
import RoomDeleteBtn from './room-delete-btn'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { FaEdit, FaEye } from 'react-icons/fa'
import DialogWrapper from '@/components/utils/dialog-wrapper'
import { IoCopyOutline } from "react-icons/io5";
import { env } from '@/config/env.config'
import toast from 'react-hot-toast'

type Props = {
    room: ExtendedRoom,
    self?: boolean,
}

export function MoreOptionsBtn({ room, self = false }: Props) {

    const router = useRouter();

    function handleEditClick() {
        router.push(`/rooms/${room.id}/edit`)
    }

    function handleCopyLinkClick() {
        navigator.clipboard.writeText(`${env.NEXT_PUBLIC_FRONTEND_URL}/rooms/${room.id}`).then(() => {
            toast.success('Copied to clipboard!')
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'ghost'} className='absolute top-1.5 right-1.5'>
                    <HiOutlineDotsHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side='right'>
                <DialogWrapper
                    title={room.roomName}
                    content={
                        <p className='font-light'>{room.description}</p>
                    }
                    trigger={
                        <Button variant={'ghost'} size={'sm'} className='flex gap-2 w-full text-left justify-start px-1 rounded-sm text-sm items-center'>
                            <FaEye size={16} />
                            View Description
                        </Button>
                    }
                />
                <DropdownMenuItem className='flex gap-2 items-center' onClick={handleCopyLinkClick}>
                    <IoCopyOutline size={16} />
                    Copy Link
                </DropdownMenuItem>
                {self && <DropdownMenuItem>
                    <button onClick={handleEditClick} className='flex gap-2 items-center'>
                        <span className='text-blue-500'><FaEdit /></span>
                        Edit
                    </button>
                </DropdownMenuItem>}
                {self && <RoomDeleteBtn roomId={room.id} />}
            </DropdownMenuContent>
        </DropdownMenu>


    )
}