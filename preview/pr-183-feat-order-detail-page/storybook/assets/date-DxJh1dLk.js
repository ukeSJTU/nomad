const a=["周日","周一","周二","周三","周四","周五","周六"];function c(t){return a[t.getDay()]}function r(t){const e=t.getMonth()+1,n=t.getDate(),o=c(t);return`${e}月${n}日 ${o}`}export{r as f,c as g};
