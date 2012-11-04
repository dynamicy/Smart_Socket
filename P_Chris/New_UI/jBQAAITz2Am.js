/*1351602741,173213725*/

if (self.CavalryLogger) { CavalryLogger.start_js(["lPH8M"]); }

/** js/lib/util/data_store.js */
__d("legacy:data-store",["DataStore"],function(a,b,c,d){






a.DataStore=a.DataStore||b('DataStore');},

3);

/** ads/units/js/base.js */












function EmuController(a,b){
this.impression=b;
this.containerId=a;

DataStore.set($(a),'emuController',this);

return this;}


copyProperties(EmuController,
{fromContainer:function(a){
var b=ge(a);
if(!b)
return null;

return DataStore.get(b,'emuController');},



getEventClass:function(a){
return "emuEvent"+String(a).trim();}});



copyProperties(EmuController.prototype,

{EVENT_HANDLER_PATH:'/ajax/emu/end.php',


CLICK:1,
FAN:"fad_fan",

event:function(a,b,c,d){
var e=
{eid:this.impression,
f:0,
ui:this.containerId,
en:a,
a:1};


if(b)
e.ed=JSON.stringify(b);


if(!d)
d=emptyFunction;



var f=new AsyncRequest().
setURI(this.EVENT_HANDLER_PATH).
setData(e).
setErrorHandler(d);
if(c)
f.setHandler(c);

f.send();},





redirect:function(){
var a=
{eid:this.impression,
f:0,
ui:this.containerId,
en:this.CLICK,
a:0,
sig:Math.floor(Math.random()*65535)+65536},

b=new URI(this.EVENT_HANDLER_PATH);
b.setQueryData(a);
goURI(b);}});

/** ads/units/js/shortclick.js */







var ShortClickHandlers=

{EVENT_NAME_CAME_BACK:'cameback',


onclicked:function(a){

if(this.onsite)
return;



if(a.button!==0||a.getModifiers().any)
return;



this.click_ts=(+new Date());


if(this.listeners!==undefined)
for(var b in this.listeners)
this.listeners[b].remove();





this.listeners=
{focus:Event.listen(window,
'focus',
ShortClickHandlers.oncameback.bind(this))};},




oncameback:function(a){

var b=(+new Date())-this.click_ts;



this.listeners[a.type].remove();


var c=
{click_ts:this.click_ts,
length:b,
trigger:a.type};



this.sendData(ShortClickHandlers.EVENT_NAME_CAME_BACK,c);}};

/** ads/units/js/tracking.js */










function EmuTracker(a,b){
this.base=EmuController.fromContainer(a);
if(!this.base)
emptyFunction('No EmuController: disabling component.');



this.onsite=b;


var c=DOM.scry($(a),"a."+
EmuController.getEventClass(EmuTracker.EVENT_CLICK));


c.forEach(function(d){
Event.listen(d,'click',ShortClickHandlers.onclicked.bind(this));}.
bind(this));

return this;}


copyProperties(EmuTracker,

{EVENT_CLICK:1});


copyProperties(EmuTracker.prototype,

{sendData:function(a,b){
this.base.event(a,b);}});

/** js/fbx/ui-side-nav-message.js */
__d("legacy:ui-side-nav-message",["NavigationMessage"],function(a,b,c,d){



a.NavigationMessage=b('NavigationMessage');},

3);

/** js/ui/xhp/navigation/side_nav_future.js */















function FutureSideNav(){
FutureSideNav.instance&&FutureSideNav.instance.uninstall();
FutureSideNav.instance=this;}


FutureSideNav.instance=null;
FutureSideNav.getInstance=function(){
return FutureSideNav.instance||new FutureSideNav();};


copyProperties(FutureSideNav.prototype,
{init:function(a,b,c){
this.root=a;
this.items={};
this.sections={};
this.editor=null;
this.editing=false;
this.selected=null;
this.loading=null;


this.keyParam='sk';
this.defaultKey=b;
this.uri=URI.getRequestURI();
this.ajaxPipe=c;
this.ajaxPipeEndpoints={};
this.sidecol=true;


this._installed=true;


this._handlePageTransitions=true;
PageTransitions.registerHandler(function(d){
return this._handlePageTransitions&&this.handlePageTransition(d);}.
bind(this));


this._eventHandlers=[];


this._arbiterSubscriptions=
[Arbiter.subscribe
(NavigationMessage.NAVIGATION_COMPLETED,
this.navigationComplete.bind(this)),

Arbiter.subscribe
(NavigationMessage.NAVIGATION_FAILED,
this.navigationFailed.bind(this)),

Arbiter.subscribe
(NavigationMessage.NAVIGATION_COUNT_UPDATE,
this.navigationCountUpdate.bind(this)),

Arbiter.subscribe
(NavigationMessage.NAVIGATION_SELECT,
this.navigationSelect.bind(this)),

Arbiter.subscribe
(ChannelConstants.getArbiterType('nav_update_counts'),
this.navigationCountUpdateFromPresence.bind(this))];




this._explicitHover=[];
this._ensureHover('sideNavItem');

this._eventHandlers.push
(Event.listen(window,'resize',this._handleResize.bind(this)));

this._checkNarrow();

this._selectorSubscriptions=[];
window.Selector&&this._selectorSubscriptions.push
(Selector.subscribe(['open','close'],function(d,e){
var f=Parent.byClass(e.selector,'sideNavItem');
f&&CSS.conditionClass(f,'editMenuOpened',d==='open');}));



onleaveRegister(this.uninstall.bind(this));

if(this._pendingSections)
this._pendingSections.forEach(function(d){
this.initSection.apply(this,d);}.
bind(this));},




_handleResize:(function(){
var a;
return function(){
a&&clearTimeout(a);
a=this._checkNarrow.bind(this).defer(200);};})

(),

_checkNarrow:function(){

CSS.conditionClass
(this.root,
'uiNarrowSideNav',
Vector2.getElementPosition(this.root).x<20);},



_ensureHover:function(a){
if(ua.ie()<8)
Bootloader.loadComponents('explicit-hover',function(){
this._explicitHover.push(new ExplicitHover(this.root,a));}.
bind(this));},






uninstall:function(){
if(this._installed){
this._installed=false;
this._handlePageTransitions=false;
this._arbiterSubscriptions.forEach(Arbiter.unsubscribe);
this._selectorSubscriptions.forEach(function(a){
Selector.unsubscribe(a);});

this._eventHandlers.forEach(function(a){
a.remove();});

this._explicitHover.forEach(function(a){
a.uninstall();});}},







initSection:function(a,b){
if(!this._installed){


this._pendingSections=this._pendingSections||[];
this._pendingSections.push(arguments);
return;}

this._initItems(b);
this._initSection(a);},


addItem:function(a,b){
this._initItem(a,b);},


_initItems:function(a){
var b=function(c,d){
var e=this._initItem(c,d);
if(c.children)
c.children.forEach(function(f){
b(f,e);});}.


bind(this);

$A(a).forEach(function(c){
b(c,null);});},



_initItem:function(a,b){
var c=this.items[a.id]=this._constructItem(a,b);



if(c.equals(this.selected)||a.selected)
this.setSelected(c);



var d=c.getLinkNode();
d&&this._eventHandlers.push
(Event.listen
(d,
'click',
function(event){
return !this.editing;}.
bind(this)));



return c;},


_initSection:function(a){
var b=this.sections[a.id]=this._constructSection(a);

this._eventHandlers.push(Event.listen
(b.node,
'click',
this.handleSectionClick.bind(this,b)));



DOM.scry(b.node,'div.bookmarksMenuButton').forEach(CSS.show);
return b;},



_constructItem:function(a,b){
return new FutureSideNavItem(a,b);},



_constructSection:function(a){
return new FutureSideNavSection(a);},





handleSectionClick:function(a,event){
var b=this._getEventTarget(event,'a'),
c=this._getItemForNode(b);

if(!b){
return;}else
if(CSS.hasClass(b.parentNode,'uiMenuItem')){
this._handleMenuClick(a,c,b.parentNode,event);}else 

this._handleLinkClick(a,b,event);},



_getEventTarget:function(event,a){
var b=event.getTarget();
if(b.tagName!==a.toUpperCase()){
return Parent.byTag(b,a);}else 

return b;},



_handleMenuClick:function(a,b,c,event){
if(CSS.hasClass(c,'rearrange'))
this.beginEdit(a);},



_handleLinkClick:function(a,b,event){
if(CSS.hasClass(b,'navEditDone')){
this.editing?this.endEdit():this.beginEdit(a);
event.kill();}},






getItem:function(a){
if(this._isCurrentPath(a)){
return this._getItemForKey
(this._getKey(a.getQueryData())||this.defaultKey);}else 


return this._getItemForPath(a.getPath());},






getNodeForKey:function(a){
var b=this._getItemForKey(a);
if(b)
return b.node;},



_isCurrentPath:function(a){
return a.getDomain()===this.uri.getDomain()&&
a.getPath()===this.uri.getPath();},


_getKey:function(a){
return a[this.keyParam];},


_getItemForNode:function(a){
a=Parent.byClass(a,'sideNavItem');
return a&&this.items[a.id];},


_getItemForKey:function(a){
return this._findItem(function(b){
return b.matchKey(a);});},



_getItemForPath:function(a){
return this._findItem(function(b){
return b.matchPath(a);});},



_findItem:function(a){
for(var b in this.items)
if(a(this.items[b]))
return this.items[b];},







removeItem:function(a){
if(a&&this.items[a.id]){
DOM.remove(a.node);
delete this.items[a.id];}},



removeItemByKey:function(a){
this.removeItem(this._getItemForKey(a));},


moveItem:function(a,b,c){
var d=DOM.find(a.node,'ul.uiSideNav');
(c?DOM.prependContent:DOM.appendContent)(d,b.node);},





setLoading:function(a){
this.loading&&this.loading.hideLoading();

this.loading=a;
this.loading&&this.loading.showLoading();},


setSelected:function(a){
this.setLoading(null);

if(this.selected){
this.selected.hideSelected();
this.selected.getTop().hideChildren();}


this.selected=a;
if(this.selected){
this.selected.showSelected();
this.selected.getTop().showChildren();}},







handlePageTransition:function(a){
var b=this.getItem(a),
c=b&&b.endpoint&&this._doPageTransition(b,a);

return c;},


_doPageTransition:function(a,b){
this.setLoading(a);
this._sendPageTransition
(a.endpoint,
copyProperties(this._getTransitionData(a,b),b.getQueryData()));

return true;},


_sendPageTransition:function(a,b){
b.endpoint=a;
Arbiter.inform(NavigationMessage.NAVIGATION_BEGIN,
{useAjaxPipe:this._useAjaxPipe(a),
params:b});},



_getTransitionData:function(a,b){
var c={};
c.sidecol=this.sidecol;
c.path=b.getPath();



c[this.keyParam]=a.textKey;
c.key=a.textKey;

return c;},


_useAjaxPipe:function(a){
return this.ajaxPipe||this.ajaxPipeEndpoints[a];},


navigationComplete:function(){
this.loading&&this.setSelected(this.loading);},


navigationFailed:function(){
this.setLoading(null);},


navigationSelect:function(a,b){
var c=this._getItemForKey(this._getKey(b));
if(b.asLoading){
this.setLoading(c);}else 

this.setSelected(c);},



navigationCountUpdate:function(a,b){
var c=this._getItemForKey(b&&b.key);
if(c)
if(typeof b.count!=="undefined"){
c.setCount(b.count,b.hide);}else
if(typeof b.increment!=="undefined")
c.incrementCount(b.increment,b.hide);},




navigationCountUpdateFromPresence:function(a,b){
b=b.obj;
if(b)
if(!b.class_name||
b.class_name&&CSS.hasClass(this.root,b.class_name))
if(b.items)
for(var c=0;c<b.items.length;c++)
this.navigationCountUpdate(a,b.items[c]);},









beginEdit:function(a){
if(!this.editing){
this.editing=true;
CSS.addClass(this.root,'editMode');
this._updateTrackingData();
Bootloader.loadComponents
('sortable-side-nav-js',
this._initEditor.bind(this,a));}},




endEdit:function(){
if(this.editing){
CSS.removeClass(this.root,'editMode');
this.editor.endEdit();
this.editor=null;
this.editing=false;
this._updateTrackingData();}},



_updateTrackingData:function(a){
var b=this.root.getAttribute('data-gt')||"{}";

try{b=JSON.parse(b);
if(this.editing){
b.editing=true;}else 

delete b.editing;

this.root.setAttribute('data-gt',JSON.stringify(b));}catch(
c){

}},


_initEditor:function(a){


this.editor=a.getEditor();
this.editor.beginEdit();}});




function FutureSideNavSection(a){
this.id=a.id;
this.node=this.node||$(a.id);
this.editEndpoint=a.editEndpoint;}


copyProperties(FutureSideNavSection.prototype,
{equals:function(a){
return a&&a.id===this.id;},


getEditor:function(){
return new SortableSideNav
(DOM.find(this.node,'ul.uiSideNav'),
this.editEndpoint);}});





function FutureSideNavItem(a,b){
this.id=a.id;
this.up=b;
this.endpoint=a.endpoint;
this.type=a.type;
this.node=a.node||$(a.id);
this.paths=a.path?$A(a.path):[];
this.keys=a.key?$A(a.key):[];

var c=this._findKeys(this.keys);
this.numericKey=c.numeric||this.keys[0];
this.textKey=c.text||this.keys[0];

this._pathPattern=this._buildRegex(this.paths);
this._keyPattern=this._buildRegex(this.keys);

this.hideLoading();
this.hideSelected();}


copyProperties(FutureSideNavItem.prototype,
{equals:function(a){
return a&&a.id===this.id;},


getLinkNode:function(){

return (DOM.scry(this.node,'a.item')[0]||
DOM.scry(this.node,'a.subitem')[0]);},







matchPath:function(a){
return this._matchInput(this._pathPattern,a);},


matchKey:function(a){
return this._matchInput(this._keyPattern,a);},


_matchInput:function(a,b){
var c=a&&a.exec(b);
return c&&c.slice(1);},





getTop:function(){
return this.isTop()?this:this.up.getTop();},


isTop:function(a){
return !this.up;},





setCount:function(a,b){
return this._updateCount(a,true);},


incrementCount:function(a,b){
return this._updateCount(a,false);},


_updateCount:function(a,b,c){
var d=DOM.scry(this.node,'span.count')[0],
e=d&&DOM.scry(d,'span.countValue')[0];

if(e){
var f=b?0:parseInt(DOM.getText(e),10),
g=Math.max(0,f+a),
h=this.isTop()?'hidden':'hiddenSubitem';


DOM.setContent(e,g);


c&&CSS.conditionClass(this.node,h,!g);
CSS.conditionClass(d,'hidden_elem',!g);
if(this.isTop()){
var i=DOM.scry(this.node,'div.linkWrap')[0];
if(i){
CSS.conditionClass(i,'noCount',!g);
CSS.conditionClass(i,'hasCount',g);}}}



Arbiter.inform('NavigationMessage.COUNT_UPDATE_DONE');},





showLoading:function(){
CSS.addClass(this.node,'loading');},


hideLoading:function(){
CSS.removeClass(this.node,'loading');},


showSelected:function(){
CSS.addClass(this.node,'selectedItem');
CSS.hasClass(this.node,'hider')&&CSS.addClass
(this._getExpanderParent(),
'expandedMode');},



hideSelected:function(){
CSS.removeClass(this.node,'selectedItem');},


showChildren:function(){
CSS.addClass(this.node,'open');},


hideChildren:function(){
CSS.removeClass(this.node,'open');},


_getExpanderParent:function(){
return Parent.byClass(this.node,'expandableSideNav');},





_buildRegex:function(a){
if(a.length){
var b=a.map(function(c){
if(typeof c==="string"){
return c.replace(/([^a-z0-9_])/ig,'\\$1');}else
if(c&&c.regex)
return c.regex;});


return new RegExp('^(?:'+b.join('|')+')$');}},







_findKeys:function(a){
var b=/^(app|group|fl)_/,
c={};

for(var d=0;d<a.length;d++){
var e=b.test(a[d]);
if(e&&!c.numeric){
c.numeric=a[d];}else
if(!e&&!c.text)
c.text=a[d];

if(c.numeric&&c.text)
break;}



return c;}});

/** js/modules/Base64.js */
__d("Base64",[],function(a,b,c,d,e,f){















var g=
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function h(l){
l=(l.charCodeAt(0)<<16)|(l.charCodeAt(1)<<8)|l.charCodeAt(2);
return String.fromCharCode
(g.charCodeAt(l>>>18),g.charCodeAt((l>>>12)&63),
g.charCodeAt((l>>>6)&63),g.charCodeAt(l&63));}





var i=
'>___?456789:;<=_______'+
'\0\1\2\3\4\5\6\7\b\t\n\13\f\r\16\17\20\21\22\23\24\25\26\27\30\31'+
'______\32\33\34\35\36\37 !"#$%&\'()*+,-./0123';
function j(l){
l=(i.charCodeAt(l.charCodeAt(0)-43)<<18)|
(i.charCodeAt(l.charCodeAt(1)-43)<<12)|
(i.charCodeAt(l.charCodeAt(2)-43)<<6)|
i.charCodeAt(l.charCodeAt(3)-43);
return String.fromCharCode(l>>>16,(l>>>8)&255,l&255);}


var k=
{encode:function(l){

l=unescape(encodeURI(l));
var m=(l.length+2)%3;
l=(l+'\0\0'.slice(m)).replace(/[\s\S]{3}/g,h);
return l.slice(0,l.length+m-2)+'=='.slice(m);},

decode:function(l){

l=l.replace(/[^A-Za-z0-9+\/]/g,'');
var m=(l.length+3)&3;
l=(l+'AAA'.slice(m)).replace(/..../g,j);
l=l.slice(0,l.length+m-3);

try{return decodeURIComponent(escape(l));}catch(
n){throw new Error('Not valid UTF-8');}},

encodeObject:function(l){
return k.encode(JSON.stringify(l));},

decodeObject:function(l){
return JSON.parse(k.decode(l));},


encodeNums:function(l){
return String.fromCharCode.apply(String,l.map(function(m){
return g.charCodeAt((m|-(m>63))&-(m>0)&63);}));}};




e.exports=k;});

/** js/lib/string/base64.js */
__d("legacy:base64",["Base64"],function(a,b,c,d){



a.Base64=b('Base64');},


3);

/** js/modules/ScrollingPager.js */
__d("ScrollingPager",["Arbiter","copyProperties","CSS","OnVisible","UIPagelet","$","ge"],function(a,b,c,d,e,f){



var g=b('Arbiter'),
h=b('copyProperties'),
i=b('CSS'),
j=b('OnVisible'),
k=b('UIPagelet'),

l=b('$'),
m=b('ge'),

n={};





















function o(p,
q,
r,
s){
this.scroll_loader_id=p;
this.pagelet_src=q;
this.data=r;
this.options=s||{};

if(this.options.target_id){
this.target_id=this.options.target_id;
this.options.append=true;}else 

this.target_id=p;


this.handler=null;}


h(o,
{REGISTERED:'ScrollingPager/registered',

getInstance:function(p){
return n[p];}});



h(o.prototype,




{setBuffer:function(p){
this.options.buffer=p;
this.onvisible&&this.onvisible.setBuffer(p);},


getBuffer:function(){
return this.options.buffer;},


register:function(){
this.onvisible=new j
(l(this.scroll_loader_id),
this.getHandler(),
false,
this.options.buffer,
this.options);

n[this.scroll_loader_id]=this;
g.inform(o.REGISTERED,{id:this.scroll_loader_id});},


getInstance:function(p){
return n[p];},


getHandler:function(){
if(this.handler)
return this.handler;


function p(q){
var r=m(this.scroll_loader_id);
if(!r){
this.onvisible.remove();
return;}

i.addClass(r.firstChild,'async_saving');

var s=this.options.handler;
this.options.handler=function(){
g.inform('ScrollingPager/loadingComplete');
s&&s.apply(null,arguments);};


if(q)
this.data.pager_fired_on_init=true;

k.loadFromEndpoint
(this.pagelet_src,
this.target_id,
this.data,
this.options);}



return p.bind(this);},









setHandler:function(p){
this.handler=p;},


removeOnVisible:function(){
this.onvisible.remove();}});




e.exports=o;});

