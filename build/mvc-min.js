/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Oct 26 11:43
*/
KISSY.add("mvc/base",function(e,m){return{sync:m}},{requires:["./sync"]});
KISSY.add("mvc/collection",function(e,m,n,i,k){function c(){c.superclass.constructor.apply(this,arguments);this.on("afterModelsChange",function(){this.fire("reset")})}c.ATTRS={model:{value:n},models:{setter:function(a){this.remove(this.get("models"),{silent:1});this.add(a,{silent:1});return this.get("models")},value:[]},url:{value:e.noop()},comparator:{}};e.extend(c,k,{sort:function(){var a=this.get("comparator");a&&this.get("models").sort(function(b,d){return a(b)-a(d)})},toJSON:function(){return e.map(this.get("models"),
function(a){return a.toJSON()})},pluck:function(a){return e.map(this.get("models"),function(b){return b.get(a)})},sync:function(){i.sync.apply(this,arguments)},parse:function(a){return a},add:function(a,b){var d=this,f=true;if(e.isArray(a)){var h=[].concat(a);e.each(h,function(o){f=f&&d._add(o,b)})}else f=d._add(a,b);return f},remove:function(a,b){var d=this;if(e.isArray(a)){var f=[].concat(a);e.each(f,function(h){d._remove(h,b)})}else a&&d._remove(a,b)},at:function(a){return this.get("models")[a]},
_normModel:function(a){var b=true;if(!(a instanceof n)){b=a;a=new (this.get("model"));b=a.set(b,{silent:1})}return b&&a},load:function(a){var b=this;a=a||{};var d=a.success;a.success=function(f){f&&b.set("models",b.parse(f),a);d&&d.apply(this,arguments)};b.sync("read",a);return b},create:function(a,b){var d=this;b=b||{};if(a=this._normModel(a)){a.addToCollection(d);var f=b.success;b.success=function(){d.add(a,b);f&&f()};a.save(b)}return a},_add:function(a,b){if(a=this._normModel(a)){b=b||{};var d;
d=this.get("models");var f=this.get("comparator"),h=d.length;if(f){var o=f(a);for(h=0;h<d.length;h++){var s=f(d[h]);if(o<s)break}}d=h;this.get("models").splice(d,0,a);a.addToCollection(this);b.silent||this.fire("add",{model:a})}return a},_remove:function(a,b){b=b||{};var d=e.indexOf(a,this.get("models"));if(d!=-1){this.get("models").splice(d,1);a.removeFromCollection(this)}b.silent||this.fire("remove",{model:a})},getById:function(a){for(var b=this.get("models"),d=0;d<b.length;d++){var f=b[d];if(f.getId()===
a)return f}return null},getByCid:function(a){for(var b=this.get("models"),d=0;d<b.length;d++){var f=b[d];if(f.get("clientId")===a)return f}return null}});return c},{requires:["event","./model","./base","base"]});
KISSY.add("mvc/model",function(e,m,n){function i(){i.superclass.constructor.apply(this,arguments);this.publish("*Change",{bubbles:1});this.collections={}}var k=["idAttribute","clientId","urlRoot","url"];e.extend(i,m,{addToCollection:function(c){this.collections[e.stamp(c)]=c;this.addTarget(c)},removeFromCollection:function(c){delete this.collections[e.stamp(c)];this.removeTarget(c)},getId:function(){return this.get(this.get("idAttribute"))},setId:function(c){return this.set(this.get("idAttribute"),
c)},__set:function(){this.__isModified=1;return i.superclass.__set.apply(this,arguments)},sync:function(){n.sync.apply(this,arguments)},isNew:function(){return!this.getId()},isModified:function(){return!!(this.isNew()||this.__isModified)},destroy:function(c){var a=this;c=c||{};var b=c.success;c.success=function(d){var f=a.collections;d&&a.set(d,c);for(var h in f){f[h].remove(a,c);a.removeFromCollection(f[h])}a.fire("destroy");b&&b.apply(this,arguments)};!a.isNew()&&c["delete"]?a.sync("delete",c):
c.success();return a},load:function(c){var a=this;c=c||{};var b=c.success;c.success=function(d){d&&a.set(a.parse(d),c);a.__isModified=0;b&&b.apply(this,arguments)};a.sync("read",c);return a},parse:function(c){return c},save:function(c){var a=this;c=c||{};var b=c.success;c.success=function(d){d&&a.set(a.parse(d),c);a.__isModified=0;b&&b.apply(this,arguments)};a.sync(a.isNew()?"create":"update",c);return a},toJSON:function(){var c=this.getAttrVals();e.each(k,function(a){delete c[a]});return c}},{ATTRS:{idAttribute:{value:"id"},
clientId:{valueFn:function(){return e.guid("mvc-client")}},url:{value:function(){var c,a,b=this.collections;for(c in b)if(b.hasOwnProperty(c)){a=b[c];break}c=a;var d;c=c&&(d=c.get("url"))?e.isString(d)?d:d.call(c):d;d=c||this.get("urlRoot");if(this.isNew())return d;d+=d.charAt(d.length-1)=="/"?"":"/";return d+encodeURIComponent(this.getId())+"/"}},urlRoot:{value:""}}});return i},{requires:["base","./base"]});
KISSY.add("mvc/router",function(e,m,n){function i(g){if(g=g.match(d)){g=e.unEscapeHTML(g[1]);return e.unparam(g)}return{}}function k(g,j,q){var p=j;j=p.replace(d,"");e.each(q,function(l){var u=l.paramNames,t=l.name,v=l.callback;if(l=j.match(l.reg)){l.shift();var r={};e.each(l,function(w,x){r[u[x]]=w});l=i(p);v.apply(g,[r,l]);g.fire(t,{params:r,query:l});return false}})}function c(g,j){var q=g,p=[];g=g.replace(f,function(l){return"\\"+l}).replace(h,function(l,u,t,v,r){p.push(t||r);if(t)return"([^/]+)";
else if(r)return"(.*)"});return{name:q,paramNames:p,reg:RegExp("^"+g+"$"),callback:j}}function a(){a.superclass.constructor.apply(this,arguments);this.__routerMap={};this.on("afterRoutesChange",this._afterRoutesChange,this);this._afterRoutesChange({newVal:this.get("routes")})}function b(){k(this,s.hash.replace(o,""),this.__routerMap)}var d=/\?(.*)/,f=/[-[\]{}()+?.,\\^$|#\s]/g,h=/(:([\w\d]+))|(\*([\w\d]+))/g,o=/^#/,s=location;a.ATTRS={routes:{}};e.extend(a,n,{_afterRoutesChange:function(g){this.__routerMap=
{};this.addRoutes(g.newVal)},addRoutes:function(g){var j=this;e.each(g,function(q,p){j.__routerMap[p]=c(p,e.isFunction(q)?q:j[q])})},navigate:function(g,j){s.hash=g;j=j||{};j.triggerRoute&&s.hash.replace(o,"")==g&&b.call(this)},start:function(g){var j=this;g=g||{};setTimeout(function(){m.on(window,"hashchange",b,j);g.triggerRoute&&b.call(j);g.success&&g.success()},100)}});return a},{requires:["event","base"]});
KISSY.add("mvc/sync",function(e,m){var n={create:"POST",update:"POST","delete":"POST",read:"GET"};return function(i,k){var c=e.merge({type:n[i],dataType:"json"},k),a=c.data=c.data||{};a._method=i;if(!c.url)c.url=e.isString(this.get("url"))?this.get("url"):this.get("url").call(this);if(i=="create"||i=="update"){c.contentType="application/x-www-form-urlencoded";a.model=this.toJSON()}return m(c)}},{requires:["ajax"]});
KISSY.add("mvc/view",function(e,m,n){function i(a,b){if(e.isString(b))return a[b];return b}function k(){k.superclass.constructor.apply(this,arguments);var a;if(a=this.get("events"))this._afterEventsChange({newVal:a})}var c=m.all;k.ATTRS={el:{value:"<div />",getter:function(a){if(e.isString(a)){a=c(a);this.__set("el",a)}return a}},events:{}};e.extend(k,n,{_afterEventsChange:function(a){var b=a.prevVal;b&&this._removeEvents(b);this._addEvents(a.newVal)},_removeEvents:function(a){var b=this.get("el"),
d;for(d in a){var f=a[d],h;for(h in f){var o=i(this,f[h]);b.undelegate(h,d,o,this)}}},_addEvents:function(a){var b=this.get("el"),d;for(d in a){var f=a[d],h;for(h in f){var o=i(this,f[h]);b.delegate(h,d,o,this)}}},render:function(){return this},destroy:function(){this.get("el").remove()}});return k},{requires:["node","base"]});KISSY.add("mvc",function(e,m,n,i,k,c){return e.mix(m,{Model:n,View:k,Collection:i,Router:c})},{requires:["mvc/base","mvc/model","mvc/collection","mvc/view","mvc/router"]});
