import{I as l}from"./input-DSYWkXeM.js";import"./iframe-BcDHuRfU.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";const u={title:"Shadcn/Input",component:l,parameters:{layout:"centered"},argTypes:{type:{control:"select",options:["text","email","password","number","tel","url","search"],description:"The type of input"},placeholder:{control:"text",description:"Placeholder text"},disabled:{control:"boolean",description:"Whether the input is disabled"}}},e={args:{placeholder:"Enter text..."}},r={args:{type:"email",placeholder:"Email address"}},a={args:{type:"password",placeholder:"Password"}},s={args:{type:"number",placeholder:"Enter number"}},o={args:{type:"search",placeholder:"Search..."}},t={args:{placeholder:"Disabled input",disabled:!0}},c={args:{defaultValue:"Hello World"}},n={args:{type:"file"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text..."
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: "email",
    placeholder: "Email address"
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: "password",
    placeholder: "Password"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: "number",
    placeholder: "Enter number"
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: "search",
    placeholder: "Search..."
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Disabled input",
    disabled: true
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: "Hello World"
  }
}`,...c.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    type: "file"
  }
}`,...n.parameters?.docs?.source}}};const h=["Default","Email","Password","Number","Search","Disabled","WithValue","File"];export{e as Default,t as Disabled,r as Email,n as File,s as Number,a as Password,o as Search,c as WithValue,h as __namedExportsOrder,u as default};
