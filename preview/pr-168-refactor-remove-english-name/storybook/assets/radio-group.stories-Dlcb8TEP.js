import{j as e}from"./iframe-MH2zkrPN.js";import{L as o}from"./label-DGTZ3JXd.js";import{R as i,a}from"./radio-group-Bxg_lkjB.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CIElw82c.js";import"./index-dS477dvM.js";import"./index-CAIo4yPc.js";import"./utils-CBfrqCZ4.js";import"./index-QAveg-wL.js";import"./index-DS7n825S.js";import"./index-CmAcN5Kq.js";import"./index-DPNo7x-k.js";import"./index-gFElR5jz.js";import"./index-BsaL00TO.js";import"./index-0QI-b9If.js";import"./index-CU7Nych3.js";import"./index-DjS1tXBK.js";import"./index-BA8XtCtm.js";import"./createLucideIcon-Drc50fbA.js";const D={title:"Shadcn/RadioGroup",component:i,parameters:{layout:"centered"}},n={render:()=>e.jsxs(i,{defaultValue:"option-one",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-one",id:"option-one"}),e.jsx(o,{htmlFor:"option-one",children:"Option One"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-two",id:"option-two"}),e.jsx(o,{htmlFor:"option-two",children:"Option Two"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-three",id:"option-three"}),e.jsx(o,{htmlFor:"option-three",children:"Option Three"})]})]})},s={render:()=>e.jsxs(i,{defaultValue:"option-one",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-one",id:"r1"}),e.jsx(o,{htmlFor:"r1",children:"Default"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-two",id:"r2",disabled:!0}),e.jsx(o,{htmlFor:"r2",children:"Disabled"})]})]})},t={render:()=>e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{children:[e.jsx("h3",{className:"mb-2 text-sm font-medium",children:"Notify me about..."}),e.jsxs(i,{defaultValue:"all",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"all",id:"all"}),e.jsx(o,{htmlFor:"all",children:"All new messages"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"mentions",id:"mentions"}),e.jsx(o,{htmlFor:"mentions",children:"Direct messages and mentions"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"none",id:"none"}),e.jsx(o,{htmlFor:"none",children:"Nothing"})]})]})]})})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
