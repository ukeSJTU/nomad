import{r as Z,j as e}from"./iframe-BJgykgVD.js";import{A as _,a as z,b as G}from"./avatar-DxuYbGKc.js";import{B as b}from"./button-DXG5o7vA.js";import{C as j,a as S}from"./card-nZeoFs75.js";import{b as y}from"./currency-D6RI6aWp.js";import{c as A}from"./utils-CBfrqCZ4.js";import{A as V}from"./arrow-right-CEYL8cLc.js";import{C as $}from"./chevron-up-abNbs2p3.js";import{C as J}from"./chevron-down-BYqHdB_L.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DkuPh9Su.js";import"./index-uwfhZi5g.js";import"./index-DdLAavYv.js";import"./index-tkGWHLHF.js";import"./index-CAxwE_jM.js";import"./index-CdJFUDDL.js";import"./createLucideIcon-9V33WfUP.js";function s({airlineLogo:a,airlineName:t,flightNumber:k,aircraftType:I,departureTime:w,departureAirport:B,arrivalTime:M,arrivalAirport:L,daysOffset:T,duration:E,price:F,seatClasses:n,lowestPrice:D,buttonText:C="预订",onButtonClick:O,onSeatClassClick:U,className:H}){const[N,q]=Z.useState(!1),P=i=>i.split(" ").map(Y=>Y[0]).join("").toUpperCase().slice(0,2),R=i=>{switch(i){case"ECONOMY":return"经济舱";case"BUSINESS":return"商务舱";case"FIRST":return"头等舱";default:return i}},v=n&&n.length>1,K=D??F??0;return e.jsx(j,{className:A("hover:shadow-lg transition-shadow w-full max-w-8xl",H),children:e.jsxs(S,{className:"py-2",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-[180px]",children:[e.jsxs(_,{className:"h-12 w-12 shrink-0",children:[e.jsx(z,{src:a,alt:t}),e.jsx(G,{className:"text-xs font-semibold",children:P(t)})]}),e.jsxs("div",{className:"flex flex-col gap-0.5",children:[e.jsx("div",{className:"text-sm font-medium text-foreground leading-tight",children:t}),e.jsxs("div",{className:"text-xs text-muted-foreground leading-tight",children:[k," ",I]})]})]}),e.jsxs("div",{className:"flex-1 flex items-center justify-center gap-8",children:[e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("div",{className:"text-2xl font-bold text-foreground leading-none",children:w}),e.jsx("div",{className:"text-sm text-muted-foreground leading-none",children:B})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center gap-1 min-w-32",children:[e.jsx("div",{className:"text-xs text-muted-foreground",children:E}),e.jsxs("div",{className:"w-full flex items-center",children:[e.jsx("div",{className:"flex-1 h-px bg-muted-foreground/30"}),e.jsx(V,{className:"h-4 w-4 text-muted-foreground mx-1"}),e.jsx("div",{className:"flex-1 h-px bg-muted-foreground/30"})]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsxs("div",{className:"text-2xl font-bold text-foreground leading-none",children:[M,T&&T>0&&e.jsxs("span",{className:"text-sm text-primary ml-1.5 font-medium",children:["+",T]})]}),e.jsx("div",{className:"text-sm text-muted-foreground leading-none",children:L})]})]}),e.jsxs("div",{className:"flex items-center gap-4 ml-auto",children:[e.jsx("div",{className:"flex flex-col items-end",children:e.jsxs("div",{className:"text-2xl font-bold text-secondary leading-none",children:[y(K),v&&e.jsx("span",{className:"text-sm text-muted-foreground ml-1",children:"起"})]})}),v?e.jsx(b,{onClick:()=>q(!N),variant:"secondary",className:"px-6 shrink-0",children:N?e.jsxs(e.Fragment,{children:["收起 ",e.jsx($,{className:"ml-2 h-4 w-4"})]}):e.jsxs(e.Fragment,{children:["订票 ",e.jsx(J,{className:"ml-2 h-4 w-4"})]})}):e.jsx(b,{onClick:O,variant:"secondary",className:"px-6 shrink-0",children:C})]})]}),v&&N&&n&&e.jsx("div",{className:"mt-4 pt-4 border-t space-y-2",children:n.map(i=>e.jsxs("div",{className:"flex items-center justify-between py-2 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"font-medium",children:R(i.classType)}),e.jsxs("div",{className:"text-sm text-muted-foreground",children:["剩余 ",i.availableSeats," 座"]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"text-xl font-bold text-secondary",children:y(i.price)}),e.jsx(b,{onClick:()=>U?.(i),variant:"secondary",className:"px-6",size:"sm",children:C})]})]},i.id))})]})})}s.__docgenInfo={description:"",methods:[],displayName:"FlightCard",props:{airlineLogo:{required:!1,tsType:{name:"string"},description:"Airline logo URL"},airlineName:{required:!0,tsType:{name:"string"},description:"Airline name"},flightNumber:{required:!0,tsType:{name:"string"},description:"Flight number"},aircraftType:{required:!0,tsType:{name:"string"},description:"Aircraft type"},departureTime:{required:!0,tsType:{name:"string"},description:"Departure time (HH:mm format)"},departureAirport:{required:!0,tsType:{name:"string"},description:"Departure airport"},arrivalTime:{required:!0,tsType:{name:"string"},description:"Arrival time (HH:mm format)"},arrivalAirport:{required:!0,tsType:{name:"string"},description:"Arrival airport"},daysOffset:{required:!1,tsType:{name:"number"},description:"Days offset (optional, e.g., +1, +2)"},duration:{required:!0,tsType:{name:"string"},description:'Total duration (e.g., "2h 55m")'},price:{required:!1,tsType:{name:"number"},description:"Price (number, in CNY) - for backward compatibility"},seatClasses:{required:!1,tsType:{name:"Array",elements:[{name:"SeatClassOption"}],raw:"SeatClassOption[]"},description:"Seat class options - for new expandable card"},lowestPrice:{required:!1,tsType:{name:"number"},description:"Lowest price (number, in CNY) - for new expandable card"},buttonText:{required:!1,tsType:{name:"string"},description:"Button text",defaultValue:{value:'"预订"',computed:!1}},onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Button click handler - for backward compatibility (single price mode)"},onSeatClassClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(seatClass: SeatClassOption) => void",signature:{arguments:[{type:{name:"SeatClassOption"},name:"seatClass"}],return:{name:"void"}}},description:"Seat class button click handler - for new expandable card"},className:{required:!1,tsType:{name:"string"},description:"Custom className"}}};function r({className:a,...t}){return e.jsx("div",{"data-slot":"skeleton",className:A("bg-accent animate-pulse rounded-md",a),...t})}r.__docgenInfo={description:"",methods:[],displayName:"Skeleton"};function x({className:a}){return e.jsx(j,{className:A("hover:shadow-lg transition-shadow w-full max-w-8xl",a),children:e.jsx(S,{className:"pt-6",children:e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-[180px]",children:[e.jsx(r,{className:"h-12 w-12 rounded-full shrink-0"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(r,{className:"h-4 w-28"}),e.jsx(r,{className:"h-3 w-20"})]})]}),e.jsxs("div",{className:"flex-1 flex items-center justify-center gap-8",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(r,{className:"h-8 w-16"}),e.jsx(r,{className:"h-4 w-32"})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center gap-2 min-w-32",children:[e.jsx(r,{className:"h-3 w-16"}),e.jsxs("div",{className:"w-full flex items-center",children:[e.jsx(r,{className:"flex-1 h-px"}),e.jsx(r,{className:"h-4 w-4 mx-1"}),e.jsx(r,{className:"flex-1 h-px"})]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(r,{className:"h-8 w-16"}),e.jsx(r,{className:"h-4 w-32"})]})]}),e.jsxs("div",{className:"flex items-center gap-4 ml-auto",children:[e.jsx(r,{className:"h-8 w-20"}),e.jsx(r,{className:"h-10 w-16 shrink-0"})]})]})})})}x.__docgenInfo={description:"",methods:[],displayName:"FlightCardSkeleton",props:{className:{required:!1,tsType:{name:"string"},description:"Custom className"}}};const ge={title:"Flights/Results/FlightCard",component:s,parameters:{layout:"centered"},argTypes:{airlineLogo:{control:"text",description:"Airline logo URL"},airlineName:{control:"text",description:"Airline name"},flightNumber:{control:"text",description:"Flight number"},aircraftType:{control:"text",description:"Aircraft type"},departureTime:{control:"text",description:"Departure time (HH:mm format)"},departureAirport:{control:"text",description:"Departure airport"},arrivalTime:{control:"text",description:"Arrival time (HH:mm format)"},arrivalAirport:{control:"text",description:"Arrival airport"},daysOffset:{control:"number",description:"Days offset (optional, e.g., +1, +2)"},duration:{control:"text",description:"Total duration"},price:{control:"number",description:"Price (number, in CNY)"},buttonText:{control:"text",description:"Button text"}}},o={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"Book"}},l={args:{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",price:1250,buttonText:"Book"}},c={args:{airlineLogo:"https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",airlineName:"China Southern Airlines",flightNumber:"CZ389",aircraftType:"Airbus 330 (L)",departureTime:"08:30",departureAirport:"Shanghai Pudong Int'l T2",arrivalTime:"12:45",arrivalAirport:"Incheon Int'l T1",duration:"2h 15m",price:980,buttonText:"Select Outbound"}},m={args:{airlineLogo:"https://ui-avatars.com/api/?name=HU&background=FFD100&color=000",airlineName:"Hainan Airlines",flightNumber:"HU7925",aircraftType:"Boeing 737 (M)",departureTime:"14:20",departureAirport:"Haneda Airport T3",arrivalTime:"17:30",arrivalAirport:"Shanghai Hongqiao Int'l T2",duration:"3h 10m",price:1150,buttonText:"Book"}},p={args:{airlineLogo:"https://ui-avatars.com/api/?name=NH&background=1E3A8A&color=fff",airlineName:"All Nippon Airways",flightNumber:"NH920",aircraftType:"Boeing 787 (L)",departureTime:"10:00",departureAirport:"Shanghai Pudong Int'l T1",arrivalTime:"13:50",arrivalAirport:"Narita Int'l T1",duration:"2h 50m",price:3580,buttonText:"Book"}},d={args:{airlineLogo:"https://ui-avatars.com/api/?name=FM&background=DC143C&color=fff",airlineName:"Shanghai Airlines",flightNumber:"FM801",aircraftType:"Airbus 320 (M)",departureTime:"06:45",departureAirport:"Shanghai Hongqiao Int'l T2",arrivalTime:"08:20",arrivalAirport:"Guangzhou Baiyun Int'l T2",duration:"1h 35m",price:450,buttonText:"Book"}},u={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"Book"},render:a=>e.jsxs("div",{className:"space-y-4 w-full max-w-5xl p-4",children:[e.jsx(s,{...a}),e.jsx(s,{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",price:1250,buttonText:"Book"}),e.jsx(s,{airlineLogo:"https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",airlineName:"China Southern Airlines",flightNumber:"CZ389",aircraftType:"Airbus 330 (L)",departureTime:"08:30",departureAirport:"Shanghai Pudong Int'l T2",arrivalTime:"12:45",arrivalAirport:"Incheon Int'l T1",duration:"2h 15m",price:980,buttonText:"Select Outbound"})]})},g={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",seatClasses:[{id:"1",classType:"ECONOMY",totalSeats:150,availableSeats:45,price:804},{id:"2",classType:"BUSINESS",totalSeats:30,availableSeats:8,price:3200},{id:"3",classType:"FIRST",totalSeats:12,availableSeats:2,price:8500}],lowestPrice:804,buttonText:"预订",onSeatClassClick:a=>{console.log("Selected seat class:",a)}}},f={args:{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",seatClasses:[{id:"1",classType:"ECONOMY",totalSeats:200,availableSeats:120,price:1250}],lowestPrice:1250,buttonText:"预订",onSeatClassClick:a=>{console.log("Selected seat class:",a)}}},h={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"预订"},render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-5xl p-4",children:[e.jsx(x,{}),e.jsx(x,{}),e.jsx(x,{})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
    seatClasses: [{
      id: "1",
      classType: "ECONOMY",
      totalSeats: 150,
      availableSeats: 45,
      price: 804
    }, {
      id: "2",
      classType: "BUSINESS",
      totalSeats: 30,
      availableSeats: 8,
      price: 3200
    }, {
      id: "3",
      classType: "FIRST",
      totalSeats: 12,
      availableSeats: 2,
      price: 8500
    }],
    lowestPrice: 804,
    buttonText: "预订",
    onSeatClassClick: seatClass => {
      console.log("Selected seat class:", seatClass);
    }
  }
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
    seatClasses: [{
      id: "1",
      classType: "ECONOMY",
      totalSeats: 200,
      availableSeats: 120,
      price: 1250
    }],
    lowestPrice: 1250,
    buttonText: "预订",
    onSeatClassClick: seatClass => {
      console.log("Selected seat class:", seatClass);
    }
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
    buttonText: "预订"
  },
  render: () => <div className="space-y-4 w-full max-w-5xl p-4">
      <FlightCardSkeleton />
      <FlightCardSkeleton />
      <FlightCardSkeleton />
    </div>
}`,...h.parameters?.docs?.source}}};const fe=["Default","NextDay","RoundTripOutbound","RoundTripReturn","ExpensiveFlight","ShortFlight","MultipleFlights","MultiSeatClass","SingleSeatClass","Skeleton"];export{o as Default,p as ExpensiveFlight,g as MultiSeatClass,u as MultipleFlights,l as NextDay,c as RoundTripOutbound,m as RoundTripReturn,d as ShortFlight,f as SingleSeatClass,h as Skeleton,fe as __namedExportsOrder,ge as default};
