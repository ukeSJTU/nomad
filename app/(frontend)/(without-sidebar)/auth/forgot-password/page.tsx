import type { Metadata } from "next";

import ForgotPasswordPageClient from "./page.client";

export const metadata: Metadata = {
  title: "找回密码 - Nomad",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordPageClient />;
}
