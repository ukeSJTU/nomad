import{r as v,j as e}from"./iframe-BHY9H4ht.js";import{u as T,a as S,F as N,c as x,d as f,b,e as y,f as g}from"./form-BWOBO_7X.js";import{B as O}from"./button-DoWZ3ZEL.js";import{C as P}from"./checkbox-IASXDE_T.js";import{I as F}from"./input-uVSJ3tWS.js";import{p as B}from"./user-Cpge2W9s.js";import{O as E}from"./otp-input-BIYiLd9t.js";import{s as p}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-wRgyZonl.js";import"./index-yS4Ssq8c.js";import"./label-y5LJBYKy.js";import"./index-WBgFetUP.js";import"./index-DFNX9mnV.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-rZ1PVBeq.js";import"./index-DS1BCGAp.js";import"./index-CQTPNe-0.js";import"./index-jiRHyWVw.js";import"./check-C6kHYxyF.js";import"./createLucideIcon-B7gungxb.js";function l({onSubmit:n,isLoading:t=!1,onSendOtp:r,countdown:h=0,onPhoneChange:i}){const s=T({resolver:S(B),defaultValues:{phoneNumber:"",otp:"",agreedToTerms:!1}}),a=s.watch("phoneNumber");v.useEffect(()=>{i&&a&&i(a)},[a,i]);const w=o=>{n(o)},j=()=>{r&&r()};return e.jsx(N,{...s,children:e.jsxs("form",{onSubmit:s.handleSubmit(w),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(x,{control:s.control,name:"phoneNumber",render:({field:o})=>e.jsxs(f,{children:[e.jsx(b,{className:"text-sm font-medium text-gray-700",children:"手机号"}),e.jsx(y,{children:e.jsx(F,{...o,type:"tel",placeholder:"请输入手机号",className:"h-12",maxLength:11,disabled:t})}),e.jsx(g,{})]})}),e.jsx(x,{control:s.control,name:"otp",render:({field:o})=>e.jsxs(f,{children:[e.jsx(b,{className:"text-sm font-medium text-gray-700",children:"短信验证码"}),e.jsx(y,{children:e.jsx(E,{value:o.value,onChange:o.onChange,onSendOtp:j,countdown:h,isLoading:t,placeholder:"6位数字"})}),e.jsx(g,{})]})}),e.jsx(x,{control:s.control,name:"agreedToTerms",render:({field:o})=>e.jsxs(f,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(y,{children:e.jsx(P,{checked:o.value,onCheckedChange:o.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(b,{className:"text-sm text-gray-600",children:["同意《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(g,{})]})]})})]}),e.jsx(O,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:t,children:t?"验证中...":"下一步，设置密码"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 text-sm underline",children:"企业客户注册"})})]})})}l.__docgenInfo={description:"",methods:[],displayName:"PhoneVerificationForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: PhoneVerificationData) => void",signature:{arguments:[{type:{name:"PhoneVerificationData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onPhoneChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""}}};const{expect:k,userEvent:c,within:C}=__STORYBOOK_MODULE_TEST__,te={title:"Auth/Forms/PhoneVerificationForm",component:l,parameters:{layout:"centered"},tags:["autodocs"]},m={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(l,{onSubmit:n=>{p.info("Form submitted:",n)}})})},d={render:()=>{const[n,t]=v.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(l,{onSubmit:r=>{p.info("Form submitted:",r)},onSendOtp:()=>{p.info("OTP sent"),t(60)},countdown:n})})}},u={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(l,{onSubmit:n=>{p.info("Form submitted:",n)},onSendOtp:()=>{p.info("OTP sent")}})}),play:async({canvasElement:n})=>{const t=C(n),r=t.getByPlaceholderText("请输入手机号");await c.type(r,"13812345678",{delay:50});const h=t.getByRole("button",{name:/发送验证码/i});await c.click(h);const i=t.getByPlaceholderText("6位数字");await c.type(i,"123456",{delay:50});const s=t.getByRole("checkbox");await c.click(s);const a=t.getByRole("button",{name:/下一步/i});await k(a).toBeEnabled(),await c.click(a)}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneVerificationForm onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Default phone verification form
Shows the basic form structure with phone number, OTP input, and terms checkbox`,...m.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [countdown, setCountdown] = useState(60);
    return <div className="w-[400px] p-6">
        <PhoneVerificationForm onSubmit={data => {
        storyLogger.info("Form submitted:", data);
      }} onSendOtp={() => {
        storyLogger.info("OTP sent");
        setCountdown(60);
      }} countdown={countdown} />
      </div>;
  }
}`,...d.parameters?.docs?.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...d.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneVerificationForm onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} onSendOtp={() => {
      storyLogger.info("OTP sent");
    }} />
    </div>,
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
}`,...u.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully completing the phone verification flow

Test steps:
1. Enter valid phone number
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in phone-verification.test.tsx using RTL`,...u.parameters?.docs?.description}}};const ne=["Default","WithCountdown","HappyPath"];export{m as Default,u as HappyPath,d as WithCountdown,ne as __namedExportsOrder,te as default};
