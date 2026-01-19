"use client";

import { Button } from "@nomad/ui/components/primitives/button";
import { Checkbox } from "@nomad/ui/components/primitives/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/primitives/form";
import { Input } from "@nomad/ui/components/primitives/input";
import { Loader2 } from "lucide-react";
import type { Control, FieldErrors } from "react-hook-form";

// Generic address form data interface matching common address schemas
export interface AddressFormValues {
  recipientName: string;
  phoneNumber: string;
  province: string;
  city: string;
  district: string;
  town?: string;
  detailAddress: string;
  isDefault?: boolean;
}

export interface AddressFormProps {
  /** Form control instance from react-hook-form */
  control: Control<any>;
  /** Form errors from react-hook-form */
  errors: FieldErrors<any>;
  /** Callback function called when form is submitted */
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Callback function called when cancel is clicked */
  onCancel?: () => void;
  /** Whether the form is in loading state (disables submit button) */
  isLoading?: boolean;
  /** Submit button label */
  submitLabel?: string;
}

/**
 * Address form UI component for creating/editing user addresses
 * Includes recipient name, phone, location (province/city/district), and default flag
 */
export function AddressForm({
  control,
  errors,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "保存",
}: AddressFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Recipient Name and Phone Number Row */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收件人</FormLabel>
              <FormControl>
                <Input placeholder="姓名" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>手机号码</FormLabel>
              <FormControl>
                <Input
                  placeholder="11位手机号"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Province, City, District Row */}
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>省/直辖市</FormLabel>
              <FormControl>
                <Input placeholder="省份" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>城市</FormLabel>
              <FormControl>
                <Input placeholder="城市" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>区/县</FormLabel>
              <FormControl>
                <Input placeholder="区县" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Detail Address */}
      <FormField
        control={control}
        name="detailAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>详细地址</FormLabel>
            <FormControl>
              <Input
                placeholder="街道门牌信息"
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Is Default Checkbox */}
      <FormField
        control={control}
        name="isDefault"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isLoading}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>设为默认地址</FormLabel>
              <FormDescription>每次购物时会优先使用该地址</FormDescription>
            </div>
          </FormItem>
        )}
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            取消
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
