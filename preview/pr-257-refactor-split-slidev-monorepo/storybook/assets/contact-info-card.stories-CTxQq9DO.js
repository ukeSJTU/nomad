import{j as e,r as y}from"./iframe-BmUIunq3.js";import{C,b as N,c as b,a as I}from"./card-Dr32iszQ.js";import{I as x}from"./input-C4Kko8qI.js";import{L as s}from"./label-Clii8cIo.js";import{R as V,a as f}from"./radio-group-DrRB5iTB.js";import"./user-8jLcKeKl.js";import{c as g}from"./createLucideIcon-DxHGAXvP.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";import"./index-DNuo6a-Z.js";import"./index-BxYniWMg.js";import"./index-D3AicU6b.js";import"./index-B6XyjoYD.js";import"./index-CQpGAVXp.js";import"./index-D0Q8FddK.js";import"./index-CutvfYNj.js";import"./index-DRVyBHig.js";import"./index-BeFyQi3R.js";import"./index-Bba_LKHs.js";import"./index-CPt8Ry8Y.js";import"./schemas-wRgyZonl.js";const w=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],E=g("mail",w);const P=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],W=g("phone",P);function u({value:a,onChange:n,errors:t={}}){const h=r=>{n({...a,method:r})},j=r=>{n({...a,email:r})},v=r=>{n({...a,phone:r})};return e.jsxs(C,{className:"border-border/60 shadow-sm",children:[e.jsx(N,{children:e.jsx(b,{className:"text-xl font-semibold tracking-tight",children:e.jsx("span",{className:"bg-linear-to-r from-foreground to-foreground/80 bg-clip-text",children:"联系人信息"})})}),e.jsxs(I,{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsxs(s,{className:"text-sm font-medium",children:["联系方式 ",e.jsx("span",{className:"text-destructive",children:"*"})]}),e.jsxs(V,{value:a.method,onValueChange:r=>h(r),className:"grid grid-cols-2 gap-3",children:[e.jsxs("div",{className:"flex items-center space-x-3 p-3.5 rounded-lg border border-input/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer group",children:[e.jsx(f,{value:"email",id:"method-email",className:"transition-all"}),e.jsxs(s,{htmlFor:"method-email",className:"flex items-center gap-2.5 cursor-pointer font-medium text-sm group-hover:text-primary transition-colors flex-1",children:[e.jsx("div",{className:"flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors",children:e.jsx(E,{className:"h-4 w-4"})}),e.jsx("span",{children:"邮箱"})]})]}),e.jsxs("div",{className:"flex items-center space-x-3 p-3.5 rounded-lg border border-input/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer group",children:[e.jsx(f,{value:"phone",id:"method-phone",className:"transition-all"}),e.jsxs(s,{htmlFor:"method-phone",className:"flex items-center gap-2.5 cursor-pointer font-medium text-sm group-hover:text-primary transition-colors flex-1",children:[e.jsx("div",{className:"flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors",children:e.jsx(W,{className:"h-4 w-4"})}),e.jsx("span",{children:"手机"})]})]})]})]}),a.method==="email"&&e.jsxs("div",{className:"space-y-2.5",children:[e.jsxs(s,{htmlFor:"contact-email",className:"text-sm font-medium",children:["联系邮箱 ",e.jsx("span",{className:"text-destructive",children:"*"})]}),e.jsx("div",{className:"relative",children:e.jsx(x,{id:"contact-email",type:"email",value:a.email,onChange:r=>j(r.target.value),placeholder:"邮箱地址，接收订单信息",className:`h-11 border rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all ${t.email?"border-destructive/60":"border-input/60"}`})}),t.email&&e.jsxs("p",{className:"text-sm text-destructive flex items-center gap-1.5",children:[e.jsx("span",{className:"inline-block w-1 h-1 rounded-full bg-destructive"}),t.email]})]}),a.method==="phone"&&e.jsxs("div",{className:"space-y-2.5",children:[e.jsxs(s,{htmlFor:"contact-phone",className:"text-sm font-medium",children:["联系电话 ",e.jsx("span",{className:"text-destructive",children:"*"})]}),e.jsx("div",{className:"relative",children:e.jsx(x,{id:"contact-phone",type:"tel",value:a.phone,onChange:r=>v(r.target.value),placeholder:"手机号，接收订单信息",className:`h-11 border rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all ${t.phone?"border-destructive/60":"border-input/60"}`})}),t.phone&&e.jsxs("p",{className:"text-sm text-destructive flex items-center gap-1.5",children:[e.jsx("span",{className:"inline-block w-1 h-1 rounded-full bg-destructive"}),t.phone]})]})]})]})}u.__docgenInfo={description:`Contact Information Card Component
Allows user to select contact method (email or phone) and input contact details`,methods:[],displayName:"ContactInfoCard",props:{value:{required:!0,tsType:{name:"ContactInfo"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: ContactInfo) => void",signature:{arguments:[{type:{name:"ContactInfo"},name:"value"}],return:{name:"void"}}},description:""},errors:{required:!1,tsType:{name:"ContactInfoValidationErrors"},description:"",defaultValue:{value:"{}",computed:!1}}}};const X={title:"Flights/Booking/ContactInfoCard",component:u,parameters:{layout:"padded"},tags:["autodocs"]};function o({initialValue:a,errors:n}){const[t,h]=y.useState(a);return e.jsx(u,{value:t,onChange:h,errors:n})}const i={render:()=>e.jsx(o,{initialValue:{method:"email",email:"",phone:""}})},l={render:()=>e.jsx(o,{initialValue:{method:"email",email:"zhangsan@example.com",phone:""}})},d={render:()=>e.jsx(o,{initialValue:{method:"phone",email:"",phone:""}})},c={render:()=>e.jsx(o,{initialValue:{method:"phone",email:"",phone:"13800138000"}})},m={render:()=>e.jsx(o,{initialValue:{method:"email",email:"invalid-email",phone:""},errors:{email:"请输入有效的邮箱地址"}})},p={render:()=>e.jsx(o,{initialValue:{method:"phone",email:"",phone:"123"},errors:{phone:"请输入有效的手机号码"}})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "",
    phone: ""
  }} />
}`,...i.parameters?.docs?.source},description:{story:"Default state with email selected",...i.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "zhangsan@example.com",
    phone: ""
  }} />
}`,...l.parameters?.docs?.source},description:{story:"Email method selected with filled data",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: ""
  }} />
}`,...d.parameters?.docs?.source},description:{story:"Phone method selected",...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "13800138000"
  }} />
}`,...c.parameters?.docs?.source},description:{story:"Phone method with filled data",...c.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "invalid-email",
    phone: ""
  }} errors={{
    email: "请输入有效的邮箱地址"
  }} />
}`,...m.parameters?.docs?.source},description:{story:"Email method with validation errors",...m.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "123"
  }} errors={{
    phone: "请输入有效的手机号码"
  }} />
}`,...p.parameters?.docs?.source},description:{story:"Phone method with validation errors",...p.parameters?.docs?.description}}};const Y=["Default","EmailFilled","PhoneSelected","PhoneFilled","EmailWithErrors","PhoneWithErrors"];export{i as Default,l as EmailFilled,m as EmailWithErrors,c as PhoneFilled,d as PhoneSelected,p as PhoneWithErrors,Y as __namedExportsOrder,X as default};
