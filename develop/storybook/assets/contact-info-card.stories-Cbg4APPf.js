import{j as e,r as w}from"./iframe-Dd3AqlOG.js";import{C as E,b as D,c as Y,a as V}from"./card-0wzzG5uy.js";import{I as j}from"./input-B5-DViC6.js";import{L as l}from"./label-CRDj7Z0z.js";import{R as M,a as C}from"./radio-group-DdBxi9ZH.js";import"./auth-D-RBnuxz.js";import{o as x,n as v,_ as s,s as a,u as f,l as y}from"./schemas-Kzq7Ayg9.js";import"./passengers-BYHPJixU.js";import{c as N}from"./createLucideIcon-aqlq-bZC.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";import"./index-Bqb6DZeW.js";import"./index-uF32jcgg.js";import"./index-C2Z9wzF5.js";import"./index-NudYPprN.js";import"./index-B2ByjUQR.js";import"./index-DlOaIYsF.js";import"./index-CCqbI7HL.js";import"./index-ZjRYLnCe.js";import"./index-DOLyc8kp.js";import"./index-B6vMN2vG.js";import"./index-CDwF6lbB.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],F=N("mail",P);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],T=N("phone",W);x({departureCityIata:a().length(3,"出发城市代码必须为3个字符").toUpperCase(),arrivalCityIata:a().length(3,"到达城市代码必须为3个字符").toUpperCase(),departureDate:a().regex(/^\d{4}-\d{2}-\d{2}$/,"日期格式必须为 YYYY-MM-DD"),returnDate:a().regex(/^\d{4}-\d{2}-\d{2}$/,"日期格式必须为 YYYY-MM-DD").optional().nullable(),tripType:s(["one-way","round-trip"],{message:"行程类型必须为 one-way 或 round-trip"}),seatClass:s(["any","economy","business","first"],{message:"舱位等级必须为 any, economy, business 或 first"}).optional(),lowestPrice:v().positive().optional()});const _=s(["any","economy","business","first"],{message:"Seat class must be any, economy, business, or first"});s(["ECONOMY","BUSINESS","FIRST"],{message:"Seat class type must be ECONOMY, BUSINESS, or FIRST"});const k=s(["one-way","round-trip"],{message:"Trip type must be one-way or round-trip"});x({tripType:k,from:a().length(3,"Departure city code must be 3 characters"),to:a().length(3,"Arrival city code must be 3 characters"),departDate:a().regex(/^\d{4}-\d{2}-\d{2}$/,"Date format must be YYYY-MM-DD"),returnDate:a().regex(/^\d{4}-\d{2}-\d{2}$/,"Date format must be YYYY-MM-DD").optional(),class:_.default("any")});x({nickname:f([a().max(50,"Nickname cannot exceed 50 characters"),y("")]).optional(),name:f([a().max(50,"Name cannot exceed 50 characters"),y("")]).optional(),gender:s(["male","female","other"],{message:"Gender must be male, female, or other"}).optional(),birthday:f([a().regex(/^\d{4}-\d{2}-\d{2}$/,"Birthday must be in yyyy-mm-dd format"),y("")]).optional()});x({amount:v({message:"充值金额必须是数字"}).min(1,"充值金额最少为 1 元").max(1e4,"充值金额最多为 10000 元").positive({message:"充值金额必须是正数"})});function b({value:t,onChange:i,errors:o={}}){const g=r=>{i({...t,method:r})},I=r=>{i({...t,email:r})},S=r=>{i({...t,phone:r})};return e.jsxs(E,{className:"border-border/60 shadow-sm",children:[e.jsx(D,{children:e.jsx(Y,{className:"text-xl font-semibold tracking-tight",children:e.jsx("span",{className:"bg-linear-to-r from-foreground to-foreground/80 bg-clip-text",children:"联系人信息"})})}),e.jsxs(V,{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsxs(l,{className:"text-sm font-medium",children:["联系方式 ",e.jsx("span",{className:"text-destructive",children:"*"})]}),e.jsxs(M,{value:t.method,onValueChange:r=>g(r),className:"grid grid-cols-2 gap-3",children:[e.jsxs("div",{className:"flex items-center space-x-3 p-3.5 rounded-lg border border-input/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer group",children:[e.jsx(C,{value:"email",id:"method-email",className:"transition-all"}),e.jsxs(l,{htmlFor:"method-email",className:"flex items-center gap-2.5 cursor-pointer font-medium text-sm group-hover:text-primary transition-colors flex-1",children:[e.jsx("div",{className:"flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors",children:e.jsx(F,{className:"h-4 w-4"})}),e.jsx("span",{children:"邮箱"})]})]}),e.jsxs("div",{className:"flex items-center space-x-3 p-3.5 rounded-lg border border-input/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer group",children:[e.jsx(C,{value:"phone",id:"method-phone",className:"transition-all"}),e.jsxs(l,{htmlFor:"method-phone",className:"flex items-center gap-2.5 cursor-pointer font-medium text-sm group-hover:text-primary transition-colors flex-1",children:[e.jsx("div",{className:"flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors",children:e.jsx(T,{className:"h-4 w-4"})}),e.jsx("span",{children:"手机"})]})]})]})]}),t.method==="email"&&e.jsxs("div",{className:"space-y-2.5",children:[e.jsxs(l,{htmlFor:"contact-email",className:"text-sm font-medium",children:["联系邮箱 ",e.jsx("span",{className:"text-destructive",children:"*"})]}),e.jsx("div",{className:"relative",children:e.jsx(j,{id:"contact-email",type:"email",value:t.email,onChange:r=>I(r.target.value),placeholder:"邮箱地址，接收订单信息",className:`h-11 border rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all ${o.email?"border-destructive/60":"border-input/60"}`})}),o.email&&e.jsxs("p",{className:"text-sm text-destructive flex items-center gap-1.5",children:[e.jsx("span",{className:"inline-block w-1 h-1 rounded-full bg-destructive"}),o.email]})]}),t.method==="phone"&&e.jsxs("div",{className:"space-y-2.5",children:[e.jsxs(l,{htmlFor:"contact-phone",className:"text-sm font-medium",children:["联系电话 ",e.jsx("span",{className:"text-destructive",children:"*"})]}),e.jsx("div",{className:"relative",children:e.jsx(j,{id:"contact-phone",type:"tel",value:t.phone,onChange:r=>S(r.target.value),placeholder:"手机号，接收订单信息",className:`h-11 border rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all ${o.phone?"border-destructive/60":"border-input/60"}`})}),o.phone&&e.jsxs("p",{className:"text-sm text-destructive flex items-center gap-1.5",children:[e.jsx("span",{className:"inline-block w-1 h-1 rounded-full bg-destructive"}),o.phone]})]})]})]})}b.__docgenInfo={description:`Contact Information Card Component
Allows user to select contact method (email or phone) and input contact details`,methods:[],displayName:"ContactInfoCard",props:{value:{required:!0,tsType:{name:"ContactInfo"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: ContactInfo) => void",signature:{arguments:[{type:{name:"ContactInfo"},name:"value"}],return:{name:"void"}}},description:""},errors:{required:!1,tsType:{name:"ContactInfoValidationErrors"},description:"",defaultValue:{value:"{}",computed:!1}}}};const ne={title:"Flights/Booking/ContactInfoCard",component:b,parameters:{layout:"padded"},tags:["autodocs"]};function n({initialValue:t,errors:i}){const[o,g]=w.useState(t);return e.jsx(b,{value:o,onChange:g,errors:i})}const m={render:()=>e.jsx(n,{initialValue:{method:"email",email:"",phone:""}})},d={render:()=>e.jsx(n,{initialValue:{method:"email",email:"zhangsan@example.com",phone:""}})},c={render:()=>e.jsx(n,{initialValue:{method:"phone",email:"",phone:""}})},p={render:()=>e.jsx(n,{initialValue:{method:"phone",email:"",phone:"13800138000"}})},h={render:()=>e.jsx(n,{initialValue:{method:"email",email:"invalid-email",phone:""},errors:{email:"请输入有效的邮箱地址"}})},u={render:()=>e.jsx(n,{initialValue:{method:"phone",email:"",phone:"123"},errors:{phone:"请输入有效的手机号码"}})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "",
    phone: ""
  }} />
}`,...m.parameters?.docs?.source},description:{story:"Default state with email selected",...m.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "zhangsan@example.com",
    phone: ""
  }} />
}`,...d.parameters?.docs?.source},description:{story:"Email method selected with filled data",...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: ""
  }} />
}`,...c.parameters?.docs?.source},description:{story:"Phone method selected",...c.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "13800138000"
  }} />
}`,...p.parameters?.docs?.source},description:{story:"Phone method with filled data",...p.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "invalid-email",
    phone: ""
  }} errors={{
    email: "请输入有效的邮箱地址"
  }} />
}`,...h.parameters?.docs?.source},description:{story:"Email method with validation errors",...h.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "123"
  }} errors={{
    phone: "请输入有效的手机号码"
  }} />
}`,...u.parameters?.docs?.source},description:{story:"Phone method with validation errors",...u.parameters?.docs?.description}}};const ie=["Default","EmailFilled","PhoneSelected","PhoneFilled","EmailWithErrors","PhoneWithErrors"];export{m as Default,d as EmailFilled,h as EmailWithErrors,p as PhoneFilled,c as PhoneSelected,u as PhoneWithErrors,ie as __namedExportsOrder,ne as default};
