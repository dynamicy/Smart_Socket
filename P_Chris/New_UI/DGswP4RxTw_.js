/*1351526991,178142523*/

if (self.CavalryLogger) { CavalryLogger.start_js(["xYztC"]); }

/** js/modules/HighContrastMode.js */
__d("HighContrastMode",["AsyncSignal","Cookie","CSS","DOM","Style"],function(a,b,c,d,e,f){



var g=b('AsyncSignal'),
h=b('Cookie'),
i=b('CSS'),
j=b('DOM'),
k=b('Style'),

l=null,

m=
{init:function(n){
if(l!==null&&n!=l)
return;


var o=j.create('div');
o.style.cssText=
'border: 1px solid;'+
'border-color: red green;'+
'position: fixed;'+
'height: 5px;'+
'top: -999px;'+
'background-image: url(/images/spacer.gif);';

j.appendContent(document.body,o);

var p=k.get(o,'background-image'),
q=k.get(o,'border-top-color'),
r=k.get(o,'border-right-color'),
s=q==r||
(p&&(p=='none'||p=='url(invalid-url:)'));

if(s!=n){
i.conditionClass(document.documentElement,'highContrast',s);
h.set('hcm',s?1:0);
if(s)
new g('/ajax/highcontrast').send();}



j.remove(o);
l=s;}};



e.exports=m;});

/** js/ufi/tracking.js */






function ufi_add_ft_hidden_node(a){
if(a.link_data)
return;

var b=collect_data_attribs(a,['ft']).ft;
if(Object.keys(b).length){
var c=DOM.create('input',{type:'hidden',
name:'link_data',
value:JSON.stringify(b)});
a.appendChild(c);}}



function ufi_add_all_link_data(){
Bootloader.loadComponents('dom-collect',function(){
DOM.scry(document.body,'form.commentable_item').
forEach(ufi_add_ft_hidden_node);});}



function question_add_all_link_data(){
Bootloader.loadComponents('dom-collect',function(){
DOM.scry(document.body,'form.fbEigenpollForm').
forEach(ufi_add_ft_hidden_node);
DOM.scry(document.body,'form.fbQuestionPollForm').
forEach(ufi_add_ft_hidden_node);});}
