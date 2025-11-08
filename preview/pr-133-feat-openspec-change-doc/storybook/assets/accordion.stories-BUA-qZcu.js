import{R as d,j as e}from"./iframe-DfXeTlor.js";import{c as te}from"./index-holT3doW.js";import{c as re,u as ne}from"./index-CujZnIrr.js";import{u as ce}from"./index-nYIAko_1.js";import{u as K,c as ie}from"./index-UijIDetG.js";import{P as $}from"./index-mo40_67N.js";import{c as z,R as se,T as ae,C as de}from"./index-DGWpb3Rm.js";import{u as le}from"./index-BjgmQGaV.js";import{c as M}from"./utils-CBfrqCZ4.js";import{C as me}from"./chevron-down-D0U5nNxJ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DvFpvr8L.js";import"./index-BBmfN-K1.js";import"./index-9AqQcbbn.js";import"./createLucideIcon-BxDLUm_S.js";var l="Accordion",pe=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[O,ue,Ae]=re(l),[y]=te(l,[Ae,z]),H=z(),L=d.forwardRef((o,n)=>{const{type:t,...c}=o,i=c,r=c;return e.jsx(O.Provider,{scope:o.__scopeAccordion,children:t==="multiple"?e.jsx(xe,{...r,ref:n}):e.jsx(ge,{...i,ref:n})})});L.displayName=l;var[F,fe]=y(l),[G,he]=y(l,{collapsible:!1}),ge=d.forwardRef((o,n)=>{const{value:t,defaultValue:c,onValueChange:i=()=>{},collapsible:r=!1,...a}=o,[s,m]=K({prop:t,defaultProp:c??"",onChange:i,caller:l});return e.jsx(F,{scope:o.__scopeAccordion,value:d.useMemo(()=>s?[s]:[],[s]),onItemOpen:m,onItemClose:d.useCallback(()=>r&&m(""),[r,m]),children:e.jsx(G,{scope:o.__scopeAccordion,collapsible:r,children:e.jsx(Q,{...a,ref:n})})})}),xe=d.forwardRef((o,n)=>{const{value:t,defaultValue:c,onValueChange:i=()=>{},...r}=o,[a,s]=K({prop:t,defaultProp:c??[],onChange:i,caller:l}),m=d.useCallback(f=>s((u=[])=>[...u,f]),[s]),A=d.useCallback(f=>s((u=[])=>u.filter(N=>N!==f)),[s]);return e.jsx(F,{scope:o.__scopeAccordion,value:a,onItemOpen:m,onItemClose:A,children:e.jsx(G,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(Q,{...r,ref:n})})})}),[ve,w]=y(l),Q=d.forwardRef((o,n)=>{const{__scopeAccordion:t,disabled:c,dir:i,orientation:r="vertical",...a}=o,s=d.useRef(null),m=ce(s,n),A=ue(t),u=ne(i)==="ltr",N=ie(o.onKeyDown,v=>{if(!pe.includes(v.key))return;const ee=v.target,R=A().filter(k=>!k.ref.current?.disabled),I=R.findIndex(k=>k.ref.current===ee),V=R.length;if(I===-1)return;v.preventDefault();let p=I;const T=0,P=V-1,S=()=>{p=I+1,p>P&&(p=T)},E=()=>{p=I-1,p<T&&(p=P)};switch(v.key){case"Home":p=T;break;case"End":p=P;break;case"ArrowRight":r==="horizontal"&&(u?S():E());break;case"ArrowDown":r==="vertical"&&S();break;case"ArrowLeft":r==="horizontal"&&(u?E():S());break;case"ArrowUp":r==="vertical"&&E();break}const oe=p%V;R[oe].ref.current?.focus()});return e.jsx(ve,{scope:t,disabled:c,direction:i,orientation:r,children:e.jsx(O.Slot,{scope:t,children:e.jsx($.div,{...a,"data-orientation":r,ref:m,onKeyDown:c?void 0:N})})})}),j="AccordionItem",[Ie,Y]=y(j),U=d.forwardRef((o,n)=>{const{__scopeAccordion:t,value:c,...i}=o,r=w(j,t),a=fe(j,t),s=H(t),m=le(),A=c&&a.value.includes(c)||!1,f=r.disabled||o.disabled;return e.jsx(Ie,{scope:t,open:A,disabled:f,triggerId:m,children:e.jsx(se,{"data-orientation":r.orientation,"data-state":Z(A),...s,...i,ref:n,disabled:f,open:A,onOpenChange:u=>{u?a.onItemOpen(c):a.onItemClose(c)}})})});U.displayName=j;var W="AccordionHeader",q=d.forwardRef((o,n)=>{const{__scopeAccordion:t,...c}=o,i=w(l,t),r=Y(W,t);return e.jsx($.h3,{"data-orientation":i.orientation,"data-state":Z(r.open),"data-disabled":r.disabled?"":void 0,...c,ref:n})});q.displayName=W;var D="AccordionTrigger",B=d.forwardRef((o,n)=>{const{__scopeAccordion:t,...c}=o,i=w(l,t),r=Y(D,t),a=he(D,t),s=H(t);return e.jsx(O.ItemSlot,{scope:t,children:e.jsx(ae,{"aria-disabled":r.open&&!a.collapsible||void 0,"data-orientation":i.orientation,id:r.triggerId,...s,...c,ref:n})})});B.displayName=D;var J="AccordionContent",X=d.forwardRef((o,n)=>{const{__scopeAccordion:t,...c}=o,i=w(l,t),r=Y(J,t),a=H(t);return e.jsx(de,{role:"region","aria-labelledby":r.triggerId,"data-orientation":i.orientation,...a,...c,ref:n,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});X.displayName=J;function Z(o){return o?"open":"closed"}var Ce=L,be=U,je=q,ye=B,we=X;function _({...o}){return e.jsx(Ce,{"data-slot":"accordion",...o})}function h({className:o,...n}){return e.jsx(be,{"data-slot":"accordion-item",className:M("border-b last:border-b-0",o),...n})}function g({className:o,children:n,...t}){return e.jsx(je,{className:"flex",children:e.jsxs(ye,{"data-slot":"accordion-trigger",className:M("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",o),...t,children:[n,e.jsx(me,{className:"text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"})]})})}function x({className:o,children:n,...t}){return e.jsx(we,{"data-slot":"accordion-content",className:"data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",...t,children:e.jsx("div",{className:M("pt-0 pb-4",o),children:n})})}_.__docgenInfo={description:"",methods:[],displayName:"Accordion"};x.__docgenInfo={description:"",methods:[],displayName:"AccordionContent"};h.__docgenInfo={description:"",methods:[],displayName:"AccordionItem"};g.__docgenInfo={description:"",methods:[],displayName:"AccordionTrigger"};const $e={title:"Shadcn/Accordion",component:_,parameters:{layout:"centered"}},C={render:()=>e.jsxs(_,{type:"single",collapsible:!0,className:"w-[400px]",children:[e.jsxs(h,{value:"item-1",children:[e.jsx(g,{children:"Is it accessible?"}),e.jsx(x,{children:"Yes. It adheres to the WAI-ARIA design pattern."})]}),e.jsxs(h,{value:"item-2",children:[e.jsx(g,{children:"Is it styled?"}),e.jsx(x,{children:"Yes. It comes with default styles that matches the other components' aesthetic."})]}),e.jsxs(h,{value:"item-3",children:[e.jsx(g,{children:"Is it animated?"}),e.jsx(x,{children:"Yes. It's animated by default, but you can disable it if you prefer."})]})]})},b={render:()=>e.jsxs(_,{type:"multiple",className:"w-[400px]",children:[e.jsxs(h,{value:"item-1",children:[e.jsx(g,{children:"Can I open multiple items?"}),e.jsx(x,{children:"Yes! This accordion allows multiple items to be open at the same time."})]}),e.jsxs(h,{value:"item-2",children:[e.jsx(g,{children:"How does it work?"}),e.jsx(x,{children:'Set the type prop to "multiple" to enable this behavior.'})]}),e.jsxs(h,{value:"item-3",children:[e.jsx(g,{children:"Is it useful?"}),e.jsx(x,{children:"Absolutely! It's great for FAQs and other content."})]})]})};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};const ze=["Single","Multiple"];export{b as Multiple,C as Single,ze as __namedExportsOrder,$e as default};
