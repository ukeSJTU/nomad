import{j as t}from"./iframe-CrLPMyef.js";import{a as F}from"./zod-YBRs5Al3.js";import{u as L,F as H}from"./form-vAtcQtf6.js";import{C as N}from"./update-phone-form-B5gPrmZO.js";import"./otp-input-DTSlPgKn.js";import{c as D}from"./user-MfbVMCGJ.js";import{s as E}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-BKf9BodT.js";import"./index-CCw5U8u4.js";import"./createLucideIcon-DzaTpkcS.js";import"./label-Dee_xcgp.js";import"./index-E-CxifyW.js";import"./index-DLC0D_9l.js";import"./button-C49Jt41H.js";import"./input-CBtiA9j3.js";import"./check-DD9V9MZB.js";import"./x-DszoDRII.js";import"./card-D-d6dHIy.js";import"./platform-DKvuCmmd.js";import"./circle-x-B6KCtiih.js";import"./circle-alert-Dy3v6eT1.js";import"./circle-check-big-H3xgBYGC.js";function i({onSubmit:e,isLoading:a=!1}){const s=L({resolver:F(D),defaultValues:{currentPassword:"",newPassword:"",confirmPassword:""}}),p=async d=>{await e(d)},l=s.watch("newPassword");return t.jsx(H,{...s,children:t.jsx(N,{control:s.control,errors:s.formState.errors,onSubmit:s.handleSubmit(p),newPasswordValue:l,isLoading:a})})}i.__docgenInfo={description:`Container component for change password form
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
