import{j as n}from"./iframe-CFbJvgXh.js";import{b as h}from"./button-FyAHLo9Z.js";import{c as o}from"./utils-CBfrqCZ4.js";import{C as x}from"./chevron-left-C5saPiNW.js";import{C as f}from"./chevron-right-DsddAH4m.js";import{c as u}from"./createLucideIcon-BoKo6tK7.js";import"./preload-helper-PPVm8Dsz.js";import"./index-e_cDt2xE.js";import"./index-CdJFUDDL.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],I=u("ellipsis",j);function c({className:i,...a}){return n.jsx("nav",{role:"navigation","aria-label":"pagination","data-slot":"pagination",className:o("mx-auto flex w-full justify-center",i),...a})}function l({className:i,...a}){return n.jsx("ul",{"data-slot":"pagination-content",className:o("flex flex-row items-center gap-1",i),...a})}function e({...i}){return n.jsx("li",{"data-slot":"pagination-item",...i})}function t({className:i,isActive:a,size:p="icon",...P}){return n.jsx("a",{"aria-current":a?"page":void 0,"data-slot":"pagination-link","data-active":a,className:o(h({variant:a?"outline":"ghost",size:p}),i),...P})}function d({className:i,...a}){return n.jsxs(t,{"aria-label":"Go to previous page",size:"default",className:o("gap-1 px-2.5 sm:pl-2.5",i),...a,children:[n.jsx(x,{}),n.jsx("span",{className:"hidden sm:block",children:"Previous"})]})}function g({className:i,...a}){return n.jsxs(t,{"aria-label":"Go to next page",size:"default",className:o("gap-1 px-2.5 sm:pr-2.5",i),...a,children:[n.jsx("span",{className:"hidden sm:block",children:"Next"}),n.jsx(f,{})]})}function m({className:i,...a}){return n.jsxs("span",{"aria-hidden":!0,"data-slot":"pagination-ellipsis",className:o("flex size-9 items-center justify-center",i),...a,children:[n.jsx(I,{className:"size-4"}),n.jsx("span",{className:"sr-only",children:"More pages"})]})}c.__docgenInfo={description:"",methods:[],displayName:"Pagination"};l.__docgenInfo={description:"",methods:[],displayName:"PaginationContent"};m.__docgenInfo={description:"",methods:[],displayName:"PaginationEllipsis"};e.__docgenInfo={description:"",methods:[],displayName:"PaginationItem"};t.__docgenInfo={description:"",methods:[],displayName:"PaginationLink",props:{isActive:{required:!1,tsType:{name:"boolean"},description:""},size:{defaultValue:{value:'"icon"',computed:!1},required:!1}}};g.__docgenInfo={description:"",methods:[],displayName:"PaginationNext"};d.__docgenInfo={description:"",methods:[],displayName:"PaginationPrevious"};const z={title:"Shadcn/Pagination",component:c,parameters:{layout:"centered"}},s={render:()=>n.jsx(c,{children:n.jsxs(l,{children:[n.jsx(e,{children:n.jsx(d,{href:"#"})}),n.jsx(e,{children:n.jsx(t,{href:"#",children:"1"})}),n.jsx(e,{children:n.jsx(t,{href:"#",isActive:!0,children:"2"})}),n.jsx(e,{children:n.jsx(t,{href:"#",children:"3"})}),n.jsx(e,{children:n.jsx(g,{href:"#"})})]})})},r={render:()=>n.jsx(c,{children:n.jsxs(l,{children:[n.jsx(e,{children:n.jsx(d,{href:"#"})}),n.jsx(e,{children:n.jsx(t,{href:"#",children:"1"})}),n.jsx(e,{children:n.jsx(t,{href:"#",isActive:!0,children:"2"})}),n.jsx(e,{children:n.jsx(t,{href:"#",children:"3"})}),n.jsx(e,{children:n.jsx(m,{})}),n.jsx(e,{children:n.jsx(t,{href:"#",children:"10"})}),n.jsx(e,{children:n.jsx(g,{href:"#"})})]})})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...r.parameters?.docs?.source}}};const w=["Default","WithEllipsis"];export{s as Default,r as WithEllipsis,w as __namedExportsOrder,z as default};
