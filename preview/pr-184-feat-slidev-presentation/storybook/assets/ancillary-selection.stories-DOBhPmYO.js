import{j as e,r as v}from"./iframe-BH7aeb89.js";import{A as C,a as y,b as N,c as T}from"./accordion-3v6skc-x.js";import{C as I,a as P,b as R,c as E}from"./card-EjpOmyDU.js";import{C as U}from"./checkbox-DQS5Alqe.js";import{L as b}from"./label-CfPQCWIb.js";import{g as x,a as _}from"./ancillary-v4vhjuaq.js";import{f as w}from"./currency-BllR5SlS.js";import{c as f}from"./createLucideIcon-C7RxPt7J.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B8FmrOkk.js";import"./index-xejYHESO.js";import"./index-B6zyZfym.js";import"./index-BDEDCb8l.js";import"./index-DGQpXj_O.js";import"./index-rfJbia-g.js";import"./index-B4LoADOl.js";import"./index-CRy6Bd47.js";import"./index-Be60dqzC.js";import"./index-D69ldn1F.js";import"./utils-CBfrqCZ4.js";import"./chevron-down-CRuEYTon.js";import"./index-BKTB3NxE.js";import"./index-MqkOuM2Y.js";import"./check-FnDv8DZK.js";import"./schemas-dlpNQSCA.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]],k=f("car",M);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],O=f("shield",L);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]],H=f("utensils",D);function a({selectedServices:c,onToggleService:s,title:t="选择增值服务",className:n}){const i=r=>{const j=c.includes(r.code);return e.jsxs(b,{className:"flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors",children:[e.jsx(U,{id:r.code,checked:j,onCheckedChange:()=>s(r.code),onClick:A=>A.stopPropagation(),className:"mt-1"}),e.jsxs("div",{className:"flex-1 space-y-1",children:[e.jsx(b,{htmlFor:r.code,className:"text-base font-medium cursor-pointer",children:r.name}),r.description&&e.jsx("p",{className:"text-sm text-muted-foreground",children:r.description})]}),e.jsx("div",{className:"text-right",children:e.jsx("div",{className:"text-lg font-bold text-orange-500",children:w(r.price)})})]},r.code)},o=r=>{switch(r){case"INSURANCE":return e.jsx(O,{className:"h-5 w-5"});case"AIRPORT_PICKUP":return e.jsx(k,{className:"h-5 w-5"});case"MEAL":return e.jsx(H,{className:"h-5 w-5"});default:return null}},h=r=>{switch(r){case"INSURANCE":return"旅行保险";case"AIRPORT_PICKUP":return"接送机服务";case"MEAL":return"机上餐食";default:return r}};return e.jsxs(I,{className:n,children:[e.jsx(P,{children:e.jsx(R,{children:t})}),e.jsx(E,{children:e.jsxs(C,{type:"multiple",className:"w-full",children:[e.jsxs(y,{value:"insurance",children:[e.jsx(N,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[o("INSURANCE"),e.jsx("span",{className:"font-semibold",children:h("INSURANCE")})]})}),e.jsx(T,{children:e.jsx("div",{className:"space-y-3",children:x("INSURANCE").map(r=>i(r))})})]}),e.jsxs(y,{value:"airport-pickup",children:[e.jsx(N,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[o("AIRPORT_PICKUP"),e.jsx("span",{className:"font-semibold",children:h("AIRPORT_PICKUP")})]})}),e.jsx(T,{children:e.jsx("div",{className:"space-y-3",children:x("AIRPORT_PICKUP").map(r=>i(r))})})]}),e.jsxs(y,{value:"meal",children:[e.jsx(N,{children:e.jsxs("div",{className:"flex items-center gap-2",children:[o("MEAL"),e.jsx("span",{className:"font-semibold",children:h("MEAL")})]})}),e.jsx(T,{children:e.jsx("div",{className:"space-y-3",children:x("MEAL").map(r=>i(r))})})]})]})})]})}a.__docgenInfo={description:`AncillarySelection Component

