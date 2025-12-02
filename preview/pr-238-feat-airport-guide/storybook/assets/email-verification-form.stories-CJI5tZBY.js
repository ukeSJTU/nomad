import{r as v,j as e}from"./iframe-DO7MqS-O.js";import{u as T,a as E,F as S,b as f,c as h,d as b,e as y,f as g}from"./form-C-PL_JnX.js";import{B as O}from"./button-D6r4UTqw.js";import{C as F}from"./checkbox-Bc8S01qk.js";import{I as B}from"./input-CbNRMdTN.js";import{e as N}from"./user-Cpge2W9s.js";import{O as k}from"./otp-input-Bmegsefr.js";import{s as u}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-wRgyZonl.js";import"./index-B5_TP-bN.js";import"./label-Dn1geXBv.js";import"./index-CuaK1QD-.js";import"./index-DUzmstHe.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-CVJqreMe.js";import"./index-Dy1kmfns.js";import"./index-DoHJPlh2.js";import"./index-0ebaCIAM.js";import"./check-6iQpsusU.js";import"./createLucideIcon-DMxW_M5D.js";function p({onSubmit:n,isLoading:t=!1,onSendOtp:o,countdown:x=0,onEmailChange:i}){const s=T({resolver:E(N),defaultValues:{email:"",otp:"",agreedToTerms:!1}}),r=s.watch("email");v.useEffect(()=>{i&&r&&i(r)},[r,i]);const w=a=>{n(a)},j=()=>{o&&o()};return e.jsx(S,{...s,children:e.jsxs("form",{onSubmit:s.handleSubmit(w),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(f,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"邮箱地址"}),e.jsx(h,{control:s.control,name:"email",render:({field:a})=>e.jsxs(b,{children:[e.jsx(y,{children:e.jsx(B,{...a,type:"email",placeholder:"请输入邮箱地址",className:"h-12"})}),e.jsx(g,{})]})})]}),e.jsx(h,{control:s.control,name:"otp",render:({field:a})=>e.jsxs(b,{children:[e.jsx(f,{className:"text-sm font-medium text-gray-700",children:"邮箱验证码"}),e.jsx(y,{children:e.jsx(k,{value:a.value,onChange:a.onChange,onSendOtp:j,countdown:x,isLoading:t,placeholder:"6位数字"})}),e.jsx(g,{})]})}),e.jsx(h,{control:s.control,name:"agreedToTerms",render:({field:a})=>e.jsxs(b,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(y,{children:e.jsx(F,{checked:a.value,onCheckedChange:a.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(f,{className:"text-sm text-gray-600",children:["同意《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(g,{})]})]})})]}),e.jsx(O,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:t,children:t?"验证中...":"下一步，设置密码"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 text-sm underline",children:"企业客户注册"})})]})})}p.__docgenInfo={description:"",methods:[],displayName:"EmailVerificationForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: EmailVerificationData) => void",signature:{arguments:[{type:{name:"EmailVerificationData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onEmailChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""}}};const{expect:P,userEvent:m,within:C}=__STORYBOOK_MODULE_TEST__,te={title:"Auth/Forms/EmailVerificationForm",component:p,parameters:{layout:"centered"},tags:["autodocs"]},c={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{u.info("Form submitted:",n)}})})},d={render:()=>{const[n,t]=v.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:o=>{u.info("Form submitted:",o)},onSendOtp:()=>{u.info("OTP sent"),t(60)},countdown:n})})}},l={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{u.info("Form submitted:",n)},onSendOtp:()=>{u.info("OTP sent")}})}),play:async({canvasElement:n})=>{const t=C(n),o=t.getByPlaceholderText("请输入邮箱地址");await m.type(o,"test@example.com",{delay:50});const x=t.getByRole("button",{name:/发送验证码/i});await m.click(x);const i=t.getByPlaceholderText("6位数字");await m.type(i,"123456",{delay:50});const s=t.getByRole("checkbox");await m.click(s);const r=t.getByRole("button",{name:/下一步/i});await P(r).toBeEnabled(),await m.click(r)}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailVerificationForm onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} />
    </div>
}`,...c.parameters?.docs?.source},description:{story:`Default email verification form
Shows the basic form structure with email, OTP input, and terms checkbox`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [countdown, setCountdown] = useState(60);
    return <div className="w-[400px] p-6">
        <EmailVerificationForm onSubmit={data => {
        storyLogger.info("Form submitted:", data);
      }} onSendOtp={() => {
        storyLogger.info("OTP sent");
        setCountdown(60);
      }} countdown={countdown} />
      </div>;
  }
}`,...d.parameters?.docs?.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...d.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailVerificationForm onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} onSendOtp={() => {
      storyLogger.info("OTP sent");
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter valid email address
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
}`,...l.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully completing the email verification flow

Test steps:
1. Enter valid email address
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in email-verification.test.tsx using RTL`,...l.parameters?.docs?.description}}};const ne=["Default","WithCountdown","HappyPath"];export{c as Default,l as HappyPath,d as WithCountdown,ne as __namedExportsOrder,te as default};
