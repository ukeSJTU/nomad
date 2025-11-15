import{j as e}from"./iframe-CI8RcqoP.js";import{B as t}from"./button-BbUkJ6zr.js";import{I as m}from"./input-9r2K-C6t.js";import{L as p}from"./label-CZMN1jQs.js";import{S as r,a,b as h,c as d,d as l,e as c,f as S,g as u}from"./sheet-C6dURG5b.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DSe4ykHS.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./index-C8ezSOz0.js";import"./index-Dh49C-bO.js";import"./index-Cs5uarL2.js";import"./index-D3UNsTty.js";import"./index-DafoROd9.js";import"./index-DxEp22hh.js";import"./index-BeR9Vny7.js";import"./index-D9d2bn14.js";import"./index-12jarvNk.js";import"./Combination-BvbASJbl.js";import"./index-BAIULMoA.js";import"./x-BOZXG_MY.js";import"./createLucideIcon-UhiBFwT6.js";const P={title:"Shadcn/Sheet",component:r,parameters:{layout:"centered"}},s={render:()=>e.jsxs(r,{children:[e.jsx(a,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open"})}),e.jsxs(h,{children:[e.jsxs(d,{children:[e.jsx(l,{children:"Edit profile"}),e.jsx(c,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(p,{htmlFor:"name",className:"text-right",children:"Name"}),e.jsx(m,{id:"name",value:"Pedro Duarte",className:"col-span-3"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(p,{htmlFor:"username",className:"text-right",children:"Username"}),e.jsx(m,{id:"username",value:"@peduarte",className:"col-span-3"})]})]}),e.jsx(S,{children:e.jsx(u,{asChild:!0,children:e.jsx(t,{type:"submit",children:"Save changes"})})})]})]})},i={render:()=>e.jsxs(r,{children:[e.jsx(a,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open Left"})}),e.jsx(h,{side:"left",children:e.jsxs(d,{children:[e.jsx(l,{children:"Left Sheet"}),e.jsx(c,{children:"This sheet slides in from the left side."})]})})]})},n={render:()=>e.jsxs(r,{children:[e.jsx(a,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open Top"})}),e.jsx(h,{side:"top",children:e.jsxs(d,{children:[e.jsx(l,{children:"Top Sheet"}),e.jsx(c,{children:"This sheet slides in from the top."})]})})]})},o={render:()=>e.jsxs(r,{children:[e.jsx(a,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open Bottom"})}),e.jsx(h,{side:"bottom",children:e.jsxs(d,{children:[e.jsx(l,{children:"Bottom Sheet"}),e.jsx(c,{children:"This sheet slides in from the bottom."})]})})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the left side.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the top.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the bottom.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
}`,...o.parameters?.docs?.source}}};const U=["Right","Left","Top","Bottom"];export{o as Bottom,i as Left,s as Right,n as Top,U as __namedExportsOrder,P as default};
