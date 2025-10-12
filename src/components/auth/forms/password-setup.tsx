"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type PasswordSetupData, passwordSetupSchema } from "@/types/auth";

interface PasswordSetupFormProps {
  onSubmit: (data: PasswordSetupData) => void;
  isLoading?: boolean;
}

export default function PasswordSetupForm({
  onSubmit,
  isLoading = false,
}: PasswordSetupFormProps) {
  const form = useForm<PasswordSetupData>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (data: PasswordSetupData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Password Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  设置密码
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="请输入密码"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Input */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  确认密码
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="请再次输入密码"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Requirements */}
          <div className="text-sm text-gray-600 space-y-1">
            <p>密码要求：</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>至少8位字符</li>
              <li>包含至少一个大写字母</li>
              <li>包含至少一个小写字母</li>
              <li>包含至少一个数字</li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "创建中..." : "完成注册"}
        </Button>
      </form>
    </Form>
  );
}
