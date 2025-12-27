import{r as D,j as e}from"./iframe-Bg-UGac9.js";import{u as H,a as L,F as W,b as v,c as f,d as x,e as y,f as b}from"./form-DEHp7Aqf.js";import{B as q}from"./button-DDX2HNO5.js";import{C as A}from"./checkbox-CKmY3sxG.js";import{I as z}from"./input-BHFUhq-C.js";import{e as M}from"./user-CsBTq0tX.js";import{O as K}from"./otp-input-B4xHM-iS.js";import{s as u}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-CAiuSp-P.js";import"./index-njiYd0wI.js";import"./label-BR2x62s6.js";import"./index-KqqYSkLM.js";import"./index-CQuQOcOr.js";import"./utils-CDN07tui.js";import"./index-B_jtOnfb.js";import"./index-CHYR9aNa.js";import"./index-B854MFqc.js";import"./index-DMfrrJ9T.js";import"./index-CektjExR.js";import"./check-BVmVjMIc.js";import"./createLucideIcon-CaoxKut3.js";function p({onSubmit:n,isLoading:t=!1,onSendOtp:s,countdown:h=0,onEmailChange:i}){const o=H({resolver:L(M),defaultValues:{email:"",otp:"",agreedToTerms:!1}}),r=o.watch("email");D.useEffect(()=>{i&&r&&i(r)},[r,i]);const I=a=>{n(a)},R=()=>{s&&s()};return e.jsx(W,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(I),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(v,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"邮箱地址"}),e.jsx(f,{control:o.control,name:"email",render:({field:a})=>e.jsxs(x,{children:[e.jsx(y,{children:e.jsx(z,{...a,type:"email",placeholder:"请输入邮箱地址",className:"h-12"})}),e.jsx(b,{})]})})]}),e.jsx(f,{control:o.control,name:"otp",render:({field:a})=>e.jsxs(x,{children:[e.jsx(v,{className:"text-sm font-medium text-gray-700",children:"邮箱验证码"}),e.jsx(y,{children:e.jsx(K,{value:a.value,onChange:a.onChange,onSendOtp:R,countdown:h,isLoading:t,placeholder:"6位数字"})}),e.jsx(b,{})]})}),e.jsx(f,{control:o.control,name:"agreedToTerms",render:({field:a})=>e.jsxs(x,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(y,{children:e.jsx(A,{checked:a.value,onCheckedChange:a.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(v,{className:"text-sm text-gray-600",children:["同意《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(b,{})]})]})})]}),e.jsx(q,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:t,children:t?"验证中...":"下一步，设置密码"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 text-sm underline",children:"企业客户注册"})})]})})}p.__docgenInfo={description:"",methods:[],displayName:"EmailVerificationForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: EmailVerificationData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"emailVerificationSchema"}],raw:"z.infer<typeof emailVerificationSchema>"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onEmailChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""}}};var g,w,_,j,S,T,E,O,F,P,B,C,N,k,V;const{expect:U,userEvent:m,within:Y}=__STORYBOOK_MODULE_TEST__,fe={title:"Auth/Forms/EmailVerificationForm",component:p,parameters:{layout:"centered"},tags:["autodocs"]},d={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{u.info("Form submitted:",n)}})})},c={render:()=>{const[n,t]=D.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:s=>{u.info("Form submitted:",s)},onSendOtp:()=>{u.info("OTP sent"),t(60)},countdown:n})})}},l={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{u.info("Form submitted:",n)},onSendOtp:()=>{u.info("OTP sent")}})}),play:async({canvasElement:n})=>{const t=Y(n),s=t.getByPlaceholderText("请输入邮箱地址");await m.type(s,"test@example.com",{delay:50});const h=t.getByRole("button",{name:/发送验证码/i});await m.click(h);const i=t.getByPlaceholderText("6位数字");await m.type(i,"123456",{delay:50});const o=t.getByRole("checkbox");await m.click(o);const r=t.getByRole("button",{name:/下一步/i});await U(r).toBeEnabled(),await m.click(r)}};d.parameters={...d.parameters,docs:{...(g=d.parameters)===null||g===void 0?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailVerificationForm onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} />
    </div>
}`,...(_=d.parameters)===null||_===void 0||(w=_.docs)===null||w===void 0?void 0:w.source},description:{story:`Default email verification form
Shows the basic form structure with email, OTP input, and terms checkbox`,...(S=d.parameters)===null||S===void 0||(j=S.docs)===null||j===void 0?void 0:j.description}}};c.parameters={...c.parameters,docs:{...(T=c.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
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
}`,...(O=c.parameters)===null||O===void 0||(E=O.docs)===null||E===void 0?void 0:E.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...(P=c.parameters)===null||P===void 0||(F=P.docs)===null||F===void 0?void 0:F.description}}};l.parameters={...l.parameters,docs:{...(B=l.parameters)===null||B===void 0?void 0:B.docs,source:{originalSource:`{
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
}`,...(N=l.parameters)===null||N===void 0||(C=N.docs)===null||C===void 0?void 0:C.source},description:{story:`Happy Path smoke test
Simulates a user successfully completing the email verification flow

Test steps:
1. Enter valid email address
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in email-verification.test.tsx using RTL`,...(V=l.parameters)===null||V===void 0||(k=V.docs)===null||k===void 0?void 0:k.description}}};const xe=["Default","WithCountdown","HappyPath"];export{d as Default,l as HappyPath,c as WithCountdown,xe as __namedExportsOrder,fe as default};
