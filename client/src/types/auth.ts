export interface VerifyOtpPayload {
  code: string;
  userToken: string;
  sender:string
}
export interface reSentOtpPayload {
  userToken: string;
}

export interface ErrorState {
  error?: boolean;
  message?: string;
}
