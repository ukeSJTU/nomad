import{j as e}from"./iframe-Bg-UGac9.js";import{B as V}from"./button-DDX2HNO5.js";import{S as Z}from"./separator-CguLdoP5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-njiYd0wI.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./index-KqqYSkLM.js";import"./index-CQuQOcOr.js";const z={male:"男",female:"女",other:"其他"};function a({userData:r,onEdit:A}){return e.jsxs("div",{className:"space-y-6 bg-white p-6 rounded-lg border",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900",children:"个人信息"}),e.jsx(V,{onClick:A,children:"编辑"})]}),e.jsx(Z,{}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-[150px_1fr] items-start gap-4",children:[e.jsx("label",{className:"pt-1 text-sm font-medium text-gray-600",children:"昵称"}),e.jsx("div",{className:"text-sm text-gray-900",children:r.nickname||"未设置"})]}),e.jsxs("div",{className:"grid grid-cols-[150px_1fr] items-start gap-4",children:[e.jsx("label",{className:"pt-1 text-sm font-medium text-gray-600",children:"姓名"}),e.jsx("div",{className:"text-sm text-gray-900",children:r.name})]}),e.jsxs("div",{className:"grid grid-cols-[150px_1fr] items-start gap-4",children:[e.jsx("label",{className:"pt-1 text-sm font-medium text-gray-600",children:"性别"}),e.jsx("div",{className:"text-sm text-gray-900",children:r.gender?z[r.gender]:"未设置"})]}),e.jsxs("div",{className:"grid grid-cols-[150px_1fr] items-start gap-4",children:[e.jsx("label",{className:"pt-1 text-sm font-medium text-gray-600",children:"生日"}),e.jsx("div",{className:"text-sm text-gray-900",children:r.birthday||"未设置"})]})]})]})}a.__docgenInfo={description:"",methods:[],displayName:"UserInfoDisplay",props:{userData:{required:!0,tsType:{name:"UserInfo"},description:""},onEdit:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};var m,c,p,u,v,_,h,g,x,y,f,N,j,U,k,D,w,b,E,W,I,C,B,M,O,S,F,G,T,q;const $={title:"User/UserInfoDisplay",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onEdit:{action:"edit",description:"Callback when edit button is clicked"}}},s={id:"user-123",name:"张三",nickname:"小张",email:"zhangsan@example.com",emailVerified:!0,phoneNumber:"13800138000",phoneNumberVerified:!0,gender:"male",birthday:"1990-01-01",image:null,createdAt:"2024-01-01T00:00:00Z",updatedAt:"2024-01-01T00:00:00Z"},i={args:{userData:s,onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(a,{...r})})},t={args:{userData:{...s,name:"李四",nickname:"小李",gender:"female"},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(a,{...r})})},n={args:{userData:{...s,gender:"other"},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(a,{...r})})},o={args:{userData:{...s,nickname:null,gender:null,birthday:null},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(a,{...r})})},d={args:{userData:{...s,nickname:null},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(a,{...r})})},l={args:{userData:{...s,birthday:null},onEdit:()=>{}},render:r=>e.jsx("div",{className:"w-[700px]",children:e.jsx(a,{...r})})};i.parameters={...i.parameters,docs:{...(m=i.parameters)===null||m===void 0?void 0:m.docs,source:{originalSource:`{
  args: {
    userData: mockUserData,
    onEdit: () => {}
  },
  render: args => <div className="w-[700px]">
      <UserInfoDisplay {...args} />
    </div>
}`,...(p=i.parameters)===null||p===void 0||(c=p.docs)===null||c===void 0?void 0:c.source},description:{story:"Complete user profile with all fields filled",...(v=i.parameters)===null||v===void 0||(u=v.docs)===null||u===void 0?void 0:u.description}}};t.parameters={...t.parameters,docs:{...(_=t.parameters)===null||_===void 0?void 0:_.docs,source:{originalSource:`{
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
}`,...(g=t.parameters)===null||g===void 0||(h=g.docs)===null||h===void 0?void 0:h.source},description:{story:"User profile with female gender",...(y=t.parameters)===null||y===void 0||(x=y.docs)===null||x===void 0?void 0:x.description}}};n.parameters={...n.parameters,docs:{...(f=n.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
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
}`,...(j=n.parameters)===null||j===void 0||(N=j.docs)===null||N===void 0?void 0:N.source},description:{story:"User profile with other gender",...(k=n.parameters)===null||k===void 0||(U=k.docs)===null||U===void 0?void 0:U.description}}};o.parameters={...o.parameters,docs:{...(D=o.parameters)===null||D===void 0?void 0:D.docs,source:{originalSource:`{
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
}`,...(b=o.parameters)===null||b===void 0||(w=b.docs)===null||w===void 0?void 0:w.source},description:{story:"Minimal user profile with only required fields",...(W=o.parameters)===null||W===void 0||(E=W.docs)===null||E===void 0?void 0:E.description}}};d.parameters={...d.parameters,docs:{...(I=d.parameters)===null||I===void 0?void 0:I.docs,source:{originalSource:`{
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
}`,...(B=d.parameters)===null||B===void 0||(C=B.docs)===null||C===void 0?void 0:C.source},description:{story:"User profile without nickname",...(O=d.parameters)===null||O===void 0||(M=O.docs)===null||M===void 0?void 0:M.description}}};l.parameters={...l.parameters,docs:{...(S=l.parameters)===null||S===void 0?void 0:S.docs,source:{originalSource:`{
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
}`,...(G=l.parameters)===null||G===void 0||(F=G.docs)===null||F===void 0?void 0:F.source},description:{story:"User profile without birthday",...(q=l.parameters)===null||q===void 0||(T=q.docs)===null||T===void 0?void 0:T.description}}};const ee=["Complete","FemaleUser","OtherGender","Minimal","WithoutNickname","WithoutBirthday"];export{i as Complete,t as FemaleUser,o as Minimal,n as OtherGender,l as WithoutBirthday,d as WithoutNickname,ee as __namedExportsOrder,$ as default};
