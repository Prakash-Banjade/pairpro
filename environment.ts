import { z } from "zod";

export const environment = z.object({
    DATABASE_URL: z.string(),
})

export const env = environment.parse(process.env)
