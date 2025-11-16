import{j as e}from"./iframe-BH7aeb89.js";import{L as a}from"./link-T5Y_EzT8.js";import{A as l,a as m,b as d}from"./avatar-D8xqqXzA.js";import{B as h}from"./badge-DkJQEf7E.js";import{B as n}from"./button-reTbs1c1.js";import{H as x,a as f,b as j}from"./hover-card-D1Sy43BW.js";import{S as p}from"./separator-IToQ99wX.js";import{C as v}from"./chevron-down-CRuEYTon.js";import{c as w}from"./createLucideIcon-C7RxPt7J.js";import{U as y,L as N}from"./user-CGEy6mkY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B8FmrOkk.js";import"./index-Bj9YQplX.js";import"./index-DGQpXj_O.js";import"./index-rfJbia-g.js";import"./index-B4LoADOl.js";import"./index-B6zyZfym.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-BDEDCb8l.js";import"./index-Cer7Ujd1.js";import"./index-MqkOuM2Y.js";import"./index-BIGOGDbH.js";import"./index-Be60dqzC.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]],C=w("wallet",S),u=c=>c?c.split(" ").map(s=>s[0]).join("").toUpperCase().slice(0,2):"A";function U({isPending:c=!1,session:s=null}){const g=async()=>{console.log("Sign out clicked")};return c?e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"size-8 animate-pulse rounded-full bg-muted"})}):s?e.jsxs(x,{openDelay:200,closeDelay:100,children:[e.jsx(f,{asChild:!0,children:e.jsxs(a,{href:"/home",className:"flex items-center gap-2 cursor-pointer",children:[e.jsxs(l,{className:"size-8",children:[e.jsx(m,{src:s.user.image||void 0,alt:s.user.name||"User"}),e.jsx(d,{children:u(s.user.name)})]}),e.jsx("span",{className:"hidden text-sm font-medium md:inline-block",children:"尊敬的用户"}),e.jsx(v,{className:"hidden size-3.5 text-muted-foreground md:inline-block"})]})}),e.jsx(j,{align:"end",className:"w-52 p-2",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsxs("div",{className:"flex items-center gap-3 px-2 py-1.5",children:[e.jsxs(l,{className:"size-10",children:[e.jsx(m,{src:s.user.image||void 0,alt:s.user.name||"User"}),e.jsx(d,{children:u(s.user.name)})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(a,{href:"/home",className:"text-sm font-medium hover:underline cursor-pointer",children:"尊敬的用户"}),e.jsx(h,{className:"w-fit",children:"贵宾"})]})]}),e.jsx(p,{className:"my-1"}),e.jsx(n,{variant:"ghost",size:"sm",asChild:!0,className:"justify-start gap-2",children:e.jsxs(a,{href:"/wallet",children:[e.jsx(C,{className:"size-4"}),"我的钱包"]})}),e.jsx(n,{variant:"ghost",size:"sm",asChild:!0,className:"justify-start gap-2",children:e.jsxs(a,{href:"/home/passengers",children:[e.jsx(y,{className:"size-4"}),"常用信息"]})}),e.jsx(p,{className:"my-1"}),e.jsxs(n,{variant:"ghost",size:"sm",onClick:g,className:"justify-start gap-2",children:[e.jsx(N,{className:"size-4"}),"退出登录"]})]})})]}):e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(n,{variant:"outline",size:"sm",asChild:!0,children:e.jsx(a,{href:"/auth/sign-in",children:"Sign In"})}),e.jsx(n,{variant:"secondary",size:"sm",asChild:!0,children:e.jsx(a,{href:"/auth/sign-up",children:"Sign Up"})})]})}const X={title:"Common/UserMenu",component:U,parameters:{layout:"centered",docs:{description:{component:"UserMenu component displays user authentication status and provides access to user-related actions. Shows 'Sign In' and 'Sign Up' buttons when not authenticated, or user menu with profile access when authenticated."}}},argTypes:{isPending:{control:"boolean",description:"Loading state while checking session"},session:{control:"object",description:"User session data (null for logged out)"}}},r={args:{isPending:!1,session:null}},i={args:{isPending:!1,session:{user:{id:"user-123",name:"张三",email:"zhangsan@example.com",image:"https://github.com/shadcn.png"}}}},t={args:{isPending:!1,session:{user:{id:"user-456",name:"李四",email:"lisi@example.com"}}}},o={args:{isPending:!0,session:null}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
Displays a skeleton loader while checking session.`,...o.parameters?.docs?.description}}};const Y=["Default","LoggedIn","LoggedInWithoutAvatar","Loading"];export{r as Default,o as Loading,i as LoggedIn,t as LoggedInWithoutAvatar,Y as __namedExportsOrder,X as default};
