import{j as e}from"./iframe-CI8RcqoP.js";import{L as o}from"./label-CZMN1jQs.js";import{R as i,a}from"./radio-group-B8bulniV.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8ezSOz0.js";import"./index-Dh49C-bO.js";import"./index-DSe4ykHS.js";import"./utils-CBfrqCZ4.js";import"./index-D3UNsTty.js";import"./index-DafoROd9.js";import"./index-DxEp22hh.js";import"./index-gozpv_Jj.js";import"./index-8Dgdou0E.js";import"./index-BeR9Vny7.js";import"./index-12jarvNk.js";import"./index-Eov5aULG.js";import"./index-3tHWB65k.js";import"./index-BAIULMoA.js";import"./createLucideIcon-UhiBFwT6.js";const D={title:"Shadcn/RadioGroup",component:i,parameters:{layout:"centered"}},n={render:()=>e.jsxs(i,{defaultValue:"option-one",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-one",id:"option-one"}),e.jsx(o,{htmlFor:"option-one",children:"Option One"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-two",id:"option-two"}),e.jsx(o,{htmlFor:"option-two",children:"Option Two"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-three",id:"option-three"}),e.jsx(o,{htmlFor:"option-three",children:"Option Three"})]})]})},s={render:()=>e.jsxs(i,{defaultValue:"option-one",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-one",id:"r1"}),e.jsx(o,{htmlFor:"r1",children:"Default"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-two",id:"r2",disabled:!0}),e.jsx(o,{htmlFor:"r2",children:"Disabled"})]})]})},t={render:()=>e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{children:[e.jsx("h3",{className:"mb-2 text-sm font-medium",children:"Notify me about..."}),e.jsxs(i,{defaultValue:"all",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"all",id:"all"}),e.jsx(o,{htmlFor:"all",children:"All new messages"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"mentions",id:"mentions"}),e.jsx(o,{htmlFor:"mentions",children:"Direct messages and mentions"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"none",id:"none"}),e.jsx(o,{htmlFor:"none",children:"Nothing"})]})]})]})})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const g=["Default","Disabled","Form"];export{n as Default,s as Disabled,t as Form,g as __namedExportsOrder,D as default};
