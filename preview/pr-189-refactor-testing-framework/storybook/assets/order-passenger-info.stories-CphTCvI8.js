import"./cancel-order-dialog-ClnPjl2F.js";import{b as a}from"./order-payment-details-L4KMRhNo.js";import"./order-status-card-DzaRYmxh.js";import"./iframe-BIE3orPF.js";import"./index-Cc0-q4v9.js";import"./index-dpG-91xS.js";import"./index-BDQ7_fOS.js";import"./index-BcGFjD2Y.js";import"./index-BU5DVp1F.js";import"./index-C9hYUzPm.js";import"./index-C8tx8S_a.js";import"./index-zLNOV2VO.js";import"./Combination-C7TrT_6E.js";import"./button-BHL9VpYg.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-BBfnKoXO.js";import"./image-DnI0QF4t.js";import"./use-merged-ref-DYwguYlI.js";import"./badge-CSlUHOkg.js";import"./separator-BVO-c-3c.js";import"./arrow-left-right-C5fyLWlN.js";import"./createLucideIcon-aXwR9RXD.js";import"./arrow-right-CQ6fm6v3.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-Dgd5Fh_l.js";import"./clock-mx1n1KK0.js";import"./circle-check-big-DO1AjQ3w.js";import"./circle-alert-B4gTbZ38.js";import"./circle-x-BaFO-j2N.js";import"./preload-helper-PPVm8Dsz.js";const j={title:"Flights/Orders/OrderPassengerInfo",component:a,parameters:{layout:"padded"},tags:["autodocs"]},r={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"}]}},e={args:{passengers:[{name:"John Smith",idType:"passport",idNumber:"E12345678"}]}},s={args:{passengers:[{name:"张三",idType:"id_card",idNumber:"310115199001011234"},{name:"李四",idType:"passport",idNumber:"P87654321"},{name:"王五",idType:"id_card",idNumber:"310115199501011234"},{name:"Maria Garcia",idType:"passport",idNumber:"A98765432"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
