import{d as B,r as y,h as C,a as c,o as x,c as w,b as s,w as u,F as k,g as a,e as q,E as n}from"./index.a3ee6032.js";const L=a("\u586B\u8868"),M=a("\u53D6\u6D88"),P=a("\u786E\u8BA4"),R=a("\u4E0A\u4F20\u6587\u4EF6"),$=q("div",{class:"el-upload__tip"},"jpg/png files with a size less than 500KB.",-1),V=B({__name:"index",setup(N){const t=y(!1),p=C([{type:"input",value:"",label:"\u7528\u6237\u540D",prop:"username",rules:[{required:!0,message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"},{min:2,max:6,message:"\u7528\u6237\u540D\u57282-6\u4F4D\u4E4B\u95F4",trigger:"blur"}],attrs:{style:{width:"300px"},clearable:!0}},{type:"input",value:"",label:"\u5BC6\u7801",prop:"password",rules:[{required:!0,message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"},{min:6,max:15,message:"\u5BC6\u7801\u57286-15\u4F4D\u4E4B\u95F4",trigger:"blur"}],attrs:{style:{width:"300px"},showPassword:!0,clearable:!0}},{type:"select",value:3,label:"\u804C\u4F4D",placeholder:"\u8BF7\u9009\u62E9\u804C\u4F4D",prop:"role",rules:[{required:!0,message:"\u804C\u4F4D\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],children:[{type:"option",label:"\u7ECF\u7406",value:1},{type:"option",label:"\u5458\u5DE5",value:2},{type:"option",label:"\u4E3B\u7BA1",value:3}],attrs:{style:{width:"300px"}}},{type:"checkbox-group",value:[],label:"\u7231\u597D",prop:"Hobby",rules:[{required:!0,message:"\u7231\u597D\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],children:[{type:"checkbox",label:"\u8DB3\u7403",value:1},{type:"checkbox",label:"\u7BEE\u7403",value:2},{type:"checkbox",label:"\u7FBD\u6BDB\u7403",value:3}]},{type:"radio-group",value:"",label:"\u6027\u522B",prop:"gender",rules:[{required:!0,message:"\u6027\u522B\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],children:[{type:"radio",label:"\u7537",value:"male"},{type:"radio",label:"\u5973",value:"female"},{type:"radio",label:"\u4FDD\u5BC6",value:"secret"}]},{type:"upload",label:"\u4E0A\u4F20\u6587\u4EF6",prop:"pic",rules:[{required:!0,message:"\u8BF7\u4E0A\u4F20\u6587\u4EF6",trigger:"blur"}],uploadAttrs:{action:"https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",multiple:!0,limit:3}},{type:"editor",value:"123",label:"\u63CF\u8FF0",prop:"desc",placeholder:"\u8BF7\u8F93\u5165\u63CF\u8FF0",rules:[{required:!0,message:"\u8BF7\u4E0A\u4F20\u6587\u4EF6",trigger:"blur"}]}]),d=e=>{const o=e.validate(),l=e.getFormData();o(i=>{i?(console.log("model=>",l),e.resetFields(),t.value=!1,n.success("\u63D0\u4EA4\u6210\u529F")):n.error("\u63D0\u4EA4\u5931\u8D25")})},g=e=>{e.resetFields(),t.value=!1},F=e=>{console.log("onChange=>",e.file,e.fileList)},b=e=>{console.log("beforeUpload=>",e)},m=e=>{console.log("onPreview=>",e)},E=e=>{console.log("beforeRemove>",e.file,e.fileList)},f=e=>{console.log("onRemove=>",e.file,e.fileList)},D=e=>{console.log("onProgress=>",e.event,e.file,e.fileList)},v=e=>{console.log("onSuccess=>",e.response,e.file,e.fileList)},A=e=>{console.log("onError=>",e.err,e.file,e.fileList)},h=e=>{n.warning(`\u4E0A\u4F20\u7684\u6587\u4EF6${e.files.length}\u4E2A\uFF0C\u8D85\u51FA\u9650\u5236`)};return(e,o)=>{const l=c("el-button"),i=c("MModelForm");return x(),w(k,null,[s(l,{onClick:o[0]||(o[0]=r=>t.value=!0)},{default:u(()=>[L]),_:1}),s(i,{visible:t.value,"onUpdate:visible":o[1]||(o[1]=r=>t.value=r),title:"\u7F16\u8F91\u8868\u5355",width:"50%","max-height":"500px",formLabelWidth:"100px",options:p,onPreview:m,onRemove:f,onSuccess:v,onError:A,onProgress:D,onChange:F,onExceed:h,beforeUpload:b,beforeRemove:E},{footer:u(({form:r})=>[s(l,{onClick:_=>g(r)},{default:u(()=>[M]),_:2},1032,["onClick"]),s(l,{onClick:_=>d(r)},{default:u(()=>[P]),_:2},1032,["onClick"])]),uploadArea:u(()=>[s(l,{type:"primary"},{default:u(()=>[R]),_:1})]),uploadTip:u(()=>[$]),_:1},8,["visible","options"])],64)}}});export{V as default};