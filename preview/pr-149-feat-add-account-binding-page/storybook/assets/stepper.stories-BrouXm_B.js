import{j as e,r as A}from"./iframe-C9irGnsO.js";import{S as r}from"./stepper-De123VZx.js";import{B as j}from"./button-BhrFrNdU.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";import"./index-BQy1uiks.js";import"./index-CdJFUDDL.js";const E={title:"Common/Stepper",component:r,parameters:{layout:"centered"},argTypes:{currentStep:{control:{type:"number",min:1,max:5},description:"The current active step (1-based index)"},variant:{control:"select",options:["default","compact"],description:"The visual variant of the stepper"},className:{control:"text",description:"Additional CSS classes"}}},a=[{id:"step-1",label:"Account",description:"Create your account"},{id:"step-2",label:"Profile",description:"Set up your profile"},{id:"step-3",label:"Complete",description:"Finish setup"}],n=[{id:"step-1",label:"Personal Info",description:"Enter your details"},{id:"step-2",label:"Address",description:"Provide your address"},{id:"step-3",label:"Payment",description:"Add payment method"},{id:"step-4",label:"Review",description:"Review and confirm"}],b=[{id:"step-1",label:"Search"},{id:"step-2",label:"Select"},{id:"step-3",label:"Details"},{id:"step-4",label:"Payment"},{id:"step-5",label:"Confirm"}],p={args:{steps:a,currentStep:1,variant:"default"}},c={args:{steps:a,currentStep:2,variant:"default"}},o={args:{steps:a,currentStep:3,variant:"default"}},i={args:{steps:a,currentStep:2,variant:"compact"}},d={args:{steps:a,currentStep:1,variant:"compact"}},m={args:{steps:a,currentStep:3,variant:"compact"}},u={args:{steps:n,currentStep:2,variant:"default"}},l={args:{steps:n,currentStep:3,variant:"compact"}},S={args:{steps:b,currentStep:3,variant:"default"}},v={args:{steps:b,currentStep:4,variant:"compact"}},x={args:{steps:n,currentStep:2,variant:"default"},render:t=>e.jsx("div",{className:"w-[800px]",children:e.jsx(r,{...t})})},h={args:{steps:a,currentStep:2,variant:"compact"},render:t=>e.jsx("div",{className:"w-[400px]",children:e.jsx(r,{...t})})},f={args:{steps:n,currentStep:2,variant:"default"},render:t=>e.jsxs("div",{className:"space-y-8 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 1 - First step"}),e.jsx(r,{...t,currentStep:1})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 2 - In progress"}),e.jsx(r,{...t,currentStep:2})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 3 - Almost done"}),e.jsx(r,{...t,currentStep:3})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 4 - Complete"}),e.jsx(r,{...t,currentStep:4})]})]})},g={args:{steps:n,currentStep:2},render:t=>e.jsxs("div",{className:"space-y-8 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Default Variant"}),e.jsx(r,{...t,variant:"default"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Compact Variant"}),e.jsx(r,{...t,variant:"compact"})]})]})},C={args:{steps:n,currentStep:1,variant:"default"},render:t=>{const[s,N]=A.useState(1),y=()=>{s<t.steps.length&&N(s+1)},w=()=>{s>1&&N(s-1)},F=()=>{N(1)};return e.jsxs("div",{className:"space-y-6 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Interactive Demo - Click buttons to see animation"}),e.jsx(r,{...t,currentStep:s})]}),e.jsxs("div",{className:"flex gap-3 items-center justify-center",children:[e.jsx(j,{onClick:w,disabled:s===1,variant:"outline",children:"Previous"}),e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Step ",s," of ",t.steps.length]}),e.jsx(j,{onClick:y,disabled:s===t.steps.length,children:"Next"}),e.jsx(j,{onClick:F,variant:"secondary",children:"Reset"})]})]})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "default"
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "default"
  }
}`,...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "default"
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact"
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "compact"
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "compact"
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  }
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 3,
    variant: "compact"
  }
}`,...l.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fiveSteps,
    currentStep: 3,
    variant: "default"
  }
}`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fiveSteps,
    currentStep: 4,
    variant: "compact"
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  },
  render: args => <div className="w-[800px]">
      <Stepper {...args} />
    </div>
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact"
  },
  render: args => <div className="w-[400px]">
      <Stepper {...args} />
    </div>
}`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};const L=["Default","SecondStep","LastStep","Compact","CompactFirstStep","CompactLastStep","FourSteps","FourStepsCompact","FiveStepsNoDescription","FiveStepsCompact","WideContainer","NarrowContainer","AllStates","VariantComparison","InteractiveAnimation"];export{f as AllStates,i as Compact,d as CompactFirstStep,m as CompactLastStep,p as Default,v as FiveStepsCompact,S as FiveStepsNoDescription,u as FourSteps,l as FourStepsCompact,C as InteractiveAnimation,o as LastStep,h as NarrowContainer,c as SecondStep,g as VariantComparison,x as WideContainer,L as __namedExportsOrder,E as default};
