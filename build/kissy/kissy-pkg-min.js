/*
Copyright 2010, KISSY UI Library v1.0.5
MIT Licensed
build: 552 Apr 11 12:24
*/
(function(i,k,h){if(i[k]===h)i[k]={};k=i[k];var j=i.document,l=function(d,e,f,a){if(!e||!d)return d;if(f===h)f=true;var c,b,g;if(a&&(g=a.length))for(c=0;c<g;c++){b=a[c];if(b in e)if(f||!(b in d))d[b]=e[b]}else for(b in e)if(f||!(b in d))d[b]=e[b];return d},p=false,o=[],q=false;l(k,{version:"1.0.5",_init:function(){this.Env={mods:{}}},add:function(d,e){this.Env.mods[d]={name:d,fn:e};e(this);return this},ready:function(d){q||this._bindReady();p?d.call(i,this):o.push(d);return this},_bindReady:function(){var d=
this,e=j.documentElement.doScroll,f=e?"onreadystatechange":"DOMContentLoaded";q=true;if(j.attachEvent){if(i!=i.top){var a=function(){if(j.readyState==="complete"){j.detachEvent(f,a);d._fireReady()}};j.attachEvent(f,a)}else{var c=function(){try{e("left");d._fireReady()}catch(g){setTimeout(c,1)}};c()}i.attachEvent("onload",function(){d._fireReady()})}else{var b=function(){j.removeEventListener(f,b,false);d._fireReady()};j.addEventListener(f,b,false)}},_fireReady:function(){if(!p){p=true;if(o){for(var d,
e=0;d=o[e++];)d.call(i,this);o=null}}},mix:l,merge:function(){var d=arguments,e={},f,a=d.length;for(f=0;f<a;++f)l(e,d[f]);return e},extend:function(d,e,f,a){if(!e||!d)return d;var c=Object.prototype,b=e.prototype,g=function(m){function n(){}n.prototype=m;return new n}(b);d.prototype=g;g.constructor=d;d.superclass=b;if(e!==Object&&b.constructor===c.constructor)b.constructor=e;f&&l(g,f);a&&l(d,a);return d},augment:function(d,e,f,a){return l(d.prototype,k.isFunction(e)?e.prototype:e,f,a)},app:function(d,
e){var f=i[d]||{};l(f,this,true,["_init","add","namespace"]);f._init();return l(i[d]=f,k.isFunction(e)?e():e)},namespace:function(){var d=arguments,e=d.length,f=null,a,c,b;for(a=0;a<e;++a){b=(""+d[a]).split(".");f=this;for(c=i[b[0]]===f?1:0;c<b.length;++c)f=f[b[c]]=f[b[c]]||{}}return f},log:function(d,e,f){if(this.Config.debug){f&&(d=f+": "+d);if(i.console!==h&&console.log)console[e&&console[e]?e:"log"](d)}return this},error:function(d){if(this.Config.debug)throw d;},now:function(){return(new Date).getTime()}});
k._init();k.Config={debug:""}})(window,"KISSY");
KISSY.add("lang",function(i,k){function h(a){var c=typeof a;return a===null|(c!=="object"&&c!=="function")}var j=document,l=Array.prototype,p=l.forEach,o=l.indexOf,q=l.slice,d=/^\s+|\s+$/g,e=/^(\w+)\[\]$/,f=Object.prototype.toString;i.mix(i,{each:p?function(a,c,b){p.call(a,c,b);return this}:function(a,c,b){var g=a&&a.length||0,m;for(m=0;m<g;++m)c.call(b||this,a[m],m,a);return this},trim:String.prototype.trim?function(a){return(a||"").trim()}:function(a){return(a||"").replace(d,"")},isPlainObject:function(a){return a&&
f.call(a)==="[object Object]"&&!a.nodeType&&!a.setInterval},isEmptyObject:function(a){for(var c in a)return false;return true},isFunction:function(a){return f.call(a)==="[object Function]"},isArray:function(a){return f.call(a)==="[object Array]"},indexOf:o?function(a,c){return o.call(c,a)}:function(a,c){for(var b=0,g=c.length;b<g;++b)if(c[b]===a)return b;return-1},inArray:function(a,c){return i.indexOf(a,c)!==-1},makeArray:function(a){if(a===null||a===k)return[];if(i.isArray(a))return a;if(typeof a.length!==
"number"||typeof a==="string"||i.isFunction(a))return[a];if(a.item&&i.UA.ie){for(var c=[],b=0,g=a.length;b<g;++b)c[b]=a[b];return c}return q.call(a)},param:function(a){if(typeof a!=="object")return"";var c=[],b,g;for(b in a){g=a[b];if(h(g))c.push(b,"=",g+"","&");else if(i.isArray(g)&&g.length)for(var m=0,n=g.length;m<n;++m)h(g[m])&&c.push(b+"[]=",g[m]+"","&")}c.pop();return encodeURI(c.join(""))},unparam:function(a,c){if(typeof a!=="string"||(a=decodeURI(i.trim(a))).length===0)return{};var b={};a=
a.split(c||"&");for(var g,m,n=0,s=a.length;n<s;++n){g=a[n].split("=");c=g[0];g=g[1]||"";if((m=c.match(e))&&m[1]){b[m[1]]=b[m[1]]||[];b[m[1]].push(g)}else b[c]=g}return b},later:function(a,c,b,g,m){c=c||0;g=g||{};var n=a,s=i.makeArray(m),r;if(typeof a==="string")n=g[a];n||i.error("method undefined");a=function(){n.apply(g,s)};r=b?setInterval(a,c):setTimeout(a,c);return{id:r,interval:b,cancel:function(){this.interval?clearInterval(r):clearTimeout(r)}}},globalEval:function(a){if(a=i.trim(a)){var c=j.getElementsByTagName("head")[0]||
j.documentElement,b=j.createElement("script");if(i.UA.ie)b.text=a;else b.appendChild(j.createTextNode(a));c.insertBefore(b,c.firstChild);c.removeChild(b)}}});if("ks-debug"in i.unparam(location.hash))i.Config.debug=true});
KISSY.add("ua",function(i){var k=navigator.userAgent,h,j={ie:0,gecko:0,firefox:0,opera:0,webkit:0,safari:0,chrome:0,mobile:""},l=function(p){var o=0;return parseFloat(p.replace(/\./g,function(){return o++===0?".":""}))};if((h=k.match(/AppleWebKit\/([\d.]*)/))&&h[1]){j.webkit=l(h[1]);if((h=k.match(/Chrome\/([\d.]*)/))&&h[1])j.chrome=l(h[1]);else if((h=k.match(/\/([\d.]*) Safari/))&&h[1])j.safari=l(h[1]);if(/ Mobile\//.test(k))j.mobile="Apple";else if(h=k.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))j.mobile=
h[0]}else if((h=k.match(/Opera\/.* Version\/([\d.]*)/))&&h[1]){j.opera=l(h[1]);if(k.match(/Opera Mini[^;]*/))j.mobile=h[0]}else if((h=k.match(/MSIE\s([^;]*)/))&&h[1])j.ie=l(h[1]);else if(h=k.match(/Gecko/)){j.gecko=1;if((h=k.match(/rv:([\d.]*)/))&&h[1])j.gecko=l(h[1]);if((h=k.match(/Firefox\/([\d.]*)/))&&h[1])j.firefox=l(h[1])}i.UA=j});
