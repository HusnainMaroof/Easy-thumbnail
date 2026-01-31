import bcrypt from "bcrypt";
import otpGenrator from "otp-generator";
export const hashValue = async (value) => {
  let val = await bcrypt.hash(value, 10);
  return val;
};

export const generateOtp = async () => {
  let otp = otpGenrator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  return otp;
};