/** js/profile/timeline/modules/TimelineConstants.js */
__d("TimelineConstants",[],function(a,b,c,d,e,f){





var g=


{DS_HEIGHT:'timeline-unit-height',
DS_LOADED:'timeline-capsule-loaded',
DS_SIDEORG:'timeline-unit-sideorg',
DS_TAILBALANCE:'timeline-capsule-tailbalance',
DS_COLUMN_HEIGHT_DIFFERENTIAL:'timeline-column-diff-height',


FIXED_SIDE_LEFT:'left',

FIXED_SIDE_RIGHT:'right',

FIXED_SIDE_BOTH:'both',

FIXED_SIDE_NONE:'none',

SCROLL_TO_OFFSET:30,
SUBSECTION_SCROLL_TO_OFFSET:90,

SCRUBBER_DEFAULT_OFFSET:38,

SECTION_LOADING:'TimelineConstants/sectionLoading',
SECTION_LOADED:'TimelineConstants/sectionLoaded',
SECTION_FULLY_LOADED:'TimelineConstants/sectionFullyLoaded',
SECTION_REGISTERED:'TimelineConstants/sectionRegistered'};


e.exports=g;});

/** js/profile/timeline/modules/TimelineLegacySections.js */
__d("TimelineLegacySections",[],function(a,b,c,d,e,f){



var g={},

h=
{get:function(i){
return g[i];},


getAll:function(){
return g;},


remove:function(i){
delete g[i];},


removeAll:function(){
g={};},


set:function(i,j){
g[i]=j;}};



e.exports=h;});

/** js/profile/timeline/modules/TimelineURI.js */
__d("TimelineURI",["URI"],function(a,b,c,d,e,f){



var g=b('URI'),

h=
{TIMELINE_KEY:'timeline',
WALL_KEY:'wall',

parseURI:function(i){
i=g(i);
var j=i.getQueryData(),
k=i.getPath(),
l=k.split('/').slice(1);



if(l[0]=='people'||l[0]=='pages')
l=l.slice(2);



var m=j.sk||l[1]||h.TIMELINE_KEY;
if(m==h.WALL_KEY)
m=h.TIMELINE_KEY;



var n=null,
o=null;
if(m==h.TIMELINE_KEY){
o=parseInt(l[2],10)||null;
n=parseInt(l[3],10)||null;}




return {path:k,
id:j.id||l[0],
key:m,
viewas:j.viewas?j.viewas:0,
filter:j.filter?j.filter:null,
year:o,
month:n,
friendship:!!j.and};}};




e.exports=h;});

/** js/profile/timeline/modules/TimelineController.js */
__d("TimelineController",["event-extensions","Arbiter","CSS","DataStore","DOM","Run","ScrollingPager","Style","TimelineConstants","TimelineLegacySections","TimelineURI","Vector","ViewportBounds","$","ge","throttle"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('Arbiter'),
h=b('CSS'),
i=b('DataStore'),
j=b('DOM'),
k=b('Run'),
l=b('ScrollingPager'),
m=b('Style'),
n=b('TimelineConstants'),
o=b('TimelineLegacySections'),
p=b('TimelineURI'),
q=b('Vector'),
r=b('ViewportBounds'),

s=b('$'),
t=b('ge'),
u=b('throttle'),









v=484,
w=48,
x=740,
y=1285,

z=null,
aa=false,
ba,
ca,
da,
ea,
fa={},
ga={},
ha=[],
ia=null,
ja=null,
ka=false,

la=0,
ma=false,
na=false,
oa=false,



pa=
{allactivity:true,
approve:true,
games:true,
map:true,
music:true,
video:true};

pa[p.TIMELINE_KEY]=true;
var qa=[],
ra=false;

function sa(){
ia&&
ia.remove();
ia=null;}










function ta(eb,fb,gb){
gb=gb||[];
if(fa[eb])
return fa[eb][fb].
apply(fa[eb],gb);

ga[eb]=ga[eb]||{};
ga[eb][fb]=gb;
return false;}


function ua(){
if(!(ma||
oa||
na)){
sa();
return;}


var eb=q.getScrollPosition();

ma=
ma&&
ya(t('rightCol'),eb,'paddingTop',true);

na=
na&&
ya(s('pagelet_above_header_timeline'),eb,'top');

oa=
oa&&
ya(s('blueBar'),eb,'paddingTop');}


var va=0;
function wa(){
va=q.getScrollPosition();}


function xa(){
j.queryThenMutate
(wa,
function(){
var eb=la===0||
va.y>=la;

ta(db.STICKY_HEADER,'toggle',[eb]);
ta(db.CONTENT,'checkCurrentSectionChange');},

'TimelineController/scrollListener');}



function ya(eb,fb,gb,hb){
if(!eb){

sa();
return;}


if(fb.y<=0){
za(eb,gb);
return false;}else{

var ib=hb&&db.getCurrentScrubber();
if(ib&&h.hasClass(ib.getRoot(),'fixed_elem')){
za(eb,gb);
return false;}else{

var jb=parseInt(eb.style[gb],10)||0;
if(fb.y<jb){
h.addClass(eb,'timeline_fixed');
eb.style[gb]=fb.y+'px';}else 

h.removeClass(eb,'timeline_fixed');}}



return true;}


function za(eb,fb){
eb.style[fb]='0px';
h.removeClass(eb,'timeline_fixed');}





function ab(){
j.queryThenMutate
(db.shouldShowWideAds,
function(){
ta
(db.ADS,
'adjustAdsType',
[ka]);

ta(db.ADS,'adjustAdsToFit');
ta(db.CONTENT,'adjustContentPadding');
ta(db.STICKY_HEADER_NAV,'adjustMenuHeights');},

'TimelineController/resize');}






function bb(eb,fb){
if(eb=='sidebar/initialized')
ra=true;

ta
(db.ADS,
'adjustAdsType',
[db.shouldShowWideAds()]);}






function cb(){
while(ha.length)
ha.pop().remove();

for(var eb in fa)
fa[eb].reset&&fa[eb].reset();

sa();
ea.unsubscribe();
ea=null;
z=null;
ba=null;
fa={};
ga={};
ja=null;

la=0;
na=false;
if(ma){
var fb=t('rightCol');
if(fb){
fb.style.paddingTop='';
h.removeClass(fb,'timeline_fixed');}}


ma=false;
if(oa){
s('blueBar').style.paddingTop='';
h.removeClass(s('blueBar'),'timeline_fixed');}

oa=false;
qa=[];
ra=false;

aa=false;

i.purge(n.DS_HEIGHT);
i.purge(n.DS_LOADED);
i.purge(n.DS_SIDEORG);
i.purge(n.DS_TAILBALANCE);
i.purge(n.DS_COLUMN_HEIGHT_DIFFERENTIAL);}


var db=
{NAV:'nav',
STICKY_HEADER:'sticky_header',
STICKY_HEADER_NAV:'sticky_header_nav',
SCRUBBER:'scrubber',
CONTENT:'content',
ADS:'ads',
COVER:'cover',
LOGGING:'logging',

init:function(eb,fb,gb){
if(aa)
return;

if(fb==p.WALL_KEY)
fb=p.TIMELINE_KEY;

aa=true;
ba=eb;
ca=gb.has_fixed_ads;
da=gb.force_wide_ads;

ta(db.CONTENT,'adjustContentPadding');

ha.push
(Event.listen(window,'scroll',xa),
Event.listen(window,'resize',ab));


ea=g.subscribe
(['sidebar/initialized','sidebar/show','sidebar/hide'],
bb);


k.onLeave(cb);
db.registerCurrentKey(fb);},


setAdsTracking:function(eb){
ta(db.ADS,'start',[eb]);},


coverHasExpanded:function(eb){
var fb=t('rightCol');
if(fb){
fb.style.paddingTop=eb+'px';
ma=true;}



var gb=s('pagelet_above_header_timeline');
if(gb.firstChild){
s('above_header_timeline_placeholder').style.height=
gb.offsetHeight+'px';
gb.style.top=eb+'px';
na=true;}




var hb=document.documentElement;
oa=
hb.clientHeight<400||hb.clientWidth<hb.scrollWidth;
if(oa)
s('blueBar').style.paddingTop=eb+'px';


ia=
Event.listen(window,'scroll',ua);


g.inform('reflow');},


pageHasScrubber:function(eb){
return !eb||eb.match(/^(og_)?app_/)||(eb in pa);},


fixedAds:function(){
return ca;},


registerCurrentKey:function(eb){
z=eb;


ja=
eb!=='map'&&
q.getViewportDimensions().y<x&&
db.pageHasScrubber(eb);


ja=ja||s('blueBar').offsetTop;

ta(db.ADS,'setShortMode',[ja]);

ta(db.ADS,'updateCurrentKey',[eb]);

la=
eb==p.TIMELINE_KEY?
v-w:
0;},


getCurrentKey:function(){
return z;},


getSectionKeys:function(){
return qa;},


getCurrentScrubber:function(){
return fa[db.SCRUBBER];},


getCurrentStickyHeaderNav:function(){
return fa[db.STICKY_HEADER_NAV];},


scrubberHasLoaded:function(eb){
ta
(db.STICKY_HEADER_NAV,
'addTimePeriods',
[qa]);


h.conditionClass(eb.getRoot(),'fixed_elem',!ja);
ta(db.ADS,'registerScrubber',[eb]);},


registerSectionKey:function(eb,fb){


if(fa[db.STICKY_HEADER_NAV]){
ta
(db.STICKY_HEADER_NAV,
'addTimePeriod',
[eb]);}else 


qa[fb]=eb;},



scrubberHasChangedState:function(){
ta(db.ADS,'adjustAdsToFit');},


scrubberWasClicked:function(eb){
ta(db.LOGGING,'logScrubberClick',[eb]);},


sectionHasChanged:function(eb,fb){
ta
(db.STICKY_HEADER_NAV,
'updateSection',
[eb,fb]);

ta(db.SCRUBBER,'updateSection',[eb,fb]);
ta(db.ADS,'loadAdsIfEnoughTimePassed');
ta(db.LOGGING,'logSectionChange',[eb,fb]);},


navigateToSection:function(eb){
ta(db.CONTENT,'navigateToSection',[eb]);},


shouldShowWideAds:function(){
if(da){
ka=true;}else
if(!ra){





ka=false;}else{

var eb=y+r.getRight();
ka=q.getViewportDimensions().x>=eb;}


return ka;},


sidebarInitialized:function(){
return ra;},


adjustStickyHeaderWidth:function(){
ta(db.STICKY_HEADER,'adjustWidth');},










register:function(eb,fb){
fa[eb]=fb;
if(ga[eb]){
for(var gb in ga[eb])
ta(eb,gb,ga[eb][gb]);

delete ga[eb];}},



adjustScrollingPagerBuffer:function(eb,fb){
var gb=i.get
(n.DS_COLUMN_HEIGHT_DIFFERENTIAL,
fb);

if(!gb)
return;

var hb=l.getInstance(eb);
hb&&hb.setBuffer(hb.getBuffer()+Math.abs(gb));},


runOnceWhenSectionFullyLoaded:
function(eb,
fb,
gb){

var hb=o.get(fb);
if(hb){
var ib=false;

j.scry(hb.node,'ol.fbTimelineCapsule').forEach(function(kb){
if(!ib&&
parseInt(i.get(n.DS_LOADED,kb.id),10)>=
parseInt(gb,10)){
eb();
ib=true;}});


if(ib)
return;}



var jb=g.subscribe
(n.SECTION_FULLY_LOADED,
function(kb,lb){
if(lb.scrubberKey===fb&&
lb.pageIndex===gb){
eb();
jb.unsubscribe();}});}};






e.exports=db;});

/** js/profile/timeline/modules/TimelineStickyHeader.js */
__d("TimelineStickyHeader",["Arbiter","Bootloader","CSS","DOM","TimelineController","TimelineURI","Vector","ViewportBounds","$","ge"],function(a,b,c,d,e,f){



var g=b('Arbiter'),
h=b('Bootloader'),
i=b('CSS'),
j=b('DOM'),
k=b('TimelineController'),
l=b('TimelineURI'),
m=b('Vector'),
n=b('ViewportBounds'),

o=b('$'),
p=b('ge'),

q=false,
r=false,
s,
t,
u,
v,

w=
{VISIBLE:'TimelineStickyHeader/visible',
ADJUST_WIDTH:'TimelineStickyHeader/adjustWidth',

init:function(x){
if(q)
return;

q=true;
s=x;
t=j.find(x,'div.name');
u=j.find(x,'div.actions');
r=i.hasClass(x,'fbTimelineStickyHeaderVisible');

var y=o('blueBar'),
z,
aa,
ba,
ca=false;

j.queryThenMutate
(function(){
z=x.offsetTop;
aa=x.scrollHeight;
if(y.offsetTop&&
!p('page_admin_panel')&&
k.getCurrentKey()!==l.TIMELINE_KEY){
ba=m.getElementDimensions(y).y;
ca=true;}},


function(){
v=n.addTop(function(){
return r?z+aa:0;});




if(ca){
h.loadModules
(['StickyController'],
function(da){
new da(x,ba).start();});}else 



i.addClass(x,'fixed_elem');


k.register
(k.STICKY_HEADER,
w);},


'TimelineStickyHeader/init');},



reset:function(){
q=false;
r=false;
s=null;
t=null;
u=null;

v.remove();
v=null;},


toggle:function(x){
i.conditionClass(s,'fbTimelineStickyHeaderHidden',!x);
s.setAttribute('aria-hidden',x?'false':'true');
if(x!==r){
r=x;
g.inform(w.VISIBLE,x);}},



adjustWidth:function(){
g.inform
(w.ADJUST_WIDTH,
t,
g.BEHAVIOR_STATE);},



getRoot:function(){
return s;},



setActions:function(x){
if(q&&x){
j.setContent(u,x);
u=x;}}};




e.exports=a.TimelineStickyHeader||w;});

/** js/scrolling_pager.js */
__d("legacy:ui-scrolling-pager-js",["ScrollingPager"],function(a,b,c,d){



a.ScrollingPager=b('ScrollingPager');},

3);

/** js/modules/computeRelativeURI.js */
__d("computeRelativeURI",["URI","isEmpty"],function(a,b,c,d,e,f){



var g=b('URI'),

h=b('isEmpty');








function i(k,l){
if(!l)
return k;

if(l.charAt(0)=='/')
return l;


var m=k.split('/').slice(0,-1);
if(m[0]!=='')
emptyFunction('Original path is not absolute.');


l.split('/').forEach(function(n){
if(!(n=='.'))

if(n=='..'){
if(m.length>1)
m=m.slice(0,-1);}else 


m.push(n);});


return m.join('/');}

























function j(k,l){
var m=new g(),n=l;
k=new g(k);
l=new g(l);
if(l.getDomain()&&!l.isFacebookURI())



return n;


var o=k,
p=['Protocol','Domain','Port',
'Path','QueryData','Fragment'];
p.forEach(function(q){
var r=q=='Path'&&o===k;
if(r)
m.setPath(i(k.getPath(),l.getPath()));


if(!h(l['get'+q]()))



o=l;


if(!r)
m['set'+q](o['get'+q]());});



return m;}


e.exports=j;});

/** js/modules/HistoryManager.js */
__d("HistoryManager",["event-extensions","function-extensions","Cookie","Env","URI","UserAgent","copyProperties","emptyFunction","goOrReplace"],function(a,b,c,d,e,f){



b('event-extensions');
b('function-extensions');

var g=b('Cookie'),
h=b('Env'),
i=b('URI'),
j=b('UserAgent'),

k=b('copyProperties'),
l=b('emptyFunction'),
m=b('goOrReplace'),

















n=

{_IFRAME_BASE_URI:'http://static.ak.facebook.com/common/history_manager.php',

history:null,
current:0,
fragment:null,

_setIframeSrcFragment:function(o){
o=o.toString();
var p=n.history.length-1;








n.iframe.src=n._IFRAME_BASE_URI+
'?|index='+p+'#'+encodeURIComponent(o);
return n;},


getIframeSrcFragment:function(){
return decodeURIComponent
(i(n.iframe.contentWindow.document.location.href).
getFragment());},


nextframe:function(o,p){


if(p){






n._setIframeSrcFragment(o);
return;}


if(o!==undefined){
n.iframeQueue.push(o);}else{

n.iframeQueue.splice(0,1);
n.iframeTimeout=null;





n.checkURI();}


if(n.iframeQueue.length&&!n.iframeTimeout){
var q=n.iframeQueue[0];
n.iframeTimeout=setTimeout(function(){
n._setIframeSrcFragment(q);},
100,false);}},




isInitialized:function(){
return !!n._initialized;},


init:function(){


if(!h.ALLOW_TRANSITION_IN_IFRAME&&window!=window.top)







return;

if(n._initialized)
return n;


var o=i(),
p=o.getFragment()||'';
if(p.charAt(0)==='!'){
p=p.substr(1);
o.setFragment(p);}



if(i.getRequestURI(false).getProtocol().toLowerCase()=='https')
n._IFRAME_BASE_URI=
'https://s-static.ak.facebook.com/common/history_manager.php';


k(n,
{_initialized:true,
fragment:p,
orig_fragment:p,
history:[o],
callbacks:[],
lastChanged:Date.now(),
canonical:i('#'),
fragmentTimeout:null,
user:0,
iframeTimeout:null,
iframeQueue:[],
enabled:true,
debug:l});


if(window.history&&history.pushState){
this.lastURI=document.URL;
window.history.replaceState(this.lastURI,null);
Event.listen(window,'popstate',function(q){
if(q&&q.state&&n.lastURI!=q.state){
n.lastURI=q.state;
n.lastChanged=Date.now();
n.notify
(i(q.state).getUnqualifiedURI().toString());}}.

bind(n));
if(j.safari()<534||j.chrome()<=13){
setInterval(n.checkURI,42,false);
n._updateRefererURI(this.lastURI);}

return n;}



n._updateRefererURI(i.getRequestURI(false));


if(j.safari()<500||j.firefox()<2){
n.enabled=false;
return n;}


if(j.ie()<8){
n.iframe=document.createElement('iframe');

k(n.iframe.style,
{width:'0',
height:'0',
frameborder:'0',
left:'0',
top:'0',
position:'absolute'});


n._setIframeSrcFragment(p);
document.body.insertBefore(n.iframe,document.body.firstChild);}else
if('onhashchange' in window){








Event.listen(window,'hashchange',
function(){n.checkURI.bind(n).defer();});}else 

setInterval(n.checkURI,42,false);


return n;},


registerURIHandler:function(o){
n.callbacks.push(o);
return n;},



















setCanonicalLocation:function(o){
n.canonical=i(o);
return n;},


notify:function(o){
if(o==n.orig_fragment)
o=n.canonical.getFragment();


for(var p=0;p<n.callbacks.length;p++)

try{if(n.callbacks[p](o))
return true;}catch(

q){
l
('Uncaught exception in HistoryManager URI handler callback: %x',
q);}



return false;},


checkURI:function(){

















if(Date.now()-n.lastChanged<400)
return;


if(window.history&&history.pushState){
var o=i(document.URL).removeQueryData('ref').toString(),
p=
i(n.lastURI).removeQueryData('ref').toString();
if(o!=p){
n.lastChanged=Date.now();
n.lastURI=o;



if(j.safari()<534)
n._updateRefererURI(o);

n.notify(i(o).getUnqualifiedURI().toString());}

return;}


if(j.ie()<8&&n.iframeQueue.length)
return;


if(j.safari()&&window.history.length==200){

if(!n.warned){
n.warned=true;
l
('Your history length is over 200 and you are in Safari; things will '+
'start behaving oddly now. This is a known bug.');}


return;}


var q=i().getFragment();

if(q.charAt(0)=='!')
q=q.substr(1);


if(j.ie()<8)
q=n.getIframeSrcFragment();









q=q.replace(/%23/g,'#');

if(q!=n.fragment.replace(/%23/g,'#')){

n.debug([q,' vs ',n.fragment,
'whl: ',window.history.length,
'QHL: ',n.history.length].join(' '));

for(var r=n.history.length-1;r>=0;--r)
if(n.history[r].getFragment().replace(/%23/g,'#')==
q)
break;








++n.user;
if(r>=0){
n.go(r-n.current);}else 

n.go('#'+q);

--n.user;}},








_updateRefererURI:function(o){
o=o.toString();
if(o.charAt(0)!='/'&&o.indexOf('//')==-1)

return;

var p=new i(window.location);
if(p.isFacebookURI()){
var q=p.getPath()+window.location.search;}else 

var q='';

var r=i(o).getQualifiedURI().setFragment(q).toString(),


s=2048;
if(r.length>s)
r=r.substring(0,s)+'...';

g.set('x-referer',r);},


go:function(o,p,q){

if(window.history&&history.pushState){
if(p||typeof(o)=='number')
l
('HTML5 history is available, so you should not be calling'+
'HistoryManager.go() with anything but a real URL (and '+
'should not be setting now');

var r=i(o).removeQueryData('ref').toString();
n.lastChanged=Date.now();
this.lastURI=r;
if(q){
window.history.replaceState(o,null,r);}else 

window.history.pushState(o,null,r);




if(j.safari()<534)
n._updateRefererURI(o);

return false;}

n.debug('go: '+o);

if(p===undefined)
p=true;


if(!n.enabled)





if(!p)
return false;



if(typeof(o)=='number'){
if(!o)
return false;


var s=o+n.current,
t=Math.max(0,Math.min(n.history.length-1,s));

n.current=t;

s=n.history[t].getFragment()||n.orig_fragment;
s=i(s).removeQueryData('ref').getUnqualifiedURI().toString();













n.fragment=s;

n.lastChanged=Date.now();













if(j.ie()<8){







if(n.fragmentTimeout)
clearTimeout(n.fragmentTimeout);














n._temporary_fragment=s;
n.fragmentTimeout=setTimeout(function(){
window.location.hash='#!'+s;
delete n._temporary_fragment;},
750,false);

if(!n.user)
n.nextframe(s,q);}else


if(!n.user)
m(window.location,







window.location.href.split('#')[0]+'#!'+s,
q);


if(p)
n.notify(s);





n._updateRefererURI(s);

return false;}


o=i(o);
if(o.getDomain()==i().getDomain())
o=i('#'+o.getUnqualifiedURI());






var u=n.history[n.current].getFragment(),
v=o.getFragment();
if(v==u||(u==n.orig_fragment&&
v==n.canonical.getFragment())){
if(p)
n.notify(v);


n._updateRefererURI(v);

return false;}


if(q)
n.current--;


var w=(n.history.length-n.current)-1;

n.history.splice(n.current+1,w);
n.history.push(i(o));
return n.go(1,p,q);},






getCurrentFragment:function(){
var o=n._temporary_fragment!==undefined?
n._temporary_fragment:i.getRequestURI(false).getFragment();
return o==n.orig_fragment?
n.canonical.getFragment():o;}};




e.exports=n;});

