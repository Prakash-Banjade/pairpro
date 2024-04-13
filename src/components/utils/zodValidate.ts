import { z } from "zod";

export async function zodValidate<T>(formData: T, schema: z.Schema<T>) : Promise<T> {
    const result = await schema.safeParseAsync(formData);
    if (!result.success) throw new Error(result.error.errors[0].message);

    return result.data;
}