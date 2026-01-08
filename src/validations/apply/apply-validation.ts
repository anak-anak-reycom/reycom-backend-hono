import { z } from 'zod';

export class applyValidation {
   static readonly CREATE = z.object({
  name_apply: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(1, 'Name must be at least 1 character long').max(50, 'Name maximum 50 characters'),
  ),

  email: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(1, 'Email is required').email('Email format is invalid'),
  ),

  no_hp: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(10, 'Phone Number must be at least 10 digits'),
  ),

  gender: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(2, 'Gender is required').max(15),
  ),

  domicile: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(2, 'Domicile is required').max(50),
  ),

  resume: z.preprocess(
    (v) => (v == null ? '' : v),
    z.string().min(1, 'Resume is required').min(5, 'Resume must be at least 5 characters long'),
  ),
});


  static readonly UPDATE = z.object({
  name_apply: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(1, 'Name must be at least 1 character long').max(50, 'Name maximum 50 characters').optional(),
  ),

  email: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().email('Email format is invalid').optional(),
  ),

  no_hp: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(10, 'Phone Number must be at least 10 digits').optional(),
  ),

  gender: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(2, 'Gender is required').max(15, 'Gender maximum 15 characters').optional(),
  ),

  domicile: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(2, 'Domicile is required').max(50, 'Domicile maximum 50 characters').optional(),
  ),

  resume: z.preprocess(
    (v) => (v == null ? undefined : v),
    z.string().min(5, 'Resume must be at least 5 characters long').optional(),
  ),
});

}
