import{j as e}from"./iframe-BTcpGzrz.js";import{L as C}from"./link-DH4CXJC0.js";import{B as p}from"./button-DHKYmhBo.js";import{C as v,b as y,a as T}from"./card-CW-UoI9X.js";import{C as f}from"./checkbox-B1FMXtJ6.js";import{S as b}from"./separator-g851ihUH.js";import{f as t}from"./format-DmuT3Hh4.js";import"./preload-helper-PPVm8Dsz.js";import"./use-merged-ref-CngfgJua.js";import"./index-CS2SUhPe.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./index-CQpUqVhg.js";import"./index-DljmLQtd.js";import"./index-CGYOYVqM.js";import"./index-C4i06nyu.js";import"./index-kspR1Gx8.js";import"./index-Di5ObQFr.js";import"./check-Dj0asSqx.js";import"./createLucideIcon-Cg9RxXW5.js";import"./differenceInCalendarDays-6LXBCVj7.js";function I(a){switch(a){case"PENDING_PAYMENT":return"待支付";case"CONFIRMED":return"已确认";case"CANCELLED":return"已取消";case"REFUNDED":return"已退款";default:return a}}function N({order:a,isChecked:g=!1,onCheckChange:h,onDelete:A,onActionClick:c}){const D=()=>a.status==="CONFIRMED"?e.jsx(p,{variant:"outline",size:"sm",onClick:r=>{r.preventDefault(),r.stopPropagation(),c?.()},className:"w-full text-primary",children:"重发确认信息"}):a.status==="PENDING_PAYMENT"?e.jsx(p,{variant:"outline",size:"sm",onClick:r=>{r.preventDefault(),r.stopPropagation(),c?.()},className:"w-full text-primary",children:"去付款"}):null;return e.jsxs(v,{className:"w-full transition-all hover:border-primary hover:shadow-md py-0 gap-0",children:[e.jsx(y,{className:"bg-muted/50 px-4 py-2 gap-0",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(f,{id:`order-${a.id}`,checked:g,onCheckedChange:h}),e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("span",{className:"text-muted-foreground",children:"订单号:"}),e.jsx(C,{href:`/orders/${a.id}`,className:"font-medium text-primary hover:underline",onClick:r=>r.stopPropagation(),children:a.orderNumber})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-muted-foreground",children:[e.jsx("span",{children:"预订日期:"}),e.jsx("span",{children:t(new Date(a.createdAt),"yyyy-MM-dd")})]}),e.jsx(p,{variant:"link",className:"text-destructive text-sm h-auto p-0",onClick:r=>{r.preventDefault(),r.stopPropagation(),A()},children:"删除订单"})]})}),e.jsx(C,{href:`/orders/${a.id}`,className:"block",children:e.jsx(T,{className:"p-4 cursor-pointer",children:e.jsxs("div",{className:"flex justify-between gap-4 items-stretch pb-2",children:[e.jsxs("div",{className:"space-y-4 flex-1",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("h3",{className:"text-lg font-semibold",children:[a.outboundFlight.departureCityName," —"," ",a.outboundFlight.arrivalCityName]}),e.jsxs("div",{className:"text-sm text-muted-foreground space-y-1",children:[e.jsxs("div",{children:["出发日期:"," ",t(new Date(a.outboundFlight.departureDatetime),"yyyy-MM-dd HH:mm")," ","至"," ",t(new Date(a.outboundFlight.arrivalDatetime),"HH:mm")," ",a.outboundFlight.flightNumber]}),e.jsxs("div",{children:["出行人：",a.passengerNames.join("、")]})]})]}),a.inboundFlight&&e.jsxs(e.Fragment,{children:[e.jsx(b,{}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("h3",{className:"text-lg font-semibold",children:[a.inboundFlight.departureCityName," —"," ",a.inboundFlight.arrivalCityName]}),e.jsxs("div",{className:"text-sm text-muted-foreground space-y-1",children:[e.jsxs("div",{children:["出发日期:"," ",t(new Date(a.inboundFlight.departureDatetime),"yyyy-MM-dd HH:mm")," ","至"," ",t(new Date(a.inboundFlight.arrivalDatetime),"HH:mm")," ",a.inboundFlight.flightNumber]}),e.jsxs("div",{children:["出行人：",a.passengerNames.join("、")]})]})]})]})]}),e.jsxs("div",{className:"flex flex-col items-end justify-between",children:[e.jsxs("div",{className:"flex flex-col items-end gap-1",children:[e.jsx("span",{className:"text-primary font-semibold",children:I(a.status)}),e.jsxs("div",{className:"text-lg font-semibold text-foreground",children:["¥",a.totalAmount]})]}),e.jsx("div",{className:"mt-auto pt-4",children:D()})]})]})})})]})}N.__docgenInfo={description:"",methods:[],displayName:"OrderCard",props:{order:{required:!0,tsType:{name:"OrderListItem"},description:""},isChecked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onCheckChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},onDelete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onActionClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const X={title:"User/OrderCard",component:N,parameters:{layout:"padded"}},n={args:{order:{id:"1",orderNumber:"NMD20251118001",status:"PENDING_PAYMENT",createdAt:"2025-11-18T10:30:00Z",outboundFlight:{flightNumber:"MU5186",airlineName:"中国东方航空",airlineIataCode:"MU",airlineLogoUrl:null,departureAirportName:"首都国际机场",departureAirportIataCode:"PEK",departureCityName:"北京",arrivalAirportName:"虹桥国际机场",arrivalAirportIataCode:"SHA",arrivalCityName:"上海",departureDatetime:"2025-12-01T07:30:00Z",arrivalDatetime:"2025-12-01T09:45:00Z",seatClassType:"ECONOMY"},inboundFlight:null,passengerNames:["张三"],passengerCount:1,totalAmount:"1000"},isChecked:!1,onCheckChange:()=>{console.log("Check changed")},onDelete:()=>{console.log("Delete clicked")},onActionClick:()=>{console.log("Go to payment clicked")}}},i={args:{order:{id:"2",orderNumber:"NMD20251117002",status:"CONFIRMED",createdAt:"2025-11-17T14:20:00Z",outboundFlight:{flightNumber:"CA1234",airlineName:"中国国际航空",airlineIataCode:"CA",airlineLogoUrl:null,departureAirportName:"白云国际机场",departureAirportIataCode:"CAN",departureCityName:"广州",arrivalAirportName:"宝安国际机场",arrivalAirportIataCode:"SZX",arrivalCityName:"深圳",departureDatetime:"2025-12-05T10:00:00Z",arrivalDatetime:"2025-12-05T11:00:00Z",seatClassType:"BUSINESS"},inboundFlight:null,passengerNames:["李四","王五"],passengerCount:2,totalAmount:"1688"},isChecked:!1,onCheckChange:()=>{console.log("Check changed")},onDelete:()=>{console.log("Delete clicked")},onActionClick:()=>{console.log("Resend confirmation clicked")}}},o={args:{order:{id:"3",orderNumber:"NMD20251116003",status:"CANCELLED",createdAt:"2025-11-16T09:15:00Z",outboundFlight:{flightNumber:"CZ3456",airlineName:"中国南方航空",airlineIataCode:"CZ",airlineLogoUrl:null,departureAirportName:"双流国际机场",departureAirportIataCode:"CTU",departureCityName:"成都",arrivalAirportName:"江北国际机场",arrivalAirportIataCode:"CKG",arrivalCityName:"重庆",departureDatetime:"2025-11-25T12:00:00Z",arrivalDatetime:"2025-11-25T13:00:00Z",seatClassType:"ECONOMY"},inboundFlight:null,passengerNames:["赵六"],passengerCount:1,totalAmount:"488"},isChecked:!1,onCheckChange:()=>{console.log("Check changed")},onDelete:()=>{console.log("Delete clicked")}}},l={args:{order:{id:"4",orderNumber:"NMD20251115004",status:"REFUNDED",createdAt:"2025-11-15T16:45:00Z",outboundFlight:{flightNumber:"3U8888",airlineName:"四川航空",airlineIataCode:"3U",airlineLogoUrl:null,departureAirportName:"萧山国际机场",departureAirportIataCode:"HGH",departureCityName:"杭州",arrivalAirportName:"咸阳国际机场",arrivalAirportIataCode:"XIY",arrivalCityName:"西安",departureDatetime:"2025-11-20T14:30:00Z",arrivalDatetime:"2025-11-20T17:00:00Z",seatClassType:"ECONOMY"},inboundFlight:null,passengerNames:["孙七"],passengerCount:1,totalAmount:"888"},isChecked:!1,onCheckChange:()=>{console.log("Check changed")},onDelete:()=>{console.log("Delete clicked")}}},s={args:{order:{id:"5",orderNumber:"NMD20251118005",status:"PENDING_PAYMENT",createdAt:"2025-11-18T11:00:00Z",outboundFlight:{flightNumber:"MU5186",airlineName:"中国东方航空",airlineIataCode:"MU",airlineLogoUrl:null,departureAirportName:"首都国际机场",departureAirportIataCode:"PEK",departureCityName:"北京",arrivalAirportName:"虹桥国际机场",arrivalAirportIataCode:"SHA",arrivalCityName:"上海",departureDatetime:"2025-12-10T07:30:00Z",arrivalDatetime:"2025-12-10T09:45:00Z",seatClassType:"ECONOMY"},inboundFlight:{flightNumber:"MU8230",airlineName:"中国东方航空",airlineIataCode:"MU",airlineLogoUrl:null,departureAirportName:"虹桥国际机场",departureAirportIataCode:"SHA",departureCityName:"上海",arrivalAirportName:"首都国际机场",arrivalAirportIataCode:"PEK",arrivalCityName:"北京",departureDatetime:"2025-12-15T20:40:00Z",arrivalDatetime:"2025-12-15T22:55:00Z",seatClassType:"ECONOMY"},passengerNames:["周八"],passengerCount:1,totalAmount:"2000"},isChecked:!1,onCheckChange:()=>{console.log("Check changed")},onDelete:()=>{console.log("Delete clicked")},onActionClick:()=>{console.log("Go to payment clicked")}}},d={args:{order:{id:"6",orderNumber:"NMD20251117006",status:"CONFIRMED",createdAt:"2025-11-17T15:20:00Z",outboundFlight:{flightNumber:"CA1801",airlineName:"中国国际航空",airlineIataCode:"CA",airlineLogoUrl:null,departureAirportName:"虹桥国际机场",departureAirportIataCode:"SHA",departureCityName:"上海",arrivalAirportName:"白云国际机场",arrivalAirportIataCode:"CAN",arrivalCityName:"广州",departureDatetime:"2025-12-20T08:00:00Z",arrivalDatetime:"2025-12-20T10:30:00Z",seatClassType:"BUSINESS"},inboundFlight:{flightNumber:"CA1802",airlineName:"中国国际航空",airlineIataCode:"CA",airlineLogoUrl:null,departureAirportName:"白云国际机场",departureAirportIataCode:"CAN",departureCityName:"广州",arrivalAirportName:"虹桥国际机场",arrivalAirportIataCode:"SHA",arrivalCityName:"上海",departureDatetime:"2025-12-25T18:00:00Z",arrivalDatetime:"2025-12-25T20:30:00Z",seatClassType:"BUSINESS"},passengerNames:["吴九","郑十"],passengerCount:2,totalAmount:"4388"},isChecked:!1,onCheckChange:()=>{console.log("Check changed")},onDelete:()=>{console.log("Delete clicked")},onActionClick:()=>{console.log("Resend confirmation clicked")}}},m={args:{order:{id:"7",orderNumber:"NMD20251116007",status:"CANCELLED",createdAt:"2025-11-16T10:30:00Z",outboundFlight:{flightNumber:"HU7123",airlineName:"海南航空",airlineIataCode:"HU",airlineLogoUrl:null,departureAirportName:"双流国际机场",departureAirportIataCode:"CTU",departureCityName:"成都",arrivalAirportName:"首都国际机场",arrivalAirportIataCode:"PEK",arrivalCityName:"北京",departureDatetime:"2025-12-08T09:00:00Z",arrivalDatetime:"2025-12-08T11:30:00Z",seatClassType:"ECONOMY"},inboundFlight:{flightNumber:"HU7124",airlineName:"海南航空",airlineIataCode:"HU",airlineLogoUrl:null,departureAirportName:"首都国际机场",departureAirportIataCode:"PEK",departureCityName:"北京",arrivalAirportName:"双流国际机场",arrivalAirportIataCode:"CTU",arrivalCityName:"成都",departureDatetime:"2025-12-12T15:00:00Z",arrivalDatetime:"2025-12-12T17:30:00Z",seatClassType:"ECONOMY"},passengerNames:["冯十一"],passengerCount:1,totalAmount:"1888"},isChecked:!1,onCheckChange:()=>{console.log("Check changed")},onDelete:()=>{console.log("Delete clicked")}}},u={args:{order:{id:"8",orderNumber:"NMD20251115008",status:"REFUNDED",createdAt:"2025-11-15T13:00:00Z",outboundFlight:{flightNumber:"MF8501",airlineName:"厦门航空",airlineIataCode:"MF",airlineLogoUrl:null,departureAirportName:"萧山国际机场",departureAirportIataCode:"HGH",departureCityName:"杭州",arrivalAirportName:"高崎国际机场",arrivalAirportIataCode:"XMN",arrivalCityName:"厦门",departureDatetime:"2025-11-28T10:00:00Z",arrivalDatetime:"2025-11-28T11:45:00Z",seatClassType:"ECONOMY"},inboundFlight:{flightNumber:"MF8502",airlineName:"厦门航空",airlineIataCode:"MF",airlineLogoUrl:null,departureAirportName:"高崎国际机场",departureAirportIataCode:"XMN",departureCityName:"厦门",arrivalAirportName:"萧山国际机场",arrivalAirportIataCode:"HGH",arrivalCityName:"杭州",departureDatetime:"2025-12-02T16:00:00Z",arrivalDatetime:"2025-12-02T17:45:00Z",seatClassType:"ECONOMY"},passengerNames:["陈十二","褚十三","卫十四"],passengerCount:3,totalAmount:"2688"},isChecked:!1,onCheckChange:()=>{console.log("Check changed")},onDelete:()=>{console.log("Delete clicked")}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
      console.log("Check changed");
    },
    onDelete: () => {
      console.log("Delete clicked");
    },
    onActionClick: () => {
      console.log("Go to payment clicked");
    }
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
      console.log("Check changed");
    },
    onDelete: () => {
      console.log("Delete clicked");
    },
    onActionClick: () => {
      console.log("Resend confirmation clicked");
    }
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
      console.log("Check changed");
    },
    onDelete: () => {
      console.log("Delete clicked");
    }
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
      console.log("Check changed");
    },
    onDelete: () => {
      console.log("Delete clicked");
    }
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
      console.log("Check changed");
    },
    onDelete: () => {
      console.log("Delete clicked");
    },
    onActionClick: () => {
      console.log("Go to payment clicked");
    }
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
      console.log("Check changed");
    },
    onDelete: () => {
      console.log("Delete clicked");
    },
    onActionClick: () => {
      console.log("Resend confirmation clicked");
    }
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
      console.log("Check changed");
    },
    onDelete: () => {
      console.log("Delete clicked");
    }
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
      console.log("Check changed");
    },
    onDelete: () => {
      console.log("Delete clicked");
    }
  }
}`,...u.parameters?.docs?.source}}};const q=["OneWayPendingPayment","OneWayConfirmed","OneWayCancelled","OneWayRefunded","RoundTripPendingPayment","RoundTripConfirmed","RoundTripCancelled","RoundTripRefunded"];export{o as OneWayCancelled,i as OneWayConfirmed,n as OneWayPendingPayment,l as OneWayRefunded,m as RoundTripCancelled,d as RoundTripConfirmed,s as RoundTripPendingPayment,u as RoundTripRefunded,q as __namedExportsOrder,X as default};
