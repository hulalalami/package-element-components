import{d as u,r as i,a as r,o as _,f as v,_ as p}from"./index.a3ee6032.js";const m=u({__name:"index",setup(x){const s=i([{title:"\u8D2D\u7269",start:"2022-08-26 00:00:00",end:"2022-08-26 23:59:00"},{title:"\u65C5\u6E38",start:"2022-08-01 08:00:00",end:"2022-08-07 16:00:00",editable:!0}]),o=e=>{s.value.push({title:"\u5B66\u4E60",start:e.dateStr+" 08:00:00",end:e.dateStr+" 20:00:00"}),console.log(e)},c=e=>{console.log(e)},a=e=>{console.log(e);const n=document.createElement("div"),t=e.timeText.split(" - "),d=t[0],l=t[1];return n.innerHTML=`
    <img src="src/assets/logo.png" style="width:30px;height:30px;" />
    <div>\u6807\u9898: ${e.event._def.title}</div>
    <div>\u5F00\u59CB\u65F6\u95F4\uFF1A${d}</div>
    <div>\u7ED3\u675F\u65F6\u95F4\uFF1A${l}</div>
  `,{domNodes:[n]}};return(e,n)=>{const t=r("MCalendar");return _(),v(t,{class:"calendar",displayEventEnd:"",events:s.value,onDateClick:o,onEventClick:c,eventContent:a},null,8,["events"])}}});const F=p(m,[["__scopeId","data-v-c269713e"]]);export{F as default};
