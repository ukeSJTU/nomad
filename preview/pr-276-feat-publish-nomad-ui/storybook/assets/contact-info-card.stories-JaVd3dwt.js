import{j as e,r as K}from"./iframe-BY6WQ8rl.js";import{C as q}from"./passenger-form-card-DiN6IVT2.js";import"./separator-D3mo2s7R.js";import"./card-C2MAT-zL.js";import"./alert-Bq9jHRdw.js";import"./label-CxilLX0s.js";import"./radio-group-CNRwHz1w.js";import"./preload-helper-PPVm8Dsz.js";import"./index-HIqmnw4t.js";import"./index-DRfufKDV.js";import"./index-Cg4mt3GG.js";import"./createLucideIcon-DhaeV68V.js";import"./index-BoBNlNV4.js";import"./index-jM_4ha9X.js";import"./chevron-down-DdLcFoQ7.js";import"./checkbox-D2fL6kQ1.js";import"./index-sMO_WrMY.js";import"./index-CQLSNwcT.js";import"./check-DNbWv-jy.js";import"./input-D0mA3Bj2.js";import"./platform-CXbBvqhr.js";import"./clock-DMr9UqDy.js";import"./button-Bkd1CeD9.js";import"./select-H_oeIjBA.js";import"./index-BaiNJB1C.js";import"./index-D0-zYxe0.js";import"./index-BizkJoHM.js";import"./index-DmZccnKP.js";import"./x-CoTNxCXn.js";import"./index-B6rVzEen.js";var d,s,m,p,c,h,u,_,v,E,P,f,W,C,F,x,S,V,g,j,I,D,y,w,z,k,B,O,R,b;const We={title:"Flights/Booking/ContactInfoCard",component:q,parameters:{layout:"padded"},tags:["autodocs"]};function r({initialValue:A,errors:G}){const[H,J]=K.useState(A);return e.jsx(q,{value:H,onChange:J,errors:G})}const o={render:()=>e.jsx(r,{initialValue:{method:"email",email:"",phone:""}})},a={render:()=>e.jsx(r,{initialValue:{method:"email",email:"zhangsan@example.com",phone:""}})},i={render:()=>e.jsx(r,{initialValue:{method:"phone",email:"",phone:""}})},t={render:()=>e.jsx(r,{initialValue:{method:"phone",email:"",phone:"13800138000"}})},n={render:()=>e.jsx(r,{initialValue:{method:"email",email:"invalid-email",phone:""},errors:{email:"请输入有效的邮箱地址"}})},l={render:()=>e.jsx(r,{initialValue:{method:"phone",email:"",phone:"123"},errors:{phone:"请输入有效的手机号码"}})};o.parameters={...o.parameters,docs:{...(d=o.parameters)===null||d===void 0?void 0:d.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "",
    phone: ""
  }} />
}`,...(m=o.parameters)===null||m===void 0||(s=m.docs)===null||s===void 0?void 0:s.source},description:{story:"Default state with email selected",...(c=o.parameters)===null||c===void 0||(p=c.docs)===null||p===void 0?void 0:p.description}}};a.parameters={...a.parameters,docs:{...(h=a.parameters)===null||h===void 0?void 0:h.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "zhangsan@example.com",
    phone: ""
  }} />
}`,...(_=a.parameters)===null||_===void 0||(u=_.docs)===null||u===void 0?void 0:u.source},description:{story:"Email method selected with filled data",...(E=a.parameters)===null||E===void 0||(v=E.docs)===null||v===void 0?void 0:v.description}}};i.parameters={...i.parameters,docs:{...(P=i.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: ""
  }} />
}`,...(W=i.parameters)===null||W===void 0||(f=W.docs)===null||f===void 0?void 0:f.source},description:{story:"Phone method selected",...(F=i.parameters)===null||F===void 0||(C=F.docs)===null||C===void 0?void 0:C.description}}};t.parameters={...t.parameters,docs:{...(x=t.parameters)===null||x===void 0?void 0:x.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "13800138000"
  }} />
}`,...(V=t.parameters)===null||V===void 0||(S=V.docs)===null||S===void 0?void 0:S.source},description:{story:"Phone method with filled data",...(j=t.parameters)===null||j===void 0||(g=j.docs)===null||g===void 0?void 0:g.description}}};n.parameters={...n.parameters,docs:{...(I=n.parameters)===null||I===void 0?void 0:I.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "email",
    email: "invalid-email",
    phone: ""
  }} errors={{
    email: "请输入有效的邮箱地址"
  }} />
}`,...(y=n.parameters)===null||y===void 0||(D=y.docs)===null||D===void 0?void 0:D.source},description:{story:"Email method with validation errors",...(z=n.parameters)===null||z===void 0||(w=z.docs)===null||w===void 0?void 0:w.description}}};l.parameters={...l.parameters,docs:{...(k=l.parameters)===null||k===void 0?void 0:k.docs,source:{originalSource:`{
  render: () => <ContactInfoCardWrapper initialValue={{
    method: "phone",
    email: "",
    phone: "123"
  }} errors={{
    phone: "请输入有效的手机号码"
  }} />
}`,...(O=l.parameters)===null||O===void 0||(B=O.docs)===null||B===void 0?void 0:B.source},description:{story:"Phone method with validation errors",...(b=l.parameters)===null||b===void 0||(R=b.docs)===null||R===void 0?void 0:R.description}}};const Ce=["Default","EmailFilled","PhoneSelected","PhoneFilled","EmailWithErrors","PhoneWithErrors"];export{o as Default,a as EmailFilled,n as EmailWithErrors,t as PhoneFilled,i as PhoneSelected,l as PhoneWithErrors,Ce as __namedExportsOrder,We as default};
