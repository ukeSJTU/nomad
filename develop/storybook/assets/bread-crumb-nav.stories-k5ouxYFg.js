import{j as r}from"./iframe-BY6WQ8rl.js";import"./button-Bkd1CeD9.js";import"./hover-card-DuSaEolm.js";import"./separator-D3mo2s7R.js";import"./input-D0mA3Bj2.js";import"./skeleton-DUS3vXvI.js";import"./tooltip-CbFnJ_8M.js";import{B as C}from"./under-construction-BVF9yUhY.js";import"./alert-dialog-C3Xzojz4.js";import"./checkbox-D2fL6kQ1.js";import"./avatar-BhbOdaa6.js";import"./badge-DGHQsNQ9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cg4mt3GG.js";import"./createLucideIcon-DhaeV68V.js";import"./index-HIqmnw4t.js";import"./index-DRfufKDV.js";import"./index-BizkJoHM.js";import"./index-CQLSNwcT.js";import"./index-BaiNJB1C.js";import"./index-B6rVzEen.js";import"./index-jM_4ha9X.js";import"./index-DmZccnKP.js";import"./chevron-right-D2YaEZFP.js";import"./platform-CXbBvqhr.js";import"./alert-Bq9jHRdw.js";import"./card-C2MAT-zL.js";import"./circle-alert-BdeKJeaD.js";import"./circle-x-CqC3SdqK.js";import"./index-D0-zYxe0.js";import"./index-sMO_WrMY.js";import"./check-DNbWv-jy.js";function t(){const f=[{label:"我的携程",href:"/home/info"},{label:"机票订单",href:"/home/orders"},{label:"订单详情"}];return r.jsx(C,{items:f,ariaLabel:"Breadcrumb Navigation"})}t.__docgenInfo={description:`Breadcrumb Navigation Container

Provides breadcrumb navigation for the order details page.
This container is responsible for configuring the breadcrumb items
specific to this page context.

Navigation hierarchy:
- 我的携程 (My Ctrip) -> /home/info
- 机票订单 (Flight Orders) -> /home/orders
- 订单详情 (Order Details) - Current page`,methods:[],displayName:"BreadCrumbNav"};var i,n,s,d,m,p,c,l,u,v,h,_,b,g,x;const rr={title:"Common/BreadCrumbNav",component:t,parameters:{layout:"padded",nextjs:{appDirectory:!0}},tags:["autodocs"]},e={},a={render:()=>r.jsx("div",{className:"max-w-4xl mx-auto p-4 bg-background",children:r.jsx(t,{})})},o={render:()=>r.jsxs("div",{className:"max-w-4xl mx-auto p-4 space-y-4",children:[r.jsx(t,{}),r.jsxs("div",{className:"border rounded-lg p-6 bg-card",children:[r.jsx("h2",{className:"text-2xl font-bold mb-2",children:"订单详情"}),r.jsx("p",{className:"text-muted-foreground",children:"This is how the breadcrumb navigation appears on an actual page."})]})]})};e.parameters={...e.parameters,docs:{...(i=e.parameters)===null||i===void 0?void 0:i.docs,source:{originalSource:"{}",...(s=e.parameters)===null||s===void 0||(n=s.docs)===null||n===void 0?void 0:n.source},description:{story:`Default breadcrumb navigation for the order details page.
Shows the navigation hierarchy: 我的携程 → 机票订单 → 订单详情`,...(m=e.parameters)===null||m===void 0||(d=m.docs)===null||d===void 0?void 0:d.description}}};a.parameters={...a.parameters,docs:{...(p=a.parameters)===null||p===void 0?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="max-w-4xl mx-auto p-4 bg-background">
      <BreadCrumbNav />
    </div>
}`,...(l=a.parameters)===null||l===void 0||(c=l.docs)===null||c===void 0?void 0:c.source},description:{story:"Breadcrumb navigation in a container to show responsive behavior.",...(v=a.parameters)===null||v===void 0||(u=v.docs)===null||u===void 0?void 0:u.description}}};o.parameters={...o.parameters,docs:{...(h=o.parameters)===null||h===void 0?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="max-w-4xl mx-auto p-4 space-y-4">
      <BreadCrumbNav />
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-2xl font-bold mb-2">订单详情</h2>
        <p className="text-muted-foreground">
          This is how the breadcrumb navigation appears on an actual page.
        </p>
      </div>
    </div>
}`,...(b=o.parameters)===null||b===void 0||(_=b.docs)===null||_===void 0?void 0:_.source},description:{story:"Breadcrumb navigation with additional content below to show typical usage.",...(x=o.parameters)===null||x===void 0||(g=x.docs)===null||g===void 0?void 0:g.description}}};const er=["Default","InContainer","WithContent"];export{e as Default,a as InContainer,o as WithContent,er as __namedExportsOrder,rr as default};
