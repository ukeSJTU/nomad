import{r as w,j as e}from"./iframe-NbvTbHR2.js";import{u as T,a as S,F as P,b as h,c as x,d as b,e as f,f as g}from"./form-D3BScx02.js";import{B as y}from"./button-BUMCEFpR.js";import{C as O}from"./checkbox-DqOzCXZ0.js";import{I as v}from"./input-C1VeiFbz.js";import{f as B}from"./auth-CmJUVIQY.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-dlpNQSCA.js";import"./index-D1D2Ei-H.js";import"./label-0xuqEkfh.js";import"./index-GXPmNNQ3.js";import"./index-BJmsKm6z.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-qFTAgIPL.js";import"./index-BfCI285t.js";import"./index-DLrXgr9j.js";import"./index-DJ0TG19Y.js";import"./index-lqWE_vvy.js";import"./index-fU991Hhq.js";import"./check-BLe-sn40.js";import"./createLucideIcon-BPml1PN6.js";function p({onSubmit:n,isLoading:t=!1,onSendOtp:a,countdown:i=0,onPhoneChange:c}){const o=T({resolver:S(B),defaultValues:{phoneNumber:"",otp:"",agreedToTerms:!1}}),r=o.watch("phoneNumber");w.useEffect(()=>{c&&r&&c(r)},[r,c]);const j=s=>{n(s)},N=()=>{a&&a()};return e.jsx(P,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(j),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(h,{control:o.control,name:"phoneNumber",render:({field:s})=>e.jsxs(x,{children:[e.jsx(b,{className:"text-sm font-medium text-gray-700",children:"手机号"}),e.jsx(f,{children:e.jsx(v,{...s,type:"tel",placeholder:"请输入手机号",className:"h-12",maxLength:11,disabled:t})}),e.jsx(g,{})]})}),e.jsxs("div",{children:[e.jsx(b,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"短信验证码"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(h,{control:o.control,name:"otp",render:({field:s})=>e.jsxs(x,{className:"flex-1",children:[e.jsx(f,{children:e.jsx(v,{...s,placeholder:"6位数字",className:"h-12",maxLength:6})}),e.jsx(g,{})]})}),e.jsx(y,{type:"button",variant:"outline",className:"h-12 px-4 text-blue-600 border-blue-600 hover:bg-blue-50",onClick:N,disabled:i>0||t,children:i>0?`${i}s`:"发送验证码"})]})]}),e.jsx(h,{control:o.control,name:"agreedToTerms",render:({field:s})=>e.jsxs(x,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(f,{children:e.jsx(O,{checked:s.value,onCheckedChange:s.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(b,{className:"text-sm text-gray-600",children:["同意《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(g,{})]})]})})]}),e.jsx(y,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:t,children:t?"验证中...":"下一步，设置密码"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 text-sm underline",children:"企业客户注册"})})]})})}p.__docgenInfo={description:"",methods:[],displayName:"PhoneVerificationForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: PhoneVerificationData) => void",signature:{arguments:[{type:{name:"PhoneVerificationData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onPhoneChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""}}};const{expect:F,userEvent:m,within:k}=__STORYBOOK_MODULE_TEST__,Z={title:"Auth/PhoneVerificationForm",component:p,parameters:{layout:"centered"},tags:["autodocs"]},l={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{console.log("Form submitted:",n)}})})},d={render:()=>{const[n,t]=w.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:a=>{console.log("Form submitted:",a)},onSendOtp:()=>{console.log("OTP sent"),t(60)},countdown:n})})}},u={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:()=>{console.log("OTP sent")}})}),play:async({canvasElement:n})=>{const t=k(n),a=t.getByPlaceholderText("请输入手机号");await m.type(a,"13812345678",{delay:50});const i=t.getByRole("button",{name:/发送验证码/i});await m.click(i);const c=t.getByPlaceholderText("6位数字");await m.type(c,"123456",{delay:50});const o=t.getByRole("checkbox");await m.click(o);const r=t.getByRole("button",{name:/下一步/i});await F(r).toBeEnabled(),await m.click(r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneVerificationForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...l.parameters?.docs?.source},description:{story:`Default phone verification form
Shows the basic form structure with phone number, OTP input, and terms checkbox`,...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
Demonstrates the countdown state when OTP has been sent`,...d.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
should be tested in phone-verification.test.tsx using RTL`,...u.parameters?.docs?.description}}};const ee=["Default","WithCountdown","HappyPath"];export{l as Default,u as HappyPath,d as WithCountdown,ee as __namedExportsOrder,Z as default};
