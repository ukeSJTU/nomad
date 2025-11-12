"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { updateUserInfoAction } from "@/lib/actions";
import type { UserInfo } from "@/lib/queries/user";
import { type UserInfoUpdateData, userInfoUpdateSchema } from "@/types/user";

interface UserInfoFormProps {
  userData: UserInfo;
}

const genderLabels = {
  male: "男",
  female: "女",
  other: "其他",
};

export function UserInfoForm({ userData }: UserInfoFormProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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
    setIsLoading(true);
    try {
      const result = await updateUserInfoAction(data);

      if (result.success) {
        setShowSuccessDialog(true);
        setIsEditMode(false);
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        // Show error message
        console.error("Update failed:", result.error);
        alert(result.error || "更新用户信息失败");
      }
    } catch (error) {
      console.error("Failed to update user info:", error);
      alert("更新用户信息失败");
    } finally {
      setIsLoading(false);
    }
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
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <label htmlFor="male" className="cursor-pointer">
                          男
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <label htmlFor="female" className="cursor-pointer">
                          女
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <label htmlFor="other" className="cursor-pointer">
                          其他
                        </label>
                      </div>
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "保存中..." : "保存"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
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

          {/* Email */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              邮箱
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-900">{userData.email}</span>
              {userData.emailVerified && (
                <span className="text-xs text-green-600">(已验证)</span>
              )}
              <a href="#" className="text-sm text-blue-600 hover:underline">
                修改
              </a>
            </div>
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              手机号
            </label>
            <div className="flex items-center gap-2">
              {userData.phoneNumber ? (
                <>
                  <span className="text-sm text-gray-900">
                    {userData.phoneNumber}
                  </span>
                  {userData.phoneNumberVerified && (
                    <span className="text-xs text-green-600">(已验证)</span>
                  )}
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    修改
                  </a>
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-500">未填写</span>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    验证
                  </a>
                </>
              )}
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
