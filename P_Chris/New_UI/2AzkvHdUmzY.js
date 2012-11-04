/*1351602597,178142561*/

if (self.CavalryLogger) { CavalryLogger.start_js(["TYJHW"]); }

/** js/modules/core/sprintf.js */
__d("sprintf",[],function(a,b,c,d,e,f){













function g(h,i){__t([h,'string','str']);return __t([function(){
i=Array.prototype.slice.call(arguments,1);
var j=0;
return h.replace(/%s/g,function(k){
return i[j++];});}.

apply(this,arguments),'string']);}

e.exports=g;});

/** js/lib/primer.js */
__d("legacy:primer",["Primer"],function(a,b,c,d){



b('Primer');},

3);

/** js/window-comm.js */









WindowComm=
{_callbacks:{},

makeHandler:function(a,b){
b=b||'opener';

var c='f'+(Math.random()*(1<<30)).toString(16).replace('.','');
WindowComm._callbacks[c]=a;


return new URI('/connect/window_comm.php').
setQueryData({_id:c,_relation:b}).
getQualifiedURI().
toString();},


_recv:function(a){
var b=new URI(a).getQueryData();
WindowComm._callbacks[b._id](b);}};

/** js/popup_resizer.js */
__d("legacy:popup-resizer",["PopupWindow"],function(a,b,c,d){



a.PopupResizer=b('PopupWindow');},

3);

/** js/lib/net/error_signal.js */
__d("legacy:error-signal",["ErrorSignal"],function(a,b,c,d){



var e=b('ErrorSignal');
a.send_error_signal=e.sendErrorSignal;
a.logJSError=e.logJSError;},

3);

/** js/widget_arbiter.js */








WidgetArbiter=
{_findSiblings:function(){

if(WidgetArbiter._siblings)
return;

WidgetArbiter._siblings=[];

for(var a=parent.frames.length-1;a>=0;a--)

try{if(parent.frames[a]&&
parent.frames[a].Arbiter&&
parent.frames[a].Arbiter.inform)
WidgetArbiter._siblings.push(parent.frames[a].Arbiter);}catch(

b){


}},










inform:function(){
WidgetArbiter._findSiblings();
var a=$A(arguments);
WidgetArbiter._siblings.forEach(function(b){
b.inform.apply(b,a);});}};

/** js/widgets/opt_in_popup.js */








var PlatformOptInPopup=function(){};

copyProperties(PlatformOptInPopup,
{DIALOG_URL:'/connect/uiserver.php',
DIALOG_WIDTH:420,
DIALOG_HEIGHT:450,
APP_ID:127760087237610,











open:function(a,b,c){
if(!a)
a='generic';

if(!b)
b='plugin.optin';


var d=new URI(PlatformOptInPopup.DIALOG_URL);
d.addQueryData
({social_plugin:a,
method:b,
display:'popup',
secure:URI.getRequestURI().isSecure(),
app_id:PlatformOptInPopup.APP_ID});


if(c)
d.addQueryData(c);


return PopupResizer.open(d.toString(),
PlatformOptInPopup.DIALOG_WIDTH,
PlatformOptInPopup.DIALOG_HEIGHT);}});

/** js/modules/Log.js */
__d("Log",["sprintf"],function(a,b,c,d,e,f){













var g=b('sprintf'),

h=
{DEBUG:3,
INFO:2,
WARNING:1,
ERROR:0};


function i(k,l){
var m=Array.prototype.slice.call(arguments,2),
n=g.apply(null,m),
o=window.console;
if(o&&j.level>=k)
o[l in o?l:'log'](n);}



var j=



{level:-1,






Level:h,








debug:i.bind(null,h.DEBUG,'debug'),
info:i.bind(null,h.INFO,'debug'),
warn:i.bind(null,h.WARNING,'debug'),
error:i.bind(null,h.ERROR,'debug')};

e.exports=j;});

