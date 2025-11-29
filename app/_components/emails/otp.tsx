import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OtpEmailTemplateProps {
  otp: string;
}

export const OtpEmailTemplate = ({ otp }: OtpEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>您的验证码：{otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Content Section */}
          <Section style={content}>
            <Heading style={heading}>你好</Heading>

            <Text style={subheading}>您的验证码已准备就绪</Text>

            <Text style={description}>
              请使用此验证码完成您的身份验证。此验证码将在 5 分钟后过期。
            </Text>

            {/* OTP Code Box */}
            <Section style={codeContainer}>
              <Text style={code}>{otp}</Text>
            </Section>

            <Text style={codeLabel}>输入此验证码以继续</Text>

            {/* Divider */}
            <Section style={divider} />

            {/* Help Section */}
            <Section style={helpSection}>
              <Text style={helpText}>没有请求此验证码？</Text>
              <Text style={helpText}>
                请忽略此邮件，或{" "}
                <Link href="mailto:support@nomad.com" style={link}>
                  联系我们的支持团队
                </Link>{" "}
                如果您对账户安全有任何疑虑。
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>© 2025 Nomad. 保留所有权利。</Text>
            <Text style={footerLinks}>
              <Link href="https://nomad.com/disclaimer" style={footerLink}>
                免责声明
              </Link>
              {" • "}
              <Link href="https://nomad.com/privacy" style={footerLink}>
                隐私协议
              </Link>
              {" • "}
              <Link href="https://nomad.com/terms" style={footerLink}>
                服务条款
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

OtpEmailTemplate.PreviewProps = {
  otp: "114514",
} as OtpEmailTemplateProps;

export default OtpEmailTemplate;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, "Microsoft YaHei", "微软雅黑", sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)",
  margin: "0 auto",
  maxWidth: "600px",
  overflow: "hidden",
};

const content = {
  padding: "48px 40px",
};

const heading = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "0 0 8px 0",
  textAlign: "center" as const,
};

const subheading = {
  color: "#4F46E5",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "1.5",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
  letterSpacing: "0.5px",
};

const description = {
  color: "#6b7280",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 32px 0",
  textAlign: "center" as const,
};

const codeContainer = {
  backgroundColor: "#f8fafc",
  border: "2px dashed #e5e7eb",
  borderRadius: "12px",
  margin: "0 auto 12px",
  padding: "24px",
  width: "fit-content",
};

const code = {
  color: "#1a1a1a",
  fontSize: "42px",
  fontWeight: "700",
  letterSpacing: "8px",
  lineHeight: "1",
  margin: "0",
  textAlign: "center" as const,
  fontFamily: "Courier New, monospace",
};

const codeLabel = {
  color: "#9ca3af",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "1.5",
  margin: "0 0 32px 0",
  textAlign: "center" as const,
};

const divider = {
  borderTop: "1px solid #e5e7eb",
  margin: "32px 0",
};

const helpSection = {
  textAlign: "center" as const,
};

const helpText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
  textAlign: "center" as const,
};

const link = {
  color: "#4F46E5",
  textDecoration: "none",
  fontWeight: "600",
};

const footer = {
  backgroundColor: "#f9fafb",
  borderTop: "1px solid #e5e7eb",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 12px 0",
};

const footerLinks = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
};

const footerLink = {
  color: "#6b7280",
  textDecoration: "none",
  fontWeight: "500",
  borderBottom: "1px solid #6b7280",
};
