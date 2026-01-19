/**
 * Authentication Components
 *
 * Components for user authentication including sign-up, sign-in,
 * and social account management.
 */

export type {
  VerificationFormData,
  VerificationFormProps,
  VerificationMode,
} from "@nomad/ui/components/auth";
// Re-export VerificationForm from packages/ui
export { VerificationForm } from "@nomad/ui/components/auth";
// Forms
export { default as PasswordSetupForm } from "./forms/password-setup";
export { default as UnifiedLoginForm } from "./forms/unified-login";
export { default as UnifiedSignUpForm } from "./forms/unified-signup";

// Other components
export { LinkButton } from "./link-button";
export { SignUpModal } from "./sign-up-modal";
export { UnlinkButton } from "./unlink-button";
export { default as UserSidebar } from "./user-sidebar";
