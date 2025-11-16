import{j as e}from"./iframe-BH7aeb89.js";import{A as r,b as i,a as o}from"./alert-Bx0vPAMn.js";import{c as l}from"./createLucideIcon-C7RxPt7J.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],d=l("circle-alert",p);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],c=l("terminal",m),j={title:"Shadcn/Alert",component:r,parameters:{layout:"centered"},argTypes:{variant:{control:"select",options:["default","destructive"],description:"The visual style variant of the alert"}}},t={render:()=>e.jsxs(r,{className:"w-[400px]",children:[e.jsx(c,{}),e.jsx(i,{children:"Heads up!"}),e.jsx(o,{children:"You can add components to your app using the cli."})]})},s={render:()=>e.jsxs(r,{variant:"destructive",className:"w-[400px]",children:[e.jsx(d,{}),e.jsx(i,{children:"Error"}),e.jsx(o,{children:"Your session has expired. Please log in again."})]})},a={render:()=>e.jsxs(r,{className:"w-[400px]",children:[e.jsx(i,{children:"Note"}),e.jsx(o,{children:"This is an alert without an icon."})]})},n={render:()=>e.jsxs(r,{className:"w-[400px]",children:[e.jsx(c,{}),e.jsx(i,{children:"System Update Available"})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Alert className="w-[400px]">
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Alert variant="destructive" className="w-[400px]">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Alert className="w-[400px]">
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>This is an alert without an icon.</AlertDescription>
    </Alert>
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Alert className="w-[400px]">
      <Terminal />
      <AlertTitle>System Update Available</AlertTitle>
    </Alert>
}`,...n.parameters?.docs?.source}}};const g=["Default","Destructive","WithoutIcon","TitleOnly"];export{t as Default,s as Destructive,n as TitleOnly,a as WithoutIcon,g as __namedExportsOrder,j as default};
