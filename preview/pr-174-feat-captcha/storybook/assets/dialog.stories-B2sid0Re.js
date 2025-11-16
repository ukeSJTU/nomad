import{j as e}from"./iframe-BH7aeb89.js";import{B as t}from"./button-reTbs1c1.js";import{R as y,T as N,C,a as T,b,D as _,P as B,O as w}from"./index-sG1IeBhq.js";import{c as i}from"./utils-CBfrqCZ4.js";import{X as I}from"./x-DHgYMiNq.js";import{I as h}from"./input-7ajN_wnk.js";import{L as x}from"./label-CfPQCWIb.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B6zyZfym.js";import"./index-CdJFUDDL.js";import"./index-BDEDCb8l.js";import"./index-DGQpXj_O.js";import"./index-B8FmrOkk.js";import"./index-D69ldn1F.js";import"./index-BIGOGDbH.js";import"./index-rfJbia-g.js";import"./index-B4LoADOl.js";import"./index-Bj9YQplX.js";import"./Combination-DpWjHQoR.js";import"./index-Be60dqzC.js";import"./createLucideIcon-C7RxPt7J.js";function s({...a}){return e.jsx(y,{"data-slot":"dialog",...a})}function d({...a}){return e.jsx(N,{"data-slot":"dialog-trigger",...a})}function D({...a}){return e.jsx(B,{"data-slot":"dialog-portal",...a})}function f({className:a,...o}){return e.jsx(w,{"data-slot":"dialog-overlay",className:i("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",a),...o})}function c({className:a,children:o,showCloseButton:j=!0,...v}){return e.jsxs(D,{"data-slot":"dialog-portal",children:[e.jsx(f,{}),e.jsxs(C,{"data-slot":"dialog-content",className:i("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",a),...v,children:[o,j&&e.jsxs(T,{"data-slot":"dialog-close",className:"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",children:[e.jsx(I,{}),e.jsx("span",{className:"sr-only",children:"Close"})]})]})]})}function g({className:a,...o}){return e.jsx("div",{"data-slot":"dialog-header",className:i("flex flex-col gap-2 text-center sm:text-left",a),...o})}function p({className:a,...o}){return e.jsx("div",{"data-slot":"dialog-footer",className:i("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",a),...o})}function m({className:a,...o}){return e.jsx(b,{"data-slot":"dialog-title",className:i("text-lg leading-none font-semibold",a),...o})}function u({className:a,...o}){return e.jsx(_,{"data-slot":"dialog-description",className:i("text-muted-foreground text-sm",a),...o})}s.__docgenInfo={description:"",methods:[],displayName:"Dialog"};c.__docgenInfo={description:"",methods:[],displayName:"DialogContent",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};u.__docgenInfo={description:"",methods:[],displayName:"DialogDescription"};p.__docgenInfo={description:"",methods:[],displayName:"DialogFooter"};g.__docgenInfo={description:"",methods:[],displayName:"DialogHeader"};f.__docgenInfo={description:"",methods:[],displayName:"DialogOverlay"};D.__docgenInfo={description:"",methods:[],displayName:"DialogPortal"};m.__docgenInfo={description:"",methods:[],displayName:"DialogTitle"};d.__docgenInfo={description:"",methods:[],displayName:"DialogTrigger"};const Y={title:"Shadcn/Dialog",component:s,parameters:{layout:"centered"}},r={render:()=>e.jsxs(s,{children:[e.jsx(d,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open Dialog"})}),e.jsx(c,{children:e.jsxs(g,{children:[e.jsx(m,{children:"Are you absolutely sure?"}),e.jsx(u,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]})})]})},n={render:()=>e.jsxs(s,{children:[e.jsx(d,{asChild:!0,children:e.jsx(t,{children:"Edit Profile"})}),e.jsxs(c,{className:"sm:max-w-[425px]",children:[e.jsxs(g,{children:[e.jsx(m,{children:"Edit profile"}),e.jsx(u,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"grid gap-4 py-4",children:[e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(x,{htmlFor:"name",className:"text-right",children:"Name"}),e.jsx(h,{id:"name",defaultValue:"Pedro Duarte",className:"col-span-3"})]}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(x,{htmlFor:"username",className:"text-right",children:"Username"}),e.jsx(h,{id:"username",defaultValue:"@peduarte",className:"col-span-3"})]})]}),e.jsx(p,{children:e.jsx(t,{type:"submit",children:"Save changes"})})]})]})},l={render:()=>e.jsxs(s,{children:[e.jsx(d,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open"})}),e.jsxs(c,{showCloseButton:!1,children:[e.jsxs(g,{children:[e.jsx(m,{children:"No Close Button"}),e.jsx(u,{children:"This dialog doesn't have a close button in the corner."})]}),e.jsxs(p,{children:[e.jsx(t,{variant:"outline",children:"Cancel"}),e.jsx(t,{children:"Confirm"})]})]})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn't have a close button in the corner.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...l.parameters?.docs?.source}}};const Z=["Default","WithForm","WithoutCloseButton"];export{r as Default,n as WithForm,l as WithoutCloseButton,Z as __namedExportsOrder,Y as default};
