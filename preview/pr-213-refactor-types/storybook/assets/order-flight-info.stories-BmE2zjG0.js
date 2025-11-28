import"./cancel-order-dialog-Cb97koF5.js";import{a as s}from"./order-payment-details-DdKLnXwX.js";import"./order-status-card-DUiKJvjK.js";import"./iframe-BRgbNqLm.js";import"./index-jR5iUyjp.js";import"./index-D63BWAbV.js";import"./index-B2b5KDFl.js";import"./index-A8fl_Fn_.js";import"./index-TrKwCJZt.js";import"./index-Bxj4v1On.js";import"./index-CgtdcUJL.js";import"./index-YkNfMQmD.js";import"./Combination-Ds3ZMhFK.js";import"./button-XEp2VeJS.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-XrV2xzAV.js";import"./image-DZG32USI.js";import"./use-merged-ref-CSO1AP9r.js";import"./badge-D0_iz70J.js";import"./separator-ThEFqb3r.js";import"./arrow-left-right-B0ZjzThm.js";import"./createLucideIcon-CeCL99oA.js";import"./arrow-right-D__Oj--i.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-DzX7jO94.js";import"./clock-BaQ82iTG.js";import"./circle-check-big-MqwhjX3r.js";import"./circle-alert-CHCs6aZu.js";import"./circle-x-CyB27sJu.js";import"./preload-helper-PPVm8Dsz.js";const x={title:"Flights/Orders/OrderFlightInfo",component:s,parameters:{layout:"padded"},tags:["autodocs"]},r=n=>({flightNumber:"MU5186",airlineName:"东方航空",airlineIataCode:"MU",airlineLogoUrl:"https://ui-avatars.com/api/?name=MU&background=000&color=fff&size=128&bold=true&format=svg",departureAirportName:"大兴机场",departureAirportIataCode:"PKX",departureCityName:"北京",arrivalAirportName:"浦东机场",arrivalAirportIataCode:"PVG",arrivalCityName:"上海",departureDatetime:"2026-01-18T07:30:00Z",arrivalDatetime:"2026-01-18T09:45:00Z",seatClassType:"ECONOMY",duration:135,aircraftType:"空客330(大)",departureTerminal:"T2",arrivalTerminal:"T1",...n}),t={args:{outboundFlight:r(),inboundFlight:null}},a={args:{outboundFlight:r({departureDatetime:"2026-01-18T07:30:00Z",arrivalDatetime:"2026-01-18T09:45:00Z"}),inboundFlight:r({flightNumber:"MU8230",airlineName:"东方航空",departureAirportName:"虹桥机场",departureAirportIataCode:"SHA",departureCityName:"上海",arrivalAirportName:"大兴机场",arrivalAirportIataCode:"PKX",arrivalCityName:"北京",departureDatetime:"2026-01-21T20:40:00Z",arrivalDatetime:"2026-01-21T22:55:00Z",aircraftType:"波音777(中)",duration:135})}},e={args:{outboundFlight:r({seatClassType:"BUSINESS"}),inboundFlight:null}},i={args:{outboundFlight:r({seatClassType:"FIRST"}),inboundFlight:null}},o={args:{outboundFlight:r({departureTerminal:void 0,arrivalTerminal:void 0}),inboundFlight:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight(),
    inboundFlight: null
  }
}`,...t.parameters?.docs?.source},description:{story:`One-way flight (economy class)
Matches the screenshot layout`,...t.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source},description:{story:`Round-trip flight (economy class)
Shows both outbound and inbound flights`,...a.parameters?.docs?.description}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight({
      seatClassType: "BUSINESS"
    }),
    inboundFlight: null
  }
}`,...e.parameters?.docs?.source},description:{story:"Business class flight",...e.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight({
      seatClassType: "FIRST"
    }),
    inboundFlight: null
  }
}`,...i.parameters?.docs?.source},description:{story:"First class flight",...i.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: createMockFlight({
      departureTerminal: undefined,
      arrivalTerminal: undefined
    }),
    inboundFlight: null
  }
}`,...o.parameters?.docs?.source},description:{story:"Flight without terminal information",...o.parameters?.docs?.description}}};const H=["OneWayEconomy","RoundTripEconomy","BusinessClass","FirstClass","NoTerminals"];export{e as BusinessClass,i as FirstClass,o as NoTerminals,t as OneWayEconomy,a as RoundTripEconomy,H as __namedExportsOrder,x as default};
