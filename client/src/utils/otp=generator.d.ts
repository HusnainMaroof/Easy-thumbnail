declare module 'otp-generator' {
  interface GenerateOptions {
    digits?: boolean;
    lowerCaseAlphabets?: boolean;
    upperCaseAlphabets?: boolean;
    specialChars?: boolean;
  }

  export function generate(length: number, options?: GenerateOptions): string;
}
