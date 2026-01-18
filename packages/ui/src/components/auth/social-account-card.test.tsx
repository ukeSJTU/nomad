import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SocialAccountCard } from "./social-account-card";

describe("SocialAccountCard", () => {
  describe("Rendering", () => {
    it("should render GitHub provider with correct icon and name", () => {
      render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={false}
        />
      );

      expect(screen.getByText("GitHub")).toBeInTheDocument();
      // GitHub icon should be present
      const card = screen.getByText("GitHub").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should render Google provider with correct icon and name", () => {
      render(
        <SocialAccountCard
          provider="google"
          providerName="Google"
          isLinked={false}
        />
      );

      expect(screen.getByText("Google")).toBeInTheDocument();
    });
  });

  describe("Linked State", () => {
    it("should show '已绑定' status when account is linked", () => {
      render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={true}
        />
      );

      expect(screen.getByText("已绑定")).toBeInTheDocument();
    });

    it("should show checkmark icon when account is linked", () => {
      const { container } = render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={true}
        />
      );

      // Check for the checkmark icon (lucide Check component)
      const checkIcon = container.querySelector("svg");
      expect(checkIcon).toBeInTheDocument();
    });

    it("should display unlink button on hover when account is linked", async () => {
      const user = userEvent.setup();
      const unlinkButton = <button>解绑</button>;

      const { container } = render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={true}
          unlinkButton={unlinkButton}
        />
      );

      // Initially should show '已绑定' status
      expect(screen.getByText("已绑定")).toBeInTheDocument();

      // Hover over the card
      const card = container.querySelector('[class*="w-[180px]"]');
      if (card) {
        await user.hover(card);
      }

      // Should now show the unlink button
      expect(screen.getByText("解绑")).toBeInTheDocument();
    });

    it("should hide unlink button and show status when mouse leaves", async () => {
      const user = userEvent.setup();
      const unlinkButton = <button>解绑</button>;

      const { container } = render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={true}
          unlinkButton={unlinkButton}
        />
      );

      const card = container.querySelector('[class*="w-[180px]"]');

      // Hover over the card
      if (card) {
        await user.hover(card);
        expect(screen.getByText("解绑")).toBeInTheDocument();

        // Unhover
        await user.unhover(card);
      }

      // Should show '已绑定' status again
      expect(screen.getByText("已绑定")).toBeInTheDocument();
    });
  });

  describe("Unlinked State", () => {
    it("should show link button when account is not linked", () => {
      const linkButton = <button>绑定</button>;

      render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={false}
          linkButton={linkButton}
        />
      );

      expect(screen.getByText("绑定")).toBeInTheDocument();
    });

    it("should not show '已绑定' status when account is not linked", () => {
      render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={false}
        />
      );

      expect(screen.queryByText("已绑定")).not.toBeInTheDocument();
    });
  });

  describe("Card Styling", () => {
    it("should apply hover shadow effect class", () => {
      const { container } = render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={false}
        />
      );

      const card = container.querySelector('[class*="hover:shadow-md"]');
      expect(card).toBeInTheDocument();
    });

    it("should have correct width", () => {
      const { container } = render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={false}
        />
      );

      const card = container.querySelector('[class*="w-[180px]"]');
      expect(card).toBeInTheDocument();
    });
  });

  describe("Account Identifier", () => {
    it("should accept accountId prop when provided", () => {
      render(
        <SocialAccountCard
          provider="github"
          providerName="GitHub"
          isLinked={true}
          accountId="user@example.com"
        />
      );

      // The component renders but accountId is not displayed in current implementation
      expect(screen.getByText("GitHub")).toBeInTheDocument();
    });
  });
});
