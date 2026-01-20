import"./order-status-card-CwmG_t2m.js";import"./iframe-CrLPMyef.js";import"./alert-dialog-BDRb33ee.js";import{c as G}from"./order-payment-details-B8_WDrBs.js";import"./order-status-card-CakoWe88.js";import"./card-D-d6dHIy.js";import"./createLucideIcon-DzaTpkcS.js";import"./platform-DKvuCmmd.js";import"./badge-DRbaR9p2.js";import"./index-CCw5U8u4.js";import"./separator-BFZTMdF7.js";import"./index-E-CxifyW.js";import"./index-DLC0D_9l.js";import"./arrow-right-BDAwJViZ.js";import"./format-Bpyr6-K6.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-Dl9eybxG.js";import"./button-C49Jt41H.js";import"./clock-F2jEp9km.js";import"./circle-check-big-H3xgBYGC.js";import"./circle-alert-Dy3v6eT1.js";import"./circle-x-B6KCtiih.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B2BMd2ZM.js";import"./index-B9BpXIRB.js";import"./index-DBYj_96i.js";import"./index-BmOx0rIh.js";var i,o,s,l,u,m,p,c,d,y,v,g,_,A,P,C,W,S,h,N;const ee={title:"Flights/Orders/OrderPaymentDetails",component:G,parameters:{layout:"padded"},tags:["autodocs"]},r=O=>({createdAt:"2026-01-18T10:30:00Z",outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:1},ancillaryServices:[],baseAmount:"1280.00",ancillaryAmount:"0.00",totalAmount:"1280.00",...O}),e={args:{paymentData:r()}},a={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"上海",unitPrice:"1280.00",passengerCount:3},inboundFlight:{depatureCityName:"上海",arrivalCityName:"北京",unitPrice:"1380.00",passengerCount:3},baseAmount:"7980.00",ancillaryAmount:"0.00",totalAmount:"7980.00"})}},n={args:{paymentData:r({outboundFlight:{depatureCityName:"北京",arrivalCityName:"广州",unitPrice:"1580.00",passengerCount:2},ancillaryServices:[{name:"行李托运",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2}],baseAmount:"3160.00",ancillaryAmount:"300.00",totalAmount:"3460.00"})}},t={args:{paymentData:r({createdAt:"2026-01-18T15:20:00Z",outboundFlight:{depatureCityName:"上海",arrivalCityName:"成都",unitPrice:"980.00",passengerCount:1},inboundFlight:{depatureCityName:"成都",arrivalCityName:"上海",unitPrice:"1080.00",passengerCount:1},ancillaryServices:[{name:"行李托运20kg",code:"BAGGAGE_20KG",unitPrice:"150.00",quantity:2},{name:"机场贵宾室",code:"LOUNGE_ACCESS",unitPrice:"200.00",quantity:2},{name:"优先登机",code:"PRIORITY_BOARDING",unitPrice:"50.00",quantity:2}],baseAmount:"2060.00",ancillaryAmount:"800.00",totalAmount:"2860.00"})}};e.parameters={...e.parameters,docs:{...(i=e.parameters)===null||i===void 0?void 0:i.docs,source:{originalSource:`{
  args: {
    paymentData: createMockPaymentData()
  }
}`,...(s=e.parameters)===null||s===void 0||(o=s.docs)===null||o===void 0?void 0:o.source},description:{story:"1. 单程1人",...(u=e.parameters)===null||u===void 0||(l=u.docs)===null||l===void 0?void 0:l.description}}};a.parameters={...a.parameters,docs:{...(m=a.parameters)===null||m===void 0?void 0:m.docs,source:{originalSource:`{
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
}`,...(c=a.parameters)===null||c===void 0||(p=c.docs)===null||p===void 0?void 0:p.source},description:{story:"2. 往返多人",...(y=a.parameters)===null||y===void 0||(d=y.docs)===null||d===void 0?void 0:d.description}}};n.parameters={...n.parameters,docs:{...(v=n.parameters)===null||v===void 0?void 0:v.docs,source:{originalSource:`{
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
}`,...(_=n.parameters)===null||_===void 0||(g=_.docs)===null||g===void 0?void 0:g.source},description:{story:"3. 单程多人有一个附加服务",...(P=n.parameters)===null||P===void 0||(A=P.docs)===null||A===void 0?void 0:A.description}}};t.parameters={...t.parameters,docs:{...(C=t.parameters)===null||C===void 0?void 0:C.docs,source:{originalSource:`{
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
}`,...(S=t.parameters)===null||S===void 0||(W=S.docs)===null||W===void 0?void 0:W.source},description:{story:"4. 往返一人有多个附加服务",...(N=t.parameters)===null||N===void 0||(h=N.docs)===null||h===void 0?void 0:h.description}}};const ae=["OneWaySinglePassenger","RoundTripMultiplePassengers","OneWayWithAncillaryService","RoundTripWithMultipleAncillaries"];export{e as OneWaySinglePassenger,n as OneWayWithAncillaryService,a as RoundTripMultiplePassengers,t as RoundTripWithMultipleAncillaries,ae as __namedExportsOrder,ee as default};
