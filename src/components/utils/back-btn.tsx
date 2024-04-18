'use client'

import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button';

type Props = {}

export default function BackBtn({ }: Props) {
    const router = useRouter();
    return (
        <Button onClick={() => router.back()} size={'sm'} className="text-xs p-0 mb-1" variant={'link'}>
            <IoMdArrowBack size={12} className="mr-1" />
            Back
        </Button>
    )
}