/** js/modules/resolveWindow.js */
__d("resolveWindow",[],function(a,b,c,d,e,f){














function g(h){
var i=window,
j=h.split('.');


try{for(var l=0;l<j.length;l++){
var m=j[l],

n=/^frames\[['"]?([a-zA-Z0-9\-_]+)['"]?\]$/.exec(m);

if(n){
i=i.frames[n[1]];}else
if(m==='opener'||m==='parent'||m==='top'){
i=i[m];}else 

return null;}}catch(


k){
return null;}


return i;}


e.exports=g;});

/** js/modules/XD.js */
__d("XD",["function-extensions","Arbiter","DOM","DOMDimensions","Log","URI","UserAgent","copyProperties","isInIframe","resolveWindow"],function(a,b,c,d,e,f){









b('function-extensions');

var g=b('Arbiter'),
h=b('DOM'),
i=b('DOMDimensions'),
j=b('Log'),
k=b('URI'),
l=b('UserAgent'),

m=b('copyProperties'),
n=b('isInIframe'),
o=b('resolveWindow'),

p='fb_xdm_frame_'+location.protocol.replace(':',''),

q=
{_callbacks:[],
_opts:
{autoResize:false,
allowShrink:true,
channelUrl:null,
hideOverflow:false,
resizeTimeout:1000,
resizeWidth:false,
expectResizeAck:false,
resizeAckTimeout:6000},


_lastResizeAckId:0,
_resizeCount:0,
_resizeTimestamp:0,
_shrinker:null,




init:function(s){



this._opts=m(m({},this._opts),s);

if(this._opts.autoResize)
this._startResizeMonitor();



g.subscribe
('Connect.Unsafe.resize.ack',
function(t,u){
if(!u.id)
u.id=this._resizeCount;

if(u.id>this._lastResizeAckId)
this._lastResizeAckId=u.id;}.

bind(this));},








send:function(s,t){



t=t||this._opts.channelUrl;

if(!t)
return;


var u={},
v=new k(t);
m(u,s);
m(u,k.explodeQuery(v.getFragment()));
var w=new k(u.origin),
x=w.getDomain()+
(w.getPort()?':'+w.getPort():''),


y=o(u.relation.replace(/^parent\./,'')),
z=y.frames[p];
z?z.proxyMessage(k.implodeQuery(u),[x]):



j.warn('No such frame "'+p+'" to proxyMessage to');},







_computeSize:function(){
var s=i.getDocumentDimensions(),

t=0;
if(this._opts.resizeWidth){

var u=document.body;
if(u.clientWidth<u.scrollWidth){
t=s.width;}else{


var v=u.childNodes;
for(var w=0;w<v.length;w++){
var x=v[w],
y=x.offsetLeft+x.offsetWidth;
if(y>t)
t=y;}}




t=Math.max(t,q.forced_min_width);}

s.width=t;

if(this._opts.allowShrink){


if(!this._shrinker)
this._shrinker=h.create('div');

h.appendContent(document.body,this._shrinker);
s.height=Math.max(this._shrinker.offsetTop,0);}


return s;},






_startResizeMonitor:function(){

var s,
t=document.documentElement;


if(this._opts.hideOverflow){
t.style.overflow='hidden';
document.body.style.overflow='hidden';}



var u=(function(){
var v=this._computeSize(),

w=Date.now(),
x=this._lastResizeAckId<this._resizeCount&&
(w-this._resizeTimestamp)>this._opts.resizeAckTimeout;

if(!s||
(this._opts.expectResizeAck&&x)||
(this._opts.allowShrink&&s.width!=v.width)||
(!this._opts.allowShrink&&s.width<v.width)||
(this._opts.allowShrink&&s.height!=v.height)||
(!this._opts.allowShrink&&s.height<v.height)){
s=v;
this._resizeCount++;
this._resizeTimestamp=w;

var y=
{type:'resize',
height:v.height,
ackData:
{id:this._resizeCount}};



if(v.width&&v.width!=0)
y.width=v.width;


try{if(k(document.referrer).isFacebookURI()&&
n()&&
window.name&&
window.parent.location&&
window.parent.location.toString&&
k(window.parent.location).isFacebookURI()){


var aa=window.parent.document.getElementsByTagName('iframe');
for(var ba=0;ba<aa.length;ba=ba+1)
if(aa[ba].name==window.name){
if(this._opts.resizeWidth)
aa[ba].style.width=y.width+'px';


aa[ba].style.height=y.height+'px';}}






this.send(y);}catch(
z){
this.send(y);}}}).


bind(this);

u();

setInterval(u,this._opts.resizeTimeout);}},







r=m({},q);

e.exports.UnverifiedXD=r;
e.exports.XD=q;



a.UnverifiedXD=r;
a.XD=q;});

/** js/connect_xd.js */
__d("legacy:connect-xd",["XD"],function(a,b,c,d){



a.UnverifiedXD=b('XD').UnverifiedXD;
a.XD=b('XD').XD;},

3);

/** js/sdk/ManagedError.js */
__d("ManagedError",[],function(a,b,c,d,e,f){












function g(h,i){
Error.prototype.constructor.call(this,h);
this.message=h;
this.innerError=i;}

g.prototype=new Error();
g.prototype.constructor=g;

e.exports=g;});

/** js/sdk/AssertionError.js */
__d("AssertionError",["ManagedError"],function(a,b,c,d,e,f){






var g=b('ManagedError');

function h(i){
g.prototype.constructor.apply(this,arguments);}

h.prototype=new g();
h.prototype.constructor=h;

e.exports=h;});

/** js/sdk/Assert.js */
__d("Assert",["AssertionError","sprintf"],function(a,b,c,d,e,f){






var g=b('AssertionError'),

h=b('sprintf');









function i(p,q){
if(!p)
throw new g(q);

return p;}











function j(p,q,r){
var s;

if(q===undefined){
s='undefined';}else
if(q===null){
s='null';}else{

var t=Object.prototype.toString.call(q);
s=/\s(\w*)/.exec(t)[1].toLowerCase();}


i
(~p.indexOf(s),
r||h('Expression is of type %s, not %s',s,p));

return q;}











function k(p,q,r){
i
(q instanceof p,
r||'Expression not instance of type');

return q;}


var l=
{isInstanceOf:k,
isTrue:i,
type:j,
define:function(p,q){
l.isString(p);
l.isFunction(q);

p=p.substring(0,1).toUpperCase()+
p.substring(1).toLowerCase();

l['is'+p]=function(r,s){
i(q(r),s);};}},




m=
['Array',
'Boolean',
'Date',
'Function',
'Null',
'Number',
'Object',
'Regexp',
'String',
'Undefined'],


n=m.length;
while(n--){
var o=m[n];
l['is'+o]=j.bind(null,o.toLowerCase());}


e.exports=l;});

/** js/modules/wrapFunction.js */
__d("wrapFunction",["Assert"],function(a,b,c,d,e,f){











var g=b('Assert'),

h={};
function i(j,k,l){
g.isFunction(j);
k=k||'default';

return function(){
var m=k in h?
h[k](j,l):
j;

return m.apply(this,arguments);};}



i.setWrapper=function(j,k){
g.isFunction(j);
k=k||'default';
h[k]=j;};


e.exports=i;});

/** js/modules/DOMEventListener.js */
__d("DOMEventListener",["wrapFunction"],function(a,b,c,d,e,f){



















var g=b('wrapFunction'),

h,i;

if(window.addEventListener){


h=function(k,l,m){__t([l,'string','name'],[m,'function','listener']);
m.wrapper=g(m,'entry',k+':'+l);
k.addEventListener(l,m.wrapper,false);};

i=function(k,l,m){__t([l,'string','name'],[m,'function','listener']);
k.removeEventListener(l,m.wrapper,false);};}else


if(window.attachEvent){


h=function(k,l,m){__t([l,'string','name'],[m,'function','listener']);
m.wrapper=g(m,'entry',k+':'+l);
k.attachEvent('on'+l,m.wrapper);};

i=function(k,l,m){__t([l,'string','name'],[m,'function','listener']);
k.detachEvent('on'+l,m.wrapper);};}




var j=











{add:function(k,l,m){__t([l,'string','name'],[m,'function','listener']);


h(k,l,m);




return {remove:function(){
i(k,l,m);
k=null;}};},











remove:i};


e.exports=j;});

/** js/modules/PopupWindow.js */
__d("PopupWindow",["DOMDimensions","DOMQuery","UserAgent","copyProperties"],function(a,b,c,d,e,f){






var g=b('DOMDimensions'),
h=b('DOMQuery'),
i=b('UserAgent'),

j=b('copyProperties'),

k=
{_opts:
{allowShrink:true,
strategy:'vector',
timeout:100,
widthElement:null},












init:function(l){
j(k._opts,l);
setInterval(k._resizeCheck,k._opts.timeout);},





_resizeCheck:function(){

var l=g.getViewportDimensions(),
m=k._getDocumentSize(),
n=m.height-l.height,
o=m.width-l.width;


if(o<0&&!k._opts.widthElement)
o=0;

o=o>1?o:0;

if(!k._opts.allowShrink&&n<0)
n=0;



if(n||o)

try{if(window.console&&window.console.firebug)
emptyFunction
('Resizing will not work in firefox with firebug enabled. '+
'See https://bugzilla.mozilla.org/show_bug.cgi?id=691693');

window.resizeBy(o,n);
if(o)
window.moveBy(o/-2,0);}catch(

p){




}},








_getDocumentSize:function(){
var l=g.getDocumentDimensions();


if(k._opts.strategy==='offsetHeight')
l.height=document.body.offsetHeight;



if(k._opts.widthElement){
var m=h.scry(document.body,k._opts.widthElement)[0];
if(m)
l.width=g.getElementDimensions(m).width;}



if(window.Dialog&&Dialog.max_bottom&&Dialog.max_bottom>l.height)
l.height=Dialog.max_bottom;


return l;},





open:function(l,m,n){


var o=typeof window.screenX!='undefined'?
window.screenX:
window.screenLeft,
p=typeof window.screenY!='undefined'?
window.screenY:
window.screenTop,
q=typeof window.outerWidth!='undefined'?
window.outerWidth:
document.body.clientWidth,
r=typeof window.outerHeight!='undefined'?
window.outerHeight:
(document.body.clientHeight-22),
s=parseInt(o+((q-n)/2),10),
t=parseInt(p+((r-m)/2.5),10),
u=
('width='+n+
',height='+m+
',left='+s+
',top='+t);

return window.open(l,'_blank',u);}};




e.exports=k;});

/** js/plugins/PluginMessage.js */
__d("PluginMessage",["DOMEventListener"],function(a,b,c,d,e,f){



var g=b('DOMEventListener'),




h=
{listen:function(){
g.add(window,'message',function(event){
if((/\.facebook\.com$/).test(event.origin)&&
/^FB_POPUP:/.test(event.data)){
var i=JSON.parse(event.data.substring(9));
if('reload' in i)
document.location.replace(i.reload);}});}};






e.exports=h;});

/** js/plugins/PluginOptin.js */
__d("PluginOptin",["DOMEvent","DOMEventListener","PluginMessage","PopupWindow","URI","bind","copyProperties"],function(a,b,c,d,e,f){



















































var g=b('DOMEvent'),
h=b('DOMEventListener'),
i=b('PluginMessage'),
j=b('PopupWindow'),
k=b('URI'),
l=b('bind'),
m=b('copyProperties');


function n(o){
m
(this,


{return_params:k.getRequestURI().getQueryData(),
login_params:{},
optin_params:{},
plugin:o});

this.addReturnParams({ret:'optin'});





delete this.return_params.hash;}


m
(n.prototype,

{addReturnParams:function(o){
m(this.return_params,o);
return this;},


addLoginParams:function(o){
m(this.login_params,o);
return this;},


addOptinParams:function(o){
m(this.optin_params,o);
return this;},


start:function(){
var o=new k('/dialog/plugin.optin').
addQueryData(this.optin_params).addQueryData

({display:'popup',
app_id:127760087237610,
secure:k.getRequestURI().isSecure(),
social_plugin:this.plugin,
return_params:JSON.stringify(this.return_params),
login_params:JSON.stringify(this.login_params)});


this.popup=j.open(o.toString(),420,450);
i.listen();
return this;}});



n.starter=function(o,p,q,r){
var s=new n(o);
s.addReturnParams(p||{});
s.addLoginParams(q||{});
s.addOptinParams(r||{});
return l(s,s.start);};


n.listen=function(o,p,q,r,s){
h.add(o,'click',function(t){
new g(t).kill();
n.starter(p,q,r,s)();});};



e.exports=n;});

/** js/modules/curry.js */
__d("curry",["bind"],function(a,b,c,d,e,f){



var g=b('bind'),








h=g(null,g,null);

e.exports=h;});

/** js/plugins/UnverifiedXD.js */
__d("UnverifiedXD",["XD","XDUnverifiedChannel"],function(a,b,c,d,e,f){








var g=b('XD').UnverifiedXD,
h=c('XDUnverifiedChannel').channel;

g.init({channelUrl:h});

e.exports=g;});

/** js/plugins/PluginXDReady.js */
__d("PluginXDReady",["Arbiter","UnverifiedXD"],function(a,b,c,d,e,f){



var g=b('Arbiter'),
h=b('UnverifiedXD'),

i=









{handleMessage:function(j){
if(!j.method)
return;


try{g.inform
('Connect.Unsafe.'+j.method,
JSON.parse(j.params),
g.BEHAVIOR_PERSISTENT);}catch(
k){

}}};




a.XdArbiter=i;

h.send({xd_action:'plugin_ready',name:window.name});



e.exports=null;});

/** js/plugins/PluginResize.js */
__d("PluginResize",["Log","UnverifiedXD","bind","copyProperties","curry"],function(a,b,c,d,e,f){






































var g=b('Log'),
h=b('UnverifiedXD'),
i=b('bind'),
j=b('copyProperties'),
k=b('curry');

function l(o){
o=o||document.body;
return o.offsetWidth+o.offsetLeft;}


function m(o){
o=o||document.body;
return o.offsetHeight+o.offsetTop;}


function n(o,p,event){
this.calcWidth=o||l;
this.calcHeight=p||m;
this.width=undefined;
this.height=undefined;
this.event=event||'resize';}


j
(n.prototype,

{resize:function(){
var o=this.calcWidth(),p=this.calcHeight();
if(o!==this.width||p!==this.height){
g.debug('Resizing Plugin: (%s, %s, %s)',o,p,this.event);
this.width=o;
this.height=p;
h.send({type:this.event,width:o,height:p});}

return this;},


auto:function(o){
setInterval(i(this,this.resize),o||250);
return this;}});




n.auto=function(o,event,p){
return new n
(k(l,o),
k(m,o),
event).
resize().auto(p);};


n.autoHeight=function(o,p,event,q){
return new n
(function(){return o;},
k(m,p),
event).
resize().auto(q);};


e.exports=n;});

/** js/plugins/PluginPerms.js */
__d("PluginPerms",["DOMEvent","DOMEventListener","PluginMessage","PopupWindow","URI","bind","copyProperties"],function(a,b,c,d,e,f){















































var g=b('DOMEvent'),
h=b('DOMEventListener'),
i=b('PluginMessage'),
j=b('PopupWindow'),
k=b('URI'),
l=b('bind'),
m=b('copyProperties');


function n(o,p){
m
(this,
{return_params:k.getRequestURI().getQueryData(),
login_params:{},
perms_params:{},
perms:[],
plugin:o,
app:p});

this.addReturnParams({ret:'perms'});





delete this.return_params.hash;}


m
(n.prototype,

{addReturnParams:function(o){
m(this.return_params,o);},


addLoginParams:function(o){
m(this.login_params,o);},


addPermsParams:function(o){
m(this.perms_params,o);},


addPerms:function(o){
this.perms.push.apply(this.perms,o);},


start:function(){
var o=k('/dialog/plugin.perms').
addQueryData(this.perms_params).addQueryData

({display:'popup',
app_id:this.app,
perms:this.perms.join(','),
secure:k.getRequestURI().isSecure(),
social_plugin:this.plugin,
return_params:JSON.stringify(this.return_params),
login_params:JSON.stringify(this.login_params)});

this.popup=j.open(o.toString(),210,450);
i.listen();}});



n.starter=function(o,p,q,r,s,t){
var u=new n(o,p);
u.addReturnParams(r||{});
u.addLoginParams(s||{});
u.addPermsParams(t||{});
u.addPerms(q||[]);
return l(u,u.start);};


n.listen=function(o,p,q,r,s,t,u){
h.add(o,'click',function(v){
new g(v).kill();
n.starter(p,q,r,s,t,u)();});};



e.exports=n;});

/** js/plugins/PluginShareButton.js */
__d("PluginShareButton",["DOMEvent","DOMEventListener","PluginResize","PopupWindow","UserAgent"],function(a,b,c,d,e,f){



var g=b('DOMEvent'),
h=b('DOMEventListener'),
i=b('PluginResize'),
j=b('PopupWindow'),
k=b('UserAgent'),

l=
{listen:function(m,n){
var o=m.href;
h.add(m,'click',function(p){
new g(p).kill();
j.open(o,340,670);});},



resize:function(m){
var n=k.firefox()||k.ie()>=9?1:0;
new i
(function(){return m.offsetWidth+m.offsetLeft+n;},
function(){return m.offsetHeight+m.offsetTop;}).
resize().auto();}};



e.exports=l;});
