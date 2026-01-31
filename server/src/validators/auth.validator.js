import { z } from "zod";

export const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .trim()
  .email("Invalid email address");

export const passwordSchema = z
  .string({
    required_error: "Password is required",
  })
  .trim()
  .min(8, "Password must be at least 8 characters");

export const nameSchema = z
  .string({
    required_error: "Name is required",
  })
  .trim()
  .min(1, "Name cannot be empty");

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
