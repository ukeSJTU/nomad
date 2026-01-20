import type { Meta, StoryObj } from "@storybook/react";
import {
  LinkButton,
  SocialAccountCard,
  UnlinkButton,
} from "@ukesjtu/nomad-ui/components/auth";
import { fn } from "storybook/test";

const meta = {
  title: "Auth/SocialAccountCard",
  component: SocialAccountCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    provider: {
      control: "select",
      options: ["github", "google"],
    },
    isLinked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof SocialAccountCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * GitHub account - not linked
 */
export const GitHubUnlinked: Story = {
  args: {
    provider: "github",
    providerName: "GitHub",
    isLinked: false,
    linkButton: <LinkButton onClick={fn()} />,
  },
};

/**
 * GitHub account - linked
 */
export const GitHubLinked: Story = {
  args: {
    provider: "github",
    providerName: "GitHub",
    isLinked: true,
    unlinkButton: <UnlinkButton onClick={fn()} />,
  },
};

/**
 * Google account - not linked
 */
export const GoogleUnlinked: Story = {
  args: {
    provider: "google",
    providerName: "Google",
    isLinked: false,
    linkButton: <LinkButton onClick={fn()} />,
  },
};

/**
 * Google account - linked
 */
export const GoogleLinked: Story = {
  args: {
    provider: "google",
    providerName: "Google",
    isLinked: true,
    unlinkButton: <UnlinkButton onClick={fn()} />,
  },
};

/**
 * Multiple cards side by side
 */
export const MultipleCards: Story = {
  render: () => (
    <div className="flex gap-6">
      <SocialAccountCard
        provider="github"
        providerName="GitHub"
        isLinked={true}
        accountId="user@example.com"
        unlinkButton={<UnlinkButton onClick={fn()} />}
      />
      <SocialAccountCard
        provider="google"
        providerName="Google"
        isLinked={false}
        linkButton={<LinkButton onClick={fn()} />}
      />
    </div>
  ),
};

/**
 * Interactive example with state management
 */
export const Interactive: Story = {
  render: () => {
    const [githubLinked, setGithubLinked] = React.useState(false);
    const [googleLinked, setGoogleLinked] = React.useState(true);
    const [loading, setLoading] = React.useState<string | null>(null);

    const handleLink = (provider: string) => {
      setLoading(provider);
      setTimeout(() => {
        if (provider === "github") setGithubLinked(true);
        if (provider === "google") setGoogleLinked(true);
        setLoading(null);
      }, 1500);
    };

    const handleUnlink = (provider: string) => {
      setLoading(provider);
      setTimeout(() => {
        if (provider === "github") setGithubLinked(false);
        if (provider === "google") setGoogleLinked(false);
        setLoading(null);
      }, 1500);
    };

    return (
      <div className="flex gap-6">
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={githubLinked}
          linkButton={
            <LinkButton
              onClick={() => handleLink("github")}
              loading={loading === "github"}
            />
          }
          unlinkButton={
            <UnlinkButton
              onClick={() => handleUnlink("github")}
              loading={loading === "github"}
            />
          }
        />
        <SocialAccountCard
          provider="google"
          providerName="Google"
          isLinked={googleLinked}
          linkButton={
            <LinkButton
              onClick={() => handleLink("google")}
              loading={loading === "google"}
            />
          }
          unlinkButton={
            <UnlinkButton
              onClick={() => handleUnlink("google")}
              loading={loading === "google"}
            />
          }
        />
      </div>
    );
  },
};
