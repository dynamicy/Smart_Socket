/*1349187289,173214269*/

if (window.CavalryLogger) { CavalryLogger.start_js(["cNca2"]); }

/** js/modules/ErrorSignal.js */
__d("ErrorSignal",["AsyncRequest","AsyncSignal","Env","emptyFunction"],function(a,b,c,d,e,f){




var g=b('AsyncRequest'),
h=b('AsyncSignal'),
i=b('Env'),

j=b('emptyFunction');

function k(m,n){
if(i.error_uri){





if(m&&m=='async_error'){
var o=JSON.parse(n),
p=o.err_code,
q=o.path;

if(p in {'1004':1,'12029':1,'12031':1,'12152':1}&&
q.indexOf('scribe_endpoint.php')==-1){

new g().
setURI('/ajax/chat/scribe_endpoint.php').
setData({c:'async_error',m:n}).
setMethod('GET').
setReadOnly(true).
setOption('suppressEvaluation',true).
setOption('suppressErrorAlerts',true).
setHandler(j).
setErrorHandler(j).
send(true);
return;}}



new h(i.error_uri,{c:m,m:n}).send();}}



function l(m,n){
n=n||{};
n.svn_rev=i.svn_rev;
n.script_path=window._script_path;
var o=a.ArbiterMonitor&&ArbiterMonitor.getUE()||'-',
p=(a.EagleEye&&EagleEye.getSessionID()||'-')+'/'+o;
k
('javascript_error',
JSON.stringify({c:m,a:p,m:n}));}


e.exports=
{sendErrorSignal:k,
logJSError:l};});
