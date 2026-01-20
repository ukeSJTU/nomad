import{j as e,r as he}from"./iframe-BY6WQ8rl.js";import{B as N}from"./button-Bkd1CeD9.js";import"./hover-card-DuSaEolm.js";import"./separator-D3mo2s7R.js";import"./input-D0mA3Bj2.js";import"./skeleton-DUS3vXvI.js";import"./tooltip-CbFnJ_8M.js";import{S as r}from"./under-construction-BVF9yUhY.js";import"./alert-dialog-C3Xzojz4.js";import"./checkbox-D2fL6kQ1.js";import"./avatar-BhbOdaa6.js";import"./badge-DGHQsNQ9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cg4mt3GG.js";import"./createLucideIcon-DhaeV68V.js";import"./index-HIqmnw4t.js";import"./index-DRfufKDV.js";import"./index-BizkJoHM.js";import"./index-CQLSNwcT.js";import"./index-BaiNJB1C.js";import"./index-B6rVzEen.js";import"./index-jM_4ha9X.js";import"./index-DmZccnKP.js";import"./chevron-right-D2YaEZFP.js";import"./platform-CXbBvqhr.js";import"./alert-Bq9jHRdw.js";import"./card-C2MAT-zL.js";import"./circle-alert-BdeKJeaD.js";import"./circle-x-CqC3SdqK.js";import"./index-D0-zYxe0.js";import"./index-sMO_WrMY.js";import"./check-DNbWv-jy.js";var j,b,F,y,w,A,D,I,L,P,V,k,B,R,W,E,T,O,q,z,G,H,J,K,M,Q,U,X,Y,Z,$,ee,te,re,se,ae,ne,oe,pe,ie,ce,de,me,le,ue;const Ye={title:"Common/Stepper",component:r,parameters:{layout:"centered"},argTypes:{currentStep:{control:{type:"number",min:1,max:5},description:"The current active step (1-based index)"},variant:{control:"select",options:["default","compact"],description:"The visual variant of the stepper"},className:{control:"text",description:"Additional CSS classes"}}},a=[{id:"step-1",label:"Account",description:"Create your account"},{id:"step-2",label:"Profile",description:"Set up your profile"},{id:"step-3",label:"Complete",description:"Finish setup"}],n=[{id:"step-1",label:"Personal Info",description:"Enter your details"},{id:"step-2",label:"Address",description:"Provide your address"},{id:"step-3",label:"Payment",description:"Add payment method"},{id:"step-4",label:"Review",description:"Review and confirm"}],ve=[{id:"step-1",label:"Search"},{id:"step-2",label:"Select"},{id:"step-3",label:"Details"},{id:"step-4",label:"Payment"},{id:"step-5",label:"Confirm"}],o={args:{steps:a,currentStep:1,variant:"default"}},p={args:{steps:a,currentStep:2,variant:"default"}},i={args:{steps:a,currentStep:3,variant:"default"}},c={args:{steps:a,currentStep:2,variant:"compact"}},d={args:{steps:a,currentStep:1,variant:"compact"}},m={args:{steps:a,currentStep:3,variant:"compact"}},l={args:{steps:n,currentStep:2,variant:"default"}},u={args:{steps:n,currentStep:3,variant:"compact"}},v={args:{steps:ve,currentStep:3,variant:"default"}},S={args:{steps:ve,currentStep:4,variant:"compact"}},_={args:{steps:n,currentStep:2,variant:"default"},render:t=>e.jsx("div",{className:"w-[800px]",children:e.jsx(r,{...t})})},x={args:{steps:a,currentStep:2,variant:"compact"},render:t=>e.jsx("div",{className:"w-[400px]",children:e.jsx(r,{...t})})},h={args:{steps:n,currentStep:2,variant:"default"},render:t=>e.jsxs("div",{className:"space-y-8 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 1 - First step"}),e.jsx(r,{...t,currentStep:1})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 2 - In progress"}),e.jsx(r,{...t,currentStep:2})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 3 - Almost done"}),e.jsx(r,{...t,currentStep:3})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Step 4 - Complete"}),e.jsx(r,{...t,currentStep:4})]})]})},f={args:{steps:n,currentStep:2},render:t=>e.jsxs("div",{className:"space-y-8 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Default Variant"}),e.jsx(r,{...t,variant:"default"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Compact Variant"}),e.jsx(r,{...t,variant:"compact"})]})]})},g={args:{steps:n,currentStep:1,variant:"default"},render:t=>{const[s,C]=he.useState(1),Se=()=>{s<t.steps.length&&C(s+1)},_e=()=>{s>1&&C(s-1)},xe=()=>{C(1)};return e.jsxs("div",{className:"space-y-6 w-[800px]",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-4",children:"Interactive Demo - Click buttons to see animation"}),e.jsx(r,{...t,currentStep:s})]}),e.jsxs("div",{className:"flex gap-3 items-center justify-center",children:[e.jsx(N,{onClick:_e,disabled:s===1,variant:"outline",children:"Previous"}),e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Step ",s," of ",t.steps.length]}),e.jsx(N,{onClick:Se,disabled:s===t.steps.length,children:"Next"}),e.jsx(N,{onClick:xe,variant:"secondary",children:"Reset"})]})]})}};o.parameters={...o.parameters,docs:{...(j=o.parameters)===null||j===void 0?void 0:j.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "default"
  }
}`,...(F=o.parameters)===null||F===void 0||(b=F.docs)===null||b===void 0?void 0:b.source}}};p.parameters={...p.parameters,docs:{...(y=p.parameters)===null||y===void 0?void 0:y.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "default"
  }
}`,...(A=p.parameters)===null||A===void 0||(w=A.docs)===null||w===void 0?void 0:w.source}}};i.parameters={...i.parameters,docs:{...(D=i.parameters)===null||D===void 0?void 0:D.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "default"
  }
}`,...(L=i.parameters)===null||L===void 0||(I=L.docs)===null||I===void 0?void 0:I.source}}};c.parameters={...c.parameters,docs:{...(P=c.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact"
  }
}`,...(k=c.parameters)===null||k===void 0||(V=k.docs)===null||V===void 0?void 0:V.source}}};d.parameters={...d.parameters,docs:{...(B=d.parameters)===null||B===void 0?void 0:B.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "compact"
  }
}`,...(W=d.parameters)===null||W===void 0||(R=W.docs)===null||R===void 0?void 0:R.source}}};m.parameters={...m.parameters,docs:{...(E=m.parameters)===null||E===void 0?void 0:E.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "compact"
  }
}`,...(O=m.parameters)===null||O===void 0||(T=O.docs)===null||T===void 0?void 0:T.source}}};l.parameters={...l.parameters,docs:{...(q=l.parameters)===null||q===void 0?void 0:q.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  }
}`,...(G=l.parameters)===null||G===void 0||(z=G.docs)===null||z===void 0?void 0:z.source}}};u.parameters={...u.parameters,docs:{...(H=u.parameters)===null||H===void 0?void 0:H.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 3,
    variant: "compact"
  }
}`,...(K=u.parameters)===null||K===void 0||(J=K.docs)===null||J===void 0?void 0:J.source}}};v.parameters={...v.parameters,docs:{...(M=v.parameters)===null||M===void 0?void 0:M.docs,source:{originalSource:`{
  args: {
    steps: fiveSteps,
    currentStep: 3,
    variant: "default"
  }
}`,...(U=v.parameters)===null||U===void 0||(Q=U.docs)===null||Q===void 0?void 0:Q.source}}};S.parameters={...S.parameters,docs:{...(X=S.parameters)===null||X===void 0?void 0:X.docs,source:{originalSource:`{
  args: {
    steps: fiveSteps,
    currentStep: 4,
    variant: "compact"
  }
}`,...(Z=S.parameters)===null||Z===void 0||(Y=Z.docs)===null||Y===void 0?void 0:Y.source}}};_.parameters={..._.parameters,docs:{...($=_.parameters)===null||$===void 0?void 0:$.docs,source:{originalSource:`{
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default"
  },
  render: args => <div className="w-[800px]">
      <Stepper {...args} />
    </div>
}`,...(te=_.parameters)===null||te===void 0||(ee=te.docs)===null||ee===void 0?void 0:ee.source}}};x.parameters={...x.parameters,docs:{...(re=x.parameters)===null||re===void 0?void 0:re.docs,source:{originalSource:`{
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact"
  },
  render: args => <div className="w-[400px]">
      <Stepper {...args} />
    </div>
}`,...(ae=x.parameters)===null||ae===void 0||(se=ae.docs)===null||se===void 0?void 0:se.source}}};h.parameters={...h.parameters,docs:{...(ne=h.parameters)===null||ne===void 0?void 0:ne.docs,source:{originalSource:`{
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
}`,...(pe=h.parameters)===null||pe===void 0||(oe=pe.docs)===null||oe===void 0?void 0:oe.source}}};f.parameters={...f.parameters,docs:{...(ie=f.parameters)===null||ie===void 0?void 0:ie.docs,source:{originalSource:`{
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
}`,...(de=f.parameters)===null||de===void 0||(ce=de.docs)===null||ce===void 0?void 0:ce.source}}};g.parameters={...g.parameters,docs:{...(me=g.parameters)===null||me===void 0?void 0:me.docs,source:{originalSource:`{
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
}`,...(ue=g.parameters)===null||ue===void 0||(le=ue.docs)===null||le===void 0?void 0:le.source}}};const Ze=["Default","SecondStep","LastStep","Compact","CompactFirstStep","CompactLastStep","FourSteps","FourStepsCompact","FiveStepsNoDescription","FiveStepsCompact","WideContainer","NarrowContainer","AllStates","VariantComparison","InteractiveAnimation"];export{h as AllStates,c as Compact,d as CompactFirstStep,m as CompactLastStep,o as Default,S as FiveStepsCompact,v as FiveStepsNoDescription,l as FourSteps,u as FourStepsCompact,g as InteractiveAnimation,i as LastStep,x as NarrowContainer,p as SecondStep,f as VariantComparison,_ as WideContainer,Ze as __namedExportsOrder,Ye as default};
