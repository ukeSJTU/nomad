"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nomad/ui/components/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/primitives/form";
import { Input } from "@nomad/ui/components/primitives/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@nomad/ui/components/primitives/radio-group";
import { Separator } from "@nomad/ui/components/primitives/separator";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateUserInfoAction } from "@/app/_actions";
import type { ActionResult } from "@/types/common";
import type { UserInfo } from "@/types/dto";
import {
  type UserInfoUpdateData,
  userInfoUpdateSchema,
} from "@/types/validations";

interface UserInfoEditFormProps {
  userData: UserInfo;
  onCancel: () => void;
  onSuccess: () => void;
}

const genderLabels = {
  male: "男",
  female: "女",
  other: "其他",
};

export function UserInfoEditForm({
  userData,
  onCancel,
  onSuccess,
}: UserInfoEditFormProps) {
  const [state, setState] = useState<ActionResult<void> | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserInfoUpdateData>({
    resolver: zodResolver(userInfoUpdateSchema),
    defaultValues: {
      nickname: userData.nickname || "",
      name: userData.name || "",
      gender: userData.gender || undefined,
      birthday: userData.birthday || "",
    },
  });

  const handleSubmit = async (data: UserInfoUpdateData) => {
    startTransition(async () => {
      const result = await updateUserInfoAction(data);
      setState(result);
      if (result.success) {
        onSuccess();
      }
    });
  };

  const handleCancel = () => {
    form.reset({
      nickname: userData.nickname || "",
      name: userData.name || "",
      gender: userData.gender || undefined,
      birthday: userData.birthday || "",
    });
    onCancel();
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">编辑个人信息</h2>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Nickname */}
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>昵称</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入昵称" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入姓名" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>性别</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-4"
                  >
                    {Object.entries(genderLabels).map(([value, label]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <label htmlFor={value} className="cursor-pointer">
                          {label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birthday */}
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>生日</FormLabel>
                <FormControl>
                  <Input {...field} type="date" placeholder="yyyy-mm-dd" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {state?.error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{state.error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "保存中..." : "保存"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              取消
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
