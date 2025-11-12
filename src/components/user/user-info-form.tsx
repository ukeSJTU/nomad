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
  male: "Male",
  female: "Female",
  other: "Other",
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
        alert(result.error || "Failed to update user information");
      }
    } catch (error) {
      console.error("Failed to update user info:", error);
      alert("Failed to update user information");
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
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Personal Information
          </h2>
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
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your nickname" />
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
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
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <label htmlFor="male" className="cursor-pointer">
                          Male
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <label htmlFor="female" className="cursor-pointer">
                          Female
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <label htmlFor="other" className="cursor-pointer">
                          Other
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
                  <FormLabel>Birthday</FormLabel>
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
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
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
          <h2 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h2>
          <Button onClick={() => setIsEditMode(true)}>Edit</Button>
        </div>

        <Separator />

        <div className="space-y-4">
          {/* Nickname */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              Nickname
            </label>
            <div className="text-sm text-gray-900">
              {userData.nickname || "Not set"}
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              Name
            </label>
            <div className="text-sm text-gray-900">{userData.name}</div>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              Gender
            </label>
            <div className="text-sm text-gray-900">
              {userData.gender ? genderLabels[userData.gender] : "Not set"}
            </div>
          </div>

          {/* Birthday */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              Birthday
            </label>
            <div className="text-sm text-gray-900">
              {userData.birthday || "Not set"}
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-900">{userData.email}</span>
              {userData.emailVerified && (
                <span className="text-xs text-green-600">(Verified)</span>
              )}
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Modify
              </a>
            </div>
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-4">
            <label className="pt-1 text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              {userData.phoneNumber ? (
                <>
                  <span className="text-sm text-gray-900">
                    {userData.phoneNumber}
                  </span>
                  {userData.phoneNumberVerified && (
                    <span className="text-xs text-green-600">(Verified)</span>
                  )}
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Modify
                  </a>
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-500">Not set</span>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Verify
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
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Your personal information has been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
