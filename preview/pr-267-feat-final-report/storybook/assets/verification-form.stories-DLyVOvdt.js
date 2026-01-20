import{j as a,r as te}from"./iframe-CrLPMyef.js";import{a as ne}from"./zod-YBRs5Al3.js";import"./button-C49Jt41H.js";import{V as z}from"./verification-form-UPuzjJDX.js";import"./separator-BFZTMdF7.js";import"./card-D-d6dHIy.js";import{u as ae,F as re}from"./form-vAtcQtf6.js";import{s as q}from"./storybook-logger-DgFpE3wU.js";import{o as G,b as J,s as _}from"./schemas-BKf9BodT.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CCw5U8u4.js";import"./createLucideIcon-DzaTpkcS.js";import"./input-CBtiA9j3.js";import"./otp-input-DTSlPgKn.js";import"./check-DD9V9MZB.js";import"./x-DszoDRII.js";import"./checkbox-hlzRasDL.js";import"./index-B2BMd2ZM.js";import"./index-DLC0D_9l.js";import"./index-CXICuE6m.js";import"./index-3_PNoCtV.js";import"./tooltip-oeX-QRYP.js";import"./index-DBYj_96i.js";import"./index-B9BpXIRB.js";import"./index-Bzbtinzm.js";import"./index-DCZN-NHZ.js";import"./circle-alert-Dy3v6eT1.js";import"./index-E-CxifyW.js";import"./label-Dee_xcgp.js";var y,g,f,w,b,P,E,x,B,k,S,T,O,C,F,H,M,R,W,V,j,I,L,A,D,K,N,U,Y,$;const{expect:Q,userEvent:n,within:X}=__STORYBOOK_MODULE_TEST__,ie=G({contact:_().regex(/^1[3-9]\d{9}$/,"手机号格式不正确"),otp:_().length(6,"验证码必须是6位数字"),agreedToTerms:J().refine(o=>o===!0,{message:"请同意服务协议和隐私政策"})}),se=G({contact:_().email("邮箱格式不正确"),otp:_().length(6,"验证码必须是6位数字"),agreedToTerms:J().refine(o=>o===!0,{message:"请同意服务协议和隐私政策"})});function r({mode:o,countdown:e=0,isLoading:i=!1}){const[s,c]=te.useState(e),t=ae({resolver:ne(o==="phone"?ie:se),defaultValues:{contact:"",otp:"",agreedToTerms:!1}}),Z=()=>{q.info("OTP sent for",o),c(60)},ee=oe=>{q.info("Form submitted:",oe)};return a.jsx("div",{className:"w-[400px] p-6",children:a.jsx(re,{...t,children:a.jsx(z,{mode:o,control:t.control,errors:t.formState.errors,onSubmit:t.handleSubmit(ee),onSendOtp:Z,countdown:s,isLoading:i})})})}const je={title:"Auth/Forms/VerificationForm",component:z,parameters:{layout:"centered"},tags:["autodocs"]},d={render:()=>a.jsx(r,{mode:"phone"})},m={render:()=>a.jsx(r,{mode:"email"})},p={render:()=>a.jsx(r,{mode:"phone",countdown:60})},l={render:()=>a.jsx(r,{mode:"phone",isLoading:!0})},u={render:()=>a.jsx(r,{mode:"phone"}),play:async({canvasElement:o})=>{const e=X(o),i=e.getByPlaceholderText("请输入手机号");await n.type(i,"13812345678",{delay:50});const s=e.getByRole("button",{name:/发送验证码/i});await n.click(s);const c=e.getByPlaceholderText("6位数字");await n.type(c,"123456",{delay:50});const h=e.getByRole("checkbox");await n.click(h);const t=e.getByRole("button",{name:/下一步/i});await Q(t).toBeEnabled(),await n.click(t)}},v={render:()=>a.jsx(r,{mode:"email"}),play:async({canvasElement:o})=>{const e=X(o),i=e.getByPlaceholderText("请输入邮箱地址");await n.type(i,"test@example.com",{delay:50});const s=e.getByRole("button",{name:/发送验证码/i});await n.click(s);const c=e.getByPlaceholderText("6位数字");await n.type(c,"123456",{delay:50});const h=e.getByRole("checkbox");await n.click(h);const t=e.getByRole("button",{name:/下一步/i});await Q(t).toBeEnabled(),await n.click(t)}};d.parameters={...d.parameters,docs:{...(y=d.parameters)===null||y===void 0?void 0:y.docs,source:{originalSource:`{
  render: () => <VerificationFormWrapper mode="phone" />
}`,...(f=d.parameters)===null||f===void 0||(g=f.docs)===null||g===void 0?void 0:g.source},description:{story:`Phone verification form
Shows the form configured for phone number verification`,...(b=d.parameters)===null||b===void 0||(w=b.docs)===null||w===void 0?void 0:w.description}}};m.parameters={...m.parameters,docs:{...(P=m.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
  render: () => <VerificationFormWrapper mode="email" />
}`,...(x=m.parameters)===null||x===void 0||(E=x.docs)===null||E===void 0?void 0:E.source},description:{story:`Email verification form
Shows the form configured for email verification`,...(k=m.parameters)===null||k===void 0||(B=k.docs)===null||B===void 0?void 0:B.description}}};p.parameters={...p.parameters,docs:{...(S=p.parameters)===null||S===void 0?void 0:S.docs,source:{originalSource:`{
  render: () => <VerificationFormWrapper mode="phone" countdown={60} />
}`,...(O=p.parameters)===null||O===void 0||(T=O.docs)===null||T===void 0?void 0:T.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...(F=p.parameters)===null||F===void 0||(C=F.docs)===null||C===void 0?void 0:C.description}}};l.parameters={...l.parameters,docs:{...(H=l.parameters)===null||H===void 0?void 0:H.docs,source:{originalSource:`{
  render: () => <VerificationFormWrapper mode="phone" isLoading />
}`,...(R=l.parameters)===null||R===void 0||(M=R.docs)===null||M===void 0?void 0:M.source},description:{story:`Form in loading state
Shows disabled inputs and loading button text`,...(V=l.parameters)===null||V===void 0||(W=V.docs)===null||W===void 0?void 0:W.description}}};u.parameters={...u.parameters,docs:{...(j=u.parameters)===null||j===void 0?void 0:j.docs,source:{originalSource:`{
  render: () => <VerificationFormWrapper mode="phone" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter valid phone number
    const phoneInput = canvas.getByPlaceholderText("请输入手机号");
    await userEvent.type(phoneInput, "13812345678", {
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

    // 4. Agree to terms
    const termsCheckbox = canvas.getByRole("checkbox");
    await userEvent.click(termsCheckbox);

    // 5. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", {
      name: /下一步/i
    });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  }
}`,...(L=u.parameters)===null||L===void 0||(I=L.docs)===null||I===void 0?void 0:I.source},description:{story:`Happy Path smoke test - Phone
Simulates a user successfully completing the phone verification flow`,...(D=u.parameters)===null||D===void 0||(A=D.docs)===null||A===void 0?void 0:A.description}}};v.parameters={...v.parameters,docs:{...(K=v.parameters)===null||K===void 0?void 0:K.docs,source:{originalSource:`{
  render: () => <VerificationFormWrapper mode="email" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter valid email
    const emailInput = canvas.getByPlaceholderText("请输入邮箱地址");
    await userEvent.type(emailInput, "test@example.com", {
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

    // 4. Agree to terms
    const termsCheckbox = canvas.getByRole("checkbox");
    await userEvent.click(termsCheckbox);

    // 5. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", {
      name: /下一步/i
    });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  }
}`,...(U=v.parameters)===null||U===void 0||(N=U.docs)===null||N===void 0?void 0:N.source},description:{story:`Happy Path smoke test - Email
Simulates a user successfully completing the email verification flow`,...($=v.parameters)===null||$===void 0||(Y=$.docs)===null||Y===void 0?void 0:Y.description}}};const Ie=["PhoneMode","EmailMode","WithCountdown","Loading","PhoneHappyPath","EmailHappyPath"];export{v as EmailHappyPath,m as EmailMode,l as Loading,u as PhoneHappyPath,d as PhoneMode,p as WithCountdown,Ie as __namedExportsOrder,je as default};