/** js/modules/Animation.js */
__d("Animation",["CSS","DOM","Style","UserAgent"],function(a,b,c,d,e,f){



var g=b('CSS'),
h=b('DOM'),
i=b('Style'),
j=b('UserAgent');






















































function k(l){





if(a==this){
return new k(l);}else{

this.obj=l;
this._reset_state();
this.queue=[];
this.last_attr=null;}}



k.resolution=20;
k.offset=0;


k.prototype._reset_state=function(){
this.state=
{attrs:{},
duration:500};};




k.prototype.stop=function(){
this._reset_state();
this.queue=[];
return this;};



k.prototype._build_container=function(){
if(this.container_div){
this._refresh_container();
return;}




if(this.obj.firstChild&&this.obj.firstChild.__animation_refs){
this.container_div=this.obj.firstChild;
this.container_div.__animation_refs++;
this._refresh_container();
return;}

var l=document.createElement('div');
l.style.padding='0px';
l.style.margin='0px';
l.style.border='0px';
l.__animation_refs=1;
var m=this.obj.childNodes;
while(m.length)
l.appendChild(m[0]);

this.obj.appendChild(l);

this._orig_overflow=this.obj.style.overflow;
this.obj.style.overflow='hidden';
this.container_div=l;
this._refresh_container();};



k.prototype._refresh_container=function(){
this.container_div.style.height='auto';
this.container_div.style.width='auto';
this.container_div.style.height=this.container_div.offsetHeight+'px';
this.container_div.style.width=this.container_div.offsetWidth+'px';};



k.prototype._destroy_container=function(){
if(!this.container_div)
return;

if(!--this.container_div.__animation_refs){
var l=this.container_div.childNodes;
while(l.length)
this.obj.appendChild(l[0]);

this.obj.removeChild(this.container_div);}

this.container_div=null;
this.obj.style.overflow=this._orig_overflow;};



k.ATTR_TO=1;
k.ATTR_BY=2;
k.ATTR_FROM=3;
k.prototype._attr=function(l,m,n){


l=l.replace(/-[a-z]/gi,function(p){
return p.substring(1).toUpperCase();});


var o=false;
switch(l){
case 'background':
this._attr('backgroundColor',m,n);
return this;

case 'margin':
m=k.parse_group(m);
this._attr('marginBottom',m[0],n);
this._attr('marginLeft',m[1],n);
this._attr('marginRight',m[2],n);
this._attr('marginTop',m[3],n);
return this;

case 'padding':
m=k.parse_group(m);
this._attr('paddingBottom',m[0],n);
this._attr('paddingLeft',m[1],n);
this._attr('paddingRight',m[2],n);
this._attr('paddingTop',m[3],n);
return this;

case 'backgroundColor':
case 'borderColor':
case 'color':
m=k.parse_color(m);
break;

case 'opacity':
m=parseFloat(m,10);
break;

case 'height':
case 'width':
if(m=='auto'){
o=true;}else 

m=parseInt(m,10);

break;

case 'borderWidth':
case 'lineHeight':
case 'fontSize':
case 'marginBottom':
case 'marginLeft':
case 'marginRight':
case 'marginTop':
case 'paddingBottom':
case 'paddingLeft':
case 'paddingRight':
case 'paddingTop':
case 'bottom':
case 'left':
case 'right':
case 'top':
case 'scrollTop':
case 'scrollLeft':
m=parseInt(m,10);
break;


default:throw new Error(l+' is not a supported attribute!');
}

if(this.state.attrs[l]===undefined)
this.state.attrs[l]={};

if(o)
this.state.attrs[l].auto=true;

switch(n){
case k.ATTR_FROM:
this.state.attrs[l].start=m;
break;

case k.ATTR_BY:
this.state.attrs[l].by=true;


case k.ATTR_TO:
this.state.attrs[l].value=m;
break;}};




k._get_box_width=function(l){
var m=parseInt(i.get(l,'paddingLeft'),10),
n=parseInt(i.get(l,'paddingRight'),10),
o=parseInt(i.get(l,'borderLeftWidth'),10),
p=parseInt(i.get(l,'borderRightWidth'),10);
return l.offsetWidth-(m?m:0)-(n?n:0)-(o?o:0)-
(p?p:0);};


k._get_box_height=function(l){
var m=parseInt(i.get(l,'paddingTop'),10),
n=parseInt(i.get(l,'paddingBottom'),10),
o=parseInt(i.get(l,'borderTopWidth'),10),
p=parseInt(i.get(l,'borderBottomWidth'),10);
return l.offsetHeight-(m?m:0)-(n?n:0)-(o?o:0)-
(p?p:0);};



k.prototype.to=function(l,m){
if(m===undefined){
this._attr(this.last_attr,l,k.ATTR_TO);}else{

this._attr(l,m,k.ATTR_TO);
this.last_attr=l;}

return this;};



k.prototype.by=function(l,m){
if(m===undefined){
this._attr(this.last_attr,l,k.ATTR_BY);}else{

this._attr(l,m,k.ATTR_BY);
this.last_attr=l;}

return this;};



k.prototype.from=function(l,m){
if(m===undefined){
this._attr(this.last_attr,l,k.ATTR_FROM);}else{

this._attr(l,m,k.ATTR_FROM);
this.last_attr=l;}

return this;};



k.prototype.duration=function(l){
this.state.duration=l?l:0;
return this;};



k.prototype.checkpoint=function(l,m){
if(l===undefined)
l=1;

this.state.checkpoint=l;
this.queue.push(this.state);
this._reset_state();
this.state.checkpointcb=m;
return this;};



k.prototype.blind=function(){
this.state.blind=true;
return this;};



k.prototype.hide=function(){
this.state.hide=true;
return this;};



k.prototype.show=function(){
this.state.show=true;
return this;};



k.prototype.ease=function(l){
this.state.ease=l;
return this;};



k.prototype.go=function(){
var l=(new Date()).getTime();
this.queue.push(this.state);

for(var m=0;m<this.queue.length;m++){
this.queue[m].start=l-k.offset;
if(this.queue[m].checkpoint)
l+=this.queue[m].checkpoint*this.queue[m].duration;}


k.push(this);
return this;};



k.prototype._show=function(){
g.show(this.obj);};



k.prototype._hide=function(){
g.hide(this.obj);};



k.prototype._frame=function(l){
var m=true,
n=false,
o=false,
p;





function q(aa){
return document.documentElement[aa]||document.body[aa];}

for(var r=0;r<this.queue.length;r++){


var s=this.queue[r];
if(s.start>l){
m=false;
continue;}


if(s.checkpointcb){
this._callback(s.checkpointcb,l-s.start);
s.checkpointcb=null;}



if(s.started===undefined){
if(s.show)
this._show();

for(var t in s.attrs){
if(s.attrs[t].start!==undefined)
continue;

switch(t){
case 'backgroundColor':
case 'borderColor':
case 'color':

p=k.parse_color(i.get(this.obj,t=='borderColor'?'borderLeftColor':t));


if(s.attrs[t].by){
s.attrs[t].value[0]=Math.min(255,Math.max(0,s.attrs[t].value[0]+p[0]));
s.attrs[t].value[1]=Math.min(255,Math.max(0,s.attrs[t].value[1]+p[1]));
s.attrs[t].value[2]=Math.min(255,Math.max(0,s.attrs[t].value[2]+p[2]));}

break;

case 'opacity':
p=i.getOpacity(this.obj);
if(s.attrs[t].by)
s.attrs[t].value=Math.min(1,Math.max(0,s.attrs[t].value+p));

break;

case 'height':
p=k._get_box_height(this.obj);
if(s.attrs[t].by)
s.attrs[t].value+=p;

break;

case 'width':
p=k._get_box_width(this.obj);
if(s.attrs[t].by)
s.attrs[t].value+=p;

break;

case 'scrollLeft':
case 'scrollTop':
p=(this.obj===document.body)?
q(t):this.obj[t];
if(s.attrs[t].by)
s.attrs[t].value+=p;

s['last'+t]=p;
break;


default:p=parseInt(i.get(this.obj,t),10)||0;
if(s.attrs[t].by)
s.attrs[t].value+=p;

break;
}
s.attrs[t].start=p;}



if((s.attrs.height&&s.attrs.height.auto)||
(s.attrs.width&&s.attrs.width.auto)){

















if(j.firefox()<3)
o=true;



this._destroy_container();
for(var t in {height:1,width:1,
fontSize:1,
borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,
paddingLeft:1,paddingRight:1,paddingTop:1,paddingBottom:1})
if(s.attrs[t])
this.obj.style[t]=s.attrs[t].value+(typeof s.attrs[t].value=='number'?'px':'');




if(s.attrs.height&&s.attrs.height.auto)
s.attrs.height.value=k._get_box_height(this.obj);

if(s.attrs.width&&s.attrs.width.auto)
s.attrs.width.value=k._get_box_width(this.obj);}






s.started=true;
if(s.blind)
this._build_container();}




var u=(l-s.start)/s.duration;
if(u>=1){
u=1;
if(s.hide)
this._hide();}else 


m=false;

var v=s.ease?s.ease(u):u;


if(!n&&u!=1&&s.blind)
n=true;



if(o&&this.obj.parentNode){
var w=this.obj.parentNode,
x=this.obj.nextSibling;
w.removeChild(this.obj);}



for(var t in s.attrs)
switch(t){
case 'backgroundColor':
case 'borderColor':
case 'color':



if(s.attrs[t].start[3]!=s.attrs[t].value[3]){
this.obj.style[t]='rgba('+
k.calc_tween
(v,
s.attrs[t].start[0],
s.attrs[t].value[0],
true)+
','+
k.calc_tween
(v,
s.attrs[t].start[1],
s.attrs[t].value[1],
true)+
','+
k.calc_tween
(v,
s.attrs[t].start[2],
s.attrs[t].value[2],
true)+
','+
k.calc_tween
(v,
s.attrs[t].start[3],
s.attrs[t].value[3],
false)+
')';}else 

this.obj.style[t]='rgb('+
k.calc_tween
(v,
s.attrs[t].start[0],
s.attrs[t].value[0],
true)+
','+
k.calc_tween
(v,
s.attrs[t].start[1],
s.attrs[t].value[1],
true)+
','+
k.calc_tween
(v,
s.attrs[t].start[2],
s.attrs[t].value[2],
true)+
')';

break;

case 'opacity':
i.set(this.obj,'opacity',
k.calc_tween(v,s.attrs[t].start,s.attrs[t].value));
break;

case 'height':
case 'width':
this.obj.style[t]=v==1&&s.attrs[t].auto?'auto':
k.calc_tween
(v,
s.attrs[t].start,
s.attrs[t].value,
true)+'px';
break;

case 'scrollLeft':
case 'scrollTop':

var y=this.obj===document.body;
p=y?q(t):this.obj[t];
if(s['last'+t]!==p){


delete s.attrs[t];}else{

var z=k.calc_tween
(v,s.attrs[t].start,s.attrs[t].value,true);


if(!y){
z=this.obj[t]=z;}else{

if(t=='scrollLeft'){
a.scrollTo(z,q('scrollTop'));}else 

a.scrollTo(q('scrollLeft'),z);

z=q(t);}

s['last'+t]=z;}

break;


default:this.obj.style[t]=k.calc_tween(v,s.attrs[t].start,s.attrs[t].value,true)+'px';
break;
}



if(u==1){
this.queue.splice(r--,1);
this._callback(s.ondone,l-s.start-s.duration);}}




if(o)
w[x?'insertBefore':'appendChild'](this.obj,x);


if(!n&&this.container_div)
this._destroy_container();

return !m;};



k.prototype.ondone=function(l){
this.state.ondone=l;
return this;};



k.prototype._callback=function(l,m){
if(l){
k.offset=m;
l.call(this);
k.offset=0;}};




k.calc_tween=function(l,m,n,o){
return (o?parseInt:parseFloat)((n-m)*l+m,10);};



k.parse_color=function(l){
var m=/^#([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})$/i.exec(l);
if(m){
return [parseInt(m[1].length==1?m[1]+m[1]:m[1],16),
parseInt(m[2].length==1?m[2]+m[2]:m[2],16),
parseInt(m[3].length==1?m[3]+m[3]:m[3],16),
1];}else{

var n=/^rgba? *\(([0-9]+), *([0-9]+), *([0-9]+)(?:, *([0-9\.]+))?\)$/.exec(l);
if(n){
return [parseInt(n[1],10),
parseInt(n[2],10),
parseInt(n[3],10),
n[4]?parseFloat(n[4]):1];}else
if(l=='transparent'){
return [255,255,255,0];}else 


throw 'Named color attributes are not supported.';}};






k.parse_group=function(l){
l=l.trim().split(/ +/);
if(l.length==4){
return l;}else
if(l.length==3){
return [l[0],l[1],l[2],l[1]];}else
if(l.length==2){
return [l[0],l[1],l[0],l[1]];}else 

return [l[0],l[0],l[0],l[0]];};




k.push=function(l){
if(!k.active)
k.active=[];

k.active.push(l);
if(k.active.length===1){
if(!k.requestAnimationFrame){


var m=
a.requestAnimationFrame||
a.webkitRequestAnimationFrame||
a.mozRequestAnimationFrame;
if(m)
k.requestAnimationFrame=m.bind(a);}



if(k.requestAnimationFrame){
k.requestAnimationFrame(k._animate);}else 

k.timeout=setInterval(k._animate,
k.resolution,
false);}



if(k.requestAnimationFrame)
k._updateEndingTimer();


k._animate(Date.now(),true);};










k._updateEndingTimer=function(){
if(!k.requestAnimationFrame)
throw new Error('Ending timer only valid with requestAnimationFrame');


var l=0;

for(var m=0;m<k.active.length;m++){
var n=k.active[m];

for(var o=0;o<n.queue.length;o++){
var p=n.queue[o].start+n.queue[o].duration;

if(p>l)
l=p;}}




if(k.timeout){
clearTimeout(k.timeout);
delete k.timeout;}


var q=Date.now();
if(l>q)




k.timeout=setTimeout
(k._animate.shield(),
l-q,
false);};










k._animate=function(l,m){
l=l||Date.now();
for(var n=(m===true)?k.active.length-1:0;
n<k.active.length;n++)

try{if(!k.active[n]._frame(l))
k.active.splice(n--,1);}catch(

o){

k.active.splice(n--,1);}



if(k.active.length===0){
if(k.timeout){
if(k.requestAnimationFrame){
clearTimeout(k.timeout);}else 

clearInterval(k.timeout);

delete k.timeout;}}else

if(k.requestAnimationFrame)
k.requestAnimationFrame(k._animate);};







k.ease={};

k.ease.begin=function(l){
return Math.sin(Math.PI/2*(l-1))+1;};

k.ease.end=function(l){
return Math.sin(.5*Math.PI*l);};

k.ease.both=function(l){
return .5*Math.sin(Math.PI*(l-.5))+.5;};


k.prependInsert=function(l,m){
k.insert(l,m,h.prependContent);};


k.appendInsert=function(l,m){
k.insert(l,m,h.appendContent);};


k.insert=function(l,m,n){
i.set(m,'opacity',0);
n(l,m);
new k(m).
from('opacity',0).
to('opacity',1).
duration(400).
go();};


e.exports=k;});

