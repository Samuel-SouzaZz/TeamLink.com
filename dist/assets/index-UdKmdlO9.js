const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LightboxModal-PBCwqIhk.js","assets/vendor-CUstV6KM.js","assets/icons-CG2M4uFQ.js","assets/LightboxModal-MCLIetsr.css"])))=>i.map(i=>d[i]);
import{a as Fd,b as Dh,j as o,s as Ft,c as v,O as Uh,C as Hh,r as _t,T as Nh,d as Bh,P as Ch,R as $h,p as qh,l as Yh,Q as wh}from"./vendor-CUstV6KM.js";import{M as Rh,X as Gh,I as Ef,H as Xh,T as Qh,S as Zh,C as Id,a as Lh,b as Vh,c as Kh,d as Jh,Z as kh}from"./icons-CG2M4uFQ.js";(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const T of document.querySelectorAll('link[rel="modulepreload"]'))m(T);new MutationObserver(T=>{for(const j of T)if(j.type==="childList")for(const M of j.addedNodes)M.tagName==="LINK"&&M.rel==="modulepreload"&&m(M)}).observe(document,{childList:!0,subtree:!0});function A(T){const j={};return T.integrity&&(j.integrity=T.integrity),T.referrerPolicy&&(j.referrerPolicy=T.referrerPolicy),T.crossOrigin==="use-credentials"?j.credentials="include":T.crossOrigin==="anonymous"?j.credentials="omit":j.credentials="same-origin",j}function m(T){if(T.ep)return;T.ep=!0;const j=A(T);fetch(T.href,j)}})();var vf={exports:{}},Tn={},xf={exports:{}},Sf={};var Hd;function Wh(){return Hd||(Hd=1,(function(i){function d(z,O){var q=z.length;z.push(O);l:for(;0<q;){var nl=q-1>>>1,il=z[nl];if(0<T(il,O))z[nl]=O,z[q]=il,q=nl;else break l}}function A(z){return z.length===0?null:z[0]}function m(z){if(z.length===0)return null;var O=z[0],q=z.pop();if(q!==O){z[0]=q;l:for(var nl=0,il=z.length,wl=il>>>1;nl<wl;){var sl=2*(nl+1)-1,W=z[sl],jl=sl+1,Tt=z[jl];if(0>T(W,q))jl<il&&0>T(Tt,W)?(z[nl]=Tt,z[jl]=q,nl=jl):(z[nl]=W,z[sl]=q,nl=sl);else if(jl<il&&0>T(Tt,q))z[nl]=Tt,z[jl]=q,nl=jl;else break l}}return O}function T(z,O){var q=z.sortIndex-O.sortIndex;return q!==0?q:z.id-O.id}if(i.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var j=performance;i.unstable_now=function(){return j.now()}}else{var M=Date,E=M.now();i.unstable_now=function(){return M.now()-E}}var D=[],C=[],R=1,H=null,G=3,bl=!1,ol=!1,rl=!1,kl=!1,vt=typeof setTimeout=="function"?setTimeout:null,At=typeof clearTimeout=="function"?clearTimeout:null,Ol=typeof setImmediate<"u"?setImmediate:null;function Wl(z){for(var O=A(C);O!==null;){if(O.callback===null)m(C);else if(O.startTime<=z)m(C),O.sortIndex=O.expirationTime,d(D,O);else break;O=A(C)}}function ft(z){if(rl=!1,Wl(z),!ol)if(A(D)!==null)ol=!0,Yl||(Yl=!0,$l());else{var O=A(C);O!==null&&Ht(ft,O.startTime-z)}}var Yl=!1,Gl=-1,Cl=5,Fl=-1;function Ut(){return kl?!0:!(i.unstable_now()-Fl<Cl)}function dl(){if(kl=!1,Yl){var z=i.unstable_now();Fl=z;var O=!0;try{l:{ol=!1,rl&&(rl=!1,At(Gl),Gl=-1),bl=!0;var q=G;try{t:{for(Wl(z),H=A(D);H!==null&&!(H.expirationTime>z&&Ut());){var nl=H.callback;if(typeof nl=="function"){H.callback=null,G=H.priorityLevel;var il=nl(H.expirationTime<=z);if(z=i.unstable_now(),typeof il=="function"){H.callback=il,Wl(z),O=!0;break t}H===A(D)&&m(D),Wl(z)}else m(D);H=A(D)}if(H!==null)O=!0;else{var wl=A(C);wl!==null&&Ht(ft,wl.startTime-z),O=!1}}break l}finally{H=null,G=q,bl=!1}O=void 0}}finally{O?$l():Yl=!1}}}var $l;if(typeof Ol=="function")$l=function(){Ol(dl)};else if(typeof MessageChannel<"u"){var En=new MessageChannel,Ue=En.port2;En.port1.onmessage=dl,$l=function(){Ue.postMessage(null)}}else $l=function(){vt(dl,0)};function Ht(z,O){Gl=vt(function(){z(i.unstable_now())},O)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(z){z.callback=null},i.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Cl=0<z?Math.floor(1e3/z):5},i.unstable_getCurrentPriorityLevel=function(){return G},i.unstable_next=function(z){switch(G){case 1:case 2:case 3:var O=3;break;default:O=G}var q=G;G=O;try{return z()}finally{G=q}},i.unstable_requestPaint=function(){kl=!0},i.unstable_runWithPriority=function(z,O){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var q=G;G=z;try{return O()}finally{G=q}},i.unstable_scheduleCallback=function(z,O,q){var nl=i.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?nl+q:nl):q=nl,z){case 1:var il=-1;break;case 2:il=250;break;case 5:il=1073741823;break;case 4:il=1e4;break;default:il=5e3}return il=q+il,z={id:R++,callback:O,priorityLevel:z,startTime:q,expirationTime:il,sortIndex:-1},q>nl?(z.sortIndex=q,d(C,z),A(D)===null&&z===A(C)&&(rl?(At(Gl),Gl=-1):rl=!0,Ht(ft,q-nl))):(z.sortIndex=il,d(D,z),ol||bl||(ol=!0,Yl||(Yl=!0,$l()))),z},i.unstable_shouldYield=Ut,i.unstable_wrapCallback=function(z){var O=G;return function(){var q=G;G=O;try{return z.apply(this,arguments)}finally{G=q}}}})(Sf)),Sf}var Nd;function Fh(){return Nd||(Nd=1,xf.exports=Wh()),xf.exports}var Bd;function Ih(){if(Bd)return Tn;Bd=1;var i=Fh(),d=Fd(),A=Dh();function m(l){var t="https://react.dev/errors/"+l;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+l+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function T(l){return!(!l||l.nodeType!==1&&l.nodeType!==9&&l.nodeType!==11)}function j(l){var t=l,a=l;if(l.alternate)for(;t.return;)t=t.return;else{l=t;do t=l,(t.flags&4098)!==0&&(a=t.return),l=t.return;while(l)}return t.tag===3?a:null}function M(l){if(l.tag===13){var t=l.memoizedState;if(t===null&&(l=l.alternate,l!==null&&(t=l.memoizedState)),t!==null)return t.dehydrated}return null}function E(l){if(l.tag===31){var t=l.memoizedState;if(t===null&&(l=l.alternate,l!==null&&(t=l.memoizedState)),t!==null)return t.dehydrated}return null}function D(l){if(j(l)!==l)throw Error(m(188))}function C(l){var t=l.alternate;if(!t){if(t=j(l),t===null)throw Error(m(188));return t!==l?null:l}for(var a=l,e=t;;){var n=a.return;if(n===null)break;var u=n.alternate;if(u===null){if(e=n.return,e!==null){a=e;continue}break}if(n.child===u.child){for(u=n.child;u;){if(u===a)return D(n),l;if(u===e)return D(n),t;u=u.sibling}throw Error(m(188))}if(a.return!==e.return)a=n,e=u;else{for(var c=!1,f=n.child;f;){if(f===a){c=!0,a=n,e=u;break}if(f===e){c=!0,e=n,a=u;break}f=f.sibling}if(!c){for(f=u.child;f;){if(f===a){c=!0,a=u,e=n;break}if(f===e){c=!0,e=u,a=n;break}f=f.sibling}if(!c)throw Error(m(189))}}if(a.alternate!==e)throw Error(m(190))}if(a.tag!==3)throw Error(m(188));return a.stateNode.current===a?l:t}function R(l){var t=l.tag;if(t===5||t===26||t===27||t===6)return l;for(l=l.child;l!==null;){if(t=R(l),t!==null)return t;l=l.sibling}return null}var H=Object.assign,G=Symbol.for("react.element"),bl=Symbol.for("react.transitional.element"),ol=Symbol.for("react.portal"),rl=Symbol.for("react.fragment"),kl=Symbol.for("react.strict_mode"),vt=Symbol.for("react.profiler"),At=Symbol.for("react.consumer"),Ol=Symbol.for("react.context"),Wl=Symbol.for("react.forward_ref"),ft=Symbol.for("react.suspense"),Yl=Symbol.for("react.suspense_list"),Gl=Symbol.for("react.memo"),Cl=Symbol.for("react.lazy"),Fl=Symbol.for("react.activity"),Ut=Symbol.for("react.memo_cache_sentinel"),dl=Symbol.iterator;function $l(l){return l===null||typeof l!="object"?null:(l=dl&&l[dl]||l["@@iterator"],typeof l=="function"?l:null)}var En=Symbol.for("react.client.reference");function Ue(l){if(l==null)return null;if(typeof l=="function")return l.$$typeof===En?null:l.displayName||l.name||null;if(typeof l=="string")return l;switch(l){case rl:return"Fragment";case vt:return"Profiler";case kl:return"StrictMode";case ft:return"Suspense";case Yl:return"SuspenseList";case Fl:return"Activity"}if(typeof l=="object")switch(l.$$typeof){case ol:return"Portal";case Ol:return l.displayName||"Context";case At:return(l._context.displayName||"Context")+".Consumer";case Wl:var t=l.render;return l=l.displayName,l||(l=t.displayName||t.name||"",l=l!==""?"ForwardRef("+l+")":"ForwardRef"),l;case Gl:return t=l.displayName||null,t!==null?t:Ue(l.type)||"Memo";case Cl:t=l._payload,l=l._init;try{return Ue(l(t))}catch{}}return null}var Ht=Array.isArray,z=d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,O=A.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,q={pending:!1,data:null,method:null,action:null},nl=[],il=-1;function wl(l){return{current:l}}function sl(l){0>il||(l.current=nl[il],nl[il]=null,il--)}function W(l,t){il++,nl[il]=l.current,l.current=t}var jl=wl(null),Tt=wl(null),Pt=wl(null),On=wl(null);function Dn(l,t){switch(W(Pt,t),W(Tt,l),W(jl,null),t.nodeType){case 9:case 11:l=(l=t.documentElement)&&(l=l.namespaceURI)?td(l):0;break;default:if(l=t.tagName,t=t.namespaceURI)t=td(t),l=ad(t,l);else switch(l){case"svg":l=1;break;case"math":l=2;break;default:l=0}}sl(jl),W(jl,l)}function La(){sl(jl),sl(Tt),sl(Pt)}function Pi(l){l.memoizedState!==null&&W(On,l);var t=jl.current,a=ad(t,l.type);t!==a&&(W(Tt,l),W(jl,a))}function Un(l){Tt.current===l&&(sl(jl),sl(Tt)),On.current===l&&(sl(On),Sn._currentValue=q)}var lu,Df;function Ta(l){if(lu===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);lu=t&&t[1]||"",Df=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+lu+l+Df}var tu=!1;function au(l,t){if(!l||tu)return"";tu=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var e={DetermineComponentFrameRoot:function(){try{if(t){var _=function(){throw Error()};if(Object.defineProperty(_.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_,[])}catch(b){var y=b}Reflect.construct(l,[],_)}else{try{_.call()}catch(b){y=b}l.call(_.prototype)}}else{try{throw Error()}catch(b){y=b}(_=l())&&typeof _.catch=="function"&&_.catch(function(){})}}catch(b){if(b&&y&&typeof b.stack=="string")return[b.stack,y.stack]}return[null,null]}};e.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(e.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(e.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=e.DetermineComponentFrameRoot(),c=u[0],f=u[1];if(c&&f){var s=c.split(`
`),g=f.split(`
`);for(n=e=0;e<s.length&&!s[e].includes("DetermineComponentFrameRoot");)e++;for(;n<g.length&&!g[n].includes("DetermineComponentFrameRoot");)n++;if(e===s.length||n===g.length)for(e=s.length-1,n=g.length-1;1<=e&&0<=n&&s[e]!==g[n];)n--;for(;1<=e&&0<=n;e--,n--)if(s[e]!==g[n]){if(e!==1||n!==1)do if(e--,n--,0>n||s[e]!==g[n]){var x=`
`+s[e].replace(" at new "," at ");return l.displayName&&x.includes("<anonymous>")&&(x=x.replace("<anonymous>",l.displayName)),x}while(1<=e&&0<=n);break}}}finally{tu=!1,Error.prepareStackTrace=a}return(a=l?l.displayName||l.name:"")?Ta(a):""}function c0(l,t){switch(l.tag){case 26:case 27:case 5:return Ta(l.type);case 16:return Ta("Lazy");case 13:return l.child!==t&&t!==null?Ta("Suspense Fallback"):Ta("Suspense");case 19:return Ta("SuspenseList");case 0:case 15:return au(l.type,!1);case 11:return au(l.type.render,!1);case 1:return au(l.type,!0);case 31:return Ta("Activity");default:return""}}function Uf(l){try{var t="",a=null;do t+=c0(l,a),a=l,l=l.return;while(l);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var eu=Object.prototype.hasOwnProperty,nu=i.unstable_scheduleCallback,iu=i.unstable_cancelCallback,f0=i.unstable_shouldYield,o0=i.unstable_requestPaint,Il=i.unstable_now,s0=i.unstable_getCurrentPriorityLevel,Hf=i.unstable_ImmediatePriority,Nf=i.unstable_UserBlockingPriority,Hn=i.unstable_NormalPriority,r0=i.unstable_LowPriority,Bf=i.unstable_IdlePriority,d0=i.log,m0=i.unstable_setDisableYieldValue,He=null,Pl=null;function la(l){if(typeof d0=="function"&&m0(l),Pl&&typeof Pl.setStrictMode=="function")try{Pl.setStrictMode(He,l)}catch{}}var lt=Math.clz32?Math.clz32:g0,h0=Math.log,p0=Math.LN2;function g0(l){return l>>>=0,l===0?32:31-(h0(l)/p0|0)|0}var Nn=256,Bn=262144,Cn=4194304;function ja(l){var t=l&42;if(t!==0)return t;switch(l&-l){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return l&261888;case 262144:case 524288:case 1048576:case 2097152:return l&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return l&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return l}}function $n(l,t,a){var e=l.pendingLanes;if(e===0)return 0;var n=0,u=l.suspendedLanes,c=l.pingedLanes;l=l.warmLanes;var f=e&134217727;return f!==0?(e=f&~u,e!==0?n=ja(e):(c&=f,c!==0?n=ja(c):a||(a=f&~l,a!==0&&(n=ja(a))))):(f=e&~u,f!==0?n=ja(f):c!==0?n=ja(c):a||(a=e&~l,a!==0&&(n=ja(a)))),n===0?0:t!==0&&t!==n&&(t&u)===0&&(u=n&-n,a=t&-t,u>=a||u===32&&(a&4194048)!==0)?t:n}function Ne(l,t){return(l.pendingLanes&~(l.suspendedLanes&~l.pingedLanes)&t)===0}function y0(l,t){switch(l){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cf(){var l=Cn;return Cn<<=1,(Cn&62914560)===0&&(Cn=4194304),l}function uu(l){for(var t=[],a=0;31>a;a++)t.push(l);return t}function Be(l,t){l.pendingLanes|=t,t!==268435456&&(l.suspendedLanes=0,l.pingedLanes=0,l.warmLanes=0)}function b0(l,t,a,e,n,u){var c=l.pendingLanes;l.pendingLanes=a,l.suspendedLanes=0,l.pingedLanes=0,l.warmLanes=0,l.expiredLanes&=a,l.entangledLanes&=a,l.errorRecoveryDisabledLanes&=a,l.shellSuspendCounter=0;var f=l.entanglements,s=l.expirationTimes,g=l.hiddenUpdates;for(a=c&~a;0<a;){var x=31-lt(a),_=1<<x;f[x]=0,s[x]=-1;var y=g[x];if(y!==null)for(g[x]=null,x=0;x<y.length;x++){var b=y[x];b!==null&&(b.lane&=-536870913)}a&=~_}e!==0&&$f(l,e,0),u!==0&&n===0&&l.tag!==0&&(l.suspendedLanes|=u&~(c&~t))}function $f(l,t,a){l.pendingLanes|=t,l.suspendedLanes&=~t;var e=31-lt(t);l.entangledLanes|=t,l.entanglements[e]=l.entanglements[e]|1073741824|a&261930}function qf(l,t){var a=l.entangledLanes|=t;for(l=l.entanglements;a;){var e=31-lt(a),n=1<<e;n&t|l[e]&t&&(l[e]|=t),a&=~n}}function Yf(l,t){var a=t&-t;return a=(a&42)!==0?1:cu(a),(a&(l.suspendedLanes|t))!==0?0:a}function cu(l){switch(l){case 2:l=1;break;case 8:l=4;break;case 32:l=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:l=128;break;case 268435456:l=134217728;break;default:l=0}return l}function fu(l){return l&=-l,2<l?8<l?(l&134217727)!==0?32:268435456:8:2}function wf(){var l=O.p;return l!==0?l:(l=window.event,l===void 0?32:Td(l.type))}function Rf(l,t){var a=O.p;try{return O.p=l,t()}finally{O.p=a}}var ta=Math.random().toString(36).slice(2),Dl="__reactFiber$"+ta,Xl="__reactProps$"+ta,Va="__reactContainer$"+ta,ou="__reactEvents$"+ta,v0="__reactListeners$"+ta,x0="__reactHandles$"+ta,Gf="__reactResources$"+ta,Ce="__reactMarker$"+ta;function su(l){delete l[Dl],delete l[Xl],delete l[ou],delete l[v0],delete l[x0]}function Ka(l){var t=l[Dl];if(t)return t;for(var a=l.parentNode;a;){if(t=a[Va]||a[Dl]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(l=od(l);l!==null;){if(a=l[Dl])return a;l=od(l)}return t}l=a,a=l.parentNode}return null}function Ja(l){if(l=l[Dl]||l[Va]){var t=l.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return l}return null}function $e(l){var t=l.tag;if(t===5||t===26||t===27||t===6)return l.stateNode;throw Error(m(33))}function ka(l){var t=l[Gf];return t||(t=l[Gf]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ml(l){l[Ce]=!0}var Xf=new Set,Qf={};function Ma(l,t){Wa(l,t),Wa(l+"Capture",t)}function Wa(l,t){for(Qf[l]=t,l=0;l<t.length;l++)Xf.add(t[l])}var S0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Zf={},Lf={};function z0(l){return eu.call(Lf,l)?!0:eu.call(Zf,l)?!1:S0.test(l)?Lf[l]=!0:(Zf[l]=!0,!1)}function qn(l,t,a){if(z0(t))if(a===null)l.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":l.removeAttribute(t);return;case"boolean":var e=t.toLowerCase().slice(0,5);if(e!=="data-"&&e!=="aria-"){l.removeAttribute(t);return}}l.setAttribute(t,""+a)}}function Yn(l,t,a){if(a===null)l.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":l.removeAttribute(t);return}l.setAttribute(t,""+a)}}function Nt(l,t,a,e){if(e===null)l.removeAttribute(a);else{switch(typeof e){case"undefined":case"function":case"symbol":case"boolean":l.removeAttribute(a);return}l.setAttributeNS(t,a,""+e)}}function ot(l){switch(typeof l){case"bigint":case"boolean":case"number":case"string":case"undefined":return l;case"object":return l;default:return""}}function Vf(l){var t=l.type;return(l=l.nodeName)&&l.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function _0(l,t,a){var e=Object.getOwnPropertyDescriptor(l.constructor.prototype,t);if(!l.hasOwnProperty(t)&&typeof e<"u"&&typeof e.get=="function"&&typeof e.set=="function"){var n=e.get,u=e.set;return Object.defineProperty(l,t,{configurable:!0,get:function(){return n.call(this)},set:function(c){a=""+c,u.call(this,c)}}),Object.defineProperty(l,t,{enumerable:e.enumerable}),{getValue:function(){return a},setValue:function(c){a=""+c},stopTracking:function(){l._valueTracker=null,delete l[t]}}}}function ru(l){if(!l._valueTracker){var t=Vf(l)?"checked":"value";l._valueTracker=_0(l,t,""+l[t])}}function Kf(l){if(!l)return!1;var t=l._valueTracker;if(!t)return!0;var a=t.getValue(),e="";return l&&(e=Vf(l)?l.checked?"true":"false":l.value),l=e,l!==a?(t.setValue(l),!0):!1}function wn(l){if(l=l||(typeof document<"u"?document:void 0),typeof l>"u")return null;try{return l.activeElement||l.body}catch{return l.body}}var A0=/[\n"\\]/g;function st(l){return l.replace(A0,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function du(l,t,a,e,n,u,c,f){l.name="",c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?l.type=c:l.removeAttribute("type"),t!=null?c==="number"?(t===0&&l.value===""||l.value!=t)&&(l.value=""+ot(t)):l.value!==""+ot(t)&&(l.value=""+ot(t)):c!=="submit"&&c!=="reset"||l.removeAttribute("value"),t!=null?mu(l,c,ot(t)):a!=null?mu(l,c,ot(a)):e!=null&&l.removeAttribute("value"),n==null&&u!=null&&(l.defaultChecked=!!u),n!=null&&(l.checked=n&&typeof n!="function"&&typeof n!="symbol"),f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"?l.name=""+ot(f):l.removeAttribute("name")}function Jf(l,t,a,e,n,u,c,f){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(l.type=u),t!=null||a!=null){if(!(u!=="submit"&&u!=="reset"||t!=null)){ru(l);return}a=a!=null?""+ot(a):"",t=t!=null?""+ot(t):a,f||t===l.value||(l.value=t),l.defaultValue=t}e=e??n,e=typeof e!="function"&&typeof e!="symbol"&&!!e,l.checked=f?l.checked:!!e,l.defaultChecked=!!e,c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(l.name=c),ru(l)}function mu(l,t,a){t==="number"&&wn(l.ownerDocument)===l||l.defaultValue===""+a||(l.defaultValue=""+a)}function Fa(l,t,a,e){if(l=l.options,t){t={};for(var n=0;n<a.length;n++)t["$"+a[n]]=!0;for(a=0;a<l.length;a++)n=t.hasOwnProperty("$"+l[a].value),l[a].selected!==n&&(l[a].selected=n),n&&e&&(l[a].defaultSelected=!0)}else{for(a=""+ot(a),t=null,n=0;n<l.length;n++){if(l[n].value===a){l[n].selected=!0,e&&(l[n].defaultSelected=!0);return}t!==null||l[n].disabled||(t=l[n])}t!==null&&(t.selected=!0)}}function kf(l,t,a){if(t!=null&&(t=""+ot(t),t!==l.value&&(l.value=t),a==null)){l.defaultValue!==t&&(l.defaultValue=t);return}l.defaultValue=a!=null?""+ot(a):""}function Wf(l,t,a,e){if(t==null){if(e!=null){if(a!=null)throw Error(m(92));if(Ht(e)){if(1<e.length)throw Error(m(93));e=e[0]}a=e}a==null&&(a=""),t=a}a=ot(t),l.defaultValue=a,e=l.textContent,e===a&&e!==""&&e!==null&&(l.value=e),ru(l)}function Ia(l,t){if(t){var a=l.firstChild;if(a&&a===l.lastChild&&a.nodeType===3){a.nodeValue=t;return}}l.textContent=t}var T0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ff(l,t,a){var e=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?e?l.setProperty(t,""):t==="float"?l.cssFloat="":l[t]="":e?l.setProperty(t,a):typeof a!="number"||a===0||T0.has(t)?t==="float"?l.cssFloat=a:l[t]=(""+a).trim():l[t]=a+"px"}function If(l,t,a){if(t!=null&&typeof t!="object")throw Error(m(62));if(l=l.style,a!=null){for(var e in a)!a.hasOwnProperty(e)||t!=null&&t.hasOwnProperty(e)||(e.indexOf("--")===0?l.setProperty(e,""):e==="float"?l.cssFloat="":l[e]="");for(var n in t)e=t[n],t.hasOwnProperty(n)&&a[n]!==e&&Ff(l,n,e)}else for(var u in t)t.hasOwnProperty(u)&&Ff(l,u,t[u])}function hu(l){if(l.indexOf("-")===-1)return!1;switch(l){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var j0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),M0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Rn(l){return M0.test(""+l)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":l}function Bt(){}var pu=null;function gu(l){return l=l.target||l.srcElement||window,l.correspondingUseElement&&(l=l.correspondingUseElement),l.nodeType===3?l.parentNode:l}var Pa=null,le=null;function Pf(l){var t=Ja(l);if(t&&(l=t.stateNode)){var a=l[Xl]||null;l:switch(l=t.stateNode,t.type){case"input":if(du(l,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=l;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+st(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var e=a[t];if(e!==l&&e.form===l.form){var n=e[Xl]||null;if(!n)throw Error(m(90));du(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<a.length;t++)e=a[t],e.form===l.form&&Kf(e)}break l;case"textarea":kf(l,a.value,a.defaultValue);break l;case"select":t=a.value,t!=null&&Fa(l,!!a.multiple,t,!1)}}}var yu=!1;function lo(l,t,a){if(yu)return l(t,a);yu=!0;try{var e=l(t);return e}finally{if(yu=!1,(Pa!==null||le!==null)&&(Mi(),Pa&&(t=Pa,l=le,le=Pa=null,Pf(t),l)))for(t=0;t<l.length;t++)Pf(l[t])}}function qe(l,t){var a=l.stateNode;if(a===null)return null;var e=a[Xl]||null;if(e===null)return null;a=e[t];l:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(e=!e.disabled)||(l=l.type,e=!(l==="button"||l==="input"||l==="select"||l==="textarea")),l=!e;break l;default:l=!1}if(l)return null;if(a&&typeof a!="function")throw Error(m(231,t,typeof a));return a}var Ct=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),bu=!1;if(Ct)try{var Ye={};Object.defineProperty(Ye,"passive",{get:function(){bu=!0}}),window.addEventListener("test",Ye,Ye),window.removeEventListener("test",Ye,Ye)}catch{bu=!1}var aa=null,vu=null,Gn=null;function to(){if(Gn)return Gn;var l,t=vu,a=t.length,e,n="value"in aa?aa.value:aa.textContent,u=n.length;for(l=0;l<a&&t[l]===n[l];l++);var c=a-l;for(e=1;e<=c&&t[a-e]===n[u-e];e++);return Gn=n.slice(l,1<e?1-e:void 0)}function Xn(l){var t=l.keyCode;return"charCode"in l?(l=l.charCode,l===0&&t===13&&(l=13)):l=t,l===10&&(l=13),32<=l||l===13?l:0}function Qn(){return!0}function ao(){return!1}function Ql(l){function t(a,e,n,u,c){this._reactName=a,this._targetInst=n,this.type=e,this.nativeEvent=u,this.target=c,this.currentTarget=null;for(var f in l)l.hasOwnProperty(f)&&(a=l[f],this[f]=a?a(u):u[f]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Qn:ao,this.isPropagationStopped=ao,this}return H(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Qn)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Qn)},persist:function(){},isPersistent:Qn}),t}var Ea={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(l){return l.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zn=Ql(Ea),we=H({},Ea,{view:0,detail:0}),E0=Ql(we),xu,Su,Re,Ln=H({},we,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_u,button:0,buttons:0,relatedTarget:function(l){return l.relatedTarget===void 0?l.fromElement===l.srcElement?l.toElement:l.fromElement:l.relatedTarget},movementX:function(l){return"movementX"in l?l.movementX:(l!==Re&&(Re&&l.type==="mousemove"?(xu=l.screenX-Re.screenX,Su=l.screenY-Re.screenY):Su=xu=0,Re=l),xu)},movementY:function(l){return"movementY"in l?l.movementY:Su}}),eo=Ql(Ln),O0=H({},Ln,{dataTransfer:0}),D0=Ql(O0),U0=H({},we,{relatedTarget:0}),zu=Ql(U0),H0=H({},Ea,{animationName:0,elapsedTime:0,pseudoElement:0}),N0=Ql(H0),B0=H({},Ea,{clipboardData:function(l){return"clipboardData"in l?l.clipboardData:window.clipboardData}}),C0=Ql(B0),$0=H({},Ea,{data:0}),no=Ql($0),q0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Y0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},w0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function R0(l){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(l):(l=w0[l])?!!t[l]:!1}function _u(){return R0}var G0=H({},we,{key:function(l){if(l.key){var t=q0[l.key]||l.key;if(t!=="Unidentified")return t}return l.type==="keypress"?(l=Xn(l),l===13?"Enter":String.fromCharCode(l)):l.type==="keydown"||l.type==="keyup"?Y0[l.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_u,charCode:function(l){return l.type==="keypress"?Xn(l):0},keyCode:function(l){return l.type==="keydown"||l.type==="keyup"?l.keyCode:0},which:function(l){return l.type==="keypress"?Xn(l):l.type==="keydown"||l.type==="keyup"?l.keyCode:0}}),X0=Ql(G0),Q0=H({},Ln,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),io=Ql(Q0),Z0=H({},we,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_u}),L0=Ql(Z0),V0=H({},Ea,{propertyName:0,elapsedTime:0,pseudoElement:0}),K0=Ql(V0),J0=H({},Ln,{deltaX:function(l){return"deltaX"in l?l.deltaX:"wheelDeltaX"in l?-l.wheelDeltaX:0},deltaY:function(l){return"deltaY"in l?l.deltaY:"wheelDeltaY"in l?-l.wheelDeltaY:"wheelDelta"in l?-l.wheelDelta:0},deltaZ:0,deltaMode:0}),k0=Ql(J0),W0=H({},Ea,{newState:0,oldState:0}),F0=Ql(W0),I0=[9,13,27,32],Au=Ct&&"CompositionEvent"in window,Ge=null;Ct&&"documentMode"in document&&(Ge=document.documentMode);var P0=Ct&&"TextEvent"in window&&!Ge,uo=Ct&&(!Au||Ge&&8<Ge&&11>=Ge),co=" ",fo=!1;function oo(l,t){switch(l){case"keyup":return I0.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function so(l){return l=l.detail,typeof l=="object"&&"data"in l?l.data:null}var te=!1;function lm(l,t){switch(l){case"compositionend":return so(t);case"keypress":return t.which!==32?null:(fo=!0,co);case"textInput":return l=t.data,l===co&&fo?null:l;default:return null}}function tm(l,t){if(te)return l==="compositionend"||!Au&&oo(l,t)?(l=to(),Gn=vu=aa=null,te=!1,l):null;switch(l){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return uo&&t.locale!=="ko"?null:t.data;default:return null}}var am={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ro(l){var t=l&&l.nodeName&&l.nodeName.toLowerCase();return t==="input"?!!am[l.type]:t==="textarea"}function mo(l,t,a,e){Pa?le?le.push(e):le=[e]:Pa=e,t=Bi(t,"onChange"),0<t.length&&(a=new Zn("onChange","change",null,a,e),l.push({event:a,listeners:t}))}var Xe=null,Qe=null;function em(l){kr(l,0)}function Vn(l){var t=$e(l);if(Kf(t))return l}function ho(l,t){if(l==="change")return t}var po=!1;if(Ct){var Tu;if(Ct){var ju="oninput"in document;if(!ju){var go=document.createElement("div");go.setAttribute("oninput","return;"),ju=typeof go.oninput=="function"}Tu=ju}else Tu=!1;po=Tu&&(!document.documentMode||9<document.documentMode)}function yo(){Xe&&(Xe.detachEvent("onpropertychange",bo),Qe=Xe=null)}function bo(l){if(l.propertyName==="value"&&Vn(Qe)){var t=[];mo(t,Qe,l,gu(l)),lo(em,t)}}function nm(l,t,a){l==="focusin"?(yo(),Xe=t,Qe=a,Xe.attachEvent("onpropertychange",bo)):l==="focusout"&&yo()}function im(l){if(l==="selectionchange"||l==="keyup"||l==="keydown")return Vn(Qe)}function um(l,t){if(l==="click")return Vn(t)}function cm(l,t){if(l==="input"||l==="change")return Vn(t)}function fm(l,t){return l===t&&(l!==0||1/l===1/t)||l!==l&&t!==t}var tt=typeof Object.is=="function"?Object.is:fm;function Ze(l,t){if(tt(l,t))return!0;if(typeof l!="object"||l===null||typeof t!="object"||t===null)return!1;var a=Object.keys(l),e=Object.keys(t);if(a.length!==e.length)return!1;for(e=0;e<a.length;e++){var n=a[e];if(!eu.call(t,n)||!tt(l[n],t[n]))return!1}return!0}function vo(l){for(;l&&l.firstChild;)l=l.firstChild;return l}function xo(l,t){var a=vo(l);l=0;for(var e;a;){if(a.nodeType===3){if(e=l+a.textContent.length,l<=t&&e>=t)return{node:a,offset:t-l};l=e}l:{for(;a;){if(a.nextSibling){a=a.nextSibling;break l}a=a.parentNode}a=void 0}a=vo(a)}}function So(l,t){return l&&t?l===t?!0:l&&l.nodeType===3?!1:t&&t.nodeType===3?So(l,t.parentNode):"contains"in l?l.contains(t):l.compareDocumentPosition?!!(l.compareDocumentPosition(t)&16):!1:!1}function zo(l){l=l!=null&&l.ownerDocument!=null&&l.ownerDocument.defaultView!=null?l.ownerDocument.defaultView:window;for(var t=wn(l.document);t instanceof l.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)l=t.contentWindow;else break;t=wn(l.document)}return t}function Mu(l){var t=l&&l.nodeName&&l.nodeName.toLowerCase();return t&&(t==="input"&&(l.type==="text"||l.type==="search"||l.type==="tel"||l.type==="url"||l.type==="password")||t==="textarea"||l.contentEditable==="true")}var om=Ct&&"documentMode"in document&&11>=document.documentMode,ae=null,Eu=null,Le=null,Ou=!1;function _o(l,t,a){var e=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ou||ae==null||ae!==wn(e)||(e=ae,"selectionStart"in e&&Mu(e)?e={start:e.selectionStart,end:e.selectionEnd}:(e=(e.ownerDocument&&e.ownerDocument.defaultView||window).getSelection(),e={anchorNode:e.anchorNode,anchorOffset:e.anchorOffset,focusNode:e.focusNode,focusOffset:e.focusOffset}),Le&&Ze(Le,e)||(Le=e,e=Bi(Eu,"onSelect"),0<e.length&&(t=new Zn("onSelect","select",null,t,a),l.push({event:t,listeners:e}),t.target=ae)))}function Oa(l,t){var a={};return a[l.toLowerCase()]=t.toLowerCase(),a["Webkit"+l]="webkit"+t,a["Moz"+l]="moz"+t,a}var ee={animationend:Oa("Animation","AnimationEnd"),animationiteration:Oa("Animation","AnimationIteration"),animationstart:Oa("Animation","AnimationStart"),transitionrun:Oa("Transition","TransitionRun"),transitionstart:Oa("Transition","TransitionStart"),transitioncancel:Oa("Transition","TransitionCancel"),transitionend:Oa("Transition","TransitionEnd")},Du={},Ao={};Ct&&(Ao=document.createElement("div").style,"AnimationEvent"in window||(delete ee.animationend.animation,delete ee.animationiteration.animation,delete ee.animationstart.animation),"TransitionEvent"in window||delete ee.transitionend.transition);function Da(l){if(Du[l])return Du[l];if(!ee[l])return l;var t=ee[l],a;for(a in t)if(t.hasOwnProperty(a)&&a in Ao)return Du[l]=t[a];return l}var To=Da("animationend"),jo=Da("animationiteration"),Mo=Da("animationstart"),sm=Da("transitionrun"),rm=Da("transitionstart"),dm=Da("transitioncancel"),Eo=Da("transitionend"),Oo=new Map,Uu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Uu.push("scrollEnd");function xt(l,t){Oo.set(l,t),Ma(t,[l])}var Kn=typeof reportError=="function"?reportError:function(l){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof l=="object"&&l!==null&&typeof l.message=="string"?String(l.message):String(l),error:l});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",l);return}console.error(l)},rt=[],ne=0,Hu=0;function Jn(){for(var l=ne,t=Hu=ne=0;t<l;){var a=rt[t];rt[t++]=null;var e=rt[t];rt[t++]=null;var n=rt[t];rt[t++]=null;var u=rt[t];if(rt[t++]=null,e!==null&&n!==null){var c=e.pending;c===null?n.next=n:(n.next=c.next,c.next=n),e.pending=n}u!==0&&Do(a,n,u)}}function kn(l,t,a,e){rt[ne++]=l,rt[ne++]=t,rt[ne++]=a,rt[ne++]=e,Hu|=e,l.lanes|=e,l=l.alternate,l!==null&&(l.lanes|=e)}function Nu(l,t,a,e){return kn(l,t,a,e),Wn(l)}function Ua(l,t){return kn(l,null,null,t),Wn(l)}function Do(l,t,a){l.lanes|=a;var e=l.alternate;e!==null&&(e.lanes|=a);for(var n=!1,u=l.return;u!==null;)u.childLanes|=a,e=u.alternate,e!==null&&(e.childLanes|=a),u.tag===22&&(l=u.stateNode,l===null||l._visibility&1||(n=!0)),l=u,u=u.return;return l.tag===3?(u=l.stateNode,n&&t!==null&&(n=31-lt(a),l=u.hiddenUpdates,e=l[n],e===null?l[n]=[t]:e.push(t),t.lane=a|536870912),u):null}function Wn(l){if(50<hn)throw hn=0,Xc=null,Error(m(185));for(var t=l.return;t!==null;)l=t,t=l.return;return l.tag===3?l.stateNode:null}var ie={};function mm(l,t,a,e){this.tag=l,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=e,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function at(l,t,a,e){return new mm(l,t,a,e)}function Bu(l){return l=l.prototype,!(!l||!l.isReactComponent)}function $t(l,t){var a=l.alternate;return a===null?(a=at(l.tag,t,l.key,l.mode),a.elementType=l.elementType,a.type=l.type,a.stateNode=l.stateNode,a.alternate=l,l.alternate=a):(a.pendingProps=t,a.type=l.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=l.flags&65011712,a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,t=l.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=l.sibling,a.index=l.index,a.ref=l.ref,a.refCleanup=l.refCleanup,a}function Uo(l,t){l.flags&=65011714;var a=l.alternate;return a===null?(l.childLanes=0,l.lanes=t,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=a.childLanes,l.lanes=a.lanes,l.child=a.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=a.memoizedProps,l.memoizedState=a.memoizedState,l.updateQueue=a.updateQueue,l.type=a.type,t=a.dependencies,l.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),l}function Fn(l,t,a,e,n,u){var c=0;if(e=l,typeof l=="function")Bu(l)&&(c=1);else if(typeof l=="string")c=bh(l,a,jl.current)?26:l==="html"||l==="head"||l==="body"?27:5;else l:switch(l){case Fl:return l=at(31,a,t,n),l.elementType=Fl,l.lanes=u,l;case rl:return Ha(a.children,n,u,t);case kl:c=8,n|=24;break;case vt:return l=at(12,a,t,n|2),l.elementType=vt,l.lanes=u,l;case ft:return l=at(13,a,t,n),l.elementType=ft,l.lanes=u,l;case Yl:return l=at(19,a,t,n),l.elementType=Yl,l.lanes=u,l;default:if(typeof l=="object"&&l!==null)switch(l.$$typeof){case Ol:c=10;break l;case At:c=9;break l;case Wl:c=11;break l;case Gl:c=14;break l;case Cl:c=16,e=null;break l}c=29,a=Error(m(130,l===null?"null":typeof l,"")),e=null}return t=at(c,a,t,n),t.elementType=l,t.type=e,t.lanes=u,t}function Ha(l,t,a,e){return l=at(7,l,e,t),l.lanes=a,l}function Cu(l,t,a){return l=at(6,l,null,t),l.lanes=a,l}function Ho(l){var t=at(18,null,null,0);return t.stateNode=l,t}function $u(l,t,a){return t=at(4,l.children!==null?l.children:[],l.key,t),t.lanes=a,t.stateNode={containerInfo:l.containerInfo,pendingChildren:null,implementation:l.implementation},t}var No=new WeakMap;function dt(l,t){if(typeof l=="object"&&l!==null){var a=No.get(l);return a!==void 0?a:(t={value:l,source:t,stack:Uf(t)},No.set(l,t),t)}return{value:l,source:t,stack:Uf(t)}}var ue=[],ce=0,In=null,Ve=0,mt=[],ht=0,ea=null,jt=1,Mt="";function qt(l,t){ue[ce++]=Ve,ue[ce++]=In,In=l,Ve=t}function Bo(l,t,a){mt[ht++]=jt,mt[ht++]=Mt,mt[ht++]=ea,ea=l;var e=jt;l=Mt;var n=32-lt(e)-1;e&=~(1<<n),a+=1;var u=32-lt(t)+n;if(30<u){var c=n-n%5;u=(e&(1<<c)-1).toString(32),e>>=c,n-=c,jt=1<<32-lt(t)+n|a<<n|e,Mt=u+l}else jt=1<<u|a<<n|e,Mt=l}function qu(l){l.return!==null&&(qt(l,1),Bo(l,1,0))}function Yu(l){for(;l===In;)In=ue[--ce],ue[ce]=null,Ve=ue[--ce],ue[ce]=null;for(;l===ea;)ea=mt[--ht],mt[ht]=null,Mt=mt[--ht],mt[ht]=null,jt=mt[--ht],mt[ht]=null}function Co(l,t){mt[ht++]=jt,mt[ht++]=Mt,mt[ht++]=ea,jt=t.id,Mt=t.overflow,ea=l}var Ul=null,ul=null,V=!1,na=null,pt=!1,wu=Error(m(519));function ia(l){var t=Error(m(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ke(dt(t,l)),wu}function $o(l){var t=l.stateNode,a=l.type,e=l.memoizedProps;switch(t[Dl]=l,t[Xl]=e,a){case"dialog":Q("cancel",t),Q("close",t);break;case"iframe":case"object":case"embed":Q("load",t);break;case"video":case"audio":for(a=0;a<gn.length;a++)Q(gn[a],t);break;case"source":Q("error",t);break;case"img":case"image":case"link":Q("error",t),Q("load",t);break;case"details":Q("toggle",t);break;case"input":Q("invalid",t),Jf(t,e.value,e.defaultValue,e.checked,e.defaultChecked,e.type,e.name,!0);break;case"select":Q("invalid",t);break;case"textarea":Q("invalid",t),Wf(t,e.value,e.defaultValue,e.children)}a=e.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||e.suppressHydrationWarning===!0||Pr(t.textContent,a)?(e.popover!=null&&(Q("beforetoggle",t),Q("toggle",t)),e.onScroll!=null&&Q("scroll",t),e.onScrollEnd!=null&&Q("scrollend",t),e.onClick!=null&&(t.onclick=Bt),t=!0):t=!1,t||ia(l,!0)}function qo(l){for(Ul=l.return;Ul;)switch(Ul.tag){case 5:case 31:case 13:pt=!1;return;case 27:case 3:pt=!0;return;default:Ul=Ul.return}}function fe(l){if(l!==Ul)return!1;if(!V)return qo(l),V=!0,!1;var t=l.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=l.type,a=!(a!=="form"&&a!=="button")||ef(l.type,l.memoizedProps)),a=!a),a&&ul&&ia(l),qo(l),t===13){if(l=l.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(m(317));ul=fd(l)}else if(t===31){if(l=l.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(m(317));ul=fd(l)}else t===27?(t=ul,va(l.type)?(l=of,of=null,ul=l):ul=t):ul=Ul?yt(l.stateNode.nextSibling):null;return!0}function Na(){ul=Ul=null,V=!1}function Ru(){var l=na;return l!==null&&(Kl===null?Kl=l:Kl.push.apply(Kl,l),na=null),l}function Ke(l){na===null?na=[l]:na.push(l)}var Gu=wl(null),Ba=null,Yt=null;function ua(l,t,a){W(Gu,t._currentValue),t._currentValue=a}function wt(l){l._currentValue=Gu.current,sl(Gu)}function Xu(l,t,a){for(;l!==null;){var e=l.alternate;if((l.childLanes&t)!==t?(l.childLanes|=t,e!==null&&(e.childLanes|=t)):e!==null&&(e.childLanes&t)!==t&&(e.childLanes|=t),l===a)break;l=l.return}}function Qu(l,t,a,e){var n=l.child;for(n!==null&&(n.return=l);n!==null;){var u=n.dependencies;if(u!==null){var c=n.child;u=u.firstContext;l:for(;u!==null;){var f=u;u=n;for(var s=0;s<t.length;s++)if(f.context===t[s]){u.lanes|=a,f=u.alternate,f!==null&&(f.lanes|=a),Xu(u.return,a,l),e||(c=null);break l}u=f.next}}else if(n.tag===18){if(c=n.return,c===null)throw Error(m(341));c.lanes|=a,u=c.alternate,u!==null&&(u.lanes|=a),Xu(c,a,l),c=null}else c=n.child;if(c!==null)c.return=n;else for(c=n;c!==null;){if(c===l){c=null;break}if(n=c.sibling,n!==null){n.return=c.return,c=n;break}c=c.return}n=c}}function oe(l,t,a,e){l=null;for(var n=t,u=!1;n!==null;){if(!u){if((n.flags&524288)!==0)u=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var c=n.alternate;if(c===null)throw Error(m(387));if(c=c.memoizedProps,c!==null){var f=n.type;tt(n.pendingProps.value,c.value)||(l!==null?l.push(f):l=[f])}}else if(n===On.current){if(c=n.alternate,c===null)throw Error(m(387));c.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(l!==null?l.push(Sn):l=[Sn])}n=n.return}l!==null&&Qu(t,l,a,e),t.flags|=262144}function Pn(l){for(l=l.firstContext;l!==null;){if(!tt(l.context._currentValue,l.memoizedValue))return!0;l=l.next}return!1}function Ca(l){Ba=l,Yt=null,l=l.dependencies,l!==null&&(l.firstContext=null)}function Hl(l){return Yo(Ba,l)}function li(l,t){return Ba===null&&Ca(l),Yo(l,t)}function Yo(l,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Yt===null){if(l===null)throw Error(m(308));Yt=t,l.dependencies={lanes:0,firstContext:t},l.flags|=524288}else Yt=Yt.next=t;return a}var hm=typeof AbortController<"u"?AbortController:function(){var l=[],t=this.signal={aborted:!1,addEventListener:function(a,e){l.push(e)}};this.abort=function(){t.aborted=!0,l.forEach(function(a){return a()})}},pm=i.unstable_scheduleCallback,gm=i.unstable_NormalPriority,vl={$$typeof:Ol,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zu(){return{controller:new hm,data:new Map,refCount:0}}function Je(l){l.refCount--,l.refCount===0&&pm(gm,function(){l.controller.abort()})}var ke=null,Lu=0,se=0,re=null;function ym(l,t){if(ke===null){var a=ke=[];Lu=0,se=Jc(),re={status:"pending",value:void 0,then:function(e){a.push(e)}}}return Lu++,t.then(wo,wo),t}function wo(){if(--Lu===0&&ke!==null){re!==null&&(re.status="fulfilled");var l=ke;ke=null,se=0,re=null;for(var t=0;t<l.length;t++)(0,l[t])()}}function bm(l,t){var a=[],e={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return l.then(function(){e.status="fulfilled",e.value=t;for(var n=0;n<a.length;n++)(0,a[n])(t)},function(n){for(e.status="rejected",e.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),e}var Ro=z.S;z.S=function(l,t){_r=Il(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&ym(l,t),Ro!==null&&Ro(l,t)};var $a=wl(null);function Vu(){var l=$a.current;return l!==null?l:al.pooledCache}function ti(l,t){t===null?W($a,$a.current):W($a,t.pool)}function Go(){var l=Vu();return l===null?null:{parent:vl._currentValue,pool:l}}var de=Error(m(460)),Ku=Error(m(474)),ai=Error(m(542)),ei={then:function(){}};function Xo(l){return l=l.status,l==="fulfilled"||l==="rejected"}function Qo(l,t,a){switch(a=l[a],a===void 0?l.push(t):a!==t&&(t.then(Bt,Bt),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw l=t.reason,Lo(l),l;default:if(typeof t.status=="string")t.then(Bt,Bt);else{if(l=al,l!==null&&100<l.shellSuspendCounter)throw Error(m(482));l=t,l.status="pending",l.then(function(e){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=e}},function(e){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw l=t.reason,Lo(l),l}throw Ya=t,de}}function qa(l){try{var t=l._init;return t(l._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ya=a,de):a}}var Ya=null;function Zo(){if(Ya===null)throw Error(m(459));var l=Ya;return Ya=null,l}function Lo(l){if(l===de||l===ai)throw Error(m(483))}var me=null,We=0;function ni(l){var t=We;return We+=1,me===null&&(me=[]),Qo(me,l,t)}function Fe(l,t){t=t.props.ref,l.ref=t!==void 0?t:null}function ii(l,t){throw t.$$typeof===G?Error(m(525)):(l=Object.prototype.toString.call(t),Error(m(31,l==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":l)))}function Vo(l){function t(h,r){if(l){var p=h.deletions;p===null?(h.deletions=[r],h.flags|=16):p.push(r)}}function a(h,r){if(!l)return null;for(;r!==null;)t(h,r),r=r.sibling;return null}function e(h){for(var r=new Map;h!==null;)h.key!==null?r.set(h.key,h):r.set(h.index,h),h=h.sibling;return r}function n(h,r){return h=$t(h,r),h.index=0,h.sibling=null,h}function u(h,r,p){return h.index=p,l?(p=h.alternate,p!==null?(p=p.index,p<r?(h.flags|=67108866,r):p):(h.flags|=67108866,r)):(h.flags|=1048576,r)}function c(h){return l&&h.alternate===null&&(h.flags|=67108866),h}function f(h,r,p,S){return r===null||r.tag!==6?(r=Cu(p,h.mode,S),r.return=h,r):(r=n(r,p),r.return=h,r)}function s(h,r,p,S){var B=p.type;return B===rl?x(h,r,p.props.children,S,p.key):r!==null&&(r.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===Cl&&qa(B)===r.type)?(r=n(r,p.props),Fe(r,p),r.return=h,r):(r=Fn(p.type,p.key,p.props,null,h.mode,S),Fe(r,p),r.return=h,r)}function g(h,r,p,S){return r===null||r.tag!==4||r.stateNode.containerInfo!==p.containerInfo||r.stateNode.implementation!==p.implementation?(r=$u(p,h.mode,S),r.return=h,r):(r=n(r,p.children||[]),r.return=h,r)}function x(h,r,p,S,B){return r===null||r.tag!==7?(r=Ha(p,h.mode,S,B),r.return=h,r):(r=n(r,p),r.return=h,r)}function _(h,r,p){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=Cu(""+r,h.mode,p),r.return=h,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case bl:return p=Fn(r.type,r.key,r.props,null,h.mode,p),Fe(p,r),p.return=h,p;case ol:return r=$u(r,h.mode,p),r.return=h,r;case Cl:return r=qa(r),_(h,r,p)}if(Ht(r)||$l(r))return r=Ha(r,h.mode,p,null),r.return=h,r;if(typeof r.then=="function")return _(h,ni(r),p);if(r.$$typeof===Ol)return _(h,li(h,r),p);ii(h,r)}return null}function y(h,r,p,S){var B=r!==null?r.key:null;if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return B!==null?null:f(h,r,""+p,S);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case bl:return p.key===B?s(h,r,p,S):null;case ol:return p.key===B?g(h,r,p,S):null;case Cl:return p=qa(p),y(h,r,p,S)}if(Ht(p)||$l(p))return B!==null?null:x(h,r,p,S,null);if(typeof p.then=="function")return y(h,r,ni(p),S);if(p.$$typeof===Ol)return y(h,r,li(h,p),S);ii(h,p)}return null}function b(h,r,p,S,B){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return h=h.get(p)||null,f(r,h,""+S,B);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case bl:return h=h.get(S.key===null?p:S.key)||null,s(r,h,S,B);case ol:return h=h.get(S.key===null?p:S.key)||null,g(r,h,S,B);case Cl:return S=qa(S),b(h,r,p,S,B)}if(Ht(S)||$l(S))return h=h.get(p)||null,x(r,h,S,B,null);if(typeof S.then=="function")return b(h,r,p,ni(S),B);if(S.$$typeof===Ol)return b(h,r,p,li(r,S),B);ii(r,S)}return null}function U(h,r,p,S){for(var B=null,K=null,N=r,w=r=0,L=null;N!==null&&w<p.length;w++){N.index>w?(L=N,N=null):L=N.sibling;var J=y(h,N,p[w],S);if(J===null){N===null&&(N=L);break}l&&N&&J.alternate===null&&t(h,N),r=u(J,r,w),K===null?B=J:K.sibling=J,K=J,N=L}if(w===p.length)return a(h,N),V&&qt(h,w),B;if(N===null){for(;w<p.length;w++)N=_(h,p[w],S),N!==null&&(r=u(N,r,w),K===null?B=N:K.sibling=N,K=N);return V&&qt(h,w),B}for(N=e(N);w<p.length;w++)L=b(N,h,w,p[w],S),L!==null&&(l&&L.alternate!==null&&N.delete(L.key===null?w:L.key),r=u(L,r,w),K===null?B=L:K.sibling=L,K=L);return l&&N.forEach(function(Aa){return t(h,Aa)}),V&&qt(h,w),B}function $(h,r,p,S){if(p==null)throw Error(m(151));for(var B=null,K=null,N=r,w=r=0,L=null,J=p.next();N!==null&&!J.done;w++,J=p.next()){N.index>w?(L=N,N=null):L=N.sibling;var Aa=y(h,N,J.value,S);if(Aa===null){N===null&&(N=L);break}l&&N&&Aa.alternate===null&&t(h,N),r=u(Aa,r,w),K===null?B=Aa:K.sibling=Aa,K=Aa,N=L}if(J.done)return a(h,N),V&&qt(h,w),B;if(N===null){for(;!J.done;w++,J=p.next())J=_(h,J.value,S),J!==null&&(r=u(J,r,w),K===null?B=J:K.sibling=J,K=J);return V&&qt(h,w),B}for(N=e(N);!J.done;w++,J=p.next())J=b(N,h,w,J.value,S),J!==null&&(l&&J.alternate!==null&&N.delete(J.key===null?w:J.key),r=u(J,r,w),K===null?B=J:K.sibling=J,K=J);return l&&N.forEach(function(Oh){return t(h,Oh)}),V&&qt(h,w),B}function tl(h,r,p,S){if(typeof p=="object"&&p!==null&&p.type===rl&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case bl:l:{for(var B=p.key;r!==null;){if(r.key===B){if(B=p.type,B===rl){if(r.tag===7){a(h,r.sibling),S=n(r,p.props.children),S.return=h,h=S;break l}}else if(r.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===Cl&&qa(B)===r.type){a(h,r.sibling),S=n(r,p.props),Fe(S,p),S.return=h,h=S;break l}a(h,r);break}else t(h,r);r=r.sibling}p.type===rl?(S=Ha(p.props.children,h.mode,S,p.key),S.return=h,h=S):(S=Fn(p.type,p.key,p.props,null,h.mode,S),Fe(S,p),S.return=h,h=S)}return c(h);case ol:l:{for(B=p.key;r!==null;){if(r.key===B)if(r.tag===4&&r.stateNode.containerInfo===p.containerInfo&&r.stateNode.implementation===p.implementation){a(h,r.sibling),S=n(r,p.children||[]),S.return=h,h=S;break l}else{a(h,r);break}else t(h,r);r=r.sibling}S=$u(p,h.mode,S),S.return=h,h=S}return c(h);case Cl:return p=qa(p),tl(h,r,p,S)}if(Ht(p))return U(h,r,p,S);if($l(p)){if(B=$l(p),typeof B!="function")throw Error(m(150));return p=B.call(p),$(h,r,p,S)}if(typeof p.then=="function")return tl(h,r,ni(p),S);if(p.$$typeof===Ol)return tl(h,r,li(h,p),S);ii(h,p)}return typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint"?(p=""+p,r!==null&&r.tag===6?(a(h,r.sibling),S=n(r,p),S.return=h,h=S):(a(h,r),S=Cu(p,h.mode,S),S.return=h,h=S),c(h)):a(h,r)}return function(h,r,p,S){try{We=0;var B=tl(h,r,p,S);return me=null,B}catch(N){if(N===de||N===ai)throw N;var K=at(29,N,null,h.mode);return K.lanes=S,K.return=h,K}}}var wa=Vo(!0),Ko=Vo(!1),ca=!1;function Ju(l){l.updateQueue={baseState:l.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ku(l,t){l=l.updateQueue,t.updateQueue===l&&(t.updateQueue={baseState:l.baseState,firstBaseUpdate:l.firstBaseUpdate,lastBaseUpdate:l.lastBaseUpdate,shared:l.shared,callbacks:null})}function fa(l){return{lane:l,tag:0,payload:null,callback:null,next:null}}function oa(l,t,a){var e=l.updateQueue;if(e===null)return null;if(e=e.shared,(k&2)!==0){var n=e.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t,t=Wn(l),Do(l,null,a),t}return kn(l,e,t,a),Wn(l)}function Ie(l,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var e=t.lanes;e&=l.pendingLanes,a|=e,t.lanes=a,qf(l,a)}}function Wu(l,t){var a=l.updateQueue,e=l.alternate;if(e!==null&&(e=e.updateQueue,a===e)){var n=null,u=null;if(a=a.firstBaseUpdate,a!==null){do{var c={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};u===null?n=u=c:u=u.next=c,a=a.next}while(a!==null);u===null?n=u=t:u=u.next=t}else n=u=t;a={baseState:e.baseState,firstBaseUpdate:n,lastBaseUpdate:u,shared:e.shared,callbacks:e.callbacks},l.updateQueue=a;return}l=a.lastBaseUpdate,l===null?a.firstBaseUpdate=t:l.next=t,a.lastBaseUpdate=t}var Fu=!1;function Pe(){if(Fu){var l=re;if(l!==null)throw l}}function ln(l,t,a,e){Fu=!1;var n=l.updateQueue;ca=!1;var u=n.firstBaseUpdate,c=n.lastBaseUpdate,f=n.shared.pending;if(f!==null){n.shared.pending=null;var s=f,g=s.next;s.next=null,c===null?u=g:c.next=g,c=s;var x=l.alternate;x!==null&&(x=x.updateQueue,f=x.lastBaseUpdate,f!==c&&(f===null?x.firstBaseUpdate=g:f.next=g,x.lastBaseUpdate=s))}if(u!==null){var _=n.baseState;c=0,x=g=s=null,f=u;do{var y=f.lane&-536870913,b=y!==f.lane;if(b?(Z&y)===y:(e&y)===y){y!==0&&y===se&&(Fu=!0),x!==null&&(x=x.next={lane:0,tag:f.tag,payload:f.payload,callback:null,next:null});l:{var U=l,$=f;y=t;var tl=a;switch($.tag){case 1:if(U=$.payload,typeof U=="function"){_=U.call(tl,_,y);break l}_=U;break l;case 3:U.flags=U.flags&-65537|128;case 0:if(U=$.payload,y=typeof U=="function"?U.call(tl,_,y):U,y==null)break l;_=H({},_,y);break l;case 2:ca=!0}}y=f.callback,y!==null&&(l.flags|=64,b&&(l.flags|=8192),b=n.callbacks,b===null?n.callbacks=[y]:b.push(y))}else b={lane:y,tag:f.tag,payload:f.payload,callback:f.callback,next:null},x===null?(g=x=b,s=_):x=x.next=b,c|=y;if(f=f.next,f===null){if(f=n.shared.pending,f===null)break;b=f,f=b.next,b.next=null,n.lastBaseUpdate=b,n.shared.pending=null}}while(!0);x===null&&(s=_),n.baseState=s,n.firstBaseUpdate=g,n.lastBaseUpdate=x,u===null&&(n.shared.lanes=0),ha|=c,l.lanes=c,l.memoizedState=_}}function Jo(l,t){if(typeof l!="function")throw Error(m(191,l));l.call(t)}function ko(l,t){var a=l.callbacks;if(a!==null)for(l.callbacks=null,l=0;l<a.length;l++)Jo(a[l],t)}var he=wl(null),ui=wl(0);function Wo(l,t){l=Jt,W(ui,l),W(he,t),Jt=l|t.baseLanes}function Iu(){W(ui,Jt),W(he,he.current)}function Pu(){Jt=ui.current,sl(he),sl(ui)}var et=wl(null),gt=null;function sa(l){var t=l.alternate;W(gl,gl.current&1),W(et,l),gt===null&&(t===null||he.current!==null||t.memoizedState!==null)&&(gt=l)}function lc(l){W(gl,gl.current),W(et,l),gt===null&&(gt=l)}function Fo(l){l.tag===22?(W(gl,gl.current),W(et,l),gt===null&&(gt=l)):ra()}function ra(){W(gl,gl.current),W(et,et.current)}function nt(l){sl(et),gt===l&&(gt=null),sl(gl)}var gl=wl(0);function ci(l){for(var t=l;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||cf(a)||ff(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===l)break;for(;t.sibling===null;){if(t.return===null||t.return===l)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Rt=0,Y=null,P=null,xl=null,fi=!1,pe=!1,Ra=!1,oi=0,tn=0,ge=null,vm=0;function ml(){throw Error(m(321))}function tc(l,t){if(t===null)return!1;for(var a=0;a<t.length&&a<l.length;a++)if(!tt(l[a],t[a]))return!1;return!0}function ac(l,t,a,e,n,u){return Rt=u,Y=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,z.H=l===null||l.memoizedState===null?Bs:yc,Ra=!1,u=a(e,n),Ra=!1,pe&&(u=Po(t,a,e,n)),Io(l),u}function Io(l){z.H=nn;var t=P!==null&&P.next!==null;if(Rt=0,xl=P=Y=null,fi=!1,tn=0,ge=null,t)throw Error(m(300));l===null||Sl||(l=l.dependencies,l!==null&&Pn(l)&&(Sl=!0))}function Po(l,t,a,e){Y=l;var n=0;do{if(pe&&(ge=null),tn=0,pe=!1,25<=n)throw Error(m(301));if(n+=1,xl=P=null,l.updateQueue!=null){var u=l.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}z.H=Cs,u=t(a,e)}while(pe);return u}function xm(){var l=z.H,t=l.useState()[0];return t=typeof t.then=="function"?an(t):t,l=l.useState()[0],(P!==null?P.memoizedState:null)!==l&&(Y.flags|=1024),t}function ec(){var l=oi!==0;return oi=0,l}function nc(l,t,a){t.updateQueue=l.updateQueue,t.flags&=-2053,l.lanes&=~a}function ic(l){if(fi){for(l=l.memoizedState;l!==null;){var t=l.queue;t!==null&&(t.pending=null),l=l.next}fi=!1}Rt=0,xl=P=Y=null,pe=!1,tn=oi=0,ge=null}function Rl(){var l={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xl===null?Y.memoizedState=xl=l:xl=xl.next=l,xl}function yl(){if(P===null){var l=Y.alternate;l=l!==null?l.memoizedState:null}else l=P.next;var t=xl===null?Y.memoizedState:xl.next;if(t!==null)xl=t,P=l;else{if(l===null)throw Y.alternate===null?Error(m(467)):Error(m(310));P=l,l={memoizedState:P.memoizedState,baseState:P.baseState,baseQueue:P.baseQueue,queue:P.queue,next:null},xl===null?Y.memoizedState=xl=l:xl=xl.next=l}return xl}function si(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function an(l){var t=tn;return tn+=1,ge===null&&(ge=[]),l=Qo(ge,l,t),t=Y,(xl===null?t.memoizedState:xl.next)===null&&(t=t.alternate,z.H=t===null||t.memoizedState===null?Bs:yc),l}function ri(l){if(l!==null&&typeof l=="object"){if(typeof l.then=="function")return an(l);if(l.$$typeof===Ol)return Hl(l)}throw Error(m(438,String(l)))}function uc(l){var t=null,a=Y.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var e=Y.alternate;e!==null&&(e=e.updateQueue,e!==null&&(e=e.memoCache,e!=null&&(t={data:e.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=si(),Y.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(l),e=0;e<l;e++)a[e]=Ut;return t.index++,a}function Gt(l,t){return typeof t=="function"?t(l):t}function di(l){var t=yl();return cc(t,P,l)}function cc(l,t,a){var e=l.queue;if(e===null)throw Error(m(311));e.lastRenderedReducer=a;var n=l.baseQueue,u=e.pending;if(u!==null){if(n!==null){var c=n.next;n.next=u.next,u.next=c}t.baseQueue=n=u,e.pending=null}if(u=l.baseState,n===null)l.memoizedState=u;else{t=n.next;var f=c=null,s=null,g=t,x=!1;do{var _=g.lane&-536870913;if(_!==g.lane?(Z&_)===_:(Rt&_)===_){var y=g.revertLane;if(y===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),_===se&&(x=!0);else if((Rt&y)===y){g=g.next,y===se&&(x=!0);continue}else _={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},s===null?(f=s=_,c=u):s=s.next=_,Y.lanes|=y,ha|=y;_=g.action,Ra&&a(u,_),u=g.hasEagerState?g.eagerState:a(u,_)}else y={lane:_,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},s===null?(f=s=y,c=u):s=s.next=y,Y.lanes|=_,ha|=_;g=g.next}while(g!==null&&g!==t);if(s===null?c=u:s.next=f,!tt(u,l.memoizedState)&&(Sl=!0,x&&(a=re,a!==null)))throw a;l.memoizedState=u,l.baseState=c,l.baseQueue=s,e.lastRenderedState=u}return n===null&&(e.lanes=0),[l.memoizedState,e.dispatch]}function fc(l){var t=yl(),a=t.queue;if(a===null)throw Error(m(311));a.lastRenderedReducer=l;var e=a.dispatch,n=a.pending,u=t.memoizedState;if(n!==null){a.pending=null;var c=n=n.next;do u=l(u,c.action),c=c.next;while(c!==n);tt(u,t.memoizedState)||(Sl=!0),t.memoizedState=u,t.baseQueue===null&&(t.baseState=u),a.lastRenderedState=u}return[u,e]}function ls(l,t,a){var e=Y,n=yl(),u=V;if(u){if(a===void 0)throw Error(m(407));a=a()}else a=t();var c=!tt((P||n).memoizedState,a);if(c&&(n.memoizedState=a,Sl=!0),n=n.queue,rc(es.bind(null,e,n,l),[l]),n.getSnapshot!==t||c||xl!==null&&xl.memoizedState.tag&1){if(e.flags|=2048,ye(9,{destroy:void 0},as.bind(null,e,n,a,t),null),al===null)throw Error(m(349));u||(Rt&127)!==0||ts(e,t,a)}return a}function ts(l,t,a){l.flags|=16384,l={getSnapshot:t,value:a},t=Y.updateQueue,t===null?(t=si(),Y.updateQueue=t,t.stores=[l]):(a=t.stores,a===null?t.stores=[l]:a.push(l))}function as(l,t,a,e){t.value=a,t.getSnapshot=e,ns(t)&&is(l)}function es(l,t,a){return a(function(){ns(t)&&is(l)})}function ns(l){var t=l.getSnapshot;l=l.value;try{var a=t();return!tt(l,a)}catch{return!0}}function is(l){var t=Ua(l,2);t!==null&&Jl(t,l,2)}function oc(l){var t=Rl();if(typeof l=="function"){var a=l;if(l=a(),Ra){la(!0);try{a()}finally{la(!1)}}}return t.memoizedState=t.baseState=l,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gt,lastRenderedState:l},t}function us(l,t,a,e){return l.baseState=a,cc(l,P,typeof e=="function"?e:Gt)}function Sm(l,t,a,e,n){if(pi(l))throw Error(m(485));if(l=t.action,l!==null){var u={payload:n,action:l,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(c){u.listeners.push(c)}};z.T!==null?a(!0):u.isTransition=!1,e(u),a=t.pending,a===null?(u.next=t.pending=u,cs(t,u)):(u.next=a.next,t.pending=a.next=u)}}function cs(l,t){var a=t.action,e=t.payload,n=l.state;if(t.isTransition){var u=z.T,c={};z.T=c;try{var f=a(n,e),s=z.S;s!==null&&s(c,f),fs(l,t,f)}catch(g){sc(l,t,g)}finally{u!==null&&c.types!==null&&(u.types=c.types),z.T=u}}else try{u=a(n,e),fs(l,t,u)}catch(g){sc(l,t,g)}}function fs(l,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(e){os(l,t,e)},function(e){return sc(l,t,e)}):os(l,t,a)}function os(l,t,a){t.status="fulfilled",t.value=a,ss(t),l.state=a,t=l.pending,t!==null&&(a=t.next,a===t?l.pending=null:(a=a.next,t.next=a,cs(l,a)))}function sc(l,t,a){var e=l.pending;if(l.pending=null,e!==null){e=e.next;do t.status="rejected",t.reason=a,ss(t),t=t.next;while(t!==e)}l.action=null}function ss(l){l=l.listeners;for(var t=0;t<l.length;t++)(0,l[t])()}function rs(l,t){return t}function ds(l,t){if(V){var a=al.formState;if(a!==null){l:{var e=Y;if(V){if(ul){t:{for(var n=ul,u=pt;n.nodeType!==8;){if(!u){n=null;break t}if(n=yt(n.nextSibling),n===null){n=null;break t}}u=n.data,n=u==="F!"||u==="F"?n:null}if(n){ul=yt(n.nextSibling),e=n.data==="F!";break l}}ia(e)}e=!1}e&&(t=a[0])}}return a=Rl(),a.memoizedState=a.baseState=t,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:t},a.queue=e,a=Us.bind(null,Y,e),e.dispatch=a,e=oc(!1),u=gc.bind(null,Y,!1,e.queue),e=Rl(),n={state:t,dispatch:null,action:l,pending:null},e.queue=n,a=Sm.bind(null,Y,n,u,a),n.dispatch=a,e.memoizedState=l,[t,a,!1]}function ms(l){var t=yl();return hs(t,P,l)}function hs(l,t,a){if(t=cc(l,t,rs)[0],l=di(Gt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var e=an(t)}catch(c){throw c===de?ai:c}else e=t;t=yl();var n=t.queue,u=n.dispatch;return a!==t.memoizedState&&(Y.flags|=2048,ye(9,{destroy:void 0},zm.bind(null,n,a),null)),[e,u,l]}function zm(l,t){l.action=t}function ps(l){var t=yl(),a=P;if(a!==null)return hs(t,a,l);yl(),t=t.memoizedState,a=yl();var e=a.queue.dispatch;return a.memoizedState=l,[t,e,!1]}function ye(l,t,a,e){return l={tag:l,create:a,deps:e,inst:t,next:null},t=Y.updateQueue,t===null&&(t=si(),Y.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=l.next=l:(e=a.next,a.next=l,l.next=e,t.lastEffect=l),l}function gs(){return yl().memoizedState}function mi(l,t,a,e){var n=Rl();Y.flags|=l,n.memoizedState=ye(1|t,{destroy:void 0},a,e===void 0?null:e)}function hi(l,t,a,e){var n=yl();e=e===void 0?null:e;var u=n.memoizedState.inst;P!==null&&e!==null&&tc(e,P.memoizedState.deps)?n.memoizedState=ye(t,u,a,e):(Y.flags|=l,n.memoizedState=ye(1|t,u,a,e))}function ys(l,t){mi(8390656,8,l,t)}function rc(l,t){hi(2048,8,l,t)}function _m(l){Y.flags|=4;var t=Y.updateQueue;if(t===null)t=si(),Y.updateQueue=t,t.events=[l];else{var a=t.events;a===null?t.events=[l]:a.push(l)}}function bs(l){var t=yl().memoizedState;return _m({ref:t,nextImpl:l}),function(){if((k&2)!==0)throw Error(m(440));return t.impl.apply(void 0,arguments)}}function vs(l,t){return hi(4,2,l,t)}function xs(l,t){return hi(4,4,l,t)}function Ss(l,t){if(typeof t=="function"){l=l();var a=t(l);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return l=l(),t.current=l,function(){t.current=null}}function zs(l,t,a){a=a!=null?a.concat([l]):null,hi(4,4,Ss.bind(null,t,l),a)}function dc(){}function _s(l,t){var a=yl();t=t===void 0?null:t;var e=a.memoizedState;return t!==null&&tc(t,e[1])?e[0]:(a.memoizedState=[l,t],l)}function As(l,t){var a=yl();t=t===void 0?null:t;var e=a.memoizedState;if(t!==null&&tc(t,e[1]))return e[0];if(e=l(),Ra){la(!0);try{l()}finally{la(!1)}}return a.memoizedState=[e,t],e}function mc(l,t,a){return a===void 0||(Rt&1073741824)!==0&&(Z&261930)===0?l.memoizedState=t:(l.memoizedState=a,l=Tr(),Y.lanes|=l,ha|=l,a)}function Ts(l,t,a,e){return tt(a,t)?a:he.current!==null?(l=mc(l,a,e),tt(l,t)||(Sl=!0),l):(Rt&42)===0||(Rt&1073741824)!==0&&(Z&261930)===0?(Sl=!0,l.memoizedState=a):(l=Tr(),Y.lanes|=l,ha|=l,t)}function js(l,t,a,e,n){var u=O.p;O.p=u!==0&&8>u?u:8;var c=z.T,f={};z.T=f,gc(l,!1,t,a);try{var s=n(),g=z.S;if(g!==null&&g(f,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var x=bm(s,e);en(l,t,x,ct(l))}else en(l,t,e,ct(l))}catch(_){en(l,t,{then:function(){},status:"rejected",reason:_},ct())}finally{O.p=u,c!==null&&f.types!==null&&(c.types=f.types),z.T=c}}function Am(){}function hc(l,t,a,e){if(l.tag!==5)throw Error(m(476));var n=Ms(l).queue;js(l,n,t,q,a===null?Am:function(){return Es(l),a(e)})}function Ms(l){var t=l.memoizedState;if(t!==null)return t;t={memoizedState:q,baseState:q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gt,lastRenderedState:q},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gt,lastRenderedState:a},next:null},l.memoizedState=t,l=l.alternate,l!==null&&(l.memoizedState=t),t}function Es(l){var t=Ms(l);t.next===null&&(t=l.alternate.memoizedState),en(l,t.next.queue,{},ct())}function pc(){return Hl(Sn)}function Os(){return yl().memoizedState}function Ds(){return yl().memoizedState}function Tm(l){for(var t=l.return;t!==null;){switch(t.tag){case 24:case 3:var a=ct();l=fa(a);var e=oa(t,l,a);e!==null&&(Jl(e,t,a),Ie(e,t,a)),t={cache:Zu()},l.payload=t;return}t=t.return}}function jm(l,t,a){var e=ct();a={lane:e,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},pi(l)?Hs(t,a):(a=Nu(l,t,a,e),a!==null&&(Jl(a,l,e),Ns(a,t,e)))}function Us(l,t,a){var e=ct();en(l,t,a,e)}function en(l,t,a,e){var n={lane:e,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(pi(l))Hs(t,n);else{var u=l.alternate;if(l.lanes===0&&(u===null||u.lanes===0)&&(u=t.lastRenderedReducer,u!==null))try{var c=t.lastRenderedState,f=u(c,a);if(n.hasEagerState=!0,n.eagerState=f,tt(f,c))return kn(l,t,n,0),al===null&&Jn(),!1}catch{}if(a=Nu(l,t,n,e),a!==null)return Jl(a,l,e),Ns(a,t,e),!0}return!1}function gc(l,t,a,e){if(e={lane:2,revertLane:Jc(),gesture:null,action:e,hasEagerState:!1,eagerState:null,next:null},pi(l)){if(t)throw Error(m(479))}else t=Nu(l,a,e,2),t!==null&&Jl(t,l,2)}function pi(l){var t=l.alternate;return l===Y||t!==null&&t===Y}function Hs(l,t){pe=fi=!0;var a=l.pending;a===null?t.next=t:(t.next=a.next,a.next=t),l.pending=t}function Ns(l,t,a){if((a&4194048)!==0){var e=t.lanes;e&=l.pendingLanes,a|=e,t.lanes=a,qf(l,a)}}var nn={readContext:Hl,use:ri,useCallback:ml,useContext:ml,useEffect:ml,useImperativeHandle:ml,useLayoutEffect:ml,useInsertionEffect:ml,useMemo:ml,useReducer:ml,useRef:ml,useState:ml,useDebugValue:ml,useDeferredValue:ml,useTransition:ml,useSyncExternalStore:ml,useId:ml,useHostTransitionStatus:ml,useFormState:ml,useActionState:ml,useOptimistic:ml,useMemoCache:ml,useCacheRefresh:ml};nn.useEffectEvent=ml;var Bs={readContext:Hl,use:ri,useCallback:function(l,t){return Rl().memoizedState=[l,t===void 0?null:t],l},useContext:Hl,useEffect:ys,useImperativeHandle:function(l,t,a){a=a!=null?a.concat([l]):null,mi(4194308,4,Ss.bind(null,t,l),a)},useLayoutEffect:function(l,t){return mi(4194308,4,l,t)},useInsertionEffect:function(l,t){mi(4,2,l,t)},useMemo:function(l,t){var a=Rl();t=t===void 0?null:t;var e=l();if(Ra){la(!0);try{l()}finally{la(!1)}}return a.memoizedState=[e,t],e},useReducer:function(l,t,a){var e=Rl();if(a!==void 0){var n=a(t);if(Ra){la(!0);try{a(t)}finally{la(!1)}}}else n=t;return e.memoizedState=e.baseState=n,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:l,lastRenderedState:n},e.queue=l,l=l.dispatch=jm.bind(null,Y,l),[e.memoizedState,l]},useRef:function(l){var t=Rl();return l={current:l},t.memoizedState=l},useState:function(l){l=oc(l);var t=l.queue,a=Us.bind(null,Y,t);return t.dispatch=a,[l.memoizedState,a]},useDebugValue:dc,useDeferredValue:function(l,t){var a=Rl();return mc(a,l,t)},useTransition:function(){var l=oc(!1);return l=js.bind(null,Y,l.queue,!0,!1),Rl().memoizedState=l,[!1,l]},useSyncExternalStore:function(l,t,a){var e=Y,n=Rl();if(V){if(a===void 0)throw Error(m(407));a=a()}else{if(a=t(),al===null)throw Error(m(349));(Z&127)!==0||ts(e,t,a)}n.memoizedState=a;var u={value:a,getSnapshot:t};return n.queue=u,ys(es.bind(null,e,u,l),[l]),e.flags|=2048,ye(9,{destroy:void 0},as.bind(null,e,u,a,t),null),a},useId:function(){var l=Rl(),t=al.identifierPrefix;if(V){var a=Mt,e=jt;a=(e&~(1<<32-lt(e)-1)).toString(32)+a,t="_"+t+"R_"+a,a=oi++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=vm++,t="_"+t+"r_"+a.toString(32)+"_";return l.memoizedState=t},useHostTransitionStatus:pc,useFormState:ds,useActionState:ds,useOptimistic:function(l){var t=Rl();t.memoizedState=t.baseState=l;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=gc.bind(null,Y,!0,a),a.dispatch=t,[l,t]},useMemoCache:uc,useCacheRefresh:function(){return Rl().memoizedState=Tm.bind(null,Y)},useEffectEvent:function(l){var t=Rl(),a={impl:l};return t.memoizedState=a,function(){if((k&2)!==0)throw Error(m(440));return a.impl.apply(void 0,arguments)}}},yc={readContext:Hl,use:ri,useCallback:_s,useContext:Hl,useEffect:rc,useImperativeHandle:zs,useInsertionEffect:vs,useLayoutEffect:xs,useMemo:As,useReducer:di,useRef:gs,useState:function(){return di(Gt)},useDebugValue:dc,useDeferredValue:function(l,t){var a=yl();return Ts(a,P.memoizedState,l,t)},useTransition:function(){var l=di(Gt)[0],t=yl().memoizedState;return[typeof l=="boolean"?l:an(l),t]},useSyncExternalStore:ls,useId:Os,useHostTransitionStatus:pc,useFormState:ms,useActionState:ms,useOptimistic:function(l,t){var a=yl();return us(a,P,l,t)},useMemoCache:uc,useCacheRefresh:Ds};yc.useEffectEvent=bs;var Cs={readContext:Hl,use:ri,useCallback:_s,useContext:Hl,useEffect:rc,useImperativeHandle:zs,useInsertionEffect:vs,useLayoutEffect:xs,useMemo:As,useReducer:fc,useRef:gs,useState:function(){return fc(Gt)},useDebugValue:dc,useDeferredValue:function(l,t){var a=yl();return P===null?mc(a,l,t):Ts(a,P.memoizedState,l,t)},useTransition:function(){var l=fc(Gt)[0],t=yl().memoizedState;return[typeof l=="boolean"?l:an(l),t]},useSyncExternalStore:ls,useId:Os,useHostTransitionStatus:pc,useFormState:ps,useActionState:ps,useOptimistic:function(l,t){var a=yl();return P!==null?us(a,P,l,t):(a.baseState=l,[l,a.queue.dispatch])},useMemoCache:uc,useCacheRefresh:Ds};Cs.useEffectEvent=bs;function bc(l,t,a,e){t=l.memoizedState,a=a(e,t),a=a==null?t:H({},t,a),l.memoizedState=a,l.lanes===0&&(l.updateQueue.baseState=a)}var vc={enqueueSetState:function(l,t,a){l=l._reactInternals;var e=ct(),n=fa(e);n.payload=t,a!=null&&(n.callback=a),t=oa(l,n,e),t!==null&&(Jl(t,l,e),Ie(t,l,e))},enqueueReplaceState:function(l,t,a){l=l._reactInternals;var e=ct(),n=fa(e);n.tag=1,n.payload=t,a!=null&&(n.callback=a),t=oa(l,n,e),t!==null&&(Jl(t,l,e),Ie(t,l,e))},enqueueForceUpdate:function(l,t){l=l._reactInternals;var a=ct(),e=fa(a);e.tag=2,t!=null&&(e.callback=t),t=oa(l,e,a),t!==null&&(Jl(t,l,a),Ie(t,l,a))}};function $s(l,t,a,e,n,u,c){return l=l.stateNode,typeof l.shouldComponentUpdate=="function"?l.shouldComponentUpdate(e,u,c):t.prototype&&t.prototype.isPureReactComponent?!Ze(a,e)||!Ze(n,u):!0}function qs(l,t,a,e){l=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,e),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,e),t.state!==l&&vc.enqueueReplaceState(t,t.state,null)}function Ga(l,t){var a=t;if("ref"in t){a={};for(var e in t)e!=="ref"&&(a[e]=t[e])}if(l=l.defaultProps){a===t&&(a=H({},a));for(var n in l)a[n]===void 0&&(a[n]=l[n])}return a}function Ys(l){Kn(l)}function ws(l){console.error(l)}function Rs(l){Kn(l)}function gi(l,t){try{var a=l.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Gs(l,t,a){try{var e=l.onCaughtError;e(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function xc(l,t,a){return a=fa(a),a.tag=3,a.payload={element:null},a.callback=function(){gi(l,t)},a}function Xs(l){return l=fa(l),l.tag=3,l}function Qs(l,t,a,e){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var u=e.value;l.payload=function(){return n(u)},l.callback=function(){Gs(t,a,e)}}var c=a.stateNode;c!==null&&typeof c.componentDidCatch=="function"&&(l.callback=function(){Gs(t,a,e),typeof n!="function"&&(pa===null?pa=new Set([this]):pa.add(this));var f=e.stack;this.componentDidCatch(e.value,{componentStack:f!==null?f:""})})}function Mm(l,t,a,e,n){if(a.flags|=32768,e!==null&&typeof e=="object"&&typeof e.then=="function"){if(t=a.alternate,t!==null&&oe(t,a,n,!0),a=et.current,a!==null){switch(a.tag){case 31:case 13:return gt===null?Ei():a.alternate===null&&hl===0&&(hl=3),a.flags&=-257,a.flags|=65536,a.lanes=n,e===ei?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([e]):t.add(e),Lc(l,e,n)),!1;case 22:return a.flags|=65536,e===ei?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([e])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([e]):a.add(e)),Lc(l,e,n)),!1}throw Error(m(435,a.tag))}return Lc(l,e,n),Ei(),!1}if(V)return t=et.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,e!==wu&&(l=Error(m(422),{cause:e}),Ke(dt(l,a)))):(e!==wu&&(t=Error(m(423),{cause:e}),Ke(dt(t,a))),l=l.current.alternate,l.flags|=65536,n&=-n,l.lanes|=n,e=dt(e,a),n=xc(l.stateNode,e,n),Wu(l,n),hl!==4&&(hl=2)),!1;var u=Error(m(520),{cause:e});if(u=dt(u,a),mn===null?mn=[u]:mn.push(u),hl!==4&&(hl=2),t===null)return!0;e=dt(e,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,l=n&-n,a.lanes|=l,l=xc(a.stateNode,e,l),Wu(a,l),!1;case 1:if(t=a.type,u=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(pa===null||!pa.has(u))))return a.flags|=65536,n&=-n,a.lanes|=n,n=Xs(n),Qs(n,l,a,e),Wu(a,n),!1}a=a.return}while(a!==null);return!1}var Sc=Error(m(461)),Sl=!1;function Nl(l,t,a,e){t.child=l===null?Ko(t,null,a,e):wa(t,l.child,a,e)}function Zs(l,t,a,e,n){a=a.render;var u=t.ref;if("ref"in e){var c={};for(var f in e)f!=="ref"&&(c[f]=e[f])}else c=e;return Ca(t),e=ac(l,t,a,c,u,n),f=ec(),l!==null&&!Sl?(nc(l,t,n),Xt(l,t,n)):(V&&f&&qu(t),t.flags|=1,Nl(l,t,e,n),t.child)}function Ls(l,t,a,e,n){if(l===null){var u=a.type;return typeof u=="function"&&!Bu(u)&&u.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=u,Vs(l,t,u,e,n)):(l=Fn(a.type,null,e,t,t.mode,n),l.ref=t.ref,l.return=t,t.child=l)}if(u=l.child,!Oc(l,n)){var c=u.memoizedProps;if(a=a.compare,a=a!==null?a:Ze,a(c,e)&&l.ref===t.ref)return Xt(l,t,n)}return t.flags|=1,l=$t(u,e),l.ref=t.ref,l.return=t,t.child=l}function Vs(l,t,a,e,n){if(l!==null){var u=l.memoizedProps;if(Ze(u,e)&&l.ref===t.ref)if(Sl=!1,t.pendingProps=e=u,Oc(l,n))(l.flags&131072)!==0&&(Sl=!0);else return t.lanes=l.lanes,Xt(l,t,n)}return zc(l,t,a,e,n)}function Ks(l,t,a,e){var n=e.children,u=l!==null?l.memoizedState:null;if(l===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.mode==="hidden"){if((t.flags&128)!==0){if(u=u!==null?u.baseLanes|a:a,l!==null){for(e=t.child=l.child,n=0;e!==null;)n=n|e.lanes|e.childLanes,e=e.sibling;e=n&~u}else e=0,t.child=null;return Js(l,t,u,a,e)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},l!==null&&ti(t,u!==null?u.cachePool:null),u!==null?Wo(t,u):Iu(),Fo(t);else return e=t.lanes=536870912,Js(l,t,u!==null?u.baseLanes|a:a,a,e)}else u!==null?(ti(t,u.cachePool),Wo(t,u),ra(),t.memoizedState=null):(l!==null&&ti(t,null),Iu(),ra());return Nl(l,t,n,a),t.child}function un(l,t){return l!==null&&l.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Js(l,t,a,e,n){var u=Vu();return u=u===null?null:{parent:vl._currentValue,pool:u},t.memoizedState={baseLanes:a,cachePool:u},l!==null&&ti(t,null),Iu(),Fo(t),l!==null&&oe(l,t,e,!0),t.childLanes=n,null}function yi(l,t){return t=vi({mode:t.mode,children:t.children},l.mode),t.ref=l.ref,l.child=t,t.return=l,t}function ks(l,t,a){return wa(t,l.child,null,a),l=yi(t,t.pendingProps),l.flags|=2,nt(t),t.memoizedState=null,l}function Em(l,t,a){var e=t.pendingProps,n=(t.flags&128)!==0;if(t.flags&=-129,l===null){if(V){if(e.mode==="hidden")return l=yi(t,e),t.lanes=536870912,un(null,l);if(lc(t),(l=ul)?(l=cd(l,pt),l=l!==null&&l.data==="&"?l:null,l!==null&&(t.memoizedState={dehydrated:l,treeContext:ea!==null?{id:jt,overflow:Mt}:null,retryLane:536870912,hydrationErrors:null},a=Ho(l),a.return=t,t.child=a,Ul=t,ul=null)):l=null,l===null)throw ia(t);return t.lanes=536870912,null}return yi(t,e)}var u=l.memoizedState;if(u!==null){var c=u.dehydrated;if(lc(t),n)if(t.flags&256)t.flags&=-257,t=ks(l,t,a);else if(t.memoizedState!==null)t.child=l.child,t.flags|=128,t=null;else throw Error(m(558));else if(Sl||oe(l,t,a,!1),n=(a&l.childLanes)!==0,Sl||n){if(e=al,e!==null&&(c=Yf(e,a),c!==0&&c!==u.retryLane))throw u.retryLane=c,Ua(l,c),Jl(e,l,c),Sc;Ei(),t=ks(l,t,a)}else l=u.treeContext,ul=yt(c.nextSibling),Ul=t,V=!0,na=null,pt=!1,l!==null&&Co(t,l),t=yi(t,e),t.flags|=4096;return t}return l=$t(l.child,{mode:e.mode,children:e.children}),l.ref=t.ref,t.child=l,l.return=t,l}function bi(l,t){var a=t.ref;if(a===null)l!==null&&l.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(m(284));(l===null||l.ref!==a)&&(t.flags|=4194816)}}function zc(l,t,a,e,n){return Ca(t),a=ac(l,t,a,e,void 0,n),e=ec(),l!==null&&!Sl?(nc(l,t,n),Xt(l,t,n)):(V&&e&&qu(t),t.flags|=1,Nl(l,t,a,n),t.child)}function Ws(l,t,a,e,n,u){return Ca(t),t.updateQueue=null,a=Po(t,e,a,n),Io(l),e=ec(),l!==null&&!Sl?(nc(l,t,u),Xt(l,t,u)):(V&&e&&qu(t),t.flags|=1,Nl(l,t,a,u),t.child)}function Fs(l,t,a,e,n){if(Ca(t),t.stateNode===null){var u=ie,c=a.contextType;typeof c=="object"&&c!==null&&(u=Hl(c)),u=new a(e,u),t.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=vc,t.stateNode=u,u._reactInternals=t,u=t.stateNode,u.props=e,u.state=t.memoizedState,u.refs={},Ju(t),c=a.contextType,u.context=typeof c=="object"&&c!==null?Hl(c):ie,u.state=t.memoizedState,c=a.getDerivedStateFromProps,typeof c=="function"&&(bc(t,a,c,e),u.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(c=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),c!==u.state&&vc.enqueueReplaceState(u,u.state,null),ln(t,e,u,n),Pe(),u.state=t.memoizedState),typeof u.componentDidMount=="function"&&(t.flags|=4194308),e=!0}else if(l===null){u=t.stateNode;var f=t.memoizedProps,s=Ga(a,f);u.props=s;var g=u.context,x=a.contextType;c=ie,typeof x=="object"&&x!==null&&(c=Hl(x));var _=a.getDerivedStateFromProps;x=typeof _=="function"||typeof u.getSnapshotBeforeUpdate=="function",f=t.pendingProps!==f,x||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(f||g!==c)&&qs(t,u,e,c),ca=!1;var y=t.memoizedState;u.state=y,ln(t,e,u,n),Pe(),g=t.memoizedState,f||y!==g||ca?(typeof _=="function"&&(bc(t,a,_,e),g=t.memoizedState),(s=ca||$s(t,a,s,e,y,g,c))?(x||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=e,t.memoizedState=g),u.props=e,u.state=g,u.context=c,e=s):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),e=!1)}else{u=t.stateNode,ku(l,t),c=t.memoizedProps,x=Ga(a,c),u.props=x,_=t.pendingProps,y=u.context,g=a.contextType,s=ie,typeof g=="object"&&g!==null&&(s=Hl(g)),f=a.getDerivedStateFromProps,(g=typeof f=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(c!==_||y!==s)&&qs(t,u,e,s),ca=!1,y=t.memoizedState,u.state=y,ln(t,e,u,n),Pe();var b=t.memoizedState;c!==_||y!==b||ca||l!==null&&l.dependencies!==null&&Pn(l.dependencies)?(typeof f=="function"&&(bc(t,a,f,e),b=t.memoizedState),(x=ca||$s(t,a,x,e,y,b,s)||l!==null&&l.dependencies!==null&&Pn(l.dependencies))?(g||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(e,b,s),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(e,b,s)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||c===l.memoizedProps&&y===l.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===l.memoizedProps&&y===l.memoizedState||(t.flags|=1024),t.memoizedProps=e,t.memoizedState=b),u.props=e,u.state=b,u.context=s,e=x):(typeof u.componentDidUpdate!="function"||c===l.memoizedProps&&y===l.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||c===l.memoizedProps&&y===l.memoizedState||(t.flags|=1024),e=!1)}return u=e,bi(l,t),e=(t.flags&128)!==0,u||e?(u=t.stateNode,a=e&&typeof a.getDerivedStateFromError!="function"?null:u.render(),t.flags|=1,l!==null&&e?(t.child=wa(t,l.child,null,n),t.child=wa(t,null,a,n)):Nl(l,t,a,n),t.memoizedState=u.state,l=t.child):l=Xt(l,t,n),l}function Is(l,t,a,e){return Na(),t.flags|=256,Nl(l,t,a,e),t.child}var _c={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ac(l){return{baseLanes:l,cachePool:Go()}}function Tc(l,t,a){return l=l!==null?l.childLanes&~a:0,t&&(l|=ut),l}function Ps(l,t,a){var e=t.pendingProps,n=!1,u=(t.flags&128)!==0,c;if((c=u)||(c=l!==null&&l.memoizedState===null?!1:(gl.current&2)!==0),c&&(n=!0,t.flags&=-129),c=(t.flags&32)!==0,t.flags&=-33,l===null){if(V){if(n?sa(t):ra(),(l=ul)?(l=cd(l,pt),l=l!==null&&l.data!=="&"?l:null,l!==null&&(t.memoizedState={dehydrated:l,treeContext:ea!==null?{id:jt,overflow:Mt}:null,retryLane:536870912,hydrationErrors:null},a=Ho(l),a.return=t,t.child=a,Ul=t,ul=null)):l=null,l===null)throw ia(t);return ff(l)?t.lanes=32:t.lanes=536870912,null}var f=e.children;return e=e.fallback,n?(ra(),n=t.mode,f=vi({mode:"hidden",children:f},n),e=Ha(e,n,a,null),f.return=t,e.return=t,f.sibling=e,t.child=f,e=t.child,e.memoizedState=Ac(a),e.childLanes=Tc(l,c,a),t.memoizedState=_c,un(null,e)):(sa(t),jc(t,f))}var s=l.memoizedState;if(s!==null&&(f=s.dehydrated,f!==null)){if(u)t.flags&256?(sa(t),t.flags&=-257,t=Mc(l,t,a)):t.memoizedState!==null?(ra(),t.child=l.child,t.flags|=128,t=null):(ra(),f=e.fallback,n=t.mode,e=vi({mode:"visible",children:e.children},n),f=Ha(f,n,a,null),f.flags|=2,e.return=t,f.return=t,e.sibling=f,t.child=e,wa(t,l.child,null,a),e=t.child,e.memoizedState=Ac(a),e.childLanes=Tc(l,c,a),t.memoizedState=_c,t=un(null,e));else if(sa(t),ff(f)){if(c=f.nextSibling&&f.nextSibling.dataset,c)var g=c.dgst;c=g,e=Error(m(419)),e.stack="",e.digest=c,Ke({value:e,source:null,stack:null}),t=Mc(l,t,a)}else if(Sl||oe(l,t,a,!1),c=(a&l.childLanes)!==0,Sl||c){if(c=al,c!==null&&(e=Yf(c,a),e!==0&&e!==s.retryLane))throw s.retryLane=e,Ua(l,e),Jl(c,l,e),Sc;cf(f)||Ei(),t=Mc(l,t,a)}else cf(f)?(t.flags|=192,t.child=l.child,t=null):(l=s.treeContext,ul=yt(f.nextSibling),Ul=t,V=!0,na=null,pt=!1,l!==null&&Co(t,l),t=jc(t,e.children),t.flags|=4096);return t}return n?(ra(),f=e.fallback,n=t.mode,s=l.child,g=s.sibling,e=$t(s,{mode:"hidden",children:e.children}),e.subtreeFlags=s.subtreeFlags&65011712,g!==null?f=$t(g,f):(f=Ha(f,n,a,null),f.flags|=2),f.return=t,e.return=t,e.sibling=f,t.child=e,un(null,e),e=t.child,f=l.child.memoizedState,f===null?f=Ac(a):(n=f.cachePool,n!==null?(s=vl._currentValue,n=n.parent!==s?{parent:s,pool:s}:n):n=Go(),f={baseLanes:f.baseLanes|a,cachePool:n}),e.memoizedState=f,e.childLanes=Tc(l,c,a),t.memoizedState=_c,un(l.child,e)):(sa(t),a=l.child,l=a.sibling,a=$t(a,{mode:"visible",children:e.children}),a.return=t,a.sibling=null,l!==null&&(c=t.deletions,c===null?(t.deletions=[l],t.flags|=16):c.push(l)),t.child=a,t.memoizedState=null,a)}function jc(l,t){return t=vi({mode:"visible",children:t},l.mode),t.return=l,l.child=t}function vi(l,t){return l=at(22,l,null,t),l.lanes=0,l}function Mc(l,t,a){return wa(t,l.child,null,a),l=jc(t,t.pendingProps.children),l.flags|=2,t.memoizedState=null,l}function lr(l,t,a){l.lanes|=t;var e=l.alternate;e!==null&&(e.lanes|=t),Xu(l.return,t,a)}function Ec(l,t,a,e,n,u){var c=l.memoizedState;c===null?l.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:e,tail:a,tailMode:n,treeForkCount:u}:(c.isBackwards=t,c.rendering=null,c.renderingStartTime=0,c.last=e,c.tail=a,c.tailMode=n,c.treeForkCount=u)}function tr(l,t,a){var e=t.pendingProps,n=e.revealOrder,u=e.tail;e=e.children;var c=gl.current,f=(c&2)!==0;if(f?(c=c&1|2,t.flags|=128):c&=1,W(gl,c),Nl(l,t,e,a),e=V?Ve:0,!f&&l!==null&&(l.flags&128)!==0)l:for(l=t.child;l!==null;){if(l.tag===13)l.memoizedState!==null&&lr(l,a,t);else if(l.tag===19)lr(l,a,t);else if(l.child!==null){l.child.return=l,l=l.child;continue}if(l===t)break l;for(;l.sibling===null;){if(l.return===null||l.return===t)break l;l=l.return}l.sibling.return=l.return,l=l.sibling}switch(n){case"forwards":for(a=t.child,n=null;a!==null;)l=a.alternate,l!==null&&ci(l)===null&&(n=a),a=a.sibling;a=n,a===null?(n=t.child,t.child=null):(n=a.sibling,a.sibling=null),Ec(t,!1,n,a,u,e);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=t.child,t.child=null;n!==null;){if(l=n.alternate,l!==null&&ci(l)===null){t.child=n;break}l=n.sibling,n.sibling=a,a=n,n=l}Ec(t,!0,a,null,u,e);break;case"together":Ec(t,!1,null,null,void 0,e);break;default:t.memoizedState=null}return t.child}function Xt(l,t,a){if(l!==null&&(t.dependencies=l.dependencies),ha|=t.lanes,(a&t.childLanes)===0)if(l!==null){if(oe(l,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(l!==null&&t.child!==l.child)throw Error(m(153));if(t.child!==null){for(l=t.child,a=$t(l,l.pendingProps),t.child=a,a.return=t;l.sibling!==null;)l=l.sibling,a=a.sibling=$t(l,l.pendingProps),a.return=t;a.sibling=null}return t.child}function Oc(l,t){return(l.lanes&t)!==0?!0:(l=l.dependencies,!!(l!==null&&Pn(l)))}function Om(l,t,a){switch(t.tag){case 3:Dn(t,t.stateNode.containerInfo),ua(t,vl,l.memoizedState.cache),Na();break;case 27:case 5:Pi(t);break;case 4:Dn(t,t.stateNode.containerInfo);break;case 10:ua(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,lc(t),null;break;case 13:var e=t.memoizedState;if(e!==null)return e.dehydrated!==null?(sa(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Ps(l,t,a):(sa(t),l=Xt(l,t,a),l!==null?l.sibling:null);sa(t);break;case 19:var n=(l.flags&128)!==0;if(e=(a&t.childLanes)!==0,e||(oe(l,t,a,!1),e=(a&t.childLanes)!==0),n){if(e)return tr(l,t,a);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),W(gl,gl.current),e)break;return null;case 22:return t.lanes=0,Ks(l,t,a,t.pendingProps);case 24:ua(t,vl,l.memoizedState.cache)}return Xt(l,t,a)}function ar(l,t,a){if(l!==null)if(l.memoizedProps!==t.pendingProps)Sl=!0;else{if(!Oc(l,a)&&(t.flags&128)===0)return Sl=!1,Om(l,t,a);Sl=(l.flags&131072)!==0}else Sl=!1,V&&(t.flags&1048576)!==0&&Bo(t,Ve,t.index);switch(t.lanes=0,t.tag){case 16:l:{var e=t.pendingProps;if(l=qa(t.elementType),t.type=l,typeof l=="function")Bu(l)?(e=Ga(l,e),t.tag=1,t=Fs(null,t,l,e,a)):(t.tag=0,t=zc(null,t,l,e,a));else{if(l!=null){var n=l.$$typeof;if(n===Wl){t.tag=11,t=Zs(null,t,l,e,a);break l}else if(n===Gl){t.tag=14,t=Ls(null,t,l,e,a);break l}}throw t=Ue(l)||l,Error(m(306,t,""))}}return t;case 0:return zc(l,t,t.type,t.pendingProps,a);case 1:return e=t.type,n=Ga(e,t.pendingProps),Fs(l,t,e,n,a);case 3:l:{if(Dn(t,t.stateNode.containerInfo),l===null)throw Error(m(387));e=t.pendingProps;var u=t.memoizedState;n=u.element,ku(l,t),ln(t,e,null,a);var c=t.memoizedState;if(e=c.cache,ua(t,vl,e),e!==u.cache&&Qu(t,[vl],a,!0),Pe(),e=c.element,u.isDehydrated)if(u={element:e,isDehydrated:!1,cache:c.cache},t.updateQueue.baseState=u,t.memoizedState=u,t.flags&256){t=Is(l,t,e,a);break l}else if(e!==n){n=dt(Error(m(424)),t),Ke(n),t=Is(l,t,e,a);break l}else for(l=t.stateNode.containerInfo,l.nodeType===9?l=l.body:l=l.nodeName==="HTML"?l.ownerDocument.body:l,ul=yt(l.firstChild),Ul=t,V=!0,na=null,pt=!0,a=Ko(t,null,e,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Na(),e===n){t=Xt(l,t,a);break l}Nl(l,t,e,a)}t=t.child}return t;case 26:return bi(l,t),l===null?(a=md(t.type,null,t.pendingProps,null))?t.memoizedState=a:V||(a=t.type,l=t.pendingProps,e=Ci(Pt.current).createElement(a),e[Dl]=t,e[Xl]=l,Bl(e,a,l),Ml(e),t.stateNode=e):t.memoizedState=md(t.type,l.memoizedProps,t.pendingProps,l.memoizedState),null;case 27:return Pi(t),l===null&&V&&(e=t.stateNode=sd(t.type,t.pendingProps,Pt.current),Ul=t,pt=!0,n=ul,va(t.type)?(of=n,ul=yt(e.firstChild)):ul=n),Nl(l,t,t.pendingProps.children,a),bi(l,t),l===null&&(t.flags|=4194304),t.child;case 5:return l===null&&V&&((n=e=ul)&&(e=ih(e,t.type,t.pendingProps,pt),e!==null?(t.stateNode=e,Ul=t,ul=yt(e.firstChild),pt=!1,n=!0):n=!1),n||ia(t)),Pi(t),n=t.type,u=t.pendingProps,c=l!==null?l.memoizedProps:null,e=u.children,ef(n,u)?e=null:c!==null&&ef(n,c)&&(t.flags|=32),t.memoizedState!==null&&(n=ac(l,t,xm,null,null,a),Sn._currentValue=n),bi(l,t),Nl(l,t,e,a),t.child;case 6:return l===null&&V&&((l=a=ul)&&(a=uh(a,t.pendingProps,pt),a!==null?(t.stateNode=a,Ul=t,ul=null,l=!0):l=!1),l||ia(t)),null;case 13:return Ps(l,t,a);case 4:return Dn(t,t.stateNode.containerInfo),e=t.pendingProps,l===null?t.child=wa(t,null,e,a):Nl(l,t,e,a),t.child;case 11:return Zs(l,t,t.type,t.pendingProps,a);case 7:return Nl(l,t,t.pendingProps,a),t.child;case 8:return Nl(l,t,t.pendingProps.children,a),t.child;case 12:return Nl(l,t,t.pendingProps.children,a),t.child;case 10:return e=t.pendingProps,ua(t,t.type,e.value),Nl(l,t,e.children,a),t.child;case 9:return n=t.type._context,e=t.pendingProps.children,Ca(t),n=Hl(n),e=e(n),t.flags|=1,Nl(l,t,e,a),t.child;case 14:return Ls(l,t,t.type,t.pendingProps,a);case 15:return Vs(l,t,t.type,t.pendingProps,a);case 19:return tr(l,t,a);case 31:return Em(l,t,a);case 22:return Ks(l,t,a,t.pendingProps);case 24:return Ca(t),e=Hl(vl),l===null?(n=Vu(),n===null&&(n=al,u=Zu(),n.pooledCache=u,u.refCount++,u!==null&&(n.pooledCacheLanes|=a),n=u),t.memoizedState={parent:e,cache:n},Ju(t),ua(t,vl,n)):((l.lanes&a)!==0&&(ku(l,t),ln(t,null,null,a),Pe()),n=l.memoizedState,u=t.memoizedState,n.parent!==e?(n={parent:e,cache:e},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),ua(t,vl,e)):(e=u.cache,ua(t,vl,e),e!==n.cache&&Qu(t,[vl],a,!0))),Nl(l,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(m(156,t.tag))}function Qt(l){l.flags|=4}function Dc(l,t,a,e,n){if((t=(l.mode&32)!==0)&&(t=!1),t){if(l.flags|=16777216,(n&335544128)===n)if(l.stateNode.complete)l.flags|=8192;else if(Or())l.flags|=8192;else throw Ya=ei,Ku}else l.flags&=-16777217}function er(l,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)l.flags&=-16777217;else if(l.flags|=16777216,!bd(t))if(Or())l.flags|=8192;else throw Ya=ei,Ku}function xi(l,t){t!==null&&(l.flags|=4),l.flags&16384&&(t=l.tag!==22?Cf():536870912,l.lanes|=t,Se|=t)}function cn(l,t){if(!V)switch(l.tailMode){case"hidden":t=l.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?l.tail=null:a.sibling=null;break;case"collapsed":a=l.tail;for(var e=null;a!==null;)a.alternate!==null&&(e=a),a=a.sibling;e===null?t||l.tail===null?l.tail=null:l.tail.sibling=null:e.sibling=null}}function cl(l){var t=l.alternate!==null&&l.alternate.child===l.child,a=0,e=0;if(t)for(var n=l.child;n!==null;)a|=n.lanes|n.childLanes,e|=n.subtreeFlags&65011712,e|=n.flags&65011712,n.return=l,n=n.sibling;else for(n=l.child;n!==null;)a|=n.lanes|n.childLanes,e|=n.subtreeFlags,e|=n.flags,n.return=l,n=n.sibling;return l.subtreeFlags|=e,l.childLanes=a,t}function Dm(l,t,a){var e=t.pendingProps;switch(Yu(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return cl(t),null;case 1:return cl(t),null;case 3:return a=t.stateNode,e=null,l!==null&&(e=l.memoizedState.cache),t.memoizedState.cache!==e&&(t.flags|=2048),wt(vl),La(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(l===null||l.child===null)&&(fe(t)?Qt(t):l===null||l.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ru())),cl(t),null;case 26:var n=t.type,u=t.memoizedState;return l===null?(Qt(t),u!==null?(cl(t),er(t,u)):(cl(t),Dc(t,n,null,e,a))):u?u!==l.memoizedState?(Qt(t),cl(t),er(t,u)):(cl(t),t.flags&=-16777217):(l=l.memoizedProps,l!==e&&Qt(t),cl(t),Dc(t,n,l,e,a)),null;case 27:if(Un(t),a=Pt.current,n=t.type,l!==null&&t.stateNode!=null)l.memoizedProps!==e&&Qt(t);else{if(!e){if(t.stateNode===null)throw Error(m(166));return cl(t),null}l=jl.current,fe(t)?$o(t):(l=sd(n,e,a),t.stateNode=l,Qt(t))}return cl(t),null;case 5:if(Un(t),n=t.type,l!==null&&t.stateNode!=null)l.memoizedProps!==e&&Qt(t);else{if(!e){if(t.stateNode===null)throw Error(m(166));return cl(t),null}if(u=jl.current,fe(t))$o(t);else{var c=Ci(Pt.current);switch(u){case 1:u=c.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:u=c.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":u=c.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":u=c.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":u=c.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof e.is=="string"?c.createElement("select",{is:e.is}):c.createElement("select"),e.multiple?u.multiple=!0:e.size&&(u.size=e.size);break;default:u=typeof e.is=="string"?c.createElement(n,{is:e.is}):c.createElement(n)}}u[Dl]=t,u[Xl]=e;l:for(c=t.child;c!==null;){if(c.tag===5||c.tag===6)u.appendChild(c.stateNode);else if(c.tag!==4&&c.tag!==27&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===t)break l;for(;c.sibling===null;){if(c.return===null||c.return===t)break l;c=c.return}c.sibling.return=c.return,c=c.sibling}t.stateNode=u;l:switch(Bl(u,n,e),n){case"button":case"input":case"select":case"textarea":e=!!e.autoFocus;break l;case"img":e=!0;break l;default:e=!1}e&&Qt(t)}}return cl(t),Dc(t,t.type,l===null?null:l.memoizedProps,t.pendingProps,a),null;case 6:if(l&&t.stateNode!=null)l.memoizedProps!==e&&Qt(t);else{if(typeof e!="string"&&t.stateNode===null)throw Error(m(166));if(l=Pt.current,fe(t)){if(l=t.stateNode,a=t.memoizedProps,e=null,n=Ul,n!==null)switch(n.tag){case 27:case 5:e=n.memoizedProps}l[Dl]=t,l=!!(l.nodeValue===a||e!==null&&e.suppressHydrationWarning===!0||Pr(l.nodeValue,a)),l||ia(t,!0)}else l=Ci(l).createTextNode(e),l[Dl]=t,t.stateNode=l}return cl(t),null;case 31:if(a=t.memoizedState,l===null||l.memoizedState!==null){if(e=fe(t),a!==null){if(l===null){if(!e)throw Error(m(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(m(557));l[Dl]=t}else Na(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;cl(t),l=!1}else a=Ru(),l!==null&&l.memoizedState!==null&&(l.memoizedState.hydrationErrors=a),l=!0;if(!l)return t.flags&256?(nt(t),t):(nt(t),null);if((t.flags&128)!==0)throw Error(m(558))}return cl(t),null;case 13:if(e=t.memoizedState,l===null||l.memoizedState!==null&&l.memoizedState.dehydrated!==null){if(n=fe(t),e!==null&&e.dehydrated!==null){if(l===null){if(!n)throw Error(m(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(m(317));n[Dl]=t}else Na(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;cl(t),n=!1}else n=Ru(),l!==null&&l.memoizedState!==null&&(l.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(nt(t),t):(nt(t),null)}return nt(t),(t.flags&128)!==0?(t.lanes=a,t):(a=e!==null,l=l!==null&&l.memoizedState!==null,a&&(e=t.child,n=null,e.alternate!==null&&e.alternate.memoizedState!==null&&e.alternate.memoizedState.cachePool!==null&&(n=e.alternate.memoizedState.cachePool.pool),u=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(u=e.memoizedState.cachePool.pool),u!==n&&(e.flags|=2048)),a!==l&&a&&(t.child.flags|=8192),xi(t,t.updateQueue),cl(t),null);case 4:return La(),l===null&&Ic(t.stateNode.containerInfo),cl(t),null;case 10:return wt(t.type),cl(t),null;case 19:if(sl(gl),e=t.memoizedState,e===null)return cl(t),null;if(n=(t.flags&128)!==0,u=e.rendering,u===null)if(n)cn(e,!1);else{if(hl!==0||l!==null&&(l.flags&128)!==0)for(l=t.child;l!==null;){if(u=ci(l),u!==null){for(t.flags|=128,cn(e,!1),l=u.updateQueue,t.updateQueue=l,xi(t,l),t.subtreeFlags=0,l=a,a=t.child;a!==null;)Uo(a,l),a=a.sibling;return W(gl,gl.current&1|2),V&&qt(t,e.treeForkCount),t.child}l=l.sibling}e.tail!==null&&Il()>Ti&&(t.flags|=128,n=!0,cn(e,!1),t.lanes=4194304)}else{if(!n)if(l=ci(u),l!==null){if(t.flags|=128,n=!0,l=l.updateQueue,t.updateQueue=l,xi(t,l),cn(e,!0),e.tail===null&&e.tailMode==="hidden"&&!u.alternate&&!V)return cl(t),null}else 2*Il()-e.renderingStartTime>Ti&&a!==536870912&&(t.flags|=128,n=!0,cn(e,!1),t.lanes=4194304);e.isBackwards?(u.sibling=t.child,t.child=u):(l=e.last,l!==null?l.sibling=u:t.child=u,e.last=u)}return e.tail!==null?(l=e.tail,e.rendering=l,e.tail=l.sibling,e.renderingStartTime=Il(),l.sibling=null,a=gl.current,W(gl,n?a&1|2:a&1),V&&qt(t,e.treeForkCount),l):(cl(t),null);case 22:case 23:return nt(t),Pu(),e=t.memoizedState!==null,l!==null?l.memoizedState!==null!==e&&(t.flags|=8192):e&&(t.flags|=8192),e?(a&536870912)!==0&&(t.flags&128)===0&&(cl(t),t.subtreeFlags&6&&(t.flags|=8192)):cl(t),a=t.updateQueue,a!==null&&xi(t,a.retryQueue),a=null,l!==null&&l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(a=l.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(t.flags|=2048),l!==null&&sl($a),null;case 24:return a=null,l!==null&&(a=l.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),wt(vl),cl(t),null;case 25:return null;case 30:return null}throw Error(m(156,t.tag))}function Um(l,t){switch(Yu(t),t.tag){case 1:return l=t.flags,l&65536?(t.flags=l&-65537|128,t):null;case 3:return wt(vl),La(),l=t.flags,(l&65536)!==0&&(l&128)===0?(t.flags=l&-65537|128,t):null;case 26:case 27:case 5:return Un(t),null;case 31:if(t.memoizedState!==null){if(nt(t),t.alternate===null)throw Error(m(340));Na()}return l=t.flags,l&65536?(t.flags=l&-65537|128,t):null;case 13:if(nt(t),l=t.memoizedState,l!==null&&l.dehydrated!==null){if(t.alternate===null)throw Error(m(340));Na()}return l=t.flags,l&65536?(t.flags=l&-65537|128,t):null;case 19:return sl(gl),null;case 4:return La(),null;case 10:return wt(t.type),null;case 22:case 23:return nt(t),Pu(),l!==null&&sl($a),l=t.flags,l&65536?(t.flags=l&-65537|128,t):null;case 24:return wt(vl),null;case 25:return null;default:return null}}function nr(l,t){switch(Yu(t),t.tag){case 3:wt(vl),La();break;case 26:case 27:case 5:Un(t);break;case 4:La();break;case 31:t.memoizedState!==null&&nt(t);break;case 13:nt(t);break;case 19:sl(gl);break;case 10:wt(t.type);break;case 22:case 23:nt(t),Pu(),l!==null&&sl($a);break;case 24:wt(vl)}}function fn(l,t){try{var a=t.updateQueue,e=a!==null?a.lastEffect:null;if(e!==null){var n=e.next;a=n;do{if((a.tag&l)===l){e=void 0;var u=a.create,c=a.inst;e=u(),c.destroy=e}a=a.next}while(a!==n)}}catch(f){I(t,t.return,f)}}function da(l,t,a){try{var e=t.updateQueue,n=e!==null?e.lastEffect:null;if(n!==null){var u=n.next;e=u;do{if((e.tag&l)===l){var c=e.inst,f=c.destroy;if(f!==void 0){c.destroy=void 0,n=t;var s=a,g=f;try{g()}catch(x){I(n,s,x)}}}e=e.next}while(e!==u)}}catch(x){I(t,t.return,x)}}function ir(l){var t=l.updateQueue;if(t!==null){var a=l.stateNode;try{ko(t,a)}catch(e){I(l,l.return,e)}}}function ur(l,t,a){a.props=Ga(l.type,l.memoizedProps),a.state=l.memoizedState;try{a.componentWillUnmount()}catch(e){I(l,t,e)}}function on(l,t){try{var a=l.ref;if(a!==null){switch(l.tag){case 26:case 27:case 5:var e=l.stateNode;break;case 30:e=l.stateNode;break;default:e=l.stateNode}typeof a=="function"?l.refCleanup=a(e):a.current=e}}catch(n){I(l,t,n)}}function Et(l,t){var a=l.ref,e=l.refCleanup;if(a!==null)if(typeof e=="function")try{e()}catch(n){I(l,t,n)}finally{l.refCleanup=null,l=l.alternate,l!=null&&(l.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){I(l,t,n)}else a.current=null}function cr(l){var t=l.type,a=l.memoizedProps,e=l.stateNode;try{l:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&e.focus();break l;case"img":a.src?e.src=a.src:a.srcSet&&(e.srcset=a.srcSet)}}catch(n){I(l,l.return,n)}}function Uc(l,t,a){try{var e=l.stateNode;Pm(e,l.type,a,t),e[Xl]=t}catch(n){I(l,l.return,n)}}function fr(l){return l.tag===5||l.tag===3||l.tag===26||l.tag===27&&va(l.type)||l.tag===4}function Hc(l){l:for(;;){for(;l.sibling===null;){if(l.return===null||fr(l.return))return null;l=l.return}for(l.sibling.return=l.return,l=l.sibling;l.tag!==5&&l.tag!==6&&l.tag!==18;){if(l.tag===27&&va(l.type)||l.flags&2||l.child===null||l.tag===4)continue l;l.child.return=l,l=l.child}if(!(l.flags&2))return l.stateNode}}function Nc(l,t,a){var e=l.tag;if(e===5||e===6)l=l.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(l,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(l),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Bt));else if(e!==4&&(e===27&&va(l.type)&&(a=l.stateNode,t=null),l=l.child,l!==null))for(Nc(l,t,a),l=l.sibling;l!==null;)Nc(l,t,a),l=l.sibling}function Si(l,t,a){var e=l.tag;if(e===5||e===6)l=l.stateNode,t?a.insertBefore(l,t):a.appendChild(l);else if(e!==4&&(e===27&&va(l.type)&&(a=l.stateNode),l=l.child,l!==null))for(Si(l,t,a),l=l.sibling;l!==null;)Si(l,t,a),l=l.sibling}function or(l){var t=l.stateNode,a=l.memoizedProps;try{for(var e=l.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Bl(t,e,a),t[Dl]=l,t[Xl]=a}catch(u){I(l,l.return,u)}}var Zt=!1,zl=!1,Bc=!1,sr=typeof WeakSet=="function"?WeakSet:Set,El=null;function Hm(l,t){if(l=l.containerInfo,tf=Xi,l=zo(l),Mu(l)){if("selectionStart"in l)var a={start:l.selectionStart,end:l.selectionEnd};else l:{a=(a=l.ownerDocument)&&a.defaultView||window;var e=a.getSelection&&a.getSelection();if(e&&e.rangeCount!==0){a=e.anchorNode;var n=e.anchorOffset,u=e.focusNode;e=e.focusOffset;try{a.nodeType,u.nodeType}catch{a=null;break l}var c=0,f=-1,s=-1,g=0,x=0,_=l,y=null;t:for(;;){for(var b;_!==a||n!==0&&_.nodeType!==3||(f=c+n),_!==u||e!==0&&_.nodeType!==3||(s=c+e),_.nodeType===3&&(c+=_.nodeValue.length),(b=_.firstChild)!==null;)y=_,_=b;for(;;){if(_===l)break t;if(y===a&&++g===n&&(f=c),y===u&&++x===e&&(s=c),(b=_.nextSibling)!==null)break;_=y,y=_.parentNode}_=b}a=f===-1||s===-1?null:{start:f,end:s}}else a=null}a=a||{start:0,end:0}}else a=null;for(af={focusedElem:l,selectionRange:a},Xi=!1,El=t;El!==null;)if(t=El,l=t.child,(t.subtreeFlags&1028)!==0&&l!==null)l.return=t,El=l;else for(;El!==null;){switch(t=El,u=t.alternate,l=t.flags,t.tag){case 0:if((l&4)!==0&&(l=t.updateQueue,l=l!==null?l.events:null,l!==null))for(a=0;a<l.length;a++)n=l[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((l&1024)!==0&&u!==null){l=void 0,a=t,n=u.memoizedProps,u=u.memoizedState,e=a.stateNode;try{var U=Ga(a.type,n);l=e.getSnapshotBeforeUpdate(U,u),e.__reactInternalSnapshotBeforeUpdate=l}catch($){I(a,a.return,$)}}break;case 3:if((l&1024)!==0){if(l=t.stateNode.containerInfo,a=l.nodeType,a===9)uf(l);else if(a===1)switch(l.nodeName){case"HEAD":case"HTML":case"BODY":uf(l);break;default:l.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((l&1024)!==0)throw Error(m(163))}if(l=t.sibling,l!==null){l.return=t.return,El=l;break}El=t.return}}function rr(l,t,a){var e=a.flags;switch(a.tag){case 0:case 11:case 15:Vt(l,a),e&4&&fn(5,a);break;case 1:if(Vt(l,a),e&4)if(l=a.stateNode,t===null)try{l.componentDidMount()}catch(c){I(a,a.return,c)}else{var n=Ga(a.type,t.memoizedProps);t=t.memoizedState;try{l.componentDidUpdate(n,t,l.__reactInternalSnapshotBeforeUpdate)}catch(c){I(a,a.return,c)}}e&64&&ir(a),e&512&&on(a,a.return);break;case 3:if(Vt(l,a),e&64&&(l=a.updateQueue,l!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{ko(l,t)}catch(c){I(a,a.return,c)}}break;case 27:t===null&&e&4&&or(a);case 26:case 5:Vt(l,a),t===null&&e&4&&cr(a),e&512&&on(a,a.return);break;case 12:Vt(l,a);break;case 31:Vt(l,a),e&4&&hr(l,a);break;case 13:Vt(l,a),e&4&&pr(l,a),e&64&&(l=a.memoizedState,l!==null&&(l=l.dehydrated,l!==null&&(a=Gm.bind(null,a),ch(l,a))));break;case 22:if(e=a.memoizedState!==null||Zt,!e){t=t!==null&&t.memoizedState!==null||zl,n=Zt;var u=zl;Zt=e,(zl=t)&&!u?Kt(l,a,(a.subtreeFlags&8772)!==0):Vt(l,a),Zt=n,zl=u}break;case 30:break;default:Vt(l,a)}}function dr(l){var t=l.alternate;t!==null&&(l.alternate=null,dr(t)),l.child=null,l.deletions=null,l.sibling=null,l.tag===5&&(t=l.stateNode,t!==null&&su(t)),l.stateNode=null,l.return=null,l.dependencies=null,l.memoizedProps=null,l.memoizedState=null,l.pendingProps=null,l.stateNode=null,l.updateQueue=null}var fl=null,Zl=!1;function Lt(l,t,a){for(a=a.child;a!==null;)mr(l,t,a),a=a.sibling}function mr(l,t,a){if(Pl&&typeof Pl.onCommitFiberUnmount=="function")try{Pl.onCommitFiberUnmount(He,a)}catch{}switch(a.tag){case 26:zl||Et(a,t),Lt(l,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:zl||Et(a,t);var e=fl,n=Zl;va(a.type)&&(fl=a.stateNode,Zl=!1),Lt(l,t,a),bn(a.stateNode),fl=e,Zl=n;break;case 5:zl||Et(a,t);case 6:if(e=fl,n=Zl,fl=null,Lt(l,t,a),fl=e,Zl=n,fl!==null)if(Zl)try{(fl.nodeType===9?fl.body:fl.nodeName==="HTML"?fl.ownerDocument.body:fl).removeChild(a.stateNode)}catch(u){I(a,t,u)}else try{fl.removeChild(a.stateNode)}catch(u){I(a,t,u)}break;case 18:fl!==null&&(Zl?(l=fl,id(l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l,a.stateNode),Oe(l)):id(fl,a.stateNode));break;case 4:e=fl,n=Zl,fl=a.stateNode.containerInfo,Zl=!0,Lt(l,t,a),fl=e,Zl=n;break;case 0:case 11:case 14:case 15:da(2,a,t),zl||da(4,a,t),Lt(l,t,a);break;case 1:zl||(Et(a,t),e=a.stateNode,typeof e.componentWillUnmount=="function"&&ur(a,t,e)),Lt(l,t,a);break;case 21:Lt(l,t,a);break;case 22:zl=(e=zl)||a.memoizedState!==null,Lt(l,t,a),zl=e;break;default:Lt(l,t,a)}}function hr(l,t){if(t.memoizedState===null&&(l=t.alternate,l!==null&&(l=l.memoizedState,l!==null))){l=l.dehydrated;try{Oe(l)}catch(a){I(t,t.return,a)}}}function pr(l,t){if(t.memoizedState===null&&(l=t.alternate,l!==null&&(l=l.memoizedState,l!==null&&(l=l.dehydrated,l!==null))))try{Oe(l)}catch(a){I(t,t.return,a)}}function Nm(l){switch(l.tag){case 31:case 13:case 19:var t=l.stateNode;return t===null&&(t=l.stateNode=new sr),t;case 22:return l=l.stateNode,t=l._retryCache,t===null&&(t=l._retryCache=new sr),t;default:throw Error(m(435,l.tag))}}function zi(l,t){var a=Nm(l);t.forEach(function(e){if(!a.has(e)){a.add(e);var n=Xm.bind(null,l,e);e.then(n,n)}})}function Ll(l,t){var a=t.deletions;if(a!==null)for(var e=0;e<a.length;e++){var n=a[e],u=l,c=t,f=c;l:for(;f!==null;){switch(f.tag){case 27:if(va(f.type)){fl=f.stateNode,Zl=!1;break l}break;case 5:fl=f.stateNode,Zl=!1;break l;case 3:case 4:fl=f.stateNode.containerInfo,Zl=!0;break l}f=f.return}if(fl===null)throw Error(m(160));mr(u,c,n),fl=null,Zl=!1,u=n.alternate,u!==null&&(u.return=null),n.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)gr(t,l),t=t.sibling}var St=null;function gr(l,t){var a=l.alternate,e=l.flags;switch(l.tag){case 0:case 11:case 14:case 15:Ll(t,l),Vl(l),e&4&&(da(3,l,l.return),fn(3,l),da(5,l,l.return));break;case 1:Ll(t,l),Vl(l),e&512&&(zl||a===null||Et(a,a.return)),e&64&&Zt&&(l=l.updateQueue,l!==null&&(e=l.callbacks,e!==null&&(a=l.shared.hiddenCallbacks,l.shared.hiddenCallbacks=a===null?e:a.concat(e))));break;case 26:var n=St;if(Ll(t,l),Vl(l),e&512&&(zl||a===null||Et(a,a.return)),e&4){var u=a!==null?a.memoizedState:null;if(e=l.memoizedState,a===null)if(e===null)if(l.stateNode===null){l:{e=l.type,a=l.memoizedProps,n=n.ownerDocument||n;t:switch(e){case"title":u=n.getElementsByTagName("title")[0],(!u||u[Ce]||u[Dl]||u.namespaceURI==="http://www.w3.org/2000/svg"||u.hasAttribute("itemprop"))&&(u=n.createElement(e),n.head.insertBefore(u,n.querySelector("head > title"))),Bl(u,e,a),u[Dl]=l,Ml(u),e=u;break l;case"link":var c=gd("link","href",n).get(e+(a.href||""));if(c){for(var f=0;f<c.length;f++)if(u=c[f],u.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&u.getAttribute("rel")===(a.rel==null?null:a.rel)&&u.getAttribute("title")===(a.title==null?null:a.title)&&u.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){c.splice(f,1);break t}}u=n.createElement(e),Bl(u,e,a),n.head.appendChild(u);break;case"meta":if(c=gd("meta","content",n).get(e+(a.content||""))){for(f=0;f<c.length;f++)if(u=c[f],u.getAttribute("content")===(a.content==null?null:""+a.content)&&u.getAttribute("name")===(a.name==null?null:a.name)&&u.getAttribute("property")===(a.property==null?null:a.property)&&u.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&u.getAttribute("charset")===(a.charSet==null?null:a.charSet)){c.splice(f,1);break t}}u=n.createElement(e),Bl(u,e,a),n.head.appendChild(u);break;default:throw Error(m(468,e))}u[Dl]=l,Ml(u),e=u}l.stateNode=e}else yd(n,l.type,l.stateNode);else l.stateNode=pd(n,e,l.memoizedProps);else u!==e?(u===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):u.count--,e===null?yd(n,l.type,l.stateNode):pd(n,e,l.memoizedProps)):e===null&&l.stateNode!==null&&Uc(l,l.memoizedProps,a.memoizedProps)}break;case 27:Ll(t,l),Vl(l),e&512&&(zl||a===null||Et(a,a.return)),a!==null&&e&4&&Uc(l,l.memoizedProps,a.memoizedProps);break;case 5:if(Ll(t,l),Vl(l),e&512&&(zl||a===null||Et(a,a.return)),l.flags&32){n=l.stateNode;try{Ia(n,"")}catch(U){I(l,l.return,U)}}e&4&&l.stateNode!=null&&(n=l.memoizedProps,Uc(l,n,a!==null?a.memoizedProps:n)),e&1024&&(Bc=!0);break;case 6:if(Ll(t,l),Vl(l),e&4){if(l.stateNode===null)throw Error(m(162));e=l.memoizedProps,a=l.stateNode;try{a.nodeValue=e}catch(U){I(l,l.return,U)}}break;case 3:if(Yi=null,n=St,St=$i(t.containerInfo),Ll(t,l),St=n,Vl(l),e&4&&a!==null&&a.memoizedState.isDehydrated)try{Oe(t.containerInfo)}catch(U){I(l,l.return,U)}Bc&&(Bc=!1,yr(l));break;case 4:e=St,St=$i(l.stateNode.containerInfo),Ll(t,l),Vl(l),St=e;break;case 12:Ll(t,l),Vl(l);break;case 31:Ll(t,l),Vl(l),e&4&&(e=l.updateQueue,e!==null&&(l.updateQueue=null,zi(l,e)));break;case 13:Ll(t,l),Vl(l),l.child.flags&8192&&l.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Ai=Il()),e&4&&(e=l.updateQueue,e!==null&&(l.updateQueue=null,zi(l,e)));break;case 22:n=l.memoizedState!==null;var s=a!==null&&a.memoizedState!==null,g=Zt,x=zl;if(Zt=g||n,zl=x||s,Ll(t,l),zl=x,Zt=g,Vl(l),e&8192)l:for(t=l.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(a===null||s||Zt||zl||Xa(l)),a=null,t=l;;){if(t.tag===5||t.tag===26){if(a===null){s=a=t;try{if(u=s.stateNode,n)c=u.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none";else{f=s.stateNode;var _=s.memoizedProps.style,y=_!=null&&_.hasOwnProperty("display")?_.display:null;f.style.display=y==null||typeof y=="boolean"?"":(""+y).trim()}}catch(U){I(s,s.return,U)}}}else if(t.tag===6){if(a===null){s=t;try{s.stateNode.nodeValue=n?"":s.memoizedProps}catch(U){I(s,s.return,U)}}}else if(t.tag===18){if(a===null){s=t;try{var b=s.stateNode;n?ud(b,!0):ud(s.stateNode,!1)}catch(U){I(s,s.return,U)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===l)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===l)break l;for(;t.sibling===null;){if(t.return===null||t.return===l)break l;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}e&4&&(e=l.updateQueue,e!==null&&(a=e.retryQueue,a!==null&&(e.retryQueue=null,zi(l,a))));break;case 19:Ll(t,l),Vl(l),e&4&&(e=l.updateQueue,e!==null&&(l.updateQueue=null,zi(l,e)));break;case 30:break;case 21:break;default:Ll(t,l),Vl(l)}}function Vl(l){var t=l.flags;if(t&2){try{for(var a,e=l.return;e!==null;){if(fr(e)){a=e;break}e=e.return}if(a==null)throw Error(m(160));switch(a.tag){case 27:var n=a.stateNode,u=Hc(l);Si(l,u,n);break;case 5:var c=a.stateNode;a.flags&32&&(Ia(c,""),a.flags&=-33);var f=Hc(l);Si(l,f,c);break;case 3:case 4:var s=a.stateNode.containerInfo,g=Hc(l);Nc(l,g,s);break;default:throw Error(m(161))}}catch(x){I(l,l.return,x)}l.flags&=-3}t&4096&&(l.flags&=-4097)}function yr(l){if(l.subtreeFlags&1024)for(l=l.child;l!==null;){var t=l;yr(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),l=l.sibling}}function Vt(l,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)rr(l,t.alternate,t),t=t.sibling}function Xa(l){for(l=l.child;l!==null;){var t=l;switch(t.tag){case 0:case 11:case 14:case 15:da(4,t,t.return),Xa(t);break;case 1:Et(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&ur(t,t.return,a),Xa(t);break;case 27:bn(t.stateNode);case 26:case 5:Et(t,t.return),Xa(t);break;case 22:t.memoizedState===null&&Xa(t);break;case 30:Xa(t);break;default:Xa(t)}l=l.sibling}}function Kt(l,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var e=t.alternate,n=l,u=t,c=u.flags;switch(u.tag){case 0:case 11:case 15:Kt(n,u,a),fn(4,u);break;case 1:if(Kt(n,u,a),e=u,n=e.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(g){I(e,e.return,g)}if(e=u,n=e.updateQueue,n!==null){var f=e.stateNode;try{var s=n.shared.hiddenCallbacks;if(s!==null)for(n.shared.hiddenCallbacks=null,n=0;n<s.length;n++)Jo(s[n],f)}catch(g){I(e,e.return,g)}}a&&c&64&&ir(u),on(u,u.return);break;case 27:or(u);case 26:case 5:Kt(n,u,a),a&&e===null&&c&4&&cr(u),on(u,u.return);break;case 12:Kt(n,u,a);break;case 31:Kt(n,u,a),a&&c&4&&hr(n,u);break;case 13:Kt(n,u,a),a&&c&4&&pr(n,u);break;case 22:u.memoizedState===null&&Kt(n,u,a),on(u,u.return);break;case 30:break;default:Kt(n,u,a)}t=t.sibling}}function Cc(l,t){var a=null;l!==null&&l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(a=l.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(l!=null&&l.refCount++,a!=null&&Je(a))}function $c(l,t){l=null,t.alternate!==null&&(l=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==l&&(t.refCount++,l!=null&&Je(l))}function zt(l,t,a,e){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)br(l,t,a,e),t=t.sibling}function br(l,t,a,e){var n=t.flags;switch(t.tag){case 0:case 11:case 15:zt(l,t,a,e),n&2048&&fn(9,t);break;case 1:zt(l,t,a,e);break;case 3:zt(l,t,a,e),n&2048&&(l=null,t.alternate!==null&&(l=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==l&&(t.refCount++,l!=null&&Je(l)));break;case 12:if(n&2048){zt(l,t,a,e),l=t.stateNode;try{var u=t.memoizedProps,c=u.id,f=u.onPostCommit;typeof f=="function"&&f(c,t.alternate===null?"mount":"update",l.passiveEffectDuration,-0)}catch(s){I(t,t.return,s)}}else zt(l,t,a,e);break;case 31:zt(l,t,a,e);break;case 13:zt(l,t,a,e);break;case 23:break;case 22:u=t.stateNode,c=t.alternate,t.memoizedState!==null?u._visibility&2?zt(l,t,a,e):sn(l,t):u._visibility&2?zt(l,t,a,e):(u._visibility|=2,be(l,t,a,e,(t.subtreeFlags&10256)!==0||!1)),n&2048&&Cc(c,t);break;case 24:zt(l,t,a,e),n&2048&&$c(t.alternate,t);break;default:zt(l,t,a,e)}}function be(l,t,a,e,n){for(n=n&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var u=l,c=t,f=a,s=e,g=c.flags;switch(c.tag){case 0:case 11:case 15:be(u,c,f,s,n),fn(8,c);break;case 23:break;case 22:var x=c.stateNode;c.memoizedState!==null?x._visibility&2?be(u,c,f,s,n):sn(u,c):(x._visibility|=2,be(u,c,f,s,n)),n&&g&2048&&Cc(c.alternate,c);break;case 24:be(u,c,f,s,n),n&&g&2048&&$c(c.alternate,c);break;default:be(u,c,f,s,n)}t=t.sibling}}function sn(l,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=l,e=t,n=e.flags;switch(e.tag){case 22:sn(a,e),n&2048&&Cc(e.alternate,e);break;case 24:sn(a,e),n&2048&&$c(e.alternate,e);break;default:sn(a,e)}t=t.sibling}}var rn=8192;function ve(l,t,a){if(l.subtreeFlags&rn)for(l=l.child;l!==null;)vr(l,t,a),l=l.sibling}function vr(l,t,a){switch(l.tag){case 26:ve(l,t,a),l.flags&rn&&l.memoizedState!==null&&vh(a,St,l.memoizedState,l.memoizedProps);break;case 5:ve(l,t,a);break;case 3:case 4:var e=St;St=$i(l.stateNode.containerInfo),ve(l,t,a),St=e;break;case 22:l.memoizedState===null&&(e=l.alternate,e!==null&&e.memoizedState!==null?(e=rn,rn=16777216,ve(l,t,a),rn=e):ve(l,t,a));break;default:ve(l,t,a)}}function xr(l){var t=l.alternate;if(t!==null&&(l=t.child,l!==null)){t.child=null;do t=l.sibling,l.sibling=null,l=t;while(l!==null)}}function dn(l){var t=l.deletions;if((l.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var e=t[a];El=e,zr(e,l)}xr(l)}if(l.subtreeFlags&10256)for(l=l.child;l!==null;)Sr(l),l=l.sibling}function Sr(l){switch(l.tag){case 0:case 11:case 15:dn(l),l.flags&2048&&da(9,l,l.return);break;case 3:dn(l);break;case 12:dn(l);break;case 22:var t=l.stateNode;l.memoizedState!==null&&t._visibility&2&&(l.return===null||l.return.tag!==13)?(t._visibility&=-3,_i(l)):dn(l);break;default:dn(l)}}function _i(l){var t=l.deletions;if((l.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var e=t[a];El=e,zr(e,l)}xr(l)}for(l=l.child;l!==null;){switch(t=l,t.tag){case 0:case 11:case 15:da(8,t,t.return),_i(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,_i(t));break;default:_i(t)}l=l.sibling}}function zr(l,t){for(;El!==null;){var a=El;switch(a.tag){case 0:case 11:case 15:da(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var e=a.memoizedState.cachePool.pool;e!=null&&e.refCount++}break;case 24:Je(a.memoizedState.cache)}if(e=a.child,e!==null)e.return=a,El=e;else l:for(a=l;El!==null;){e=El;var n=e.sibling,u=e.return;if(dr(e),e===a){El=null;break l}if(n!==null){n.return=u,El=n;break l}El=u}}}var Bm={getCacheForType:function(l){var t=Hl(vl),a=t.data.get(l);return a===void 0&&(a=l(),t.data.set(l,a)),a},cacheSignal:function(){return Hl(vl).controller.signal}},Cm=typeof WeakMap=="function"?WeakMap:Map,k=0,al=null,X=null,Z=0,F=0,it=null,ma=!1,xe=!1,qc=!1,Jt=0,hl=0,ha=0,Qa=0,Yc=0,ut=0,Se=0,mn=null,Kl=null,wc=!1,Ai=0,_r=0,Ti=1/0,ji=null,pa=null,_l=0,ga=null,ze=null,kt=0,Rc=0,Gc=null,Ar=null,hn=0,Xc=null;function ct(){return(k&2)!==0&&Z!==0?Z&-Z:z.T!==null?Jc():wf()}function Tr(){if(ut===0)if((Z&536870912)===0||V){var l=Bn;Bn<<=1,(Bn&3932160)===0&&(Bn=262144),ut=l}else ut=536870912;return l=et.current,l!==null&&(l.flags|=32),ut}function Jl(l,t,a){(l===al&&(F===2||F===9)||l.cancelPendingCommit!==null)&&(_e(l,0),ya(l,Z,ut,!1)),Be(l,a),((k&2)===0||l!==al)&&(l===al&&((k&2)===0&&(Qa|=a),hl===4&&ya(l,Z,ut,!1)),Ot(l))}function jr(l,t,a){if((k&6)!==0)throw Error(m(327));var e=!a&&(t&127)===0&&(t&l.expiredLanes)===0||Ne(l,t),n=e?Ym(l,t):Zc(l,t,!0),u=e;do{if(n===0){xe&&!e&&ya(l,t,0,!1);break}else{if(a=l.current.alternate,u&&!$m(a)){n=Zc(l,t,!1),u=!1;continue}if(n===2){if(u=t,l.errorRecoveryDisabledLanes&u)var c=0;else c=l.pendingLanes&-536870913,c=c!==0?c:c&536870912?536870912:0;if(c!==0){t=c;l:{var f=l;n=mn;var s=f.current.memoizedState.isDehydrated;if(s&&(_e(f,c).flags|=256),c=Zc(f,c,!1),c!==2){if(qc&&!s){f.errorRecoveryDisabledLanes|=u,Qa|=u,n=4;break l}u=Kl,Kl=n,u!==null&&(Kl===null?Kl=u:Kl.push.apply(Kl,u))}n=c}if(u=!1,n!==2)continue}}if(n===1){_e(l,0),ya(l,t,0,!0);break}l:{switch(e=l,u=n,u){case 0:case 1:throw Error(m(345));case 4:if((t&4194048)!==t)break;case 6:ya(e,t,ut,!ma);break l;case 2:Kl=null;break;case 3:case 5:break;default:throw Error(m(329))}if((t&62914560)===t&&(n=Ai+300-Il(),10<n)){if(ya(e,t,ut,!ma),$n(e,0,!0)!==0)break l;kt=t,e.timeoutHandle=ed(Mr.bind(null,e,a,Kl,ji,wc,t,ut,Qa,Se,ma,u,"Throttled",-0,0),n);break l}Mr(e,a,Kl,ji,wc,t,ut,Qa,Se,ma,u,null,-0,0)}}break}while(!0);Ot(l)}function Mr(l,t,a,e,n,u,c,f,s,g,x,_,y,b){if(l.timeoutHandle=-1,_=t.subtreeFlags,_&8192||(_&16785408)===16785408){_={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Bt},vr(t,u,_);var U=(u&62914560)===u?Ai-Il():(u&4194048)===u?_r-Il():0;if(U=xh(_,U),U!==null){kt=u,l.cancelPendingCommit=U(Cr.bind(null,l,t,u,a,e,n,c,f,s,x,_,null,y,b)),ya(l,u,c,!g);return}}Cr(l,t,u,a,e,n,c,f,s)}function $m(l){for(var t=l;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var e=0;e<a.length;e++){var n=a[e],u=n.getSnapshot;n=n.value;try{if(!tt(u(),n))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===l)break;for(;t.sibling===null;){if(t.return===null||t.return===l)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ya(l,t,a,e){t&=~Yc,t&=~Qa,l.suspendedLanes|=t,l.pingedLanes&=~t,e&&(l.warmLanes|=t),e=l.expirationTimes;for(var n=t;0<n;){var u=31-lt(n),c=1<<u;e[u]=-1,n&=~c}a!==0&&$f(l,a,t)}function Mi(){return(k&6)===0?(pn(0),!1):!0}function Qc(){if(X!==null){if(F===0)var l=X.return;else l=X,Yt=Ba=null,ic(l),me=null,We=0,l=X;for(;l!==null;)nr(l.alternate,l),l=l.return;X=null}}function _e(l,t){var a=l.timeoutHandle;a!==-1&&(l.timeoutHandle=-1,ah(a)),a=l.cancelPendingCommit,a!==null&&(l.cancelPendingCommit=null,a()),kt=0,Qc(),al=l,X=a=$t(l.current,null),Z=t,F=0,it=null,ma=!1,xe=Ne(l,t),qc=!1,Se=ut=Yc=Qa=ha=hl=0,Kl=mn=null,wc=!1,(t&8)!==0&&(t|=t&32);var e=l.entangledLanes;if(e!==0)for(l=l.entanglements,e&=t;0<e;){var n=31-lt(e),u=1<<n;t|=l[n],e&=~u}return Jt=t,Jn(),a}function Er(l,t){Y=null,z.H=nn,t===de||t===ai?(t=Zo(),F=3):t===Ku?(t=Zo(),F=4):F=t===Sc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,it=t,X===null&&(hl=1,gi(l,dt(t,l.current)))}function Or(){var l=et.current;return l===null?!0:(Z&4194048)===Z?gt===null:(Z&62914560)===Z||(Z&536870912)!==0?l===gt:!1}function Dr(){var l=z.H;return z.H=nn,l===null?nn:l}function Ur(){var l=z.A;return z.A=Bm,l}function Ei(){hl=4,ma||(Z&4194048)!==Z&&et.current!==null||(xe=!0),(ha&134217727)===0&&(Qa&134217727)===0||al===null||ya(al,Z,ut,!1)}function Zc(l,t,a){var e=k;k|=2;var n=Dr(),u=Ur();(al!==l||Z!==t)&&(ji=null,_e(l,t)),t=!1;var c=hl;l:do try{if(F!==0&&X!==null){var f=X,s=it;switch(F){case 8:Qc(),c=6;break l;case 3:case 2:case 9:case 6:et.current===null&&(t=!0);var g=F;if(F=0,it=null,Ae(l,f,s,g),a&&xe){c=0;break l}break;default:g=F,F=0,it=null,Ae(l,f,s,g)}}qm(),c=hl;break}catch(x){Er(l,x)}while(!0);return t&&l.shellSuspendCounter++,Yt=Ba=null,k=e,z.H=n,z.A=u,X===null&&(al=null,Z=0,Jn()),c}function qm(){for(;X!==null;)Hr(X)}function Ym(l,t){var a=k;k|=2;var e=Dr(),n=Ur();al!==l||Z!==t?(ji=null,Ti=Il()+500,_e(l,t)):xe=Ne(l,t);l:do try{if(F!==0&&X!==null){t=X;var u=it;t:switch(F){case 1:F=0,it=null,Ae(l,t,u,1);break;case 2:case 9:if(Xo(u)){F=0,it=null,Nr(t);break}t=function(){F!==2&&F!==9||al!==l||(F=7),Ot(l)},u.then(t,t);break l;case 3:F=7;break l;case 4:F=5;break l;case 7:Xo(u)?(F=0,it=null,Nr(t)):(F=0,it=null,Ae(l,t,u,7));break;case 5:var c=null;switch(X.tag){case 26:c=X.memoizedState;case 5:case 27:var f=X;if(c?bd(c):f.stateNode.complete){F=0,it=null;var s=f.sibling;if(s!==null)X=s;else{var g=f.return;g!==null?(X=g,Oi(g)):X=null}break t}}F=0,it=null,Ae(l,t,u,5);break;case 6:F=0,it=null,Ae(l,t,u,6);break;case 8:Qc(),hl=6;break l;default:throw Error(m(462))}}wm();break}catch(x){Er(l,x)}while(!0);return Yt=Ba=null,z.H=e,z.A=n,k=a,X!==null?0:(al=null,Z=0,Jn(),hl)}function wm(){for(;X!==null&&!f0();)Hr(X)}function Hr(l){var t=ar(l.alternate,l,Jt);l.memoizedProps=l.pendingProps,t===null?Oi(l):X=t}function Nr(l){var t=l,a=t.alternate;switch(t.tag){case 15:case 0:t=Ws(a,t,t.pendingProps,t.type,void 0,Z);break;case 11:t=Ws(a,t,t.pendingProps,t.type.render,t.ref,Z);break;case 5:ic(t);default:nr(a,t),t=X=Uo(t,Jt),t=ar(a,t,Jt)}l.memoizedProps=l.pendingProps,t===null?Oi(l):X=t}function Ae(l,t,a,e){Yt=Ba=null,ic(t),me=null,We=0;var n=t.return;try{if(Mm(l,n,t,a,Z)){hl=1,gi(l,dt(a,l.current)),X=null;return}}catch(u){if(n!==null)throw X=n,u;hl=1,gi(l,dt(a,l.current)),X=null;return}t.flags&32768?(V||e===1?l=!0:xe||(Z&536870912)!==0?l=!1:(ma=l=!0,(e===2||e===9||e===3||e===6)&&(e=et.current,e!==null&&e.tag===13&&(e.flags|=16384))),Br(t,l)):Oi(t)}function Oi(l){var t=l;do{if((t.flags&32768)!==0){Br(t,ma);return}l=t.return;var a=Dm(t.alternate,t,Jt);if(a!==null){X=a;return}if(t=t.sibling,t!==null){X=t;return}X=t=l}while(t!==null);hl===0&&(hl=5)}function Br(l,t){do{var a=Um(l.alternate,l);if(a!==null){a.flags&=32767,X=a;return}if(a=l.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(l=l.sibling,l!==null)){X=l;return}X=l=a}while(l!==null);hl=6,X=null}function Cr(l,t,a,e,n,u,c,f,s){l.cancelPendingCommit=null;do Di();while(_l!==0);if((k&6)!==0)throw Error(m(327));if(t!==null){if(t===l.current)throw Error(m(177));if(u=t.lanes|t.childLanes,u|=Hu,b0(l,a,u,c,f,s),l===al&&(X=al=null,Z=0),ze=t,ga=l,kt=a,Rc=u,Gc=n,Ar=e,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(l.callbackNode=null,l.callbackPriority=0,Qm(Hn,function(){return Rr(),null})):(l.callbackNode=null,l.callbackPriority=0),e=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||e){e=z.T,z.T=null,n=O.p,O.p=2,c=k,k|=4;try{Hm(l,t,a)}finally{k=c,O.p=n,z.T=e}}_l=1,$r(),qr(),Yr()}}function $r(){if(_l===1){_l=0;var l=ga,t=ze,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var e=O.p;O.p=2;var n=k;k|=4;try{gr(t,l);var u=af,c=zo(l.containerInfo),f=u.focusedElem,s=u.selectionRange;if(c!==f&&f&&f.ownerDocument&&So(f.ownerDocument.documentElement,f)){if(s!==null&&Mu(f)){var g=s.start,x=s.end;if(x===void 0&&(x=g),"selectionStart"in f)f.selectionStart=g,f.selectionEnd=Math.min(x,f.value.length);else{var _=f.ownerDocument||document,y=_&&_.defaultView||window;if(y.getSelection){var b=y.getSelection(),U=f.textContent.length,$=Math.min(s.start,U),tl=s.end===void 0?$:Math.min(s.end,U);!b.extend&&$>tl&&(c=tl,tl=$,$=c);var h=xo(f,$),r=xo(f,tl);if(h&&r&&(b.rangeCount!==1||b.anchorNode!==h.node||b.anchorOffset!==h.offset||b.focusNode!==r.node||b.focusOffset!==r.offset)){var p=_.createRange();p.setStart(h.node,h.offset),b.removeAllRanges(),$>tl?(b.addRange(p),b.extend(r.node,r.offset)):(p.setEnd(r.node,r.offset),b.addRange(p))}}}}for(_=[],b=f;b=b.parentNode;)b.nodeType===1&&_.push({element:b,left:b.scrollLeft,top:b.scrollTop});for(typeof f.focus=="function"&&f.focus(),f=0;f<_.length;f++){var S=_[f];S.element.scrollLeft=S.left,S.element.scrollTop=S.top}}Xi=!!tf,af=tf=null}finally{k=n,O.p=e,z.T=a}}l.current=t,_l=2}}function qr(){if(_l===2){_l=0;var l=ga,t=ze,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var e=O.p;O.p=2;var n=k;k|=4;try{rr(l,t.alternate,t)}finally{k=n,O.p=e,z.T=a}}_l=3}}function Yr(){if(_l===4||_l===3){_l=0,o0();var l=ga,t=ze,a=kt,e=Ar;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?_l=5:(_l=0,ze=ga=null,wr(l,l.pendingLanes));var n=l.pendingLanes;if(n===0&&(pa=null),fu(a),t=t.stateNode,Pl&&typeof Pl.onCommitFiberRoot=="function")try{Pl.onCommitFiberRoot(He,t,void 0,(t.current.flags&128)===128)}catch{}if(e!==null){t=z.T,n=O.p,O.p=2,z.T=null;try{for(var u=l.onRecoverableError,c=0;c<e.length;c++){var f=e[c];u(f.value,{componentStack:f.stack})}}finally{z.T=t,O.p=n}}(kt&3)!==0&&Di(),Ot(l),n=l.pendingLanes,(a&261930)!==0&&(n&42)!==0?l===Xc?hn++:(hn=0,Xc=l):hn=0,pn(0)}}function wr(l,t){(l.pooledCacheLanes&=t)===0&&(t=l.pooledCache,t!=null&&(l.pooledCache=null,Je(t)))}function Di(){return $r(),qr(),Yr(),Rr()}function Rr(){if(_l!==5)return!1;var l=ga,t=Rc;Rc=0;var a=fu(kt),e=z.T,n=O.p;try{O.p=32>a?32:a,z.T=null,a=Gc,Gc=null;var u=ga,c=kt;if(_l=0,ze=ga=null,kt=0,(k&6)!==0)throw Error(m(331));var f=k;if(k|=4,Sr(u.current),br(u,u.current,c,a),k=f,pn(0,!1),Pl&&typeof Pl.onPostCommitFiberRoot=="function")try{Pl.onPostCommitFiberRoot(He,u)}catch{}return!0}finally{O.p=n,z.T=e,wr(l,t)}}function Gr(l,t,a){t=dt(a,t),t=xc(l.stateNode,t,2),l=oa(l,t,2),l!==null&&(Be(l,2),Ot(l))}function I(l,t,a){if(l.tag===3)Gr(l,l,a);else for(;t!==null;){if(t.tag===3){Gr(t,l,a);break}else if(t.tag===1){var e=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof e.componentDidCatch=="function"&&(pa===null||!pa.has(e))){l=dt(a,l),a=Xs(2),e=oa(t,a,2),e!==null&&(Qs(a,e,t,l),Be(e,2),Ot(e));break}}t=t.return}}function Lc(l,t,a){var e=l.pingCache;if(e===null){e=l.pingCache=new Cm;var n=new Set;e.set(t,n)}else n=e.get(t),n===void 0&&(n=new Set,e.set(t,n));n.has(a)||(qc=!0,n.add(a),l=Rm.bind(null,l,t,a),t.then(l,l))}function Rm(l,t,a){var e=l.pingCache;e!==null&&e.delete(t),l.pingedLanes|=l.suspendedLanes&a,l.warmLanes&=~a,al===l&&(Z&a)===a&&(hl===4||hl===3&&(Z&62914560)===Z&&300>Il()-Ai?(k&2)===0&&_e(l,0):Yc|=a,Se===Z&&(Se=0)),Ot(l)}function Xr(l,t){t===0&&(t=Cf()),l=Ua(l,t),l!==null&&(Be(l,t),Ot(l))}function Gm(l){var t=l.memoizedState,a=0;t!==null&&(a=t.retryLane),Xr(l,a)}function Xm(l,t){var a=0;switch(l.tag){case 31:case 13:var e=l.stateNode,n=l.memoizedState;n!==null&&(a=n.retryLane);break;case 19:e=l.stateNode;break;case 22:e=l.stateNode._retryCache;break;default:throw Error(m(314))}e!==null&&e.delete(t),Xr(l,a)}function Qm(l,t){return nu(l,t)}var Ui=null,Te=null,Vc=!1,Hi=!1,Kc=!1,ba=0;function Ot(l){l!==Te&&l.next===null&&(Te===null?Ui=Te=l:Te=Te.next=l),Hi=!0,Vc||(Vc=!0,Lm())}function pn(l,t){if(!Kc&&Hi){Kc=!0;do for(var a=!1,e=Ui;e!==null;){if(l!==0){var n=e.pendingLanes;if(n===0)var u=0;else{var c=e.suspendedLanes,f=e.pingedLanes;u=(1<<31-lt(42|l)+1)-1,u&=n&~(c&~f),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(a=!0,Vr(e,u))}else u=Z,u=$n(e,e===al?u:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),(u&3)===0||Ne(e,u)||(a=!0,Vr(e,u));e=e.next}while(a);Kc=!1}}function Zm(){Qr()}function Qr(){Hi=Vc=!1;var l=0;ba!==0&&th()&&(l=ba);for(var t=Il(),a=null,e=Ui;e!==null;){var n=e.next,u=Zr(e,t);u===0?(e.next=null,a===null?Ui=n:a.next=n,n===null&&(Te=a)):(a=e,(l!==0||(u&3)!==0)&&(Hi=!0)),e=n}_l!==0&&_l!==5||pn(l),ba!==0&&(ba=0)}function Zr(l,t){for(var a=l.suspendedLanes,e=l.pingedLanes,n=l.expirationTimes,u=l.pendingLanes&-62914561;0<u;){var c=31-lt(u),f=1<<c,s=n[c];s===-1?((f&a)===0||(f&e)!==0)&&(n[c]=y0(f,t)):s<=t&&(l.expiredLanes|=f),u&=~f}if(t=al,a=Z,a=$n(l,l===t?a:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),e=l.callbackNode,a===0||l===t&&(F===2||F===9)||l.cancelPendingCommit!==null)return e!==null&&e!==null&&iu(e),l.callbackNode=null,l.callbackPriority=0;if((a&3)===0||Ne(l,a)){if(t=a&-a,t===l.callbackPriority)return t;switch(e!==null&&iu(e),fu(a)){case 2:case 8:a=Nf;break;case 32:a=Hn;break;case 268435456:a=Bf;break;default:a=Hn}return e=Lr.bind(null,l),a=nu(a,e),l.callbackPriority=t,l.callbackNode=a,t}return e!==null&&e!==null&&iu(e),l.callbackPriority=2,l.callbackNode=null,2}function Lr(l,t){if(_l!==0&&_l!==5)return l.callbackNode=null,l.callbackPriority=0,null;var a=l.callbackNode;if(Di()&&l.callbackNode!==a)return null;var e=Z;return e=$n(l,l===al?e:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),e===0?null:(jr(l,e,t),Zr(l,Il()),l.callbackNode!=null&&l.callbackNode===a?Lr.bind(null,l):null)}function Vr(l,t){if(Di())return null;jr(l,t,!0)}function Lm(){eh(function(){(k&6)!==0?nu(Hf,Zm):Qr()})}function Jc(){if(ba===0){var l=se;l===0&&(l=Nn,Nn<<=1,(Nn&261888)===0&&(Nn=256)),ba=l}return ba}function Kr(l){return l==null||typeof l=="symbol"||typeof l=="boolean"?null:typeof l=="function"?l:Rn(""+l)}function Jr(l,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,l.id&&a.setAttribute("form",l.id),t.parentNode.insertBefore(a,t),l=new FormData(l),a.parentNode.removeChild(a),l}function Vm(l,t,a,e,n){if(t==="submit"&&a&&a.stateNode===n){var u=Kr((n[Xl]||null).action),c=e.submitter;c&&(t=(t=c[Xl]||null)?Kr(t.formAction):c.getAttribute("formAction"),t!==null&&(u=t,c=null));var f=new Zn("action","action",null,e,n);l.push({event:f,listeners:[{instance:null,listener:function(){if(e.defaultPrevented){if(ba!==0){var s=c?Jr(n,c):new FormData(n);hc(a,{pending:!0,data:s,method:n.method,action:u},null,s)}}else typeof u=="function"&&(f.preventDefault(),s=c?Jr(n,c):new FormData(n),hc(a,{pending:!0,data:s,method:n.method,action:u},u,s))},currentTarget:n}]})}}for(var kc=0;kc<Uu.length;kc++){var Wc=Uu[kc],Km=Wc.toLowerCase(),Jm=Wc[0].toUpperCase()+Wc.slice(1);xt(Km,"on"+Jm)}xt(To,"onAnimationEnd"),xt(jo,"onAnimationIteration"),xt(Mo,"onAnimationStart"),xt("dblclick","onDoubleClick"),xt("focusin","onFocus"),xt("focusout","onBlur"),xt(sm,"onTransitionRun"),xt(rm,"onTransitionStart"),xt(dm,"onTransitionCancel"),xt(Eo,"onTransitionEnd"),Wa("onMouseEnter",["mouseout","mouseover"]),Wa("onMouseLeave",["mouseout","mouseover"]),Wa("onPointerEnter",["pointerout","pointerover"]),Wa("onPointerLeave",["pointerout","pointerover"]),Ma("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ma("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ma("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ma("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ma("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ma("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var gn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),km=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gn));function kr(l,t){t=(t&4)!==0;for(var a=0;a<l.length;a++){var e=l[a],n=e.event;e=e.listeners;l:{var u=void 0;if(t)for(var c=e.length-1;0<=c;c--){var f=e[c],s=f.instance,g=f.currentTarget;if(f=f.listener,s!==u&&n.isPropagationStopped())break l;u=f,n.currentTarget=g;try{u(n)}catch(x){Kn(x)}n.currentTarget=null,u=s}else for(c=0;c<e.length;c++){if(f=e[c],s=f.instance,g=f.currentTarget,f=f.listener,s!==u&&n.isPropagationStopped())break l;u=f,n.currentTarget=g;try{u(n)}catch(x){Kn(x)}n.currentTarget=null,u=s}}}}function Q(l,t){var a=t[ou];a===void 0&&(a=t[ou]=new Set);var e=l+"__bubble";a.has(e)||(Wr(t,l,2,!1),a.add(e))}function Fc(l,t,a){var e=0;t&&(e|=4),Wr(a,l,e,t)}var Ni="_reactListening"+Math.random().toString(36).slice(2);function Ic(l){if(!l[Ni]){l[Ni]=!0,Xf.forEach(function(a){a!=="selectionchange"&&(km.has(a)||Fc(a,!1,l),Fc(a,!0,l))});var t=l.nodeType===9?l:l.ownerDocument;t===null||t[Ni]||(t[Ni]=!0,Fc("selectionchange",!1,t))}}function Wr(l,t,a,e){switch(Td(t)){case 2:var n=_h;break;case 8:n=Ah;break;default:n=hf}a=n.bind(null,t,a,l),n=void 0,!bu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),e?n!==void 0?l.addEventListener(t,a,{capture:!0,passive:n}):l.addEventListener(t,a,!0):n!==void 0?l.addEventListener(t,a,{passive:n}):l.addEventListener(t,a,!1)}function Pc(l,t,a,e,n){var u=e;if((t&1)===0&&(t&2)===0&&e!==null)l:for(;;){if(e===null)return;var c=e.tag;if(c===3||c===4){var f=e.stateNode.containerInfo;if(f===n)break;if(c===4)for(c=e.return;c!==null;){var s=c.tag;if((s===3||s===4)&&c.stateNode.containerInfo===n)return;c=c.return}for(;f!==null;){if(c=Ka(f),c===null)return;if(s=c.tag,s===5||s===6||s===26||s===27){e=u=c;continue l}f=f.parentNode}}e=e.return}lo(function(){var g=u,x=gu(a),_=[];l:{var y=Oo.get(l);if(y!==void 0){var b=Zn,U=l;switch(l){case"keypress":if(Xn(a)===0)break l;case"keydown":case"keyup":b=X0;break;case"focusin":U="focus",b=zu;break;case"focusout":U="blur",b=zu;break;case"beforeblur":case"afterblur":b=zu;break;case"click":if(a.button===2)break l;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=eo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=D0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=L0;break;case To:case jo:case Mo:b=N0;break;case Eo:b=K0;break;case"scroll":case"scrollend":b=E0;break;case"wheel":b=k0;break;case"copy":case"cut":case"paste":b=C0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=io;break;case"toggle":case"beforetoggle":b=F0}var $=(t&4)!==0,tl=!$&&(l==="scroll"||l==="scrollend"),h=$?y!==null?y+"Capture":null:y;$=[];for(var r=g,p;r!==null;){var S=r;if(p=S.stateNode,S=S.tag,S!==5&&S!==26&&S!==27||p===null||h===null||(S=qe(r,h),S!=null&&$.push(yn(r,S,p))),tl)break;r=r.return}0<$.length&&(y=new b(y,U,null,a,x),_.push({event:y,listeners:$}))}}if((t&7)===0){l:{if(y=l==="mouseover"||l==="pointerover",b=l==="mouseout"||l==="pointerout",y&&a!==pu&&(U=a.relatedTarget||a.fromElement)&&(Ka(U)||U[Va]))break l;if((b||y)&&(y=x.window===x?x:(y=x.ownerDocument)?y.defaultView||y.parentWindow:window,b?(U=a.relatedTarget||a.toElement,b=g,U=U?Ka(U):null,U!==null&&(tl=j(U),$=U.tag,U!==tl||$!==5&&$!==27&&$!==6)&&(U=null)):(b=null,U=g),b!==U)){if($=eo,S="onMouseLeave",h="onMouseEnter",r="mouse",(l==="pointerout"||l==="pointerover")&&($=io,S="onPointerLeave",h="onPointerEnter",r="pointer"),tl=b==null?y:$e(b),p=U==null?y:$e(U),y=new $(S,r+"leave",b,a,x),y.target=tl,y.relatedTarget=p,S=null,Ka(x)===g&&($=new $(h,r+"enter",U,a,x),$.target=p,$.relatedTarget=tl,S=$),tl=S,b&&U)t:{for($=Wm,h=b,r=U,p=0,S=h;S;S=$(S))p++;S=0;for(var B=r;B;B=$(B))S++;for(;0<p-S;)h=$(h),p--;for(;0<S-p;)r=$(r),S--;for(;p--;){if(h===r||r!==null&&h===r.alternate){$=h;break t}h=$(h),r=$(r)}$=null}else $=null;b!==null&&Fr(_,y,b,$,!1),U!==null&&tl!==null&&Fr(_,tl,U,$,!0)}}l:{if(y=g?$e(g):window,b=y.nodeName&&y.nodeName.toLowerCase(),b==="select"||b==="input"&&y.type==="file")var K=ho;else if(ro(y))if(po)K=cm;else{K=im;var N=nm}else b=y.nodeName,!b||b.toLowerCase()!=="input"||y.type!=="checkbox"&&y.type!=="radio"?g&&hu(g.elementType)&&(K=ho):K=um;if(K&&(K=K(l,g))){mo(_,K,a,x);break l}N&&N(l,y,g),l==="focusout"&&g&&y.type==="number"&&g.memoizedProps.value!=null&&mu(y,"number",y.value)}switch(N=g?$e(g):window,l){case"focusin":(ro(N)||N.contentEditable==="true")&&(ae=N,Eu=g,Le=null);break;case"focusout":Le=Eu=ae=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,_o(_,a,x);break;case"selectionchange":if(om)break;case"keydown":case"keyup":_o(_,a,x)}var w;if(Au)l:{switch(l){case"compositionstart":var L="onCompositionStart";break l;case"compositionend":L="onCompositionEnd";break l;case"compositionupdate":L="onCompositionUpdate";break l}L=void 0}else te?oo(l,a)&&(L="onCompositionEnd"):l==="keydown"&&a.keyCode===229&&(L="onCompositionStart");L&&(uo&&a.locale!=="ko"&&(te||L!=="onCompositionStart"?L==="onCompositionEnd"&&te&&(w=to()):(aa=x,vu="value"in aa?aa.value:aa.textContent,te=!0)),N=Bi(g,L),0<N.length&&(L=new no(L,l,null,a,x),_.push({event:L,listeners:N}),w?L.data=w:(w=so(a),w!==null&&(L.data=w)))),(w=P0?lm(l,a):tm(l,a))&&(L=Bi(g,"onBeforeInput"),0<L.length&&(N=new no("onBeforeInput","beforeinput",null,a,x),_.push({event:N,listeners:L}),N.data=w)),Vm(_,l,g,a,x)}kr(_,t)})}function yn(l,t,a){return{instance:l,listener:t,currentTarget:a}}function Bi(l,t){for(var a=t+"Capture",e=[];l!==null;){var n=l,u=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||u===null||(n=qe(l,a),n!=null&&e.unshift(yn(l,n,u)),n=qe(l,t),n!=null&&e.push(yn(l,n,u))),l.tag===3)return e;l=l.return}return[]}function Wm(l){if(l===null)return null;do l=l.return;while(l&&l.tag!==5&&l.tag!==27);return l||null}function Fr(l,t,a,e,n){for(var u=t._reactName,c=[];a!==null&&a!==e;){var f=a,s=f.alternate,g=f.stateNode;if(f=f.tag,s!==null&&s===e)break;f!==5&&f!==26&&f!==27||g===null||(s=g,n?(g=qe(a,u),g!=null&&c.unshift(yn(a,g,s))):n||(g=qe(a,u),g!=null&&c.push(yn(a,g,s)))),a=a.return}c.length!==0&&l.push({event:t,listeners:c})}var Fm=/\r\n?/g,Im=/\u0000|\uFFFD/g;function Ir(l){return(typeof l=="string"?l:""+l).replace(Fm,`
`).replace(Im,"")}function Pr(l,t){return t=Ir(t),Ir(l)===t}function ll(l,t,a,e,n,u){switch(a){case"children":typeof e=="string"?t==="body"||t==="textarea"&&e===""||Ia(l,e):(typeof e=="number"||typeof e=="bigint")&&t!=="body"&&Ia(l,""+e);break;case"className":Yn(l,"class",e);break;case"tabIndex":Yn(l,"tabindex",e);break;case"dir":case"role":case"viewBox":case"width":case"height":Yn(l,a,e);break;case"style":If(l,e,u);break;case"data":if(t!=="object"){Yn(l,"data",e);break}case"src":case"href":if(e===""&&(t!=="a"||a!=="href")){l.removeAttribute(a);break}if(e==null||typeof e=="function"||typeof e=="symbol"||typeof e=="boolean"){l.removeAttribute(a);break}e=Rn(""+e),l.setAttribute(a,e);break;case"action":case"formAction":if(typeof e=="function"){l.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(a==="formAction"?(t!=="input"&&ll(l,t,"name",n.name,n,null),ll(l,t,"formEncType",n.formEncType,n,null),ll(l,t,"formMethod",n.formMethod,n,null),ll(l,t,"formTarget",n.formTarget,n,null)):(ll(l,t,"encType",n.encType,n,null),ll(l,t,"method",n.method,n,null),ll(l,t,"target",n.target,n,null)));if(e==null||typeof e=="symbol"||typeof e=="boolean"){l.removeAttribute(a);break}e=Rn(""+e),l.setAttribute(a,e);break;case"onClick":e!=null&&(l.onclick=Bt);break;case"onScroll":e!=null&&Q("scroll",l);break;case"onScrollEnd":e!=null&&Q("scrollend",l);break;case"dangerouslySetInnerHTML":if(e!=null){if(typeof e!="object"||!("__html"in e))throw Error(m(61));if(a=e.__html,a!=null){if(n.children!=null)throw Error(m(60));l.innerHTML=a}}break;case"multiple":l.multiple=e&&typeof e!="function"&&typeof e!="symbol";break;case"muted":l.muted=e&&typeof e!="function"&&typeof e!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(e==null||typeof e=="function"||typeof e=="boolean"||typeof e=="symbol"){l.removeAttribute("xlink:href");break}a=Rn(""+e),l.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":e!=null&&typeof e!="function"&&typeof e!="symbol"?l.setAttribute(a,""+e):l.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":e&&typeof e!="function"&&typeof e!="symbol"?l.setAttribute(a,""):l.removeAttribute(a);break;case"capture":case"download":e===!0?l.setAttribute(a,""):e!==!1&&e!=null&&typeof e!="function"&&typeof e!="symbol"?l.setAttribute(a,e):l.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":e!=null&&typeof e!="function"&&typeof e!="symbol"&&!isNaN(e)&&1<=e?l.setAttribute(a,e):l.removeAttribute(a);break;case"rowSpan":case"start":e==null||typeof e=="function"||typeof e=="symbol"||isNaN(e)?l.removeAttribute(a):l.setAttribute(a,e);break;case"popover":Q("beforetoggle",l),Q("toggle",l),qn(l,"popover",e);break;case"xlinkActuate":Nt(l,"http://www.w3.org/1999/xlink","xlink:actuate",e);break;case"xlinkArcrole":Nt(l,"http://www.w3.org/1999/xlink","xlink:arcrole",e);break;case"xlinkRole":Nt(l,"http://www.w3.org/1999/xlink","xlink:role",e);break;case"xlinkShow":Nt(l,"http://www.w3.org/1999/xlink","xlink:show",e);break;case"xlinkTitle":Nt(l,"http://www.w3.org/1999/xlink","xlink:title",e);break;case"xlinkType":Nt(l,"http://www.w3.org/1999/xlink","xlink:type",e);break;case"xmlBase":Nt(l,"http://www.w3.org/XML/1998/namespace","xml:base",e);break;case"xmlLang":Nt(l,"http://www.w3.org/XML/1998/namespace","xml:lang",e);break;case"xmlSpace":Nt(l,"http://www.w3.org/XML/1998/namespace","xml:space",e);break;case"is":qn(l,"is",e);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=j0.get(a)||a,qn(l,a,e))}}function lf(l,t,a,e,n,u){switch(a){case"style":If(l,e,u);break;case"dangerouslySetInnerHTML":if(e!=null){if(typeof e!="object"||!("__html"in e))throw Error(m(61));if(a=e.__html,a!=null){if(n.children!=null)throw Error(m(60));l.innerHTML=a}}break;case"children":typeof e=="string"?Ia(l,e):(typeof e=="number"||typeof e=="bigint")&&Ia(l,""+e);break;case"onScroll":e!=null&&Q("scroll",l);break;case"onScrollEnd":e!=null&&Q("scrollend",l);break;case"onClick":e!=null&&(l.onclick=Bt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Qf.hasOwnProperty(a))l:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),t=a.slice(2,n?a.length-7:void 0),u=l[Xl]||null,u=u!=null?u[a]:null,typeof u=="function"&&l.removeEventListener(t,u,n),typeof e=="function")){typeof u!="function"&&u!==null&&(a in l?l[a]=null:l.hasAttribute(a)&&l.removeAttribute(a)),l.addEventListener(t,e,n);break l}a in l?l[a]=e:e===!0?l.setAttribute(a,""):qn(l,a,e)}}}function Bl(l,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Q("error",l),Q("load",l);var e=!1,n=!1,u;for(u in a)if(a.hasOwnProperty(u)){var c=a[u];if(c!=null)switch(u){case"src":e=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(m(137,t));default:ll(l,t,u,c,a,null)}}n&&ll(l,t,"srcSet",a.srcSet,a,null),e&&ll(l,t,"src",a.src,a,null);return;case"input":Q("invalid",l);var f=u=c=n=null,s=null,g=null;for(e in a)if(a.hasOwnProperty(e)){var x=a[e];if(x!=null)switch(e){case"name":n=x;break;case"type":c=x;break;case"checked":s=x;break;case"defaultChecked":g=x;break;case"value":u=x;break;case"defaultValue":f=x;break;case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(m(137,t));break;default:ll(l,t,e,x,a,null)}}Jf(l,u,f,s,g,c,n,!1);return;case"select":Q("invalid",l),e=c=u=null;for(n in a)if(a.hasOwnProperty(n)&&(f=a[n],f!=null))switch(n){case"value":u=f;break;case"defaultValue":c=f;break;case"multiple":e=f;default:ll(l,t,n,f,a,null)}t=u,a=c,l.multiple=!!e,t!=null?Fa(l,!!e,t,!1):a!=null&&Fa(l,!!e,a,!0);return;case"textarea":Q("invalid",l),u=n=e=null;for(c in a)if(a.hasOwnProperty(c)&&(f=a[c],f!=null))switch(c){case"value":e=f;break;case"defaultValue":n=f;break;case"children":u=f;break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(m(91));break;default:ll(l,t,c,f,a,null)}Wf(l,e,n,u);return;case"option":for(s in a)a.hasOwnProperty(s)&&(e=a[s],e!=null)&&(s==="selected"?l.selected=e&&typeof e!="function"&&typeof e!="symbol":ll(l,t,s,e,a,null));return;case"dialog":Q("beforetoggle",l),Q("toggle",l),Q("cancel",l),Q("close",l);break;case"iframe":case"object":Q("load",l);break;case"video":case"audio":for(e=0;e<gn.length;e++)Q(gn[e],l);break;case"image":Q("error",l),Q("load",l);break;case"details":Q("toggle",l);break;case"embed":case"source":case"link":Q("error",l),Q("load",l);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in a)if(a.hasOwnProperty(g)&&(e=a[g],e!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(m(137,t));default:ll(l,t,g,e,a,null)}return;default:if(hu(t)){for(x in a)a.hasOwnProperty(x)&&(e=a[x],e!==void 0&&lf(l,t,x,e,a,void 0));return}}for(f in a)a.hasOwnProperty(f)&&(e=a[f],e!=null&&ll(l,t,f,e,a,null))}function Pm(l,t,a,e){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,u=null,c=null,f=null,s=null,g=null,x=null;for(b in a){var _=a[b];if(a.hasOwnProperty(b)&&_!=null)switch(b){case"checked":break;case"value":break;case"defaultValue":s=_;default:e.hasOwnProperty(b)||ll(l,t,b,null,e,_)}}for(var y in e){var b=e[y];if(_=a[y],e.hasOwnProperty(y)&&(b!=null||_!=null))switch(y){case"type":u=b;break;case"name":n=b;break;case"checked":g=b;break;case"defaultChecked":x=b;break;case"value":c=b;break;case"defaultValue":f=b;break;case"children":case"dangerouslySetInnerHTML":if(b!=null)throw Error(m(137,t));break;default:b!==_&&ll(l,t,y,b,e,_)}}du(l,c,f,s,g,x,u,n);return;case"select":b=c=f=y=null;for(u in a)if(s=a[u],a.hasOwnProperty(u)&&s!=null)switch(u){case"value":break;case"multiple":b=s;default:e.hasOwnProperty(u)||ll(l,t,u,null,e,s)}for(n in e)if(u=e[n],s=a[n],e.hasOwnProperty(n)&&(u!=null||s!=null))switch(n){case"value":y=u;break;case"defaultValue":f=u;break;case"multiple":c=u;default:u!==s&&ll(l,t,n,u,e,s)}t=f,a=c,e=b,y!=null?Fa(l,!!a,y,!1):!!e!=!!a&&(t!=null?Fa(l,!!a,t,!0):Fa(l,!!a,a?[]:"",!1));return;case"textarea":b=y=null;for(f in a)if(n=a[f],a.hasOwnProperty(f)&&n!=null&&!e.hasOwnProperty(f))switch(f){case"value":break;case"children":break;default:ll(l,t,f,null,e,n)}for(c in e)if(n=e[c],u=a[c],e.hasOwnProperty(c)&&(n!=null||u!=null))switch(c){case"value":y=n;break;case"defaultValue":b=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(m(91));break;default:n!==u&&ll(l,t,c,n,e,u)}kf(l,y,b);return;case"option":for(var U in a)y=a[U],a.hasOwnProperty(U)&&y!=null&&!e.hasOwnProperty(U)&&(U==="selected"?l.selected=!1:ll(l,t,U,null,e,y));for(s in e)y=e[s],b=a[s],e.hasOwnProperty(s)&&y!==b&&(y!=null||b!=null)&&(s==="selected"?l.selected=y&&typeof y!="function"&&typeof y!="symbol":ll(l,t,s,y,e,b));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var $ in a)y=a[$],a.hasOwnProperty($)&&y!=null&&!e.hasOwnProperty($)&&ll(l,t,$,null,e,y);for(g in e)if(y=e[g],b=a[g],e.hasOwnProperty(g)&&y!==b&&(y!=null||b!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(m(137,t));break;default:ll(l,t,g,y,e,b)}return;default:if(hu(t)){for(var tl in a)y=a[tl],a.hasOwnProperty(tl)&&y!==void 0&&!e.hasOwnProperty(tl)&&lf(l,t,tl,void 0,e,y);for(x in e)y=e[x],b=a[x],!e.hasOwnProperty(x)||y===b||y===void 0&&b===void 0||lf(l,t,x,y,e,b);return}}for(var h in a)y=a[h],a.hasOwnProperty(h)&&y!=null&&!e.hasOwnProperty(h)&&ll(l,t,h,null,e,y);for(_ in e)y=e[_],b=a[_],!e.hasOwnProperty(_)||y===b||y==null&&b==null||ll(l,t,_,y,e,b)}function ld(l){switch(l){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function lh(){if(typeof performance.getEntriesByType=="function"){for(var l=0,t=0,a=performance.getEntriesByType("resource"),e=0;e<a.length;e++){var n=a[e],u=n.transferSize,c=n.initiatorType,f=n.duration;if(u&&f&&ld(c)){for(c=0,f=n.responseEnd,e+=1;e<a.length;e++){var s=a[e],g=s.startTime;if(g>f)break;var x=s.transferSize,_=s.initiatorType;x&&ld(_)&&(s=s.responseEnd,c+=x*(s<f?1:(f-g)/(s-g)))}if(--e,t+=8*(u+c)/(n.duration/1e3),l++,10<l)break}}if(0<l)return t/l/1e6}return navigator.connection&&(l=navigator.connection.downlink,typeof l=="number")?l:5}var tf=null,af=null;function Ci(l){return l.nodeType===9?l:l.ownerDocument}function td(l){switch(l){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ad(l,t){if(l===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return l===1&&t==="foreignObject"?0:l}function ef(l,t){return l==="textarea"||l==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var nf=null;function th(){var l=window.event;return l&&l.type==="popstate"?l===nf?!1:(nf=l,!0):(nf=null,!1)}var ed=typeof setTimeout=="function"?setTimeout:void 0,ah=typeof clearTimeout=="function"?clearTimeout:void 0,nd=typeof Promise=="function"?Promise:void 0,eh=typeof queueMicrotask=="function"?queueMicrotask:typeof nd<"u"?function(l){return nd.resolve(null).then(l).catch(nh)}:ed;function nh(l){setTimeout(function(){throw l})}function va(l){return l==="head"}function id(l,t){var a=t,e=0;do{var n=a.nextSibling;if(l.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(e===0){l.removeChild(n),Oe(t);return}e--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")e++;else if(a==="html")bn(l.ownerDocument.documentElement);else if(a==="head"){a=l.ownerDocument.head,bn(a);for(var u=a.firstChild;u;){var c=u.nextSibling,f=u.nodeName;u[Ce]||f==="SCRIPT"||f==="STYLE"||f==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=c}}else a==="body"&&bn(l.ownerDocument.body);a=n}while(a);Oe(t)}function ud(l,t){var a=l;l=0;do{var e=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),e&&e.nodeType===8)if(a=e.data,a==="/$"){if(l===0)break;l--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||l++;a=e}while(a)}function uf(l){var t=l.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":uf(a),su(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}l.removeChild(a)}}function ih(l,t,a,e){for(;l.nodeType===1;){var n=a;if(l.nodeName.toLowerCase()!==t.toLowerCase()){if(!e&&(l.nodeName!=="INPUT"||l.type!=="hidden"))break}else if(e){if(!l[Ce])switch(t){case"meta":if(!l.hasAttribute("itemprop"))break;return l;case"link":if(u=l.getAttribute("rel"),u==="stylesheet"&&l.hasAttribute("data-precedence"))break;if(u!==n.rel||l.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||l.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||l.getAttribute("title")!==(n.title==null?null:n.title))break;return l;case"style":if(l.hasAttribute("data-precedence"))break;return l;case"script":if(u=l.getAttribute("src"),(u!==(n.src==null?null:n.src)||l.getAttribute("type")!==(n.type==null?null:n.type)||l.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&u&&l.hasAttribute("async")&&!l.hasAttribute("itemprop"))break;return l;default:return l}}else if(t==="input"&&l.type==="hidden"){var u=n.name==null?null:""+n.name;if(n.type==="hidden"&&l.getAttribute("name")===u)return l}else return l;if(l=yt(l.nextSibling),l===null)break}return null}function uh(l,t,a){if(t==="")return null;for(;l.nodeType!==3;)if((l.nodeType!==1||l.nodeName!=="INPUT"||l.type!=="hidden")&&!a||(l=yt(l.nextSibling),l===null))return null;return l}function cd(l,t){for(;l.nodeType!==8;)if((l.nodeType!==1||l.nodeName!=="INPUT"||l.type!=="hidden")&&!t||(l=yt(l.nextSibling),l===null))return null;return l}function cf(l){return l.data==="$?"||l.data==="$~"}function ff(l){return l.data==="$!"||l.data==="$?"&&l.ownerDocument.readyState!=="loading"}function ch(l,t){var a=l.ownerDocument;if(l.data==="$~")l._reactRetry=t;else if(l.data!=="$?"||a.readyState!=="loading")t();else{var e=function(){t(),a.removeEventListener("DOMContentLoaded",e)};a.addEventListener("DOMContentLoaded",e),l._reactRetry=e}}function yt(l){for(;l!=null;l=l.nextSibling){var t=l.nodeType;if(t===1||t===3)break;if(t===8){if(t=l.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return l}var of=null;function fd(l){l=l.nextSibling;for(var t=0;l;){if(l.nodeType===8){var a=l.data;if(a==="/$"||a==="/&"){if(t===0)return yt(l.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}l=l.nextSibling}return null}function od(l){l=l.previousSibling;for(var t=0;l;){if(l.nodeType===8){var a=l.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return l;t--}else a!=="/$"&&a!=="/&"||t++}l=l.previousSibling}return null}function sd(l,t,a){switch(t=Ci(a),l){case"html":if(l=t.documentElement,!l)throw Error(m(452));return l;case"head":if(l=t.head,!l)throw Error(m(453));return l;case"body":if(l=t.body,!l)throw Error(m(454));return l;default:throw Error(m(451))}}function bn(l){for(var t=l.attributes;t.length;)l.removeAttributeNode(t[0]);su(l)}var bt=new Map,rd=new Set;function $i(l){return typeof l.getRootNode=="function"?l.getRootNode():l.nodeType===9?l:l.ownerDocument}var Wt=O.d;O.d={f:fh,r:oh,D:sh,C:rh,L:dh,m:mh,X:ph,S:hh,M:gh};function fh(){var l=Wt.f(),t=Mi();return l||t}function oh(l){var t=Ja(l);t!==null&&t.tag===5&&t.type==="form"?Es(t):Wt.r(l)}var je=typeof document>"u"?null:document;function dd(l,t,a){var e=je;if(e&&typeof t=="string"&&t){var n=st(t);n='link[rel="'+l+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),rd.has(n)||(rd.add(n),l={rel:l,crossOrigin:a,href:t},e.querySelector(n)===null&&(t=e.createElement("link"),Bl(t,"link",l),Ml(t),e.head.appendChild(t)))}}function sh(l){Wt.D(l),dd("dns-prefetch",l,null)}function rh(l,t){Wt.C(l,t),dd("preconnect",l,t)}function dh(l,t,a){Wt.L(l,t,a);var e=je;if(e&&l&&t){var n='link[rel="preload"][as="'+st(t)+'"]';t==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+st(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+st(a.imageSizes)+'"]')):n+='[href="'+st(l)+'"]';var u=n;switch(t){case"style":u=Me(l);break;case"script":u=Ee(l)}bt.has(u)||(l=H({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:l,as:t},a),bt.set(u,l),e.querySelector(n)!==null||t==="style"&&e.querySelector(vn(u))||t==="script"&&e.querySelector(xn(u))||(t=e.createElement("link"),Bl(t,"link",l),Ml(t),e.head.appendChild(t)))}}function mh(l,t){Wt.m(l,t);var a=je;if(a&&l){var e=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+st(e)+'"][href="'+st(l)+'"]',u=n;switch(e){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=Ee(l)}if(!bt.has(u)&&(l=H({rel:"modulepreload",href:l},t),bt.set(u,l),a.querySelector(n)===null)){switch(e){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(xn(u)))return}e=a.createElement("link"),Bl(e,"link",l),Ml(e),a.head.appendChild(e)}}}function hh(l,t,a){Wt.S(l,t,a);var e=je;if(e&&l){var n=ka(e).hoistableStyles,u=Me(l);t=t||"default";var c=n.get(u);if(!c){var f={loading:0,preload:null};if(c=e.querySelector(vn(u)))f.loading=5;else{l=H({rel:"stylesheet",href:l,"data-precedence":t},a),(a=bt.get(u))&&sf(l,a);var s=c=e.createElement("link");Ml(s),Bl(s,"link",l),s._p=new Promise(function(g,x){s.onload=g,s.onerror=x}),s.addEventListener("load",function(){f.loading|=1}),s.addEventListener("error",function(){f.loading|=2}),f.loading|=4,qi(c,t,e)}c={type:"stylesheet",instance:c,count:1,state:f},n.set(u,c)}}}function ph(l,t){Wt.X(l,t);var a=je;if(a&&l){var e=ka(a).hoistableScripts,n=Ee(l),u=e.get(n);u||(u=a.querySelector(xn(n)),u||(l=H({src:l,async:!0},t),(t=bt.get(n))&&rf(l,t),u=a.createElement("script"),Ml(u),Bl(u,"link",l),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},e.set(n,u))}}function gh(l,t){Wt.M(l,t);var a=je;if(a&&l){var e=ka(a).hoistableScripts,n=Ee(l),u=e.get(n);u||(u=a.querySelector(xn(n)),u||(l=H({src:l,async:!0,type:"module"},t),(t=bt.get(n))&&rf(l,t),u=a.createElement("script"),Ml(u),Bl(u,"link",l),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},e.set(n,u))}}function md(l,t,a,e){var n=(n=Pt.current)?$i(n):null;if(!n)throw Error(m(446));switch(l){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Me(a.href),a=ka(n).hoistableStyles,e=a.get(t),e||(e={type:"style",instance:null,count:0,state:null},a.set(t,e)),e):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){l=Me(a.href);var u=ka(n).hoistableStyles,c=u.get(l);if(c||(n=n.ownerDocument||n,c={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(l,c),(u=n.querySelector(vn(l)))&&!u._p&&(c.instance=u,c.state.loading=5),bt.has(l)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},bt.set(l,a),u||yh(n,l,a,c.state))),t&&e===null)throw Error(m(528,""));return c}if(t&&e!==null)throw Error(m(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ee(a),a=ka(n).hoistableScripts,e=a.get(t),e||(e={type:"script",instance:null,count:0,state:null},a.set(t,e)),e):{type:"void",instance:null,count:0,state:null};default:throw Error(m(444,l))}}function Me(l){return'href="'+st(l)+'"'}function vn(l){return'link[rel="stylesheet"]['+l+"]"}function hd(l){return H({},l,{"data-precedence":l.precedence,precedence:null})}function yh(l,t,a,e){l.querySelector('link[rel="preload"][as="style"]['+t+"]")?e.loading=1:(t=l.createElement("link"),e.preload=t,t.addEventListener("load",function(){return e.loading|=1}),t.addEventListener("error",function(){return e.loading|=2}),Bl(t,"link",a),Ml(t),l.head.appendChild(t))}function Ee(l){return'[src="'+st(l)+'"]'}function xn(l){return"script[async]"+l}function pd(l,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var e=l.querySelector('style[data-href~="'+st(a.href)+'"]');if(e)return t.instance=e,Ml(e),e;var n=H({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return e=(l.ownerDocument||l).createElement("style"),Ml(e),Bl(e,"style",n),qi(e,a.precedence,l),t.instance=e;case"stylesheet":n=Me(a.href);var u=l.querySelector(vn(n));if(u)return t.state.loading|=4,t.instance=u,Ml(u),u;e=hd(a),(n=bt.get(n))&&sf(e,n),u=(l.ownerDocument||l).createElement("link"),Ml(u);var c=u;return c._p=new Promise(function(f,s){c.onload=f,c.onerror=s}),Bl(u,"link",e),t.state.loading|=4,qi(u,a.precedence,l),t.instance=u;case"script":return u=Ee(a.src),(n=l.querySelector(xn(u)))?(t.instance=n,Ml(n),n):(e=a,(n=bt.get(u))&&(e=H({},a),rf(e,n)),l=l.ownerDocument||l,n=l.createElement("script"),Ml(n),Bl(n,"link",e),l.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(m(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(e=t.instance,t.state.loading|=4,qi(e,a.precedence,l));return t.instance}function qi(l,t,a){for(var e=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=e.length?e[e.length-1]:null,u=n,c=0;c<e.length;c++){var f=e[c];if(f.dataset.precedence===t)u=f;else if(u!==n)break}u?u.parentNode.insertBefore(l,u.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(l,t.firstChild))}function sf(l,t){l.crossOrigin==null&&(l.crossOrigin=t.crossOrigin),l.referrerPolicy==null&&(l.referrerPolicy=t.referrerPolicy),l.title==null&&(l.title=t.title)}function rf(l,t){l.crossOrigin==null&&(l.crossOrigin=t.crossOrigin),l.referrerPolicy==null&&(l.referrerPolicy=t.referrerPolicy),l.integrity==null&&(l.integrity=t.integrity)}var Yi=null;function gd(l,t,a){if(Yi===null){var e=new Map,n=Yi=new Map;n.set(a,e)}else n=Yi,e=n.get(a),e||(e=new Map,n.set(a,e));if(e.has(l))return e;for(e.set(l,null),a=a.getElementsByTagName(l),n=0;n<a.length;n++){var u=a[n];if(!(u[Ce]||u[Dl]||l==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var c=u.getAttribute(t)||"";c=l+c;var f=e.get(c);f?f.push(u):e.set(c,[u])}}return e}function yd(l,t,a){l=l.ownerDocument||l,l.head.insertBefore(a,t==="title"?l.querySelector("head > title"):null)}function bh(l,t,a){if(a===1||t.itemProp!=null)return!1;switch(l){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(l=t.disabled,typeof t.precedence=="string"&&l==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function bd(l){return!(l.type==="stylesheet"&&(l.state.loading&3)===0)}function vh(l,t,a,e){if(a.type==="stylesheet"&&(typeof e.media!="string"||matchMedia(e.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var n=Me(e.href),u=t.querySelector(vn(n));if(u){t=u._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(l.count++,l=wi.bind(l),t.then(l,l)),a.state.loading|=4,a.instance=u,Ml(u);return}u=t.ownerDocument||t,e=hd(e),(n=bt.get(n))&&sf(e,n),u=u.createElement("link"),Ml(u);var c=u;c._p=new Promise(function(f,s){c.onload=f,c.onerror=s}),Bl(u,"link",e),a.instance=u}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(l.count++,a=wi.bind(l),t.addEventListener("load",a),t.addEventListener("error",a))}}var df=0;function xh(l,t){return l.stylesheets&&l.count===0&&Gi(l,l.stylesheets),0<l.count||0<l.imgCount?function(a){var e=setTimeout(function(){if(l.stylesheets&&Gi(l,l.stylesheets),l.unsuspend){var u=l.unsuspend;l.unsuspend=null,u()}},6e4+t);0<l.imgBytes&&df===0&&(df=62500*lh());var n=setTimeout(function(){if(l.waitingForImages=!1,l.count===0&&(l.stylesheets&&Gi(l,l.stylesheets),l.unsuspend)){var u=l.unsuspend;l.unsuspend=null,u()}},(l.imgBytes>df?50:800)+t);return l.unsuspend=a,function(){l.unsuspend=null,clearTimeout(e),clearTimeout(n)}}:null}function wi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Gi(this,this.stylesheets);else if(this.unsuspend){var l=this.unsuspend;this.unsuspend=null,l()}}}var Ri=null;function Gi(l,t){l.stylesheets=null,l.unsuspend!==null&&(l.count++,Ri=new Map,t.forEach(Sh,l),Ri=null,wi.call(l))}function Sh(l,t){if(!(t.state.loading&4)){var a=Ri.get(l);if(a)var e=a.get(null);else{a=new Map,Ri.set(l,a);for(var n=l.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<n.length;u++){var c=n[u];(c.nodeName==="LINK"||c.getAttribute("media")!=="not all")&&(a.set(c.dataset.precedence,c),e=c)}e&&a.set(null,e)}n=t.instance,c=n.getAttribute("data-precedence"),u=a.get(c)||e,u===e&&a.set(null,n),a.set(c,n),this.count++,e=wi.bind(this),n.addEventListener("load",e),n.addEventListener("error",e),u?u.parentNode.insertBefore(n,u.nextSibling):(l=l.nodeType===9?l.head:l,l.insertBefore(n,l.firstChild)),t.state.loading|=4}}var Sn={$$typeof:Ol,Provider:null,Consumer:null,_currentValue:q,_currentValue2:q,_threadCount:0};function zh(l,t,a,e,n,u,c,f,s){this.tag=1,this.containerInfo=l,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=uu(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=uu(0),this.hiddenUpdates=uu(null),this.identifierPrefix=e,this.onUncaughtError=n,this.onCaughtError=u,this.onRecoverableError=c,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function vd(l,t,a,e,n,u,c,f,s,g,x,_){return l=new zh(l,t,a,c,s,g,x,_,f),t=1,u===!0&&(t|=24),u=at(3,null,null,t),l.current=u,u.stateNode=l,t=Zu(),t.refCount++,l.pooledCache=t,t.refCount++,u.memoizedState={element:e,isDehydrated:a,cache:t},Ju(u),l}function xd(l){return l?(l=ie,l):ie}function Sd(l,t,a,e,n,u){n=xd(n),e.context===null?e.context=n:e.pendingContext=n,e=fa(t),e.payload={element:a},u=u===void 0?null:u,u!==null&&(e.callback=u),a=oa(l,e,t),a!==null&&(Jl(a,l,t),Ie(a,l,t))}function zd(l,t){if(l=l.memoizedState,l!==null&&l.dehydrated!==null){var a=l.retryLane;l.retryLane=a!==0&&a<t?a:t}}function mf(l,t){zd(l,t),(l=l.alternate)&&zd(l,t)}function _d(l){if(l.tag===13||l.tag===31){var t=Ua(l,67108864);t!==null&&Jl(t,l,67108864),mf(l,67108864)}}function Ad(l){if(l.tag===13||l.tag===31){var t=ct();t=cu(t);var a=Ua(l,t);a!==null&&Jl(a,l,t),mf(l,t)}}var Xi=!0;function _h(l,t,a,e){var n=z.T;z.T=null;var u=O.p;try{O.p=2,hf(l,t,a,e)}finally{O.p=u,z.T=n}}function Ah(l,t,a,e){var n=z.T;z.T=null;var u=O.p;try{O.p=8,hf(l,t,a,e)}finally{O.p=u,z.T=n}}function hf(l,t,a,e){if(Xi){var n=pf(e);if(n===null)Pc(l,t,e,Qi,a),jd(l,e);else if(jh(n,l,t,a,e))e.stopPropagation();else if(jd(l,e),t&4&&-1<Th.indexOf(l)){for(;n!==null;){var u=Ja(n);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var c=ja(u.pendingLanes);if(c!==0){var f=u;for(f.pendingLanes|=2,f.entangledLanes|=2;c;){var s=1<<31-lt(c);f.entanglements[1]|=s,c&=~s}Ot(u),(k&6)===0&&(Ti=Il()+500,pn(0))}}break;case 31:case 13:f=Ua(u,2),f!==null&&Jl(f,u,2),Mi(),mf(u,2)}if(u=pf(e),u===null&&Pc(l,t,e,Qi,a),u===n)break;n=u}n!==null&&e.stopPropagation()}else Pc(l,t,e,null,a)}}function pf(l){return l=gu(l),gf(l)}var Qi=null;function gf(l){if(Qi=null,l=Ka(l),l!==null){var t=j(l);if(t===null)l=null;else{var a=t.tag;if(a===13){if(l=M(t),l!==null)return l;l=null}else if(a===31){if(l=E(t),l!==null)return l;l=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;l=null}else t!==l&&(l=null)}}return Qi=l,null}function Td(l){switch(l){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(s0()){case Hf:return 2;case Nf:return 8;case Hn:case r0:return 32;case Bf:return 268435456;default:return 32}default:return 32}}var yf=!1,xa=null,Sa=null,za=null,zn=new Map,_n=new Map,_a=[],Th="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function jd(l,t){switch(l){case"focusin":case"focusout":xa=null;break;case"dragenter":case"dragleave":Sa=null;break;case"mouseover":case"mouseout":za=null;break;case"pointerover":case"pointerout":zn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":_n.delete(t.pointerId)}}function An(l,t,a,e,n,u){return l===null||l.nativeEvent!==u?(l={blockedOn:t,domEventName:a,eventSystemFlags:e,nativeEvent:u,targetContainers:[n]},t!==null&&(t=Ja(t),t!==null&&_d(t)),l):(l.eventSystemFlags|=e,t=l.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),l)}function jh(l,t,a,e,n){switch(t){case"focusin":return xa=An(xa,l,t,a,e,n),!0;case"dragenter":return Sa=An(Sa,l,t,a,e,n),!0;case"mouseover":return za=An(za,l,t,a,e,n),!0;case"pointerover":var u=n.pointerId;return zn.set(u,An(zn.get(u)||null,l,t,a,e,n)),!0;case"gotpointercapture":return u=n.pointerId,_n.set(u,An(_n.get(u)||null,l,t,a,e,n)),!0}return!1}function Md(l){var t=Ka(l.target);if(t!==null){var a=j(t);if(a!==null){if(t=a.tag,t===13){if(t=M(a),t!==null){l.blockedOn=t,Rf(l.priority,function(){Ad(a)});return}}else if(t===31){if(t=E(a),t!==null){l.blockedOn=t,Rf(l.priority,function(){Ad(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){l.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}l.blockedOn=null}function Zi(l){if(l.blockedOn!==null)return!1;for(var t=l.targetContainers;0<t.length;){var a=pf(l.nativeEvent);if(a===null){a=l.nativeEvent;var e=new a.constructor(a.type,a);pu=e,a.target.dispatchEvent(e),pu=null}else return t=Ja(a),t!==null&&_d(t),l.blockedOn=a,!1;t.shift()}return!0}function Ed(l,t,a){Zi(l)&&a.delete(t)}function Mh(){yf=!1,xa!==null&&Zi(xa)&&(xa=null),Sa!==null&&Zi(Sa)&&(Sa=null),za!==null&&Zi(za)&&(za=null),zn.forEach(Ed),_n.forEach(Ed)}function Li(l,t){l.blockedOn===t&&(l.blockedOn=null,yf||(yf=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,Mh)))}var Vi=null;function Od(l){Vi!==l&&(Vi=l,i.unstable_scheduleCallback(i.unstable_NormalPriority,function(){Vi===l&&(Vi=null);for(var t=0;t<l.length;t+=3){var a=l[t],e=l[t+1],n=l[t+2];if(typeof e!="function"){if(gf(e||a)===null)continue;break}var u=Ja(a);u!==null&&(l.splice(t,3),t-=3,hc(u,{pending:!0,data:n,method:a.method,action:e},e,n))}}))}function Oe(l){function t(s){return Li(s,l)}xa!==null&&Li(xa,l),Sa!==null&&Li(Sa,l),za!==null&&Li(za,l),zn.forEach(t),_n.forEach(t);for(var a=0;a<_a.length;a++){var e=_a[a];e.blockedOn===l&&(e.blockedOn=null)}for(;0<_a.length&&(a=_a[0],a.blockedOn===null);)Md(a),a.blockedOn===null&&_a.shift();if(a=(l.ownerDocument||l).$$reactFormReplay,a!=null)for(e=0;e<a.length;e+=3){var n=a[e],u=a[e+1],c=n[Xl]||null;if(typeof u=="function")c||Od(a);else if(c){var f=null;if(u&&u.hasAttribute("formAction")){if(n=u,c=u[Xl]||null)f=c.formAction;else if(gf(n)!==null)continue}else f=c.action;typeof f=="function"?a[e+1]=f:(a.splice(e,3),e-=3),Od(a)}}}function Dd(){function l(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(c){return n=c})},focusReset:"manual",scroll:"manual"})}function t(){n!==null&&(n(),n=null),e||setTimeout(a,20)}function a(){if(!e&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var e=!1,n=null;return navigation.addEventListener("navigate",l),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){e=!0,navigation.removeEventListener("navigate",l),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),n!==null&&(n(),n=null)}}}function bf(l){this._internalRoot=l}Ki.prototype.render=bf.prototype.render=function(l){var t=this._internalRoot;if(t===null)throw Error(m(409));var a=t.current,e=ct();Sd(a,e,l,t,null,null)},Ki.prototype.unmount=bf.prototype.unmount=function(){var l=this._internalRoot;if(l!==null){this._internalRoot=null;var t=l.containerInfo;Sd(l.current,2,null,l,null,null),Mi(),t[Va]=null}};function Ki(l){this._internalRoot=l}Ki.prototype.unstable_scheduleHydration=function(l){if(l){var t=wf();l={blockedOn:null,target:l,priority:t};for(var a=0;a<_a.length&&t!==0&&t<_a[a].priority;a++);_a.splice(a,0,l),a===0&&Md(l)}};var Ud=d.version;if(Ud!=="19.2.4")throw Error(m(527,Ud,"19.2.4"));O.findDOMNode=function(l){var t=l._reactInternals;if(t===void 0)throw typeof l.render=="function"?Error(m(188)):(l=Object.keys(l).join(","),Error(m(268,l)));return l=C(t),l=l!==null?R(l):null,l=l===null?null:l.stateNode,l};var Eh={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ji=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ji.isDisabled&&Ji.supportsFiber)try{He=Ji.inject(Eh),Pl=Ji}catch{}}return Tn.createRoot=function(l,t){if(!T(l))throw Error(m(299));var a=!1,e="",n=Ys,u=ws,c=Rs;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(e=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(u=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=vd(l,1,!1,null,null,a,e,null,n,u,c,Dd),l[Va]=t.current,Ic(l),new bf(t)},Tn.hydrateRoot=function(l,t,a){if(!T(l))throw Error(m(299));var e=!1,n="",u=Ys,c=ws,f=Rs,s=null;return a!=null&&(a.unstable_strictMode===!0&&(e=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(u=a.onUncaughtError),a.onCaughtError!==void 0&&(c=a.onCaughtError),a.onRecoverableError!==void 0&&(f=a.onRecoverableError),a.formState!==void 0&&(s=a.formState)),t=vd(l,1,!0,t,a??null,e,n,s,u,c,f,Dd),t.context=xd(null),a=t.current,e=ct(),e=cu(e),n=fa(e),n.callback=null,oa(a,n,e),a=e,t.current.lanes=a,Be(t,a),Ot(t),l[Va]=t.current,Ic(l),new Ki(t)},Tn.version="19.2.4",Tn}var Cd;function Ph(){if(Cd)return vf.exports;Cd=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(d){console.error(d)}}return i(),vf.exports=Ih(),vf.exports}var lp=Ph(),zf={exports:{}},_f={};var $d;function tp(){if($d)return _f;$d=1;var i=Fd().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;return _f.c=function(d){return i.H.useMemoCache(d)},_f}var qd;function ap(){return qd||(qd=1,zf.exports=tp()),zf.exports}var Tl=ap();function Za(i){const d=Tl.c(7);let A,m;d[0]!==i?({size:m,...A}=i,d[0]=i,d[1]=A,d[2]=m):(A=d[1],m=d[2]);const T=m===void 0?24:m;let j;d[3]===Symbol.for("react.memo_cache_sentinel")?(j=o.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"}),d[3]=j):j=d[3];let M;return d[4]!==A||d[5]!==T?(M=o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:T,height:T,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,...A,children:j}),d[4]=A,d[5]=T,d[6]=M):M=d[6],M}function Of(i){const d=Tl.c(9);let A,m,T;d[0]!==i?({size:m,strokeWidth:T,...A}=i,d[0]=i,d[1]=A,d[2]=m,d[3]=T):(A=d[1],m=d[2],T=d[3]);const j=m===void 0?24:m,M=T===void 0?2:T;let E;d[4]===Symbol.for("react.memo_cache_sentinel")?(E=o.jsx("path",{d:"M9 12a4 4 0 1 0 4 4V2a5 5 0 0 0 5 5"}),d[4]=E):E=d[4];let D;return d[5]!==A||d[6]!==j||d[7]!==M?(D=o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:j,height:j,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:M,strokeLinecap:"round",strokeLinejoin:"round",role:"img","aria-hidden":!0,...A,children:E}),d[5]=A,d[6]=j,d[7]=M,d[8]=D):D=d[8],D}function Dt(i){window.open(i,"_blank","noopener,noreferrer")}function Pd(i){document.getElementById(i.replace("#",""))?.scrollIntoView({behavior:"smooth"})}const ql=(i,d="2px",A)=>Ft`
  &:focus-visible {
    outline: 2px solid ${({theme:m})=>m.colors[i]};
    outline-offset: ${d};
    ${A&&`border-radius: ${A};`}
  }
`,jn=Ft`
  padding: 40px 16px;

  @media (min-width: 768px) {
    padding: ${({theme:i})=>i.spacing["2xl"]} ${({theme:i})=>i.spacing.md};
  }
`,Wi=Ft`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
`,Fi=Ft`
  font-family: ${({theme:i})=>i.typography.fontFamily};
  font-size: ${({theme:i})=>i.typography.size.sm};
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
`,Mn=Ft`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  ${Fi}
`,Ii=Ft`
  @media (min-width: 768px) {
    padding: 14px 28px;
    font-size: ${({theme:i})=>i.typography.size.base};
    width: auto;
  }
`,l0=Ft`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`,t0=Ft`
  ${l0}
  padding: 14px 24px;
  margin-top: auto;
  ${Fi}
`,a0=Ft`
  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.base};
    padding: 16px 24px;
    border-radius: 12px;
  }
`,e0="Sua melhor versão começa no tatame.",el={whatsapp:{href:"https://wa.me/5532984583098?text=Oi!%20Gostaria%20de%20agendar%20minha%20aula%20experimental%20gratuita%20de%20Muay%20Thai.",ariaLabel:"Abrir conversa no WhatsApp"},whatsappReserva:{href:"https://wa.me/5532984583098?text=Gostaria%20de%20reservar%20minha%20vaga%20na%20turma%20feminina!",ariaLabel:"Reservar vaga na turma feminina pelo WhatsApp"},whatsappPersonal:{href:"https://wa.me/5532984583098?text=Quero%20agendar%20uma%20avaliação%20para%20personal%20training!",ariaLabel:"Agendar avaliação para personal training pelo WhatsApp"},instagram:{label:"Instagram",href:"https://www.instagram.com/karolcascelli",ariaLabel:"Abrir perfil no Instagram"},tiktok:{label:"TikTok",href:"https://www.tiktok.com/@karolcascelli",ariaLabel:"Abrir perfil no TikTok"},maps:{href:"https://www.google.com/maps/search/?api=1&query=Rua+Virgínia+Napoleão+39+Napoleão+Muriaé+MG",ariaLabel:"Abrir localização no Google Maps"}},Yd=[{label:"Programas",href:"#programas"},{label:"Agenda",href:"#agenda"},{label:"História",href:"#historia"},{label:"Depoimentos",href:"#depoimentos"},{label:"Galeria",href:"#galeria"}],It=v.div`
  width: 100%;
  max-width: ${({$maxWidth:i="1200px"})=>i};
  margin-left: ${({$center:i=!0})=>i?"auto":"0"};
  margin-right: ${({$center:i=!0})=>i?"auto":"0"};
  padding-left: ${({theme:i})=>i.spacing.md};
  padding-right: ${({theme:i})=>i.spacing.md};

  @media (min-width: 768px) {
    padding-left: ${({theme:i})=>i.spacing.lg};
    padding-right: ${({theme:i})=>i.spacing.lg};
  }
`,wd="nav-drawer",ep=v.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({theme:i})=>i.zIndex.navbar};
  background-color: ${({$scrolled:i})=>i?"rgba(10, 10, 10, 0.92)":"rgba(10, 10, 10, 0.78)"};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid
    ${({$scrolled:i})=>i?"rgba(255, 255, 255, 0.10)":"rgba(255, 255, 255, 0.06)"};
  box-shadow: ${({$scrolled:i})=>i?"0 8px 24px -16px rgba(0, 0, 0, 0.6)":"none"};
  transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
`,np=v.nav`
  height: ${({theme:i})=>i.layout.navbarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
`,ip=v.a`
  display: flex;
  align-items: center;
  gap: ${({theme:i})=>i.spacing.sm};
  text-decoration: none;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`,up=v.span`
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  font-size: ${({theme:i})=>i.typography.size.lg};
  color: ${({theme:i})=>i.colors.text};
  letter-spacing: -0.02em;
`,cp=v.ul`
  display: none;
  align-items: center;
  gap: ${({theme:i})=>i.spacing.lg};
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 768px) { display: flex; }
`,fp=v.a`
  position: relative;
  color: ${({theme:i})=>i.colors.textMuted};
  text-decoration: none;
  font-size: ${({theme:i})=>i.typography.size.sm};
  font-weight: ${({theme:i})=>i.typography.weight.medium};
  padding: 4px 2px;
  transition: color 0.2s;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    border-radius: 2px;
    background: ${({theme:i})=>i.colors.accent};
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.25s ease;
  }

  &:hover {
    color: ${({theme:i})=>i.colors.text};
    &::after { transform: scaleX(1); }
  }

  ${ql("accent","4px","2px")}
`,op=v.div`
  display: none;
  @media (min-width: 768px) { display: block; }
`,sp=v.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  ${Fi}
  background-color: ${({theme:i})=>i.colors.accent};
  color: ${({theme:i})=>i.colors.accentText};
  border: none;
  border-radius: ${({theme:i})=>i.radius.full};
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }
  ${ql("accent")}
`,rp=v.button`
  display: flex;
  padding: ${({theme:i})=>i.spacing.sm};
  color: ${({theme:i})=>i.colors.text};
  background: transparent;
  border: none;
  border-radius: ${({theme:i})=>i.radius.md};
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: rgba(255,255,255,0.1); }
  ${ql("brand")}
  @media (min-width: 768px) { display: none; }
`,dp=v(Uh)`
  position: fixed;
  inset: 0;
  z-index: ${({theme:i})=>i.zIndex.overlay};
  background: rgba(0, 0, 0, 0.6);
  animation: overlayShow 0.2s ease-out;

  @keyframes overlayShow {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,mp=v(Hh)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${({theme:i})=>i.zIndex.drawer};
  height: 100%;
  width: min(320px, 86vw);
  background-color: ${({theme:i})=>i.colors.background};
  border-left: 1px solid ${({theme:i})=>i.colors.border};
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  outline: none;
  animation: contentSlide 0.3s ease-out;

  @keyframes contentSlide {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  &[data-state="closed"] {
    animation: contentSlideOut 0.25s ease-in forwards;
  }

  @keyframes contentSlideOut {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
`,hp=v.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:i})=>i.spacing.md};
  border-bottom: 1px solid ${({theme:i})=>i.colors.border};
`,pp=v.span`
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.text};
`,gp=v.button`
  padding: ${({theme:i})=>i.spacing.sm};
  color: ${({theme:i})=>i.colors.textMuted};
  background: transparent;
  border: none;
  border-radius: ${({theme:i})=>i.radius.md};
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  &:hover { color: ${({theme:i})=>i.colors.text}; background-color: rgba(255,255,255,0.1); }
  ${ql("brand")}
`,yp=v.ul`
  list-style: none;
  margin: 0;
  padding: ${({theme:i})=>i.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme:i})=>i.spacing.xs};
`,bp=v.a`
  display: block;
  padding: ${({theme:i})=>i.spacing.md};
  color: ${({theme:i})=>i.colors.textMuted};
  text-decoration: none;
  border-radius: ${({theme:i})=>i.radius.md};
  transition: color 0.2s, background-color 0.2s;
  &:hover { color: ${({theme:i})=>i.colors.text}; background-color: rgba(255,255,255,0.05); }
`,vp=v.div`
  margin-top: auto;
  padding: ${({theme:i})=>i.spacing.md};
  border-top: 1px solid ${({theme:i})=>i.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({theme:i})=>i.spacing.sm};
`,xp=v.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 18px;
  font-family: ${({theme:i})=>i.typography.fontFamily};
  font-size: ${({theme:i})=>i.typography.size.base};
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
  background-color: ${({theme:i})=>i.colors.accent};
  color: ${({theme:i})=>i.colors.accentText};
  border: none;
  border-radius: ${({theme:i})=>i.radius.md};
  cursor: pointer;
  transition: filter 0.15s;
  &:hover { filter: brightness(1.08); }
`,Rd=v.a`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:i})=>i.spacing.sm};
  padding: ${({theme:i})=>i.spacing.sm} ${({theme:i})=>i.spacing.md};
  color: ${({theme:i})=>i.colors.textMuted};
  text-decoration: none;
  border-radius: ${({theme:i})=>i.radius.md};
  transition: color 0.2s, background-color 0.2s;
  &:hover { color: ${({theme:i})=>i.colors.text}; background-color: rgba(255,255,255,0.05); }
  ${ql("brand")}
`;function Sp(){const i=Tl.c(24),[d,A]=_t.useState(!1),[m,T]=_t.useState(!1);let j,M;i[0]===Symbol.for("react.memo_cache_sentinel")?(j=()=>{const dl=()=>T(window.scrollY>16);return dl(),window.addEventListener("scroll",dl,{passive:!0}),()=>window.removeEventListener("scroll",dl)},M=[],i[0]=j,i[1]=M):(j=i[0],M=i[1]),_t.useEffect(j,M);let E;i[2]===Symbol.for("react.memo_cache_sentinel")?(E=()=>A(!1),i[2]=E):E=i[2];const D=E,C=_p;let R;i[3]===Symbol.for("react.memo_cache_sentinel")?(R=dl=>{D(),Pd(dl)},i[3]=R):R=i[3];const H=R;let G;i[4]===Symbol.for("react.memo_cache_sentinel")?(G=o.jsx(ip,{href:"#hero",onClick:zp,children:o.jsx(up,{children:"Karol Cascelli"})}),i[4]=G):G=i[4];let bl;i[5]===Symbol.for("react.memo_cache_sentinel")?(bl=o.jsx(cp,{children:Yd.map(dl=>o.jsx("li",{children:o.jsx(fp,{href:dl.href,onClick:$l=>{$l.preventDefault(),H(dl.href)},children:dl.label})},dl.href))}),i[5]=bl):bl=i[5];let ol;i[6]===Symbol.for("react.memo_cache_sentinel")?(ol=o.jsx(op,{children:o.jsxs(sp,{type:"button",onClick:C,"aria-label":"WhatsApp",children:[o.jsx(Za,{size:16}),"WhatsApp"]})}),i[6]=ol):ol=i[6];let rl;i[7]===Symbol.for("react.memo_cache_sentinel")?(rl=o.jsx(Rh,{size:24,strokeWidth:2,"aria-hidden":!0}),i[7]=rl):rl=i[7];let kl;i[8]!==d?(kl=o.jsx(Nh,{asChild:!0,children:o.jsx(rp,{type:"button","aria-expanded":d,"aria-controls":wd,"aria-label":"Abrir menu de navegação",children:rl})}),i[8]=d,i[9]=kl):kl=i[9];let vt;i[10]===Symbol.for("react.memo_cache_sentinel")?(vt=o.jsx(dp,{}),i[10]=vt):vt=i[10];let At;i[11]===Symbol.for("react.memo_cache_sentinel")?(At=o.jsx(pp,{children:"Karol Cascelli"}),i[11]=At):At=i[11];let Ol;i[12]===Symbol.for("react.memo_cache_sentinel")?(Ol=o.jsxs(hp,{children:[At,o.jsx(Bh,{asChild:!0,children:o.jsx(gp,{type:"button","aria-label":"Fechar menu",children:o.jsx(Gh,{size:20,strokeWidth:2,"aria-hidden":!0})})})]}),i[12]=Ol):Ol=i[12];let Wl;i[13]===Symbol.for("react.memo_cache_sentinel")?(Wl=o.jsx(yp,{children:Yd.map(dl=>o.jsx("li",{children:o.jsx(bp,{href:dl.href,onClick:$l=>{$l.preventDefault(),H(dl.href)},children:dl.label})},dl.href))}),i[13]=Wl):Wl=i[13];let ft;i[14]===Symbol.for("react.memo_cache_sentinel")?(ft=()=>{C(),D()},i[14]=ft):ft=i[14];let Yl;i[15]===Symbol.for("react.memo_cache_sentinel")?(Yl=o.jsxs(xp,{type:"button",onClick:ft,"aria-label":"Falar no WhatsApp",children:[o.jsx(Za,{size:18}),"WhatsApp"]}),i[15]=Yl):Yl=i[15];let Gl;i[16]===Symbol.for("react.memo_cache_sentinel")?(Gl=o.jsxs(Rd,{href:el.instagram.href,target:"_blank",rel:"noopener noreferrer","aria-label":el.instagram.ariaLabel,onClick:D,children:[o.jsx(Ef,{size:20,strokeWidth:2,"aria-hidden":!0}),el.instagram.label]}),i[16]=Gl):Gl=i[16];let Cl;i[17]===Symbol.for("react.memo_cache_sentinel")?(Cl=o.jsxs(Ch,{children:[vt,o.jsxs(mp,{id:wd,"aria-label":"Menu de navegação",children:[Ol,Wl,o.jsxs(vp,{children:[Yl,Gl,o.jsxs(Rd,{href:el.tiktok.href,target:"_blank",rel:"noopener noreferrer","aria-label":el.tiktok.ariaLabel,onClick:D,children:[o.jsx(Of,{size:20,strokeWidth:2}),el.tiktok.label]})]})]})]}),i[17]=Cl):Cl=i[17];let Fl;i[18]!==d||i[19]!==kl?(Fl=o.jsx(It,{children:o.jsxs(np,{"aria-label":"Principal",children:[G,bl,ol,o.jsxs($h,{open:d,onOpenChange:A,children:[kl,Cl]})]})}),i[18]=d,i[19]=kl,i[20]=Fl):Fl=i[20];let Ut;return i[21]!==m||i[22]!==Fl?(Ut=o.jsx(ep,{$scrolled:m,children:Fl}),i[21]=m,i[22]=Fl,i[23]=Ut):Ut=i[23],Ut}function zp(i){i.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})}function _p(){return Dt(el.whatsapp.href)}const Ap=v.footer`
  background-color: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`,Tp=v.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 0;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: ${({theme:i})=>i.spacing.lg};
    padding: ${({theme:i})=>i.spacing.xl} 0;
  }
`,jp=v.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  @media (min-width: 640px) {
    align-items: flex-start;
    gap: 4px;
  }
`,Mp=v.span`
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  font-size: ${({theme:i})=>i.typography.size.sm};
  color: ${({theme:i})=>i.colors.text};

  @media (min-width: 640px) {
    font-size: ${({theme:i})=>i.typography.size.base};
  }
`,Ep=v.span`
  font-size: 0.75rem;
  color: ${({theme:i})=>i.colors.textMuted};

  @media (min-width: 640px) {
    font-size: ${({theme:i})=>i.typography.size.sm};
  }
`,Op=v.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Af=v.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${({theme:i})=>i.colors.textMuted};
  transition: color 0.2s;

  @media (min-width: 640px) {
    width: 36px;
    height: 36px;
  }

  &:hover { color: ${({theme:i})=>i.colors.text}; }
  ${ql("brand","2px","4px")}
`,Dp=v.div`
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px 0;
  text-align: center;

  @media (min-width: 640px) {
    padding: ${({theme:i})=>i.spacing.md} 0;
  }
`,Up=v.p`
  margin: 0;
  font-size: 0.6875rem;
  color: ${({theme:i})=>i.colors.textMuted};

  @media (min-width: 640px) {
    font-size: ${({theme:i})=>i.typography.size.sm};
  }
`;function Hp(){const i=Tl.c(5);let d;i[0]===Symbol.for("react.memo_cache_sentinel")?(d=o.jsxs(jp,{children:[o.jsx(Mp,{children:"Karol Cascelli | Team Link"}),o.jsx(Ep,{children:e0})]}),i[0]=d):d=i[0];let A;i[1]===Symbol.for("react.memo_cache_sentinel")?(A=o.jsx(Af,{href:el.whatsapp.href,target:"_blank",rel:"noopener noreferrer","aria-label":el.whatsapp.ariaLabel,children:o.jsx(Za,{size:18})}),i[1]=A):A=i[1];let m;i[2]===Symbol.for("react.memo_cache_sentinel")?(m=o.jsx(Af,{href:el.instagram.href,target:"_blank",rel:"noopener noreferrer","aria-label":el.instagram.ariaLabel,children:o.jsx(Ef,{size:18,strokeWidth:2,"aria-hidden":!0})}),i[2]=m):m=i[2];let T;i[3]===Symbol.for("react.memo_cache_sentinel")?(T=o.jsxs(Tp,{children:[d,o.jsxs(Op,{children:[A,m,o.jsx(Af,{href:el.tiktok.href,target:"_blank",rel:"noopener noreferrer","aria-label":el.tiktok.ariaLabel,children:o.jsx(Of,{size:18,strokeWidth:2})})]})]}),i[3]=T):T=i[3];let j;return i[4]===Symbol.for("react.memo_cache_sentinel")?(j=o.jsx(Ap,{children:o.jsxs(It,{children:[T,o.jsx(Dp,{children:o.jsx(Up,{children:"© 2026 Karol Cascelli. Todos os direitos reservados."})})]})}),i[4]=j):j=i[4],j}const Np=v.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: ${({theme:i})=>i.zIndex.cta};
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({theme:i})=>i.radius.full};
  background-color: ${({theme:i})=>i.colors.whatsapp};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: background-color 0.2s, transform 0.2s;

  @media (min-width: 768px) {
    bottom: ${({theme:i})=>i.spacing.lg};
    right: ${({theme:i})=>i.spacing.lg};
    width: 3.5rem;
    height: 3.5rem;
  }

  &:hover {
    background-color: ${({theme:i})=>i.colors.whatsappHover};
    transform: scale(1.05);
  }
  ${ql("whatsapp")}
`;function Bp(){const i=Tl.c(1),d=Cp;let A;return i[0]===Symbol.for("react.memo_cache_sentinel")?(A=o.jsx(Np,{type:"button",onClick:d,"aria-label":el.whatsapp.ariaLabel,children:o.jsx(Za,{size:22})}),i[0]=A):A=i[0],A}function Cp(){return Dt(el.whatsapp.href)}const $p=v.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({theme:i})=>i.colors.background};
`,qp=v.main`
  flex: 1;
  padding-top: ${({theme:i})=>i.layout.navbarHeight};
`;function Yp(i){const d=Tl.c(7),{children:A}=i;let m;d[0]===Symbol.for("react.memo_cache_sentinel")?(m=o.jsx(Sp,{}),d[0]=m):m=d[0];let T;d[1]!==A?(T=o.jsx(qp,{children:A}),d[1]=A,d[2]=T):T=d[2];let j,M;d[3]===Symbol.for("react.memo_cache_sentinel")?(j=o.jsx(Hp,{}),M=o.jsx(Bp,{}),d[3]=j,d[4]=M):(j=d[3],M=d[4]);let E;return d[5]!==T?(E=o.jsxs($p,{children:[m,T,j,M]}),d[5]=T,d[6]=E):E=d[6],E}function pl(i,d){const A=i.replace("#",""),m=A.length===3?A.split("").map(D=>D+D).join(""):A,T=Number.parseInt(m,16),j=T>>16&255,M=T>>8&255,E=T&255;return`rgba(${j}, ${M}, ${E}, ${d})`}const wp=[{value:"12 anos",label:"De tatame"},{value:"2x/sem",label:"Aulas"},{value:"Team Link",label:"Equipe"}],Rp=[{day:"Terça-feira",time:"19:00",class:"Turma Feminina"},{day:"Quinta-feira",time:"19:00",class:"Turma Feminina"}],Gp="Personal training: horários flexíveis mediante agendamento",Xp=[{year:"2014",title:"Início no Muay Thai",description:"Primeiros passos no tatame e o começo de uma jornada de disciplina e paixão."},{year:"2015",title:"Team Link",description:"Entra para a equipe Team Link com o professor Victor, referência em artes marciais no Brasil."},{year:"2023",title:"Turma Feminina",description:"Lança a turma exclusiva para mulheres, criando um espaço de acolhimento e evolução."},{year:"2026",title:"O Retorno",description:"Após uma pausa, retorna com força total ao tatame e à turma feminina."}],Qp=[{sessions:"1 aula",price:"R$ 50"},{sessions:"5 aulas",price:"R$ 225"},{sessions:"10 aulas",price:"R$ 400"}],Zp="R$ 100/mês",Lp=["Turma Feminina","Desde 2014","Team Link","Evolução"],Vp="/hero.webp",Kp=qh`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`,Jp=v.section`
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px 32px;
  text-align: center;
  overflow: hidden;
  background-color: ${({theme:i})=>i.colors.background};
  contain: layout paint;

  @media (min-width: 768px) {
    justify-content: center;
    min-height: 100vh;
    text-align: left;
    padding: ${({theme:i})=>i.spacing["2xl"]} ${({theme:i})=>i.spacing.lg};
    padding-top: calc(${({theme:i})=>i.layout.navbarHeight} + ${({theme:i})=>i.spacing["2xl"]});
  }
`,kp=v.picture`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: block;
`,Wp=v.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
`,Fp=v.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(10, 10, 10, 0.92) 0%,
    rgba(10, 10, 10, 0.5) 40%,
    rgba(10, 10, 10, 0.25) 100%
  );

  @media (min-width: 768px) {
    background:
      radial-gradient(
        circle at 75% 65%,
        ${({theme:i})=>pl(i.colors.accent,.1)} 0%,
        ${({theme:i})=>pl(i.colors.accent,0)} 45%
      ),
      linear-gradient(
        135deg,
        rgba(10, 10, 10, 0.78) 0%,
        rgba(10, 10, 10, 0.42) 100%
      );
  }
`,Ip=v.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    z-index: 1;
    bottom: -160px;
    left: -120px;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      ${({theme:i})=>pl(i.colors.brand,.35)} 0%,
      ${({theme:i})=>pl(i.colors.brand,0)} 65%
    );
    filter: blur(40px);
    pointer-events: none;
  }
`,Pp=v.div`
  position: relative;
  z-index: 2;
  max-width: 48rem;
  margin: 0 auto;
  width: 100%;
  animation: ${Kp} 0.8s ease-out both;

  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: auto;
  }

  @media (min-width: 1024px) {
    max-width: 56rem;
  }
`,lg=v.h1`
  margin: 0;
  font-size: clamp(2rem, 9vw, 4.5rem);
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.text};
  line-height: 1.05;
  letter-spacing: -0.02em;
`,tg=v.span`
  display: block;
  margin-top: 6px;
  margin-bottom: 8px;
  font-size: clamp(0.9375rem, 3vw, 1.5rem);
  font-weight: ${({theme:i})=>i.typography.weight.medium};
  color: ${({theme:i})=>i.colors.accent};
  font-style: italic;

  @media (min-width: 768px) {
    margin-top: ${({theme:i})=>i.spacing.sm};
    margin-bottom: ${({theme:i})=>i.spacing.md};
  }
`,ag=v.p`
  margin: 0 0 16px;
  font-size: clamp(0.8125rem, 2.5vw, 1.125rem);
  color: ${({theme:i})=>i.colors.textMuted};

  @media (min-width: 768px) {
    margin-bottom: ${({theme:i})=>i.spacing.lg};
  }
`,eg=v.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
  justify-content: center;

  @media (min-width: 768px) {
    gap: ${({theme:i})=>i.spacing.sm};
    margin-bottom: ${({theme:i})=>i.spacing.xl};
    justify-content: flex-start;
  }
`,ng=v.span`
  display: inline-block;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: ${({theme:i})=>i.typography.weight.medium};
  color: ${({theme:i})=>i.colors.text};
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${({theme:i})=>i.radius.full};

  @media (min-width: 768px) {
    padding: 6px 16px;
    font-size: ${({theme:i})=>i.typography.size.sm};
  }
`,ig=v.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  justify-content: center;

  @media (min-width: 768px) {
    gap: 3rem;
    margin-bottom: ${({theme:i})=>i.spacing.xl};
    justify-content: flex-start;
  }
`,ug=v.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`,cg=v.span`
  display: block;
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-size: clamp(1.25rem, 5vw, 2.25rem);
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.accent};
  line-height: 1.1;
  letter-spacing: -0.01em;

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`,fg=v.span`
  font-size: 0.75rem;
  color: ${({theme:i})=>i.colors.textMuted};

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.sm};
  }
`,og=v.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: stretch;

  @media (min-width: 768px) {
    flex-direction: row;
    width: auto;
    align-items: flex-start;
    gap: ${({theme:i})=>i.spacing.md};
  }
`,sg=v.button`
  ${Mn}
  background-color: ${({theme:i})=>i.colors.accent};
  color: ${({theme:i})=>i.colors.accentText};
  border: none;
  border-radius: ${({theme:i})=>i.radius.md};
  cursor: pointer;
  box-shadow: 0 6px 24px ${({theme:i})=>pl(i.colors.accent,.18)};
  transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.25s ease;

  ${Ii}

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    box-shadow: 0 10px 32px ${({theme:i})=>pl(i.colors.accent,.32)};
  }
  &:active { transform: translateY(0); box-shadow: 0 4px 16px ${({theme:i})=>pl(i.colors.accent,.18)}; }
  ${ql("accent")}
`,rg=v.button`
  ${Mn}
  background-color: rgba(255, 255, 255, 0.08);
  color: ${({theme:i})=>i.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${({theme:i})=>i.radius.md};
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  ${Ii}

  &:hover { background-color: rgba(255, 255, 255, 0.14); border-color: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
  &:active { transform: translateY(0); }
  ${ql("text")}
`;function dg(){const i=Tl.c(9),d=gg,A=pg;let m,T,j;i[0]===Symbol.for("react.memo_cache_sentinel")?(m=o.jsxs(kp,{children:[o.jsx("source",{type:"image/avif",srcSet:"/hero/hero-768.avif 768w, /hero/hero-1280.avif 1280w",sizes:"(min-width: 1280px) 1280px, 100vw"}),o.jsx("source",{type:"image/webp",srcSet:"/hero/hero-768.webp 768w, /hero/hero-1280.webp 1280w",sizes:"(min-width: 1280px) 1280px, 100vw"}),o.jsx(Wp,{src:Vp,alt:"","aria-hidden":!0,fetchPriority:"high",loading:"eager",decoding:"async",width:1536,height:1024})]}),T=o.jsx(Fp,{"aria-hidden":!0}),j=o.jsx(Ip,{"aria-hidden":!0}),i[0]=m,i[1]=T,i[2]=j):(m=i[0],T=i[1],j=i[2]);let M,E,D;i[3]===Symbol.for("react.memo_cache_sentinel")?(M=o.jsx(lg,{children:"Karol Cascelli"}),E=o.jsx(tg,{children:"Muay Thai & Personal"}),D=o.jsx(ag,{children:e0}),i[3]=M,i[4]=E,i[5]=D):(M=i[3],E=i[4],D=i[5]);let C;i[6]===Symbol.for("react.memo_cache_sentinel")?(C=o.jsx(eg,{children:Lp.map(hg)}),i[6]=C):C=i[6];let R;i[7]===Symbol.for("react.memo_cache_sentinel")?(R=o.jsx(ig,{children:wp.map(mg)}),i[7]=R):R=i[7];let H;return i[8]===Symbol.for("react.memo_cache_sentinel")?(H=o.jsxs(Jp,{id:"hero",children:[m,T,j,o.jsxs(Pp,{children:[M,E,D,C,R,o.jsxs(og,{children:[o.jsxs(sg,{type:"button",onClick:d,"aria-label":"Falar no WhatsApp",children:[o.jsx(Za,{size:18}),"Falar no WhatsApp"]}),o.jsx(rg,{type:"button",onClick:A,"aria-label":"Ver agenda de aulas",children:"Ver agenda"})]})]})]}),i[8]=H):H=i[8],H}function mg(i){return o.jsxs(ug,{children:[o.jsx(cg,{children:i.value}),o.jsx(fg,{children:i.label})]},i.label)}function hg(i){return o.jsx(ng,{children:i},i)}function pg(){return Pd("agenda")}function gg(){return Dt(el.whatsapp.href)}const yg=v.div`
  text-align: center;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    margin-bottom: ${({theme:i})=>i.spacing.xl};
  }

  @media (min-width: 1024px) {
    margin-bottom: ${({theme:i})=>i.spacing["2xl"]};
  }
`,bg=v.h2`
  margin: 0;
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-size: clamp(1.5rem, 5vw, ${({theme:i})=>i.typography.size["3xl"]});
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.text};
  letter-spacing: -0.02em;
  line-height: 1.15;

  @media (min-width: 1024px) {
    font-size: ${({theme:i})=>i.typography.size["4xl"]};
  }
`,vg=v.span`
  display: block;
  width: 36px;
  height: 3px;
  margin: 10px auto 0;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${({theme:i})=>i.colors.brand},
    ${({theme:i})=>i.colors.accent}
  );

  @media (min-width: 768px) {
    width: 48px;
    margin-top: 14px;
  }
`,xg=v.p`
  margin: 14px 0 0;
  font-size: 0.875rem;
  color: ${({theme:i})=>i.colors.textMuted};
  line-height: 1.55;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    margin-top: ${({theme:i})=>i.spacing.md};
    font-size: ${({theme:i})=>i.typography.size.base};
  }

  @media (min-width: 1024px) {
    font-size: ${({theme:i})=>i.typography.size.lg};
  }
`;function De(i){const d=Tl.c(9),{title:A,subtitle:m,id:T}=i;let j;d[0]!==T||d[1]!==A?(j=o.jsx(bg,{id:T,children:A}),d[0]=T,d[1]=A,d[2]=j):j=d[2];let M;d[3]===Symbol.for("react.memo_cache_sentinel")?(M=o.jsx(vg,{"aria-hidden":!0}),d[3]=M):M=d[3];let E;d[4]!==m?(E=m&&o.jsx(xg,{children:m}),d[4]=m,d[5]=E):E=d[5];let D;return d[6]!==j||d[7]!==E?(D=o.jsxs(yg,{children:[j,M,E]}),d[6]=j,d[7]=E,d[8]=D):D=d[8],D}const Sg=()=>typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function zg(i){const d=Tl.c(6),A=.15,m=_t.useRef(null),[T,j]=_t.useState(Sg);let M,E;d[0]!==A||d[1]!==T?(M=()=>{const C=m.current;if(!C||T)return;const R=new IntersectionObserver(H=>{const[G]=H;G.isIntersecting&&(j(!0),R.unobserve(C))},{threshold:A,rootMargin:"0px 0px -40px 0px"});return R.observe(C),()=>R.disconnect()},E=[A,T],d[0]=A,d[1]=T,d[2]=M,d[3]=E):(M=d[2],E=d[3]),_t.useEffect(M,E);let D;return d[4]!==T?(D={ref:m,visible:T},d[4]=T,d[5]=D):D=d[5],D}const _g={up:"translateY(32px)",left:"translateX(-32px)",right:"translateX(32px)",none:"none"},Ag=v.div`
  opacity: ${({$visible:i})=>i?1:0};
  transform: ${({$visible:i,$dir:d})=>i?"none":_g[d]};
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${({$delay:i})=>i}ms,
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${({$delay:i})=>i}ms;
  will-change: ${({$visible:i})=>i?"auto":"opacity, transform"};
`;function Al(i){const d=Tl.c(7),{children:A,direction:m,delay:T,className:j}=i,M=m===void 0?"up":m,E=T===void 0?0:T,{ref:D,visible:C}=zg();let R;return d[0]!==A||d[1]!==j||d[2]!==E||d[3]!==M||d[4]!==D||d[5]!==C?(R=o.jsx(Ag,{ref:D,$visible:C,$dir:M,$delay:E,className:j,children:A}),d[0]=A,d[1]=j,d[2]=E,d[3]=M,d[4]=D,d[5]=C,d[6]=R):R=d[6],R}const Tg=v.section`
  ${jn}
`,jg=v.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({theme:i})=>i.spacing.lg};
  }
`,Mf=v.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  ${Wi}
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${({theme:i})=>i.spacing.md};
    padding: ${({theme:i})=>i.spacing.lg};
    border-radius: ${({theme:i})=>i.radius.lg};

    &:hover {
      transform: translateY(-6px);
      border-color: ${({theme:i})=>pl(i.colors.brandLight,.45)};
      box-shadow: 0 20px 40px -20px ${({theme:i})=>pl(i.colors.brand,.45)};
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.07) 0%,
        rgba(255, 255, 255, 0.025) 100%
      );
    }
  }

  @media (min-width: 1024px) {
    padding: ${({theme:i})=>i.spacing.xl};
  }
`,Mg=v.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    ${({theme:i})=>i.colors.brand},
    ${({theme:i})=>i.colors.brandLight}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 6px 18px -6px ${({theme:i})=>pl(i.colors.brand,.6)};
  transition: transform 0.3s ease;

  ${Mf}:hover & {
    transform: scale(1.06) rotate(-3deg);
  }

  @media (prefers-reduced-motion: reduce) {
    ${Mf}:hover & { transform: none; }
  }

  @media (min-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: ${({theme:i})=>i.radius.lg};
  }
`,Eg=v.div`
  flex: 1;
  min-width: 0;
`,Og=v.h3`
  margin: 0 0 4px;
  font-size: ${({theme:i})=>i.typography.size.base};
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
  color: ${({theme:i})=>i.colors.text};

  @media (min-width: 768px) {
    margin: 0;
    font-size: ${({theme:i})=>i.typography.size.xl};
  }
`,Dg=v.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({theme:i})=>i.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.base};
    line-height: 1.65;
  }
`,Ug=[{icon:Xh,title:"Foco em Mulheres",text:"Ambiente exclusivo e acolhedor, pensado para que você treine com confiança e respeito ao seu ritmo."},{icon:Qh,title:"Treino Personalizado",text:"Personal training com horários flexíveis e acompanhamento individual."},{icon:Zh,title:"Tradição Team Link",text:"Parte de uma das maiores equipes de artes marciais do Brasil, desde 2014."}];function Hg(){const i=Tl.c(2);let d;i[0]===Symbol.for("react.memo_cache_sentinel")?(d=o.jsx(Al,{children:o.jsx(De,{title:"Por que treinar com a Karol?",subtitle:"Três pilares que fazem a diferença no seu treino.",id:"proposta-title"})}),i[0]=d):d=i[0];let A;return i[1]===Symbol.for("react.memo_cache_sentinel")?(A=o.jsx(Tg,{"aria-labelledby":"proposta-title",children:o.jsxs(It,{children:[d,o.jsx(jg,{children:Ug.map(Ng)})]})}),i[1]=A):A=i[1],A}function Ng(i,d){return o.jsx(Al,{delay:d*120,children:o.jsxs(Mf,{children:[o.jsx(Mg,{"aria-hidden":!0,children:o.jsx(i.icon,{size:20,strokeWidth:2})}),o.jsxs(Eg,{children:[o.jsx(Og,{children:i.title}),o.jsx(Dg,{children:i.text})]})]})},i.title)}const Bg=v.section`
  ${jn}
  background-color: ${({theme:i})=>i.colors.background};
`,Cg=v.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({theme:i})=>i.spacing.xl};
  }

  @media (min-width: 1024px) {
    gap: ${({theme:i})=>i.spacing["2xl"]};
    max-width: 1100px;
    margin: 0 auto;
  }
`,Gd=v.div`
  position: relative;
  ${Wi}
  border: 1px solid
    ${({theme:i,$featured:d})=>d?pl(i.colors.accent,.35):"rgba(255, 255, 255, 0.1)"};
  border-radius: 16px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 40px 32px;
    gap: 20px;

    ${({theme:i,$featured:d})=>d&&`box-shadow: 0 24px 60px -28px ${pl(i.colors.accent,.35)};`}

    &:hover {
      transform: translateY(-6px);
      border-color: ${({theme:i,$featured:d})=>d?pl(i.colors.accent,.55):"rgba(255, 255, 255, 0.22)"};
      box-shadow: ${({theme:i,$featured:d})=>d?`0 30px 70px -28px ${pl(i.colors.accent,.55)}`:"0 24px 50px -28px rgba(0, 0, 0, 0.6)"};
    }
  }
`,$g=v.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  font-size: 0.625rem;
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background-color: ${({theme:i})=>i.colors.accent};
  color: ${({theme:i})=>i.colors.accentText};
  border-radius: ${({theme:i})=>i.radius.full};
  white-space: nowrap;

  @media (min-width: 768px) {
    top: -14px;
    padding: 6px 20px;
    font-size: 0.6875rem;
  }
`,Xd=v.h3`
  margin: 0;
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-size: ${({theme:i})=>i.typography.size.xl};
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.text};

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size["2xl"]};
  }
`,Qd=v.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({theme:i})=>i.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.sm};
    line-height: 1.6;
  }
`,qg=v.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;

  @media (min-width: 768px) {
    border-radius: 12px;
    padding: 16px 20px;
  }
`,Yg=v.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
`,wg=v.span`
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.accent};
  line-height: 1;
`,Rg=v.span`
  font-size: ${({theme:i})=>i.typography.size.sm};
  color: ${({theme:i})=>i.colors.textMuted};
`,Gg=v.span`
  display: block;
  margin-top: 2px;
  font-size: 0.75rem;
  color: ${({theme:i})=>i.colors.textMuted};

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.sm};
    margin-top: 4px;
  }
`,Xg=v.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,Qg=v.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: ${({theme:i})=>i.typography.size.sm};
  color: ${({theme:i})=>i.colors.textMuted};

  &:last-child { border-bottom: none; }

  @media (min-width: 768px) {
    padding: 12px 0;
    font-size: ${({theme:i})=>i.typography.size.base};
  }
`,Zg=v.span`
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.accent};
  font-size: ${({theme:i})=>i.typography.size.base};

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.lg};
  }
`,Zd=v.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,n0=v.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.8125rem;
  color: ${({theme:i})=>i.colors.textMuted};
  line-height: 1.4;

  svg {
    color: ${({theme:i})=>i.colors.accent};
    flex-shrink: 0;
    margin-top: 2px;
  }

  @media (min-width: 768px) {
    gap: 10px;
    font-size: ${({theme:i})=>i.typography.size.sm};
    line-height: 1.5;
  }
`,Lg=v.button`
  ${t0}
  background-color: ${({theme:i})=>i.colors.accent};
  color: ${({theme:i})=>i.colors.accentText};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;

  ${a0}

  &:hover { transform: translateY(-2px); filter: brightness(1.06); }
  &:active { transform: translateY(0); }
  ${ql("accent")}
`,Vg=v.button`
  ${t0}
  background: transparent;
  color: ${({theme:i})=>i.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  ${a0}

  &:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.35); transform: translateY(-2px); }
  &:active { transform: translateY(0); }
  ${ql("text")}
`,Kg=["Turmas divididas por nível","Ambiente 100% feminino e acolhedor","Aulas de 60 minutos","Terças e quintas às 19h","Técnica, sparring e condicionamento"],Jg=["Acompanhamento individualizado","Horários flexíveis","Treino focado em seus objetivos","Evolução acelerada","Plano de treino personalizado","Aberto para mulheres e homens"];function kg(){const i=Tl.c(11),d=l1,A=Pg;let m;i[0]===Symbol.for("react.memo_cache_sentinel")?(m=Zp.split("/"),i[0]=m):m=i[0];const[T,j]=m;let M;i[1]===Symbol.for("react.memo_cache_sentinel")?(M=o.jsx(Al,{children:o.jsx(De,{title:"Programas",subtitle:"Escolha o formato ideal para sua rotina.",id:"programas-title"})}),i[1]=M):M=i[1];let E,D,C;i[2]===Symbol.for("react.memo_cache_sentinel")?(E=o.jsx($g,{children:"Mais popular"}),D=o.jsx(Xd,{children:"Turma Feminina"}),C=o.jsx(Qd,{children:"Aulas em grupo exclusivas para mulheres, com foco em técnica, condicionamento e empoderamento."}),i[2]=E,i[3]=D,i[4]=C):(E=i[2],D=i[3],C=i[4]);let R;i[5]===Symbol.for("react.memo_cache_sentinel")?(R=o.jsxs(qg,{children:[o.jsxs(Yg,{children:[o.jsx(wg,{children:T}),o.jsxs(Rg,{children:["/",j]})]}),o.jsx(Gg,{children:"2 aulas por semana"})]}),i[5]=R):R=i[5];let H;i[6]===Symbol.for("react.memo_cache_sentinel")?(H=o.jsx(Al,{delay:0,children:o.jsxs(Gd,{$featured:!0,children:[E,D,C,R,o.jsx(Zd,{children:Kg.map(Ig)}),o.jsx(Lg,{type:"button",onClick:d,"aria-label":el.whatsappReserva.ariaLabel,children:"Reservar vaga"})]})}),i[6]=H):H=i[6];let G,bl;i[7]===Symbol.for("react.memo_cache_sentinel")?(G=o.jsx(Xd,{children:"Personal"}),bl=o.jsx(Qd,{children:"Treino individual 100% personalizado para seus objetivos, com atenção exclusiva e progressão acelerada."}),i[7]=G,i[8]=bl):(G=i[7],bl=i[8]);let ol;i[9]===Symbol.for("react.memo_cache_sentinel")?(ol=o.jsx(Xg,{children:Qp.map(Fg)}),i[9]=ol):ol=i[9];let rl;return i[10]===Symbol.for("react.memo_cache_sentinel")?(rl=o.jsx(Bg,{id:"programas","aria-labelledby":"programas-title",children:o.jsxs(It,{children:[M,o.jsxs(Cg,{children:[H,o.jsx(Al,{delay:150,children:o.jsxs(Gd,{children:[G,bl,ol,o.jsx(Zd,{children:Jg.map(Wg)}),o.jsx(Vg,{type:"button",onClick:A,"aria-label":el.whatsappPersonal.ariaLabel,children:"Agendar avaliação"})]})})]})]})}),i[10]=rl):rl=i[10],rl}function Wg(i){return o.jsxs(n0,{children:[o.jsx(Id,{size:14,strokeWidth:3,"aria-hidden":!0}),i]},i)}function Fg(i){return o.jsxs(Qg,{children:[o.jsx("span",{children:i.sessions}),o.jsx(Zg,{children:i.price})]},i.sessions)}function Ig(i){return o.jsxs(n0,{children:[o.jsx(Id,{size:14,strokeWidth:3,"aria-hidden":!0}),i]},i)}function Pg(){return Dt(el.whatsappPersonal.href)}function l1(){return Dt(el.whatsappReserva.href)}const i0="/assets/turma-feminina-B-HZuObl.webp",t1=Object.freeze(Object.defineProperty({__proto__:null,default:i0},Symbol.toStringTag,{value:"Module"})),a1=v.section`
  ${jn}
  background-color: ${({theme:i})=>i.colors.background};
`,e1=v.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({theme:i})=>i.spacing.xl};
  }
`,n1=v.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: 768px) {
    gap: ${({theme:i})=>i.spacing.lg};
  }
`,Ld=v.div`
  display: flex;
  align-items: center;
  gap: ${({theme:i})=>i.spacing.sm};
`,Vd=v.span`
  color: ${({theme:i})=>i.colors.accent};
  display: flex;
  align-items: center;
`,Kd=v.h3`
  margin: 0;
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-size: ${({theme:i})=>i.typography.size.lg};
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
  color: ${({theme:i})=>i.colors.text};

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.xl};
  }
`,i1=v.table`
  width: 100%;
  border-collapse: collapse;
  ${Wi}
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;

  @media (min-width: 768px) {
    border-radius: 14px;
  }

  tbody tr {
    transition: background-color 0.2s ease;
  }

  @media (min-width: 1024px) {
    tbody tr:hover {
      background-color: rgba(255, 255, 255, 0.04);
    }
  }
`,Tf=v.th`
  text-align: left;
  padding: 10px 14px;
  font-size: 0.75rem;
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
  color: ${({theme:i})=>i.colors.textMuted};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (min-width: 768px) {
    padding: 14px 20px;
    font-size: ${({theme:i})=>i.typography.size.sm};
  }
`,jf=v.td`
  padding: 10px 14px;
  font-size: ${({theme:i})=>i.typography.size.sm};
  color: ${({theme:i})=>i.colors.text};
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  tr:last-child & { border-bottom: none; }

  @media (min-width: 768px) {
    padding: 14px 20px;
    font-size: ${({theme:i})=>i.typography.size.base};
  }
`,u1=v.span`
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.6875rem;
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
  color: ${({theme:i})=>i.colors.accentText};
  background-color: ${({theme:i})=>i.colors.accent};
  border-radius: ${({theme:i})=>i.radius.full};
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 4px 14px;
    font-size: ${({theme:i})=>i.typography.size.sm};
  }
`,c1=v.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 0.75rem;
  color: ${({theme:i})=>i.colors.textMuted};

  svg { flex-shrink: 0; opacity: 0.6; }

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.sm};
    gap: 8px;
  }
`,f1=v.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: 768px) {
    gap: ${({theme:i})=>i.spacing.lg};
  }
`,o1=v.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 40px -16px rgba(0, 0, 0, 0.6);

  @media (min-width: 768px) {
    aspect-ratio: 16 / 10;
    border-radius: 16px;
  }
`,s1=v.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`,r1=v.h4`
  margin: 0;
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-size: ${({theme:i})=>i.typography.size.base};
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
  color: ${({theme:i})=>i.colors.text};

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.lg};
  }
`,d1=v.p`
  margin: 4px 0 0;
  font-size: 0.8125rem;
  color: ${({theme:i})=>i.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 768px) {
    margin: 0;
    font-size: ${({theme:i})=>i.typography.size.sm};
    line-height: 1.6;
  }
`,m1=v.button`
  ${l0}
  padding: 12px 20px;
  ${Fi}
  background: transparent;
  color: ${({theme:i})=>i.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  @media (min-width: 768px) {
    padding: 14px 24px;
    font-size: ${({theme:i})=>i.typography.size.base};
    border-radius: 12px;
  }

  &:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.3); transform: translateY(-2px); }
  ${ql("text")}
`;function h1(){const i=Tl.c(8),d=g1;let A;i[0]===Symbol.for("react.memo_cache_sentinel")?(A=o.jsx(Al,{children:o.jsx(De,{title:"Agenda & Local",subtitle:"Confira os horários e venha conhecer o espaço.",id:"agenda-title"})}),i[0]=A):A=i[0];let m;i[1]===Symbol.for("react.memo_cache_sentinel")?(m=o.jsxs(Ld,{children:[o.jsx(Vd,{"aria-hidden":!0,children:o.jsx(Lh,{size:20,strokeWidth:2})}),o.jsx(Kd,{children:"Horários das turmas"})]}),i[1]=m):m=i[1];let T;i[2]===Symbol.for("react.memo_cache_sentinel")?(T=o.jsxs(i1,{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx(Tf,{children:"Dia"}),o.jsx(Tf,{children:"Horário"}),o.jsx(Tf,{children:"Turma"})]})}),o.jsx("tbody",{children:Rp.map(p1)})]}),i[2]=T):T=i[2];let j;i[3]===Symbol.for("react.memo_cache_sentinel")?(j=o.jsx(Al,{children:o.jsxs(n1,{children:[m,T,o.jsxs(c1,{children:[o.jsx(Vh,{size:13,strokeWidth:2,"aria-hidden":!0}),Gp]})]})}),i[3]=j):j=i[3];let M;i[4]===Symbol.for("react.memo_cache_sentinel")?(M=o.jsxs(Ld,{children:[o.jsx(Vd,{"aria-hidden":!0,children:o.jsx(Kh,{size:20,strokeWidth:2})}),o.jsx(Kd,{children:"Onde treinamos"})]}),i[4]=M):M=i[4];let E,D;i[5]===Symbol.for("react.memo_cache_sentinel")?(E=o.jsx(o1,{children:o.jsx(s1,{src:i0,alt:"Turma feminina de Muay Thai na Team Link",loading:"lazy",width:800,height:500,decoding:"async"})}),D=o.jsx(r1,{children:"Team Link – Muay Thai"}),i[5]=E,i[6]=D):(E=i[5],D=i[6]);let C;return i[7]===Symbol.for("react.memo_cache_sentinel")?(C=o.jsx(a1,{id:"agenda","aria-labelledby":"agenda-title",children:o.jsxs(It,{children:[A,o.jsxs(e1,{children:[j,o.jsx(Al,{delay:150,children:o.jsxs(f1,{children:[M,E,o.jsxs("div",{children:[D,o.jsxs(d1,{children:["Rua Virgínia Napoleão, nº 39, Napoleão — 2º andar",o.jsx("br",{}),"Muriaé, MG"]})]}),o.jsx(m1,{type:"button",onClick:d,"aria-label":el.maps.ariaLabel,children:"Abrir no Maps"})]})})]})]})}),i[7]=C):C=i[7],C}function p1(i){return o.jsxs("tr",{children:[o.jsx(jf,{children:i.day}),o.jsx(jf,{children:i.time}),o.jsx(jf,{children:o.jsx(u1,{children:i.class})})]},i.day)}function g1(){return Dt(el.maps.href)}const y1="/sobre.webp",b1="/sobre.avif",v1=v.section`
  ${jn}
  background-color: ${({theme:i})=>i.colors.background};
`,x1=v.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: ${({theme:i})=>i.spacing["2xl"]};
  }
