webpackJsonp([8],{NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("7+uW"),i={name:"Navbar",data:()=>({User:{name:""}}),mounted:function(){var t=this;this.axios.post("/api/settings/name",{}).then(s=>{t.User.name=s.data}).catch(t=>{})}},n={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"navbar"}},[s("nav",{staticClass:"navbar is-fixed-top"},[this._m(0),this._v(" "),s("div",{staticClass:"navbar-menu"},[s("div",{staticClass:"navbar-end"},[s("a",{staticClass:"navbar-item"},[s("i",{staticClass:"icon ion-md-happy"}),this._v(" "+this._s(this.User.name)+"\n        ")])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"navbar-brand"},[s("h1",[s("i",{staticClass:"icon ion-md-aperture"}),this._v(" E-junkie IO")])])}]};var o={name:"Sidebar",data:()=>({assetsDialogVisible:!1}),mounted:function(){setInterval(this.keepSessionAlive,6e5)},methods:{showAssets:function(){this.assetsDialogVisible=!this.assetsDialogVisible,this.$bus.$emit("showAssets",this.assetsDialogVisible)},keepSessionAlive:function(){this.axios.post("/api/session",{}).then(t=>{console.log(t.data)}).catch(t=>{})}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"sidebar"}},[e("router-link",{attrs:{to:"/"}},[e("i",{staticClass:"icon ion-md-analytics"}),t._v(" Dashboard")]),t._v(" "),e("router-link",{attrs:{to:"/pages"}},[e("i",{staticClass:"icon ion-md-document"}),t._v(" Pages")]),t._v(" "),e("router-link",{attrs:{to:"/templates"}},[e("i",{staticClass:"icon ion-md-brush"}),t._v(" Templates")]),t._v(" "),e("a",{on:{click:function(s){t.showAssets()}}},[e("i",{staticClass:"icon ion-ios-albums"}),t._v(" Assets")]),t._v(" "),e("router-link",{attrs:{to:"/settings"}},[e("i",{staticClass:"icon ion-md-settings"}),t._v(" Settings")]),t._v(" "),e("router-link",{attrs:{to:"/integrations"}},[e("i",{staticClass:"icon ion-md-infinite"}),t._v(" Integrations")]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("a",{attrs:{href:"/admin/logout"}},[s("i",{staticClass:"icon ion-md-hand"}),this._v(" Logout")])}]};var c={name:"Assets",data:()=>({assetsDialogVisible:!1,showPreviewDialog:!1,Assets:null,previewAsset:null,fileList:[],uploadPercentage:0,assetUploadAction:null}),created:function(){this.assetUploadAction="/api/assets/save";var t=this;this.$bus.$on("showAssets",s=>{t.assetsDialogVisible=!t.assetsDialogVisible,this.getAssets()})},mounted:function(){this.getAssets()},methods:{getAssets:function(){var t=this;this.axios.post("/api/assets",{}).then(s=>{t.Assets=s.data}).catch(t=>{})},deleteAsset:function(t){var s=this;this.axios.post("/api/assets/delete",{key:t}).then(t=>{s.Assets=t.data}).catch(t=>{})},copyUrl:function(t){var s=this;this.$copyText(t).then(function(e){s.$message({message:"Url Copied : "+t,type:"success",showClose:!0})},function(e){s.$message({message:"Can't copy URL : "+t,type:"warning",showClose:!0})})},assetsUploaded:function(t,s,e){t.status||0==t.status?this.$message({showClose:!0,message:t.error,type:"error"}):(this.$message({message:"Asset successfully uploaded",type:"success",showClose:!0}),this.Assets=t),this.uploadPercentage=0},assetsUploadProgress:function(t,s,e){this.uploadPercentage=t.percent},viewAsset:function(t){this.previewAsset=t,this.showPreviewDialog=!0}}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"assets"}},[e("el-dialog",{attrs:{title:"Assets",visible:t.assetsDialogVisible,fullscreen:!0},on:{"update:visible":function(s){t.assetsDialogVisible=s}}},[e("div",{staticClass:"columns is-multiline"},[e("div",{staticClass:"column is-8"},[e("div",{staticClass:"columns is-multiline"},t._l(t.Assets,function(s,a){return e("div",{staticClass:"column is-narrow"},[e("div",{staticClass:"box assetBox"},[e("el-button",{attrs:{type:"primary",icon:"ion-md-copy"},on:{click:function(e){t.copyUrl(s.url)}}}),t._v(" "),e("el-button",{attrs:{type:"danger",icon:"ion-md-trash"},on:{click:function(e){t.deleteAsset(s.key)}}}),t._v(" "),e("p",{on:{click:function(e){t.viewAsset(s)}}},[t._v(t._s(s.asset))])],1)])}))]),t._v(" "),e("div",{staticClass:"column is-4"},[e("el-upload",{ref:"assetUpload",staticClass:"upload-demo",attrs:{drag:"",action:t.assetUploadAction,"file-list":t.fileList,"list-type":"picture","on-success":t.assetsUploaded,"on-progress":t.assetsUploadProgress,multiple:""}},[e("i",{staticClass:"el-icon-upload"}),t._v(" "),e("div",{staticClass:"el-upload__text"},[t._v("Drop file here or "),e("em",[t._v("click to upload")])]),t._v(" "),e("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("jpg/png/gif/mp4/webm/css/js/json files with a size less than 5mb")])]),t._v(" "),0!=t.uploadPercentage?e("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.uploadPercentage,status:"success"}}):t._e()],1)])]),t._v(" "),t.previewAsset?e("el-dialog",{attrs:{title:t.previewAsset.asset,visible:t.showPreviewDialog,width:"50%",center:"","custom-class":"previewDialog"},on:{"update:visible":function(s){t.showPreviewDialog=s}}},[t.previewAsset?e("iframe",{staticClass:"embed",attrs:{src:t.previewAsset.url}}):t._e(),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(s){t.previewAsset=null,t.showPreviewDialog=!1}}},[t._v("Cancel")])],1)]):t._e()],1)},staticRenderFns:[]};var u={name:"App",components:{Navbar:e("VU/8")(i,n,!1,function(t){e("YPrX")},"data-v-1b9506d7",null).exports,Sidebar:e("VU/8")(o,l,!1,function(t){e("fIZs")},"data-v-5f72226c",null).exports,Assets:e("VU/8")(c,r,!1,function(t){e("aLme")},null,null).exports}},p={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("navbar"),this._v(" "),s("sidebar"),this._v(" "),s("assets"),this._v(" "),s("div",{staticClass:"main-content"},[s("transition",{attrs:{name:"el-fade-in"}},[s("router-view")],1)],1)],1)},staticRenderFns:[]};var d=e("VU/8")(u,p,!1,function(t){e("j9MR")},null,null).exports,h=e("/ocq");a.default.use(h.a);const v=new h.a({mode:"history",base:"/admin",routes:[{path:"/",name:"Homepage",component:function(t){e.e(3).then(function(){var s=[e("lO7g")];t.apply(null,s)}.bind(this)).catch(e.oe)},meta:{title:"Dashboard",auth:!0}},{path:"/pages",name:"Pages",component:function(t){e.e(6).then(function(){var s=[e("rZfT")];t.apply(null,s)}.bind(this)).catch(e.oe)},meta:{title:"Pages",auth:!0}},{path:"/page/*",name:"Page",component:function(t){e.e(0).then(function(){var s=[e("pMNZ")];t.apply(null,s)}.bind(this)).catch(e.oe)},meta:{title:"Page",auth:!0}},{path:"/templates",name:"Templates",component:function(t){e.e(1).then(function(){var s=[e("g2dq")];t.apply(null,s)}.bind(this)).catch(e.oe)},meta:{title:"Templates",auth:!0}},{path:"/integrations",name:"Integrations",component:function(t){e.e(5).then(function(){var s=[e("MEcO")];t.apply(null,s)}.bind(this)).catch(e.oe)},meta:{title:"Integrations",auth:!0}},{path:"/settings",name:"Settings",component:function(t){e.e(4).then(function(){var s=[e("niH5")];t.apply(null,s)}.bind(this)).catch(e.oe)},meta:{title:"Settings",auth:!0}},{path:"*",name:"NotFound",component:function(t){e.e(2).then(function(){var s=[e("YcJa")];t.apply(null,s)}.bind(this)).catch(e.oe)},meta:{title:"Page Not Found",auth:!1}}]});v.beforeEach((t,s,e)=>{document.title=t.meta.title,e()});var m=v,f=e("zL8q"),g=e.n(f),_=(e("tvR6"),e("wUZ8")),b=e.n(_),w=e("mtWM"),A=e.n(w),C=e("Rf8U"),y=e.n(C),P=new a.default,U=e("wvfG"),k=e.n(U);a.default.use(g.a,{locale:b.a}),a.default.use(y.a,A.a),a.default.use(k.a),a.default.config.productionTip=!1,a.default.prototype.$bus=P,a.default.filter("filterPageKey",function(t){return t?t.replace(".md",""):""}),new a.default({el:"#app",router:m,components:{App:d},template:"<App/>"})},YPrX:function(t,s){},aLme:function(t,s){},fIZs:function(t,s){},j9MR:function(t,s){},tvR6:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.0f730efe79ca825fb9a6.js.map