import { UserMenu } from "@nomad/ui/components/common/user-menu";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/UserMenu",
  component: UserMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    session: { control: "object" },
    isPending: { control: "boolean" },
    onSignOut: { action: "signed out" },
  },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session: {
      id: "user-123",
      name: "张三",
      email: "zhangsan@example.com",
      image: "https://github.com/shadcn.png",
    },
    isPending: false,
    onSignOut: () => {},
    signInHref: "/auth/sign-in",
    signUpHref: "/auth/sign-up",
    userInfoHref: "/home/info",
    walletsHref: "/home/wallets",
    passengersHref: "/home/passengers",
  },
};

export const LoggedInWithLongName: Story = {
  args: {
    session: {
      id: "user-456",
      name: "欧阳修",
      email: "ouyangxiu@example.com",
      image: "https://github.com/shadcn.png",
    },
    isPending: false,
    onSignOut: () => {},
    signInHref: "/auth/sign-in",
    signUpHref: "/auth/sign-up",
    userInfoHref: "/home/info",
    walletsHref: "/home/wallets",
    passengersHref: "/home/passengers",
  },
};

export const LoggedInWithoutImage: Story = {
  args: {
    session: {
      id: "user-789",
      name: "李四",
      email: "lisi@example.com",
      image: null,
    },
    isPending: false,
    onSignOut: () => {},
    signInHref: "/auth/sign-in",
    signUpHref: "/auth/sign-up",
    userInfoHref: "/home/info",
    walletsHref: "/home/wallets",
    passengersHref: "/home/passengers",
  },
};

export const Anonymous: Story = {
  args: {
    session: {
      id: "user-anonymous",
      email: "anonymous@example.com",
    },
    isPending: false,
    onSignOut: () => {},
    signInHref: "/auth/sign-in",
    signUpHref: "/auth/sign-up",
    userInfoHref: "/home/info",
    walletsHref: "/home/wallets",
    passengersHref: "/home/passengers",
  },
};

export const NotLoggedIn: Story = {
  args: {
    session: null,
    isPending: false,
    onSignOut: () => {},
    signInHref: "/auth/sign-in",
    signUpHref: "/auth/sign-up",
    userInfoHref: "/home/info",
    walletsHref: "/home/wallets",
    passengersHref: "/home/passengers",
  },
};

export const Loading: Story = {
  args: {
    session: null,
    isPending: true,
    onSignOut: () => {},
    signInHref: "/auth/sign-in",
    signUpHref: "/auth/sign-up",
    userInfoHref: "/home/info",
    walletsHref: "/home/wallets",
    passengersHref: "/home/passengers",
  },
};

export const EnglishUser: Story = {
  args: {
    session: {
      id: "user-en",
      name: "John Doe",
      email: "john@example.com",
      image: "https://github.com/shadcn.png",
    },
    isPending: false,
    onSignOut: () => {},
    signInHref: "/auth/sign-in",
    signUpHref: "/auth/sign-up",
    userInfoHref: "/home/info",
    walletsHref: "/home/wallets",
    passengersHref: "/home/passengers",
  },
};

export const CustomHrefs: Story = {
  args: {
    session: {
      id: "user-custom",
      name: "王五",
      email: "wangwu@example.com",
      image: "https://github.com/shadcn.png",
    },
    isPending: false,
    onSignOut: () => {},
    signInHref: "/custom/login",
    signUpHref: "/custom/register",
    userInfoHref: "/custom/profile",
    walletsHref: "/custom/wallet",
    passengersHref: "/custom/passengers",
  },
};
