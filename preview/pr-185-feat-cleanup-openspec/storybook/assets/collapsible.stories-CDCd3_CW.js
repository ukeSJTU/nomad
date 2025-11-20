import{j as e,r as i}from"./iframe-BH7aeb89.js";import{B as l}from"./button-reTbs1c1.js";import{R as p,a as d,b as m}from"./index-CRy6Bd47.js";import{c}from"./createLucideIcon-C7RxPt7J.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B6zyZfym.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./index-BDEDCb8l.js";import"./index-DGQpXj_O.js";import"./index-B8FmrOkk.js";import"./index-rfJbia-g.js";import"./index-B4LoADOl.js";import"./index-Be60dqzC.js";import"./index-D69ldn1F.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],u=c("chevrons-up-down",x);function t({...s}){return e.jsx(p,{"data-slot":"collapsible",...s})}function n({...s}){return e.jsx(d,{"data-slot":"collapsible-trigger",...s})}function a({...s}){return e.jsx(m,{"data-slot":"collapsible-content",...s})}t.__docgenInfo={description:"",methods:[],displayName:"Collapsible"};a.__docgenInfo={description:"",methods:[],displayName:"CollapsibleContent"};n.__docgenInfo={description:"",methods:[],displayName:"CollapsibleTrigger"};const D={title:"Shadcn/Collapsible",component:t,parameters:{layout:"centered"}},o={render:()=>{const[s,r]=i.useState(!1);return e.jsxs(t,{open:s,onOpenChange:r,className:"w-[350px] space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between space-x-4 px-4",children:[e.jsx("h4",{className:"text-sm font-semibold",children:"@peduarte starred 3 repositories"}),e.jsx(n,{asChild:!0,children:e.jsxs(l,{variant:"ghost",size:"sm",className:"w-9 p-0",children:[e.jsx(u,{className:"h-4 w-4"}),e.jsx("span",{className:"sr-only",children:"Toggle"})]})})]}),e.jsx("div",{className:"rounded-md border px-4 py-3 font-mono text-sm",children:"@radix-ui/primitives"}),e.jsxs(a,{className:"space-y-2",children:[e.jsx("div",{className:"rounded-md border px-4 py-3 font-mono text-sm",children:"@radix-ui/colors"}),e.jsx("div",{className:"rounded-md border px-4 py-3 font-mono text-sm",children:"@stitches/react"})]})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>;
  }
}`,...o.parameters?.docs?.source}}};const S=["Default"];export{o as Default,S as __namedExportsOrder,D as default};
