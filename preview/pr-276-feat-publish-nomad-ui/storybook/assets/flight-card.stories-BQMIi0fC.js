import{j as r}from"./iframe-BY6WQ8rl.js";import{F as z}from"./flight-card-Bcs7aap_.js";import{C as G,a as $}from"./card-C2MAT-zL.js";import{S as a}from"./skeleton-DUS3vXvI.js";import{a as J}from"./createLucideIcon-DhaeV68V.js";import"./button-Bkd1CeD9.js";import"./checkbox-D2fL6kQ1.js";import"./label-CxilLX0s.js";import"./select-H_oeIjBA.js";import"./separator-D3mo2s7R.js";import{f as Q}from"./currency-D-0V2y_1.js";import{s as Y}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./avatar-BhbOdaa6.js";import"./index-HIqmnw4t.js";import"./index-DRfufKDV.js";import"./index-Cg4mt3GG.js";import"./index-B6rVzEen.js";import"./arrow-right-JX-tWSat.js";import"./chevron-down-DdLcFoQ7.js";import"./index-sMO_WrMY.js";import"./index-CQLSNwcT.js";import"./check-DNbWv-jy.js";import"./index-BoBNlNV4.js";import"./index-BaiNJB1C.js";import"./index-D0-zYxe0.js";import"./index-jM_4ha9X.js";import"./index-BizkJoHM.js";import"./index-DmZccnKP.js";import"./currency.es-BSkspdt3.js";function g({className:e}){return r.jsx(G,{className:J("hover:shadow-lg transition-shadow w-full max-w-8xl",e),children:r.jsx($,{className:"pt-6",children:r.jsxs("div",{className:"flex items-center gap-6",children:[r.jsxs("div",{className:"flex items-center gap-3 min-w-[180px]",children:[r.jsx(a,{className:"h-12 w-12 rounded-full shrink-0"}),r.jsxs("div",{className:"flex flex-col gap-2",children:[r.jsx(a,{className:"h-4 w-28"}),r.jsx(a,{className:"h-3 w-20"})]})]}),r.jsxs("div",{className:"flex-1 flex items-center justify-center gap-8",children:[r.jsxs("div",{className:"flex flex-col items-center gap-2",children:[r.jsx(a,{className:"h-8 w-16"}),r.jsx(a,{className:"h-4 w-32"})]}),r.jsxs("div",{className:"flex flex-col items-center justify-center gap-2 min-w-32",children:[r.jsx(a,{className:"h-3 w-16"}),r.jsxs("div",{className:"w-full flex items-center",children:[r.jsx(a,{className:"flex-1 h-px"}),r.jsx(a,{className:"h-4 w-4 mx-1"}),r.jsx(a,{className:"flex-1 h-px"})]})]}),r.jsxs("div",{className:"flex flex-col items-center gap-2",children:[r.jsx(a,{className:"h-8 w-16"}),r.jsx(a,{className:"h-4 w-32"})]})]}),r.jsxs("div",{className:"flex items-center gap-4 ml-auto",children:[r.jsx(a,{className:"h-8 w-20"}),r.jsx(a,{className:"h-10 w-16 shrink-0"})]})]})})})}g.__docgenInfo={description:"",methods:[],displayName:"FlightCardSkeleton",props:{className:{required:!1,tsType:{name:"string"},description:"Custom className"}}};function i(e){return r.jsx(z,{...e,formatCurrency:Q})}i.__docgenInfo={description:"",methods:[],displayName:"FlightCard",props:{airlineLogo:{required:!1,tsType:{name:"string"},description:"Airline logo URL"},airlineName:{required:!0,tsType:{name:"string"},description:"Airline name"},flightNumber:{required:!0,tsType:{name:"string"},description:"Flight number"},aircraftType:{required:!0,tsType:{name:"string"},description:"Aircraft type"},departureTime:{required:!0,tsType:{name:"string"},description:"Departure time (HH:mm format)"},departureAirport:{required:!0,tsType:{name:"string"},description:"Departure airport"},arrivalTime:{required:!0,tsType:{name:"string"},description:"Arrival time (HH:mm format)"},arrivalAirport:{required:!0,tsType:{name:"string"},description:"Arrival airport"},daysOffset:{required:!1,tsType:{name:"number"},description:"Days offset (optional, e.g., +1, +2)"},duration:{required:!0,tsType:{name:"string"},description:'Total duration (e.g., "2h 55m")'},price:{required:!1,tsType:{name:"number"},description:"Price (number, in CNY) - for backward compatibility"},seatClasses:{required:!1,tsType:{name:"Array",elements:[{name:"SeatClassOption"}],raw:"SeatClassOption[]"},description:"Seat class options - for new expandable card"},lowestPrice:{required:!1,tsType:{name:"number"},description:"Lowest price (number, in CNY) - for new expandable card"},buttonText:{required:!1,tsType:{name:"string"},description:"Button text"},onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Button click handler - for backward compatibility (single price mode)"},onSeatClassClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(seatClass: SeatClassOption) => void",signature:{arguments:[{type:{name:"SeatClassOption"},name:"seatClass"}],return:{name:"void"}}},description:"Seat class button click handler - for new expandable card"},className:{required:!1,tsType:{name:"string"},description:"Custom className"}},composes:["Omit"]};var f,h,T,v,A,x,b,C,N,S,y,_,k,I,B,j,M,L,w,F,E,D,O,H,U,q,R,P,K,Z;const kr={title:"Flights/Results/FlightCard",component:i,parameters:{layout:"centered"},argTypes:{airlineLogo:{control:"text",description:"Airline logo URL"},airlineName:{control:"text",description:"Airline name"},flightNumber:{control:"text",description:"Flight number"},aircraftType:{control:"text",description:"Aircraft type"},departureTime:{control:"text",description:"Departure time (HH:mm format)"},departureAirport:{control:"text",description:"Departure airport"},arrivalTime:{control:"text",description:"Arrival time (HH:mm format)"},arrivalAirport:{control:"text",description:"Arrival airport"},daysOffset:{control:"number",description:"Days offset (optional, e.g., +1, +2)"},duration:{control:"text",description:"Total duration"},price:{control:"number",description:"Price (number, in CNY)"},buttonText:{control:"text",description:"Button text"}}},t={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"Book"}},o={args:{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",price:1250,buttonText:"Book"}},s={args:{airlineLogo:"https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",airlineName:"China Southern Airlines",flightNumber:"CZ389",aircraftType:"Airbus 330 (L)",departureTime:"08:30",departureAirport:"Shanghai Pudong Int'l T2",arrivalTime:"12:45",arrivalAirport:"Incheon Int'l T1",duration:"2h 15m",price:980,buttonText:"Select Outbound"}},n={args:{airlineLogo:"https://ui-avatars.com/api/?name=HU&background=FFD100&color=000",airlineName:"Hainan Airlines",flightNumber:"HU7925",aircraftType:"Boeing 737 (M)",departureTime:"14:20",departureAirport:"Haneda Airport T3",arrivalTime:"17:30",arrivalAirport:"Shanghai Hongqiao Int'l T2",duration:"3h 10m",price:1150,buttonText:"Book"}},l={args:{airlineLogo:"https://ui-avatars.com/api/?name=NH&background=1E3A8A&color=fff",airlineName:"All Nippon Airways",flightNumber:"NH920",aircraftType:"Boeing 787 (L)",departureTime:"10:00",departureAirport:"Shanghai Pudong Int'l T1",arrivalTime:"13:50",arrivalAirport:"Narita Int'l T1",duration:"2h 50m",price:3580,buttonText:"Book"}},p={args:{airlineLogo:"https://ui-avatars.com/api/?name=FM&background=DC143C&color=fff",airlineName:"Shanghai Airlines",flightNumber:"FM801",aircraftType:"Airbus 320 (M)",departureTime:"06:45",departureAirport:"Shanghai Hongqiao Int'l T2",arrivalTime:"08:20",arrivalAirport:"Guangzhou Baiyun Int'l T2",duration:"1h 35m",price:450,buttonText:"Book"}},m={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"Book"},render:e=>r.jsxs("div",{className:"space-y-4 w-full max-w-5xl p-4",children:[r.jsx(i,{...e}),r.jsx(i,{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",price:1250,buttonText:"Book"}),r.jsx(i,{airlineLogo:"https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",airlineName:"China Southern Airlines",flightNumber:"CZ389",aircraftType:"Airbus 330 (L)",departureTime:"08:30",departureAirport:"Shanghai Pudong Int'l T2",arrivalTime:"12:45",arrivalAirport:"Incheon Int'l T1",duration:"2h 15m",price:980,buttonText:"Select Outbound"})]})},u={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",seatClasses:[{id:"1",classType:"ECONOMY",totalSeats:150,availableSeats:45,price:804},{id:"2",classType:"BUSINESS",totalSeats:30,availableSeats:8,price:3200},{id:"3",classType:"FIRST",totalSeats:12,availableSeats:2,price:8500}],lowestPrice:804,buttonText:"预订",onSeatClassClick:e=>{Y.info("Selected seat class:",e)}}},c={args:{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",seatClasses:[{id:"1",classType:"ECONOMY",totalSeats:200,availableSeats:120,price:1250}],lowestPrice:1250,buttonText:"预订",onSeatClassClick:e=>{Y.info("Selected seat class:",e)}}},d={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"预订"},render:()=>r.jsxs("div",{className:"space-y-4 w-full max-w-5xl p-4",children:[r.jsx(g,{}),r.jsx(g,{}),r.jsx(g,{})]})};t.parameters={...t.parameters,docs:{...(f=t.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
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
}`,...(T=t.parameters)===null||T===void 0||(h=T.docs)===null||h===void 0?void 0:h.source}}};o.parameters={...o.parameters,docs:{...(v=o.parameters)===null||v===void 0?void 0:v.docs,source:{originalSource:`{
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
}`,...(x=o.parameters)===null||x===void 0||(A=x.docs)===null||A===void 0?void 0:A.source}}};s.parameters={...s.parameters,docs:{...(b=s.parameters)===null||b===void 0?void 0:b.docs,source:{originalSource:`{
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
}`,...(N=s.parameters)===null||N===void 0||(C=N.docs)===null||C===void 0?void 0:C.source}}};n.parameters={...n.parameters,docs:{...(S=n.parameters)===null||S===void 0?void 0:S.docs,source:{originalSource:`{
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
}`,...(_=n.parameters)===null||_===void 0||(y=_.docs)===null||y===void 0?void 0:y.source}}};l.parameters={...l.parameters,docs:{...(k=l.parameters)===null||k===void 0?void 0:k.docs,source:{originalSource:`{
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
}`,...(B=l.parameters)===null||B===void 0||(I=B.docs)===null||I===void 0?void 0:I.source}}};p.parameters={...p.parameters,docs:{...(j=p.parameters)===null||j===void 0?void 0:j.docs,source:{originalSource:`{
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
}`,...(L=p.parameters)===null||L===void 0||(M=L.docs)===null||M===void 0?void 0:M.source}}};m.parameters={...m.parameters,docs:{...(w=m.parameters)===null||w===void 0?void 0:w.docs,source:{originalSource:`{
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
}`,...(E=m.parameters)===null||E===void 0||(F=E.docs)===null||F===void 0?void 0:F.source}}};u.parameters={...u.parameters,docs:{...(D=u.parameters)===null||D===void 0?void 0:D.docs,source:{originalSource:`{
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
      storyLogger.info("Selected seat class:", seatClass);
    }
  }
}`,...(H=u.parameters)===null||H===void 0||(O=H.docs)===null||O===void 0?void 0:O.source}}};c.parameters={...c.parameters,docs:{...(U=c.parameters)===null||U===void 0?void 0:U.docs,source:{originalSource:`{
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
      storyLogger.info("Selected seat class:", seatClass);
    }
  }
}`,...(R=c.parameters)===null||R===void 0||(q=R.docs)===null||q===void 0?void 0:q.source}}};d.parameters={...d.parameters,docs:{...(P=d.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
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
}`,...(Z=d.parameters)===null||Z===void 0||(K=Z.docs)===null||K===void 0?void 0:K.source}}};const Ir=["Default","NextDay","RoundTripOutbound","RoundTripReturn","ExpensiveFlight","ShortFlight","MultipleFlights","MultiSeatClass","SingleSeatClass","Skeleton"];export{t as Default,l as ExpensiveFlight,u as MultiSeatClass,m as MultipleFlights,o as NextDay,s as RoundTripOutbound,n as RoundTripReturn,p as ShortFlight,c as SingleSeatClass,d as Skeleton,Ir as __namedExportsOrder,kr as default};
