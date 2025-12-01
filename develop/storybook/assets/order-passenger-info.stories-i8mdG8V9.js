import"./cancel-order-dialog-Bo-uBYDH.js";import{b as a}from"./order-payment-details-fUs_nADb.js";import"./order-status-card-DE8O2_Cb.js";import"./iframe-BJgykgVD.js";import"./index-DkuPh9Su.js";import"./index-CAxwE_jM.js";import"./index-DqRO2xoq.js";import"./index-D_fv8bV6.js";import"./index-CqgsDxe_.js";import"./index-DdLAavYv.js";import"./index-tkGWHLHF.js";import"./index-uwfhZi5g.js";import"./Combination-Bbrljvcr.js";import"./button-DXG5o7vA.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-nZeoFs75.js";import"./image-D2EZWSsV.js";import"./use-merged-ref-CPH4_Gtw.js";import"./badge-QpfoM48B.js";import"./separator-D7Z9tTkU.js";import"./arrow-left-right-CVpkZLN1.js";import"./createLucideIcon-9V33WfUP.js";import"./arrow-right-CEYL8cLc.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-B15s0SmB.js";import"./clock-B47G9xCP.js";import"./circle-check-big-Cd8GA9Te.js";import"./circle-alert-YImevoKj.js";import"./circle-x-Bo-ZbVUu.js";import"./preload-helper-PPVm8Dsz.js";const j={title:"Flights/Orders/OrderPassengerInfo",component:a,parameters:{layout:"padded"},tags:["autodocs"]},r={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"}]}},e={args:{passengers:[{name:"John Smith",idType:"passport",idNumber:"E12345678"}]}},s={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"},{name:"李四",idType:"passport",idNumber:"P87654321"},{name:"王五",idType:"id_card",idNumber:"310115199501011234"},{name:"Maria Garcia",idType:"passport",idNumber:"A98765432"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    passengers: [{
      name: "张三",
      idType: "id_card",
      idNumber: "310115199001011234"
    }]
  }
}`,...r.parameters?.docs?.source},description:{story:"Single passenger with ID card",...r.parameters?.docs?.description}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    passengers: [{
      name: "John Smith",
      idType: "passport",
      idNumber: "E12345678"
    }]
  }
}`,...e.parameters?.docs?.source},description:{story:"Single passenger with passport",...e.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    passengers: [{
      name: "张三",
      idType: "id_card",
      idNumber: "310115199001011234"
    }, {
      name: "李四",
      idType: "passport",
      idNumber: "P87654321"
    }, {
      name: "王五",
      idType: "id_card",
      idNumber: "310115199501011234"
    }, {
      name: "Maria Garcia",
      idType: "passport",
      idNumber: "A98765432"
    }]
  }
}`,...s.parameters?.docs?.source},description:{story:"Multiple passengers with different identity types",...s.parameters?.docs?.description}}};const k=["SinglePassengerIDCard","SinglePassengerPassport","MultiplePassengers"];export{s as MultiplePassengers,r as SinglePassengerIDCard,e as SinglePassengerPassport,k as __namedExportsOrder,j as default};
