import{a as s}from"./order-status-card-DfhSBfNa.js";import"./iframe-BH7aeb89.js";import"./preload-helper-PPVm8Dsz.js";import"./card-EjpOmyDU.js";import"./utils-CBfrqCZ4.js";import"./phone-C1HaZ9ei.js";import"./createLucideIcon-C7RxPt7J.js";import"./mail-CmLJ-c6c.js";import"./separator-IToQ99wX.js";import"./index-rfJbia-g.js";import"./index-B4LoADOl.js";import"./index-B6zyZfym.js";import"./plane-Dx3-kXjb.js";import"./ancillary-v4vhjuaq.js";import"./schemas-dlpNQSCA.js";import"./currency-BllR5SlS.js";import"./alert-Bx0vPAMn.js";import"./index-CdJFUDDL.js";import"./button-reTbs1c1.js";const E={title:"Flights/Orders/OrderFlightInfo",component:s,parameters:{layout:"padded"},tags:["autodocs"]},r={id:"flight-1",flightNumber:"MU5186",airlineId:"airline-1",departureAirportId:"airport-1",arrivalAirportId:"airport-2",departureDatetime:new Date("2025-01-18T07:30:00Z"),arrivalDatetime:new Date("2025-01-18T10:45:00Z"),departureTerminal:"T1",arrivalTerminal:"T2",aircraftType:"330",airline:{id:"airline-1",name:"东方航空",iataCode:"MU",logoUrl:null},departureAirport:{id:"airport-1",name:"大兴国际机场",iataCode:"PKX",cityId:"city-1"},arrivalAirport:{id:"airport-2",name:"浦东国际机场",iataCode:"PVG",cityId:"city-2"},seatClass:{id:"seat-1",flightId:"flight-1",classType:"ECONOMY",price:"1280.00",availableSeats:50,totalSeats:100}},n={id:"flight-2",flightNumber:"MU5187",airlineId:"airline-1",departureAirportId:"airport-2",arrivalAirportId:"airport-1",departureDatetime:new Date("2025-01-25T14:30:00Z"),arrivalDatetime:new Date("2025-01-25T17:45:00Z"),departureTerminal:"T2",arrivalTerminal:"T1",aircraftType:"330",airline:{id:"airline-1",name:"东方航空",iataCode:"MU",logoUrl:null},departureAirport:{id:"airport-2",name:"浦东国际机场",iataCode:"PVG",cityId:"city-2"},arrivalAirport:{id:"airport-1",name:"大兴国际机场",iataCode:"PKX",cityId:"city-1"},seatClass:{id:"seat-2",flightId:"flight-2",classType:"ECONOMY",price:"1380.00",availableSeats:45,totalSeats:100}},t={args:{outboundFlight:r,inboundFlight:null}},a={args:{outboundFlight:r,inboundFlight:n}},i={args:{outboundFlight:{...r,seatClass:{...r.seatClass,classType:"BUSINESS",price:"3280.00"}},inboundFlight:null}},e={args:{outboundFlight:{...r,seatClass:{...r.seatClass,classType:"FIRST",price:"5280.00"}},inboundFlight:null}},o={args:{outboundFlight:{...r,departureTerminal:null,arrivalTerminal:null},inboundFlight:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: null
  }
}`,...t.parameters?.docs?.source},description:{story:"One-way flight (economy class)",...t.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight
  }
}`,...a.parameters?.docs?.source},description:{story:"Round-trip flight (economy class)",...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      seatClass: {
        ...mockOutboundFlight.seatClass,
        classType: "BUSINESS" as const,
        price: "3280.00"
      }
    },
    inboundFlight: null
  }
}`,...i.parameters?.docs?.source},description:{story:"Business class flight",...i.parameters?.docs?.description}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      seatClass: {
        ...mockOutboundFlight.seatClass,
        classType: "FIRST" as const,
        price: "5280.00"
      }
    },
    inboundFlight: null
  }
}`,...e.parameters?.docs?.source},description:{story:"First class flight",...e.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      departureTerminal: null,
      arrivalTerminal: null
    },
    inboundFlight: null
  }
}`,...o.parameters?.docs?.source},description:{story:"Flight without terminal information",...o.parameters?.docs?.description}}};const A=["OneWayEconomy","RoundTripEconomy","BusinessClass","FirstClass","NoTerminals"];export{i as BusinessClass,e as FirstClass,o as NoTerminals,t as OneWayEconomy,a as RoundTripEconomy,A as __namedExportsOrder,E as default};
