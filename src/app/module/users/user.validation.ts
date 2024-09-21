import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string().nonempty("Name is required"), 
  email: z.string()
    .email("Invalid email format") 
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"), 
  role: z.enum(["admin", "trainer", "trainee"]).default("trainee"), 
});

export const updateUserValidationSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email format").optional(), 
    password: z.string().optional(), 
    role: z.enum(["admin", "trainer", "trainee"]).optional(), 
  });