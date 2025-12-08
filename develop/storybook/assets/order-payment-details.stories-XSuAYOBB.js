import"./cancel-order-dialog-CFA20Wgq.js";import{c as o}from"./order-payment-details-BQDLcUcw.js";import"./order-status-card-BQybS0ws.js";import"./iframe-C7R0YjOm.js";import"./index-i9AJ-ECD.js";import"./index-D41ql2I7.js";import"./index-t0-iqrTt.js";import"./index-k-3YqcaR.js";import"./index-DXw7uPSF.js";import"./index-Dspvi0J-.js";import"./index-DOUNHRMI.js";import"./index-KolRuBAj.js";import"./Combination-ATFZmZRW.js";import"./button-Cn3EoK48.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-CsCtHIKy.js";import"./image-DdTEl9Cq.js";import"./use-merged-ref-B3wPOGc8.js";import"./badge-Bwu9nECM.js";import"./separator-Dni4XCLG.js";import"./arrow-left-right-XkW-LxqK.js";import"./createLucideIcon-kLAYoR_c.js";import"./arrow-right-b-uEh6Nq.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-DLSLrtHF.js";import"./clock-DJMRskeR.js";import"./circle-check-big-igSq8oNW.js";import"./circle-alert-D2aguD2n.js";import"./circle-x-c7miyBLn.js";import"./preload-helper-PPVm8Dsz.js";const Z={title:"Flights/Orders/OrderPaymentDetails",component:o,parameters:{layout:"padded"},tags:["autodocs"]},r=i=>({createdAt:"2026-01-18T10:30:00Z",outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:1},ancillaryServices:[],baseAmount:"1280.00",ancillaryAmount:"0.00",totalAmount:"1280.00",...i}),t={args:{paymentData:r()}},e={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:3},inboundFlight:{depatureCityName:"上海",arrivalCityName:"北京",unitPrice:"1380.00",passengerCount:3},baseAmount:"7980.00",ancillaryAmount:"0.00",totalAmount:"7980.00"})}},a={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"广州",unitPrice:"1580.00",passengerCount:2},ancillaryServices:[{name:"行李托运",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2}],baseAmount:"3160.00",ancillaryAmount:"300.00",totalAmount:"3460.00"})}},n={args:{paymentData:r({createdAt:"2026-01-18T15:20:00Z",outboundFlight:{depatureCityName:"上海",arrivalCityName:"成都",unitPrice:"980.00",passengerCount:1},inboundFlight:{depatureCityName:"成都",arrivalCityName:"上海",unitPrice:"1080.00",passengerCount:1},ancillaryServices:[{name:"行李托运20kg",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2},{name:"机场贵宾室",code:"LOUNGE_ACCESS",unitPrice:"200.00",quantity:2},{name:"优先登机",code:"PRIORITY_BOARDING",unitPrice:"50.00",quantity:2}],baseAmount:"2060.00",ancillaryAmount:"800.00",totalAmount:"2860.00"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
