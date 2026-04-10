export interface VerifyOtpPayload {
  code: null;
  userToken: string;
  sender: string;
}
export interface reSentOtpPayload {
  userToken: string;
}

export interface ErrorState {
  error?: boolean;
  message?: string;
}

export interface AuthSuccess {
  success: boolean;
  authMessage: string;
  data: {
    userToken: string;
    email: string;
    displayName: string;
    SubPlans: string;
    isOnboard: boolean;
    credits: number;
  };
}

export interface AuthError {
  error: boolean;
  message: string;
}

export interface AuthPayload {
  autherror: AuthError;
  authsuccess: AuthSuccess;
}

export const authFalse: AuthSuccess = {
  success: false,
  authMessage: "",
  data: {
    userToken: "",
    email: "",
    displayName: "",
    SubPlans: "",
    isOnboard: false,
    credits: 0,
  },
};
