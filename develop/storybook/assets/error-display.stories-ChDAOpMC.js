import"./iframe-CrLPMyef.js";import"./button-C49Jt41H.js";import"./hover-card-BklXiGaj.js";import"./separator-BFZTMdF7.js";import"./input-CBtiA9j3.js";import"./skeleton-CSGTgFG_.js";import"./tooltip-oeX-QRYP.js";import{E as Ye}from"./under-construction-BTIeiZNS.js";import"./alert-dialog-BDRb33ee.js";import"./checkbox-hlzRasDL.js";import"./avatar-BHA4ec1X.js";import"./badge-DRbaR9p2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CCw5U8u4.js";import"./createLucideIcon-DzaTpkcS.js";import"./index-B2BMd2ZM.js";import"./index-DLC0D_9l.js";import"./index-Bzbtinzm.js";import"./index-3_PNoCtV.js";import"./index-DBYj_96i.js";import"./index-E-CxifyW.js";import"./index-B9BpXIRB.js";import"./index-DCZN-NHZ.js";import"./chevron-right-DL81nGtS.js";import"./platform-DKvuCmmd.js";import"./alert-Dl9eybxG.js";import"./card-D-d6dHIy.js";import"./circle-alert-Dy3v6eT1.js";import"./circle-x-B6KCtiih.js";import"./index-BmOx0rIh.js";import"./index-CXICuE6m.js";import"./check-DD9V9MZB.js";const Ze={unauthorized:{type:"warning",title:"需要登录",message:"请登录后访问此页面。",actionLabel:"立即登录",actionHref:"/auth/sign-in"},session_expired:{type:"warning",title:"会话已过期",message:"您的登录会话已过期，请重新登录。",actionLabel:"重新登录",actionHref:"/auth/sign-in"},forbidden:{type:"error",title:"访问被拒绝",message:"您没有权限访问此资源。",actionLabel:"返回首页",actionHref:"/"},invalid_credentials:{type:"error",title:"登录失败",message:"用户名或密码错误，请重试。",actionLabel:"重新登录",actionHref:"/auth/sign-in"}},$e={missing_seat_class:{type:"warning",title:"未选择舱位",message:"请选择舱位后继续预订。",actionLabel:"选择舱位",actionHref:"/flights/search",showBackButton:!0},booking_failed:{type:"error",title:"预订失败",message:"无法完成您的预订。请重试或联系客服。",actionLabel:"重试",actionHref:"/flights",showBackButton:!0},seat_unavailable:{type:"warning",title:"座位已满",message:"您选择的舱位座位已售罄，请选择其他舱位或航班。",actionLabel:"重新选择",actionHref:"/flights/search"},passenger_limit_exceeded:{type:"warning",title:"乘客数量超限",message:"单次预订最多支持9名乘客。",actionLabel:"返回",actionHref:"/flights/booking/passengers",showBackButton:!0},invalid_passenger_info:{type:"warning",title:"乘客信息不完整",message:"请填写完整的乘客信息后继续。",actionLabel:"返回填写",actionHref:"/flights/booking/passengers",showBackButton:!0},order_not_found:{type:"error",title:"订单不存在",message:"未找到该订单，或您没有访问权限。",actionLabel:"我的订单",actionHref:"/orders"},order_expired:{type:"warning",title:"订单已过期",message:"该订单支付时限已过，请重新预订。",actionLabel:"重新预订",actionHref:"/flights"},order_cancelled:{type:"info",title:"订单已取消",message:"该订单已被取消。",actionLabel:"返回首页",actionHref:"/"},invalid_order_status:{type:"warning",title:"订单状态异常",message:"当前订单状态不允许此操作。",actionLabel:"查看订单",actionHref:"/orders"},missing_order_id:{type:"warning",title:"订单信息缺失",message:"未找到订单信息，请返回上一步。",actionLabel:"返回",actionHref:"/flights/booking/passengers",showBackButton:!0},payment_failed:{type:"error",title:"支付失败",message:"支付处理失败，请检查支付信息后重试。",actionLabel:"返回支付",actionHref:"/flights/booking/payment",showBackButton:!0},payment_timeout:{type:"warning",title:"支付超时",message:"支付时间已超时，订单已自动取消。",actionLabel:"重新预订",actionHref:"/flights"},insufficient_balance:{type:"warning",title:"余额不足",message:"您的账户余额不足，请选择其他支付方式或充值后重试。",actionLabel:"返回支付",actionHref:"/flights/booking/payment",showBackButton:!0},payment_deadline_passed:{type:"warning",title:"支付截止时间已过",message:"该订单的支付截止时间已过，订单已自动取消。",actionLabel:"重新预订",actionHref:"/flights"},duplicate_booking:{type:"warning",title:"重复预订",message:"您已经预订过此航班，请勿重复提交。",actionLabel:"查看订单",actionHref:"/orders"}},er={not_found:{type:"info",title:"页面不存在",message:"您访问的页面不存在或已被移除。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0},server_error:{type:"error",title:"服务器错误",message:"服务器遇到错误，请稍后重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0},network_error:{type:"error",title:"网络错误",message:"网络连接失败，请检查您的网络连接后重试。",actionLabel:"重试",actionHref:"/",showBackButton:!0},maintenance:{type:"info",title:"系统维护中",message:"系统正在维护，预计将在短时间内恢复。给您带来不便，敬请谅解。",actionLabel:"返回首页",actionHref:"/"},rate_limit_exceeded:{type:"warning",title:"操作过于频繁",message:"您的操作过于频繁，请稍后再试。",actionLabel:"返回",actionHref:"/",showBackButton:!0},invalid_data:{type:"warning",title:"数据格式错误",message:"提交的数据格式不正确，请检查后重试。",actionLabel:"返回",actionHref:"/",showBackButton:!0}},rr={missing_flight:{type:"warning",title:"未选择航班",message:"请先选择航班后再进入预订流程。",actionLabel:"搜索航班",actionHref:"/flights",showBackButton:!0},flight_not_found:{type:"error",title:"航班不存在",message:"您选择的航班已不存在，可能已售罄或被取消。",actionLabel:"重新搜索",actionHref:"/flights"},no_search_results:{type:"info",title:"未找到航班",message:"抱歉，没有找到符合条件的航班。请尝试调整搜索条件。",actionLabel:"修改搜索",actionHref:"/flights",showBackButton:!0},invalid_search_params:{type:"warning",title:"搜索参数无效",message:"搜索参数不完整或无效，请重新填写搜索条件。",actionLabel:"返回搜索",actionHref:"/flights"},search_failed:{type:"error",title:"搜索失败",message:"航班搜索服务暂时不可用，请稍后重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0}},e={...er,...Ze,...$e,...rr};var L,k,w,N,H,I,C,x,G,P,M,T,U,W,z,D,j,q,A,J,K,Q,V,X,Y,Z,$,ee,re,ae,oe,se,te,ne,ie,de,ce,le,pe,me,_e,ue,ge,ve,fe,ye,he,Se,be,Re,Fe,Ee,Be,Oe,Le,ke,we,Ne,He,Ie,Ce,xe,Ge,Pe,Me,Te,Ue,We,ze,De,je,qe,Ae,Je,Ke,Qe,Ve,Xe;const xr={title:"Common/ErrorDisplay",component:Ye,parameters:{layout:"fullscreen"},tags:["autodocs"]},r={args:{type:"error",title:"出错了",message:"发生了意外错误，请稍后重试。",actionLabel:"返回首页",actionHref:"/"}},a={args:{type:"warning",title:"需要注意",message:"此操作需要您的确认。",actionLabel:"继续",actionHref:"/"}},o={args:{type:"info",title:"温馨提示",message:"这是一条重要信息。",actionLabel:"了解更多",actionHref:"/"}},s={args:{type:"error",title:"操作失败",message:"无法完成该操作，请返回上一页重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0}},t={args:e.missing_flight,parameters:{docs:{description:{story:"用户未选择航班就尝试进入预订流程时显示。"}}}},n={args:e.flight_not_found,parameters:{docs:{description:{story:"选择的航班已不存在或被取消时显示。"}}}},i={args:e.no_search_results,parameters:{docs:{description:{story:"搜索未找到任何符合条件的航班时显示。"}}}},d={args:e.invalid_search_params,parameters:{docs:{description:{story:"搜索参数不完整或格式错误时显示。"}}}},c={args:e.booking_failed,parameters:{docs:{description:{story:"预订过程中发生错误时显示。"}}}},l={args:e.seat_unavailable,parameters:{docs:{description:{story:"选择的舱位座位已满时显示。"}}}},p={args:e.passenger_limit_exceeded,parameters:{docs:{description:{story:"乘客数量超过单次预订限制时显示。"}}}},m={args:e.payment_failed,parameters:{docs:{description:{story:"支付处理失败时显示。"}}}},_={args:e.insufficient_balance,parameters:{docs:{description:{story:"账户余额不足以完成支付时显示。"}}}},u={args:e.payment_timeout,parameters:{docs:{description:{story:"支付超时，订单已取消时显示。"}}}},g={args:e.order_not_found,parameters:{docs:{description:{story:"订单不存在或用户无权访问时显示。"}}}},v={args:e.order_expired,parameters:{docs:{description:{story:"订单支付时限已过时显示。"}}}},f={args:e.order_cancelled,parameters:{docs:{description:{story:"订单已被取消时显示。"}}}},y={args:e.unauthorized,parameters:{docs:{description:{story:"需要登录才能访问页面时显示。"}}}},h={args:e.session_expired,parameters:{docs:{description:{story:"用户会话已过期时显示。"}}}},S={args:e.forbidden,parameters:{docs:{description:{story:"用户无权访问资源时显示。"}}}},b={args:e.not_found,parameters:{docs:{description:{story:"页面或资源不存在时显示。"}}}},R={args:e.server_error,parameters:{docs:{description:{story:"服务器内部错误时显示。"}}}},F={args:e.network_error,parameters:{docs:{description:{story:"网络连接失败时显示。"}}}},E={args:e.maintenance,parameters:{docs:{description:{story:"系统维护期间显示。"}}}},B={args:{type:"error",title:"这是一个非常非常非常非常非常非常非常非常非常长的错误标题",message:"错误消息",actionLabel:"返回",actionHref:"/"}},O={args:{type:"error",title:"错误",message:"这是一个非常非常非常非常非常非常非常非常非常长的错误消息。它包含了大量的文本内容，用于测试组件如何处理长文本。在实际应用中，错误消息可能会包含详细的错误信息、建议的解决方案以及相关的帮助链接等内容。",actionLabel:"返回",actionHref:"/",showBackButton:!0}};r.parameters={...r.parameters,docs:{...(L=r.parameters)===null||L===void 0?void 0:L.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "出错了",
    message: "发生了意外错误，请稍后重试。",
    actionLabel: "返回首页",
    actionHref: "/"
  }
}`,...(w=r.parameters)===null||w===void 0||(k=w.docs)===null||k===void 0?void 0:k.source}}};a.parameters={...a.parameters,docs:{...(N=a.parameters)===null||N===void 0?void 0:N.docs,source:{originalSource:`{
  args: {
    type: "warning",
    title: "需要注意",
    message: "此操作需要您的确认。",
    actionLabel: "继续",
    actionHref: "/"
  }
}`,...(I=a.parameters)===null||I===void 0||(H=I.docs)===null||H===void 0?void 0:H.source}}};o.parameters={...o.parameters,docs:{...(C=o.parameters)===null||C===void 0?void 0:C.docs,source:{originalSource:`{
  args: {
    type: "info",
    title: "温馨提示",
    message: "这是一条重要信息。",
    actionLabel: "了解更多",
    actionHref: "/"
  }
}`,...(G=o.parameters)===null||G===void 0||(x=G.docs)===null||x===void 0?void 0:x.source}}};s.parameters={...s.parameters,docs:{...(P=s.parameters)===null||P===void 0?void 0:P.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "操作失败",
    message: "无法完成该操作，请返回上一页重试。",
    actionLabel: "返回首页",
    actionHref: "/",
    showBackButton: true
  }
}`,...(T=s.parameters)===null||T===void 0||(M=T.docs)===null||M===void 0?void 0:M.source}}};t.parameters={...t.parameters,docs:{...(U=t.parameters)===null||U===void 0?void 0:U.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.missing_flight,
  parameters: {
    docs: {
      description: {
        story: "用户未选择航班就尝试进入预订流程时显示。"
      }
    }
  }
}`,...(z=t.parameters)===null||z===void 0||(W=z.docs)===null||W===void 0?void 0:W.source}}};n.parameters={...n.parameters,docs:{...(D=n.parameters)===null||D===void 0?void 0:D.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.flight_not_found,
  parameters: {
    docs: {
      description: {
        story: "选择的航班已不存在或被取消时显示。"
      }
    }
  }
}`,...(q=n.parameters)===null||q===void 0||(j=q.docs)===null||j===void 0?void 0:j.source}}};i.parameters={...i.parameters,docs:{...(A=i.parameters)===null||A===void 0?void 0:A.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.no_search_results,
  parameters: {
    docs: {
      description: {
        story: "搜索未找到任何符合条件的航班时显示。"
      }
    }
  }
}`,...(K=i.parameters)===null||K===void 0||(J=K.docs)===null||J===void 0?void 0:J.source}}};d.parameters={...d.parameters,docs:{...(Q=d.parameters)===null||Q===void 0?void 0:Q.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.invalid_search_params,
  parameters: {
    docs: {
      description: {
        story: "搜索参数不完整或格式错误时显示。"
      }
    }
  }
}`,...(X=d.parameters)===null||X===void 0||(V=X.docs)===null||V===void 0?void 0:V.source}}};c.parameters={...c.parameters,docs:{...(Y=c.parameters)===null||Y===void 0?void 0:Y.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.booking_failed,
  parameters: {
    docs: {
      description: {
        story: "预订过程中发生错误时显示。"
      }
    }
  }
}`,...($=c.parameters)===null||$===void 0||(Z=$.docs)===null||Z===void 0?void 0:Z.source}}};l.parameters={...l.parameters,docs:{...(ee=l.parameters)===null||ee===void 0?void 0:ee.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.seat_unavailable,
  parameters: {
    docs: {
      description: {
        story: "选择的舱位座位已满时显示。"
      }
    }
  }
}`,...(ae=l.parameters)===null||ae===void 0||(re=ae.docs)===null||re===void 0?void 0:re.source}}};p.parameters={...p.parameters,docs:{...(oe=p.parameters)===null||oe===void 0?void 0:oe.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.passenger_limit_exceeded,
  parameters: {
    docs: {
      description: {
        story: "乘客数量超过单次预订限制时显示。"
      }
    }
  }
}`,...(te=p.parameters)===null||te===void 0||(se=te.docs)===null||se===void 0?void 0:se.source}}};m.parameters={...m.parameters,docs:{...(ne=m.parameters)===null||ne===void 0?void 0:ne.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.payment_failed,
  parameters: {
    docs: {
      description: {
        story: "支付处理失败时显示。"
      }
    }
  }
}`,...(de=m.parameters)===null||de===void 0||(ie=de.docs)===null||ie===void 0?void 0:ie.source}}};_.parameters={..._.parameters,docs:{...(ce=_.parameters)===null||ce===void 0?void 0:ce.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.insufficient_balance,
  parameters: {
    docs: {
      description: {
        story: "账户余额不足以完成支付时显示。"
      }
    }
  }
}`,...(pe=_.parameters)===null||pe===void 0||(le=pe.docs)===null||le===void 0?void 0:le.source}}};u.parameters={...u.parameters,docs:{...(me=u.parameters)===null||me===void 0?void 0:me.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.payment_timeout,
  parameters: {
    docs: {
      description: {
        story: "支付超时，订单已取消时显示。"
      }
    }
  }
}`,...(ue=u.parameters)===null||ue===void 0||(_e=ue.docs)===null||_e===void 0?void 0:_e.source}}};g.parameters={...g.parameters,docs:{...(ge=g.parameters)===null||ge===void 0?void 0:ge.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_not_found,
  parameters: {
    docs: {
      description: {
        story: "订单不存在或用户无权访问时显示。"
      }
    }
  }
}`,...(fe=g.parameters)===null||fe===void 0||(ve=fe.docs)===null||ve===void 0?void 0:ve.source}}};v.parameters={...v.parameters,docs:{...(ye=v.parameters)===null||ye===void 0?void 0:ye.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_expired,
  parameters: {
    docs: {
      description: {
        story: "订单支付时限已过时显示。"
      }
    }
  }
}`,...(Se=v.parameters)===null||Se===void 0||(he=Se.docs)===null||he===void 0?void 0:he.source}}};f.parameters={...f.parameters,docs:{...(be=f.parameters)===null||be===void 0?void 0:be.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_cancelled,
  parameters: {
    docs: {
      description: {
        story: "订单已被取消时显示。"
      }
    }
  }
}`,...(Fe=f.parameters)===null||Fe===void 0||(Re=Fe.docs)===null||Re===void 0?void 0:Re.source}}};y.parameters={...y.parameters,docs:{...(Ee=y.parameters)===null||Ee===void 0?void 0:Ee.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.unauthorized,
  parameters: {
    docs: {
      description: {
        story: "需要登录才能访问页面时显示。"
      }
    }
  }
}`,...(Oe=y.parameters)===null||Oe===void 0||(Be=Oe.docs)===null||Be===void 0?void 0:Be.source}}};h.parameters={...h.parameters,docs:{...(Le=h.parameters)===null||Le===void 0?void 0:Le.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.session_expired,
  parameters: {
    docs: {
      description: {
        story: "用户会话已过期时显示。"
      }
    }
  }
}`,...(we=h.parameters)===null||we===void 0||(ke=we.docs)===null||ke===void 0?void 0:ke.source}}};S.parameters={...S.parameters,docs:{...(Ne=S.parameters)===null||Ne===void 0?void 0:Ne.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.forbidden,
  parameters: {
    docs: {
      description: {
        story: "用户无权访问资源时显示。"
      }
    }
  }
}`,...(Ie=S.parameters)===null||Ie===void 0||(He=Ie.docs)===null||He===void 0?void 0:He.source}}};b.parameters={...b.parameters,docs:{...(Ce=b.parameters)===null||Ce===void 0?void 0:Ce.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.not_found,
  parameters: {
    docs: {
      description: {
        story: "页面或资源不存在时显示。"
      }
    }
  }
}`,...(Ge=b.parameters)===null||Ge===void 0||(xe=Ge.docs)===null||xe===void 0?void 0:xe.source}}};R.parameters={...R.parameters,docs:{...(Pe=R.parameters)===null||Pe===void 0?void 0:Pe.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.server_error,
  parameters: {
    docs: {
      description: {
        story: "服务器内部错误时显示。"
      }
    }
  }
}`,...(Te=R.parameters)===null||Te===void 0||(Me=Te.docs)===null||Me===void 0?void 0:Me.source}}};F.parameters={...F.parameters,docs:{...(Ue=F.parameters)===null||Ue===void 0?void 0:Ue.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.network_error,
  parameters: {
    docs: {
      description: {
        story: "网络连接失败时显示。"
      }
    }
  }
}`,...(ze=F.parameters)===null||ze===void 0||(We=ze.docs)===null||We===void 0?void 0:We.source}}};E.parameters={...E.parameters,docs:{...(De=E.parameters)===null||De===void 0?void 0:De.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.maintenance,
  parameters: {
    docs: {
      description: {
        story: "系统维护期间显示。"
      }
    }
  }
}`,...(qe=E.parameters)===null||qe===void 0||(je=qe.docs)===null||je===void 0?void 0:je.source}}};B.parameters={...B.parameters,docs:{...(Ae=B.parameters)===null||Ae===void 0?void 0:Ae.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "这是一个非常非常非常非常非常非常非常非常非常长的错误标题",
    message: "错误消息",
    actionLabel: "返回",
    actionHref: "/"
  }
}`,...(Ke=B.parameters)===null||Ke===void 0||(Je=Ke.docs)===null||Je===void 0?void 0:Je.source}}};O.parameters={...O.parameters,docs:{...(Qe=O.parameters)===null||Qe===void 0?void 0:Qe.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "错误",
    message: "这是一个非常非常非常非常非常非常非常非常非常长的错误消息。它包含了大量的文本内容，用于测试组件如何处理长文本。在实际应用中，错误消息可能会包含详细的错误信息、建议的解决方案以及相关的帮助链接等内容。",
    actionLabel: "返回",
    actionHref: "/",
    showBackButton: true
  }
}`,...(Xe=O.parameters)===null||Xe===void 0||(Ve=Xe.docs)===null||Ve===void 0?void 0:Ve.source}}};const Gr=["DefaultError","Warning","Info","WithBackButton","MissingFlight","FlightNotFound","NoSearchResults","InvalidSearchParams","BookingFailed","SeatUnavailable","PassengerLimitExceeded","PaymentFailed","InsufficientBalance","PaymentTimeout","OrderNotFound","OrderExpired","OrderCancelled","Unauthorized","SessionExpired","Forbidden","NotFound","ServerError","NetworkError","Maintenance","LongTitle","LongMessage"];export{c as BookingFailed,r as DefaultError,n as FlightNotFound,S as Forbidden,o as Info,_ as InsufficientBalance,d as InvalidSearchParams,O as LongMessage,B as LongTitle,E as Maintenance,t as MissingFlight,F as NetworkError,i as NoSearchResults,b as NotFound,f as OrderCancelled,v as OrderExpired,g as OrderNotFound,p as PassengerLimitExceeded,m as PaymentFailed,u as PaymentTimeout,l as SeatUnavailable,R as ServerError,h as SessionExpired,y as Unauthorized,a as Warning,s as WithBackButton,Gr as __namedExportsOrder,xr as default};
