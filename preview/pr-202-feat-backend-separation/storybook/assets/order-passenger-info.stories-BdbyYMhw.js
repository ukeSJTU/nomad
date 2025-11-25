import"./cancel-order-dialog-BuiR4nlj.js";import{b as a}from"./order-payment-details-CLuFyXyh.js";import"./order-status-card-Cs_c2xFI.js";import"./iframe-Dd3AqlOG.js";import"./index-B2ByjUQR.js";import"./index-C2Z9wzF5.js";import"./index-NudYPprN.js";import"./index-ZjRYLnCe.js";import"./index-B11B4zqu.js";import"./index-Bqb6DZeW.js";import"./index-uF32jcgg.js";import"./index-DOLyc8kp.js";import"./Combination-C4858Lk4.js";import"./button-vXVpJ6RZ.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-0wzzG5uy.js";import"./image-PgfVMDTA.js";import"./use-merged-ref-CCl5dRyA.js";import"./badge-DRT8w6Bh.js";import"./separator-DY_cBFgl.js";import"./arrow-left-right-CwklQcHf.js";import"./createLucideIcon-aqlq-bZC.js";import"./arrow-right-VxyNMjvd.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-BLZ5sbs2.js";import"./clock-CIjMt94c.js";import"./circle-check-big-CutfPsEp.js";import"./circle-alert-Dj81gHaC.js";import"./circle-x-BRTxQjiA.js";import"./preload-helper-PPVm8Dsz.js";const j={title:"Flights/Orders/OrderPassengerInfo",component:a,parameters:{layout:"padded"},tags:["autodocs"]},r={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"}]}},e={args:{passengers:[{name:"John Smith",idType:"passport",idNumber:"E12345678"}]}},s={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"},{name:"李四",idType:"passport",idNumber:"P87654321"},{name:"王五",idType:"id_card",idNumber:"310115199501011234"},{name:"Maria Garcia",idType:"passport",idNumber:"A98765432"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
