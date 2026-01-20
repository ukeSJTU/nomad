import{r as i,j as e}from"./iframe-CrLPMyef.js";import{C as m}from"./order-status-card-CwmG_t2m.js";import"./alert-dialog-BDRb33ee.js";import{B as u}from"./button-C49Jt41H.js";import"./preload-helper-PPVm8Dsz.js";import"./card-D-d6dHIy.js";import"./createLucideIcon-DzaTpkcS.js";import"./platform-DKvuCmmd.js";import"./badge-DRbaR9p2.js";import"./index-CCw5U8u4.js";import"./separator-BFZTMdF7.js";import"./index-E-CxifyW.js";import"./index-DLC0D_9l.js";import"./arrow-right-BDAwJViZ.js";import"./format-Bpyr6-K6.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./alert-Dl9eybxG.js";import"./clock-F2jEp9km.js";import"./circle-check-big-H3xgBYGC.js";import"./circle-alert-Dy3v6eT1.js";import"./circle-x-B6KCtiih.js";import"./index-B2BMd2ZM.js";import"./index-B9BpXIRB.js";import"./index-DBYj_96i.js";import"./index-BmOx0rIh.js";var o,n,s;const q={title:"Flights/Orders/CancelOrderDialog",component:m,parameters:{layout:"centered"},tags:["autodocs"]},t={render:p=>{const[l,r]=i.useState(!1),[d,a]=i.useState(!1),c=()=>{a(!0),setTimeout(()=>{a(!1),r(!1)},2e3)};return e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(u,{onClick:()=>r(!0),variant:"destructive",children:"取消订单"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"点击按钮打开取消订单确认对话框"}),e.jsx(m,{...p,open:l,onOpenChange:r,onConfirm:c,isLoading:d})]})},args:{}};t.parameters={...t.parameters,docs:{...(o=t.parameters)===null||o===void 0?void 0:o.docs,source:{originalSource:`{
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
