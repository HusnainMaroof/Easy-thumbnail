import bcrypt from "bcryptjs";
import crypto from "crypto";
import otpGenrator from "otp-generator";
export const hashValueHelper = async (value: string) => {
  let val = await bcrypt.hash(value, 12);

  return val;
};

export const generateOtpHelper = async () => {
  let otp = otpGenrator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  return Number(otp);
};

export const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex"); // hex string, length*2 chars
};


export const fileToBuffer = async (file: File): Promise<Buffer> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
};