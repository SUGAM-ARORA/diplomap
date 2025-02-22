import{s as W,d as V,e as _,u as w,g as D,f as F,h as q,j as k}from"./C7ClkcwI.js";import{S as G,i as H,m as J,n as v,o as K,a as L,d as g,p as b,g as S,h as M,l as z,k as j,q as O,r as Q,u as R,v as T,w as U}from"./Z2MeKKqP.js";import{e as E,g as B,a as X}from"./DLd0XH4X.js";/**
 * @license lucide-svelte v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function A(i,e,n){const l=i.slice();return l[10]=e[n][0],l[11]=e[n][1],l}function N(i){let e,n=[i[11]],l={};for(let t=0;t<n.length;t+=1)l=_(l,n[t]);return{c(){e=J(i[10]),this.h()},l(t){e=K(t,i[10],{}),L(e).forEach(g),this.h()},h(){b(e,l)},m(t,s){S(t,e,s)},p(t,s){b(e,l=B(n,[s&32&&t[11]]))},d(t){t&&g(e)}}}function P(i){let e=i[10],n,l=i[10]&&N(i);return{c(){l&&l.c(),n=v()},l(t){l&&l.l(t),n=v()},m(t,s){l&&l.m(t,s),S(t,n,s)},p(t,s){t[10]?e?W(e,t[10])?(l.d(1),l=N(t),e=t[10],l.c(),l.m(n.parentNode,n)):l.p(t,s):(l=N(t),e=t[10],l.c(),l.m(n.parentNode,n)):e&&(l.d(1),l=null,e=t[10])},d(t){t&&g(n),l&&l.d(t)}}}function Y(i){let e,n,l,t,s,u=E(i[5]),r=[];for(let o=0;o<u.length;o+=1)r[o]=P(A(i,u,o));const m=i[9].default,c=V(m,i,i[8],null);let d=[I,i[6],{width:i[2]},{height:i[2]},{stroke:i[1]},{"stroke-width":l=i[4]?Number(i[3])*24/Number(i[2]):i[3]},{class:t=`lucide-icon lucide lucide-${i[0]} ${i[7].class??""}`}],h={};for(let o=0;o<d.length;o+=1)h=_(h,d[o]);return{c(){e=J("svg");for(let o=0;o<r.length;o+=1)r[o].c();n=v(),c&&c.c(),this.h()},l(o){e=K(o,"svg",{width:!0,height:!0,stroke:!0,"stroke-width":!0,class:!0});var a=L(e);for(let f=0;f<r.length;f+=1)r[f].l(a);n=v(),c&&c.l(a),a.forEach(g),this.h()},h(){b(e,h)},m(o,a){S(o,e,a);for(let f=0;f<r.length;f+=1)r[f]&&r[f].m(e,null);M(e,n),c&&c.m(e,null),s=!0},p(o,[a]){if(a&32){u=E(o[5]);let f;for(f=0;f<u.length;f+=1){const C=A(o,u,f);r[f]?r[f].p(C,a):(r[f]=P(C),r[f].c(),r[f].m(e,n))}for(;f<r.length;f+=1)r[f].d(1);r.length=u.length}c&&c.p&&(!s||a&256)&&w(c,m,o,o[8],s?F(m,o[8],a,null):D(o[8]),null),b(e,h=B(d,[I,a&64&&o[6],(!s||a&4)&&{width:o[2]},(!s||a&4)&&{height:o[2]},(!s||a&2)&&{stroke:o[1]},(!s||a&28&&l!==(l=o[4]?Number(o[3])*24/Number(o[2]):o[3]))&&{"stroke-width":l},(!s||a&129&&t!==(t=`lucide-icon lucide lucide-${o[0]} ${o[7].class??""}`))&&{class:t}]))},i(o){s||(z(c,o),s=!0)},o(o){j(c,o),s=!1},d(o){o&&g(e),O(r,o),c&&c.d(o)}}}function Z(i,e,n){const l=["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"];let t=q(e,l),{$$slots:s={},$$scope:u}=e,{name:r}=e,{color:m="currentColor"}=e,{size:c=24}=e,{strokeWidth:d=2}=e,{absoluteStrokeWidth:h=!1}=e,{iconNode:o}=e;return i.$$set=a=>{n(7,e=_(_({},e),k(a))),n(6,t=q(e,l)),"name"in a&&n(0,r=a.name),"color"in a&&n(1,m=a.color),"size"in a&&n(2,c=a.size),"strokeWidth"in a&&n(3,d=a.strokeWidth),"absoluteStrokeWidth"in a&&n(4,h=a.absoluteStrokeWidth),"iconNode"in a&&n(5,o=a.iconNode),"$$scope"in a&&n(8,u=a.$$scope)},e=k(e),[r,m,c,d,h,o,t,e,u,s]}class y extends G{constructor(e){super(),H(this,e,Z,Y,W,{name:0,color:1,size:2,strokeWidth:3,absoluteStrokeWidth:4,iconNode:5})}}function p(i){let e;const n=i[2].default,l=V(n,i,i[3],null);return{c(){l&&l.c()},l(t){l&&l.l(t)},m(t,s){l&&l.m(t,s),e=!0},p(t,s){l&&l.p&&(!e||s&8)&&w(l,n,t,t[3],e?F(n,t[3],s,null):D(t[3]),null)},i(t){e||(z(l,t),e=!0)},o(t){j(l,t),e=!1},d(t){l&&l.d(t)}}}function x(i){let e,n;const l=[{name:"bookmark"},i[1],{iconNode:i[0]}];let t={$$slots:{default:[p]},$$scope:{ctx:i}};for(let s=0;s<l.length;s+=1)t=_(t,l[s]);return e=new y({props:t}),{c(){Q(e.$$.fragment)},l(s){R(e.$$.fragment,s)},m(s,u){T(e,s,u),n=!0},p(s,[u]){const r=u&3?B(l,[l[0],u&2&&X(s[1]),u&1&&{iconNode:s[0]}]):{};u&8&&(r.$$scope={dirty:u,ctx:s}),e.$set(r)},i(s){n||(z(e.$$.fragment,s),n=!0)},o(s){j(e.$$.fragment,s),n=!1},d(s){U(e,s)}}}function $(i,e,n){let{$$slots:l={},$$scope:t}=e;const s=[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"}]];return i.$$set=u=>{n(1,e=_(_({},e),k(u))),"$$scope"in u&&n(3,t=u.$$scope)},e=k(e),[s,e,l,t]}class se extends G{constructor(e){super(),H(this,e,$,x,W,{})}}export{se as B,y as I};
