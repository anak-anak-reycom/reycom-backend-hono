import z from "zod"

export class BranchValidation {

  static readonly CREATE = z.object({

    nameBranch: z.preprocess(
        (v) => (v == null ? '' : v),
         z
         .string()
         .min(1, 'Job Name must be at least 1 character long')
         .max(50, 'Job Name maximum 50 characters'),
     ),
     
    companyId:  z.preprocess(
        (v) => (v == null ? '' : v),
         z
         .coerce.number()
         .min(1, 'Company Id must be at least 1 character long')
         .max(3, 'Company Id maximum 3 characters'),
     ),

    streetAddress: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .min(1, 'Street Address must be at least 1 character long')
          .max(50, 'Street Address maximum 50 characters'),
      ).optional(),

    linkMap: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .min(1, 'Link Map must be at least 1 character long')
          .max(250, 'Link Map maximum 250 characters'),
      ).optional(),

    phone: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .min(1, 'Phone Number must be at least 1 character long')
          .max(20, 'Phone Number maximum 20 characters'),
      ).optional(),

    email: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .email()
          .min(1, 'Email must be at least 1 character long')
          .max(100, 'Email maximum 100 characters'),
      ).optional(),

    website: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .email()
          .min(1, 'Link Website be at least 1 character long')
          .max(100, 'Link Website maximum 100 characters'),
      ).optional(),

  }).strict()


  static readonly UPDATE = z.object({

    nameBranch: z.preprocess(
        (v) => (v == null ? '' : v),
         z
         .string()
         .min(1, 'Job Name must be at least 1 character long')
         .max(50, 'Job Name maximum 50 characters'),
     ).optional(),
     
    companyId:  z.preprocess(
        (v) => (v == null ? '' : v),
         z
         .coerce.number()
         .min(1, 'Company Id must be at least 1 character long')
         .max(3, 'Company Id maximum 3 characters'),
     ).optional(),

    streetAddress: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .min(1, 'Street Address must be at least 1 character long')
          .max(50, 'Street Address maximum 50 characters'),
      ).optional(),

    linkMap: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .min(1, 'Link Map must be at least 1 character long')
          .max(250, 'Link Map maximum 250 characters'),
      ).optional(),

    phone: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .min(1, 'Phone Number must be at least 1 character long')
          .max(20, 'Phone Number maximum 20 characters'),
      ).optional(),

    email: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .email()
          .min(1, 'Email must be at least 1 character long')
          .max(100, 'Email maximum 100 characters'),
      ).optional(),

    website: z.preprocess(
          (v) => (v == null ? '' : v),
          z
          .string()
          .email()
          .min(1, 'Link Website be at least 1 character long')
          .max(100, 'Link Website maximum 100 characters'),
      ).optional(),

  }).strict()

}