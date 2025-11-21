import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Footer from "@/components/common/footer";

const meta = {
  title: "Common/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main footer component that appears at the bottom of every page. Includes company information, quick links, legal links, and a QR code for following the platform.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default footer with all sections including company info, quick links, legal links, and QR code.
 */
export const Default: Story = {};
