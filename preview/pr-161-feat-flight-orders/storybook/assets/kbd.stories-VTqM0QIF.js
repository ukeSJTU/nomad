import{j as e}from"./iframe-CltQX2AS.js";import{c as p}from"./utils-CBfrqCZ4.js";import{c as l}from"./createLucideIcon-BvvMV4AG.js";import"./preload-helper-PPVm8Dsz.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",key:"11bfej"}]],i=l("command",u);function s({className:c,...m}){return e.jsx("kbd",{"data-slot":"kbd",className:p("bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none","[&_svg:not([class*='size-'])]:size-3","[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",c),...m})}function d({className:c,...m}){return e.jsx("kbd",{"data-slot":"kbd-group",className:p("inline-flex items-center gap-1",c),...m})}s.__docgenInfo={description:"",methods:[],displayName:"Kbd"};d.__docgenInfo={description:"",methods:[],displayName:"KbdGroup"};const f={title:"Shadcn/Kbd",component:s,parameters:{layout:"centered"}},r={args:{children:"K"}},n={render:()=>e.jsxs(s,{children:[e.jsx(i,{}),"K"]})},t={render:()=>e.jsxs(d,{children:[e.jsx(s,{children:e.jsx(i,{})}),e.jsx(s,{children:"K"})]})},a={render:()=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm",children:"Press"}),e.jsxs(d,{children:[e.jsx(s,{children:"Ctrl"}),e.jsx(s,{children:"Shift"}),e.jsx(s,{children:"P"})]}),e.jsx("span",{className:"text-sm",children:"to open command palette"})]})},o={render:()=>e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs(d,{children:[e.jsx(s,{children:e.jsx(i,{})}),e.jsx(s,{children:"K"})]})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: "K"
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Kbd>
      <Command />K
    </Kbd>
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <KbdGroup>
      <Kbd>
        <Command />
      </Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <span className="text-sm">Press</span>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <span className="text-sm">to open command palette</span>
    </div>
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-2">
      <KbdGroup>
        <Kbd>
          <Command />
        </Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
}`,...o.parameters?.docs?.source}}};const g=["Default","WithIcon","Group","MultipleKeys","MacShortcut"];export{r as Default,t as Group,o as MacShortcut,a as MultipleKeys,n as WithIcon,g as __namedExportsOrder,f as default};
