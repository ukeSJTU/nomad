"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nomad/ui/components/button";
import { Calendar } from "@nomad/ui/components/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/form";
import { Input } from "@nomad/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nomad/ui/components/popover";
import { RadioGroup, RadioGroupItem } from "@nomad/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nomad/ui/components/select";
import { Separator } from "@nomad/ui/components/separator";
import { cn } from "@nomad/ui/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { dateToLocalDateString } from "@/lib/format";
import {
  type PassengerFormData,
  passengerFormSchema,
} from "@/types/validations";

interface PassengerFormProps {
  onSubmit: (data: PassengerFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<PassengerFormData>;
}

export default function PassengerForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
}: PassengerFormProps) {
  const [dobOpen, setDobOpen] = useState(false);
  const [expiryOpen, setExpiryOpen] = useState(false);
  const [dobCaptionLayout] =
    useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
      "dropdown"
    );

  const form = useForm<PassengerFormData>({
    resolver: zodResolver(passengerFormSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      nationality: initialData?.nationality ?? "",
      gender: initialData?.gender,
      dateOfBirth: initialData?.dateOfBirth,
      placeOfBirth: initialData?.placeOfBirth ?? "",
      phone: initialData?.phone ?? "",
      email: initialData?.email ?? "",
      documentType: initialData?.documentType ?? "id_card",
      documentNumber: initialData?.documentNumber ?? "",
      documentExpiryDate: initialData?.documentExpiryDate,
    },
  });

  const handleSubmit = (data: PassengerFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Passenger Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-l-4 border-primary pl-3">
            旅客信息
          </h3>

          <Separator />

          {/* Passenger Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-destructive">*</span> 姓名
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入姓名（中文或英文）" />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  可输入中文姓名或英文姓名
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  国籍{" "}
                  <span className="text-muted-foreground">(国家/地区)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="中文/英文" />
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
                    className="flex gap-6"
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
                        未知
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>生日</FormLabel>
                <Popover open={dobOpen} onOpenChange={setDobOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? dateToLocalDateString(field.value)
                          : "yyyy-MM-dd"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      defaultMonth={field.value}
                      selected={field.value}
                      onSelect={date => {
                        field.onChange(date);
                        setDobOpen(false);
                      }}
                      disabled={date => date > new Date()}
                      captionLayout={dobCaptionLayout}
                      className="rounded-lg border shadow-sm"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Place of Birth */}
          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>出生地</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入出生地" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号码</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" placeholder="请输入手机号" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="请输入邮箱地址" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Document Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-l-4 border-primary pl-3">
            证件信息
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Document Type */}
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-destructive">*</span> 证件类型
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择证件类型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="id_card">身份证</SelectItem>
                      <SelectItem value="passport">护照</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Document Number */}
            <FormField
              control={form.control}
              name="documentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-destructive">*</span> 证件号码
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入证件号码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Document Expiry Date */}
            <FormField
              control={form.control}
              name="documentExpiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>有效期</FormLabel>
                  <Popover open={expiryOpen} onOpenChange={setExpiryOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? dateToLocalDateString(field.value)
                            : "长期有效"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        defaultMonth={field.value}
                        selected={field.value}
                        onSelect={date => {
                          field.onChange(date);
                          setExpiryOpen(false);
                        }}
                        disabled={date => date < new Date()}
                        captionLayout={dobCaptionLayout}
                        className="rounded-lg border shadow-sm"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            type="submit"
            className="bg-secondary hover:bg-secondary/90 text-white px-8"
            disabled={isLoading}
          >
            {isLoading ? "保存中..." : "保存"}
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
    </Form>
  );
}
