import type { FC } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ForgotPasswordFormProps {
  onSendOtp?: (account: string) => Promise<boolean>;
  onVerifyOtp?: (account: string, otp: string) => Promise<boolean>;
  onResetPassword?: (
    newPassword: string,
    confirmPassword: string
  ) => Promise<boolean>;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Input placeholder="国内手机号/邮箱" />
        <Button type="button">发送验证码</Button>
      </div>
      <div className="space-y-3">
        <Input placeholder="短信验证码" />
        <Button type="button">验证并继续</Button>
      </div>
      <div className="space-y-3">
        <Input placeholder="新密码" type="password" />
        <Input placeholder="确认新密码" type="password" />
        <Button type="button">更新密码</Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
