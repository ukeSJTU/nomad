import{r as y,j as e}from"./iframe-BIE3orPF.js";import{u as j,a as T,F as S,b as h,c as x,d as b,e as f,f as g}from"./form-1sLD6OW6.js";import{B as N}from"./button-BHL9VpYg.js";import{C as O}from"./checkbox-D_tSgF8N.js";import{I as P}from"./input-CJfCVuPe.js";import{g as F}from"./auth-D-RBnuxz.js";import{O as B}from"./otp-input-B0naVZwm.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-Kzq7Ayg9.js";import"./index-dpG-91xS.js";import"./label-HjI0A9fn.js";import"./index-C9hYUzPm.js";import"./index-C8tx8S_a.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-Cc0-q4v9.js";import"./index-BDQ7_fOS.js";import"./index-CKyfck8B.js";import"./index-BVW5sDyh.js";import"./check-C4A1fcni.js";import"./createLucideIcon-aXwR9RXD.js";function u({onSubmit:n,isLoading:t=!1,onSendOtp:a,countdown:p=0,onPhoneChange:i}){const s=j({resolver:T(F),defaultValues:{phoneNumber:"",otp:"",agreedToTerms:!1}}),r=s.watch("phoneNumber");y.useEffect(()=>{i&&r&&i(r)},[r,i]);const v=o=>{n(o)},w=()=>{a&&a()};return e.jsx(S,{...s,children:e.jsxs("form",{onSubmit:s.handleSubmit(v),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(h,{control:s.control,name:"phoneNumber",render:({field:o})=>e.jsxs(x,{children:[e.jsx(b,{className:"text-sm font-medium text-gray-700",children:"手机号"}),e.jsx(f,{children:e.jsx(P,{...o,type:"tel",placeholder:"请输入手机号",className:"h-12",maxLength:11,disabled:t})}),e.jsx(g,{})]})}),e.jsx(h,{control:s.control,name:"otp",render:({field:o})=>e.jsxs(x,{children:[e.jsx(b,{className:"text-sm font-medium text-gray-700",children:"短信验证码"}),e.jsx(f,{children:e.jsx(B,{value:o.value,onChange:o.onChange,onSendOtp:w,countdown:p,isLoading:t,placeholder:"6位数字"})}),e.jsx(g,{})]})}),e.jsx(h,{control:s.control,name:"agreedToTerms",render:({field:o})=>e.jsxs(x,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(f,{children:e.jsx(O,{checked:o.value,onCheckedChange:o.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(b,{className:"text-sm text-gray-600",children:["同意《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(g,{})]})]})})]}),e.jsx(N,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:t,children:t?"验证中...":"下一步，设置密码"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 text-sm underline",children:"企业客户注册"})})]})})}u.__docgenInfo={description:"",methods:[],displayName:"PhoneVerificationForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: PhoneVerificationData) => void",signature:{arguments:[{type:{name:"PhoneVerificationData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onPhoneChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""}}};const{expect:E,userEvent:c,within:k}=__STORYBOOK_MODULE_TEST__,$={title:"Auth/Forms/PhoneVerificationForm",component:u,parameters:{layout:"centered"},tags:["autodocs"]},m={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:n=>{console.log("Form submitted:",n)}})})},d={render:()=>{const[n,t]=y.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:a=>{console.log("Form submitted:",a)},onSendOtp:()=>{console.log("OTP sent"),t(60)},countdown:n})})}},l={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:()=>{console.log("OTP sent")}})}),play:async({canvasElement:n})=>{const t=k(n),a=t.getByPlaceholderText("请输入手机号");await c.type(a,"13812345678",{delay:50});const p=t.getByRole("button",{name:/发送验证码/i});await c.click(p);const i=t.getByPlaceholderText("6位数字");await c.type(i,"123456",{delay:50});const s=t.getByRole("checkbox");await c.click(s);const r=t.getByRole("button",{name:/下一步/i});await E(r).toBeEnabled(),await c.click(r)}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneVerificationForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Default phone verification form
Shows the basic form structure with phone number, OTP input, and terms checkbox`,...m.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [countdown, setCountdown] = useState(60);
    return <div className="w-[400px] p-6">
        <PhoneVerificationForm onSubmit={data => {
        console.log("Form submitted:", data);
      }} onSendOtp={() => {
        console.log("OTP sent");
        setCountdown(60);
      }} countdown={countdown} />
      </div>;
  }
}`,...d.parameters?.docs?.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...d.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneVerificationForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={() => {
      console.log("OTP sent");
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
}`,...l.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully completing the phone verification flow

Test steps:
1. Enter valid phone number
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in phone-verification.test.tsx using RTL`,...l.parameters?.docs?.description}}};const ee=["Default","WithCountdown","HappyPath"];export{m as Default,l as HappyPath,d as WithCountdown,ee as __namedExportsOrder,$ as default};
