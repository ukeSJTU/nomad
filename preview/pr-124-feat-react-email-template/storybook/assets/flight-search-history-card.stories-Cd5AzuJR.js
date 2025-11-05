import{u as N,j as r}from"./iframe-Cg6PN8iW.js";import{B as v}from"./badge-cCx1uYhL.js";import{C as b}from"./card-nNbMk8pM.js";import{c as L}from"./utils-CBfrqCZ4.js";import{g as A}from"./date-CMC-sB4N.js";import{A as D}from"./arrow-left-right-D4XJJhHI.js";import{A as R}from"./arrow-right-DizYEGL5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CNVfEI5w.js";import"./index-CdJFUDDL.js";import"./createLucideIcon-BvQKqp3U.js";function i({record:e,onClick:w}){const k=N(),h=(()=>{if(!e.lowestPriceAtSearch||!e.currentLowestPrice||e.lowestPriceAtSearch==="0"||e.currentLowestPrice==="0")return null;const t=parseFloat(e.lowestPriceAtSearch),s=parseFloat(e.currentLowestPrice);return s<t?{label:"已降价",colorClass:"bg-green-100 text-green-700"}:s>t?{label:"已涨价",colorClass:"bg-red-100 text-red-700"}:{label:"价格稳定",colorClass:"bg-gray-100 text-gray-600"}})(),P=t=>{const s=new Date(t),y=A(s);return`${t} ${y}`},f=(t,s)=>{const[,y,x]=t.split("-");return`${y}-${x} ${s==="departure"?"去":"回"}`},S=()=>{if(w){w();return}const t=new URLSearchParams;t.set("tripType",e.tripType),t.set("from",e.departureCityIata),t.set("to",e.arrivalCityIata),t.set("departDate",e.departureDate),e.returnDate&&t.set("returnDate",e.returnDate),t.set("class",e.seatClass),k.push(`/flights/search?${t.toString()}`)};return r.jsx(b,{className:"p-4 hover:shadow-lg transition-shadow cursor-pointer max-w-2xl",onClick:S,children:r.jsxs("div",{className:"flex items-start justify-between gap-4",children:[r.jsxs("div",{className:"flex-1 space-y-2",children:[r.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[r.jsx("span",{className:"text-lg font-semibold whitespace-nowrap",children:e.departureCityName}),e.tripType==="round-trip"?r.jsx(D,{className:"h-4 w-4 text-gray-400 shrink-0"}):r.jsx(R,{className:"h-4 w-4 text-gray-400 shrink-0"}),r.jsx("span",{className:"text-lg font-semibold whitespace-nowrap",children:e.arrivalCityName})]}),r.jsx("div",{className:"text-sm text-gray-500 whitespace-nowrap",children:e.tripType==="one-way"?r.jsx("span",{children:P(e.departureDate)}):r.jsxs("span",{children:[f(e.departureDate,"departure"),"  ",e.returnDate&&f(e.returnDate,"return")]})})]}),e.currentLowestPrice&&e.currentLowestPrice!=="0"&&r.jsxs("div",{className:"text-right space-y-1 shrink-0",children:[r.jsxs("div",{className:"text-xl font-bold text-orange-500",children:["¥",parseFloat(e.currentLowestPrice).toFixed(0),r.jsx("span",{className:"text-xs font-normal text-gray-500 ml-1",children:"起"})]}),h&&r.jsx(v,{variant:"secondary",className:L("text-xs hover:bg-gray-100",h.colorClass),children:h.label})]})]})})}i.__docgenInfo={description:"",methods:[],displayName:"FlightSearchHistoryCard",props:{record:{required:!0,tsType:{name:"SearchHistoryRecord"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler for Storybook or custom behavior"}}};const J={title:"Flights/FlightSearchHistoryCard",component:i,parameters:{layout:"centered",nextjs:{appDirectory:!0}},tags:["autodocs"],argTypes:{record:{description:"Search history record data"},onClick:{description:"Optional click handler",action:"clicked"}}},a={id:"1",departureCityIata:"SHA",departureCityName:"上海",arrivalCityIata:"BJS",arrivalCityName:"北京",tripType:"one-way",departureDate:"2025-10-30",returnDate:null,seatClass:"economy",lowestPriceAtSearch:"1200.00",currentLowestPrice:"1200.00",lastSearchedAt:new Date("2025-10-30T10:00:00Z")},o={args:{record:a,onClick:()=>console.log("Clicked: One-way flight to Beijing")}},n={args:{record:{...a,id:"2",tripType:"round-trip",departureDate:"2025-10-30",returnDate:"2025-11-02",lowestPriceAtSearch:"2400.00",currentLowestPrice:"2400.00"},onClick:()=>console.log("Clicked: Round-trip flight")}},c={args:{record:{...a,id:"3",lowestPriceAtSearch:"1500.00",currentLowestPrice:"1200.00"},onClick:()=>console.log("Clicked: Price decreased flight")}},l={args:{record:{...a,id:"4",lowestPriceAtSearch:"1200.00",currentLowestPrice:"1500.00"},onClick:()=>console.log("Clicked: Price increased flight")}},d={args:{record:{...a,id:"5",departureCityName:"深圳",arrivalCityName:"成都",departureCityIata:"SZX",arrivalCityIata:"CTU"},onClick:()=>console.log("Clicked: Different route flight")}},p={args:{record:{...a,id:"6",seatClass:"business",lowestPriceAtSearch:"3500.00",currentLowestPrice:"3200.00"},onClick:()=>console.log("Clicked: Business class flight")}},u={args:{record:{...a,id:"7",seatClass:"first",lowestPriceAtSearch:"8000.00",currentLowestPrice:"8000.00"},onClick:()=>console.log("Clicked: First class flight")}},C={args:{record:{...a,id:"8",lowestPriceAtSearch:null,currentLowestPrice:null},onClick:()=>console.log("Clicked: No price data flight")}},m={args:{record:{...a,id:"9",departureCityName:"乌鲁木齐",arrivalCityName:"哈尔滨",departureCityIata:"URC",arrivalCityIata:"HRB"},onClick:()=>console.log("Clicked: Long city names flight")}},g={render:()=>r.jsxs("div",{className:"w-full max-w-4xl space-y-3 p-4",children:[r.jsx(i,{record:{...a,id:"1",lowestPriceAtSearch:"1500.00",currentLowestPrice:"1200.00"},onClick:()=>console.log("Clicked: Card 1")}),r.jsx(i,{record:{...a,id:"2",departureCityName:"北京",arrivalCityName:"广州",departureCityIata:"BJS",arrivalCityIata:"CAN",tripType:"round-trip",returnDate:"2025-11-10",lowestPriceAtSearch:"2400.00",currentLowestPrice:"2600.00"},onClick:()=>console.log("Clicked: Card 2")}),r.jsx(i,{record:{...a,id:"3",departureCityName:"深圳",arrivalCityName:"成都",departureCityIata:"SZX",arrivalCityIata:"CTU",seatClass:"business",lowestPriceAtSearch:"3200.00",currentLowestPrice:"3200.00"},onClick:()=>console.log("Clicked: Card 3")})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    record: baseRecord,
    onClick: () => console.log("Clicked: One-way flight to Beijing")
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "3",
      lowestPriceAtSearch: "1500.00",
      currentLowestPrice: "1200.00"
    },
    onClick: () => console.log("Clicked: Price decreased flight")
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "4",
      lowestPriceAtSearch: "1200.00",
      currentLowestPrice: "1500.00"
    },
    onClick: () => console.log("Clicked: Price increased flight")
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "8",
      lowestPriceAtSearch: null,
      currentLowestPrice: null
    },
    onClick: () => console.log("Clicked: No price data flight")
  }
}`,...C.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const q=["OneWayFlight","RoundTripFlight","PriceDecreased","PriceIncreased","DifferentRoute","BusinessClass","FirstClass","NoPriceData","LongCityNames","MultipleCards"];export{p as BusinessClass,d as DifferentRoute,u as FirstClass,m as LongCityNames,g as MultipleCards,C as NoPriceData,o as OneWayFlight,c as PriceDecreased,l as PriceIncreased,n as RoundTripFlight,q as __namedExportsOrder,J as default};
