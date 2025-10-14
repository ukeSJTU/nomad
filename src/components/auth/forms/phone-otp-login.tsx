"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  countryCodes,
  type PhoneOtpLoginData,
  phoneOtpLoginSchema,
} from "@/types/auth";

interface PhoneOtpLoginFormProps {
  onSubmit: (data: PhoneOtpLoginData) => void;
  isLoading?: boolean;
  onSendOtp?: () => void;
  countdown?: number;
  onPhoneChange?: (phoneNumber: string, countryCode: string) => void;
}

export default function PhoneOtpLoginForm({
  onSubmit,
  isLoading = false,
  onSendOtp,
  countdown = 0,
  onPhoneChange,
}: PhoneOtpLoginFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<PhoneOtpLoginData>({
    resolver: zodResolver(phoneOtpLoginSchema),
    defaultValues: {
      countryCode: "+86",
      phoneNumber: "",
      otp: "",
    },
  });

  // Watch for changes in phoneNumber and countryCode
  const watchedValues = form.watch(["phoneNumber", "countryCode"]);

  useEffect(() => {
    const [phoneNumber, countryCode] = watchedValues;
    if (onPhoneChange && phoneNumber && countryCode) {
      onPhoneChange(phoneNumber, countryCode);
    }
  }, [watchedValues, onPhoneChange]);

  const handleSubmit = (data: PhoneOtpLoginData) => {
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
                  <FormItem className="w-40">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between h-12"
                          >
                            {field.value
                              ? countryCodes.find(
                                  region => region.value === field.value
                                )?.label
                              : "选择区号"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="搜索国家/地区..." />
                          <CommandList>
                            <CommandEmpty>未找到匹配的国家/地区</CommandEmpty>
                            <CommandGroup>
                              {countryCodes.map(region => (
                                <CommandItem
                                  key={region.value}
                                  value={region.searchTerms.join(" ")}
                                  onSelect={() => {
                                    form.setValue("countryCode", region.value);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === region.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {region.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "登录中..." : "登录"}
        </Button>
      </form>
    </Form>
  );
}
