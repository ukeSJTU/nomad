import{O as I}from"./order-status-card-CakoWe88.js";import{s as o}from"./storybook-logger-DgFpE3wU.js";import"./iframe-CrLPMyef.js";import"./preload-helper-PPVm8Dsz.js";import"./order-status-card-CwmG_t2m.js";import"./alert-dialog-BDRb33ee.js";import"./index-B2BMd2ZM.js";import"./index-DLC0D_9l.js";import"./index-CCw5U8u4.js";import"./createLucideIcon-DzaTpkcS.js";import"./index-B9BpXIRB.js";import"./index-DBYj_96i.js";import"./index-BmOx0rIh.js";import"./button-C49Jt41H.js";import"./card-D-d6dHIy.js";import"./platform-DKvuCmmd.js";import"./badge-DRbaR9p2.js";import"./separator-BFZTMdF7.js";import"./index-E-CxifyW.js";import"./arrow-right-BDAwJViZ.js";import"./format-Bpyr6-K6.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-Dl9eybxG.js";import"./clock-F2jEp9km.js";import"./circle-check-big-H3xgBYGC.js";import"./circle-alert-Dy3v6eT1.js";import"./circle-x-B6KCtiih.js";var i,d,s,m,c,l,u,p,g,D,f,_,S,v,w,y,N,C,R,O;const ne={title:"Flights/Orders/OrderStatusCard",component:I,parameters:{layout:"padded"},tags:["autodocs"]},r=P=>({id:"order-123",orderNumber:"NMD20251118001",status:"PENDING_PAYMENT",paymentDeadline:new Date(Date.now()+900*1e3).toISOString(),createdAt:new Date().toISOString(),...P}),e={args:{data:r({status:"PENDING_PAYMENT",orderNumber:"NMD20251118001",paymentDeadline:new Date(Date.now()+850*1e3).toISOString()}),onGoToPayment:()=>{o.info("Navigate to payment page")},onCancelOrder:()=>{o.info("Cancel order")},isLoading:!1}},n={args:{data:r({status:"CONFIRMED",orderNumber:"NMD20251117003",paymentDeadline:new Date(Date.now()-3600*1e3).toISOString(),createdAt:new Date(Date.now()-3600*1e3).toISOString()}),onResendConfirmation:()=>{o.info("Resend confirmation email")},onRequestRefund:()=>{o.info("Request refund")},canRefund:!0,isLoading:!1}},t={args:{data:r({status:"CANCELLED",orderNumber:"NMD20251116004",paymentDeadline:new Date(Date.now()-7200*1e3).toISOString(),createdAt:new Date(Date.now()-7200*1e3).toISOString(),cancellationReason:"支付失败"}),isLoading:!1}},a={args:{data:r({status:"REFUNDED",orderNumber:"NMD20251115006",paymentDeadline:new Date(Date.now()-86400*1e3).toISOString(),createdAt:new Date(Date.now()-86400*1e3).toISOString()}),isLoading:!1}};e.parameters={...e.parameters,docs:{...(i=e.parameters)===null||i===void 0?void 0:i.docs,source:{originalSource:`{
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
}`,...(s=e.parameters)===null||s===void 0||(d=s.docs)===null||d===void 0?void 0:d.source},description:{story:`Pending Payment Status

Shows an order awaiting payment with:
- Orange theme (warning state)
- Real-time countdown timer
- "Go to Payment" action button
- "Cancel Order" action button
- Alert message with payment deadline`,...(c=e.parameters)===null||c===void 0||(m=c.docs)===null||m===void 0?void 0:m.description}}};n.parameters={...n.parameters,docs:{...(l=n.parameters)===null||l===void 0?void 0:l.docs,source:{originalSource:`{
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
}`,...(p=n.parameters)===null||p===void 0||(u=p.docs)===null||u===void 0?void 0:u.source},description:{story:`Confirmed Status

Shows a successfully confirmed order with:
- Green theme (success state)
- Success confirmation message
- "Resend Confirmation" action button
- "Request Refund" action button
- Email sent notification`,...(D=n.parameters)===null||D===void 0||(g=D.docs)===null||g===void 0?void 0:g.description}}};t.parameters={...t.parameters,docs:{...(f=t.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
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
}`,...(S=t.parameters)===null||S===void 0||(_=S.docs)===null||_===void 0?void 0:_.source},description:{story:`Cancelled Status

Shows a cancelled order with:
- Gray theme (neutral/inactive state)
- Cancellation reason display
- No action buttons
- Information about cancellation`,...(w=t.parameters)===null||w===void 0||(v=w.docs)===null||v===void 0?void 0:v.description}}};a.parameters={...a.parameters,docs:{...(y=a.parameters)===null||y===void 0?void 0:y.docs,source:{originalSource:`{
  args: {
    data: createMockStatusData({
      status: "REFUNDED",
      orderNumber: "NMD20251115006",
      paymentDeadline: new Date(Date.now() - 86400 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 86400 * 1000).toISOString()
    }),
    isLoading: false
  }
}`,...(C=a.parameters)===null||C===void 0||(N=C.docs)===null||N===void 0?void 0:N.source},description:{story:`Refunded Status

Shows a refunded order with:
- Blue theme (informational state)
- Refund completion message
- No action buttons
- Estimated arrival time for refund`,...(O=a.parameters)===null||O===void 0||(R=O.docs)===null||R===void 0?void 0:R.description}}};const te=["PendingPayment","Confirmed","Cancelled","Refunded"];export{t as Cancelled,n as Confirmed,e as PendingPayment,a as Refunded,te as __namedExportsOrder,ne as default};
