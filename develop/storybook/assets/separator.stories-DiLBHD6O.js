import{j as e}from"./iframe-D5i0_IZ-.js";import{S as r}from"./separator-CCzpeS35.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1nkTqdZH.js";import"./index-b7o_ppjr.js";import"./index-DuFYr0_T.js";import"./utils-CBfrqCZ4.js";const l={title:"Shadcn/Separator",component:r,parameters:{layout:"centered"},argTypes:{orientation:{control:"select",options:["horizontal","vertical"],description:"The orientation of the separator"},decorative:{control:"boolean",description:"Whether the separator is decorative"}}},t={render:()=>e.jsxs("div",{className:"w-[300px]",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("h4",{className:"text-sm font-medium leading-none",children:"Radix Primitives"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"An open-source UI component library."})]}),e.jsx(r,{className:"my-4"}),e.jsxs("div",{className:"flex h-5 items-center space-x-4 text-sm",children:[e.jsx("div",{children:"Blog"}),e.jsx(r,{orientation:"vertical"}),e.jsx("div",{children:"Docs"}),e.jsx(r,{orientation:"vertical"}),e.jsx("div",{children:"Source"})]})]})},i={render:()=>e.jsxs("div",{className:"flex h-20 items-center space-x-4",children:[e.jsx("div",{children:"Item 1"}),e.jsx(r,{orientation:"vertical"}),e.jsx("div",{children:"Item 2"}),e.jsx(r,{orientation:"vertical"}),e.jsx("div",{children:"Item 3"})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex h-20 items-center space-x-4">
      <div>Item 1</div>
      <Separator orientation="vertical" />
      <div>Item 2</div>
      <Separator orientation="vertical" />
      <div>Item 3</div>
    </div>
}`,...i.parameters?.docs?.source}}};const p=["Horizontal","Vertical"];export{t as Horizontal,i as Vertical,p as __namedExportsOrder,l as default};
