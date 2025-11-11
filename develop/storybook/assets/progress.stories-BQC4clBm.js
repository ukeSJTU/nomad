import{r as P,j as l}from"./iframe-C9irGnsO.js";import{c as j}from"./index-DgDwIQuk.js";import{P as w}from"./index-C-J0SOsc.js";import{c as R}from"./utils-CBfrqCZ4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Ch_Q4g6q.js";import"./index-BQy1uiks.js";var g="Progress",f=100,[T]=j(g),[C,D]=T(g),h=P.forwardRef((e,r)=>{const{__scopeProgress:n,value:s=null,max:a,getValueLabel:_=M,...$}=e;(a||a===0)&&!x(a)&&console.error(V(`${a}`,"Progress"));const o=x(a)?a:f;s!==null&&!N(s,o)&&console.error(A(`${s}`,"Progress"));const t=N(s,o)?s:null,I=v(t)?_(t,o):void 0;return l.jsx(C,{scope:n,value:t,max:o,children:l.jsx(w.div,{"aria-valuemax":o,"aria-valuemin":0,"aria-valuenow":v(t)?t:void 0,"aria-valuetext":I,role:"progressbar","data-state":E(t,o),"data-value":t??void 0,"data-max":o,...$,ref:r})})});h.displayName=g;var b="ProgressIndicator",y=P.forwardRef((e,r)=>{const{__scopeProgress:n,...s}=e,a=D(b,n);return l.jsx(w.div,{"data-state":E(a.value,a.max),"data-value":a.value??void 0,"data-max":a.max,...s,ref:r})});y.displayName=b;function M(e,r){return`${Math.round(e/r*100)}%`}function E(e,r){return e==null?"indeterminate":e===r?"complete":"loading"}function v(e){return typeof e=="number"}function x(e){return v(e)&&!isNaN(e)&&e>0}function N(e,r){return v(e)&&!isNaN(e)&&e<=r&&e>=0}function V(e,r){return`Invalid prop \`max\` of value \`${e}\` supplied to \`${r}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${f}\`.`}function A(e,r){return`Invalid prop \`value\` of value \`${e}\` supplied to \`${r}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${f} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var L=h,O=y;function S({className:e,value:r,...n}){return l.jsx(L,{"data-slot":"progress",className:R("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",e),...n,children:l.jsx(O,{"data-slot":"progress-indicator",className:"bg-primary h-full w-full flex-1 transition-all",style:{transform:`translateX(-${100-(r||0)}%)`}})})}S.__docgenInfo={description:"",methods:[],displayName:"Progress"};const q={title:"Shadcn/Progress",component:S,parameters:{layout:"centered"},argTypes:{value:{control:{type:"range",min:0,max:100,step:1},description:"The progress value (0-100)"}}},u={args:{value:50,className:"w-[300px]"}},c={args:{value:0,className:"w-[300px]"}},i={args:{value:25,className:"w-[300px]"}},p={args:{value:50,className:"w-[300px]"}},m={args:{value:75,className:"w-[300px]"}},d={args:{value:100,className:"w-[300px]"}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: 50,
    className: "w-[300px]"
  }
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: 0,
    className: "w-[300px]"
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    value: 25,
    className: "w-[300px]"
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 50,
    className: "w-[300px]"
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    value: 75,
    className: "w-[300px]"
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: 100,
    className: "w-[300px]"
  }
}`,...d.parameters?.docs?.source}}};const z=["Default","Empty","Quarter","Half","ThreeQuarters","Complete"];export{d as Complete,u as Default,c as Empty,p as Half,i as Quarter,m as ThreeQuarters,z as __namedExportsOrder,q as default};
