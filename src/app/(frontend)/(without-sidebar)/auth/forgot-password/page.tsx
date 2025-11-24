"use client";

import ForgotPasswordForm from "@/components/auth/forms/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm bg-card rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
