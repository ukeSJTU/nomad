import{j as e}from"./iframe-Bk5YI9Ds.js";import{C as T,a as v,b as k,c as w}from"./card-E3ZcPAfZ.js";import{S as h}from"./separator-BYr69S9q.js";import{p as x,b as M,g as f,m as O,f as y}from"./currency-BllR5SlS.js";import{f as U}from"./date-DxJh1dLk.js";import{c as C}from"./createLucideIcon-CQ_DuGsw.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";import"./index-BchiU-_U.js";import"./index-Cr-eHOE7.js";import"./index-BJPWZ1qc.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],B=C("clock",P);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]],I=C("plane",E);function b(s){const t=s.getHours().toString().padStart(2,"0"),a=s.getMinutes().toString().padStart(2,"0");return`${t}:${a}`}function j({flight:s,type:t="outbound"}){const a=new Date(s.flight.departure.datetime),r=new Date(s.flight.arrival.datetime),i=r.getTime()-a.getTime(),p=Math.floor(i/(1e3*60*60)),g=Math.floor(i%(1e3*60*60)/(1e3*60)),F=s.classType==="ECONOMY"?"经济舱":s.classType==="BUSINESS"?"商务舱":"头等舱";return e.jsxs("div",{className:"space-y-3 flex flex-col items-center",children:[e.jsxs("div",{className:"font-medium text-lg flex items-center gap-2",children:[e.jsx("span",{className:"bg-black text-white px-2 py-0.5 text-sm rounded",children:t==="outbound"?"去":"返"}),U(a),e.jsxs("span",{className:"mx-2",children:[s.flight.departure.city.name," →"," ",s.flight.arrival.city.name]})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-gray-600",children:[s.flight.airline.logoUrl&&e.jsx("img",{src:s.flight.airline.logoUrl,alt:s.flight.airline.name,className:"h-5 w-5 object-contain"}),e.jsx("span",{className:"text-red-500",children:s.flight.airline.name}),e.jsx("span",{children:s.flight.flightNumber}),e.jsxs("span",{children:["空客",s.flight.aircraftType||"330"]}),e.jsx("span",{children:F})]}),e.jsxs("div",{className:"flex items-center justify-center gap-12",children:[e.jsx("div",{className:"text-2xl font-semibold",children:b(a)}),e.jsxs("div",{className:"flex items-center text-xs text-gray-400 gap-1",children:[e.jsx(B,{className:"h-3 w-3 inline"})," ",e.jsxs("span",{className:"font-medium text-gray-500",children:[p,"h",g,"m"]})]}),e.jsx("div",{className:"text-2xl font-semibold",children:b(r)})]}),e.jsxs("div",{className:"grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full max-w-md",children:[e.jsx("div",{className:"text-sm font-bold text-right",children:s.flight.departure.airport.name}),e.jsx("div",{className:"w-32 border-t border-gray-300 relative",children:e.jsx(I,{className:"h-6 w-6 text-gray-400 absolute -top-3 left-1/2 -translate-x-1/2 bg-white rotate-45"})}),e.jsx("div",{className:"text-sm font-bold text-left",children:s.flight.arrival.airport.name})]})]})}function N({outboundFlight:s,inboundFlight:t,passengerCount:a=1}){if(!s)return null;const r=x(s.price),i=t?x(t.price):x(0),p=M(f(r),f(i)),g=O(f(p),a);return e.jsxs(T,{className:"sticky top-4",children:[e.jsx(v,{children:e.jsx(k,{className:"text-lg",children:"航班信息"})}),e.jsxs(w,{className:"space-y-4",children:[e.jsx(j,{flight:s,type:"outbound"}),t&&e.jsxs(e.Fragment,{children:[e.jsx(h,{}),e.jsx(j,{flight:t,type:"inbound"})]}),e.jsx(h,{}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{className:"text-gray-600",children:"去程票价"}),e.jsx("span",{className:"font-medium",children:y(r)})]}),t&&e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{className:"text-gray-600",children:"返程票价"}),e.jsx("span",{className:"font-medium",children:y(i)})]}),e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{className:"text-gray-600",children:"乘客人数"}),e.jsx("span",{className:"font-medium",children:a})]}),e.jsx(h,{}),e.jsxs("div",{className:"flex justify-between text-base font-semibold",children:[e.jsx("span",{children:"总计"}),e.jsx("span",{className:"text-blue-600",children:y(g)})]})]})]})]})}N.__docgenInfo={description:"",methods:[],displayName:"FlightSummaryCard",props:{outboundFlight:{required:!0,tsType:{name:"union",raw:"FlightSeatClassDetails | null",elements:[{name:"FlightSeatClassDetails"},{name:"null"}]},description:""},inboundFlight:{required:!1,tsType:{name:"union",raw:"FlightSeatClassDetails | null",elements:[{name:"FlightSeatClassDetails"},{name:"null"}]},description:""},passengerCount:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}}}};const Y={title:"Flights/FlightSummaryCard",component:N,parameters:{layout:"padded"},tags:["autodocs"]},u={id:"seat-class-1",classType:"ECONOMY",price:"1280.00",availableSeats:50,totalSeats:100,flight:{id:"flight-1",flightNumber:"MU5186",aircraftType:"330",airline:{id:"airline-1",name:"东方航空",iataCode:"MU",logoUrl:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff&size=256&bold=true&rounded=true&format=svg"},departure:{datetime:"2025-01-18T07:30:00Z",terminal:"T1",airport:{id:"airport-1",iataCode:"PEK",name:"大兴国际机场"},city:{id:"city-1",iataCode:"BJS",name:"北京",timezone:"Asia/Shanghai"}},arrival:{datetime:"2025-01-18T09:45:00Z",terminal:"T1",airport:{id:"airport-2",iataCode:"PVG",name:"浦东国际机场T1"},city:{id:"city-2",iataCode:"SHA",name:"上海",timezone:"Asia/Shanghai"}}}},S={id:"seat-class-2",classType:"ECONOMY",price:"1350.00",availableSeats:45,totalSeats:100,flight:{id:"flight-2",flightNumber:"MU5187",aircraftType:"330",airline:{id:"airline-1",name:"东方航空",iataCode:"MU",logoUrl:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff&size=256&bold=true&rounded=true&format=svg"},departure:{datetime:"2025-01-25T14:30:00Z",terminal:"T1",airport:{id:"airport-2",iataCode:"PVG",name:"浦东国际机场T1"},city:{id:"city-2",iataCode:"SHA",name:"上海",timezone:"Asia/Shanghai"}},arrival:{datetime:"2025-01-25T16:45:00Z",terminal:"T1",airport:{id:"airport-1",iataCode:"PEK",name:"大兴国际机场"},city:{id:"city-1",iataCode:"BJS",name:"北京",timezone:"Asia/Shanghai"}}}},n={args:{outboundFlight:u,passengerCount:1}},o={args:{outboundFlight:u,inboundFlight:S,passengerCount:1}},l={args:{outboundFlight:u,inboundFlight:S,passengerCount:3}},c={args:{outboundFlight:{...u,classType:"BUSINESS",price:"3280.00"},passengerCount:1}},d={args:{outboundFlight:{...u,classType:"FIRST",price:"5280.00"},passengerCount:1}},m={args:{outboundFlight:null,passengerCount:1}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: mockOutboundFlight,
    passengerCount: 1
  }
}`,...n.parameters?.docs?.source},description:{story:"One-way flight with single passenger",...n.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengerCount: 1
  }
}`,...o.parameters?.docs?.source},description:{story:"Round-trip flight with single passenger",...o.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengerCount: 3
  }
}`,...l.parameters?.docs?.source},description:{story:"Round-trip flight with multiple passengers",...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      classType: "BUSINESS" as const,
      price: "3280.00"
    },
    passengerCount: 1
  }
}`,...c.parameters?.docs?.source},description:{story:"Business class flight",...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      classType: "FIRST" as const,
      price: "5280.00"
    },
    passengerCount: 1
  }
}`,...d.parameters?.docs?.source},description:{story:"First class flight",...d.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    outboundFlight: null,
    passengerCount: 1
  }
}`,...m.parameters?.docs?.source},description:{story:"No flight data (null state)",...m.parameters?.docs?.description}}};const $=["OneWay","RoundTrip","RoundTripMultiplePassengers","BusinessClass","FirstClass","NoFlight"];export{c as BusinessClass,d as FirstClass,m as NoFlight,n as OneWay,o as RoundTrip,l as RoundTripMultiplePassengers,$ as __namedExportsOrder,Y as default};
