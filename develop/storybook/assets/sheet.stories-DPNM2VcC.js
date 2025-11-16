import{j as e}from"./iframe-CvbL331m.js";import{B as a}from"./button-CAXY9XPu.js";import{I as S}from"./input-mbU9WAfX.js";import{L as f}from"./label-D8545hoU.js";import{R as N,T as b,C,a as x,b as y,D as B,P as _,O as D}from"./index-DFovhr4j.js";import{c as o}from"./utils-CBfrqCZ4.js";import{X as I}from"./x-Cg6LxRp2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C7jJTgGp.js";import"./index-CdJFUDDL.js";import"./index-BfQugiVD.js";import"./index-DhbfMN3k.js";import"./index-DCRjOMVy.js";import"./index-CX3gvrbW.js";import"./index-BDPzjxq2.js";import"./index-CTOkKrmH.js";import"./index-xScFZXtB.js";import"./index-qYKsYFBV.js";import"./Combination-BZo4Xv3R.js";import"./index-B5evkZDY.js";import"./createLucideIcon-BH8CnD7y.js";function r({...t}){return e.jsx(N,{"data-slot":"sheet",...t})}function n({...t}){return e.jsx(b,{"data-slot":"sheet-trigger",...t})}function j({...t}){return e.jsx(x,{"data-slot":"sheet-close",...t})}function L({...t}){return e.jsx(_,{"data-slot":"sheet-portal",...t})}function O({className:t,...s}){return e.jsx(D,{"data-slot":"sheet-overlay",className:o("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",t),...s})}function i({className:t,children:s,side:c="right",...T}){return e.jsxs(L,{children:[e.jsx(O,{}),e.jsxs(C,{"data-slot":"sheet-content",className:o("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",c==="right"&&"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",c==="left"&&"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",c==="top"&&"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",c==="bottom"&&"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",t),...T,children:[s,e.jsxs(x,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",children:[e.jsx(I,{className:"size-4"}),e.jsx("span",{className:"sr-only",children:"Close"})]})]})]})}function d({className:t,...s}){return e.jsx("div",{"data-slot":"sheet-header",className:o("flex flex-col gap-1.5 p-4",t),...s})}function v({className:t,...s}){return e.jsx("div",{"data-slot":"sheet-footer",className:o("mt-auto flex flex-col gap-2 p-4",t),...s})}function l({className:t,...s}){return e.jsx(y,{"data-slot":"sheet-title",className:o("text-foreground font-semibold",t),...s})}function h({className:t,...s}){return e.jsx(B,{"data-slot":"sheet-description",className:o("text-muted-foreground text-sm",t),...s})}r.__docgenInfo={description:"",methods:[],displayName:"Sheet"};j.__docgenInfo={description:"",methods:[],displayName:"SheetClose"};i.__docgenInfo={description:"",methods:[],displayName:"SheetContent",props:{side:{required:!1,tsType:{name:"union",raw:'"top" | "right" | "bottom" | "left"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"right"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'}]},description:"",defaultValue:{value:'"right"',computed:!1}}}};h.__docgenInfo={description:"",methods:[],displayName:"SheetDescription"};v.__docgenInfo={description:"",methods:[],displayName:"SheetFooter"};d.__docgenInfo={description:"",methods:[],displayName:"SheetHeader"};l.__docgenInfo={description:"",methods:[],displayName:"SheetTitle"};n.__docgenInfo={description:"",methods:[],displayName:"SheetTrigger"};const $={title:"Shadcn/Sheet",component:r,parameters:{layout:"centered"}},m={render:()=>e.jsxs(r,{children:[e.jsx(n,{asChild:!0,children:e.jsx(a,{variant:"outline",children:"Open"})}),e.jsxs(i,{children:[e.jsxs(d,{children:[e.jsx(l,{children:"Edit profile"}),e.jsx(h,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(f,{htmlFor:"name",className:"text-right",children:"Name"}),e.jsx(S,{id:"name",value:"Pedro Duarte",className:"col-span-3"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(f,{htmlFor:"username",className:"text-right",children:"Username"}),e.jsx(S,{id:"username",value:"@peduarte",className:"col-span-3"})]})]}),e.jsx(v,{children:e.jsx(j,{asChild:!0,children:e.jsx(a,{type:"submit",children:"Save changes"})})})]})]})},p={render:()=>e.jsxs(r,{children:[e.jsx(n,{asChild:!0,children:e.jsx(a,{variant:"outline",children:"Open Left"})}),e.jsx(i,{side:"left",children:e.jsxs(d,{children:[e.jsx(l,{children:"Left Sheet"}),e.jsx(h,{children:"This sheet slides in from the left side."})]})})]})},u={render:()=>e.jsxs(r,{children:[e.jsx(n,{asChild:!0,children:e.jsx(a,{variant:"outline",children:"Open Top"})}),e.jsx(i,{side:"top",children:e.jsxs(d,{children:[e.jsx(l,{children:"Top Sheet"}),e.jsx(h,{children:"This sheet slides in from the top."})]})})]})},g={render:()=>e.jsxs(r,{children:[e.jsx(n,{asChild:!0,children:e.jsx(a,{variant:"outline",children:"Open Bottom"})}),e.jsx(i,{side:"bottom",children:e.jsxs(d,{children:[e.jsx(l,{children:"Bottom Sheet"}),e.jsx(h,{children:"This sheet slides in from the bottom."})]})})]})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const ee=["Right","Left","Top","Bottom"];export{g as Bottom,p as Left,m as Right,u as Top,ee as __namedExportsOrder,$ as default};
