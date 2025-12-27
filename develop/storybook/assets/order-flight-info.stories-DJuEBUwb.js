import"./cancel-order-dialog-DLFYimRr.js";import{a as D}from"./order-payment-details-BPcsAQZT.js";import"./order-status-card-DytQuqwc.js";import"./iframe-Bg-UGac9.js";import"./index-CHYR9aNa.js";import"./index-B854MFqc.js";import"./index-njiYd0wI.js";import"./index-CQuQOcOr.js";import"./index-BKWHT2Fs.js";import"./index-tdQ4NAnn.js";import"./index-S7CK3ozS.js";import"./Combination-iaanReQE.js";import"./button-DDX2HNO5.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./card-CQoZQPxY.js";import"./image-DdIaTLaA.js";import"./use-merged-ref-DR5dw1kF.js";import"./badge-CiWRcD4q.js";import"./separator-CguLdoP5.js";import"./index-KqqYSkLM.js";import"./arrow-left-right-C7Uv7EQe.js";import"./createLucideIcon-CaoxKut3.js";import"./arrow-right-9pfW2Yx_.js";import"./format-Bpyr6-K6.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-CIHyKKuG.js";import"./clock-zxhboIN4.js";import"./circle-check-big-DlRvitlA.js";import"./circle-alert-ChV4nFY4.js";import"./circle-x-C4gBCw_-.js";import"./preload-helper-PPVm8Dsz.js";var s,n,l,d,m,p,u,c,v,_,g,h,y,T,F,C,b,N,f,E,S,A,M,O,I;const pr={title:"Flights/Orders/OrderFlightInfo",component:D,parameters:{layout:"padded"},tags:["autodocs"]},r=B=>({flightNumber:"MU5186",airlineName:"东方航空",airlineIataCode:"MU",airlineLogoUrl:"https://ui-avatars.com/api/?name=MU&background=000&color=fff&size=128&bold=true&format=svg",departureAirportName:"大兴机场",departureAirportIataCode:"PKX",departureCityName:"北京",arrivalAirportName:"浦东机场",arrivalAirportIataCode:"PVG",arrivalCityName:"上海",departureDatetime:"2026-01-18T07:30:00Z",arrivalDatetime:"2026-01-18T09:45:00Z",seatClassType:"ECONOMY",duration:135,aircraftType:"空客330(大)",departureTerminal:"T2",arrivalTerminal:"T1",...B}),a={args:{outboundFlight:r(),inboundFlight:null}},e={args:{outboundFlight:r({departureDatetime:"2026-01-18T07:30:00Z",arrivalDatetime:"2026-01-18T09:45:00Z"}),inboundFlight:r({flightNumber:"MU8230",airlineName:"东方航空",departureAirportName:"虹桥机场",departureAirportIataCode:"SHA",departureCityName:"上海",arrivalAirportName:"大兴机场",arrivalAirportIataCode:"PKX",arrivalCityName:"北京",departureDatetime:"2026-01-21T20:40:00Z",arrivalDatetime:"2026-01-21T22:55:00Z",aircraftType:"波音777(中)",duration:135})}},o={args:{outboundFlight:r({seatClassType:"BUSINESS"}),inboundFlight:null}},i={args:{outboundFlight:r({seatClassType:"FIRST"}),inboundFlight:null}},t={args:{outboundFlight:r({departureTerminal:void 0,arrivalTerminal:void 0}),inboundFlight:null}};a.parameters={...a.parameters,docs:{...(s=a.parameters)===null||s===void 0?void 0:s.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight(),
    inboundFlight: null
  }
}`,...(l=a.parameters)===null||l===void 0||(n=l.docs)===null||n===void 0?void 0:n.source},description:{story:`One-way flight (economy class)
Matches the screenshot layout`,...(m=a.parameters)===null||m===void 0||(d=m.docs)===null||d===void 0?void 0:d.description}}};e.parameters={...e.parameters,docs:{...(p=e.parameters)===null||p===void 0?void 0:p.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight({
      departureDatetime: "2026-01-18T07:30:00Z",
      arrivalDatetime: "2026-01-18T09:45:00Z"
    }),
    inboundFlight: createMockFlight({
      flightNumber: "MU8230",
      airlineName: "东方航空",
      departureAirportName: "虹桥机场",
      departureAirportIataCode: "SHA",
      departureCityName: "上海",
      arrivalAirportName: "大兴机场",
      arrivalAirportIataCode: "PKX",
      arrivalCityName: "北京",
      departureDatetime: "2026-01-21T20:40:00Z",
      arrivalDatetime: "2026-01-21T22:55:00Z",
      aircraftType: "波音777(中)",
      duration: 135
    })
  }
}`,...(c=e.parameters)===null||c===void 0||(u=c.docs)===null||u===void 0?void 0:u.source},description:{story:`Round-trip flight (economy class)
Shows both outbound and inbound flights`,...(_=e.parameters)===null||_===void 0||(v=_.docs)===null||v===void 0?void 0:v.description}}};o.parameters={...o.parameters,docs:{...(g=o.parameters)===null||g===void 0?void 0:g.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight({
      seatClassType: "BUSINESS"
    }),
    inboundFlight: null
  }
}`,...(y=o.parameters)===null||y===void 0||(h=y.docs)===null||h===void 0?void 0:h.source},description:{story:"Business class flight",...(F=o.parameters)===null||F===void 0||(T=F.docs)===null||T===void 0?void 0:T.description}}};i.parameters={...i.parameters,docs:{...(C=i.parameters)===null||C===void 0?void 0:C.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight({
      seatClassType: "FIRST"
    }),
    inboundFlight: null
  }
}`,...(N=i.parameters)===null||N===void 0||(b=N.docs)===null||b===void 0?void 0:b.source},description:{story:"First class flight",...(E=i.parameters)===null||E===void 0||(f=E.docs)===null||f===void 0?void 0:f.description}}};t.parameters={...t.parameters,docs:{...(S=t.parameters)===null||S===void 0?void 0:S.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight({
      departureTerminal: undefined,
      arrivalTerminal: undefined
    }),
    inboundFlight: null
  }
}`,...(M=t.parameters)===null||M===void 0||(A=M.docs)===null||A===void 0?void 0:A.source},description:{story:"Flight without terminal information",...(I=t.parameters)===null||I===void 0||(O=I.docs)===null||O===void 0?void 0:O.description}}};const ur=["OneWayEconomy","RoundTripEconomy","BusinessClass","FirstClass","NoTerminals"];export{o as BusinessClass,i as FirstClass,t as NoTerminals,a as OneWayEconomy,e as RoundTripEconomy,ur as __namedExportsOrder,pr as default};
