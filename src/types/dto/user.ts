/**
 * User info data structure for frontend display
 */
export interface UserInfo {
  id: string;
  name: string;
  nickname: string | null;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  phoneNumberVerified: boolean;
  gender: "male" | "female" | "other" | null;
  birthday: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * User security status data structure for frontend display
 */
export interface UserSecurityStatus {
  hasPassword: boolean;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  phoneNumberVerified: boolean;
}
