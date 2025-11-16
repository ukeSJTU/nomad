import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SignUpModal from "./sign-up-modal";

describe("SignUpModal", () => {
  it("should render the modal when open is true", () => {
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={true}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    expect(screen.getByText("Nomad用户注册协议和隐私政策")).toBeInTheDocument();
    expect(
      screen.getByText(/亲爱的用户，在您注册为Nomad用户的过程中/)
    ).toBeInTheDocument();
  });

  it("should not render the modal when open is false", () => {
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={false}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    expect(
      screen.queryByText("Nomad用户注册协议和隐私政策")
    ).not.toBeInTheDocument();
  });

  it("should display service agreement section with all terms", () => {
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={true}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    expect(screen.getByText("服务协议")).toBeInTheDocument();
    expect(screen.getByText("总则")).toBeInTheDocument();
    expect(screen.getByText("服务简介")).toBeInTheDocument();
    expect(screen.getByText("法律")).toBeInTheDocument();
  });

  it("should display privacy policy section with all terms", () => {
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={true}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    expect(screen.getByText("隐私政策")).toBeInTheDocument();
    expect(screen.getByText("隐私政策的确认和接纳")).toBeInTheDocument();
    expect(screen.getByText("信息收集")).toBeInTheDocument();
    expect(screen.getByText("如何联系我们")).toBeInTheDocument();
  });

  it("should render links to terms and privacy pages", () => {
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={true}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    const termsLinks = screen.getAllByRole("link", { name: /服务协议/ });
    const privacyLinks = screen.getAllByRole("link", { name: /隐私政策/ });

    expect(termsLinks.length).toBeGreaterThan(0);
    expect(privacyLinks.length).toBeGreaterThan(0);

    termsLinks.forEach(link => {
      expect(link).toHaveAttribute("href", "/terms");
      expect(link).toHaveAttribute("target", "_blank");
    });

    privacyLinks.forEach(link => {
      expect(link).toHaveAttribute("href", "/privacy");
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("should display contact email link", () => {
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={true}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    const emailLink = screen.getByRole("link", {
      name: "privacy@nomad.com",
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:privacy@nomad.com");
  });

  it("should call onAgree when agree button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={true}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    const agreeButton = screen.getByRole("button", { name: "同意并继续" });
    await user.click(agreeButton);

    expect(onAgree).toHaveBeenCalledTimes(1);
    expect(onDisagree).not.toHaveBeenCalled();
  });

  it("should call onDisagree when disagree button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={true}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    const disagreeButton = screen.getByRole("button", { name: "不同意" });
    await user.click(disagreeButton);

    expect(onDisagree).toHaveBeenCalledTimes(1);
    expect(onAgree).not.toHaveBeenCalled();
  });

  it("should display privacy policy description", () => {
    const onOpenChange = vi.fn();
    const onAgree = vi.fn();
    const onDisagree = vi.fn();

    render(
      <SignUpModal
        open={true}
        onOpenChange={onOpenChange}
        onAgree={onAgree}
        onDisagree={onDisagree}
      />
    );

    expect(
      screen.getByText(
        /隐私政策明确了我们产品与\/或服务所收集、使用及共享个人信息的类型和方式及用途/
      )
    ).toBeInTheDocument();
  });
});
