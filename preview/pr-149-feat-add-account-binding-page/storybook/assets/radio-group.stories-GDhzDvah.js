import{r as i,j as e}from"./iframe-C9irGnsO.js";import{L as R}from"./label-kC1QuNIg.js";import{u as z,c as _}from"./index-CqDiyqbp.js";import{u as L}from"./index-BQy1uiks.js";import{c as F}from"./index-DgDwIQuk.js";import{P as w}from"./index-C-J0SOsc.js";import{c as E,R as H,I as $}from"./index-Cgfl5iJ6.js";import{u as W}from"./index-D1OI5UaN.js";import{u as X}from"./index-D7-RfXa7.js";import{u as Y}from"./index-q9dxn41t.js";import{P as J}from"./index-BpRP8gH1.js";import{c as k}from"./utils-CBfrqCZ4.js";import{c as Q}from"./createLucideIcon-pV7JZRaf.js";import"./preload-helper-PPVm8Dsz.js";import"./index-yOq9H57v.js";import"./index-Ch_Q4g6q.js";import"./index-CyTzrWWd.js";import"./index-BLHdVGJR.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],ee=Q("circle",Z);var C="Radio",[oe,P]=F(C),[re,ae]=oe(C),D=i.forwardRef((a,t)=>{const{__scopeRadio:r,name:d,checked:o=!1,required:s,disabled:n,value:p="on",onCheck:m,form:f,...v}=a,[u,h]=i.useState(null),c=L(t,j=>h(j)),l=i.useRef(!1),b=u?f||!!u.closest("form"):!0;return e.jsxs(re,{scope:r,checked:o,disabled:n,children:[e.jsx(w.button,{type:"button",role:"radio","aria-checked":o,"data-state":V(o),"data-disabled":n?"":void 0,disabled:n,value:p,...v,ref:c,onClick:_(a.onClick,j=>{o||m?.(),b&&(l.current=j.isPropagationStopped(),l.current||j.stopPropagation())})}),b&&e.jsx(O,{control:u,bubbles:!l.current,name:d,value:p,checked:o,required:s,disabled:n,form:f,style:{transform:"translateX(-100%)"}})]})});D.displayName=C;var S="RadioIndicator",A=i.forwardRef((a,t)=>{const{__scopeRadio:r,forceMount:d,...o}=a,s=ae(S,r);return e.jsx(J,{present:d||s.checked,children:e.jsx(w.span,{"data-state":V(s.checked),"data-disabled":s.disabled?"":void 0,...o,ref:t})})});A.displayName=S;var te="RadioBubbleInput",O=i.forwardRef(({__scopeRadio:a,control:t,checked:r,bubbles:d=!0,...o},s)=>{const n=i.useRef(null),p=L(n,s),m=Y(r),f=X(t);return i.useEffect(()=>{const v=n.current;if(!v)return;const u=window.HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(u,"checked").set;if(m!==r&&c){const l=new Event("click",{bubbles:d});c.call(v,r),v.dispatchEvent(l)}},[m,r,d]),e.jsx(w.input,{type:"radio","aria-hidden":!0,defaultChecked:r,...o,tabIndex:-1,ref:p,style:{...o.style,...f,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});O.displayName=te;function V(a){return a?"checked":"unchecked"}var se=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],I="RadioGroup",[ne]=F(I,[E,P]),M=E(),T=P(),[ie,de]=ne(I),q=i.forwardRef((a,t)=>{const{__scopeRadioGroup:r,name:d,defaultValue:o,value:s,required:n=!1,disabled:p=!1,orientation:m,dir:f,loop:v=!0,onValueChange:u,...h}=a,c=M(r),l=W(f),[b,j]=z({prop:s,defaultProp:o??null,onChange:u,caller:I});return e.jsx(ie,{scope:r,name:d,required:n,disabled:p,value:b,onValueChange:j,children:e.jsx(H,{asChild:!0,...c,orientation:m,dir:l,loop:v,children:e.jsx(w.div,{role:"radiogroup","aria-required":n,"aria-orientation":m,"data-disabled":p?"":void 0,dir:l,...h,ref:t})})})});q.displayName=I;var B="RadioGroupItem",K=i.forwardRef((a,t)=>{const{__scopeRadioGroup:r,disabled:d,...o}=a,s=de(B,r),n=s.disabled||d,p=M(r),m=T(r),f=i.useRef(null),v=L(t,f),u=s.value===o.value,h=i.useRef(!1);return i.useEffect(()=>{const c=b=>{se.includes(b.key)&&(h.current=!0)},l=()=>h.current=!1;return document.addEventListener("keydown",c),document.addEventListener("keyup",l),()=>{document.removeEventListener("keydown",c),document.removeEventListener("keyup",l)}},[]),e.jsx($,{asChild:!0,...p,focusable:!n,active:u,children:e.jsx(D,{disabled:n,required:s.required,checked:u,...m,...o,name:s.name,ref:v,onCheck:()=>s.onValueChange(o.value),onKeyDown:_(c=>{c.key==="Enter"&&c.preventDefault()}),onFocus:_(o.onFocus,()=>{h.current&&f.current?.click()})})})});K.displayName=B;var ce="RadioGroupIndicator",U=i.forwardRef((a,t)=>{const{__scopeRadioGroup:r,...d}=a,o=T(r);return e.jsx(A,{...o,...d,ref:t})});U.displayName=ce;var le=q,ue=K,pe=U;function N({className:a,...t}){return e.jsx(le,{"data-slot":"radio-group",className:k("grid gap-3",a),...t})}function x({className:a,...t}){return e.jsx(ue,{"data-slot":"radio-group-item",className:k("border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",a),...t,children:e.jsx(pe,{"data-slot":"radio-group-indicator",className:"relative flex items-center justify-center",children:e.jsx(ee,{className:"fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"})})})}N.__docgenInfo={description:"",methods:[],displayName:"RadioGroup"};x.__docgenInfo={description:"",methods:[],displayName:"RadioGroupItem"};const Ee={title:"Shadcn/RadioGroup",component:N,parameters:{layout:"centered"}},g={render:()=>e.jsxs(N,{defaultValue:"option-one",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{value:"option-one",id:"option-one"}),e.jsx(R,{htmlFor:"option-one",children:"Option One"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{value:"option-two",id:"option-two"}),e.jsx(R,{htmlFor:"option-two",children:"Option Two"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{value:"option-three",id:"option-three"}),e.jsx(R,{htmlFor:"option-three",children:"Option Three"})]})]})},y={render:()=>e.jsxs(N,{defaultValue:"option-one",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{value:"option-one",id:"r1"}),e.jsx(R,{htmlFor:"r1",children:"Default"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{value:"option-two",id:"r2",disabled:!0}),e.jsx(R,{htmlFor:"r2",children:"Disabled"})]})]})},G={render:()=>e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{children:[e.jsx("h3",{className:"mb-2 text-sm font-medium",children:"Notify me about..."}),e.jsxs(N,{defaultValue:"all",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{value:"all",id:"all"}),e.jsx(R,{htmlFor:"all",children:"All new messages"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{value:"mentions",id:"mentions"}),e.jsx(R,{htmlFor:"mentions",children:"Direct messages and mentions"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(x,{value:"none",id:"none"}),e.jsx(R,{htmlFor:"none",children:"Nothing"})]})]})]})})};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r2" disabled />
        <Label htmlFor="r2">Disabled</Label>
      </div>
    </RadioGroup>
}`,...y.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Notify me about...</h3>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All new messages</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mentions" id="mentions" />
            <Label htmlFor="mentions">Direct messages and mentions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">Nothing</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
}`,...G.parameters?.docs?.source}}};const ke=["Default","Disabled","Form"];export{g as Default,y as Disabled,G as Form,ke as __namedExportsOrder,Ee as default};
