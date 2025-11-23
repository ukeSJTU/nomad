import{j as e}from"./iframe-BIE3orPF.js";import{L as S}from"./link-DYL4FGRb.js";import{B as w}from"./button-BHL9VpYg.js";import{C as b}from"./card-BBfnKoXO.js";import{C as N}from"./circle-x-BaFO-j2N.js";import{C as j}from"./circle-alert-B4gTbZ38.js";import{C as L}from"./circle-check-big-DO1AjQ3w.js";import"./preload-helper-PPVm8Dsz.js";import"./use-merged-ref-DYwguYlI.js";import"./index-dpG-91xS.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./createLucideIcon-aXwR9RXD.js";function H(t,r){switch(t){case"verified":return{icon:e.jsx(L,{className:"size-5 text-chart-5"}),text:`已绑定${r?` ${r}`:""}`,textClassName:"text-chart-5 font-medium"};case"unverified":return{icon:e.jsx(j,{className:"size-5 text-secondary"}),text:`已设置但未验证${r?` ${r}`:""}`,textClassName:"text-secondary font-medium"};case"notSet":return{icon:e.jsx(N,{className:"size-5 text-muted-foreground"}),text:"未设置",textClassName:"text-muted-foreground font-medium"}}}function s({title:t,description:r,status:x,value:v,actionHref:y,actionLabel:g}){const f=H(x,v);return e.jsx(b,{className:"p-6",children:e.jsxs("div",{className:"flex items-start justify-between gap-4",children:[e.jsxs("div",{className:"flex items-start gap-4 flex-1",children:[e.jsx("div",{className:"mt-1",children:f.icon}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"text-lg font-semibold mb-1",children:t}),e.jsxs("div",{className:"text-sm text-muted-foreground space-y-1",children:[e.jsx("p",{className:f.textClassName,children:f.text}),e.jsx("p",{className:"mt-2",children:r})]})]})]}),e.jsx("div",{className:"shrink-0",children:e.jsx(w,{variant:"outline",size:"sm",asChild:!0,children:e.jsx(S,{href:y,children:g})})})]})})}s.__docgenInfo={description:"",methods:[],displayName:"SecurityItem",props:{title:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"string"},description:""},status:{required:!0,tsType:{name:"union",raw:'"verified" | "unverified" | "notSet"',elements:[{name:"literal",value:'"verified"'},{name:"literal",value:'"unverified"'},{name:"literal",value:'"notSet"'}]},description:""},value:{required:!1,tsType:{name:"string"},description:""},actionHref:{required:!0,tsType:{name:"string"},description:""},actionLabel:{required:!0,tsType:{name:"string"},description:""}}};const $={title:"Security/SecurityItem",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{title:{control:"text",description:"Title of the security item"},description:{control:"text",description:"Detailed description of the security item"},status:{control:"select",options:["verified","unverified","notSet"],description:"Security status: verified (set and verified), unverified (set but not verified), notSet (not set)"},value:{control:"text",description:"Optional value to display (e.g., masked phone number)"},actionHref:{control:"text",description:"URL for the action button"},actionLabel:{control:"text",description:"Label for the action button"}}},i={args:{title:"登录密码",description:"安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",status:"notSet",actionHref:"/home/security/password",actionLabel:"设置登录密码"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},a={args:{title:"登录密码",description:"安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",status:"verified",actionHref:"/home/security/password",actionLabel:"修改"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},n={args:{title:"绑定手机",description:"绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",status:"notSet",actionHref:"/home/security/phone",actionLabel:"设置绑定手机"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},o={args:{title:"绑定手机",description:"绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",status:"unverified",value:"+86138****5678",actionHref:"/home/security/phone",actionLabel:"验证手机号"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},c={args:{title:"绑定手机",description:"绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",status:"verified",value:"+86138****5678",actionHref:"/home/security/phone",actionLabel:"修改"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},d={args:{title:"绑定邮箱",description:"绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",status:"notSet",actionHref:"/home/security/email",actionLabel:"设置绑定邮箱"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},m={args:{title:"绑定邮箱",description:"绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",status:"unverified",value:"user@example.com",actionHref:"/home/security/email",actionLabel:"验证邮箱"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},l={args:{title:"绑定邮箱",description:"绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",status:"verified",value:"user@example.com",actionHref:"/home/security/email",actionLabel:"修改"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},u={render:()=>e.jsxs("div",{className:"w-[700px] space-y-4",children:[e.jsx(s,{title:"登录密码",description:"安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",status:"verified",actionHref:"/home/security/password",actionLabel:"修改"}),e.jsx(s,{title:"绑定手机",description:"绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",status:"unverified",value:"+86138****5678",actionHref:"/home/security/phone",actionLabel:"验证手机号"}),e.jsx(s,{title:"绑定邮箱",description:"绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",status:"notSet",actionHref:"/home/security/email",actionLabel:"设置绑定邮箱"})]})},p={args:{title:"账号安全设置",description:"这是一个非常长的描述文本，用于测试组件在处理大量文本时的表现。安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。同时，请确保您的密码不易被猜测，避免使用生日、电话号码等个人信息作为密码。",status:"notSet",actionHref:"/home/security",actionLabel:"立即设置"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})},h={args:{title:"双因素认证",description:"启用双因素认证可以大大提高账号安全性。",status:"notSet",actionHref:"/home/security/2fa",actionLabel:"立即启用"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...t})})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: "登录密码",
    description: "安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",
    status: "notSet",
    actionHref: "/home/security/password",
    actionLabel: "设置登录密码"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...i.parameters?.docs?.source},description:{story:`Default state of a security item that is not yet set up.
Shows an X icon and "未设置" status.`,...i.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: "登录密码",
    description: "安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",
    status: "verified",
    actionHref: "/home/security/password",
    actionLabel: "修改"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...a.parameters?.docs?.source},description:{story:`Password security item when already set and verified.
Shows a check icon and "已绑定" status without a value.`,...a.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: "绑定手机",
    description: "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    status: "notSet",
    actionHref: "/home/security/phone",
    actionLabel: "设置绑定手机"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...n.parameters?.docs?.source},description:{story:`Phone number security item when not set.
Shows an X icon and "未设置" status.`,...n.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "绑定手机",
    description: "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    status: "unverified",
    value: "+86138****5678",
    actionHref: "/home/security/phone",
    actionLabel: "验证手机号"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...o.parameters?.docs?.source},description:{story:`Phone number security item when set but not verified.
Shows an alert icon and "已设置但未验证" status with masked phone number.`,...o.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: "绑定手机",
    description: "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    status: "verified",
    value: "+86138****5678",
    actionHref: "/home/security/phone",
    actionLabel: "修改"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...c.parameters?.docs?.source},description:{story:`Phone number security item when verified.
Shows a check icon, "已绑定" status with masked phone number.`,...c.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    status: "notSet",
    actionHref: "/home/security/email",
    actionLabel: "设置绑定邮箱"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...d.parameters?.docs?.source},description:{story:`Email security item when not set.
Shows an X icon and "未设置" status.`,...d.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    status: "unverified",
    value: "user@example.com",
    actionHref: "/home/security/email",
    actionLabel: "验证邮箱"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Email security item when set but not verified.
Shows an alert icon and "已设置但未验证" status with the email address.`,...m.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: "绑定邮箱",
    description: "绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",
    status: "verified",
    value: "user@example.com",
    actionHref: "/home/security/email",
    actionLabel: "修改"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...l.parameters?.docs?.source},description:{story:`Email security item when verified.
Shows a check icon, "已绑定" status with the email address.`,...l.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[700px] space-y-4">
      <SecurityItem title="登录密码" description="安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。" status="verified" actionHref="/home/security/password" actionLabel="修改" />
      <SecurityItem title="绑定手机" description="绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。" status="unverified" value="+86138****5678" actionHref="/home/security/phone" actionLabel="验证手机号" />
      <SecurityItem title="绑定邮箱" description="绑定邮箱后，您即可使用邮箱登录账号或找回密码等。" status="notSet" actionHref="/home/security/email" actionLabel="设置绑定邮箱" />
    </div>
}`,...u.parameters?.docs?.source},description:{story:`Multiple security items stacked together.
Demonstrates how security items look when displayed in a list with different statuses.`,...u.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: "账号安全设置",
    description: "这是一个非常长的描述文本，用于测试组件在处理大量文本时的表现。安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。同时，请确保您的密码不易被猜测，避免使用生日、电话号码等个人信息作为密码。",
    status: "notSet",
    actionHref: "/home/security",
    actionLabel: "立即设置"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...p.parameters?.docs?.source},description:{story:`Long description example.
Tests how the component handles longer descriptive text.`,...p.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: "双因素认证",
    description: "启用双因素认证可以大大提高账号安全性。",
    status: "notSet",
    actionHref: "/home/security/2fa",
    actionLabel: "立即启用"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...h.parameters?.docs?.source},description:{story:`Custom action labels.
Demonstrates different action button labels.`,...h.parameters?.docs?.description}}};const A=["NotSet","PasswordVerified","PhoneNotSet","PhoneUnverified","PhoneVerified","EmailNotSet","EmailUnverified","EmailVerified","StackedItems","LongDescription","CustomActionLabel"];export{h as CustomActionLabel,d as EmailNotSet,m as EmailUnverified,l as EmailVerified,p as LongDescription,i as NotSet,a as PasswordVerified,n as PhoneNotSet,o as PhoneUnverified,c as PhoneVerified,u as StackedItems,A as __namedExportsOrder,$ as default};
