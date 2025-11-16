import{j as e}from"./iframe-CvbL331m.js";import{u as f,a as v,F as w,b as l,c as p,d as u,e as h,f as x}from"./form-Bc27KVpi.js";import{L as b}from"./link-CNRgiC8u.js";import{B as j}from"./button-CAXY9XPu.js";import{C as N}from"./checkbox-DQy_fzko.js";import{I as y}from"./input-mbU9WAfX.js";import{c as F}from"./auth-CmJUVIQY.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-dlpNQSCA.js";import"./index-C7jJTgGp.js";import"./label-D8545hoU.js";import"./index-BfQugiVD.js";import"./index-DhbfMN3k.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./index-BDPzjxq2.js";import"./index-DCRjOMVy.js";import"./index-CX3gvrbW.js";import"./index-BoeX9q8m.js";import"./index-C39R23Iy.js";import"./index-B5evkZDY.js";import"./check-DPXj8nmq.js";import"./createLucideIcon-BH8CnD7y.js";function m({onSubmit:s,isLoading:n=!1}){const o=f({resolver:v(F),defaultValues:{phoneNumber:"",password:"",agreedToTerms:!1}}),d=t=>{s(t)};return e.jsx(w,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(d),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(l,{control:o.control,name:"phoneNumber",render:({field:t})=>e.jsxs(p,{children:[e.jsx(u,{className:"text-sm font-medium text-gray-700",children:"手机号"}),e.jsx(h,{children:e.jsx(y,{...t,type:"tel",placeholder:"请输入手机号",className:"h-12",maxLength:11,disabled:n})}),e.jsx(x,{})]})}),e.jsx(l,{control:o.control,name:"password",render:({field:t})=>e.jsxs(p,{children:[e.jsx(u,{className:"text-sm font-medium text-gray-700",children:"密码"}),e.jsx(h,{children:e.jsx(y,{...t,type:"password",placeholder:"请输入密码",className:"h-12"})}),e.jsx(x,{})]})}),e.jsx(l,{control:o.control,name:"agreedToTerms",render:({field:t})=>e.jsxs(p,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(h,{children:e.jsx(N,{checked:t.value,onCheckedChange:t.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsxs(u,{className:"text-sm text-gray-600",children:["同意《",e.jsx(b,{href:"/terms",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-800 underline",children:"服务协议"}),"》和《",e.jsx(b,{href:"/privacy",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-800 underline",children:"隐私政策"}),"》"]}),e.jsx(x,{})]})]})})]}),e.jsx(j,{type:"submit",className:"w-full h-12 bg-blue-600 hover:bg-blue-700 text-white",disabled:n,children:n?"登录中...":"登录"})]})})}m.__docgenInfo={description:"",methods:[],displayName:"PhoneLoginForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: PhoneLoginData) => void",signature:{arguments:[{type:{name:"PhoneLoginData"},name:"data"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const{expect:S,userEvent:c,within:L}=__STORYBOOK_MODULE_TEST__,W={title:"Auth/PhoneLoginForm",component:m,parameters:{layout:"centered"},tags:["autodocs"]},a={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(m,{onSubmit:s=>{console.log("Form submitted:",s)}})})},r={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(m,{onSubmit:s=>{console.log("Form submitted:",s)},isLoading:!0})})},i={render:()=>e.jsx("div",{className:"w-[400px] p-6",children:e.jsx(m,{onSubmit:s=>{console.log("Form submitted:",s)}})}),play:async({canvasElement:s})=>{const n=L(s),o=n.getByPlaceholderText("请输入手机号");await c.type(o,"13812345678",{delay:50});const d=n.getByPlaceholderText("请输入密码");await c.type(d,"Password123",{delay:50});const t=n.getByRole("checkbox");await c.click(t);const g=n.getByRole("button",{name:/登录/i});await S(g).toBeEnabled(),await c.click(g)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneLoginForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...a.parameters?.docs?.source},description:{story:`Default phone login form
Shows the basic form structure with phone number, password, and terms checkbox`,...a.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneLoginForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} isLoading={true} />
    </div>
}`,...r.parameters?.docs?.source},description:{story:`Loading state
Shows the form in loading state during submission`,...r.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[400px] p-6">
      <PhoneLoginForm onSubmit={data => {
      console.log("Form submitted:", data);
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
Simulates a user successfully logging in with phone and password

Test steps:
1. Enter valid phone number
2. Enter password
3. Agree to terms
4. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested in phone-login.test.tsx using RTL`,...i.parameters?.docs?.description}}};const X=["Default","Loading","HappyPath"];export{a as Default,i as HappyPath,r as Loading,X as __namedExportsOrder,W as default};
