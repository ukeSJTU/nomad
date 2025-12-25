import{u as v,j as r}from"./iframe-BmUIunq3.js";import{B as b}from"./badge-TerKhNVk.js";import{C as A}from"./card-Dr32iszQ.js";import{f as D,p as w,c as R}from"./currency-DgZtjahG.js";import{g as j}from"./date-7ptH87uQ.js";import{c as I}from"./utils-CBfrqCZ4.js";import{A as T}from"./arrow-left-right-D_UOfyZM.js";import{A as F}from"./arrow-right-IjKyw0Gm.js";import{s as a}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D3AicU6b.js";import"./index-CdJFUDDL.js";import"./currency.es-BSkspdt3.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./addDays-qjdbre-_.js";import"./createLucideIcon-DxHGAXvP.js";function o({record:e,onClick:k}){const S=v(),f=(()=>{if(!e.lowestPriceAtSearch||!e.currentLowestPrice||e.lowestPriceAtSearch==="0"||e.currentLowestPrice==="0")return null;const t=w(e.lowestPriceAtSearch),n=w(e.currentLowestPrice),i=R(n,t);return i<0?{label:"已降价",colorClass:"bg-green-100 text-green-700"}:i>0?{label:"已涨价",colorClass:"bg-red-100 text-red-700"}:{label:"价格稳定",colorClass:"bg-gray-100 text-gray-600"}})(),x=t=>{const n=new Date(t),i=j(n);return`${t} ${i}`},P=(t,n)=>{const[,i,N]=t.split("-");return`${i}-${N} ${n==="departure"?"去":"回"}`},L=()=>{if(k){k();return}const t=new URLSearchParams;t.set("tripType",e.tripType),t.set("from",e.departureCityIata),t.set("to",e.arrivalCityIata),t.set("departDate",e.departureDate),e.returnDate&&t.set("returnDate",e.returnDate),t.set("class",e.seatClass),S.push(`/flights/search?${t.toString()}`)};return r.jsx(A,{className:"p-4 hover:shadow-lg transition-shadow cursor-pointer max-w-2xl",onClick:L,children:r.jsxs("div",{className:"flex items-start justify-between gap-4",children:[r.jsxs("div",{className:"flex-1 space-y-2",children:[r.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[r.jsx("span",{className:"text-lg font-semibold whitespace-nowrap",children:e.departureCityName}),e.tripType==="round-trip"?r.jsx(T,{className:"h-4 w-4 text-gray-400 shrink-0"}):r.jsx(F,{className:"h-4 w-4 text-gray-400 shrink-0"}),r.jsx("span",{className:"text-lg font-semibold whitespace-nowrap",children:e.arrivalCityName})]}),r.jsx("div",{className:"text-sm text-gray-500 whitespace-nowrap",children:e.tripType==="one-way"?r.jsx("span",{children:x(e.departureDate)}):r.jsxs("span",{children:[P(e.departureDate,"departure"),"  ",e.returnDate&&P(e.returnDate,"return")]})})]}),e.currentLowestPrice&&e.currentLowestPrice!=="0"&&r.jsxs("div",{className:"text-right space-y-1 shrink-0",children:[r.jsxs("div",{className:"text-xl font-bold text-orange-500",children:["¥",D(Math.round(w(e.currentLowestPrice).value)),r.jsx("span",{className:"text-xs font-normal text-gray-500 ml-1",children:"起"})]}),f&&r.jsx(b,{variant:"secondary",className:I("text-xs hover:bg-gray-100",f.colorClass),children:f.label})]})]})})}o.__docgenInfo={description:"",methods:[],displayName:"FlightSearchHistoryCard",props:{record:{required:!0,tsType:{name:"SearchHistoryRecord"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler for Storybook or custom behavior"}}};const Y={title:"Flights/Search/FlightSearchHistoryCard",component:o,parameters:{layout:"centered",nextjs:{appDirectory:!0}},tags:["autodocs"],argTypes:{record:{description:"Search history record data"},onClick:{description:"Optional click handler",action:"clicked"}}},s={id:"1",departureCityIata:"SHA",departureCityName:"上海",arrivalCityIata:"BJS",arrivalCityName:"北京",tripType:"one-way",departureDate:"2025-10-30",returnDate:null,seatClass:"economy",lowestPriceAtSearch:"1200.00",currentLowestPrice:"1200.00",lastSearchedAt:new Date("2025-10-30T10:00:00Z")},c={args:{record:s,onClick:()=>a.info("Clicked: One-way flight to Beijing")}},l={args:{record:{...s,id:"2",tripType:"round-trip",departureDate:"2025-10-30",returnDate:"2025-11-02",lowestPriceAtSearch:"2400.00",currentLowestPrice:"2400.00"},onClick:()=>a.info("Clicked: Round-trip flight")}},d={args:{record:{...s,id:"3",lowestPriceAtSearch:"1500.00",currentLowestPrice:"1200.00"},onClick:()=>a.info("Clicked: Price decreased flight")}},p={args:{record:{...s,id:"4",lowestPriceAtSearch:"1200.00",currentLowestPrice:"1500.00"},onClick:()=>a.info("Clicked: Price increased flight")}},u={args:{record:{...s,id:"5",departureCityName:"深圳",arrivalCityName:"成都",departureCityIata:"SZX",arrivalCityIata:"CTU"},onClick:()=>a.info("Clicked: Different route flight")}},m={args:{record:{...s,id:"6",seatClass:"business",lowestPriceAtSearch:"3500.00",currentLowestPrice:"3200.00"},onClick:()=>a.info("Clicked: Business class flight")}},C={args:{record:{...s,id:"7",seatClass:"first",lowestPriceAtSearch:"8000.00",currentLowestPrice:"8000.00"},onClick:()=>a.info("Clicked: First class flight")}},g={args:{record:{...s,id:"8",lowestPriceAtSearch:null,currentLowestPrice:null},onClick:()=>a.info("Clicked: No price data flight")}},y={args:{record:{...s,id:"9",departureCityName:"乌鲁木齐",arrivalCityName:"哈尔滨",departureCityIata:"URC",arrivalCityIata:"HRB"},onClick:()=>a.info("Clicked: Long city names flight")}},h={render:()=>r.jsxs("div",{className:"w-full max-w-4xl space-y-3 p-4",children:[r.jsx(o,{record:{...s,id:"1",lowestPriceAtSearch:"1500.00",currentLowestPrice:"1200.00"},onClick:()=>a.info("Clicked: Card 1")}),r.jsx(o,{record:{...s,id:"2",departureCityName:"北京",arrivalCityName:"广州",departureCityIata:"BJS",arrivalCityIata:"CAN",tripType:"round-trip",returnDate:"2025-11-10",lowestPriceAtSearch:"2400.00",currentLowestPrice:"2600.00"},onClick:()=>a.info("Clicked: Card 2")}),r.jsx(o,{record:{...s,id:"3",departureCityName:"深圳",arrivalCityName:"成都",departureCityIata:"SZX",arrivalCityIata:"CTU",seatClass:"business",lowestPriceAtSearch:"3200.00",currentLowestPrice:"3200.00"},onClick:()=>a.info("Clicked: Card 3")})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    record: baseRecord,
    onClick: () => storyLogger.info("Clicked: One-way flight to Beijing")
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
    onClick: () => storyLogger.info("Clicked: Round-trip flight")
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "3",
      lowestPriceAtSearch: "1500.00",
      currentLowestPrice: "1200.00"
    },
    onClick: () => storyLogger.info("Clicked: Price decreased flight")
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "4",
      lowestPriceAtSearch: "1200.00",
      currentLowestPrice: "1500.00"
    },
    onClick: () => storyLogger.info("Clicked: Price increased flight")
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "5",
      departureCityName: "深圳",
      arrivalCityName: "成都",
      departureCityIata: "SZX",
      arrivalCityIata: "CTU"
    },
    onClick: () => storyLogger.info("Clicked: Different route flight")
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "6",
      seatClass: "business",
      lowestPriceAtSearch: "3500.00",
      currentLowestPrice: "3200.00"
    },
    onClick: () => storyLogger.info("Clicked: Business class flight")
  }
}`,...m.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "7",
      seatClass: "first",
      lowestPriceAtSearch: "8000.00",
      currentLowestPrice: "8000.00"
    },
    onClick: () => storyLogger.info("Clicked: First class flight")
  }
}`,...C.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "8",
      lowestPriceAtSearch: null,
      currentLowestPrice: null
    },
    onClick: () => storyLogger.info("Clicked: No price data flight")
  }
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "9",
      departureCityName: "乌鲁木齐",
      arrivalCityName: "哈尔滨",
      departureCityIata: "URC",
      arrivalCityIata: "HRB"
    },
    onClick: () => storyLogger.info("Clicked: Long city names flight")
  }
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-4xl space-y-3 p-4">
      <FlightSearchHistoryCard record={{
      ...baseRecord,
      id: "1",
      lowestPriceAtSearch: "1500.00",
      currentLowestPrice: "1200.00"
    }} onClick={() => storyLogger.info("Clicked: Card 1")} />
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
    }} onClick={() => storyLogger.info("Clicked: Card 2")} />
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
    }} onClick={() => storyLogger.info("Clicked: Card 3")} />
    </div>
}`,...h.parameters?.docs?.source}}};const ee=["OneWayFlight","RoundTripFlight","PriceDecreased","PriceIncreased","DifferentRoute","BusinessClass","FirstClass","NoPriceData","LongCityNames","MultipleCards"];export{m as BusinessClass,u as DifferentRoute,C as FirstClass,y as LongCityNames,h as MultipleCards,g as NoPriceData,c as OneWayFlight,d as PriceDecreased,p as PriceIncreased,l as RoundTripFlight,ee as __namedExportsOrder,Y as default};
