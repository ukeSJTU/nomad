"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  createAddressAction,
  updateAddressAction,
} from "@/app/_actions/addresses";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  type CreateAddressData,
  createAddressSchema,
} from "@/types/validations/addresses";

interface AddressFormProps {
  initialData?: CreateAddressData & { id?: string };
  onSuccess?: () => void;
  submitLabel?: string;
}

export function AddressForm({
  initialData,
  onSuccess,
  submitLabel = "保存",
}: AddressFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateAddressData>({
    resolver: zodResolver(createAddressSchema) as Resolver<CreateAddressData>,
    defaultValues: {
      recipientName: initialData?.recipientName || "",
      phoneNumber: initialData?.phoneNumber || "",
      province: initialData?.province || "",
      city: initialData?.city || "",
      district: initialData?.district || "",
      town: initialData?.town || "",
      detailAddress: initialData?.detailAddress || "",
      isDefault: initialData?.isDefault || false,
    },
  });

  const onSubmit = async (data: CreateAddressData) => {
    setIsSubmitting(true);
    try {
      let result;
      if (initialData?.id) {
        result = await updateAddressAction(initialData.id, data);
      } else {
        result = await createAddressAction(data);
      }

      if (result.success) {
        toast.success(initialData?.id ? "地址更新成功" : "地址添加成功");
        form.reset();
        onSuccess?.();
      } else {
        toast.error(result.error || "操作失败");
      }
    } catch (error) {
      console.error("Address form submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "发生未知错误，请稍后重试"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>收件人</FormLabel>
                <FormControl>
                  <Input placeholder="姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号码</FormLabel>
                <FormControl>
                  <Input placeholder="11位手机号" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>省/直辖市</FormLabel>
                <FormControl>
                  <Input placeholder="省份" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>城市</FormLabel>
                <FormControl>
                  <Input placeholder="城市" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>区/县</FormLabel>
                <FormControl>
                  <Input placeholder="区县" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="detailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>详细地址</FormLabel>
              <FormControl>
                <Input placeholder="街道门牌信息" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>设为默认地址</FormLabel>
                <FormDescription>每次购物时会优先使用该地址</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
