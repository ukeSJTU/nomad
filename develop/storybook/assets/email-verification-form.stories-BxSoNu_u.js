import{r as w,j as e}from"./iframe-DI5Oy9RL.js";import{u as E,a as S,F as N,d as x,b as h,c as b,e as f,f as g}from"./form-BSdmRely.js";import{B as y}from"./button-C3F4HPdX.js";import{C as O}from"./checkbox-5LBPnSo2.js";import{I as v}from"./input-BWKQru72.js";import{b as k}from"./auth-CmJUVIQY.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-dlpNQSCA.js";import"./index-DCU1OT1a.js";import"./label-BAvIbR7K.js";import"./index-DQyPI5TK.js";import"./index-n-UeRsni.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-5SmAaEk-.js";import"./index-NM0MU2HX.js";import"./index-IoNmgYKw.js";import"./index-C2m6zttO.js";import"./index-D4Vi1ckl.js";import"./index-CQaLpz_J.js";import"./check-Buze8Ocw.js";import"./createLucideIcon-BhzAdi9T.js";function p({onSubmit:n,isLoading:t=!1,onSendOtp:o,countdown:i=0,onEmailChange:c}){const s=E({resolver:S(k),defaultValues:{email:"",otp:"",agreedToTerms:!1}}),r=s.watch("email");w.useEffect(()=>{c&&r&&c(r)},[r,c]);const j=a=>{n(a)},T=()=>{o&&o()};return e.jsx(N,{...s,children:e.jsxs("form",{onSubmit:s.handleSubmit(j),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"邮箱地址"}),e.jsx(h,{control:s.control,name:"email",render:({field:a})=>e.jsxs(b,{children:[e.jsx(f,{children:e.jsx(v,{...a,type:"email",placeholder:"请输入邮箱地址",className:"h-12"})}),e.jsx(g,{})]})})]}),e.jsxs("div",{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"邮箱验证码"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(h,{control:s.control,name:"otp",render:({field:a})=>e.jsxs(b,{className:"flex-1",children:[e.jsx(f,{children:e.jsx(v,{...a,placeholder:"6位数字",className:"h-12",maxLength:6})}),e.jsx(g,{})]})}),e.jsx(y,{type:"button",variant:"outline",className:"h-12 px-4 text-blue-600 border-blue-600 hover:bg-blue-50",onClick:T,disabled:i>0||t,children:i>0?`${i}s`:"发送验证码"})]})]}),e.jsx(h,{control:s.control,name:"agreedToTerms",render:({field:a})=>e.jsxs(b,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(f,{children:e.jsx(O,{checked:a.value,onCheckedChange:a.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(x,{className:"text-sm text-gray-600",children:["同意《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(g,{})]})]})})]}),e.jsx(y,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:t,children:t?"验证中...":"下一步，设置密码"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 text-sm underline",children:"企业客户注册"})})]})})}p.__docgenInfo={description:"",methods:[],displayName:"EmailVerificationForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: EmailVerificationData) => void",signature:{arguments:[{type:{name:"EmailVerificationData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onEmailChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""}}};const{expect:B,userEvent:m,within:F}=__STORYBOOK_MODULE_TEST__,Z={title:"Auth/EmailVerificationForm",component:p,parameters:{layout:"centered"},tags:["autodocs"]},l={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{console.log("Form submitted:",n)}})})},d={render:()=>{const[n,t]=w.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:o=>{console.log("Form submitted:",o)},onSendOtp:()=>{console.log("OTP sent"),t(60)},countdown:n})})}},u={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:()=>{console.log("OTP sent")}})}),play:async({canvasElement:n})=>{const t=F(n),o=t.getByPlaceholderText("请输入邮箱地址");await m.type(o,"test@example.com",{delay:50});const i=t.getByRole("button",{name:/发送验证码/i});await m.click(i);const c=t.getByPlaceholderText("6位数字");await m.type(c,"123456",{delay:50});const s=t.getByRole("checkbox");await m.click(s);const r=t.getByRole("button",{name:/下一步/i});await B(r).toBeEnabled(),await m.click(r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailVerificationForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...l.parameters?.docs?.source},description:{story:`Default email verification form
Shows the basic form structure with email, OTP input, and terms checkbox`,...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [countdown, setCountdown] = useState(60);
    return <div className="w-[400px] p-6">
        <EmailVerificationForm onSubmit={data => {
        console.log("Form submitted:", data);
      }} onSendOtp={() => {
        console.log("OTP sent");
        setCountdown(60);
      }} countdown={countdown} />
      </div>;
  }
}`,...d.parameters?.docs?.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...d.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailVerificationForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={() => {
      console.log("OTP sent");
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
}`,...u.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully completing the email verification flow

Test steps:
1. Enter valid email address
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in email-verification.test.tsx using RTL`,...u.parameters?.docs?.description}}};const ee=["Default","WithCountdown","HappyPath"];export{l as Default,u as HappyPath,d as WithCountdown,ee as __namedExportsOrder,Z as default};
