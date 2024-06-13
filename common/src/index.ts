import { z } from 'zod';

export const Signup_Schema = z.object({
    email: z.string().email().trim(),
    password: z.string().min(6),
    gender: z.string()
}).strict();

export const Signin_Schema = z.object({
    email: z.string().email().trim(),
    password: z.string().min(6),
}).strict();

export const Blog_Post_Schema = z.object({
    title: z.string().trim(),
    content: z.string()
}).strict();

export const Blog_Update_Schema = z.object({
    title: z.string().trim(),
    content: z.string()
}).strict();


export type SignupInput = z.infer<typeof Signup_Schema>
export type SigninInput = z.infer<typeof Signin_Schema>
export type BlogPostInput = z.infer<typeof Blog_Post_Schema>
export type BlogUpdateInput = z.infer<typeof Blog_Update_Schema>