/** js/ui/xhp/button/Button.js */
__d("Button",["event-extensions","CSS","DataStore","DOM","Parent","emptyFunction"],function(a,b,c,d,e,f){





b('event-extensions');

var g=b('CSS'),
h=b('DataStore'),
i=b('DOM'),
j=b('Parent'),

k=b('emptyFunction'),

l='uiButtonDisabled',
m='uiButtonDepressed',
n='button:blocker',
o='href',
p='ajaxify';

function q(u,v){
var w=h.get(u,n);
if(v){
if(w){
w.remove();
h.remove(u,n);}}else

if(!w)
h.set
(u,
n,
Event.listen
(u,'click',k.thatReturnsFalse,Event.Priority.URGENT));}





function r(u){
var v=j.byClass(u,'uiButton');
if(!v)
throw new Error('invalid use case');

return v;}


function s(u){
return i.isNodeOfType(u,'a');}


var t=






{getInputElement:function(u){
u=r(u);
if(s(u))
throw new Error('invalid use case');

return i.find(u,'input');},








isEnabled:function(u){
return !g.hasClass(r(u),l);},








setEnabled:function(u,v){
u=r(u);
g.conditionClass(u,l,!v);

if(s(u)){
var w=u.href,
x=u.getAttribute('ajaxify'),
y=h.get(u,o,'#'),
z=h.get(u,p);
if(v){
if(!w)
u.href=y;

if(!x&&z)
u.setAttribute('ajaxify',z);}else{


if(w&&w!==y)
h.set(u,o,w);

if(x&&x!==z)
h.set(u,p,x);

u.removeAttribute('href');
u.removeAttribute('ajaxify');}


q(u,v);}else{

var aa=t.getInputElement(u);
aa.disabled=!v;

q(aa,v);}},









setDepressed:function(u,v){
g.conditionClass(r(u),m,v);},








isDepressed:function(u){
return g.hasClass(r(u),m);},









setLabel:function(u,v){
u=r(u);
if(s(u)){
var w=i.find(u,'span.uiButtonText');
i.setContent(w,v);}else 

t.getInputElement(u).value=v;

g.conditionClass(u,'uiButtonNoText',!v);},








setIcon:function(u,v){
if(v&&!i.isNode(v))
return;

u=r(u);
var w=i.scry(u,'.img')[0];
if(!v){
w&&i.remove(w);
return;}

g.addClass(v,'customimg');
if(w!=v)
if(w){
i.replace(w,v);}else 

i.prependContent(u,v);}};





e.exports=t;});

/** js/modules/ContextualThing.js */
__d("ContextualThing",["DOM","ge"],function(a,b,c,d,e,f){



var g=b('DOM'),
h=b('ge'),
















i=
{register:function(j,k){
j.setAttribute('data-ownerid',g.getID(k));},


containsIncludingLayers:function(j,k){
while(k){
if(g.contains(j,k))
return true;

k=i.getContext(k);}

return false;},


getContext:function(j){
var k;
while(j){
if(j.getAttribute&&
(k=j.getAttribute('data-ownerid')))
return h(k);

j=j.parentNode;}

return null;}};



e.exports=i;});

/** js/modules/Form.js */
__d("Form",["event-extensions","AsyncRequest","AsyncResponse","CSS","DOM","DOMPosition","DOMQuery","DataStore","Env","Input","Parent","URI","createArrayFrom","trackReferrer"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('AsyncRequest'),
h=b('AsyncResponse'),
i=b('CSS'),
j=b('DOM'),
k=b('DOMPosition'),
l=b('DOMQuery'),
m=b('DataStore'),
n=b('Env'),
o=b('Input'),
p=b('Parent'),
q=b('URI'),

r=b('createArrayFrom'),
s=b('trackReferrer'),

t='FileList' in window,
u='FormData' in window;







function v(x){
var y={};
q.implodeQuery(x).split('&').forEach(function(z){
if(z){
var aa=/^([^=]*)(?:=(.*))?$/.exec(z),
ba=q.decodeComponent(aa[1]),
ca=aa[2]?q.decodeComponent(aa[2]):null;
y[ba]=ca;}});


return y;}


var w=

{getInputs:function(x){
x=x||document;

return [].concat
(r(l.scry(x,'input')),
r(l.scry(x,'select')),
r(l.scry(x,'textarea')),
r(l.scry(x,'button')));},



getSelectValue:function(x){
return x.options[x.selectedIndex].value;},


setSelectValue:function(x,y){
for(var z=0;z<x.options.length;++z)
if(x.options[z].value==y){
x.selectedIndex=z;
break;}},




getRadioValue:function(x){
for(var y=0;y<x.length;y++)
if(x[y].checked)
return x[y].value;


return null;},


getElements:function(x){
return r
(x.tagName=='FORM'?x.elements:w.getInputs(x));},













getAttribute:function(x,y){
return (x.getAttributeNode(y)||{}).value||null;},














setDisabled:function(x,y){
w.getElements(x).forEach(function(z){
if(z.disabled!==undefined){
var aa=m.get(z,'origDisabledState');
if(y){




if(aa===undefined)
m.set(z,'origDisabledState',z.disabled);

z.disabled=y;}else 

if(aa!==true)
z.disabled=false;}});},







bootstrap:function(x,y){
var z=(w.getAttribute(x,'method')||'GET').toUpperCase();



y=p.byTag(y,'button')||y;

var aa=p.byClass(y,'stat_elem')||x;
if(i.hasClass(aa,'async_saving'))
return;






if(y&&
(y.form!==x||
(y.nodeName!='INPUT'&&y.nodeName!='BUTTON')||
y.type!='submit')){


var ba=l.scry(x,'.enter_submit_target')[0];
ba&&(y=ba);}


var ca=w.serialize(x,y);
w.setDisabled(x,true);

var da=
w.getAttribute(x,'ajaxify')||
w.getAttribute(x,'action');

s(x,da);

var ea=new g(da);
ea.
setData(ca).
setNectarModuleDataSafe(x).
setReadOnly(z=='GET').
setMethod(z).
setRelativeTo(x).
setStatusElement(aa).
setInitialHandler(w.setDisabled.curry(x,false)).
setHandler(function(fa){
Event.fire(x,'success',{response:fa});}).

setErrorHandler(function(fa){
if(Event.fire(x,'error',{response:fa})!==false)
h.defaultErrorHandler(fa);}).


setFinallyHandler(w.setDisabled.curry(x,false)).
send();},












forEachValue:function(x,y,z){
w.getElements(x).forEach(function(aa){

if(aa.name&&!aa.disabled&&aa.type!=='submit')





if(!aa.type||
((aa.type==='radio'||aa.type==='checkbox')&&
aa.checked)||
aa.type==='text'||
aa.type==='password'||
aa.type==='hidden'||
aa.nodeName==='TEXTAREA'){
z(aa.type,aa.name,o.getValue(aa));}else
if(aa.nodeName==='SELECT'){
for(var ba=0,ca=aa.options.length;ba<ca;ba++){
var da=aa.options[ba];
if(da.selected)
z('select',aa.name,da.value);}}else


if(t&&aa.type==='file'){
var ea=aa.files;








for(var fa=0;fa<ea.length;fa++)
z('file',aa.name,ea.item(fa));}});




if(y&&
y.name&&
y.type==='submit'&&
l.contains(x,y)&&
l.isNodeOfType(y,['input','button']))
z('submit',y.name,y.value);},







createFormData:function(x,y){
if(!u)
return null;

var z=new FormData();
if(x)
if(l.isNode(x)){
w.forEachValue(x,y,function(ca,da,ea){
z.append(da,ea);});}else{


var aa=v(x);
for(var ba in aa)
z.append(ba,aa[ba]);}



return z;},


serialize:function(x,y){
var z={};
w.forEachValue(x,y,function(aa,ba,ca){
if(aa==='file')

return;

w._serializeHelper(z,ba,ca);});

return w._serializeFix(z);},


_serializeHelper:function(x,y,z){
var aa=Object.prototype.hasOwnProperty,
ba=/([^\]]+)\[([^\]]*)\](.*)/.exec(y);
if(ba){




if(!x[ba[1]]||!aa.call(x,ba[1])){
var ca;
x[ba[1]]=ca={};
if(x[ba[1]]!==ca)


return;}


var da=0;
if(ba[2]===''){
while(x[ba[1]][da]!==undefined)
da++;}else 


da=ba[2];

if(ba[3]===''){
x[ba[1]][da]=z;}else 

w._serializeHelper(x[ba[1]],da.concat(ba[3]),z);}else 


x[y]=z;},









_serializeFix:function(x){
for(var y in x)
if(x[y] instanceof Object)
x[y]=w._serializeFix(x[y]);


var z=Object.keys(x);
if(z.length===0||z.some(isNaN))
return x;


z.sort(function(ca,da){
return ca-da;});

var aa=0,
ba=z.every(function(ca){
return +ca===aa++;});

if(ba)
return z.map(function(ca){
return x[ca];});


return x;},



post:function(x,y,z){
var aa=document.createElement('form');
aa.action=x.toString();
aa.method='POST';
aa.style.display='none';

if(z)
aa.target=z;


y.fb_dtsg=n.fb_dtsg;

w.createHiddenInputs(y,aa);

l.getRootElement().appendChild(aa);
aa.submit();

return false;},















createHiddenInputs:function(x,y,z,aa){
z=z||{};
var ba=v(x);
for(var ca in ba){
if(ba[ca]===null)
continue;

if(z[ca]&&aa){
z[ca].value=ba[ca];}else{

var da=j.create('input',
{type:'hidden',
name:ca,
value:ba[ca]});

z[ca]=da;
y.appendChild(da);}}


return z;},











getFirstElement:function(x,y){
y=y||
['input[type="text"]',
'textarea',
'input[type="password"]',
'input[type="button"]',
'input[type="submit"]'];

var z=[];
for(var aa=0;aa<y.length;aa++){
z=l.scry(x,y[aa]);
for(var ba=0;ba<z.length;ba++){
var ca=z[ba];

try{var ea=k.getElementPosition(ca);
if(ea.y>0&&ea.x>0)
return ca;}catch(

da){}}}




return null;},













focusFirst:function(x){
var y=w.getFirstElement(x);
if(y){
y.focus();
return true;}


return false;}};




e.exports=w;});

/** js/modules/Locale.js */
__d("Locale",["Style"],function(a,b,c,d,e,f){



var g=b('Style'),

h,

i=

{isRTL:function(){
if(h===undefined)
h=('rtl'===g.get(document.body,'direction'));

return h;}};




e.exports=i;});

/** js/modules/getOverlayZIndex.js */
__d("getOverlayZIndex",["Style"],function(a,b,c,d,e,f){



var g=b('Style');












function h(i,j){
j=j||document.body;
var k=[];
while(i&&i!==j){
k.push(i);
i=i.parentNode;}

if(i!==j)

return 0;

for(var l=k.length-1;l>=0;l--){
var m=k[l];
if(g.get(m,'position')!='static'){
var n=parseInt(g.get(m,'z-index'),10);
if(!isNaN(n))
return n;}}



return 0;}


e.exports=h;});

