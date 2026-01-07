import z from "zod";

export class applyValidation {
    static readonly CREATE = z.object({
        name_apply: z.string().min(1, "Name must be at least 1 character long").max(50, "Name must be at most 50 characters long"),
        email: z.string().email("Email must be a valid email address"),
        no_hp: z.string().min(10, "Phone number must be at least 10 digits"),
        gender: z.string().min(2,"Gender must be at least 2 characters long").max(15,"Gender must be at most 15 characters long"),
        domicile: z.string().min(2,"Domicile must be at least 2 characters long").max(50,"Domicile must be at most 50 characters long"),
        resume: z.string().min(5,"Resume must be at least 5 characters long"),
    })

    static readonly UPDATE = z.object({
        name_apply: z.string().min(1, "Name must be at least 1 character long").max(50, "Name must be at most 50 characters long"),
        email: z.string().email("Email must be a valid email address"),
        no_hp: z.string().min(10, "Phone number must be at least 10 digits"),
        gender: z.string().min(2,"Gender must be at least 2 characters long").max(15,"Gender must be at most 15 characters long"),
        domicile: z.string().min(2,"Domicile must be at least 2 characters long").max(50,"Domicile must be at most 50 characters long"),
        resume: z.string().min(5,"Resume must be at least 5 characters long"),
    })
}