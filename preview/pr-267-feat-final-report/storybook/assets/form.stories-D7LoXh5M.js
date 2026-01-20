import{j as e}from"./iframe-CrLPMyef.js";import{a as N}from"./zod-YBRs5Al3.js";import{B as k}from"./button-C49Jt41H.js";import{C as H}from"./checkbox-hlzRasDL.js";import{u as V,F as T,a as i,b as s,c as n,d as t,e as l,f as m}from"./form-vAtcQtf6.js";import{I as E}from"./input-CBtiA9j3.js";import{S as $,a as L,b as z,c as B,d as v}from"./select-Czr0wEv_.js";import{a as M}from"./createLucideIcon-DzaTpkcS.js";import{s as O}from"./storybook-logger-DgFpE3wU.js";import{o as R,b as q,s as d}from"./schemas-BKf9BodT.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CCw5U8u4.js";import"./index-B2BMd2ZM.js";import"./index-DLC0D_9l.js";import"./index-CXICuE6m.js";import"./index-3_PNoCtV.js";import"./check-DD9V9MZB.js";import"./label-Dee_xcgp.js";import"./index-E-CxifyW.js";import"./index-C5LsBHvz.js";import"./index-DBYj_96i.js";import"./index-BmOx0rIh.js";import"./index-B9BpXIRB.js";import"./index-Bzbtinzm.js";import"./index-DCZN-NHZ.js";import"./chevron-down-B5Itlma0.js";function I({className:r,...h}){return e.jsx("textarea",{"data-slot":"textarea",className:M("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),...h})}I.__docgenInfo={description:"",methods:[],displayName:"Textarea"};var j,b,f,g,_,S,F,W,y,D,w,C;const A=R({username:d().min(2,{message:"用户名至少需要 2 个字符"}),email:d().min(1,"请输入邮箱地址").email("请输入有效的邮箱地址"),bio:d().max(160).optional(),role:d().min(1,"请选择一个角色"),notifications:q()});function G({defaultValues:r,onSubmit:h}){const a=V({resolver:N(A),defaultValues:{username:r?.username||"",email:r?.email||"",bio:r?.bio||"",role:r?.role||"",notifications:r?.notifications||!1}});return e.jsx(T,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(h||(()=>{})),className:"space-y-6 w-full max-w-md",children:[e.jsx(i,{control:a.control,name:"username",render:({field:o})=>e.jsxs(s,{children:[e.jsx(n,{children:"用户名"}),e.jsx(t,{children:e.jsx(E,{placeholder:"请输入用户名",...o})}),e.jsx(l,{children:"这是您的公开显示名称"}),e.jsx(m,{})]})}),e.jsx(i,{control:a.control,name:"email",render:({field:o})=>e.jsxs(s,{children:[e.jsx(n,{children:"邮箱"}),e.jsx(t,{children:e.jsx(E,{type:"email",placeholder:"请输入邮箱",...o})}),e.jsx(l,{children:"我们不会分享您的邮箱地址"}),e.jsx(m,{})]})}),e.jsx(i,{control:a.control,name:"bio",render:({field:o})=>e.jsxs(s,{children:[e.jsx(n,{children:"个人简介"}),e.jsx(t,{children:e.jsx(I,{placeholder:"介绍一下您自己",className:"resize-none",...o})}),e.jsx(l,{children:"最多 160 个字符"}),e.jsx(m,{})]})}),e.jsx(i,{control:a.control,name:"role",render:({field:o})=>e.jsxs(s,{children:[e.jsx(n,{children:"角色"}),e.jsxs($,{onValueChange:o.onChange,defaultValue:o.value,children:[e.jsx(t,{children:e.jsx(L,{children:e.jsx(z,{placeholder:"选择一个角色"})})}),e.jsxs(B,{children:[e.jsx(v,{value:"user",children:"用户"}),e.jsx(v,{value:"admin",children:"管理员"}),e.jsx(v,{value:"moderator",children:"版主"})]})]}),e.jsx(l,{children:"选择您的账户角色"}),e.jsx(m,{})]})}),e.jsx(i,{control:a.control,name:"notifications",render:({field:o})=>e.jsxs(s,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(t,{children:e.jsx(H,{checked:o.value,onCheckedChange:o.onChange})}),e.jsx("div",{className:"space-y-1 leading-none",children:e.jsx(n,{children:"接收通知"})})]})}),e.jsx(k,{type:"submit",children:"提交"})]})})}const be={title:"Forms/Form",component:G,parameters:{layout:"centered"},tags:["autodocs"]},c={args:{}},u={args:{defaultValues:{username:"johndoe",email:"john@example.com",bio:"I'm a software developer",role:"user",notifications:!0}}},p={args:{defaultValues:{username:"a",email:"invalid-email",bio:"",role:""}}},x={args:{onSubmit:r=>{O.info("Form submitted:",r),alert(`表单已提交！
用户名: ${r.username}
邮箱: ${r.email}`)}}};c.parameters={...c.parameters,docs:{...(j=c.parameters)===null||j===void 0?void 0:j.docs,source:{originalSource:`{
  args: {}
}`,...(f=c.parameters)===null||f===void 0||(b=f.docs)===null||b===void 0?void 0:b.source}}};u.parameters={...u.parameters,docs:{...(g=u.parameters)===null||g===void 0?void 0:g.docs,source:{originalSource:`{
  args: {
    defaultValues: {
      username: "johndoe",
      email: "john@example.com",
      bio: "I'm a software developer",
      role: "user",
      notifications: true
    }
  }
}`,...(S=u.parameters)===null||S===void 0||(_=S.docs)===null||_===void 0?void 0:_.source}}};p.parameters={...p.parameters,docs:{...(F=p.parameters)===null||F===void 0?void 0:F.docs,source:{originalSource:`{
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
}`,...(y=p.parameters)===null||y===void 0||(W=y.docs)===null||W===void 0?void 0:W.source}}};x.parameters={...x.parameters,docs:{...(D=x.parameters)===null||D===void 0?void 0:D.docs,source:{originalSource:`{
  args: {
    onSubmit: (data: FormValues) => {
      storyLogger.info("Form submitted:", data);
      alert(\`表单已提交！\\n用户名: \${data.username}\\n邮箱: \${data.email}\`);
    }
  }
}`,...(C=x.parameters)===null||C===void 0||(w=C.docs)===null||w===void 0?void 0:w.source}}};const fe=["Default","WithDefaultValues","WithValidationErrors","WithSubmitHandler"];export{c as Default,u as WithDefaultValues,x as WithSubmitHandler,p as WithValidationErrors,fe as __namedExportsOrder,be as default};
