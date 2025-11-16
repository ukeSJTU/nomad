"use client";

import { Mail, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (Chinese mobile phone)
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate contact information
 */
export function validateContactInfo(
  contactInfo: ContactInfo
): ContactInfoValidationErrors {
  const errors: ContactInfoValidationErrors = {};

  // Validate based on selected method
  if (contactInfo.method === "email") {
    if (!contactInfo.email.trim()) {
      errors.email = "请输入联系邮箱";
    } else if (!isValidEmail(contactInfo.email)) {
      errors.email = "请输入有效的邮箱地址";
    }
  } else if (contactInfo.method === "phone") {
    if (!contactInfo.phone.trim()) {
      errors.phone = "请输入联系电话";
    } else if (!isValidPhone(contactInfo.phone)) {
      errors.phone = "请填写正确的手机号码，以便接收信息";
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">联系人信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Method Selection */}
        <div className="space-y-2">
          <Label>
            联系方式 <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={value.method}
            onValueChange={val => handleMethodChange(val as ContactMethod)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="method-email" />
              <Label
                htmlFor="method-email"
                className="flex items-center gap-2 cursor-pointer font-normal"
              >
                <Mail className="h-4 w-4" />
                邮箱
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="method-phone" />
              <Label
                htmlFor="method-phone"
                className="flex items-center gap-2 cursor-pointer font-normal"
              >
                <Phone className="h-4 w-4" />
                手机
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Email Input (shown when email is selected) */}
        {value.method === "email" && (
          <div className="space-y-2">
            <Label htmlFor="contact-email">
              联系邮箱 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact-email"
              type="email"
              value={value.email}
              onChange={e => handleEmailChange(e.target.value)}
              placeholder="邮箱地址，接收航变信息"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        )}

        {/* Phone Input (shown when phone is selected) */}
        {value.method === "phone" && (
          <div className="space-y-2">
            <Label htmlFor="contact-phone">
              联系电话 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact-phone"
              type="tel"
              value={value.phone}
              onChange={e => handlePhoneChange(e.target.value)}
              placeholder="手机号，接收航变信息"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
