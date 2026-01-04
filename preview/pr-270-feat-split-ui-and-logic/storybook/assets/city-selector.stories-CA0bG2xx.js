import{r as o,j as e}from"./iframe-DnZgF7bs.js";import{B as g}from"./button-ByK4bP4Z.js";import{D as De,a as Se,b as Ae,c as Ne}from"./dropdown-menu-BiIt40rG.js";import{S as we}from"./separator-D8Voa9zw.js";import{u as je,c as be,P as b,a as P,b as _e}from"./index-B_BILNUQ.js";import{c as ne,R as Te,I as Ie}from"./index-I0skBQuf.js";import{u as ke}from"./index-BWqXFG3c.js";import{u as Pe}from"./index-Bch9dQDS.js";import{c as _}from"./utils-CDN07tui.js";import{A as Le}from"./arrow-left-right-BKmJHNmm.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BMzLOmL9.js";import"./index-B_jtOnfb.js";import"./index-CV4DGF-z.js";import"./index-DAJj0hCA.js";import"./index-ZqBm70yH.js";import"./index-NJl_V9ss.js";import"./Combination-0y8IPm-T.js";import"./index-D2pRr7VP.js";import"./index-BGSdDYm-.js";import"./index-Be03snLn.js";import"./createLucideIcon-DqjoOZ7r.js";var T="Tabs",[Fe]=be(T,[ne]),se=ne(),[Oe,te]=Fe(T),oe=o.forwardRef((t,i)=>{const{__scopeTabs:a,value:r,onValueChange:n,defaultValue:s,orientation:l="horizontal",dir:C,activationMode:v="automatic",...y}=t,d=ke(C),[c,h]=je({prop:r,onChange:n,defaultProp:s??"",caller:T});return e.jsx(Oe,{scope:a,baseId:Pe(),value:c,onValueChange:h,orientation:l,dir:d,activationMode:v,children:e.jsx(b.div,{dir:d,"data-orientation":l,...y,ref:i})})});oe.displayName=T;var le="TabsList",de=o.forwardRef((t,i)=>{const{__scopeTabs:a,loop:r=!0,...n}=t,s=te(le,a),l=se(a);return e.jsx(Te,{asChild:!0,...l,orientation:s.orientation,dir:s.dir,loop:r,children:e.jsx(b.div,{role:"tablist","aria-orientation":s.orientation,...n,ref:i})})});de.displayName=le;var ue="TabsTrigger",ce=o.forwardRef((t,i)=>{const{__scopeTabs:a,value:r,disabled:n=!1,...s}=t,l=te(ue,a),C=se(a),v=Ce(l.baseId,r),y=ve(l.baseId,r),d=r===l.value;return e.jsx(Ie,{asChild:!0,...C,focusable:!n,active:d,children:e.jsx(b.button,{type:"button",role:"tab","aria-selected":d,"aria-controls":y,"data-state":d?"active":"inactive","data-disabled":n?"":void 0,disabled:n,id:v,...s,ref:i,onMouseDown:P(t.onMouseDown,c=>{!n&&c.button===0&&c.ctrlKey===!1?l.onValueChange(r):c.preventDefault()}),onKeyDown:P(t.onKeyDown,c=>{[" ","Enter"].includes(c.key)&&l.onValueChange(r)}),onFocus:P(t.onFocus,()=>{const c=l.activationMode!=="manual";!d&&!n&&c&&l.onValueChange(r)})})})});ce.displayName=ue;var pe="TabsContent",me=o.forwardRef((t,i)=>{const{__scopeTabs:a,value:r,forceMount:n,children:s,...l}=t,C=te(pe,a),v=Ce(C.baseId,r),y=ve(C.baseId,r),d=r===C.value,c=o.useRef(d);return o.useEffect(()=>{const h=requestAnimationFrame(()=>c.current=!1);return()=>cancelAnimationFrame(h)},[]),e.jsx(_e,{present:n||d,children:({present:h})=>e.jsx(b.div,{"data-state":d?"active":"inactive","data-orientation":C.orientation,role:"tabpanel","aria-labelledby":v,hidden:!h,id:y,tabIndex:0,...l,ref:i,style:{...t.style,animationDuration:c.current?"0s":void 0},children:h&&s})})});me.displayName=pe;function Ce(t,i){return`${t}-trigger-${i}`}function ve(t,i){return`${t}-content-${i}`}var We=oe,Be=de,Re=ce,Ee=me;function ye({className:t,...i}){return e.jsx(We,{"data-slot":"tabs",className:_("flex flex-col gap-2",t),...i})}function he({className:t,...i}){return e.jsx(Be,{"data-slot":"tabs-list",className:_("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",t),...i})}function xe({className:t,...i}){return e.jsx(Re,{"data-slot":"tabs-trigger",className:_("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",t),...i})}function ge({className:t,...i}){return e.jsx(Ee,{"data-slot":"tabs-content",className:_("flex-1 outline-none",t),...i})}ye.__docgenInfo={description:"",methods:[],displayName:"Tabs"};ge.__docgenInfo={description:"",methods:[],displayName:"TabsContent"};he.__docgenInfo={description:"",methods:[],displayName:"TabsList"};xe.__docgenInfo={description:"",methods:[],displayName:"TabsTrigger"};const re=[{label:"热门",value:"popular"},{label:"ABCDEF",value:"ABCDEF",letters:["A","B","C","D","E","F"]},{label:"GHIJ",value:"GHIJ",letters:["G","H","I","J"]},{label:"KLMN",value:"KLMN",letters:["K","L","M","N"]},{label:"PQRSTUV",value:"PQRSTUV",letters:["P","Q","R","S","T","U","V"]},{label:"WXYZ",value:"WXYZ",letters:["W","X","Y","Z"]}],ze=[{label:"热门",value:"popular"},{label:"亚洲",value:"Asia"},{label:"欧洲",value:"Europe"},{label:"美洲",value:"America"},{label:"非洲",value:"Africa"},{label:"大洋洲",value:"Oceania"}];function ee({onSelect:t,title:i="选择城市",selectedCity:a,cities:r,children:n,open:s,onOpenChange:l}){const C=r,[v,y]=o.useState("domestic"),[d,c]=o.useState("popular"),h=o.useMemo(()=>{if(v==="domestic"){const m=C.filter(u=>u.pinyinFirstLetter!==null);if(d==="popular")return m.filter(u=>u.isPopular);{const u=re.find(I=>I.value===d);if(u?.letters)return m.filter(I=>{var k;return u.letters.includes((k=I.pinyinFirstLetter)!==null&&k!==void 0?k:"")})}}else{const m=C.filter(u=>u.continent!==null);return d==="popular"?m.filter(u=>u.isPopular):m.filter(u=>u.continent===d)}return[]},[C,v,d]),fe=m=>{t(m),l?.(!1)},ae=m=>{y(m),c("popular")},ie=v==="domestic"?re:ze;return e.jsxs(De,{open:s,onOpenChange:l,children:[e.jsx(Se,{asChild:!0,children:n}),e.jsx(Ae,{className:"w-[600px] p-0",align:"start",children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-40 border-r bg-muted/30 p-2 flex flex-col gap-1",children:[e.jsx(Ne,{className:"px-2 py-1.5 text-xs text-muted-foreground",children:i}),e.jsx(g,{variant:v==="domestic"?"secondary":"ghost",className:"justify-start w-full",onClick:()=>ae("domestic"),children:"国内"}),e.jsx(g,{variant:v==="international"?"secondary":"ghost",className:"justify-start w-full",onClick:()=>ae("international"),children:"国际及港澳台"})]}),e.jsx("div",{className:"flex-1 flex flex-col",children:e.jsxs(ye,{value:d,onValueChange:c,className:"flex-1 flex flex-col",children:[e.jsx(he,{className:"rounded-none bg-transparent p-0 h-9 justify-start shrink-0 overflow-x-auto",children:ie.map(m=>e.jsx(xe,{value:m.value,className:"rounded-none border-0 bg-transparent px-3 py-1.5 text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-foreground transition-colors",children:m.label},m.value))}),e.jsx(we,{}),ie.map(m=>e.jsx(ge,{value:m.value,className:"flex-1 overflow-y-auto p-4 mt-0",children:e.jsx("div",{className:"grid grid-cols-5 gap-x-2 gap-y-2",children:h.length===0?e.jsx("div",{className:"col-span-5 text-center text-muted-foreground py-8",children:"暂无城市数据"}):h.map(u=>e.jsxs(g,{variant:a?.iataCode===u.iataCode?"default":"ghost",onClick:()=>fe(u),className:"justify-center h-auto py-1.5 px-2 text-sm",children:[e.jsx("span",{className:"font-medium",children:u.name}),e.jsx("span",{className:"text-xs text-muted-foreground",children:u.iataCode})]},u.iataCode))})},m.value))]})})]})})]})}function x({departureCity:t,arrivalCity:i,onDepartureCityChange:a,onArrivalCityChange:r,onSwap:n,cities:s}){const[l,C]=o.useState(!1),[v,y]=o.useState(!1),d=c=>{a(c),y(!0)};return e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"flex-1",children:e.jsx(ee,{onSelect:d,title:"选择出发城市",selectedCity:t,cities:s,open:l,onOpenChange:C,children:e.jsxs(g,{variant:"outline",className:"w-full h-16 flex flex-col items-start justify-center",children:[e.jsx("span",{className:"text-xs text-muted-foreground",children:"出发地"}),e.jsx("span",{className:"text-lg font-medium",children:t?`${t.name}(${t.iataCode})`:"请选择"})]})})}),n&&e.jsx(g,{variant:"ghost",size:"icon",onClick:n,className:"shrink-0",children:e.jsx(Le,{className:"h-4 w-4"})}),e.jsx("div",{className:"flex-1",children:e.jsx(ee,{onSelect:r,title:"选择到达城市",selectedCity:i,cities:s,open:v,onOpenChange:y,children:e.jsxs(g,{variant:"outline",className:"w-full h-16 flex flex-col items-start justify-center",children:[e.jsx("span",{className:"text-xs text-muted-foreground",children:"目的地"}),e.jsx("span",{className:"text-lg font-medium",children:i?`${i.name}(${i.iataCode})`:"请选择"})]})})})]})}ee.__docgenInfo={description:"",methods:[],displayName:"CitySelector",props:{onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"选择城市"',computed:!1}},selectedCity:{required:!1,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},cities:{required:!0,tsType:{name:"Array",elements:[{name:"CityData"}],raw:"CityData[]"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:""}}};x.__docgenInfo={description:"",methods:[],displayName:"CityInput",props:{departureCity:{required:!0,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},arrivalCity:{required:!0,tsType:{name:"union",raw:"CityData | null",elements:[{name:"CityData"},{name:"null"}]},description:""},onDepartureCityChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},onArrivalCityChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(city: CityData) => void",signature:{arguments:[{type:{name:"CityData"},name:"city"}],return:{name:"void"}}},description:""},onSwap:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},cities:{required:!0,tsType:{name:"Array",elements:[{name:"CityData"}],raw:"CityData[]"},description:""}}};var L,F,O,W,B,R,E,z,M,q,G,V,$,K,H,Y,X,U,Z,J,Q;const p=[{iataCode:"PEK",name:"北京",timezone:"Asia/Shanghai",pinyinFirstLetter:"B",continent:null,isPopular:!0,displayOrder:1},{iataCode:"SHA",name:"上海",timezone:"Asia/Shanghai",pinyinFirstLetter:"S",continent:null,isPopular:!0,displayOrder:2},{iataCode:"CAN",name:"广州",timezone:"Asia/Shanghai",pinyinFirstLetter:"G",continent:null,isPopular:!0,displayOrder:3},{iataCode:"SZX",name:"深圳",timezone:"Asia/Shanghai",pinyinFirstLetter:"S",continent:null,isPopular:!0,displayOrder:4},{iataCode:"CTU",name:"成都",timezone:"Asia/Shanghai",pinyinFirstLetter:"C",continent:null,isPopular:!0,displayOrder:5},{iataCode:"HGH",name:"杭州",timezone:"Asia/Shanghai",pinyinFirstLetter:"H",continent:null,isPopular:!0,displayOrder:6},{iataCode:"XIY",name:"西安",timezone:"Asia/Shanghai",pinyinFirstLetter:"X",continent:null,isPopular:!1,displayOrder:10},{iataCode:"WUH",name:"武汉",timezone:"Asia/Shanghai",pinyinFirstLetter:"W",continent:null,isPopular:!1,displayOrder:11},{iataCode:"NKG",name:"南京",timezone:"Asia/Shanghai",pinyinFirstLetter:"N",continent:null,isPopular:!1,displayOrder:12},{iataCode:"KMG",name:"昆明",timezone:"Asia/Shanghai",pinyinFirstLetter:"K",continent:null,isPopular:!1,displayOrder:13},{iataCode:"TYO",name:"东京",timezone:"Asia/Tokyo",pinyinFirstLetter:null,continent:"Asia",isPopular:!0,displayOrder:100},{iataCode:"NYC",name:"纽约",timezone:"America/New_York",pinyinFirstLetter:null,continent:"America",isPopular:!0,displayOrder:101},{iataCode:"LON",name:"伦敦",timezone:"Europe/London",pinyinFirstLetter:null,continent:"Europe",isPopular:!0,displayOrder:102},{iataCode:"PAR",name:"巴黎",timezone:"Europe/Paris",pinyinFirstLetter:null,continent:"Europe",isPopular:!0,displayOrder:103},{iataCode:"SIN",name:"新加坡",timezone:"Asia/Singapore",pinyinFirstLetter:null,continent:"Asia",isPopular:!0,displayOrder:104},{iataCode:"SYD",name:"悉尼",timezone:"Australia/Sydney",pinyinFirstLetter:null,continent:"Oceania",isPopular:!1,displayOrder:200},{iataCode:"DXB",name:"迪拜",timezone:"Asia/Dubai",pinyinFirstLetter:null,continent:"Asia",isPopular:!1,displayOrder:201},{iataCode:"LAX",name:"洛杉矶",timezone:"America/Los_Angeles",pinyinFirstLetter:null,continent:"America",isPopular:!1,displayOrder:202},{iataCode:"CAI",name:"开罗",timezone:"Africa/Cairo",pinyinFirstLetter:null,continent:"Africa",isPopular:!1,displayOrder:203}],dt={title:"Flights/Search/CityInput",component:x,parameters:{layout:"centered"},tags:["autodocs"]},f={render:()=>{const[t,i]=o.useState(null),[a,r]=o.useState(null),n=()=>{const s=t;i(a),r(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:a,onDepartureCityChange:i,onArrivalCityChange:r,onSwap:n,cities:p}),e.jsx("div",{className:"mt-4 text-sm text-muted-foreground",children:e.jsx("p",{children:"💡 Tip: Arrival selector auto-opens after selecting departure city"})})]})}},D={render:()=>{const[t,i]=o.useState(p[0]),[a,r]=o.useState(null),n=()=>{const s=t;i(a),r(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:a,onDepartureCityChange:i,onArrivalCityChange:r,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name]}),e.jsx("p",{children:"Arrival: Not selected"})]})]})}},S={render:()=>{const[t,i]=o.useState(null),[a,r]=o.useState(p[1]),n=()=>{const s=t;i(a),r(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:a,onDepartureCityChange:i,onArrivalCityChange:r,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsx("p",{children:"Departure: Not selected"}),e.jsxs("p",{children:["Arrival: ",a?.name]})]})]})}},A={render:()=>{const[t,i]=o.useState(p[0]),[a,r]=o.useState(p[1]),n=()=>{const s=t;i(a),r(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:a,onDepartureCityChange:i,onArrivalCityChange:r,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,")"]}),e.jsxs("p",{children:["Arrival: ",a?.name," (",a?.iataCode,")"]}),e.jsx("p",{className:"mt-2",children:"💡 Click the swap button to exchange cities"})]})]})}},N={render:()=>{const[t,i]=o.useState(p[10]),[a,r]=o.useState(p[11]),n=()=>{const s=t;i(a),r(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:a,onDepartureCityChange:i,onArrivalCityChange:r,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,")"]}),e.jsxs("p",{children:["Arrival: ",a?.name," (",a?.iataCode,")"]}),e.jsx("p",{className:"mt-2",children:"🌍 International flight example"})]})]})}},w={render:()=>{const[t,i]=o.useState(p[0]),[a,r]=o.useState(p[10]),n=()=>{const s=t;i(a),r(s)};return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:a,onDepartureCityChange:i,onArrivalCityChange:r,onSwap:n,cities:p}),e.jsxs("div",{className:"mt-4 text-sm text-muted-foreground",children:[e.jsxs("p",{children:["Departure: ",t?.name," (",t?.iataCode,") - Domestic"]}),e.jsxs("p",{children:["Arrival: ",a?.name," (",a?.iataCode,") - International"]})]})]})}},j={render:()=>{const[t,i]=o.useState(p[0]),[a,r]=o.useState(p[1]);return e.jsxs("div",{className:"w-[600px]",children:[e.jsx(x,{departureCity:t,arrivalCity:a,onDepartureCityChange:i,onArrivalCityChange:r,cities:p}),e.jsx("div",{className:"mt-4 text-sm text-muted-foreground",children:e.jsx("p",{children:"💡 Swap button is hidden when onSwap prop is not provided"})})]})}};f.parameters={...f.parameters,docs:{...(L=f.parameters)===null||L===void 0?void 0:L.docs,source:{originalSource:`{
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
}`,...(O=f.parameters)===null||O===void 0||(F=O.docs)===null||F===void 0?void 0:F.source}}};D.parameters={...D.parameters,docs:{...(W=D.parameters)===null||W===void 0?void 0:W.docs,source:{originalSource:`{
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
}`,...(R=D.parameters)===null||R===void 0||(B=R.docs)===null||B===void 0?void 0:B.source}}};S.parameters={...S.parameters,docs:{...(E=S.parameters)===null||E===void 0?void 0:E.docs,source:{originalSource:`{
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
}`,...(M=S.parameters)===null||M===void 0||(z=M.docs)===null||z===void 0?void 0:z.source}}};A.parameters={...A.parameters,docs:{...(q=A.parameters)===null||q===void 0?void 0:q.docs,source:{originalSource:`{
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
}`,...(V=A.parameters)===null||V===void 0||(G=V.docs)===null||G===void 0?void 0:G.source}}};N.parameters={...N.parameters,docs:{...($=N.parameters)===null||$===void 0?void 0:$.docs,source:{originalSource:`{
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
}`,...(H=N.parameters)===null||H===void 0||(K=H.docs)===null||K===void 0?void 0:K.source}}};w.parameters={...w.parameters,docs:{...(Y=w.parameters)===null||Y===void 0?void 0:Y.docs,source:{originalSource:`{
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
}`,...(U=w.parameters)===null||U===void 0||(X=U.docs)===null||X===void 0?void 0:X.source}}};j.parameters={...j.parameters,docs:{...(Z=j.parameters)===null||Z===void 0?void 0:Z.docs,source:{originalSource:`{
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
}`,...(Q=j.parameters)===null||Q===void 0||(J=Q.docs)===null||J===void 0?void 0:J.source}}};const ut=["Default","WithDepartureCity","WithArrivalCity","WithBothCitiesDomestic","WithBothCitiesInternational","DomesticToInternational","WithoutSwapButton"];export{f as Default,w as DomesticToInternational,S as WithArrivalCity,A as WithBothCitiesDomestic,N as WithBothCitiesInternational,D as WithDepartureCity,j as WithoutSwapButton,ut as __namedExportsOrder,dt as default};
