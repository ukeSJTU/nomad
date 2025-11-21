"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  updateUserInfoAction,
  type UpdateUserInfoActionState,
} from "@/lib/actions";
import type { UserInfo } from "@/types/dto";
import {
  type UserInfoUpdateData,
  userInfoUpdateSchema,
} from "@/types/validations";

interface UserInfoFormProps {
  userData: UserInfo;
}

const genderLabels = {
  male: "男",
  female: "女",
  other: "其他",
};

export function UserInfoForm({ userData }: UserInfoFormProps) {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Use useActionState for better form handling
  const [state, formAction, isPending] = useActionState<
    UpdateUserInfoActionState | null,
    FormData
  >(updateUserInfoAction, null);

  const form = useForm<UserInfoUpdateData>({
    resolver: zodResolver(userInfoUpdateSchema),
    defaultValues: {
      nickname: userData.nickname || "",
      name: userData.name || "",
      gender: userData.gender || undefined,
      birthday: userData.birthday || "",
    },
  });

  // Handle successful submission
  useEffect(() => {
    if (state?.success) {
      setShowSuccessDialog(true);
      setIsEditMode(false);
      // Refresh the page data without full reload
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = (data: UserInfoUpdateData) => {
    // Convert data to FormData for useActionState
    const formData = new FormData();
    if (data.nickname !== undefined) formData.append("nickname", data.nickname);
    if (data.name !== undefined) formData.append("name", data.name);
    if (data.gender !== undefined) formData.append("gender", data.gender);
    if (data.birthday !== undefined) formData.append("birthday", data.birthday);

    // Submit via formAction
    formAction(formData);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form to original values
    form.reset({
      nickname: userData.nickname || "",
      name: userData.name || "",
      gender: userData.gender || undefined,
      birthday: userData.birthday || "",
    });
  };

  if (isEditMode) {
    return (
      <div className="space-y-6 bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">编辑个人信息</h2>
        </div>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
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
                        <div
                          key={value}
                          className="flex items-center space-x-2"
                        >
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

  // View Mode
  return (
    <>
      <div className="space-y-6 bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">个人信息</h2>
          <Button onClick={() => setIsEditMode(true)}>编辑</Button>
        </div>

        <Separator />

        <div className="space-y-4">
          {/* Nickname */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              昵称
            </label>
            <div className="text-sm text-gray-900">
              {userData.nickname || "未设置"}
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              姓名
            </label>
            <div className="text-sm text-gray-900">{userData.name}</div>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              性别
            </label>
            <div className="text-sm text-gray-900">
              {userData.gender ? genderLabels[userData.gender] : "未设置"}
            </div>
          </div>

          {/* Birthday */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              生日
            </label>
            <div className="text-sm text-gray-900">
              {userData.birthday || "未设置"}
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>保存成功</DialogTitle>
            <DialogDescription>您的个人信息已成功更新。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
