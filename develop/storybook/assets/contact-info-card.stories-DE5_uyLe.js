import{j as e,r as g}from"./iframe-CvbL331m.js";import{C as y,a as I,b as N,c as v}from"./card-DrX_RmyE.js";import{I as x}from"./input-mbU9WAfX.js";import{L as s}from"./label-D8545hoU.js";import{R as V,a as f}from"./radio-group-CtTipfHx.js";import{M as E}from"./mail-CD4euI3U.js";import{P}from"./phone-BnGY3Sv1.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";import"./index-BfQugiVD.js";import"./index-DhbfMN3k.js";import"./index-C7jJTgGp.js";import"./index-DCRjOMVy.js";import"./index-CX3gvrbW.js";import"./index-BDPzjxq2.js";import"./index-B_3XU_YX.js";import"./index-tbCBu7Xg.js";import"./index-CTOkKrmH.js";import"./index-qYKsYFBV.js";import"./index-C39R23Iy.js";import"./index-BoeX9q8m.js";import"./index-B5evkZDY.js";import"./createLucideIcon-BH8CnD7y.js";function u({value:r,onChange:n,errors:t={}}){const h=a=>{n({...r,method:a})},C=a=>{n({...r,email:a})},j=a=>{n({...r,phone:a})};return e.jsxs(y,{children:[e.jsx(I,{children:e.jsx(N,{className:"text-lg",children:"联系人信息"})}),e.jsxs(v,{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs(s,{children:["联系方式 ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsxs(V,{value:r.method,onValueChange:a=>h(a),children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(f,{value:"email",id:"method-email"}),e.jsxs(s,{htmlFor:"method-email",className:"flex items-center gap-2 cursor-pointer font-normal",children:[e.jsx(E,{className:"h-4 w-4"}),"邮箱"]})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(f,{value:"phone",id:"method-phone"}),e.jsxs(s,{htmlFor:"method-phone",className:"flex items-center gap-2 cursor-pointer font-normal",children:[e.jsx(P,{className:"h-4 w-4"}),"手机"]})]})]})]}),r.method==="email"&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs(s,{htmlFor:"contact-email",children:["联系邮箱 ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx(x,{id:"contact-email",type:"email",value:r.email,onChange:a=>C(a.target.value),placeholder:"邮箱地址，接收航变信息",className:t.email?"border-red-500":""}),t.email&&e.jsx("p",{className:"text-sm text-red-500",children:t.email})]}),r.method==="phone"&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs(s,{htmlFor:"contact-phone",children:["联系电话 ",e.jsx("span",{className:"text-red-500",children:"*"})]}),e.jsx(x,{id:"contact-phone",type:"tel",value:r.phone,onChange:a=>j(a.target.value),placeholder:"手机号，接收航变信息",className:t.phone?"border-red-500":""}),t.phone&&e.jsx("p",{className:"text-sm text-red-500",children:t.phone})]})]})]})}u.__docgenInfo={description:`Contact Information Card Component
Allows user to select contact method (email or phone) and input contact details`,methods:[],displayName:"ContactInfoCard",props:{value:{required:!0,tsType:{name:"ContactInfo"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: ContactInfo) => void",signature:{arguments:[{type:{name:"ContactInfo"},name:"value"}],return:{name:"void"}}},description:""},errors:{required:!1,tsType:{name:"ContactInfoValidationErrors"},description:"",defaultValue:{value:"{}",computed:!1}}}};const X={title:"Flights/ContactInfoCard",component:u,parameters:{layout:"padded"},tags:["autodocs"]};function o({initialValue:r,errors:n}){const[t,h]=g.useState(r);return e.jsx(u,{value:t,onChange:h,errors:n})}const i={render:()=>e.jsx(o,{initialValue:{method:"email",email:"",phone:""}})},l={render:()=>e.jsx(o,{initialValue:{method:"email",email:"zhangsan@example.com",phone:""}})},m={render:()=>e.jsx(o,{initialValue:{method:"phone",email:"",phone:""}})},d={render:()=>e.jsx(o,{initialValue:{method:"phone",email:"",phone:"13800138000"}})},c={render:()=>e.jsx(o,{initialValue:{method:"email",email:"invalid-email",phone:""},errors:{email:"请输入有效的邮箱地址"}})},p={render:()=>e.jsx(o,{initialValue:{method:"phone",email:"",phone:"123"},errors:{phone:"请输入有效的手机号码"}})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source},description:{story:"Email method selected with filled data",...l.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: ""
  }} />
}`,...m.parameters?.docs?.source},description:{story:"Phone method selected",...m.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "13800138000"
  }} />
}`,...d.parameters?.docs?.source},description:{story:"Phone method with filled data",...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source},description:{story:"Phone method with validation errors",...p.parameters?.docs?.description}}};const Y=["Default","EmailFilled","PhoneSelected","PhoneFilled","EmailWithErrors","PhoneWithErrors"];export{i as Default,l as EmailFilled,c as EmailWithErrors,d as PhoneFilled,m as PhoneSelected,p as PhoneWithErrors,Y as __namedExportsOrder,X as default};
