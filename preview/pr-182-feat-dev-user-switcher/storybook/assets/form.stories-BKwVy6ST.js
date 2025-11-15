import{j as e}from"./iframe-DI5Oy9RL.js";import{u as g,a as b,F as S,b as s,c as n,d as t,e as i,g as m,f as l}from"./form-BSdmRely.js";import{B as F}from"./button-C3F4HPdX.js";import{C as v}from"./checkbox-5LBPnSo2.js";import{I as j}from"./input-BWKQru72.js";import{S as C,a as V,b as I,c as y,d as h}from"./select-DehTq16y.js";import{T as W}from"./textarea-DN0lFHsP.js";import{o as w,b as D,s as c}from"./schemas-dlpNQSCA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DCU1OT1a.js";import"./label-BAvIbR7K.js";import"./index-DQyPI5TK.js";import"./index-n-UeRsni.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-5SmAaEk-.js";import"./index-NM0MU2HX.js";import"./index-IoNmgYKw.js";import"./index-C2m6zttO.js";import"./index-D4Vi1ckl.js";import"./index-CQaLpz_J.js";import"./check-Buze8Ocw.js";import"./createLucideIcon-BhzAdi9T.js";import"./index-BdQq_4o_.js";import"./index-D6ROJEKz.js";import"./index-Ed_CzyAZ.js";import"./index-Cnw76Pof.js";import"./Combination-DMFRRxxI.js";import"./index-CAoU1iiv.js";import"./index-BaT8t_px.js";import"./index-DNHHIeod.js";import"./chevron-down-n8MGPeuo.js";import"./chevron-up-B8hypwwH.js";const E=w({username:c().min(2,{message:"用户名至少需要 2 个字符"}),email:c().min(1,"请输入邮箱地址").email("请输入有效的邮箱地址"),bio:c().max(160).optional(),role:c().min(1,"请选择一个角色"),notifications:D()});function N({defaultValues:o,onSubmit:f}){const a=g({resolver:b(E),defaultValues:{username:o?.username||"",email:o?.email||"",bio:o?.bio||"",role:o?.role||"",notifications:o?.notifications||!1}});return e.jsx(S,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(f||(()=>{})),className:"space-y-6 w-full max-w-md",children:[e.jsx(s,{control:a.control,name:"username",render:({field:r})=>e.jsxs(n,{children:[e.jsx(t,{children:"用户名"}),e.jsx(i,{children:e.jsx(j,{placeholder:"请输入用户名",...r})}),e.jsx(m,{children:"这是您的公开显示名称"}),e.jsx(l,{})]})}),e.jsx(s,{control:a.control,name:"email",render:({field:r})=>e.jsxs(n,{children:[e.jsx(t,{children:"邮箱"}),e.jsx(i,{children:e.jsx(j,{type:"email",placeholder:"请输入邮箱",...r})}),e.jsx(m,{children:"我们不会分享您的邮箱地址"}),e.jsx(l,{})]})}),e.jsx(s,{control:a.control,name:"bio",render:({field:r})=>e.jsxs(n,{children:[e.jsx(t,{children:"个人简介"}),e.jsx(i,{children:e.jsx(W,{placeholder:"介绍一下您自己",className:"resize-none",...r})}),e.jsx(m,{children:"最多 160 个字符"}),e.jsx(l,{})]})}),e.jsx(s,{control:a.control,name:"role",render:({field:r})=>e.jsxs(n,{children:[e.jsx(t,{children:"角色"}),e.jsxs(C,{onValueChange:r.onChange,defaultValue:r.value,children:[e.jsx(i,{children:e.jsx(V,{children:e.jsx(I,{placeholder:"选择一个角色"})})}),e.jsxs(y,{children:[e.jsx(h,{value:"user",children:"用户"}),e.jsx(h,{value:"admin",children:"管理员"}),e.jsx(h,{value:"moderator",children:"版主"})]})]}),e.jsx(m,{children:"选择您的账户角色"}),e.jsx(l,{})]})}),e.jsx(s,{control:a.control,name:"notifications",render:({field:r})=>e.jsxs(n,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(i,{children:e.jsx(v,{checked:r.value,onCheckedChange:r.onChange})}),e.jsx("div",{className:"space-y-1 leading-none",children:e.jsx(t,{children:"接收通知"})})]})}),e.jsx(F,{type:"submit",children:"提交"})]})})}const de={title:"Forms/Form",component:N,parameters:{layout:"centered"},tags:["autodocs"]},d={args:{}},p={args:{defaultValues:{username:"johndoe",email:"john@example.com",bio:"I'm a software developer",role:"user",notifications:!0}}},u={args:{defaultValues:{username:"a",email:"invalid-email",bio:"",role:""}}},x={args:{onSubmit:o=>{console.log("Form submitted:",o),alert(`表单已提交！
用户名: ${o.username}
邮箱: ${o.email}`)}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      username: "johndoe",
      email: "john@example.com",
      bio: "I'm a software developer",
      role: "user",
      notifications: true
    }
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      username: "a",
      // Too short
      email: "invalid-email",
      // Invalid format
      bio: "",
      role: ""
    }
  }
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    onSubmit: (data: FormValues) => {
      console.log("Form submitted:", data);
      alert(\`表单已提交！\\n用户名: \${data.username}\\n邮箱: \${data.email}\`);
    }
  }
}`,...x.parameters?.docs?.source}}};const pe=["Default","WithDefaultValues","WithValidationErrors","WithSubmitHandler"];export{d as Default,p as WithDefaultValues,x as WithSubmitHandler,u as WithValidationErrors,pe as __namedExportsOrder,de as default};
