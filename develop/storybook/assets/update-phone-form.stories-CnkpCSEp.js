import{j as e}from"./iframe-2k9161tj.js";import{u as N,a as S,F as j,c as y,d as g,b as x,e as w,f as B}from"./form-DZKea43x.js";import{O as F}from"./otp-input-DCruJTXy.js";import{B as I}from"./button-cP9VPCCL.js";import{I as L}from"./input-CimLLHWw.js";import{a as k}from"./user-8jLcKeKl.js";import{s as m}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-wRgyZonl.js";import"./index-D-JkSUZA.js";import"./label-VM71XCtS.js";import"./index-R8C-BYxc.js";import"./index-DR82RdiX.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";function V(n){switch(n){case"bind":return{title:"绑定手机号",currentLabel:null,phoneLabel:"手机号",phonePlaceholder:"请输入手机号",submitText:"确认绑定",description:"首次绑定手机号，验证后可用于登录和找回密码"};case"verify":return{title:"验证手机号",currentLabel:"待验证的手机号",phoneLabel:null,phonePlaceholder:null,submitText:"确认验证",description:"您的手机号尚未验证，请输入验证码完成验证"};case"update":return{title:"修改手机号",currentLabel:"当前手机号",phoneLabel:"新手机号",phonePlaceholder:"请输入新手机号",submitText:"确认修改",description:"修改手机号后，新手机号将用于登录和接收通知"}}}function h({currentPhoneNumber:n,mode:t,onSubmit:d,onSendOtp:u,isLoading:o=!1,isVerifying:c=!1,countdown:P=0}){const s=V(t),i=N({resolver:S(k),defaultValues:{phoneNumber:t==="verify"&&n?n:"",otp:""}}),T=i.watch("phoneNumber"),O=r=>{d(r)},E=async()=>{const r=t==="verify"&&n?n:i.getValues("phoneNumber");t!=="verify"&&!await i.trigger("phoneNumber")||u(r)};return e.jsx(j,{...i,children:e.jsxs("form",{onSubmit:i.handleSubmit(O),className:"space-y-6",children:[s.description&&e.jsx("div",{className:"rounded-lg bg-primary/10 p-4",children:e.jsx("p",{className:"text-sm text-primary",children:s.description})}),s.currentLabel&&n&&e.jsx("div",{className:"rounded-lg bg-muted p-4",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:[s.currentLabel,"：",e.jsx("span",{className:"font-medium",children:n})]})}),e.jsxs("div",{className:"space-y-4",children:[s.phoneLabel&&e.jsx(y,{control:i.control,name:"phoneNumber",render:({field:r})=>e.jsxs(g,{children:[e.jsx(x,{className:"text-sm font-medium text-foreground",children:s.phoneLabel}),e.jsx(w,{children:e.jsx(L,{...r,type:"tel",placeholder:s.phonePlaceholder||"",className:"h-12",maxLength:11,disabled:o})}),e.jsx(B,{})]})}),t==="verify"&&e.jsx(y,{control:i.control,name:"phoneNumber",render:({field:r})=>e.jsx("input",{...r,type:"hidden"})}),e.jsx(y,{control:i.control,name:"otp",render:({field:r})=>e.jsxs(g,{children:[e.jsx(x,{className:"text-sm font-medium text-foreground",children:"短信验证码"}),e.jsx(w,{children:e.jsx(F,{value:r.value,onChange:r.onChange,onSendOtp:E,countdown:P,isLoading:o,isVerifying:c,placeholder:"6位数字",maxLength:6,disabled:t!=="verify"&&!T})}),e.jsx(B,{})]})})]}),e.jsx(I,{type:"submit",className:"w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium",disabled:o,children:o?"验证中...":s.submitText})]})})}h.__docgenInfo={description:"",methods:[],displayName:"UpdatePhoneForm",props:{currentPhoneNumber:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"Current phone number (empty for bind mode)"},mode:{required:!0,tsType:{name:"union",raw:'"bind" | "verify" | "update"',elements:[{name:"literal",value:'"bind"'},{name:"literal",value:'"verify"'},{name:"literal",value:'"update"'}]},description:"Form mode: bind (first time), verify (existing unverified), update (change verified)"},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdatePhoneData) => void",signature:{arguments:[{type:{name:"UpdatePhoneData"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isVerifying:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const{expect:f,userEvent:a,within:v}=__STORYBOOK_MODULE_TEST__,X={title:"Security/UpdatePhoneForm",component:h,parameters:{layout:"centered"},tags:["autodocs"]},p={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(h,{currentPhoneNumber:null,mode:"bind",onSubmit:n=>{m.info("Form submitted:",n)},onSendOtp:n=>{m.info("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=v(n),d=t.getByPlaceholderText("请输入手机号");await a.type(d,"13987654321",{delay:50});const u=t.getByRole("button",{name:/发送验证码/i});await a.click(u);const o=t.getByPlaceholderText("6位数字");await a.type(o,"123456",{delay:50});const c=t.getByRole("button",{name:/确认绑定/i});await f(c).toBeEnabled(),await a.click(c)}},l={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(h,{currentPhoneNumber:"13812345678",mode:"verify",onSubmit:n=>{m.info("Form submitted:",n)},onSendOtp:n=>{m.info("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=v(n),d=t.getByRole("button",{name:/发送验证码/i});await a.click(d);const u=t.getByPlaceholderText("6位数字");await a.type(u,"123456",{delay:50});const o=t.getByRole("button",{name:/确认验证/i});await f(o).toBeEnabled(),await a.click(o)}},b={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(h,{currentPhoneNumber:"13812345678",mode:"update",onSubmit:n=>{m.info("Form submitted:",n)},onSendOtp:n=>{m.info("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=v(n),d=t.getByPlaceholderText("请输入新手机号");await a.type(d,"13987654321",{delay:50});const u=t.getByRole("button",{name:/发送验证码/i});await a.click(u);const o=t.getByPlaceholderText("6位数字");await a.type(o,"123456",{delay:50});const c=t.getByRole("button",{name:/确认修改/i});await f(c).toBeEnabled(),await a.click(c)}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdatePhoneForm currentPhoneNumber={null} mode="bind" onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} onSendOtp={phoneNumber => {
      storyLogger.info("OTP sent to:", phoneNumber);
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
}`,...p.parameters?.docs?.source},description:{story:`Bind mode - First-time phone number binding
Shows form for users who haven't set up a phone number yet

Test steps:
1. Enter phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...p.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdatePhoneForm currentPhoneNumber="13812345678" mode="verify" onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} onSendOtp={phoneNumber => {
      storyLogger.info("OTP sent to:", phoneNumber);
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
}`,...l.parameters?.docs?.source},description:{story:`Verify mode - Verify existing unverified phone number
Shows form for users who have set a phone number but haven't verified it
Phone input is hidden, uses current phone number

Test steps:
1. Click send OTP button
2. Enter OTP code
3. Submit form`,...l.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdatePhoneForm currentPhoneNumber="13812345678" mode="update" onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} onSendOtp={phoneNumber => {
      storyLogger.info("OTP sent to:", phoneNumber);
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
}`,...b.parameters?.docs?.source},description:{story:`Update mode - Change verified phone number
Shows form for users changing their existing verified phone number

Test steps:
1. Enter new phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...b.parameters?.docs?.description}}};const Z=["BindMode","VerifyMode","UpdateMode"];export{p as BindMode,b as UpdateMode,l as VerifyMode,Z as __namedExportsOrder,X as default};
