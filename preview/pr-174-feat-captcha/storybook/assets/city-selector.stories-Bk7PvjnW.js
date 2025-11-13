import{r as n,j as e}from"./iframe-D4eLYiyQ.js";import{B as C}from"./button-LS74QlCX.js";import{D as P,a as F,b as z,c as B}from"./dropdown-menu-Dmcn1HdY.js";import{S as E}from"./separator-C3LECJM4.js";import{T as W,a as q,b as R,c as M}from"./tabs-BWRu7NmR.js";import{A as Y}from"./arrow-left-right-BUHXufe0.js";import"./preload-helper-PPVm8Dsz.js";import"./index-jsrOXmlY.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./index-By9Q8yio.js";import"./index-BrFyW5M1.js";import"./index-B21EvTLy.js";import"./index-n4CfLAso.js";import"./index-D-vE0zg6.js";import"./index-D2UapKmZ.js";import"./index-1QX4VWjH.js";import"./index-CVr0wknB.js";import"./Combination-C-Fjx7Vm.js";import"./index-DiiEyiBf.js";import"./index-BOd6SQgT.js";import"./index-Bxdcou5C.js";import"./index-RphgqhJB.js";import"./index-DAcsmNmY.js";import"./chevron-right-CCbamzvk.js";import"./createLucideIcon-Cophifpq.js";const k=[{label:"热门",value:"popular"},{label:"ABCDEF",value:"ABCDEF",letters:["A","B","C","D","E","F"]},{label:"GHIJ",value:"GHIJ",letters:["G","H","I","J"]},{label:"KLMN",value:"KLMN",letters:["K","L","M","N"]},{label:"PQRSTUV",value:"PQRSTUV",letters:["P","Q","R","S","T","U","V"]},{label:"WXYZ",value:"WXYZ",letters:["W","X","Y","Z"]}],_=[{label:"热门",value:"popular"},{label:"亚洲",value:"Asia"},{label:"欧洲",value:"Europe"},{label:"美洲",value:"America"},{label:"非洲",value:"Africa"},{label:"大洋洲",value:"Oceania"}];function T({onSelect:t,title:r="选择城市",selectedCity:a,cities:i,children:o,open:p,onOpenChange:v}){const y=i,[m,h]=n.useState("domestic"),[c,x]=n.useState("popular"),O=n.useMemo(()=>{if(m==="domestic"){const u=y.filter(s=>s.pinyinFirstLetter!==null);if(c==="popular")return u.filter(s=>s.isPopular);{const s=k.find(j=>j.value===c);if(s?.letters)return u.filter(j=>s.letters.includes(j.pinyinFirstLetter))}}else{const u=y.filter(s=>s.continent!==null);return c==="popular"?u.filter(s=>s.isPopular):u.filter(s=>s.continent===c)}return[]},[y,m,c]),I=u=>{t(u),v?.(!1)},b=u=>{h(u),x("popular")},L=m==="domestic"?k:_;return e.jsxs(P,{open:p,onOpenChange:v,children:[e.jsx(F,{asChild:!0,children:o}),e.jsx(z,{className:"w-[600px] p-0",align:"start",children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-40 border-r bg-muted/30 p-2 flex flex-col gap-1",children:[e.jsx(B,{className:"px-2 py-1.5 text-xs text-muted-foreground",children:r}),e.jsx(C,{variant:m==="domestic"?"secondary":"ghost",className:"justify-start w-full",onClick:()=>b("domestic"),children:"国内"}),e.jsx(C,{variant:m==="international"?"secondary":"ghost",className:"justify-start w-full",onClick:()=>b("international"),children:"国际及港澳台"})]}),e.jsx("div",{className:"flex-1 flex flex-col",children:e.jsxs(W,{value:c,onValueChange:x,className:"flex-1 flex flex-col",children:[e.jsx(q,{className:"rounded-none bg-transparent p-0 h-9 justify-start shrink-0 overflow-x-auto",children:L.map(u=>e.jsx(R,{value:u.value,className:"rounded-none border-0 bg-transparent px-3 py-1.5 text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-foreground transition-colors",children:u.label},u.value))}),e.jsx(E,{}),L.map(u=>e.jsx(M,{value:u.value,className:"flex-1 overflow-y-auto p-4 mt-0",children:e.jsx("div",{className:"grid grid-cols-5 gap-x-2 gap-y-2",children:O.length===0?e.jsx("div",{className:"col-span-5 text-center text-muted-foreground py-8",children:"暂无城市数据"}):O.map(s=>e.jsxs(C,{variant:a?.iataCode===s.iataCode?"default":"ghost",onClick:()=>I(s),className:"justify-center h-auto py-1.5 px-2 text-sm",children:[e.jsx("span",{className:"font-medium",children:s.name}),e.jsx("span",{className:"text-xs text-muted-foreground",children:s.iataCode})]},s.iataCode))})},u.value))]})})]})})]})}function d({departureCity:t,arrivalCity:r,onDepartureCityChange:a,onArrivalCityChange:i,onSwap:o,cities:p}){const[v,y]=n.useState(!1),[m,h]=n.useState(!1),c=x=>{a(x),h(!0)};return e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"flex-1",children:e.jsx(T,{onSelect:c,title:"选择出发城市",selectedCity:t,cities:p,open:v,onOpenChange:y,children:e.jsxs(C,{variant:"outline",className:"w-full h-16 flex flex-col items-start justify-center",children:[e.jsx("span",{className:"text-xs text-muted-foreground",children:"出发地"}),e.jsx("span",{className:"text-lg font-medium",children:t?`${t.name}(${t.iataCode})`:"请选择"})]})})}),o&&e.jsx(C,{variant:"ghost",size:"icon",onClick:o,className:"shrink-0",children:e.jsx(Y,{className:"h-4 w-4"})}),e.jsx("div",{className:"flex-1",children:e.jsx(T,{onSelect:i,title:"选择到达城市",selectedCity:r,cities:p,open:m,onOpenChange:h,children:e.jsxs(C,{variant:"outline",className:"w-full h-16 flex flex-col items-start justify-center",children:[e.jsx("span",{className:"text-xs text-muted-foreground",children:"目的地"}),e.jsx("span",{className:"text-lg font-medium",children:r?`${r.name}(${r.iataCode})`:"请选择"})]})})})]})}T.__docgenInfo={description:"",methods:[],displayName:"CitySelector",props:{onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"选择城市"',computed:!1}},selectedCity:{required:!1,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},cities:{required:!0,tsType:{name:"Array",elements:[{name:"CityData"}],raw:"CityData[]"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:""}}};d.__docgenInfo={description:"",methods:[],displayName:"CityInput",props:{departureCity:{required:!0,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},arrivalCity:{required:!0,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},onDepartureCityChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},onArrivalCityChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},onSwap:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},cities:{required:!0,tsType:{name:"Array",elements:[{name:"CityData"}],raw:"CityData[]"},description:""}}};const l=[{iataCode:"PEK",name:"北京",timezone:"Asia/Shanghai",pinyinFirstLetter:"B",continent:null,isPopular:!0,displayOrder:1},{iataCode:"SHA",name:"上海",timezone:"Asia/Shanghai",pinyinFirstLetter:"S",continent:null,isPopular:!0,displayOrder:2},{iataCode:"CAN",name:"广州",timezone:"Asia/Shanghai",pinyinFirstLetter:"G",continent:null,isPopular:!0,displayOrder:3},{iataCode:"SZX",name:"深圳",timezone:"Asia/Shanghai",pinyinFirstLetter:"S",continent:null,isPopular:!0,displayOrder:4},{iataCode:"CTU",name:"成都",timezone:"Asia/Shanghai",pinyinFirstLetter:"C",continent:null,isPopular:!0,displayOrder:5},{iataCode:"HGH",name:"杭州",timezone:"Asia/Shanghai",pinyinFirstLetter:"H",continent:null,isPopular:!0,displayOrder:6},{iataCode:"XIY",name:"西安",timezone:"Asia/Shanghai",pinyinFirstLetter:"X",continent:null,isPopular:!1,displayOrder:10},{iataCode:"WUH",name:"武汉",timezone:"Asia/Shanghai",pinyinFirstLetter:"W",continent:null,isPopular:!1,displayOrder:11},{iataCode:"NKG",name:"南京",timezone:"Asia/Shanghai",pinyinFirstLetter:"N",continent:null,isPopular:!1,displayOrder:12},{iataCode:"KMG",name:"昆明",timezone:"Asia/Shanghai",pinyinFirstLetter:"K",continent:null,isPopular:!1,displayOrder:13},{iataCode:"TYO",name:"东京",timezone:"Asia/Tokyo",pinyinFirstLetter:null,continent:"Asia",isPopular:!0,displayOrder:100},{iataCode:"NYC",name:"纽约",timezone:"America/New_York",pinyinFirstLetter:null,continent:"America",isPopular:!0,displayOrder:101},{iataCode:"LON",name:"伦敦",timezone:"Europe/London",pinyinFirstLetter:null,continent:"Europe",isPopular:!0,displayOrder:102},{iataCode:"PAR",name:"巴黎",timezone:"Europe/Paris",pinyinFirstLetter:null,continent:"Europe",isPopular:!0,displayOrder:103},{iataCode:"SIN",name:"新加坡",timezone:"Asia/Singapore",pinyinFirstLetter:null,continent:"Asia",isPopular:!0,displayOrder:104},{iataCode:"SYD",name:"悉尼",timezone:"Australia/Sydney",pinyinFirstLetter:null,continent:"Oceania",isPopular:!1,displayOrder:200},{iataCode:"DXB",name:"迪拜",timezone:"Asia/Dubai",pinyinFirstLetter:null,continent:"Asia",isPopular:!1,displayOrder:201},{iataCode:"LAX",name:"洛杉矶",timezone:"America/Los_Angeles",pinyinFirstLetter:null,continent:"America",isPopular:!1,displayOrder:202},{iataCode:"CAI",name:"开罗",timezone:"Africa/Cairo",pinyinFirstLetter:null,continent:"Africa",isPopular:!1,displayOrder:203}],ve={title:"Flights/CityInput",component:d,parameters:{layout:"centered"},tags:["autodocs"]},g={render:()=>{const[t,r]=n.useState(null),[a,i]=n.useState(null),o=()=>{const p=t;r(a),i(p)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(d,{departureCity:t,arrivalCity:a,onDepartureCityChange:r,onArrivalCityChange:i,onSwap:o,cities:l}),e.jsx("div",{className:"mt-4 text-sm text-muted-foreground",children:e.jsx("p",{children:"💡 Tip: Arrival selector auto-opens after selecting departure city"})})]})}},f={render:()=>{const[t,r]=n.useState(l[0]),[a,i]=n.useState(null),o=()=>{const p=t;r(a),i(p)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(d,{departureCity:t,arrivalCity:a,onDepartureCityChange:r,onArrivalCityChange:i,onSwap:o,cities:l}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name]}),e.jsx("p",{children:"Arrival: Not selected"})]})]})}},S={render:()=>{const[t,r]=n.useState(null),[a,i]=n.useState(l[1]),o=()=>{const p=t;r(a),i(p)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(d,{departureCity:t,arrivalCity:a,onDepartureCityChange:r,onArrivalCityChange:i,onSwap:o,cities:l}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsx("p",{children:"Departure: Not selected"}),e.jsxs("p",{children:["Arrival: ",a?.name]})]})]})}},D={render:()=>{const[t,r]=n.useState(l[0]),[a,i]=n.useState(l[1]),o=()=>{const p=t;r(a),i(p)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(d,{departureCity:t,arrivalCity:a,onDepartureCityChange:r,onArrivalCityChange:i,onSwap:o,cities:l}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,")"]}),e.jsxs("p",{children:["Arrival: ",a?.name," (",a?.iataCode,")"]}),e.jsx("p",{className:"mt-2",children:"💡 Click the swap button to exchange cities"})]})]})}},A={render:()=>{const[t,r]=n.useState(l[10]),[a,i]=n.useState(l[11]),o=()=>{const p=t;r(a),i(p)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(d,{departureCity:t,arrivalCity:a,onDepartureCityChange:r,onArrivalCityChange:i,onSwap:o,cities:l}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,")"]}),e.jsxs("p",{children:["Arrival: ",a?.name," (",a?.iataCode,")"]}),e.jsx("p",{className:"mt-2",children:"🌍 International flight example"})]})]})}},w={render:()=>{const[t,r]=n.useState(l[0]),[a,i]=n.useState(l[10]),o=()=>{const p=t;r(a),i(p)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(d,{departureCity:t,arrivalCity:a,onDepartureCityChange:r,onArrivalCityChange:i,onSwap:o,cities:l}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,") - Domestic"]}),e.jsxs("p",{children:["Arrival: ",a?.name," (",a?.iataCode,") - International"]})]})]})}},N={render:()=>{const[t,r]=n.useState(l[0]),[a,i]=n.useState(l[1]);return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(d,{departureCity:t,arrivalCity:a,onDepartureCityChange:r,onArrivalCityChange:i,cities:l}),e.jsx("div",{className:"mt-4 text-sm text-muted-foreground",children:e.jsx("p",{children:"💡 Swap button is hidden when onSwap prop is not provided"})})]})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(null);
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(null);
    const handleSwap = () => {
      const temp = departureCity;
      setDepartureCity(arrivalCity);
      setArrivalCity(temp);
    };
    return <div className="w-[600px]">
        <CityInput departureCity={departureCity} arrivalCity={arrivalCity} onDepartureCityChange={setDepartureCity} onArrivalCityChange={setArrivalCity} onSwap={handleSwap} cities={mockCities} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            💡 Tip: Arrival selector auto-opens after selecting departure city
          </p>
        </div>
      </div>;
  }
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(mockCities[0] // Beijing
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(null);
    const handleSwap = () => {
      const temp = departureCity;
      setDepartureCity(arrivalCity);
      setArrivalCity(temp);
    };
    return <div className="w-[600px]">
        <CityInput departureCity={departureCity} arrivalCity={arrivalCity} onDepartureCityChange={setDepartureCity} onArrivalCityChange={setArrivalCity} onSwap={handleSwap} cities={mockCities} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Departure: {departureCity?.name}</p>
          <p>Arrival: Not selected</p>
        </div>
      </div>;
  }
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(null);
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(mockCities[1] // Shanghai
    );
    const handleSwap = () => {
      const temp = departureCity;
      setDepartureCity(arrivalCity);
      setArrivalCity(temp);
    };
    return <div className="w-[600px]">
        <CityInput departureCity={departureCity} arrivalCity={arrivalCity} onDepartureCityChange={setDepartureCity} onArrivalCityChange={setArrivalCity} onSwap={handleSwap} cities={mockCities} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Departure: Not selected</p>
          <p>Arrival: {arrivalCity?.name}</p>
        </div>
      </div>;
  }
}`,...S.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(mockCities[0] // Beijing
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(mockCities[1] // Shanghai
    );
    const handleSwap = () => {
      const temp = departureCity;
      setDepartureCity(arrivalCity);
      setArrivalCity(temp);
    };
    return <div className="w-[600px]">
        <CityInput departureCity={departureCity} arrivalCity={arrivalCity} onDepartureCityChange={setDepartureCity} onArrivalCityChange={setArrivalCity} onSwap={handleSwap} cities={mockCities} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Departure: {departureCity?.name} ({departureCity?.iataCode})
          </p>
          <p>
            Arrival: {arrivalCity?.name} ({arrivalCity?.iataCode})
          </p>
          <p className="mt-2">💡 Click the swap button to exchange cities</p>
        </div>
      </div>;
  }
}`,...D.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(mockCities[10] // Tokyo
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(mockCities[11] // New York
    );
    const handleSwap = () => {
      const temp = departureCity;
      setDepartureCity(arrivalCity);
      setArrivalCity(temp);
    };
    return <div className="w-[600px]">
        <CityInput departureCity={departureCity} arrivalCity={arrivalCity} onDepartureCityChange={setDepartureCity} onArrivalCityChange={setArrivalCity} onSwap={handleSwap} cities={mockCities} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Departure: {departureCity?.name} ({departureCity?.iataCode})
          </p>
          <p>
            Arrival: {arrivalCity?.name} ({arrivalCity?.iataCode})
          </p>
          <p className="mt-2">🌍 International flight example</p>
        </div>
      </div>;
  }
}`,...A.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(mockCities[0] // Beijing
    );
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(mockCities[10] // Tokyo
    );
    const handleSwap = () => {
      const temp = departureCity;
      setDepartureCity(arrivalCity);
      setArrivalCity(temp);
    };
    return <div className="w-[600px]">
        <CityInput departureCity={departureCity} arrivalCity={arrivalCity} onDepartureCityChange={setDepartureCity} onArrivalCityChange={setArrivalCity} onSwap={handleSwap} cities={mockCities} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Departure: {departureCity?.name} ({departureCity?.iataCode}) -
            Domestic
          </p>
          <p>
            Arrival: {arrivalCity?.name} ({arrivalCity?.iataCode}) -
            International
          </p>
        </div>
      </div>;
  }
}`,...w.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [departureCity, setDepartureCity] = useState<CityData | null>(mockCities[0]);
    const [arrivalCity, setArrivalCity] = useState<CityData | null>(mockCities[1]);
    return <div className="w-[600px]">
        <CityInput departureCity={departureCity} arrivalCity={arrivalCity} onDepartureCityChange={setDepartureCity} onArrivalCityChange={setArrivalCity} cities={mockCities} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>💡 Swap button is hidden when onSwap prop is not provided</p>
        </div>
      </div>;
  }
}`,...N.parameters?.docs?.source}}};const he=["Default","WithDepartureCity","WithArrivalCity","WithBothCitiesDomestic","WithBothCitiesInternational","DomesticToInternational","WithoutSwapButton"];export{g as Default,w as DomesticToInternational,S as WithArrivalCity,D as WithBothCitiesDomestic,A as WithBothCitiesInternational,f as WithDepartureCity,N as WithoutSwapButton,he as __namedExportsOrder,ve as default};
