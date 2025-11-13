import{j as e,r as S}from"./iframe-NbvTbHR2.js";import{u as j,a as O,F as T,b as p,c as h,d as b,e as x,f as g}from"./form-D3BScx02.js";import{B as y}from"./button-BUMCEFpR.js";import{I as f}from"./input-C1VeiFbz.js";import{o as F,s as w}from"./schemas-dlpNQSCA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D1D2Ei-H.js";import"./label-0xuqEkfh.js";import"./index-GXPmNNQ3.js";import"./index-BJmsKm6z.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";const B=F({phoneNumber:w().min(1,"请输入手机号").regex(/^[0-9]+$/,"手机号码只能包含数字").min(11,"手机号码必须是11位").max(11,"手机号码必须是11位"),otp:w().min(6,"验证码必须是6位数字").max(6,"验证码必须是6位数字").regex(/^[0-9]{6}$/,"验证码只能包含数字")});function u({currentPhoneNumber:n,onSubmit:o,onSendOtp:s,isLoading:a=!1,countdown:m=0}){const t=j({resolver:O(B),defaultValues:{phoneNumber:"",otp:""}}),N=t.watch("phoneNumber"),v=r=>{o(r)},P=async()=>{await t.trigger("phoneNumber")&&s(t.getValues("phoneNumber"))};return e.jsx(T,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(v),className:"space-y-6",children:[n&&e.jsx("div",{className:"rounded-lg bg-gray-50 p-4",children:e.jsxs("p",{className:"text-sm text-gray-600",children:["当前手机号：",e.jsx("span",{className:"font-medium",children:n})]})}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(p,{control:t.control,name:"phoneNumber",render:({field:r})=>e.jsxs(h,{children:[e.jsx(b,{className:"text-sm font-medium text-gray-700",children:"新手机号"}),e.jsx(x,{children:e.jsx(f,{...r,type:"tel",placeholder:"请输入新手机号",className:"h-12",maxLength:11,disabled:a})}),e.jsx(g,{})]})}),e.jsxs("div",{children:[e.jsx(b,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"短信验证码"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(p,{control:t.control,name:"otp",render:({field:r})=>e.jsxs(h,{className:"flex-1",children:[e.jsx(x,{children:e.jsx(f,{...r,placeholder:"6位数字",className:"h-12",maxLength:6,disabled:a})}),e.jsx(g,{})]})}),e.jsx(y,{type:"button",variant:"outline",className:"h-12 px-4 text-blue-600 border-blue-600 hover:bg-blue-50",onClick:P,disabled:m>0||a||!N,children:m>0?`${m}s`:"发送验证码"})]})]})]}),e.jsx(y,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:a,children:a?"验证中...":"确认修改"})]})})}u.__docgenInfo={description:"",methods:[],displayName:"UpdatePhoneForm",props:{currentPhoneNumber:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdatePhoneData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"updatePhoneSchema"}],raw:"z.infer<typeof updatePhoneSchema>"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(phoneNumber: string) => void",signature:{arguments:[{type:{name:"string"},name:"phoneNumber"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const{expect:E,userEvent:l,within:k}=__STORYBOOK_MODULE_TEST__,M={title:"Security/UpdatePhoneForm",component:u,parameters:{layout:"centered"},tags:["autodocs"]},i={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(u,{currentPhoneNumber:"138****5678",onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:n=>{console.log("OTP sent to:",n)}})})},c={render:()=>{const[n,o]=S.useState(60);return e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(u,{currentPhoneNumber:"138****5678",onSubmit:s=>{console.log("Form submitted:",s)},onSendOtp:s=>{console.log("OTP sent to:",s),o(60)},countdown:n})})}},d={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(u,{currentPhoneNumber:"138****5678",onSubmit:n=>{console.log("Form submitted:",n)},onSendOtp:n=>{console.log("OTP sent to:",n)}})}),play:async({canvasElement:n})=>{const o=k(n),s=o.getByPlaceholderText("请输入新手机号");await l.type(s,"13987654321",{delay:50});const a=o.getByRole("button",{name:/发送验证码/i});await l.click(a);const m=o.getByPlaceholderText("6位数字");await l.type(m,"123456",{delay:50});const t=o.getByRole("button",{name:/确认修改/i});await E(t).toBeEnabled(),await l.click(t)}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdatePhoneForm currentPhoneNumber="138****5678" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={phoneNumber => {
      console.log("OTP sent to:", phoneNumber);
    }} />
    </div>
}`,...i.parameters?.docs?.source},description:{story:`Default update phone form
Shows the form with current phone number and fields to enter new phone and OTP`,...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [countdown, setCountdown] = useState(60);
    return <div className="w-[500px] p-6">
        <UpdatePhoneForm currentPhoneNumber="138****5678" onSubmit={data => {
        console.log("Form submitted:", data);
      }} onSendOtp={phoneNumber => {
        console.log("OTP sent to:", phoneNumber);
        setCountdown(60);
      }} countdown={countdown} />
      </div>;
  }
}`,...c.parameters?.docs?.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdatePhoneForm currentPhoneNumber="138****5678" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={phoneNumber => {
      console.log("OTP sent to:", phoneNumber);
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter new phone number
    const phoneInput = canvas.getByPlaceholderText("请输入新手机号");
    await userEvent.type(phoneInput, "13987654321", {
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

    // 4. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", {
      name: /确认修改/i
    });
    await expect(submitButton).toBeEnabled();

    // 5. Submit form
    await userEvent.click(submitButton);
  }
}`,...d.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully updating their phone number

Test steps:
1. Enter new phone number
2. Click send OTP button
3. Enter OTP code
4. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested using RTL`,...d.parameters?.docs?.description}}};const W=["Default","WithCountdown","HappyPath"];export{i as Default,d as HappyPath,c as WithCountdown,W as __namedExportsOrder,M as default};
