/**
 * DevUserSwitcher - Development-only user switching tool
 *
 * SECURITY NOTICE:
 * This component is designed for local development with mock data only.
 * While there's a theoretical risk of someone replacing the local database
 * with production data to gain unauthorized access, this is an acceptable
 * risk for a course project where:
 * 1. All developers work on local databases with mock data
 * 2. Production databases should have proper access controls
 * 3. The component is disabled in production builds (NODE_ENV check)
 *
 * DO NOT use this in production environments.
 */

"use client";

import { Loader2, Users } from "lucide-react";
import { useEffect, useState } from "react";

import {
  type DevUserListResult,
  getAllUsersForDevAction,
  switchUserAction,
} from "@/actions/dev-tools";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/domains/auth/client";
import { getInitials } from "@/lib/string";

type User = Extract<DevUserListResult, { success: true }>["users"][number];

export default function DevUserSwitcher() {
  // Call all hooks unconditionally first (React Hooks Rules)
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const currentUserId = session?.user?.id;

  useEffect(() => {
    if (open && users.length === 0) {
      setIsLoading(true);
      getAllUsersForDevAction()
        .then(result => {
          if (result.success) {
            setUsers(result.users);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [open, users.length]);

  const handleSwitchUser = async (userId: string) => {
    setIsSwitching(true);

    try {
      // Use Server Action to switch user
      const result = await switchUserAction(userId);

      if (!result.success) {
        console.error("Failed to switch user:", result.error);
        setIsSwitching(false);
        return;
      }

      // Refresh the page to update session
      // Using window.location.reload() is sufficient for dev tools
      // as it ensures complete session state update
      window.location.reload();
    } catch (error) {
      console.error("Failed to switch user:", error);
      setIsSwitching(false);
    }
  };

  // Environment check after all hooks
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform"
          variant="default"
          title="Dev: Switch User"
        >
          <Users className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Switch User</SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        <ScrollArea className="h-[calc(100vh-120px)] pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {users.map(user => {
                const isCurrentUser = user.id === currentUserId;

                return (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      isCurrentUser ? "bg-accent border-primary" : "bg-card"
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.name}
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">
                          {user.name}
                        </p>
                        {user.nickname && (
                          <span className="text-xs text-muted-foreground">
                            ({user.nickname})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      {user.phoneNumber && (
                        <p className="text-xs text-muted-foreground">
                          {user.phoneNumber}
                        </p>
                      )}
                    </div>

                    {isCurrentUser ? (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        disabled={isSwitching}
                        onClick={() => handleSwitchUser(user.id)}
                      >
                        {isSwitching ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Login"
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
