"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  countryCodes,
  type PhoneVerificationData,
  phoneVerificationSchema,
} from "@/types/auth";

interface PhoneVerificationFormProps {
  onSubmit: (data: PhoneVerificationData) => void;
  isLoading?: boolean;
  onSendOtp?: () => void;
  countdown?: number;
}

export default function PhoneVerificationForm({
  onSubmit,
  isLoading = false,
  onSendOtp,
  countdown = 0,
}: PhoneVerificationFormProps) {
  const form = useForm<PhoneVerificationData>({
    resolver: zodResolver(phoneVerificationSchema),
    defaultValues: {
      countryCode: "+86",
      phoneNumber: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  const handleSubmit = (data: PhoneVerificationData) => {
    onSubmit(data);
  };

  const handleSendOtp = () => {
    if (onSendOtp) {
      onSendOtp();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Phone Number Section */}
          <div>
            <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
              手机号
            </FormLabel>
            <div className="flex gap-2">
              {/* Country Code Select */}
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="w-32">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="选择" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map(country => (
                            <SelectItem key={country.code} value={country.code}>
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.name}</span>
                                <span className="text-gray-500">
                                  {country.code}
                                </span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Input */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="请输入手机号"
                        className="h-12"
                        maxLength={11}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* OTP Section */}
          <div>
            <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
              短信验证码
            </FormLabel>
            <div className="flex gap-2">
              {/* OTP Input */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="6位数字"
                        className="h-12"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Send OTP Button */}
              <Button
                type="button"
                variant="outline"
                className="h-12 px-4 text-blue-600 border-blue-600 hover:bg-blue-50"
                onClick={handleSendOtp}
                disabled={countdown > 0 || isLoading}
              >
                {countdown > 0 ? `${countdown}s` : "发送验证码"}
              </Button>
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <FormField
            control={form.control}
            name="agreedToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-gray-600">
                    同意《
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      服务协议
                    </button>
                    》和《
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      隐私政策
                    </button>
                    》
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "验证中..." : "下一步，设置密码"}
        </Button>

        {/* Enterprise Registration Link */}
        <div className="text-center">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            企业客户注册
          </button>
        </div>
      </form>
    </Form>
  );
}
