import{O as c}from"./order-status-card-DfhSBfNa.js";import"./iframe-BH7aeb89.js";import"./preload-helper-PPVm8Dsz.js";import"./card-EjpOmyDU.js";import"./utils-CBfrqCZ4.js";import"./phone-C1HaZ9ei.js";import"./createLucideIcon-C7RxPt7J.js";import"./mail-CmLJ-c6c.js";import"./separator-IToQ99wX.js";import"./index-rfJbia-g.js";import"./index-B4LoADOl.js";import"./index-B6zyZfym.js";import"./plane-Dx3-kXjb.js";import"./ancillary-v4vhjuaq.js";import"./schemas-dlpNQSCA.js";import"./currency-BllR5SlS.js";import"./alert-Bx0vPAMn.js";import"./index-CdJFUDDL.js";import"./button-reTbs1c1.js";const L={title:"Flights/Orders/OrderContactInfo",component:c,parameters:{layout:"padded"},tags:["autodocs"]},o={args:{contactPhone:"13800138000",contactEmail:"user@example.com"}},t={args:{contactPhone:"13800138000",contactEmail:null}},a={args:{contactPhone:null,contactEmail:"user@example.com"}},e={args:{contactPhone:null,contactEmail:null}},r={args:{contactPhone:"+1 (555) 123-4567",contactEmail:"international@example.com"}},n={args:{contactPhone:"13800138000",contactEmail:"very.long.email.address.for.testing@example-domain.com"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    contactPhone: "13800138000",
    contactEmail: "user@example.com"
  }
}`,...o.parameters?.docs?.source},description:{story:"Contact with both phone and email",...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    contactPhone: "13800138000",
    contactEmail: null
  }
}`,...t.parameters?.docs?.source},description:{story:"Contact with phone only",...t.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    contactPhone: null,
    contactEmail: "user@example.com"
  }
}`,...a.parameters?.docs?.source},description:{story:"Contact with email only",...a.parameters?.docs?.description}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    contactPhone: null,
    contactEmail: null
  }
}`,...e.parameters?.docs?.source},description:{story:"No contact information",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    contactPhone: "+1 (555) 123-4567",
    contactEmail: "international@example.com"
  }
}`,...r.parameters?.docs?.source},description:{story:"International phone number",...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    contactPhone: "13800138000",
    contactEmail: "very.long.email.address.for.testing@example-domain.com"
  }
}`,...n.parameters?.docs?.source},description:{story:"Long email address",...n.parameters?.docs?.description}}};const b=["Complete","PhoneOnly","EmailOnly","Empty","InternationalPhone","LongEmail"];export{o as Complete,a as EmailOnly,e as Empty,r as InternationalPhone,n as LongEmail,t as PhoneOnly,b as __namedExportsOrder,L as default};
