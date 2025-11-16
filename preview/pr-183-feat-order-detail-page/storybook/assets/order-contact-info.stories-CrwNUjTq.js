import{O as c}from"./order-status-card-BjY5ZcIG.js";import"./iframe-CvbL331m.js";import"./preload-helper-PPVm8Dsz.js";import"./card-DrX_RmyE.js";import"./utils-CBfrqCZ4.js";import"./phone-BnGY3Sv1.js";import"./createLucideIcon-BH8CnD7y.js";import"./mail-CD4euI3U.js";import"./separator-DZHrP0R9.js";import"./index-BfQugiVD.js";import"./index-DhbfMN3k.js";import"./index-C7jJTgGp.js";import"./plane-IgmqG4yw.js";import"./ancillary-v4vhjuaq.js";import"./schemas-dlpNQSCA.js";import"./currency-BllR5SlS.js";import"./alert-DufCnLl2.js";import"./index-CdJFUDDL.js";import"./button-CAXY9XPu.js";const L={title:"Flights/Orders/OrderContactInfo",component:c,parameters:{layout:"padded"},tags:["autodocs"]},o={args:{contactPhone:"13800138000",contactEmail:"user@example.com"}},t={args:{contactPhone:"13800138000",contactEmail:null}},a={args:{contactPhone:null,contactEmail:"user@example.com"}},e={args:{contactPhone:null,contactEmail:null}},r={args:{contactPhone:"+1 (555) 123-4567",contactEmail:"international@example.com"}},n={args:{contactPhone:"13800138000",contactEmail:"very.long.email.address.for.testing@example-domain.com"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
