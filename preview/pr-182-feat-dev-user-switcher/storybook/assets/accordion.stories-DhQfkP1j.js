import{j as e}from"./iframe-DI5Oy9RL.js";import{A as n,a as t,b as o,c as r}from"./accordion-Dv7TsDK0.js";import"./preload-helper-PPVm8Dsz.js";import"./index-5SmAaEk-.js";import"./index-D6ROJEKz.js";import"./index-DCU1OT1a.js";import"./index-NM0MU2HX.js";import"./index-IoNmgYKw.js";import"./index-DQyPI5TK.js";import"./index-n-UeRsni.js";import"./index-DFZNd5NJ.js";import"./index-CQaLpz_J.js";import"./index-CAoU1iiv.js";import"./utils-CBfrqCZ4.js";import"./chevron-down-n8MGPeuo.js";import"./createLucideIcon-BhzAdi9T.js";const C={title:"Shadcn/Accordion",component:n,parameters:{layout:"centered"}},i={render:()=>e.jsxs(n,{type:"single",collapsible:!0,className:"w-[400px]",children:[e.jsxs(t,{value:"item-1",children:[e.jsx(o,{children:"Is it accessible?"}),e.jsx(r,{children:"Yes. It adheres to the WAI-ARIA design pattern."})]}),e.jsxs(t,{value:"item-2",children:[e.jsx(o,{children:"Is it styled?"}),e.jsx(r,{children:"Yes. It comes with default styles that matches the other components' aesthetic."})]}),e.jsxs(t,{value:"item-3",children:[e.jsx(o,{children:"Is it animated?"}),e.jsx(r,{children:"Yes. It's animated by default, but you can disable it if you prefer."})]})]})},c={render:()=>e.jsxs(n,{type:"multiple",className:"w-[400px]",children:[e.jsxs(t,{value:"item-1",children:[e.jsx(o,{children:"Can I open multiple items?"}),e.jsx(r,{children:"Yes! This accordion allows multiple items to be open at the same time."})]}),e.jsxs(t,{value:"item-2",children:[e.jsx(o,{children:"How does it work?"}),e.jsx(r,{children:'Set the type prop to "multiple" to enable this behavior.'})]}),e.jsxs(t,{value:"item-3",children:[e.jsx(o,{children:"Is it useful?"}),e.jsx(r,{children:"Absolutely! It's great for FAQs and other content."})]})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes! This accordion allows multiple items to be open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          Set the type prop to "multiple" to enable this behavior.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it useful?</AccordionTrigger>
        <AccordionContent>
          Absolutely! It's great for FAQs and other content.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...c.parameters?.docs?.source}}};const T=["Single","Multiple"];export{c as Multiple,i as Single,T as __namedExportsOrder,C as default};
