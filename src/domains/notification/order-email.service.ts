import { getOrderDetailById } from "@/domains/booking/orders.repository";
import { sendOrderConfirmationEmail } from "@/domains/notification/email.service";
import { transformOrderDetailToEmailData } from "@/domains/notification/utils/transformers";
import type { ServiceResult } from "@/domains/types";

export async function resendOrderConfirmation(params: {
  orderId: string;
  userId: string;
  userEmail?: string | null;
  userName?: string | null;
}): Promise<ServiceResult<void>> {
  try {
    const orderDetail = await getOrderDetailById(params.orderId, params.userId);

    if (!orderDetail) {
      return {
        success: false,
        error: "订单不存在或您没有访问权限",
      };
    }

    if (orderDetail.status.status !== "CONFIRMED") {
      return {
        success: false,
        error: "只有已确认的订单才能重新发送确认邮件",
      };
    }

    if (!params.userEmail) {
      return {
        success: false,
        error: "用户邮箱信息缺失，无法发送邮件",
      };
    }

    const emailData = transformOrderDetailToEmailData(orderDetail, {
      name: params.userName ?? undefined,
      email: params.userEmail,
    });

    const result = await sendOrderConfirmationEmail(emailData);

    if (!result.success) {
      return {
        success: false,
        error: result.error || "邮件发送失败，请稍后重试",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("[resendOrderConfirmation] Error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "重新发送订单确认邮件时发生错误，请稍后重试",
    };
  }
}
