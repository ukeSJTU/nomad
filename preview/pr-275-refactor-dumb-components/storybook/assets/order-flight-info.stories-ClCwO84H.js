import"./order-status-card-ByDy71h2.js";import"./iframe-BY6WQ8rl.js";import"./alert-dialog-C3Xzojz4.js";import{a as D}from"./order-payment-details-CptWhPe6.js";import"./order-status-card-XHruvgc1.js";import"./card-C2MAT-zL.js";import"./createLucideIcon-DhaeV68V.js";import"./platform-CXbBvqhr.js";import"./badge-DGHQsNQ9.js";import"./index-Cg4mt3GG.js";import"./separator-D3mo2s7R.js";import"./index-B6rVzEen.js";import"./index-DRfufKDV.js";import"./arrow-right-JX-tWSat.js";import"./format-Bpyr6-K6.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-Bq9jHRdw.js";import"./button-Bkd1CeD9.js";import"./clock-DMr9UqDy.js";import"./circle-check-big-CNw7CXee.js";import"./circle-alert-BdeKJeaD.js";import"./circle-x-CqC3SdqK.js";import"./preload-helper-PPVm8Dsz.js";import"./index-HIqmnw4t.js";import"./index-jM_4ha9X.js";import"./index-BaiNJB1C.js";import"./index-D0-zYxe0.js";var s,n,l,d,m,p,u,c,v,_,g,h,y,T,F,C,b,N,f,E,S,A,M,O,I;const sr={title:"Flights/Orders/OrderFlightInfo",component:D,parameters:{layout:"padded"},tags:["autodocs"]},r=B=>({flightNumber:"MU5186",airlineName:"东方航空",airlineIataCode:"MU",airlineLogoUrl:"https://ui-avatars.com/api/?name=MU&background=000&color=fff&size=128&bold=true&format=svg",departureAirportName:"大兴机场",departureAirportIataCode:"PKX",departureCityName:"北京",arrivalAirportName:"浦东机场",arrivalAirportIataCode:"PVG",arrivalCityName:"上海",departureDatetime:"2026-01-18T07:30:00Z",arrivalDatetime:"2026-01-18T09:45:00Z",seatClassType:"ECONOMY",duration:135,aircraftType:"空客330(大)",departureTerminal:"T2",arrivalTerminal:"T1",...B}),a={args:{outboundFlight:r(),inboundFlight:null}},e={args:{outboundFlight:r({departureDatetime:"2026-01-18T07:30:00Z",arrivalDatetime:"2026-01-18T09:45:00Z"}),inboundFlight:r({flightNumber:"MU8230",airlineName:"东方航空",departureAirportName:"虹桥机场",departureAirportIataCode:"SHA",departureCityName:"上海",arrivalAirportName:"大兴机场",arrivalAirportIataCode:"PKX",arrivalCityName:"北京",departureDatetime:"2026-01-21T20:40:00Z",arrivalDatetime:"2026-01-21T22:55:00Z",aircraftType:"波音777(中)",duration:135})}},o={args:{outboundFlight:r({seatClassType:"BUSINESS"}),inboundFlight:null}},i={args:{outboundFlight:r({seatClassType:"FIRST"}),inboundFlight:null}},t={args:{outboundFlight:r({departureTerminal:void 0,arrivalTerminal:void 0}),inboundFlight:null}};a.parameters={...a.parameters,docs:{...(s=a.parameters)===null||s===void 0?void 0:s.docs,source:{originalSource:`{
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
}`,...(M=t.parameters)===null||M===void 0||(A=M.docs)===null||A===void 0?void 0:A.source},description:{story:"Flight without terminal information",...(I=t.parameters)===null||I===void 0||(O=I.docs)===null||O===void 0?void 0:O.description}}};const nr=["OneWayEconomy","RoundTripEconomy","BusinessClass","FirstClass","NoTerminals"];export{o as BusinessClass,i as FirstClass,t as NoTerminals,a as OneWayEconomy,e as RoundTripEconomy,nr as __namedExportsOrder,sr as default};
