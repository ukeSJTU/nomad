import{p as U}from"./chunk-K2ZEYYM2-B3UFfJJT.js";import{p as q}from"./treemap-KMMF4GRG-YVX6V4UE-j3Uv_nL7.js";import{_ as s,g as H,s as Q,a as V,b as Z,t as j,q as J,l as w,c as K,F as X,aN as Y,aP as ee,aQ as G,aR as te,e as ae,z as re,aS as ie,H as se}from"./md-bBidEZTc.js";import"./chunk-ZZTYOBSU-C5F-mEpf.js";import"./modules/shiki-Sn5maBLq.js";import"./modules/vue-E-vfRMe2.js";import"./monaco/bundled-types-BL8PuC2V.js";import"./modules/file-saver-C8QSpN-3.js";import"./lz-string-si4yBCUE.js";import"./index-DHPA1QcM.js";import"./slidev/default-BQTfZIil.js";import"./slidev/context-CcHZBg-K.js";var oe=se.pie,D={sections:new Map,showData:!1},g=D.sections,C=D.showData,le=structuredClone(oe),ne=s(()=>structuredClone(le),"getConfig"),ce=s(()=>{g=new Map,C=D.showData,re()},"clear"),pe=s(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);g.has(e)||(g.set(e,a),w.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),de=s(()=>g,"getSections"),ge=s(e=>{C=e},"setShowData"),ue=s(()=>C,"getShowData"),P={getConfig:ne,clear:ce,setDiagramTitle:J,getDiagramTitle:j,setAccTitle:Z,getAccTitle:V,setAccDescription:Q,getAccDescription:H,addSection:pe,getSections:de,setShowData:ge,getShowData:ue},fe=s((e,a)=>{U(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),me={parse:s(async e=>{const a=await q("pie",e);w.debug(a),fe(a,P)},"parse")},he=s(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ve=he,Se=s(e=>{const a=[...e.values()].reduce((r,o)=>r+o,0),$=[...e.entries()].map(([r,o])=>({label:r,value:o})).filter(r=>r.value/a*100>=1).sort((r,o)=>o.value-r.value);return ie().value(r=>r.value)($)},"createPieArcs"),xe=s((e,a,$,y)=>{w.debug(`rendering pie chart
`+e);const r=y.db,o=K(),T=X(r.getConfig(),o.pie),A=40,l=18,p=4,c=450,u=c,f=Y(a),n=f.append("g");n.attr("transform","translate("+u/2+","+c/2+")");const{themeVariables:i}=o;let[_]=ee(i.pieOuterStrokeWidth);_??=2;const b=T.textPosition,d=Math.min(u,c)/2-A,R=G().innerRadius(0).outerRadius(d),W=G().innerRadius(d*b).outerRadius(d*b);n.append("circle").attr("cx",0).attr("cy",0).attr("r",d+_/2).attr("class","pieOuterCircle");const m=r.getSections(),M=Se(m),N=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let h=0;m.forEach(t=>{h+=t});const E=M.filter(t=>(t.data.value/h*100).toFixed(0)!=="0"),v=te(N);n.selectAll("mySlices").data(E).enter().append("path").attr("d",R).attr("fill",t=>v(t.data.label)).attr("class","pieCircle"),n.selectAll("mySlices").data(E).enter().append("text").text(t=>(t.data.value/h*100).toFixed(0)+"%").attr("transform",t=>"translate("+W.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),n.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const k=[...m.entries()].map(([t,x])=>({label:t,value:x})),S=n.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(t,x)=>{const F=l+p,I=F*k.length/2,L=12*l,B=x*F-I;return"translate("+L+","+B+")"});S.append("rect").attr("width",l).attr("height",l).style("fill",t=>v(t.label)).style("stroke",t=>v(t.label)),S.append("text").attr("x",l+p).attr("y",l-p).text(t=>r.getShowData()?`${t.label} [${t.value}]`:t.label);const O=Math.max(...S.selectAll("text").nodes().map(t=>t?.getBoundingClientRect().width??0)),z=u+A+l+p+O;f.attr("viewBox",`0 0 ${z} ${c}`),ae(f,c,z,T.useMaxWidth)},"draw"),we={draw:xe},Ge={parser:me,db:P,renderer:we,styles:ve};export{Ge as diagram};
