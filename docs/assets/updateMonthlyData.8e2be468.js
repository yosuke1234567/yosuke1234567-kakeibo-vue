import{c as y,a as i,b as m,d as b,R as v,j as u,k as d,F as f,aV as w,l as _,P as p,J as x,aJ as S}from"./index.f2e67699.js";const R=y({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:n}){const t=i(()=>parseInt(e.lines,10)),l=i(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(t.value===1?" ellipsis":"")),r=i(()=>e.lines!==void 0&&t.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":t.value}:null);return()=>m("div",{style:r.value,class:l.value},b(n.default))}}),M=async e=>{const n=v(d,u.currentUser.uid),t=[],l=f(n,w("expenseMonthIndex","==",e));return(await _(l)).forEach(a=>t.push(a.data())),t.sort((a,o)=>a.date>o.date?1:a.date<o.date?-1:0),console.log(t),t},k=async e=>{const n=await M(e),t=p(d,u.currentUser.uid,"data"),r=(await x(t)).data().category,a=[];r.forEach(s=>a.push({amount:0,category:s.type})),console.log(n);for(let s=0;s<n.length;s++)for(let c=0;c<a.length;c++)n[s].category===a[c].category&&(a[c].amount+=n[s].amount);const o=new Date(e).getFullYear(),h=(new Date(e).getMonth()+1).toString().padStart(2,"0"),g=p(d,u.currentUser.uid,`stats-${o}-${h}`);await S(g,{expense:a,statsMonth:`${o}-${h}`})};export{R as Q,M as g,k as u};
