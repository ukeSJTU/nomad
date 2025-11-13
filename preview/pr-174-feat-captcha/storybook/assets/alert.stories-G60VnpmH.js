import{j as e}from"./iframe-D4eLYiyQ.js";import{c as x}from"./index-CdJFUDDL.js";import{c as d}from"./utils-CBfrqCZ4.js";import{c as p}from"./createLucideIcon-Cophifpq.js";import"./preload-helper-PPVm8Dsz.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],h=p("circle-alert",g);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],m=p("terminal",A),v=x("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",{variants:{variant:{default:"bg-card text-card-foreground",destructive:"text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"}},defaultVariants:{variant:"default"}});function t({className:r,variant:s,...u}){return e.jsx("div",{"data-slot":"alert",role:"alert",className:d(v({variant:s}),r),...u})}function a({className:r,...s}){return e.jsx("div",{"data-slot":"alert-title",className:d("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",r),...s})}function c({className:r,...s}){return e.jsx("div",{"data-slot":"alert-description",className:d("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",r),...s})}t.__docgenInfo={description:"",methods:[],displayName:"Alert"};c.__docgenInfo={description:"",methods:[],displayName:"AlertDescription"};a.__docgenInfo={description:"",methods:[],displayName:"AlertTitle"};const _={title:"Shadcn/Alert",component:t,parameters:{layout:"centered"},argTypes:{variant:{control:"select",options:["default","destructive"],description:"The visual style variant of the alert"}}},n={render:()=>e.jsxs(t,{className:"w-[400px]",children:[e.jsx(m,{}),e.jsx(a,{children:"Heads up!"}),e.jsx(c,{children:"You can add components to your app using the cli."})]})},i={render:()=>e.jsxs(t,{variant:"destructive",className:"w-[400px]",children:[e.jsx(h,{}),e.jsx(a,{children:"Error"}),e.jsx(c,{children:"Your session has expired. Please log in again."})]})},l={render:()=>e.jsxs(t,{className:"w-[400px]",children:[e.jsx(a,{children:"Note"}),e.jsx(c,{children:"This is an alert without an icon."})]})},o={render:()=>e.jsxs(t,{className:"w-[400px]",children:[e.jsx(m,{}),e.jsx(a,{children:"System Update Available"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Alert className="w-[400px]">
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Alert variant="destructive" className="w-[400px]">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Alert className="w-[400px]">
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>This is an alert without an icon.</AlertDescription>
    </Alert>
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Alert className="w-[400px]">
      <Terminal />
      <AlertTitle>System Update Available</AlertTitle>
    </Alert>
}`,...o.parameters?.docs?.source}}};const D=["Default","Destructive","WithoutIcon","TitleOnly"];export{n as Default,i as Destructive,o as TitleOnly,l as WithoutIcon,D as __namedExportsOrder,_ as default};
