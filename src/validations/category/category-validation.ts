import z from "zod"

export class CategoryValidation {
    static readonly CREATE = z.object({
        name: z.string().min(3, "Category name must be at least 3 characters long").max(50, "Category name must be at most 50 characters long"),
        job_type: z.string().min(3, "Job type must be at least 3 characters long").max(50, "Job type must be at most 50 characters long"),
        career: z.string().min(3, "Career must be at least 3 characters long").max(50, "Career must be at most 50 characters long").optional(),
    })

    static readonly UPDATE = z.object({
        name: z.string().min(3, "Category name must be at least 3 characters long").max(50, "Category name must be at most 50 characters long").optional(),
        job_type: z.string().min(3, "Job type must be at least 3 characters long").max(50, "Job type must be at most 50 characters long").optional(),
        career: z.string().min(3, "Career must be at least 3 characters long").max(50, "Career must be at most 50 characters long").optional(),
    })
}