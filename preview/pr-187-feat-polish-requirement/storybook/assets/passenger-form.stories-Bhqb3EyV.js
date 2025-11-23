import{r as S,j as e}from"./iframe-BH7aeb89.js";import{u as H,a as z,F as L,b as r,c as o,d as t,e as l,f as c}from"./form-D7fKTIBE.js";import{B as b}from"./button-reTbs1c1.js";import{C as P}from"./calendar-Bw_4-MMu.js";import{C as q}from"./checkbox-DQS5Alqe.js";import{I as m}from"./input-7ajN_wnk.js";import{P as T,a as B,b as O}from"./popover-CmtlyiLQ.js";import{R as D,a as C}from"./radio-group-DoadCmX_.js";import{S as G,a as W,b as K,c as U,d as w}from"./select-B5_-TVQB.js";import{S as I}from"./separator-IToQ99wX.js";import{c as _}from"./utils-CBfrqCZ4.js";import{o as Y,d as R,s as i,_ as M,u as J,b as Q,l as X}from"./schemas-dlpNQSCA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B6zyZfym.js";import"./label-CfPQCWIb.js";import"./index-rfJbia-g.js";import"./index-B4LoADOl.js";import"./index-CdJFUDDL.js";import"./chevron-left-yZqU4nOg.js";import"./createLucideIcon-C7RxPt7J.js";import"./chevron-right-BHxG0En1.js";import"./chevron-down-CRuEYTon.js";import"./index-B8FmrOkk.js";import"./index-BDEDCb8l.js";import"./index-DGQpXj_O.js";import"./index-BKTB3NxE.js";import"./index-MqkOuM2Y.js";import"./index-Be60dqzC.js";import"./check-FnDv8DZK.js";import"./index-BIGOGDbH.js";import"./index-Bj9YQplX.js";import"./Combination-DpWjHQoR.js";import"./index-D69ldn1F.js";import"./index-Cer7Ujd1.js";import"./index-DpVJ5wG4.js";import"./index-xejYHESO.js";import"./index-BdQq_4o_.js";import"./index-BYJinXp0.js";import"./chevron-up-CPwTsieJ.js";const Z=Y({name:i().min(1,"请输入姓名").max(100,"姓名不能超过100个字符"),setAsMyself:Q(),nationality:i().min(1,"请选择国籍"),gender:M(["male","female","other"],{message:"请选择性别"}),dateOfBirth:R({message:"请选择出生日期"}),placeOfBirth:i().optional(),phoneCountryCode:i(),phone:i().optional(),faxAreaCode:i().optional(),faxPhone:i().optional(),faxExtension:i().optional(),email:J([i().email({message:"请输入有效的邮箱地址"}),X("")]).optional(),documentType:M(["id_card","passport","other"],{message:"请选择证件类型"}),documentNumber:i().min(1,"请输入证件号码"),documentExpiryDate:R({message:"请选择证件有效期"}).optional()});function y({onSubmit:d,onCancel:x,isLoading:u=!1,initialData:s}){const[v,h]=S.useState(!1),[k,F]=S.useState(!1),[E]=S.useState("dropdown"),a=H({resolver:z(Z),defaultValues:{name:s?.name||"",setAsMyself:s?.setAsMyself??!1,nationality:s?.nationality||"中国大陆",gender:s?.gender||"other",dateOfBirth:s?.dateOfBirth||void 0,placeOfBirth:s?.placeOfBirth||"",phoneCountryCode:s?.phoneCountryCode||"+86",phone:s?.phone||"",faxAreaCode:s?.faxAreaCode||"",faxPhone:s?.faxPhone||"",faxExtension:s?.faxExtension||"",email:s?.email||"",documentType:s?.documentType||"id_card",documentNumber:s?.documentNumber||"",documentExpiryDate:s?.documentExpiryDate||void 0}}),A=n=>{d(n)};return e.jsx(L,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(A),className:"space-y-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold border-l-4 border-blue-600 pl-3",children:"旅客信息"}),e.jsx(I,{}),e.jsx(r,{control:a.control,name:"name",render:({field:n})=>e.jsxs(o,{children:[e.jsxs(t,{children:[e.jsx("span",{className:"text-red-500",children:"*"})," 姓名"]}),e.jsx(l,{children:e.jsx(m,{...n,placeholder:"请输入姓名（中文或英文）"})}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"可输入中文姓名或英文姓名"}),e.jsx(c,{})]})}),e.jsx(r,{control:a.control,name:"setAsMyself",render:({field:n})=>e.jsxs(o,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(l,{children:e.jsx(q,{checked:n.value,onCheckedChange:n.onChange})}),e.jsx(t,{className:"text-sm font-normal",children:"设置为本人"})]})}),e.jsx(r,{control:a.control,name:"nationality",render:({field:n})=>e.jsxs(o,{children:[e.jsxs(t,{children:["国籍 ",e.jsx("span",{className:"text-gray-500",children:"(国家/地区)"})]}),e.jsx(l,{children:e.jsx(m,{...n,placeholder:"中文/英文"})}),e.jsx(c,{})]})}),e.jsx(r,{control:a.control,name:"gender",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{children:"性别"}),e.jsx(l,{children:e.jsxs(D,{onValueChange:n.onChange,value:n.value,className:"flex gap-6",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(C,{value:"male",id:"male"}),e.jsx("label",{htmlFor:"male",className:"cursor-pointer",children:"男"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(C,{value:"female",id:"female"}),e.jsx("label",{htmlFor:"female",className:"cursor-pointer",children:"女"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(C,{value:"other",id:"other"}),e.jsx("label",{htmlFor:"other",className:"cursor-pointer",children:"未知"})]})]})}),e.jsx(c,{})]})}),e.jsx(r,{control:a.control,name:"dateOfBirth",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{children:"生日"}),e.jsxs(T,{open:v,onOpenChange:h,children:[e.jsx(B,{asChild:!0,children:e.jsx(l,{children:e.jsx(b,{variant:"outline",className:_("w-full justify-start text-left font-normal",!n.value&&"text-muted-foreground"),children:n.value?n.value.toISOString().split("T")[0]:"yyyy-MM-dd"})})}),e.jsx(O,{className:"w-auto p-0",align:"start",children:e.jsx(P,{mode:"single",defaultMonth:n.value,selected:n.value,onSelect:p=>{n.onChange(p),h(!1)},disabled:p=>p>new Date,captionLayout:E,className:"rounded-lg border shadow-sm"})})]}),e.jsx(c,{})]})}),e.jsx(r,{control:a.control,name:"placeOfBirth",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{children:"出生地"}),e.jsx(l,{children:e.jsx(m,{...n,placeholder:"请输入出生地"})}),e.jsx(c,{})]})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(r,{control:a.control,name:"phone",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{children:"手机号码"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"flex items-center justify-center w-16 px-3 border border-input rounded-md bg-muted text-sm",children:"+86"}),e.jsx(l,{children:e.jsx(m,{...n,type:"tel",placeholder:"请输入手机号",maxLength:11})})]}),e.jsx(c,{})]})}),e.jsx("div",{className:"flex items-end",children:e.jsx("span",{className:"text-sm text-gray-500",children:"或 非大陆手机"})})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[e.jsx(r,{control:a.control,name:"faxAreaCode",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{children:"传真号码"}),e.jsx(l,{children:e.jsx(m,{...n,placeholder:"区号"})}),e.jsx(c,{})]})}),e.jsx(r,{control:a.control,name:"faxPhone",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{className:"invisible",children:"Phone"}),e.jsx(l,{children:e.jsx(m,{...n,placeholder:"电话"})}),e.jsx(c,{})]})}),e.jsx(r,{control:a.control,name:"faxExtension",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{className:"invisible",children:"Extension"}),e.jsx(l,{children:e.jsx(m,{...n,placeholder:"分机"})}),e.jsx(c,{})]})})]}),e.jsx(r,{control:a.control,name:"email",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{children:"Email"}),e.jsx(l,{children:e.jsx(m,{...n,type:"email",placeholder:"请输入邮箱地址"})}),e.jsx(c,{})]})})]}),e.jsx(I,{}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold border-l-4 border-blue-600 pl-3",children:"证件信息"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsx(r,{control:a.control,name:"documentType",render:({field:n})=>e.jsxs(o,{children:[e.jsxs(t,{children:[e.jsx("span",{className:"text-red-500",children:"*"})," 证件类型"]}),e.jsxs(G,{onValueChange:n.onChange,defaultValue:n.value,children:[e.jsx(l,{children:e.jsx(W,{children:e.jsx(K,{placeholder:"请选择证件类型"})})}),e.jsxs(U,{children:[e.jsx(w,{value:"id_card",children:"身份证"}),e.jsx(w,{value:"passport",children:"护照"}),e.jsx(w,{value:"other",children:"其他"})]})]}),e.jsx(c,{})]})}),e.jsx(r,{control:a.control,name:"documentNumber",render:({field:n})=>e.jsxs(o,{children:[e.jsxs(t,{children:[e.jsx("span",{className:"text-red-500",children:"*"})," 证件号码"]}),e.jsx(l,{children:e.jsx(m,{...n,placeholder:"请输入证件号码"})}),e.jsx(c,{})]})}),e.jsx(r,{control:a.control,name:"documentExpiryDate",render:({field:n})=>e.jsxs(o,{children:[e.jsx(t,{children:"有效期"}),e.jsxs(T,{open:k,onOpenChange:F,children:[e.jsx(B,{asChild:!0,children:e.jsx(l,{children:e.jsx(b,{variant:"outline",className:_("w-full justify-start text-left font-normal",!n.value&&"text-muted-foreground"),children:n.value?n.value.toISOString().split("T")[0]:"yyyy-MM-dd"})})}),e.jsx(O,{className:"w-auto p-0",align:"start",children:e.jsx(P,{mode:"single",defaultMonth:n.value,selected:n.value,onSelect:p=>{n.onChange(p),F(!1),h(!1)},disabled:p=>p<new Date,captionLayout:E,className:"rounded-lg border shadow-sm"})})]}),e.jsx(c,{})]})})]}),e.jsx("div",{className:"text-sm text-blue-600 cursor-pointer hover:underline",children:"设为长期有效"})]}),e.jsxs("div",{className:"flex justify-center gap-4 pt-4",children:[e.jsx(b,{type:"submit",className:"bg-orange-500 hover:bg-orange-600 text-white px-8",disabled:u,children:u?"保存中...":"保存"}),e.jsx(b,{type:"button",variant:"outline",onClick:x,disabled:u,children:"取消"})]})]})})}y.__docgenInfo={description:"",methods:[],displayName:"PassengerForm",props:{onSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: PassengerFormData) => void",signature:{arguments:[{type:{name:"z.infer",elements:[{name:"passengerFormSchema"}],raw:"z.infer<typeof passengerFormSchema>"},name:"data"}],return:{name:"void"}}},description:""},onCancel:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},initialData:{required:!1,tsType:{name:"Partial",elements:[{name:"z.infer",elements:[{name:"passengerFormSchema"}],raw:"z.infer<typeof passengerFormSchema>"}],raw:"Partial<PassengerFormData>"},description:""}}};const{expect:V,userEvent:N,within:$}=__STORYBOOK_MODULE_TEST__,He={title:"Passengers/PassengerForm",component:y,parameters:{layout:"centered"},tags:["autodocs"]},j={render:()=>e.jsx("div",{className:"w-[700px] p-6",children:e.jsx(y,{onSubmit:d=>{console.log("Form submitted:",d)},onCancel:()=>{console.log("Form cancelled")}})})},g={render:()=>e.jsx("div",{className:"w-[700px] p-6",children:e.jsx(y,{onSubmit:d=>{console.log("Form submitted:",d)},onCancel:()=>{console.log("Form cancelled")},initialData:{name:"张三",nationality:"中国大陆",gender:"male",phoneCountryCode:"+86",phone:"13812345678",email:"zhangsan@example.com",documentType:"id_card",documentNumber:"110101199001011234"}})})},f={render:()=>e.jsx("div",{className:"w-[700px] p-6",children:e.jsx(y,{onSubmit:d=>{console.log("Form submitted:",d)},onCancel:()=>{console.log("Form cancelled")}})}),play:async({canvasElement:d})=>{const x=$(d),u=x.getByPlaceholderText("请输入姓名（中文或英文）");await N.type(u,"张三",{delay:50});const s=x.getByRole("radio",{name:"男"});await N.click(s);const v=x.getByPlaceholderText("请输入证件号码");await N.type(v,"110101199001011234",{delay:30}),await V(u).toHaveValue("张三"),await V(v).toHaveValue("110101199001011234");const h=x.getByRole("button",{name:/保存/i});await N.click(h)}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[700px] p-6">
      <PassengerForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} onCancel={() => {
      console.log("Form cancelled");
    }} />
    </div>
}`,...j.parameters?.docs?.source},description:{story:`Default passenger form
Shows the complete passenger information form with all fields
Including personal info, contact details, and document information`,...j.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[700px] p-6">
      <PassengerForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} onCancel={() => {
      console.log("Form cancelled");
    }} initialData={{
      name: "张三",
      nationality: "中国大陆",
      gender: "male",
      phoneCountryCode: "+86",
      phone: "13812345678",
      email: "zhangsan@example.com",
      documentType: "id_card",
      documentNumber: "110101199001011234"
    }} />
    </div>
}`,...g.parameters?.docs?.source},description:{story:`Form with initial data
Shows the form pre-filled with existing passenger information`,...g.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[700px] p-6">
      <PassengerForm onSubmit={data => {
      console.log("Form submitted:", data);
    }} onCancel={() => {
      console.log("Form cancelled");
    }} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // 1. Enter passenger name
    const nameInput = canvas.getByPlaceholderText("请输入姓名（中文或英文）");
    await userEvent.type(nameInput, "张三", {
      delay: 50
    });

    // 2. Select gender - find the radio button for male
    const maleRadio = canvas.getByRole("radio", {
      name: "男"
    });
    await userEvent.click(maleRadio);

    // 3. Enter document number
    const documentInput = canvas.getByPlaceholderText("请输入证件号码");
    await userEvent.type(documentInput, "110101199001011234", {
      delay: 30
    });

    // 4. Verify form has required fields filled
    await expect(nameInput).toHaveValue("张三");
    await expect(documentInput).toHaveValue("110101199001011234");

    // 5. Submit form
    const submitButton = canvas.getByRole("button", {
      name: /保存/i
    });
    await userEvent.click(submitButton);
  }
}`,...f.parameters?.docs?.source},description:{story:`Happy Path smoke test
Simulates a user successfully filling out the passenger form

Test steps:
1. Enter passenger name
2. Select gender
3. Select nationality
4. Enter document number
5. Submit form

Note: This is a basic smoke test for visual verification.
Detailed validation logic, error states, and edge cases
should be tested using RTL`,...f.parameters?.docs?.description}}};const ze=["Default","WithInitialData","HappyPath"];export{j as Default,f as HappyPath,g as WithInitialData,ze as __namedExportsOrder,He as default};
