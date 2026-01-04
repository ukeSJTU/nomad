import{j as r}from"./iframe-DnZgF7bs.js";import{A as dr,b as cr,a as lr}from"./alert-DqpvsB8V.js";import{B as rr}from"./button-ByK4bP4Z.js";import{C as pr,b as mr,c as ur,d as _r,a as gr,e as vr}from"./card-4k7uV6oA.js";import{L as fr}from"./link-BMm06O4b.js";import{C as yr}from"./circle-alert-ADgUnWfx.js";import{C as hr}from"./circle-x-mvGsp_hS.js";import{c as br}from"./createLucideIcon-DqjoOZ7r.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B_jtOnfb.js";import"./utils-CDN07tui.js";import"./index-BMzLOmL9.js";import"./use-merged-ref-ByUIXBXc.js";const Sr=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Rr=br("triangle-alert",Sr);function ar({type:a="warning",title:sr,message:or,actionLabel:tr="Go Back",actionHref:nr="/",showBackButton:ir=!1}){const er={warning:Rr,error:hr,info:yr}[a],N=a==="error";return r.jsx("div",{className:"container mx-auto px-4 py-16",children:r.jsxs(pr,{className:"max-w-md mx-auto",children:[r.jsxs(mr,{className:"text-center pb-4",children:[r.jsx("div",{className:"flex justify-center mb-4",children:r.jsx("div",{className:`rounded-full p-3 ${N?"bg-destructive/10 text-destructive":"bg-primary/10 text-primary"}`,children:r.jsx(er,{className:"size-8"})})}),r.jsx(ur,{className:"text-2xl",children:sr}),r.jsx(_r,{className:"text-base pt-2",children:or})]}),r.jsx(gr,{className:"pb-4",children:r.jsxs(dr,{variant:N?"destructive":"default",children:[r.jsx(er,{}),r.jsx(cr,{children:a==="error"?"错误详情":a==="warning"?"重要提示":"温馨提示"}),r.jsx(lr,{children:a==="error"?"发生了意外错误。请重试，如问题持续请联系客服。":a==="warning"?"此操作需要您的注意，请仔细查看后继续。":"请仔细阅读以上信息。"})]})}),r.jsxs(vr,{className:"flex gap-3 justify-center",children:[ir&&r.jsx(rr,{variant:"outline",size:"lg",onClick:()=>window.history.back(),children:"返回上一页"}),r.jsx(rr,{variant:N?"destructive":"default",size:"lg",asChild:!0,children:r.jsx(fr,{href:nr,children:tr})})]})]})})}ar.__docgenInfo={description:"",methods:[],displayName:"ErrorDisplay",props:{type:{required:!1,tsType:{name:"union",raw:'"warning" | "error" | "info"',elements:[{name:"literal",value:'"warning"'},{name:"literal",value:'"error"'},{name:"literal",value:'"info"'}]},description:"",defaultValue:{value:'"warning"',computed:!1}},title:{required:!0,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:""},actionLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Go Back"',computed:!1}},actionHref:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"/"',computed:!1}},showBackButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Br={unauthorized:{type:"warning",title:"需要登录",message:"请登录后访问此页面。",actionLabel:"立即登录",actionHref:"/auth/sign-in"},session_expired:{type:"warning",title:"会话已过期",message:"您的登录会话已过期，请重新登录。",actionLabel:"重新登录",actionHref:"/auth/sign-in"},forbidden:{type:"error",title:"访问被拒绝",message:"您没有权限访问此资源。",actionLabel:"返回首页",actionHref:"/"},invalid_credentials:{type:"error",title:"登录失败",message:"用户名或密码错误，请重试。",actionLabel:"重新登录",actionHref:"/auth/sign-in"}},Fr={missing_seat_class:{type:"warning",title:"未选择舱位",message:"请选择舱位后继续预订。",actionLabel:"选择舱位",actionHref:"/flights/search",showBackButton:!0},booking_failed:{type:"error",title:"预订失败",message:"无法完成您的预订。请重试或联系客服。",actionLabel:"重试",actionHref:"/flights",showBackButton:!0},seat_unavailable:{type:"warning",title:"座位已满",message:"您选择的舱位座位已售罄，请选择其他舱位或航班。",actionLabel:"重新选择",actionHref:"/flights/search"},passenger_limit_exceeded:{type:"warning",title:"乘客数量超限",message:"单次预订最多支持9名乘客。",actionLabel:"返回",actionHref:"/flights/booking/passengers",showBackButton:!0},invalid_passenger_info:{type:"warning",title:"乘客信息不完整",message:"请填写完整的乘客信息后继续。",actionLabel:"返回填写",actionHref:"/flights/booking/passengers",showBackButton:!0},order_not_found:{type:"error",title:"订单不存在",message:"未找到该订单，或您没有访问权限。",actionLabel:"我的订单",actionHref:"/orders"},order_expired:{type:"warning",title:"订单已过期",message:"该订单支付时限已过，请重新预订。",actionLabel:"重新预订",actionHref:"/flights"},order_cancelled:{type:"info",title:"订单已取消",message:"该订单已被取消。",actionLabel:"返回首页",actionHref:"/"},invalid_order_status:{type:"warning",title:"订单状态异常",message:"当前订单状态不允许此操作。",actionLabel:"查看订单",actionHref:"/orders"},missing_order_id:{type:"warning",title:"订单信息缺失",message:"未找到订单信息，请返回上一步。",actionLabel:"返回",actionHref:"/flights/booking/passengers",showBackButton:!0},payment_failed:{type:"error",title:"支付失败",message:"支付处理失败，请检查支付信息后重试。",actionLabel:"返回支付",actionHref:"/flights/booking/payment",showBackButton:!0},payment_timeout:{type:"warning",title:"支付超时",message:"支付时间已超时，订单已自动取消。",actionLabel:"重新预订",actionHref:"/flights"},insufficient_balance:{type:"warning",title:"余额不足",message:"您的账户余额不足，请选择其他支付方式或充值后重试。",actionLabel:"返回支付",actionHref:"/flights/booking/payment",showBackButton:!0},payment_deadline_passed:{type:"warning",title:"支付截止时间已过",message:"该订单的支付截止时间已过，订单已自动取消。",actionLabel:"重新预订",actionHref:"/flights"},duplicate_booking:{type:"warning",title:"重复预订",message:"您已经预订过此航班，请勿重复提交。",actionLabel:"查看订单",actionHref:"/orders"}},Lr={not_found:{type:"info",title:"页面不存在",message:"您访问的页面不存在或已被移除。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0},server_error:{type:"error",title:"服务器错误",message:"服务器遇到错误，请稍后重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0},network_error:{type:"error",title:"网络错误",message:"网络连接失败，请检查您的网络连接后重试。",actionLabel:"重试",actionHref:"/",showBackButton:!0},maintenance:{type:"info",title:"系统维护中",message:"系统正在维护，预计将在短时间内恢复。给您带来不便，敬请谅解。",actionLabel:"返回首页",actionHref:"/"},rate_limit_exceeded:{type:"warning",title:"操作过于频繁",message:"您的操作过于频繁，请稍后再试。",actionLabel:"返回",actionHref:"/",showBackButton:!0},invalid_data:{type:"warning",title:"数据格式错误",message:"提交的数据格式不正确，请检查后重试。",actionLabel:"返回",actionHref:"/",showBackButton:!0}},Er={missing_flight:{type:"warning",title:"未选择航班",message:"请先选择航班后再进入预订流程。",actionLabel:"搜索航班",actionHref:"/flights",showBackButton:!0},flight_not_found:{type:"error",title:"航班不存在",message:"您选择的航班已不存在，可能已售罄或被取消。",actionLabel:"重新搜索",actionHref:"/flights"},no_search_results:{type:"info",title:"未找到航班",message:"抱歉，没有找到符合条件的航班。请尝试调整搜索条件。",actionLabel:"修改搜索",actionHref:"/flights",showBackButton:!0},invalid_search_params:{type:"warning",title:"搜索参数无效",message:"搜索参数不完整或无效，请重新填写搜索条件。",actionLabel:"返回搜索",actionHref:"/flights"},search_failed:{type:"error",title:"搜索失败",message:"航班搜索服务暂时不可用，请稍后重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0}},e={...Lr,...Br,...Fr,...Er};var O,k,C,H,I,G,j,P,T,M,z,D,U,W,q,A,V,X,$,J,K,Q,Y,Z,ee,re,ae,se,oe,te,ne,ie,de,ce,le,pe,me,ue,_e,ge,ve,fe,ye,he,be,Se,Re,Be,Fe,Le,Ee,we,xe,Ne,Oe,ke,Ce,He,Ie,Ge,je,Pe,Te,Me,ze,De,Ue,We,qe,Ae,Ve,Xe,$e,Je,Ke,Qe,Ye,Ze;const Dr={title:"Common/ErrorDisplay",component:ar,parameters:{layout:"fullscreen"},tags:["autodocs"]},s={args:{type:"error",title:"出错了",message:"发生了意外错误，请稍后重试。",actionLabel:"返回首页",actionHref:"/"}},o={args:{type:"warning",title:"需要注意",message:"此操作需要您的确认。",actionLabel:"继续",actionHref:"/"}},t={args:{type:"info",title:"温馨提示",message:"这是一条重要信息。",actionLabel:"了解更多",actionHref:"/"}},n={args:{type:"error",title:"操作失败",message:"无法完成该操作，请返回上一页重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0}},i={args:e.missing_flight,parameters:{docs:{description:{story:"用户未选择航班就尝试进入预订流程时显示。"}}}},d={args:e.flight_not_found,parameters:{docs:{description:{story:"选择的航班已不存在或被取消时显示。"}}}},c={args:e.no_search_results,parameters:{docs:{description:{story:"搜索未找到任何符合条件的航班时显示。"}}}},l={args:e.invalid_search_params,parameters:{docs:{description:{story:"搜索参数不完整或格式错误时显示。"}}}},p={args:e.booking_failed,parameters:{docs:{description:{story:"预订过程中发生错误时显示。"}}}},m={args:e.seat_unavailable,parameters:{docs:{description:{story:"选择的舱位座位已满时显示。"}}}},u={args:e.passenger_limit_exceeded,parameters:{docs:{description:{story:"乘客数量超过单次预订限制时显示。"}}}},_={args:e.payment_failed,parameters:{docs:{description:{story:"支付处理失败时显示。"}}}},g={args:e.insufficient_balance,parameters:{docs:{description:{story:"账户余额不足以完成支付时显示。"}}}},v={args:e.payment_timeout,parameters:{docs:{description:{story:"支付超时，订单已取消时显示。"}}}},f={args:e.order_not_found,parameters:{docs:{description:{story:"订单不存在或用户无权访问时显示。"}}}},y={args:e.order_expired,parameters:{docs:{description:{story:"订单支付时限已过时显示。"}}}},h={args:e.order_cancelled,parameters:{docs:{description:{story:"订单已被取消时显示。"}}}},b={args:e.unauthorized,parameters:{docs:{description:{story:"需要登录才能访问页面时显示。"}}}},S={args:e.session_expired,parameters:{docs:{description:{story:"用户会话已过期时显示。"}}}},R={args:e.forbidden,parameters:{docs:{description:{story:"用户无权访问资源时显示。"}}}},B={args:e.not_found,parameters:{docs:{description:{story:"页面或资源不存在时显示。"}}}},F={args:e.server_error,parameters:{docs:{description:{story:"服务器内部错误时显示。"}}}},L={args:e.network_error,parameters:{docs:{description:{story:"网络连接失败时显示。"}}}},E={args:e.maintenance,parameters:{docs:{description:{story:"系统维护期间显示。"}}}},w={args:{type:"error",title:"这是一个非常非常非常非常非常非常非常非常非常长的错误标题",message:"错误消息",actionLabel:"返回",actionHref:"/"}},x={args:{type:"error",title:"错误",message:"这是一个非常非常非常非常非常非常非常非常非常长的错误消息。它包含了大量的文本内容，用于测试组件如何处理长文本。在实际应用中，错误消息可能会包含详细的错误信息、建议的解决方案以及相关的帮助链接等内容。",actionLabel:"返回",actionHref:"/",showBackButton:!0}};s.parameters={...s.parameters,docs:{...(O=s.parameters)===null||O===void 0?void 0:O.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "出错了",
    message: "发生了意外错误，请稍后重试。",
    actionLabel: "返回首页",
    actionHref: "/"
  }
}`,...(C=s.parameters)===null||C===void 0||(k=C.docs)===null||k===void 0?void 0:k.source}}};o.parameters={...o.parameters,docs:{...(H=o.parameters)===null||H===void 0?void 0:H.docs,source:{originalSource:`{
  args: {
    type: "warning",
    title: "需要注意",
    message: "此操作需要您的确认。",
    actionLabel: "继续",
    actionHref: "/"
  }
}`,...(G=o.parameters)===null||G===void 0||(I=G.docs)===null||I===void 0?void 0:I.source}}};t.parameters={...t.parameters,docs:{...(j=t.parameters)===null||j===void 0?void 0:j.docs,source:{originalSource:`{
  args: {
    type: "info",
    title: "温馨提示",
    message: "这是一条重要信息。",
    actionLabel: "了解更多",
    actionHref: "/"
  }
}`,...(T=t.parameters)===null||T===void 0||(P=T.docs)===null||P===void 0?void 0:P.source}}};n.parameters={...n.parameters,docs:{...(M=n.parameters)===null||M===void 0?void 0:M.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "操作失败",
    message: "无法完成该操作，请返回上一页重试。",
    actionLabel: "返回首页",
    actionHref: "/",
    showBackButton: true
  }
}`,...(D=n.parameters)===null||D===void 0||(z=D.docs)===null||z===void 0?void 0:z.source}}};i.parameters={...i.parameters,docs:{...(U=i.parameters)===null||U===void 0?void 0:U.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.missing_flight,
  parameters: {
    docs: {
      description: {
        story: "用户未选择航班就尝试进入预订流程时显示。"
      }
    }
  }
}`,...(q=i.parameters)===null||q===void 0||(W=q.docs)===null||W===void 0?void 0:W.source}}};d.parameters={...d.parameters,docs:{...(A=d.parameters)===null||A===void 0?void 0:A.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.flight_not_found,
  parameters: {
    docs: {
      description: {
        story: "选择的航班已不存在或被取消时显示。"
      }
    }
  }
}`,...(X=d.parameters)===null||X===void 0||(V=X.docs)===null||V===void 0?void 0:V.source}}};c.parameters={...c.parameters,docs:{...($=c.parameters)===null||$===void 0?void 0:$.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.no_search_results,
  parameters: {
    docs: {
      description: {
        story: "搜索未找到任何符合条件的航班时显示。"
      }
    }
  }
}`,...(K=c.parameters)===null||K===void 0||(J=K.docs)===null||J===void 0?void 0:J.source}}};l.parameters={...l.parameters,docs:{...(Q=l.parameters)===null||Q===void 0?void 0:Q.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.invalid_search_params,
  parameters: {
    docs: {
      description: {
        story: "搜索参数不完整或格式错误时显示。"
      }
    }
  }
}`,...(Z=l.parameters)===null||Z===void 0||(Y=Z.docs)===null||Y===void 0?void 0:Y.source}}};p.parameters={...p.parameters,docs:{...(ee=p.parameters)===null||ee===void 0?void 0:ee.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.booking_failed,
  parameters: {
    docs: {
      description: {
        story: "预订过程中发生错误时显示。"
      }
    }
  }
}`,...(ae=p.parameters)===null||ae===void 0||(re=ae.docs)===null||re===void 0?void 0:re.source}}};m.parameters={...m.parameters,docs:{...(se=m.parameters)===null||se===void 0?void 0:se.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.seat_unavailable,
  parameters: {
    docs: {
      description: {
        story: "选择的舱位座位已满时显示。"
      }
    }
  }
}`,...(te=m.parameters)===null||te===void 0||(oe=te.docs)===null||oe===void 0?void 0:oe.source}}};u.parameters={...u.parameters,docs:{...(ne=u.parameters)===null||ne===void 0?void 0:ne.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.passenger_limit_exceeded,
  parameters: {
    docs: {
      description: {
        story: "乘客数量超过单次预订限制时显示。"
      }
    }
  }
}`,...(de=u.parameters)===null||de===void 0||(ie=de.docs)===null||ie===void 0?void 0:ie.source}}};_.parameters={..._.parameters,docs:{...(ce=_.parameters)===null||ce===void 0?void 0:ce.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.payment_failed,
  parameters: {
    docs: {
      description: {
        story: "支付处理失败时显示。"
      }
    }
  }
}`,...(pe=_.parameters)===null||pe===void 0||(le=pe.docs)===null||le===void 0?void 0:le.source}}};g.parameters={...g.parameters,docs:{...(me=g.parameters)===null||me===void 0?void 0:me.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.insufficient_balance,
  parameters: {
    docs: {
      description: {
        story: "账户余额不足以完成支付时显示。"
      }
    }
  }
}`,...(_e=g.parameters)===null||_e===void 0||(ue=_e.docs)===null||ue===void 0?void 0:ue.source}}};v.parameters={...v.parameters,docs:{...(ge=v.parameters)===null||ge===void 0?void 0:ge.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.payment_timeout,
  parameters: {
    docs: {
      description: {
        story: "支付超时，订单已取消时显示。"
      }
    }
  }
}`,...(fe=v.parameters)===null||fe===void 0||(ve=fe.docs)===null||ve===void 0?void 0:ve.source}}};f.parameters={...f.parameters,docs:{...(ye=f.parameters)===null||ye===void 0?void 0:ye.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_not_found,
  parameters: {
    docs: {
      description: {
        story: "订单不存在或用户无权访问时显示。"
      }
    }
  }
}`,...(be=f.parameters)===null||be===void 0||(he=be.docs)===null||he===void 0?void 0:he.source}}};y.parameters={...y.parameters,docs:{...(Se=y.parameters)===null||Se===void 0?void 0:Se.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_expired,
  parameters: {
    docs: {
      description: {
        story: "订单支付时限已过时显示。"
      }
    }
  }
}`,...(Be=y.parameters)===null||Be===void 0||(Re=Be.docs)===null||Re===void 0?void 0:Re.source}}};h.parameters={...h.parameters,docs:{...(Fe=h.parameters)===null||Fe===void 0?void 0:Fe.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_cancelled,
  parameters: {
    docs: {
      description: {
        story: "订单已被取消时显示。"
      }
    }
  }
}`,...(Ee=h.parameters)===null||Ee===void 0||(Le=Ee.docs)===null||Le===void 0?void 0:Le.source}}};b.parameters={...b.parameters,docs:{...(we=b.parameters)===null||we===void 0?void 0:we.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.unauthorized,
  parameters: {
    docs: {
      description: {
        story: "需要登录才能访问页面时显示。"
      }
    }
  }
}`,...(Ne=b.parameters)===null||Ne===void 0||(xe=Ne.docs)===null||xe===void 0?void 0:xe.source}}};S.parameters={...S.parameters,docs:{...(Oe=S.parameters)===null||Oe===void 0?void 0:Oe.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.session_expired,
  parameters: {
    docs: {
      description: {
        story: "用户会话已过期时显示。"
      }
    }
  }
}`,...(Ce=S.parameters)===null||Ce===void 0||(ke=Ce.docs)===null||ke===void 0?void 0:ke.source}}};R.parameters={...R.parameters,docs:{...(He=R.parameters)===null||He===void 0?void 0:He.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.forbidden,
  parameters: {
    docs: {
      description: {
        story: "用户无权访问资源时显示。"
      }
    }
  }
}`,...(Ge=R.parameters)===null||Ge===void 0||(Ie=Ge.docs)===null||Ie===void 0?void 0:Ie.source}}};B.parameters={...B.parameters,docs:{...(je=B.parameters)===null||je===void 0?void 0:je.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.not_found,
  parameters: {
    docs: {
      description: {
        story: "页面或资源不存在时显示。"
      }
    }
  }
}`,...(Te=B.parameters)===null||Te===void 0||(Pe=Te.docs)===null||Pe===void 0?void 0:Pe.source}}};F.parameters={...F.parameters,docs:{...(Me=F.parameters)===null||Me===void 0?void 0:Me.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.server_error,
  parameters: {
    docs: {
      description: {
        story: "服务器内部错误时显示。"
      }
    }
  }
}`,...(De=F.parameters)===null||De===void 0||(ze=De.docs)===null||ze===void 0?void 0:ze.source}}};L.parameters={...L.parameters,docs:{...(Ue=L.parameters)===null||Ue===void 0?void 0:Ue.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.network_error,
  parameters: {
    docs: {
      description: {
        story: "网络连接失败时显示。"
      }
    }
  }
}`,...(qe=L.parameters)===null||qe===void 0||(We=qe.docs)===null||We===void 0?void 0:We.source}}};E.parameters={...E.parameters,docs:{...(Ae=E.parameters)===null||Ae===void 0?void 0:Ae.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.maintenance,
  parameters: {
    docs: {
      description: {
        story: "系统维护期间显示。"
      }
    }
  }
}`,...(Xe=E.parameters)===null||Xe===void 0||(Ve=Xe.docs)===null||Ve===void 0?void 0:Ve.source}}};w.parameters={...w.parameters,docs:{...($e=w.parameters)===null||$e===void 0?void 0:$e.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "这是一个非常非常非常非常非常非常非常非常非常长的错误标题",
    message: "错误消息",
    actionLabel: "返回",
    actionHref: "/"
  }
}`,...(Ke=w.parameters)===null||Ke===void 0||(Je=Ke.docs)===null||Je===void 0?void 0:Je.source}}};x.parameters={...x.parameters,docs:{...(Qe=x.parameters)===null||Qe===void 0?void 0:Qe.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "错误",
    message: "这是一个非常非常非常非常非常非常非常非常非常长的错误消息。它包含了大量的文本内容，用于测试组件如何处理长文本。在实际应用中，错误消息可能会包含详细的错误信息、建议的解决方案以及相关的帮助链接等内容。",
    actionLabel: "返回",
    actionHref: "/",
    showBackButton: true
  }
}`,...(Ze=x.parameters)===null||Ze===void 0||(Ye=Ze.docs)===null||Ye===void 0?void 0:Ye.source}}};const Ur=["DefaultError","Warning","Info","WithBackButton","MissingFlight","FlightNotFound","NoSearchResults","InvalidSearchParams","BookingFailed","SeatUnavailable","PassengerLimitExceeded","PaymentFailed","InsufficientBalance","PaymentTimeout","OrderNotFound","OrderExpired","OrderCancelled","Unauthorized","SessionExpired","Forbidden","NotFound","ServerError","NetworkError","Maintenance","LongTitle","LongMessage"];export{p as BookingFailed,s as DefaultError,d as FlightNotFound,R as Forbidden,t as Info,g as InsufficientBalance,l as InvalidSearchParams,x as LongMessage,w as LongTitle,E as Maintenance,i as MissingFlight,L as NetworkError,c as NoSearchResults,B as NotFound,h as OrderCancelled,y as OrderExpired,f as OrderNotFound,u as PassengerLimitExceeded,_ as PaymentFailed,v as PaymentTimeout,m as SeatUnavailable,F as ServerError,S as SessionExpired,b as Unauthorized,o as Warning,n as WithBackButton,Ur as __namedExportsOrder,Dr as default};
