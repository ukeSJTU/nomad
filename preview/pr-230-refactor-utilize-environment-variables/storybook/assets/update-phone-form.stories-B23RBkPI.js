import{j as e}from"./iframe-LCGUhC9S.js";import{u as E,a as N,F as S,c as h,d as v,b as g,e as x,f as w}from"./form-B_JAN-PH.js";import{O as j}from"./otp-input-D3-0CQtq.js";import{B as F}from"./button-EUqSguQH.js";import{I}from"./input-BbnGTd1R.js";import{a as k}from"./user-d3ah7Ekd.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-wRgyZonl.js";import"./index-Bbe-iNQy.js";import"./label-Cz2tt3CU.js";import"./index-DTHdB7vg.js";import"./index-BwDiw9Xc.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";function V(n){switch(n){case"bind":return{title:"绑定手机号",currentLabel:null,phoneLabel:"手机号",phonePlaceholder:"请输入手机号",submitText:"确认绑定",description:"首次绑定手机号，验证后可用于登录和找回密码"};case"verify":return{title:"验证手机号",currentLabel:"待验证的手机号",phoneLabel:null,phonePlaceholder:null,submitText:"确认验证",description:"您的手机号尚未验证，请输入验证码完成验证"};case"update":return{title:"修改手机号",currentLabel:"当前手机号",phoneLabel:"新手机号",phonePlaceholder:"请输入新手机号",submitText:"确认修改",description:"修改手机号后，新手机号将用于登录和接收通知"}}}function b({currentPhoneNumber:n,mode:t,onSubmit:c,onSendOtp:d,isLoading:o=!1,isVerifying:u=!1,countdown:B=0}){const r=V(t),i=E({resolver:N(k),defaultValues:{phoneNumber:t==="verify"&&n?n.replace("+86",""):"",otp:""}}),P=i.watch("phoneNumber"),T=s=>{c(s)},O=async()=>{const s=t==="verify"&&n?n.replace("+86",""):i.getValues("phoneNumber");t!=="verify"&&!await i.trigger("phoneNumber")||d(s)};return e.jsx(S,{...i,children:e.jsxs("form",{onSubmit:i.handleSubmit(T),className:"space-y-6",children:[r.description&&e.jsx("div",{className:"rounded-lg bg-primary/10 p-4",children:e.jsx("p",{className:"text-sm text-primary",children:r.description})}),r.currentLabel&&n&&e.jsx("div",{className:"rounded-lg bg-muted p-4",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:[r.currentLabel,"：",e.jsx("span",{className:"font-medium",children:n})]})}),e.jsxs("div",{className:"space-y-4",children:[r.phoneLabel&&e.jsx(h,{control:i.control,name:"phoneNumber",render:({field:s})=>e.jsxs(v,{children:[e.jsx(g,{className:"text-sm font-medium text-foreground",children:r.phoneLabel}),e.jsx(x,{children:e.jsx(I,{...s,type:"tel",placeholder:r.phonePlaceholder||"",className:"h-12",maxLength:11,disabled:o})}),e.jsx(w,{})]})}),t==="verify"&&e.jsx(h,{control:i.control,name:"phoneNumber",render:({field:s})=>e.jsx("input",{...s,type:"hidden"})}),e.jsx(h,{control:i.control,name:"otp",render:({field:s})=>e.jsxs(v,{children:[e.jsx(g,{className:"text-sm font-medium text-foreground",children:"短信验证码"}),e.jsx(x,{children:e.jsx(j,{value:s.value,onChange:s.onChange,onSendOtp:O,countdown:B,isLoading:o,isVerifying:u,placeholder:"6位数字",maxLength:6,disabled:t!=="verify"&&!P})}),e.jsx(w,{})]})})]}),e.jsx(F,{type:"submit",className:"w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium",disabled:o,children:o?"验证中...":r.submitText})]})})}b.__docgenInfo={description:"",methods:[],displayName:"UpdatePhoneForm",props:{currentPhoneNumber:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"Current phone number (empty for bind mode)"},mode:{required:!0,tsType:{name:"union",raw:'"bind" | "verify" | "update"',elements:[{name:"literal",value:'"bind"'},{name:"literal",value:'"verify"'},{name:"literal",value:'"update"'}]},description:"Form mode: bind (first time), verify (existing unverified), update (change verified)"},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdatePhoneData) => void",signature:{arguments:[{type:{name:"UpdatePhoneData"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isVerifying:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const{expect:y,userEvent:a,within:f}=__STORYBOOK_MODULE_TEST__,Q={title:"Security/UpdatePhoneForm",component:b,parameters:{layout:"centered"},tags:["autodocs"]},l={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(b,{currentPhoneNumber:null,mode:"bind",onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:n=>{console.log("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=f(n),c=t.getByPlaceholderText("请输入手机号");await a.type(c,"13987654321",{delay:50});const d=t.getByRole("button",{name:/发送验证码/i});await a.click(d);const o=t.getByPlaceholderText("6位数字");await a.type(o,"123456",{delay:50});const u=t.getByRole("button",{name:/确认绑定/i});await y(u).toBeEnabled(),await a.click(u)}},m={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(b,{currentPhoneNumber:"+8613812345678",mode:"verify",onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:n=>{console.log("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=f(n),c=t.getByRole("button",{name:/发送验证码/i});await a.click(c);const d=t.getByPlaceholderText("6位数字");await a.type(d,"123456",{delay:50});const o=t.getByRole("button",{name:/确认验证/i});await y(o).toBeEnabled(),await a.click(o)}},p={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(b,{currentPhoneNumber:"+8613812345678",mode:"update",onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:n=>{console.log("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=f(n),c=t.getByPlaceholderText("请输入新手机号");await a.type(c,"13987654321",{delay:50});const d=t.getByRole("button",{name:/发送验证码/i});await a.click(d);const o=t.getByPlaceholderText("6位数字");await a.type(o,"123456",{delay:50});const u=t.getByRole("button",{name:/确认修改/i});await y(u).toBeEnabled(),await a.click(u)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdatePhoneForm currentPhoneNumber={null} mode="bind" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={phoneNumber => {
      console.log("OTP sent to:", phoneNumber);
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter phone number
    const phoneInput = canvas.getByPlaceholderText("请输入手机号");
    await userEvent.type(phoneInput, "13987654321", {
      delay: 50
    });

    // 2. Click send OTP button
    const sendOtpButton = canvas.getByRole("button", {
      name: /发送验证码/i
    });
    await userEvent.click(sendOtpButton);

    // 3. Enter OTP code
    const otpInput = canvas.getByPlaceholderText("6位数字");
    await userEvent.type(otpInput, "123456", {
      delay: 50
    });

    // 4. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", {
      name: /确认绑定/i
    });
    await expect(submitButton).toBeEnabled();

    // 5. Submit form
    await userEvent.click(submitButton);
  }
}`,...l.parameters?.docs?.source},description:{story:`Bind mode - First-time phone number binding
Shows form for users who haven't set up a phone number yet

Test steps:
1. Enter phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...l.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdatePhoneForm currentPhoneNumber="+8613812345678" mode="verify" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={phoneNumber => {
      console.log("OTP sent to:", phoneNumber);
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Click send OTP button
    const sendOtpButton = canvas.getByRole("button", {
      name: /发送验证码/i
    });
    await userEvent.click(sendOtpButton);

    // 2. Enter OTP code
    const otpInput = canvas.getByPlaceholderText("6位数字");
    await userEvent.type(otpInput, "123456", {
      delay: 50
    });

    // 3. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", {
      name: /确认验证/i
    });
    await expect(submitButton).toBeEnabled();

    // 4. Submit form
    await userEvent.click(submitButton);
  }
}`,...m.parameters?.docs?.source},description:{story:`Verify mode - Verify existing unverified phone number
Shows form for users who have set a phone number but haven't verified it
Phone input is hidden, uses current phone number

Test steps:
1. Click send OTP button
2. Enter OTP code
3. Submit form`,...m.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdatePhoneForm currentPhoneNumber="+8613812345678" mode="update" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={phoneNumber => {
      console.log("OTP sent to:", phoneNumber);
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter new phone number
    const phoneInput = canvas.getByPlaceholderText("请输入新手机号");
    await userEvent.type(phoneInput, "13987654321", {
      delay: 50
    });

    // 2. Click send OTP button
    const sendOtpButton = canvas.getByRole("button", {
      name: /发送验证码/i
    });
    await userEvent.click(sendOtpButton);

    // 3. Enter OTP code
    const otpInput = canvas.getByPlaceholderText("6位数字");
    await userEvent.type(otpInput, "123456", {
      delay: 50
    });

    // 4. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", {
      name: /确认修改/i
    });
    await expect(submitButton).toBeEnabled();

    // 5. Submit form
    await userEvent.click(submitButton);
  }
}`,...p.parameters?.docs?.source},description:{story:`Update mode - Change verified phone number
Shows form for users changing their existing verified phone number

Test steps:
1. Enter new phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...p.parameters?.docs?.description}}};const W=["BindMode","VerifyMode","UpdateMode"];export{l as BindMode,p as UpdateMode,m as VerifyMode,W as __namedExportsOrder,Q as default};