`,S1=v.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0.85rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${({theme:i})=>i.colors.brand},
      ${({theme:i})=>i.colors.brandLight}
    );

    @media (min-width: 768px) {
      left: 1.5rem;
    }
  }
`,z1=v.div`
  position: relative;
  padding-left: 2.5rem;
  padding-bottom: 20px;

  @media (min-width: 768px) {
    padding-left: 4rem;
    padding-bottom: ${({theme:i})=>i.spacing.xl};
  }

  &:last-child { padding-bottom: 0; }
`,_1=v.div`
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({theme:i})=>i.colors.brand},
    ${({theme:i})=>i.colors.brandLight}
  );
  border: 3px solid ${({theme:i})=>i.colors.background};
  box-shadow: 0 0 0 2px ${({theme:i})=>pl(i.colors.brandLight,.25)},
    0 0 16px -2px ${({theme:i})=>pl(i.colors.brand,.6)};
  z-index: 1;

  @media (min-width: 768px) {
    left: 0.75rem;
    width: 1.5rem;
    height: 1.5rem;
  }
`,A1=v.span`
  display: block;
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-size: ${({theme:i})=>i.typography.size.xl};
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.accent};
  margin-bottom: 2px;

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size["2xl"]};
    margin-bottom: ${({theme:i})=>i.spacing.xs};
  }
`,T1=v.h3`
  margin: 0 0 2px;
  font-size: ${({theme:i})=>i.typography.size.base};
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
  color: ${({theme:i})=>i.colors.text};

  @media (min-width: 768px) {
    margin: 0 0 ${({theme:i})=>i.spacing.xs};
    font-size: ${({theme:i})=>i.typography.size.lg};
  }
`,j1=v.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({theme:i})=>i.colors.textMuted};
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.base};
    line-height: 1.6;
  }
