import{j as e}from"./iframe-DnZgF7bs.js";import{B as ge}from"./button-ByK4bP4Z.js";import{C as we}from"./card-4k7uV6oA.js";import{L as Ne}from"./link-BMm06O4b.js";import{C as be}from"./circle-x-mvGsp_hS.js";import{C as Le}from"./circle-alert-ADgUnWfx.js";import{C as je}from"./circle-check-big-M_cwdBaG.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BMzLOmL9.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./use-merged-ref-ByUIXBXc.js";import"./createLucideIcon-DqjoOZ7r.js";function Pe(t,r){switch(t){case"verified":return{icon:e.jsx(je,{className:"size-5 text-chart-5"}),text:`已绑定${r?` ${r}`:""}`,textClassName:"text-chart-5 font-medium"};case"unverified":return{icon:e.jsx(Le,{className:"size-5 text-secondary"}),text:`已设置但未验证${r?` ${r}`:""}`,textClassName:"text-secondary font-medium"};case"notSet":return{icon:e.jsx(be,{className:"size-5 text-muted-foreground"}),text:"未设置",textClassName:"text-muted-foreground font-medium"}}}function i({title:t,description:r,status:he,value:xe,actionHref:ye,actionLabel:Se}){const _=Pe(he,xe);return e.jsx(we,{className:"p-6",children:e.jsxs("div",{className:"flex items-start justify-between gap-4",children:[e.jsxs("div",{className:"flex items-start gap-4 flex-1",children:[e.jsx("div",{className:"mt-1",children:_.icon}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"text-lg font-semibold mb-1",children:t}),e.jsxs("div",{className:"text-sm text-muted-foreground space-y-1",children:[e.jsx("p",{className:_.textClassName,children:_.text}),e.jsx("p",{className:"mt-2",children:r})]})]})]}),e.jsx("div",{className:"shrink-0",children:e.jsx(ge,{variant:"outline",size:"sm",asChild:!0,children:e.jsx(Ne,{href:ye,children:Se})})})]})})}i.__docgenInfo={description:"",methods:[],displayName:"SecurityItem",props:{title:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"string"},description:""},status:{required:!0,tsType:{name:"union",raw:'"verified" | "unverified" | "notSet"',elements:[{name:"literal",value:'"verified"'},{name:"literal",value:'"unverified"'},{name:"literal",value:'"notSet"'}]},description:""},value:{required:!1,tsType:{name:"string"},description:""},actionHref:{required:!0,tsType:{name:"string"},description:""},actionLabel:{required:!0,tsType:{name:"string"},description:""}}};var f,h,x,y,S,g,w,N,b,L,j,P,H,E,I,C,V,k,U,D,T,A,q,z,X,$,B,O,R,M,F,G,J,K,Q,W,Y,Z,ee,te,ie,re,se,ae,oe,ne,de,ce,le,me,ue,pe,ve,_e,fe;const $e={title:"Security/SecurityItem",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{title:{control:"text",description:"Title of the security item"},description:{control:"text",description:"Detailed description of the security item"},status:{control:"select",options:["verified","unverified","notSet"],description:"Security status: verified (set and verified), unverified (set but not verified), notSet (not set)"},value:{control:"text",description:"Optional value to display (e.g., masked phone number)"},actionHref:{control:"text",description:"URL for the action button"},actionLabel:{control:"text",description:"Label for the action button"}}},s={args:{title:"登录密码",description:"安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",status:"notSet",actionHref:"/home/security/password",actionLabel:"设置登录密码"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},a={args:{title:"登录密码",description:"安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",status:"verified",actionHref:"/home/security/password",actionLabel:"修改"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},o={args:{title:"绑定手机",description:"绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",status:"notSet",actionHref:"/home/security/phone",actionLabel:"设置绑定手机"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},n={args:{title:"绑定手机",description:"绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",status:"unverified",value:"138****5678",actionHref:"/home/security/phone",actionLabel:"验证手机号"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},d={args:{title:"绑定手机",description:"绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",status:"verified",value:"138****5678",actionHref:"/home/security/phone",actionLabel:"修改"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},c={args:{title:"绑定邮箱",description:"绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",status:"notSet",actionHref:"/home/security/email",actionLabel:"设置绑定邮箱"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},l={args:{title:"绑定邮箱",description:"绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",status:"unverified",value:"user@example.com",actionHref:"/home/security/email",actionLabel:"验证邮箱"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},m={args:{title:"绑定邮箱",description:"绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",status:"verified",value:"user@example.com",actionHref:"/home/security/email",actionLabel:"修改"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},u={render:()=>e.jsxs("div",{className:"w-[700px] space-y-4",children:[e.jsx(i,{title:"登录密码",description:"安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。",status:"verified",actionHref:"/home/security/password",actionLabel:"修改"}),e.jsx(i,{title:"绑定手机",description:"绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",status:"unverified",value:"138****5678",actionHref:"/home/security/phone",actionLabel:"验证手机号"}),e.jsx(i,{title:"绑定邮箱",description:"绑定邮箱后，您即可使用邮箱登录账号或找回密码等。",status:"notSet",actionHref:"/home/security/email",actionLabel:"设置绑定邮箱"})]})},p={args:{title:"账号安全设置",description:"这是一个非常长的描述文本，用于测试组件在处理大量文本时的表现。安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。同时，请确保您的密码不易被猜测，避免使用生日、电话号码等个人信息作为密码。",status:"notSet",actionHref:"/home/security",actionLabel:"立即设置"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})},v={args:{title:"双因素认证",description:"启用双因素认证可以大大提高账号安全性。",status:"notSet",actionHref:"/home/security/2fa",actionLabel:"立即启用"},render:t=>e.jsx("div",{className:"w-[700px]",children:e.jsx(i,{...t})})};s.parameters={...s.parameters,docs:{...(f=s.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
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
}`,...(x=s.parameters)===null||x===void 0||(h=x.docs)===null||h===void 0?void 0:h.source},description:{story:`Default state of a security item that is not yet set up.
Shows an X icon and "未设置" status.`,...(S=s.parameters)===null||S===void 0||(y=S.docs)===null||y===void 0?void 0:y.description}}};a.parameters={...a.parameters,docs:{...(g=a.parameters)===null||g===void 0?void 0:g.docs,source:{originalSource:`{
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
}`,...(N=a.parameters)===null||N===void 0||(w=N.docs)===null||w===void 0?void 0:w.source},description:{story:`Password security item when already set and verified.
Shows a check icon and "已绑定" status without a value.`,...(L=a.parameters)===null||L===void 0||(b=L.docs)===null||b===void 0?void 0:b.description}}};o.parameters={...o.parameters,docs:{...(j=o.parameters)===null||j===void 0?void 0:j.docs,source:{originalSource:`{
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
}`,...(H=o.parameters)===null||H===void 0||(P=H.docs)===null||P===void 0?void 0:P.source},description:{story:`Phone number security item when not set.
Shows an X icon and "未设置" status.`,...(I=o.parameters)===null||I===void 0||(E=I.docs)===null||E===void 0?void 0:E.description}}};n.parameters={...n.parameters,docs:{...(C=n.parameters)===null||C===void 0?void 0:C.docs,source:{originalSource:`{
  args: {
    title: "绑定手机",
    description: "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    status: "unverified",
    value: "138****5678",
    actionHref: "/home/security/phone",
    actionLabel: "验证手机号"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...(k=n.parameters)===null||k===void 0||(V=k.docs)===null||V===void 0?void 0:V.source},description:{story:`Phone number security item when set but not verified.
Shows an alert icon and "已设置但未验证" status with masked phone number.`,...(D=n.parameters)===null||D===void 0||(U=D.docs)===null||U===void 0?void 0:U.description}}};d.parameters={...d.parameters,docs:{...(T=d.parameters)===null||T===void 0?void 0:T.docs,source:{originalSource:`{
  args: {
    title: "绑定手机",
    description: "绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。",
    status: "verified",
    value: "138****5678",
    actionHref: "/home/security/phone",
    actionLabel: "修改"
  },
  render: args => <div className="w-[700px]">
      <SecurityItem {...args} />
    </div>
}`,...(q=d.parameters)===null||q===void 0||(A=q.docs)===null||A===void 0?void 0:A.source},description:{story:`Phone number security item when verified.
Shows a check icon, "已绑定" status with masked phone number.`,...(X=d.parameters)===null||X===void 0||(z=X.docs)===null||z===void 0?void 0:z.description}}};c.parameters={...c.parameters,docs:{...($=c.parameters)===null||$===void 0?void 0:$.docs,source:{originalSource:`{
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
}`,...(O=c.parameters)===null||O===void 0||(B=O.docs)===null||B===void 0?void 0:B.source},description:{story:`Email security item when not set.
Shows an X icon and "未设置" status.`,...(M=c.parameters)===null||M===void 0||(R=M.docs)===null||R===void 0?void 0:R.description}}};l.parameters={...l.parameters,docs:{...(F=l.parameters)===null||F===void 0?void 0:F.docs,source:{originalSource:`{
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
}`,...(J=l.parameters)===null||J===void 0||(G=J.docs)===null||G===void 0?void 0:G.source},description:{story:`Email security item when set but not verified.
Shows an alert icon and "已设置但未验证" status with the email address.`,...(Q=l.parameters)===null||Q===void 0||(K=Q.docs)===null||K===void 0?void 0:K.description}}};m.parameters={...m.parameters,docs:{...(W=m.parameters)===null||W===void 0?void 0:W.docs,source:{originalSource:`{
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
}`,...(Z=m.parameters)===null||Z===void 0||(Y=Z.docs)===null||Y===void 0?void 0:Y.source},description:{story:`Email security item when verified.
Shows a check icon, "已绑定" status with the email address.`,...(te=m.parameters)===null||te===void 0||(ee=te.docs)===null||ee===void 0?void 0:ee.description}}};u.parameters={...u.parameters,docs:{...(ie=u.parameters)===null||ie===void 0?void 0:ie.docs,source:{originalSource:`{
  render: () => <div className="w-[700px] space-y-4">
      <SecurityItem title="登录密码" description="安全性高的密码以便账号更安全。建议定期更换密码，且设置一个包含数字和字母的密码，并且长度超过8位以上的密码。" status="verified" actionHref="/home/security/password" actionLabel="修改" />
      <SecurityItem title="绑定手机" description="绑定手机后，您即可享受手机号登录、动态码登录、找回密码等，为了账号安全，建议您在更换手机号后第一时间更换绑定手机。" status="unverified" value="138****5678" actionHref="/home/security/phone" actionLabel="验证手机号" />
      <SecurityItem title="绑定邮箱" description="绑定邮箱后，您即可使用邮箱登录账号或找回密码等。" status="notSet" actionHref="/home/security/email" actionLabel="设置绑定邮箱" />
    </div>
}`,...(se=u.parameters)===null||se===void 0||(re=se.docs)===null||re===void 0?void 0:re.source},description:{story:`Multiple security items stacked together.
Demonstrates how security items look when displayed in a list with different statuses.`,...(oe=u.parameters)===null||oe===void 0||(ae=oe.docs)===null||ae===void 0?void 0:ae.description}}};p.parameters={...p.parameters,docs:{...(ne=p.parameters)===null||ne===void 0?void 0:ne.docs,source:{originalSource:`{
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
}`,...(ce=p.parameters)===null||ce===void 0||(de=ce.docs)===null||de===void 0?void 0:de.source},description:{story:`Long description example.
Tests how the component handles longer descriptive text.`,...(me=p.parameters)===null||me===void 0||(le=me.docs)===null||le===void 0?void 0:le.description}}};v.parameters={...v.parameters,docs:{...(ue=v.parameters)===null||ue===void 0?void 0:ue.docs,source:{originalSource:`{
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
}`,...(ve=v.parameters)===null||ve===void 0||(pe=ve.docs)===null||pe===void 0?void 0:pe.source},description:{story:`Custom action labels.
Demonstrates different action button labels.`,...(fe=v.parameters)===null||fe===void 0||(_e=fe.docs)===null||_e===void 0?void 0:_e.description}}};const Be=["NotSet","PasswordVerified","PhoneNotSet","PhoneUnverified","PhoneVerified","EmailNotSet","EmailUnverified","EmailVerified","StackedItems","LongDescription","CustomActionLabel"];export{v as CustomActionLabel,c as EmailNotSet,l as EmailUnverified,m as EmailVerified,p as LongDescription,s as NotSet,a as PasswordVerified,o as PhoneNotSet,n as PhoneUnverified,d as PhoneVerified,u as StackedItems,Be as __namedExportsOrder,$e as default};
