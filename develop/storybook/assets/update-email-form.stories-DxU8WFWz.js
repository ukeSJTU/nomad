import{j as e,r as j}from"./iframe-CvbL331m.js";import{u as O,a as T,F,b as p,c as x,d as h,e as b,f as g}from"./form-Bc27KVpi.js";import{B as y}from"./button-CAXY9XPu.js";import{I as f}from"./input-mbU9WAfX.js";import{o as N,s as w}from"./schemas-dlpNQSCA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C7jJTgGp.js";import"./label-D8545hoU.js";import"./index-BfQugiVD.js";import"./index-DhbfMN3k.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";const B=N({email:w().min(1,"请输入邮箱地址").email("邮箱格式不正确"),otp:w().min(6,"验证码必须是6位数字").max(6,"验证码必须是6位数字").regex(/^[0-9]{6}$/,"验证码只能包含数字")});function d({currentEmail:t,onSubmit:a,onSendOtp:s,isLoading:o=!1,countdown:i=0}){const n=O({resolver:T(B),defaultValues:{email:"",otp:""}}),v=n.watch("email"),E=r=>{a(r)},S=async()=>{await n.trigger("email")&&s(n.getValues("email"))};return e.jsx(F,{...n,children:e.jsxs("form",{onSubmit:n.handleSubmit(E),className:"space-y-6",children:[e.jsx("div",{className:"rounded-lg bg-gray-50 p-4",children:e.jsxs("p",{className:"text-sm text-gray-600",children:["当前邮箱：",e.jsx("span",{className:"font-medium",children:t})]})}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(p,{control:n.control,name:"email",render:({field:r})=>e.jsxs(x,{children:[e.jsx(h,{className:"text-sm font-medium text-gray-700",children:"新邮箱地址"}),e.jsx(b,{children:e.jsx(f,{...r,type:"email",placeholder:"请输入新邮箱地址",className:"h-12",disabled:o})}),e.jsx(g,{})]})}),e.jsxs("div",{children:[e.jsx(h,{className:"text-sm font-medium text-gray-700 mb-3 block",children:"邮箱验证码"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(p,{control:n.control,name:"otp",render:({field:r})=>e.jsxs(x,{className:"flex-1",children:[e.jsx(b,{children:e.jsx(f,{...r,placeholder:"6位数字",className:"h-12",maxLength:6,disabled:o})}),e.jsx(g,{})]})}),e.jsx(y,{type:"button",variant:"outline",className:"h-12 px-4 text-blue-600 border-blue-600 hover:bg-blue-50",onClick:S,disabled:i>0||o||!v,children:i>0?`${i}s`:"发送验证码"})]})]})]}),e.jsx(y,{type:"submit",className:"w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium",disabled:o,children:o?"验证中...":"确认修改"})]})})}d.__docgenInfo={description:"",methods:[],displayName:"UpdateEmailForm",props:{currentEmail:{required:!0,tsType:{name:"string"},description:""},onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UpdateEmailData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"updateEmailSchema"}],raw:"z.infer<typeof updateEmailSchema>"},name:"data"}],return:{name:"void"}}},description:""},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},countdown:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const{expect:P,userEvent:u,within:k}=__STORYBOOK_MODULE_TEST__,$={title:"Security/UpdateEmailForm",component:d,parameters:{layout:"centered"},tags:["autodocs"]},m={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(d,{currentEmail:"user@example.com",onSubmit:t=>{console.log("Form submitted:",t)},onSendOtp:t=>{console.log("OTP sent to:",t)}})})},l={render:()=>{const[t,a]=j.useState(60);return e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(d,{currentEmail:"user@example.com",onSubmit:s=>{console.log("Form submitted:",s)},onSendOtp:s=>{console.log("OTP sent to:",s),a(60)},countdown:t})})}},c={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(d,{currentEmail:"user@example.com",onSubmit:t=>{console.log("Form submitted:",t)},onSendOtp:t=>{console.log("OTP sent to:",t)}})}),play:async({canvasElement:t})=>{const a=k(t),s=a.getByPlaceholderText("请输入新邮箱地址");await u.type(s,"newemail@example.com",{delay:50});const o=a.getByRole("button",{name:/发送验证码/i});await u.click(o);const i=a.getByPlaceholderText("6位数字");await u.type(i,"123456",{delay:50});const n=a.getByRole("button",{name:/确认修改/i});await P(n).toBeEnabled(),await u.click(n)}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdateEmailForm currentEmail="user@example.com" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={email => {
      console.log("OTP sent to:", email);
    }} />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Default update email form
Shows the form with current email and fields to enter new email and OTP`,...m.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [countdown, setCountdown] = useState(60);
    return <div className="w-[500px] p-6">
        <UpdateEmailForm currentEmail="user@example.com" onSubmit={data => {
        console.log("Form submitted:", data);
      }} onSendOtp={email => {
        console.log("OTP sent to:", email);
        setCountdown(60);
      }} countdown={countdown} />
      </div>;
  }
}`,...l.parameters?.docs?.source},description:{story:`Form with countdown timer for OTP resend
Demonstrates the countdown state when OTP has been sent`,...l.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <UpdateEmailForm currentEmail="user@example.com" onSubmit={data => {
      console.log("Form submitted:", data);
    }} onSendOtp={email => {
      console.log("OTP sent to:", email);
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter new email address
    const emailInput = canvas.getByPlaceholderText("请输入新邮箱地址");
    await userEvent.type(emailInput, "newemail@example.com", {
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
}`,...c.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully updating their email address

Test steps:
1. Enter new email address
2. Click send OTP button
3. Enter OTP code
4. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested using RTL`,...c.parameters?.docs?.description}}};const K=["Default","WithCountdown","HappyPath"];export{m as Default,c as HappyPath,l as WithCountdown,K as __namedExportsOrder,$ as default};
