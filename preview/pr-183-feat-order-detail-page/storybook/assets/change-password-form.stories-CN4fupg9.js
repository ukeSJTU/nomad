import{r as y,j as e}from"./iframe-DjPNHZgi.js";import{u as k,a as _,F as H,b as g,c as f,d as P,e as b,f as v}from"./form-25d0ezG_.js";import{B as O}from"./button-DD9hQeUx.js";import{I as j}from"./input-BGgh65P4.js";import{E as N,a as S}from"./eye-BpLjAfND.js";import{C as q}from"./check-DoZ9iuoG.js";import{X as D}from"./x-CJAaMT-8.js";import{o as L,s as C}from"./schemas-dlpNQSCA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B46xqJ3Q.js";import"./label-IH1ewb31.js";import"./index-C2lakmAf.js";import"./index-jzZgMQDY.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";import"./createLucideIcon-DIu0cbjF.js";const R=L({currentPassword:C().min(1,"请输入当前密码"),newPassword:C().min(8,"密码至少需要 8 个字符").max(128,"密码最多 128 个字符").regex(/\d/,"密码必须包含至少一个数字").regex(/[a-zA-Z]/,"密码必须包含至少一个字母"),confirmPassword:C().min(1,"请确认新密码")}).refine(s=>s.newPassword===s.confirmPassword,{message:"两次输入的密码不一致",path:["confirmPassword"]}).refine(s=>s.currentPassword!==s.newPassword,{message:"新密码不能与当前密码相同",path:["newPassword"]});function m({onSubmit:s,isLoading:a=!1}){const t=k({resolver:_(R),defaultValues:{currentPassword:"",newPassword:"",confirmPassword:""}}),[o,u]=y.useState(!1),[n,B]=y.useState(!1),[h,F]=y.useState(!1),E=async r=>{await s(r)},l=t.watch("newPassword"),T=[{label:"至少 8 个字符",met:l.length>=8},{label:"包含至少一个数字",met:/\d/.test(l)},{label:"包含至少一个字母",met:/[a-zA-Z]/.test(l)}];return e.jsx(H,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(E),className:"space-y-6",children:[e.jsx(g,{control:t.control,name:"currentPassword",render:({field:r})=>e.jsxs(f,{children:[e.jsx(P,{children:"当前密码"}),e.jsx(b,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:o?"text":"password",placeholder:"请输入当前密码",disabled:a,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>u(!o),className:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700",children:o?e.jsx(N,{className:"h-4 w-4"}):e.jsx(S,{className:"h-4 w-4"})})]})}),e.jsx(v,{})]})}),e.jsx(g,{control:t.control,name:"newPassword",render:({field:r})=>e.jsxs(f,{children:[e.jsx(P,{children:"新密码"}),e.jsx(b,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:n?"text":"password",placeholder:"请输入新密码",disabled:a,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>B(!n),className:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700",children:n?e.jsx(N,{className:"h-4 w-4"}):e.jsx(S,{className:"h-4 w-4"})})]})}),e.jsx(v,{}),l&&e.jsxs("div",{className:"mt-3 space-y-2",children:[e.jsx("p",{className:"text-sm text-gray-600",children:"密码要求："}),e.jsx("div",{className:"space-y-1",children:T.map((x,I)=>e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[x.met?e.jsx(q,{className:"h-4 w-4 text-green-600"}):e.jsx(D,{className:"h-4 w-4 text-gray-400"}),e.jsx("span",{className:x.met?"text-green-600":"text-gray-500",children:x.label})]},I))})]})]})}),e.jsx(g,{control:t.control,name:"confirmPassword",render:({field:r})=>e.jsxs(f,{children:[e.jsx(P,{children:"确认新密码"}),e.jsx(b,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:h?"text":"password",placeholder:"请再次输入新密码",disabled:a,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>F(!h),className:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700",children:h?e.jsx(N,{className:"h-4 w-4"}):e.jsx(S,{className:"h-4 w-4"})})]})}),e.jsx(v,{})]})}),e.jsx(O,{type:"submit",className:"w-full",disabled:a,children:a?"修改中...":"确认修改"})]})})}m.__docgenInfo={description:`Change password form component for users who already have a password
Includes real-time password requirement validation with visual feedback`,methods:[],displayName:"ChangePasswordForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: ChangePasswordFormData) => Promise<void>",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"changePasswordSchema"}],raw:"z.infer<typeof changePasswordSchema>"},name:"data"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:"Callback function called when form is submitted with valid data"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the form is in loading state (disables submit button)",defaultValue:{value:"false",computed:!1}}}};const{expect:p,userEvent:w,within:V}=__STORYBOOK_MODULE_TEST__,te={title:"Security/ChangePasswordForm",component:m,parameters:{layout:"centered"},tags:["autodocs"]},i={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(m,{onSubmit:async s=>{console.log("Form submitted:",s)}})})},d={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(m,{onSubmit:async s=>{console.log("Form submitted:",s)},isLoading:!0})})},c={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(m,{onSubmit:async s=>{console.log("Form submitted:",s)}})}),play:async({canvasElement:s})=>{const a=V(s),t=a.getByPlaceholderText("请输入当前密码");await w.type(t,"OldPassword123",{delay:50});const o=a.getByPlaceholderText("请输入新密码");await w.type(o,"NewPassword456",{delay:50});const u=a.getByPlaceholderText("请再次输入新密码");await w.type(u,"NewPassword456",{delay:50}),await p(a.getByText("至少 8 个字符")).toHaveClass("text-green-600"),await p(a.getByText("包含至少一个数字")).toHaveClass("text-green-600"),await p(a.getByText("包含至少一个字母")).toHaveClass("text-green-600");const n=a.getByRole("button",{name:/确认修改/i});await p(n).toBeEnabled(),await w.click(n)}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      console.log("Form submitted:", data);
    }} />
    </div>
}`,...i.parameters?.docs?.source},description:{story:`Default change password form
Shows the form with current password, new password, and confirm password fields
Includes real-time password requirement validation`,...i.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      console.log("Form submitted:", data);
    }} isLoading={true} />
    </div>
}`,...d.parameters?.docs?.source},description:{story:`Loading state
Shows the form in loading state during submission`,...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
    await expect(canvas.getByText("至少 8 个字符")).toHaveClass("text-green-600");
    await expect(canvas.getByText("包含至少一个数字")).toHaveClass("text-green-600");
    await expect(canvas.getByText("包含至少一个字母")).toHaveClass("text-green-600");

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
should be tested using RTL`,...c.parameters?.docs?.description}}};const re=["Default","Loading","HappyPath"];export{i as Default,c as HappyPath,d as Loading,re as __namedExportsOrder,te as default};
