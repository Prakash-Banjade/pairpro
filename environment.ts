import { z } from "zod";

export const environment = z.object({
    DATABASE_URL: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    CLERK_SECRET_KEY: z.string(),
    WEBHOOK_SECRET: z.string(),
    STREAM_API_KEY: z.string(),
    STREAM_API_SECRET: z.string(),
})

export const env = environment.parse(process.env)
