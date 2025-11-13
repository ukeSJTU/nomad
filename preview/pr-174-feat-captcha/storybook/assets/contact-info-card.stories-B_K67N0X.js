import{j as e,r as g}from"./iframe-D4eLYiyQ.js";import{C as y,a as I,b as N,c as v}from"./card-DC9uFPvw.js";import{I as x}from"./input-BVGv-k2U.js";import{L as s}from"./label-qTmODvfR.js";import{R as V,a as f}from"./radio-group-D6iuGCbq.js";import{M as E}from"./mail-B-2Eogto.js";import{c as P}from"./createLucideIcon-Cophifpq.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";import"./index-n4CfLAso.js";import"./index-D-vE0zg6.js";import"./index-jsrOXmlY.js";import"./index-By9Q8yio.js";import"./index-BrFyW5M1.js";import"./index-B21EvTLy.js";import"./index-DAcsmNmY.js";import"./index-D2UapKmZ.js";import"./index-DiiEyiBf.js";import"./index-CVr0wknB.js";import"./index-Bxdcou5C.js";import"./index-Cg0vTCQW.js";import"./index-RphgqhJB.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],w=P("phone",W);function u({value:r,onChange:n,errors:o={}}){const h=a=>{n({...r,method:a})},C=a=>{n({...r,email:a})},j=a=>{n({...r,phone:a})};return e.jsxs(y,{children:[e.jsx(I,{children:e.jsx(N,{className:"text-lg",children:"联系人信息"})}),e.jsxs(v,{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs(s,{children:["联系方式 ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsxs(V,{value:r.method,onValueChange:a=>h(a),children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(f,{value:"email",id:"method-email"}),e.jsxs(s,{htmlFor:"method-email",className:"flex items-center gap-2 cursor-pointer font-normal",children:[e.jsx(E,{className:"h-4 w-4"}),"邮箱"]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(f,{value:"phone",id:"method-phone"}),e.jsxs(s,{htmlFor:"method-phone",className:"flex items-center gap-2 cursor-pointer font-normal",children:[e.jsx(w,{className:"h-4 w-4"}),"手机"]})]})]})]}),r.method==="email"&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs(s,{htmlFor:"contact-email",children:["联系邮箱 ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx(x,{id:"contact-email",type:"email",value:r.email,onChange:a=>C(a.target.value),placeholder:"邮箱地址，接收航变信息",className:o.email?"border-red-500":""}),o.email&&e.jsx("p",{className:"text-sm text-red-500",children:o.email})]}),r.method==="phone"&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs(s,{htmlFor:"contact-phone",children:["联系电话 ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx(x,{id:"contact-phone",type:"tel",value:r.phone,onChange:a=>j(a.target.value),placeholder:"手机号，接收航变信息",className:o.phone?"border-red-500":""}),o.phone&&e.jsx("p",{className:"text-sm text-red-500",children:o.phone})]})]})]})}u.__docgenInfo={description:`Contact Information Card Component
Allows user to select contact method (email or phone) and input contact details`,methods:[],displayName:"ContactInfoCard",props:{value:{required:!0,tsType:{name:"ContactInfo"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: ContactInfo) => void",signature:{arguments:[{type:{name:"ContactInfo"},name:"value"}],return:{name:"void"}}},description:""},errors:{required:!1,tsType:{name:"ContactInfoValidationErrors"},description:"",defaultValue:{value:"{}",computed:!1}}}};const Y={title:"Flights/ContactInfoCard",component:u,parameters:{layout:"padded"},tags:["autodocs"]};function t({initialValue:r,errors:n}){const[o,h]=g.useState(r);return e.jsx(u,{value:o,onChange:h,errors:n})}const i={render:()=>e.jsx(t,{initialValue:{method:"email",email:"",phone:""}})},l={render:()=>e.jsx(t,{initialValue:{method:"email",email:"zhangsan@example.com",phone:""}})},d={render:()=>e.jsx(t,{initialValue:{method:"phone",email:"",phone:""}})},m={render:()=>e.jsx(t,{initialValue:{method:"phone",email:"",phone:"13800138000"}})},c={render:()=>e.jsx(t,{initialValue:{method:"email",email:"invalid-email",phone:""},errors:{email:"请输入有效的邮箱地址"}})},p={render:()=>e.jsx(t,{initialValue:{method:"phone",email:"",phone:"123"},errors:{phone:"请输入有效的手机号码"}})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source},description:{story:"Phone method selected",...d.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "13800138000"
  }} />
}`,...m.parameters?.docs?.source},description:{story:"Phone method with filled data",...m.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "invalid-email",
    phone: ""
  }} errors={{
    email: "请输入有效的邮箱地址"
  }} />
}`,...c.parameters?.docs?.source},description:{story:"Email method with validation errors",...c.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "123"
  }} errors={{
    phone: "请输入有效的手机号码"
  }} />
}`,...p.parameters?.docs?.source},description:{story:"Phone method with validation errors",...p.parameters?.docs?.description}}};const Z=["Default","EmailFilled","PhoneSelected","PhoneFilled","EmailWithErrors","PhoneWithErrors"];export{i as Default,l as EmailFilled,c as EmailWithErrors,m as PhoneFilled,d as PhoneSelected,p as PhoneWithErrors,Z as __namedExportsOrder,Y as default};
