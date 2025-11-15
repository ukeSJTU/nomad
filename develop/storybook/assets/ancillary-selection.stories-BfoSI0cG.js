import{j as e,r as v}from"./iframe-DI5Oy9RL.js";import{A as P,a as x,b as N,c as A}from"./accordion-Dv7TsDK0.js";import{C as R,a as E,b as U,c as _}from"./card-KQY2Jrno.js";import{C as M}from"./checkbox-5LBPnSo2.js";import{L as C}from"./label-BAvIbR7K.js";import{o as L,_ as w,n as O,s as T,a as k}from"./schemas-dlpNQSCA.js";import{f as K}from"./currency-BllR5SlS.js";import{c as f}from"./createLucideIcon-BhzAdi9T.js";import"./preload-helper-PPVm8Dsz.js";import"./index-5SmAaEk-.js";import"./index-D6ROJEKz.js";import"./index-DCU1OT1a.js";import"./index-NM0MU2HX.js";import"./index-IoNmgYKw.js";import"./index-DQyPI5TK.js";import"./index-n-UeRsni.js";import"./index-DFZNd5NJ.js";import"./index-CQaLpz_J.js";import"./index-CAoU1iiv.js";import"./utils-CBfrqCZ4.js";import"./chevron-down-n8MGPeuo.js";import"./index-C2m6zttO.js";import"./index-D4Vi1ckl.js";import"./check-Buze8Ocw.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]],H=f("car",D);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],W=f("shield",B);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]],V=f("utensils",q),Y=["INSURANCE","AIRPORT_PICKUP","MEAL"],F=L({code:T().min(1).max(50),name:T().min(1).max(100),description:T().max(500).optional(),price:O().positive(),category:w(Y)});k(F);const I=[{code:"INSURANCE_BASIC",name:"基础旅行险",description:"提供基本的旅行意外保障，包括意外伤害和医疗费用",price:50,category:"INSURANCE"},{code:"INSURANCE_PREMIUM",name:"高级旅行险",description:"提供全面的旅行保障，包括意外伤害、医疗费用、行李丢失和航班延误",price:120,category:"INSURANCE"},{code:"INSURANCE_FAMILY",name:"家庭旅行险",description:"适合全家出行，提供全面的家庭旅行保障",price:200,category:"INSURANCE"},{code:"PICKUP_ECONOMY",name:"经济型接送机",description:"舒适的经济型车辆接送机服务",price:80,category:"AIRPORT_PICKUP"},{code:"PICKUP_BUSINESS",name:"商务型接送机",description:"高端商务车辆接送机服务，提供更舒适的乘坐体验",price:150,category:"AIRPORT_PICKUP"},{code:"PICKUP_LUXURY",name:"豪华型接送机",description:"豪华车辆接送机服务，享受尊贵出行体验",price:300,category:"AIRPORT_PICKUP"},{code:"MEAL_STANDARD",name:"标准餐食",description:"提供标准的机上餐食，包括主食、小吃和饮料",price:30,category:"MEAL"},{code:"MEAL_VEGETARIAN",name:"素食餐",description:"提供健康的素食餐食选择",price:35,category:"MEAL"},{code:"MEAL_HALAL",name:"清真餐",description:"符合清真标准的餐食",price:35,category:"MEAL"},{code:"MEAL_PREMIUM",name:"高级餐食",description:"提供精选的高级餐食，包括多道菜品和优质饮料",price:80,category:"MEAL"}];function y(c){return I.filter(s=>s.category===c)}function X(c){return I.find(s=>s.code===c)}function o({selectedServices:c,onToggleService:s,title:t="选择增值服务",className:n}){const i=r=>{const b=c.includes(r.code);return e.jsxs(C,{className:"flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors",children:[e.jsx(M,{id:r.code,checked:b,onCheckedChange:()=>s(r.code),onClick:j=>j.stopPropagation(),className:"mt-1"}),e.jsxs("div",{className:"flex-1 space-y-1",children:[e.jsx(C,{htmlFor:r.code,className:"text-base font-medium cursor-pointer",children:r.name}),r.description&&e.jsx("p",{className:"text-sm text-muted-foreground",children:r.description})]}),e.jsx("div",{className:"text-right",children:e.jsx("div",{className:"text-lg font-bold text-orange-500",children:K(r.price)})})]},r.code)},a=r=>{switch(r){case"INSURANCE":return e.jsx(W,{className:"h-5 w-5"});case"AIRPORT_PICKUP":return e.jsx(H,{className:"h-5 w-5"});case"MEAL":return e.jsx(V,{className:"h-5 w-5"});default:return null}},h=r=>{switch(r){case"INSURANCE":return"旅行保险";case"AIRPORT_PICKUP":return"接送机服务";case"MEAL":return"机上餐食";default:return r}};return e.jsxs(R,{className:n,children:[e.jsx(E,{children:e.jsx(U,{children:t})}),e.jsx(_,{children:e.jsxs(P,{type:"multiple",className:"w-full",children:[e.jsxs(x,{value:"insurance",children:[e.jsx(N,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[a("INSURANCE"),e.jsx("span",{className:"font-semibold",children:h("INSURANCE")})]})}),e.jsx(A,{children:e.jsx("div",{className:"space-y-3",children:y("INSURANCE").map(r=>i(r))})})]}),e.jsxs(x,{value:"airport-pickup",children:[e.jsx(N,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[a("AIRPORT_PICKUP"),e.jsx("span",{className:"font-semibold",children:h("AIRPORT_PICKUP")})]})}),e.jsx(A,{children:e.jsx("div",{className:"space-y-3",children:y("AIRPORT_PICKUP").map(r=>i(r))})})]}),e.jsxs(x,{value:"meal",children:[e.jsx(N,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[a("MEAL"),e.jsx("span",{className:"font-semibold",children:h("MEAL")})]})}),e.jsx(A,{children:e.jsx("div",{className:"space-y-3",children:y("MEAL").map(r=>i(r))})})]})]})})]})}o.__docgenInfo={description:`AncillarySelection Component

