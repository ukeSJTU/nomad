import "server-only";

export { auth } from "./better-auth.plugin";
export {
  sendAuthEmailOtp,
  sendAuthPhoneOtp,
  shouldEnableAliyunSms,
  shouldEnableResend,
} from "./otp-channels";
export {
  getTurnstileSecretKey,
  TURNSTILE_PROTECTED_ENDPOINTS,
  TURNSTILE_TEST_SECRET_KEY,
  TURNSTILE_TEST_SITE_KEY,
  type TurnstileProtectedEndpoint,
} from "./turnstile";
