import{r as y,j as e}from"./iframe-BRgbNqLm.js";import{u as I,a as k,F as _,b as f,c as g,d as b,e as v,f as P}from"./form-DUMmpeIS.js";import{B as H}from"./button-XEp2VeJS.js";import{I as j}from"./input-COzq8dAy.js";import{f as O}from"./user-D4U25rvE.js";import{E as N,a as C}from"./eye-BdGY_IqT.js";import{C as q}from"./check-Cd9Uyfqw.js";import{X as D}from"./x-BE9TJoN7.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-wRgyZonl.js";import"./index-D63BWAbV.js";import"./label-B1eabMHL.js";import"./index-Bxj4v1On.js";import"./index-CgtdcUJL.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./createLucideIcon-CeCL99oA.js";function m({onSubmit:t,isLoading:s=!1}){const a=I({resolver:k(O),defaultValues:{currentPassword:"",newPassword:"",confirmPassword:""}}),[o,w]=y.useState(!1),[n,S]=y.useState(!1),[h,B]=y.useState(!1),F=async r=>{await t(r)},l=a.watch("newPassword"),E=[{label:"至少 8 个字符",met:l.length>=8},{label:"包含至少一个数字",met:/\d/.test(l)},{label:"包含至少一个字母",met:/[a-zA-Z]/.test(l)}];return e.jsx(_,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(F),className:"space-y-6",children:[e.jsx(f,{control:a.control,name:"currentPassword",render:({field:r})=>e.jsxs(g,{children:[e.jsx(b,{children:"当前密码"}),e.jsx(v,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:o?"text":"password",placeholder:"请输入当前密码",disabled:s,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>w(!o),className:"absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",children:o?e.jsx(N,{className:"h-4 w-4"}):e.jsx(C,{className:"h-4 w-4"})})]})}),e.jsx(P,{})]})}),e.jsx(f,{control:a.control,name:"newPassword",render:({field:r})=>e.jsxs(g,{children:[e.jsx(b,{children:"新密码"}),e.jsx(v,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:n?"text":"password",placeholder:"请输入新密码",disabled:s,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>S(!n),className:"absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",children:n?e.jsx(N,{className:"h-4 w-4"}):e.jsx(C,{className:"h-4 w-4"})})]})}),e.jsx(P,{}),l&&e.jsxs("div",{className:"mt-3 space-y-2",children:[e.jsx("p",{className:"text-sm text-muted-foreground",children:"密码要求："}),e.jsx("div",{className:"space-y-1",children:E.map((x,T)=>e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[x.met?e.jsx(q,{className:"h-4 w-4 text-chart-5"}):e.jsx(D,{className:"h-4 w-4 text-muted-foreground"}),e.jsx("span",{className:x.met?"text-chart-5":"text-muted-foreground",children:x.label})]},T))})]})]})}),e.jsx(f,{control:a.control,name:"confirmPassword",render:({field:r})=>e.jsxs(g,{children:[e.jsx(b,{children:"确认新密码"}),e.jsx(v,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:h?"text":"password",placeholder:"请再次输入新密码",disabled:s,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>B(!h),className:"absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",children:h?e.jsx(N,{className:"h-4 w-4"}):e.jsx(C,{className:"h-4 w-4"})})]})}),e.jsx(P,{})]})}),e.jsx(H,{type:"submit",className:"w-full",disabled:s,children:s?"修改中...":"确认修改"})]})})}m.__docgenInfo={description:`Change password form component for users who already have a password
Includes real-time password requirement validation with visual feedback`,methods:[],displayName:"ChangePasswordForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: ChangePasswordFormData) => Promise<void>",signature:{arguments:[{type:{name:"ChangePasswordData"},name:"data"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:"Callback function called when form is submitted with valid data"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the form is in loading state (disables submit button)",defaultValue:{value:"false",computed:!1}}}};const{expect:u,userEvent:p,within:L}=__STORYBOOK_MODULE_TEST__,te={title:"Security/ChangePasswordForm",component:m,parameters:{layout:"centered"},tags:["autodocs"]},d={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(m,{onSubmit:async t=>{console.log("Form submitted:",t)}})})},i={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(m,{onSubmit:async t=>{console.log("Form submitted:",t)},isLoading:!0})})},c={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(m,{onSubmit:async t=>{console.log("Form submitted:",t)}})}),play:async({canvasElement:t})=>{const s=L(t),a=s.getByPlaceholderText("请输入当前密码");await p.type(a,"OldPassword123",{delay:50});const o=s.getByPlaceholderText("请输入新密码");await p.type(o,"NewPassword456",{delay:50});const w=s.getByPlaceholderText("请再次输入新密码");await p.type(w,"NewPassword456",{delay:50}),await u(s.getByText("至少 8 个字符")).toHaveClass("text-chart-5"),await u(s.getByText("包含至少一个数字")).toHaveClass("text-chart-5"),await u(s.getByText("包含至少一个字母")).toHaveClass("text-chart-5");const n=s.getByRole("button",{name:/确认修改/i});await u(n).toBeEnabled(),await p.click(n)}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...d.parameters?.docs?.source},description:{story:`Default change password form
Shows the form with current password, new password, and confirm password fields
Includes real-time password requirement validation`,...d.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      console.log("Form submitted:", data);
    }} isLoading={true} />
    </div>
}`,...i.parameters?.docs?.source},description:{story:`Loading state
Shows the form in loading state during submission`,...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      console.log("Form submitted:", data);
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter current password
    const currentPasswordInput = canvas.getByPlaceholderText("请输入当前密码");
    await userEvent.type(currentPasswordInput, "OldPassword123", {
      delay: 50
    });

    // 2. Enter new password that meets requirements
    const newPasswordInput = canvas.getByPlaceholderText("请输入新密码");
    await userEvent.type(newPasswordInput, "NewPassword456", {
      delay: 50
    });

    // 3. Confirm new password
    const confirmPasswordInput = canvas.getByPlaceholderText("请再次输入新密码");
    await userEvent.type(confirmPasswordInput, "NewPassword456", {
      delay: 50
    });

    // 4. Verify password requirements are met (green checkmarks)
    await expect(canvas.getByText("至少 8 个字符")).toHaveClass("text-chart-5");
    await expect(canvas.getByText("包含至少一个数字")).toHaveClass("text-chart-5");
    await expect(canvas.getByText("包含至少一个字母")).toHaveClass("text-chart-5");

    // 5. Verify form is ready to submit
    const submitButton = canvas.getByRole("button", {
      name: /确认修改/i
    });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  }
}`,...c.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully changing their password

Test steps:
1. Enter current password
2. Enter new password that meets requirements
3. Confirm new password
4. Verify password requirements are met
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested using RTL`,...c.parameters?.docs?.description}}};const ae=["Default","Loading","HappyPath"];export{d as Default,c as HappyPath,i as Loading,ae as __namedExportsOrder,te as default};
