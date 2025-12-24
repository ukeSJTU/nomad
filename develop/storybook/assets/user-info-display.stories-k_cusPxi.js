import{j as e}from"./iframe-2k9161tj.js";import{B as l}from"./button-cP9VPCCL.js";import{S as p}from"./separator-BM1yZhtb.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D-JkSUZA.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./index-R8C-BYxc.js";import"./index-DR82RdiX.js";const u={male:"男",female:"女",other:"其他"};function s({userData:r,onEdit:m}){return e.jsxs("div",{className:"space-y-6 bg-white p-6 rounded-lg border",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900",children:"个人信息"}),e.jsx(l,{onClick:m,children:"编辑"})]}),e.jsx(p,{}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-[150px_1fr] items-start gap-4",children:[e.jsx("label",{className:"pt-1 text-sm font-medium text-gray-600",children:"昵称"}),e.jsx("div",{className:"text-sm text-gray-900",children:r.nickname||"未设置"})]}),e.jsxs("div",{className:"grid grid-cols-[150px_1fr] items-start gap-4",children:[e.jsx("label",{className:"pt-1 text-sm font-medium text-gray-600",children:"姓名"}),e.jsx("div",{className:"text-sm text-gray-900",children:r.name})]}),e.jsxs("div",{className:"grid grid-cols-[150px_1fr] items-start gap-4",children:[e.jsx("label",{className:"pt-1 text-sm font-medium text-gray-600",children:"性别"}),e.jsx("div",{className:"text-sm text-gray-900",children:r.gender?u[r.gender]:"未设置"})]}),e.jsxs("div",{className:"grid grid-cols-[150px_1fr] items-start gap-4",children:[e.jsx("label",{className:"pt-1 text-sm font-medium text-gray-600",children:"生日"}),e.jsx("div",{className:"text-sm text-gray-900",children:r.birthday||"未设置"})]})]})]})}s.__docgenInfo={description:"",methods:[],displayName:"UserInfoDisplay",props:{userData:{required:!0,tsType:{name:"UserInfo"},description:""},onEdit:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const U={title:"User/UserInfoDisplay",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onEdit:{action:"edit",description:"Callback when edit button is clicked"}}},a={id:"user-123",name:"张三",nickname:"小张",email:"zhangsan@example.com",emailVerified:!0,phoneNumber:"13800138000",phoneNumberVerified:!0,gender:"male",birthday:"1990-01-01",image:null,createdAt:"2024-01-01T00:00:00Z",updatedAt:"2024-01-01T00:00:00Z"},n={args:{userData:a,onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...r})})},t={args:{userData:{...a,name:"李四",nickname:"小李",gender:"female"},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...r})})},i={args:{userData:{...a,gender:"other"},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...r})})},d={args:{userData:{...a,nickname:null,gender:null,birthday:null},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...r})})},o={args:{userData:{...a,nickname:null},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...r})})},c={args:{userData:{...a,birthday:null},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(s,{...r})})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    userData: mockUserData,
    onEdit: () => {}
  },
  render: args => <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
}`,...n.parameters?.docs?.source},description:{story:"Complete user profile with all fields filled",...n.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    userData: {
      ...mockUserData,
      name: "李四",
      nickname: "小李",
      gender: "female"
    },
    onEdit: () => {}
  },
  render: args => <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
}`,...t.parameters?.docs?.source},description:{story:"User profile with female gender",...t.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    userData: {
      ...mockUserData,
      gender: "other"
    },
    onEdit: () => {}
  },
  render: args => <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
}`,...i.parameters?.docs?.source},description:{story:"User profile with other gender",...i.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    userData: {
      ...mockUserData,
      nickname: null,
      gender: null,
      birthday: null
    },
    onEdit: () => {}
  },
  render: args => <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
}`,...d.parameters?.docs?.source},description:{story:"Minimal user profile with only required fields",...d.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    userData: {
      ...mockUserData,
      nickname: null
    },
    onEdit: () => {}
  },
  render: args => <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
}`,...o.parameters?.docs?.source},description:{story:"User profile without nickname",...o.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    userData: {
      ...mockUserData,
      birthday: null
    },
    onEdit: () => {}
  },
  render: args => <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
}`,...c.parameters?.docs?.source},description:{story:"User profile without birthday",...c.parameters?.docs?.description}}};const w=["Complete","FemaleUser","OtherGender","Minimal","WithoutNickname","WithoutBirthday"];export{n as Complete,t as FemaleUser,d as Minimal,i as OtherGender,c as WithoutBirthday,o as WithoutNickname,w as __namedExportsOrder,U as default};
