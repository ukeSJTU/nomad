import{j as m,r as R}from"./iframe-BY6WQ8rl.js";import{P as A}from"./passenger-form-card-DiN6IVT2.js";import"./separator-D3mo2s7R.js";import"./card-C2MAT-zL.js";import"./alert-Bq9jHRdw.js";import"./label-CxilLX0s.js";import"./radio-group-CNRwHz1w.js";import"./preload-helper-PPVm8Dsz.js";import"./index-HIqmnw4t.js";import"./index-DRfufKDV.js";import"./index-Cg4mt3GG.js";import"./createLucideIcon-DhaeV68V.js";import"./index-BoBNlNV4.js";import"./index-jM_4ha9X.js";import"./chevron-down-DdLcFoQ7.js";import"./checkbox-D2fL6kQ1.js";import"./index-sMO_WrMY.js";import"./index-CQLSNwcT.js";import"./check-DNbWv-jy.js";import"./input-D0mA3Bj2.js";import"./platform-CXbBvqhr.js";import"./clock-DMr9UqDy.js";import"./button-Bkd1CeD9.js";import"./select-H_oeIjBA.js";import"./index-BaiNJB1C.js";import"./index-D0-zYxe0.js";import"./index-BizkJoHM.js";import"./index-DmZccnKP.js";import"./x-CoTNxCXn.js";import"./index-B6rVzEen.js";var l,u,g,v,_,P,h,y,N,S,f,b,T,F,x,C,D,M,j,E;const Ne={title:"Flights/Booking/PassengerFormCard",component:A,parameters:{layout:"padded"},tags:["autodocs"]},k=[{id:"1",name:"张三",documentType:"id_card",documentNumber:"110101199001011234",phone:"13800138000"},{id:"2",name:"李四",documentType:"passport",documentNumber:"E12345678",phone:"13900139000"},{id:"3",name:"王五",documentType:"id_card",documentNumber:"110101199101011234",phone:null}];function c({initialPassengers:I,savedPassengers:W}){const[a,p]=R.useState(I),[w,B]=R.useState([]),O=(e,s,r)=>{const n=[...a];n[e][s]=r,p(n)},q=e=>{if(w.includes(e))B(s=>s.filter(r=>r!==e));else{B(r=>[...r,e]);const s=W.find(r=>r.id===e);if(s){const r=a.findIndex(n=>!n.name&&!n.documentNumber);if(r!==-1){const n=[...a];n[r]={name:s.name,documentType:s.documentType,documentNumber:s.documentNumber,phone:s.phone||""},p(n)}}}},z=()=>{p([...a,{name:"",documentType:"id_card",documentNumber:"",phone:""}])},G=e=>{a.length>1&&p(a.filter((s,r)=>r!==e))},H=e=>e.length===1?!!(e[0].name||e[0].documentNumber||e[0].phone):!0;return m.jsx(A,{passengers:a,savedPassengers:W,selectedPassengerIds:w,onChange:O,onToggleSavedPassenger:q,onRemovePassenger:G,onAddPassenger:z,showDeleteButton:H})}const o={render:()=>m.jsx(c,{initialPassengers:[{name:"",documentType:"id_card",documentNumber:"",phone:""}],savedPassengers:k})},t={render:()=>m.jsx(c,{initialPassengers:[{name:"",documentType:"id_card",documentNumber:"",phone:""}],savedPassengers:[]})},d={render:()=>m.jsx(c,{initialPassengers:[{name:"张三",documentType:"id_card",documentNumber:"110101199001011234",phone:"13800138000"}],savedPassengers:k})},i={render:()=>m.jsx(c,{initialPassengers:[{name:"张三",documentType:"id_card",documentNumber:"110101199001011234",phone:"13800138000"},{name:"李四",documentType:"passport",documentNumber:"E12345678",phone:"13900139000"}],savedPassengers:k})};o.parameters={...o.parameters,docs:{...(l=o.parameters)===null||l===void 0?void 0:l.docs,source:{originalSource:`{
  render: () => <PassengerFormCardWrapper initialPassengers={[{
    name: "",
    documentType: "id_card",
    documentNumber: "",
    phone: ""
  }]} savedPassengers={mockSavedPassengers} />
}`,...(g=o.parameters)===null||g===void 0||(u=g.docs)===null||u===void 0?void 0:u.source},description:{story:"Default state - Single empty passenger with saved passengers",...(_=o.parameters)===null||_===void 0||(v=_.docs)===null||v===void 0?void 0:v.description}}};t.parameters={...t.parameters,docs:{...(P=t.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
  render: () => <PassengerFormCardWrapper initialPassengers={[{
    name: "",
    documentType: "id_card",
    documentNumber: "",
    phone: ""
  }]} savedPassengers={[]} />
}`,...(y=t.parameters)===null||y===void 0||(h=y.docs)===null||h===void 0?void 0:h.source},description:{story:"Empty form without saved passengers",...(S=t.parameters)===null||S===void 0||(N=S.docs)===null||N===void 0?void 0:N.description}}};d.parameters={...d.parameters,docs:{...(f=d.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
  render: () => <PassengerFormCardWrapper initialPassengers={[{
    name: "张三",
    documentType: "id_card",
    documentNumber: "110101199001011234",
    phone: "13800138000"
  }]} savedPassengers={mockSavedPassengers} />
}`,...(T=d.parameters)===null||T===void 0||(b=T.docs)===null||b===void 0?void 0:b.source},description:{story:"Single passenger with pre-filled data",...(x=d.parameters)===null||x===void 0||(F=x.docs)===null||F===void 0?void 0:F.description}}};i.parameters={...i.parameters,docs:{...(C=i.parameters)===null||C===void 0?void 0:C.docs,source:{originalSource:`{
  render: () => <PassengerFormCardWrapper initialPassengers={[{
    name: "张三",
    documentType: "id_card",
    documentNumber: "110101199001011234",
    phone: "13800138000"
  }, {
    name: "李四",
    documentType: "passport",
    documentNumber: "E12345678",
    phone: "13900139000"
  }]} savedPassengers={mockSavedPassengers} />
}`,...(M=i.parameters)===null||M===void 0||(D=M.docs)===null||D===void 0?void 0:D.source},description:{story:"Multiple passengers - one filled, one empty",...(E=i.parameters)===null||E===void 0||(j=E.docs)===null||j===void 0?void 0:j.description}}};const Se=["Default","NoSavedPassengers","PreFilled","MultiplePassengers"];export{o as Default,i as MultiplePassengers,t as NoSavedPassengers,d as PreFilled,Se as __namedExportsOrder,Ne as default};
