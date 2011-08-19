/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 19 12:28
*/
KISSY.add("node/anim-plugin",function(e,b,k,f,j){function m(h,v,o,l,i,p,w){if(v==="toggle"){i=b.css(h,c)===d;v="show"}i&&b.show(h);var n={},u={};e.each(A[v],function(x){var z=h.style;if(x===g){n[g]=z[g];b.css(h,g,y)}else if(x===r){n[r]=b.css(h,r);u.opacity=i?1:0;i&&b.css(h,r,0)}else if(x===q){n[q]=z[q];u.height=i?b.css(h,q)||h.naturalHeight:0;i&&b.css(h,q,0)}else if(x===s){n[s]=z[s];u.width=i?b.css(h,s)||h.naturalWidth:0;i&&b.css(h,s,0)}});return(new k(h,u,o,p||"easeOut",function(){i||b.hide(h);n[q]!==
j&&b.css(h,"height",n[q]);n[s]!==j&&b.css(h,"width",n[s]);n[r]!==j&&b.css(h,"opacity",n[r]);n[g]!==j&&b.css(h,"overflow",n[g]);l&&l()},w)).run()}var t=f.prototype,a="ksAnims"+e.now(),c="display",d="none",g="overflow",y="hidden",r="opacity",q="height",s="width",A={show:[g,r,q,s],fade:[r],slide:[g,q]};f.__ANIM_KEY=a;(function(h){function v(o,l){var i=b.data(o,a);i||b.data(o,a,i=[]);l.on("complete",function(){var p=b.data(o,a);if(p){var w=e.indexOf(l,p);w>=0&&p.splice(w,1);p.length||b.removeData(o,a)}});
i.push(l)}h.animate=function(){var o=e.makeArray(arguments);e.each(this,function(l){var i=k.apply(j,[l].concat(o)).run();v(l,i)});return this};h.stop=function(o){e.each(this,function(l){var i=b.data(l,a);if(i){e.each(i,function(p){p.stop(o)});b.removeData(l,a)}});return this};e.each({show:["show",1],hide:["show",0],toggle:["toggle"],fadeIn:["fade",1],fadeOut:["fade",0],slideDown:["slide",1],slideUp:["slide",0]},function(o,l){h[l]=function(i,p,w,n){b[l]&&!i?b[l](this):e.each(this,function(u){var x=
m(u,o[0],i,p,o[1],w,n);v(u,x)});return this}})})(t)},{requires:["dom","anim","./base"]});
KISSY.add("node/attach",function(e,b,k,f,j){function m(c,d,g){g.unshift(d);c=b[c].apply(b,g);if(c===j)return d;return c}var t=f.prototype,a=e.makeArray;e.each(["equals","contains","scrollTop","scrollLeft","height","width","addStyleSheet","appendTo","prependTo","insertBefore","before","after","insertAfter","test","hasClass","addClass","removeClass","replaceClass","toggleClass","removeAttr","hasAttr","hasProp","toggle","scrollIntoView","remove","removeData","hasData","unselectable"],function(c){t[c]=
function(){var d=a(arguments);return m(c,this,d)}});e.each(["filter","first","parent","closest","next","prev","siblings","children"],function(c){t[c]=function(){var d=a(arguments);d.unshift(this);d=b[c].apply(b,d);d=d===j?this:d===null?null:new f(d);return d}});e.each({attr:1,text:0,css:1,val:0,prop:1,offset:0,html:0,data:1},function(c,d){t[d]=function(){var g=a(arguments);if(g[c]===j&&!e.isObject(g[0])){g.unshift(this);g=b[d].apply(b,g)}else g=m(d,this,g);return g}});e.each(["on","detach","fire",
"delegate","undelegate"],function(c){t[c]=function(){var d=a(arguments);d.unshift(this);return k[c].apply(k,d)}})},{requires:["dom","event","./base"]});
KISSY.add("node/base",function(e,b,k){function f(a,c,d){if(!(this instanceof f))return new f(a,c,d);if(a)if(e.isString(a)){a=b.create(a,c,d);if(a.nodeType===b.DOCUMENT_FRAGMENT_NODE){j.push.apply(this,m(a.childNodes));return k}}else if(e.isArray(a)||t(a)){j.push.apply(this,m(a));return k}else a=a;else return k;this[0]=a;this.length=1;return k}var j=Array.prototype,m=e.makeArray,t=b._isNodeList;e.augment(f,{length:0,item:function(a){return e.isNumber(a)?a>=this.length?null:new f(this[a]):new f(a)},
add:function(a,c,d){if(e.isNumber(c)){d=c;c=k}a=f.all(a,c).getDOMNodes();c=new f(this);if(d===k)j.push.apply(c,a);else{d=[d,0];d.push.apply(d,a);j.splice.apply(c,d)}return c},slice:function(a,c){return new f(j.slice.call(this,a,c))},getDOMNodes:function(){return j.slice.call(this)},each:function(a,c){var d=this.length,g=0,y;for(y=new f(this[0]);g<d&&a.call(c||y,y,g,this)!==false;y=new f(this[++g]));return this},getDOMNode:function(){return this[0]},end:function(){return this.__parent||this},all:function(a){a=
this.length>0?f.all(a,this):new f;a.__parent=this;return a},one:function(a){a=this.all(a);if(a=a.length?a.slice(0,1):null)a.__parent=this;return a}});e.mix(f,{ELEMENT_NODE:b.ELEMENT_NODE,ATTRIBUTE_NODE:b.ATTRIBUTE_NODE,TEXT_NODE:b.TEXT_NODE,CDATA_SECTION_NODE:b.CDATA_SECTION_NODE,ENTITY_REFERENCE_NODE:b.ENTITY_REFERENCE_NODE,ENTITY_NODE:b.ENTITY_NODE,PROCESSING_INSTRUCTION_NODE:b.PROCESSING_INSTRUCTION_NODE,COMMENT_NODE:b.COMMENT_NODE,DOCUMENT_NODE:b.DOCUMENT_NODE,DOCUMENT_TYPE_NODE:b.DOCUMENT_TYPE_NODE,
DOCUMENT_FRAGMENT_NODE:b.DOCUMENT_FRAGMENT_NODE,NOTATION_NODE:b.NOTATION_NODE,all:function(a,c){if(e.isString(a)&&(a=e.trim(a))&&a.length>=3&&e.startsWith(a,"<")&&e.endsWith(a,">")){if(c){if(c.getDOMNode)c=c.getDOMNode();if(c.ownerDocument)c=c.ownerDocument}return new f(a,k,c)}return new f(b.query(a,c))},one:function(a,c){var d=f.all(a,c);return d.length?d.slice(0,1):null}});return f},{requires:["dom"]});
KISSY.add("node/override",function(e,b,k,f){e.each(["append","prepend","before","after"],function(j){f.prototype[j]=function(m){m=m;if(e.isString(m))m=b.create(m);m&&b[j](m,this);return this}})},{requires:["dom","event","./base","./attach"]});KISSY.add("node",function(e,b,k){k.KeyCodes=b.KeyCodes;return k},{requires:["event","node/base","node/attach","node/override","node/anim-plugin"]});
