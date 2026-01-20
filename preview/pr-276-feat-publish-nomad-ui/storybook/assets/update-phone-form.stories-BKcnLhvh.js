import{r as U,j as a}from"./iframe-BY6WQ8rl.js";import{a as j}from"./zod-u2BPg-vl.js";import{u as L,F as q}from"./form-Cl4D1rHv.js";import{a as z}from"./update-phone-form-DjisV8wH.js";import"./otp-input-BLtKvdQh.js";import{a as D}from"./user-MfbVMCGJ.js";import{s as u}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-BKf9BodT.js";import"./index-Cg4mt3GG.js";import"./createLucideIcon-DhaeV68V.js";import"./label-CxilLX0s.js";import"./index-B6rVzEen.js";import"./index-DRfufKDV.js";import"./button-Bkd1CeD9.js";import"./input-D0mA3Bj2.js";import"./check-DNbWv-jy.js";import"./x-CoTNxCXn.js";import"./card-C2MAT-zL.js";import"./platform-CXbBvqhr.js";import"./circle-x-CqC3SdqK.js";import"./circle-alert-BdeKJeaD.js";import"./circle-check-big-CNw7CXee.js";function l({currentPhoneNumber:e,mode:n,onSubmit:r,onSendOtp:i,isLoading:o=!1,isVerifying:s=!1,countdown:y=0}){const d=L({resolver:j(D),defaultValues:{phoneNumber:n==="verify"&&e?e:"",otp:""}}),I=d.watch("phoneNumber"),F=U.useRef(!1);U.useEffect(()=>{y>0&&(F.current=!0)},[y]);const R=v=>{r(v)},C=async()=>{const v=n==="verify"&&e?e:d.getValues("phoneNumber");n!=="verify"&&!await d.trigger("phoneNumber")||i(v)};return a.jsx(q,{...d,children:a.jsx(z,{control:d.control,errors:d.formState.errors,onSubmit:d.handleSubmit(R),onSendOtp:C,currentPhoneNumber:e,phoneNumberValue:I,mode:n,isLoading:o,isVerifying:s,countdown:y,hasSent:F.current})})}l.__docgenInfo={description:`Container component for update phone form
Manages form state, schema validation, OTP countdown tracking`,methods:[],displayName:"UpdatePhoneFormContainer",props:{currentPhoneNumber:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"Current phone number (empty for bind mode)"},mode:{required:!0,tsType:{name:"union",raw:'"bind" | "verify" | "update"',elements:[{name:"literal",value:'"bind"'},{name:"literal",value:'"verify"'},{name:"literal",value:'"update"'}]},description:"Form mode: bind (first time), verify (existing unverified), update (change verified)"},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdatePhoneData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"updatePhoneSchema"}],raw:"z.infer<typeof updatePhoneSchema>"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isVerifying:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};var b,f,h,g,B,w,_,P,O,T,E,S,x,N,M;const{expect:V,userEvent:t,within:k}=__STORYBOOK_MODULE_TEST__,le={title:"Security/UpdatePhoneForm",component:l,parameters:{layout:"centered"},tags:["autodocs"]},m={render:()=>a.jsx("div",{className:"w-[500px] p-6",children:a.jsx(l,{currentPhoneNumber:null,mode:"bind",onSubmit:e=>{u.info("Form submitted:",e)},onSendOtp:e=>{u.info("OTP sent to:",e)}})}),play:async({canvasElement:e})=>{const n=k(e),r=n.getByPlaceholderText("请输入手机号");await t.type(r,"13987654321",{delay:50});const i=n.getByRole("button",{name:/发送验证码/i});await t.click(i);const o=n.getByPlaceholderText("6位数字");await t.type(o,"123456",{delay:50});const s=n.getByRole("button",{name:/确认绑定/i});await V(s).toBeEnabled(),await t.click(s)}},p={render:()=>a.jsx("div",{className:"w-[500px] p-6",children:a.jsx(l,{currentPhoneNumber:"13812345678",mode:"verify",onSubmit:e=>{u.info("Form submitted:",e)},onSendOtp:e=>{u.info("OTP sent to:",e)}})}),play:async({canvasElement:e})=>{const n=k(e),r=n.getByRole("button",{name:/发送验证码/i});await t.click(r);const i=n.getByPlaceholderText("6位数字");await t.type(i,"123456",{delay:50});const o=n.getByRole("button",{name:/确认验证/i});await V(o).toBeEnabled(),await t.click(o)}},c={render:()=>a.jsx("div",{className:"w-[500px] p-6",children:a.jsx(l,{currentPhoneNumber:"13812345678",mode:"update",onSubmit:e=>{u.info("Form submitted:",e)},onSendOtp:e=>{u.info("OTP sent to:",e)}})}),play:async({canvasElement:e})=>{const n=k(e),r=n.getByPlaceholderText("请输入新手机号");await t.type(r,"13987654321",{delay:50});const i=n.getByRole("button",{name:/发送验证码/i});await t.click(i);const o=n.getByPlaceholderText("6位数字");await t.type(o,"123456",{delay:50});const s=n.getByRole("button",{name:/确认修改/i});await V(s).toBeEnabled(),await t.click(s)}};m.parameters={...m.parameters,docs:{...(b=m.parameters)===null||b===void 0?void 0:b.docs,source:{originalSource:`{
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
}`,...(h=m.parameters)===null||h===void 0||(f=h.docs)===null||f===void 0?void 0:f.source},description:{story:`Bind mode - First-time phone number binding
Shows form for users who haven't set up a phone number yet

Test steps:
1. Enter phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...(B=m.parameters)===null||B===void 0||(g=B.docs)===null||g===void 0?void 0:g.description}}};p.parameters={...p.parameters,docs:{...(w=p.parameters)===null||w===void 0?void 0:w.docs,source:{originalSource:`{
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
}`,...(P=p.parameters)===null||P===void 0||(_=P.docs)===null||_===void 0?void 0:_.source},description:{story:`Verify mode - Verify existing unverified phone number
Shows form for users who have set a phone number but haven't verified it
Phone input is hidden, uses current phone number

Test steps:
1. Click send OTP button
2. Enter OTP code
3. Submit form`,...(T=p.parameters)===null||T===void 0||(O=T.docs)===null||O===void 0?void 0:O.description}}};c.parameters={...c.parameters,docs:{...(E=c.parameters)===null||E===void 0?void 0:E.docs,source:{originalSource:`{
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
}`,...(x=c.parameters)===null||x===void 0||(S=x.docs)===null||S===void 0?void 0:S.source},description:{story:`Update mode - Change verified phone number
Shows form for users changing their existing verified phone number

Test steps:
1. Enter new phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...(M=c.parameters)===null||M===void 0||(N=M.docs)===null||N===void 0?void 0:N.description}}};const ye=["BindMode","VerifyMode","UpdateMode"];export{m as BindMode,c as UpdateMode,p as VerifyMode,ye as __namedExportsOrder,le as default};
