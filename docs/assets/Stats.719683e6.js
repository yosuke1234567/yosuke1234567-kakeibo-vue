import{c as H,ak as J,al as aa,a as R,b as M,Q as ea,an as ta,f as T,r,o as Z,E as la,B as C,L as sa,v as h,R as oa,j as E,k as G,F as na,U as ua,l as ca,m as w,n as p,q as D,C as m,aW as x,s as o,Z as S,w as d,aX as ra,x as da,y as ia,z as va,A as fa,aY as _a,aD as ga,aC as Q,P as ha,_ as ma}from"./index.8bdbc5a8.js";import{u as ba,g as U,Q as j}from"./updateMonthlyData.fad342d2.js";import{j as Y,Q as pa,k as P,l as ya}from"./QCard.d056f979.js";import{C as q,p as Sa,a as ka,b as wa,B as Ca,c as Da,L as xa,d as Ba,g as z,_ as Va}from"./getDoughnutValue.b73707f7.js";const $a=H({name:"QAvatar",props:{...J,fontSize:String,color:String,textColor:String,icon:String,square:Boolean,rounded:Boolean},setup(l,{slots:t}){const c=aa(l),i=R(()=>"q-avatar"+(l.color?` bg-${l.color}`:"")+(l.textColor?` text-${l.textColor} q-chip--colored`:"")+(l.square===!0?" q-avatar--square":l.rounded===!0?" rounded-borders":"")),v=R(()=>l.fontSize?{fontSize:l.fontSize}:null);return()=>{const n=l.icon!==void 0?[M(ea,{name:l.icon})]:void 0;return M("div",{class:i.value,style:c.value},[M("div",{class:"q-avatar__content row flex-center overflow-hidden",style:v.value},ta(t.default,n))])}}}),Fa="/yosuke1234567-kakeibo-vue/assets/honey.22310c83.png",Ma=T({__name:"BarChart",props:{chartValue:null,labels:null,bg:null,setMonth:null},setup(l){const t=l;q.register(Sa,ka,wa,Ca,Da,xa),q.defaults.font.family="'Asap', 'Zen Maru Gothic', sans-serif",q.defaults.aspectRatio=1.333;const c=r({labels:[],datasets:[]}),i=()=>{c.value.datasets[0].data=t.chartValue,c.value.datasets[0].backgroundColor=t.bg};Z(()=>{c.value={labels:t.labels,datasets:[{borderColor:"#f5f2eb",borderRadius:8,backgroundColor:t.bg,data:t.chartValue}]}}),la(t,i);const v={scales:{x:{grid:{color:"transparent"}},y:{ticks:{maxTicksLimit:6}}},plugins:{legend:{display:!1}},layout:{padding:20},onClick(n,f,s){console.log(n,f,s),t.setMonth(f[0].index)}};return(n,f)=>(h(),C(sa(Ba),{"chart-data":c.value,"chart-options":v},null,8,["chart-data"]))}}),A=async l=>{const t=oa(G,E.currentUser.uid),c=na(t,ua("statsMonth")),i=await ca(c),v=[];i.forEach(s=>v.push(s.data())),console.log(v);const n=[];for(let s=0;s<6;s++)for(let u=0;u<v.length;u++)if(l[s]===v[u].statsMonth){n[s]=v[u].expense;break}else n[s]=[{amount:0}];console.log(n);const f=[];for(let s=0;s<6;s++){let u=0;for(let b=0;b<n[s].length;b++)u+=n[s][b].amount;f.push(u)}return console.log(f),f},I=l=>(va("data-v-a2b6fce1"),l=l(),fa(),l),Qa={class:"u-inner"},qa=I(()=>p("h2",null,"\u7D71\u8A08",-1)),za={class:"chart-wrap"},Aa={class:"amount-area"},Ea={key:0},Ia={key:0},La={class:"pagination"},Na={key:0,class:"detail-wrap"},Ra={class:"detail-title"},Ua=I(()=>p("img",{src:Fa,alt:"",draggable:"false"},null,-1)),ja=I(()=>p("div",null,"\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F",-1)),Ya=T({__name:"Stats",setup(l){const t=r([]),c=new Date,i=r(c.getMonth()+1),v=()=>{for(let e=0;e<6;e++)if(i.value-e>0)if(i.value-e<13){const a=(i.value-e).toString().padStart(2,"0");t.value.unshift(`${c.getFullYear()}-${a}`)}else{const a=(i.value-e-12).toString().padStart(2,"0");t.value.unshift(`${c.getFullYear()+1}-${a}`)}else{const a=(12-(e-i.value)).toString().padStart(2,"0");t.value.unshift(`${c.getFullYear()-1}-${a}`)}console.log(t.value)},n=r([]),f=r(),s=()=>{let e=0;for(let a=0;a<n.value.length;a++)e+=n.value[a];f.value=e},u=r([]),b=r(["#ddd0bb","#ddd0bb","#ddd0bb","#ddd0bb","#ddd0bb","#fdd835"]),_=r(`${c.getFullYear()}-${c.getMonth()+1}`),B=r(5),y=r(),V=r(0),K=async e=>{_.value!==t.value[e]&&(F.value=!1),B.value=e,_.value=t.value[e],y.value=u.value[e],V.value=0;for(let a=0;a<6;a++)b.value[a]=a==e?"#fdd835":"#ddd0bb";n.value=await z(_.value),s()},$=r([]),F=r(!1),k=r(!1),L=r();Z(async()=>{E.currentUser&&(v(),u.value=await A(t.value),n.value=await z(_.value),y.value=u.value[5],s())});const N=async e=>{i.value=i.value+e,t.value.splice(0),v(),V.value+=e>0?1:-1;for(let a=0;a<6;a++)V.value==0?b.value[a]=a==B.value?"#fdd835":"#ddd0bb":b.value[a]="#ddd0bb";u.value=await A(t.value)},O=async()=>{const e=new Date(_.value).getTime();$.value=await U(e),F.value=!0},W=e=>{L.value=ha(G,E.currentUser.uid,`expense-${e}`),k.value=!0},X=async()=>{const e=new Date(_.value).getTime();await _a(L.value),await ba(e),$.value=await U(e),u.value=await A(t.value),n.value=await z(_.value),y.value=u.value[B.value],s(),k.value=!1};return(e,a)=>(h(),w("div",Qa,[qa,p("div",za,[p("div",Aa,[D(m(_.value.slice(0,4))+"\u5E74 "+m(new Date(_.value).getMonth()+1)+"\u6708 ",1),y.value||y.value==0?(h(),w("span",Ea,"\uFFE5"+m(y.value),1)):x("",!0)]),u.value.length?(h(),w("div",Ia,[o(Ma,{"chart-value":u.value,labels:t.value,bg:b.value,"set-month":K},null,8,["chart-value","labels","bg"]),p("div",La,[o(S,{onClick:a[0]||(a[0]=g=>N(-6)),icon:"sym_r_navigate_before",size:"md",flat:"",round:"",class:"q-mr-sm"}),o(S,{onClick:a[1]||(a[1]=g=>N(6)),icon:"sym_r_navigate_next",size:"md",flat:"",round:""})])])):x("",!0),f.value?(h(),C(Va,{key:1,"chart-value":n.value},null,8,["chart-value"])):x("",!0)]),f.value?(h(),w("div",Na,[F.value?(h(),C(Y,{key:0,transition:"fade",class:"full-width",flat:"",bordered:""},{default:d(()=>[p("div",Ra,m(_.value.slice(0,4))+"\u5E74 "+m(new Date(_.value).getMonth()+1)+"\u6708 ",1),o(P,{class:"q-py-sm"},{default:d(()=>[o(ra,{separator:""},{default:d(()=>[(h(!0),w(da,null,ia($.value,g=>(h(),C(ga,{class:"q-pa-md"},{default:d(()=>[o(Q,{avatar:"",class:"q-pr-lg"},{default:d(()=>[o($a,{color:"primary","text-color":"white",size:"md",rounded:""},{default:d(()=>[D(m(g.date.slice(8)),1)]),_:2},1024)]),_:2},1024),o(Q,null,{default:d(()=>[o(j,null,{default:d(()=>[D("\uFFE5"+m(g.amount)+" - "+m(g.category),1)]),_:2},1024),o(j,{caption:""},{default:d(()=>[D(m(g.memo),1)]),_:2},1024)]),_:2},1024),o(Q,{side:""},{default:d(()=>[o(S,{onClick:Pa=>W(g.createdAt),icon:"sym_r_delete",size:"md",flat:"",round:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),256))]),_:1}),o(pa,{modelValue:k.value,"onUpdate:modelValue":a[3]||(a[3]=g=>k.value=g)},{default:d(()=>[o(Y,{class:"dialog-card"},{default:d(()=>[o(P,{class:"dialog-section"},{default:d(()=>[Ua,ja]),_:1}),o(ya,{class:"justify-end"},{default:d(()=>[o(S,{label:"\u30AD\u30E3\u30F3\u30BB\u30EB",onClick:a[2]||(a[2]=g=>k.value=!1),class:"col"}),o(S,{label:"OK",onClick:X,color:"secondary","text-color":"initial",class:"col"})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})):(h(),C(S,{key:1,onClick:O,label:"\u8A73\u7D30\u3092\u8868\u793A",outline:"",padding:"8px 32px",class:"block q-mx-auto"}))])):x("",!0)]))}});const Oa=ma(Ya,[["__scopeId","data-v-a2b6fce1"]]);export{Oa as default};
