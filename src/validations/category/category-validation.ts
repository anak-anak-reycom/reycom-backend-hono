import z from "zod"

const CareerSchema = z.object({
    jobName: z.string().min(1, 'Job name must be at least 1 character long').max(100),
    jobDate: z.coerce.date().optional(),
});

export class CategoryValidation {
    static readonly CREATE = z.object({
        nameCategory: z.preprocess(
            (v) => (v == null ? '' : v),
            z.string().min(1, 'Name must be at least 1 character long').max(50, 'Name maximum 50 characters'),
          ),
        jobType: z.preprocess(
            (v) => (v == null ? '' : v),
            z.string().min(1, 'Job type must be at least 1 character long').max(50, 'Job type maximum 50 characters'),
          ),
          career: z
            .array(CareerSchema)
            .optional(), 
        });

    static readonly UPDATE = z.object({
        nameCategory: z.preprocess(
            (v) => (v == null ? undefined : v),
            z.string().min(1, 'Name must be at least 1 character long').max(50, 'Name maximum 50 characters').optional(),
        ),
        jobType: z.preprocess(
            (v) => (v == null ? undefined : v),
            z.string().min(1, 'Job type must be at least 1 character long').max(50, 'Job type maximum 50 characters').optional(),
        ),
          career: z
            .array(CareerSchema)
            .optional(), 
    })
}