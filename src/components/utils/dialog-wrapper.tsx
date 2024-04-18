import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


type Props = {
    trigger: React.ReactNode,
    title?: string,
    content: React.ReactNode
}

export default function DialogWrapper({ trigger, title, content }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>{title}</DialogTitle>
                    <div className='!mt-5'>
                        {content}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}