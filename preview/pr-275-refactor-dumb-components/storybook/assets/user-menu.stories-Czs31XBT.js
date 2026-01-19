import{j as e}from"./iframe-BY6WQ8rl.js";import{A as z,a as C,b as D}from"./avatar-BhbOdaa6.js";import{B as P}from"./badge-DGHQsNQ9.js";import{B as n}from"./button-Bkd1CeD9.js";import{H as W,a as B,b as O}from"./hover-card-DuSaEolm.js";import{S as U}from"./separator-D3mo2s7R.js";import{L as a,g as M}from"./string-DzgjFsUX.js";import{s as E}from"./storybook-logger-DgFpE3wU.js";import"./currency.es-BSkspdt3.js";import{C as F}from"./chevron-down-DdLcFoQ7.js";import{c as b}from"./createLucideIcon-DhaeV68V.js";import"./preload-helper-PPVm8Dsz.js";import"./index-HIqmnw4t.js";import"./index-DRfufKDV.js";import"./index-Cg4mt3GG.js";import"./index-B6rVzEen.js";import"./index-BizkJoHM.js";import"./index-CQLSNwcT.js";import"./index-BaiNJB1C.js";const T=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],V=b("log-out",T);const $=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],q=b("user",$);const R=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]],G=b("wallet",R);var d,l,c,m,u,p,g,h,v,f,x,_,j,y,w,L,N,S,I,k;function J({isPending:A=!1,session:s=null}){const H=async()=>{E.info("Sign out clicked")};return A?e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"size-8 animate-pulse rounded-full bg-muted"})}):s?e.jsxs(W,{openDelay:200,closeDelay:100,children:[e.jsx(B,{asChild:!0,children:e.jsxs(a,{href:"/home",className:"flex items-center gap-2 cursor-pointer",children:[e.jsxs(z,{className:"size-8",children:[e.jsx(C,{src:s.user.image||void 0,alt:s.user.name||"User"}),e.jsx(D,{children:M(s.user.name)})]}),e.jsx("span",{className:"hidden text-sm font-medium md:inline-block",children:"尊敬的用户"}),e.jsx(F,{className:"hidden size-3.5 text-muted-foreground md:inline-block"})]})}),e.jsx(O,{align:"end",className:"w-52 p-2",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsxs("div",{className:"flex items-center gap-3 px-2 py-1.5",children:[e.jsxs(z,{className:"size-10",children:[e.jsx(C,{src:s.user.image||void 0,alt:s.user.name||"User"}),e.jsx(D,{children:M(s.user.name)})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(a,{href:"/home",className:"text-sm font-medium hover:underline cursor-pointer",children:"尊敬的用户"}),e.jsx(P,{className:"w-fit",children:"贵宾"})]})]}),e.jsx(U,{className:"my-1"}),e.jsx(n,{variant:"ghost",size:"sm",asChild:!0,className:"justify-start gap-2",children:e.jsxs(a,{href:"/wallet",children:[e.jsx(G,{className:"size-4"}),"我的钱包"]})}),e.jsx(n,{variant:"ghost",size:"sm",asChild:!0,className:"justify-start gap-2",children:e.jsxs(a,{href:"/home/passengers",children:[e.jsx(q,{className:"size-4"}),"常用信息"]})}),e.jsx(U,{className:"my-1"}),e.jsxs(n,{variant:"ghost",size:"sm",onClick:H,className:"justify-start gap-2",children:[e.jsx(V,{className:"size-4"}),"退出登录"]})]})})]}):e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(n,{variant:"outline",size:"sm",asChild:!0,children:e.jsx(a,{href:"/auth/sign-in",children:"Sign In"})}),e.jsx(n,{variant:"secondary",size:"sm",asChild:!0,children:e.jsx(a,{href:"/auth/sign-up",children:"Sign Up"})})]})}const ge={title:"Common/UserMenu",component:J,parameters:{layout:"centered",docs:{description:{component:"UserMenu component displays user authentication status and provides access to user-related actions. Shows 'Sign In' and 'Sign Up' buttons when not authenticated, or user menu with profile access when authenticated."}}},argTypes:{isPending:{control:"boolean",description:"Loading state while checking session"},session:{control:"object",description:"User session data (null for logged out)"}}},r={args:{isPending:!1,session:null}},o={args:{isPending:!1,session:{user:{id:"user-123",name:"张三",email:"zhangsan@example.com",image:"https://github.com/shadcn.png"}}}},i={args:{isPending:!1,session:{user:{id:"user-456",name:"李四",email:"lisi@example.com"}}}},t={args:{isPending:!0,session:null}};r.parameters={...r.parameters,docs:{...(d=r.parameters)===null||d===void 0?void 0:d.docs,source:{originalSource:`{
  args: {
    isPending: false,
    session: null
  }
}`,...(c=r.parameters)===null||c===void 0||(l=c.docs)===null||l===void 0?void 0:l.source},description:{story:`Default story showing the UserMenu component in not logged in state.
Displays "Sign In" and "Sign Up" buttons.`,...(u=r.parameters)===null||u===void 0||(m=u.docs)===null||m===void 0?void 0:m.description}}};o.parameters={...o.parameters,docs:{...(p=o.parameters)===null||p===void 0?void 0:p.docs,source:{originalSource:`{
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
}`,...(h=o.parameters)===null||h===void 0||(g=h.docs)===null||g===void 0?void 0:g.source},description:{story:`Story showing the UserMenu component when user is logged in.

Features when logged in:
- Displays standardized text "尊敬的用户" (instead of username)
- Shows user avatar with image
- ChevronDown icon indicates dropdown availability
- Click to navigate to /home page
- Hover to view user menu with options (wallet, passenger info, sign out)`,...(f=o.parameters)===null||f===void 0||(v=f.docs)===null||v===void 0?void 0:v.description}}};i.parameters={...i.parameters,docs:{...(x=i.parameters)===null||x===void 0?void 0:x.docs,source:{originalSource:`{
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
}`,...(j=i.parameters)===null||j===void 0||(_=j.docs)===null||_===void 0?void 0:_.source},description:{story:`Story showing the UserMenu component when user is logged in without avatar image.
Shows fallback with user initials (张).`,...(w=i.parameters)===null||w===void 0||(y=w.docs)===null||y===void 0?void 0:y.description}}};t.parameters={...t.parameters,docs:{...(L=t.parameters)===null||L===void 0?void 0:L.docs,source:{originalSource:`{
  args: {
    isPending: true,
    session: null
  }
}`,...(S=t.parameters)===null||S===void 0||(N=S.docs)===null||N===void 0?void 0:N.source},description:{story:`Story showing the UserMenu component in loading state.
Displays a skeleton loader while checking session.`,...(k=t.parameters)===null||k===void 0||(I=k.docs)===null||I===void 0?void 0:I.description}}};const he=["Default","LoggedIn","LoggedInWithoutAvatar","Loading"];export{r as Default,t as Loading,o as LoggedIn,i as LoggedInWithoutAvatar,he as __namedExportsOrder,ge as default};
