import{j as e}from"./iframe-CL-8pR8w.js";import{u as P,a as j,F,c as b,d as g,b as h,e as w,f as B}from"./form-898bKGcH.js";import{O as I}from"./otp-input-lHozUv6P.js";import{B as k}from"./button-Dy55OBv8.js";import{I as L}from"./input-Df5qNFHq.js";import{u as N}from"./user-8jLcKeKl.js";import{s as c}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-wRgyZonl.js";import"./index-A2dut05u.js";import"./label-D8SWcPZ7.js";import"./index-CQrs8XKb.js";import"./index-DrHz6ks7.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";function V(t){switch(t){case"bind":return{title:"绑定邮箱",currentLabel:null,emailLabel:"邮箱地址",emailPlaceholder:"请输入邮箱地址",submitText:"确认绑定",description:"首次绑定邮箱，验证后可用于登录和找回密码"};case"verify":return{title:"验证邮箱",currentLabel:"待验证的邮箱",emailLabel:null,emailPlaceholder:null,submitText:"确认验证",description:"您的邮箱尚未验证，请输入验证码完成验证"};case"update":return{title:"修改邮箱",currentLabel:"当前邮箱",emailLabel:"新邮箱地址",emailPlaceholder:"请输入新邮箱地址",submitText:"确认修改",description:"修改邮箱后，新邮箱将用于登录和接收通知"}}}function f({currentEmail:t="",mode:n,onSubmit:m,onSendOtp:l,isLoading:a=!1,isVerifying:d=!1,countdown:E=0}){const o=V(n),r=P({resolver:j(N),defaultValues:{email:n==="verify"?t:"",otp:""}}),T=r.watch("email"),O=s=>{m(s)},S=async()=>{const s=n==="verify"?t:r.getValues("email");n!=="verify"&&!await r.trigger("email")||l(s)};return e.jsx(F,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(O),className:"space-y-6",children:[o.description&&e.jsx("div",{className:"rounded-lg bg-primary/10 p-4",children:e.jsx("p",{className:"text-sm text-primary",children:o.description})}),o.currentLabel&&t&&e.jsx("div",{className:"rounded-lg bg-muted p-4",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:[o.currentLabel,"：",e.jsx("span",{className:"font-medium",children:t})]})}),e.jsxs("div",{className:"space-y-4",children:[o.emailLabel&&e.jsx(b,{control:r.control,name:"email",render:({field:s})=>e.jsxs(g,{children:[e.jsx(h,{className:"text-sm font-medium text-foreground",children:o.emailLabel}),e.jsx(w,{children:e.jsx(L,{...s,type:"email",placeholder:o.emailPlaceholder||"",className:"h-12",disabled:a})}),e.jsx(B,{})]})}),n==="verify"&&e.jsx(b,{control:r.control,name:"email",render:({field:s})=>e.jsx("input",{...s,type:"hidden"})}),e.jsx(b,{control:r.control,name:"otp",render:({field:s})=>e.jsxs(g,{children:[e.jsx(h,{className:"text-sm font-medium text-foreground",children:"邮箱验证码"}),e.jsx(w,{children:e.jsx(I,{value:s.value,onChange:s.onChange,onSendOtp:S,countdown:E,isLoading:a,isVerifying:d,placeholder:"6位数字",maxLength:6,disabled:n!=="verify"&&!T})}),e.jsx(B,{})]})})]}),e.jsx(k,{type:"submit",className:"w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium",disabled:a,children:a?"验证中...":o.submitText})]})})}f.__docgenInfo={description:"",methods:[],displayName:"UpdateEmailForm",props:{currentEmail:{required:!1,tsType:{name:"string"},description:"Current email address (empty for bind mode)",defaultValue:{value:'""',computed:!1}},mode:{required:!0,tsType:{name:"union",raw:'"bind" | "verify" | "update"',elements:[{name:"literal",value:'"bind"'},{name:"literal",value:'"verify"'},{name:"literal",value:'"update"'}]},description:"Form mode: bind (first time), verify (existing unverified), update (change verified)"},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdateEmailData) => void",signature:{arguments:[{type:{name:"UpdateEmailData"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isVerifying:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const{expect:v,userEvent:i,within:x}=__STORYBOOK_MODULE_TEST__,X={title:"Security/UpdateEmailForm",component:f,parameters:{layout:"centered"},tags:["autodocs"]},u={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(f,{currentEmail:"",mode:"bind",onSubmit:t=>{c.info("Form submitted:",t)},onSendOtp:t=>{c.info("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=x(t),m=n.getByPlaceholderText("请输入邮箱地址");await i.type(m,"newemail@example.com",{delay:50});const l=n.getByRole("button",{name:/发送验证码/i});await i.click(l);const a=n.getByPlaceholderText("6位数字");await i.type(a,"123456",{delay:50});const d=n.getByRole("button",{name:/确认绑定/i});await v(d).toBeEnabled(),await i.click(d)}},p={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(f,{currentEmail:"user@example.com",mode:"verify",onSubmit:t=>{c.info("Form submitted:",t)},onSendOtp:t=>{c.info("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=x(t),m=n.getByRole("button",{name:/发送验证码/i});await i.click(m);const l=n.getByPlaceholderText("6位数字");await i.type(l,"123456",{delay:50});const a=n.getByRole("button",{name:/确认验证/i});await v(a).toBeEnabled(),await i.click(a)}},y={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(f,{currentEmail:"user@example.com",mode:"update",onSubmit:t=>{c.info("Form submitted:",t)},onSendOtp:t=>{c.info("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=x(t),m=n.getByPlaceholderText("请输入新邮箱地址");await i.type(m,"newemail@example.com",{delay:50});const l=n.getByRole("button",{name:/发送验证码/i});await i.click(l);const a=n.getByPlaceholderText("6位数字");await i.type(a,"123456",{delay:50});const d=n.getByRole("button",{name:/确认修改/i});await v(d).toBeEnabled(),await i.click(d)}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdateEmailForm currentEmail="" mode="bind" onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} onSendOtp={email => {
      storyLogger.info("OTP sent to:", email);
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
}`,...u.parameters?.docs?.source},description:{story:`Bind mode - First-time email binding
Shows form for users who haven't set up an email yet

Test steps:
1. Enter email address
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...u.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdateEmailForm currentEmail="user@example.com" mode="verify" onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} onSendOtp={email => {
      storyLogger.info("OTP sent to:", email);
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
}`,...p.parameters?.docs?.source},description:{story:`Verify mode - Verify existing unverified email
Shows form for users who have set an email but haven't verified it
Email input is hidden, uses current email

Test steps:
1. Click send OTP button
2. Enter OTP code
3. Submit form`,...p.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdateEmailForm currentEmail="user@example.com" mode="update" onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} onSendOtp={email => {
      storyLogger.info("OTP sent to:", email);
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
}`,...y.parameters?.docs?.source},description:{story:`Update mode - Change verified email
Shows form for users changing their existing verified email

Test steps:
1. Enter new email address
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...y.parameters?.docs?.description}}};const Z=["BindMode","VerifyMode","UpdateMode"];export{u as BindMode,y as UpdateMode,p as VerifyMode,Z as __namedExportsOrder,X as default};
