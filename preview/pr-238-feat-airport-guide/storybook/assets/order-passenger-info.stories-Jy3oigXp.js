import"./cancel-order-dialog-s6jFwdmy.js";import{b as a}from"./order-payment-details-rUMH1zSf.js";import"./order-status-card-DgFiByA3.js";import"./iframe-CTQHwL-W.js";import"./index-DQf9EYfM.js";import"./index-lTuD9bxb.js";import"./index-C3NpVBPJ.js";import"./index-6HrtB7Is.js";import"./index-DjVegAIB.js";import"./index-D5B53Jw0.js";import"./index-CxQ8_jtT.js";import"./index-V7-5DS2J.js";import"./Combination-Co_fpN-0.js";import"./button-D-CechVb.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-DFS2w0px.js";import"./image-R2uornLd.js";import"./use-merged-ref-BxNy02HP.js";import"./badge-CBdRFrsh.js";import"./separator-BlxEkzvY.js";import"./arrow-left-right-CQEQaf2k.js";import"./createLucideIcon-CAzczeES.js";import"./arrow-right-DvG4bGq8.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-BgrLf2yg.js";import"./clock-BSG-z_YP.js";import"./circle-check-big-CZbO8cPp.js";import"./circle-alert-Clt_NEdw.js";import"./circle-x-DJjWTDL5.js";import"./preload-helper-PPVm8Dsz.js";const j={title:"Flights/Orders/OrderPassengerInfo",component:a,parameters:{layout:"padded"},tags:["autodocs"]},r={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"}]}},e={args:{passengers:[{name:"John Smith",idType:"passport",idNumber:"E12345678"}]}},s={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"},{name:"李四",idType:"passport",idNumber:"P87654321"},{name:"王五",idType:"id_card",idNumber:"310115199501011234"},{name:"Maria Garcia",idType:"passport",idNumber:"A98765432"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
