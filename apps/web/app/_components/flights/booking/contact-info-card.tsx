"use client";

import { Mail, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { emailSchema, phoneNumberSchema } from "@/types/validations";

export type ContactMethod = "email" | "phone";

export interface ContactInfo {
  method: ContactMethod;
  email: string;
  phone: string;
}

export interface ContactInfoValidationErrors {
  email?: string;
  phone?: string;
}

interface ContactInfoCardProps {
  value: ContactInfo;
  onChange: (value: ContactInfo) => void;
  errors?: ContactInfoValidationErrors;
}

/**
 * Validate contact information using Zod schemas
 */
export function validateContactInfo(
  contactInfo: ContactInfo
): ContactInfoValidationErrors {
  const errors: ContactInfoValidationErrors = {};

  // Validate based on selected method
  if (contactInfo.method === "email") {
    if (!contactInfo.email.trim()) {
      errors.email = "请输入联系邮箱";
    } else {
      const result = emailSchema.safeParse(contactInfo.email);
      if (!result.success) {
        errors.email = result.error.issues[0]?.message || "邮箱格式不正确";
      }
    }
  } else if (contactInfo.method === "phone") {
    if (!contactInfo.phone.trim()) {
      errors.phone = "请输入联系电话";
    } else {
      const result = phoneNumberSchema.safeParse(contactInfo.phone);
      if (!result.success) {
        errors.phone = result.error.issues[0]?.message || "手机号格式不正确";
      }
    }
  }

  return errors;
}

/**
 * Contact Information Card Component
 * Allows user to select contact method (email or phone) and input contact details
 */
export function ContactInfoCard({
  value,
  onChange,
  errors = {},
}: ContactInfoCardProps) {
  const handleMethodChange = (method: ContactMethod) => {
    onChange({ ...value, method });
  };

  const handleEmailChange = (email: string) => {
    onChange({ ...value, email });
  };

  const handlePhoneChange = (phone: string) => {
    onChange({ ...value, phone });
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">
          <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
            联系人信息
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Method Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            联系方式 <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={value.method}
            onValueChange={val => handleMethodChange(val as ContactMethod)}
            className="grid grid-cols-2 gap-3"
          >
            <div className="flex items-center space-x-3 p-3.5 rounded-lg border border-input/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer group">
              <RadioGroupItem
                value="email"
                id="method-email"
                className="transition-all"
              />
              <Label
                htmlFor="method-email"
                className="flex items-center gap-2.5 cursor-pointer font-medium text-sm group-hover:text-primary transition-colors flex-1"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span>邮箱</span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3.5 rounded-lg border border-input/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer group">
              <RadioGroupItem
                value="phone"
                id="method-phone"
                className="transition-all"
              />
              <Label
                htmlFor="method-phone"
                className="flex items-center gap-2.5 cursor-pointer font-medium text-sm group-hover:text-primary transition-colors flex-1"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span>手机</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Email Input (shown when email is selected) */}
        {value.method === "email" && (
          <div className="space-y-2.5">
            <Label htmlFor="contact-email" className="text-sm font-medium">
              联系邮箱 <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="contact-email"
                type="email"
                value={value.email}
                onChange={e => handleEmailChange(e.target.value)}
                placeholder="邮箱地址，接收订单信息"
                className={`h-11 border rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all ${
                  errors.email ? "border-destructive/60" : "border-input/60"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                {errors.email}
              </p>
            )}
          </div>
        )}

        {/* Phone Input (shown when phone is selected) */}
        {value.method === "phone" && (
          <div className="space-y-2.5">
            <Label htmlFor="contact-phone" className="text-sm font-medium">
              联系电话 <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="contact-phone"
                type="tel"
                value={value.phone}
                onChange={e => handlePhoneChange(e.target.value)}
                placeholder="手机号，接收订单信息"
                className={`h-11 border rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all ${
                  errors.phone ? "border-destructive/60" : "border-input/60"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-destructive flex items-center gap-1.5">
                <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                {errors.phone}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
