import{j as t}from"./iframe-BY6WQ8rl.js";import{a as F}from"./zod-u2BPg-vl.js";import{u as L,F as H}from"./form-Cl4D1rHv.js";import{C as N}from"./update-phone-form-DjisV8wH.js";import"./otp-input-BLtKvdQh.js";import{c as D}from"./user-MfbVMCGJ.js";import{s as E}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-BKf9BodT.js";import"./index-Cg4mt3GG.js";import"./createLucideIcon-DhaeV68V.js";import"./label-CxilLX0s.js";import"./index-B6rVzEen.js";import"./index-DRfufKDV.js";import"./button-Bkd1CeD9.js";import"./input-D0mA3Bj2.js";import"./check-DNbWv-jy.js";import"./x-CoTNxCXn.js";import"./card-C2MAT-zL.js";import"./platform-CXbBvqhr.js";import"./circle-x-CqC3SdqK.js";import"./circle-alert-BdeKJeaD.js";import"./circle-check-big-CNw7CXee.js";function i({onSubmit:e,isLoading:a=!1}){const s=L({resolver:F(D),defaultValues:{currentPassword:"",newPassword:"",confirmPassword:""}}),p=async d=>{await e(d)},l=s.watch("newPassword");return t.jsx(H,{...s,children:t.jsx(N,{control:s.control,errors:s.formState.errors,onSubmit:s.handleSubmit(p),newPasswordValue:l,isLoading:a})})}i.__docgenInfo={description:`Container component for change password form
Manages form state, schema validation, and submission logic`,methods:[],displayName:"ChangePasswordFormContainer",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: ChangePasswordFormData) => Promise<void>",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"changePasswordSchema"}],raw:"z.infer<typeof changePasswordSchema>"},name:"data"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:"Callback function called when form is submitted with valid data"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the form is in loading state (disables submit button)",defaultValue:{value:"false",computed:!1}}}};var u,w,v,g,y,h,f,P,_,x,b,S,B,C,T;const{expect:m,userEvent:c,within:I}=__STORYBOOK_MODULE_TEST__,re={title:"Security/ChangePasswordForm",component:i,parameters:{layout:"centered"},tags:["autodocs"]},r={render:()=>t.jsx("div",{className:"w-[500px] p-6",children:t.jsx(i,{onSubmit:async e=>{E.info("Form submitted:",e)}})})},o={render:()=>t.jsx("div",{className:"w-[500px] p-6",children:t.jsx(i,{onSubmit:async e=>{E.info("Form submitted:",e)},isLoading:!0})})},n={render:()=>t.jsx("div",{className:"w-[500px] p-6",children:t.jsx(i,{onSubmit:async e=>{E.info("Form submitted:",e)}})}),play:async({canvasElement:e})=>{const a=I(e),s=a.getByPlaceholderText("请输入当前密码");await c.type(s,"OldPassword123",{delay:50});const p=a.getByPlaceholderText("请输入新密码");await c.type(p,"NewPassword456",{delay:50});const l=a.getByPlaceholderText("请再次输入新密码");await c.type(l,"NewPassword456",{delay:50}),await m(a.getByText("至少 8 个字符")).toHaveClass("text-chart-5"),await m(a.getByText("包含至少一个数字")).toHaveClass("text-chart-5"),await m(a.getByText("包含至少一个字母")).toHaveClass("text-chart-5");const d=a.getByRole("button",{name:/修改密码/i});await m(d).toBeEnabled(),await c.click(d)}};r.parameters={...r.parameters,docs:{...(u=r.parameters)===null||u===void 0?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      storyLogger.info("Form submitted:", data);
    }} />
    </div>
}`,...(v=r.parameters)===null||v===void 0||(w=v.docs)===null||w===void 0?void 0:w.source},description:{story:`Default change password form
Shows the form with current password, new password, and confirm password fields
Includes real-time password requirement validation`,...(y=r.parameters)===null||y===void 0||(g=y.docs)===null||g===void 0?void 0:g.description}}};o.parameters={...o.parameters,docs:{...(h=o.parameters)===null||h===void 0?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      storyLogger.info("Form submitted:", data);
    }} isLoading={true} />
    </div>
}`,...(P=o.parameters)===null||P===void 0||(f=P.docs)===null||f===void 0?void 0:f.source},description:{story:`Loading state
Shows the form in loading state during submission`,...(x=o.parameters)===null||x===void 0||(_=x.docs)===null||_===void 0?void 0:_.description}}};n.parameters={...n.parameters,docs:{...(b=n.parameters)===null||b===void 0?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      storyLogger.info("Form submitted:", data);
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
      name: /修改密码/i
    });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  }
}`,...(B=n.parameters)===null||B===void 0||(S=B.docs)===null||S===void 0?void 0:S.source},description:{story:`Happy Path smoke test
Simulates a user successfully changing their password

Test steps:
1. Enter current password
2. Enter new password that meets requirements
3. Confirm new password
4. Verify password requirements are met
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested using RTL`,...(T=n.parameters)===null||T===void 0||(C=T.docs)===null||C===void 0?void 0:C.description}}};const oe=["Default","Loading","HappyPath"];export{r as Default,n as HappyPath,o as Loading,oe as __namedExportsOrder,re as default};
