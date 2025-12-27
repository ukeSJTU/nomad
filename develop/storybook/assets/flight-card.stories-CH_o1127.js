import{r as Ae,j as e}from"./iframe-Bg-UGac9.js";import{A as Ce,a as Se,b as ye}from"./avatar-Bxp9vvAg.js";import{B as S}from"./button-DDX2HNO5.js";import{C as te,a as se}from"./card-CQoZQPxY.js";import{b as ie}from"./currency-DgZtjahG.js";import{c as re}from"./utils-CDN07tui.js";import{A as je}from"./arrow-right-9pfW2Yx_.js";import{C as _e}from"./chevron-up-BZgtAYxJ.js";import{C as ke}from"./chevron-down-eWzm-ZM6.js";import{s as oe}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-S7CK3ozS.js";import"./index-B854MFqc.js";import"./index-KqqYSkLM.js";import"./index-CQuQOcOr.js";import"./index-njiYd0wI.js";import"./index-B_jtOnfb.js";import"./currency.es-BSkspdt3.js";import"./createLucideIcon-CaoxKut3.js";function s({airlineLogo:a,airlineName:t,flightNumber:ne,aircraftType:le,departureTime:de,departureAirport:ce,arrivalTime:me,arrivalAirport:pe,daysOffset:v,duration:ue,price:ge,seatClasses:o,lowestPrice:T,buttonText:ae="预订",onButtonClick:fe,onSeatClassClick:N,className:he}){const[b,xe]=Ae.useState(!1),ve=i=>i.split(" ").map(be=>be[0]).join("").toUpperCase().slice(0,2),Te=i=>{switch(i){case"ECONOMY":return"经济舱";case"BUSINESS":return"商务舱";case"FIRST":return"头等舱";default:return i}},A=o&&o.length>1;var C;const Ne=(C=T??ge)!==null&&C!==void 0?C:0;return e.jsx(te,{className:re("hover:shadow-lg transition-shadow w-full max-w-8xl",he),children:e.jsxs(se,{className:"py-2",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-[180px]",children:[e.jsxs(Ce,{className:"h-12 w-12 shrink-0",children:[e.jsx(Se,{src:a,alt:t}),e.jsx(ye,{className:"text-xs font-semibold",children:ve(t)})]}),e.jsxs("div",{className:"flex flex-col gap-0.5",children:[e.jsx("div",{className:"text-sm font-medium text-foreground leading-tight",children:t}),e.jsxs("div",{className:"text-xs text-muted-foreground leading-tight",children:[ne," ",le]})]})]}),e.jsxs("div",{className:"flex-1 flex items-center justify-center gap-8",children:[e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsx("div",{className:"text-2xl font-bold text-foreground leading-none",children:de}),e.jsx("div",{className:"text-sm text-muted-foreground leading-none",children:ce})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center gap-1 min-w-32",children:[e.jsx("div",{className:"text-xs text-muted-foreground",children:ue}),e.jsxs("div",{className:"w-full flex items-center",children:[e.jsx("div",{className:"flex-1 h-px bg-muted-foreground/30"}),e.jsx(je,{className:"h-4 w-4 text-muted-foreground mx-1"}),e.jsx("div",{className:"flex-1 h-px bg-muted-foreground/30"})]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-1",children:[e.jsxs("div",{className:"text-2xl font-bold text-foreground leading-none",children:[me,v&&v>0&&e.jsxs("span",{className:"text-sm text-primary ml-1.5 font-medium",children:["+",v]})]}),e.jsx("div",{className:"text-sm text-muted-foreground leading-none",children:pe})]})]}),e.jsxs("div",{className:"flex items-center gap-4 ml-auto",children:[e.jsx("div",{className:"flex flex-col items-end",children:e.jsxs("div",{className:"text-2xl font-bold text-secondary leading-none",children:[ie(Ne),A&&e.jsx("span",{className:"text-sm text-muted-foreground ml-1",children:"起"})]})}),A?e.jsx(S,{onClick:()=>xe(!b),variant:"secondary",className:"px-6 shrink-0",children:b?e.jsxs(e.Fragment,{children:["收起 ",e.jsx(_e,{className:"ml-2 h-4 w-4"})]}):e.jsxs(e.Fragment,{children:["订票 ",e.jsx(ke,{className:"ml-2 h-4 w-4"})]})}):e.jsx(S,{onClick:fe,variant:"secondary",className:"px-6 shrink-0",children:ae})]})]}),A&&b&&o&&e.jsx("div",{className:"mt-4 pt-4 border-t space-y-2",children:o.map(i=>e.jsxs("div",{className:"flex items-center justify-between py-2 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"font-medium",children:Te(i.classType)}),e.jsxs("div",{className:"text-sm text-muted-foreground",children:["剩余 ",i.availableSeats," 座"]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"text-xl font-bold text-secondary",children:ie(i.price)}),e.jsx(S,{onClick:()=>N?.(i),variant:"secondary",className:"px-6",size:"sm",children:ae})]})]},i.id))})]})})}s.__docgenInfo={description:"",methods:[],displayName:"FlightCard",props:{airlineLogo:{required:!1,tsType:{name:"string"},description:"Airline logo URL"},airlineName:{required:!0,tsType:{name:"string"},description:"Airline name"},flightNumber:{required:!0,tsType:{name:"string"},description:"Flight number"},aircraftType:{required:!0,tsType:{name:"string"},description:"Aircraft type"},departureTime:{required:!0,tsType:{name:"string"},description:"Departure time (HH:mm format)"},departureAirport:{required:!0,tsType:{name:"string"},description:"Departure airport"},arrivalTime:{required:!0,tsType:{name:"string"},description:"Arrival time (HH:mm format)"},arrivalAirport:{required:!0,tsType:{name:"string"},description:"Arrival airport"},daysOffset:{required:!1,tsType:{name:"number"},description:"Days offset (optional, e.g., +1, +2)"},duration:{required:!0,tsType:{name:"string"},description:'Total duration (e.g., "2h 55m")'},price:{required:!1,tsType:{name:"number"},description:"Price (number, in CNY) - for backward compatibility"},seatClasses:{required:!1,tsType:{name:"Array",elements:[{name:"SeatClassOption"}],raw:"SeatClassOption[]"},description:"Seat class options - for new expandable card"},lowestPrice:{required:!1,tsType:{name:"number"},description:"Lowest price (number, in CNY) - for new expandable card"},buttonText:{required:!1,tsType:{name:"string"},description:"Button text",defaultValue:{value:'"预订"',computed:!1}},onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Button click handler - for backward compatibility (single price mode)"},onSeatClassClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(seatClass: SeatClassOption) => void",signature:{arguments:[{type:{name:"SeatClassOption"},name:"seatClass"}],return:{name:"void"}}},description:"Seat class button click handler - for new expandable card"},className:{required:!1,tsType:{name:"string"},description:"Custom className"}}};function r({className:a,...t}){return e.jsx("div",{"data-slot":"skeleton",className:re("bg-accent animate-pulse rounded-md",a),...t})}r.__docgenInfo={description:"",methods:[],displayName:"Skeleton"};function x({className:a}){return e.jsx(te,{className:re("hover:shadow-lg transition-shadow w-full max-w-8xl",a),children:e.jsx(se,{className:"pt-6",children:e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"flex items-center gap-3 min-w-[180px]",children:[e.jsx(r,{className:"h-12 w-12 rounded-full shrink-0"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(r,{className:"h-4 w-28"}),e.jsx(r,{className:"h-3 w-20"})]})]}),e.jsxs("div",{className:"flex-1 flex items-center justify-center gap-8",children:[e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(r,{className:"h-8 w-16"}),e.jsx(r,{className:"h-4 w-32"})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center gap-2 min-w-32",children:[e.jsx(r,{className:"h-3 w-16"}),e.jsxs("div",{className:"w-full flex items-center",children:[e.jsx(r,{className:"flex-1 h-px"}),e.jsx(r,{className:"h-4 w-4 mx-1"}),e.jsx(r,{className:"flex-1 h-px"})]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(r,{className:"h-8 w-16"}),e.jsx(r,{className:"h-4 w-32"})]})]}),e.jsxs("div",{className:"flex items-center gap-4 ml-auto",children:[e.jsx(r,{className:"h-8 w-20"}),e.jsx(r,{className:"h-10 w-16 shrink-0"})]})]})})})}x.__docgenInfo={description:"",methods:[],displayName:"FlightCardSkeleton",props:{className:{required:!1,tsType:{name:"string"},description:"Custom className"}}};var y,j,_,k,I,B,w,M,L,F,E,D,O,U,H,R,q,P,K,Y,Z,z,G,V,$,J,Q,W,X,ee;const Ve={title:"Flights/Results/FlightCard",component:s,parameters:{layout:"centered"},argTypes:{airlineLogo:{control:"text",description:"Airline logo URL"},airlineName:{control:"text",description:"Airline name"},flightNumber:{control:"text",description:"Flight number"},aircraftType:{control:"text",description:"Aircraft type"},departureTime:{control:"text",description:"Departure time (HH:mm format)"},departureAirport:{control:"text",description:"Departure airport"},arrivalTime:{control:"text",description:"Arrival time (HH:mm format)"},arrivalAirport:{control:"text",description:"Arrival airport"},daysOffset:{control:"number",description:"Days offset (optional, e.g., +1, +2)"},duration:{control:"text",description:"Total duration"},price:{control:"number",description:"Price (number, in CNY)"},buttonText:{control:"text",description:"Button text"}}},n={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"Book"}},l={args:{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",price:1250,buttonText:"Book"}},d={args:{airlineLogo:"https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",airlineName:"China Southern Airlines",flightNumber:"CZ389",aircraftType:"Airbus 330 (L)",departureTime:"08:30",departureAirport:"Shanghai Pudong Int'l T2",arrivalTime:"12:45",arrivalAirport:"Incheon Int'l T1",duration:"2h 15m",price:980,buttonText:"Select Outbound"}},c={args:{airlineLogo:"https://ui-avatars.com/api/?name=HU&background=FFD100&color=000",airlineName:"Hainan Airlines",flightNumber:"HU7925",aircraftType:"Boeing 737 (M)",departureTime:"14:20",departureAirport:"Haneda Airport T3",arrivalTime:"17:30",arrivalAirport:"Shanghai Hongqiao Int'l T2",duration:"3h 10m",price:1150,buttonText:"Book"}},m={args:{airlineLogo:"https://ui-avatars.com/api/?name=NH&background=1E3A8A&color=fff",airlineName:"All Nippon Airways",flightNumber:"NH920",aircraftType:"Boeing 787 (L)",departureTime:"10:00",departureAirport:"Shanghai Pudong Int'l T1",arrivalTime:"13:50",arrivalAirport:"Narita Int'l T1",duration:"2h 50m",price:3580,buttonText:"Book"}},p={args:{airlineLogo:"https://ui-avatars.com/api/?name=FM&background=DC143C&color=fff",airlineName:"Shanghai Airlines",flightNumber:"FM801",aircraftType:"Airbus 320 (M)",departureTime:"06:45",departureAirport:"Shanghai Hongqiao Int'l T2",arrivalTime:"08:20",arrivalAirport:"Guangzhou Baiyun Int'l T2",duration:"1h 35m",price:450,buttonText:"Book"}},u={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"Book"},render:a=>e.jsxs("div",{className:"space-y-4 w-full max-w-5xl p-4",children:[e.jsx(s,{...a}),e.jsx(s,{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",price:1250,buttonText:"Book"}),e.jsx(s,{airlineLogo:"https://ui-avatars.com/api/?name=CZ&background=003E7E&color=fff",airlineName:"China Southern Airlines",flightNumber:"CZ389",aircraftType:"Airbus 330 (L)",departureTime:"08:30",departureAirport:"Shanghai Pudong Int'l T2",arrivalTime:"12:45",arrivalAirport:"Incheon Int'l T1",duration:"2h 15m",price:980,buttonText:"Select Outbound"})]})},g={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",seatClasses:[{id:"1",classType:"ECONOMY",totalSeats:150,availableSeats:45,price:804},{id:"2",classType:"BUSINESS",totalSeats:30,availableSeats:8,price:3200},{id:"3",classType:"FIRST",totalSeats:12,availableSeats:2,price:8500}],lowestPrice:804,buttonText:"预订",onSeatClassClick:a=>{oe.info("Selected seat class:",a)}}},f={args:{airlineLogo:"https://ui-avatars.com/api/?name=CA&background=E30000&color=fff",airlineName:"Air China",flightNumber:"CA183",aircraftType:"Boeing 777 (L)",departureTime:"23:30",departureAirport:"Beijing Capital Int'l T3",arrivalTime:"05:15",arrivalAirport:"Narita Int'l T2",daysOffset:1,duration:"3h 45m",seatClasses:[{id:"1",classType:"ECONOMY",totalSeats:200,availableSeats:120,price:1250}],lowestPrice:1250,buttonText:"预订",onSeatClassClick:a=>{oe.info("Selected seat class:",a)}}},h={args:{airlineLogo:"https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff",airlineName:"China Eastern Airlines",flightNumber:"MU277",aircraftType:"Airbus 321 (M)",departureTime:"17:05",departureAirport:"Beijing Daxing Int'l T1",arrivalTime:"21:00",arrivalAirport:"Kansai Int'l T1",duration:"2h 55m",price:804,buttonText:"预订"},render:()=>e.jsxs("div",{className:"space-y-4 w-full max-w-5xl p-4",children:[e.jsx(x,{}),e.jsx(x,{}),e.jsx(x,{})]})};n.parameters={...n.parameters,docs:{...(y=n.parameters)===null||y===void 0?void 0:y.docs,source:{originalSource:`{
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
}`,...(_=n.parameters)===null||_===void 0||(j=_.docs)===null||j===void 0?void 0:j.source}}};l.parameters={...l.parameters,docs:{...(k=l.parameters)===null||k===void 0?void 0:k.docs,source:{originalSource:`{
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
}`,...(B=l.parameters)===null||B===void 0||(I=B.docs)===null||I===void 0?void 0:I.source}}};d.parameters={...d.parameters,docs:{...(w=d.parameters)===null||w===void 0?void 0:w.docs,source:{originalSource:`{
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
}`,...(L=d.parameters)===null||L===void 0||(M=L.docs)===null||M===void 0?void 0:M.source}}};c.parameters={...c.parameters,docs:{...(F=c.parameters)===null||F===void 0?void 0:F.docs,source:{originalSource:`{
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
}`,...(D=c.parameters)===null||D===void 0||(E=D.docs)===null||E===void 0?void 0:E.source}}};m.parameters={...m.parameters,docs:{...(O=m.parameters)===null||O===void 0?void 0:O.docs,source:{originalSource:`{
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
}`,...(H=m.parameters)===null||H===void 0||(U=H.docs)===null||U===void 0?void 0:U.source}}};p.parameters={...p.parameters,docs:{...(R=p.parameters)===null||R===void 0?void 0:R.docs,source:{originalSource:`{
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
}`,...(P=p.parameters)===null||P===void 0||(q=P.docs)===null||q===void 0?void 0:q.source}}};u.parameters={...u.parameters,docs:{...(K=u.parameters)===null||K===void 0?void 0:K.docs,source:{originalSource:`{
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
}`,...(Z=u.parameters)===null||Z===void 0||(Y=Z.docs)===null||Y===void 0?void 0:Y.source}}};g.parameters={...g.parameters,docs:{...(z=g.parameters)===null||z===void 0?void 0:z.docs,source:{originalSource:`{
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
}`,...(V=g.parameters)===null||V===void 0||(G=V.docs)===null||G===void 0?void 0:G.source}}};f.parameters={...f.parameters,docs:{...($=f.parameters)===null||$===void 0?void 0:$.docs,source:{originalSource:`{
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
}`,...(Q=f.parameters)===null||Q===void 0||(J=Q.docs)===null||J===void 0?void 0:J.source}}};h.parameters={...h.parameters,docs:{...(W=h.parameters)===null||W===void 0?void 0:W.docs,source:{originalSource:`{
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
}`,...(ee=h.parameters)===null||ee===void 0||(X=ee.docs)===null||X===void 0?void 0:X.source}}};const $e=["Default","NextDay","RoundTripOutbound","RoundTripReturn","ExpensiveFlight","ShortFlight","MultipleFlights","MultiSeatClass","SingleSeatClass","Skeleton"];export{n as Default,m as ExpensiveFlight,g as MultiSeatClass,u as MultipleFlights,l as NextDay,d as RoundTripOutbound,c as RoundTripReturn,p as ShortFlight,f as SingleSeatClass,h as Skeleton,$e as __namedExportsOrder,Ve as default};
