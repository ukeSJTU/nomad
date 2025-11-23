import{j as e}from"./iframe-BIE3orPF.js";import{u as g,a as v,F as S,b as s,c as n,d as i,e as t,g as l,f as m}from"./form-1sLD6OW6.js";import{B as F}from"./button-BHL9VpYg.js";import{C as w}from"./checkbox-D_tSgF8N.js";import{I as f}from"./input-CJfCVuPe.js";import{S as y,a as C,b as V,c as I,d as j}from"./select-e-8NxZzD.js";import{c as N}from"./utils-CBfrqCZ4.js";import{o as W,b as k,s as c}from"./schemas-Kzq7Ayg9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-dpG-91xS.js";import"./label-HjI0A9fn.js";import"./index-C9hYUzPm.js";import"./index-C8tx8S_a.js";import"./index-CdJFUDDL.js";import"./index-Cc0-q4v9.js";import"./index-BDQ7_fOS.js";import"./index-CKyfck8B.js";import"./index-BVW5sDyh.js";import"./check-C4A1fcni.js";import"./createLucideIcon-aXwR9RXD.js";import"./index-DafrFgqi.js";import"./index-BU5DVp1F.js";import"./index-zLNOV2VO.js";import"./Combination-C7TrT_6E.js";import"./index-BcGFjD2Y.js";import"./index-S6L-m0AK.js";import"./index-BzDNPWDU.js";import"./chevron-down-lwp1Hecv.js";import"./chevron-up-BfAtsNHU.js";function b({className:r,...h}){return e.jsx("textarea",{"data-slot":"textarea",className:N("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),...h})}b.__docgenInfo={description:"",methods:[],displayName:"Textarea"};const D=W({username:c().min(2,{message:"用户名至少需要 2 个字符"}),email:c().min(1,"请输入邮箱地址").email("请输入有效的邮箱地址"),bio:c().max(160).optional(),role:c().min(1,"请选择一个角色"),notifications:k()});function E({defaultValues:r,onSubmit:h}){const a=g({resolver:v(D),defaultValues:{username:r?.username||"",email:r?.email||"",bio:r?.bio||"",role:r?.role||"",notifications:r?.notifications||!1}});return e.jsx(S,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(h||(()=>{})),className:"space-y-6 w-full max-w-md",children:[e.jsx(s,{control:a.control,name:"username",render:({field:o})=>e.jsxs(n,{children:[e.jsx(i,{children:"用户名"}),e.jsx(t,{children:e.jsx(f,{placeholder:"请输入用户名",...o})}),e.jsx(l,{children:"这是您的公开显示名称"}),e.jsx(m,{})]})}),e.jsx(s,{control:a.control,name:"email",render:({field:o})=>e.jsxs(n,{children:[e.jsx(i,{children:"邮箱"}),e.jsx(t,{children:e.jsx(f,{type:"email",placeholder:"请输入邮箱",...o})}),e.jsx(l,{children:"我们不会分享您的邮箱地址"}),e.jsx(m,{})]})}),e.jsx(s,{control:a.control,name:"bio",render:({field:o})=>e.jsxs(n,{children:[e.jsx(i,{children:"个人简介"}),e.jsx(t,{children:e.jsx(b,{placeholder:"介绍一下您自己",className:"resize-none",...o})}),e.jsx(l,{children:"最多 160 个字符"}),e.jsx(m,{})]})}),e.jsx(s,{control:a.control,name:"role",render:({field:o})=>e.jsxs(n,{children:[e.jsx(i,{children:"角色"}),e.jsxs(y,{onValueChange:o.onChange,defaultValue:o.value,children:[e.jsx(t,{children:e.jsx(C,{children:e.jsx(V,{placeholder:"选择一个角色"})})}),e.jsxs(I,{children:[e.jsx(j,{value:"user",children:"用户"}),e.jsx(j,{value:"admin",children:"管理员"}),e.jsx(j,{value:"moderator",children:"版主"})]})]}),e.jsx(l,{children:"选择您的账户角色"}),e.jsx(m,{})]})}),e.jsx(s,{control:a.control,name:"notifications",render:({field:o})=>e.jsxs(n,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(t,{children:e.jsx(w,{checked:o.value,onCheckedChange:o.onChange})}),e.jsx("div",{className:"space-y-1 leading-none",children:e.jsx(i,{children:"接收通知"})})]})}),e.jsx(F,{type:"submit",children:"提交"})]})})}const le={title:"Forms/Form",component:E,parameters:{layout:"centered"},tags:["autodocs"]},d={args:{}},u={args:{defaultValues:{username:"johndoe",email:"john@example.com",bio:"I'm a software developer",role:"user",notifications:!0}}},p={args:{defaultValues:{username:"a",email:"invalid-email",bio:"",role:""}}},x={args:{onSubmit:r=>{console.log("Form submitted:",r),alert(`表单已提交！
用户名: ${r.username}
邮箱: ${r.email}`)}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      username: "johndoe",
      email: "john@example.com",
      bio: "I'm a software developer",
      role: "user",
      notifications: true
    }
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    onSubmit: (data: FormValues) => {
      console.log("Form submitted:", data);
      alert(\`表单已提交！\\n用户名: \${data.username}\\n邮箱: \${data.email}\`);
    }
  }
}`,...x.parameters?.docs?.source}}};const me=["Default","WithDefaultValues","WithValidationErrors","WithSubmitHandler"];export{d as Default,u as WithDefaultValues,x as WithSubmitHandler,p as WithValidationErrors,me as __namedExportsOrder,le as default};
