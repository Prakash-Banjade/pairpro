import { Value } from "@radix-ui/react-select";
import { z } from "zod";

export const primaryLanguageOptions = z.enum([
    'JavaScript',
    'Python',
    'C++',
    'Java',
    'TypeScript',
    'C#',
    'PHP',
    'Ruby',
    'Go',
    'Rust',
    'Kotlin',
    'Swift',
    'Scala',
    'Dart',
    'C',
    'R',
    'Elixir',
    'Erlang',
], {required_error: 'Primary language should be mentioned'})


export const createRoomFormSchema = z.object({
    roomName: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" }),
    description: z
        .string()
        .max(250, { message: "Too long, must be less than 250 characters" }),
    language: primaryLanguageOptions,
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
        name: 'language',
        label: 'Primary programming language',
        type: 'select',
        placeholder: 'Select language',
        options: primaryLanguageOptions._def.values.map((value) => ({
            value: value as typeof value,
            label: value
        }))
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