import { z } from 'zod';

export const step1Schema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name may only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name may only contain letters, spaces, hyphens, and apostrophes'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      if (!val) return false;
      const dob = new Date(val);
      if (isNaN(dob.getTime())) return false;
      
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= 18;
    }, 'Applicant must be at least 18 years of age for regulatory compliance')
});

export const step2Schema = z
  .object({
    email: z
      .string()
      .min(1, 'Email address is required')
      .refine((val) => val.includes('@'), 'Email address must contain an @ symbol')
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Enter a valid corporate email address (e.g. name@company.com)'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password must strictly match the primary password',
    path: ['confirmPassword']
  });

export const fullOnboardingSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .min(2, 'First name must be at least 2 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'First name may only contain letters, spaces, hyphens, and apostrophes'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Last name may only contain letters, spaces, hyphens, and apostrophes'),
    dateOfBirth: z
      .string()
      .min(1, 'Date of birth is required')
      .refine((val) => {
        if (!val) return false;
        const dob = new Date(val);
        if (isNaN(dob.getTime())) return false;
        
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age >= 18;
      }, 'Applicant must be at least 18 years of age for regulatory compliance'),
    email: z
      .string()
      .min(1, 'Email address is required')
      .refine((val) => val.includes('@'), 'Email address must contain an @ symbol')
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Enter a valid corporate email address (e.g. name@company.com)'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password must strictly match the primary password',
    path: ['confirmPassword']
  });

export type Step1Fields = z.infer<typeof step1Schema>;
export type Step2Fields = z.infer<typeof step2Schema>;
export type FullFormData = z.infer<typeof fullOnboardingSchema>;

