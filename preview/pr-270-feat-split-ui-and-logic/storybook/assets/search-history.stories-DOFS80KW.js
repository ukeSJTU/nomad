import{u as ae,j as r}from"./iframe-DnZgF7bs.js";import{B as te}from"./badge-BfY5-9Ff.js";import{C as se}from"./card-4k7uV6oA.js";import{c as ie}from"./utils-CDN07tui.js";import{f as oe,p as f,c as ne}from"./currency-DgZtjahG.js";import{g as ce}from"./date-7ptH87uQ.js";import{A as le}from"./arrow-left-right-BKmJHNmm.js";import{A as de}from"./arrow-right-Chb18jg7.js";import{s as t}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BMzLOmL9.js";import"./index-B_jtOnfb.js";import"./currency.es-BSkspdt3.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./addDays-qjdbre-_.js";import"./createLucideIcon-DqjoOZ7r.js";function n({record:e,onClick:K}){const V=ae(),v=(()=>{if(!e.lowestPriceAtSearch||!e.currentLowestPrice||e.lowestPriceAtSearch==="0"||e.currentLowestPrice==="0")return null;const a=f(e.lowestPriceAtSearch),o=f(e.currentLowestPrice),i=ne(o,a);return i<0?{label:"已降价",colorClass:"bg-green-100 text-green-700"}:i>0?{label:"已涨价",colorClass:"bg-red-100 text-red-700"}:{label:"价格稳定",colorClass:"bg-gray-100 text-gray-600"}})(),Y=a=>{const o=new Date(a),i=ce(o);return`${a} ${i}`},Q=(a,o)=>{const[,i,re]=a.split("-");return`${i}-${re} ${o==="departure"?"去":"回"}`},ee=()=>{if(K){K();return}const a=new URLSearchParams;a.set("tripType",e.tripType),a.set("from",e.departureCityIata),a.set("to",e.arrivalCityIata),a.set("departDate",e.departureDate),e.returnDate&&a.set("returnDate",e.returnDate),a.set("class",e.seatClass),V.push(`/flights/search?${a.toString()}`)};return r.jsx(se,{className:"p-4 hover:shadow-lg transition-shadow cursor-pointer max-w-2xl",onClick:ee,children:r.jsxs("div",{className:"flex items-start justify-between gap-4",children:[r.jsxs("div",{className:"flex-1 space-y-2",children:[r.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[r.jsx("span",{className:"text-lg font-semibold whitespace-nowrap",children:e.departureCityName}),e.tripType==="round-trip"?r.jsx(le,{className:"h-4 w-4 text-gray-400 shrink-0"}):r.jsx(de,{className:"h-4 w-4 text-gray-400 shrink-0"}),r.jsx("span",{className:"text-lg font-semibold whitespace-nowrap",children:e.arrivalCityName})]}),r.jsx("div",{className:"text-sm text-gray-500 whitespace-nowrap",children:e.tripType==="one-way"?r.jsx("span",{children:Y(e.departureDate)}):r.jsxs("span",{children:[Q(e.departureDate,"departure"),"  ",e.returnDate&&Q(e.returnDate,"return")]})})]}),e.currentLowestPrice&&e.currentLowestPrice!=="0"&&r.jsxs("div",{className:"text-right space-y-1 shrink-0",children:[r.jsxs("div",{className:"text-xl font-bold text-orange-500",children:["¥",oe(Math.round(f(e.currentLowestPrice).value)),r.jsx("span",{className:"text-xs font-normal text-gray-500 ml-1",children:"起"})]}),v&&r.jsx(te,{variant:"secondary",className:ie("text-xs hover:bg-gray-100",v.colorClass),children:v.label})]})]})})}n.__docgenInfo={description:"",methods:[],displayName:"FlightSearchHistoryCard",props:{record:{required:!0,tsType:{name:"SearchHistoryRecord"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Optional click handler for Storybook or custom behavior"}}};var w,_,P,k,S,x,N,L,D,R,b,A,I,j,F,T,B,O,H,W,U,M,$,Z,X,J,q,E,z,G;const Re={title:"Flights/Search/FlightSearchHistoryCard",component:n,parameters:{layout:"centered",nextjs:{appDirectory:!0}},tags:["autodocs"],argTypes:{record:{description:"Search history record data"},onClick:{description:"Optional click handler",action:"clicked"}}},s={id:"1",departureCityIata:"SHA",departureCityName:"上海",arrivalCityIata:"BJS",arrivalCityName:"北京",tripType:"one-way",departureDate:"2025-10-30",returnDate:null,seatClass:"economy",lowestPriceAtSearch:"1200.00",currentLowestPrice:"1200.00",lastSearchedAt:new Date("2025-10-30T10:00:00Z")},c={args:{record:s,onClick:()=>t.info("Clicked: One-way flight to Beijing")}},l={args:{record:{...s,id:"2",tripType:"round-trip",departureDate:"2025-10-30",returnDate:"2025-11-02",lowestPriceAtSearch:"2400.00",currentLowestPrice:"2400.00"},onClick:()=>t.info("Clicked: Round-trip flight")}},d={args:{record:{...s,id:"3",lowestPriceAtSearch:"1500.00",currentLowestPrice:"1200.00"},onClick:()=>t.info("Clicked: Price decreased flight")}},u={args:{record:{...s,id:"4",lowestPriceAtSearch:"1200.00",currentLowestPrice:"1500.00"},onClick:()=>t.info("Clicked: Price increased flight")}},p={args:{record:{...s,id:"5",departureCityName:"深圳",arrivalCityName:"成都",departureCityIata:"SZX",arrivalCityIata:"CTU"},onClick:()=>t.info("Clicked: Different route flight")}},m={args:{record:{...s,id:"6",seatClass:"business",lowestPriceAtSearch:"3500.00",currentLowestPrice:"3200.00"},onClick:()=>t.info("Clicked: Business class flight")}},C={args:{record:{...s,id:"7",seatClass:"first",lowestPriceAtSearch:"8000.00",currentLowestPrice:"8000.00"},onClick:()=>t.info("Clicked: First class flight")}},g={args:{record:{...s,id:"8",lowestPriceAtSearch:null,currentLowestPrice:null},onClick:()=>t.info("Clicked: No price data flight")}},y={args:{record:{...s,id:"9",departureCityName:"乌鲁木齐",arrivalCityName:"哈尔滨",departureCityIata:"URC",arrivalCityIata:"HRB"},onClick:()=>t.info("Clicked: Long city names flight")}},h={render:()=>r.jsxs("div",{className:"w-full max-w-4xl space-y-3 p-4",children:[r.jsx(n,{record:{...s,id:"1",lowestPriceAtSearch:"1500.00",currentLowestPrice:"1200.00"},onClick:()=>t.info("Clicked: Card 1")}),r.jsx(n,{record:{...s,id:"2",departureCityName:"北京",arrivalCityName:"广州",departureCityIata:"BJS",arrivalCityIata:"CAN",tripType:"round-trip",returnDate:"2025-11-10",lowestPriceAtSearch:"2400.00",currentLowestPrice:"2600.00"},onClick:()=>t.info("Clicked: Card 2")}),r.jsx(n,{record:{...s,id:"3",departureCityName:"深圳",arrivalCityName:"成都",departureCityIata:"SZX",arrivalCityIata:"CTU",seatClass:"business",lowestPriceAtSearch:"3200.00",currentLowestPrice:"3200.00"},onClick:()=>t.info("Clicked: Card 3")})]})};c.parameters={...c.parameters,docs:{...(w=c.parameters)===null||w===void 0?void 0:w.docs,source:{originalSource:`{
  args: {
    record: baseRecord,
    onClick: () => storyLogger.info("Clicked: One-way flight to Beijing")
  }
}`,...(P=c.parameters)===null||P===void 0||(_=P.docs)===null||_===void 0?void 0:_.source}}};l.parameters={...l.parameters,docs:{...(k=l.parameters)===null||k===void 0?void 0:k.docs,source:{originalSource:`{
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
}`,...(x=l.parameters)===null||x===void 0||(S=x.docs)===null||S===void 0?void 0:S.source}}};d.parameters={...d.parameters,docs:{...(N=d.parameters)===null||N===void 0?void 0:N.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "3",
      lowestPriceAtSearch: "1500.00",
      currentLowestPrice: "1200.00"
    },
    onClick: () => storyLogger.info("Clicked: Price decreased flight")
  }
}`,...(D=d.parameters)===null||D===void 0||(L=D.docs)===null||L===void 0?void 0:L.source}}};u.parameters={...u.parameters,docs:{...(R=u.parameters)===null||R===void 0?void 0:R.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "4",
      lowestPriceAtSearch: "1200.00",
      currentLowestPrice: "1500.00"
    },
    onClick: () => storyLogger.info("Clicked: Price increased flight")
  }
}`,...(A=u.parameters)===null||A===void 0||(b=A.docs)===null||b===void 0?void 0:b.source}}};p.parameters={...p.parameters,docs:{...(I=p.parameters)===null||I===void 0?void 0:I.docs,source:{originalSource:`{
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
}`,...(F=p.parameters)===null||F===void 0||(j=F.docs)===null||j===void 0?void 0:j.source}}};m.parameters={...m.parameters,docs:{...(T=m.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
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
}`,...(O=m.parameters)===null||O===void 0||(B=O.docs)===null||B===void 0?void 0:B.source}}};C.parameters={...C.parameters,docs:{...(H=C.parameters)===null||H===void 0?void 0:H.docs,source:{originalSource:`{
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
}`,...(U=C.parameters)===null||U===void 0||(W=U.docs)===null||W===void 0?void 0:W.source}}};g.parameters={...g.parameters,docs:{...(M=g.parameters)===null||M===void 0?void 0:M.docs,source:{originalSource:`{
  args: {
    record: {
      ...baseRecord,
      id: "8",
      lowestPriceAtSearch: null,
      currentLowestPrice: null
    },
    onClick: () => storyLogger.info("Clicked: No price data flight")
  }
}`,...(Z=g.parameters)===null||Z===void 0||($=Z.docs)===null||$===void 0?void 0:$.source}}};y.parameters={...y.parameters,docs:{...(X=y.parameters)===null||X===void 0?void 0:X.docs,source:{originalSource:`{
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
}`,...(q=y.parameters)===null||q===void 0||(J=q.docs)===null||J===void 0?void 0:J.source}}};h.parameters={...h.parameters,docs:{...(E=h.parameters)===null||E===void 0?void 0:E.docs,source:{originalSource:`{
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
}`,...(G=h.parameters)===null||G===void 0||(z=G.docs)===null||z===void 0?void 0:z.source}}};const be=["OneWayFlight","RoundTripFlight","PriceDecreased","PriceIncreased","DifferentRoute","BusinessClass","FirstClass","NoPriceData","LongCityNames","MultipleCards"];export{m as BusinessClass,p as DifferentRoute,C as FirstClass,y as LongCityNames,h as MultipleCards,g as NoPriceData,c as OneWayFlight,d as PriceDecreased,u as PriceIncreased,l as RoundTripFlight,be as __namedExportsOrder,Re as default};