`,M1=v.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 3 / 4;
  border-radius: ${({theme:i})=>i.radius.lg};
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  justify-self: center;

  @media (min-width: 1024px) {
    order: 2;
    max-width: 100%;
    max-height: 560px;
    box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.6);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
`,E1=v.picture`
  display: block;
  width: 100%;
  height: 100%;
`,O1=v.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;function D1(){const i=Tl.c(3);let d;i[0]===Symbol.for("react.memo_cache_sentinel")?(d=o.jsx(Al,{children:o.jsx(De,{title:"A História da Karol",subtitle:"Do primeiro treino à turma feminina: uma trajetória de evolução.",id:"historia-title"})}),i[0]=d):d=i[0];let A;i[1]===Symbol.for("react.memo_cache_sentinel")?(A=o.jsx(S1,{children:Xp.map(U1)}),i[1]=A):A=i[1];let m;return i[2]===Symbol.for("react.memo_cache_sentinel")?(m=o.jsx(v1,{id:"historia","aria-labelledby":"historia-title",children:o.jsxs(It,{children:[d,o.jsxs(x1,{children:[A,o.jsx(Al,{direction:"right",delay:100,children:o.jsx(M1,{children:o.jsxs(E1,{children:[o.jsx("source",{type:"image/avif",srcSet:b1}),o.jsx(O1,{src:y1,alt:"Karol Cascelli — instrutora de Muay Thai",loading:"lazy",width:800,height:1200,decoding:"async"})]})})})]})]})}),i[2]=m):m=i[2],m}function U1(i,d){return o.jsx(Al,{delay:d*150,children:o.jsxs(z1,{children:[o.jsx(_1,{"aria-hidden":!0}),o.jsx(A1,{children:i.year}),o.jsx(T1,{children:i.title}),o.jsx(j1,{children:i.description})]})},i.year)}const H1=v.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: ${({theme:i})=>i.colors.textMuted};
`,N1=v(Jh)`
  flex-shrink: 0;
  color: ${({theme:i,$filled:d})=>d?i.colors.accent:"rgba(255,255,255,0.15)"};
  fill: ${({theme:i,$filled:d})=>d?i.colors.accent:"transparent"};
