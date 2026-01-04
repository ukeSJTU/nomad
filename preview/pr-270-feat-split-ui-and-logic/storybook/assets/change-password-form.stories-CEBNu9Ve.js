import{r as v,j as e}from"./iframe-DnZgF7bs.js";import{u as X,a as Y,F as Z,c as f,d as y,b as g,e as b,f as P}from"./form-CFezdB__.js";import{B as G}from"./button-ByK4bP4Z.js";import{I as j}from"./input-XBIfvFIm.js";import{c as J}from"./user-CsBTq0tX.js";import{E as _,a as N}from"./eye-C0wyioOX.js";import{C as Q}from"./check-BTn7Ky3Q.js";import{X as $}from"./x-CLbpMkTL.js";import{s as z}from"./storybook-logger-DgFpE3wU.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-CAiuSp-P.js";import"./index-BMzLOmL9.js";import"./utils-CDN07tui.js";import"./label-CAfTcdZI.js";import"./index-Be03snLn.js";import"./index-ZqBm70yH.js";import"./index-B_jtOnfb.js";import"./createLucideIcon-DqjoOZ7r.js";function l({onSubmit:a,isLoading:s=!1}){const t=X({resolver:Y(J),defaultValues:{currentPassword:"",newPassword:"",confirmPassword:""}}),[n,w]=v.useState(!1),[o,M]=v.useState(!1),[h,A]=v.useState(!1),K=async r=>{await a(r)},m=t.watch("newPassword"),U=[{label:"至少 8 个字符",met:m.length>=8},{label:"包含至少一个数字",met:/\d/.test(m)},{label:"包含至少一个字母",met:/[a-zA-Z]/.test(m)}];return e.jsx(Z,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(K),className:"space-y-6",children:[e.jsx(f,{control:t.control,name:"currentPassword",render:({field:r})=>e.jsxs(y,{children:[e.jsx(g,{children:"当前密码"}),e.jsx(b,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:n?"text":"password",placeholder:"请输入当前密码",disabled:s,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>w(!n),className:"absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",children:n?e.jsx(_,{className:"h-4 w-4"}):e.jsx(N,{className:"h-4 w-4"})})]})}),e.jsx(P,{})]})}),e.jsx(f,{control:t.control,name:"newPassword",render:({field:r})=>e.jsxs(y,{children:[e.jsx(g,{children:"新密码"}),e.jsx(b,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:o?"text":"password",placeholder:"请输入新密码",disabled:s,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>M(!o),className:"absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",children:o?e.jsx(_,{className:"h-4 w-4"}):e.jsx(N,{className:"h-4 w-4"})})]})}),e.jsx(P,{}),m&&e.jsxs("div",{className:"mt-3 space-y-2",children:[e.jsx("p",{className:"text-sm text-muted-foreground",children:"密码要求："}),e.jsx("div",{className:"space-y-1",children:U.map((x,W)=>e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[x.met?e.jsx(Q,{className:"h-4 w-4 text-chart-5"}):e.jsx($,{className:"h-4 w-4 text-muted-foreground"}),e.jsx("span",{className:x.met?"text-chart-5":"text-muted-foreground",children:x.label})]},W))})]})]})}),e.jsx(f,{control:t.control,name:"confirmPassword",render:({field:r})=>e.jsxs(y,{children:[e.jsx(g,{children:"确认新密码"}),e.jsx(b,{children:e.jsxs("div",{className:"relative",children:[e.jsx(j,{...r,type:h?"text":"password",placeholder:"请再次输入新密码",disabled:s,className:"pr-10"}),e.jsx("button",{type:"button",onClick:()=>A(!h),className:"absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",children:h?e.jsx(_,{className:"h-4 w-4"}):e.jsx(N,{className:"h-4 w-4"})})]})}),e.jsx(P,{})]})}),e.jsx(G,{type:"submit",className:"w-full",disabled:s,children:s?"修改中...":"确认修改"})]})})}l.__docgenInfo={description:`Change password form component for users who already have a password
Includes real-time password requirement validation with visual feedback`,methods:[],displayName:"ChangePasswordForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: ChangePasswordFormData) => Promise<void>",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"changePasswordSchema"}],raw:"z.infer<typeof changePasswordSchema>"},name:"data"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:"Callback function called when form is submitted with valid data"},isLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the form is in loading state (disables submit button)",defaultValue:{value:"false",computed:!1}}}};var S,C,B,F,E,T,I,H,L,k,D,O,q,R,V;const{expect:p,userEvent:u,within:ee}=__STORYBOOK_MODULE_TEST__,ye={title:"Security/ChangePasswordForm",component:l,parameters:{layout:"centered"},tags:["autodocs"]},d={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(l,{onSubmit:async a=>{z.info("Form submitted:",a)}})})},i={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(l,{onSubmit:async a=>{z.info("Form submitted:",a)},isLoading:!0})})},c={render:()=>e.jsx("div",{className:"w-[500px] p-6",children:e.jsx(l,{onSubmit:async a=>{z.info("Form submitted:",a)}})}),play:async({canvasElement:a})=>{const s=ee(a),t=s.getByPlaceholderText("请输入当前密码");await u.type(t,"OldPassword123",{delay:50});const n=s.getByPlaceholderText("请输入新密码");await u.type(n,"NewPassword456",{delay:50});const w=s.getByPlaceholderText("请再次输入新密码");await u.type(w,"NewPassword456",{delay:50}),await p(s.getByText("至少 8 个字符")).toHaveClass("text-chart-5"),await p(s.getByText("包含至少一个数字")).toHaveClass("text-chart-5"),await p(s.getByText("包含至少一个字母")).toHaveClass("text-chart-5");const o=s.getByRole("button",{name:/确认修改/i});await p(o).toBeEnabled(),await u.click(o)}};d.parameters={...d.parameters,docs:{...(S=d.parameters)===null||S===void 0?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      storyLogger.info("Form submitted:", data);
    }} />
    </div>
}`,...(B=d.parameters)===null||B===void 0||(C=B.docs)===null||C===void 0?void 0:C.source},description:{story:`Default change password form
Shows the form with current password, new password, and confirm password fields
Includes real-time password requirement validation`,...(E=d.parameters)===null||E===void 0||(F=E.docs)===null||F===void 0?void 0:F.description}}};i.parameters={...i.parameters,docs:{...(T=i.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="w-[500px] p-6">
      <ChangePasswordForm onSubmit={async data => {
      storyLogger.info("Form submitted:", data);
    }} isLoading={true} />
    </div>
}`,...(H=i.parameters)===null||H===void 0||(I=H.docs)===null||I===void 0?void 0:I.source},description:{story:`Loading state
Shows the form in loading state during submission`,...(k=i.parameters)===null||k===void 0||(L=k.docs)===null||L===void 0?void 0:L.description}}};c.parameters={...c.parameters,docs:{...(D=c.parameters)===null||D===void 0?void 0:D.docs,source:{originalSource:`{
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
      name: /确认修改/i
    });
    await expect(submitButton).toBeEnabled();

    // 6. Submit form
    await userEvent.click(submitButton);
  }
}`,...(q=c.parameters)===null||q===void 0||(O=q.docs)===null||O===void 0?void 0:O.source},description:{story:`Happy Path smoke test
Simulates a user successfully changing their password

Test steps:
1. Enter current password
2. Enter new password that meets requirements
3. Confirm new password
4. Verify password requirements are met
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested using RTL`,...(V=c.parameters)===null||V===void 0||(R=V.docs)===null||R===void 0?void 0:R.description}}};const ge=["Default","Loading","HappyPath"];export{d as Default,c as HappyPath,i as Loading,ge as __namedExportsOrder,ye as default};
