"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { useRouter, useSearchParams } from "next/navigation"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useEffect } from "react"

const formSchema = z.object({
    query: z.string(),
})

export default function SearchInput() {

    const router = useRouter();
    const params = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: params.get("q") || "",
        },
    })

    useEffect(() => {
        form.reset({
            query: params.get("q") || "",
        })
    }, [params])

    useEffect(() => {
        if (form.getValues().query.length === 0) {
            router.push('/home')
        }
    }, [form.watch("query")])

    function onSubmit(values: z.infer<typeof formSchema>) {
        values.query.length? router.push(`?q=${values.query}`) : router.push('/home')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem className="flex-1 max-w-2xl">
                            <FormControl>
                                <Input placeholder="Search rooms with tags (go, rust, python) or by name" type="search" {...field} />
                            </FormControl>
                            <FormMessage className="sr-only" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="space-x-1">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    Search
                    </Button>
            </form>
        </Form>
    )
}
