import { z } from "zod/v4";

// your schemas (unchanged)
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters");

export const nameSchema = z.string().trim().min(1, "Name cannot be empty");

export const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "OTP must be exactly 6 digits");
export const registerSchema = z.object({
  displayName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const verifyOtpSchema = z.object({
  otp: otpSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const verifyPasswordSchema = z.object({
  password: passwordSchema,
  newPassword: passwordSchema,
});
export const verifyEmailSchema = z.object({
  email: emailSchema,
});

// ✅ THIS is the TypeScript conversion
// use z.infer

export type RegisterInput = z.infer<typeof registerSchema>;

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type VerifyPasswordInput = z.infer<typeof verifyPasswordSchema>;

export type Email = z.infer<typeof emailSchema>;

export type Password = z.infer<typeof passwordSchema>;

export type Name = z.infer<typeof nameSchema>;

export type Otp = z.infer<typeof otpSchema>;
