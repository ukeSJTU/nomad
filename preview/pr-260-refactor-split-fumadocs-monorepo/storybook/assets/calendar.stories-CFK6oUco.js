import{j as e,r as s}from"./iframe-Bg-UGac9.js";import{C as r}from"./calendar-Y8RZrO0g.js";import"./preload-helper-PPVm8Dsz.js";import"./button-DDX2HNO5.js";import"./index-njiYd0wI.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./format-Bpyr6-K6.js";import"./differenceInCalendarDays-6LXBCVj7.js";import"./addDays-qjdbre-_.js";import"./createLucideIcon-CaoxKut3.js";import"./chevron-right-Co34CRW7.js";import"./chevron-down-eWzm-ZM6.js";var u,v,D,_,g,h,S,x,w,j,W,f,C,N,b,M,R,y,B,G,O,E,V,k;function L(){const[a,t]=s.useState(new Date);return e.jsx("div",{className:"p-4",children:e.jsx(r,{mode:"single",selected:a,onSelect:t})})}function q(){const[a,t]=s.useState({from:new Date(2024,0,20),to:new Date(2024,0,25)});return e.jsx("div",{className:"p-4",children:e.jsx(r,{mode:"range",selected:a,onSelect:t,numberOfMonths:2})})}function z(){const[a,t]=s.useState([new Date(2024,0,10),new Date(2024,0,15),new Date(2024,0,20)]);return e.jsx("div",{className:"p-4",children:e.jsx(r,{mode:"multiple",selected:a,onSelect:t})})}function A(){const[a,t]=s.useState(new Date),F=[{from:new Date(2024,0,1),to:new Date(2024,0,5)},new Date(2024,0,15),{dayOfWeek:[0,6]}];return e.jsx("div",{className:"p-4",children:e.jsx(r,{mode:"single",selected:a,onSelect:t,disabled:F})})}function H(){const[a,t]=s.useState(new Date);return e.jsx("div",{className:"p-4",children:e.jsx(r,{mode:"single",selected:a,onSelect:t,captionLayout:"dropdown",startMonth:new Date(2020,0),endMonth:new Date(2030,11)})})}const te={title:"Forms/Calendar",component:r,parameters:{layout:"centered"},tags:["autodocs"]},o={render:()=>e.jsx(L,{})},n={render:()=>e.jsx(q,{})},d={render:()=>e.jsx(z,{})},i={render:()=>e.jsx(A,{})},l={render:()=>e.jsx(H,{})},c={render:()=>e.jsx("div",{className:"p-4",children:e.jsx(r,{mode:"single"})})},m={render:()=>e.jsx("div",{className:"p-4",children:e.jsx(r,{mode:"single",showOutsideDays:!0})})},p={render:()=>{const[a,t]=s.useState(new Date);return e.jsx("div",{className:"p-4",children:e.jsx(r,{mode:"single",selected:a,onSelect:t,buttonVariant:"ghost"})})}};o.parameters={...o.parameters,docs:{...(u=o.parameters)===null||u===void 0?void 0:u.docs,source:{originalSource:`{
  render: () => <SingleCalendar />
}`,...(D=o.parameters)===null||D===void 0||(v=D.docs)===null||v===void 0?void 0:v.source}}};n.parameters={...n.parameters,docs:{...(_=n.parameters)===null||_===void 0?void 0:_.docs,source:{originalSource:`{
  render: () => <RangeCalendar />
}`,...(h=n.parameters)===null||h===void 0||(g=h.docs)===null||g===void 0?void 0:g.source}}};d.parameters={...d.parameters,docs:{...(S=d.parameters)===null||S===void 0?void 0:S.docs,source:{originalSource:`{
  render: () => <MultipleCalendar />
}`,...(w=d.parameters)===null||w===void 0||(x=w.docs)===null||x===void 0?void 0:x.source}}};i.parameters={...i.parameters,docs:{...(j=i.parameters)===null||j===void 0?void 0:j.docs,source:{originalSource:`{
  render: () => <CalendarWithDisabledDates />
}`,...(f=i.parameters)===null||f===void 0||(W=f.docs)===null||W===void 0?void 0:W.source}}};l.parameters={...l.parameters,docs:{...(C=l.parameters)===null||C===void 0?void 0:C.docs,source:{originalSource:`{
  render: () => <CalendarWithDropdown />
}`,...(b=l.parameters)===null||b===void 0||(N=b.docs)===null||N===void 0?void 0:N.source}}};c.parameters={...c.parameters,docs:{...(M=c.parameters)===null||M===void 0?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="p-4">
      <Calendar mode="single" />
    </div>
}`,...(y=c.parameters)===null||y===void 0||(R=y.docs)===null||R===void 0?void 0:R.source}}};m.parameters={...m.parameters,docs:{...(B=m.parameters)===null||B===void 0?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="p-4">
      <Calendar mode="single" showOutsideDays={true} />
    </div>
}`,...(O=m.parameters)===null||O===void 0||(G=O.docs)===null||G===void 0?void 0:G.source}}};p.parameters={...p.parameters,docs:{...(E=p.parameters)===null||E===void 0?void 0:E.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <div className="p-4">
        <Calendar mode="single" selected={date} onSelect={setDate} buttonVariant="ghost" />
      </div>;
  }
}`,...(k=p.parameters)===null||k===void 0||(V=k.docs)===null||V===void 0?void 0:V.source}}};const re=["SingleDate","RangeSelection","MultipleDates","WithDisabledDates","WithDropdownNavigation","Static","Default","WithGhostButtons"];export{m as Default,d as MultipleDates,n as RangeSelection,o as SingleDate,c as Static,i as WithDisabledDates,l as WithDropdownNavigation,p as WithGhostButtons,re as __namedExportsOrder,te as default};
