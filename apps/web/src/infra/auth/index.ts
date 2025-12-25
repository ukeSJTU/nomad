import "server-only";

export { auth } from "./better-auth.plugin";
export {
  sendAuthEmailOtp,
  sendAuthPhoneOtp,
  shouldEnableAliyunSms,
  shouldEnableResend,
} from "./otp-channels";
export { getSessionUser, requireSessionUser } from "./session";
