import{r as S,j as e}from"./iframe-CzR_lBGD.js";import{u as z,c as B}from"./index-C84I_n6g.js";import{P as w}from"./index-BZi2eZK-.js";import{c as y}from"./index-CdJFUDDL.js";import{c as P}from"./utils-CBfrqCZ4.js";import{B as s,I as v,U as h}from"./underline-DfRXpPJY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-AB5S2E6k.js";import"./index-BBRa4g0D.js";import"./index-BI_WAhcV.js";import"./createLucideIcon-HIki9NZA.js";var f="Toggle",x=S.forwardRef((r,g)=>{const{pressed:u,defaultPressed:p,onPressedChange:b,...j}=r,[m,T]=z({prop:u,onChange:b,defaultProp:p??!1,caller:f});return e.jsx(w.button,{type:"button","aria-pressed":m,"data-state":m?"on":"off","data-disabled":r.disabled?"":void 0,...j,ref:g,onClick:B(r.onClick,()=>{r.disabled||T(!m)})})});x.displayName=f;var _=x;const N=y("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",{variants:{variant:{default:"bg-transparent",outline:"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"},size:{default:"h-9 px-2 min-w-9",sm:"h-8 px-1.5 min-w-8",lg:"h-10 px-2.5 min-w-10"}},defaultVariants:{variant:"default",size:"default"}});function a({className:r,variant:g,size:u,...p}){return e.jsx(_,{"data-slot":"toggle",className:P(N({variant:g,size:u,className:r})),...p})}a.__docgenInfo={description:"",methods:[],displayName:"Toggle"};const V={title:"Shadcn/Toggle",component:a,parameters:{layout:"centered"},argTypes:{variant:{control:"select",options:["default","outline"],description:"The visual style variant of the toggle"},size:{control:"select",options:["default","sm","lg"],description:"The size of the toggle"},disabled:{control:"boolean",description:"Whether the toggle is disabled"}}},t={args:{children:e.jsx(s,{})}},n={args:{variant:"outline",children:e.jsx(v,{})}},o={args:{size:"sm",children:e.jsx(s,{})}},i={args:{size:"lg",children:e.jsx(s,{})}},l={args:{variant:"outline",children:e.jsxs(e.Fragment,{children:[e.jsx(s,{}),"Bold"]})}},d={args:{disabled:!0,children:e.jsx(h,{})}},c={render:()=>e.jsxs("div",{className:"flex gap-1",children:[e.jsx(a,{variant:"outline",children:e.jsx(s,{})}),e.jsx(a,{variant:"outline",children:e.jsx(v,{})}),e.jsx(a,{variant:"outline",children:e.jsx(h,{})})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: <Bold />
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    children: <Italic />
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: "sm",
    children: <Bold />
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    size: "lg",
    children: <Bold />
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    children: <>
        <Bold />
        Bold
      </>
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: <Underline />
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex gap-1">
      <Toggle variant="outline">
        <Bold />
      </Toggle>
      <Toggle variant="outline">
        <Italic />
      </Toggle>
      <Toggle variant="outline">
        <Underline />
      </Toggle>
    </div>
}`,...c.parameters?.docs?.source}}};const A=["Default","Outline","Small","Large","WithText","Disabled","Group"];export{t as Default,d as Disabled,c as Group,i as Large,n as Outline,o as Small,l as WithText,A as __namedExportsOrder,V as default};
