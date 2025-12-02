import"./cancel-order-dialog-s6jFwdmy.js";import{O as a}from"./order-payment-details-rUMH1zSf.js";import"./order-status-card-DgFiByA3.js";import"./iframe-CTQHwL-W.js";import"./index-DQf9EYfM.js";import"./index-lTuD9bxb.js";import"./index-C3NpVBPJ.js";import"./index-6HrtB7Is.js";import"./index-DjVegAIB.js";import"./index-D5B53Jw0.js";import"./index-CxQ8_jtT.js";import"./index-V7-5DS2J.js";import"./Combination-Co_fpN-0.js";import"./button-D-CechVb.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./card-DFS2w0px.js";import"./image-R2uornLd.js";import"./use-merged-ref-BxNy02HP.js";import"./badge-CBdRFrsh.js";import"./separator-BlxEkzvY.js";import"./arrow-left-right-CQEQaf2k.js";import"./createLucideIcon-CAzczeES.js";import"./arrow-right-DvG4bGq8.js";import"./format-DmuT3Hh4.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-BgrLf2yg.js";import"./clock-BSG-z_YP.js";import"./circle-check-big-CZbO8cPp.js";import"./circle-alert-Clt_NEdw.js";import"./circle-x-DJjWTDL5.js";import"./preload-helper-PPVm8Dsz.js";const D={title:"Flights/Orders/OrderContactInfo",component:a,parameters:{layout:"padded"},tags:["autodocs"]},o={args:{contactInfo:{contactEmail:"foobar@nomad.com",contactPhone:"13800001111"}}},t={args:{contactInfo:{contactPhone:"13800001111",contactEmail:void 0}}},r={args:{contactInfo:{contactPhone:void 0,contactEmail:"foobar@nomad.com"}}},n={args:{contactInfo:{contactPhone:void 0,contactEmail:void 0}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    contactInfo: {
      contactEmail: "foobar@nomad.com",
      contactPhone: "13800001111"
    }
  }
}`,...o.parameters?.docs?.source},description:{story:"Contact with both phone and email",...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    contactInfo: {
      contactPhone: "13800001111",
      contactEmail: undefined
    }
  }
}`,...t.parameters?.docs?.source},description:{story:"Contact with phone only",...t.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    contactInfo: {
      contactPhone: undefined,
      contactEmail: "foobar@nomad.com"
    }
  }
}`,...r.parameters?.docs?.source},description:{story:"Contact with email only",...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    contactInfo: {
      contactPhone: undefined,
      contactEmail: undefined
    }
  }
}`,...n.parameters?.docs?.source},description:{story:"No contact information",...n.parameters?.docs?.description}}};const G=["Complete","PhoneOnly","EmailOnly","Empty"];export{o as Complete,r as EmailOnly,n as Empty,t as PhoneOnly,G as __namedExportsOrder,D as default};
