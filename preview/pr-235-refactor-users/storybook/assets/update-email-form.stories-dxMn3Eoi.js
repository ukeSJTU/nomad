import{j as e}from"./iframe-D3UmJ5Ps.js";import{u as S,a as P,F as j,c as b,d as x,b as g,e as h,f as w}from"./form-Fz3h9h0g.js";import{O as F}from"./otp-input-DuHtwGwg.js";import{B as I}from"./button-CF6n2gtd.js";import{I as k}from"./input-D2jDX8qa.js";import{u as N}from"./user-CpyvJYSI.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-wRgyZonl.js";import"./index-7LbrOz3n.js";import"./label-_jbaPLkw.js";import"./index-Dehpka6e.js";import"./index-uS8gjby-.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";function V(t){switch(t){case"bind":return{title:"绑定邮箱",currentLabel:null,emailLabel:"邮箱地址",emailPlaceholder:"请输入邮箱地址",submitText:"确认绑定",description:"首次绑定邮箱，验证后可用于登录和找回密码"};case"verify":return{title:"验证邮箱",currentLabel:"待验证的邮箱",emailLabel:null,emailPlaceholder:null,submitText:"确认验证",description:"您的邮箱尚未验证，请输入验证码完成验证"};case"update":return{title:"修改邮箱",currentLabel:"当前邮箱",emailLabel:"新邮箱地址",emailPlaceholder:"请输入新邮箱地址",submitText:"确认修改",description:"修改邮箱后，新邮箱将用于登录和接收通知"}}}function y({currentEmail:t="",mode:n,onSubmit:l,onSendOtp:m,isLoading:a=!1,isVerifying:c=!1,countdown:B=0}){const i=V(n),r=S({resolver:P(N),defaultValues:{email:n==="verify"?t:"",otp:""}}),E=r.watch("email"),T=s=>{l(s)},O=async()=>{const s=n==="verify"?t:r.getValues("email");n!=="verify"&&!await r.trigger("email")||m(s)};return e.jsx(j,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(T),className:"space-y-6",children:[i.description&&e.jsx("div",{className:"rounded-lg bg-primary/10 p-4",children:e.jsx("p",{className:"text-sm text-primary",children:i.description})}),i.currentLabel&&t&&e.jsx("div",{className:"rounded-lg bg-muted p-4",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:[i.currentLabel,"：",e.jsx("span",{className:"font-medium",children:t})]})}),e.jsxs("div",{className:"space-y-4",children:[i.emailLabel&&e.jsx(b,{control:r.control,name:"email",render:({field:s})=>e.jsxs(x,{children:[e.jsx(g,{className:"text-sm font-medium text-foreground",children:i.emailLabel}),e.jsx(h,{children:e.jsx(k,{...s,type:"email",placeholder:i.emailPlaceholder||"",className:"h-12",disabled:a})}),e.jsx(w,{})]})}),n==="verify"&&e.jsx(b,{control:r.control,name:"email",render:({field:s})=>e.jsx("input",{...s,type:"hidden"})}),e.jsx(b,{control:r.control,name:"otp",render:({field:s})=>e.jsxs(x,{children:[e.jsx(g,{className:"text-sm font-medium text-foreground",children:"邮箱验证码"}),e.jsx(h,{children:e.jsx(F,{value:s.value,onChange:s.onChange,onSendOtp:O,countdown:B,isLoading:a,isVerifying:c,placeholder:"6位数字",maxLength:6,disabled:n!=="verify"&&!E})}),e.jsx(w,{})]})})]}),e.jsx(I,{type:"submit",className:"w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium",disabled:a,children:a?"验证中...":i.submitText})]})})}y.__docgenInfo={description:"",methods:[],displayName:"UpdateEmailForm",props:{currentEmail:{required:!1,tsType:{name:"string"},description:"Current email address (empty for bind mode)",defaultValue:{value:'""',computed:!1}},mode:{required:!0,tsType:{name:"union",raw:'"bind" | "verify" | "update"',elements:[{name:"literal",value:'"bind"'},{name:"literal",value:'"verify"'},{name:"literal",value:'"update"'}]},description:"Form mode: bind (first time), verify (existing unverified), update (change verified)"},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdateEmailData) => void",signature:{arguments:[{type:{name:"UpdateEmailData"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isVerifying:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const{expect:f,userEvent:o,within:v}=__STORYBOOK_MODULE_TEST__,Q={title:"Security/UpdateEmailForm",component:y,parameters:{layout:"centered"},tags:["autodocs"]},d={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(y,{currentEmail:"",mode:"bind",onSubmit:t=>{console.log("Form submitted:",t)},onSendOtp:t=>{console.log("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=v(t),l=n.getByPlaceholderText("请输入邮箱地址");await o.type(l,"newemail@example.com",{delay:50});const m=n.getByRole("button",{name:/发送验证码/i});await o.click(m);const a=n.getByPlaceholderText("6位数字");await o.type(a,"123456",{delay:50});const c=n.getByRole("button",{name:/确认绑定/i});await f(c).toBeEnabled(),await o.click(c)}},u={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(y,{currentEmail:"user@example.com",mode:"verify",onSubmit:t=>{console.log("Form submitted:",t)},onSendOtp:t=>{console.log("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=v(t),l=n.getByRole("button",{name:/发送验证码/i});await o.click(l);const m=n.getByPlaceholderText("6位数字");await o.type(m,"123456",{delay:50});const a=n.getByRole("button",{name:/确认验证/i});await f(a).toBeEnabled(),await o.click(a)}},p={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(y,{currentEmail:"user@example.com",mode:"update",onSubmit:t=>{console.log("Form submitted:",t)},onSendOtp:t=>{console.log("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=v(t),l=n.getByPlaceholderText("请输入新邮箱地址");await o.type(l,"newemail@example.com",{delay:50});const m=n.getByRole("button",{name:/发送验证码/i});await o.click(m);const a=n.getByPlaceholderText("6位数字");await o.type(a,"123456",{delay:50});const c=n.getByRole("button",{name:/确认修改/i});await f(c).toBeEnabled(),await o.click(c)}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdateEmailForm currentEmail="" mode="bind" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={email => {
      console.log("OTP sent to:", email);
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter email address
    const emailInput = canvas.getByPlaceholderText("请输入邮箱地址");
    await userEvent.type(emailInput, "newemail@example.com", {
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
}`,...d.parameters?.docs?.source},description:{story:`Bind mode - First-time email binding
Shows form for users who haven't set up an email yet

Test steps:
1. Enter email address
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...d.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdateEmailForm currentEmail="user@example.com" mode="verify" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={email => {
      console.log("OTP sent to:", email);
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
}`,...u.parameters?.docs?.source},description:{story:`Verify mode - Verify existing unverified email
Shows form for users who have set an email but haven't verified it
Email input is hidden, uses current email

Test steps:
1. Click send OTP button
2. Enter OTP code
3. Submit form`,...u.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdateEmailForm currentEmail="user@example.com" mode="update" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={email => {
      console.log("OTP sent to:", email);
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter new email address
    const emailInput = canvas.getByPlaceholderText("请输入新邮箱地址");
    await userEvent.type(emailInput, "newemail@example.com", {
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
}`,...p.parameters?.docs?.source},description:{story:`Update mode - Change verified email
Shows form for users changing their existing verified email

Test steps:
1. Enter new email address
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...p.parameters?.docs?.description}}};const W=["BindMode","VerifyMode","UpdateMode"];export{d as BindMode,p as UpdateMode,u as VerifyMode,W as __namedExportsOrder,Q as default};
