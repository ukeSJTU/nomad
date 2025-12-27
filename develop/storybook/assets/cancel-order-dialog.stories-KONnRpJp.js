import{r as i,j as e}from"./iframe-vM1xkXS8.js";import{C as l}from"./cancel-order-dialog-BvMN3QJu.js";import{B as u}from"./button-C4LX52gm.js";import"./preload-helper-PPVm8Dsz.js";import"./index-PM_lTkbO.js";import"./index-DwIWsOY3.js";import"./index-CHcTPGVs.js";import"./index-B7PtnZVA.js";import"./index-CQG4Rjkj.js";import"./index-Z_xujJ9G.js";import"./index-1NTd6QD9.js";import"./Combination-BB3CV4XK.js";import"./utils-CDN07tui.js";import"./index-B_jtOnfb.js";var s,r,o;const N={title:"Flights/Orders/CancelOrderDialog",component:l,parameters:{layout:"centered"},tags:["autodocs"]},t={render:m=>{const[d,n]=i.useState(!1),[p,a]=i.useState(!1),c=()=>{a(!0),setTimeout(()=>{a(!1),n(!1)},2e3)};return e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(u,{onClick:()=>n(!0),variant:"destructive",children:"取消订单"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"点击按钮打开取消订单确认对话框"}),e.jsx(l,{...m,open:d,onOpenChange:n,onConfirm:c,isLoading:p})]})},args:{}};t.parameters={...t.parameters,docs:{...(s=t.parameters)===null||s===void 0?void 0:s.docs,source:{originalSource:`{
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
}`,...(o=t.parameters)===null||o===void 0||(r=o.docs)===null||r===void 0?void 0:r.source}}};const k=["Default"];export{t as Default,k as __namedExportsOrder,N as default};
