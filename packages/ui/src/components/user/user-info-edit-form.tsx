"use client";

import { Button } from "@nomad/ui/components/primitives/button";
import {
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
import type { Control, FieldErrors } from "react-hook-form";

/**
 * User info form data matching the validation schema
 */
export interface UserInfoFormValues {
  nickname?: string;
  name?: string;
  gender?: "male" | "female" | "other";
  birthday?: string;
}

/**
 * Props for the UserInfoEditForm component
 */
export interface UserInfoEditFormProps {
  /** Form control instance from react-hook-form */
  control: Control<any>;
  /** Form errors from react-hook-form */
  errors: FieldErrors<any>;
  /** Callback function called when form is submitted */
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Callback function called when cancel is clicked */
  onCancel?: () => void;
  /** Whether the form is in loading state (disables all inputs and buttons) */
  isLoading?: boolean;
  /** Submit button label */
  submitLabel?: string;
  /** Error message to display at the bottom of form */
  errorMessage?: string;
}

const genderLabels = {
  male: "男",
  female: "女",
  other: "其他",
};

/**
 * User information edit form UI component
 * Includes nickname, name, gender, and birthday fields
 * Pure UI component - requires external form control and submission logic
 */
export function UserInfoEditForm({
  control,
  errors,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "保存",
  errorMessage,
}: UserInfoEditFormProps) {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">编辑个人信息</h2>
      </div>

      <Separator />

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Nickname */}
        <FormField
          control={control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>昵称</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="请输入昵称"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>姓名</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="请输入姓名"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>性别</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                  disabled={isLoading}
                >
                  {Object.entries(genderLabels).map(([value, label]) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={value}
                        id={value}
                        disabled={isLoading}
                      />
                      <label
                        htmlFor={value}
                        className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
                      >
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
          control={control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>生日</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  placeholder="yyyy-mm-dd"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Message */}
        {errorMessage && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{errorMessage}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "保存中..." : submitLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            取消
          </Button>
        </div>
      </form>
    </div>
  );
}
