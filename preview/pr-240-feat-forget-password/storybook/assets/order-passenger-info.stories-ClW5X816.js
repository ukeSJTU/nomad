import"./cancel-order-dialog-Bqhwrolf.js";import{b as a}from"./order-payment-details-DMejNVyh.js";import"./order-status-card-CTL4u1M6.js";import"./iframe-BHY9H4ht.js";import"./index-rZ1PVBeq.js";import"./index-yS4Ssq8c.js";import"./index-DS1BCGAp.js";import"./index-BL8rbTbl.js";import"./index-BAV5ZDzx.js";import"./index-WBgFetUP.js";import"./index-DFNX9mnV.js";import"./index-C6REgW9O.js";import"./Combination-C88An3pH.js";import"./button-DoWZ3ZEL.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-DDWgKdyq.js";import"./image-BKc4vpcP.js";import"./use-merged-ref-B5t7ompD.js";import"./badge-BXmDd02C.js";import"./separator-DCbVArSO.js";import"./arrow-left-right-Cd_IdqUC.js";import"./createLucideIcon-B7gungxb.js";import"./arrow-right-CppBSUFa.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-DW62RoYy.js";import"./clock-VLeddaEv.js";import"./circle-check-big-BNPflWRy.js";import"./circle-alert-xDdY3UKC.js";import"./circle-x-Blivuvgx.js";import"./preload-helper-PPVm8Dsz.js";const j={title:"Flights/Orders/OrderPassengerInfo",component:a,parameters:{layout:"padded"},tags:["autodocs"]},r={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"}]}},e={args:{passengers:[{name:"John Smith",idType:"passport",idNumber:"E12345678"}]}},s={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"},{name:"李四",idType:"passport",idNumber:"P87654321"},{name:"王五",idType:"id_card",idNumber:"310115199501011234"},{name:"Maria Garcia",idType:"passport",idNumber:"A98765432"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
