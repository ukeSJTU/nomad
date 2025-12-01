import{r,j as e}from"./iframe-BogQ13Ve.js";import{C as o}from"./cancel-order-dialog-K_m8DvAH.js";import{B as p}from"./button-27d-jglB.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BsxkBFj4.js";import"./index-Dv-AbGKv.js";import"./index-Dc7dzZ7U.js";import"./index-C3O2lyO2.js";import"./index-Cdnjguf0.js";import"./index-f__aaaqu.js";import"./index-BtL_tHLt.js";import"./index-Jnx7C39x.js";import"./Combination-DXMGUkAP.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";const B={title:"Flights/Orders/CancelOrderDialog",component:o,parameters:{layout:"centered"},tags:["autodocs"]},t={render:a=>{const[i,n]=r.useState(!1),[m,s]=r.useState(!1),l=()=>{s(!0),setTimeout(()=>{s(!1),n(!1)},2e3)};return e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(p,{onClick:()=>n(!0),variant:"destructive",children:"取消订单"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"点击按钮打开取消订单确认对话框"}),e.jsx(o,{...a,open:i,onOpenChange:n,onConfirm:l,isLoading:m})]})},args:{}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleConfirm = () => {
      setIsLoading(true);
      // Mock API calling
      setTimeout(() => {
        setIsLoading(false);
        setOpen(false);
      }, 2000);
    };
    return <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)} variant="destructive">
          取消订单
        </Button>
        <p className="text-sm text-muted-foreground">
          点击按钮打开取消订单确认对话框
        </p>
        <CancelOrderDialog {...args} open={open} onOpenChange={setOpen} onConfirm={handleConfirm} isLoading={isLoading} />
      </div>;
  },
  args: {}
}`,...t.parameters?.docs?.source}}};const N=["Default"];export{t as Default,N as __namedExportsOrder,B as default};
