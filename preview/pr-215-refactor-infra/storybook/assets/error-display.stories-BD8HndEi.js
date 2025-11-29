import{j as r}from"./iframe-BRgbNqLm.js";import{L as z}from"./link-DJM2q87f.js";import{A as D,b as M,a as P}from"./alert-DzX7jO94.js";import{B as E}from"./button-XEp2VeJS.js";import{C as q,b as A,c as U,d as V,a as W,e as X}from"./card-XrV2xzAV.js";import{C as $}from"./circle-alert-CHCs6aZu.js";import{C as J}from"./circle-x-CyB27sJu.js";import{c as K}from"./createLucideIcon-CeCL99oA.js";import"./preload-helper-PPVm8Dsz.js";import"./use-merged-ref-CSO1AP9r.js";import"./index-CdJFUDDL.js";import"./utils-CBfrqCZ4.js";import"./index-D63BWAbV.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Y=K("triangle-alert",Q);function v({type:a="warning",title:F,message:I,actionLabel:G="Go Back",actionHref:j="/",showBackButton:T=!1}){const C={warning:Y,error:J,info:$}[a],N=a==="error";return r.jsx("div",{className:"container mx-auto px-4 py-16",children:r.jsxs(q,{className:"max-w-md mx-auto",children:[r.jsxs(A,{className:"text-center pb-4",children:[r.jsx("div",{className:"flex justify-center mb-4",children:r.jsx("div",{className:`rounded-full p-3 ${N?"bg-destructive/10 text-destructive":"bg-primary/10 text-primary"}`,children:r.jsx(C,{className:"size-8"})})}),r.jsx(U,{className:"text-2xl",children:F}),r.jsx(V,{className:"text-base pt-2",children:I})]}),r.jsx(W,{className:"pb-4",children:r.jsxs(D,{variant:N?"destructive":"default",children:[r.jsx(C,{}),r.jsx(M,{children:a==="error"?"错误详情":a==="warning"?"重要提示":"温馨提示"}),r.jsx(P,{children:a==="error"?"发生了意外错误。请重试，如问题持续请联系客服。":a==="warning"?"此操作需要您的注意，请仔细查看后继续。":"请仔细阅读以上信息。"})]})}),r.jsxs(X,{className:"flex gap-3 justify-center",children:[T&&r.jsx(E,{variant:"outline",size:"lg",onClick:()=>window.history.back(),children:"返回上一页"}),r.jsx(E,{variant:N?"destructive":"default",size:"lg",asChild:!0,children:r.jsx(z,{href:j,children:G})})]})]})})}v.__docgenInfo={description:"",methods:[],displayName:"ErrorDisplay",props:{type:{required:!1,tsType:{name:"union",raw:'"warning" | "error" | "info"',elements:[{name:"literal",value:'"warning"'},{name:"literal",value:'"error"'},{name:"literal",value:'"info"'}]},description:"",defaultValue:{value:'"warning"',computed:!1}},title:{required:!0,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:""},actionLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Go Back"',computed:!1}},actionHref:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"/"',computed:!1}},showBackButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Z={unauthorized:{type:"warning",title:"需要登录",message:"请登录后访问此页面。",actionLabel:"立即登录",actionHref:"/auth/sign-in"},session_expired:{type:"warning",title:"会话已过期",message:"您的登录会话已过期，请重新登录。",actionLabel:"重新登录",actionHref:"/auth/sign-in"},forbidden:{type:"error",title:"访问被拒绝",message:"您没有权限访问此资源。",actionLabel:"返回首页",actionHref:"/"},invalid_credentials:{type:"error",title:"登录失败",message:"用户名或密码错误，请重试。",actionLabel:"重新登录",actionHref:"/auth/sign-in"}},ee={missing_seat_class:{type:"warning",title:"未选择舱位",message:"请选择舱位后继续预订。",actionLabel:"选择舱位",actionHref:"/flights/search",showBackButton:!0},booking_failed:{type:"error",title:"预订失败",message:"无法完成您的预订。请重试或联系客服。",actionLabel:"重试",actionHref:"/flights",showBackButton:!0},seat_unavailable:{type:"warning",title:"座位已满",message:"您选择的舱位座位已售罄，请选择其他舱位或航班。",actionLabel:"重新选择",actionHref:"/flights/search"},passenger_limit_exceeded:{type:"warning",title:"乘客数量超限",message:"单次预订最多支持9名乘客。",actionLabel:"返回",actionHref:"/flights/booking/passengers",showBackButton:!0},invalid_passenger_info:{type:"warning",title:"乘客信息不完整",message:"请填写完整的乘客信息后继续。",actionLabel:"返回填写",actionHref:"/flights/booking/passengers",showBackButton:!0},order_not_found:{type:"error",title:"订单不存在",message:"未找到该订单，或您没有访问权限。",actionLabel:"我的订单",actionHref:"/orders"},order_expired:{type:"warning",title:"订单已过期",message:"该订单支付时限已过，请重新预订。",actionLabel:"重新预订",actionHref:"/flights"},order_cancelled:{type:"info",title:"订单已取消",message:"该订单已被取消。",actionLabel:"返回首页",actionHref:"/"},invalid_order_status:{type:"warning",title:"订单状态异常",message:"当前订单状态不允许此操作。",actionLabel:"查看订单",actionHref:"/orders"},missing_order_id:{type:"warning",title:"订单信息缺失",message:"未找到订单信息，请返回上一步。",actionLabel:"返回",actionHref:"/flights/booking/passengers",showBackButton:!0},payment_failed:{type:"error",title:"支付失败",message:"支付处理失败，请检查支付信息后重试。",actionLabel:"返回支付",actionHref:"/flights/booking/payment",showBackButton:!0},payment_timeout:{type:"warning",title:"支付超时",message:"支付时间已超时，订单已自动取消。",actionLabel:"重新预订",actionHref:"/flights"},insufficient_balance:{type:"warning",title:"余额不足",message:"您的账户余额不足，请选择其他支付方式或充值后重试。",actionLabel:"返回支付",actionHref:"/flights/booking/payment",showBackButton:!0},payment_deadline_passed:{type:"warning",title:"支付截止时间已过",message:"该订单的支付截止时间已过，订单已自动取消。",actionLabel:"重新预订",actionHref:"/flights"},duplicate_booking:{type:"warning",title:"重复预订",message:"您已经预订过此航班，请勿重复提交。",actionLabel:"查看订单",actionHref:"/orders"}},re={not_found:{type:"info",title:"页面不存在",message:"您访问的页面不存在或已被移除。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0},server_error:{type:"error",title:"服务器错误",message:"服务器遇到错误，请稍后重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0},network_error:{type:"error",title:"网络错误",message:"网络连接失败，请检查您的网络连接后重试。",actionLabel:"重试",actionHref:"/",showBackButton:!0},maintenance:{type:"info",title:"系统维护中",message:"系统正在维护，预计将在短时间内恢复。给您带来不便，敬请谅解。",actionLabel:"返回首页",actionHref:"/"},rate_limit_exceeded:{type:"warning",title:"操作过于频繁",message:"您的操作过于频繁，请稍后再试。",actionLabel:"返回",actionHref:"/",showBackButton:!0},invalid_data:{type:"warning",title:"数据格式错误",message:"提交的数据格式不正确，请检查后重试。",actionLabel:"返回",actionHref:"/",showBackButton:!0}},ae={missing_flight:{type:"warning",title:"未选择航班",message:"请先选择航班后再进入预订流程。",actionLabel:"搜索航班",actionHref:"/flights",showBackButton:!0},flight_not_found:{type:"error",title:"航班不存在",message:"您选择的航班已不存在，可能已售罄或被取消。",actionLabel:"重新搜索",actionHref:"/flights"},no_search_results:{type:"info",title:"未找到航班",message:"抱歉，没有找到符合条件的航班。请尝试调整搜索条件。",actionLabel:"修改搜索",actionHref:"/flights",showBackButton:!0},invalid_search_params:{type:"warning",title:"搜索参数无效",message:"搜索参数不完整或无效，请重新填写搜索条件。",actionLabel:"返回搜索",actionHref:"/flights"},search_failed:{type:"error",title:"搜索失败",message:"航班搜索服务暂时不可用，请稍后重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0}},e={...re,...Z,...ee,...ae},_e={title:"Common/ErrorDisplay",component:v,parameters:{layout:"fullscreen"},tags:["autodocs"]},s={args:{type:"error",title:"出错了",message:"发生了意外错误，请稍后重试。",actionLabel:"返回首页",actionHref:"/"}},t={args:{type:"warning",title:"需要注意",message:"此操作需要您的确认。",actionLabel:"继续",actionHref:"/"}},n={args:{type:"info",title:"温馨提示",message:"这是一条重要信息。",actionLabel:"了解更多",actionHref:"/"}},o={args:{type:"error",title:"操作失败",message:"无法完成该操作，请返回上一页重试。",actionLabel:"返回首页",actionHref:"/",showBackButton:!0}},i={args:e.missing_flight,parameters:{docs:{description:{story:"用户未选择航班就尝试进入预订流程时显示。"}}}},c={args:e.flight_not_found,parameters:{docs:{description:{story:"选择的航班已不存在或被取消时显示。"}}}},d={args:e.no_search_results,parameters:{docs:{description:{story:"搜索未找到任何符合条件的航班时显示。"}}}},p={args:e.invalid_search_params,parameters:{docs:{description:{story:"搜索参数不完整或格式错误时显示。"}}}},l={args:e.booking_failed,parameters:{docs:{description:{story:"预订过程中发生错误时显示。"}}}},m={args:e.seat_unavailable,parameters:{docs:{description:{story:"选择的舱位座位已满时显示。"}}}},g={args:e.passenger_limit_exceeded,parameters:{docs:{description:{story:"乘客数量超过单次预订限制时显示。"}}}},u={args:e.payment_failed,parameters:{docs:{description:{story:"支付处理失败时显示。"}}}},f={args:e.insufficient_balance,parameters:{docs:{description:{story:"账户余额不足以完成支付时显示。"}}}},y={args:e.payment_timeout,parameters:{docs:{description:{story:"支付超时，订单已取消时显示。"}}}},_={args:e.order_not_found,parameters:{docs:{description:{story:"订单不存在或用户无权访问时显示。"}}}},h={args:e.order_expired,parameters:{docs:{description:{story:"订单支付时限已过时显示。"}}}},b={args:e.order_cancelled,parameters:{docs:{description:{story:"订单已被取消时显示。"}}}},R={args:e.unauthorized,parameters:{docs:{description:{story:"需要登录才能访问页面时显示。"}}}},S={args:e.session_expired,parameters:{docs:{description:{story:"用户会话已过期时显示。"}}}},w={args:e.forbidden,parameters:{docs:{description:{story:"用户无权访问资源时显示。"}}}},B={args:e.not_found,parameters:{docs:{description:{story:"页面或资源不存在时显示。"}}}},L={args:e.server_error,parameters:{docs:{description:{story:"服务器内部错误时显示。"}}}},x={args:e.network_error,parameters:{docs:{description:{story:"网络连接失败时显示。"}}}},O={args:e.maintenance,parameters:{docs:{description:{story:"系统维护期间显示。"}}}},k={args:{type:"error",title:"这是一个非常非常非常非常非常非常非常非常非常长的错误标题",message:"错误消息",actionLabel:"返回",actionHref:"/"}},H={args:{type:"error",title:"错误",message:"这是一个非常非常非常非常非常非常非常非常非常长的错误消息。它包含了大量的文本内容，用于测试组件如何处理长文本。在实际应用中，错误消息可能会包含详细的错误信息、建议的解决方案以及相关的帮助链接等内容。",actionLabel:"返回",actionHref:"/",showBackButton:!0}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "出错了",
    message: "发生了意外错误，请稍后重试。",
    actionLabel: "返回首页",
    actionHref: "/"
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    type: "warning",
    title: "需要注意",
    message: "此操作需要您的确认。",
    actionLabel: "继续",
    actionHref: "/"
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    type: "info",
    title: "温馨提示",
    message: "这是一条重要信息。",
    actionLabel: "了解更多",
    actionHref: "/"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "操作失败",
    message: "无法完成该操作，请返回上一页重试。",
    actionLabel: "返回首页",
    actionHref: "/",
    showBackButton: true
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.missing_flight,
  parameters: {
    docs: {
      description: {
        story: "用户未选择航班就尝试进入预订流程时显示。"
      }
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.flight_not_found,
  parameters: {
    docs: {
      description: {
        story: "选择的航班已不存在或被取消时显示。"
      }
    }
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.no_search_results,
  parameters: {
    docs: {
      description: {
        story: "搜索未找到任何符合条件的航班时显示。"
      }
    }
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.invalid_search_params,
  parameters: {
    docs: {
      description: {
        story: "搜索参数不完整或格式错误时显示。"
      }
    }
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.booking_failed,
  parameters: {
    docs: {
      description: {
        story: "预订过程中发生错误时显示。"
      }
    }
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.seat_unavailable,
  parameters: {
    docs: {
      description: {
        story: "选择的舱位座位已满时显示。"
      }
    }
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.passenger_limit_exceeded,
  parameters: {
    docs: {
      description: {
        story: "乘客数量超过单次预订限制时显示。"
      }
    }
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.payment_failed,
  parameters: {
    docs: {
      description: {
        story: "支付处理失败时显示。"
      }
    }
  }
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.insufficient_balance,
  parameters: {
    docs: {
      description: {
        story: "账户余额不足以完成支付时显示。"
      }
    }
  }
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.payment_timeout,
  parameters: {
    docs: {
      description: {
        story: "支付超时，订单已取消时显示。"
      }
    }
  }
}`,...y.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_not_found,
  parameters: {
    docs: {
      description: {
        story: "订单不存在或用户无权访问时显示。"
      }
    }
  }
}`,..._.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_expired,
  parameters: {
    docs: {
      description: {
        story: "订单支付时限已过时显示。"
      }
    }
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.order_cancelled,
  parameters: {
    docs: {
      description: {
        story: "订单已被取消时显示。"
      }
    }
  }
}`,...b.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.unauthorized,
  parameters: {
    docs: {
      description: {
        story: "需要登录才能访问页面时显示。"
      }
    }
  }
}`,...R.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.session_expired,
  parameters: {
    docs: {
      description: {
        story: "用户会话已过期时显示。"
      }
    }
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.forbidden,
  parameters: {
    docs: {
      description: {
        story: "用户无权访问资源时显示。"
      }
    }
  }
}`,...w.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.not_found,
  parameters: {
    docs: {
      description: {
        story: "页面或资源不存在时显示。"
      }
    }
  }
}`,...B.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.server_error,
  parameters: {
    docs: {
      description: {
        story: "服务器内部错误时显示。"
      }
    }
  }
}`,...L.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.network_error,
  parameters: {
    docs: {
      description: {
        story: "网络连接失败时显示。"
      }
    }
  }
}`,...x.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: ERROR_CONFIGS.maintenance,
  parameters: {
    docs: {
      description: {
        story: "系统维护期间显示。"
      }
    }
  }
}`,...O.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "这是一个非常非常非常非常非常非常非常非常非常长的错误标题",
    message: "错误消息",
    actionLabel: "返回",
    actionHref: "/"
  }
}`,...k.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    type: "error",
    title: "错误",
    message: "这是一个非常非常非常非常非常非常非常非常非常长的错误消息。它包含了大量的文本内容，用于测试组件如何处理长文本。在实际应用中，错误消息可能会包含详细的错误信息、建议的解决方案以及相关的帮助链接等内容。",
    actionLabel: "返回",
    actionHref: "/",
    showBackButton: true
  }
}`,...H.parameters?.docs?.source}}};const he=["DefaultError","Warning","Info","WithBackButton","MissingFlight","FlightNotFound","NoSearchResults","InvalidSearchParams","BookingFailed","SeatUnavailable","PassengerLimitExceeded","PaymentFailed","InsufficientBalance","PaymentTimeout","OrderNotFound","OrderExpired","OrderCancelled","Unauthorized","SessionExpired","Forbidden","NotFound","ServerError","NetworkError","Maintenance","LongTitle","LongMessage"];export{l as BookingFailed,s as DefaultError,c as FlightNotFound,w as Forbidden,n as Info,f as InsufficientBalance,p as InvalidSearchParams,H as LongMessage,k as LongTitle,O as Maintenance,i as MissingFlight,x as NetworkError,d as NoSearchResults,B as NotFound,b as OrderCancelled,h as OrderExpired,_ as OrderNotFound,g as PassengerLimitExceeded,u as PaymentFailed,y as PaymentTimeout,m as SeatUnavailable,L as ServerError,S as SessionExpired,R as Unauthorized,t as Warning,o as WithBackButton,he as __namedExportsOrder,_e as default};
