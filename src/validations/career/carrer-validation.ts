import z from "zod";

export class carrerValidation {
    static readonly CREATE = z.object({
    jobDate: z
      .any()
      .superRefine((val, ctx) => {
        if (!val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Job Date is required",
          });
          return;
        }

        const date = new Date(val);
        if (isNaN(date.getTime())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Job Date must be a valid date",
          });
        }
      })
      .transform((val) => new Date(val)),

    jobName: z.preprocess(
      (v) => (v == null ? '' : v),
      z
        .string()
        .min(1, 'Job Name must be at least 1 character long')
        .max(50, 'Job Name maximum 50 characters'),
    ),

    categoryId: z.preprocess(
      (v) => (v == null ? '' : v),
      z
        .number()
        .min(1, 'Category Id must be at least 1 character long')
        .max(3, 'Job Name maximum 3 characters'),
    ),
});

    static readonly UPDATE = z.object({
        jobDate: z.coerce.date().optional(),
        jobName: z.preprocess(
            (v) => (v == null ? undefined : v),
            z.string().min(1, 'Job Name must be at least 1 character long').max(50, 'Job Name maximum 50 characters').optional(),
        ),
        categoryId: z.preprocess(
            (v) => (v == null ? undefined : v),
            z.number().min(1, 'id Category must be at least 1 character long').max(50, 'Job Name maximum 50 characters').optional(),
        ),
    });
}
