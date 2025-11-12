import{r,j as e}from"./iframe-C6PN0adv.js";import{B as a}from"./button-CeKDhKqK.js";import{C as t,a as i,b as p}from"./collapsible-CxJ0sWlx.js";import{c as l}from"./createLucideIcon-D0A0N8Zp.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BxZ90lIY.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./index-cYjyQSDU.js";import"./index-_IhS3Kv-.js";import"./index-C4CdLEf5.js";import"./index-BgUveu0M.js";import"./index-CuWtCAOV.js";import"./index-DBxBwPQf.js";import"./index-CnLYJoF4.js";import"./index-BC4j2cD1.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],d=l("chevrons-up-down",m),D={title:"Shadcn/Collapsible",component:t,parameters:{layout:"centered"}},s={render:()=>{const[n,o]=r.useState(!1);return e.jsxs(t,{open:n,onOpenChange:o,className:"w-[350px] space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between space-x-4 px-4",children:[e.jsx("h4",{className:"text-sm font-semibold",children:"@peduarte starred 3 repositories"}),e.jsx(i,{asChild:!0,children:e.jsxs(a,{variant:"ghost",size:"sm",className:"w-9 p-0",children:[e.jsx(d,{className:"h-4 w-4"}),e.jsx("span",{className:"sr-only",children:"Toggle"})]})})]}),e.jsx("div",{className:"rounded-md border px-4 py-3 font-mono text-sm",children:"@radix-ui/primitives"}),e.jsxs(p,{className:"space-y-2",children:[e.jsx("div",{className:"rounded-md border px-4 py-3 font-mono text-sm",children:"@radix-ui/colors"}),e.jsx("div",{className:"rounded-md border px-4 py-3 font-mono text-sm",children:"@stitches/react"})]})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const I=["Default"];export{s as Default,I as __namedExportsOrder,D as default};
