import{j as e}from"./iframe-DnZgF7bs.js";import{u as D,a as K,F as Y,c as f,d as k,b as L,e as N,f as U}from"./form-CFezdB__.js";import{B as A}from"./button-ByK4bP4Z.js";import{I as G}from"./input-XBIfvFIm.js";import{O as H}from"./otp-input-BCj7owUW.js";import{u as J}from"./user-CsBTq0tX.js";import{s as c}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-CAiuSp-P.js";import"./index-BMzLOmL9.js";import"./utils-CDN07tui.js";import"./label-CAfTcdZI.js";import"./index-Be03snLn.js";import"./index-ZqBm70yH.js";import"./index-B_jtOnfb.js";function Q(t){switch(t){case"bind":return{title:"绑定邮箱",currentLabel:null,emailLabel:"邮箱地址",emailPlaceholder:"请输入邮箱地址",submitText:"确认绑定",description:"首次绑定邮箱，验证后可用于登录和找回密码"};case"verify":return{title:"验证邮箱",currentLabel:"待验证的邮箱",emailLabel:null,emailPlaceholder:null,submitText:"确认验证",description:"您的邮箱尚未验证，请输入验证码完成验证"};case"update":return{title:"修改邮箱",currentLabel:"当前邮箱",emailLabel:"新邮箱地址",emailPlaceholder:"请输入新邮箱地址",submitText:"确认修改",description:"修改邮箱后，新邮箱将用于登录和接收通知"}}}function v({currentEmail:t="",mode:n,onSubmit:d,onSendOtp:l,isLoading:a=!1,isVerifying:m=!1,countdown:R=0}){const s=Q(n),r=D({resolver:K(J),defaultValues:{email:n==="verify"?t:"",otp:""}}),C=r.watch("email"),q=i=>{d(i)},z=async()=>{const i=n==="verify"?t:r.getValues("email");n!=="verify"&&!await r.trigger("email")||l(i)};return e.jsx(Y,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(q),className:"space-y-6",children:[s.description&&e.jsx("div",{className:"rounded-lg bg-primary/10 p-4",children:e.jsx("p",{className:"text-sm text-primary",children:s.description})}),s.currentLabel&&t&&e.jsx("div",{className:"rounded-lg bg-muted p-4",children:e.jsxs("p",{className:"text-sm text-muted-foreground",children:[s.currentLabel,"：",e.jsx("span",{className:"font-medium",children:t})]})}),e.jsxs("div",{className:"space-y-4",children:[s.emailLabel&&e.jsx(f,{control:r.control,name:"email",render:({field:i})=>e.jsxs(k,{children:[e.jsx(L,{className:"text-sm font-medium text-foreground",children:s.emailLabel}),e.jsx(N,{children:e.jsx(G,{...i,type:"email",placeholder:s.emailPlaceholder||"",className:"h-12",disabled:a})}),e.jsx(U,{})]})}),n==="verify"&&e.jsx(f,{control:r.control,name:"email",render:({field:i})=>e.jsx("input",{...i,type:"hidden"})}),e.jsx(f,{control:r.control,name:"otp",render:({field:i})=>e.jsxs(k,{children:[e.jsx(L,{className:"text-sm font-medium text-foreground",children:"邮箱验证码"}),e.jsx(N,{children:e.jsx(H,{value:i.value,onChange:i.onChange,onSendOtp:z,countdown:R,isLoading:a,isVerifying:m,placeholder:"6位数字",maxLength:6,disabled:n!=="verify"&&!C})}),e.jsx(U,{})]})})]}),e.jsx(A,{type:"submit",className:"w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium",disabled:a,children:a?"验证中...":s.submitText})]})})}v.__docgenInfo={description:"",methods:[],displayName:"UpdateEmailForm",props:{currentEmail:{required:!1,tsType:{name:"string"},description:"Current email address (empty for bind mode)",defaultValue:{value:'""',computed:!1}},mode:{required:!0,tsType:{name:"union",raw:'"bind" | "verify" | "update"',elements:[{name:"literal",value:'"bind"'},{name:"literal",value:'"verify"'},{name:"literal",value:'"update"'}]},description:"Form mode: bind (first time), verify (existing unverified), update (change verified)"},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdateEmailData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"updateEmailSchema"}],raw:"z.infer<typeof updateEmailSchema>"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isVerifying:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};var b,x,g,h,B,w,E,_,T,O,S,P,j,M,F;const{expect:V,userEvent:o,within:I}=__STORYBOOK_MODULE_TEST__,ue={title:"Security/UpdateEmailForm",component:v,parameters:{layout:"centered"},tags:["autodocs"]},u={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(v,{currentEmail:"",mode:"bind",onSubmit:t=>{c.info("Form submitted:",t)},onSendOtp:t=>{c.info("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=I(t),d=n.getByPlaceholderText("请输入邮箱地址");await o.type(d,"newemail@example.com",{delay:50});const l=n.getByRole("button",{name:/发送验证码/i});await o.click(l);const a=n.getByPlaceholderText("6位数字");await o.type(a,"123456",{delay:50});const m=n.getByRole("button",{name:/确认绑定/i});await V(m).toBeEnabled(),await o.click(m)}},p={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(v,{currentEmail:"user@example.com",mode:"verify",onSubmit:t=>{c.info("Form submitted:",t)},onSendOtp:t=>{c.info("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=I(t),d=n.getByRole("button",{name:/发送验证码/i});await o.click(d);const l=n.getByPlaceholderText("6位数字");await o.type(l,"123456",{delay:50});const a=n.getByRole("button",{name:/确认验证/i});await V(a).toBeEnabled(),await o.click(a)}},y={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(v,{currentEmail:"user@example.com",mode:"update",onSubmit:t=>{c.info("Form submitted:",t)},onSendOtp:t=>{c.info("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const n=I(t),d=n.getByPlaceholderText("请输入新邮箱地址");await o.type(d,"newemail@example.com",{delay:50});const l=n.getByRole("button",{name:/发送验证码/i});await o.click(l);const a=n.getByPlaceholderText("6位数字");await o.type(a,"123456",{delay:50});const m=n.getByRole("button",{name:/确认修改/i});await V(m).toBeEnabled(),await o.click(m)}};u.parameters={...u.parameters,docs:{...(b=u.parameters)===null||b===void 0?void 0:b.docs,source:{originalSource:`{
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
}`,...(g=u.parameters)===null||g===void 0||(x=g.docs)===null||x===void 0?void 0:x.source},description:{story:`Bind mode - First-time email binding
Shows form for users who haven't set up an email yet

Test steps:
1. Enter email address
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...(B=u.parameters)===null||B===void 0||(h=B.docs)===null||h===void 0?void 0:h.description}}};p.parameters={...p.parameters,docs:{...(w=p.parameters)===null||w===void 0?void 0:w.docs,source:{originalSource:`{
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
}`,...(_=p.parameters)===null||_===void 0||(E=_.docs)===null||E===void 0?void 0:E.source},description:{story:`Verify mode - Verify existing unverified email
Shows form for users who have set an email but haven't verified it
Email input is hidden, uses current email

Test steps:
1. Click send OTP button
2. Enter OTP code
3. Submit form`,...(O=p.parameters)===null||O===void 0||(T=O.docs)===null||T===void 0?void 0:T.description}}};y.parameters={...y.parameters,docs:{...(S=y.parameters)===null||S===void 0?void 0:S.docs,source:{originalSource:`{
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
}`,...(j=y.parameters)===null||j===void 0||(P=j.docs)===null||P===void 0?void 0:P.source},description:{story:`Update mode - Change verified email
Shows form for users changing their existing verified email

Test steps:
1. Enter new email address
2. Click send OTP button
3. Enter OTP code
4. Submit form`,...(F=y.parameters)===null||F===void 0||(M=F.docs)===null||M===void 0?void 0:M.description}}};const pe=["BindMode","VerifyMode","UpdateMode"];export{u as BindMode,y as UpdateMode,p as VerifyMode,pe as __namedExportsOrder,ue as default};
