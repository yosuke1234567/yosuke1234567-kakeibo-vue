import{c as H,al as J,am as W,a as N,b as V,Q as X,ao as aa,f as Y,r as i,o as P,G as ea,m,B as C,M as ta,R as la,j as A,k as T,F as sa,U as oa,l as na,n as w,s as b,q as s,w as r,aY as k,v as D,C as g,$ as y,aZ as ua,x as ca,y as ra,z as da,A as ia,a_ as va,a$ as fa,aF as _a,aE as F,P as ma,D as ga}from"./index.34462af0.js";import{Q as x}from"./QCard.b4d8be98.js";import{g as R,u as ha,Q as U}from"./updateMonthlyData.f0ecbd0c.js";import{Q as ba,j,k as pa}from"./QCardActions.2d635e90.js";import{C as M,p as ya,a as Sa,b as wa,B as Ca,c as ka,L as Da,d as xa,g as Q,_ as Ba}from"./getDoughnutValue.09353aee.js";const $a=H({name:"QAvatar",props:{...J,fontSize:String,color:String,textColor:String,icon:String,square:Boolean,rounded:Boolean},setup(l,{slots:t}){const d=W(l),v=N(()=>"q-avatar"+(l.color?` bg-${l.color}`:"")+(l.textColor?` text-${l.textColor} q-chip--colored`:"")+(l.square===!0?" q-avatar--square":l.rounded===!0?" rounded-borders":"")),f=N(()=>l.fontSize?{fontSize:l.fontSize}:null);return()=>{const u=l.icon!==void 0?[V(X,{name:l.icon})]:void 0;return V("div",{class:v.value,style:d.value},[V("div",{class:"q-avatar__content row flex-center overflow-hidden",style:f.value},aa(t.default,u))])}}}),qa=Y({__name:"BarChart",props:{chartValue:null,labels:null,bg:null,setMonth:null},setup(l){const t=l;M.register(ya,Sa,wa,Ca,ka,Da),M.defaults.font.family="'Asap', 'Zen Maru Gothic', sans-serif",M.defaults.aspectRatio=1.333;const d=i({labels:[],datasets:[]}),v=()=>{d.value.datasets[0].data=t.chartValue,d.value.datasets[0].backgroundColor=t.bg};P(()=>{d.value={labels:t.labels,datasets:[{borderColor:"#f5f2eb",borderRadius:8,backgroundColor:t.bg,data:t.chartValue}]}}),ea(t,v);const f={scales:{x:{grid:{color:"transparent"}},y:{ticks:{maxTicksLimit:6}}},plugins:{legend:{display:!1}},layout:{padding:20},onClick(u,c,o){console.log(u,c,o),t.setMonth(c[0].index)}};return(u,c)=>(m(),C(ta(xa),{"chart-data":d.value,"chart-options":f},null,8,["chart-data"]))}}),z=async l=>{const t=la(T,A.currentUser.uid),d=sa(t,oa("statsMonth")),v=await na(d),f=[];v.forEach(o=>f.push(o.data())),console.log(f);const u=[];for(let o=0;o<6;o++)for(let n=0;n<f.length;n++)if(l[o]===f[n].statsMonth){u[o]=f[n].expense;break}else u[o]=[{amount:0}];console.log(u);const c=[];for(let o=0;o<6;o++){let n=0;for(let h=0;h<u[o].length;h++)n+=u[o][h].amount;c.push(n)}return console.log(c),c},E=l=>(da("data-v-bdad8457"),l=l(),ia(),l),Va={class:"u-inner"},Fa=E(()=>b("h2",null,"\u7D71\u8A08",-1)),Ma={class:"chart-wrap"},Qa={class:"amount-area"},za={key:0},Aa={key:0},Ea={class:"pagination"},Ia={key:0,class:"detail-wrap"},La={class:"detail-title"},Na=E(()=>b("img",{src:va,alt:"",draggable:"false"},null,-1)),Ra=E(()=>b("div",null,"\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F",-1)),Ua=Y({__name:"Stats",setup(l){const t=i([]),d=new Date,v=i(d.getMonth()+1),f=()=>{for(let e=0;e<6;e++)if(v.value-e>0)if(v.value-e<13){const a=(v.value-e).toString().padStart(2,"0");t.value.unshift(`${d.getFullYear()}-${a}`)}else{const a=(v.value-e-12).toString().padStart(2,"0");t.value.unshift(`${d.getFullYear()+1}-${a}`)}else{const a=(12-(e-v.value)).toString().padStart(2,"0");t.value.unshift(`${d.getFullYear()-1}-${a}`)}console.log(t.value)},u=i([]),c=i([]),o=i(["#ddd0bb","#ddd0bb","#ddd0bb","#ddd0bb","#ddd0bb","#fdd835"]),n=i(`${d.getFullYear()}-${d.getMonth()+1}`),h=i(5),p=i(),B=i(0),G=async e=>{n.value!==t.value[e]&&(q.value=!1),h.value=e,n.value=t.value[e],p.value=c.value[e],B.value=0;for(let a=0;a<6;a++)o.value[a]=a==e?"#fdd835":"#ddd0bb";u.value=await Q(n.value)},$=i([]),q=i(!1),S=i(!1),I=i();P(async()=>{A.currentUser&&(f(),c.value=await z(t.value),u.value=await Q(n.value),p.value=c.value[5])});const L=async e=>{v.value=v.value+e,t.value.splice(0),f(),B.value+=e>0?1:-1;for(let a=0;a<6;a++)B.value==0?o.value[a]=a==h.value?"#fdd835":"#ddd0bb":o.value[a]="#ddd0bb";c.value=await z(t.value)},Z=async()=>{const e=new Date(n.value).getTime();$.value=await R(e),q.value=!0},K=e=>{I.value=ma(T,A.currentUser.uid,`expense-${e}`),S.value=!0},O=async()=>{const e=new Date(n.value).getTime();await fa(I.value),await ha(e),$.value=await R(e),c.value=await z(t.value),u.value=await Q(n.value),p.value=c.value[h.value],S.value=!1};return(e,a)=>(m(),w("div",Va,[Fa,b("div",Ma,[s(x,{class:"q-py-md q-mb-lg radius-8"},{default:r(()=>[b("div",Qa,[D(g(n.value.slice(0,4))+"\u5E74 "+g(new Date(n.value).getMonth()+1)+"\u6708 ",1),p.value||p.value==0?(m(),w("span",za,"\uFFE5"+g(p.value.toLocaleString()),1)):k("",!0)]),c.value.length?(m(),w("div",Aa,[s(qa,{"chart-value":c.value,labels:t.value,bg:o.value,"set-month":G},null,8,["chart-value","labels","bg"]),b("div",Ea,[s(y,{onClick:a[0]||(a[0]=_=>L(-6)),icon:"sym_r_navigate_before",size:"md",flat:"",round:"",class:"q-mr-sm"}),s(y,{onClick:a[1]||(a[1]=_=>L(6)),icon:"sym_r_navigate_next",size:"md",flat:"",round:""})])])):k("",!0)]),_:1}),u.value.length?(m(),C(x,{key:0,class:"radius-8"},{default:r(()=>[s(Ba,{"chart-value":u.value},null,8,["chart-value"])]),_:1})):k("",!0)]),u.value.length?(m(),w("div",Ia,[q.value?(m(),C(x,{key:0,transition:"fade",class:"full-width"},{default:r(()=>[b("div",La,g(n.value.slice(0,4))+"\u5E74 "+g(new Date(n.value).getMonth()+1)+"\u6708 ",1),s(j,{class:"q-py-sm"},{default:r(()=>[s(ua,{separator:""},{default:r(()=>[(m(!0),w(ca,null,ra($.value,_=>(m(),C(_a,{class:"q-pa-md"},{default:r(()=>[s(F,{avatar:"",class:"q-pr-lg"},{default:r(()=>[s($a,{color:"primary","text-color":"white",size:"md",rounded:""},{default:r(()=>[D(g(_.date.slice(8)),1)]),_:2},1024)]),_:2},1024),s(F,null,{default:r(()=>[s(U,null,{default:r(()=>[D("\uFFE5"+g(_.amount.toLocaleString())+" - "+g(_.category),1)]),_:2},1024),s(U,{caption:""},{default:r(()=>[D(g(_.memo),1)]),_:2},1024)]),_:2},1024),s(F,{side:""},{default:r(()=>[s(y,{onClick:ja=>K(_.createdAt),icon:"sym_r_delete",size:"md",flat:"",round:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),256))]),_:1}),s(ba,{modelValue:S.value,"onUpdate:modelValue":a[3]||(a[3]=_=>S.value=_)},{default:r(()=>[s(x,{class:"dialog-card"},{default:r(()=>[s(j,{class:"dialog-section"},{default:r(()=>[Na,Ra]),_:1}),s(pa,{class:"justify-end"},{default:r(()=>[s(y,{label:"\u30AD\u30E3\u30F3\u30BB\u30EB",onClick:a[2]||(a[2]=_=>S.value=!1),class:"col"}),s(y,{label:"OK",onClick:O,color:"secondary","text-color":"initial",class:"col"})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})):(m(),C(y,{key:1,onClick:Z,label:"\u8A73\u7D30\u3092\u8868\u793A",color:"secondary","text-color":"initial",padding:"10px 32px",class:"block q-mx-auto q-mt-sm"}))])):k("",!0)]))}});const Ka=ga(Ua,[["__scopeId","data-v-bdad8457"]]);export{Ka as default};
