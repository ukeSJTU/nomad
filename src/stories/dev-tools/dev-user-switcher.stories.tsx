import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";

import DevUserSwitcher from "@/components/common/dev-user-switcher";

// Mock the server actions
const mockUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phoneNumber: "+8613800138000",
    image: null,
    nickname: "Alice",
    emailVerified: true,
    phoneNumberVerified: true,
    balance: "100.00",
    gender: null,
    birthday: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phoneNumber: "+8613900139000",
    image: null,
    nickname: null,
    emailVerified: true,
    phoneNumberVerified: false,
    balance: "50.00",
    gender: null,
    birthday: null,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phoneNumber: null,
    image: "https://github.com/shadcn.png",
    nickname: "Charlie",
    emailVerified: false,
    phoneNumberVerified: null,
    balance: "0.00",
    gender: null,
    birthday: null,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
];

// Mock the actions module
vi.mock("@/lib/actions/dev-tools", () => ({
  getAllUsersForDevAction: fn(async () => ({
    success: true,
    users: mockUsers,
  })),
  switchUserAction: fn(async (userId: string) => {
    console.log("Switching to user:", userId);
    return { success: true };
  }),
}));

// Mock the auth client
vi.mock("@/lib/auth/client", () => ({
  authClient: {
    useSession: () => ({
      data: {
        user: {
          id: "1",
          name: "Alice Johnson",
          email: "alice@example.com",
        },
        session: {
          id: "session-1",
          token: "token-1",
        },
      },
    }),
  },
}));

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: fn(),
    refresh: fn(),
  }),
}));

const meta = {
  title: "Dev Tools/DevUserSwitcher",
  component: DevUserSwitcher,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DevUserSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with floating button
 * Click the button in the bottom-right corner to open the user list
 */
export const Default: Story = {
  render: () => (
    <div className="h-screen w-full bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dev User Switcher Demo</h1>
        <p className="text-muted-foreground mb-4">
          Click the floating button in the bottom-right corner to switch users.
        </p>
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-sm">
            This is a development-only tool that allows you to quickly switch
            between test users without logging out and back in.
          </p>
        </div>
      </div>
      <DevUserSwitcher />
    </div>
  ),
};
