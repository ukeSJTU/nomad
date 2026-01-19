import{r as i,j as e}from"./iframe-BY6WQ8rl.js";import{C as m}from"./order-status-card-ByDy71h2.js";import"./alert-dialog-C3Xzojz4.js";import{B as u}from"./button-Bkd1CeD9.js";import"./preload-helper-PPVm8Dsz.js";import"./card-C2MAT-zL.js";import"./createLucideIcon-DhaeV68V.js";import"./platform-CXbBvqhr.js";import"./badge-DGHQsNQ9.js";import"./index-Cg4mt3GG.js";import"./separator-D3mo2s7R.js";import"./index-B6rVzEen.js";import"./index-DRfufKDV.js";import"./arrow-right-JX-tWSat.js";import"./format-Bpyr6-K6.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-Bq9jHRdw.js";import"./clock-DMr9UqDy.js";import"./circle-check-big-CNw7CXee.js";import"./circle-alert-BdeKJeaD.js";import"./circle-x-CqC3SdqK.js";import"./index-HIqmnw4t.js";import"./index-jM_4ha9X.js";import"./index-BaiNJB1C.js";import"./index-D0-zYxe0.js";var o,n,s;const q={title:"Flights/Orders/CancelOrderDialog",component:m,parameters:{layout:"centered"},tags:["autodocs"]},t={render:p=>{const[l,r]=i.useState(!1),[d,a]=i.useState(!1),c=()=>{a(!0),setTimeout(()=>{a(!1),r(!1)},2e3)};return e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(u,{onClick:()=>r(!0),variant:"destructive",children:"取消订单"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"点击按钮打开取消订单确认对话框"}),e.jsx(m,{...p,open:l,onOpenChange:r,onConfirm:c,isLoading:d})]})},args:{}};t.parameters={...t.parameters,docs:{...(o=t.parameters)===null||o===void 0?void 0:o.docs,source:{originalSource:`{
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
}`,...(s=t.parameters)===null||s===void 0||(n=s.docs)===null||n===void 0?void 0:n.source}}};const w=["Default"];export{t as Default,w as __namedExportsOrder,q as default};
