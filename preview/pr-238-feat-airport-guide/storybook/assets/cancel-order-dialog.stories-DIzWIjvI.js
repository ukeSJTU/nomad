import{r,j as e}from"./iframe-DO7MqS-O.js";import{C as o}from"./cancel-order-dialog-CZ0k9dvb.js";import{B as p}from"./button-D6r4UTqw.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CVJqreMe.js";import"./index-B5_TP-bN.js";import"./index-Dy1kmfns.js";import"./index-DLE6k5cD.js";import"./index-yHLV4A47.js";import"./index-CuaK1QD-.js";import"./index-DUzmstHe.js";import"./index-D-aqbw7U.js";import"./Combination-DMdNBYCS.js";import"./utils-CBfrqCZ4.js";import"./index-CdJFUDDL.js";const B={title:"Flights/Orders/CancelOrderDialog",component:o,parameters:{layout:"centered"},tags:["autodocs"]},t={render:a=>{const[i,n]=r.useState(!1),[m,s]=r.useState(!1),l=()=>{s(!0),setTimeout(()=>{s(!1),n(!1)},2e3)};return e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(p,{onClick:()=>n(!0),variant:"destructive",children:"取消订单"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"点击按钮打开取消订单确认对话框"}),e.jsx(o,{...a,open:i,onOpenChange:n,onConfirm:l,isLoading:m})]})},args:{}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
