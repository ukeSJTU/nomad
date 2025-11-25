import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Footer from "@/components/common/footer";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    ...props
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

describe("Footer Component", () => {
  it("should render the company name and logo", () => {
    render(<Footer />);

    expect(screen.getByText("Nomad")).toBeInTheDocument();
    expect(screen.getByText("您的在线旅行服务平台")).toBeInTheDocument();
  });

  it("should display current year in copyright text", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Nomad. 保留所有权利。`)
    ).toBeInTheDocument();
  });

  it("should render quick links section with correct links", () => {
    render(<Footer />);

    expect(screen.getByText("快速链接")).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "首页" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    const passengersLink = screen.getByRole("link", { name: "常旅客管理" });
    expect(passengersLink).toBeInTheDocument();
    expect(passengersLink).toHaveAttribute("href", "/home/passengers");
  });

  it("should render legal links section with correct links", () => {
    render(<Footer />);

    expect(screen.getByText("法律信息")).toBeInTheDocument();

    const termsLink = screen.getByRole("link", { name: "服务协议" });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms");

    const privacyLink = screen.getByRole("link", { name: "个人信息保护政策" });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");

    const disclaimerLink = screen.getByRole("link", { name: "免责声明" });
    expect(disclaimerLink).toBeInTheDocument();
    expect(disclaimerLink).toHaveAttribute("href", "/disclaimer");
  });

  it("should render QR code section with image", () => {
    render(<Footer />);

    expect(screen.getByText("关注我们")).toBeInTheDocument();
    expect(screen.getByText("扫码关注")).toBeInTheDocument();

    const qrCode = screen.getByAltText("Nomad QR Code");
    expect(qrCode).toBeInTheDocument();
    expect(qrCode).toHaveAttribute("src", "/qr-code.png");
    expect(qrCode).toHaveAttribute("width", "120");
    expect(qrCode).toHaveAttribute("height", "120");
  });

  it("should have footer element with appropriate classes", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("border-t");
    expect(footer).toHaveClass("print:hidden");
  });

  it("should render all four main sections", () => {
    render(<Footer />);

    // Company Info section (has the company name)
    expect(screen.getByText("Nomad")).toBeInTheDocument();

    // Quick Links section
    expect(screen.getByText("快速链接")).toBeInTheDocument();

    // Legal Links section
    expect(screen.getByText("法律信息")).toBeInTheDocument();

    // QR Code section
    expect(screen.getByText("关注我们")).toBeInTheDocument();
  });
});
