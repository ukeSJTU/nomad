import{j as q}from"./iframe-CrLPMyef.js";import{F as D}from"./passenger-form-card-C9bdvbuf.js";import"./separator-BFZTMdF7.js";import"./card-D-d6dHIy.js";import"./alert-Dl9eybxG.js";import"./label-Dee_xcgp.js";import"./radio-group-DGFoeLVx.js";import{f as V}from"./currency-D-0V2y_1.js";import{f as G}from"./date-B_yz1xN0.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B2BMd2ZM.js";import"./index-DLC0D_9l.js";import"./index-CCw5U8u4.js";import"./createLucideIcon-DzaTpkcS.js";import"./index-C5LsBHvz.js";import"./index-B9BpXIRB.js";import"./chevron-down-B5Itlma0.js";import"./checkbox-hlzRasDL.js";import"./index-CXICuE6m.js";import"./index-3_PNoCtV.js";import"./check-DD9V9MZB.js";import"./input-CBtiA9j3.js";import"./platform-DKvuCmmd.js";import"./clock-F2jEp9km.js";import"./button-C49Jt41H.js";import"./select-Czr0wEv_.js";import"./index-DBYj_96i.js";import"./index-BmOx0rIh.js";import"./index-Bzbtinzm.js";import"./index-DCZN-NHZ.js";import"./x-DszoDRII.js";import"./index-E-CxifyW.js";import"./currency.es-BSkspdt3.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./addDays-qjdbre-_.js";function w({outboundFlight:x,inboundFlight:Z,passengerCount:j=1}){return q.jsx(D,{outboundFlight:x,inboundFlight:Z,passengerCount:j,formatCurrency:V,formatDateWithWeekday:G})}w.__docgenInfo={description:"",methods:[],displayName:"FlightSummaryCard",props:{outboundFlight:{required:!0,tsType:{name:"union",raw:"PassengerPageFlight | null",elements:[{name:"PassengerPageFlight"},{name:"null"}]},description:""},inboundFlight:{required:!1,tsType:{name:"union",raw:"PassengerPageFlight | null",elements:[{name:"PassengerPageFlight"},{name:"null"}]},description:""},passengerCount:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}}}};var n,d,l,p,u,m,c,g,_,h,v,F,C,y,f,T,b,S,O,P,R,B,M,N,k,U,W,A,E,I;const Re={title:"Flights/Booking/FlightSummaryCard",component:w,parameters:{layout:"padded"},tags:["autodocs"]},t={id:"seat-class-1",classType:"ECONOMY",price:"1280.00",availableSeats:50,totalSeats:100,flight:{id:"flight-1",flightNumber:"MU5186",aircraftType:"330",airline:{id:"airline-1",name:"东方航空",iataCode:"MU",logoUrl:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff&size=256&bold=true&rounded=true&format=svg"},departure:{datetime:"2025-01-18T07:30:00Z",terminal:"T1",airport:{id:"airport-1",iataCode:"PEK",name:"大兴国际机场"},city:{id:"city-1",iataCode:"BJS",name:"北京",timezone:"Asia/Shanghai"}},arrival:{datetime:"2025-01-18T09:45:00Z",terminal:"T1",airport:{id:"airport-2",iataCode:"PVG",name:"浦东国际机场T1"},city:{id:"city-2",iataCode:"SHA",name:"上海",timezone:"Asia/Shanghai"}}}},z={id:"seat-class-2",classType:"ECONOMY",price:"1350.00",availableSeats:45,totalSeats:100,flight:{id:"flight-2",flightNumber:"MU5187",aircraftType:"330",airline:{id:"airline-1",name:"东方航空",iataCode:"MU",logoUrl:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff&size=256&bold=true&rounded=true&format=svg"},departure:{datetime:"2025-01-25T14:30:00Z",terminal:"T1",airport:{id:"airport-2",iataCode:"PVG",name:"浦东国际机场T1"},city:{id:"city-2",iataCode:"SHA",name:"上海",timezone:"Asia/Shanghai"}},arrival:{datetime:"2025-01-25T16:45:00Z",terminal:"T1",airport:{id:"airport-1",iataCode:"PEK",name:"大兴国际机场"},city:{id:"city-1",iataCode:"BJS",name:"北京",timezone:"Asia/Shanghai"}}}},e={args:{outboundFlight:t,passengerCount:1}},r={args:{outboundFlight:t,inboundFlight:z,passengerCount:1}},a={args:{outboundFlight:t,inboundFlight:z,passengerCount:3}},s={args:{outboundFlight:{...t,classType:"BUSINESS",price:"3280.00"},passengerCount:1}},i={args:{outboundFlight:{...t,classType:"FIRST",price:"5280.00"},passengerCount:1}},o={args:{outboundFlight:null,passengerCount:1}};e.parameters={...e.parameters,docs:{...(n=e.parameters)===null||n===void 0?void 0:n.docs,source:{originalSource:`{
  args: {
    outboundFlight: mockOutboundFlight,
    passengerCount: 1
  }
}`,...(l=e.parameters)===null||l===void 0||(d=l.docs)===null||d===void 0?void 0:d.source},description:{story:"One-way flight with single passenger",...(u=e.parameters)===null||u===void 0||(p=u.docs)===null||p===void 0?void 0:p.description}}};r.parameters={...r.parameters,docs:{...(m=r.parameters)===null||m===void 0?void 0:m.docs,source:{originalSource:`{
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengerCount: 1
  }
}`,...(g=r.parameters)===null||g===void 0||(c=g.docs)===null||c===void 0?void 0:c.source},description:{story:"Round-trip flight with single passenger",...(h=r.parameters)===null||h===void 0||(_=h.docs)===null||_===void 0?void 0:_.description}}};a.parameters={...a.parameters,docs:{...(v=a.parameters)===null||v===void 0?void 0:v.docs,source:{originalSource:`{
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengerCount: 3
  }
}`,...(C=a.parameters)===null||C===void 0||(F=C.docs)===null||F===void 0?void 0:F.source},description:{story:"Round-trip flight with multiple passengers",...(f=a.parameters)===null||f===void 0||(y=f.docs)===null||y===void 0?void 0:y.description}}};s.parameters={...s.parameters,docs:{...(T=s.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      classType: "BUSINESS" as const,
      price: "3280.00"
    },
    passengerCount: 1
  }
}`,...(S=s.parameters)===null||S===void 0||(b=S.docs)===null||b===void 0?void 0:b.source},description:{story:"Business class flight",...(P=s.parameters)===null||P===void 0||(O=P.docs)===null||O===void 0?void 0:O.description}}};i.parameters={...i.parameters,docs:{...(R=i.parameters)===null||R===void 0?void 0:R.docs,source:{originalSource:`{
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      classType: "FIRST" as const,
      price: "5280.00"
    },
    passengerCount: 1
  }
}`,...(M=i.parameters)===null||M===void 0||(B=M.docs)===null||B===void 0?void 0:B.source},description:{story:"First class flight",...(k=i.parameters)===null||k===void 0||(N=k.docs)===null||N===void 0?void 0:N.description}}};o.parameters={...o.parameters,docs:{...(U=o.parameters)===null||U===void 0?void 0:U.docs,source:{originalSource:`{
  args: {
    outboundFlight: null,
    passengerCount: 1
  }
}`,...(A=o.parameters)===null||A===void 0||(W=A.docs)===null||W===void 0?void 0:W.source},description:{story:"No flight data (null state)",...(I=o.parameters)===null||I===void 0||(E=I.docs)===null||E===void 0?void 0:E.description}}};const Be=["OneWay","RoundTrip","RoundTripMultiplePassengers","BusinessClass","FirstClass","NoFlight"];export{s as BusinessClass,i as FirstClass,o as NoFlight,e as OneWay,r as RoundTrip,a as RoundTripMultiplePassengers,Be as __namedExportsOrder,Re as default};
