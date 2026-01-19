import{r as i,j as A}from"./iframe-BY6WQ8rl.js";import{a as le}from"./zod-u2BPg-vl.js";import"./button-Bkd1CeD9.js";import{U as be}from"./verification-form-d3ZVHWIU.js";import"./separator-D3mo2s7R.js";import"./card-C2MAT-zL.js";import{u as ce}from"./form-Cl4D1rHv.js";import{t as D}from"./index-D45XGnCM.js";import{b as Te,e as Se,d as ke,o as Ee}from"./user-MfbVMCGJ.js";import"./preload-helper-PPVm8Dsz.js";import"./schemas-BKf9BodT.js";import"./index-Cg4mt3GG.js";import"./createLucideIcon-DhaeV68V.js";import"./input-D0mA3Bj2.js";import"./otp-input-BLtKvdQh.js";import"./check-DNbWv-jy.js";import"./x-CoTNxCXn.js";import"./checkbox-D2fL6kQ1.js";import"./index-HIqmnw4t.js";import"./index-DRfufKDV.js";import"./index-sMO_WrMY.js";import"./index-CQLSNwcT.js";import"./tooltip-CbFnJ_8M.js";import"./index-BaiNJB1C.js";import"./index-jM_4ha9X.js";import"./index-BizkJoHM.js";import"./index-DmZccnKP.js";import"./circle-alert-BdeKJeaD.js";import"./index-B6rVzEen.js";import"./label-CxilLX0s.js";var Oe=({as:r="div",...n},t)=>A.jsx(r,{...n,ref:t}),xe=i.forwardRef(Oe),Le="https://challenges.cloudflare.com/turnstile/v0/api.js",se="cf-turnstile-script",qe="cf-turnstile",ue="onloadTurnstileCallback",pe=r=>!!document.getElementById(r),Pe=({render:r="explicit",onLoadCallbackName:n=ue,scriptOptions:{nonce:t="",defer:e=!0,async:m=!0,id:g="",appendTo:h,onError:v,crossOrigin:w=""}={}})=>{let d=g||se;if(pe(d))return;let u=document.createElement("script");u.id=d,u.src=`${Le}?onload=${n}&render=${r}`,!document.querySelector(`script[src="${u.src}"]`)&&(u.defer=!!e,u.async=!!m,t&&(u.nonce=t),w&&(u.crossOrigin=w),v&&(u.onerror=v,delete window[n]),(h==="body"?document.body:document.getElementsByTagName("head")[0]).appendChild(u))},I={normal:{width:300,height:65},compact:{width:150,height:140},invisible:{width:0,height:0,overflow:"hidden"},flexible:{minWidth:300,width:"100%",height:65},interactionOnly:{width:"fit-content",height:"auto",display:"flex"}};function Ce(r){if(r!=="invisible"&&r!=="interactionOnly")return r}function Re(r=se){let[n,t]=i.useState(!1);return i.useEffect(()=>{let e=()=>{pe(r)&&t(!0)},m=new MutationObserver(e);return m.observe(document,{childList:!0,subtree:!0}),e(),()=>{m.disconnect()}},[r]),n}var K="unloaded",fe,Ie=new Promise((r,n)=>{fe={resolve:r,reject:n},K==="ready"&&r(void 0)}),me=(r=ue)=>(K==="unloaded"&&(K="loading",window[r]=()=>{fe.resolve(),K="ready",delete window[r]}),Ie),ge=i.forwardRef((r,n)=>{let{scriptOptions:t,options:e={},siteKey:m,onWidgetLoad:g,onSuccess:h,onExpire:v,onError:w,onBeforeInteractive:d,onAfterInteractive:u,onUnsupported:f,onTimeout:_,onLoadScript:z,id:B,style:P,as:x="div",injectScript:b=!0,rerenderOnCallbackChange:l=!1,...G}=r,y=e.size,j=i.useCallback(()=>typeof y>"u"?{}:e.execution==="execute"?I.invisible:e.appearance==="interaction-only"?I.interactionOnly:I[y],[e.execution,y,e.appearance]),[X,C]=i.useState(j()),S=i.useRef(null),[E,U]=i.useState(!1),s=i.useRef(void 0),R=i.useRef(!1),W=B||qe,o=i.useRef({onSuccess:h,onError:w,onExpire:v,onBeforeInteractive:d,onAfterInteractive:u,onUnsupported:f,onTimeout:_});i.useEffect(()=>{l||(o.current={onSuccess:h,onError:w,onExpire:v,onBeforeInteractive:d,onAfterInteractive:u,onUnsupported:f,onTimeout:_})});let c=t?.id||se,p=Re(c),k=t?.onLoadCallbackName||ue,M=e.appearance||"always",O=i.useMemo(()=>({sitekey:m,action:e.action,cData:e.cData,theme:e.theme||"auto",language:e.language||"auto",tabindex:e.tabIndex,"response-field":e.responseField,"response-field-name":e.responseFieldName,size:Ce(y),retry:e.retry||"auto","retry-interval":e.retryInterval||8e3,"refresh-expired":e.refreshExpired||"auto","refresh-timeout":e.refreshTimeout||"auto",execution:e.execution||"render",appearance:e.appearance||"always","feedback-enabled":e.feedbackEnabled||!0,callback:a=>{R.current=!0,l?h?.(a):o.current.onSuccess?.(a)},"error-callback":l?w:(...a)=>o.current.onError?.(...a),"expired-callback":l?v:(...a)=>o.current.onExpire?.(...a),"before-interactive-callback":l?d:(...a)=>o.current.onBeforeInteractive?.(...a),"after-interactive-callback":l?u:(...a)=>o.current.onAfterInteractive?.(...a),"unsupported-callback":l?f:(...a)=>o.current.onUnsupported?.(...a),"timeout-callback":l?_:(...a)=>o.current.onTimeout?.(...a)}),[e.action,e.appearance,e.cData,e.execution,e.language,e.refreshExpired,e.responseField,e.responseFieldName,e.retry,e.retryInterval,e.tabIndex,e.theme,e.feedbackEnabled,e.refreshTimeout,m,y,l,l?h:null,l?w:null,l?v:null,l?d:null,l?u:null,l?f:null,l?_:null]),T=i.useCallback(()=>typeof window<"u"&&!!window.turnstile,[]);return i.useEffect(function(){b&&!E&&(me(k),Pe({onLoadCallbackName:k,scriptOptions:{...t,id:c}}))},[b,E,t,c,k]),i.useEffect(function(){K!=="ready"&&me(k).then(()=>U(!0)).catch(console.error)},[k]),i.useEffect(function(){if(!S.current||!E)return;let a=!1;return(async()=>{if(a||!S.current)return;let L=window.turnstile.render(S.current,O);s.current=L,s.current&&g?.(s.current)})(),()=>{a=!0,s.current&&(window.turnstile.remove(s.current),R.current=!1)}},[W,E,O]),i.useImperativeHandle(n,()=>{let{turnstile:a}=window;return{getResponse(){if(!a?.getResponse||!s.current||!T()){console.warn("Turnstile has not been loaded");return}return a.getResponse(s.current)},async getResponsePromise(L=3e4,ye=100){return new Promise((he,Y)=>{let q,de=async()=>{if(R.current&&window.turnstile&&s.current)try{let F=window.turnstile.getResponse(s.current);return q&&clearTimeout(q),F?he(F):Y(new Error("No response received"))}catch(F){return q&&clearTimeout(q),console.warn("Failed to get response",F),Y(new Error("Failed to get response"))}q||(q=setTimeout(()=>{q&&clearTimeout(q),Y(new Error("Timeout"))},L)),await new Promise(F=>setTimeout(F,ye)),await de()};de()})},reset(){if(!a?.reset||!s.current||!T()){console.warn("Turnstile has not been loaded");return}e.execution==="execute"&&C(I.invisible);try{R.current=!1,a.reset(s.current)}catch(L){console.warn(`Failed to reset Turnstile widget ${s}`,L)}},remove(){if(!a?.remove||!s.current||!T()){console.warn("Turnstile has not been loaded");return}C(I.invisible),R.current=!1,a.remove(s.current),s.current=null},render(){if(!a?.render||!S.current||!T()||s.current){console.warn("Turnstile has not been loaded or container not found");return}let L=a.render(S.current,O);return s.current=L,s.current&&g?.(s.current),e.execution!=="execute"&&C(y?I[y]:{}),L},execute(){if(e.execution!=="execute"){console.warn('Execution mode is not set to "execute"');return}if(!a?.execute||!S.current||!s.current||!T()){console.warn("Turnstile has not been loaded or container not found");return}a.execute(S.current,O),C(y?I[y]:{})},isExpired(){return!a?.isExpired||!s.current||!T()?(console.warn("Turnstile has not been loaded"),!1):a.isExpired(s.current)}}},[s,e.execution,y,O,S,T,E,g]),i.useEffect(()=>{if(E||!p)return;if(window.turnstile){U(!0);return}let a=setInterval(()=>{window.turnstile&&(U(!0),clearInterval(a))},50);return()=>{clearInterval(a)}},[E,p]),i.useEffect(()=>{C(j())},[e.execution,y,M]),i.useEffect(()=>{!p||typeof z!="function"||z()},[p]),A.jsx(xe,{ref:S,as:x,id:W,style:{...X,...P},...G})});ge.displayName="Turnstile";var Ae={};const ve=i.forwardRef(function({action:n="send-otp",size:t="invisible",theme:e="light",className:m,onSuccess:g,onError:h,onExpire:v},w){var d;return A.jsx(ge,{ref:w,siteKey:(d=Ae.NEXT_PUBLIC_TURNSTILE_SITE_KEY)!==null&&d!==void 0?d:"",className:m,options:{action:n,theme:e,size:t,language:"zh-cn"},scriptOptions:{appendTo:"body"},onSuccess:g,onError:h,onExpire:v})});ve.__docgenInfo={description:`Turnstile widget component for CAPTCHA verification
Supports ref for programmatic access (getResponse, reset, etc.)`,methods:[],displayName:"TurnstileWidget",props:{action:{required:!1,tsType:{name:"string"},description:"Optional action name for analytics",defaultValue:{value:'"send-otp"',computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"normal" | "compact" | "flexible" | "invisible"',elements:[{name:"literal",value:'"normal"'},{name:"literal",value:'"compact"'},{name:"literal",value:'"flexible"'},{name:"literal",value:'"invisible"'}]},description:"Widget size",defaultValue:{value:'"invisible"',computed:!1}},theme:{required:!1,tsType:{name:"union",raw:'"light" | "dark" | "auto"',elements:[{name:"literal",value:'"light"'},{name:"literal",value:'"dark"'},{name:"literal",value:'"auto"'}]},description:"Widget theme",defaultValue:{value:'"light"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Custom className"},onSuccess:{required:!1,tsType:{name:"signature",type:"function",raw:"(token: string) => void",signature:{arguments:[{type:{name:"string"},name:"token"}],return:{name:"void"}}},description:"Callback when verification succeeds"},onError:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when verification fails"},onExpire:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when token expires"}}};const _e=60,Fe="otp-countdown";function Ne(r){const n=r.trim(),t=n.replace(/^\+86/,"");return Te.safeParse(t).success?"phone":Se.safeParse(n).success?"email":null}function je(r){const n=r.trim().replace(/\D/g,"");return n.length>11&&n.startsWith("86")?n.slice(-11):n}function Ue(r,n){return r==="email"?n.trim().toLowerCase():je(n)}function Me(r,n){const t=Ue(r,n);return`${Fe}:${r}:${t}`}function De(r){const n=Ne(r);return n?Me(n,r):null}const Ve="otp-countdown:default";function $e(r){if(typeof document>"u")return null;const n=document.cookie.match(new RegExp(`(?:^|; )${encodeURIComponent(r)}=([^;]*)`));return n?.[1]?decodeURIComponent(n[1]):null}function Ke(r,n,t){try{window.localStorage.setItem(r,String(n))}catch{}try{document.cookie=`${encodeURIComponent(r)}=${n}; max-age=${Math.ceil(t)}; path=/; SameSite=Lax`}catch{}}function H(r){try{window.localStorage.removeItem(r)}catch{}if(typeof document<"u")try{document.cookie=`${encodeURIComponent(r)}=; max-age=0; path=/; SameSite=Lax`}catch{}}function ze(r){var n;const t=(n=(()=>{try{return window.localStorage.getItem(r)}catch{return null}})())!==null&&n!==void 0?n:$e(r);if(!t)return null;const e=Number(t);return Number.isFinite(e)?e:null}function Be(r){const n=ze(r);if(!n)return 0;const t=n-Date.now();return t<=0?(H(r),0):Math.ceil(t/1e3)}function We(r={}){const{duration:n=_e,storageKey:t}=r,e=i.useMemo(()=>t===null?null:t??Ve,[t]),[m,g]=i.useState(0),h=m>0;i.useEffect(()=>{if(!e)return;const d=Be(e);g(d)},[e]),i.useEffect(()=>{if(m<=0)return;const d=setTimeout(()=>{g(u=>{const f=u-1;return f<=0&&e?(H(e),0):f})},1e3);return()=>clearTimeout(d)},[m,e]);const v=i.useCallback(d=>{const u=d??n;if(u<=0){e&&H(e),g(0);return}const f=Date.now()+u*1e3;e&&Ke(e,f,u),g(u)},[n,e]),w=i.useCallback(()=>{e&&H(e),g(0)},[e]);return{countdown:m,isActive:h,start:v,reset:w}}function we({onPasswordSubmit:r,onOtpSubmit:n,onSendOtp:t,initialLoginMethod:e="password",isLoading:m=!1,onForgotPasswordClick:g,onRegisterClick:h,onTermsClick:v,onPrivacyClick:w,onGithubLoginClick:d,className:u}){const[f,_]=i.useState(e),[z,B]=i.useState(!1),P=i.useRef(null),x=ce({resolver:le(ke),mode:"onSubmit",reValidateMode:"onSubmit",criteriaMode:"firstError",defaultValues:{account:"",password:"",agreedToTerms:!1}}),b=ce({resolver:le(Ee),mode:"onSubmit",reValidateMode:"onSubmit",criteriaMode:"firstError",defaultValues:{account:"",otp:"",agreedToTerms:!1}}),l=b.watch("account"),G=i.useMemo(()=>De(l),[l]),{countdown:y,start:j}=We({storageKey:G}),X=async o=>{for(const c of o)if(!await x.trigger(c))return!1;return!0},C=async o=>{for(const c of o)if(!await b.trigger(c))return!1;return!0},S=async o=>{if(await X(["account","password","agreedToTerms"]))try{await r(o)}catch{D.error("人机验证失败，请重试")}},E=async o=>{if(await C(["account","otp","agreedToTerms"]))try{await n(o)}catch{D.error("人机验证失败，请重试")}},U=async()=>{if(await b.trigger("account")){B(!0);try{var c,p;const O=await((c=P.current)===null||c===void 0?void 0:c.getResponsePromise());if(!O){var k;D.error("人机验证失败，请重试"),(k=P.current)===null||k===void 0||k.reset();return}const T=await t(b.getValues("account"),{headers:{"x-captcha-token":O}});T.success?j():(T.retryAfterSeconds&&j(T.retryAfterSeconds),D.error(T.error||"发送验证码失败")),(p=P.current)===null||p===void 0||p.reset()}catch{var M;D.error("人机验证失败，请重试"),(M=P.current)===null||M===void 0||M.reset()}finally{B(!1)}}},s=()=>{const o=f==="password"?x.formState.errors:b.formState.errors;if(o.account)return o.account.message;if(f==="password"&&"password"in o){var c;return(c=o.password)===null||c===void 0?void 0:c.message}if(f==="otp"&&"otp"in o){var p;return(p=o.otp)===null||p===void 0?void 0:p.message}},R=()=>{const o=f==="password"?x.formState.errors:b.formState.errors,c=!!o.agreedToTerms,p=!!o.account,k=f==="password"?!!("password"in o&&o.password):!!("otp"in o&&o.otp);return c&&!p&&!k},W=m||x.formState.isSubmitting||b.formState.isSubmitting;return A.jsxs(A.Fragment,{children:[A.jsx(be,{loginMethod:f,onLoginMethodChange:_,passwordForm:x,otpForm:b,onPasswordSubmit:x.handleSubmit(S),onOtpSubmit:b.handleSubmit(E),onSendOtp:U,countdown:y,isVerifying:z,isLoading:W,currentError:s(),showTermsTooltip:R(),onForgotPasswordClick:g,onRegisterClick:h,onTermsClick:v,onPrivacyClick:w,onGithubLoginClick:d,className:u}),A.jsx(ve,{ref:P,action:"login-otp",size:"invisible"})]})}we.__docgenInfo={description:`Smart container component for the unified login form

Handles all business logic including:
- Form state management via react-hook-form
- Sequential validation (one error at a time)
- OTP countdown management
- Turnstile CAPTCHA integration for OTP
- Toast notifications for errors

@example
\`\`\`tsx
<UnifiedLogin
  onPasswordSubmit={handlePasswordLogin}
  onOtpSubmit={handleOtpLogin}
  onSendOtp={handleSendOtp}
  onForgotPasswordClick={() => router.push("/auth/forgot-password")}
  onRegisterClick={() => router.push("/auth/sign-up")}
/>
\`\`\``,methods:[],displayName:"UnifiedLogin",props:{onPasswordSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:`(
  data: PasswordLoginFormData,
  fetchOptions?: FetchOptions
) => Promise<ActionResult>`,signature:{arguments:[{type:{name:"PasswordLoginFormData"},name:"data"},{type:{name:"signature",type:"object",raw:`{
  headers?: Record<string, string>;
}`,signature:{properties:[{key:"headers",value:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>",required:!1}}]}},name:"fetchOptions"}],return:{name:"Promise",elements:[{name:"union",raw:`| {
    success: true;
    data: T;
    error?: undefined;
    fieldErrors?: undefined;
    message?: string;
  }
| {
    success: false;
    error: string;
    data?: undefined;
    fieldErrors?: Record<string, string[]>;
    message?: undefined;
  }`,elements:[{name:"signature",type:"object",raw:`{
  success: true;
  data: T;
  error?: undefined;
  fieldErrors?: undefined;
  message?: string;
}`,signature:{properties:[{key:"success",value:{name:"literal",value:"true",required:!0}},{key:"data",value:{name:"T",required:!0}},{key:"error",value:{name:"undefined",required:!1}},{key:"fieldErrors",value:{name:"undefined",required:!1}},{key:"message",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  success: false;
  error: string;
  data?: undefined;
  fieldErrors?: Record<string, string[]>;
  message?: undefined;
}`,signature:{properties:[{key:"success",value:{name:"literal",value:"false",required:!0}},{key:"error",value:{name:"string",required:!0}},{key:"data",value:{name:"undefined",required:!1}},{key:"fieldErrors",value:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}],raw:"Record<string, string[]>",required:!1}},{key:"message",value:{name:"undefined",required:!1}}]}}]}],raw:"Promise<ActionResult>"}}},description:"Form submit callback for password login"},onOtpSubmit:{required:!0,tsType:{name:"signature",type:"function",raw:`(
  data: OtpLoginFormData,
  fetchOptions?: FetchOptions
) => Promise<ActionResult>`,signature:{arguments:[{type:{name:"OtpLoginFormData"},name:"data"},{type:{name:"signature",type:"object",raw:`{
  headers?: Record<string, string>;
}`,signature:{properties:[{key:"headers",value:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>",required:!1}}]}},name:"fetchOptions"}],return:{name:"Promise",elements:[{name:"union",raw:`| {
    success: true;
    data: T;
    error?: undefined;
    fieldErrors?: undefined;
    message?: string;
  }
| {
    success: false;
    error: string;
    data?: undefined;
    fieldErrors?: Record<string, string[]>;
    message?: undefined;
  }`,elements:[{name:"signature",type:"object",raw:`{
  success: true;
  data: T;
  error?: undefined;
  fieldErrors?: undefined;
  message?: string;
}`,signature:{properties:[{key:"success",value:{name:"literal",value:"true",required:!0}},{key:"data",value:{name:"T",required:!0}},{key:"error",value:{name:"undefined",required:!1}},{key:"fieldErrors",value:{name:"undefined",required:!1}},{key:"message",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  success: false;
  error: string;
  data?: undefined;
  fieldErrors?: Record<string, string[]>;
  message?: undefined;
}`,signature:{properties:[{key:"success",value:{name:"literal",value:"false",required:!0}},{key:"error",value:{name:"string",required:!0}},{key:"data",value:{name:"undefined",required:!1}},{key:"fieldErrors",value:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}],raw:"Record<string, string[]>",required:!1}},{key:"message",value:{name:"undefined",required:!1}}]}}]}],raw:"Promise<ActionResult>"}}},description:"Form submit callback for OTP login"},onSendOtp:{required:!0,tsType:{name:"signature",type:"function",raw:`(
  account: string,
  fetchOptions?: FetchOptions
) => Promise<OtpSendActionResult>`,signature:{arguments:[{type:{name:"string"},name:"account"},{type:{name:"signature",type:"object",raw:`{
  headers?: Record<string, string>;
}`,signature:{properties:[{key:"headers",value:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>",required:!1}}]}},name:"fetchOptions"}],return:{name:"Promise",elements:[{name:"intersection",raw:`ActionResult & {
  retryAfterSeconds?: number;
}`,elements:[{name:"union",raw:`| {
    success: true;
    data: T;
    error?: undefined;
    fieldErrors?: undefined;
    message?: string;
  }
| {
    success: false;
    error: string;
    data?: undefined;
    fieldErrors?: Record<string, string[]>;
    message?: undefined;
  }`,elements:[{name:"signature",type:"object",raw:`{
  success: true;
  data: T;
  error?: undefined;
  fieldErrors?: undefined;
  message?: string;
}`,signature:{properties:[{key:"success",value:{name:"literal",value:"true",required:!0}},{key:"data",value:{name:"T",required:!0}},{key:"error",value:{name:"undefined",required:!1}},{key:"fieldErrors",value:{name:"undefined",required:!1}},{key:"message",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  success: false;
  error: string;
  data?: undefined;
  fieldErrors?: Record<string, string[]>;
  message?: undefined;
}`,signature:{properties:[{key:"success",value:{name:"literal",value:"false",required:!0}},{key:"error",value:{name:"string",required:!0}},{key:"data",value:{name:"undefined",required:!1}},{key:"fieldErrors",value:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}],raw:"Record<string, string[]>",required:!1}},{key:"message",value:{name:"undefined",required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  retryAfterSeconds?: number;
}`,signature:{properties:[{key:"retryAfterSeconds",value:{name:"number",required:!1}}]}}]}],raw:"Promise<OtpSendActionResult>"}}},description:"Send OTP callback - should return true if OTP was sent successfully"},initialLoginMethod:{required:!1,tsType:{name:"union",raw:'"password" | "otp"',elements:[{name:"literal",value:'"password"'},{name:"literal",value:'"otp"'}]},description:"Initial login method (optional, defaults to password)",defaultValue:{value:'"password"',computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"Loading state from parent (optional, will be combined with internal loading state)",defaultValue:{value:"false",computed:!1}},onForgotPasswordClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when forgot password link is clicked"},onRegisterClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when register link is clicked"},onTermsClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when terms link is clicked"},onPrivacyClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when privacy link is clicked"},onGithubLoginClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when GitHub login button is clicked"},className:{required:!1,tsType:{name:"string"},description:"Custom className"}}};var J,Q,Z,ee,re,ne,te,ae,ie,oe;const{fn:N}=__STORYBOOK_MODULE_TEST__,kr={title:"Auth/Forms/UnifiedLoginForm",component:we,parameters:{layout:"padded"},tags:["autodocs"]},V={args:{onPasswordSubmit:N(),onOtpSubmit:N(),onSendOtp:N(),initialLoginMethod:"password",isLoading:!1}},$={args:{onPasswordSubmit:N(),onOtpSubmit:N(),onSendOtp:N(),initialLoginMethod:"otp",isLoading:!1}};V.parameters={...V.parameters,docs:{...(J=V.parameters)===null||J===void 0?void 0:J.docs,source:{originalSource:`{
  args: {
    onPasswordSubmit: fn(),
    onOtpSubmit: fn(),
    onSendOtp: fn(),
    initialLoginMethod: "password",
    isLoading: false
  }
}`,...(Z=V.parameters)===null||Z===void 0||(Q=Z.docs)===null||Q===void 0?void 0:Q.source},description:{story:`Default password login form
Shows the basic form structure with email, password, and terms checkbox`,...(re=V.parameters)===null||re===void 0||(ee=re.docs)===null||ee===void 0?void 0:ee.description}}};$.parameters={...$.parameters,docs:{...(ne=$.parameters)===null||ne===void 0?void 0:ne.docs,source:{originalSource:`{
  args: {
    onPasswordSubmit: fn(),
    onOtpSubmit: fn(),
    onSendOtp: fn(),
    initialLoginMethod: "otp",
    isLoading: false
  }
}`,...(ae=$.parameters)===null||ae===void 0||(te=ae.docs)===null||te===void 0?void 0:te.source},description:{story:`Default otp login form
Shows the basic form structure with email, password, and terms checkbox`,...(oe=$.parameters)===null||oe===void 0||(ie=oe.docs)===null||ie===void 0?void 0:ie.description}}};const Er=["PasswordLogin","OtpLogin"];export{$ as OtpLogin,V as PasswordLogin,Er as __namedExportsOrder,kr as default};
