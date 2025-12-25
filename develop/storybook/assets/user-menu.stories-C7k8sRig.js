import{j as e}from"./iframe-BmUIunq3.js";import{L as a}from"./link-gsUp_WJ7.js";import{A as l,a as d,b as m}from"./avatar-B4cPyW4W.js";import{B as x}from"./badge-TerKhNVk.js";import{B as n}from"./button-D2P24u5P.js";import{H as f,a as j,g as p,b as v}from"./string-Bua1xRGf.js";import{S as u}from"./separator-Ui0CVhZq.js";import{s as y}from"./storybook-logger-DgFpE3wU.js";import"./currency.es-BSkspdt3.js";import{C as w}from"./chevron-down-PlaKdC1A.js";import{c}from"./createLucideIcon-DxHGAXvP.js";import"./preload-helper-PPVm8Dsz.js";import"./use-merged-ref-CyozfwSb.js";import"./index-CQpGAVXp.js";import"./index-BeFyQi3R.js";import"./index-DNuo6a-Z.js";import"./index-BxYniWMg.js";import"./index-D3AicU6b.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-B6XyjoYD.js";import"./index-DtR2bId_.js";import"./index-Bba_LKHs.js";import"./index-BZRoBpkw.js";const N=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],S=c("log-out",N);const k=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],b=c("user",k);const z=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]],C=c("wallet",z);function U({isPending:g=!1,session:s=null}){const h=async()=>{y.info("Sign out clicked")};return g?e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"size-8 animate-pulse rounded-full bg-muted"})}):s?e.jsxs(f,{openDelay:200,closeDelay:100,children:[e.jsx(j,{asChild:!0,children:e.jsxs(a,{href:"/home",className:"flex items-center gap-2 cursor-pointer",children:[e.jsxs(l,{className:"size-8",children:[e.jsx(d,{src:s.user.image||void 0,alt:s.user.name||"User"}),e.jsx(m,{children:p(s.user.name)})]}),e.jsx("span",{className:"hidden text-sm font-medium md:inline-block",children:"尊敬的用户"}),e.jsx(w,{className:"hidden size-3.5 text-muted-foreground md:inline-block"})]})}),e.jsx(v,{align:"end",className:"w-52 p-2",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsxs("div",{className:"flex items-center gap-3 px-2 py-1.5",children:[e.jsxs(l,{className:"size-10",children:[e.jsx(d,{src:s.user.image||void 0,alt:s.user.name||"User"}),e.jsx(m,{children:p(s.user.name)})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(a,{href:"/home",className:"text-sm font-medium hover:underline cursor-pointer",children:"尊敬的用户"}),e.jsx(x,{className:"w-fit",children:"贵宾"})]})]}),e.jsx(u,{className:"my-1"}),e.jsx(n,{variant:"ghost",size:"sm",asChild:!0,className:"justify-start gap-2",children:e.jsxs(a,{href:"/wallet",children:[e.jsx(C,{className:"size-4"}),"我的钱包"]})}),e.jsx(n,{variant:"ghost",size:"sm",asChild:!0,className:"justify-start gap-2",children:e.jsxs(a,{href:"/home/passengers",children:[e.jsx(b,{className:"size-4"}),"常用信息"]})}),e.jsx(u,{className:"my-1"}),e.jsxs(n,{variant:"ghost",size:"sm",onClick:h,className:"justify-start gap-2",children:[e.jsx(S,{className:"size-4"}),"退出登录"]})]})})]}):e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(n,{variant:"outline",size:"sm",asChild:!0,children:e.jsx(a,{href:"/auth/sign-in",children:"Sign In"})}),e.jsx(n,{variant:"secondary",size:"sm",asChild:!0,children:e.jsx(a,{href:"/auth/sign-up",children:"Sign Up"})})]})}const Z={title:"Common/UserMenu",component:U,parameters:{layout:"centered",docs:{description:{component:"UserMenu component displays user authentication status and provides access to user-related actions. Shows 'Sign In' and 'Sign Up' buttons when not authenticated, or user menu with profile access when authenticated."}}},argTypes:{isPending:{control:"boolean",description:"Loading state while checking session"},session:{control:"object",description:"User session data (null for logged out)"}}},r={args:{isPending:!1,session:null}},i={args:{isPending:!1,session:{user:{id:"user-123",name:"张三",email:"zhangsan@example.com",image:"https://github.com/shadcn.png"}}}},t={args:{isPending:!1,session:{user:{id:"user-456",name:"李四",email:"lisi@example.com"}}}},o={args:{isPending:!0,session:null}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isPending: false,
    session: null
  }
}`,...r.parameters?.docs?.source},description:{story:`Default story showing the UserMenu component in not logged in state.
Displays "Sign In" and "Sign Up" buttons.`,...r.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    isPending: false,
    session: {
      user: {
        id: "user-123",
        name: "张三",
        email: "zhangsan@example.com",
        image: "https://github.com/shadcn.png"
      }
    }
  }
}`,...i.parameters?.docs?.source},description:{story:`Story showing the UserMenu component when user is logged in.

Features when logged in:
- Displays standardized text "尊敬的用户" (instead of username)
- Shows user avatar with image
- ChevronDown icon indicates dropdown availability
- Click to navigate to /home page
- Hover to view user menu with options (wallet, passenger info, sign out)`,...i.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isPending: false,
    session: {
      user: {
        id: "user-456",
        name: "李四",
        email: "lisi@example.com"
      }
    }
  }
}`,...t.parameters?.docs?.source},description:{story:`Story showing the UserMenu component when user is logged in without avatar image.
Shows fallback with user initials (张).`,...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isPending: true,
    session: null
  }
}`,...o.parameters?.docs?.source},description:{story:`Story showing the UserMenu component in loading state.
Displays a skeleton loader while checking session.`,...o.parameters?.docs?.description}}};const ee=["Default","LoggedIn","LoggedInWithoutAvatar","Loading"];export{r as Default,o as Loading,i as LoggedIn,t as LoggedInWithoutAvatar,ee as __namedExportsOrder,Z as default};
