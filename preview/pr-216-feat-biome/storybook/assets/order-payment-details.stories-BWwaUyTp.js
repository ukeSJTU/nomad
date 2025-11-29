import"./cancel-order-dialog-Cb97koF5.js";import{c as o}from"./order-payment-details-DdKLnXwX.js";import"./order-status-card-DUiKJvjK.js";import"./iframe-BRgbNqLm.js";import"./index-jR5iUyjp.js";import"./index-D63BWAbV.js";import"./index-B2b5KDFl.js";import"./index-A8fl_Fn_.js";import"./index-TrKwCJZt.js";import"./index-Bxj4v1On.js";import"./index-CgtdcUJL.js";import"./index-YkNfMQmD.js";import"./Combination-Ds3ZMhFK.js";import"./button-XEp2VeJS.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-XrV2xzAV.js";import"./image-DZG32USI.js";import"./use-merged-ref-CSO1AP9r.js";import"./badge-D0_iz70J.js";import"./separator-ThEFqb3r.js";import"./arrow-left-right-B0ZjzThm.js";import"./createLucideIcon-CeCL99oA.js";import"./arrow-right-D__Oj--i.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-DzX7jO94.js";import"./clock-BaQ82iTG.js";import"./circle-check-big-MqwhjX3r.js";import"./circle-alert-CHCs6aZu.js";import"./circle-x-CyB27sJu.js";import"./preload-helper-PPVm8Dsz.js";const Z={title:"Flights/Orders/OrderPaymentDetails",component:o,parameters:{layout:"padded"},tags:["autodocs"]},r=i=>({createdAt:"2026-01-18T10:30:00Z",outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:1},ancillaryServices:[],baseAmount:"1280.00",ancillaryAmount:"0.00",totalAmount:"1280.00",...i}),t={args:{paymentData:r()}},e={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:3},inboundFlight:{depatureCityName:"上海",arrivalCityName:"北京",unitPrice:"1380.00",passengerCount:3},baseAmount:"7980.00",ancillaryAmount:"0.00",totalAmount:"7980.00"})}},a={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"广州",unitPrice:"1580.00",passengerCount:2},ancillaryServices:[{name:"行李托运",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2}],baseAmount:"3160.00",ancillaryAmount:"300.00",totalAmount:"3460.00"})}},n={args:{paymentData:r({createdAt:"2026-01-18T15:20:00Z",outboundFlight:{depatureCityName:"上海",arrivalCityName:"成都",unitPrice:"980.00",passengerCount:1},inboundFlight:{depatureCityName:"成都",arrivalCityName:"上海",unitPrice:"1080.00",passengerCount:1},ancillaryServices:[{name:"行李托运20kg",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2},{name:"机场贵宾室",code:"LOUNGE_ACCESS",unitPrice:"200.00",quantity:2},{name:"优先登机",code:"PRIORITY_BOARDING",unitPrice:"50.00",quantity:2}],baseAmount:"2060.00",ancillaryAmount:"800.00",totalAmount:"2860.00"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    paymentData: createMockPaymentData()
  }
}`,...t.parameters?.docs?.source},description:{story:"1. 单程1人",...t.parameters?.docs?.description}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    paymentData: createMockPaymentData({
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "上海",
        unitPrice: "1280.00",
        passengerCount: 3
      },
      inboundFlight: {
        depatureCityName: "上海",
        arrivalCityName: "北京",
        unitPrice: "1380.00",
        passengerCount: 3
      },
      baseAmount: "7980.00",
      // (1280 + 1380) × 3
      ancillaryAmount: "0.00",
      totalAmount: "7980.00"
    })
  }
}`,...e.parameters?.docs?.source},description:{story:"2. 往返多人",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    paymentData: createMockPaymentData({
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "广州",
        unitPrice: "1580.00",
        passengerCount: 2
      },
      ancillaryServices: [{
        name: "行李托运",
        code: "BAGGAGE_20KG",
        unitPrice: "150.00",
        quantity: 2
      }],
      baseAmount: "3160.00",
      // 1580 × 2
      ancillaryAmount: "300.00",
      // 150 × 2
      totalAmount: "3460.00" // 3160 + 300
    })
  }
}`,...a.parameters?.docs?.source},description:{story:"3. 单程多人有一个附加服务",...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    paymentData: createMockPaymentData({
      createdAt: "2026-01-18T15:20:00Z",
      outboundFlight: {
        depatureCityName: "上海",
        arrivalCityName: "成都",
        unitPrice: "980.00",
        passengerCount: 1
      },
      inboundFlight: {
        depatureCityName: "成都",
        arrivalCityName: "上海",
        unitPrice: "1080.00",
        passengerCount: 1
      },
      ancillaryServices: [{
        name: "行李托运20kg",
        code: "BAGGAGE_20KG",
        unitPrice: "150.00",
        quantity: 2
      }, {
        name: "机场贵宾室",
        code: "LOUNGE_ACCESS",
        unitPrice: "200.00",
        quantity: 2
      }, {
        name: "优先登机",
        code: "PRIORITY_BOARDING",
        unitPrice: "50.00",
        quantity: 2
      }],
      baseAmount: "2060.00",
      // 980 + 1080
      ancillaryAmount: "800.00",
      // (150 + 200 + 50) × 2
      totalAmount: "2860.00" // 2060 + 800
    })
  }
}`,...n.parameters?.docs?.source},description:{story:"4. 往返一人有多个附加服务",...n.parameters?.docs?.description}}};const f=["OneWaySinglePassenger","RoundTripMultiplePassengers","OneWayWithAncillaryService","RoundTripWithMultipleAncillaries"];export{t as OneWaySinglePassenger,a as OneWayWithAncillaryService,e as RoundTripMultiplePassengers,n as RoundTripWithMultipleAncillaries,f as __namedExportsOrder,Z as default};
