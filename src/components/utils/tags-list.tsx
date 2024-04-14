import React from 'react'
import { Badge } from "@/components/ui/badge"


type Props = {
    tags: string,
}

export default function TagsList({ tags }: Props) {
    const tagsArray = tags.replace(/\s/g, '').split(',')

    return (
        <div className='flex flex-wrap gap-2'>
            {
                tagsArray.map((tag, index) => <Badge variant={'secondary'} key={index}>{tag}</Badge>)
            }
        </div>
    )
}