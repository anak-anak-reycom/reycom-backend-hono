import z from "zod";

export class carrerValidation {
    static readonly CREATE = z.object({
        job_date: z.coerce.date(),
        job_name: z.string()
            .min(5, "Name must be at least 5 characters long")
            .max(50, "Name must be at most 50 characters long"),
    });

    static readonly UPDATE = z.object({
        job_date: z.coerce.date().optional(),
        job_name: z.string()
            .min(5, "Name must be at least 5 characters long")
            .max(50, "Name must be at most 50 characters long")
            .optional(),
    });
}
