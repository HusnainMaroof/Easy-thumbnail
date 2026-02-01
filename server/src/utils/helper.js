import bcrypt from "bcrypt";
import otpGenrator from "otp-generator";
export const hashValueHelper = async (value) => {
  let val = await bcrypt.hash(value, 10);
  return val;
};

export const generateOtpHelper = async () => {
  let otp = otpGenrator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  return otp;
};
