import{j as e}from"./iframe-DjPNHZgi.js";import{L as o}from"./label-IH1ewb31.js";import{R as i,a}from"./radio-group-BpGhxpcs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C2lakmAf.js";import"./index-jzZgMQDY.js";import"./index-B46xqJ3Q.js";import"./utils-CBfrqCZ4.js";import"./index-BoXeLxTd.js";import"./index-BSCXUqjY.js";import"./index-DZFAII8J.js";import"./index-DOSt7zoo.js";import"./index-C9djRiX_.js";import"./index-Ci8KpLXl.js";import"./index-D3iy3Mua.js";import"./index-BcWtkAfF.js";import"./index-BOKW9L8K.js";import"./index-D9CYGfjn.js";import"./createLucideIcon-DIu0cbjF.js";const D={title:"Shadcn/RadioGroup",component:i,parameters:{layout:"centered"}},n={render:()=>e.jsxs(i,{defaultValue:"option-one",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-one",id:"option-one"}),e.jsx(o,{htmlFor:"option-one",children:"Option One"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-two",id:"option-two"}),e.jsx(o,{htmlFor:"option-two",children:"Option Two"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-three",id:"option-three"}),e.jsx(o,{htmlFor:"option-three",children:"Option Three"})]})]})},s={render:()=>e.jsxs(i,{defaultValue:"option-one",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-one",id:"r1"}),e.jsx(o,{htmlFor:"r1",children:"Default"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"option-two",id:"r2",disabled:!0}),e.jsx(o,{htmlFor:"r2",children:"Disabled"})]})]})},t={render:()=>e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{children:[e.jsx("h3",{className:"mb-2 text-sm font-medium",children:"Notify me about..."}),e.jsxs(i,{defaultValue:"all",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"all",id:"all"}),e.jsx(o,{htmlFor:"all",children:"All new messages"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"mentions",id:"mentions"}),e.jsx(o,{htmlFor:"mentions",children:"Direct messages and mentions"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(a,{value:"none",id:"none"}),e.jsx(o,{htmlFor:"none",children:"Nothing"})]})]})]})})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
