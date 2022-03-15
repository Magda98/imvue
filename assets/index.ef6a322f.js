import{a as j,d as P,o as n,c as r,b as t,e as y,r as b,u as a,f as p,g,w as Y,F as I,p as V,h as B,t as M,i as x,j as q,k as z,R as D,l as W,m as T,n as S,q as Z,s as L,v as K,x as G,y as J,z as Q,A as X}from"./vendor.b3601e4a.js";const ee=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function c(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(o){if(o.ep)return;o.ep=!0;const i=c(o);fetch(o.href,i)}};ee();const f=j.create({baseURL:"https://api.imgur.com/3/"}),w={async getUserData(s){return(await f.get(`/account/${s}`)).data},async getUserImages(s){return(await f.get(`/account/me/images/${s}`)).data},async getImagesCount(){return(await f.get("/account/me/images/count")).data},async togleFavouriteImage(s){return(await f.post(`/image/${s}/favorite`)).data},async getFavroites(s){return(await f.get(`account/me/favorites/${s}`)).data},async postImage(s){const e=new FormData;return e.append("image",s),(await f.post("/image",e)).data},async deleteImage(s){return await f.delete(`/image/${s}`)}},F=P({id:"snackbar",state:()=>({showSnackbar:!1,message:"",timeout:5e3,status:"success"}),actions:{close(){this.showSnackbar=!1},show(s,e){this.message=s,this.showSnackbar=!0,this.status=e,setTimeout(this.close,this.timeout)}}}),se=P({id:"user",state:()=>({token:"",username:"",userInfo:void 0}),getters:{snackbar(){return F().show}},actions:{getAccessTokenUrl(){const e="https://api.imgur.com/oauth2/authorize?client_id=60895d90e965e97&response_type=token";window.location.href=e},getAccessToken(){const s=window.location.hash.substring(1),e=new URLSearchParams(s).get("access_token"),c=new URLSearchParams(s).get("account_username");this.token=e,this.username=c,f.defaults.headers.common={Authorization:`Bearer ${e}`},this.getUserData()},async setAccessToken(){f.defaults.headers.common={Authorization:`Bearer ${this.token}`}},async getUserData(){try{const s=await w.getUserData(this.username);this.userInfo=s.data,window.location.hash="",window.location.reload()}catch{this.snackbar("Error getting user data","error")}},logout(){this.userInfo=void 0,this.token="",this.snackbar("Logout succesfully","success")}},persist:!0}),C=P({id:"images",state:()=>({userImages:[],userFavImages:[],imagesCount:0,currentPage:0}),getters:{snackbar(){return F().show},getImagesUrlArray:s=>s.userImages.map(e=>e.link),getFavUrlArray:s=>s.userFavImages.map(e=>e.link),getFavArray:s=>s.userFavImages.map(e=>e.id),getPagesCount:s=>{const e=Math.ceil(s.imagesCount/50);return Array.from({length:e},(c,l)=>l+1)},getMaxPagesCount:s=>Math.ceil(s.imagesCount/50)},actions:{async getUserImages(s=0){try{const e=await w.getUserImages(s);this.userImages=e.data,this.currentPage=s}catch{this.snackbar("Error getting  images","error")}},async getImagesCount(){try{const s=await w.getImagesCount();this.imagesCount=s.data}catch{this.snackbar("Error getting images","error")}},async togleFavouriteImage(s){try{const e=await w.togleFavouriteImage(s);console.log(e),this.getAllFav(),e.data==="unfavorited"?this.snackbar("Image removed to fav","error"):e.data==="favorited"&&this.snackbar("Image added to fav","success")}catch{this.snackbar("Error while adding image to fav","error")}},async getAllFav(){try{const s=[];for(let e=0;;e++){const c=await w.getFavroites(e);if(c.data.length===0)break;s.push(...c.data)}this.userFavImages=s}catch{this.snackbar("Error getting favorites images","error")}},async postImage(s){try{await w.postImage(s),this.getUserImages(),this.snackbar("Image added","success")}catch{this.snackbar("Error while adding image","error")}},async deleteImage(s){try{this.getFavArray.includes(s)&&await this.togleFavouriteImage(s),await w.deleteImage(s),this.getUserImages(this.currentPage),this.getAllFav(),this.snackbar("Image deleted","success")}catch{this.snackbar("Error while deleting image","error")}}}}),E=P({id:"modal",state:()=>({showModal:!1}),actions:{}});var h=(s,e)=>{const c=s.__vccOpts||s;for(const[l,o]of e)c[l]=o;return c};const te={},ae={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},ne=t("path",{d:"M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06a31.894 31.894 0 01-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1 56.6 467.6c-6.328 7.594-15.42 11.52-24.59 11.52a31.907 31.907 0 01-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206 327.4 43.5c11.3-13.58 31.48-15.42 45.06-4.094 13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"},null,-1),oe=[ne];function re(s,e){return n(),r("svg",ae,oe)}var R=h(te,[["render",re]]);const U=s=>(V("data-v-1edd11d6"),s=s(),B(),s),ce={key:1,class:"modal"},ie=U(()=>t("h2",{class:"text"},"Add image to gallery",-1)),le={class:"preview"},ue=["src"],de=U(()=>t("label",{for:"image",class:"btn"},"Drop or Select a file:",-1)),_e=U(()=>t("button",{type:"submit",class:"btn"},"Upload",-1)),ge=y({setup(s){const e=b("");function c(_){var $;const v=($=_.target.files)==null?void 0:$[0];v&&o(v)}function l(_){var v;_.stopPropagation(),_.preventDefault();const m=(v=_.dataTransfer)==null?void 0:v.files[0];console.log(m),m&&o(m)}function o(_){if(!_.type.match("image.*")){d.show("You must add an correct image before upload","error");return}var m=new FileReader;m.onload=function(v){var $;e.value=($=v.target)==null?void 0:$.result,console.log(e.value)},m.readAsDataURL(_)}async function i(_){_.preventDefault(),e.value?(await k.postImage(e.value.slice(22,-1)),e.value="",u.showModal=!1):d.show("You must add an image before upload","error")}const u=E(),k=C(),d=F();return(_,m)=>(n(),r(I,null,[a(u).showModal?(n(),r("div",{key:0,class:"overlay",onClick:m[0]||(m[0]=v=>a(u).showModal=!1)})):p("",!0),a(u).showModal?(n(),r("div",ce,[t("button",{class:"close btn",onClick:m[1]||(m[1]=v=>a(u).showModal=!1)},[g(R)]),ie,t("div",le,[e.value?(n(),r("img",{key:0,src:e.value,alt:"",class:"img"},null,8,ue)):p("",!0)]),t("form",{onSubmit:i,class:"upload-form"},[t("div",{onDragover:m[2]||(m[2]=Y(()=>{},["prevent"])),onDrop:l,id:"drop-area"},[t("input",{type:"file",accept:"image/*",id:"image",name:"image",onChange:c},null,32),de],32),_e],32)])):p("",!0)],64))}});var me=h(ge,[["__scopeId","data-v-1edd11d6"]]);const he={},pe={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},ve=t("path",{d:"M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99h144v-144C192 62.32 206.33 48 224 48s32 14.32 32 32.01v144h144c17.7-.01 32 14.29 32 31.99z"},null,-1),fe=[ve];function ke(s,e){return n(),r("svg",pe,fe)}var we=h(he,[["render",ke]]);const ye={},be={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},Ie=t("path",{d:"M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-24 152c0-13.2 10.8-24 24-24s24 10.75 24 24v128c0 13.25-10.75 24-24 24s-24-10.7-24-24V152zm24 248c-17.36 0-31.44-14.08-31.44-31.44s14.07-31.44 31.44-31.44 31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"},null,-1),$e=[Ie];function Ce(s,e){return n(),r("svg",be,$e)}var xe=h(ye,[["render",Ce]]);const Pe={},Fe={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},Ae=t("path",{d:"M0 256C0 114.6 114.6 0 256 0s256 114.6 256 256-114.6 256-256 256S0 397.4 0 256zm371.8-44.2c10.9-10.9 10.9-28.7 0-39.6-10.9-10.9-28.7-10.9-39.6 0L224 280.4l-44.2-44.2c-10.9-10.9-28.7-10.9-39.6 0-10.9 10.9-10.9 28.7 0 39.6l64 64c10.9 10.9 28.7 10.9 39.6 0l128-128z"},null,-1),Me=[Ae];function Se(s,e){return n(),r("svg",Fe,Me)}var Le=h(Pe,[["render",Se]]);const Ue={key:0,class:"snackbar"},ze={class:"snackbar-inner"},De={class:"text"},He={class:"icon"},Ve=y({setup(s){const e=F();return(c,l)=>a(e).showSnackbar?(n(),r("div",Ue,[t("div",ze,[t("div",De,M(a(e).message),1),t("div",He,[a(e).status==="error"?(n(),x(xe,{key:0,class:"error"})):p("",!0),a(e).status==="success"?(n(),x(Le,{key:1,class:"success"})):p("",!0)]),t("button",{class:"btn close",onClick:l[0]||(l[0]=o=>a(e).close())},[g(R)])])])):p("",!0)}});var Be=h(Ve,[["__scopeId","data-v-f5f8c43a"]]);const Te={class:"header"},Ee={class:"header-inner"},Re={key:0,class:"nav"},Ne=T("Home"),Oe=T("Fav"),je={key:1,class:"user-info"},Ye={class:"user-info-inner"},qe={class:"user-avatar"},We=["src"],Ze=["href"],Ke={key:2},Ge={key:0,class:"container"},Je={key:1,class:"container"},Qe=t("h2",{class:"text-center"},"Zaloguj si\u0119 aby korzysta\u0107 z aplikacji \u{1F60E}",-1),Xe=[Qe],es=y({setup(s){const e=se(),c=C(),l=E();return q(async()=>{var u;const o=window.location.hash.substring(1);new URLSearchParams(o).has("access_token")?e.getAccessToken():(u=e.token)!=null&&u.length&&(await e.setAccessToken(),c.getUserImages(),c.getImagesCount(),c.getAllFav())}),(o,i)=>(n(),r(I,null,[t("header",Te,[t("div",Ee,[a(e).userInfo?(n(),r("nav",Re,[g(a(D),{to:"/"},{default:z(()=>[Ne]),_:1}),g(a(D),{to:"/fav"},{default:z(()=>[Oe]),_:1})])):p("",!0),a(e).userInfo?(n(),r("div",je,[t("div",Ye,[t("div",qe,[t("img",{referrerpolicy:"no-referrer",src:a(e).userInfo.avatar},null,8,We)]),t("a",{class:"user-name",href:`https://imgur.com/user/${a(e).userInfo.url}`,target:"_blank"},M(a(e).userInfo.url),9,Ze)]),t("button",{onClick:i[0]||(i[0]=(...u)=>a(e).logout&&a(e).logout(...u)),class:"btn"},"Wyloguj")])):(n(),r("div",Ke,[t("button",{class:"btn",onClick:i[1]||(i[1]=(...u)=>a(e).getAccessTokenUrl&&a(e).getAccessTokenUrl(...u))},"Zaloguj")]))])]),a(e).userInfo?(n(),r("main",Ge,[g(a(W))])):(n(),r("main",Je,Xe)),a(e).userInfo?(n(),r("button",{key:2,onClick:i[2]||(i[2]=u=>a(l).showModal=!0),class:"btn primary floating"},[g(we)])):p("",!0),g(Be),g(me)],64))}}),ss={},ts={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},as=t("path",{d:"M0 190.9v-5.8c0-69.9 50.52-129.52 119.4-141 44.7-7.59 92 7.27 124.6 39.92L256 96l11.1-11.98C300.6 51.37 347 36.51 392.6 44.1c68.9 11.48 119.4 71.1 119.4 141v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.59 300.4C17.23 272.1 0 232.4 0 190.9z"},null,-1),ns=[as];function os(s,e){return n(),r("svg",ts,ns)}var rs=h(ss,[["render",os]]);const cs={},is={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},ls=t("path",{d:"M244 84l11.1 12 12-11.98C300.6 51.37 347 36.51 392.6 44.1c68.9 11.48 119.4 71.1 119.4 141v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.59 300.4C17.23 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.52-129.52 119.4-141 44.7-7.59 92 7.27 124.6 39.9-.9 0 0 .01 0 0zm11.1 79.9l-45-46.8c-21.7-20.82-52.5-30.7-82.8-25.66C81.55 99.07 48 138.7 48 185.1v5.8c0 28.2 11.71 55.2 32.34 74.4L256 429.3l175.7-164c20.6-19.2 32.3-46.2 32.3-74.4v-5.8c0-46.4-33.6-86.03-79.3-93.66-30.3-5.04-61.1 4.84-82.8 25.66l-46.8 46.8z"},null,-1),us=[ls];function ds(s,e){return n(),r("svg",is,us)}var _s=h(cs,[["render",ds]]);const gs={},ms={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},hs=t("path",{d:"M160 400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16v208zm80 0c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16v208zm80 0c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16v208zm-2.5-375.06L354.2 80H424c13.3 0 24 10.75 24 24 0 13.3-10.7 24-24 24h-8v304c0 44.2-35.8 80-80 80H112c-44.18 0-80-35.8-80-80V128h-8c-13.25 0-24-10.7-24-24 0-13.25 10.75-24 24-24h69.82l36.68-55.06C140.9 9.357 158.4 0 177.1 0h93.8c18.7 0 36.2 9.358 46.6 24.94zM151.5 80h145l-19-28.44c-1.5-2.22-4-3.56-6.6-3.56h-93.8c-2.6 0-6 1.34-6.6 3.56L151.5 80zM80 432c0 17.7 14.33 32 32 32h224c17.7 0 32-14.3 32-32V128H80v304z"},null,-1),ps=[hs];function vs(s,e){return n(),r("svg",ms,ps)}var fs=h(gs,[["render",vs]]);const ks=s=>(V("data-v-0b6d357a"),s=s(),B(),s),ws={class:"image-card"},ys=["src"],bs={class:"actions"},Is={key:0,class:"overlay"},$s={key:1,class:"modal"},Cs=ks(()=>t("h3",{class:"text"},"Delete image?",-1)),xs=y({props:{item:null},setup(s){const e=s,c=C(),l=b(!1);function o(d){d.stopPropagation(),c.togleFavouriteImage(e.item.id)}function i(d){d.stopPropagation(),l.value=!0}function u(d){d.stopPropagation(),c.deleteImage(e.item.id),l.value=!1}function k(d){d.stopPropagation(),l.value=!1}return(d,_)=>(n(),r(I,null,[t("div",ws,[t("img",{src:e.item.link,referrerpolicy:"no-referrer"},null,8,ys),t("div",bs,[a(c).getFavArray.includes(e.item.id)?(n(),r("button",{key:0,class:"btn-primary-outline",onClick:o},[g(rs)])):(n(),r("button",{key:1,onClick:o,class:"btn-primary-outline"},[g(_s)])),t("button",{onClick:i,class:"btn-primary-outline"},[g(fs)])])]),l.value?(n(),r("div",Is)):p("",!0),l.value?(n(),r("div",$s,[t("div",{"modal-inner":""},[Cs,t("div",{class:"actions"},[t("button",{onClick:u,class:"btn"},"YES"),t("button",{onClick:k,class:"btn"},"NO")])])])):p("",!0)],64))}});var N=h(xs,[["__scopeId","data-v-0b6d357a"]]);const Ps={class:"pagination"},Fs=["onClick"],As=y({props:{pages:null,maxPages:null,currentPage:null,callback:null},setup(s){const e=s;function c(i){e.callback(i)}function l(){e.currentPage>0&&e.callback(e.currentPage-1)}function o(){e.currentPage<e.maxPages-1&&e.callback(e.currentPage+1)}return(i,u)=>(n(),r("ul",Ps,[t("li",{onClick:l,class:"pag prev"},"<"),(n(!0),r(I,null,S(e.pages,(k,d)=>(n(),r("li",{class:Z(["pag",{active:e.currentPage===d}]),key:d,onClick:_=>c(d)},M(k),11,Fs))),128)),t("li",{onClick:o,class:"pag next"},">")]))}});var H=h(As,[["__scopeId","data-v-47771762"]]);const Ms={class:"image-list"},Ss=["onClick"],Ls=y({setup(s){const e=C(),c=b(0),l=b(!1);function o(u){c.value=u,l.value=!0}function i(){l.value=!1}return(u,k)=>(n(),r("div",null,[a(e).getMaxPagesCount>1?(n(),x(H,{key:0,pages:a(e).getPagesCount,"max-pages":a(e).getMaxPagesCount,"current-page":a(e).currentPage,callback:a(e).getUserImages},null,8,["pages","max-pages","current-page","callback"])):p("",!0),t("div",Ms,[(n(!0),r(I,null,S(a(e).userImages,(d,_)=>(n(),r("div",{key:d.id,onClick:()=>o(_)},[g(N,{item:d},null,8,["item"])],8,Ss))),128))]),a(e).getMaxPagesCount>1?(n(),x(H,{key:1,pages:a(e).getPagesCount,"max-pages":a(e).getMaxPagesCount,"current-page":a(e).currentPage,callback:a(e).getUserImages},null,8,["pages","max-pages","current-page","callback"])):p("",!0),t("div",null,[g(a(L),{"move-disabled":!0,visible:l.value,imgs:a(e).getImagesUrlArray,index:c.value,onHide:i},null,8,["visible","imgs","index"])])]))}});var Us=h(Ls,[["__scopeId","data-v-1b68f280"]]);const zs={class:"image-list"},Ds=["onClick"],Hs=y({setup(s){const e=C(),c=b(0),l=b(!1);function o(u){c.value=u,l.value=!0}function i(){l.value=!1}return(u,k)=>(n(),r("div",null,[t("div",zs,[(n(!0),r(I,null,S(a(e).userFavImages,(d,_)=>(n(),r("div",{key:d.id,onClick:()=>o(_)},[g(N,{item:d},null,8,["item"])],8,Ds))),128))]),t("div",null,[g(a(L),{"move-disabled":!0,visible:l.value,imgs:a(e).getFavUrlArray,index:c.value,onHide:i},null,8,["visible","imgs","index"])])]))}});var Vs=h(Hs,[["__scopeId","data-v-22199484"]]);const Bs=K({history:G("/imvue/"),routes:[{path:"/",name:"home",component:Us},{path:"/fav",name:"fav",component:Vs}]}),A=J(es),O=Q();O.use(X);A.use(O);A.use(Bs);A.use(L);A.mount("#app");
