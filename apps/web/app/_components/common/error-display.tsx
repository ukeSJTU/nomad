"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@nomad/ui/components/alert";
import { Button } from "@nomad/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/card";
import { AlertCircle, AlertTriangle, XCircle } from "lucide-react";
import Link from "next/link";

export type ErrorType = "warning" | "error" | "info";

interface ErrorDisplayProps {
  type?: ErrorType;
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  showBackButton?: boolean;
}

export function ErrorDisplay({
  type = "warning",
  title,
  message,
  actionLabel = "Go Back",
  actionHref = "/",
  showBackButton = false,
}: ErrorDisplayProps) {
  const icons = {
    warning: AlertTriangle,
    error: XCircle,
    info: AlertCircle,
  };

  const Icon = icons[type];
  const isDestructive = type === "error";

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div
              className={`rounded-full p-3 ${
                isDestructive
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <Icon className="size-8" />
            </div>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base pt-2">
            {message}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          <Alert variant={isDestructive ? "destructive" : "default"}>
            <Icon />
            <AlertTitle>
              {type === "error"
                ? "错误详情"
                : type === "warning"
                  ? "重要提示"
                  : "温馨提示"}
            </AlertTitle>
            <AlertDescription>
              {type === "error"
                ? "发生了意外错误。请重试，如问题持续请联系客服。"
                : type === "warning"
                  ? "此操作需要您的注意，请仔细查看后继续。"
                  : "请仔细阅读以上信息。"}
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="flex gap-3 justify-center">
          {showBackButton && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
            >
              返回上一页
            </Button>
          )}
          <Button
            variant={isDestructive ? "destructive" : "default"}
            size="lg"
            asChild
          >
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
