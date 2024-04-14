import { Value } from "@radix-ui/react-select";
import { z } from "zod";

export const createRoomFormSchema = z.object({
    roomName: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" }),
    description: z
        .string()
        .max(250, { message: "Too long, must be less than 250 characters" }),
    tags: z.string({ required_error: 'Mention atleast one tag' }).min(1, { message: "Mention atleast one tag" }),
    githubRepo: z.string().refine(
        (val) => {
            if (!val.length || val?.startsWith('https://github.com/')) {
                return true
            } else {
                return false
            }
        },
        { message: "Invalid Github Repo" }
    ),
    visibility: z.enum(['public', 'private'], { required_error: 'Visibility must be public or private' }).default('public'),
})

export type CreateRoomFormSchema = z.infer<typeof createRoomFormSchema>

export interface CreateRoomFormField {
    label: string,
    name: keyof CreateRoomFormSchema,
    placeholder?: string,
    type: 'text' | 'select' | 'number' | 'date' | 'checkbox',
    options?: {
        [key: string]: string
    }[],
    description?: string,
}

export const createRoomFormFields: CreateRoomFormField[] = [
    {
        name: 'roomName',
        label: 'Room Name',
        type: 'text',
        placeholder: 'Enter room name',
    },
    {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Enter description',
    },
    {
        name: 'tags',
        label: 'Tags',
        type: 'text',
        placeholder: 'Go, Rust, Python',
    },
    {
        name: 'githubRepo',
        label: 'Github Repo',
        type: 'text',
        placeholder: 'https://github.com/username/repo',
    },
    {
        name: 'visibility',
        label: 'Select Visibility',
        type: 'checkbox',
    },
]