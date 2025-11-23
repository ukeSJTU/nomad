import"./cancel-order-dialog-ClnPjl2F.js";import{c as o}from"./order-payment-details-L4KMRhNo.js";import"./order-status-card-DzaRYmxh.js";import"./iframe-BIE3orPF.js";import"./index-Cc0-q4v9.js";import"./index-dpG-91xS.js";import"./index-BDQ7_fOS.js";import"./index-BcGFjD2Y.js";import"./index-BU5DVp1F.js";import"./index-C9hYUzPm.js";import"./index-C8tx8S_a.js";import"./index-zLNOV2VO.js";import"./Combination-C7TrT_6E.js";import"./button-BHL9VpYg.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-BBfnKoXO.js";import"./image-DnI0QF4t.js";import"./use-merged-ref-DYwguYlI.js";import"./badge-CSlUHOkg.js";import"./separator-BVO-c-3c.js";import"./arrow-left-right-C5fyLWlN.js";import"./createLucideIcon-aXwR9RXD.js";import"./arrow-right-CQ6fm6v3.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-Dgd5Fh_l.js";import"./clock-mx1n1KK0.js";import"./circle-check-big-DO1AjQ3w.js";import"./circle-alert-B4gTbZ38.js";import"./circle-x-BaFO-j2N.js";import"./preload-helper-PPVm8Dsz.js";const Z={title:"Flights/Orders/OrderPaymentDetails",component:o,parameters:{layout:"padded"},tags:["autodocs"]},r=i=>({createdAt:"2026-01-18T10:30:00Z",outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:1},ancillaryServices:[],baseAmount:"1280.00",ancillaryAmount:"0.00",totalAmount:"1280.00",...i}),t={args:{paymentData:r()}},e={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:3},inboundFlight:{depatureCityName:"上海",arrivalCityName:"北京",unitPrice:"1380.00",passengerCount:3},baseAmount:"7980.00",ancillaryAmount:"0.00",totalAmount:"7980.00"})}},a={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"广州",unitPrice:"1580.00",passengerCount:2},ancillaryServices:[{name:"行李托运",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2}],baseAmount:"3160.00",ancillaryAmount:"300.00",totalAmount:"3460.00"})}},n={args:{paymentData:r({createdAt:"2026-01-18T15:20:00Z",outboundFlight:{depatureCityName:"上海",arrivalCityName:"成都",unitPrice:"980.00",passengerCount:1},inboundFlight:{depatureCityName:"成都",arrivalCityName:"上海",unitPrice:"1080.00",passengerCount:1},ancillaryServices:[{name:"行李托运20kg",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2},{name:"机场贵宾室",code:"LOUNGE_ACCESS",unitPrice:"200.00",quantity:2},{name:"优先登机",code:"PRIORITY_BOARDING",unitPrice:"50.00",quantity:2}],baseAmount:"2060.00",ancillaryAmount:"800.00",totalAmount:"2860.00"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
