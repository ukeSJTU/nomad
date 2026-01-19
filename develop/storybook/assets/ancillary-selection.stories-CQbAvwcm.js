import{j as t,r as p}from"./iframe-BY6WQ8rl.js";import{A as z}from"./passenger-form-card-DiN6IVT2.js";import"./separator-D3mo2s7R.js";import"./card-C2MAT-zL.js";import"./alert-Bq9jHRdw.js";import"./label-CxilLX0s.js";import"./radio-group-CNRwHz1w.js";import{o as J,_ as Q,n as Z,s as _,c as ee}from"./schemas-BKf9BodT.js";import{f as re}from"./currency-D-0V2y_1.js";import{s as te}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-HIqmnw4t.js";import"./index-DRfufKDV.js";import"./index-Cg4mt3GG.js";import"./createLucideIcon-DhaeV68V.js";import"./index-BoBNlNV4.js";import"./index-jM_4ha9X.js";import"./chevron-down-DdLcFoQ7.js";import"./checkbox-D2fL6kQ1.js";import"./index-sMO_WrMY.js";import"./index-CQLSNwcT.js";import"./check-DNbWv-jy.js";import"./input-D0mA3Bj2.js";import"./platform-CXbBvqhr.js";import"./clock-DMr9UqDy.js";import"./button-Bkd1CeD9.js";import"./select-H_oeIjBA.js";import"./index-BaiNJB1C.js";import"./index-D0-zYxe0.js";import"./index-BizkJoHM.js";import"./index-DmZccnKP.js";import"./x-CoTNxCXn.js";import"./index-B6rVzEen.js";import"./currency.es-BSkspdt3.js";const se=["INSURANCE","AIRPORT_PICKUP","MEAL"],ie=J({code:_().min(1).max(50),name:_().min(1).max(100),description:_().max(500).optional(),price:Z().positive(),category:Q(se)});ee(ie);const G=[{code:"INSURANCE_BASIC",name:"基础旅行险",description:"提供基本的旅行意外保障，包括意外伤害和医疗费用",price:50,category:"INSURANCE"},{code:"INSURANCE_PREMIUM",name:"高级旅行险",description:"提供全面的旅行保障，包括意外伤害、医疗费用、行李丢失和航班延误",price:120,category:"INSURANCE"},{code:"INSURANCE_FAMILY",name:"家庭旅行险",description:"适合全家出行，提供全面的家庭旅行保障",price:200,category:"INSURANCE"},{code:"PICKUP_ECONOMY",name:"经济型接送机",description:"舒适的经济型车辆接送机服务",price:80,category:"AIRPORT_PICKUP"},{code:"PICKUP_BUSINESS",name:"商务型接送机",description:"高端商务车辆接送机服务，提供更舒适的乘坐体验",price:150,category:"AIRPORT_PICKUP"},{code:"PICKUP_LUXURY",name:"豪华型接送机",description:"豪华车辆接送机服务，享受尊贵出行体验",price:300,category:"AIRPORT_PICKUP"},{code:"MEAL_STANDARD",name:"标准餐食",description:"提供标准的机上餐食，包括主食、小吃和饮料",price:30,category:"MEAL"},{code:"MEAL_VEGETARIAN",name:"素食餐",description:"提供健康的素食餐食选择",price:35,category:"MEAL"},{code:"MEAL_HALAL",name:"清真餐",description:"符合清真标准的餐食",price:35,category:"MEAL"},{code:"MEAL_PREMIUM",name:"高级餐食",description:"提供精选的高级餐食，包括多道菜品和优质饮料",price:80,category:"MEAL"}];function u(r){return G.filter(e=>e.category===r)}function ce(r){return G.find(e=>e.code===r)}function c({selectedServices:r,onToggleService:e,title:s="选择增值服务",className:i}){const o=[{category:"INSURANCE",services:u("INSURANCE")},{category:"AIRPORT_PICKUP",services:u("AIRPORT_PICKUP")},{category:"MEAL",services:u("MEAL")}];return t.jsx(z,{selectedServices:r,onToggleService:e,categories:o,formatPrice:re,title:s,className:i})}c.__docgenInfo={description:`AncillarySelection Container Component

