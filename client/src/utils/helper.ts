import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
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

  return otp;
};

export const generateToken = (length = 32) => {
  return randomBytes(length).toString("hex"); // hex string, length*2 chars
};
