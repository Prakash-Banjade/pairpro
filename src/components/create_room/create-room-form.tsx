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
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import clsx from 'clsx'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createRoom } from '@/app/create-room/actions'

type Props = {}

const SelectRadioGroup = (field: CreateRoomFormField, onChange: () => void, value: string | undefined) => {
    return <FormItem className="space-y-3">
        <FormControl>
            <RadioGroup
                onValueChange={onChange}
                defaultValue={value}
                className="flex flex-col space-y-1"
            >
                {
                    field?.options?.map(option => typeof option !== 'string' && (
                        <FormItem className="flex items-center space-x-3 space-y-1.5" key={option.value}>
                            <FormControl>
                                <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                                <div className='flex flex-col gap-1'>
                                    <p className='capitalize'>{option.value}</p>
                                    <p className='text-xs text-muted-foreground'>{option.description}</p>
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

export default function CreateRoomForm({ }: Props) {
    const form = useForm<CreateRoomFormSchema>({
        resolver: zodResolver(createRoomFormSchema),
        defaultValues: {
            description: '',
            githubRepo: '',
            visibility: 'public',
            language: undefined,
            roomName: '',
        },
    })

    async function onSubmit(values: CreateRoomFormSchema) {
        // console.log(values)
        await createRoom(values)
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {
                    createRoomFormFields.map((formField: CreateRoomFormField) => (
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
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        ) : formField.name === 'visibility' ? (
                                            SelectRadioGroup(formField, field.onChange, field.value)
                                        ) : (
                                            <FormControl>
                                                <Input className={clsx(formField.name !== 'githubRepo' && 'capitalize')} type={formField.type} placeholder={formField.placeholder} {...field} />
                                            </FormControl>
                                        )
                                    }
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                }
                <div className='flex'>
                    <Button type="submit" className='ml-auto'>Create room</Button>
                </div>
            </form>
        </Form >
    )
}