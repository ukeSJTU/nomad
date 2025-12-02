import{r as B,j as e}from"./iframe-BHY9H4ht.js";import{c as m}from"./utils-CBfrqCZ4.js";import{B as P}from"./button-DoWZ3ZEL.js";import"./preload-helper-PPVm8Dsz.js";import"./index-yS4Ssq8c.js";import"./index-CdJFUDDL.js";const s=B.forwardRef(({steps:t,currentStep:r,className:c,variant:A="default",...R},k)=>e.jsx("div",{ref:k,className:m("w-full",c),...R,children:e.jsx("div",{className:"flex items-start justify-between",children:t.map((p,D)=>{const o=D+1,d=o===r,i=o<r,T=D===t.length-1;return e.jsxs(B.Fragment,{children:[e.jsxs("div",{className:"flex flex-col items-center relative",children:[e.jsx("div",{className:m("flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 z-10",{"border-primary bg-primary text-primary-foreground":i,"border-primary bg-primary text-primary-foreground ring-4 ring-primary/20":d,"border-muted-foreground/40 bg-background text-muted-foreground":!d&&!i}),children:i?e.jsx("svg",{className:"w-4 h-4 shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})}):e.jsx("span",{className:"text-sm font-medium leading-none",children:o})}),e.jsxs("div",{className:"mt-2 text-center",children:[e.jsx("div",{className:m("text-sm font-medium transition-colors",{"text-primary":d||i,"text-muted-foreground":!d&&!i}),children:p.label}),A==="default"&&p.description&&e.jsx("div",{className:"text-xs text-muted-foreground/80 mt-1 font-normal",children:p.description})]})]}),!T&&e.jsx("div",{className:"flex-1 mx-4 flex items-center h-8",children:e.jsx("div",{className:"relative w-full h-0.5 bg-muted-foreground/40 overflow-hidden",children:e.jsx("div",{className:m("absolute inset-0 transition-all duration-350 ease-in-out",{"w-full bg-primary":o<r,"w-0 bg-primary":o>=r})})})})]},p.id)})})}));s.displayName="Stepper";s.__docgenInfo={description:"",methods:[],displayName:"Stepper",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"StepperStep"}],raw:"StepperStep[]"},description:""},currentStep:{required:!0,tsType:{name:"number"},description:""},className:{required:!1,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:'"default" | "compact"',elements:[{name:"literal",value:'"default"'},{name:"literal",value:'"compact"'}]},description:"",defaultValue:{value:'"default"',computed:!1}}}};const W={title:"Common/Stepper",component:s,parameters:{layout:"centered"},argTypes:{currentStep:{control:{type:"number",min:1,max:5},description:"The current active step (1-based index)"},variant:{control:"select",options:["default","compact"],description:"The visual variant of the stepper"},className:{control:"text",description:"Additional CSS classes"}}},a=[{id:"step-1",label:"Account",description:"Create your account"},{id:"step-2",label:"Profile",description:"Set up your profile"},{id:"step-3",label:"Complete",description:"Finish setup"}],n=[{id:"step-1",label:"Personal Info",description:"Enter your details"},{id:"step-2",label:"Address",description:"Provide your address"},{id:"step-3",label:"Payment",description:"Add payment method"},{id:"step-4",label:"Review",description:"Review and confirm"}],I=[{id:"step-1",label:"Search"},{id:"step-2",label:"Select"},{id:"step-3",label:"Details"},{id:"step-4",label:"Payment"},{id:"step-5",label:"Confirm"}],l={args:{steps:a,currentStep:1,variant:"default"}},u={args:{steps:a,currentStep:2,variant:"default"}},S={args:{steps:a,currentStep:3,variant:"default"}},v={args:{steps:a,currentStep:2,variant:"compact"}},x={args:{steps:a,currentStep:1,variant:"compact"}},f={args:{steps:a,currentStep:3,variant:"compact"}},h={args:{steps:n,currentStep:2,variant:"default"}},g={args:{steps:n,currentStep:3,variant:"compact"}},N={args:{steps:I,currentStep:3,variant:"default"}},j={args:{steps:I,currentStep:4,variant:"compact"}},b={args:{steps:n,currentStep:2,variant:"default"},render:t=>e.jsx("div",{className:"w-[800px]",children:e.jsx(s,{...t})})},C={args:{steps:a,currentStep:2,variant:"compact"},render:t=>e.jsx("div",{className:"w-[400px]",children:e.jsx(s,{...t})})},y={args:{steps:n,currentStep:2,variant:"default"},render:t=>e.jsxs("div",{className:"space-y-8 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 1 - First step"}),e.jsx(s,{...t,currentStep:1})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 2 - In progress"}),e.jsx(s,{...t,currentStep:2})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 3 - Almost done"}),e.jsx(s,{...t,currentStep:3})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 4 - Complete"}),e.jsx(s,{...t,currentStep:4})]})]})},w={args:{steps:n,currentStep:2},render:t=>e.jsxs("div",{className:"space-y-8 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Default Variant"}),e.jsx(s,{...t,variant:"default"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Compact Variant"}),e.jsx(s,{...t,variant:"compact"})]})]})},F={args:{steps:n,currentStep:1,variant:"default"},render:t=>{const[r,c]=B.useState(1),A=()=>{r<t.steps.length&&c(r+1)},R=()=>{r>1&&c(r-1)},k=()=>{c(1)};return e.jsxs("div",{className:"space-y-6 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Interactive Demo - Click buttons to see animation"}),e.jsx(s,{...t,currentStep:r})]}),e.jsxs("div",{className:"flex gap-3 items-center justify-center",children:[e.jsx(P,{onClick:R,disabled:r===1,variant:"outline",children:"Previous"}),e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Step ",r," of ",t.steps.length]}),e.jsx(P,{onClick:A,disabled:r===t.steps.length,children:"Next"}),e.jsx(P,{onClick:k,variant:"secondary",children:"Reset"})]})]})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "default"
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "default"
  }
}`,...u.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "default"
  }
}`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact"
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "compact"
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "compact"
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 3,
    variant: "compact"
  }
}`,...g.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fiveSteps,
    currentStep: 3,
    variant: "default"
  }
}`,...N.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fiveSteps,
    currentStep: 4,
    variant: "compact"
  }
}`,...j.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  },
  render: args => <div className="w-[800px]">
      <Stepper {...args} />
    </div>
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact"
  },
  render: args => <div className="w-[400px]">
      <Stepper {...args} />
    </div>
}`,...C.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}};const M=["Default","SecondStep","LastStep","Compact","CompactFirstStep","CompactLastStep","FourSteps","FourStepsCompact","FiveStepsNoDescription","FiveStepsCompact","WideContainer","NarrowContainer","AllStates","VariantComparison","InteractiveAnimation"];export{y as AllStates,v as Compact,x as CompactFirstStep,f as CompactLastStep,l as Default,j as FiveStepsCompact,N as FiveStepsNoDescription,h as FourSteps,g as FourStepsCompact,F as InteractiveAnimation,S as LastStep,C as NarrowContainer,u as SecondStep,w as VariantComparison,b as WideContainer,M as __namedExportsOrder,W as default};
