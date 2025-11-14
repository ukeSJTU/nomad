import{j as t}from"./iframe-B3L8VP1V.js";import{B as n}from"./button-BLvKsEoH.js";import{S as j}from"./index-DhCLD_gq.js";import{c as g}from"./index-CdJFUDDL.js";import{S as G}from"./separator-x1p8TmT3.js";import{c as m}from"./utils-CBfrqCZ4.js";import{B,I as v,U as x}from"./underline-NUw_rC4p.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DziEteN5.js";import"./index-C-muzU9i.js";import"./createLucideIcon-C---1qUY.js";const S=g("flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",{variants:{orientation:{horizontal:"[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",vertical:"flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"}},defaultVariants:{orientation:"horizontal"}});function o({className:r,orientation:e,...a}){return t.jsx("div",{role:"group","data-slot":"button-group","data-orientation":e,className:m(S({orientation:e}),r),...a})}function h({className:r,asChild:e=!1,...a}){const f=e?j:"div";return t.jsx(f,{className:m("bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",r),...a})}function p({className:r,orientation:e="vertical",...a}){return t.jsx(G,{"data-slot":"button-group-separator",orientation:e,className:m("bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",r),...a})}o.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup"};p.__docgenInfo={description:"",methods:[],displayName:"ButtonGroupSeparator",props:{orientation:{defaultValue:{value:'"vertical"',computed:!1},required:!1}}};h.__docgenInfo={description:"",methods:[],displayName:"ButtonGroupText",props:{asChild:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const w={title:"Shadcn/ButtonGroup",component:o,parameters:{layout:"centered"},argTypes:{orientation:{control:"select",options:["horizontal","vertical"],description:"The orientation of the button group"}}},i={render:()=>t.jsxs(o,{children:[t.jsx(n,{variant:"outline",children:"Left"}),t.jsx(n,{variant:"outline",children:"Middle"}),t.jsx(n,{variant:"outline",children:"Right"})]})},s={render:()=>t.jsxs(o,{orientation:"vertical",children:[t.jsx(n,{variant:"outline",children:"Top"}),t.jsx(n,{variant:"outline",children:"Middle"}),t.jsx(n,{variant:"outline",children:"Bottom"})]})},u={render:()=>t.jsxs(o,{children:[t.jsx(n,{variant:"outline",size:"icon",children:t.jsx(B,{})}),t.jsx(n,{variant:"outline",size:"icon",children:t.jsx(v,{})}),t.jsx(n,{variant:"outline",size:"icon",children:t.jsx(x,{})})]})},l={render:()=>t.jsxs(o,{children:[t.jsx(n,{variant:"outline",children:"Copy"}),t.jsx(p,{}),t.jsx(n,{variant:"outline",children:"Paste"}),t.jsx(p,{}),t.jsx(n,{variant:"outline",children:"Cut"})]})},c={render:()=>t.jsxs(o,{children:[t.jsx(h,{children:"Format:"}),t.jsx(n,{variant:"outline",size:"icon",children:t.jsx(B,{})}),t.jsx(n,{variant:"outline",size:"icon",children:t.jsx(v,{})}),t.jsx(n,{variant:"outline",size:"icon",children:t.jsx(x,{})})]})},d={render:()=>t.jsxs(o,{children:[t.jsx(n,{variant:"outline",children:"Save"}),t.jsx(n,{variant:"outline",children:"Save As"}),t.jsx(p,{}),t.jsx(n,{variant:"outline",children:"Export"})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
}`,...s.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup>
      <Button variant="outline" size="icon">
        <Bold />
      </Button>
      <Button variant="outline" size="icon">
        <Italic />
      </Button>
      <Button variant="outline" size="icon">
        <Underline />
      </Button>
    </ButtonGroup>
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Paste</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Cut</Button>
    </ButtonGroup>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup>
      <ButtonGroupText>Format:</ButtonGroupText>
      <Button variant="outline" size="icon">
        <Bold />
      </Button>
      <Button variant="outline" size="icon">
        <Italic />
      </Button>
      <Button variant="outline" size="icon">
        <Underline />
      </Button>
    </ButtonGroup>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <ButtonGroup>
      <Button variant="outline">Save</Button>
      <Button variant="outline">Save As</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Export</Button>
    </ButtonGroup>
}`,...d.parameters?.docs?.source}}};const E=["Horizontal","Vertical","WithIcons","WithSeparator","WithText","Mixed"];export{i as Horizontal,d as Mixed,s as Vertical,u as WithIcons,l as WithSeparator,c as WithText,E as __namedExportsOrder,w as default};
