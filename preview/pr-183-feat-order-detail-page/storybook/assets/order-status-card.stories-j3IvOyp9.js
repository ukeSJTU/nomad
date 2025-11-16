import{d}from"./order-status-card-BjY5ZcIG.js";import"./iframe-CvbL331m.js";import"./preload-helper-PPVm8Dsz.js";import"./card-DrX_RmyE.js";import"./utils-CBfrqCZ4.js";import"./phone-BnGY3Sv1.js";import"./createLucideIcon-BH8CnD7y.js";import"./mail-CD4euI3U.js";import"./separator-DZHrP0R9.js";import"./index-BfQugiVD.js";import"./index-DhbfMN3k.js";import"./index-C7jJTgGp.js";import"./plane-IgmqG4yw.js";import"./ancillary-v4vhjuaq.js";import"./schemas-dlpNQSCA.js";import"./currency-BllR5SlS.js";import"./alert-DufCnLl2.js";import"./index-CdJFUDDL.js";import"./button-CAXY9XPu.js";const A={title:"Flights/Orders/OrderStatusCard",component:d,parameters:{layout:"padded"},tags:["autodocs"]},e={id:"order-1",orderNumber:"ORD20250115001",userId:"user-1",outboundFlightSeatClassId:"seat-1",inboundFlightSeatClassId:null,status:"PENDING_PAYMENT",paymentDeadline:new Date(Date.now()+900*1e3),passengerCount:1,contactPhone:"13800138000",contactEmail:"user@example.com",pricePerTicket:"1280.00",baseAmount:"1280.00",ancillaryAmount:"0.00",totalAmount:"1280.00",ancillaryDetails:null,deletedAt:null,createdAt:new Date,updatedAt:new Date,passengers:[],outboundFlight:{},inboundFlight:null},o={args:{order:e,onCancelOrder:()=>console.log("Cancel order clicked"),onGoToPayment:()=>console.log("Go to payment clicked"),isCancelling:!1}},r={args:{order:e,onCancelOrder:()=>console.log("Cancel order clicked"),onGoToPayment:()=>console.log("Go to payment clicked"),isCancelling:!0}},n={args:{order:{...e,paymentDeadline:new Date(Date.now()-1e3)},onCancelOrder:()=>console.log("Cancel order clicked"),onGoToPayment:()=>console.log("Go to payment clicked"),isCancelling:!1}},a={args:{order:{...e,status:"CONFIRMED"}}},t={args:{order:{...e,status:"CANCELLED"}}},s={args:{order:{...e,status:"REFUNDED"}}},c={args:{order:{...e,paymentDeadline:new Date(Date.now()+45*1e3)},onCancelOrder:()=>console.log("Cancel order clicked"),onGoToPayment:()=>console.log("Go to payment clicked"),isCancelling:!1}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    order: mockOrder,
    onCancelOrder: () => console.log("Cancel order clicked"),
    onGoToPayment: () => console.log("Go to payment clicked"),
    isCancelling: false
  }
}`,...o.parameters?.docs?.source},description:{story:"Pending payment status with countdown timer",...o.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    order: mockOrder,
    onCancelOrder: () => console.log("Cancel order clicked"),
    onGoToPayment: () => console.log("Go to payment clicked"),
    isCancelling: true
  }
}`,...r.parameters?.docs?.source},description:{story:"Pending payment with cancelling state",...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      paymentDeadline: new Date(Date.now() - 1000) // 1 second ago
    },
    onCancelOrder: () => console.log("Cancel order clicked"),
    onGoToPayment: () => console.log("Go to payment clicked"),
    isCancelling: false
  }
}`,...n.parameters?.docs?.source},description:{story:"Payment expired (deadline passed)",...n.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      status: "CONFIRMED" as const
    }
  }
}`,...a.parameters?.docs?.source},description:{story:"Confirmed order status",...a.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      status: "CANCELLED" as const
    }
  }
}`,...t.parameters?.docs?.source},description:{story:"Cancelled order status",...t.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      status: "REFUNDED" as const
    }
  }
}`,...s.parameters?.docs?.source},description:{story:"Refunded order status",...s.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      paymentDeadline: new Date(Date.now() + 45 * 1000) // 45 seconds from now
    },
    onCancelOrder: () => console.log("Cancel order clicked"),
    onGoToPayment: () => console.log("Go to payment clicked"),
    isCancelling: false
  }
}`,...c.parameters?.docs?.source},description:{story:"Payment deadline in 1 minute (urgent)",...c.parameters?.docs?.description}}};const F=["PendingPayment","PendingPaymentCancelling","PaymentExpired","Confirmed","Cancelled","Refunded","PaymentUrgent"];export{t as Cancelled,a as Confirmed,n as PaymentExpired,c as PaymentUrgent,o as PendingPayment,r as PendingPaymentCancelling,s as Refunded,F as __namedExportsOrder,A as default};
