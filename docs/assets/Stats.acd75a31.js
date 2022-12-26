import{c as H,ak as J,al as aa,a as U,b as F,Q as ea,an as ta,f as T,r as d,o as Z,E as la,s as g,B as C,L as sa,R as oa,j as I,k as G,F as na,U as ua,l as ca,m as w,q as p,n as s,w as c,aW as D,v as x,C as h,Z as S,aX as ra,x as da,y as ia,z as va,A as fa,aY as ma,aD as _a,aC as M,P as ga,_ as ha}from"./index.387e141f.js";import{Q as B}from"./QCard.015e789d.js";import{u as ba,g as j,Q as Y}from"./updateMonthlyData.a686b68d.js";import{Q as pa,j as P,k as ya}from"./QCardActions.a521c7d4.js";import{C as z,p as Sa,a as ka,b as wa,B as Ca,c as Da,L as xa,d as Ba,g as A,_ as qa}from"./getDoughnutValue.5507af23.js";const Va=H({name:"QAvatar",props:{...J,fontSize:String,color:String,textColor:String,icon:String,square:Boolean,rounded:Boolean},setup(l,{slots:t}){const r=aa(l),i=U(()=>"q-avatar"+(l.color?` bg-${l.color}`:"")+(l.textColor?` text-${l.textColor} q-chip--colored`:"")+(l.square===!0?" q-avatar--square":l.rounded===!0?" rounded-borders":"")),v=U(()=>l.fontSize?{fontSize:l.fontSize}:null);return()=>{const n=l.icon!==void 0?[F(ea,{name:l.icon})]:void 0;return F("div",{class:i.value,style:r.value},[F("div",{class:"q-avatar__content row flex-center overflow-hidden",style:v.value},ta(t.default,n))])}}}),$a="/yosuke1234567-kakeibo-vue/assets/honey.22310c83.png",Qa=T({__name:"BarChart",props:{chartValue:null,labels:null,bg:null,setMonth:null},setup(l){const t=l;z.register(Sa,ka,wa,Ca,Da,xa),z.defaults.font.family="'Asap', 'Zen Maru Gothic', sans-serif",z.defaults.aspectRatio=1.333;const r=d({labels:[],datasets:[]}),i=()=>{r.value.datasets[0].data=t.chartValue,r.value.datasets[0].backgroundColor=t.bg};Z(()=>{r.value={labels:t.labels,datasets:[{borderColor:"#f5f2eb",borderRadius:8,backgroundColor:t.bg,data:t.chartValue}]}}),la(t,i);const v={scales:{x:{grid:{color:"transparent"}},y:{ticks:{maxTicksLimit:6}}},plugins:{legend:{display:!1}},layout:{padding:20},onClick(n,f,o){console.log(n,f,o),t.setMonth(f[0].index)}};return(n,f)=>(g(),C(sa(Ba),{"chart-data":r.value,"chart-options":v},null,8,["chart-data"]))}}),E=async l=>{const t=oa(G,I.currentUser.uid),r=na(t,ua("statsMonth")),i=await ca(r),v=[];i.forEach(o=>v.push(o.data())),console.log(v);const n=[];for(let o=0;o<6;o++)for(let u=0;u<v.length;u++)if(l[o]===v[u].statsMonth){n[o]=v[u].expense;break}else n[o]=[{amount:0}];console.log(n);const f=[];for(let o=0;o<6;o++){let u=0;for(let b=0;b<n[o].length;b++)u+=n[o][b].amount;f.push(u)}return console.log(f),f},L=l=>(va("data-v-e3391b93"),l=l(),fa(),l),Fa={class:"u-inner"},Ma=L(()=>p("h2",null,"\u7D71\u8A08",-1)),za={class:"chart-wrap"},Aa={class:"amount-area"},Ea={key:0},Ia={key:0},La={class:"pagination"},Na={key:0,class:"detail-wrap"},Ra={class:"detail-title"},Ua=L(()=>p("img",{src:$a,alt:"",draggable:"false"},null,-1)),ja=L(()=>p("div",null,"\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F",-1)),Ya=T({__name:"Stats",setup(l){const t=d([]),r=new Date,i=d(r.getMonth()+1),v=()=>{for(let e=0;e<6;e++)if(i.value-e>0)if(i.value-e<13){const a=(i.value-e).toString().padStart(2,"0");t.value.unshift(`${r.getFullYear()}-${a}`)}else{const a=(i.value-e-12).toString().padStart(2,"0");t.value.unshift(`${r.getFullYear()+1}-${a}`)}else{const a=(12-(e-i.value)).toString().padStart(2,"0");t.value.unshift(`${r.getFullYear()-1}-${a}`)}console.log(t.value)},n=d([]),f=d(),o=()=>{let e=0;for(let a=0;a<n.value.length;a++)e+=n.value[a];f.value=e},u=d([]),b=d(["#ddd0bb","#ddd0bb","#ddd0bb","#ddd0bb","#ddd0bb","#fdd835"]),m=d(`${r.getFullYear()}-${r.getMonth()+1}`),q=d(5),y=d(),V=d(0),K=async e=>{m.value!==t.value[e]&&(Q.value=!1),q.value=e,m.value=t.value[e],y.value=u.value[e],V.value=0;for(let a=0;a<6;a++)b.value[a]=a==e?"#fdd835":"#ddd0bb";n.value=await A(m.value),o()},$=d([]),Q=d(!1),k=d(!1),N=d();Z(async()=>{I.currentUser&&(v(),u.value=await E(t.value),n.value=await A(m.value),y.value=u.value[5],o())});const R=async e=>{i.value=i.value+e,t.value.splice(0),v(),V.value+=e>0?1:-1;for(let a=0;a<6;a++)V.value==0?b.value[a]=a==q.value?"#fdd835":"#ddd0bb":b.value[a]="#ddd0bb";u.value=await E(t.value)},O=async()=>{const e=new Date(m.value).getTime();$.value=await j(e),Q.value=!0},W=e=>{N.value=ga(G,I.currentUser.uid,`expense-${e}`),k.value=!0},X=async()=>{const e=new Date(m.value).getTime();await ma(N.value),await ba(e),$.value=await j(e),u.value=await E(t.value),n.value=await A(m.value),y.value=u.value[q.value],o(),k.value=!1};return(e,a)=>(g(),w("div",Fa,[Ma,p("div",za,[s(B,{class:"q-py-md q-mb-lg radius-8"},{default:c(()=>[p("div",Aa,[x(h(m.value.slice(0,4))+"\u5E74 "+h(new Date(m.value).getMonth()+1)+"\u6708 ",1),y.value||y.value==0?(g(),w("span",Ea,"\uFFE5"+h(y.value),1)):D("",!0)]),u.value.length?(g(),w("div",Ia,[s(Qa,{"chart-value":u.value,labels:t.value,bg:b.value,"set-month":K},null,8,["chart-value","labels","bg"]),p("div",La,[s(S,{onClick:a[0]||(a[0]=_=>R(-6)),icon:"sym_r_navigate_before",size:"md",flat:"",round:"",class:"q-mr-sm"}),s(S,{onClick:a[1]||(a[1]=_=>R(6)),icon:"sym_r_navigate_next",size:"md",flat:"",round:""})])])):D("",!0)]),_:1}),f.value?(g(),C(B,{key:0,class:"radius-8"},{default:c(()=>[s(qa,{"chart-value":n.value},null,8,["chart-value"])]),_:1})):D("",!0)]),f.value?(g(),w("div",Na,[Q.value?(g(),C(B,{key:0,transition:"fade",class:"full-width"},{default:c(()=>[p("div",Ra,h(m.value.slice(0,4))+"\u5E74 "+h(new Date(m.value).getMonth()+1)+"\u6708 ",1),s(P,{class:"q-py-sm"},{default:c(()=>[s(ra,{separator:""},{default:c(()=>[(g(!0),w(da,null,ia($.value,_=>(g(),C(_a,{class:"q-pa-md"},{default:c(()=>[s(M,{avatar:"",class:"q-pr-lg"},{default:c(()=>[s(Va,{color:"primary","text-color":"white",size:"md",rounded:""},{default:c(()=>[x(h(_.date.slice(8)),1)]),_:2},1024)]),_:2},1024),s(M,null,{default:c(()=>[s(Y,null,{default:c(()=>[x("\uFFE5"+h(_.amount)+" - "+h(_.category),1)]),_:2},1024),s(Y,{caption:""},{default:c(()=>[x(h(_.memo),1)]),_:2},1024)]),_:2},1024),s(M,{side:""},{default:c(()=>[s(S,{onClick:Pa=>W(_.createdAt),icon:"sym_r_delete",size:"md",flat:"",round:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),256))]),_:1}),s(pa,{modelValue:k.value,"onUpdate:modelValue":a[3]||(a[3]=_=>k.value=_)},{default:c(()=>[s(B,{class:"dialog-card"},{default:c(()=>[s(P,{class:"dialog-section"},{default:c(()=>[Ua,ja]),_:1}),s(ya,{class:"justify-end"},{default:c(()=>[s(S,{label:"\u30AD\u30E3\u30F3\u30BB\u30EB",onClick:a[2]||(a[2]=_=>k.value=!1),class:"col"}),s(S,{label:"OK",onClick:X,color:"secondary","text-color":"initial",class:"col"})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})):(g(),C(S,{key:1,onClick:O,label:"\u8A73\u7D30\u3092\u8868\u793A",color:"secondary","text-color":"initial",padding:"10px 32px",class:"block q-mx-auto q-mt-sm"}))])):D("",!0)]))}});const Wa=ha(Ya,[["__scopeId","data-v-e3391b93"]]);export{Wa as default};
