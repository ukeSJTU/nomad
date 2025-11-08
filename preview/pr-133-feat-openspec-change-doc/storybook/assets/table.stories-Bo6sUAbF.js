import{j as e}from"./iframe-DfXeTlor.js";import{c as o}from"./utils-CBfrqCZ4.js";import"./preload-helper-PPVm8Dsz.js";function d({className:a,...t}){return e.jsx("div",{"data-slot":"table-container",className:"relative w-full overflow-x-auto",children:e.jsx("table",{"data-slot":"table",className:o("w-full caption-bottom text-sm",a),...t})})}function c({className:a,...t}){return e.jsx("thead",{"data-slot":"table-header",className:o("[&_tr]:border-b",a),...t})}function m({className:a,...t}){return e.jsx("tbody",{"data-slot":"table-body",className:o("[&_tr:last-child]:border-0",a),...t})}function T({className:a,...t}){return e.jsx("tfoot",{"data-slot":"table-footer",className:o("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",a),...t})}function s({className:a,...t}){return e.jsx("tr",{"data-slot":"table-row",className:o("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",a),...t})}function n({className:a,...t}){return e.jsx("th",{"data-slot":"table-head",className:o("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...t})}function l({className:a,...t}){return e.jsx("td",{"data-slot":"table-cell",className:o("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...t})}function b({className:a,...t}){return e.jsx("caption",{"data-slot":"table-caption",className:o("text-muted-foreground mt-4 text-sm",a),...t})}d.__docgenInfo={description:"",methods:[],displayName:"Table"};m.__docgenInfo={description:"",methods:[],displayName:"TableBody"};b.__docgenInfo={description:"",methods:[],displayName:"TableCaption"};l.__docgenInfo={description:"",methods:[],displayName:"TableCell"};T.__docgenInfo={description:"",methods:[],displayName:"TableFooter"};n.__docgenInfo={description:"",methods:[],displayName:"TableHead"};c.__docgenInfo={description:"",methods:[],displayName:"TableHeader"};s.__docgenInfo={description:"",methods:[],displayName:"TableRow"};const y={title:"Shadcn/Table",component:d,parameters:{layout:"centered"}},h=[{invoice:"INV001",paymentStatus:"Paid",totalAmount:"$250.00",paymentMethod:"Credit Card"},{invoice:"INV002",paymentStatus:"Pending",totalAmount:"$150.00",paymentMethod:"PayPal"},{invoice:"INV003",paymentStatus:"Unpaid",totalAmount:"$350.00",paymentMethod:"Bank Transfer"},{invoice:"INV004",paymentStatus:"Paid",totalAmount:"$450.00",paymentMethod:"Credit Card"},{invoice:"INV005",paymentStatus:"Paid",totalAmount:"$550.00",paymentMethod:"PayPal"}],i={render:()=>e.jsxs(d,{children:[e.jsx(b,{children:"A list of your recent invoices."}),e.jsx(c,{children:e.jsxs(s,{children:[e.jsx(n,{className:"w-[100px]",children:"Invoice"}),e.jsx(n,{children:"Status"}),e.jsx(n,{children:"Method"}),e.jsx(n,{className:"text-right",children:"Amount"})]})}),e.jsx(m,{children:h.map(a=>e.jsxs(s,{children:[e.jsx(l,{className:"font-medium",children:a.invoice}),e.jsx(l,{children:a.paymentStatus}),e.jsx(l,{children:a.paymentMethod}),e.jsx(l,{className:"text-right",children:a.totalAmount})]},a.invoice))})]})},r={render:()=>e.jsxs(d,{children:[e.jsx(b,{children:"A list of your recent invoices."}),e.jsx(c,{children:e.jsxs(s,{children:[e.jsx(n,{className:"w-[100px]",children:"Invoice"}),e.jsx(n,{children:"Status"}),e.jsx(n,{children:"Method"}),e.jsx(n,{className:"text-right",children:"Amount"})]})}),e.jsx(m,{children:h.map(a=>e.jsxs(s,{children:[e.jsx(l,{className:"font-medium",children:a.invoice}),e.jsx(l,{children:a.paymentStatus}),e.jsx(l,{children:a.paymentMethod}),e.jsx(l,{className:"text-right",children:a.totalAmount})]},a.invoice))}),e.jsx(T,{children:e.jsxs(s,{children:[e.jsx(l,{colSpan:3,children:"Total"}),e.jsx(l,{className:"text-right",children:"$1,750.00"})]})})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
}`,...r.parameters?.docs?.source}}};const j=["Default","WithFooter"];export{i as Default,r as WithFooter,j as __namedExportsOrder,y as default};
