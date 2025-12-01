import{r as y,j as e}from"./iframe-LCGUhC9S.js";import{u as j,a as T,F as E,b as x,c as h,d as b,e as f,f as g}from"./form-B_JAN-PH.js";import{B as S}from"./button-EUqSguQH.js";import{C as O}from"./checkbox-BOp6Atsb.js";import{I as F}from"./input-BbnGTd1R.js";import{e as B}from"./user-d3ah7Ekd.js";import{O as N}from"./otp-input-D3-0CQtq.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-wRgyZonl.js";import"./index-Bbe-iNQy.js";import"./label-Cz2tt3CU.js";import"./index-DTHdB7vg.js";import"./index-BwDiw9Xc.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-C-T2dbk8.js";import"./index-Sb7uAM8S.js";import"./index-Bsxp1Kcf.js";import"./index-BubtH8dv.js";import"./check-BP8VfoH5.js";import"./createLucideIcon-CZaq6Aio.js";function u({onSubmit:n,isLoading:t=!1,onSendOtp:s,countdown:p=0,onEmailChange:i}){const o=j({resolver:T(B),defaultValues:{email:"",otp:"",agreedToTerms:!1}}),r=o.watch("email");y.useEffect(()=>{i&&r&&i(r)},[r,i]);const v=a=>{n(a)},w=()=>{s&&s()};return e.jsx(E,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(v),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"邮箱地址"}),e.jsx(h,{control:o.control,name:"email",render:({field:a})=>e.jsxs(b,{children:[e.jsx(f,{children:e.jsx(F,{...a,type:"email",placeholder:"请输入邮箱地址",className:"h-12"})}),e.jsx(g,{})]})})]}),e.jsx(h,{control:o.control,name:"otp",render:({field:a})=>e.jsxs(b,{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700",children:"邮箱验证码"}),e.jsx(f,{children:e.jsx(N,{value:a.value,onChange:a.onChange,onSendOtp:w,countdown:p,isLoading:t,placeholder:"6位数字"})}),e.jsx(g,{})]})}),e.jsx(h,{control:o.control,name:"agreedToTerms",render:({field:a})=>e.jsxs(b,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(f,{children:e.jsx(O,{checked:a.value,onCheckedChange:a.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(x,{className:"text-sm text-gray-600",children:["同意《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(g,{})]})]})})]}),e.jsx(S,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:t,children:t?"验证中...":"下一步，设置密码"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 text-sm underline",children:"企业客户注册"})})]})})}u.__docgenInfo={description:"",methods:[],displayName:"EmailVerificationForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: EmailVerificationData) => void",signature:{arguments:[{type:{name:"EmailVerificationData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onEmailChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""}}};const{expect:k,userEvent:c,within:P}=__STORYBOOK_MODULE_TEST__,$={title:"Auth/Forms/EmailVerificationForm",component:u,parameters:{layout:"centered"},tags:["autodocs"]},m={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:n=>{console.log("Form submitted:",n)}})})},l={render:()=>{const[n,t]=y.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:s=>{console.log("Form submitted:",s)},onSendOtp:()=>{console.log("OTP sent"),t(60)},countdown:n})})}},d={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:()=>{console.log("OTP sent")}})}),play:async({canvasElement:n})=>{const t=P(n),s=t.getByPlaceholderText("请输入邮箱地址");await c.type(s,"test@example.com",{delay:50});const p=t.getByRole("button",{name:/发送验证码/i});await c.click(p);const i=t.getByPlaceholderText("6位数字");await c.type(i,"123456",{delay:50});const o=t.getByRole("checkbox");await c.click(o);const r=t.getByRole("button",{name:/下一步/i});await k(r).toBeEnabled(),await c.click(r)}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailVerificationForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Default email verification form
Shows the basic form structure with email, OTP input, and terms checkbox`,...m.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully completing the email verification flow

Test steps:
1. Enter valid email address
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in email-verification.test.tsx using RTL`,...d.parameters?.docs?.description}}};const ee=["Default","WithCountdown","HappyPath"];export{m as Default,d as HappyPath,l as WithCountdown,ee as __namedExportsOrder,$ as default};