`;function B1({rating:i,max:d=5,size:A=18,"aria-label":m=`Avaliação: ${i} de ${d} estrelas`}){const T=Math.min(d,Math.max(0,Math.round(i)));return o.jsx(H1,{role:"img","aria-label":m,children:Array.from({length:d},(j,M)=>o.jsx(N1,{size:A,$filled:M<T,"aria-hidden":!0},M))})}const C1=[{id:"1",name:"Sandy",since:"Jan/2025",text:"A Karol é incrível! O acolhimento e a motivação que ela transmite fazem toda a diferença nos treinos. Me sinto segura e encorajada a cada aula.",rating:5},{id:"2",name:"Isadora Malafaia",since:"Jan/2025",text:"A paciência da Karol, o ambiente só para mulheres e a energia das aulas me conquistaram. Melhor decisão que tomei para minha saúde e autoestima!",rating:5},{id:"3",name:"Isabella Macedo",since:"Jan/2025",text:"A atenção e o incentivo da Karol são únicos. Ela realmente se importa com cada aluna e nos faz acreditar no nosso potencial. Recomendo demais!",rating:5}],$1=v.section`
  ${jn}
  background-color: ${({theme:i})=>i.colors.background};
`,q1=v.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({theme:i})=>i.spacing.lg};
  }
`,Y1=v.div`
  position: relative;
  ${Wi}
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 28px 24px;
    gap: 16px;

    &:hover {
      transform: translateY(-4px);
      border-color: ${({theme:i})=>pl(i.colors.brandLight,.35)};
      box-shadow: 0 20px 40px -20px ${({theme:i})=>pl(i.colors.brand,.4)};
    }
  }
`,w1=v.div`
  display: flex;
`,R1=v.p`
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: ${({theme:i})=>i.colors.textMuted};
  flex: 1;

  &::before { content: '\u201C'; }
  &::after  { content: '\u201D'; }

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.sm};
    line-height: 1.7;
  }
`,G1=v.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`,X1=v.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({theme:i})=>i.colors.brand}, ${({theme:i})=>i.colors.brandLight});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  font-size: 0.6875rem;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: ${({theme:i})=>i.typography.size.sm};
  }
`,Q1=v.div`
  display: flex;
  flex-direction: column;
`,Z1=v.span`
  font-weight: ${({theme:i})=>i.typography.weight.semibold};
  color: ${({theme:i})=>i.colors.text};
  font-size: ${({theme:i})=>i.typography.size.sm};

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.base};
  }
`,L1=v.span`
  font-size: 0.6875rem;
  color: ${({theme:i})=>i.colors.textMuted};

  @media (min-width: 768px) {
    font-size: ${({theme:i})=>i.typography.size.sm};
  }
`,V1=v.div`
  text-align: center;
  margin-top: 24px;

  @media (min-width: 768px) {
    margin-top: ${({theme:i})=>i.spacing.xl};
  }
`,K1=v.button`
  ${Mn}
  background-color: ${({theme:i})=>i.colors.accent};
  color: ${({theme:i})=>i.colors.accentText};
  border: none;
  border-radius: ${({theme:i})=>i.radius.md};
  cursor: pointer;
  transition: transform 0.15s, filter 0.15s;
  width: 100%;
  max-width: 280px;

  @media (min-width: 768px) {
    width: auto;
    max-width: none;
    padding: 14px 28px;
    font-size: ${({theme:i})=>i.typography.size.base};
  }

  &:hover { transform: translateY(-2px); filter: brightness(1.08); }
  ${ql("accent")}
`;function J1(i){return i.split(" ").map(d=>d[0]).join("").slice(0,2).toUpperCase()}function k1(){const i=Tl.c(3),d=F1;let A;i[0]===Symbol.for("react.memo_cache_sentinel")?(A=o.jsx(Al,{children:o.jsx(De,{title:"O que elas dizem",subtitle:"Depoimentos reais de alunas que transformaram suas vidas através do Muay Thai.",id:"depoimentos-title"})}),i[0]=A):A=i[0];let m;i[1]===Symbol.for("react.memo_cache_sentinel")?(m=o.jsx(q1,{children:C1.map(W1)}),i[1]=m):m=i[1];let T;return i[2]===Symbol.for("react.memo_cache_sentinel")?(T=o.jsx($1,{id:"depoimentos","aria-labelledby":"depoimentos-title",children:o.jsxs(It,{children:[A,m,o.jsx(Al,{children:o.jsx(V1,{children:o.jsxs(K1,{type:"button",onClick:d,"aria-label":"Quero fazer parte — agendar pelo WhatsApp",children:[o.jsx(Za,{size:18}),"Quero fazer parte"]})})})]})}),i[2]=T):T=i[2],T}function W1(i,d){return o.jsx(Al,{delay:d*120,children:o.jsxs(Y1,{children:[o.jsx(w1,{children:o.jsx(B1,{rating:i.rating,size:16,"aria-label":`${i.rating} estrelas`})}),o.jsx(R1,{children:i.text}),o.jsxs(G1,{children:[o.jsx(X1,{"aria-hidden":!0,children:J1(i.name)}),o.jsxs(Q1,{children:[o.jsx(Z1,{children:i.name}),i.since&&o.jsxs(L1,{children:["Desde ",i.since]})]})]})]})},i.id)}function F1(){return Dt(el.whatsapp.href)}const I1="modulepreload",P1=function(i){return"/"+i},Jd={},l2=function(d,A,m){let T=Promise.resolve();if(A&&A.length>0){let D=function(C){return Promise.all(C.map(R=>Promise.resolve(R).then(H=>({status:"fulfilled",value:H}),H=>({status:"rejected",reason:H}))))};document.getElementsByTagName("link");const M=document.querySelector("meta[property=csp-nonce]"),E=M?.nonce||M?.getAttribute("nonce");T=D(A.map(C=>{if(C=P1(C),C in Jd)return;Jd[C]=!0;const R=C.endsWith(".css"),H=R?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${C}"]${H}`))return;const G=document.createElement("link");if(G.rel=R?"stylesheet":I1,R||(G.as="script"),G.crossOrigin="",G.href=C,E&&G.setAttribute("nonce",E),document.head.appendChild(G),R)return new Promise((bl,ol)=>{G.addEventListener("load",bl),G.addEventListener("error",()=>ol(new Error(`Unable to preload CSS for ${C}`)))})}))}function j(M){const E=new Event("vite:preloadError",{cancelable:!0});if(E.payload=M,window.dispatchEvent(E),!E.defaultPrevented)throw M}return T.then(M=>{for(const E of M||[])E.status==="rejected"&&j(E.reason);return d().catch(j)})},t2="/assets/WhatsApp%20Image%202026-02-28%20at%2017.38.24-CES2yu0Z.webp",a2=Object.freeze(Object.defineProperty({__proto__:null,default:t2},Symbol.toStringTag,{value:"Module"})),e2="/assets/WhatsApp%20Image%202026-02-28%20at%2017.38.25%20(1)-B9eGw5Te.webp",n2=Object.freeze(Object.defineProperty({__proto__:null,default:e2},Symbol.toStringTag,{value:"Module"})),i2="/assets/WhatsApp%20Image%202026-02-28%20at%2017.38.25-CvFaeJst.webp",u2=Object.freeze(Object.defineProperty({__proto__:null,default:i2},Symbol.toStringTag,{value:"Module"})),c2="/assets/WhatsApp%20Image%202026-02-28%20at%2017.38.26%20(1)-BH5fJbWq.webp",f2=Object.freeze(Object.defineProperty({__proto__:null,default:c2},Symbol.toStringTag,{value:"Module"})),o2="/assets/WhatsApp%20Image%202026-02-28%20at%2017.38.26-DuRjlYJ4.webp",s2=Object.freeze(Object.defineProperty({__proto__:null,default:o2},Symbol.toStringTag,{value:"Module"})),r2="/assets/WhatsApp%20Image%202026-02-28%20at%2017.38.27%20(1)-CbVdXhJ1.webp",d2=Object.freeze(Object.defineProperty({__proto__:null,default:r2},Symbol.toStringTag,{value:"Module"})),m2="/assets/WhatsApp%20Image%202026-02-28%20at%2017.38.27-Cr4OzrLq.webp",h2=Object.freeze(Object.defineProperty({__proto__:null,default:m2},Symbol.toStringTag,{value:"Module"})),p2="/assets/WhatsApp%20Image%202026-03-13%20at%2014.07.03-BtfCZSF2.webp",g2=Object.freeze(Object.defineProperty({__proto__:null,default:p2},Symbol.toStringTag,{value:"Module"})),y2="/assets/WhatsApp%20Image%202026-03-13%20at%2014.07.04-DZwcoMOv.webp",b2=Object.freeze(Object.defineProperty({__proto__:null,default:y2},Symbol.toStringTag,{value:"Module"})),v2=Object.assign({"../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.24.webp":a2,"../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.25 (1).webp":n2,"../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.25.webp":u2,"../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.26 (1).webp":f2,"../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.26.webp":s2,"../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.27 (1).webp":d2,"../assets/gallery/WhatsApp Image 2026-02-28 at 17.38.27.webp":h2,"../assets/gallery/WhatsApp Image 2026-03-13 at 14.07.03.webp":g2,"../assets/gallery/WhatsApp Image 2026-03-13 at 14.07.04.webp":b2,"../assets/gallery/turma-feminina.webp":t1}),kd=Object.entries(v2).sort(([i],[d])=>i.localeCompare(d,void 0,{numeric:!0})).map(([,i],d)=>({id:String(d+1),src:i.default,alt:`Foto ${d+1} — treino de Muay Thai na Team Link`,category:"treino"})),u0=()=>l2(()=>import("./LightboxModal-PBCwqIhk.js"),__vite__mapDeps([0,1,2,3])).then(i=>({default:i.LightboxModal})),x2=_t.lazy(u0),S2=v.section`
  padding: 40px 16px;
  background-color: ${({theme:i})=>i.colors.background};

  @media (min-width: 768px) {
    padding: ${({theme:i})=>i.spacing.xl} ${({theme:i})=>i.spacing.md};
  }
`,z2=v.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({theme:i})=>i.spacing.md};
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({theme:i})=>i.spacing.lg};
  }
`,_2=v.li``,ki=v.button`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({theme:i})=>i.colors.background};
  border: 1px solid ${({theme:i})=>i.colors.border};
  padding: 0;
  cursor: pointer;
  position: relative;

  @media (min-width: 768px) {
    aspect-ratio: 4/3;
    border-radius: ${({theme:i})=>i.radius.lg};
  }

  ${ql("brand")}
`,A2=v.span`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
`,T2=v.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  @media (prefers-reduced-motion: reduce) { transition: none; }
  ${ki}:hover & { transform: scale(1.07); }
  @media (prefers-reduced-motion: reduce) {
    ${ki}:hover & { transform: none; }
  }
`,j2=v.span`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.55) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:i})=>i.colors.text};
  opacity: 0;
  transition: opacity 0.25s;
  @media (prefers-reduced-motion: reduce) { transition: none; }
  ${ki}:hover & { opacity: 1; }

  svg {
    background: rgba(10, 10, 10, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    padding: 8px;
    width: 36px;
    height: 36px;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
`;function M2(){const i=Tl.c(7),[d,A]=_t.useState(-1),m=_t.useRef(!1);let T;i[0]===Symbol.for("react.memo_cache_sentinel")?(T=()=>{m.current||(m.current=!0,u0())},i[0]=T):T=i[0];const j=T;let M;i[1]===Symbol.for("react.memo_cache_sentinel")?(M=o.jsx(Al,{children:o.jsx(De,{title:"Galeria",subtitle:"Momentos da nossa turma no tatame.",id:"gallery-heading"})}),i[1]=M):M=i[1];let E;i[2]===Symbol.for("react.memo_cache_sentinel")?(E=o.jsxs(It,{children:[M,o.jsx(Al,{children:o.jsx(z2,{children:kd.map((R,H)=>o.jsx(_2,{children:o.jsx(ki,{type:"button","aria-label":`Abrir foto: ${R.alt}`,onClick:()=>A(H),onPointerEnter:j,onFocus:j,onTouchStart:j,children:o.jsxs(A2,{children:[o.jsx(T2,{src:R.src,alt:R.alt,loading:"lazy",decoding:"async",width:400,height:400}),o.jsx(j2,{"aria-hidden":!0,children:o.jsx(kh,{strokeWidth:2})})]})})},R.id))})})]}),i[2]=E):E=i[2];let D;i[3]!==d?(D=d>=0&&o.jsx(_t.Suspense,{fallback:null,children:o.jsx(x2,{index:d,allItems:kd,onClose:()=>A(-1)})}),i[3]=d,i[4]=D):D=i[4];let C;return i[5]!==D?(C=o.jsxs(S2,{id:"galeria","aria-labelledby":"gallery-heading",children:[E,D]}),i[5]=D,i[6]=C):C=i[6],C}const E2=v.section`
  position: relative;
  padding: 48px 16px;
  background-color: ${({theme:i})=>i.colors.background};
  text-align: center;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 80px ${({theme:i})=>i.spacing.md};
  }

  @media (min-width: 1024px) {
    padding: 96px ${({theme:i})=>i.spacing.md};

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 720px;
      height: 360px;
      border-radius: 50%;
      background: radial-gradient(
        ellipse at center,
        ${({theme:i})=>pl(i.colors.accent,.08)} 0%,
        ${({theme:i})=>pl(i.colors.brand,.05)} 50%,
        rgba(0, 0, 0, 0) 70%
      );
      filter: blur(24px);
      pointer-events: none;
      z-index: 0;
    }
  }

  > * {
    position: relative;
    z-index: 1;
  }
`,O2=v.h2`
  margin: 0 0 8px;
  font-family: ${({theme:i})=>i.typography.fontHeading};
  font-size: clamp(1.375rem, 5vw, 2.75rem);
  font-weight: ${({theme:i})=>i.typography.weight.bold};
  color: ${({theme:i})=>i.colors.text};
  letter-spacing: -0.02em;
  line-height: 1.15;

  @media (min-width: 768px) {
    margin-bottom: ${({theme:i})=>i.spacing.md};
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`,D2=v.p`
  margin: 0 0 24px;
  font-size: 0.8125rem;
  color: ${({theme:i})=>i.colors.textMuted};

  @media (min-width: 768px) {
    margin-bottom: ${({theme:i})=>i.spacing.xl};
    font-size: ${({theme:i})=>i.typography.size.base};
  }
`,U2=v.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${({theme:i})=>i.spacing.md};
  }
`,H2=v.button`
  ${Mn}
  background-color: ${({theme:i})=>i.colors.accent};
  color: ${({theme:i})=>i.colors.accentText};
  border: none;
  border-radius: ${({theme:i})=>i.radius.full};
  cursor: pointer;
  box-shadow: 0 6px 24px ${({theme:i})=>pl(i.colors.accent,.2)};
  transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.25s ease;

  ${Ii}

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    box-shadow: 0 12px 32px ${({theme:i})=>pl(i.colors.accent,.36)};
  }
  ${ql("accent")}
`,Wd=v.button`
  ${Mn}
  background: transparent;
  color: ${({theme:i})=>i.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({theme:i})=>i.radius.full};
  cursor: pointer;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s;

  ${Ii}

  &:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.35); transform: translateY(-2px); }
  ${ql("text")}
`;function N2(){const i=Tl.c(5),d=$2,A=C2,m=B2;let T;i[0]===Symbol.for("react.memo_cache_sentinel")?(T=o.jsx(Al,{children:o.jsx(O2,{id:"cta-final-heading",children:"Pronta para seu primeiro round?"})}),i[0]=T):T=i[0];let j;i[1]===Symbol.for("react.memo_cache_sentinel")?(j=o.jsx(Al,{delay:80,children:o.jsx(D2,{children:"Comece sua jornada hoje. Primeira aula de Muay Thai por nossa conta."})}),i[1]=j):j=i[1];let M;i[2]===Symbol.for("react.memo_cache_sentinel")?(M=o.jsxs(H2,{type:"button",onClick:d,"aria-label":"Agendar aula experimental gratuita de Muay Thai pelo WhatsApp",children:[o.jsx(Za,{size:18}),"Agendar aula grátis de Muay Thai"]}),i[2]=M):M=i[2];let E;i[3]===Symbol.for("react.memo_cache_sentinel")?(E=o.jsxs(Wd,{type:"button",onClick:A,"aria-label":"Seguir no Instagram",children:[o.jsx(Ef,{size:18,strokeWidth:2,"aria-hidden":!0}),"Seguir no Instagram"]}),i[3]=E):E=i[3];let D;return i[4]===Symbol.for("react.memo_cache_sentinel")?(D=o.jsx(E2,{"aria-labelledby":"cta-final-heading",children:o.jsxs(It,{children:[T,j,o.jsx(Al,{delay:160,children:o.jsxs(U2,{children:[M,E,o.jsxs(Wd,{type:"button",onClick:m,"aria-label":"Seguir no TikTok",children:[o.jsx(Of,{size:18,strokeWidth:2}),"Seguir no TikTok"]})]})})]})}),i[4]=D):D=i[4],D}function B2(){return Dt(el.tiktok.href)}function C2(){return Dt(el.instagram.href)}function $2(){return Dt(el.whatsapp.href)}function q2(){const i=Tl.c(1);let d;return i[0]===Symbol.for("react.memo_cache_sentinel")?(d=o.jsxs(o.Fragment,{children:[o.jsx(dg,{}),o.jsx(Hg,{}),o.jsx(kg,{}),o.jsx(k1,{}),o.jsx(h1,{}),o.jsx(D1,{}),o.jsx(M2,{}),o.jsx(N2,{})]}),i[0]=d):d=i[0],d}function Y2(){const i=Tl.c(1);let d;return i[0]===Symbol.for("react.memo_cache_sentinel")?(d=o.jsx(Yp,{children:o.jsx(q2,{})}),i[0]=d):d=i[0],d}const w2={colors:{brand:"#A1122B",brandLight:"#C7375F",accent:"#B4FF50",accentText:"#0a0a0a",background:"#0a0a0a",surfaceElevated:"rgba(255,255,255,0.05)",border:"rgba(255,255,255,0.1)",text:"#f5f5f5",textMuted:"rgba(245,245,245,0.6)",overlay:"rgba(0, 0, 0, 0.6)",whatsapp:"#25D366",whatsappHover:"#20bd5a"},radius:{sm:"6px",md:"8px",lg:"12px",full:"9999px"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px","2xl":"48px"},typography:{fontHeading:"'Sora', system-ui, sans-serif",fontFamily:"'Inter', system-ui, sans-serif",size:{sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem"},weight:{normal:400,medium:500,semibold:600,bold:700}},zIndex:{cta:40,navbar:50,overlay:60,drawer:61},layout:{navbarHeight:"3.5rem"}},R2=Yh`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    margin: 0;
    background-color: ${({theme:i})=>i.colors.background};
    color: ${({theme:i})=>i.colors.text};
    font-family: ${({theme:i})=>i.typography.fontFamily};
    font-size: ${({theme:i})=>i.typography.size.base};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({theme:i})=>i.typography.fontHeading};
  }

  img, video {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;lp.createRoot(document.getElementById("app")).render(o.jsx(_t.StrictMode,{children:o.jsxs(wh,{theme:w2,children:[o.jsx(R2,{}),o.jsx(Y2,{})]})}));export{pl as a,Tl as c};
