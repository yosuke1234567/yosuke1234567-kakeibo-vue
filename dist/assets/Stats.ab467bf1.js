import{c as J,ak as aa,al as ea,a as R,b as M,Q as ta,an as la,f as Z,r,o as G,E as sa,s as C,L as oa,y as h,R as na,j as E,k as K,F as ua,U as ca,l as ra,m as w,n as p,q as D,C as m,aW as x,v as o,Z as S,w as d,x as U,aX as da,z as ia,A as va,B as fa,aY as ga,aD as _a,aC as Q,P as ha,_ as ma}from"./index.38ced9de.js";import{u as ba,g as j,Q as Y}from"./updateMonthlyData.e8ae3d9f.js";import{j as P,Q as pa,k as T,l as ya}from"./QCard.86470094.js";import{C as q,p as Sa,a as ka,b as wa,B as Ca,c as Da,L as xa,d as Ba,g as z,_ as Va}from"./getDoughnutValue.5a585888.js";const $a=J({name:"QAvatar",props:{...aa,fontSize:String,color:String,textColor:String,icon:String,square:Boolean,rounded:Boolean},setup(l,{slots:t}){const c=ea(l),i=R(()=>"q-avatar"+(l.color?` bg-${l.color}`:"")+(l.textColor?` text-${l.textColor} q-chip--colored`:"")+(l.square===!0?" q-avatar--square":l.rounded===!0?" rounded-borders":"")),v=R(()=>l.fontSize?{fontSize:l.fontSize}:null);return()=>{const n=l.icon!==void 0?[M(ta,{name:l.icon})]:void 0;return M("div",{class:i.value,style:c.value},[M("div",{class:"q-avatar__content row flex-center overflow-hidden",style:v.value},la(t.default,n))])}}}),Fa="/yosuke1234567-kakeibo-vue/assets/honey.22310c83.png",Ma=Z({__name:"BarChart",props:{chartValue:null,labels:null,bg:null,setMonth:null},setup(l){const t=l;q.register(Sa,ka,wa,Ca,Da,xa),q.defaults.font.family="'Asap', 'Zen Maru Gothic', sans-serif",q.defaults.aspectRatio=1.333;const c=r({labels:[],datasets:[]}),i=()=>{c.value.datasets[0].data=t.chartValue,c.value.datasets[0].backgroundColor=t.bg};G(()=>{c.value={labels:t.labels,datasets:[{borderColor:"#f5f2eb",borderRadius:8,backgroundColor:t.bg,data:t.chartValue}]}}),sa(t,i);const v={scales:{x:{grid:{color:"transparent"}},y:{ticks:{maxTicksLimit:6}}},plugins:{legend:{display:!1}},layout:{padding:20},onClick(n,f,s){console.log(n,f,s),t.setMonth(f[0].index)}};return(n,f)=>(h(),C(oa(Ba),{"chart-data":c.value,"chart-options":v},null,8,["chart-data"]))}}),A=async l=>{const t=na(K,E.currentUser.uid),c=ua(t,ca("statsMonth")),i=await ra(c),v=[];i.forEach(s=>v.push(s.data())),console.log(v);const n=[];for(let s=0;s<6;s++)for(let u=0;u<v.length;u++)if(l[s]===v[u].statsMonth){n[s]=v[u].expense;break}else n[s]=[{amount:0}];console.log(n);const f=[];for(let s=0;s<6;s++){let u=0;for(let b=0;b<n[s].length;b++)u+=n[s][b].amount;f.push(u)}return console.log(f),f},I=l=>(va("data-v-21fc0b05"),l=l(),fa(),l),Qa=I(()=>p("h2",null,"\u7D71\u8A08",-1)),qa={class:"chart-wrap"},za={class:"amount-area"},Aa={key:0},Ea={key:0},Ia={class:"pagination"},La={key:0,class:"detail-wrap"},Na={class:"detail-title"},Ra=I(()=>p("img",{src:Fa,alt:"",draggable:"false"},null,-1)),Ua=I(()=>p("div",null,"\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F",-1)),ja=Z({__name:"Stats",setup(l){const t=r([]),c=new Date,i=r(c.getMonth()+1),v=()=>{for(let e=0;e<6;e++)if(i.value-e>0)if(i.value-e<13){const a=(i.value-e).toString().padStart(2,"0");t.value.unshift(`${c.getFullYear()}-${a}`)}else{const a=(i.value-e-12).toString().padStart(2,"0");t.value.unshift(`${c.getFullYear()+1}-${a}`)}else{const a=(12-(e-i.value)).toString().padStart(2,"0");t.value.unshift(`${c.getFullYear()-1}-${a}`)}console.log(t.value)},n=r([]),f=r(),s=()=>{let e=0;for(let a=0;a<n.value.length;a++)e+=n.value[a];f.value=e},u=r([]),b=r(["#ddd0bb","#ddd0bb","#ddd0bb","#ddd0bb","#ddd0bb","#fdd835"]),g=r(`${c.getFullYear()}-${c.getMonth()+1}`),B=r(5),y=r(),V=r(0),O=async e=>{g.value!==t.value[e]&&(F.value=!1),B.value=e,g.value=t.value[e],y.value=u.value[e],V.value=0;for(let a=0;a<6;a++)b.value[a]=a==e?"#fdd835":"#ddd0bb";n.value=await z(g.value),s()},$=r([]),F=r(!1),k=r(!1),L=r();G(async()=>{E.currentUser&&(v(),u.value=await A(t.value),n.value=await z(g.value),y.value=u.value[5],s())});const N=async e=>{i.value=i.value+e,t.value.splice(0),v(),V.value+=e>0?1:-1;for(let a=0;a<6;a++)V.value==0?b.value[a]=a==B.value?"#fdd835":"#ddd0bb":b.value[a]="#ddd0bb";u.value=await A(t.value)},W=async()=>{const e=new Date(g.value).getTime();$.value=await j(e),F.value=!0},X=e=>{L.value=ha(K,E.currentUser.uid,`expense-${e}`),k.value=!0},H=async()=>{const e=new Date(g.value).getTime();await ga(L.value),await ba(e),$.value=await j(e),u.value=await A(t.value),n.value=await z(g.value),y.value=u.value[B.value],s(),k.value=!1};return(e,a)=>(h(),w(U,null,[Qa,p("div",qa,[p("div",za,[D(m(g.value.slice(0,4))+"\u5E74 "+m(new Date(g.value).getMonth()+1)+"\u6708 ",1),y.value||y.value==0?(h(),w("span",Aa,"\uFFE5"+m(y.value),1)):x("",!0)]),u.value.length?(h(),w("div",Ea,[o(Ma,{"chart-value":u.value,labels:t.value,bg:b.value,"set-month":O},null,8,["chart-value","labels","bg"]),p("div",Ia,[o(S,{onClick:a[0]||(a[0]=_=>N(-6)),icon:"sym_r_navigate_before",size:"md",flat:"",round:"",class:"q-mr-sm"}),o(S,{onClick:a[1]||(a[1]=_=>N(6)),icon:"sym_r_navigate_next",size:"md",flat:"",round:""})])])):x("",!0),f.value?(h(),C(Va,{key:1,"chart-value":n.value},null,8,["chart-value"])):x("",!0)]),f.value?(h(),w("div",La,[F.value?(h(),C(P,{key:0,transition:"fade",class:"full-width",flat:"",bordered:""},{default:d(()=>[p("div",Na,m(g.value.slice(0,4))+"\u5E74 "+m(new Date(g.value).getMonth()+1)+"\u6708 ",1),o(T,{class:"q-py-sm"},{default:d(()=>[o(da,{separator:""},{default:d(()=>[(h(!0),w(U,null,ia($.value,_=>(h(),C(_a,{class:"q-pa-md"},{default:d(()=>[o(Q,{avatar:"",class:"q-pr-lg"},{default:d(()=>[o($a,{color:"primary","text-color":"white",size:"md",rounded:""},{default:d(()=>[D(m(_.date.slice(8)),1)]),_:2},1024)]),_:2},1024),o(Q,null,{default:d(()=>[o(Y,null,{default:d(()=>[D("\uFFE5"+m(_.amount)+" - "+m(_.category),1)]),_:2},1024),o(Y,{caption:""},{default:d(()=>[D(m(_.memo),1)]),_:2},1024)]),_:2},1024),o(Q,{side:""},{default:d(()=>[o(S,{onClick:Ya=>X(_.createdAt),icon:"sym_r_delete",size:"md",flat:"",round:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),256))]),_:1}),o(pa,{modelValue:k.value,"onUpdate:modelValue":a[3]||(a[3]=_=>k.value=_)},{default:d(()=>[o(P,{class:"dialog-card"},{default:d(()=>[o(T,{class:"dialog-section"},{default:d(()=>[Ra,Ua]),_:1}),o(ya,{class:"justify-end"},{default:d(()=>[o(S,{label:"\u30AD\u30E3\u30F3\u30BB\u30EB",onClick:a[2]||(a[2]=_=>k.value=!1),class:"col"}),o(S,{label:"OK",onClick:H,color:"secondary","text-color":"initial",class:"col"})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})):(h(),C(S,{key:1,onClick:W,label:"\u8A73\u7D30\u3092\u8868\u793A",outline:"",padding:"8px 32px",class:"block q-mx-auto"}))])):x("",!0)],64))}});const Ka=ma(ja,[["__scopeId","data-v-21fc0b05"]]);export{Ka as default};
