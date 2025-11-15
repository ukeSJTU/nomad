import{r as j,j as e}from"./iframe-DjPNHZgi.js";import{u as E,a as S,F as k,d as x,b as h,c as g,e as b,f}from"./form-25d0ezG_.js";import{L as y}from"./link-CF0njAx8.js";import{B as v}from"./button-DD9hQeUx.js";import{C as N}from"./checkbox-42i4Bu5N.js";import{I as w}from"./input-BGgh65P4.js";import{a as B}from"./auth-CmJUVIQY.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-dlpNQSCA.js";import"./index-B46xqJ3Q.js";import"./label-IH1ewb31.js";import"./index-C2lakmAf.js";import"./index-jzZgMQDY.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-DZFAII8J.js";import"./index-BoXeLxTd.js";import"./index-BSCXUqjY.js";import"./index-BOKW9L8K.js";import"./index-BcWtkAfF.js";import"./index-D9CYGfjn.js";import"./check-DoZ9iuoG.js";import"./createLucideIcon-DIu0cbjF.js";function u({onSubmit:n,isLoading:t=!1,onSendOtp:o,countdown:i=0,onEmailChange:l}){const s=E({resolver:S(B),defaultValues:{email:"",otp:"",agreedToTerms:!1}}),r=s.watch("email");j.useEffect(()=>{l&&r&&l(r)},[r,l]);const O=a=>{n(a)},T=()=>{o&&o()};return e.jsx(k,{...s,children:e.jsxs("form",{onSubmit:s.handleSubmit(O),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"邮箱地址"}),e.jsx(h,{control:s.control,name:"email",render:({field:a})=>e.jsxs(g,{children:[e.jsx(b,{children:e.jsx(w,{...a,type:"email",placeholder:"请输入邮箱地址",className:"h-12"})}),e.jsx(f,{})]})})]}),e.jsxs("div",{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"邮箱验证码"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(h,{control:s.control,name:"otp",render:({field:a})=>e.jsxs(g,{className:"flex-1",children:[e.jsx(b,{children:e.jsx(w,{...a,placeholder:"6位数字",className:"h-12",maxLength:6})}),e.jsx(f,{})]})}),e.jsx(v,{type:"button",variant:"outline",className:"h-12 px-4 text-blue-600 border-blue-600 hover:bg-blue-50",onClick:T,disabled:i>0||t,children:i>0?`${i}s`:"发送验证码"})]})]})]}),e.jsx(h,{control:s.control,name:"agreedToTerms",render:({field:a})=>e.jsxs(g,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(b,{children:e.jsx(N,{checked:a.value,onCheckedChange:a.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(x,{className:"text-sm text-gray-600",children:["我已阅读并同意",e.jsx(y,{href:"/terms",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline ml-1",children:"服务协议"}),"和",e.jsx(y,{href:"/privacy",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline ml-1",children:"隐私政策"})]}),e.jsx(f,{})]})]})}),e.jsx(v,{type:"submit",className:"w-full h-12 bg-blue-600 hover:bg-blue-700 text-white",disabled:t,children:t?"登录中...":"登录"})]})})}u.__docgenInfo={description:"",methods:[],displayName:"EmailOtpLoginForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: EmailOtpLoginData) => void",signature:{arguments:[{type:{name:"EmailOtpLoginData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onEmailChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""}}};const{expect:F,userEvent:m,within:P}=__STORYBOOK_MODULE_TEST__,te={title:"Auth/EmailOtpLoginForm",component:u,parameters:{layout:"centered"},tags:["autodocs"]},c={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:n=>{console.log("Form submitted:",n)}})})},d={render:()=>{const[n,t]=j.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:o=>{console.log("Form submitted:",o)},onSendOtp:()=>{console.log("OTP sent"),t(60)},countdown:n})})}},p={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(u,{onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:()=>{console.log("OTP sent")}})}),play:async({canvasElement:n})=>{const t=P(n),o=t.getByPlaceholderText("请输入邮箱地址");await m.type(o,"test@example.com",{delay:50});const i=t.getByRole("button",{name:/发送验证码/i});await m.click(i);const l=t.getByPlaceholderText("6位数字");await m.type(l,"123456",{delay:50});const s=t.getByRole("checkbox");await m.click(s);const r=t.getByRole("button",{name:/登录/i});await F(r).toBeEnabled(),await m.click(r)}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailOtpLoginForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...c.parameters?.docs?.source},description:{story:`Default email OTP login form
Shows the basic form structure with email, OTP input, and terms checkbox`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [countdown, setCountdown] = useState(60);
    return <div className="w-[400px] p-6">
        <EmailOtpLoginForm onSubmit={data => {
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
      <EmailOtpLoginForm onSubmit={data => {
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
      name: /登录/i
    });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  }
}`,...p.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully logging in with email and OTP

Test steps:
1. Enter valid email address
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in email-otp-login.test.tsx using RTL`,...p.parameters?.docs?.description}}};const ne=["Default","WithCountdown","HappyPath"];export{c as Default,p as HappyPath,d as WithCountdown,ne as __namedExportsOrder,te as default};
