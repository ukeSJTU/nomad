"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  type PhoneLoginData,
  phoneLoginSchema,
} from "@/types/auth";

interface PhoneLoginFormProps {
  onSubmit: (data: PhoneLoginData) => void;
  isLoading?: boolean;
}

export default function PhoneLoginForm({
  onSubmit,
  isLoading = false,
}: PhoneLoginFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<PhoneLoginData>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      countryCode: "+86",
      phoneNumber: "",
      password: "",
      agreedToTerms: false,
    },
  });

  const handleSubmit = (data: PhoneLoginData) => {
    onSubmit(data);
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

          {/* Password Section */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  密码
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
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "登录中..." : "登录"}
        </Button>
      </form>
    </Form>
  );
}
