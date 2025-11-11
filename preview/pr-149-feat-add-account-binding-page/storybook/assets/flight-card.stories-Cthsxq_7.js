import{j as r}from"./iframe-C9irGnsO.js";import{A as F,a as M,b as D}from"./avatar-Dv6UV_ZH.js";import{B as E}from"./button-BhrFrNdU.js";import{C as h,d as f}from"./card-CI0SwiQf.js";import{c as x}from"./utils-CBfrqCZ4.js";import{A as H}from"./arrow-right-DDcozAJo.js";import{S as e}from"./skeleton-Ch_4yqSt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DgDwIQuk.js";import"./index-BLHdVGJR.js";import"./index-yOq9H57v.js";import"./index-C-J0SOsc.js";import"./index-Ch_Q4g6q.js";import"./index-BQy1uiks.js";import"./index-CdJFUDDL.js";import"./createLucideIcon-pV7JZRaf.js";function i({airlineLogo:a,airlineName:d,flightNumber:T,aircraftType:N,departureTime:A,departureAirport:v,arrivalTime:b,arrivalAirport:j,daysOffset:g,duration:C,price:y,buttonText:k="订票",onButtonClick:B,className:I}){const w=S=>S.split(" ").map(L=>L[0]).join("").toUpperCase().slice(0,2);return r.jsx(h,{className:x("hover:shadow-lg transition-shadow w-full max-w-8xl",I),children:r.jsx(f,{className:"py-2",children:r.jsxs("div",{className:"flex items-center gap-6",children:[r.jsxs("div",{className:"flex items-center gap-3 min-w-[180px]",children:[r.jsxs(F,{className:"h-12 w-12 shrink-0",children:[r.jsx(M,{src:a,alt:d}),r.jsx(D,{className:"text-xs font-semibold",children:w(d)})]}),r.jsxs("div",{className:"flex flex-col gap-0.5",children:[r.jsx("div",{className:"text-sm font-medium text-foreground leading-tight",children:d}),r.jsxs("div",{className:"text-xs text-muted-foreground leading-tight",children:[T," ",N]})]})]}),r.jsxs("div",{className:"flex-1 flex items-center justify-center gap-8",children:[r.jsxs("div",{className:"flex flex-col items-center gap-1",children:[r.jsx("div",{className:"text-2xl font-bold text-foreground leading-none",children:A}),r.jsx("div",{className:"text-sm text-muted-foreground leading-none",children:v})]}),r.jsxs("div",{className:"flex flex-col items-center justify-center gap-1 min-w-32",children:[r.jsx("div",{className:"text-xs text-muted-foreground",children:C}),r.jsxs("div",{className:"w-full flex items-center",children:[r.jsx("div",{className:"flex-1 h-px bg-muted-foreground/30"}),r.jsx(H,{className:"h-4 w-4 text-muted-foreground mx-1"}),r.jsx("div",{className:"flex-1 h-px bg-muted-foreground/30"})]})]}),r.jsxs("div",{className:"flex flex-col items-center gap-1",children:[r.jsxs("div",{className:"text-2xl font-bold text-foreground leading-none",children:[b,g&&g>0&&r.jsxs("span",{className:"text-sm text-orange-500 ml-1.5 font-medium",children:["+",g]})]}),r.jsx("div",{className:"text-sm text-muted-foreground leading-none",children:j})]})]}),r.jsxs("div",{className:"flex items-center gap-4 ml-auto",children:[r.jsxs("div",{className:"text-2xl font-bold text-orange-500 leading-none",children:["¥",y.toLocaleString()]}),r.jsx(E,{onClick:B,className:"bg-orange-500 hover:bg-orange-600 text-white px-6 shrink-0",children:k})]})]})})})}i.__docgenInfo={description:"",methods:[],displayName:"FlightCard",props:{airlineLogo:{required:!1,tsType:{name:"string"},description:"Airline logo URL"},airlineName:{required:!0,tsType:{name:"string"},description:"Airline name"},flightNumber:{required:!0,tsType:{name:"string"},description:"Flight number"},aircraftType:{required:!0,tsType:{name:"string"},description:"Aircraft type"},departureTime:{required:!0,tsType:{name:"string"},description:"Departure time (HH:mm format)"},departureAirport:{required:!0,tsType:{name:"string"},description:"Departure airport"},arrivalTime:{required:!0,tsType:{name:"string"},description:"Arrival time (HH:mm format)"},arrivalAirport:{required:!0,tsType:{name:"string"},description:"Arrival airport"},daysOffset:{required:!1,tsType:{name:"number"},description:"Days offset (optional, e.g., +1, +2)"},duration:{required:!0,tsType:{name:"string"},description:'Total duration (e.g., "2h 55m")'},price:{required:!0,tsType:{name:"number"},description:"Price (number, in CNY)"},buttonText:{required:!1,tsType:{name:"string"},description:"Button text",defaultValue:{value:'"订票"',computed:!1}},onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Button click handler"},className:{required:!1,tsType:{name:"string"},description:"Custom className"}}};function u({className:a}){return r.jsx(h,{className:x("hover:shadow-lg transition-shadow w-full max-w-8xl",a),children:r.jsx(f,{className:"pt-6",children:r.jsxs("div",{className:"flex items-center gap-6",children:[r.jsxs("div",{className:"flex items-center gap-3 min-w-[180px]",children:[r.jsx(e,{className:"h-12 w-12 rounded-full shrink-0"}),r.jsxs("div",{className:"flex flex-col gap-2",children:[r.jsx(e,{className:"h-4 w-28"}),r.jsx(e,{className:"h-3 w-20"})]})]}),r.jsxs("div",{className:"flex-1 flex items-center justify-center gap-8",children:[r.jsxs("div",{className:"flex flex-col items-center gap-2",children:[r.jsx(e,{className:"h-8 w-16"}),r.jsx(e,{className:"h-4 w-32"})]}),r.jsxs("div",{className:"flex flex-col items-center justify-center gap-2 min-w-32",children:[r.jsx(e,{className:"h-3 w-16"}),r.jsxs("div",{className:"w-full flex items-center",children:[r.jsx(e,{className:"flex-1 h-px"}),r.jsx(e,{className:"h-4 w-4 mx-1"}),r.jsx(e,{className:"flex-1 h-px"})]})]}),r.jsxs("div",{className:"flex flex-col items-center gap-2",children:[r.jsx(e,{className:"h-8 w-16"}),r.jsx(e,{className:"h-4 w-32"})]})]}),r.jsxs("div",{className:"flex items-center gap-4 ml-auto",children:[r.jsx(e,{className:"h-8 w-20"}),r.jsx(e,{className:"h-10 w-16 shrink-0"})]})]})})})}u.__docgenInfo={description:"",methods:[],displayName:"FlightCardSkeleton",props:{className:{required:!1,tsType:{name:"string"},description:"Custom className"}}};const X={title:"Flights/FlightCard",component:i,parameters:{layout:"centered"},argTypes:{airlineLogo:{control:"text",description:"Airline logo URL"},airlineName:{control:"text",description:"Airline name"},flightNumber:{control:"text",description:"Flight number"},aircraftType:{control:"text",description:"Aircraft type"},departureTime:{control:"text",description:"Departure time (HH:mm format)"},departureAirport:{control:"text",description:"Departure airport"},arrivalTime:{control:"text",description:"Arrival time (HH:mm format)"},arrivalAirport:{control:"text",description:"Arrival airport"},daysOffset:{control:"number",description:"Days offset (optional, e.g., +1, +2)"},duration:{control:"text",description:"Total duration"},price:{control:"number",description:"Price (number, in CNY)"},buttonText:{control:"text",description:"Button text"}}},t={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"Book"}},o={args:{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",price:1250,buttonText:"Book"}},n={args:{airlineLogo:"https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",airlineName:"China Southern Airlines",flightNumber:"CZ389",aircraftType:"Airbus 330 (L)",departureTime:"08:30",departureAirport:"Shanghai Pudong Int'l T2",arrivalTime:"12:45",arrivalAirport:"Incheon Int'l T1",duration:"2h 15m",price:980,buttonText:"Select Outbound"}},s={args:{airlineLogo:"https://ui-avatars.com/api/?name=HU&background=FFD100&color=000",airlineName:"Hainan Airlines",flightNumber:"HU7925",aircraftType:"Boeing 737 (M)",departureTime:"14:20",departureAirport:"Haneda Airport T3",arrivalTime:"17:30",arrivalAirport:"Shanghai Hongqiao Int'l T2",duration:"3h 10m",price:1150,buttonText:"Book"}},l={args:{airlineLogo:"https://ui-avatars.com/api/?name=NH&background=1E3A8A&color=fff",airlineName:"All Nippon Airways",flightNumber:"NH920",aircraftType:"Boeing 787 (L)",departureTime:"10:00",departureAirport:"Shanghai Pudong Int'l T1",arrivalTime:"13:50",arrivalAirport:"Narita Int'l T1",duration:"2h 50m",price:3580,buttonText:"Book"}},m={args:{airlineLogo:"https://ui-avatars.com/api/?name=FM&background=DC143C&color=fff",airlineName:"Shanghai Airlines",flightNumber:"FM801",aircraftType:"Airbus 320 (M)",departureTime:"06:45",departureAirport:"Shanghai Hongqiao Int'l T2",arrivalTime:"08:20",arrivalAirport:"Guangzhou Baiyun Int'l T2",duration:"1h 35m",price:450,buttonText:"Book"}},c={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"Book"},render:a=>r.jsxs("div",{className:"space-y-4 w-full max-w-5xl p-4",children:[r.jsx(i,{...a}),r.jsx(i,{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",price:1250,buttonText:"Book"}),r.jsx(i,{airlineLogo:"https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",airlineName:"China Southern Airlines",flightNumber:"CZ389",aircraftType:"Airbus 330 (L)",departureTime:"08:30",departureAirport:"Shanghai Pudong Int'l T2",arrivalTime:"12:45",arrivalAirport:"Incheon Int'l T1",duration:"2h 15m",price:980,buttonText:"Select Outbound"})]})},p={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"订票"},render:()=>r.jsxs("div",{className:"space-y-4 w-full max-w-5xl p-4",children:[r.jsx(u,{}),r.jsx(u,{}),r.jsx(u,{})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    airlineLogo: "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",
    airlineName: "China Eastern Airlines",
    flightNumber: "MU277",
    aircraftType: "Airbus 321 (M)",
    departureTime: "17:05",
    departureAirport: "Beijing Daxing Int'l T1",
    arrivalTime: "21:00",
    arrivalAirport: "Kansai Int'l T1",
    duration: "2h 55m",
    price: 804,
    buttonText: "Book"
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    airlineLogo: "https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",
    airlineName: "Air China",
    flightNumber: "CA183",
    aircraftType: "Boeing 777 (L)",
    departureTime: "23:30",
    departureAirport: "Beijing Capital Int'l T3",
    arrivalTime: "05:15",
    arrivalAirport: "Narita Int'l T2",
    daysOffset: 1,
    duration: "3h 45m",
    price: 1250,
    buttonText: "Book"
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    airlineLogo: "https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",
    airlineName: "China Southern Airlines",
    flightNumber: "CZ389",
    aircraftType: "Airbus 330 (L)",
    departureTime: "08:30",
    departureAirport: "Shanghai Pudong Int'l T2",
    arrivalTime: "12:45",
    arrivalAirport: "Incheon Int'l T1",
    duration: "2h 15m",
    price: 980,
    buttonText: "Select Outbound"
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    airlineLogo: "https://ui-avatars.com/api/?name=HU&background=FFD100&color=000",
    airlineName: "Hainan Airlines",
    flightNumber: "HU7925",
    aircraftType: "Boeing 737 (M)",
    departureTime: "14:20",
    departureAirport: "Haneda Airport T3",
    arrivalTime: "17:30",
    arrivalAirport: "Shanghai Hongqiao Int'l T2",
    duration: "3h 10m",
    price: 1150,
    buttonText: "Book"
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    airlineLogo: "https://ui-avatars.com/api/?name=NH&background=1E3A8A&color=fff",
    airlineName: "All Nippon Airways",
    flightNumber: "NH920",
    aircraftType: "Boeing 787 (L)",
    departureTime: "10:00",
    departureAirport: "Shanghai Pudong Int'l T1",
    arrivalTime: "13:50",
    arrivalAirport: "Narita Int'l T1",
    duration: "2h 50m",
    price: 3580,
    buttonText: "Book"
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    airlineLogo: "https://ui-avatars.com/api/?name=FM&background=DC143C&color=fff",
    airlineName: "Shanghai Airlines",
    flightNumber: "FM801",
    aircraftType: "Airbus 320 (M)",
    departureTime: "06:45",
    departureAirport: "Shanghai Hongqiao Int'l T2",
    arrivalTime: "08:20",
    arrivalAirport: "Guangzhou Baiyun Int'l T2",
    duration: "1h 35m",
    price: 450,
    buttonText: "Book"
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    airlineLogo: "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",
    airlineName: "China Eastern Airlines",
    flightNumber: "MU277",
    aircraftType: "Airbus 321 (M)",
    departureTime: "17:05",
    departureAirport: "Beijing Daxing Int'l T1",
    arrivalTime: "21:00",
    arrivalAirport: "Kansai Int'l T1",
    duration: "2h 55m",
    price: 804,
    buttonText: "Book"
  },
  render: args => <div className="space-y-4 w-full max-w-5xl p-4">
      <FlightCard {...args} />
      <FlightCard airlineLogo="https://ui-avatars.com/api/?name=CA&background=E30000&color=fff" airlineName="Air China" flightNumber="CA183" aircraftType="Boeing 777 (L)" departureTime="23:30" departureAirport="Beijing Capital Int'l T3" arrivalTime="05:15" arrivalAirport="Narita Int'l T2" daysOffset={1} duration="3h 45m" price={1250} buttonText="Book" />
      <FlightCard airlineLogo="https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff" airlineName="China Southern Airlines" flightNumber="CZ389" aircraftType="Airbus 330 (L)" departureTime="08:30" departureAirport="Shanghai Pudong Int'l T2" arrivalTime="12:45" arrivalAirport="Incheon Int'l T1" duration="2h 15m" price={980} buttonText="Select Outbound" />
    </div>
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    airlineLogo: "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",
    airlineName: "China Eastern Airlines",
    flightNumber: "MU277",
    aircraftType: "Airbus 321 (M)",
    departureTime: "17:05",
    departureAirport: "Beijing Daxing Int'l T1",
    arrivalTime: "21:00",
    arrivalAirport: "Kansai Int'l T1",
    duration: "2h 55m",
    price: 804,
    buttonText: "订票"
  },
  render: () => <div className="space-y-4 w-full max-w-5xl p-4">
      <FlightCardSkeleton />
      <FlightCardSkeleton />
      <FlightCardSkeleton />
    </div>
}`,...p.parameters?.docs?.source}}};const rr=["Default","NextDay","RoundTripOutbound","RoundTripReturn","ExpensiveFlight","ShortFlight","MultipleFlights","Skeleton"];export{t as Default,l as ExpensiveFlight,c as MultipleFlights,o as NextDay,n as RoundTripOutbound,s as RoundTripReturn,m as ShortFlight,p as Skeleton,rr as __namedExportsOrder,X as default};
