import { ZodSchema, z } from "zod";

type ValidationSuccess<T> = {
  success: true;
  data: T;
};

type ValidationError<T> = {
  success: false;
  errors: z.ZodFlattenedError<T>["fieldErrors"];
};

export function validateForm<T>(
  schema: ZodSchema<T>,
  formData: FormData,
): ValidationSuccess<T> | ValidationError<T> {
  const data = Object.fromEntries(formData.entries());

  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
