// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().min(1),
        CLERK_SECRET_KEY: z.string().min(1),
        WEBHOOK_SECRET: z.string().min(1),
        STREAM_API_SECRET: z.string().min(1),
        STREAM_API_KEY: z.string().min(1),
    },
    /*
     * Environment variables available on the client (and server).
     *
     * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
     */
    client: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
        NEXT_PUBLIC_STREAM_API_KEY: z.string().min(1),
    },
    /*
     * Due to how Next.js bundles environment variables on Edge and Client,
     * we need to manually destructure them to make sure all are included in bundle.
     *
     * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
     */
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
        NEXT_PUBLIC_STREAM_API_KEY: process.env.NEXT_PUBLIC_STREAM_API_KEY,
        STREAM_API_KEY: process.env.STREAM_API_KEY,
        STREAM_API_SECRET: process.env.STREAM_API_SECRET,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
});