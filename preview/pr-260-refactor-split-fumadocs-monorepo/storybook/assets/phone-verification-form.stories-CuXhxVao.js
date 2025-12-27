import{r as D,j as e}from"./iframe-Bg-UGac9.js";import{u as H,a as L,F as W,c as f,d as v,b as x,e as b,f as y}from"./form-DEHp7Aqf.js";import{B as q}from"./button-DDX2HNO5.js";import{C as A}from"./checkbox-CKmY3sxG.js";import{I as z}from"./input-BHFUhq-C.js";import{p as M}from"./user-CsBTq0tX.js";import{O as K}from"./otp-input-B4xHM-iS.js";import{s as l}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-CAiuSp-P.js";import"./index-njiYd0wI.js";import"./label-BR2x62s6.js";import"./index-KqqYSkLM.js";import"./index-CQuQOcOr.js";import"./utils-CDN07tui.js";import"./index-B_jtOnfb.js";import"./index-CHYR9aNa.js";import"./index-B854MFqc.js";import"./index-DMfrrJ9T.js";import"./index-CektjExR.js";import"./check-BVmVjMIc.js";import"./createLucideIcon-CaoxKut3.js";function p({onSubmit:n,isLoading:t=!1,onSendOtp:r,countdown:h=0,onPhoneChange:i}){const a=H({resolver:L(M),defaultValues:{phoneNumber:"",otp:"",agreedToTerms:!1}}),s=a.watch("phoneNumber");D.useEffect(()=>{i&&s&&i(s)},[s,i]);const I=o=>{n(o)},R=()=>{r&&r()};return e.jsx(W,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(I),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(f,{control:a.control,name:"phoneNumber",render:({field:o})=>e.jsxs(v,{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700",children:"手机号"}),e.jsx(b,{children:e.jsx(z,{...o,type:"tel",placeholder:"请输入手机号",className:"h-12",maxLength:11,disabled:t})}),e.jsx(y,{})]})}),e.jsx(f,{control:a.control,name:"otp",render:({field:o})=>e.jsxs(v,{children:[e.jsx(x,{className:"text-sm font-medium text-gray-700",children:"短信验证码"}),e.jsx(b,{children:e.jsx(K,{value:o.value,onChange:o.onChange,onSendOtp:R,countdown:h,isLoading:t,placeholder:"6位数字"})}),e.jsx(y,{})]})}),e.jsx(f,{control:a.control,name:"agreedToTerms",render:({field:o})=>e.jsxs(v,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(b,{children:e.jsx(A,{checked:o.value,onCheckedChange:o.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(x,{className:"text-sm text-gray-600",children:["同意《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(y,{})]})]})})]}),e.jsx(q,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:t,children:t?"验证中...":"下一步，设置密码"}),e.jsx("div",{className:"text-center",children:e.jsx("button",{type:"button",className:"text-blue-600 hover:text-blue-800 text-sm underline",children:"企业客户注册"})})]})})}p.__docgenInfo={description:"",methods:[],displayName:"PhoneVerificationForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: PhoneVerificationData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"phoneVerificationSchema"}],raw:"z.infer<typeof phoneVerificationSchema>"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSendOtp:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},onPhoneChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""}}};var g,w,_,j,S,T,P,N,O,F,B,C,E,k,V;const{expect:U,userEvent:c,within:Y}=__STORYBOOK_MODULE_TEST__,ve={title:"Auth/Forms/PhoneVerificationForm",component:p,parameters:{layout:"centered"},tags:["autodocs"]},d={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{l.info("Form submitted:",n)}})})},m={render:()=>{const[n,t]=D.useState(60);return e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:r=>{l.info("Form submitted:",r)},onSendOtp:()=>{l.info("OTP sent"),t(60)},countdown:n})})}},u={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(p,{onSubmit:n=>{l.info("Form submitted:",n)},onSendOtp:()=>{l.info("OTP sent")}})}),play:async({canvasElement:n})=>{const t=Y(n),r=t.getByPlaceholderText("请输入手机号");await c.type(r,"13812345678",{delay:50});const h=t.getByRole("button",{name:/发送验证码/i});await c.click(h);const i=t.getByPlaceholderText("6位数字");await c.type(i,"123456",{delay:50});const a=t.getByRole("checkbox");await c.click(a);const s=t.getByRole("button",{name:/下一步/i});await U(s).toBeEnabled(),await c.click(s)}};d.parameters={...d.parameters,docs:{...(g=d.parameters)===null||g===void 0?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneVerificationForm onSubmit={data => {
      storyLogger.info("Form submitted:", data);
    }} />
    </div>
}`,...(_=d.parameters)===null||_===void 0||(w=_.docs)===null||w===void 0?void 0:w.source},description:{story:`Default phone verification form
Shows the basic form structure with phone number, OTP input, and terms checkbox`,...(S=d.parameters)===null||S===void 0||(j=S.docs)===null||j===void 0?void 0:j.description}}};m.parameters={...m.parameters,docs:{...(T=m.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
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
}`,...(N=m.parameters)===null||N===void 0||(P=N.docs)===null||P===void 0?void 0:P.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...(F=m.parameters)===null||F===void 0||(O=F.docs)===null||O===void 0?void 0:O.description}}};u.parameters={...u.parameters,docs:{...(B=u.parameters)===null||B===void 0?void 0:B.docs,source:{originalSource:`{
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
}`,...(E=u.parameters)===null||E===void 0||(C=E.docs)===null||C===void 0?void 0:C.source},description:{story:`Happy Path smoke test
Simulates a user successfully completing the phone verification flow

Test steps:
1. Enter valid phone number
2. Click send OTP button
3. Enter OTP code
4. Agree to terms
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in phone-verification.test.tsx using RTL`,...(V=u.parameters)===null||V===void 0||(k=V.docs)===null||k===void 0?void 0:k.description}}};const xe=["Default","WithCountdown","HappyPath"];export{d as Default,u as HappyPath,m as WithCountdown,xe as __namedExportsOrder,ve as default};
