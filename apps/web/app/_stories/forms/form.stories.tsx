import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nomad/ui/components/button";
import { Checkbox } from "@nomad/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/form";
import { Input } from "@nomad/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nomad/ui/components/select";
import { Textarea } from "@nomad/ui/components/textarea";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm } from "react-hook-form";
import { z } from "zod";
import storyLogger from "@/infra/logging/storybook-logger";

// Simple form schema for demonstration
const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少需要 2 个字符",
  }),
  email: z.string().min(1, "请输入邮箱地址").email("请输入有效的邮箱地址"),
  bio: z.string().max(160).optional(),
  role: z.string().min(1, "请选择一个角色"),
  notifications: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

// Form component wrapper for stories
function FormExample({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<FormValues>;
  onSubmit?: (data: FormValues) => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: defaultValues?.username || "",
      email: defaultValues?.email || "",
      bio: defaultValues?.bio || "",
      role: defaultValues?.role || "",
      notifications: defaultValues?.notifications || false,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        className="space-y-6 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="请输入用户名" {...field} />
              </FormControl>
              <FormDescription>这是您的公开显示名称</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input type="email" placeholder="请输入邮箱" {...field} />
              </FormControl>
              <FormDescription>我们不会分享您的邮箱地址</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>个人简介</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="介绍一下您自己"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>最多 160 个字符</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>角色</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择一个角色" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">用户</SelectItem>
                  <SelectItem value="admin">管理员</SelectItem>
                  <SelectItem value="moderator">版主</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>选择您的账户角色</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>接收通知</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">提交</Button>
      </form>
    </Form>
  );
}

const meta = {
  title: "Forms/Form",
  component: FormExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormExample>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default form with all fields
export const Default: Story = {
  args: {},
};

// Form with default values
export const WithDefaultValues: Story = {
  args: {
    defaultValues: {
      username: "johndoe",
      email: "john@example.com",
      bio: "I'm a software developer",
      role: "user",
      notifications: true,
    },
  },
};

// Form with validation errors (submit to trigger)
export const WithValidationErrors: Story = {
  args: {
    defaultValues: {
      username: "a", // Too short
      email: "invalid-email", // Invalid format
      bio: "",
      role: "",
    },
  },
};

// Form with submit handler
export const WithSubmitHandler: Story = {
  args: {
    onSubmit: (data: FormValues) => {
      storyLogger.info("Form submitted:", data);
      alert(`表单已提交！\n用户名: ${data.username}\n邮箱: ${data.email}`);
    },
  },
};
