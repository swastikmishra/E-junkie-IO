webpackJsonp([1],{g2dq:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"Templates",data:()=>({Templates:null,Template:null,showTemplates:!0,editor:!0,preview:!1,savingTemplate:!1,codeMirror:null,selectedTheme:"monokai",selectedFontSize:14,wordWrap:!1,availableThemes:["default","3024-day","3024-night","abcdef","ambiance","base16-dark","base16-light","bespin","blackboard","cobalt","colorforth","darcula","dracula","duotone-dark","duotone-light","eclipse","elegant","erlang-dark","gruvbox-dark","hopscotch","icecoder","idea","isotope","lesser-dark","liquibyte","lucario","material","mbo","mdn-like","midnight","monokai","neat","neo","night","oceanic-next","panda-syntax","paraiso-dark","paraiso-light","pastel-on-dark","railscasts","rubyblue","seti","shadowfox","solarized dark","solarized light","the-matrix","tomorrow-night-bright","tomorrow-night-eighties","ttcn","twilight","vibrant-ink","xq-dark","xq-light","yeti","zenburn"]}),watch:{preview:function(e){this.editor||this.showTemplates||this.preview||(this.editor=!0)},editor:function(e){this.editor||this.showTemplates||this.preview||(this.editor=!0),this.injectCodeMirror()},showTemplates:function(e){this.editor||this.showTemplates||this.preview||(this.editor=!0)},selectedTheme:function(e){this.myCodeMirror.setOption("theme",e)},wordWrap:function(e){this.myCodeMirror.setOption("lineWrapping",e)}},mounted:function(){this.$notify.info({title:"Ctrl+S",message:"Save the page by pressing Ctrl + S"});var e=this;this.converter=new showdown.Converter,window.addEventListener("keydown",e.keyboardEvent,!1),this.axios.post("/api/templates",{}).then(t=>{e.Templates=t.data}).catch(e=>{console.log(e)})},methods:{keyboardEvent:function(e){if("s"==e.key&&e.ctrlKey){if(e.preventDefault(),this.savingTemplate)return!1;this.saveTemplate()}},getTemplate:function(e){if("new"==e)return this.Template={key:"",template:""},this.injectCodeMirror(),!1;var t=this.$loading({lock:!0,text:"Updating",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),a=this;this.axios.post("/api/template",{key:e}).then(e=>{a.Template=e.data,a.injectCodeMirror(),setTimeout(()=>{t.close()},100)}).catch(e=>{setTimeout(()=>{t.close()},100)})},saveTemplate:function(e){if("new"==(a=this).Template.key)return a.$message({showClose:!0,message:"Not a valid template name",type:"warning"}),!1;if(!this.myCodeMirror)return!1;this.savingTemplate=!0;var t=this.$loading({lock:!0,text:"Saving",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),a=this;this.axios.post("/api/template/save",{key:a.Template.key,template:a.myCodeMirror.getValue()}).then(e=>{a.Template=e.data.Template,a.Templates=e.data.Templates,a.$message({showClose:!0,message:"Template saved successfully",type:"success"}),setTimeout(()=>{t.close()},100),this.savingTemplate=!1}).catch(e=>{setTimeout(()=>{t.close()},100),this.savingTemplate=!1})},deleteTemplate:function(e){this.savingTemplate=!0;var t=this.$loading({lock:!0,text:"Deleting",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),a=this;this.axios.post("/api/template/delete",{key:a.Template.key}).then(e=>{a.Templates=e.data,a.Template=null,a.$message({showClose:!0,message:"Template deleted !",type:"danger"}),setTimeout(()=>{t.close()},100),this.savingTemplate=!1}).catch(e=>{setTimeout(()=>{t.close()},100),this.savingTemplate=!1})},injectCodeMirror:function(){var e=this;setTimeout(function(){CodeMirror.keyMap.sublime;var t=document.getElementById("templateEditorTextarea");if(e.myCodeMirror)return e.myCodeMirror.setValue(e.Template.template),!1;e.myCodeMirror=CodeMirror(function(e){t.parentNode.replaceChild(e,t)},{value:e.Template.template,lineNumbers:!0,mode:"text/html",keyMap:"sublime",autoCloseBrackets:!0,matchBrackets:!0,showCursorWhenSelecting:!0,tabSize:2,theme:"monokai",matchTags:{bothTags:!0},extraKeys:{"Ctrl-J":"toMatchingTag"}}),e.myCodeMirror.setSize(null,600)},1e3)}},destroyed:function(){window.removeEventListener("keydown",this.keyboardEvent)}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"templates"}},[a("div",{staticClass:"columns is-multiline"},[a("div",{class:{column:!0,"is-2":e.showTemplates,"is-1":!e.showTemplates}},[a("div",{staticClass:"box details"},[a("div",{staticClass:"box-title"},[a("i",{staticClass:"icon ion-md-brush"}),e._v(" "),a("i",{class:{active:e.showTemplates,"icon is-pulled-right":!0,"ion-md-arrow-dropright-circle":!e.showTemplates,"ion-md-arrow-dropleft-circle":e.showTemplates},on:{click:function(t){e.showTemplates=!e.showTemplates}}}),e._v("\n\t\t  \t\t\tTemplates\n\t\t  \t\t")]),e._v(" "),e.Templates&&e.showTemplates?a("div",{staticClass:"box-content templatesList"},[a("el-button",{attrs:{type:"danger",plain:""},on:{click:function(t){e.getTemplate("new")}}},[e._v("Add New Template")]),e._v(" "),e._l(e.Templates,function(t,i){return a("el-button",{attrs:{type:"danger",plain:""},on:{click:function(a){e.getTemplate(t)}}},[e._v(e._s(t))])})],2):e._e()])]),e._v(" "),a("div",{class:{"column editor":!0,"is-10":e.showTemplates,"is-11":!e.showTemplates}},[a("div",{staticClass:"box details"},[a("div",{staticClass:"box-title"},[a("i",{staticClass:"icon ion-md-create"}),e._v(" "),e._v("\n\t\t  \t\t\tEditor \n\t\t  \t\t\t"),e.Template?a("el-input",{attrs:{placeholder:"Template Name",size:"mini",clearable:""},model:{value:e.Template.key,callback:function(t){e.$set(e.Template,"key",t)},expression:"Template.key"}}):e._e()],1),e._v(" "),e.Template&&e.editor?a("div",{staticClass:"box-content"},[a("div",{staticStyle:{"margin-bottom":"10px",display:"block","text-align":"right"}},[a("el-switch",{staticStyle:{display:"inline-block","margin-right":"10px","margin-top":"-3px"},attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","active-text":"Wordwrap","inactive-text":""},model:{value:e.wordWrap,callback:function(t){e.wordWrap=t},expression:"wordWrap"}}),e._v(" "),a("el-input-number",{attrs:{min:10,max:20,step:2,size:"mini"},model:{value:e.selectedFontSize,callback:function(t){e.selectedFontSize=t},expression:"selectedFontSize"}}),e._v(" "),a("el-select",{attrs:{placeholder:"Select Theme",size:"mini"},model:{value:e.selectedTheme,callback:function(t){e.selectedTheme=t},expression:"selectedTheme"}},e._l(e.availableThemes,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),e._v(" "),a("el-button",{attrs:{size:"small",icon:"el-icon-circle-check",type:"success",plain:"",loading:e.savingTemplate},on:{click:function(t){e.saveTemplate()}}},[e._v("Save")]),e._v(" "),a("el-button",{attrs:{size:"small",icon:"el-icon-delete",type:"warning",plain:"",loading:e.savingTemplate},on:{click:function(t){e.deleteTemplate()}}},[e._v("Delete")]),e._v(" "),a("el-button",{attrs:{size:"small",icon:"el-icon-circle-close",type:"danger",plain:""},on:{click:function(t){e.Template=null}}},[e._v("Discard")])],1),e._v(" "),a("div",{style:{fontSize:e.selectedFontSize+"px"}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.Template.template,expression:"Template.template"}],attrs:{id:"templateEditorTextarea"},domProps:{value:e.Template.template},on:{input:function(t){t.target.composing||e.$set(e.Template,"template",t.target.value)}}})])]):e._e()])])])])},staticRenderFns:[]};var l=a("VU/8")(i,s,!1,function(e){a("v6qH")},"data-v-72701878",null);t.default=l.exports},v6qH:function(e,t){}});
//# sourceMappingURL=1.5d2d1083c5881678a487.js.map