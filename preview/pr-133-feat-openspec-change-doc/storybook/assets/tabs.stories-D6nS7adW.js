import{j as e}from"./iframe-DfXeTlor.js";import{C as o,a as c,b as i,c as l,d}from"./card-BZ7zUvVV.js";import{T as n,a as p,b as s,c as a}from"./tabs-Dv1MrVnZ.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";import"./index-UijIDetG.js";import"./index-DvFpvr8L.js";import"./index-holT3doW.js";import"./index-DPuieh1g.js";import"./index-CujZnIrr.js";import"./index-nYIAko_1.js";import"./index-BjgmQGaV.js";import"./index-mo40_67N.js";import"./index-BBmfN-K1.js";import"./index-B_I7pNDb.js";import"./index-9AqQcbbn.js";const P={title:"Shadcn/Tabs",component:n,parameters:{layout:"centered"}},r={render:()=>e.jsxs(n,{defaultValue:"account",className:"w-[400px]",children:[e.jsxs(p,{className:"grid w-full grid-cols-2",children:[e.jsx(s,{value:"account",children:"Account"}),e.jsx(s,{value:"password",children:"Password"})]}),e.jsx(a,{value:"account",children:e.jsxs(o,{children:[e.jsxs(c,{children:[e.jsx(i,{children:"Account"}),e.jsx(l,{children:"Make changes to your account here. Click save when you're done."})]}),e.jsx(d,{className:"space-y-2",children:e.jsx("p",{children:"Account settings content goes here."})})]})}),e.jsx(a,{value:"password",children:e.jsxs(o,{children:[e.jsxs(c,{children:[e.jsx(i,{children:"Password"}),e.jsx(l,{children:"Change your password here. After saving, you'll be logged out."})]}),e.jsx(d,{className:"space-y-2",children:e.jsx("p",{children:"Password settings content goes here."})})]})})]})},t={render:()=>e.jsxs(n,{defaultValue:"overview",className:"w-[400px]",children:[e.jsxs(p,{className:"grid w-full grid-cols-3",children:[e.jsx(s,{value:"overview",children:"Overview"}),e.jsx(s,{value:"analytics",children:"Analytics"}),e.jsx(s,{value:"reports",children:"Reports"})]}),e.jsx(a,{value:"overview",children:e.jsx("div",{className:"p-4",children:"Overview content"})}),e.jsx(a,{value:"analytics",children:e.jsx("div",{className:"p-4",children:"Analytics content"})}),e.jsx(a,{value:"reports",children:e.jsx("div",{className:"p-4",children:"Reports content"})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Account settings content goes here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Password settings content goes here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4">Overview content</div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4">Analytics content</div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4">Reports content</div>
      </TabsContent>
    </Tabs>
}`,...t.parameters?.docs?.source}}};const H=["Default","ThreeTabs"];export{r as Default,t as ThreeTabs,H as __namedExportsOrder,P as default};
