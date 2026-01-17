import{j as e,r as xe}from"./iframe-DnZgF7bs.js";import{C as ve}from"./checkbox-D9T5QvhB.js";import{c as fe}from"./index-B_jtOnfb.js";import{c as s}from"./utils-CDN07tui.js";import{L as ge}from"./label-CAfTcdZI.js";import{S as je}from"./separator-D8Voa9zw.js";import{I as t}from"./input-XBIfvFIm.js";import{R as _e,a as N}from"./radio-group-CHRMqiBo.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BMzLOmL9.js";import"./index-B_BILNUQ.js";import"./index-NJl_V9ss.js";import"./index-ZqBm70yH.js";import"./index-C3jNw1QV.js";import"./index-BGSdDYm-.js";import"./check-BTn7Ky3Q.js";import"./createLucideIcon-DqjoOZ7r.js";import"./index-Be03snLn.js";import"./index-I0skBQuf.js";import"./index-BWqXFG3c.js";import"./index-Bch9dQDS.js";import"./index-DAJj0hCA.js";function de({className:l,...i}){return e.jsx("fieldset",{"data-slot":"field-set",className:s("flex flex-col gap-6","has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",l),...i})}function se({className:l,variant:i="legend",...n}){return e.jsx("legend",{"data-slot":"field-legend","data-variant":i,className:s("mb-3 font-medium","data-[variant=legend]:text-base","data-[variant=label]:text-sm",l),...n})}function w({className:l,...i}){return e.jsx("div",{"data-slot":"field-group",className:s("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",l),...i})}const be=fe("group/field flex w-full gap-3 data-[invalid=true]:text-destructive",{variants:{orientation:{vertical:["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],horizontal:["flex-row items-center","[&>[data-slot=field-label]]:flex-auto","has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"],responsive:["flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto","@md/field-group:[&>[data-slot=field-label]]:flex-auto","@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"]}},defaultVariants:{orientation:"vertical"}});function a({className:l,orientation:i="vertical",...n}){return e.jsx("div",{role:"group","data-slot":"field","data-orientation":i,className:s(be({orientation:i}),l),...n})}function o({className:l,...i}){return e.jsx("div",{"data-slot":"field-content",className:s("group/field-content flex flex-1 flex-col gap-1.5 leading-snug",l),...i})}function r({className:l,...i}){return e.jsx(ge,{"data-slot":"field-label",className:s("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50","has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4","has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",l),...i})}function me({className:l,...i}){return e.jsx("div",{"data-slot":"field-label",className:s("flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",l),...i})}function d({className:l,...i}){return e.jsx("p",{"data-slot":"field-description",className:s("text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance","last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5","[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",l),...i})}function ue({children:l,className:i,...n}){return e.jsxs("div",{"data-slot":"field-separator","data-content":!!l,className:s("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",i),...n,children:[e.jsx(je,{className:"absolute inset-0 top-1/2"}),l&&e.jsx("span",{className:"bg-background text-muted-foreground relative mx-auto block w-fit px-2","data-slot":"field-separator-content",children:l})]})}function ce({className:l,children:i,errors:n,...he}){const pe=xe.useMemo(()=>{var y;return i||(n?n?.length===1&&(!((y=n[0])===null||y===void 0)&&y.message)?n[0].message:e.jsx("ul",{className:"ml-4 flex list-disc flex-col gap-1",children:n.map((c,Fe)=>c?.message&&e.jsx("li",{children:c.message},Fe))}):null)},[i,n]);return pe?e.jsx("div",{role:"alert","data-slot":"field-error",className:s("text-destructive text-sm font-normal",l),...he,children:pe}):null}a.__docgenInfo={description:"",methods:[],displayName:"Field",props:{orientation:{defaultValue:{value:'"vertical"',computed:!1},required:!1}}};o.__docgenInfo={description:"",methods:[],displayName:"FieldContent"};d.__docgenInfo={description:"",methods:[],displayName:"FieldDescription"};ce.__docgenInfo={description:"",methods:[],displayName:"FieldError",props:{errors:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"{ message?: string } | undefined",elements:[{name:"signature",type:"object",raw:"{ message?: string }",signature:{properties:[{key:"message",value:{name:"string",required:!1}}]}},{name:"undefined"}]}],raw:"Array<{ message?: string } | undefined>"},description:""}}};w.__docgenInfo={description:"",methods:[],displayName:"FieldGroup"};r.__docgenInfo={description:"",methods:[],displayName:"FieldLabel"};se.__docgenInfo={description:"",methods:[],displayName:"FieldLegend",props:{variant:{required:!1,tsType:{name:"union",raw:'"legend" | "label"',elements:[{name:"literal",value:'"legend"'},{name:"literal",value:'"label"'}]},description:"",defaultValue:{value:'"legend"',computed:!1}}}};ue.__docgenInfo={description:"",methods:[],displayName:"FieldSeparator",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};de.__docgenInfo={description:"",methods:[],displayName:"FieldSet"};me.__docgenInfo={description:"",methods:[],displayName:"FieldTitle"};var L,C,S,I,W,D,E,G,R,k,z,T,V,M,q,H,A,O,B,J,K,P,Q,U,X,Y,Z,$,ee,ie,le,ae,re,te,ne,oe;const Je={title:"Forms/Field",component:a,parameters:{layout:"centered"},tags:["autodocs"]},p={render:()=>e.jsxs(a,{orientation:"vertical",className:"w-[400px]",children:[e.jsx(r,{htmlFor:"name",children:"姓名"}),e.jsxs(o,{children:[e.jsx(t,{id:"name",placeholder:"请输入姓名"}),e.jsx(d,{children:"请输入您的真实姓名"})]})]})},m={render:()=>e.jsxs(a,{orientation:"horizontal",className:"w-[600px]",children:[e.jsx(r,{htmlFor:"email",children:"邮箱地址"}),e.jsxs(o,{children:[e.jsx(t,{id:"email",type:"email",placeholder:"请输入邮箱"}),e.jsx(d,{children:"我们会向此邮箱发送验证码"})]})]})},u={render:()=>e.jsx(w,{children:e.jsxs(a,{orientation:"responsive",className:"w-[600px]",children:[e.jsx(r,{htmlFor:"username",children:"用户名"}),e.jsxs(o,{children:[e.jsx(t,{id:"username",placeholder:"请输入用户名"}),e.jsx(d,{children:"用户名将用于登录，只能包含字母、数字和下划线"})]})]})})},h={render:()=>e.jsxs(a,{orientation:"vertical",className:"w-[400px]","data-invalid":!0,children:[e.jsx(r,{htmlFor:"password",children:"密码"}),e.jsxs(o,{children:[e.jsx(t,{id:"password",type:"password",placeholder:"请输入密码","aria-invalid":!0}),e.jsx(ce,{children:"密码至少需要 8 个字符"})]})]})},F={render:()=>e.jsxs(a,{orientation:"vertical",className:"w-[400px]","data-invalid":!0,children:[e.jsx(r,{htmlFor:"password2",children:"密码"}),e.jsxs(o,{children:[e.jsx(t,{id:"password2",type:"password",placeholder:"请输入密码","aria-invalid":!0}),e.jsx(ce,{errors:[{message:"密码至少需要 8 个字符"},{message:"密码必须包含至少一个大写字母"},{message:"密码必须包含至少一个数字"}]})]})]})},x={render:()=>e.jsxs(w,{className:"w-[500px]",children:[e.jsxs(a,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"first-name",children:"名"}),e.jsx(t,{id:"first-name",placeholder:"请输入名"})]}),e.jsxs(a,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"last-name",children:"姓"}),e.jsx(t,{id:"last-name",placeholder:"请输入姓"})]}),e.jsxs(a,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"email-group",children:"邮箱"}),e.jsxs(o,{children:[e.jsx(t,{id:"email-group",type:"email",placeholder:"请输入邮箱"}),e.jsx(d,{children:"我们不会分享您的邮箱地址"})]})]})]})},v={render:()=>e.jsxs(de,{className:"w-[500px]",children:[e.jsx(se,{children:"个人信息"}),e.jsxs(a,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"fullname",children:"全名"}),e.jsx(t,{id:"fullname",placeholder:"请输入全名"})]}),e.jsxs(a,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"phone",children:"电话"}),e.jsx(t,{id:"phone",type:"tel",placeholder:"请输入电话号码"})]})]})},f={render:()=>e.jsxs(w,{className:"w-[500px]",children:[e.jsxs(a,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"account-name",children:"账户名称"}),e.jsx(t,{id:"account-name",placeholder:"请输入账户名称"})]}),e.jsx(ue,{children:"账户设置"}),e.jsxs(a,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"account-email",children:"账户邮箱"}),e.jsx(t,{id:"account-email",type:"email",placeholder:"请输入邮箱"})]}),e.jsxs(a,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"account-phone",children:"账户电话"}),e.jsx(t,{id:"account-phone",type:"tel",placeholder:"请输入电话"})]})]})},g={render:()=>e.jsxs(a,{orientation:"horizontal",className:"w-[500px]",children:[e.jsx(ve,{id:"terms"}),e.jsxs(o,{children:[e.jsx(r,{htmlFor:"terms",children:"同意条款和条件"}),e.jsx(d,{children:"您必须同意我们的条款和条件才能继续"})]})]})},j={render:()=>e.jsxs(de,{className:"w-[500px]",children:[e.jsx(se,{variant:"label",children:"选择通知方式"}),e.jsx(d,{children:"选择您希望接收通知的方式"}),e.jsxs(_e,{defaultValue:"email",children:[e.jsxs(a,{orientation:"horizontal",children:[e.jsx(N,{value:"email",id:"notify-email"}),e.jsxs(o,{children:[e.jsx(r,{htmlFor:"notify-email",children:"邮箱"}),e.jsx(d,{children:"通过邮箱接收通知"})]})]}),e.jsxs(a,{orientation:"horizontal",children:[e.jsx(N,{value:"sms",id:"notify-sms"}),e.jsxs(o,{children:[e.jsx(r,{htmlFor:"notify-sms",children:"短信"}),e.jsx(d,{children:"通过短信接收通知"})]})]}),e.jsxs(a,{orientation:"horizontal",children:[e.jsx(N,{value:"push",id:"notify-push"}),e.jsxs(o,{children:[e.jsx(r,{htmlFor:"notify-push",children:"推送通知"}),e.jsx(d,{children:"通过应用推送接收通知"})]})]})]})]})},_={render:()=>e.jsxs(a,{orientation:"vertical",className:"w-[400px]",children:[e.jsx(me,{children:"账户设置"}),e.jsxs(o,{children:[e.jsx(t,{placeholder:"请输入设置值"}),e.jsx(d,{children:"配置您的账户设置"})]})]})},b={render:()=>e.jsxs(a,{orientation:"vertical",className:"w-[400px]","data-disabled":!0,children:[e.jsx(r,{htmlFor:"disabled-input",children:"禁用字段"}),e.jsxs(o,{children:[e.jsx(t,{id:"disabled-input",placeholder:"此字段已禁用",disabled:!0}),e.jsx(d,{children:"此字段当前不可编辑"})]})]})};p.parameters={...p.parameters,docs:{...(L=p.parameters)===null||L===void 0?void 0:L.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]">
      <FieldLabel htmlFor="name">姓名</FieldLabel>
      <FieldContent>
        <Input id="name" placeholder="请输入姓名" />
        <FieldDescription>请输入您的真实姓名</FieldDescription>
      </FieldContent>
    </Field>
}`,...(S=p.parameters)===null||S===void 0||(C=S.docs)===null||C===void 0?void 0:C.source}}};m.parameters={...m.parameters,docs:{...(I=m.parameters)===null||I===void 0?void 0:I.docs,source:{originalSource:`{
  render: () => <Field orientation="horizontal" className="w-[600px]">
      <FieldLabel htmlFor="email">邮箱地址</FieldLabel>
      <FieldContent>
        <Input id="email" type="email" placeholder="请输入邮箱" />
        <FieldDescription>我们会向此邮箱发送验证码</FieldDescription>
      </FieldContent>
    </Field>
}`,...(D=m.parameters)===null||D===void 0||(W=D.docs)===null||W===void 0?void 0:W.source}}};u.parameters={...u.parameters,docs:{...(E=u.parameters)===null||E===void 0?void 0:E.docs,source:{originalSource:`{
  render: () => <FieldGroup>
      <Field orientation="responsive" className="w-[600px]">
        <FieldLabel htmlFor="username">用户名</FieldLabel>
        <FieldContent>
          <Input id="username" placeholder="请输入用户名" />
          <FieldDescription>
            用户名将用于登录，只能包含字母、数字和下划线
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
}`,...(R=u.parameters)===null||R===void 0||(G=R.docs)===null||G===void 0?void 0:G.source}}};h.parameters={...h.parameters,docs:{...(k=h.parameters)===null||k===void 0?void 0:k.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]" data-invalid={true}>
      <FieldLabel htmlFor="password">密码</FieldLabel>
      <FieldContent>
        <Input id="password" type="password" placeholder="请输入密码" aria-invalid={true} />
        <FieldError>密码至少需要 8 个字符</FieldError>
      </FieldContent>
    </Field>
}`,...(T=h.parameters)===null||T===void 0||(z=T.docs)===null||z===void 0?void 0:z.source}}};F.parameters={...F.parameters,docs:{...(V=F.parameters)===null||V===void 0?void 0:V.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]" data-invalid={true}>
      <FieldLabel htmlFor="password2">密码</FieldLabel>
      <FieldContent>
        <Input id="password2" type="password" placeholder="请输入密码" aria-invalid={true} />
        <FieldError errors={[{
        message: "密码至少需要 8 个字符"
      }, {
        message: "密码必须包含至少一个大写字母"
      }, {
        message: "密码必须包含至少一个数字"
      }]} />
      </FieldContent>
    </Field>
}`,...(q=F.parameters)===null||q===void 0||(M=q.docs)===null||M===void 0?void 0:M.source}}};x.parameters={...x.parameters,docs:{...(H=x.parameters)===null||H===void 0?void 0:H.docs,source:{originalSource:`{
  render: () => <FieldGroup className="w-[500px]">
      <Field orientation="vertical">
        <FieldLabel htmlFor="first-name">名</FieldLabel>
        <Input id="first-name" placeholder="请输入名" />
      </Field>

      <Field orientation="vertical">
        <FieldLabel htmlFor="last-name">姓</FieldLabel>
        <Input id="last-name" placeholder="请输入姓" />
      </Field>

      <Field orientation="vertical">
        <FieldLabel htmlFor="email-group">邮箱</FieldLabel>
        <FieldContent>
          <Input id="email-group" type="email" placeholder="请输入邮箱" />
          <FieldDescription>我们不会分享您的邮箱地址</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
}`,...(O=x.parameters)===null||O===void 0||(A=O.docs)===null||A===void 0?void 0:A.source}}};v.parameters={...v.parameters,docs:{...(B=v.parameters)===null||B===void 0?void 0:B.docs,source:{originalSource:`{
  render: () => <FieldSet className="w-[500px]">
      <FieldLegend>个人信息</FieldLegend>

      <Field orientation="vertical">
        <FieldLabel htmlFor="fullname">全名</FieldLabel>
        <Input id="fullname" placeholder="请输入全名" />
      </Field>

      <Field orientation="vertical">
        <FieldLabel htmlFor="phone">电话</FieldLabel>
        <Input id="phone" type="tel" placeholder="请输入电话号码" />
      </Field>
    </FieldSet>
}`,...(K=v.parameters)===null||K===void 0||(J=K.docs)===null||J===void 0?void 0:J.source}}};f.parameters={...f.parameters,docs:{...(P=f.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
  render: () => <FieldGroup className="w-[500px]">
      <Field orientation="vertical">
        <FieldLabel htmlFor="account-name">账户名称</FieldLabel>
        <Input id="account-name" placeholder="请输入账户名称" />
      </Field>

      <FieldSeparator>账户设置</FieldSeparator>

      <Field orientation="vertical">
        <FieldLabel htmlFor="account-email">账户邮箱</FieldLabel>
        <Input id="account-email" type="email" placeholder="请输入邮箱" />
      </Field>

      <Field orientation="vertical">
        <FieldLabel htmlFor="account-phone">账户电话</FieldLabel>
        <Input id="account-phone" type="tel" placeholder="请输入电话" />
      </Field>
    </FieldGroup>
}`,...(U=f.parameters)===null||U===void 0||(Q=U.docs)===null||Q===void 0?void 0:Q.source}}};g.parameters={...g.parameters,docs:{...(X=g.parameters)===null||X===void 0?void 0:X.docs,source:{originalSource:`{
  render: () => <Field orientation="horizontal" className="w-[500px]">
      <Checkbox id="terms" />
      <FieldContent>
        <FieldLabel htmlFor="terms">同意条款和条件</FieldLabel>
        <FieldDescription>您必须同意我们的条款和条件才能继续</FieldDescription>
      </FieldContent>
    </Field>
}`,...(Z=g.parameters)===null||Z===void 0||(Y=Z.docs)===null||Y===void 0?void 0:Y.source}}};j.parameters={...j.parameters,docs:{...($=j.parameters)===null||$===void 0?void 0:$.docs,source:{originalSource:`{
  render: () => <FieldSet className="w-[500px]">
      <FieldLegend variant="label">选择通知方式</FieldLegend>
      <FieldDescription>选择您希望接收通知的方式</FieldDescription>

      <RadioGroup defaultValue="email">
        <Field orientation="horizontal">
          <RadioGroupItem value="email" id="notify-email" />
          <FieldContent>
            <FieldLabel htmlFor="notify-email">邮箱</FieldLabel>
            <FieldDescription>通过邮箱接收通知</FieldDescription>
          </FieldContent>
        </Field>

        <Field orientation="horizontal">
          <RadioGroupItem value="sms" id="notify-sms" />
          <FieldContent>
            <FieldLabel htmlFor="notify-sms">短信</FieldLabel>
            <FieldDescription>通过短信接收通知</FieldDescription>
          </FieldContent>
        </Field>

        <Field orientation="horizontal">
          <RadioGroupItem value="push" id="notify-push" />
          <FieldContent>
            <FieldLabel htmlFor="notify-push">推送通知</FieldLabel>
            <FieldDescription>通过应用推送接收通知</FieldDescription>
          </FieldContent>
        </Field>
      </RadioGroup>
    </FieldSet>
}`,...(ie=j.parameters)===null||ie===void 0||(ee=ie.docs)===null||ee===void 0?void 0:ee.source}}};_.parameters={..._.parameters,docs:{...(le=_.parameters)===null||le===void 0?void 0:le.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]">
      <FieldTitle>账户设置</FieldTitle>
      <FieldContent>
        <Input placeholder="请输入设置值" />
        <FieldDescription>配置您的账户设置</FieldDescription>
      </FieldContent>
    </Field>
}`,...(re=_.parameters)===null||re===void 0||(ae=re.docs)===null||ae===void 0?void 0:ae.source}}};b.parameters={...b.parameters,docs:{...(te=b.parameters)===null||te===void 0?void 0:te.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]" data-disabled={true}>
      <FieldLabel htmlFor="disabled-input">禁用字段</FieldLabel>
      <FieldContent>
        <Input id="disabled-input" placeholder="此字段已禁用" disabled />
        <FieldDescription>此字段当前不可编辑</FieldDescription>
      </FieldContent>
    </Field>
}`,...(oe=b.parameters)===null||oe===void 0||(ne=oe.docs)===null||ne===void 0?void 0:ne.source}}};const Ke=["VerticalField","HorizontalField","ResponsiveField","WithError","WithMultipleErrors","FieldGroupExample","FieldSetExample","WithSeparator","WithCheckbox","WithRadioGroup","WithFieldTitle","DisabledField"];export{b as DisabledField,x as FieldGroupExample,v as FieldSetExample,m as HorizontalField,u as ResponsiveField,p as VerticalField,g as WithCheckbox,h as WithError,_ as WithFieldTitle,F as WithMultipleErrors,j as WithRadioGroup,f as WithSeparator,Ke as __namedExportsOrder,Je as default};
