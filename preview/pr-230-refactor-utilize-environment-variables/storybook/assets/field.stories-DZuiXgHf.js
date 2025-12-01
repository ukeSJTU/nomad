import{j as e,r as E}from"./iframe-BogQ13Ve.js";import{C as k}from"./checkbox-DxE5F3_w.js";import{c as z}from"./index-CdJFUDDL.js";import{L as W}from"./label-7Pmo0ST2.js";import{S as T}from"./separator-KBiWC50j.js";import{c as s}from"./utils-CBfrqCZ4.js";import{I as t}from"./input-Bkup1sx3.js";import{R as V,a as y}from"./radio-group-DUD_fs7f.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dv-AbGKv.js";import"./index-BsxkBFj4.js";import"./index-Dc7dzZ7U.js";import"./index-DB-s3HVI.js";import"./index-Ch_laI72.js";import"./index-f__aaaqu.js";import"./index-BtL_tHLt.js";import"./check-DI1Wsmp_.js";import"./createLucideIcon-DzttSXHX.js";import"./index-fqT98viQ.js";import"./index-D6jzdOSh.js";import"./index-C3O2lyO2.js";import"./index-Jnx7C39x.js";function N({className:a,...i}){return e.jsx("fieldset",{"data-slot":"field-set",className:s("flex flex-col gap-6","has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",a),...i})}function L({className:a,variant:i="legend",...o}){return e.jsx("legend",{"data-slot":"field-legend","data-variant":i,className:s("mb-3 font-medium","data-[variant=legend]:text-base","data-[variant=label]:text-sm",a),...o})}function w({className:a,...i}){return e.jsx("div",{"data-slot":"field-group",className:s("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",a),...i})}const q=z("group/field flex w-full gap-3 data-[invalid=true]:text-destructive",{variants:{orientation:{vertical:["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],horizontal:["flex-row items-center","[&>[data-slot=field-label]]:flex-auto","has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"],responsive:["flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto","@md/field-group:[&>[data-slot=field-label]]:flex-auto","@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"]}},defaultVariants:{orientation:"vertical"}});function l({className:a,orientation:i="vertical",...o}){return e.jsx("div",{role:"group","data-slot":"field","data-orientation":i,className:s(q({orientation:i}),a),...o})}function n({className:a,...i}){return e.jsx("div",{"data-slot":"field-content",className:s("group/field-content flex flex-1 flex-col gap-1.5 leading-snug",a),...i})}function r({className:a,...i}){return e.jsx(W,{"data-slot":"field-label",className:s("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50","has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4","has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",a),...i})}function D({className:a,...i}){return e.jsx("div",{"data-slot":"field-label",className:s("flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",a),...i})}function d({className:a,...i}){return e.jsx("p",{"data-slot":"field-description",className:s("text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance","last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5","[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",a),...i})}function _({children:a,className:i,...o}){return e.jsxs("div",{"data-slot":"field-separator","data-content":!!a,className:s("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",i),...o,children:[e.jsx(T,{className:"absolute inset-0 top-1/2"}),a&&e.jsx("span",{className:"bg-background text-muted-foreground relative mx-auto block w-fit px-2","data-slot":"field-separator-content",children:a})]})}function C({className:a,children:i,errors:o,...G}){const I=E.useMemo(()=>i||(o?o?.length===1&&o[0]?.message?o[0].message:e.jsx("ul",{className:"ml-4 flex list-disc flex-col gap-1",children:o.map((S,R)=>S?.message&&e.jsx("li",{children:S.message},R))}):null),[i,o]);return I?e.jsx("div",{role:"alert","data-slot":"field-error",className:s("text-destructive text-sm font-normal",a),...G,children:I}):null}l.__docgenInfo={description:"",methods:[],displayName:"Field",props:{orientation:{defaultValue:{value:'"vertical"',computed:!1},required:!1}}};n.__docgenInfo={description:"",methods:[],displayName:"FieldContent"};d.__docgenInfo={description:"",methods:[],displayName:"FieldDescription"};C.__docgenInfo={description:"",methods:[],displayName:"FieldError",props:{errors:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"{ message?: string } | undefined",elements:[{name:"signature",type:"object",raw:"{ message?: string }",signature:{properties:[{key:"message",value:{name:"string",required:!1}}]}},{name:"undefined"}]}],raw:"Array<{ message?: string } | undefined>"},description:""}}};w.__docgenInfo={description:"",methods:[],displayName:"FieldGroup"};r.__docgenInfo={description:"",methods:[],displayName:"FieldLabel"};L.__docgenInfo={description:"",methods:[],displayName:"FieldLegend",props:{variant:{required:!1,tsType:{name:"union",raw:'"legend" | "label"',elements:[{name:"literal",value:'"legend"'},{name:"literal",value:'"label"'}]},description:"",defaultValue:{value:'"legend"',computed:!1}}}};_.__docgenInfo={description:"",methods:[],displayName:"FieldSeparator",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};N.__docgenInfo={description:"",methods:[],displayName:"FieldSet"};D.__docgenInfo={description:"",methods:[],displayName:"FieldTitle"};const de={title:"Forms/Field",component:l,parameters:{layout:"centered"},tags:["autodocs"]},c={render:()=>e.jsxs(l,{orientation:"vertical",className:"w-[400px]",children:[e.jsx(r,{htmlFor:"name",children:"姓名"}),e.jsxs(n,{children:[e.jsx(t,{id:"name",placeholder:"请输入姓名"}),e.jsx(d,{children:"请输入您的真实姓名"})]})]})},p={render:()=>e.jsxs(l,{orientation:"horizontal",className:"w-[600px]",children:[e.jsx(r,{htmlFor:"email",children:"邮箱地址"}),e.jsxs(n,{children:[e.jsx(t,{id:"email",type:"email",placeholder:"请输入邮箱"}),e.jsx(d,{children:"我们会向此邮箱发送验证码"})]})]})},m={render:()=>e.jsx(w,{children:e.jsxs(l,{orientation:"responsive",className:"w-[600px]",children:[e.jsx(r,{htmlFor:"username",children:"用户名"}),e.jsxs(n,{children:[e.jsx(t,{id:"username",placeholder:"请输入用户名"}),e.jsx(d,{children:"用户名将用于登录，只能包含字母、数字和下划线"})]})]})})},u={render:()=>e.jsxs(l,{orientation:"vertical",className:"w-[400px]","data-invalid":!0,children:[e.jsx(r,{htmlFor:"password",children:"密码"}),e.jsxs(n,{children:[e.jsx(t,{id:"password",type:"password",placeholder:"请输入密码","aria-invalid":!0}),e.jsx(C,{children:"密码至少需要 8 个字符"})]})]})},h={render:()=>e.jsxs(l,{orientation:"vertical",className:"w-[400px]","data-invalid":!0,children:[e.jsx(r,{htmlFor:"password2",children:"密码"}),e.jsxs(n,{children:[e.jsx(t,{id:"password2",type:"password",placeholder:"请输入密码","aria-invalid":!0}),e.jsx(C,{errors:[{message:"密码至少需要 8 个字符"},{message:"密码必须包含至少一个大写字母"},{message:"密码必须包含至少一个数字"}]})]})]})},F={render:()=>e.jsxs(w,{className:"w-[500px]",children:[e.jsxs(l,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"first-name",children:"名"}),e.jsx(t,{id:"first-name",placeholder:"请输入名"})]}),e.jsxs(l,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"last-name",children:"姓"}),e.jsx(t,{id:"last-name",placeholder:"请输入姓"})]}),e.jsxs(l,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"email-group",children:"邮箱"}),e.jsxs(n,{children:[e.jsx(t,{id:"email-group",type:"email",placeholder:"请输入邮箱"}),e.jsx(d,{children:"我们不会分享您的邮箱地址"})]})]})]})},x={render:()=>e.jsxs(N,{className:"w-[500px]",children:[e.jsx(L,{children:"个人信息"}),e.jsxs(l,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"fullname",children:"全名"}),e.jsx(t,{id:"fullname",placeholder:"请输入全名"})]}),e.jsxs(l,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"phone",children:"电话"}),e.jsx(t,{id:"phone",type:"tel",placeholder:"请输入电话号码"})]})]})},f={render:()=>e.jsxs(w,{className:"w-[500px]",children:[e.jsxs(l,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"account-name",children:"账户名称"}),e.jsx(t,{id:"account-name",placeholder:"请输入账户名称"})]}),e.jsx(_,{children:"账户设置"}),e.jsxs(l,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"account-email",children:"账户邮箱"}),e.jsx(t,{id:"account-email",type:"email",placeholder:"请输入邮箱"})]}),e.jsxs(l,{orientation:"vertical",children:[e.jsx(r,{htmlFor:"account-phone",children:"账户电话"}),e.jsx(t,{id:"account-phone",type:"tel",placeholder:"请输入电话"})]})]})},g={render:()=>e.jsxs(l,{orientation:"horizontal",className:"w-[500px]",children:[e.jsx(k,{id:"terms"}),e.jsxs(n,{children:[e.jsx(r,{htmlFor:"terms",children:"同意条款和条件"}),e.jsx(d,{children:"您必须同意我们的条款和条件才能继续"})]})]})},j={render:()=>e.jsxs(N,{className:"w-[500px]",children:[e.jsx(L,{variant:"label",children:"选择通知方式"}),e.jsx(d,{children:"选择您希望接收通知的方式"}),e.jsxs(V,{defaultValue:"email",children:[e.jsxs(l,{orientation:"horizontal",children:[e.jsx(y,{value:"email",id:"notify-email"}),e.jsxs(n,{children:[e.jsx(r,{htmlFor:"notify-email",children:"邮箱"}),e.jsx(d,{children:"通过邮箱接收通知"})]})]}),e.jsxs(l,{orientation:"horizontal",children:[e.jsx(y,{value:"sms",id:"notify-sms"}),e.jsxs(n,{children:[e.jsx(r,{htmlFor:"notify-sms",children:"短信"}),e.jsx(d,{children:"通过短信接收通知"})]})]}),e.jsxs(l,{orientation:"horizontal",children:[e.jsx(y,{value:"push",id:"notify-push"}),e.jsxs(n,{children:[e.jsx(r,{htmlFor:"notify-push",children:"推送通知"}),e.jsx(d,{children:"通过应用推送接收通知"})]})]})]})]})},b={render:()=>e.jsxs(l,{orientation:"vertical",className:"w-[400px]",children:[e.jsx(D,{children:"账户设置"}),e.jsxs(n,{children:[e.jsx(t,{placeholder:"请输入设置值"}),e.jsx(d,{children:"配置您的账户设置"})]})]})},v={render:()=>e.jsxs(l,{orientation:"vertical",className:"w-[400px]","data-disabled":!0,children:[e.jsx(r,{htmlFor:"disabled-input",children:"禁用字段"}),e.jsxs(n,{children:[e.jsx(t,{id:"disabled-input",placeholder:"此字段已禁用",disabled:!0}),e.jsx(d,{children:"此字段当前不可编辑"})]})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]">
      <FieldLabel htmlFor="name">姓名</FieldLabel>
      <FieldContent>
        <Input id="name" placeholder="请输入姓名" />
        <FieldDescription>请输入您的真实姓名</FieldDescription>
      </FieldContent>
    </Field>
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Field orientation="horizontal" className="w-[600px]">
      <FieldLabel htmlFor="email">邮箱地址</FieldLabel>
      <FieldContent>
        <Input id="email" type="email" placeholder="请输入邮箱" />
        <FieldDescription>我们会向此邮箱发送验证码</FieldDescription>
      </FieldContent>
    </Field>
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]" data-invalid={true}>
      <FieldLabel htmlFor="password">密码</FieldLabel>
      <FieldContent>
        <Input id="password" type="password" placeholder="请输入密码" aria-invalid={true} />
        <FieldError>密码至少需要 8 个字符</FieldError>
      </FieldContent>
    </Field>
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Field orientation="horizontal" className="w-[500px]">
      <Checkbox id="terms" />
      <FieldContent>
        <FieldLabel htmlFor="terms">同意条款和条件</FieldLabel>
        <FieldDescription>您必须同意我们的条款和条件才能继续</FieldDescription>
      </FieldContent>
    </Field>
}`,...g.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]">
      <FieldTitle>账户设置</FieldTitle>
      <FieldContent>
        <Input placeholder="请输入设置值" />
        <FieldDescription>配置您的账户设置</FieldDescription>
      </FieldContent>
    </Field>
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Field orientation="vertical" className="w-[400px]" data-disabled={true}>
      <FieldLabel htmlFor="disabled-input">禁用字段</FieldLabel>
      <FieldContent>
        <Input id="disabled-input" placeholder="此字段已禁用" disabled />
        <FieldDescription>此字段当前不可编辑</FieldDescription>
      </FieldContent>
    </Field>
}`,...v.parameters?.docs?.source}}};const se=["VerticalField","HorizontalField","ResponsiveField","WithError","WithMultipleErrors","FieldGroupExample","FieldSetExample","WithSeparator","WithCheckbox","WithRadioGroup","WithFieldTitle","DisabledField"];export{v as DisabledField,F as FieldGroupExample,x as FieldSetExample,p as HorizontalField,m as ResponsiveField,c as VerticalField,g as WithCheckbox,u as WithError,b as WithFieldTitle,h as WithMultipleErrors,j as WithRadioGroup,f as WithSeparator,se as __namedExportsOrder,de as default};
