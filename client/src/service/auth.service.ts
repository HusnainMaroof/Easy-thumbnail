import prisma from "../lib/prisma";
import { UnauthorizedException } from "../utils/app.error";
import { generateToken, hashValueHelper } from "../utils/helper";

interface RegisterForm {
  email: string;
  displayName: string;
  password: string;
}

export type ServiceResponse = {
  success: boolean;
  message?: any;
  data: any;
};

export const registerService = async (
  formData: RegisterForm,
): Promise<ServiceResponse> => {
  const { email, displayName, password } = formData;

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist) {
    if (userExist?.status === "PENDING" || !userExist?.emailVerified)
      return {
        success: false,
        message: "Not Verified",
        data: userExist.userToken,
      };

    throw new Error("user already exist");
  }

  let hashPass = await hashValueHelper(password);
  let userToken = await generateToken(32);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashPass,
      displayName: displayName,
      userToken: userToken,
    },
  });

  return { success: true, message: "USER_CREATED", data: newUser };
};
