import{j as e,r}from"./iframe-CI8RcqoP.js";import{C as s}from"./calendar-CI5ZeiVi.js";import"./preload-helper-PPVm8Dsz.js";import"./button-BbUkJ6zr.js";import"./index-DSe4ykHS.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./chevron-left-B2Wbs-2D.js";import"./createLucideIcon-UhiBFwT6.js";import"./chevron-right-BWfw7QER.js";import"./chevron-down-QBsFHvO5.js";function D(){const[t,a]=r.useState(new Date);return e.jsx("div",{className:"p-4",children:e.jsx(s,{mode:"single",selected:t,onSelect:a})})}function g(){const[t,a]=r.useState({from:new Date(2024,0,20),to:new Date(2024,0,25)});return e.jsx("div",{className:"p-4",children:e.jsx(s,{mode:"range",selected:t,onSelect:a,numberOfMonths:2})})}function S(){const[t,a]=r.useState([new Date(2024,0,10),new Date(2024,0,15),new Date(2024,0,20)]);return e.jsx("div",{className:"p-4",children:e.jsx(s,{mode:"multiple",selected:t,onSelect:a})})}function h(){const[t,a]=r.useState(new Date),u=[{from:new Date(2024,0,1),to:new Date(2024,0,5)},new Date(2024,0,15),{dayOfWeek:[0,6]}];return e.jsx("div",{className:"p-4",children:e.jsx(s,{mode:"single",selected:t,onSelect:a,disabled:u})})}function x(){const[t,a]=r.useState(new Date);return e.jsx("div",{className:"p-4",children:e.jsx(s,{mode:"single",selected:t,onSelect:a,captionLayout:"dropdown",startMonth:new Date(2020,0),endMonth:new Date(2030,11)})})}const O={title:"Forms/Calendar",component:s,parameters:{layout:"centered"},tags:["autodocs"]},n={render:()=>e.jsx(D,{})},o={render:()=>e.jsx(g,{})},d={render:()=>e.jsx(S,{})},c={render:()=>e.jsx(h,{})},i={render:()=>e.jsx(x,{})},l={render:()=>e.jsx("div",{className:"p-4",children:e.jsx(s,{mode:"single"})})},m={render:()=>e.jsx("div",{className:"p-4",children:e.jsx(s,{mode:"single",showOutsideDays:!0})})},p={render:()=>{const[t,a]=r.useState(new Date);return e.jsx("div",{className:"p-4",children:e.jsx(s,{mode:"single",selected:t,onSelect:a,buttonVariant:"ghost"})})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <SingleCalendar />
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <RangeCalendar />
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <MultipleCalendar />
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <CalendarWithDisabledDates />
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <CalendarWithDropdown />
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-4">
      <Calendar mode="single" />
    </div>
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-4">
      <Calendar mode="single" showOutsideDays={true} />
    </div>
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <div className="p-4">
        <Calendar mode="single" selected={date} onSelect={setDate} buttonVariant="ghost" />
      </div>;
  }
}`,...p.parameters?.docs?.source}}};const E=["SingleDate","RangeSelection","MultipleDates","WithDisabledDates","WithDropdownNavigation","Static","Default","WithGhostButtons"];export{m as Default,d as MultipleDates,o as RangeSelection,n as SingleDate,l as Static,c as WithDisabledDates,i as WithDropdownNavigation,p as WithGhostButtons,E as __namedExportsOrder,O as default};
