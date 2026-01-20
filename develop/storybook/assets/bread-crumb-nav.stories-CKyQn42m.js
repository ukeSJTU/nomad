import{j as r}from"./iframe-CrLPMyef.js";import"./button-C49Jt41H.js";import"./hover-card-BklXiGaj.js";import"./separator-BFZTMdF7.js";import"./input-CBtiA9j3.js";import"./skeleton-CSGTgFG_.js";import"./tooltip-oeX-QRYP.js";import{B as C}from"./under-construction-BTIeiZNS.js";import"./alert-dialog-BDRb33ee.js";import"./checkbox-hlzRasDL.js";import"./avatar-BHA4ec1X.js";import"./badge-DRbaR9p2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CCw5U8u4.js";import"./createLucideIcon-DzaTpkcS.js";import"./index-B2BMd2ZM.js";import"./index-DLC0D_9l.js";import"./index-Bzbtinzm.js";import"./index-3_PNoCtV.js";import"./index-DBYj_96i.js";import"./index-E-CxifyW.js";import"./index-B9BpXIRB.js";import"./index-DCZN-NHZ.js";import"./chevron-right-DL81nGtS.js";import"./platform-DKvuCmmd.js";import"./alert-Dl9eybxG.js";import"./card-D-d6dHIy.js";import"./circle-alert-Dy3v6eT1.js";import"./circle-x-B6KCtiih.js";import"./index-BmOx0rIh.js";import"./index-CXICuE6m.js";import"./check-DD9V9MZB.js";function t(){const f=[{label:"我的携程",href:"/home/info"},{label:"机票订单",href:"/home/orders"},{label:"订单详情"}];return r.jsx(C,{items:f,ariaLabel:"Breadcrumb Navigation"})}t.__docgenInfo={description:`Breadcrumb Navigation Container

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