Provides data and formatting logic for the ancillary selection UI.
Fetches service data by category and formats prices.`,methods:[],displayName:"AncillarySelection",props:{selectedServices:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of selected service codes"},onToggleService:{required:!0,tsType:{name:"signature",type:"function",raw:"(code: string) => void",signature:{arguments:[{type:{name:"string"},name:"code"}],return:{name:"void"}}},description:"Callback when a service is toggled"},title:{required:!1,tsType:{name:"string"},description:"Optional title for the card",defaultValue:{value:'"选择增值服务"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional className for the card"}}};var y,h,A,T,N,f,I,P,C,b,x,E,R,U,M,L,j,W,O,w,D,K,B,H,Y,k,q,F,X,V;const S=r=>e=>{r(s=>{if(s.includes(e))return s.filter(n=>n!==e);const i=ce(e);if(!i)return s;const $=u(i.category).map(n=>n.code);return[...s.filter(n=>!$.includes(n)),e]})},He={title:"Flights/Booking/AncillarySelection",component:c,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{selectedServices:{control:"object",description:"Array of selected service codes"},onToggleService:{action:"toggled",description:"Callback when a service is toggled"},title:{control:"text",description:"Optional title for the card"},className:{control:"text",description:"Optional className for the card"}}},a={args:{selectedServices:[],onToggleService:()=>{},title:"选择增值服务"}},l={args:{selectedServices:[],onToggleService:r=>te.info("Toggled:",r)},render:r=>{const[e,s]=p.useState([]),i=S(s);return t.jsxs("div",{className:"space-y-4",children:[t.jsx("div",{className:"p-4 bg-amber-50 border border-amber-200 rounded-lg",children:t.jsxs("p",{className:"text-sm text-amber-800",children:[t.jsx("strong",{children:"Try it:"})," Select different services within the same category (e.g., Basic Insurance → Premium Insurance) to see how the component automatically deselects the previous choice."]})}),t.jsx(c,{...r,selectedServices:e,onToggleService:i}),e.length>0&&t.jsxs("div",{className:"p-4 bg-green-50 border border-green-200 rounded-lg",children:[t.jsx("p",{className:"text-sm text-green-800 font-medium mb-2",children:"Selected Services:"}),t.jsx("ul",{className:"text-sm text-green-700 list-disc list-inside",children:e.map(o=>t.jsx("li",{children:o},o))})]})]})}},d={args:{selectedServices:[],onToggleService:()=>{}},render:r=>{const[e,s]=p.useState(["INSURANCE_BASIC","MEAL_STANDARD"]),i=S(s);return t.jsxs("div",{className:"space-y-4",children:[t.jsx("div",{className:"p-4 bg-blue-50 border border-blue-200 rounded-lg",children:t.jsxs("p",{className:"text-sm text-blue-800",children:[t.jsx("strong",{children:"Note:"})," Only one service can be selected per category. Selecting a different service in the same category will automatically deselect the previous one."]})}),t.jsx(c,{...r,selectedServices:e,onToggleService:i})]})}},m={args:{selectedServices:[],onToggleService:()=>{}},render:r=>{const[e,s]=p.useState(["INSURANCE_PREMIUM","PICKUP_LUXURY","MEAL_PREMIUM"]),i=S(s);return t.jsx(c,{...r,selectedServices:e,onToggleService:i})}},g={args:{selectedServices:[],onToggleService:()=>{}},render:r=>{const[e,s]=p.useState([]),i=S(s);return t.jsx(c,{...r,selectedServices:e,onToggleService:i,title:"为您的旅程添加额外服务"})}},v={args:{selectedServices:[],onToggleService:()=>{}},render:r=>{const[e,s]=p.useState([]),i=S(s);return t.jsx(c,{...r,selectedServices:e,onToggleService:i,className:"border-2 border-primary shadow-lg"})}};a.parameters={...a.parameters,docs:{...(y=a.parameters)===null||y===void 0?void 0:y.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {},
    title: "选择增值服务"
  }
}`,...(A=a.parameters)===null||A===void 0||(h=A.docs)===null||h===void 0?void 0:h.source},description:{story:"Default state with no services selected",...(N=a.parameters)===null||N===void 0||(T=N.docs)===null||T===void 0?void 0:T.description}}};l.parameters={...l.parameters,docs:{...(f=l.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: (code: string) => storyLogger.info("Toggled:", code)
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleToggleService = createToggleHandler(setSelectedServices);
    return <div className="space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Try it:</strong> Select different services within the same
            category (e.g., Basic Insurance → Premium Insurance) to see how the
            component automatically deselects the previous choice.
          </p>
        </div>
        <AncillarySelection {...args} selectedServices={selectedServices} onToggleService={handleToggleService} />
        {selectedServices.length > 0 && <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium mb-2">
              Selected Services:
            </p>
            <ul className="text-sm text-green-700 list-disc list-inside">
              {selectedServices.map(code => <li key={code}>{code}</li>)}
            </ul>
          </div>}
      </div>;
  }
}`,...(P=l.parameters)===null||P===void 0||(I=P.docs)===null||I===void 0?void 0:I.source},description:{story:`Interactive example with state management
Try selecting different services within the same category to see the single-selection behavior`,...(b=l.parameters)===null||b===void 0||(C=b.docs)===null||C===void 0?void 0:C.description}}};d.parameters={...d.parameters,docs:{...(x=d.parameters)===null||x===void 0?void 0:x.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {}
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>(["INSURANCE_BASIC", "MEAL_STANDARD"]);
    const handleToggleService = createToggleHandler(setSelectedServices);
    return <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Only one service can be selected per
            category. Selecting a different service in the same category will
            automatically deselect the previous one.
          </p>
        </div>
        <AncillarySelection {...args} selectedServices={selectedServices} onToggleService={handleToggleService} />
      </div>;
  }
}`,...(R=d.parameters)===null||R===void 0||(E=R.docs)===null||E===void 0?void 0:E.source},description:{story:`With some services pre-selected (one per category)
Note: Only one service can be selected per category`,...(M=d.parameters)===null||M===void 0||(U=M.docs)===null||U===void 0?void 0:U.description}}};m.parameters={...m.parameters,docs:{...(L=m.parameters)===null||L===void 0?void 0:L.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {}
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>(["INSURANCE_PREMIUM", "PICKUP_LUXURY", "MEAL_PREMIUM"]);
    const handleToggleService = createToggleHandler(setSelectedServices);
    return <AncillarySelection {...args} selectedServices={selectedServices} onToggleService={handleToggleService} />;
  }
}`,...(W=m.parameters)===null||W===void 0||(j=W.docs)===null||j===void 0?void 0:j.source},description:{story:"With all premium services selected",...(w=m.parameters)===null||w===void 0||(O=w.docs)===null||O===void 0?void 0:O.description}}};g.parameters={...g.parameters,docs:{...(D=g.parameters)===null||D===void 0?void 0:D.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {}
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleToggleService = createToggleHandler(setSelectedServices);
    return <AncillarySelection {...args} selectedServices={selectedServices} onToggleService={handleToggleService} title="为您的旅程添加额外服务" />;
  }
}`,...(B=g.parameters)===null||B===void 0||(K=B.docs)===null||K===void 0?void 0:K.source},description:{story:"With custom title",...(Y=g.parameters)===null||Y===void 0||(H=Y.docs)===null||H===void 0?void 0:H.description}}};v.parameters={...v.parameters,docs:{...(k=v.parameters)===null||k===void 0?void 0:k.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {}
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleToggleService = createToggleHandler(setSelectedServices);
    return <AncillarySelection {...args} selectedServices={selectedServices} onToggleService={handleToggleService} className="border-2 border-primary shadow-lg" />;
  }
}`,...(F=v.parameters)===null||F===void 0||(q=F.docs)===null||q===void 0?void 0:q.source},description:{story:"With custom className for styling",...(V=v.parameters)===null||V===void 0||(X=V.docs)===null||X===void 0?void 0:X.description}}};const Ye=["Default","Interactive","WithPreselectedServices","AllPremiumSelected","CustomTitle","WithCustomStyling"];export{m as AllPremiumSelected,g as CustomTitle,a as Default,l as Interactive,v as WithCustomStyling,d as WithPreselectedServices,Ye as __namedExportsOrder,He as default};
