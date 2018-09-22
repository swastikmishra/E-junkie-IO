webpackJsonp([2],{"7Sqf":function(e,t){},niH5:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"Settings",data:()=>({account:null,website:null}),mounted:function(){var e=this;this.axios.post(window.Config.API.endpoint+"settings",{}).then(t=>{e.account=t.data.account,e.website=t.data.website}).catch(e=>{})},watch:{},methods:{saveChanges:function(e){var t=this.$loading({lock:!0,text:"Updating",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),s=this,a={};"account"==e?a.account=s.account:a.website=s.website,this.axios.post(window.Config.API.endpoint+"settings/save",{settings:a}).then(e=>{setTimeout(()=>{t.close()},100),s.account=e.data.account,s.website=e.data.website,s.$message({showClose:!0,message:"Settings saved successfully.",type:"success"})}).catch(e=>{setTimeout(()=>{t.close()},100)})}},destroyed:function(){}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"settings"}},[s("div",{staticClass:"columns is-multiline"},[s("div",{staticClass:"column is-6"},[s("div",{staticClass:"box details"},[e._m(0),e._v(" "),s("div",{staticClass:"box-content"},[e.account?s("el-form",{ref:"account",attrs:{model:e.account,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"Username"}},[s("el-input",{attrs:{disabled:!0,clearable:""},model:{value:e.account.username,callback:function(t){e.$set(e.account,"username",t)},expression:"account.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Name"}},[s("el-input",{attrs:{clearable:""},model:{value:e.account.name,callback:function(t){e.$set(e.account,"name",t)},expression:"account.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Email"}},[s("el-input",{attrs:{clearable:""},model:{value:e.account.email,callback:function(t){e.$set(e.account,"email",t)},expression:"account.email"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Password"}},[s("el-input",{attrs:{type:"password",clearable:""},model:{value:e.account.password,callback:function(t){e.$set(e.account,"password",t)},expression:"account.password"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.saveChanges("account")}}},[e._v("Save")])],1)],1):e._e()],1)])]),e._v(" "),s("div",{staticClass:"column is-6"},[s("div",{staticClass:"box details"},[e._m(1),e._v(" "),s("div",{staticClass:"box-content"},[e.website?s("el-form",{ref:"website",attrs:{model:e.website,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"Domain"}},[s("el-input",{attrs:{clearable:""},model:{value:e.website.domain,callback:function(t){e.$set(e.website,"domain",t)},expression:"website.domain"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"SSL"}},[s("el-switch",{model:{value:e.website.ssl,callback:function(t){e.$set(e.website,"ssl",t)},expression:"website.ssl"}})],1),e._v(" "),s("el-form-item",[s("p",{staticStyle:{"font-size":"14px"}},[e._v("Site wide properties (Access them through {Site} template variables)")])]),e._v(" "),s("el-form-item",{attrs:{label:"Title"}},[s("el-input",{attrs:{clearable:""},model:{value:e.website.title,callback:function(t){e.$set(e.website,"title",t)},expression:"website.title"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Author"}},[s("el-input",{attrs:{clearable:""},model:{value:e.website.author,callback:function(t){e.$set(e.website,"author",t)},expression:"website.author"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Description"}},[s("el-input",{attrs:{clearable:""},model:{value:e.website.description,callback:function(t){e.$set(e.website,"description",t)},expression:"website.description"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Logo"}},[s("el-input",{attrs:{placeholder:"Upload logo in assets and paste the link here",clearable:""},model:{value:e.website.logo,callback:function(t){e.$set(e.website,"logo",t)},expression:"website.logo"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Keywords"}},[s("el-input",{attrs:{clearable:""},model:{value:e.website.keywords,callback:function(t){e.$set(e.website,"keywords",t)},expression:"website.keywords"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"Homepage"}},[s("el-input",{attrs:{clearable:""},model:{value:e.website.home,callback:function(t){e.$set(e.website,"home",t)},expression:"website.home"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.saveChanges("website")}}},[e._v("Save")])],1)],1):e._e()],1)])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"box-title"},[t("i",{staticClass:"icon ion-ios-person"}),this._v("\n          Account Settings\n        ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"box-title"},[t("i",{staticClass:"icon ion-ios-cog"}),this._v("\n          Website Settings\n        ")])}]};var l=s("VU/8")(a,i,!1,function(e){s("7Sqf")},null,null);t.default=l.exports}});
//# sourceMappingURL=2.6cd27a33f94eafe13cd0.js.map