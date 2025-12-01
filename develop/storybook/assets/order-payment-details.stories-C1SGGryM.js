import"./cancel-order-dialog-Bo-uBYDH.js";import{c as o}from"./order-payment-details-fUs_nADb.js";import"./order-status-card-DE8O2_Cb.js";import"./iframe-BJgykgVD.js";import"./index-DkuPh9Su.js";import"./index-CAxwE_jM.js";import"./index-DqRO2xoq.js";import"./index-D_fv8bV6.js";import"./index-CqgsDxe_.js";import"./index-DdLAavYv.js";import"./index-tkGWHLHF.js";import"./index-uwfhZi5g.js";import"./Combination-Bbrljvcr.js";import"./button-DXG5o7vA.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-nZeoFs75.js";import"./image-D2EZWSsV.js";import"./use-merged-ref-CPH4_Gtw.js";import"./badge-QpfoM48B.js";import"./separator-D7Z9tTkU.js";import"./arrow-left-right-CVpkZLN1.js";import"./createLucideIcon-9V33WfUP.js";import"./arrow-right-CEYL8cLc.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-B15s0SmB.js";import"./clock-B47G9xCP.js";import"./circle-check-big-Cd8GA9Te.js";import"./circle-alert-YImevoKj.js";import"./circle-x-Bo-ZbVUu.js";import"./preload-helper-PPVm8Dsz.js";const Z={title:"Flights/Orders/OrderPaymentDetails",component:o,parameters:{layout:"padded"},tags:["autodocs"]},r=i=>({createdAt:"2026-01-18T10:30:00Z",outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:1},ancillaryServices:[],baseAmount:"1280.00",ancillaryAmount:"0.00",totalAmount:"1280.00",...i}),t={args:{paymentData:r()}},e={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:3},inboundFlight:{depatureCityName:"上海",arrivalCityName:"北京",unitPrice:"1380.00",passengerCount:3},baseAmount:"7980.00",ancillaryAmount:"0.00",totalAmount:"7980.00"})}},a={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"广州",unitPrice:"1580.00",passengerCount:2},ancillaryServices:[{name:"行李托运",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2}],baseAmount:"3160.00",ancillaryAmount:"300.00",totalAmount:"3460.00"})}},n={args:{paymentData:r({createdAt:"2026-01-18T15:20:00Z",outboundFlight:{depatureCityName:"上海",arrivalCityName:"成都",unitPrice:"980.00",passengerCount:1},inboundFlight:{depatureCityName:"成都",arrivalCityName:"上海",unitPrice:"1080.00",passengerCount:1},ancillaryServices:[{name:"行李托运20kg",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2},{name:"机场贵宾室",code:"LOUNGE_ACCESS",unitPrice:"200.00",quantity:2},{name:"优先登机",code:"PRIORITY_BOARDING",unitPrice:"50.00",quantity:2}],baseAmount:"2060.00",ancillaryAmount:"800.00",totalAmount:"2860.00"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
