import{r as I,j as o}from"./iframe-CrLPMyef.js";import{a as L}from"./zod-YBRs5Al3.js";import{u as q,F as N}from"./form-vAtcQtf6.js";import{U as z}from"./update-phone-form-B5gPrmZO.js";import"./otp-input-DTSlPgKn.js";import{u as D}from"./user-MfbVMCGJ.js";import{s as m}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-BKf9BodT.js";import"./index-CCw5U8u4.js";import"./createLucideIcon-DzaTpkcS.js";import"./label-Dee_xcgp.js";import"./index-E-CxifyW.js";import"./index-DLC0D_9l.js";import"./button-C49Jt41H.js";import"./input-CBtiA9j3.js";import"./check-DD9V9MZB.js";import"./x-DszoDRII.js";import"./card-D-d6dHIy.js";import"./platform-DKvuCmmd.js";import"./circle-x-B6KCtiih.js";import"./circle-alert-Dy3v6eT1.js";import"./circle-check-big-H3xgBYGC.js";function p({currentEmail:e="",mode:t,onSubmit:i,onSendOtp:r,isLoading:a=!1,isVerifying:s=!1,countdown:y=0}){const d=q({resolver:L(D),defaultValues:{email:t==="verify"?e:"",otp:""}}),R=d.watch("email"),U=I.useRef(!1);I.useEffect(()=>{y>0&&(U.current=!0)},[y]);const C=v=>{i(v)},j=async()=>{const v=t==="verify"?e:d.getValues("email");t!=="verify"&&!await d.trigger("email")||r(v)};return o.jsx(N,{...d,children:o.jsx(z,{control:d.control,errors:d.formState.errors,onSubmit:d.handleSubmit(C),onSendOtp:j,currentEmail:e,emailValue:R,mode:t,isLoading:a,isVerifying:s,countdown:y,hasSent:U.current})})}p.__docgenInfo={description:`Container component for update email form
Manages form state, schema validation, OTP countdown tracking`,methods:[],displayName:"UpdateEmailFormContainer",props:{currentEmail:{required:!1,tsType:{name:"string"},description:"Current email address (empty for bind mode)",defaultValue:{value:'""',computed:!1}},mode:{required:!0,tsType:{name:"union",raw:'"bind" | "verify" | "update"',elements:[{name:"literal",value:'"bind"'},{name:"literal",value:'"verify"'},{name:"literal",value:'"update"'}]},description:"Form mode: bind (first time), verify (existing unverified), update (change verified)"},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdateEmailData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"updateEmailSchema"}],raw:"z.infer<typeof updateEmailSchema>"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isVerifying:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};var f,b,g,B,E,w,_,x,h,O,T,S,P,M,V;const{expect:k,userEvent:n,within:F}=__STORYBOOK_MODULE_TEST__,pe={title:"Security/UpdateEmailForm",component:p,parameters:{layout:"centered"},tags:["autodocs"]},l={render:()=>o.jsx("div",{className:"w-[500px] p-6",children:o.jsx(p,{currentEmail:"",mode:"bind",onSubmit:e=>{m.info("Form submitted:",e)},onSendOtp:e=>{m.info("OTP sent to:",e)}})}),play:async({canvasElement:e})=>{const t=F(e),i=t.getByPlaceholderText("请输入邮箱地址");await n.type(i,"newemail@example.com",{delay:50});const r=t.getByRole("button",{name:/发送验证码/i});await n.click(r);const a=t.getByPlaceholderText("6位数字");await n.type(a,"123456",{delay:50});const s=t.getByRole("button",{name:/确认绑定/i});await k(s).toBeEnabled(),await n.click(s)}},u={render:()=>o.jsx("div",{className:"w-[500px] p-6",children:o.jsx(p,{currentEmail:"user@example.com",mode:"verify",onSubmit:e=>{m.info("Form submitted:",e)},onSendOtp:e=>{m.info("OTP sent to:",e)}})}),play:async({canvasElement:e})=>{const t=F(e),i=t.getByRole("button",{name:/发送验证码/i});await n.click(i);const r=t.getByPlaceholderText("6位数字");await n.type(r,"123456",{delay:50});const a=t.getByRole("button",{name:/确认验证/i});await k(a).toBeEnabled(),await n.click(a)}},c={render:()=>o.jsx("div",{className:"w-[500px] p-6",children:o.jsx(p,{currentEmail:"user@example.com",mode:"update",onSubmit:e=>{m.info("Form submitted:",e)},onSendOtp:e=>{m.info("OTP sent to:",e)}})}),play:async({canvasElement:e})=>{const t=F(e),i=t.getByPlaceholderText("请输入新邮箱地址");await n.type(i,"newemail@example.com",{delay:50});const r=t.getByRole("button",{name:/发送验证码/i});await n.click(r);const a=t.getByPlaceholderText("6位数字");await n.type(a,"123456",{delay:50});const s=t.getByRole("button",{name:/确认修改/i});await k(s).toBeEnabled(),await n.click(s)}};l.parameters={...l.parameters,docs:{...(f=l.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
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
}`,...(g=l.parameters)===null||g===void 0||(b=g.docs)===null||b===void 0?void 0:b.source},description:{story:`Bind mode - First-time email binding
Shows form for users who haven't set up an email yet

Test steps:
1. Enter email address
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...(E=l.parameters)===null||E===void 0||(B=E.docs)===null||B===void 0?void 0:B.description}}};u.parameters={...u.parameters,docs:{...(w=u.parameters)===null||w===void 0?void 0:w.docs,source:{originalSource:`{
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
}`,...(x=u.parameters)===null||x===void 0||(_=x.docs)===null||_===void 0?void 0:_.source},description:{story:`Verify mode - Verify existing unverified email
Shows form for users who have set an email but haven't verified it
Email input is hidden, uses current email

Test steps:
1. Click send OTP button
2. Enter OTP code
3. Submit form`,...(O=u.parameters)===null||O===void 0||(h=O.docs)===null||h===void 0?void 0:h.description}}};c.parameters={...c.parameters,docs:{...(T=c.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
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
}`,...(P=c.parameters)===null||P===void 0||(S=P.docs)===null||S===void 0?void 0:S.source},description:{story:`Update mode - Change verified email
Shows form for users changing their existing verified email

Test steps:
1. Enter new email address
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...(V=c.parameters)===null||V===void 0||(M=V.docs)===null||M===void 0?void 0:M.description}}};const ye=["BindMode","VerifyMode","UpdateMode"];export{l as BindMode,c as UpdateMode,u as VerifyMode,ye as __namedExportsOrder,pe as default};