Displays ancillary services (insurance, airport pickup, meals) in an accordion
with checkboxes for selection.`,methods:[],displayName:"AncillarySelection",props:{selectedServices:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of selected service codes"},onToggleService:{required:!0,tsType:{name:"signature",type:"function",raw:"(code: string) => void",signature:{arguments:[{type:{name:"string"},name:"code"}],return:{name:"void"}}},description:"Callback when a service is toggled"},title:{required:!1,tsType:{name:"string"},description:"Optional title for the card",defaultValue:{value:'"选择增值服务"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional className for the card"}}};const u=c=>s=>{c(t=>{if(t.includes(s))return t.filter(r=>r!==s);const n=_(s);if(!n)return t;const o=x(n.category).map(r=>r.code);return[...t.filter(r=>!o.includes(r)),s]})},ge={title:"Flights/AncillarySelection",component:a,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{selectedServices:{control:"object",description:"Array of selected service codes"},onToggleService:{action:"toggled",description:"Callback when a service is toggled"},title:{control:"text",description:"Optional title for the card"},className:{control:"text",description:"Optional className for the card"}}},l={args:{selectedServices:[],onToggleService:()=>{},title:"选择增值服务"}},d={args:{selectedServices:[],onToggleService:c=>console.log("Toggled:",c)},render:c=>{const[s,t]=v.useState([]),n=u(t);return e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"p-4 bg-amber-50 border border-amber-200 rounded-lg",children:e.jsxs("p",{className:"text-sm text-amber-800",children:[e.jsx("strong",{children:"Try it:"})," Select different services within the same category (e.g., Basic Insurance → Premium Insurance) to see how the component automatically deselects the previous choice."]})}),e.jsx(a,{...c,selectedServices:s,onToggleService:n}),s.length>0&&e.jsxs("div",{className:"p-4 bg-green-50 border border-green-200 rounded-lg",children:[e.jsx("p",{className:"text-sm text-green-800 font-medium mb-2",children:"Selected Services:"}),e.jsx("ul",{className:"text-sm text-green-700 list-disc list-inside",children:s.map(i=>e.jsx("li",{children:i},i))})]})]})}},g={args:{selectedServices:[],onToggleService:()=>{}},render:c=>{const[s,t]=v.useState(["INSURANCE_BASIC","MEAL_STANDARD"]),n=u(t);return e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"p-4 bg-blue-50 border border-blue-200 rounded-lg",children:e.jsxs("p",{className:"text-sm text-blue-800",children:[e.jsx("strong",{children:"Note:"})," Only one service can be selected per category. Selecting a different service in the same category will automatically deselect the previous one."]})}),e.jsx(a,{...c,selectedServices:s,onToggleService:n})]})}},m={args:{selectedServices:[],onToggleService:()=>{}},render:c=>{const[s,t]=v.useState(["INSURANCE_PREMIUM","PICKUP_LUXURY","MEAL_PREMIUM"]),n=u(t);return e.jsx(a,{...c,selectedServices:s,onToggleService:n})}},p={args:{selectedServices:[],onToggleService:()=>{}},render:c=>{const[s,t]=v.useState([]),n=u(t);return e.jsx(a,{...c,selectedServices:s,onToggleService:n,title:"为您的旅程添加额外服务"})}},S={args:{selectedServices:[],onToggleService:()=>{}},render:c=>{const[s,t]=v.useState([]),n=u(t);return e.jsx(a,{...c,selectedServices:s,onToggleService:n,className:"border-2 border-primary shadow-lg"})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source},description:{story:"With custom className for styling",...S.parameters?.docs?.description}}};const me=["Default","Interactive","WithPreselectedServices","AllPremiumSelected","CustomTitle","WithCustomStyling"];export{m as AllPremiumSelected,p as CustomTitle,l as Default,d as Interactive,S as WithCustomStyling,g as WithPreselectedServices,me as __namedExportsOrder,ge as default};
