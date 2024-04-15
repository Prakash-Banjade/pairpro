'use client'

import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'

type Props = {
    tags: string,
}

export default function TagsList({ tags }: Props) {
    const tagsArray = tags.replace(/\s/g, '').split(',')
    const router = useRouter();

    return (
        <div className='flex flex-wrap gap-2'>
            {
                tagsArray.map((tag, index) => <Badge variant={'secondary'} className='cursor-pointer' onClick={() => router.push(`?q=${tag}`)} key={index}>{tag}</Badge>)
            }
        </div>
    )
}