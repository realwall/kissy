/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Nov 4 10:47
*/
KISSY.add("mvc/base",function(f,m){return{sync:m}},{requires:["./sync"]});
KISSY.add("mvc/collection",function(f,m,n,j,k){function b(){b.superclass.constructor.apply(this,arguments)}b.ATTRS={model:{value:n},models:{setter:function(a){this.remove(this.get("models"),{silent:1});this.add(a,{silent:1});return this.get("models")},value:[]},url:{value:f.noop},comparator:{},sync:{value:function(){j.sync.apply(this,arguments)}},parse:{value:function(a){return a}}};f.extend(b,k,{sort:function(){var a=this.get("comparator");a&&this.get("models").sort(function(c,d){return a(c)-a(d)})},
toJSON:function(){return f.map(this.get("models"),function(a){return a.toJSON()})},add:function(a,c){var d=this,e=true;if(f.isArray(a)){var h=[].concat(a);f.each(h,function(o){e=e&&d._add(o,c)})}else e=d._add(a,c);return e},remove:function(a,c){var d=this;if(f.isArray(a)){var e=[].concat(a);f.each(e,function(h){d._remove(h,c)})}else a&&d._remove(a,c)},at:function(a){return this.get("models")[a]},_normModel:function(a){var c=true;if(!(a instanceof n)){c=a;a=new (this.get("model"));c=a.set(c,{silent:1})}return c&&
a},load:function(a){var c=this;a=a||{};var d=a.success;a.success=function(e){if(e){var h=c.get("parse").call(c,e);h&&c.set("models",h,a)}d&&d.apply(this,arguments)};c.get("sync").call(c,c,"read",a);return c},create:function(a,c){var d=this;c=c||{};if(a=this._normModel(a)){a.addToCollection(d);var e=c.success;c.success=function(){d.add(a,c);e&&e()};a.save(c)}return a},_add:function(a,c){if(a=this._normModel(a)){c=c||{};var d;d=this.get("models");var e=this.get("comparator"),h=d.length;if(e){var o=
e(a);for(h=0;h<d.length;h++){var x=e(d[h]);if(o<x)break}}d=h;this.get("models").splice(d,0,a);a.addToCollection(this);c.silent||this.fire("add",{model:a})}return a},_remove:function(a,c){c=c||{};var d=f.indexOf(a,this.get("models"));if(d!=-1){this.get("models").splice(d,1);a.removeFromCollection(this)}c.silent||this.fire("remove",{model:a})},getById:function(a){for(var c=this.get("models"),d=0;d<c.length;d++){var e=c[d];if(e.getId()===a)return e}return null},getByCid:function(a){for(var c=this.get("models"),
d=0;d<c.length;d++){var e=c[d];if(e.get("clientId")===a)return e}return null}});return b},{requires:["event","./model","./base","base"]});
KISSY.add("mvc/model",function(f,m,n){function j(){j.superclass.constructor.apply(this,arguments);this.publish("*Change",{bubbles:1});this.collections={}}var k=["idAttribute","clientId","urlRoot","url","parse","sync"];f.extend(j,m,{addToCollection:function(b){this.collections[f.stamp(b)]=b;this.addTarget(b)},removeFromCollection:function(b){delete this.collections[f.stamp(b)];this.removeTarget(b)},getId:function(){return this.get(this.get("idAttribute"))},setId:function(b){return this.set(this.get("idAttribute"),
b)},__set:function(){this.__isModified=1;return j.superclass.__set.apply(this,arguments)},isNew:function(){return!this.getId()},isModified:function(){return!!(this.isNew()||this.__isModified)},destroy:function(b){var a=this;b=b||{};var c=b.success;b.success=function(d){var e=a.collections;d&&a.set(d,b);for(var h in e){e[h].remove(a,b);a.removeFromCollection(e[h])}a.fire("destroy");c&&c.apply(this,arguments)};if(!a.isNew()&&b["delete"])a.get("sync").call(a,a,"delete",b);else{b.success();b.complete&&
b.complete()}return a},load:function(b){var a=this;b=b||{};var c=b.success;b.success=function(d){if(d){var e=a.get("parse").call(a,d);e&&a.set(e,b)}a.__isModified=0;c&&c.apply(this,arguments)};a.get("sync").call(a,a,"read",b);return a},save:function(b){var a=this;b=b||{};var c=b.success;b.success=function(d){if(d){var e=a.get("parse").call(a,d);e&&a.set(e,b)}a.__isModified=0;c&&c.apply(this,arguments)};a.get("sync").call(a,a,a.isNew()?"create":"update",b);return a},toJSON:function(){var b=this.getAttrVals();
f.each(k,function(a){delete b[a]});return b}},{ATTRS:{idAttribute:{value:"id"},clientId:{valueFn:function(){return f.guid("mvc-client")}},url:{value:function(){var b,a,c=this.collections;for(b in c)if(c.hasOwnProperty(b)){a=c[b];break}b=a;var d;b=b&&(d=b.get("url"))?f.isString(d)?d:d.call(b):d;d=b||this.get("urlRoot");if(this.isNew())return d;d+=d.charAt(d.length-1)=="/"?"":"/";return d+encodeURIComponent(this.getId())+"/"}},urlRoot:{value:""},sync:{value:function(){n.sync.apply(this,arguments)}},
parse:{value:function(b){return b}}}});return j},{requires:["base","./base"]});
KISSY.add("mvc/router",function(f,m,n){function j(g){for(var i,l=0;l<g.length;l++){i=g.charAt(l);if(i=="\\")l++;else if(i=="(")return l}throw Error("impossible to not to get capture group in kissy mvc route");}function k(){return location.href.replace(/^[^#]*#?!?(.*)$/,"$1")}function b(g){if(g=g.match(o))return f.unparam(g[1]);return{}}function a(g){var i=g,l=0,q=-1,y="",v=-1,s=0,t=0;g=i.replace(o,"");f.each(B,function(u){var C=0;f.each(u[z],function(p){var A=p.regStr,E=p.paramNames,w=-1,r,F=p.callback;
if(r=g.match(p.reg)){r.shift();var I=function(){var D={};f.each(r,function(G,H){D[E[H]]=G});return D};p=function(){y=A;v=w;s=F;t=I();l=u;q=r.length};if(r.length){w=j(A);if(w>v)p();else if(w==v&&q>=r.length)if(r.length<q)p();else A.length>y.length&&p();else l||p()}else{p();C=1;return false}}});if(C)return false});if(t){i=b(i);s.apply(l,[t,i]);i={name:name,paths:t,query:i};l.fire("route:"+name,i);l.fire("route",i)}}function c(g,i){var l=g,q=[];g=f.escapeRegExp(g);g=g.replace(x,function(y,v,s,t,u){q.push(s||
u);if(s)return"([^/]+)";else if(u)return"(.*)"});return{name:l,paramNames:q,reg:RegExp("^"+g+"$"),regStr:g,callback:i}}function d(g){this[z]={};this.addRoutes(g.newVal)}function e(){e.superclass.constructor.apply(this,arguments);this.on("afterRoutesChange",d,this);d.call(this,{newVal:this.get("routes")});B.push(this)}function h(){a(k())}var o=/\?(.*)/,x=/(:([\w\d]+))|(\\\*([\w\d]+))/g,B=[],z="__routerMap";e.ATTRS={routes:{}};f.extend(e,n,{addRoutes:function(g){var i=this;f.each(g,function(l,q){i[z][q]=
c(q,f.isFunction(l)?l:i[l])})}},{navigate:function(g,i){location.hash="!"+g;i=i||{};i.triggerRoute&&k()==g&&h()},start:function(g){g=g||{};setTimeout(function(){m.on(window,"hashchange",h);g.triggerRoute&&h();g.success&&g.success()},100)}});return e},{requires:["event","base"]});
KISSY.add("mvc/sync",function(f,m){var n={create:"POST",update:"POST","delete":"POST",read:"GET"};return function(j,k,b){b=f.merge({type:n[k],dataType:"json"},b);var a=b.data=b.data||{};a._method=k;if(!b.url)b.url=f.isString(j.get("url"))?j.get("url"):j.get("url").call(j);if(k=="create"||k=="update")a.model=j.toJSON();return m(b)}},{requires:["ajax"]});
KISSY.add("mvc/view",function(f,m,n){function j(a,c){if(f.isString(c))return a[c];return c}function k(){k.superclass.constructor.apply(this,arguments);var a;if(a=this.get("events"))this._afterEventsChange({newVal:a})}var b=m.all;k.ATTRS={el:{value:"<div />",getter:function(a){if(f.isString(a)){a=b(a);this.__set("el",a)}return a}},events:{}};f.extend(k,n,{_afterEventsChange:function(a){var c=a.prevVal;c&&this._removeEvents(c);this._addEvents(a.newVal)},_removeEvents:function(a){var c=this.get("el"),
d;for(d in a){var e=a[d],h;for(h in e){var o=j(this,e[h]);c.undelegate(h,d,o,this)}}},_addEvents:function(a){var c=this.get("el"),d;for(d in a){var e=a[d],h;for(h in e){var o=j(this,e[h]);c.delegate(h,d,o,this)}}},render:function(){return this},destroy:function(){this.get("el").remove()}});return k},{requires:["node","base"]});KISSY.add("mvc",function(f,m,n,j,k,b){return f.mix(m,{Model:n,View:k,Collection:j,Router:b})},{requires:["mvc/base","mvc/model","mvc/collection","mvc/view","mvc/router"]});
