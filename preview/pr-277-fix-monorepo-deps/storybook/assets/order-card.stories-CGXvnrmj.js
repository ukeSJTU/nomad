import{j as e,u as K}from"./iframe-CrLPMyef.js";import{B as h}from"./button-C49Jt41H.js";import{C as X}from"./checkbox-hlzRasDL.js";import"./form-vAtcQtf6.js";import"./input-CBtiA9j3.js";import"./alert-dialog-BDRb33ee.js";import"./badge-DRbaR9p2.js";import{u as $}from"./platform-DKvuCmmd.js";import{C as z,b as V,a as J}from"./card-D-d6dHIy.js";import{S as Q}from"./separator-BFZTMdF7.js";import{f as i}from"./format-Bpyr6-K6.js";import"./radio-group-DGFoeLVx.js";import{s as a}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CCw5U8u4.js";import"./createLucideIcon-DzaTpkcS.js";import"./index-B2BMd2ZM.js";import"./index-DLC0D_9l.js";import"./index-CXICuE6m.js";import"./index-3_PNoCtV.js";import"./check-DD9V9MZB.js";import"./label-Dee_xcgp.js";import"./index-E-CxifyW.js";import"./index-B9BpXIRB.js";import"./index-DBYj_96i.js";import"./index-BmOx0rIh.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./index-C5LsBHvz.js";function ee(r){switch(r){case"PENDING_PAYMENT":return"待支付";case"CONFIRMED":return"已确认";case"CANCELLED":return"已取消";case"REFUNDED":return"已退款";default:return r}}function W({order:r,isChecked:N=!1,onCheckChange:c,onDelete:v,onActionClick:n,onOrderClick:G}){const{Link:o}=$(),y=()=>r.status==="CONFIRMED"?e.jsx(h,{variant:"outline",size:"sm",onClick:t=>{t.preventDefault(),t.stopPropagation(),n?.()},className:"w-full text-primary",children:"重发确认信息"}):r.status==="PENDING_PAYMENT"?e.jsx(h,{variant:"outline",size:"sm",onClick:t=>{t.preventDefault(),t.stopPropagation(),n?.()},className:"w-full text-primary",children:"去付款"}):null;return e.jsxs(z,{className:"w-full transition-all hover:border-primary hover:shadow-md py-0 gap-0",children:[e.jsx(V,{className:"bg-muted/50 px-4 py-2 gap-0",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(X,{id:`order-${r.id}`,checked:N,onCheckedChange:c}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("span",{className:"text-muted-foreground",children:"订单号:"}),e.jsx(o,{href:`/orders/${r.id}`,className:"font-medium text-primary hover:underline",onClick:t=>t.stopPropagation(),children:r.orderNumber})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-muted-foreground",children:[e.jsx("span",{children:"预订日期:"}),e.jsx("span",{children:i(new Date(r.createdAt),"yyyy-MM-dd")})]}),e.jsx(h,{variant:"link",className:"text-destructive text-sm h-auto p-0",onClick:t=>{t.preventDefault(),t.stopPropagation(),v()},children:"删除订单"})]})}),e.jsx(o,{href:`/orders/${r.id}`,className:"block",children:e.jsx(J,{className:"p-4 cursor-pointer",children:e.jsxs("div",{className:"flex justify-between gap-4 items-stretch pb-2",children:[e.jsxs("div",{className:"space-y-4 flex-1",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("h3",{className:"text-lg font-semibold",children:[r.outboundFlight.departureCityName," —"," ",r.outboundFlight.arrivalCityName]}),e.jsxs("div",{className:"text-sm text-muted-foreground space-y-1",children:[e.jsxs("div",{children:["出发日期:"," ",i(new Date(r.outboundFlight.departureDatetime),"yyyy-MM-dd HH:mm")," ","至"," ",i(new Date(r.outboundFlight.arrivalDatetime),"HH:mm")," ",r.outboundFlight.flightNumber]}),e.jsxs("div",{children:["出行人：",r.passengerNames.join("、")]})]})]}),r.inboundFlight&&e.jsxs(e.Fragment,{children:[e.jsx(Q,{}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("h3",{className:"text-lg font-semibold",children:[r.inboundFlight.departureCityName," —"," ",r.inboundFlight.arrivalCityName]}),e.jsxs("div",{className:"text-sm text-muted-foreground space-y-1",children:[e.jsxs("div",{children:["出发日期:"," ",i(new Date(r.inboundFlight.departureDatetime),"yyyy-MM-dd HH:mm")," ","至"," ",i(new Date(r.inboundFlight.arrivalDatetime),"HH:mm")," ",r.inboundFlight.flightNumber]}),e.jsxs("div",{children:["出行人：",r.passengerNames.join("、")]})]})]})]})]}),e.jsxs("div",{className:"flex flex-col items-end justify-between",children:[e.jsxs("div",{className:"flex flex-col items-end gap-1",children:[e.jsx("span",{className:"text-primary font-semibold",children:ee(r.status)}),e.jsxs("div",{className:"text-lg font-semibold text-foreground",children:["¥",r.totalAmount]})]}),e.jsx("div",{className:"mt-auto pt-4",children:y()})]})]})})})]})}W.__docgenInfo={description:"",methods:[],displayName:"OrderCard",props:{order:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string; // ISO string
  totalAmount: string; // Decimal string
  passengerCount: number;
  outboundFlight: OrderFlightInfo;
  inboundFlight: OrderFlightInfo | null;
  passengerNames: string[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"orderNumber",value:{name:"string",required:!0}},{key:"status",value:{name:"union",raw:`| "PENDING_PAYMENT"
| "CONFIRMED"
| "CANCELLED"
| "REFUNDED"`,elements:[{name:"literal",value:'"PENDING_PAYMENT"'},{name:"literal",value:'"CONFIRMED"'},{name:"literal",value:'"CANCELLED"'},{name:"literal",value:'"REFUNDED"'}],required:!0}},{key:"createdAt",value:{name:"string",required:!0}},{key:"totalAmount",value:{name:"string",required:!0}},{key:"passengerCount",value:{name:"number",required:!0}},{key:"outboundFlight",value:{name:"signature",type:"object",raw:`{
  flightNumber: string;
  airlineName: string;
  airlineIataCode: string;
  airlineLogoUrl: string | null;
  departureAirportName: string;
  departureAirportIataCode: string;
  departureCityName: string;
  arrivalAirportName: string;
  arrivalAirportIataCode: string;
  arrivalCityName: string;
  departureDatetime: string; // ISO string
  arrivalDatetime: string; // ISO string
  seatClassType: string; // ECONOMY, BUSINESS, FIRST
}`,signature:{properties:[{key:"flightNumber",value:{name:"string",required:!0}},{key:"airlineName",value:{name:"string",required:!0}},{key:"airlineIataCode",value:{name:"string",required:!0}},{key:"airlineLogoUrl",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"departureAirportName",value:{name:"string",required:!0}},{key:"departureAirportIataCode",value:{name:"string",required:!0}},{key:"departureCityName",value:{name:"string",required:!0}},{key:"arrivalAirportName",value:{name:"string",required:!0}},{key:"arrivalAirportIataCode",value:{name:"string",required:!0}},{key:"arrivalCityName",value:{name:"string",required:!0}},{key:"departureDatetime",value:{name:"string",required:!0}},{key:"arrivalDatetime",value:{name:"string",required:!0}},{key:"seatClassType",value:{name:"string",required:!0}}]},required:!0}},{key:"inboundFlight",value:{name:"union",raw:"OrderFlightInfo | null",elements:[{name:"signature",type:"object",raw:`{
  flightNumber: string;
  airlineName: string;
  airlineIataCode: string;
  airlineLogoUrl: string | null;
  departureAirportName: string;
  departureAirportIataCode: string;
  departureCityName: string;
  arrivalAirportName: string;
  arrivalAirportIataCode: string;
  arrivalCityName: string;
  departureDatetime: string; // ISO string
  arrivalDatetime: string; // ISO string
  seatClassType: string; // ECONOMY, BUSINESS, FIRST
}`,signature:{properties:[{key:"flightNumber",value:{name:"string",required:!0}},{key:"airlineName",value:{name:"string",required:!0}},{key:"airlineIataCode",value:{name:"string",required:!0}},{key:"airlineLogoUrl",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"departureAirportName",value:{name:"string",required:!0}},{key:"departureAirportIataCode",value:{name:"string",required:!0}},{key:"departureCityName",value:{name:"string",required:!0}},{key:"arrivalAirportName",value:{name:"string",required:!0}},{key:"arrivalAirportIataCode",value:{name:"string",required:!0}},{key:"arrivalCityName",value:{name:"string",required:!0}},{key:"departureDatetime",value:{name:"string",required:!0}},{key:"arrivalDatetime",value:{name:"string",required:!0}},{key:"seatClassType",value:{name:"string",required:!0}}]},required:!0},{name:"null"}],required:!0}},{key:"passengerNames",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]}},description:""},isChecked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onCheckChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onActionClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onOrderClick:{required:!0,tsType:{name:"signature",type:"function",raw:"(orderId: string) => void",signature:{arguments:[{type:{name:"string"},name:"orderId"}],return:{name:"void"}}},description:""}}};function B({order:r,isChecked:N,onCheckChange:c,onDelete:v,onActionClick:n}){const G=K(),o=y=>{G.push(`/orders/${y}`)};return e.jsx(W,{order:r,isChecked:N,onCheckChange:c,onDelete:v,onActionClick:n,onOrderClick:o})}B.__docgenInfo={description:`OrderCard Container Component

@description
Container component that wraps the UI component from @ukesjtu/nomad-ui.
Handles Next.js-specific navigation logic.

@remarks
- Manages navigation to order details page
- Passes through UI state and callbacks to the UI component`,methods:[],displayName:"OrderCard",props:{order:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string; // ISO string
  totalAmount: string; // Decimal string
  passengerCount: number;
  outboundFlight: OrderFlightInfo;
  inboundFlight: OrderFlightInfo | null;
  passengerNames: string[];
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"orderNumber",value:{name:"string",required:!0}},{key:"status",value:{name:"union",raw:`| "PENDING_PAYMENT"
| "CONFIRMED"
| "CANCELLED"
| "REFUNDED"`,elements:[{name:"literal",value:'"PENDING_PAYMENT"'},{name:"literal",value:'"CONFIRMED"'},{name:"literal",value:'"CANCELLED"'},{name:"literal",value:'"REFUNDED"'}],required:!0}},{key:"createdAt",value:{name:"string",required:!0}},{key:"totalAmount",value:{name:"string",required:!0}},{key:"passengerCount",value:{name:"number",required:!0}},{key:"outboundFlight",value:{name:"signature",type:"object",raw:`{
  flightNumber: string;
  airlineName: string;
  airlineIataCode: string;
  airlineLogoUrl: string | null;
  departureAirportName: string;
  departureAirportIataCode: string;
  departureCityName: string;
  arrivalAirportName: string;
  arrivalAirportIataCode: string;
  arrivalCityName: string;
  departureDatetime: string; // ISO string
  arrivalDatetime: string; // ISO string
  seatClassType: string; // ECONOMY, BUSINESS, FIRST
}`,signature:{properties:[{key:"flightNumber",value:{name:"string",required:!0}},{key:"airlineName",value:{name:"string",required:!0}},{key:"airlineIataCode",value:{name:"string",required:!0}},{key:"airlineLogoUrl",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"departureAirportName",value:{name:"string",required:!0}},{key:"departureAirportIataCode",value:{name:"string",required:!0}},{key:"departureCityName",value:{name:"string",required:!0}},{key:"arrivalAirportName",value:{name:"string",required:!0}},{key:"arrivalAirportIataCode",value:{name:"string",required:!0}},{key:"arrivalCityName",value:{name:"string",required:!0}},{key:"departureDatetime",value:{name:"string",required:!0}},{key:"arrivalDatetime",value:{name:"string",required:!0}},{key:"seatClassType",value:{name:"string",required:!0}}]},required:!0}},{key:"inboundFlight",value:{name:"union",raw:"OrderFlightInfo | null",elements:[{name:"signature",type:"object",raw:`{
  flightNumber: string;
  airlineName: string;
  airlineIataCode: string;
  airlineLogoUrl: string | null;
  departureAirportName: string;
  departureAirportIataCode: string;
  departureCityName: string;
  arrivalAirportName: string;
  arrivalAirportIataCode: string;
  arrivalCityName: string;
  departureDatetime: string; // ISO string
  arrivalDatetime: string; // ISO string
  seatClassType: string; // ECONOMY, BUSINESS, FIRST
}`,signature:{properties:[{key:"flightNumber",value:{name:"string",required:!0}},{key:"airlineName",value:{name:"string",required:!0}},{key:"airlineIataCode",value:{name:"string",required:!0}},{key:"airlineLogoUrl",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"departureAirportName",value:{name:"string",required:!0}},{key:"departureAirportIataCode",value:{name:"string",required:!0}},{key:"departureCityName",value:{name:"string",required:!0}},{key:"arrivalAirportName",value:{name:"string",required:!0}},{key:"arrivalAirportIataCode",value:{name:"string",required:!0}},{key:"arrivalCityName",value:{name:"string",required:!0}},{key:"departureDatetime",value:{name:"string",required:!0}},{key:"arrivalDatetime",value:{name:"string",required:!0}},{key:"seatClassType",value:{name:"string",required:!0}}]},required:!0},{name:"null"}],required:!0}},{key:"passengerNames",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!0}}]}},description:""},isChecked:{required:!0,tsType:{name:"boolean"},description:""},onCheckChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onActionClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};var A,f,D,k,I,T,b,O,E,F,M,U,q,L,_,Z,x,S,R,P,j,H,w,Y;const Fe={title:"User/OrderCard",component:B,parameters:{layout:"padded"}},l={args:{order:{id:"1",orderNumber:"NMD20251118001",status:"PENDING_PAYMENT",createdAt:"2025-11-18T10:30:00Z",outboundFlight:{flightNumber:"MU5186",airlineName:"中国东方航空",airlineIataCode:"MU",airlineLogoUrl:null,departureAirportName:"首都国际机场",departureAirportIataCode:"PEK",departureCityName:"北京",arrivalAirportName:"虹桥国际机场",arrivalAirportIataCode:"SHA",arrivalCityName:"上海",departureDatetime:"2025-12-01T07:30:00Z",arrivalDatetime:"2025-12-01T09:45:00Z",seatClassType:"ECONOMY"},inboundFlight:null,passengerNames:["张三"],passengerCount:1,totalAmount:"1000"},isChecked:!1,onCheckChange:()=>{a.info("Check changed")},onDelete:()=>{a.info("Delete clicked")},onActionClick:()=>{a.info("Go to payment clicked")}}},s={args:{order:{id:"2",orderNumber:"NMD20251117002",status:"CONFIRMED",createdAt:"2025-11-17T14:20:00Z",outboundFlight:{flightNumber:"CA1234",airlineName:"中国国际航空",airlineIataCode:"CA",airlineLogoUrl:null,departureAirportName:"白云国际机场",departureAirportIataCode:"CAN",departureCityName:"广州",arrivalAirportName:"宝安国际机场",arrivalAirportIataCode:"SZX",arrivalCityName:"深圳",departureDatetime:"2025-12-05T10:00:00Z",arrivalDatetime:"2025-12-05T11:00:00Z",seatClassType:"BUSINESS"},inboundFlight:null,passengerNames:["李四","王五"],passengerCount:2,totalAmount:"1688"},isChecked:!1,onCheckChange:()=>{a.info("Check changed")},onDelete:()=>{a.info("Delete clicked")},onActionClick:()=>{a.info("Resend confirmation clicked")}}},u={args:{order:{id:"3",orderNumber:"NMD20251116003",status:"CANCELLED",createdAt:"2025-11-16T09:15:00Z",outboundFlight:{flightNumber:"CZ3456",airlineName:"中国南方航空",airlineIataCode:"CZ",airlineLogoUrl:null,departureAirportName:"双流国际机场",departureAirportIataCode:"CTU",departureCityName:"成都",arrivalAirportName:"江北国际机场",arrivalAirportIataCode:"CKG",arrivalCityName:"重庆",departureDatetime:"2025-11-25T12:00:00Z",arrivalDatetime:"2025-11-25T13:00:00Z",seatClassType:"ECONOMY"},inboundFlight:null,passengerNames:["赵六"],passengerCount:1,totalAmount:"488"},isChecked:!1,onCheckChange:()=>{a.info("Check changed")},onDelete:()=>{a.info("Delete clicked")}}},d={args:{order:{id:"4",orderNumber:"NMD20251115004",status:"REFUNDED",createdAt:"2025-11-15T16:45:00Z",outboundFlight:{flightNumber:"3U8888",airlineName:"四川航空",airlineIataCode:"3U",airlineLogoUrl:null,departureAirportName:"萧山国际机场",departureAirportIataCode:"HGH",departureCityName:"杭州",arrivalAirportName:"咸阳国际机场",arrivalAirportIataCode:"XIY",arrivalCityName:"西安",departureDatetime:"2025-11-20T14:30:00Z",arrivalDatetime:"2025-11-20T17:00:00Z",seatClassType:"ECONOMY"},inboundFlight:null,passengerNames:["孙七"],passengerCount:1,totalAmount:"888"},isChecked:!1,onCheckChange:()=>{a.info("Check changed")},onDelete:()=>{a.info("Delete clicked")}}},m={args:{order:{id:"5",orderNumber:"NMD20251118005",status:"PENDING_PAYMENT",createdAt:"2025-11-18T11:00:00Z",outboundFlight:{flightNumber:"MU5186",airlineName:"中国东方航空",airlineIataCode:"MU",airlineLogoUrl:null,departureAirportName:"首都国际机场",departureAirportIataCode:"PEK",departureCityName:"北京",arrivalAirportName:"虹桥国际机场",arrivalAirportIataCode:"SHA",arrivalCityName:"上海",departureDatetime:"2025-12-10T07:30:00Z",arrivalDatetime:"2025-12-10T09:45:00Z",seatClassType:"ECONOMY"},inboundFlight:{flightNumber:"MU8230",airlineName:"中国东方航空",airlineIataCode:"MU",airlineLogoUrl:null,departureAirportName:"虹桥国际机场",departureAirportIataCode:"SHA",departureCityName:"上海",arrivalAirportName:"首都国际机场",arrivalAirportIataCode:"PEK",arrivalCityName:"北京",departureDatetime:"2025-12-15T20:40:00Z",arrivalDatetime:"2025-12-15T22:55:00Z",seatClassType:"ECONOMY"},passengerNames:["周八"],passengerCount:1,totalAmount:"2000"},isChecked:!1,onCheckChange:()=>{a.info("Check changed")},onDelete:()=>{a.info("Delete clicked")},onActionClick:()=>{a.info("Go to payment clicked")}}},p={args:{order:{id:"6",orderNumber:"NMD20251117006",status:"CONFIRMED",createdAt:"2025-11-17T15:20:00Z",outboundFlight:{flightNumber:"CA1801",airlineName:"中国国际航空",airlineIataCode:"CA",airlineLogoUrl:null,departureAirportName:"虹桥国际机场",departureAirportIataCode:"SHA",departureCityName:"上海",arrivalAirportName:"白云国际机场",arrivalAirportIataCode:"CAN",arrivalCityName:"广州",departureDatetime:"2025-12-20T08:00:00Z",arrivalDatetime:"2025-12-20T10:30:00Z",seatClassType:"BUSINESS"},inboundFlight:{flightNumber:"CA1802",airlineName:"中国国际航空",airlineIataCode:"CA",airlineLogoUrl:null,departureAirportName:"白云国际机场",departureAirportIataCode:"CAN",departureCityName:"广州",arrivalAirportName:"虹桥国际机场",arrivalAirportIataCode:"SHA",arrivalCityName:"上海",departureDatetime:"2025-12-25T18:00:00Z",arrivalDatetime:"2025-12-25T20:30:00Z",seatClassType:"BUSINESS"},passengerNames:["吴九","郑十"],passengerCount:2,totalAmount:"4388"},isChecked:!1,onCheckChange:()=>{a.info("Check changed")},onDelete:()=>{a.info("Delete clicked")},onActionClick:()=>{a.info("Resend confirmation clicked")}}},g={args:{order:{id:"7",orderNumber:"NMD20251116007",status:"CANCELLED",createdAt:"2025-11-16T10:30:00Z",outboundFlight:{flightNumber:"HU7123",airlineName:"海南航空",airlineIataCode:"HU",airlineLogoUrl:null,departureAirportName:"双流国际机场",departureAirportIataCode:"CTU",departureCityName:"成都",arrivalAirportName:"首都国际机场",arrivalAirportIataCode:"PEK",arrivalCityName:"北京",departureDatetime:"2025-12-08T09:00:00Z",arrivalDatetime:"2025-12-08T11:30:00Z",seatClassType:"ECONOMY"},inboundFlight:{flightNumber:"HU7124",airlineName:"海南航空",airlineIataCode:"HU",airlineLogoUrl:null,departureAirportName:"首都国际机场",departureAirportIataCode:"PEK",departureCityName:"北京",arrivalAirportName:"双流国际机场",arrivalAirportIataCode:"CTU",arrivalCityName:"成都",departureDatetime:"2025-12-12T15:00:00Z",arrivalDatetime:"2025-12-12T17:30:00Z",seatClassType:"ECONOMY"},passengerNames:["冯十一"],passengerCount:1,totalAmount:"1888"},isChecked:!1,onCheckChange:()=>{a.info("Check changed")},onDelete:()=>{a.info("Delete clicked")}}},C={args:{order:{id:"8",orderNumber:"NMD20251115008",status:"REFUNDED",createdAt:"2025-11-15T13:00:00Z",outboundFlight:{flightNumber:"MF8501",airlineName:"厦门航空",airlineIataCode:"MF",airlineLogoUrl:null,departureAirportName:"萧山国际机场",departureAirportIataCode:"HGH",departureCityName:"杭州",arrivalAirportName:"高崎国际机场",arrivalAirportIataCode:"XMN",arrivalCityName:"厦门",departureDatetime:"2025-11-28T10:00:00Z",arrivalDatetime:"2025-11-28T11:45:00Z",seatClassType:"ECONOMY"},inboundFlight:{flightNumber:"MF8502",airlineName:"厦门航空",airlineIataCode:"MF",airlineLogoUrl:null,departureAirportName:"高崎国际机场",departureAirportIataCode:"XMN",departureCityName:"厦门",arrivalAirportName:"萧山国际机场",arrivalAirportIataCode:"HGH",arrivalCityName:"杭州",departureDatetime:"2025-12-02T16:00:00Z",arrivalDatetime:"2025-12-02T17:45:00Z",seatClassType:"ECONOMY"},passengerNames:["陈十二","褚十三","卫十四"],passengerCount:3,totalAmount:"2688"},isChecked:!1,onCheckChange:()=>{a.info("Check changed")},onDelete:()=>{a.info("Delete clicked")}}};l.parameters={...l.parameters,docs:{...(A=l.parameters)===null||A===void 0?void 0:A.docs,source:{originalSource:`{
  args: {
    order: {
      id: "1",
      orderNumber: "NMD20251118001",
      status: "PENDING_PAYMENT",
      createdAt: "2025-11-18T10:30:00Z",
      outboundFlight: {
        flightNumber: "MU5186",
        airlineName: "中国东方航空",
        airlineIataCode: "MU",
        airlineLogoUrl: null,
        departureAirportName: "首都国际机场",
        departureAirportIataCode: "PEK",
        departureCityName: "北京",
        arrivalAirportName: "虹桥国际机场",
        arrivalAirportIataCode: "SHA",
        arrivalCityName: "上海",
        departureDatetime: "2025-12-01T07:30:00Z",
        arrivalDatetime: "2025-12-01T09:45:00Z",
        seatClassType: "ECONOMY"
      },
      inboundFlight: null,
      passengerNames: ["张三"],
      passengerCount: 1,
      totalAmount: "1000"
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {
      storyLogger.info("Check changed");
    },
    onDelete: () => {
      storyLogger.info("Delete clicked");
    },
    onActionClick: () => {
      storyLogger.info("Go to payment clicked");
    }
  }
}`,...(D=l.parameters)===null||D===void 0||(f=D.docs)===null||f===void 0?void 0:f.source}}};s.parameters={...s.parameters,docs:{...(k=s.parameters)===null||k===void 0?void 0:k.docs,source:{originalSource:`{
  args: {
    order: {
      id: "2",
      orderNumber: "NMD20251117002",
      status: "CONFIRMED",
      createdAt: "2025-11-17T14:20:00Z",
      outboundFlight: {
        flightNumber: "CA1234",
        airlineName: "中国国际航空",
        airlineIataCode: "CA",
        airlineLogoUrl: null,
        departureAirportName: "白云国际机场",
        departureAirportIataCode: "CAN",
        departureCityName: "广州",
        arrivalAirportName: "宝安国际机场",
        arrivalAirportIataCode: "SZX",
        arrivalCityName: "深圳",
        departureDatetime: "2025-12-05T10:00:00Z",
        arrivalDatetime: "2025-12-05T11:00:00Z",
        seatClassType: "BUSINESS"
      },
      inboundFlight: null,
      passengerNames: ["李四", "王五"],
      passengerCount: 2,
      totalAmount: "1688"
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {
      storyLogger.info("Check changed");
    },
    onDelete: () => {
      storyLogger.info("Delete clicked");
    },
    onActionClick: () => {
      storyLogger.info("Resend confirmation clicked");
    }
  }
}`,...(T=s.parameters)===null||T===void 0||(I=T.docs)===null||I===void 0?void 0:I.source}}};u.parameters={...u.parameters,docs:{...(b=u.parameters)===null||b===void 0?void 0:b.docs,source:{originalSource:`{
  args: {
    order: {
      id: "3",
      orderNumber: "NMD20251116003",
      status: "CANCELLED",
      createdAt: "2025-11-16T09:15:00Z",
      outboundFlight: {
        flightNumber: "CZ3456",
        airlineName: "中国南方航空",
        airlineIataCode: "CZ",
        airlineLogoUrl: null,
        departureAirportName: "双流国际机场",
        departureAirportIataCode: "CTU",
        departureCityName: "成都",
        arrivalAirportName: "江北国际机场",
        arrivalAirportIataCode: "CKG",
        arrivalCityName: "重庆",
        departureDatetime: "2025-11-25T12:00:00Z",
        arrivalDatetime: "2025-11-25T13:00:00Z",
        seatClassType: "ECONOMY"
      },
      inboundFlight: null,
      passengerNames: ["赵六"],
      passengerCount: 1,
      totalAmount: "488"
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {
      storyLogger.info("Check changed");
    },
    onDelete: () => {
      storyLogger.info("Delete clicked");
    }
  }
}`,...(E=u.parameters)===null||E===void 0||(O=E.docs)===null||O===void 0?void 0:O.source}}};d.parameters={...d.parameters,docs:{...(F=d.parameters)===null||F===void 0?void 0:F.docs,source:{originalSource:`{
  args: {
    order: {
      id: "4",
      orderNumber: "NMD20251115004",
      status: "REFUNDED",
      createdAt: "2025-11-15T16:45:00Z",
      outboundFlight: {
        flightNumber: "3U8888",
        airlineName: "四川航空",
        airlineIataCode: "3U",
        airlineLogoUrl: null,
        departureAirportName: "萧山国际机场",
        departureAirportIataCode: "HGH",
        departureCityName: "杭州",
        arrivalAirportName: "咸阳国际机场",
        arrivalAirportIataCode: "XIY",
        arrivalCityName: "西安",
        departureDatetime: "2025-11-20T14:30:00Z",
        arrivalDatetime: "2025-11-20T17:00:00Z",
        seatClassType: "ECONOMY"
      },
      inboundFlight: null,
      passengerNames: ["孙七"],
      passengerCount: 1,
      totalAmount: "888"
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {
      storyLogger.info("Check changed");
    },
    onDelete: () => {
      storyLogger.info("Delete clicked");
    }
  }
}`,...(U=d.parameters)===null||U===void 0||(M=U.docs)===null||M===void 0?void 0:M.source}}};m.parameters={...m.parameters,docs:{...(q=m.parameters)===null||q===void 0?void 0:q.docs,source:{originalSource:`{
  args: {
    order: {
      id: "5",
      orderNumber: "NMD20251118005",
      status: "PENDING_PAYMENT",
      createdAt: "2025-11-18T11:00:00Z",
      outboundFlight: {
        flightNumber: "MU5186",
        airlineName: "中国东方航空",
        airlineIataCode: "MU",
        airlineLogoUrl: null,
        departureAirportName: "首都国际机场",
        departureAirportIataCode: "PEK",
        departureCityName: "北京",
        arrivalAirportName: "虹桥国际机场",
        arrivalAirportIataCode: "SHA",
        arrivalCityName: "上海",
        departureDatetime: "2025-12-10T07:30:00Z",
        arrivalDatetime: "2025-12-10T09:45:00Z",
        seatClassType: "ECONOMY"
      },
      inboundFlight: {
        flightNumber: "MU8230",
        airlineName: "中国东方航空",
        airlineIataCode: "MU",
        airlineLogoUrl: null,
        departureAirportName: "虹桥国际机场",
        departureAirportIataCode: "SHA",
        departureCityName: "上海",
        arrivalAirportName: "首都国际机场",
        arrivalAirportIataCode: "PEK",
        arrivalCityName: "北京",
        departureDatetime: "2025-12-15T20:40:00Z",
        arrivalDatetime: "2025-12-15T22:55:00Z",
        seatClassType: "ECONOMY"
      },
      passengerNames: ["周八"],
      passengerCount: 1,
      totalAmount: "2000"
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {
      storyLogger.info("Check changed");
    },
    onDelete: () => {
      storyLogger.info("Delete clicked");
    },
    onActionClick: () => {
      storyLogger.info("Go to payment clicked");
    }
  }
}`,...(_=m.parameters)===null||_===void 0||(L=_.docs)===null||L===void 0?void 0:L.source}}};p.parameters={...p.parameters,docs:{...(Z=p.parameters)===null||Z===void 0?void 0:Z.docs,source:{originalSource:`{
  args: {
    order: {
      id: "6",
      orderNumber: "NMD20251117006",
      status: "CONFIRMED",
      createdAt: "2025-11-17T15:20:00Z",
      outboundFlight: {
        flightNumber: "CA1801",
        airlineName: "中国国际航空",
        airlineIataCode: "CA",
        airlineLogoUrl: null,
        departureAirportName: "虹桥国际机场",
        departureAirportIataCode: "SHA",
        departureCityName: "上海",
        arrivalAirportName: "白云国际机场",
        arrivalAirportIataCode: "CAN",
        arrivalCityName: "广州",
        departureDatetime: "2025-12-20T08:00:00Z",
        arrivalDatetime: "2025-12-20T10:30:00Z",
        seatClassType: "BUSINESS"
      },
      inboundFlight: {
        flightNumber: "CA1802",
        airlineName: "中国国际航空",
        airlineIataCode: "CA",
        airlineLogoUrl: null,
        departureAirportName: "白云国际机场",
        departureAirportIataCode: "CAN",
        departureCityName: "广州",
        arrivalAirportName: "虹桥国际机场",
        arrivalAirportIataCode: "SHA",
        arrivalCityName: "上海",
        departureDatetime: "2025-12-25T18:00:00Z",
        arrivalDatetime: "2025-12-25T20:30:00Z",
        seatClassType: "BUSINESS"
      },
      passengerNames: ["吴九", "郑十"],
      passengerCount: 2,
      totalAmount: "4388"
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {
      storyLogger.info("Check changed");
    },
    onDelete: () => {
      storyLogger.info("Delete clicked");
    },
    onActionClick: () => {
      storyLogger.info("Resend confirmation clicked");
    }
  }
}`,...(S=p.parameters)===null||S===void 0||(x=S.docs)===null||x===void 0?void 0:x.source}}};g.parameters={...g.parameters,docs:{...(R=g.parameters)===null||R===void 0?void 0:R.docs,source:{originalSource:`{
  args: {
    order: {
      id: "7",
      orderNumber: "NMD20251116007",
      status: "CANCELLED",
      createdAt: "2025-11-16T10:30:00Z",
      outboundFlight: {
        flightNumber: "HU7123",
        airlineName: "海南航空",
        airlineIataCode: "HU",
        airlineLogoUrl: null,
        departureAirportName: "双流国际机场",
        departureAirportIataCode: "CTU",
        departureCityName: "成都",
        arrivalAirportName: "首都国际机场",
        arrivalAirportIataCode: "PEK",
        arrivalCityName: "北京",
        departureDatetime: "2025-12-08T09:00:00Z",
        arrivalDatetime: "2025-12-08T11:30:00Z",
        seatClassType: "ECONOMY"
      },
      inboundFlight: {
        flightNumber: "HU7124",
        airlineName: "海南航空",
        airlineIataCode: "HU",
        airlineLogoUrl: null,
        departureAirportName: "首都国际机场",
        departureAirportIataCode: "PEK",
        departureCityName: "北京",
        arrivalAirportName: "双流国际机场",
        arrivalAirportIataCode: "CTU",
        arrivalCityName: "成都",
        departureDatetime: "2025-12-12T15:00:00Z",
        arrivalDatetime: "2025-12-12T17:30:00Z",
        seatClassType: "ECONOMY"
      },
      passengerNames: ["冯十一"],
      passengerCount: 1,
      totalAmount: "1888"
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {
      storyLogger.info("Check changed");
    },
    onDelete: () => {
      storyLogger.info("Delete clicked");
    }
  }
}`,...(j=g.parameters)===null||j===void 0||(P=j.docs)===null||P===void 0?void 0:P.source}}};C.parameters={...C.parameters,docs:{...(H=C.parameters)===null||H===void 0?void 0:H.docs,source:{originalSource:`{
  args: {
    order: {
      id: "8",
      orderNumber: "NMD20251115008",
      status: "REFUNDED",
      createdAt: "2025-11-15T13:00:00Z",
      outboundFlight: {
        flightNumber: "MF8501",
        airlineName: "厦门航空",
        airlineIataCode: "MF",
        airlineLogoUrl: null,
        departureAirportName: "萧山国际机场",
        departureAirportIataCode: "HGH",
        departureCityName: "杭州",
        arrivalAirportName: "高崎国际机场",
        arrivalAirportIataCode: "XMN",
        arrivalCityName: "厦门",
        departureDatetime: "2025-11-28T10:00:00Z",
        arrivalDatetime: "2025-11-28T11:45:00Z",
        seatClassType: "ECONOMY"
      },
      inboundFlight: {
        flightNumber: "MF8502",
        airlineName: "厦门航空",
        airlineIataCode: "MF",
        airlineLogoUrl: null,
        departureAirportName: "高崎国际机场",
        departureAirportIataCode: "XMN",
        departureCityName: "厦门",
        arrivalAirportName: "萧山国际机场",
        arrivalAirportIataCode: "HGH",
        arrivalCityName: "杭州",
        departureDatetime: "2025-12-02T16:00:00Z",
        arrivalDatetime: "2025-12-02T17:45:00Z",
        seatClassType: "ECONOMY"
      },
      passengerNames: ["陈十二", "褚十三", "卫十四"],
      passengerCount: 3,
      totalAmount: "2688"
    } as OrderListItem,
    isChecked: false,
    onCheckChange: () => {
      storyLogger.info("Check changed");
    },
    onDelete: () => {
      storyLogger.info("Delete clicked");
    }
  }
}`,...(Y=C.parameters)===null||Y===void 0||(w=Y.docs)===null||w===void 0?void 0:w.source}}};const Me=["OneWayPendingPayment","OneWayConfirmed","OneWayCancelled","OneWayRefunded","RoundTripPendingPayment","RoundTripConfirmed","RoundTripCancelled","RoundTripRefunded"];export{u as OneWayCancelled,s as OneWayConfirmed,l as OneWayPendingPayment,d as OneWayRefunded,g as RoundTripCancelled,p as RoundTripConfirmed,m as RoundTripPendingPayment,C as RoundTripRefunded,Me as __namedExportsOrder,Fe as default};
