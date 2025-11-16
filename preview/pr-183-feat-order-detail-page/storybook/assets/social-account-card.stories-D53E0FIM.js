import{r as v,j as e}from"./iframe-CvbL331m.js";import{C as g}from"./card-DrX_RmyE.js";import{C as k}from"./check-DPXj8nmq.js";import{B as s}from"./button-CAXY9XPu.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CBfrqCZ4.js";import"./createLucideIcon-BH8CnD7y.js";import"./index-C7jJTgGp.js";import"./index-CdJFUDDL.js";function x({className:n}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:n,"aria-hidden":"true",children:e.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})}function b({className:n}){return e.jsxs("svg",{viewBox:"0 0 24 24",className:n,"aria-hidden":"true",children:[e.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),e.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),e.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),e.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]})}function c({provider:n,providerName:d,isLinked:l,linkButton:u,unlinkButton:p}){const[m,a]=v.useState(!1),h=n==="github"?x:b;return e.jsx(g,{className:"w-[180px] text-center transition-shadow hover:shadow-md",onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:e.jsxs("div",{className:"p-4 space-y-3",children:[e.jsx("div",{className:"flex justify-center",children:e.jsx("div",{className:"w-12 h-12 rounded-full flex items-center justify-center",children:e.jsx(h,{className:"w-8 h-8 text-gray-700"})})}),e.jsx("h3",{className:"text-sm font-medium",children:d}),e.jsx("div",{className:"min-h-8 flex items-center justify-center",children:l?m?p:e.jsxs("div",{className:"flex items-center gap-1.5 text-green-600",children:[e.jsx(k,{className:"w-4 h-4"}),e.jsx("span",{className:"text-xs font-medium",children:"已绑定"})]}):u})]})})}c.__docgenInfo={description:`SocialAccountCard Component

Displays a social account provider with binding status and action button.
Used in the account binding page to show GitHub and Google account links.

Features:
- Provider-specific icon (GitHub or Google)
- Shows "已绑定" (Linked) status with checkmark when linked
- On hover over linked card, shows unlink button instead
- Shows link button when not linked
- Compact vertical layout

@example
\`\`\`tsx
<SocialAccountCard
  provider="github"
  providerName="GitHub"
  isLinked={true}
  unlinkButton={<UnlinkButton providerId="github" providerName="GitHub" />}
/>
\`\`\``,methods:[],displayName:"SocialAccountCard",props:{provider:{required:!0,tsType:{name:"union",raw:'"github" | "google"',elements:[{name:"literal",value:'"github"'},{name:"literal",value:'"google"'}]},description:"Social provider identifier"},providerName:{required:!0,tsType:{name:"string"},description:"Display name of the provider"},isLinked:{required:!0,tsType:{name:"boolean"},description:"Whether the account is currently linked"},accountId:{required:!1,tsType:{name:"string"},description:"Account identifier if linked (e.g., username or email)"},linkButton:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Link button component to render when account is not linked"},unlinkButton:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Unlink button component to render when account is linked"}}};const S={title:"Auth/SocialAccountCard",component:c,parameters:{layout:"centered",docs:{description:{component:`SocialAccountCard displays a social provider with binding status.

Used in the account binding page to show GitHub and Google account links.
Users can bind or unbind their social accounts for quick sign-in.

Features:
- Compact vertical layout
- Shows "已绑定" (Linked) status with checkmark when linked
- Hover over linked card to reveal unlink button
- Shows link button when not linked

Note: In Storybook, we use simple Button components for visual presentation.
In the actual app, LinkButton and UnlinkButton components are used with
real OAuth and Server Action functionality.`}}},tags:["autodocs"],argTypes:{provider:{control:"select",options:["github","google"],description:"Social provider identifier"},providerName:{control:"text",description:"Display name of the provider"},isLinked:{control:"boolean",description:"Whether the account is currently linked"}}},t={args:{provider:"github",providerName:"GitHub",isLinked:!1,linkButton:e.jsx(s,{variant:"outline",size:"sm",className:"text-sm",children:"绑定账号"})}},o={args:{provider:"github",providerName:"GitHub",isLinked:!0,unlinkButton:e.jsx(s,{variant:"outline",size:"sm",className:"text-sm",children:"取消绑定"})}},i={args:{provider:"google",providerName:"Google",isLinked:!1,linkButton:e.jsx(s,{variant:"outline",size:"sm",className:"text-sm",children:"绑定账号"})}},r={args:{provider:"google",providerName:"Google",isLinked:!0,unlinkButton:e.jsx(s,{variant:"outline",size:"sm",className:"text-sm",children:"取消绑定"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    provider: "github",
    providerName: "GitHub",
    isLinked: false,
    linkButton: <Button variant="outline" size="sm" className="text-sm">
        绑定账号
      </Button>
  }
}`,...t.parameters?.docs?.source},description:{story:"GitHub account that is not linked yet",...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    provider: "github",
    providerName: "GitHub",
    isLinked: true,
    unlinkButton: <Button variant="outline" size="sm" className="text-sm">
        取消绑定
      </Button>
  }
}`,...o.parameters?.docs?.source},description:{story:`GitHub account that is already linked
Hover over the card to see the unlink button`,...o.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    provider: "google",
    providerName: "Google",
    isLinked: false,
    linkButton: <Button variant="outline" size="sm" className="text-sm">
        绑定账号
      </Button>
  }
}`,...i.parameters?.docs?.source},description:{story:"Google account that is not linked yet",...i.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    provider: "google",
    providerName: "Google",
    isLinked: true,
    unlinkButton: <Button variant="outline" size="sm" className="text-sm">
        取消绑定
      </Button>
  }
}`,...r.parameters?.docs?.source},description:{story:`Google account that is already linked
Hover over the card to see the unlink button`,...r.parameters?.docs?.description}}};const C=["GitHubUnlinked","GitHubLinked","GoogleUnlinked","GoogleLinked"];export{o as GitHubLinked,t as GitHubUnlinked,r as GoogleLinked,i as GoogleUnlinked,C as __namedExportsOrder,S as default};
