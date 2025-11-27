import { render } from "@react-email/components";
import { describe, expect, it } from "vitest";

import { OtpEmailTemplate } from "./otp";

describe("OtpEmailTemplate", () => {
  it("should render the OTP code correctly", async () => {
    const html = await render(<OtpEmailTemplate otp="123456" />);

    expect(html).toContain("您的验证码：123456");
    expect(html).toContain("123456");
    expect(html).toContain("此验证码将在 5 分钟后过期");
  });
});
