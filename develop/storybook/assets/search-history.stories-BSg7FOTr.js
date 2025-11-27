import{u as v,j as r}from"./iframe-BTcpGzrz.js";import{B as b}from"./badge-DMWmqbia.js";import{C as L}from"./card-CW-UoI9X.js";import{f as A,p as w,c as D}from"./currency-D6RI6aWp.js";import{g as R}from"./date-7ptH87uQ.js";import{c as j}from"./utils-CBfrqCZ4.js";import{A as I}from"./arrow-left-right-Cfi2fegE.js";import{A as T}from"./arrow-right-DS_3qoNI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CS2SUhPe.js";import"./index-CdJFUDDL.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./addDays-qjdbre-_.js";import"./createLucideIcon-Cg9RxXW5.js";function o({record:e,onClick:f}){const P=v(),y=(()=>{if(!e.lowestPriceAtSearch||!e.currentLowestPrice||e.lowestPriceAtSearch==="0"||e.currentLowestPrice==="0")return null;const t=w(e.lowestPriceAtSearch),i=w(e.currentLowestPrice),s=D(i,t);return s<0?{label:"已降价",colorClass:"bg-green-100 text-green-700"}:s>0?{label:"已涨价",colorClass:"bg-red-100 text-red-700"}:{label:"价格稳定",colorClass:"bg-gray-100 text-gray-600"}})(),S=t=>{const i=new Date(t),s=R(i);return`${t} ${s}`},k=(t,i)=>{const[,s,N]=t.split("-");return`${s}-${N} ${i==="departure"?"去":"回"}`},x=()=>{if(f){f();return}const t=new URLSearchParams;t.set("tripType",e.tripType),t.set("from",e.departureCityIata),t.set("to",e.arrivalCityIata),t.set("departDate",e.departureDate),e.returnDate&&t.set("returnDate",e.returnDate),t.set("class",e.seatClass),P.push(`/flights/search?${t.toString()}`)};return r.jsx(L,{className:"p-4 hover:shadow-lg transition-shadow cursor-pointer max-w-2xl",onClick:x,children:r.jsxs("div",{className:"flex items-start justify-between gap-4",children:[r.jsxs("div",{className:"flex-1 space-y-2",children:[r.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[r.jsx("span",{className:"text-lg font-semibold whitespace-nowrap",children:e.departureCityName}),e.tripType==="round-trip"?r.jsx(I,{className:"h-4 w-4 text-gray-400 shrink-0"}):r.jsx(T,{className:"h-4 w-4 text-gray-400 shrink-0"}),r.jsx("span",{className:"text-lg font-semibold whitespace-nowrap",children:e.arrivalCityName})]}),r.jsx("div",{className:"text-sm text-gray-500 whitespace-nowrap",children:e.tripType==="one-way"?r.jsx("span",{children:S(e.departureDate)}):r.jsxs("span",{children:[k(e.departureDate,"departure"),"  ",e.returnDate&&k(e.returnDate,"return")]})})]}),e.currentLowestPrice&&e.currentLowestPrice!=="0"&&r.jsxs("div",{className:"text-right space-y-1 shrink-0",children:[r.jsxs("div",{className:"text-xl font-bold text-orange-500",children:["¥",A(Math.round(w(e.currentLowestPrice).value)),r.jsx("span",{className:"text-xs font-normal text-gray-500 ml-1",children:"起"})]}),y&&r.jsx(b,{variant:"secondary",className:j("text-xs hover:bg-gray-100",y.colorClass),children:y.label})]})]})})}o.__docgenInfo={description:"",methods:[],displayName:"FlightSearchHistoryCard",props:{record:{required:!0,tsType:{name:"SearchHistoryRecord"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler for Storybook or custom behavior"}}};const K={title:"Flights/Search/FlightSearchHistoryCard",component:o,parameters:{layout:"centered",nextjs:{appDirectory:!0}},tags:["autodocs"],argTypes:{record:{description:"Search history record data"},onClick:{description:"Optional click handler",action:"clicked"}}},a={id:"1",departureCityIata:"SHA",departureCityName:"上海",arrivalCityIata:"BJS",arrivalCityName:"北京",tripType:"one-way",departureDate:"2025-10-30",returnDate:null,seatClass:"economy",lowestPriceAtSearch:"1200.00",currentLowestPrice:"1200.00",lastSearchedAt:new Date("2025-10-30T10:00:00Z")},n={args:{record:a,onClick:()=>console.log("Clicked: One-way flight to Beijing")}},c={args:{record:{...a,id:"2",tripType:"round-trip",departureDate:"2025-10-30",returnDate:"2025-11-02",lowestPriceAtSearch:"2400.00",currentLowestPrice:"2400.00"},onClick:()=>console.log("Clicked: Round-trip flight")}},l={args:{record:{...a,id:"3",lowestPriceAtSearch:"1500.00",currentLowestPrice:"1200.00"},onClick:()=>console.log("Clicked: Price decreased flight")}},d={args:{record:{...a,id:"4",lowestPriceAtSearch:"1200.00",currentLowestPrice:"1500.00"},onClick:()=>console.log("Clicked: Price increased flight")}},p={args:{record:{...a,id:"5",departureCityName:"深圳",arrivalCityName:"成都",departureCityIata:"SZX",arrivalCityIata:"CTU"},onClick:()=>console.log("Clicked: Different route flight")}},u={args:{record:{...a,id:"6",seatClass:"business",lowestPriceAtSearch:"3500.00",currentLowestPrice:"3200.00"},onClick:()=>console.log("Clicked: Business class flight")}},C={args:{record:{...a,id:"7",seatClass:"first",lowestPriceAtSearch:"8000.00",currentLowestPrice:"8000.00"},onClick:()=>console.log("Clicked: First class flight")}},m={args:{record:{...a,id:"8",lowestPriceAtSearch:null,currentLowestPrice:null},onClick:()=>console.log("Clicked: No price data flight")}},g={args:{record:{...a,id:"9",departureCityName:"乌鲁木齐",arrivalCityName:"哈尔滨",departureCityIata:"URC",arrivalCityIata:"HRB"},onClick:()=>console.log("Clicked: Long city names flight")}},h={render:()=>r.jsxs("div",{className:"w-full max-w-4xl space-y-3 p-4",children:[r.jsx(o,{record:{...a,id:"1",lowestPriceAtSearch:"1500.00",currentLowestPrice:"1200.00"},onClick:()=>console.log("Clicked: Card 1")}),r.jsx(o,{record:{...a,id:"2",departureCityName:"北京",arrivalCityName:"广州",departureCityIata:"BJS",arrivalCityIata:"CAN",tripType:"round-trip",returnDate:"2025-11-10",lowestPriceAtSearch:"2400.00",currentLowestPrice:"2600.00"},onClick:()=>console.log("Clicked: Card 2")}),r.jsx(o,{record:{...a,id:"3",departureCityName:"深圳",arrivalCityName:"成都",departureCityIata:"SZX",arrivalCityIata:"CTU",seatClass:"business",lowestPriceAtSearch:"3200.00",currentLowestPrice:"3200.00"},onClick:()=>console.log("Clicked: Card 3")})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    record: baseRecord,
    onClick: () => console.log("Clicked: One-way flight to Beijing")
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "2",
      tripType: "round-trip",
      departureDate: "2025-10-30",
      returnDate: "2025-11-02",
      lowestPriceAtSearch: "2400.00",
      currentLowestPrice: "2400.00"
    },
    onClick: () => console.log("Clicked: Round-trip flight")
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "3",
      lowestPriceAtSearch: "1500.00",
      currentLowestPrice: "1200.00"
    },
    onClick: () => console.log("Clicked: Price decreased flight")
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "4",
      lowestPriceAtSearch: "1200.00",
      currentLowestPrice: "1500.00"
    },
    onClick: () => console.log("Clicked: Price increased flight")
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "5",
      departureCityName: "深圳",
      arrivalCityName: "成都",
      departureCityIata: "SZX",
      arrivalCityIata: "CTU"
    },
    onClick: () => console.log("Clicked: Different route flight")
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "6",
      seatClass: "business",
      lowestPriceAtSearch: "3500.00",
      currentLowestPrice: "3200.00"
    },
    onClick: () => console.log("Clicked: Business class flight")
  }
}`,...u.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "7",
      seatClass: "first",
      lowestPriceAtSearch: "8000.00",
      currentLowestPrice: "8000.00"
    },
    onClick: () => console.log("Clicked: First class flight")
  }
}`,...C.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "8",
      lowestPriceAtSearch: null,
      currentLowestPrice: null
    },
    onClick: () => console.log("Clicked: No price data flight")
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "9",
      departureCityName: "乌鲁木齐",
      arrivalCityName: "哈尔滨",
      departureCityIata: "URC",
      arrivalCityIata: "HRB"
    },
    onClick: () => console.log("Clicked: Long city names flight")
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-4xl space-y-3 p-4">
      <FlightSearchHistoryCard record={{
      ...baseRecord,
      id: "1",
      lowestPriceAtSearch: "1500.00",
      currentLowestPrice: "1200.00"
    }} onClick={() => console.log("Clicked: Card 1")} />
      <FlightSearchHistoryCard record={{
      ...baseRecord,
      id: "2",
      departureCityName: "北京",
      arrivalCityName: "广州",
      departureCityIata: "BJS",
      arrivalCityIata: "CAN",
      tripType: "round-trip",
      returnDate: "2025-11-10",
      lowestPriceAtSearch: "2400.00",
      currentLowestPrice: "2600.00"
    }} onClick={() => console.log("Clicked: Card 2")} />
      <FlightSearchHistoryCard record={{
      ...baseRecord,
      id: "3",
      departureCityName: "深圳",
      arrivalCityName: "成都",
      departureCityIata: "SZX",
      arrivalCityIata: "CTU",
      seatClass: "business",
      lowestPriceAtSearch: "3200.00",
      currentLowestPrice: "3200.00"
    }} onClick={() => console.log("Clicked: Card 3")} />
    </div>
}`,...h.parameters?.docs?.source}}};const Q=["OneWayFlight","RoundTripFlight","PriceDecreased","PriceIncreased","DifferentRoute","BusinessClass","FirstClass","NoPriceData","LongCityNames","MultipleCards"];export{u as BusinessClass,p as DifferentRoute,C as FirstClass,g as LongCityNames,h as MultipleCards,m as NoPriceData,n as OneWayFlight,l as PriceDecreased,d as PriceIncreased,c as RoundTripFlight,Q as __namedExportsOrder,K as default};