/** js/modules/Dialog.js */
__d("Dialog",["array-extensions","event-extensions","Animation","Arbiter","AsyncRequest","Bootloader","Button","ContextualThing","CSS","DOM","Form","HTML","Input","Keys","Locale","Parent","Run","Style","URI","UserAgent","Vector","bind","copyProperties","createArrayFrom","emptyFunction","getObjectValues","getOverlayZIndex","tx"],function(a,b,c,d,e,f){












































b('array-extensions');
b('event-extensions');

var g=b('Animation'),
h=b('Arbiter'),
i=b('AsyncRequest'),
j=b('Bootloader'),
k=b('Button'),
l=b('ContextualThing'),
m=b('CSS'),
n=b('DOM'),
o=b('Form'),
p=b('HTML'),
q=b('Input'),
r=b('Keys'),
s=b('Locale'),
t=b('Parent'),
u=b('Run'),
v=b('Style'),
w=b('URI'),
x=b('UserAgent'),
y=b('Vector'),

z=b('bind'),
aa=b('copyProperties'),
ba=b('createArrayFrom'),
ca=b('emptyFunction'),
da=b('getObjectValues'),
ea=b('getOverlayZIndex'),
fa=b('tx'),

ga=function(){
var ia=document.body,
ja=document.createElement('div'),
ka=document.createElement('div');

ia.insertBefore(ja,ia.firstChild);
ia.insertBefore(ka,ia.firstChild);
ja.style.position='fixed';
ja.style.top='20px';

var la=ja.offsetTop!==ka.offsetTop;

ia.removeChild(ja);
ia.removeChild(ka);


ga=bagof(la);

return la;};


function ha(ia){
this._show_loading=true;
this._auto_focus=true;
this._submit_on_enter=false;
this._fade_enabled=true;
this._onload_handlers=[];
this._top=125;
this._uniqueID='dialog_'+ha._globalCount++;

this._content=null;
this._obj=null;
this._popup=null;
this._overlay=null;
this._shim=null;
this._causal_elem=null;
this._previous_focus=null;
this._buttons=[];

this._buildDialog();

if(ia)
this._setFromModel(ia);


ha._init();}





aa(ha,
{OK:
{name:'ok',
label:"Okay"},


CANCEL:
{name:'cancel',
label:"Cancel",
className:'inputaux'},


CLOSE:
{name:'close',
label:"Close"},


NEXT:
{name:'next',
label:"Next"},


SAVE:
{name:'save',
label:"Save"},


SUBMIT:
{name:'submit',
label:"Submit"},


CONFIRM:
{name:'confirm',
label:"Confirm"},


DELETE:
{name:'delete',
label:"Delete"},


_globalCount:0,





_bottoms:[0],




max_bottom:0,





_updateMaxBottom:function(){
ha.max_bottom=
Math.max.apply(Math,ha._bottoms);}});





aa(ha,
{OK_AND_CANCEL:[ha.OK,ha.CANCEL],

_STANDARD_BUTTONS:[ha.OK,ha.CANCEL,ha.CLOSE,ha.SAVE,
ha.SUBMIT,ha.CONFIRM,ha.DELETE],












SIZE:
{WIDE:555,
STANDARD:445},






_HALO_WIDTH:10,





_BORDER_WIDTH:1,





_PADDING_WIDTH:10,





_PAGE_MARGIN:40,

_stack:[],

_isUsingCSSBorders:function(){

return x.ie()<7;},










newButton:function(ia,ja,ka,la){
var ma={name:ia,label:ja};
if(ka)
ma.className=ka;

if(la)
ma.handler=la;

return ma;},


getCurrent:function(){
var ia=ha._stack;
return ia.length?ia[ia.length-1]:null;},


hideCurrent:function(){
var ia=ha.getCurrent();
ia&&ia.hide();},





















bootstrap:function(ia,ja,ka,la,ma,na){
ja=ja||{};


aa(ja,new w(ia).getQueryData());

la=la||(ka?'GET':'POST');

var oa=t.byClass(na,'stat_elem')||na;
if(oa&&m.hasClass(oa,'async_saving'))
return false;


var pa=new i().
setReadOnly(!!ka).
setMethod(la).
setRelativeTo(na).
setStatusElement(oa).
setURI(ia).
setNectarModuleDataSafe(na).
setData(ja),
qa=new ha(ma).
setCausalElement(na).
setAsync(pa);

qa.show();


return false;},






showFromModel:function(ia,ja){
var ka=new ha(ia).setCausalElement(ja).show();

if(ia.hiding)
ka.hide();},



_init:function(){

this._init=ca;


u.onLeave(ha._tearDown.shield(null,false));
h.subscribe('page_transition',ha._tearDown.shield(null,true));





Event.listen(document.documentElement,'keydown',function(event){




if(Event.getKeyCode(event)==r.ESC&&!event.getModifiers().any){
if(ha._escape())
event.kill();}else

if(Event.getKeyCode(event)==r.RETURN&&
!event.getModifiers().any)
if(ha._enter())
event.kill();});




Event.listen(window,'resize',function(event){
var ia=ha.getCurrent();
ia&&ia._resetDialogObj();});},



_findButton:function(ia,ja){
if(ia)
for(var ka=0;ka<ia.length;++ka)
if(ia[ka].name==ja)
return ia[ka];



return null;},


_tearDown:function(ia){
var ja=ha._stack.slice();
for(var ka=ja.length-1;ka>=0;ka--)
if((ia&&!ja[ka]._cross_transition)||
(!ia&&!ja[ka]._cross_quickling))
ja[ka].hide();},










_escape:function(){
var ia=ha.getCurrent();
if(!ia)
return false;


var ja=ia._semi_modal,
ka=ia._buttons;

if(!ka.length&&!ja)
return false;


if(ja&&!ka.length){
ia.hide();
return true;}


var la,
ma=ha._findButton(ka,'cancel');
if(ia._cancelHandler){
ia.cancel();
return true;}else
if(ma){
la=ma;}else
if(ka.length==1){
la=ka[0];}else 

return false;


ia._handleButton(la);
return true;},








_enter:function(){
var ia=ha.getCurrent();
if(!ia||!ia._submit_on_enter)
return false;



if(document.activeElement!=ia._frame)
return false;


var ja=ia._buttons;
if(!ja)
return false;


ia._handleButton(ja[0]);
return true;},





call_or_eval:function(ia,ja,ka){
if(!ja)
return undefined;

ka=ka||{};
if(typeof ja=='string'){
var la=Object.keys(ka).join(', ');
ja=(eval)('({f: function('+la+') { '+ja+'}})').f;}

return ja.apply(ia,da(ka));}});




aa(ha.prototype,





{_cross_quickling:false,





_cross_transition:false,




_loading:false,




_showing:false,









show:function(){
this._showing=true;
if(this._async_request){
if(this._show_loading)
this.showLoading();}else 


this._update();

return this;},


showLoading:function(){
this._loading=true;
m.addClass(this._frame,'dialog_loading_shown');
this._renderDialog();
return this;},





hide:function(){


if(!this._showing&&!this._loading)
return this;

this._showing=false;
if(this._autohide_timeout){
clearTimeout(this._autohide_timeout);
this._autohide_timeout=null;}

if(this._fade_enabled&&ha._stack.length<=1){
this._fadeOut();}else 


this._hide();

return this;},





cancel:function(){
if(!this._cancelHandler||this._cancelHandler()!==false)
this.hide();},



getRoot:function(){
return this._obj;},






getBody:function(){
return n.scry(this._obj,'div.dialog_body')[0];},










getButtonElement:function(ia){
if(typeof ia=='string')
ia=ha._findButton(this._buttons,ia);

if(!ia||!ia.name)
return null;


var ja=n.scry(this._popup,'input'),
ka=function(la){return la.name==ia.name;};
return ja.filter(ka)[0]||null;},








getContentNode:function(){
return n.find(this._content,'div.dialog_content');},


getFormData:function(){
return o.serialize(this.getContentNode());},


















setAllowCrossPageTransition:function(ia){
this._cross_transition=ia;
return this;},








setAllowCrossQuicklingNavigation:function(ia){
this._cross_quickling=ia;
return this;},





setShowing:function(){
this.show();
return this;},





setHiding:function(){
this.hide();
return this;},






setTitle:function(ia){
var ja=this._nodes.title,
ka=this._nodes.title_inner,
la=this._nodes.content;
n.setContent(ka,this._format(ia||''));
m.conditionShow(ja,!!ia);
m.conditionClass(la,'dialog_content_titleless',!ia);
return this;},





setBody:function(ia){
n.setContent(this._nodes.body,this._format(ia));
return this;},





setExtraData:function(ia){
this._extra_data=ia;
return this;},








setReturnData:function(ia){
this._return_data=ia;
return this;},






setShowLoading:function(ia){
this._show_loading=ia;
return this;},






setFullBleed:function(ia){
this._full_bleed=ia;
this._updateWidth();
m.conditionClass(this._obj,'full_bleed',ia);
return this;},








setCausalElement:function(ia){
this._causal_elem=ia;
return this;},








setUserData:function(ia){
this._user_data=ia;
return this;},






getUserData:function(){
return this._user_data;},





setAutohide:function(ia){
if(ia){
if(this._showing){
this._autohide_timeout=setTimeout(this.hide.shield(this),ia);}else 

this._autohide=ia;}else{


this._autohide=null;
if(this._autohide_timeout){
clearTimeout(this._autohide_timeout);
this._autohide_timeout=null;}}


return this;},





setSummary:function(ia){
var ja=this._nodes.summary;
n.setContent(ja,this._format(ia||''));
m.conditionShow(ja,!!ia);
return this;},

























setButtons:function(ia){
var ja,ka;








if(!(ia instanceof Array)){
ja=ba(arguments);}else 

ja=ia;


for(var la=0;la<ja.length;++la)
if(typeof ja[la]=='string'){
ka=ha._findButton(ha._STANDARD_BUTTONS,ja[la]);





ja[la]=ka;}



this._buttons=ja;

var ma=[];
if(ja&&ja.length>0)
for(var na=0;na<ja.length;na++){
ka=ja[na];

var oa=n.create
('input',
{type:'button',
name:ka.name||'',
value:ka.label}),





pa=n.create
('label',
{className:'uiButton uiButtonLarge uiButtonConfirm'},
oa);

if(ka.className){

ka.className.split(/\s+/).forEach(function(ra){
m.addClass(pa,ra);});



if(m.hasClass(pa,'inputaux')){
m.removeClass(pa,'inputaux');
m.removeClass(pa,'uiButtonConfirm');}




if(m.hasClass(pa,'uiButtonSpecial'))
m.removeClass(pa,'uiButtonConfirm');}



if(ka.icon)


n.prependContent
(pa,
n.create('img',{src:ka.icon,className:'img mrs'}));



if(ka.disabled)
k.setEnabled(pa,false);


Event.listen
(oa,
'click',
this._handleButton.bind(this,ka.name));


for(var qa in ka)
if(qa.indexOf('data-')===0&&qa.length>5)
oa.setAttribute(qa,ka[qa]);



ma.push(pa);}



n.setContent(this._nodes.buttons,ma);
this._updateButtonVisibility();

return this;},






setButtonsMessage:function(ia){
n.setContent(this._nodes.button_message,this._format(ia||''));
this._has_button_message=!!ia;
this._updateButtonVisibility();
return this;},






_updateButtonVisibility:function(){
var ia=this._buttons.length>0||this._has_button_message;
m.conditionShow(this._nodes.button_wrapper,ia);
m.conditionClass(this._obj,'omitDialogFooter',!ia);},










setClickButtonOnEnter:function(ia,ja){









this._clickOnEnterTarget=ia;

if(!this._clickOnEnterListener)
this._clickOnEnterListener=
Event.listen(this._nodes.body,'keypress',function(event){
var ka=event.getTarget();
if(ka&&ka.id===this._clickOnEnterTarget)
if(Event.getKeyCode(event)==r.RETURN){
this._handleButton(ja);

event.kill();}


return true;}.
bind(this));


return this;},












setStackable:function(ia,ja){






this._is_stackable=ia;
this._shown_while_stacked=ia&&ja;
return this;},








setHandler:function(ia){
this._handler=ia;
return this;},












setCancelHandler:function(ia){
this._cancelHandler=ha.call_or_eval.bind(null,this,ia);
return this;},







setCloseHandler:function(ia){
this._close_handler=ha.call_or_eval.bind(null,this,ia);
return this;},





clearHandler:function(){
return this.setHandler(null);},


























setPostURI:function(ia,ja){
if(ja===undefined)
ja=true;


if(ja){
this.setHandler(this._submitForm.bind(this,'POST',ia));}else 

this.setHandler(function(){
o.post(ia,this.getFormData());
this.hide();}.
bind(this));

return this;},






setGetURI:function(ia){
this.setHandler(this._submitForm.bind(this,'GET',ia));
return this;},






setModal:function(ia){






this._modal=ia;
m.conditionClass(this._obj,'generic_dialog_modal',ia);
return this;},











setSemiModal:function(ia){





if(ia){
this.setModal(true);
this._semiModalListener=Event.listen(this._obj,'click',function(ja){
if(!n.contains(this._popup,ja.getTarget()))
this.hide();}.

bind(this));}else 

this._semiModalListener&&this._semiModalListener.remove();

this._semi_modal=ia;
return this;},







setWideDialog:function(ia){
this._wide_dialog=ia;
this._updateWidth();
return this;},









setContentWidth:function(ia){
this._content_width=ia;
this._updateWidth();
return this;},









setTitleLoading:function(ia){
if(ia===undefined)
ia=true;

var ja=n.find(this._popup,'h2.dialog_title');
if(ja)
m.conditionClass(ja,'loading',ia);

return this;},








setSecure:function(ia){
m.conditionClass(this._nodes.title,'secure',ia);
return this;},








setClassName:function(ia){
ia.split(/\s+/).forEach(m.addClass.bind(m,this._obj));
return this;},





setFadeEnabled:function(ia){
this._fade_enabled=ia;
return this;},






setFooter:function(ia){
var ja=this._nodes.footer;
n.setContent(ja,this._format(ia||''));
m.conditionShow(ja,!!ia);
return this;},






setAutoFocus:function(ia){
this._auto_focus=ia;
return this;},





setTop:function(ia){
this._top=ia;
this._resetDialogObj();
return this;},










onloadRegister:function(ia){
ba(ia).forEach(function(ja){
if(typeof ja=='string')
ja=new Function(ja);

this._onload_handlers.push(ja.bind(this));}.
bind(this));
return this;},







setAsyncURL:function(ia){
return this.setAsync(new i(ia));},
























setAsync:function(ia){

var ja=function(ra){
if(this._async_request!=ia)
return;

this._async_request=null;

var sa=ra.getPayload(),
ta=sa;

if(this._loading)
this._showing=true;


if(typeof ta=='string'){
this.setBody(ta);}else 

this._setFromModel(ta);


this._update();}.
bind(this),


ka=ia.getData();
ka.__d=1;
ia.setData(ka);

var la=ia.getHandler()||ca;
ia.setHandler(function(ra){
la(ra);
ja(ra);});

var ma=ia,

na=
ma.getErrorHandler()||ca,
oa=
ma.getTransportErrorHandler()||ca,

pa=function(){
this._async_request=null;
this._loading=false;
if(this._showing&&this._shown_while_stacked){
this._update();}else 

this._hide(this._is_stackable);}.

bind(this),

qa=
ma.getServerDialogCancelHandler()||pa;

ma.
setAllowCrossPageTransition(this._cross_transition).
setErrorHandler(function(ra){
pa();
na(ra);}).

setTransportErrorHandler(function(ra){
pa();
oa(ra);}).

setServerDialogCancelHandler(qa);

ia.send();

this._async_request=ia;
if(this._showing)
this.show();

return this;},


_format:function(ia){




if(typeof ia=='string'){
ia=p(ia);}else 

ia=p.replaceJSONWrapper(ia);

if(ia instanceof p)
ia.setDeferred(true);

return ia;},


_update:function(){
if(!this._showing)
return;



if(this._autohide&&
!this._async_request&&
!this._autohide_timeout)
this._autohide_timeout=setTimeout(z(this,'hide'),this._autohide);


m.removeClass(this._frame,'dialog_loading_shown');
this._loading=false;

this._renderDialog();
this._runOnloads();


this._previous_focus=document.activeElement;
q.focus(this._frame);},





_runOnloads:function(){
for(var ia=0;ia<this._onload_handlers.length;++ia)





try{this._onload_handlers[ia]();}catch(
ja){}


this._onload_handlers=[];},


_updateWidth:function(){
var ia=2*ha._BORDER_WIDTH;
if(ha._isUsingCSSBorders())



ia+=2*ha._HALO_WIDTH;

if(this._content_width){
ia+=this._content_width;
if(!this._full_bleed)

ia+=2*ha._PADDING_WIDTH;}else

if(this._wide_dialog){
ia+=ha.SIZE.WIDE;}else 

ia+=ha.SIZE.STANDARD;

this._popup.style.width=ia+'px';},


_updateZIndex:function(){
if(!this._hasSetZIndex&&this._causal_elem){
var ia=ea(this._causal_elem),
ja=this._causal_elem;
while(!ia&&(ja=l.getContext(ja)))
ia=ea(ja);





this._hasSetZIndex=ia>(this._modal?400:200);

v.set(this._obj,'z-index',this._hasSetZIndex?ia:'');}},






_renderDialog:function(){
this._updateZIndex();
this._pushOntoStack();


this._obj.style.height=(this._modal&&x.ie()<7)?
y.getDocumentDimensions().y+'px':
null;


if(this._obj&&this._obj.style.display){
this._obj.style.visibility='hidden';
this._obj.style.display='';
this.resetDialogPosition();
this._obj.style.visibility='';



this._obj.dialog=this;}else 

this.resetDialogPosition();



clearInterval(this.active_hiding);
this.active_hiding=setInterval(this._activeResize.bind(this),500);

this._submit_on_enter=false;
if(this._auto_focus){


var ia=o.getFirstElement(this._content,
['input[type="text"]',
'textarea',
'input[type="password"]']);

if(ia){
o.focusFirst.bind(this,this._content).defer();}else 




this._submit_on_enter=true;}



var ja=y.getElementDimensions(this._content).y+
y.getElementPosition(this._content).y;
ha._bottoms.push(ja);
this._bottom=ja;
ha._updateMaxBottom();

return this;},


_buildDialog:function(){
this._obj=n.create('div',
{className:'generic_dialog',
id:this._uniqueID});

this._obj.style.display='none';



n.appendContent(document.body,this._obj);

if(!this._popup)
this._popup=n.create('div',{className:'generic_dialog_popup'});

this._obj.appendChild(this._popup);


if(x.ie()<7&&!this._shim)
j.loadModules(['IframeShim'],function(ua){
this._shim=new ua(this._popup);});



m.addClass(this._obj,'pop_dialog');
if(s.isRTL())
m.addClass(this._obj,'pop_dialog_rtl');


var ia;
if(ha._isUsingCSSBorders()){
ia=
'<div class="pop_container_advanced">'+
'<div class="pop_content" id="pop_content"></div>'+
'</div>';}else 

ia=
'<div class="pop_container">'+
'<div class="pop_verticalslab"></div>'+
'<div class="pop_horizontalslab"></div>'+
'<div class="pop_topleft"></div>'+
'<div class="pop_topright"></div>'+
'<div class="pop_bottomright"></div>'+
'<div class="pop_bottomleft"></div>'+
'<div class="pop_content pop_content_old" id="pop_content"></div>'+
'</div>';

n.setContent(this._popup,p(ia));

var ja=n.find(this._popup,'div.pop_content');
ja.setAttribute('tabIndex','0');
ja.setAttribute('role','alertdialog');
this._frame=this._content=ja;

var ka=n.create
('div',
{className:'dialog_loading'},
"Loading..."),
la=n.create('span'),
ma=n.create
('h2',
{className:'dialog_title hidden_elem',
id:'title_'+this._uniqueID},
la),
na=n.create('div',{className:'dialog_summary hidden_elem'}),
oa=n.create('div',{className:'dialog_body'}),
pa=n.create('div',{className:'rfloat mlm'}),
qa=n.create('div',{className:'dialog_buttons_msg'}),
ra=n.create
('div',
{className:'dialog_buttons clearfix hidden_elem'},
[pa,qa]),
sa=n.create('div',{className:'dialog_footer hidden_elem'}),
ta=n.create
('div',
{className:'dialog_content'},
[na,oa,ra,sa]);

this._nodes=
{summary:na,
body:oa,
buttons:pa,
button_message:qa,
button_wrapper:ra,
footer:sa,
content:ta,
title:ma,
title_inner:la};


n.setContent(this._frame,[ma,ta,ka]);},


_updateShim:function(){
return this._shim&&this._shim.show();},


_activeResize:function(){
if(this.last_offset_height!=this._content.offsetHeight){
this.last_offset_height=this._content.offsetHeight;
this.resetDialogPosition();}},



resetDialogPosition:function(){
if(!this._popup)
return;

this._resetDialogObj();
this._updateShim();},


_resetDialogObj:function(){
var ia=2*ha._PAGE_MARGIN,
ja=y.getViewportDimensions(),
ka=ja.x-ia,
la=ja.y-ia,

ma=2*ha._HALO_WIDTH,
na=y.getElementDimensions(this._content),
oa=na.x+ma,
pa=na.y+ma,

qa=this._top,

ra=ka-oa,
sa=la-pa;

if(sa<0){



qa=ha._PAGE_MARGIN;}else
if(qa>sa)


qa=ha._PAGE_MARGIN+(Math.max(sa,0)/2);




var ta=ga();
if(!ta)
qa+=y.getScrollPosition().y;


v.set(this._popup,'marginTop',qa+'px');


var ua=ta&&(ra<0||sa<0);
m.conditionClass(this._obj,'generic_dialog_fixed_overflow',ua);
m.conditionClass
(document.documentElement,
'generic_dialog_overflow_mode',
ua);},


_fadeOut:function(ia){
if(!this._popup)
return;


try{new g(this._obj).
duration(0).
checkpoint().
to('opacity',0).
hide().
duration(250).
ondone(this._hide.bind(this,ia)).
go();}catch(
ja){
this._hide(ia);}},



_hide:function(ia){
if(this._obj)
this._obj.style.display='none';


m.removeClass(document.documentElement,'generic_dialog_overflow_mode');
this._updateShim();

clearInterval(this.active_hiding);

if(this._bottom){

var ja=ha._bottoms;
ja.splice(ja.indexOf(this._bottom),1);
ha._updateMaxBottom();}



if(this._previous_focus&&
document.activeElement&&
n.contains(this._obj,document.activeElement))
q.focus(this._previous_focus);


if(ia)
return;

this.destroy();},








destroy:function(){
this._popFromStack();


if(this._obj){
n.remove(this._obj);
this._obj=null;

this._shim&&this._shim.hide();
this._shim=null;}


this._clickOnEnterListener&&this._clickOnEnterListener.remove();

if(this._close_handler)


this._close_handler({return_data:this._return_data});},









_handleButton:function(ia){
if(typeof ia=='string')
ia=ha._findButton(this._buttons,ia);








var ja=ha.call_or_eval(ia,ia.handler);
if(ja===false)
return;


if(ia.name=='cancel'){
this.cancel();}else
if(ha.call_or_eval(this,this._handler,{button:ia})!==
false)
this.hide();},



_submitForm:function(ia,ja,ka){
var la=this.getFormData();

if(ka)
la[ka.name]=ka.label;


if(this._extra_data)
aa(la,this._extra_data);


var ma=new i().
setURI(ja).
setData(la).
setMethod(ia).
setNectarModuleDataSafe(this._causal_elem).
setReadOnly(ia=='GET');
this.setAsync(ma);
return false;},


_setFromModel:function(ia){
var ja={};
aa(ja,ia);

for(var ka in ja){
if(ka=='onloadRegister'){
this.onloadRegister(ja[ka]);
continue;}


var la=this['set'+ka.substr(0,1).toUpperCase()+
ka.substr(1)];






la.apply(this,ba(ja[ka]));}},



_updateBottom:function(){
var ia=y.getElementDimensions(this._content).y+
y.getElementPosition(this._content).y;

ha._bottoms[ha._bottoms.length-1]=ia;
ha._updateMaxBottom();},


_pushOntoStack:function(){
var ia=ha._stack;

if(!ia.length)
h.inform('layer_shown',{type:'Dialog'});



ia.remove(this);
ia.push(this);


for(var ja=ia.length-2;ja>=0;ja--){
var ka=ia[ja];
if(!ka._is_stackable&&!ka._async_request){
ka._hide();}else
if(!ka._shown_while_stacked)
ka._hide(true);}},




_popFromStack:function(){
var ia=ha._stack,


ja=(ia[ia.length-1]===this);

ia.remove(this);

if(ia.length){

if(ja)
ia[ia.length-1].show();}else 


h.inform('layer_hidden',{type:'Dialog'});}});





e.exports=ha;});

/** js/modules/detect/isAsyncScrollQuery.js */
__d("isAsyncScrollQuery",["UserAgent"],function(a,b,c,d,e,f){



var g=b('UserAgent'),

h=null;








function i(){
if(h===null)
h=
g.osx()>=10.8&&
g.safari()>=536.25&&
!g.chrome();

return h;}


e.exports=i;});

/** js/modules/DOMScroll.js */
__d("DOMScroll",["Animation","Arbiter","DOM","DOMQuery","UserAgent","Vector","ViewportBounds","ge","isAsyncScrollQuery"],function(a,b,c,d,e,f){















var g=b('Animation'),
h=b('Arbiter'),
i=b('DOM'),
j=b('DOMQuery'),
k=b('UserAgent'),
l=b('Vector'),
m=b('ViewportBounds'),

n=b('ge'),
o=b('isAsyncScrollQuery'),

p=

{SCROLL:'dom-scroll',



getScrollState:function(){

var q=l.getViewportDimensions(),
r=l.getDocumentDimensions(),
s=(r.x>q.x),
t=(r.y>q.y);


s+=0;
t+=0;

return new l(s,t);},




_scrollbarSize:null,

_initScrollbarSize:function(){

var q=i.create('p');
q.style.width='100%';
q.style.height='200px';

var r=i.create('div');
r.style.position='absolute';
r.style.top='0px';
r.style.left='0px';
r.style.visibility='hidden';
r.style.width='200px';
r.style.height='150px';
r.style.overflow='hidden';
r.appendChild(q);

document.body.appendChild(r);
var s=q.offsetWidth;
r.style.overflow='scroll';
var t=q.offsetWidth;
if(s==t)
t=r.clientWidth;


document.body.removeChild(r);

p._scrollbarSize=s-t;},


getScrollbarSize:function(){
if(p._scrollbarSize===null)
p._initScrollbarSize();

return p._scrollbarSize;},


























scrollTo:
function(q,
r,
s,
t,
u){


if(typeof r=='undefined'||r===true)
r=750;


if(o())
r=false;


if(!(q instanceof l)){
var v=l.getScrollPosition().x,
w=l.getElementPosition(n(q)).y;
q=new l(v,w,'document');

if(!t)
q.y-=m.getTop()/(s?2:1);}



if(s){
q.y-=l.getViewportDimensions().y/2;}else
if(t){
q.y-=l.getViewportDimensions().y;
q.y+=t;}


q=q.convertTo('document');

if(r){
return new g(document.body).
to('scrollTop',q.y).
to('scrollLeft',q.x).
ease(g.ease.end).
duration(r).
ondone(u).
go();}else
if(window.scrollTo){
window.scrollTo(q.x,q.y);
u&&u();}

h.inform(p.SCROLL);},

















ensureVisible:
function(q,
r,
s,
t,
u){

if(s===undefined)
s=10;


q=n(q);

if(r)
q=j.find(q,r);


var v=l.getScrollPosition().x,
w=l.getScrollPosition().y,
x=w+l.getViewportDimensions().y,
y=l.getElementPosition(q).y,
z=y+l.getElementDimensions(q).y;

y-=m.getTop();

y-=s;
z+=s;

if(y<w){

p.scrollTo
(new l(v,y,'document'),
t,
false,
false,
u);}else
if(z>x)
if(y-(z-x)<w){

p.scrollTo
(new l(v,y,'document'),
t,
false,
false,
u);}else 


p.scrollTo
(new l(v,z,'document'),
t,
false,
true,
u);},




scrollToTop:function(q){
var r=l.getScrollPosition();
p.scrollTo(new l(r.x,0,'document'),q!==false);}};




e.exports=p;});

/** js/modules/LinkController.js */
__d("LinkController",["event-extensions","DataStore","Parent","trackReferrer"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('DataStore'),
h=b('Parent'),

i=b('trackReferrer'),

















j='LinkControllerHandler',
k=[],
l=[];

function m(event){
var q=h.byTag(event.getTarget(),'a'),









r=q&&q.getAttribute('href',2);

if(!r||
q.rel||
!o(r)||
g.get(q,j))
return;


var s=Event.listen(q,'click',function(t){
if(r.charAt(r.length-1)=='#'){
t.prevent();
return;}

i(q,r);
n(q,t);});


g.set(q,j,s);}


function n(q,event){


if(q.target||
event.getModifiers().any||
(event.which&&event.which!=1))
return;

var r=k.concat(l);
for(var s=0,t=r.length;s<t;s++)
if(r[s](q,event)===false)
return event.prevent();}




function o(q){
var r=q.match(/^(\w+):/);
return !r||r[1].match(/^http/i);}


var p=






{registerHandler:function(q){
k.push(q);},










registerFallbackHandler:function(q){
l.push(q);}};













Event.listen(document.documentElement,'mousedown',m);
Event.listen(document.documentElement,'keydown',m);

e.exports=p;});

