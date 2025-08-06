import { z } from 'zod';

export const formSchema = z.object({
  statusName: z.string().min(1, 'Status name is required'),
  availability: z.enum(['available', 'unavailable']),
  telNo: z.string().min(8, 'Invalid phone number'),
  emailNotifications: z.boolean(),
  emailAddress: z.string().email('Invalid email address').optional().or(z.literal('')),
  smsNotifications: z.boolean(),
  smsNumber: z.string().min(8, 'Invalid SMS number').optional().or(z.literal('')),
});

export type FormValues = z.infer<typeof formSchema>;