Displays ancillary services (insurance, airport pickup, meals) in an accordion
with checkboxes for selection.`,methods:[],displayName:"AncillarySelection",props:{selectedServices:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of selected service codes"},onToggleService:{required:!0,tsType:{name:"signature",type:"function",raw:"(code: string) => void",signature:{arguments:[{type:{name:"string"},name:"code"}],return:{name:"void"}}},description:"Callback when a service is toggled"},title:{required:!1,tsType:{name:"string"},description:"Optional title for the card",defaultValue:{value:'"选择增值服务"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional className for the card"}}};const u=c=>s=>{c(t=>{if(t.includes(s))return t.filter(r=>r!==s);const n=X(s);if(!n)return t;const a=y(n.category).map(r=>r.code);return[...t.filter(r=>!a.includes(r)),s]})},ye={title:"Flights/AncillarySelection",component:o,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{selectedServices:{control:"object",description:"Array of selected service codes"},onToggleService:{action:"toggled",description:"Callback when a service is toggled"},title:{control:"text",description:"Optional title for the card"},className:{control:"text",description:"Optional className for the card"}}},l={args:{selectedServices:[],onToggleService:()=>{},title:"选择增值服务"}},d={args:{selectedServices:[],onToggleService:c=>console.log("Toggled:",c)},render:c=>{const[s,t]=v.useState([]),n=u(t);return e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"p-4 bg-amber-50 border border-amber-200 rounded-lg",children:e.jsxs("p",{className:"text-sm text-amber-800",children:[e.jsx("strong",{children:"Try it:"})," Select different services within the same category (e.g., Basic Insurance → Premium Insurance) to see how the component automatically deselects the previous choice."]})}),e.jsx(o,{...c,selectedServices:s,onToggleService:n}),s.length>0&&e.jsxs("div",{className:"p-4 bg-green-50 border border-green-200 rounded-lg",children:[e.jsx("p",{className:"text-sm text-green-800 font-medium mb-2",children:"Selected Services:"}),e.jsx("ul",{className:"text-sm text-green-700 list-disc list-inside",children:s.map(i=>e.jsx("li",{children:i},i))})]})]})}},g={args:{selectedServices:[],onToggleService:()=>{}},render:c=>{const[s,t]=v.useState(["INSURANCE_BASIC","MEAL_STANDARD"]),n=u(t);return e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"p-4 bg-blue-50 border border-blue-200 rounded-lg",children:e.jsxs("p",{className:"text-sm text-blue-800",children:[e.jsx("strong",{children:"Note:"})," Only one service can be selected per category. Selecting a different service in the same category will automatically deselect the previous one."]})}),e.jsx(o,{...c,selectedServices:s,onToggleService:n})]})}},m={args:{selectedServices:[],onToggleService:()=>{}},render:c=>{const[s,t]=v.useState(["INSURANCE_PREMIUM","PICKUP_LUXURY","MEAL_PREMIUM"]),n=u(t);return e.jsx(o,{...c,selectedServices:s,onToggleService:n})}},p={args:{selectedServices:[],onToggleService:()=>{}},render:c=>{const[s,t]=v.useState([]),n=u(t);return e.jsx(o,{...c,selectedServices:s,onToggleService:n,title:"为您的旅程添加额外服务"})}},S={args:{selectedServices:[],onToggleService:()=>{}},render:c=>{const[s,t]=v.useState([]),n=u(t);return e.jsx(o,{...c,selectedServices:s,onToggleService:n,className:"border-2 border-primary shadow-lg"})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {},
    title: "选择增值服务"
  }
}`,...l.parameters?.docs?.source},description:{story:"Default state with no services selected",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: (code: string) => console.log("Toggled:", code)
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
}`,...d.parameters?.docs?.source},description:{story:`Interactive example with state management
Try selecting different services within the same category to see the single-selection behavior`,...d.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source},description:{story:`With some services pre-selected (one per category)
Note: Only one service can be selected per category`,...g.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {}
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>(["INSURANCE_PREMIUM", "PICKUP_LUXURY", "MEAL_PREMIUM"]);
    const handleToggleService = createToggleHandler(setSelectedServices);
    return <AncillarySelection {...args} selectedServices={selectedServices} onToggleService={handleToggleService} />;
  }
}`,...m.parameters?.docs?.source},description:{story:"With all premium services selected",...m.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {}
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleToggleService = createToggleHandler(setSelectedServices);
    return <AncillarySelection {...args} selectedServices={selectedServices} onToggleService={handleToggleService} title="为您的旅程添加额外服务" />;
  }
}`,...p.parameters?.docs?.source},description:{story:"With custom title",...p.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    selectedServices: [],
    onToggleService: () => {}
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleToggleService = createToggleHandler(setSelectedServices);
    return <AncillarySelection {...args} selectedServices={selectedServices} onToggleService={handleToggleService} className="border-2 border-primary shadow-lg" />;
  }
}`,...S.parameters?.docs?.source},description:{story:"With custom className for styling",...S.parameters?.docs?.description}}};const xe=["Default","Interactive","WithPreselectedServices","AllPremiumSelected","CustomTitle","WithCustomStyling"];export{m as AllPremiumSelected,p as CustomTitle,l as Default,d as Interactive,S as WithCustomStyling,g as WithPreselectedServices,xe as __namedExportsOrder,ye as default};
