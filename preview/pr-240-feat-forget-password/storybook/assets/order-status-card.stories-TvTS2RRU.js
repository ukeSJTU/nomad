import{O as i}from"./order-status-card-CTL4u1M6.js";import{s as o}from"./storybook-logger-DgFpE3wU.js";import"./iframe-BHY9H4ht.js";import"./preload-helper-PPVm8Dsz.js";import"./alert-DW62RoYy.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./button-DoWZ3ZEL.js";import"./index-yS4Ssq8c.js";import"./card-DDWgKdyq.js";import"./clock-VLeddaEv.js";import"./createLucideIcon-B7gungxb.js";import"./circle-check-big-BNPflWRy.js";import"./circle-alert-xDdY3UKC.js";import"./circle-x-Blivuvgx.js";const C={title:"Flights/Orders/OrderStatusCard",component:i,parameters:{layout:"padded"},tags:["autodocs"]},r=s=>({id:"order-123",orderNumber:"NMD20251118001",status:"PENDING_PAYMENT",paymentDeadline:new Date(Date.now()+900*1e3).toISOString(),createdAt:new Date().toISOString(),...s}),e={args:{data:r({status:"PENDING_PAYMENT",orderNumber:"NMD20251118001",paymentDeadline:new Date(Date.now()+850*1e3).toISOString()}),onGoToPayment:()=>{o.info("Navigate to payment page")},onCancelOrder:()=>{o.info("Cancel order")},isLoading:!1}},t={args:{data:r({status:"CONFIRMED",orderNumber:"NMD20251117003",paymentDeadline:new Date(Date.now()-3600*1e3).toISOString(),createdAt:new Date(Date.now()-3600*1e3).toISOString()}),onResendConfirmation:()=>{o.info("Resend confirmation email")},onRequestRefund:()=>{o.info("Request refund")},canRefund:!0,isLoading:!1}},n={args:{data:r({status:"CANCELLED",orderNumber:"NMD20251116004",paymentDeadline:new Date(Date.now()-7200*1e3).toISOString(),createdAt:new Date(Date.now()-7200*1e3).toISOString(),cancellationReason:"支付失败"}),isLoading:!1}},a={args:{data:r({status:"REFUNDED",orderNumber:"NMD20251115006",paymentDeadline:new Date(Date.now()-86400*1e3).toISOString(),createdAt:new Date(Date.now()-86400*1e3).toISOString()}),isLoading:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    data: createMockStatusData({
      status: "PENDING_PAYMENT",
      orderNumber: "NMD20251118001",
      paymentDeadline: new Date(Date.now() + 850 * 1000).toISOString() // 14:10 remaining
    }),
    onGoToPayment: () => {
      storyLogger.info("Navigate to payment page");
    },
    onCancelOrder: () => {
      storyLogger.info("Cancel order");
    },
    isLoading: false
  }
}`,...e.parameters?.docs?.source},description:{story:`Pending Payment Status

Shows an order awaiting payment with:
- Orange theme (warning state)
- Real-time countdown timer
- "Go to Payment" action button
- "Cancel Order" action button
- Alert message with payment deadline`,...e.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    data: createMockStatusData({
      status: "CONFIRMED",
      orderNumber: "NMD20251117003",
      paymentDeadline: new Date(Date.now() - 3600 * 1000).toISOString(),
      // Paid 1 hour ago
      createdAt: new Date(Date.now() - 3600 * 1000).toISOString()
    }),
    onResendConfirmation: () => {
      storyLogger.info("Resend confirmation email");
    },
    onRequestRefund: () => {
      storyLogger.info("Request refund");
    },
    canRefund: true,
    isLoading: false
  }
}`,...t.parameters?.docs?.source},description:{story:`Confirmed Status

Shows a successfully confirmed order with:
- Green theme (success state)
- Success confirmation message
- "Resend Confirmation" action button
- "Request Refund" action button
- Email sent notification`,...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    data: createMockStatusData({
      status: "CANCELLED",
      orderNumber: "NMD20251116004",
      paymentDeadline: new Date(Date.now() - 7200 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
      cancellationReason: "支付失败"
    }),
    isLoading: false
  }
}`,...n.parameters?.docs?.source},description:{story:`Cancelled Status

Shows a cancelled order with:
- Gray theme (neutral/inactive state)
- Cancellation reason display
- No action buttons
- Information about cancellation`,...n.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    data: createMockStatusData({
      status: "REFUNDED",
      orderNumber: "NMD20251115006",
      paymentDeadline: new Date(Date.now() - 86400 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 86400 * 1000).toISOString()
    }),
    isLoading: false
  }
}`,...a.parameters?.docs?.source},description:{story:`Refunded Status

Shows a refunded order with:
- Blue theme (informational state)
- Refund completion message
- No action buttons
- Estimated arrival time for refund`,...a.parameters?.docs?.description}}};const I=["PendingPayment","Confirmed","Cancelled","Refunded"];export{n as Cancelled,t as Confirmed,e as PendingPayment,a as Refunded,I as __namedExportsOrder,C as default};
