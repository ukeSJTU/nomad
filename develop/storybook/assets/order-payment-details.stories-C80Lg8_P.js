import{c as m}from"./order-status-card-BjY5ZcIG.js";import"./iframe-CvbL331m.js";import"./preload-helper-PPVm8Dsz.js";import"./card-DrX_RmyE.js";import"./utils-CBfrqCZ4.js";import"./phone-BnGY3Sv1.js";import"./createLucideIcon-BH8CnD7y.js";import"./mail-CD4euI3U.js";import"./separator-DZHrP0R9.js";import"./index-BfQugiVD.js";import"./index-DhbfMN3k.js";import"./index-C7jJTgGp.js";import"./plane-IgmqG4yw.js";import"./ancillary-v4vhjuaq.js";import"./schemas-dlpNQSCA.js";import"./currency-BllR5SlS.js";import"./alert-DufCnLl2.js";import"./index-CdJFUDDL.js";import"./button-CAXY9XPu.js";const f={title:"Flights/Orders/OrderPaymentDetails",component:m,parameters:{layout:"padded"},tags:["autodocs"]},r={id:"order-1",orderNumber:"ORD20250115001",userId:"user-1",outboundFlightSeatClassId:"seat-1",inboundFlightSeatClassId:null,status:"PENDING_PAYMENT",paymentDeadline:new Date(Date.now()+900*1e3),passengerCount:1,contactPhone:"13800138000",contactEmail:"user@example.com",pricePerTicket:"1280.00",baseAmount:"1280.00",ancillaryAmount:"0.00",totalAmount:"1280.00",ancillaryDetails:null,deletedAt:null,createdAt:new Date("2025-01-15T10:30:00Z"),updatedAt:new Date("2025-01-15T10:30:00Z"),passengers:[],outboundFlight:{},inboundFlight:null},e={args:{order:r}},a={args:{order:{...r,baseAmount:"1280.00",ancillaryAmount:"150.00",totalAmount:"1430.00",ancillaryDetails:["baggage_20kg","meal_standard"]}}},s={args:{order:{...r,baseAmount:"8500.00",ancillaryAmount:"500.00",totalAmount:"9000.00",ancillaryDetails:["baggage_32kg","meal_premium","lounge_access"]}}},o={args:{order:{...r,status:"CONFIRMED"}}},t={args:{order:{...r,passengerCount:3,baseAmount:"3840.00",ancillaryAmount:"300.00",totalAmount:"4140.00",ancillaryDetails:["baggage_20kg","meal_standard"]}}},n={args:{order:{...r,baseAmount:"2500.00",ancillaryAmount:"850.00",totalAmount:"3350.00",ancillaryDetails:["baggage_20kg","baggage_32kg","meal_standard","meal_premium","seat_selection","lounge_access","priority_boarding"]}}},c={args:{order:{...r,status:"CANCELLED"}}},i={args:{order:{...r,status:"REFUNDED"}}},d={args:{order:{...r,orderNumber:"ORD20250115001234567890"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    order: mockOrder
  }
}`,...e.parameters?.docs?.source},description:{story:"Basic order without ancillary services",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      baseAmount: "1280.00",
      ancillaryAmount: "150.00",
      totalAmount: "1430.00",
      ancillaryDetails: ["baggage_20kg", "meal_standard"]
    }
  }
}`,...a.parameters?.docs?.source},description:{story:"Order with ancillary services",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      baseAmount: "8500.00",
      ancillaryAmount: "500.00",
      totalAmount: "9000.00",
      ancillaryDetails: ["baggage_32kg", "meal_premium", "lounge_access"]
    }
  }
}`,...s.parameters?.docs?.source},description:{story:"High-value order",...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      status: "CONFIRMED" as const
    }
  }
}`,...o.parameters?.docs?.source},description:{story:"Confirmed order (no payment deadline)",...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      passengerCount: 3,
      baseAmount: "3840.00",
      ancillaryAmount: "300.00",
      totalAmount: "4140.00",
      ancillaryDetails: ["baggage_20kg", "meal_standard"]
    }
  }
}`,...t.parameters?.docs?.source},description:{story:"Round-trip order with multiple passengers",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      baseAmount: "2500.00",
      ancillaryAmount: "850.00",
      totalAmount: "3350.00",
      ancillaryDetails: ["baggage_20kg", "baggage_32kg", "meal_standard", "meal_premium", "seat_selection", "lounge_access", "priority_boarding"]
    }
  }
}`,...n.parameters?.docs?.source},description:{story:"Order with all ancillary services",...n.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      status: "CANCELLED" as const
    }
  }
}`,...c.parameters?.docs?.source},description:{story:"Cancelled order",...c.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      status: "REFUNDED" as const
    }
  }
}`,...i.parameters?.docs?.source},description:{story:"Refunded order",...i.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    order: {
      ...mockOrder,
      orderNumber: "ORD20250115001234567890"
    }
  }
}`,...d.parameters?.docs?.source},description:{story:"Order with long order number",...d.parameters?.docs?.description}}};const v=["BasicOrder","WithAncillaryServices","HighValue","ConfirmedOrder","RoundTripMultiplePassengers","AllAncillaryServices","CancelledOrder","RefundedOrder","LongOrderNumber"];export{n as AllAncillaryServices,e as BasicOrder,c as CancelledOrder,o as ConfirmedOrder,s as HighValue,d as LongOrderNumber,i as RefundedOrder,t as RoundTripMultiplePassengers,a as WithAncillaryServices,v as __namedExportsOrder,f as default};
