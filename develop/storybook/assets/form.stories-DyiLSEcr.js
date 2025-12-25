import{j as e}from"./iframe-CW2BHA6G.js";import{u as b,a as v,F as S,c as s,d as i,b as n,e as t,g as l,f as m}from"./form-B_UR8P1H.js";import{B as F}from"./button-CYtTCpdz.js";import{C as y}from"./checkbox-51WuzxxA.js";import{I as f}from"./input-CTZ-tMss.js";import{S as w,a as C,b as V,c as I,d as j}from"./select-D_Hq4hcc.js";import{c as N}from"./utils-CBfrqCZ4.js";import{s as W}from"./storybook-logger-DgFpE3wU.js";import{o as k,b as D,s as c}from"./schemas-wRgyZonl.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cj38kr-i.js";import"./label-kKk6wyo-.js";import"./index-BbUhG9_d.js";import"./index-VCUEmfUw.js";import"./index-CdJFUDDL.js";import"./index-BSdOT4G9.js";import"./index-CWaAya5q.js";import"./index-BODVhIoo.js";import"./index-f0vQDAWT.js";import"./check-9hOopR3W.js";import"./createLucideIcon-2UmqXkux.js";import"./index-BbDIz6_Z.js";import"./index-Dvtsar5N.js";import"./index-09_B278r.js";import"./Combination-Cuvy8Qbr.js";import"./index-C_fHoG2k.js";import"./index-DvKuVAxP.js";import"./index-BKf5yc4k.js";import"./chevron-down-CXa5t34R.js";import"./chevron-up-Dr-HOyuZ.js";function g({className:r,...h}){return e.jsx("textarea",{"data-slot":"textarea",className:N("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),...h})}g.__docgenInfo={description:"",methods:[],displayName:"Textarea"};const E=k({username:c().min(2,{message:"用户名至少需要 2 个字符"}),email:c().min(1,"请输入邮箱地址").email("请输入有效的邮箱地址"),bio:c().max(160).optional(),role:c().min(1,"请选择一个角色"),notifications:D()});function T({defaultValues:r,onSubmit:h}){const a=b({resolver:v(E),defaultValues:{username:r?.username||"",email:r?.email||"",bio:r?.bio||"",role:r?.role||"",notifications:r?.notifications||!1}});return e.jsx(S,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(h||(()=>{})),className:"space-y-6 w-full max-w-md",children:[e.jsx(s,{control:a.control,name:"username",render:({field:o})=>e.jsxs(i,{children:[e.jsx(n,{children:"用户名"}),e.jsx(t,{children:e.jsx(f,{placeholder:"请输入用户名",...o})}),e.jsx(l,{children:"这是您的公开显示名称"}),e.jsx(m,{})]})}),e.jsx(s,{control:a.control,name:"email",render:({field:o})=>e.jsxs(i,{children:[e.jsx(n,{children:"邮箱"}),e.jsx(t,{children:e.jsx(f,{type:"email",placeholder:"请输入邮箱",...o})}),e.jsx(l,{children:"我们不会分享您的邮箱地址"}),e.jsx(m,{})]})}),e.jsx(s,{control:a.control,name:"bio",render:({field:o})=>e.jsxs(i,{children:[e.jsx(n,{children:"个人简介"}),e.jsx(t,{children:e.jsx(g,{placeholder:"介绍一下您自己",className:"resize-none",...o})}),e.jsx(l,{children:"最多 160 个字符"}),e.jsx(m,{})]})}),e.jsx(s,{control:a.control,name:"role",render:({field:o})=>e.jsxs(i,{children:[e.jsx(n,{children:"角色"}),e.jsxs(w,{onValueChange:o.onChange,defaultValue:o.value,children:[e.jsx(t,{children:e.jsx(C,{children:e.jsx(V,{placeholder:"选择一个角色"})})}),e.jsxs(I,{children:[e.jsx(j,{value:"user",children:"用户"}),e.jsx(j,{value:"admin",children:"管理员"}),e.jsx(j,{value:"moderator",children:"版主"})]})]}),e.jsx(l,{children:"选择您的账户角色"}),e.jsx(m,{})]})}),e.jsx(s,{control:a.control,name:"notifications",render:({field:o})=>e.jsxs(i,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(t,{children:e.jsx(y,{checked:o.value,onCheckedChange:o.onChange})}),e.jsx("div",{className:"space-y-1 leading-none",children:e.jsx(n,{children:"接收通知"})})]})}),e.jsx(F,{type:"submit",children:"提交"})]})})}const ce={title:"Forms/Form",component:T,parameters:{layout:"centered"},tags:["autodocs"]},d={args:{}},u={args:{defaultValues:{username:"johndoe",email:"john@example.com",bio:"I'm a software developer",role:"user",notifications:!0}}},p={args:{defaultValues:{username:"a",email:"invalid-email",bio:"",role:""}}},x={args:{onSubmit:r=>{W.info("Form submitted:",r),alert(`表单已提交！
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
      storyLogger.info("Form submitted:", data);
      alert(\`表单已提交！\\n用户名: \${data.username}\\n邮箱: \${data.email}\`);
    }
  }
}`,...x.parameters?.docs?.source}}};const de=["Default","WithDefaultValues","WithValidationErrors","WithSubmitHandler"];export{d as Default,u as WithDefaultValues,x as WithSubmitHandler,p as WithValidationErrors,de as __namedExportsOrder,ce as default};
