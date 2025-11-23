import{b as d}from"./order-status-card-DfhSBfNa.js";import"./iframe-BH7aeb89.js";import"./preload-helper-PPVm8Dsz.js";import"./card-EjpOmyDU.js";import"./utils-CBfrqCZ4.js";import"./phone-C1HaZ9ei.js";import"./createLucideIcon-C7RxPt7J.js";import"./mail-CmLJ-c6c.js";import"./separator-IToQ99wX.js";import"./index-rfJbia-g.js";import"./index-B4LoADOl.js";import"./index-B6zyZfym.js";import"./plane-Dx3-kXjb.js";import"./ancillary-v4vhjuaq.js";import"./schemas-dlpNQSCA.js";import"./currency-BllR5SlS.js";import"./alert-Bx0vPAMn.js";import"./index-CdJFUDDL.js";import"./button-reTbs1c1.js";const P={title:"Flights/Orders/OrderPassengerInfo",component:d,parameters:{layout:"padded"},tags:["autodocs"]},e={args:{passengers:[{id:"passenger-1",orderId:"order-1",name:"张三",identityType:"id_card",identityNumber:"110101199001011234",phone:"13800138000",createdAt:new Date}]}},r={args:{passengers:[{id:"passenger-1",orderId:"order-1",name:"张三",identityType:"id_card",identityNumber:"110101199001011234",phone:"13800138000",createdAt:new Date},{id:"passenger-2",orderId:"order-1",name:"李四",identityType:"passport",identityNumber:"E12345678",phone:"13900139000",createdAt:new Date},{id:"passenger-3",orderId:"order-1",name:"王五",identityType:"id_card",identityNumber:"110101199501011234",phone:null,createdAt:new Date}]}},n={args:{passengers:[{id:"passenger-1",orderId:"order-1",name:"John Smith",identityType:"passport",identityNumber:"P12345678",phone:"+1234567890",createdAt:new Date}]}},t={args:{passengers:[{id:"passenger-1",orderId:"order-1",name:"张三",identityType:"id_card",identityNumber:"110101199001011234",phone:null,createdAt:new Date}]}},s={args:{passengers:[{id:"passenger-1",orderId:"order-1",name:"张三",identityType:"id_card",identityNumber:"110101197001011234",phone:"13800138000",createdAt:new Date},{id:"passenger-2",orderId:"order-1",name:"李梅",identityType:"id_card",identityNumber:"110101197501011234",phone:"13900139000",createdAt:new Date},{id:"passenger-3",orderId:"order-1",name:"张小明",identityType:"id_card",identityNumber:"110101200001011234",phone:null,createdAt:new Date},{id:"passenger-4",orderId:"order-1",name:"张小红",identityType:"id_card",identityNumber:"110101200501011234",phone:null,createdAt:new Date},{id:"passenger-5",orderId:"order-1",name:"张小华",identityType:"id_card",identityNumber:"110101201001011234",phone:null,createdAt:new Date}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    passengers: [{
      id: "passenger-1",
      orderId: "order-1",
      name: "张三",
      identityType: "id_card" as const,
      identityNumber: "110101199001011234",
      phone: "13800138000",
      createdAt: new Date()
    }]
  }
}`,...e.parameters?.docs?.source},description:{story:"Single passenger with ID card",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    passengers: [{
      id: "passenger-1",
      orderId: "order-1",
      name: "张三",
      identityType: "id_card" as const,
      identityNumber: "110101199001011234",
      phone: "13800138000",
      createdAt: new Date()
    }, {
      id: "passenger-2",
      orderId: "order-1",
      name: "李四",
      identityType: "passport" as const,
      identityNumber: "E12345678",
      phone: "13900139000",
      createdAt: new Date()
    }, {
      id: "passenger-3",
      orderId: "order-1",
      name: "王五",
      identityType: "id_card" as const,
      identityNumber: "110101199501011234",
      phone: null,
      createdAt: new Date()
    }]
  }
}`,...r.parameters?.docs?.source},description:{story:"Multiple passengers with different identity types",...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    passengers: [{
      id: "passenger-1",
      orderId: "order-1",
      name: "John Smith",
      identityType: "passport" as const,
      identityNumber: "P12345678",
      phone: "+1234567890",
      createdAt: new Date()
    }]
  }
}`,...n.parameters?.docs?.source},description:{story:"Passenger with passport",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    passengers: [{
      id: "passenger-1",
      orderId: "order-1",
      name: "张三",
      identityType: "id_card" as const,
      identityNumber: "110101199001011234",
      phone: null,
      createdAt: new Date()
    }]
  }
}`,...t.parameters?.docs?.source},description:{story:"Passenger without phone number",...t.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    passengers: [{
      id: "passenger-1",
      orderId: "order-1",
      name: "张三",
      identityType: "id_card" as const,
      identityNumber: "110101197001011234",
      phone: "13800138000",
      createdAt: new Date()
    }, {
      id: "passenger-2",
      orderId: "order-1",
      name: "李梅",
      identityType: "id_card" as const,
      identityNumber: "110101197501011234",
      phone: "13900139000",
      createdAt: new Date()
    }, {
      id: "passenger-3",
      orderId: "order-1",
      name: "张小明",
      identityType: "id_card" as const,
      identityNumber: "110101200001011234",
      phone: null,
      createdAt: new Date()
    }, {
      id: "passenger-4",
      orderId: "order-1",
      name: "张小红",
      identityType: "id_card" as const,
      identityNumber: "110101200501011234",
      phone: null,
      createdAt: new Date()
    }, {
      id: "passenger-5",
      orderId: "order-1",
      name: "张小华",
      identityType: "id_card" as const,
      identityNumber: "110101201001011234",
      phone: null,
      createdAt: new Date()
    }]
  }
}`,...s.parameters?.docs?.source},description:{story:"Family trip with 5 passengers",...s.parameters?.docs?.description}}};const S=["SinglePassenger","MultiplePassengers","PassportPassenger","NoPhone","FamilyTrip"];export{s as FamilyTrip,r as MultiplePassengers,t as NoPhone,n as PassportPassenger,e as SinglePassenger,S as __namedExportsOrder,P as default};
