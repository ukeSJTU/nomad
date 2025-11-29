import{O as s}from"./order-status-card-DUiKJvjK.js";import"./iframe-BRgbNqLm.js";import"./preload-helper-PPVm8Dsz.js";import"./alert-DzX7jO94.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./button-XEp2VeJS.js";import"./index-D63BWAbV.js";import"./card-XrV2xzAV.js";import"./clock-BaQ82iTG.js";import"./createLucideIcon-CeCL99oA.js";import"./circle-check-big-MqwhjX3r.js";import"./circle-alert-CHCs6aZu.js";import"./circle-x-CyB27sJu.js";const O={title:"Flights/Orders/OrderStatusCard",component:s,parameters:{layout:"padded"},tags:["autodocs"]},o=r=>({id:"order-123",orderNumber:"NMD20251118001",status:"PENDING_PAYMENT",paymentDeadline:new Date(Date.now()+900*1e3).toISOString(),createdAt:new Date().toISOString(),...r}),e={args:{data:o({status:"PENDING_PAYMENT",orderNumber:"NMD20251118001",paymentDeadline:new Date(Date.now()+850*1e3).toISOString()}),onGoToPayment:()=>{console.log("Navigate to payment page")},onCancelOrder:()=>{console.log("Cancel order")},isLoading:!1}},n={args:{data:o({status:"CONFIRMED",orderNumber:"NMD20251117003",paymentDeadline:new Date(Date.now()-3600*1e3).toISOString(),createdAt:new Date(Date.now()-3600*1e3).toISOString()}),onResendConfirmation:()=>{console.log("Resend confirmation email")},onRequestRefund:()=>{console.log("Request refund")},canRefund:!0,isLoading:!1}},t={args:{data:o({status:"CANCELLED",orderNumber:"NMD20251116004",paymentDeadline:new Date(Date.now()-7200*1e3).toISOString(),createdAt:new Date(Date.now()-7200*1e3).toISOString(),cancellationReason:"支付失败"}),isLoading:!1}},a={args:{data:o({status:"REFUNDED",orderNumber:"NMD20251115006",paymentDeadline:new Date(Date.now()-86400*1e3).toISOString(),createdAt:new Date(Date.now()-86400*1e3).toISOString()}),isLoading:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    data: createMockStatusData({
      status: "PENDING_PAYMENT",
      orderNumber: "NMD20251118001",
      paymentDeadline: new Date(Date.now() + 850 * 1000).toISOString() // 14:10 remaining
    }),
    onGoToPayment: () => {
      console.log("Navigate to payment page");
    },
    onCancelOrder: () => {
      console.log("Cancel order");
    },
    isLoading: false
  }
}`,...e.parameters?.docs?.source},description:{story:`Pending Payment Status

Shows an order awaiting payment with:
- Orange theme (warning state)
- Real-time countdown timer
- "Go to Payment" action button
- "Cancel Order" action button
- Alert message with payment deadline`,...e.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    data: createMockStatusData({
      status: "CONFIRMED",
      orderNumber: "NMD20251117003",
      paymentDeadline: new Date(Date.now() - 3600 * 1000).toISOString(),
      // Paid 1 hour ago
      createdAt: new Date(Date.now() - 3600 * 1000).toISOString()
    }),
    onResendConfirmation: () => {
      console.log("Resend confirmation email");
    },
    onRequestRefund: () => {
      console.log("Request refund");
    },
    canRefund: true,
    isLoading: false
  }
}`,...n.parameters?.docs?.source},description:{story:`Confirmed Status

Shows a successfully confirmed order with:
- Green theme (success state)
- Success confirmation message
- "Resend Confirmation" action button
- "Request Refund" action button
- Email sent notification`,...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source},description:{story:`Cancelled Status

Shows a cancelled order with:
- Gray theme (neutral/inactive state)
- Cancellation reason display
- No action buttons
- Information about cancellation`,...t.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
- Estimated arrival time for refund`,...a.parameters?.docs?.description}}};const R=["PendingPayment","Confirmed","Cancelled","Refunded"];export{t as Cancelled,n as Confirmed,e as PendingPayment,a as Refunded,R as __namedExportsOrder,O as default};