/** js/modules/OnloadHooks.js */
__d("OnloadHooks",["Arbiter","ErrorUtils","InitialJSLoader","OnloadEvent"],function(a,b,c,d,e,f){



var g=b('Arbiter'),
h=b('ErrorUtils'),
i=b('InitialJSLoader'),
j=b('OnloadEvent');









function k(){
var r=a.CavalryLogger;
if(!window.loaded&&r)
r.getInstance().setTimeStamp('t_prehooks');


n('onloadhooks');

if(!window.loaded&&r)
r.getInstance().setTimeStamp('t_hooks');


window.loaded=true;
g.inform('uipage_onload',true,g.BEHAVIOR_STATE);}


function l(){
n('onafterloadhooks');
window.afterloaded=true;}


function m(r,s){
return h.applyWithGuard(r,null,null,function(t){
t.event_type=s;
t.category='runhook';});}



function n(r){
var s=(r=='onbeforeleavehooks')||
(r=='onbeforeunloadhooks');


do{var t=window[r];
if(!t)
break;

if(!s)
window[r]=null;


for(var u=0;u<t.length;u++){
var v=m(t[u],r);
if(s&&v)
return v;}}while(


!s&&window[r]);}




































function o(){
if(!window.loaded){
window.loaded=true;
n('onloadhooks');}

if(!window.afterloaded){
window.afterloaded=true;
n('onafterloadhooks');}}



function p(){
g.registerCallback(k,
[j.ONLOAD_DOMCONTENT_CALLBACK,
i.INITIAL_JS_READY]);


g.registerCallback(l,
[j.ONLOAD_DOMCONTENT_CALLBACK,
j.ONLOAD_CALLBACK,
i.INITIAL_JS_READY]);


g.subscribe(j.ONBEFOREUNLOAD,function(r,s){
s.warn=n('onbeforeleavehooks')||
n('onbeforeunloadhooks');
if(!s.warn){
window.loaded=false;
window.afterloaded=false;}},

g.SUBSCRIBE_NEW);

g.subscribe(j.ONUNLOAD,function(r,s){
n('onunloadhooks');},
g.SUBSCRIBE_NEW);}


var q=
{_onloadHook:k,
_onafterloadHook:l,
runHook:m,
runHooks:n,
keepWindowSetAsLoaded:o};



p();


a.OnloadHooks=e.exports=q;});

