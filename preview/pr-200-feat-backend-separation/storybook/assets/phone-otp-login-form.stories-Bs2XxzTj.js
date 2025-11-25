import{r as j,j as e}from"./iframe-Dd3AqlOG.js";import{u as T,a as P,F as S,b as h,c as b,d as x,e as g,f}from"./form-NKoKooQl.js";import{L as y}from"./link-Dw5SW31e.js";import{B as v}from"./button-vXVpJ6RZ.js";import{C as k}from"./checkbox-DpnphAQB.js";import{I as w}from"./input-B5-DViC6.js";import{f as F}from"./auth-D-RBnuxz.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-Kzq7Ayg9.js";import"./index-C2Z9wzF5.js";import"./label-CRDj7Z0z.js";import"./index-Bqb6DZeW.js";import"./index-uF32jcgg.js";import"./utils-CBfrqCZ4.js";import"./use-merged-ref-CCl5dRyA.js";import"./index-CdJFUDDL.js";import"./index-B2ByjUQR.js";import"./index-NudYPprN.js";import"./index-CDwF6lbB.js";import"./index-B6vMN2vG.js";import"./check-CaWhey1b.js";import"./createLucideIcon-aqlq-bZC.js";function u({onSubmit:n,isLoading:t=!1,onSendOtp:r,countdown:i=0,onPhoneChange:c}){const o=T({resolver:P(F),defaultValues:{phoneNumber:"",otp:"",agreedToTerms:!1}}),a=o.watch("phoneNumber");j.useEffect(()=>{c&&a&&c(a)},[a,c]);const O=s=>{n(s)},N=async()=>{await o.trigger("phoneNumber")&&r&&r()};return e.jsx(S,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(O),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(h,{control:o.control,name:"phoneNumber",render:({field:s})=>e.jsxs(b,{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700",children:"手机号"}),e.jsx(g,{children:e.jsx(w,{...s,type:"tel",placeholder:"请输入手机号",className:"h-12",maxLength:11,disabled:t})}),e.jsx(f,{})]})}),e.jsxs("div",{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"短信验证码"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(h,{control:o.control,name:"otp",render:({field:s})=>e.jsxs(b,{className:"flex-1",children:[e.jsx(g,{children:e.jsx(w,{...s,placeholder:"6位数字",className:"h-12",maxLength:6})}),e.jsx(f,{})]})}),e.jsx(v,{type:"button",variant:"outline",className:"h-12 px-4 text-blue-600 border-blue-600 hover:bg-blue-50",onClick:N,disabled:i>0||t,children:i>0?`${i}s`:"发送验证码"})]})]}),e.jsx(h,{control:o.control,name:"agreedToTerms",render:({field:s})=>e.jsxs(b,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(g,{children:e.jsx(k,{checked:s.value,onCheckedChange:s.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(x,{className:"text-sm text-gray-600",children:["同意《",e.jsx(y,{href:"/terms",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx(y,{href:"/privacy",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(f,{})]})]})})]}),e.jsx(v,{type:"submit",className:"w-full h-12 bg-blue-600 hover:bg-blue-700 text-white",disabled:t,children:t?"登录中...":"登录"})]})})}u.__docgenInfo={description:"",methods:[],displayName:"PhoneOtpLoginForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: PhoneOtpLoginData) => void",signature:{arguments:[{type:{name:"PhoneOtpLoginData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onPhoneChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""}}};const{expect:B,userEvent:m,within:E}=__STORYBOOK_MODULE_TEST__,ee={title:"Auth/Forms/PhoneOtpLoginForm",component:u,parameters:{layout:"centered"},tags:["autodocs"]},l={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:n=>{console.log("Form submitted:",n)}})})},d={render:()=>{const[n,t]=j.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:r=>{console.log("Form submitted:",r)},onSendOtp:()=>{console.log("OTP sent"),t(60)},countdown:n})})}},p={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:()=>{console.log("OTP sent")}})}),play:async({canvasElement:n})=>{const t=E(n),r=t.getByPlaceholderText("请输入手机号");await m.type(r,"13812345678",{delay:50});const i=t.getByRole("button",{name:/发送验证码/i});await m.click(i);const c=t.getByPlaceholderText("6位数字");await m.type(c,"123456",{delay:50});const o=t.getByRole("checkbox");await m.click(o);const a=t.getByRole("button",{name:/登录/i});await B(a).toBeEnabled(),await m.click(a)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneOtpLoginForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...l.parameters?.docs?.source},description:{story:`Default phone OTP login form
Shows the basic form structure with phone number, OTP input, and terms checkbox`,...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [countdown, setCountdown] = useState(60);
    return <div className="w-[400px] p-6">
        <PhoneOtpLoginForm onSubmit={data => {
        console.log("Form submitted:", data);
      }} onSendOtp={() => {
        console.log("OTP sent");
        setCountdown(60);
      }} countdown={countdown} />
      </div>;
  }
}`,...d.parameters?.docs?.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...d.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneOtpLoginForm onSubmit={data => {
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
      name: /登录/i
    });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  }
}`,...p.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully logging in with phone and OTP

Test steps:
1. Enter valid phone number
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in phone-otp-login.test.tsx using RTL`,...p.parameters?.docs?.description}}};const te=["Default","WithCountdown","HappyPath"];export{l as Default,p as HappyPath,d as WithCountdown,te as __namedExportsOrder,ee as default};
