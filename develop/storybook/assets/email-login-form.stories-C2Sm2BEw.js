import{j as e}from"./iframe-DEdBepCo.js";import{u as f,a as v,F as w,b as d,c as p,d as u,e as x,f as h}from"./form-B1HvycvR.js";import{L as b}from"./link-8GwThntg.js";import{B as j}from"./button-CeDwtogb.js";import{C as E}from"./checkbox-ZyFT7U5m.js";import{I as y}from"./input-Cyqo2Quf.js";import{e as F}from"./auth-CmJUVIQY.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-dlpNQSCA.js";import"./index-b1RsTYJ5.js";import"./label-C2k28PhQ.js";import"./index-Rq8PhVD_.js";import"./index-CWGOfCio.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-BXhFtNf4.js";import"./index-BpmSKndU.js";import"./index-D3lbLhh_.js";import"./index--7haJgyH.js";import"./index-B8a6IDFJ.js";import"./index-CBZOnOYP.js";import"./check-CcPOyEPt.js";import"./createLucideIcon-DamcI711.js";function m({onSubmit:t,isLoading:a=!1}){const o=f({resolver:v(F),defaultValues:{email:"",password:"",agreedToTerms:!1}}),c=s=>{t(s)};return e.jsx(w,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(c),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(d,{control:o.control,name:"email",render:({field:s})=>e.jsxs(p,{children:[e.jsx(u,{className:"text-sm font-medium text-gray-700",children:"邮箱地址"}),e.jsx(x,{children:e.jsx(y,{...s,type:"email",placeholder:"请输入邮箱地址",className:"h-12"})}),e.jsx(h,{})]})}),e.jsx(d,{control:o.control,name:"password",render:({field:s})=>e.jsxs(p,{children:[e.jsx(u,{className:"text-sm font-medium text-gray-700",children:"密码"}),e.jsx(x,{children:e.jsx(y,{...s,type:"password",placeholder:"请输入密码",className:"h-12"})}),e.jsx(h,{})]})})]}),e.jsx(d,{control:o.control,name:"agreedToTerms",render:({field:s})=>e.jsxs(p,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(x,{children:e.jsx(E,{checked:s.value,onCheckedChange:s.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(u,{className:"text-sm text-gray-600",children:["我已阅读并同意",e.jsx(b,{href:"/terms",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline ml-1",children:"服务协议"}),"和",e.jsx(b,{href:"/privacy",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline ml-1",children:"隐私政策"})]}),e.jsx(h,{})]})]})}),e.jsx(j,{type:"submit",className:"w-full h-12 bg-blue-600 hover:bg-blue-700 text-white",disabled:a,children:a?"登录中...":"登录"})]})})}m.__docgenInfo={description:"",methods:[],displayName:"EmailLoginForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: EmailLoginData) => void",signature:{arguments:[{type:{name:"EmailLoginData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const{expect:S,userEvent:l,within:N}=__STORYBOOK_MODULE_TEST__,W={title:"Auth/EmailLoginForm",component:m,parameters:{layout:"centered"},tags:["autodocs"]},r={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(m,{onSubmit:t=>{console.log("Form submitted:",t)}})})},n={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(m,{onSubmit:t=>{console.log("Form submitted:",t)},isLoading:!0})})},i={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(m,{onSubmit:t=>{console.log("Form submitted:",t)}})}),play:async({canvasElement:t})=>{const a=N(t),o=a.getByPlaceholderText("请输入邮箱地址");await l.type(o,"test@example.com",{delay:50});const c=a.getByPlaceholderText("请输入密码");await l.type(c,"Password123",{delay:50});const s=a.getByRole("checkbox");await l.click(s);const g=a.getByRole("button",{name:/登录/i});await S(g).toBeEnabled(),await l.click(g)}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailLoginForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...r.parameters?.docs?.source},description:{story:`Default email login form
Shows the basic form structure with email, password, and terms checkbox`,...r.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailLoginForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} isLoading={true} />
    </div>
}`,...n.parameters?.docs?.source},description:{story:`Loading state
Shows the form in loading state during submission`,...n.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <EmailLoginForm onSubmit={data => {
      console.log("Form submitted:", data);
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

    // 2. Enter password
    const passwordInput = canvas.getByPlaceholderText("请输入密码");
    await userEvent.type(passwordInput, "Password123", {
      delay: 50
    });

    // 3. Agree to terms
    const termsCheckbox = canvas.getByRole("checkbox");
    await userEvent.click(termsCheckbox);

    // 4. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", {
      name: /登录/i
    });
    await expect(submitButton).toBeEnabled();

    // 5. Submit form
    await userEvent.click(submitButton);
  }
}`,...i.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully logging in with email and password

Test steps:
1. Enter valid email address
2. Enter password
3. Agree to terms
4. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in email-login.test.tsx using RTL`,...i.parameters?.docs?.description}}};const X=["Default","Loading","HappyPath"];export{r as Default,i as HappyPath,n as Loading,X as __namedExportsOrder,W as default};