/** js/modules/core/escapeJSQuotes.js */
__d("escapeJSQuotes",[],function(a,b,c,d,e,f){












function g(h){
if(typeof h=='undefined'||h==null||!h.valueOf())
return '';


return h.
toString().
replace(/\\/g,'\\\\').
replace(/\n/g,'\\n').
replace(/\r/g,'\\r').
replace(/"/g,'\\x22').
replace(/'/g,'\\\'').
replace(/</g,'\\x3c').
replace(/>/g,'\\x3e').
replace(/&/g,'\\x26');}


e.exports=g;});

/** js/modules/PageTransitions.js */
__d("PageTransitions",["event-extensions","Arbiter","Dialog","DOM","DOMScroll","Env","Form","HistoryManager","JSLogger","LinkController","OnloadHooks","htmlize","escapeJSQuotes","URI","UserAgent","Vector","areObjectsEqual","clickRefAction","computeRelativeURI","copyProperties","ge","goOrReplace","startsWith","tx","userAction"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('Arbiter'),
h=b('Dialog'),
i=b('DOM'),
j=b('DOMScroll'),
k=b('Env'),
l=b('Form'),
m=b('HistoryManager'),
n=b('JSLogger'),
o=b('LinkController'),
p=b('OnloadHooks'),
q=b('htmlize'),
r=b('escapeJSQuotes'),
s=b('URI'),
t=b('UserAgent'),
u=b('Vector'),

v=b('areObjectsEqual'),
w=b('clickRefAction'),
x=b('computeRelativeURI'),
y=b('copyProperties'),
z=b('ge'),
aa=b('goOrReplace'),
ba=b('startsWith'),
ca=b('tx'),
da=b('userAction'),


ea={};

function fa(ka,la){
ea[ka.getUnqualifiedURI()]=la;}


function ga(ka){
return ea[ka.getUnqualifiedURI()];}


function ha(ka){
delete ea[ka.getUnqualifiedURI()];}












var ia=

{_transition_handlers:[],
_scroll_locked:false,

isInitialized:function(){
return !!ia._initialized;},






_init:function(){


if(!k.ALLOW_TRANSITION_IN_IFRAME&&window!=window.top)

return;


if(ia._initialized)
return ia;

ia._initialized=true;

var ka=s.getRequestURI(false),
la=ka.getUnqualifiedURI(),
ma=s(la).setFragment(null),
na=la.getFragment();
if(na.charAt(0)==='!'&&ma.toString()===na.substr(1))



la=ma;


y(ia,
{_current_uri:la,
_most_recent_uri:la,
_next_uri:la});







var oa;
if(ba(ka.getFragment(),'/')){

oa=ka.getFragment();}else 


oa=la;


m.init().
setCanonicalLocation('#'+oa).
registerURIHandler(ia._historyManagerHandler);


o.registerFallbackHandler(ia._rewriteHref);
o.registerFallbackHandler(ia._onlinkclick);

Event.listen
(document.documentElement,
'submit',
ia._onformsubmit);

Event.listen(window,'scroll',function(){




if(!ia._scroll_locked)
fa
(ia._current_uri,
u.getScrollPosition());});




return ia;},




































registerHandler:function(ka,la){
ia._init();

la=la||5;

if(!ia._transition_handlers[la])
ia._transition_handlers[la]=[];


ia._transition_handlers[la].push(ka);},







getCurrentURI:function(ka){
if(!ia._current_uri&&!ka){
emptyFunction
('You\'ve requested the current URI, but there is no "current" '+
'URI.  This is probably because you\'re in the middle of a '+
'page transition.  That\'s an awkward time to ask for the '+
'current URI, and you should probably avoid this situation.  '+
'For now, I\'m just gonna return the most recent page URI, '+
'since that\'s better than returning null.');
return new s(ia._most_recent_uri);}


return new s(ia._current_uri);},










getMostRecentURI:function(){
return new s(ia._most_recent_uri);},










getNextURI:function(){
return new s(ia._next_uri);},











_rewriteHref:function(ka){
var la=ka.getAttribute('href'),
ma=x
(ia._most_recent_uri.getQualifiedURI(),
la).toString();
if(la!=ma)
ka.setAttribute('href',ma);},






_onlinkclick:function(ka){
ja.lookBusy(ka);
ia.go(ka.getAttribute('href'));
return false;},





_onformsubmit:function(event){
var ka=event.getTarget();


if(l.getAttribute(ka,'rel')||l.getAttribute(ka,'target'))
return;


w('form',ka,event).
set_namespace('page_transition');
var la=da('page_transitions',ka,event,{mode:'DEDUP'}).
uai_fallback(null,'form'),
ma=a.ArbiterMonitor;
if(ma)
ma.initUA(la,[ka]);


var na=new s(l.getAttribute(ka,'action')||''),
oa=x
(ia._most_recent_uri,
na);

ka.setAttribute('action',oa.toString());
if((l.getAttribute(ka,'method')||'GET').toUpperCase()==='GET'){
ia.go(oa.addQueryData(l.serialize(ka)));
event.kill();}},











go:function(ka,la){



var ma=new s(ka).removeQueryData('quickling').
getQualifiedURI();

n.create('pagetransition').
debug('go',{uri:ma.toString()});


ha(ma);











!la&&w('uri',
{href:ma.toString()},
null,
'INDIRECT');








ja.lookBusy();

ia._loadPage(ma,function(na){
if(na){
m.go(ma.toString(),false,la);}else 

aa(window.location,ma,la);});},








_historyManagerHandler:function(ka){
if(ka.charAt(0)!='/')
return false;

w('h',{href:ka});
da('page_transitions').uai(null,'history_manager');

ia._loadPage(new s(ka),function(la){
if(!la)
aa(window.location,ka,true);});

return true;},














_loadPage:function(ka,la){
if(s(ka).getFragment()&&
v
(s(ka).setFragment(null).getQualifiedURI(),
s(ia._current_uri).setFragment(null).getQualifiedURI())){


ia._current_uri=ia._most_recent_uri=ka;
ia.restoreScrollPosition();
ja.stopLookingBusy();
return;}


var ma;
if(ia._current_uri)
ma=ga(ia._current_uri);



ia._current_uri=null;

ia._next_uri=ka;

if(ma)







j.scrollTo(ma,false);


var na=function(){
ia._scroll_locked=true;
var pa=ia._handleTransition(ka);
la&&la(pa);},


oa=p.runHooks('onbeforeleavehooks');
if(oa){
ja.stopLookingBusy();
ia._warnBeforeLeaving(oa,na);}else 

na();},

















_handleTransition:function(ka){
window.onbeforeleavehooks=undefined;
ja.lookBusy();


if(!ka.isSameOrigin())
return false;


var la=window.AsyncRequest&&window.AsyncRequest.getLastID();
g.inform("pre_page_transition",
{from:ia.getMostRecentURI(),to:ka});
for(var ma=ia._transition_handlers.length-1;ma>=0;--ma){
var na=ia._transition_handlers[ma];
if(!na)
continue;

for(var oa=na.length-1;oa>=0;--oa)
if(na[oa](ka)===true){

var pa={sender:this,uri:ka,id:la};

try{g.inform("page_transition",pa);}catch(
qa){







}



return true;}else 



na.splice(oa,1);}




return false;},





unifyURI:function(){
ia._current_uri=
ia._most_recent_uri=
ia._next_uri;},







transitionComplete:function(ka){
ia._executeCompletionCallback();
ja.stopLookingBusy();
ia.unifyURI();

if(!ka)
ia.restoreScrollPosition();




try{if(document.activeElement&&
document.activeElement.nodeName==='A')
document.activeElement.blur();}catch(

la){
}},


_executeCompletionCallback:function(){
if(ia._completionCallback)
ia._completionCallback();

ia._completionCallback=null;},








setCompletionCallback:function(ka){
ia._completionCallback=ka;},






rewriteCurrentURI:function(ka,la){
ia.registerHandler
(function(){
if(ka==
ia.getMostRecentURI().getUnqualifiedURI().toString()){
ia.transitionComplete();
return true;}});



ia.go(la,true);},










_warnBeforeLeaving:function(ka,la){
new h().
setTitle("Are you sure you want to leave this page?").
setBody(q(ka)).
setButtons


([{name:'leave_page',
label:"Leave this Page",
handler:la},


{name:'continue_editing',
label:"Stay on this Page",
className:'inputaux'}]).



setModal(true).
show();},







restoreScrollPosition:function(){
ia._scroll_locked=false;

var ka=ia._current_uri,

la=ga(ka);
if(la){
j.scrollTo(la,false);
return;}


function ma(pa){


if(!pa)
return null;

var qa="a[name='"+r(pa)+"']";
return i.scry(document.body,qa)[0]||z(pa);}


var na=ma(s(ka).getFragment());
if(na){
var oa=u.getElementPosition(na);
oa.x=0;
j.scrollTo(oa);}}},





ja=window._BusyUIManager||

{_looking_busy:false,


_original_cursors:[],


















lookBusy:function(ka){
if(ka)
ja._giveProgressCursor(ka);


if(ja._looking_busy)
return;

ja._looking_busy=true;

ja._giveProgressCursor(document.documentElement);},





stopLookingBusy:function(){
if(!ja._looking_busy)
return;

ja._looking_busy=false;

while(ja._original_cursors.length){
var ka=ja._original_cursors.pop(),
la=ka[0],
ma=ka[1];
if(la.style)
la.style.cursor=ma||'';}},








_giveProgressCursor:function(ka){
if(!t.safari()){
ja._original_cursors.push([ka,ka.style.cursor]);
ka.style.cursor='progress';}}};





e.exports=ia;});

/** js/lib/util/page_transition.js */
__d("legacy:page-transitions",["computeRelativeURI","HistoryManager","PageTransitions"],function(a,b,c,d){



a.computeRelativeURI=b('computeRelativeURI');
a.HistoryManager=a.HistoryManager||b('HistoryManager');
a.PageTransitions=a.PageTransitions||b('PageTransitions');},

3);

/** js/lib/dom/form.js */
__d("legacy:dom-form",["Form"],function(a,b,c,d){



a.Form=b('Form');},

3);

/** js/lib/ui/dialog.js */
__d("legacy:dialog",["Dialog"],function(a,b,c,d){



var e=b('Dialog');
a.Dialog=e;},

3);

/** js/modules/AjaxPipeRequest.js */
__d("AjaxPipeRequest",["Arbiter","AsyncRequest","BigPipe","CSS","DOM","Env","JSCC","ScriptPathState","URI","copyProperties","goOrReplace","ge"],function(a,b,c,d,e,f){









var g=b('Arbiter'),
h=b('AsyncRequest'),
i=b('BigPipe'),
j=b('CSS'),
k=b('DOM'),
l=b('Env'),
m=b('JSCC'),
n=b('ScriptPathState'),
o=b('URI'),

p=b('copyProperties'),
q=b('goOrReplace'),
r=b('ge'),

s;

function t(w,x){





var y=r(w);
if(y){
if(!x)
y.style.minHeight='600px';



for(var z in i.pageletIDs)
if(w!==z&&k.contains(y,z)){
g.inform('ajaxpipe/clear_pagelet',{pagelet_id:z});
m.clearForPagelet(z);
delete i.pageletIDs[z];}


k.empty(y);}}



function u(w,x){
var y=r(w);
if(y&&!x)
y.style.minHeight='100px';}



function v(w,x){
this._uri=w;
this._query_data=x;
this._request=new h();
this._canvas_id=null;
this._allow_cross_page_transition=true;}


p(v.prototype,




{setCanvasId:function(w){
this._canvas_id=w;
return this;},





setURI:function(w){
this._uri=w;
return this;},





setData:function(w){
this._query_data=w;
return this;},


getData:function(w){
return this._query_data;},





setAllowCrossPageTransition:function(w){
this._allow_cross_page_transition=w;
return this;},


setAppend:function(w){
this._append=w;
return this;},





send:function(){
var w=
{ajaxpipe:1,
ajaxpipe_token:l.ajaxpipe_token};


p(w,n.getParams());
n.reset();

if(this._pageletCacheMiss)
w.pcmiss=1;

this._request.
setOption('useIframeTransport',true).
setURI(this._uri).
setData(p(w,this._query_data)).
setPreBootloadHandler(this._preBootloadHandler.bind(this)).
setInitialHandler(this._onInitialResponse.bind(this)).
setHandler(this._onResponse.bind(this)).
setMethod('GET').
setReadOnly(true).
setAllowCrossPageTransition(this._allow_cross_page_transition);

if(this._automatic){
this._relevantRequest=s;}else 

s=this._request;


this._request.send();
return this;},





_preBootloadFirstResponse:function(w){
return false;},





_fireDomContentCallback:function(){
this._arbiter.inform('ajaxpipe/domcontent_callback',
true,g.BEHAVIOR_STATE);},





_fireOnloadCallback:function(){
this._arbiter.inform('ajaxpipe/onload_callback',
true,g.BEHAVIOR_STATE);},








_isRelevant:function(w){
return this._request==s||
(this._automatic&&this._relevantRequest==s)||
this._jsNonBlock;},














_preBootloadHandler:function(w){

var x=w.getPayload();
if(!x||x.redirect||!this._isRelevant(w))
return false;


var y=false;
if(w.is_first){
!this._append&&!this._displayCallback&&t
(this._canvas_id,
this._constHeight);

this._arbiter=new g();
y=this._preBootloadFirstResponse(w);

this.pipe=new i
({arbiter:this._arbiter,
rootNodeID:this._canvas_id,
lid:this._request.lid,
isAjax:true,
domContentCallback:this._fireDomContentCallback.bind(this),
onloadCallback:this._fireOnloadCallback.bind(this),
domContentEvt:'ajaxpipe/domcontent_callback',
onloadEvt:'ajaxpipe/onload_callback',
jsNonBlock:this._jsNonBlock,
automatic:this._automatic,
displayCallback:this._displayCallback});}



return y;},





_redirect:function(w){
if(w.redirect){
if(w.force||!this.isPageActive(w.redirect)){
var x=['ajaxpipe','ajaxpipe_token'].concat
(this.getSanitizedParameters());
q
(window.location,
o(w.redirect).removeQueryData(x),
true);}else 

PageTransitions.go(w.redirect,true);

return true;}else 

return false;},



isPageActive:function(w){
return true;},


getSanitizedParameters:function(){
return [];},



_versionCheck:function(w){
return true;},



















_onInitialResponse:function(w){
var x=w.getPayload();

if(!this._isRelevant(w))
return false;


if(!x)



return true;


if(this._redirect(x)||!this._versionCheck(x))
return false;


return true;},







_processFirstResponse:function(w){
var x=w.getPayload();
if(r(this._canvas_id)&&x.canvas_class!==null)
j.setClass(this._canvas_id,x.canvas_class);},



setFirstResponseCallback:function(w){
this._firstResponseCallback=w;
return this;},


setFirstResponseHandler:function(w){
this._processFirstResponse=w;
return this;},





_onResponse:function(w){
var x=w.payload;

if(!this._isRelevant(w))
return h.suppressOnloadToken;


if(w.is_first){
this._processFirstResponse(w);
this._firstResponseCallback&&this._firstResponseCallback();
x.provides=x.provides||[];
x.provides.push('uipage_onload');
if(this._append)
x.append=this._canvas_id;}



if(x){
if('content' in x.content&&
this._canvas_id!==null&&this._canvas_id!='content'){


x.content[this._canvas_id]=x.content.content;
delete x.content.content;}


if(this._pageletCacheMiss)
if(w.is_first){



x.id=this._pageletCacheMiss.id;
x.cacheable=true;
x.cache_controller=this._pageletCacheMiss.cache_controller;
x.cache_type=this._pageletCacheMiss.cache_type;
x.key=this._pageletCacheMiss.key;}else 

x.cache_parent=this._pageletCacheMiss.id;


this.pipe.onPageletArrive(x);}


if(w.is_last)
u(this._canvas_id,this._constHeight);


return h.suppressOnloadToken;},


setNectarModuleDataSafe:function(w){
this._request.setNectarModuleDataSafe(w);
return this;},


setFinallyHandler:function(w){
this._request.setFinallyHandler(w);
return this;},


setErrorHandler:function(w){
this._request.setErrorHandler(w);
return this;},


abort:function(){
this._request.abort();
if(s==this._request)
s=null;

this._request=null;
return this;},


setJSNonBlock:function(w){
this._jsNonBlock=w;
return this;},


setAutomatic:function(w){
this._automatic=w;
return this;},


setDisplayCallback:function(w){
this._displayCallback=w;
return this;},


setPageletCacheMiss:function(w){
this._pageletCacheMiss=w;
return this;},


setConstHeight:function(w){
this._constHeight=w;
return this;},


getAsyncRequest:function(){
return this._request;}});



p(v,

{getCurrentRequest:function(){
return s;},


setCurrentRequest:function(w){
s=w;}});



e.exports=v;});

/** js/modules/BehaviorsMixin.js */
__d("BehaviorsMixin",["copyProperties"],function(a,b,c,d,e,f){









var g=b('copyProperties');





function h(l){
this._behavior=l;
this._enabled=false;}










g(h.prototype,
{enable:function(){
if(!this._enabled){
this._enabled=true;
this._behavior.enable();}},


disable:function(){
if(this._enabled){
this._enabled=false;
this._behavior.disable();}}});





var i=1;

function j(l){
if(!l.__BEHAVIOR_ID)
l.__BEHAVIOR_ID=i++;

return l.__BEHAVIOR_ID;}


var k=






{enableBehavior:function(l){
if(!this._behaviors)
this._behaviors={};

var m=j(l);
if(!this._behaviors[m])
this._behaviors[m]=new h(new l(this));

this._behaviors[m].enable();
return this;},








disableBehavior:function(l){
if(this._behaviors){
var m=j(l);
if(this._behaviors[m])
this._behaviors[m].disable();}


return this;},








enableBehaviors:function(l){
l.forEach(this.enableBehavior.bind(this));
return this;},









destroyBehaviors:function(){
if(this._behaviors){
for(var l in this._behaviors)
this._behaviors[l].disable();

this._behaviors={};}}};




e.exports=k;});

/** js/modules/DocumentTitle.js */
__d("DocumentTitle",["Arbiter"],function(a,b,c,d,e,f){




















var g=b('Arbiter'),

h=document.title,
i=null,
j=1500,
k=[],
l=0,
m=null,
n=false;

function o(){
if(k.length>0){
if(!n){
p(k[l].title);
l=++l%k.length;}else 

q();}else{



clearInterval(m);
m=null;

q();}}



function p(s){
document.title=s;
n=true;}


function q(){
r.set(i||h,true);
n=false;}


var r=






{get:function(){
return h;},











set:function(s,t){
document.title=s;
if(!t){
h=s;
i=null;
g.inform('update_title',s);}else 

i=s;},
















blink:function(s){
var t={title:s};

k.push(t);
if(m===null)
m=setInterval(o,j);


return {stop:function(){
var u=k.indexOf(t);
if(u>=0){
k.splice(u,1);



if(l>u){
l--;}else
if(l==u&&
l==k.length)
l=0;}}};}};







e.exports=r;});

/** js/modules/JSONPTransport.js */
__d("JSONPTransport",["ArbiterMixin","DOM","HTML","URI","copyProperties"],function(a,b,c,d,e,f){



var g=b('ArbiterMixin'),
h=b('DOM'),
i=b('HTML'),
j=b('URI'),

k=b('copyProperties'),


l={},


m=2,


n='jsonp',
o='iframe';

function p(r){
delete l[r];}









function q(r,s){





this._type=r;
this._uri=s;

l[this.getID()]=this;}


k(q,








{respond:function(r,s,t){
var u=l[r];
if(u){
if(!t)
p(r);

if(u._type==o)






s=JSON.parse(JSON.stringify(s));


a.async_callback
(u.handleResponse.bind(u),
'json')
(s);}else 


if(a.logJSError&&!t)
a.logJSError('ajax',
{error:'UnexpectedJsonResponse',
extra:
{id:r,
uri:(s.payload&&s.payload.uri)||''}});}});








k(q.prototype,g,

{getID:function(){
return this._id||(this._id=m++);},


hasFinished:function(){
return !(this.getID() in l);},


getRequestURI:function(){

return j(this._uri).addQueryData
({__a:1,
__adt:this.getID()});},



getTransportFrame:function(){
if(this._iframe)
return this._iframe;

var r='transport_frame_'+this.getID(),




s=i
('<iframe class="hidden_elem" name="'+r+'" src="javascript:void(0)" />');

return this._iframe=h.appendContent(document.body,s)[0];},


send:function(){






if(this._type===n){


(function(){
h.appendContent
(document.body,
h.create('script',
{src:this.getRequestURI().toString(),
type:'text/javascript'}));}).


bind(this).defer();}else 

this.getTransportFrame().src=this.getRequestURI().toString();},



handleResponse:function(r){
this.inform('response',r);
if(this.hasFinished())


this._cleanup.bind(this).defer();},



abort:function(){
if(this._aborted)
return;

this._aborted=true;
this._cleanup();
p(this.getID());
this.inform('abort');},


_cleanup:function(){
if(this._iframe){

h.remove(this._iframe);
this._iframe=null;}}});





e.exports=q;});

/** js/modules/Selection.js */
__d("InputSelection",["DOM","Input"],function(a,b,c,d,e,f){



var g=b('DOM'),
h=b('Input'),

i=







{get:function(j){







if(!document.selection)

return {start:j.selectionStart,end:j.selectionEnd};


var k=document.selection.createRange();
if(k.parentElement()!==j)



return {start:0,end:0};


var l=j.value.length;

if(g.isNodeOfType(j,'input')){

return {start:-k.moveStart('character',-l),
end:-k.moveEnd('character',-l)};}else{


var m=k.duplicate();
m.moveToElementText(j);
m.setEndPoint('StartToEnd',k);
var n=l-m.text.length;
m.setEndPoint('StartToStart',k);

return {start:l-m.text.length,
end:n};}},












set:function(j,k,l){






if(typeof l=='undefined')
l=k;

if(document.selection){


if(j.tagName=='TEXTAREA'){
var m=
(j.value.slice(0,k).match(/\r/g)||[]).length,
n=
(j.value.slice(k,l).match(/\r/g)||[]).length;
k-=m;
l-=m+n;}

var o=j.createTextRange();
o.collapse(true);
o.moveStart('character',k);
o.moveEnd('character',l-k);
o.select();}else{

j.selectionStart=k;
j.selectionEnd=Math.min(l,j.value.length);
h.focus(j);}}};





e.exports=i;});

/** js/modules/UserActivity.js */
__d("UserActivity",["event-extensions","Arbiter"],function(a,b,c,d,e,f){


b('event-extensions');

var g=b('Arbiter'),








h=5000,
i=500,
j=-5,
k=Date.now(),
l=k,

m=
{subscribeOnce:function(o){
var p=m.subscribe(function(){
m.unsubscribe(p);
o();});},






subscribe:function(o){
return g.subscribe('useractivity/activity',o);},






unsubscribe:function(o){
o.unsubscribe();},







isActive:function(o){
return (new Date()-k<
(o||h));},





getLastInformTime:function(){
return l;}};




function n(event){
k=Date.now();
var o=k-l;
if(o>i){
l=k;
g.inform('useractivity/activity',
{event:event,
idleness:o,
last_inform:l});}else


if(o<j)
l=k;}



Event.listen(window,'scroll',n);
Event.listen(document.documentElement,
{DOMMouseScroll:n,
mousewheel:n,
keydown:n,
mouseover:n,
click:n});







g.subscribe('Event/stop',function(o,p){
n(p.event);});


e.exports=m;});

/** js/modules/enforceMaxLength.js */
__d("enforceMaxLength",["event-extensions","function-extensions","DOM","Input","InputSelection"],function(a,b,c,d,e,f){



b('event-extensions');
b('function-extensions');

var g=b('DOM'),
h=b('Input'),
i=b('InputSelection'),

j=function(m,n){
var o=h.getValue(m),
p=o.length,
q=p-n;
if(q>0){
var r,
s;





try{r=i.get(m);
s=r.end;}catch(
t){
r=null;
s=0;}


if(s>=q)
p=s;

var u=p-q;
if(u&&(o.charCodeAt(u-1)&64512)===55296)

u--;

s=Math.min(s,u);
h.setValue(m,o.slice(0,u)+o.slice(p));
if(r)
i.set(m,Math.min(r.start,s),s);}},




k=function(event){
var m=event.getTarget(),
n=m.getAttribute&&parseInt(m.getAttribute('maxlength'),10);
if(n>0&&g.isNodeOfType(m,['input','textarea']))

j.bind(null,m,n).defer();},



l='maxLength' in g.create('input')&&
'maxLength' in g.create('textarea');

if(!l)
Event.listen(document.documentElement,{keydown:k,paste:k});


e.exports=j;});

/** js/modules/submitForm.js */
__d("submitForm",["DOM"],function(a,b,c,d,e,f){



var g=b('DOM'),







h=function(i){
var j=g.scry(i,'input[type="submit"]')[0];
if(j){
j.click();}else{

j=g.create('input',
{type:'submit',
className:'hidden_elem'});

g.appendContent(i,j);
j.click();
g.remove(j);}};



e.exports=h;});

/** js/ui/UIPagelet.js */
__d("UIPagelet",["AjaxPipeRequest","AsyncRequest","DOM","HTML","ScriptPathState","URI","copyProperties","emptyFunction","ge"],function(a,b,c,d,e,f){
























var g=b('AjaxPipeRequest'),
h=b('AsyncRequest'),
i=b('DOM'),
j=b('HTML'),
k=b('ScriptPathState'),
l=b('URI'),

m=b('copyProperties'),
n=b('emptyFunction'),
o=b('ge');

function p(q,
r,
s,
t){

this._id=q||null;
this._element=o(q||i.create('div'));
this._src=r||null;
this._context_data=s||{};
this._data=t||{};
this._handler=n;
this._request=null;
this._use_ajaxpipe=false;
this._is_bundle=true;
this._allow_cross_page_transition=false;
this._append=false;
return this;}



































































p.loadFromEndpoint=function(q,
r,
s,
t){

t=t||{};

var u='/ajax/pagelet/generic.php/';
if(t.intern)
u='/intern'+u;


var v=new l((u+q).replace(/\/+/g,'/'));
if(t.subdomain)
v.setSubdomain(t.subdomain);










var w=new p(r,v,s).
setUseAjaxPipe(t.usePipe).
setPageletCacheMiss(t.pageletCacheMiss).


setBundleOption(q.substring(0,8)!='/intern/'&&
t.bundle!==false).
setAppend(t.append).
setJSNonBlock(t.jsNonblock).
setAutomatic(t.automatic).
setDisplayCallback(t.displayCallback).
setConstHeight(t.constHeight).
setAllowCrossPageTransition(t.crossPage);

t.handler&&w.setHandler(t.handler);
w.go();

return w;};


m(p.prototype,






{getElement:function(q){
q=q||false;
if(q)
this._element=o(this._id);

return this._element;},











setHandler:function(q){
this._handler=q;
return this;},















go:function(q,r){
if(arguments.length>=2||typeof q=='string'){
this._src=q;
this._data=r||{};}else
if(arguments.length==1)
this._data=q;


this.refresh();
return this;},


setAllowCrossPageTransition:function(q){
this._allow_cross_page_transition=q;
return this;},


setBundleOption:function(q){
this._is_bundle=q;
return this;},


refresh:function(q){
var r=function(u){
this._request=null;
if(q&&this._id)
this._element=o(this._id);

var v=j(u.getPayload());
if(this._append){
i.appendContent(this._element,v);}else 

i.setContent(this._element,v);

this._handler();}.
bind(this);

if(this._use_ajaxpipe){
k.setIsUIPageletRequest(true);
this._request=new g();
this._request.setCanvasId(this._id).
setAppend(this._append).
setConstHeight(this._constHeight).
setJSNonBlock(this._jsNonblock).
setAutomatic(this._automatic).
setPageletCacheMiss(this._pageletCacheMiss).
setDisplayCallback(this._displayCallback);}else{

var s=this._displayCallback;
this._request=new h().
setMethod('GET').
setReadOnly(true).
setOption('bundle',this._is_bundle).
setHandler(function(u){
if(s){
s(r.curry(u));}else 

r(u);});}



var t={};
m(t,this._context_data);
m(t,this._data);
this._request.
setURI(this._src).
setAllowCrossPageTransition(this._allow_cross_page_transition).
setData({data:JSON.stringify(t)}).
send();
return this;},








cancel:function(){
if(this._request)
this._request.abort();},















setUseAjaxPipe:function(q){
this._use_ajaxpipe=!!q;
return this;},


setPageletCacheMiss:function(q){
this._pageletCacheMiss=q;
return this;},


setAppend:function(q){
this._append=!!q;
return this;},


setJSNonBlock:function(q){
this._jsNonblock=!!q;
return this;},


setAutomatic:function(q){
this._automatic=!!q;
return this;},


setDisplayCallback:function(q){
this._displayCallback=q;
return this;},


setConstHeight:function(q){
this._constHeight=!!q;
return this;}});



e.exports=p;});

/** js/ui/xhp/form/modules/FormDisableOnSubmit.js */
__d("FormDisableOnSubmit",["copyProperties"],function(a,b,c,d,e,f){



var g=b('copyProperties');

function h(i){
this._form=i;}


g(h.prototype,
{_subscription:null,
_disabled:false,

enable:function(){
this._subscription=this._form.subscribe
(['submit','reset'],
this._handle.bind(this));},



disable:function(){
this._form.unsubscribe(this._subscription);
this._subscription=null;},


_handle:function(i,j){
if(i=='submit'){


if(this._disabled)
return false;



this._disabled=true;
return true;}



this._disabled=false;}});



e.exports=h;});

/** js/ui/xhp/form/modules/FormSubmitOnChange.js */
__d("FormSubmitOnChange",["event-extensions","copyProperties","submitForm"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('copyProperties'),
h=b('submitForm');

function i(j){
this._form=j;}


g(i.prototype,
{_listener:null,

enable:function(){
this._listener=Event.listen
(this._form.getRoot(),
'change',
this._submit.bind(this));},



disable:function(){
this._listener.remove();
this._listener=null;},


_submit:function(){
h(this._form.getRoot());}});



e.exports=i;});

/** js/ui/xhp/form/modules/UIForm.js */
__d("UIForm",["event-extensions","ArbiterMixin","BehaviorsMixin","Class","DOM","Form","FormDisableOnSubmit","FormSubmitOnChange","Run","areObjectsEqual","copyProperties"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('ArbiterMixin'),
h=b('BehaviorsMixin'),
i=b('Class'),
j=b('DOM'),
k=b('Form'),
l=b('FormDisableOnSubmit'),
m=b('FormSubmitOnChange'),
n=b('Run'),

o=b('areObjectsEqual'),
p=b('copyProperties');












function q(r,s,t,u){
this._root=r;



this.controller=r;


this._message=s;


n.onAfterLoad
(function(){
this._originalState=k.serialize(this._root);}.
bind(this));


this._forceDirty=t;
this._submitted=false;

Event.listen(this._root,'submit',this._handleSubmit.bind(this));

if(u&&u.length)
this.enableBehaviors(u);



var v=true;
n.onBeforeUnload
(this.checkUnsaved.bind(this),
v);}



p(q.prototype,g,h,

{getRoot:function(){
return this._root;},


_handleSubmit:function(){
if(this.inform('submit')===false)
return false;

this._submitted=true;
return true;},





reset:function(){
this.inform('reset');
this._submitted=false;},





isDirty:function(){

if(this._submitted||!j.contains(document.body,this._root))
return false;


if(this._forceDirty)
return true;


var r=k.serialize(this._root);
return !o(r,this._originalState);},





checkUnsaved:function(){
if(this.isDirty())
return this._message;


return null;}});




e.exports=a.UIForm||q;});

/** js/channel2/constants.js */
__d("legacy:ChannelConstants",["ChannelConstants"],function(a,b,c,d){



a.ChannelConstants=b('ChannelConstants');},

3);

/** js/chat/ChatConfig.js */
__d("ChatConfig",["copyProperties","ChatConfigInitialData"],function(a,b,c,d,e,f){



var g=c('ChatConfigInitialData'),

h=b('copyProperties'),

i={},

j=
{get:function(k,l){
return k in i?i[k]:l;},


set:function(k){
if(arguments.length>1){
var l={};
l[k]=arguments[1];
k=l;}

h(i,k);},


getDebugInfo:function(){
return i;}};



j.set(g);

e.exports=j;});

/** js/ui/xhp/button/Button-legacy.js */
__d("legacy:Button",["Button"],function(a,b,c,d){



a.Button=b('Button');},

3);

/** js/desktop/auth/FBDesktopDetect.js */
__d("FBDesktopDetect",["UserAgent"],function(a,b,c,d,e,f){






var g=b('UserAgent'),

h='facebook.desktopplugin',

i=
{mimeType:'application/x-facebook-desktop-1',

isPluginInstalled:function(){
if(g.osx())


return false;

var j=null;
if(a.ActiveXObject){

try{j=new a.ActiveXObject(h);
if(j)
return true;}catch(

k){}}else
if(a.navigator&&a.navigator.plugins){
a.navigator.plugins.refresh(false);
for(var l=0,m=a.navigator.plugins.length;l<m;l++){
j=a.navigator.plugins[l];



if(j.length&&j[0].type===this.mimeType)
return true;}}




return false;}};



e.exports=i;});

/** js/fbx/NavigationMessage.js */
__d("NavigationMessage",[],function(a,b,c,d,e,f){





var g=


{NAVIGATION_BEGIN:'NavigationMessage/navigationBegin',


NAVIGATION_SELECT:'NavigationMessage/navigationSelect',



NAVIGATION_FIRST_RESPONSE:'NavigationMessage/navigationFirstResponse',




NAVIGATION_COMPLETED:'NavigationMessage/navigationCompleted',



NAVIGATION_FAILED:'NavigationMessage/navigationFailed',




NAVIGATION_COUNT_UPDATE:'NavigationMessage/navigationCount',





NAVIGATION_FAVORITE_UPDATE:'NavigationMessage/navigationFavoriteUpdate',



NAVIGATION_ITEM_REMOVED:'NavigationMessage/navigationItemRemoved',



NAVIGATION_ITEM_HIDDEN:'NavigationMessage/navigationItemHidden',


INTERNAL_LOADING_BEGIN:'NavigationMessage/internalLoadingBegin',


INTERNAL_LOADING_COMPLETED:'NavigationMessage/internalLoadingCompleted'};



e.exports=g;});

/** js/lib/dom/html.js */
__d("legacy:dom-html",["HTML"],function(a,b,c,d){



a.HTML=b('HTML');},

3);

/** js/modules/core/coalesce.js */
__d("coalesce",[],function(a,b,c,d,e,f){













function g(){
for(var h=0;h<arguments.length;++h)
if(arguments[h]!=null)
return arguments[h];


return null;}


e.exports=g;});

/** js/modules/OnVisible.js */
__d("OnVisible",["event-extensions","Arbiter","DOM","Run","Vector","ViewportBounds","coalesce","copyProperties"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('Arbiter'),
h=b('DOM'),
i=b('Run'),
j=b('Vector'),
k=b('ViewportBounds'),

l=b('coalesce'),
m=b('copyProperties'),

n=[],
o,
p=[],
q,
r,
s,
t;

function u(){
n.forEach(function(aa){
aa.remove();});


if(r){
r.remove();
q.remove();
o.unsubscribe();
r=q=o=null;}


n.length=0;}


function v(){
if(!n.length){
u();
return;}


p.length=0;
s=j.getScrollPosition().y;
t=j.getViewportDimensions().y;





for(var aa=0;aa<n.length;++aa){
var ba=n[aa];

if(isNaN(ba.elementHeight))
p.push(aa);


ba.elementHeight=j.getElementDimensions(ba.element).y;
ba.elementPos=j.getElementPosition(ba.element);}}



function w(){
var aa=k.getTop();


for(var ba=n.length-1;ba>=0;--ba){
var ca=n[ba];


if(!ca.elementPos||ca.removed){
n.splice(ba,1);
continue;}



var da=s+t+ca.buffer;



if(da>ca.elementPos.y){
var ea=!ca.strict||
(s+aa-ca.buffer<
(ca.elementPos.y+ca.elementHeight));

if(ea){
ca.remove();
ca.handler(p.indexOf(ba)!==-1);}}}}





function x(){

y();

if(n.length)
return;


r=Event.listen(window,'scroll',y);
q=Event.listen(window,'resize',y);
o=g.subscribe('dom-scroll',y);}


function y(){
h.queryThenMutate(v,w,'OnVisible/positionCheck');}




















function z(aa,ba,ca,da){
this.element=aa;
this.handler=ba;
this.strict=ca;
this.buffer=l(da,300);

if(n.length===0)
i.onLeave(u);


x();
n.push(this);}


m(z.prototype,
{remove:function(){
this.removed=true;},


reset:function(){
this.elementHeight=null;
n.indexOf(this)===-1&&n.push(this);
x();},


setBuffer:function(aa){
this.buffer=aa;}});



e.exports=z;});

/** js/onvisible.js */
__d("legacy:onvisible",["OnVisible"],function(a,b,c,d){



a.OnVisible=b('OnVisible');},

3);

/** js/lib/dom/Style-legacy.js */
__d("legacy:Style",["Style"],function(a,b,c,d){



a.Style=b('Style');},

3);

/** js/lib/dom/misc.js */












function show(){
for(var a=0;a<arguments.length;a++){
var b=ge(arguments[a]);
if(b&&b.style)b.style.display='';}

return false;}







function hide(){
for(var a=0;a<arguments.length;a++){
var b=ge(arguments[a]);
if(b&&b.style)b.style.display='none';}

return false;}







function shown(a){
a=ge(a);
return (a.style.display!='none'&&!(a.style.display==''&&a.offsetWidth==0));}







function toggle(){
for(var a=0;a<arguments.length;a++){
var b=$(arguments[a]);
b.style.display=Style.get(b,"display")=='block'?'none':'block';}

return false;}







function toggleDisplayNone(){
for(var a=0;a<arguments.length;a++){
var b=$(arguments[a]);
if(shown(b)){
hide(b);}else 

show(b);}


return false;}

/** js/lib/event/legacy-extensions.js */
__d("legacy:event-extensions",["event-extensions"],function(a,b,c,d){



b('event-extensions');},

3);

/** js/lib/ua/ua.js */
__d("legacy:ua",["UserAgent"],function(a,b,c,d){



a.ua=b('UserAgent');},

3);

/** js/lib/ui/animation.js */
__d("legacy:animation",["Animation"],function(a,b,c,d){



a.animation=b('Animation');},

3);

/** js/lib/util/array.js */
__d("legacy:array-utils",["createArrayFrom","hasArrayNature"],function(a,b,c,d){



a.$A=b('createArrayFrom');
a.hasArrayNature=b('hasArrayNature');},

3);

/** js/logging/EagleEye.js */
__d("EagleEye",["Arbiter","Env","OnloadEvent","isInIframe"],function(a,b,c,d,e,f){





var g=b('Arbiter'),
h=b('Env'),
i=b('OnloadEvent'),

j=b('isInIframe'),

k=h.eagleEyeConfig||{},
l='_e_',
m=(window.name||'').toString();
if(m.length==7&&m.substr(0,3)==l){
m=m.substr(3);}else{

m=k.seed;

if(!j())
window.name=l+m;}




var n=
(window.location.protocol=='https:'&&document.cookie.match(/\bcsm=1/))?
'; secure':'',

o=l+m+'_',

p=new Date(Date.now()+604800000).toGMTString(),
q=window.location.hostname.replace(/^.*(facebook\..*)$/i,'$1'),
r='; expires='+p+';path=/; domain='+q+n,
s=0,
t,
u=k.sessionStorage&&a.sessionStorage,
v=document.cookie.length,
w=false,
x=Date.now();

function y(ca){
return o+(s++)+'='+encodeURIComponent(ca)+r;}


function z(){
var ca=[],
da=false,
ea=0,
fa=0;


this.isEmpty=function(){
return !ca.length;};


this.enqueue=function(ga,ha){
if(ha){
ca.unshift(ga);}else 

ca.push(ga);};



this.dequeue=function(){
ca.shift();};


this.peek=function(){
return ca[0];};








this.clear=function(ga){


v=Math.min(v,document.cookie.length);
if(!w&&(new Date()-x>60000))
w=true;





var ha=!ga&&(document.cookie.search(l)>=0),


ia=!!h.cookie_header_limit,
ja=h.cookie_count_limit||19,
ka=h.cookie_header_limit||3950,

la=ja-5,
ma=ka-1000;



while(!this.isEmpty()){
var na=y(this.peek());


































if(ia&&
(na.length>ka||
(w&&
na.length+v>ka))){











this.dequeue();
continue;}

if((ha||ia)&&
((document.cookie.length+na.length>ka)||
(document.cookie.split(';').length>ja)))









break;








document.cookie=na;
ha=true;
this.dequeue();}
















var oa=Date.now();
if(ga||!da&&ha&&

((fa>0)&&
(Math.min(10*Math.pow(2,fa-1),
60000)+ea<oa))&&

g.query(i.ONLOAD)&&

(!this.isEmpty()||
(document.cookie.length>ma)||
(document.cookie.split(';').length>la))){
var pa=new Image(),



qa=this,
ra=h.tracking_domain||'';
da=true;
pa.onload=function ua(){
da=false;
fa=0;
qa.clear();};

pa.onerror=pa.onabort=function ua(){
da=false;
ea=Date.now();
fa++;};




var sa=h.fb_isb?'&fb_isb='+h.fb_isb:'',




ta='&__user='+h.user;



pa.src=ra+'/ajax/nectar.php?asyncSignal='+
(Math.floor(Math.random()*10000)+1)+
sa+ta+
'&'+(!ga?'':'s=')+oa;}};}




t=new z();

if(u){












var aa=function(){

var ca=0,




da=ca;

function ea(){
var ha=sessionStorage.getItem('_e_ids');
if(ha){


var ia=(ha+'').split(';');
if(ia.length==2){
ca=parseInt(ia[0],10);
da=parseInt(ia[1],10);}}}




function fa(){
var ha=ca+';'+da;
sessionStorage.setItem('_e_ids',ha);}


function ga(ha){
return '_e_'+((ha!==undefined)?ha:ca++);}


this.isEmpty=function(){
return da===ca;};





this.enqueue=function(ha,ia){






var ja=ia?ga(--da):ga();
sessionStorage.setItem(ja,ha);
fa();};









this.dequeue=function(){
if(this.isEmpty())
emptyFunction('queue is empty');

sessionStorage.removeItem(ga(da));
da++;
fa();};


this.peek=function(){
var ha=sessionStorage.getItem(ga(da));
return ha?(ha+''):ha;};




this.clear=t.clear;



ea();};


t=new aa();}


var ba=



{log:function(ca,da,ea){



if(h.no_cookies)
return;


var fa=[m,Date.now(),ca].concat(da);
fa.push(fa.length);

function ga(){
var ha=JSON.stringify(fa);


try{t.enqueue(ha,!!ea);
t.clear(!!ea);}catch(
ia){



if(u&&(ia.code===1000)){

t=new z();
u=false;
ga();}}}









ga();},


getSessionID:function(){
return m;}};




a.EagleEye=e.exports=ba;},

3);

/** js/modules/AsyncRequestNectarLogging.js */
__d("AsyncRequestNectarLogging",["AsyncRequest","Nectar","copyProperties"],function(a,b,c,d,e,f){



var g=b('AsyncRequest'),
h=b('Nectar'),

i=b('copyProperties');






i(g.prototype,










{setNectarModuleData:function(j){
if(this.method=='POST')
h.addModuleData(this.data,j);},










setNectarImpressionId:function(){
if(this.method=='POST')
h.addImpressionID(this.data);}});});

/** js/ui/layer/behaviors/LayerDestroyOnHide.js */
__d("LayerDestroyOnHide",["function-extensions","copyProperties"],function(a,b,c,d,e,f){



b('function-extensions');

var g=b('copyProperties');

function h(i){
this._layer=i;}


g(h.prototype,
{_subscription:null,
enable:function(){
this._subscription=this._layer.subscribe
('hide',
Function.prototype.defer.shield(this._layer.destroy.bind(this._layer)));},


disable:function(){
if(this._subscription){
this._subscription.unsubscribe();
this._subscription=null;}}});




e.exports=h;});

/** js/ui/layer/behaviors/LayerHideOnEscape.js */
__d("LayerHideOnEscape",["event-extensions","copyProperties","Input","Keys"],function(a,b,c,d,e,f){






b('event-extensions');

var g=b('copyProperties'),
h=b('Input'),
i=b('Keys');

function j(k){
this._layer=k;}


g(j.prototype,
{_subscription:null,

enable:function(){
this._subscription=this._layer.subscribe('key',this._handle.bind(this));},


disable:function(){
this._subscription.unsubscribe();
this._subscription=null;},


_handle:function(k,event){
if(Event.getKeyCode(event)===i.ESC){
var l=this._layer.getCausalElement();
if(l)
if(l.tabIndex!=-1)
h.focus(l);










this._layer.hide();
return false;}}});




e.exports=j;});

/** js/modules/csx.js */
__d("csx",[],function(a,b,c,d,e,f){

















function g(h){
throw new Error('csx(...): Unexpected class selector transformation.');}


e.exports=g;});

/** js/modules/setTimeoutAcrossTransitions.js */
__d("setTimeoutAcrossTransitions",[],function(a,b,c,d,e,f){









function g(h,i){


return setTimeout(h,i,false);}


e.exports=g;});

/** js/ui/xhp/layout/scrollable-area.js */
__d("legacy:ScrollableArea",["ScrollableArea"],function(a,b,c,d){



a.ScrollableArea=b('ScrollableArea');},


3);

/** js/lib/event/onload_action.js */
__d("legacy:onload-action",["OnloadHooks"],function(a,b,c,d){



var e=b('OnloadHooks');

a._onloadHook=e._onloadHook;
a._onafterloadHook=e._onafterloadHook;
a.runHook=e.runHook;
a.runHooks=e.runHooks;
a.keep_window_set_as_loaded=e.keepWindowSetAsLoaded;},

3);

/** js/lib/util/env.js */
__d("legacy:env",["Env"],function(a,b,c,d){



var e=b('Env');

a.Env=e;},

3);

/** js/modules/deferUntil.js */
__d("deferUntil",[],function(a,b,c,d,e,f){




























function g
(h,
i,
j,
k,
l){











var m=i();
if(m){
h(m);
return null;}


var n=Date.now(),
o=setInterval(function(){
m=i();
if(!m){
if(!j||(j<new Date()-n))
return;

l&&l();}

clearInterval(o);
h(m);},
20,k);
return o;}


e.exports=g;});

/** js/lib/util/function_utils.js */
__d("legacy:function-utils",["debounce","throttle","deferUntil"],function(a,b,c,d){



a.debounce=b('debounce');
a.throttle=b('throttle');
a.defer_until=b('deferUntil');},

3);

/** js/listeners/forms/FlipDirectionOnKeypress.js */
__d("FlipDirectionOnKeypress",["event-extensions","DOM","Input","Style"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('DOM'),
h=b('Input'),
i=b('Style');






Event.listen(document.documentElement,'keyup',function(event){
var j=event.getTarget();
if(!g.isNodeOfType(j,['input','textarea']))return;
if(g.isNodeOfType(j,'input')&&j.type=='password')
return;

if(j.getAttribute('data-prevent-auto-flip'))return;
var k=h.getValue(j),
l=(j.style&&j.style.direction);

if(!l){
var m=0,
n=true;



for(var o=0;o<k.length;o++){
var p=k.charCodeAt(o);


if(p>=48){
if(n){
n=false;
m++;}



if(p>=1470&&p<=1920){
i.set(j,'direction','rtl');
return;}

if(m==5){
i.set(j,'direction','ltr');
return;}}else 


n=true;}}else 




if(k.length===0)
i.set(j,'direction','');});});

/** js/listeners/forms/PlaceholderOnsubmitFormListener.js */
__d("PlaceholderOnsubmitFormListener",["event-extensions","Input"],function(a,b,c,d,e,f){



b('event-extensions');

var g=b('Input');

Event.listen(document.documentElement,'submit',function(h){
var i=h.getTarget().getElementsByTagName('*');
for(var j=0;j<i.length;j++)
if(i[j].getAttribute('placeholder')&&
g.isEmpty(i[j]))
g.setValue(i[j],'');});});

/** js/modules/ClickRefUtils.js */
__d("ClickRefUtils",[],function(a,b,c,d,e,f){



var g=







{get_intern_ref:function(h){
if(!!h){








var i=
{profile_minifeed:1,
gb_content_and_toolbar:1,
gb_muffin_area:1,
ego:1,
bookmarks_menu:1,
jewelBoxNotif:1,
jewelNotif:1,
BeeperBox:1,
navSearch:1};

for(var j=h;
j&&j!=document.body;
j=j.parentNode){
if(!j.id||typeof j.id!=='string')
continue;

if(j.id.substr(0,8)=='pagelet_')
return j.id.substr(8);

if(j.id.substr(0,8)=='box_app_')


return j.id;

if(i[j.id])
return j.id;}}



return '-';},








get_href:function(h){
var i=
(h.getAttribute&&
(h.getAttribute('ajaxify')||
h.getAttribute('data-endpoint'))||

h.action||
h.href||
h.name);

return typeof i==='string'?
i:
null;},









should_report:function(h,i){
if(i=='FORCE')
return true;

if(i=='INDIRECT')
return false;



return h&&(g.get_href(h)||
(h.getAttribute&&h.getAttribute('data-ft')));}};



e.exports=g;});

/** js/modules/setUECookie.js */
__d("setUECookie",["Env"],function(a,b,c,d,e,f){



var g=b('Env');

function h(i){
if(!g.no_cookies){

var j=0;
if(a.afterloaded){
j=2;}else
if(a.loaded)
j=1;

document.cookie="act="+encodeURIComponent(i+":"+j)+
"; path=/; domain="+
window.location.hostname.replace(/^.*(\.facebook\..*)$/i,'$1');}}





e.exports=h;});

/** js/modules/ClickRefLogger.js */
__d("ClickRefLogger",["Arbiter","EagleEye","ClickRefUtils","collectDataAttributes","copyProperties","ge","setUECookie","$"],function(a,b,c,d,e,f){



var g=b('Arbiter'),
h=b('EagleEye'),
i=b('ClickRefUtils'),

j=b('collectDataAttributes'),
k=b('copyProperties'),
l=b('ge'),
m=b('setUECookie'),
n=b('$');








function o(q){
if(!l('content'))
return [0,0,0,0];


var r=n('content'),
s=a.Vector2?
a.Vector2.getEventPosition(q):{x:0,y:0};
return [s.x,s.y,r.offsetLeft,r.clientWidth];}






function p(q,r,event,s){
var t=(!a.ArbiterMonitor)?'r':'a',
u=[0,0,0,0],
v,w,x;

if(!!event){
v=event.type;
if(v=='click'&&l('content'))
u=o(event);


var y=0;
event.ctrlKey&&(y+=1);
event.shiftKey&&(y+=2);
event.altKey&&(y+=4);
event.metaKey&&(y+=8);
if(y)
v+=y;}



if(!!r)
w=i.get_href(r);


var z=[];
if(a.ArbiterMonitor){
x=a.ArbiterMonitor.getInternRef(r);
z=a.ArbiterMonitor.getActFields();}



var aa=j
(!!event?(event.target||event.srcElement):r,
['ft','gt']);

k(aa.ft,s.ft||{});
k(aa.gt,s.gt||{});



if(typeof(aa.ft.ei)==='string')
delete aa.ft.ei;




var ba=
[q._ue_ts,
q._ue_count,
w||'-',
q._context,
v||'-',
x||i.get_intern_ref(r),
t,
a.URI?
a.URI.getRequestURI(true,true).getUnqualifiedURI().toString():
location.pathname+location.search+location.hash,
aa].
concat(u).concat(z);

return ba;}


g.subscribe("ClickRefAction/new",function(q,r){
if(i.should_report(r.node,r.mode)){
var s=p(r.cfa,
r.node,r.event,r.extra_data);




m(r.cfa.ue);

h.log('act',s);


if(window.chromePerfExtension)



window.postMessage({clickRef:JSON.stringify(s)},
window.location.origin);}});});

/** js/modules/PixelRatio.js */
__d("PixelRatio",["Arbiter","Cookie","Run"],function(a,b,c,d,e,f){















var g=b('Arbiter'),
h=b('Cookie'),
i=b('Run'),

j='dpr',

k,
l;

function m(){
return window.devicePixelRatio||1;}


function n(){
h.set(j,m());}


function o(){
h.clear(j);}


function p(){
var r=m();
if(r!==k){
n();}else 

o();}



var q=
{startDetecting:function(r){
k=r||1;

o();

if(l)
return;


l=
[g.subscribe('pre_page_transition',p)];


i.onBeforeUnload(p);}};



e.exports=q;});

/** js/modules/PostLoadJS.js */
__d("PostLoadJS",["Bootloader","Run","emptyFunction"],function(a,b,c,d,e,f){



var g=b('Bootloader'),
h=b('Run'),

i=b('emptyFunction');

function j(l,m){
h.onAfterLoad(function(){


g.loadModules.call(g,[l],m);});}



var k=
{loadAndRequire:function(l){
j(l,i);},


loadAndCall:function(l,m,n){
j(l,function(o){
o[m].apply(o,n);});}};




e.exports=k;});

/** js/modules/utils/throttleAcrossTransitions.js */
__d("throttleAcrossTransitions",["throttle"],function(a,b,c,d,e,f){



var g=b('throttle');

function h(i,j,k){
return g(i,j,k,true);}


e.exports=h;});

/** js/modules/UserActionHistory.js */
__d("UserActionHistory",["Arbiter","ClickRefUtils","throttleAcrossTransitions"],function(a,b,c,d,e,f){


var g=b('Arbiter'),
h=b('ClickRefUtils'),
i=b('throttleAcrossTransitions'),

j={click:1,submit:1},
k=false,
l={log:[],len:0},

m=i(function(){

try{k._ua_log=JSON.stringify(l);}catch(
p){



k=false;}},

1000);


function n(){

try{if(a.sessionStorage){
k=a.sessionStorage;
k._ua_log&&(l=JSON.parse(k._ua_log));}}catch(

p){



k=false;}


l.log[l.len%10]=
{ts:Date.now(),
path:'-',
index:l.len,
type:'init',
iref:'-'};

l.len++;

g.subscribe("UserAction/new",function(q,r){
var s=r.ua,t=r.node,event=r.event;
if(!event||!(event.type in j))
return;


var u=
{path:window._script_path,
type:event.type,
ts:s._ue_ts,
iref:h.get_intern_ref(t)||'-',
index:l.len};



l.log[l.len++%10]=u;
k&&m();});}



function o(){
return l.log.sort(function(p,q){
return (q.ts!=p.ts)?(q.ts-p.ts):(q.index-p.index);});}



n();

e.exports=
{getHistory:o};});

/** js/ui/behavior/TinyViewport.js */
__d("TinyViewport",["event-extensions","CSS","DOM","debounce"],function(a,b,c,d,e,f){









b('event-extensions');

var g=b('CSS'),
h=b('DOM'),

i=b('debounce'),

j=i(function(){
var k=document.documentElement,
l=h.getDocumentScrollElement(),
m=k.clientHeight<400||l.clientWidth<l.scrollWidth;
g.conditionClass(k,'tinyViewport',m);
g.conditionClass(k,'canHaveFixedElements',!m);});


j();
Event.listen(window,'resize',j);});

/** js/modules/LinkshimAsyncLink.js */
__d("LinkshimAsyncLink",["$","AsyncSignal"],function(a,b,c,d,e,f){






var g=b('$'),
h=b('AsyncSignal'),

i=
{swap:function(j,k){
j.href=k;},


referrer_log:function(j,k,l){
var m=g('meta_referrer');
m.content="origin";
i.swap(j,k);
(function(){
m.content="default";
new h(l,{}).send();}).
defer(100);}};



e.exports=i;});

/** js/lib/dom/asynclinkshim.js */
__d("legacy:dom-asynclinkshim",["LinkshimAsyncLink"],function(a,b,c,d){



a.LinkshimAsyncLink=b('LinkshimAsyncLink');},

3);
