import z from "zod";

export class CountryValidation {
    static readonly CREATE = z.object({
        name_category: z.preprocess(
                    (v) => (v == null ? '' : v),
                    z.string().min(1, 'Name must be at least 1 character long').max(50, 'Name maximum 50 characters'),
                  ),
         }).strict();

    static readonly UPDATE = z.object({
        name_category: z.preprocess(
                    (v) => (v == null ? undefined : v),
                    z.string().min(1, 'Name must be at least 1 character long').max(50, 'Name maximum 50 characters').optional(),
                ),
         }).strict();
}