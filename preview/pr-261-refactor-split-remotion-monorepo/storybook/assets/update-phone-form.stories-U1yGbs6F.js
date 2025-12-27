import{j as e}from"./iframe-vM1xkXS8.js";import{u as D,a as K,F as Y,c as y,d as V,b as L,e as k,f as U}from"./form-JEIa-UIH.js";import{O as A}from"./otp-input-Bn1xOSp3.js";import{B as G}from"./button-C4LX52gm.js";import{I as H}from"./input-CEt92iek.js";import{a as J}from"./user-CsBTq0tX.js";import{s as p}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-CAiuSp-P.js";import"./index-CHcTPGVs.js";import"./label-CICANfKc.js";import"./index-DkruQBh8.js";import"./index-B7PtnZVA.js";import"./utils-CDN07tui.js";import"./index-B_jtOnfb.js";function Q(n){switch(n){case"bind":return{title:"绑定手机号",currentLabel:null,phoneLabel:"手机号",phonePlaceholder:"请输入手机号",submitText:"确认绑定",description:"首次绑定手机号，验证后可用于登录和找回密码"};case"verify":return{title:"验证手机号",currentLabel:"待验证的手机号",phoneLabel:null,phonePlaceholder:null,submitText:"确认验证",description:"您的手机号尚未验证，请输入验证码完成验证"};case"update":return{title:"修改手机号",currentLabel:"当前手机号",phoneLabel:"新手机号",phonePlaceholder:"请输入新手机号",submitText:"确认修改",description:"修改手机号后，新手机号将用于登录和接收通知"}}}function h({currentPhoneNumber:n,mode:t,onSubmit:d,onSendOtp:u,isLoading:o=!1,isVerifying:m=!1,countdown:R=0}){const s=Q(t),i=D({resolver:K(J),defaultValues:{phoneNumber:t==="verify"&&n?n:"",otp:""}}),C=i.watch("phoneNumber"),q=r=>{d(r)},z=async()=>{const r=t==="verify"&&n?n:i.getValues("phoneNumber");t!=="verify"&&!await i.trigger("phoneNumber")||u(r)};return e.jsx(Y,{...i,children:e.jsxs("form",{onSubmit:i.handleSubmit(q),className:"space-y-6",children:[s.description&&e.jsx("div",{className:"rounded-lg bg-primary/10 p-4",children:e.jsx("p",{className:"text-sm text-primary",children:s.description})}),s.currentLabel&&n&&e.jsx("div",{className:"rounded-lg bg-muted p-4",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:[s.currentLabel,"：",e.jsx("span",{className:"font-medium",children:n})]})}),e.jsxs("div",{className:"space-y-4",children:[s.phoneLabel&&e.jsx(y,{control:i.control,name:"phoneNumber",render:({field:r})=>e.jsxs(V,{children:[e.jsx(L,{className:"text-sm font-medium text-foreground",children:s.phoneLabel}),e.jsx(k,{children:e.jsx(H,{...r,type:"tel",placeholder:s.phonePlaceholder||"",className:"h-12",maxLength:11,disabled:o})}),e.jsx(U,{})]})}),t==="verify"&&e.jsx(y,{control:i.control,name:"phoneNumber",render:({field:r})=>e.jsx("input",{...r,type:"hidden"})}),e.jsx(y,{control:i.control,name:"otp",render:({field:r})=>e.jsxs(V,{children:[e.jsx(L,{className:"text-sm font-medium text-foreground",children:"短信验证码"}),e.jsx(k,{children:e.jsx(A,{value:r.value,onChange:r.onChange,onSendOtp:z,countdown:R,isLoading:o,isVerifying:m,placeholder:"6位数字",maxLength:6,disabled:t!=="verify"&&!C})}),e.jsx(U,{})]})})]}),e.jsx(G,{type:"submit",className:"w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium",disabled:o,children:o?"验证中...":s.submitText})]})})}h.__docgenInfo={description:"",methods:[],displayName:"UpdatePhoneForm",props:{currentPhoneNumber:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"Current phone number (empty for bind mode)"},mode:{required:!0,tsType:{name:"union",raw:'"bind" | "verify" | "update"',elements:[{name:"literal",value:'"bind"'},{name:"literal",value:'"verify"'},{name:"literal",value:'"update"'}]},description:"Form mode: bind (first time), verify (existing unverified), update (change verified)"},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdatePhoneData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"updatePhoneSchema"}],raw:"z.infer<typeof updatePhoneSchema>"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isVerifying:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};var v,f,g,x,B,w,P,_,T,O,E,S,N,j,M;const{expect:F,userEvent:a,within:I}=__STORYBOOK_MODULE_TEST__,ce={title:"Security/UpdatePhoneForm",component:h,parameters:{layout:"centered"},tags:["autodocs"]},c={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(h,{currentPhoneNumber:null,mode:"bind",onSubmit:n=>{p.info("Form submitted:",n)},onSendOtp:n=>{p.info("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=I(n),d=t.getByPlaceholderText("请输入手机号");await a.type(d,"13987654321",{delay:50});const u=t.getByRole("button",{name:/发送验证码/i});await a.click(u);const o=t.getByPlaceholderText("6位数字");await a.type(o,"123456",{delay:50});const m=t.getByRole("button",{name:/确认绑定/i});await F(m).toBeEnabled(),await a.click(m)}},l={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(h,{currentPhoneNumber:"13812345678",mode:"verify",onSubmit:n=>{p.info("Form submitted:",n)},onSendOtp:n=>{p.info("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=I(n),d=t.getByRole("button",{name:/发送验证码/i});await a.click(d);const u=t.getByPlaceholderText("6位数字");await a.type(u,"123456",{delay:50});const o=t.getByRole("button",{name:/确认验证/i});await F(o).toBeEnabled(),await a.click(o)}},b={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(h,{currentPhoneNumber:"13812345678",mode:"update",onSubmit:n=>{p.info("Form submitted:",n)},onSendOtp:n=>{p.info("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const t=I(n),d=t.getByPlaceholderText("请输入新手机号");await a.type(d,"13987654321",{delay:50});const u=t.getByRole("button",{name:/发送验证码/i});await a.click(u);const o=t.getByPlaceholderText("6位数字");await a.type(o,"123456",{delay:50});const m=t.getByRole("button",{name:/确认修改/i});await F(m).toBeEnabled(),await a.click(m)}};c.parameters={...c.parameters,docs:{...(v=c.parameters)===null||v===void 0?void 0:v.docs,source:{originalSource:`{
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
}`,...(g=c.parameters)===null||g===void 0||(f=g.docs)===null||f===void 0?void 0:f.source},description:{story:`Bind mode - First-time phone number binding
Shows form for users who haven't set up a phone number yet

Test steps:
1. Enter phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...(B=c.parameters)===null||B===void 0||(x=B.docs)===null||x===void 0?void 0:x.description}}};l.parameters={...l.parameters,docs:{...(w=l.parameters)===null||w===void 0?void 0:w.docs,source:{originalSource:`{
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
}`,...(_=l.parameters)===null||_===void 0||(P=_.docs)===null||P===void 0?void 0:P.source},description:{story:`Verify mode - Verify existing unverified phone number
Shows form for users who have set a phone number but haven't verified it
Phone input is hidden, uses current phone number

Test steps:
1. Click send OTP button
2. Enter OTP code
3. Submit form`,...(O=l.parameters)===null||O===void 0||(T=O.docs)===null||T===void 0?void 0:T.description}}};b.parameters={...b.parameters,docs:{...(E=b.parameters)===null||E===void 0?void 0:E.docs,source:{originalSource:`{
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
}`,...(N=b.parameters)===null||N===void 0||(S=N.docs)===null||S===void 0?void 0:S.source},description:{story:`Update mode - Change verified phone number
Shows form for users changing their existing verified phone number

Test steps:
1. Enter new phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...(M=b.parameters)===null||M===void 0||(j=M.docs)===null||j===void 0?void 0:j.description}}};const le=["BindMode","VerifyMode","UpdateMode"];export{c as BindMode,b as UpdateMode,l as VerifyMode,le as __namedExportsOrder,ce as default};
