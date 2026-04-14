export interface VerifyOtpPayload {
  code: number;
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
    galleryData: [] | null;
  };
}

export interface AuthError {
  error: boolean;
  message: string;
}

export interface AuthPayload {
  autherror: AuthError;
  authsuccess: AuthSuccess;
  sessionId?: string;
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
    galleryData: null,
  },
};



export type UserType = {
  
  userToken: string;
  displayName: string;
  email: string;
  SubPlans: string;
  isOnboard: boolean;
  credits: number | null;
  galleryData: any[] | null;
  
} | null;

export type DashboardTab = "generate" | "review";