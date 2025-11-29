import{j as e}from"./iframe-BRgbNqLm.js";import{L as a}from"./link-DJM2q87f.js";import{A as l,a as d,b as m}from"./avatar-CacwQWAz.js";import{B as x}from"./badge-D0_iz70J.js";import{B as n}from"./button-XEp2VeJS.js";import{H as f,a as j,g as p,b as v}from"./string-CWIThZWF.js";import{S as u}from"./separator-ThEFqb3r.js";import{C as y}from"./chevron-down-Oxc_FE9e.js";import{c}from"./createLucideIcon-CeCL99oA.js";import"./preload-helper-PPVm8Dsz.js";import"./use-merged-ref-CSO1AP9r.js";import"./index-jR5iUyjp.js";import"./index-YkNfMQmD.js";import"./index-Bxj4v1On.js";import"./index-CgtdcUJL.js";import"./index-D63BWAbV.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-B2b5KDFl.js";import"./index-CptOKPbg.js";import"./index-C8cNDpH5.js";import"./index-TrKwCJZt.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],N=c("log-out",w);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],k=c("user",S);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]],z=c("wallet",b);function C({isPending:g=!1,session:s=null}){const h=async()=>{console.log("Sign out clicked")};return g?e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"size-8 animate-pulse rounded-full bg-muted"})}):s?e.jsxs(f,{openDelay:200,closeDelay:100,children:[e.jsx(j,{asChild:!0,children:e.jsxs(a,{href:"/home",className:"flex items-center gap-2 cursor-pointer",children:[e.jsxs(l,{className:"size-8",children:[e.jsx(d,{src:s.user.image||void 0,alt:s.user.name||"User"}),e.jsx(m,{children:p(s.user.name)})]}),e.jsx("span",{className:"hidden text-sm font-medium md:inline-block",children:"尊敬的用户"}),e.jsx(y,{className:"hidden size-3.5 text-muted-foreground md:inline-block"})]})}),e.jsx(v,{align:"end",className:"w-52 p-2",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsxs("div",{className:"flex items-center gap-3 px-2 py-1.5",children:[e.jsxs(l,{className:"size-10",children:[e.jsx(d,{src:s.user.image||void 0,alt:s.user.name||"User"}),e.jsx(m,{children:p(s.user.name)})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(a,{href:"/home",className:"text-sm font-medium hover:underline cursor-pointer",children:"尊敬的用户"}),e.jsx(x,{className:"w-fit",children:"贵宾"})]})]}),e.jsx(u,{className:"my-1"}),e.jsx(n,{variant:"ghost",size:"sm",asChild:!0,className:"justify-start gap-2",children:e.jsxs(a,{href:"/wallet",children:[e.jsx(z,{className:"size-4"}),"我的钱包"]})}),e.jsx(n,{variant:"ghost",size:"sm",asChild:!0,className:"justify-start gap-2",children:e.jsxs(a,{href:"/home/passengers",children:[e.jsx(k,{className:"size-4"}),"常用信息"]})}),e.jsx(u,{className:"my-1"}),e.jsxs(n,{variant:"ghost",size:"sm",onClick:h,className:"justify-start gap-2",children:[e.jsx(N,{className:"size-4"}),"退出登录"]})]})})]}):e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(n,{variant:"outline",size:"sm",asChild:!0,children:e.jsx(a,{href:"/auth/sign-in",children:"Sign In"})}),e.jsx(n,{variant:"secondary",size:"sm",asChild:!0,children:e.jsx(a,{href:"/auth/sign-up",children:"Sign Up"})})]})}const Q={title:"Common/UserMenu",component:C,parameters:{layout:"centered",docs:{description:{component:"UserMenu component displays user authentication status and provides access to user-related actions. Shows 'Sign In' and 'Sign Up' buttons when not authenticated, or user menu with profile access when authenticated."}}},argTypes:{isPending:{control:"boolean",description:"Loading state while checking session"},session:{control:"object",description:"User session data (null for logged out)"}}},r={args:{isPending:!1,session:null}},i={args:{isPending:!1,session:{user:{id:"user-123",name:"张三",email:"zhangsan@example.com",image:"https://github.com/shadcn.png"}}}},t={args:{isPending:!1,session:{user:{id:"user-456",name:"李四",email:"lisi@example.com"}}}},o={args:{isPending:!0,session:null}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
Displays a skeleton loader while checking session.`,...o.parameters?.docs?.description}}};const X=["Default","LoggedIn","LoggedInWithoutAvatar","Loading"];export{r as Default,o as Loading,i as LoggedIn,t as LoggedInWithoutAvatar,X as __namedExportsOrder,Q as default};
