import{j as e}from"./iframe-hoLQorU0.js";import{B as d}from"./button-UrQw78eD.js";import{C as r,a as i,b as c,c as l,d as o,e as p,f as C}from"./card-BGg9H1tE.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CLPNYELR.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";const w={title:"Shadcn/Card",component:r,parameters:{layout:"centered"}},a={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(i,{children:[e.jsx(c,{children:"Card Title"}),e.jsx(l,{children:"Card Description"})]}),e.jsx(o,{children:e.jsx("p",{children:"Card Content"})})]})},n={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(i,{children:[e.jsx(c,{children:"Create project"}),e.jsx(l,{children:"Deploy your new project in one-click."})]}),e.jsx(o,{children:e.jsx("p",{children:"Project details go here."})}),e.jsxs(p,{className:"flex justify-between",children:[e.jsx(d,{variant:"outline",children:"Cancel"}),e.jsx(d,{children:"Deploy"})]})]})},t={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(i,{children:[e.jsx(c,{children:"Notifications"}),e.jsx(l,{children:"You have 3 unread messages."}),e.jsx(C,{children:e.jsx(d,{variant:"ghost",size:"sm",children:"Mark all as read"})})]}),e.jsx(o,{children:e.jsx("p",{children:"Your notification content here."})})]})},s={render:()=>e.jsx(r,{className:"w-[350px]",children:e.jsx(o,{className:"pt-6",children:e.jsx("p",{children:"Simple card with just content."})})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Project details go here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Your notification content here.</p>
      </CardContent>
    </Card>
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>Simple card with just content.</p>
      </CardContent>
    </Card>
}`,...s.parameters?.docs?.source}}};const N=["Default","WithFooter","WithAction","Simple"];export{a as Default,s as Simple,t as WithAction,n as WithFooter,N as __namedExportsOrder,w as default};
