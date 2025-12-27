import{r as Ne,j as e}from"./iframe-vM1xkXS8.js";import{c as l}from"./utils-CDN07tui.js";import{B as L}from"./button-C4LX52gm.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CHcTPGVs.js";import"./index-B_jtOnfb.js";const s=Ne.forwardRef(({steps:t,currentStep:r,className:o,variant:F="default",...A},D)=>e.jsx("div",{ref:D,className:l("w-full",o),...A,children:e.jsx("div",{className:"flex items-start justify-between",children:t.map((c,je)=>{const i=je+1,d=i===r,p=i<r,ye=je===t.length-1;return e.jsxs(Ne.Fragment,{children:[e.jsxs("div",{className:"flex flex-col items-center relative",children:[e.jsx("div",{className:l("flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 z-10",{"border-primary bg-primary text-primary-foreground":p,"border-primary bg-primary text-primary-foreground ring-4 ring-primary/20":d,"border-muted-foreground/40 bg-background text-muted-foreground":!d&&!p}),children:p?e.jsx("svg",{className:"w-4 h-4 shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})}):e.jsx("span",{className:"text-sm font-medium leading-none",children:i})}),e.jsxs("div",{className:"mt-2 text-center",children:[e.jsx("div",{className:l("text-sm font-medium transition-colors",{"text-primary":d||p,"text-muted-foreground":!d&&!p}),children:c.label}),F==="default"&&c.description&&e.jsx("div",{className:"text-xs text-muted-foreground/80 mt-1 font-normal",children:c.description})]})]}),!ye&&e.jsx("div",{className:"flex-1 mx-4 flex items-center h-8",children:e.jsx("div",{className:"relative w-full h-0.5 bg-muted-foreground/40 overflow-hidden",children:e.jsx("div",{className:l("absolute inset-0 transition-all duration-350 ease-in-out",{"w-full bg-primary":i<r,"w-0 bg-primary":i>=r})})})})]},c.id)})})}));s.displayName="Stepper";s.__docgenInfo={description:"",methods:[],displayName:"Stepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"StepperStep"}],raw:"StepperStep[]"},description:""},currentStep:{required:!0,tsType:{name:"number"},description:""},className:{required:!1,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "compact"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"compact"'}]},description:"",defaultValue:{value:'"default"',computed:!1}}}};var I,R,k,P,V,B,T,W,q,E,z,M,O,G,H,J,K,Q,U,X,Y,Z,$,ee,te,re,se,ae,ne,oe,ie,pe,ce,de,le,me,ue,ve,Se,fe,_e,xe,he,ge,Ce;const Re={title:"Common/Stepper",component:s,parameters:{layout:"centered"},argTypes:{currentStep:{control:{type:"number",min:1,max:5},description:"The current active step (1-based index)"},variant:{control:"select",options:["default","compact"],description:"The visual variant of the stepper"},className:{control:"text",description:"Additional CSS classes"}}},a=[{id:"step-1",label:"Account",description:"Create your account"},{id:"step-2",label:"Profile",description:"Set up your profile"},{id:"step-3",label:"Complete",description:"Finish setup"}],n=[{id:"step-1",label:"Personal Info",description:"Enter your details"},{id:"step-2",label:"Address",description:"Provide your address"},{id:"step-3",label:"Payment",description:"Add payment method"},{id:"step-4",label:"Review",description:"Review and confirm"}],be=[{id:"step-1",label:"Search"},{id:"step-2",label:"Select"},{id:"step-3",label:"Details"},{id:"step-4",label:"Payment"},{id:"step-5",label:"Confirm"}],m={args:{steps:a,currentStep:1,variant:"default"}},u={args:{steps:a,currentStep:2,variant:"default"}},v={args:{steps:a,currentStep:3,variant:"default"}},S={args:{steps:a,currentStep:2,variant:"compact"}},f={args:{steps:a,currentStep:1,variant:"compact"}},_={args:{steps:a,currentStep:3,variant:"compact"}},x={args:{steps:n,currentStep:2,variant:"default"}},h={args:{steps:n,currentStep:3,variant:"compact"}},g={args:{steps:be,currentStep:3,variant:"default"}},C={args:{steps:be,currentStep:4,variant:"compact"}},N={args:{steps:n,currentStep:2,variant:"default"},render:t=>e.jsx("div",{className:"w-[800px]",children:e.jsx(s,{...t})})},j={args:{steps:a,currentStep:2,variant:"compact"},render:t=>e.jsx("div",{className:"w-[400px]",children:e.jsx(s,{...t})})},b={args:{steps:n,currentStep:2,variant:"default"},render:t=>e.jsxs("div",{className:"space-y-8 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 1 - First step"}),e.jsx(s,{...t,currentStep:1})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 2 - In progress"}),e.jsx(s,{...t,currentStep:2})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 3 - Almost done"}),e.jsx(s,{...t,currentStep:3})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 4 - Complete"}),e.jsx(s,{...t,currentStep:4})]})]})},y={args:{steps:n,currentStep:2},render:t=>e.jsxs("div",{className:"space-y-8 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Default Variant"}),e.jsx(s,{...t,variant:"default"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Compact Variant"}),e.jsx(s,{...t,variant:"compact"})]})]})},w={args:{steps:n,currentStep:1,variant:"default"},render:t=>{const[r,o]=Ne.useState(1),F=()=>{r<t.steps.length&&o(r+1)},A=()=>{r>1&&o(r-1)},D=()=>{o(1)};return e.jsxs("div",{className:"space-y-6 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Interactive Demo - Click buttons to see animation"}),e.jsx(s,{...t,currentStep:r})]}),e.jsxs("div",{className:"flex gap-3 items-center justify-center",children:[e.jsx(L,{onClick:A,disabled:r===1,variant:"outline",children:"Previous"}),e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Step ",r," of ",t.steps.length]}),e.jsx(L,{onClick:F,disabled:r===t.steps.length,children:"Next"}),e.jsx(L,{onClick:D,variant:"secondary",children:"Reset"})]})]})}};m.parameters={...m.parameters,docs:{...(I=m.parameters)===null||I===void 0?void 0:I.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "default"
  }
}`,...(k=m.parameters)===null||k===void 0||(R=k.docs)===null||R===void 0?void 0:R.source}}};u.parameters={...u.parameters,docs:{...(P=u.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "default"
  }
}`,...(B=u.parameters)===null||B===void 0||(V=B.docs)===null||V===void 0?void 0:V.source}}};v.parameters={...v.parameters,docs:{...(T=v.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "default"
  }
}`,...(q=v.parameters)===null||q===void 0||(W=q.docs)===null||W===void 0?void 0:W.source}}};S.parameters={...S.parameters,docs:{...(E=S.parameters)===null||E===void 0?void 0:E.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact"
  }
}`,...(M=S.parameters)===null||M===void 0||(z=M.docs)===null||z===void 0?void 0:z.source}}};f.parameters={...f.parameters,docs:{...(O=f.parameters)===null||O===void 0?void 0:O.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "compact"
  }
}`,...(H=f.parameters)===null||H===void 0||(G=H.docs)===null||G===void 0?void 0:G.source}}};_.parameters={..._.parameters,docs:{...(J=_.parameters)===null||J===void 0?void 0:J.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "compact"
  }
}`,...(Q=_.parameters)===null||Q===void 0||(K=Q.docs)===null||K===void 0?void 0:K.source}}};x.parameters={...x.parameters,docs:{...(U=x.parameters)===null||U===void 0?void 0:U.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  }
}`,...(Y=x.parameters)===null||Y===void 0||(X=Y.docs)===null||X===void 0?void 0:X.source}}};h.parameters={...h.parameters,docs:{...(Z=h.parameters)===null||Z===void 0?void 0:Z.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 3,
    variant: "compact"
  }
}`,...(ee=h.parameters)===null||ee===void 0||($=ee.docs)===null||$===void 0?void 0:$.source}}};g.parameters={...g.parameters,docs:{...(te=g.parameters)===null||te===void 0?void 0:te.docs,source:{originalSource:`{
  args: {
    steps: fiveSteps,
    currentStep: 3,
    variant: "default"
  }
}`,...(se=g.parameters)===null||se===void 0||(re=se.docs)===null||re===void 0?void 0:re.source}}};C.parameters={...C.parameters,docs:{...(ae=C.parameters)===null||ae===void 0?void 0:ae.docs,source:{originalSource:`{
  args: {
    steps: fiveSteps,
    currentStep: 4,
    variant: "compact"
  }
}`,...(oe=C.parameters)===null||oe===void 0||(ne=oe.docs)===null||ne===void 0?void 0:ne.source}}};N.parameters={...N.parameters,docs:{...(ie=N.parameters)===null||ie===void 0?void 0:ie.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  },
  render: args => <div className="w-[800px]">
      <Stepper {...args} />
    </div>
}`,...(ce=N.parameters)===null||ce===void 0||(pe=ce.docs)===null||pe===void 0?void 0:pe.source}}};j.parameters={...j.parameters,docs:{...(de=j.parameters)===null||de===void 0?void 0:de.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact"
  },
  render: args => <div className="w-[400px]">
      <Stepper {...args} />
    </div>
}`,...(me=j.parameters)===null||me===void 0||(le=me.docs)===null||le===void 0?void 0:le.source}}};b.parameters={...b.parameters,docs:{...(ue=b.parameters)===null||ue===void 0?void 0:ue.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  },
  render: args => <div className="space-y-8 w-[800px]">
      <div>
        <h3 className="text-sm font-medium mb-4">Step 1 - First step</h3>
        <Stepper {...args} currentStep={1} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Step 2 - In progress</h3>
        <Stepper {...args} currentStep={2} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Step 3 - Almost done</h3>
        <Stepper {...args} currentStep={3} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Step 4 - Complete</h3>
        <Stepper {...args} currentStep={4} />
      </div>
    </div>
}`,...(Se=b.parameters)===null||Se===void 0||(ve=Se.docs)===null||ve===void 0?void 0:ve.source}}};y.parameters={...y.parameters,docs:{...(fe=y.parameters)===null||fe===void 0?void 0:fe.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2
  },
  render: args => <div className="space-y-8 w-[800px]">
      <div>
        <h3 className="text-sm font-medium mb-4">Default Variant</h3>
        <Stepper {...args} variant="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Compact Variant</h3>
        <Stepper {...args} variant="compact" />
      </div>
    </div>
}`,...(xe=y.parameters)===null||xe===void 0||(_e=xe.docs)===null||_e===void 0?void 0:_e.source}}};w.parameters={...w.parameters,docs:{...(he=w.parameters)===null||he===void 0?void 0:he.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 1,
    variant: "default"
  },
  render: args => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleNext = () => {
      if (currentStep < args.steps.length) {
        setCurrentStep(currentStep + 1);
      }
    };
    const handlePrevious = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };
    const handleReset = () => {
      setCurrentStep(1);
    };
    return <div className="space-y-6 w-[800px]">
        <div>
          <h3 className="text-sm font-medium mb-4">
            Interactive Demo - Click buttons to see animation
          </h3>
          <Stepper {...args} currentStep={currentStep} />
        </div>

        <div className="flex gap-3 items-center justify-center">
          <Button onClick={handlePrevious} disabled={currentStep === 1} variant="outline">
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {args.steps.length}
          </span>
          <Button onClick={handleNext} disabled={currentStep === args.steps.length}>
            Next
          </Button>
          <Button onClick={handleReset} variant="secondary">
            Reset
          </Button>
        </div>
      </div>;
  }
}`,...(Ce=w.parameters)===null||Ce===void 0||(ge=Ce.docs)===null||ge===void 0?void 0:ge.source}}};const ke=["Default","SecondStep","LastStep","Compact","CompactFirstStep","CompactLastStep","FourSteps","FourStepsCompact","FiveStepsNoDescription","FiveStepsCompact","WideContainer","NarrowContainer","AllStates","VariantComparison","InteractiveAnimation"];export{b as AllStates,S as Compact,f as CompactFirstStep,_ as CompactLastStep,m as Default,C as FiveStepsCompact,g as FiveStepsNoDescription,x as FourSteps,h as FourStepsCompact,w as InteractiveAnimation,v as LastStep,j as NarrowContainer,u as SecondStep,y as VariantComparison,N as WideContainer,ke as __namedExportsOrder,Re as default};
