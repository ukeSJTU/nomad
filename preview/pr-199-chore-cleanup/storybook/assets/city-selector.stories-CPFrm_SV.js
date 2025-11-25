import{r as o,j as e}from"./iframe-Dd3AqlOG.js";import{B as g}from"./button-vXVpJ6RZ.js";import{D as Q,a as ee,b as te,c as ae}from"./dropdown-menu-_g82uzng.js";import{S as re}from"./separator-DY_cBFgl.js";import{u as ie,c as P,P as ne}from"./index-NudYPprN.js";import{c as se}from"./index-B2ByjUQR.js";import{c as E,R as oe,I as le}from"./index-DlOaIYsF.js";import{P as b}from"./index-Bqb6DZeW.js";import{u as de}from"./index-CCqbI7HL.js";import{u as ue}from"./index-ZjRYLnCe.js";import{c as T}from"./utils-CBfrqCZ4.js";import{A as ce}from"./arrow-left-right-CwklQcHf.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C2Z9wzF5.js";import"./index-CdJFUDDL.js";import"./index-B11B4zqu.js";import"./index-DOLyc8kp.js";import"./index-uF32jcgg.js";import"./Combination-C4858Lk4.js";import"./index-Cp2i3xJo.js";import"./index-B6vMN2vG.js";import"./createLucideIcon-aqlq-bZC.js";var I="Tabs",[pe]=se(I,[E]),z=E(),[me,O]=pe(I),M=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:i,onValueChange:n,defaultValue:s,orientation:d="horizontal",dir:C,activationMode:y="automatic",...v}=t,l=de(C),[c,h]=ie({prop:i,onChange:n,defaultProp:s??"",caller:I});return e.jsx(me,{scope:r,baseId:ue(),value:c,onValueChange:h,orientation:d,dir:l,activationMode:y,children:e.jsx(b.div,{dir:l,"data-orientation":d,...v,ref:a})})});M.displayName=I;var B="TabsList",W=o.forwardRef((t,a)=>{const{__scopeTabs:r,loop:i=!0,...n}=t,s=O(B,r),d=z(r);return e.jsx(oe,{asChild:!0,...d,orientation:s.orientation,dir:s.dir,loop:i,children:e.jsx(b.div,{role:"tablist","aria-orientation":s.orientation,...n,ref:a})})});W.displayName=B;var q="TabsTrigger",G=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:i,disabled:n=!1,...s}=t,d=O(q,r),C=z(r),y=K(d.baseId,i),v=H(d.baseId,i),l=i===d.value;return e.jsx(le,{asChild:!0,...C,focusable:!n,active:l,children:e.jsx(b.button,{type:"button",role:"tab","aria-selected":l,"aria-controls":v,"data-state":l?"active":"inactive","data-disabled":n?"":void 0,disabled:n,id:y,...s,ref:a,onMouseDown:P(t.onMouseDown,c=>{!n&&c.button===0&&c.ctrlKey===!1?d.onValueChange(i):c.preventDefault()}),onKeyDown:P(t.onKeyDown,c=>{[" ","Enter"].includes(c.key)&&d.onValueChange(i)}),onFocus:P(t.onFocus,()=>{const c=d.activationMode!=="manual";!l&&!n&&c&&d.onValueChange(i)})})})});G.displayName=q;var V="TabsContent",$=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:i,forceMount:n,children:s,...d}=t,C=O(V,r),y=K(C.baseId,i),v=H(C.baseId,i),l=i===C.value,c=o.useRef(l);return o.useEffect(()=>{const h=requestAnimationFrame(()=>c.current=!1);return()=>cancelAnimationFrame(h)},[]),e.jsx(ne,{present:n||l,children:({present:h})=>e.jsx(b.div,{"data-state":l?"active":"inactive","data-orientation":C.orientation,role:"tabpanel","aria-labelledby":y,hidden:!h,id:v,tabIndex:0,...d,ref:a,style:{...t.style,animationDuration:c.current?"0s":void 0},children:h&&s})})});$.displayName=V;function K(t,a){return`${t}-trigger-${a}`}function H(t,a){return`${t}-content-${a}`}var Ce=M,ye=W,ve=G,he=$;function Y({className:t,...a}){return e.jsx(Ce,{"data-slot":"tabs",className:T("flex flex-col gap-2",t),...a})}function X({className:t,...a}){return e.jsx(ye,{"data-slot":"tabs-list",className:T("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",t),...a})}function U({className:t,...a}){return e.jsx(ve,{"data-slot":"tabs-trigger",className:T("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",t),...a})}function Z({className:t,...a}){return e.jsx(he,{"data-slot":"tabs-content",className:T("flex-1 outline-none",t),...a})}Y.__docgenInfo={description:"",methods:[],displayName:"Tabs"};Z.__docgenInfo={description:"",methods:[],displayName:"TabsContent"};X.__docgenInfo={description:"",methods:[],displayName:"TabsList"};U.__docgenInfo={description:"",methods:[],displayName:"TabsTrigger"};const R=[{label:"热门",value:"popular"},{label:"ABCDEF",value:"ABCDEF",letters:["A","B","C","D","E","F"]},{label:"GHIJ",value:"GHIJ",letters:["G","H","I","J"]},{label:"KLMN",value:"KLMN",letters:["K","L","M","N"]},{label:"PQRSTUV",value:"PQRSTUV",letters:["P","Q","R","S","T","U","V"]},{label:"WXYZ",value:"WXYZ",letters:["W","X","Y","Z"]}],xe=[{label:"热门",value:"popular"},{label:"亚洲",value:"Asia"},{label:"欧洲",value:"Europe"},{label:"美洲",value:"America"},{label:"非洲",value:"Africa"},{label:"大洋洲",value:"Oceania"}];function L({onSelect:t,title:a="选择城市",selectedCity:r,cities:i,children:n,open:s,onOpenChange:d}){const C=i,[y,v]=o.useState("domestic"),[l,c]=o.useState("popular"),h=o.useMemo(()=>{if(y==="domestic"){const m=C.filter(u=>u.pinyinFirstLetter!==null);if(l==="popular")return m.filter(u=>u.isPopular);{const u=R.find(k=>k.value===l);if(u?.letters)return m.filter(k=>u.letters.includes(k.pinyinFirstLetter))}}else{const m=C.filter(u=>u.continent!==null);return l==="popular"?m.filter(u=>u.isPopular):m.filter(u=>u.continent===l)}return[]},[C,y,l]),J=m=>{t(m),d?.(!1)},F=m=>{v(m),c("popular")},_=y==="domestic"?R:xe;return e.jsxs(Q,{open:s,onOpenChange:d,children:[e.jsx(ee,{asChild:!0,children:n}),e.jsx(te,{className:"w-[600px] p-0",align:"start",children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-40 border-r bg-muted/30 p-2 flex flex-col gap-1",children:[e.jsx(ae,{className:"px-2 py-1.5 text-xs text-muted-foreground",children:a}),e.jsx(g,{variant:y==="domestic"?"secondary":"ghost",className:"justify-start w-full",onClick:()=>F("domestic"),children:"国内"}),e.jsx(g,{variant:y==="international"?"secondary":"ghost",className:"justify-start w-full",onClick:()=>F("international"),children:"国际及港澳台"})]}),e.jsx("div",{className:"flex-1 flex flex-col",children:e.jsxs(Y,{value:l,onValueChange:c,className:"flex-1 flex flex-col",children:[e.jsx(X,{className:"rounded-none bg-transparent p-0 h-9 justify-start shrink-0 overflow-x-auto",children:_.map(m=>e.jsx(U,{value:m.value,className:"rounded-none border-0 bg-transparent px-3 py-1.5 text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-foreground transition-colors",children:m.label},m.value))}),e.jsx(re,{}),_.map(m=>e.jsx(Z,{value:m.value,className:"flex-1 overflow-y-auto p-4 mt-0",children:e.jsx("div",{className:"grid grid-cols-5 gap-x-2 gap-y-2",children:h.length===0?e.jsx("div",{className:"col-span-5 text-center text-muted-foreground py-8",children:"暂无城市数据"}):h.map(u=>e.jsxs(g,{variant:r?.iataCode===u.iataCode?"default":"ghost",onClick:()=>J(u),className:"justify-center h-auto py-1.5 px-2 text-sm",children:[e.jsx("span",{className:"font-medium",children:u.name}),e.jsx("span",{className:"text-xs text-muted-foreground",children:u.iataCode})]},u.iataCode))})},m.value))]})})]})})]})}function x({departureCity:t,arrivalCity:a,onDepartureCityChange:r,onArrivalCityChange:i,onSwap:n,cities:s}){const[d,C]=o.useState(!1),[y,v]=o.useState(!1),l=c=>{r(c),v(!0)};return e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"flex-1",children:e.jsx(L,{onSelect:l,title:"选择出发城市",selectedCity:t,cities:s,open:d,onOpenChange:C,children:e.jsxs(g,{variant:"outline",className:"w-full h-16 flex flex-col items-start justify-center",children:[e.jsx("span",{className:"text-xs text-muted-foreground",children:"出发地"}),e.jsx("span",{className:"text-lg font-medium",children:t?`${t.name}(${t.iataCode})`:"请选择"})]})})}),n&&e.jsx(g,{variant:"ghost",size:"icon",onClick:n,className:"shrink-0",children:e.jsx(ce,{className:"h-4 w-4"})}),e.jsx("div",{className:"flex-1",children:e.jsx(L,{onSelect:i,title:"选择到达城市",selectedCity:a,cities:s,open:y,onOpenChange:v,children:e.jsxs(g,{variant:"outline",className:"w-full h-16 flex flex-col items-start justify-center",children:[e.jsx("span",{className:"text-xs text-muted-foreground",children:"目的地"}),e.jsx("span",{className:"text-lg font-medium",children:a?`${a.name}(${a.iataCode})`:"请选择"})]})})})]})}L.__docgenInfo={description:"",methods:[],displayName:"CitySelector",props:{onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"选择城市"',computed:!1}},selectedCity:{required:!1,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},cities:{required:!0,tsType:{name:"Array",elements:[{name:"CityData"}],raw:"CityData[]"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:""}}};x.__docgenInfo={description:"",methods:[],displayName:"CityInput",props:{departureCity:{required:!0,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},arrivalCity:{required:!0,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},onDepartureCityChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},onArrivalCityChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},onSwap:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},cities:{required:!0,tsType:{name:"Array",elements:[{name:"CityData"}],raw:"CityData[]"},description:""}}};const p=[{iataCode:"PEK",name:"北京",timezone:"Asia/Shanghai",pinyinFirstLetter:"B",continent:null,isPopular:!0,displayOrder:1},{iataCode:"SHA",name:"上海",timezone:"Asia/Shanghai",pinyinFirstLetter:"S",continent:null,isPopular:!0,displayOrder:2},{iataCode:"CAN",name:"广州",timezone:"Asia/Shanghai",pinyinFirstLetter:"G",continent:null,isPopular:!0,displayOrder:3},{iataCode:"SZX",name:"深圳",timezone:"Asia/Shanghai",pinyinFirstLetter:"S",continent:null,isPopular:!0,displayOrder:4},{iataCode:"CTU",name:"成都",timezone:"Asia/Shanghai",pinyinFirstLetter:"C",continent:null,isPopular:!0,displayOrder:5},{iataCode:"HGH",name:"杭州",timezone:"Asia/Shanghai",pinyinFirstLetter:"H",continent:null,isPopular:!0,displayOrder:6},{iataCode:"XIY",name:"西安",timezone:"Asia/Shanghai",pinyinFirstLetter:"X",continent:null,isPopular:!1,displayOrder:10},{iataCode:"WUH",name:"武汉",timezone:"Asia/Shanghai",pinyinFirstLetter:"W",continent:null,isPopular:!1,displayOrder:11},{iataCode:"NKG",name:"南京",timezone:"Asia/Shanghai",pinyinFirstLetter:"N",continent:null,isPopular:!1,displayOrder:12},{iataCode:"KMG",name:"昆明",timezone:"Asia/Shanghai",pinyinFirstLetter:"K",continent:null,isPopular:!1,displayOrder:13},{iataCode:"TYO",name:"东京",timezone:"Asia/Tokyo",pinyinFirstLetter:null,continent:"Asia",isPopular:!0,displayOrder:100},{iataCode:"NYC",name:"纽约",timezone:"America/New_York",pinyinFirstLetter:null,continent:"America",isPopular:!0,displayOrder:101},{iataCode:"LON",name:"伦敦",timezone:"Europe/London",pinyinFirstLetter:null,continent:"Europe",isPopular:!0,displayOrder:102},{iataCode:"PAR",name:"巴黎",timezone:"Europe/Paris",pinyinFirstLetter:null,continent:"Europe",isPopular:!0,displayOrder:103},{iataCode:"SIN",name:"新加坡",timezone:"Asia/Singapore",pinyinFirstLetter:null,continent:"Asia",isPopular:!0,displayOrder:104},{iataCode:"SYD",name:"悉尼",timezone:"Australia/Sydney",pinyinFirstLetter:null,continent:"Oceania",isPopular:!1,displayOrder:200},{iataCode:"DXB",name:"迪拜",timezone:"Asia/Dubai",pinyinFirstLetter:null,continent:"Asia",isPopular:!1,displayOrder:201},{iataCode:"LAX",name:"洛杉矶",timezone:"America/Los_Angeles",pinyinFirstLetter:null,continent:"America",isPopular:!1,displayOrder:202},{iataCode:"CAI",name:"开罗",timezone:"Africa/Cairo",pinyinFirstLetter:null,continent:"Africa",isPopular:!1,displayOrder:203}],We={title:"Flights/Search/CityInput",component:x,parameters:{layout:"centered"},tags:["autodocs"]},f={render:()=>{const[t,a]=o.useState(null),[r,i]=o.useState(null),n=()=>{const s=t;a(r),i(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:r,onDepartureCityChange:a,onArrivalCityChange:i,onSwap:n,cities:p}),e.jsx("div",{className:"mt-4 text-sm text-muted-foreground",children:e.jsx("p",{children:"💡 Tip: Arrival selector auto-opens after selecting departure city"})})]})}},S={render:()=>{const[t,a]=o.useState(p[0]),[r,i]=o.useState(null),n=()=>{const s=t;a(r),i(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:r,onDepartureCityChange:a,onArrivalCityChange:i,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name]}),e.jsx("p",{children:"Arrival: Not selected"})]})]})}},D={render:()=>{const[t,a]=o.useState(null),[r,i]=o.useState(p[1]),n=()=>{const s=t;a(r),i(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:r,onDepartureCityChange:a,onArrivalCityChange:i,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsx("p",{children:"Departure: Not selected"}),e.jsxs("p",{children:["Arrival: ",r?.name]})]})]})}},A={render:()=>{const[t,a]=o.useState(p[0]),[r,i]=o.useState(p[1]),n=()=>{const s=t;a(r),i(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:r,onDepartureCityChange:a,onArrivalCityChange:i,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,")"]}),e.jsxs("p",{children:["Arrival: ",r?.name," (",r?.iataCode,")"]}),e.jsx("p",{className:"mt-2",children:"💡 Click the swap button to exchange cities"})]})]})}},N={render:()=>{const[t,a]=o.useState(p[10]),[r,i]=o.useState(p[11]),n=()=>{const s=t;a(r),i(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:r,onDepartureCityChange:a,onArrivalCityChange:i,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,")"]}),e.jsxs("p",{children:["Arrival: ",r?.name," (",r?.iataCode,")"]}),e.jsx("p",{className:"mt-2",children:"🌍 International flight example"})]})]})}},w={render:()=>{const[t,a]=o.useState(p[0]),[r,i]=o.useState(p[10]),n=()=>{const s=t;a(r),i(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:r,onDepartureCityChange:a,onArrivalCityChange:i,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,") - Domestic"]}),e.jsxs("p",{children:["Arrival: ",r?.name," (",r?.iataCode,") - International"]})]})]})}},j={render:()=>{const[t,a]=o.useState(p[0]),[r,i]=o.useState(p[1]);return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:r,onDepartureCityChange:a,onArrivalCityChange:i,cities:p}),e.jsx("div",{className:"mt-4 text-sm text-muted-foreground",children:e.jsx("p",{children:"💡 Swap button is hidden when onSwap prop is not provided"})})]})}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};const qe=["Default","WithDepartureCity","WithArrivalCity","WithBothCitiesDomestic","WithBothCitiesInternational","DomesticToInternational","WithoutSwapButton"];export{f as Default,w as DomesticToInternational,D as WithArrivalCity,A as WithBothCitiesDomestic,N as WithBothCitiesInternational,S as WithDepartureCity,j as WithoutSwapButton,qe as __namedExportsOrder,We as default};
