"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { countryCodes } from "@/types/auth";

// Passenger form schema
const passengerFormSchema = z
  .object({
    chineseName: z.string().optional(),
    englishLastName: z.string().optional(),
    englishFirstName: z.string().optional(),
    setAsMyself: z.boolean(),
    nationality: z.string().min(1, "请选择国籍"),
    gender: z.enum(["male", "female", "other"], {
      message: "请选择性别",
    }),
    dateOfBirth: z.date({ message: "请选择出生日期" }),
    placeOfBirth: z.string().optional(),
    phoneCountryCode: z.string(),
    phone: z.string().optional(),
    faxAreaCode: z.string().optional(),
    faxPhone: z.string().optional(),
    faxExtension: z.string().optional(),
    email: z
      .union([
        z.string().email({ message: "请输入有效的邮箱地址" }),
        z.literal(""),
      ])
      .optional(),
    documentType: z.enum(["id_card", "passport", "other"], {
      message: "请选择证件类型",
    }),
    documentNumber: z.string().min(1, "请输入证件号码"),
    documentExpiryDate: z.date({ message: "请选择证件有效期" }).optional(),
  })
  .refine(
    data => data.chineseName || (data.englishFirstName && data.englishLastName),
    {
      message: "中文名与英文名两者必填一项",
      path: ["chineseName"],
    }
  );

type PassengerFormData = z.infer<typeof passengerFormSchema>;

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
  const [countryCodeOpen, setCountryCodeOpen] = useState(false);
  const [dobOpen, setDobOpen] = useState(false);
  const [expiryOpen, setExpiryOpen] = useState(false);
  const [dobCaptionLayout] =
    useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
      "dropdown"
    );

  const form = useForm<PassengerFormData>({
    resolver: zodResolver(passengerFormSchema),
    defaultValues: {
      chineseName: initialData?.chineseName || "",
      englishLastName: initialData?.englishLastName || "",
      englishFirstName: initialData?.englishFirstName || "",
      setAsMyself: initialData?.setAsMyself ?? false,
      nationality: initialData?.nationality || "中国大陆",
      gender: initialData?.gender || "other",
      dateOfBirth: initialData?.dateOfBirth || undefined,
      placeOfBirth: initialData?.placeOfBirth || "",
      phoneCountryCode: initialData?.phoneCountryCode || "+86",
      phone: initialData?.phone || "",
      faxAreaCode: initialData?.faxAreaCode || "",
      faxPhone: initialData?.faxPhone || "",
      faxExtension: initialData?.faxExtension || "",
      email: initialData?.email || "",
      documentType: initialData?.documentType || "id_card",
      documentNumber: initialData?.documentNumber || "",
      documentExpiryDate: initialData?.documentExpiryDate || undefined,
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
          <h3 className="text-lg font-semibold border-l-4 border-blue-600 pl-3">
            旅客信息
          </h3>

          <Separator />

          {/* Chinese Name / English Name */}
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium">
              <span className="text-red-500">*</span> 中文名与英文名必填一项
            </FormLabel>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="chineseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>中文名</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="请输入中文名" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="englishLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>英文名</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="LastName(姓)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="englishFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="invisible">First</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input {...field} placeholder="FirstName(名)" />
                        </FormControl>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-blue-500 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>请按照护照或证件上的拼写填写</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Set as Myself Checkbox */}
          <FormField
            control={form.control}
            name="setAsMyself"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  设置为本人
                </FormLabel>
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
                  国籍 <span className="text-gray-500">(国家/地区)</span>
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
                          ? field.value.toISOString().split("T")[0]
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>手机号码</FormLabel>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="phoneCountryCode"
                      render={({ field: countryField }) => (
                        <Popover
                          open={countryCodeOpen}
                          onOpenChange={setCountryCodeOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-32 justify-between"
                            >
                              {countryField.value
                                ? countryCodes.find(
                                    c => c.value === countryField.value
                                  )?.value
                                : "国家码"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="搜索国家/地区..." />
                              <CommandList>
                                <CommandEmpty>未找到国家/地区</CommandEmpty>
                                <CommandGroup>
                                  {countryCodes.map(country => (
                                    <CommandItem
                                      key={country.value}
                                      value={country.searchTerms.join(" ")}
                                      onSelect={() => {
                                        countryField.onChange(country.value);
                                        setCountryCodeOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          countryField.value === country.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {country.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    <FormControl>
                      <Input {...field} placeholder="请输入手机号码" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end">
              <span className="text-sm text-gray-500">或 非大陆手机</span>
            </div>
          </div>

          {/* Fax Number */}
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="faxAreaCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>传真号码</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="区号" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faxPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="invisible">Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="电话" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faxExtension"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="invisible">Extension</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="分机" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
          <h3 className="text-lg font-semibold border-l-4 border-blue-600 pl-3">
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
                    <span className="text-red-500">*</span> 证件类型
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
                    <span className="text-red-500">*</span> 证件号码
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
                            ? field.value.toISOString().split("T")[0]
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
                          setExpiryOpen(false);
                          setDobOpen(false);
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

          <div className="text-sm text-blue-600 cursor-pointer hover:underline">
            设为长期有效
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
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
