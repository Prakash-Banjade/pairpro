'use client'

import { CreateRoomFormField, createRoomFormFields, CreateRoomFormSchema, createRoomFormSchema } from '@/models/create-room.model'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import clsx from 'clsx'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createRoom } from '@/app/create-room/actions'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { ExtendedRoom } from '../../../../../types'
import { updateRoom } from '../action'

type Props = {
    room: ExtendedRoom,
}

const SelectRadioGroup = (field: CreateRoomFormField, onChange: () => void, value: string | undefined) => {
    const options = [
        {
            value: 'public',
            description: 'Anyone on the internet can join the room',
            icon: MdOutlinePublic,
        },
        {
            value: 'private',
            description: 'You choose who can join the rooom',
            icon: RiGitRepositoryPrivateLine
        },
    ]

    return <FormItem className="space-y-3">
        <FormControl>
            <RadioGroup
                onValueChange={onChange}
                defaultValue={value}
                className="flex flex-col space-y-1"
            >
                {
                    options?.map(option => typeof option !== 'string' && (
                        <FormItem className="flex items-center space-x-3 space-y-1.5" key={option.value}>
                            <FormControl>
                                <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal hover:cursor-pointer">
                                <div className='flex gap-2 items-start'>
                                    <option.icon size={24} />

                                    <div className='flex flex-col gap-1'>
                                        <p className='capitalize'>{option.value}</p>
                                        <p className='text-xs text-muted-foreground'>{option.description}</p>
                                    </div>
                                </div>
                            </FormLabel>
                        </FormItem>
                    ))
                }
            </RadioGroup>
        </FormControl>
        <FormMessage />
    </FormItem>
}

export default function EditRoomForm({ room }: Props) {
    const router = useRouter();

    const form = useForm<CreateRoomFormSchema>({
        resolver: zodResolver(createRoomFormSchema),
        defaultValues: {
            description: room.description || '',
            githubRepo: room.githubRepo || '',
            visibility: room.visibility,
            tags: room.tags || '',
            roomName: room.roomName,
        },
    })

    async function onSubmit(values: CreateRoomFormSchema) {
        const result = updateRoom(room.id, values)

        toast.promise(result, {
            loading: 'Saving changes...',
            success: 'Room updated successfully',
            error: 'Failed to update room',
        })

        result.then(() => router.push('/home?t=self'))

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {
                    createRoomFormFields.map((formField: CreateRoomFormField, i: number) => (
                        <FormField
                            control={form.control}
                            key={formField.name}
                            name={formField.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">{formField.label}</FormLabel>
                                    {
                                        formField.type === 'select' ? (
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={formField.label} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        formField.options?.map((option) => (
                                                            <SelectItem className="capitalize" key={option.value} value={option.value}>{option.value}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        ) : formField.name === 'description' ? (
                                            <FormItem>
                                                <FormLabel>{formField.description}</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder={formField.placeholder}
                                                        className="resize-none"
                                                        {...field}
                                                        value={field.value instanceof Object ? '' : field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        ) : formField.name === 'visibility' ? (
                                            SelectRadioGroup(formField, field.onChange, field.value instanceof Object ? '' : field.value)
                                        ) : (
                                            <FormControl>
                                                <Input className={clsx(formField.name !== 'githubRepo' && 'capitalize')} autoFocus={i === 0} type={formField.type} placeholder={formField.placeholder} {...field} value={field.value instanceof Object ? '' : field.value} />
                                            </FormControl>
                                        )
                                    }
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                }
                <div className='flex gap-3 justify-end'>
                    <Button type="reset" variant={'outline'} className='' onClick={() => router.push('/home')}>Discard</Button>
                    <Button type="submit" className=''>Save Changes</Button>
                </div>
            </form>
        </Form >
    )
}