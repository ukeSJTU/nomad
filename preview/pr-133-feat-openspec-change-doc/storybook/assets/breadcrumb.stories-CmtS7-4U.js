import{j as r}from"./iframe-DfXeTlor.js";import{S as h}from"./index-nYIAko_1.js";import{c as s}from"./utils-CBfrqCZ4.js";import{C as x}from"./chevron-right-B3iolTbE.js";import{c as j}from"./createLucideIcon-BxDLUm_S.js";import"./preload-helper-PPVm8Dsz.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M22 2 2 22",key:"y4kqgn"}]],p=j("slash",f);function m({...a}){return r.jsx("nav",{"aria-label":"breadcrumb","data-slot":"breadcrumb",...a})}function i({className:a,...n}){return r.jsx("ol",{"data-slot":"breadcrumb-list",className:s("text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",a),...n})}function e({className:a,...n}){return r.jsx("li",{"data-slot":"breadcrumb-item",className:s("inline-flex items-center gap-1.5",a),...n})}function c({asChild:a,className:n,...l}){const B=a?h:"a";return r.jsx(B,{"data-slot":"breadcrumb-link",className:s("hover:text-foreground transition-colors",n),...l})}function b({className:a,...n}){return r.jsx("span",{"data-slot":"breadcrumb-page",role:"link","aria-disabled":"true","aria-current":"page",className:s("text-foreground font-normal",a),...n})}function d({children:a,className:n,...l}){return r.jsx("li",{"data-slot":"breadcrumb-separator",role:"presentation","aria-hidden":"true",className:s("[&>svg]:size-3.5",n),...l,children:a??r.jsx(x,{})})}m.__docgenInfo={description:"",methods:[],displayName:"Breadcrumb"};e.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbItem"};c.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbLink",props:{asChild:{required:!1,tsType:{name:"boolean"},description:""}}};i.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbList"};b.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbPage"};d.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbSeparator"};const C={title:"Shadcn/Breadcrumb",component:m,parameters:{layout:"centered"}},t={render:()=>r.jsx(m,{children:r.jsxs(i,{children:[r.jsx(e,{children:r.jsx(c,{href:"/",children:"Home"})}),r.jsx(d,{}),r.jsx(e,{children:r.jsx(c,{href:"/components",children:"Components"})}),r.jsx(d,{}),r.jsx(e,{children:r.jsx(b,{children:"Breadcrumb"})})]})})},o={render:()=>r.jsx(m,{children:r.jsxs(i,{children:[r.jsx(e,{children:r.jsx(c,{href:"/",children:"Home"})}),r.jsx(d,{children:r.jsx(p,{})}),r.jsx(e,{children:r.jsx(c,{href:"/docs",children:"Docs"})}),r.jsx(d,{children:r.jsx(p,{})}),r.jsx(e,{children:r.jsx(b,{children:"Components"})})]})})},u={render:()=>r.jsx(m,{children:r.jsxs(i,{children:[r.jsx(e,{children:r.jsx(c,{href:"/",children:"Home"})}),r.jsx(d,{}),r.jsx(e,{children:r.jsx(c,{href:"/products",children:"Products"})}),r.jsx(d,{}),r.jsx(e,{children:r.jsx(c,{href:"/products/electronics",children:"Electronics"})}),r.jsx(d,{}),r.jsx(e,{children:r.jsx(c,{href:"/products/electronics/computers",children:"Computers"})}),r.jsx(d,{}),r.jsx(e,{children:r.jsx(b,{children:"Laptops"})})]})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...o.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products/electronics">
            Electronics
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products/electronics/computers">
            Computers
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Laptops</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...u.parameters?.docs?.source}}};const N=["Default","CustomSeparator","Long"];export{o as CustomSeparator,t as Default,u as Long,N as __namedExportsOrder,C as default};
