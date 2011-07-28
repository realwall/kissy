/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Jul 28 15:35
*/
KISSY.add("dd/ddm",function(k,l,n,g,h){function b(){b.superclass.constructor.apply(this,arguments);this._init()}function a(d,f,m){m=m||150;if(m===-1)return function(){d.apply(f,arguments)};var r=k.now();return function(){var s=k.now();if(s-r>m){r=s;d.apply(f,arguments)}}}function c(d){var f=d.offset();return{left:f.left,right:f.left+d[0].offsetWidth,top:f.top,bottom:f.top+d[0].offsetHeight}}function e(d,f){return d.left<=f.left&&d.right>=f.left&&d.top<=f.top&&d.bottom>=f.top}function j(d){if(d.top>=
d.bottom||d.left>=d.right)return 0;return(d.right-d.left)*(d.bottom-d.top)}function i(d,f){return{left:Math.max(d.left,f.left),right:Math.min(d.right,f.right),top:Math.max(d.top,f.top),bottom:Math.min(d.bottom,f.bottom)}}var o=document;b.ATTRS={prefixCls:{value:"ks-dd-"},bufferTime:{value:200},activeDrag:{},activeDrop:{},drops:{value:[]}};k.extend(b,h,{_regDrop:function(d){this.get("drops").push(d)},_unregDrop:function(d){d=k.indexOf(d,this.get("drops"));d!=-1&&this.get("drops").splice(d,1)},_init:function(){this._showShimMove=
a(this._move,this,30)},_move:function(d){var f=this.get("activeDrag");if(f){d.preventDefault();f._move(d);this._notifyDropsMove(d)}},_notifyDropsMove:function(d){var f=this.get("activeDrag"),m=f.get("mode"),r=this.get("drops"),s,p=0,u=c(f.get("node")),w=j(u);k.each(r,function(q){var t=q.getNodeFromTarget(d,f.get("dragNode")[0],f.get("node")[0]);if(t)if(m=="point"){if(e(c(t),f.mousePos))if(!s||s.get("node").contains(t))s=q}else if(m=="intersect"){t=j(i(u,c(t)));if(t>p){p=t;s=q}}else if(m=="strict"){t=
j(i(u,c(t)));if(t==w){s=q;return false}}});(r=this.get("activeDrop"))&&r!=s&&r._handleOut(d);if(s)s._handleOver(d);else{f.get("node").removeClass(this.get("prefixCls")+"drag-over");this.set("activeDrop",null)}},_deactivateDrops:function(){var d=this.get("activeDrag"),f=this.get("activeDrop");d.get("node").removeClass(this.get("prefixCls")+"drag-over");if(f){var m={drag:d,drop:f};f.get("node").removeClass(this.get("prefixCls")+"drop-over");f.fire("drophit",m);d.fire("dragdrophit",m);this.fire("drophit",
m);this.fire("dragdrophit",m)}else{d.fire("dragdropmiss",{drag:d});this.fire("dragdropmiss",{drag:d})}},_start:function(d){var f=this,m=f.get("bufferTime")||0;f._registerEvent();if(m)f._bufferTimer=setTimeout(function(){f._bufferStart(d)},m);else f._bufferStart(d)},_bufferStart:function(d){this.set("activeDrag",d);d.get("shim")&&this._activeShim();d._start();d.get("dragNode").addClass(this.get("prefixCls")+"dragging")},_end:function(d){var f=this.get("activeDrag");this._unregisterEvent();if(this._bufferTimer){clearTimeout(this._bufferTimer);
this._bufferTimer=null}this._shim&&this._shim.css({display:"none"});if(f){f._end(d);f.get("dragNode").removeClass(this.get("prefixCls")+"dragging");this._deactivateDrops(d);this.set("activeDrag",null);this.set("activeDrop",null)}},_activeShim:function(){var d=document;this._shim=(new g("<div style='background-color:red;position:absolute;left:0;width:100%;top:0;cursor:move;z-index:999999;'></div>")).appendTo(d.body);this._shim.css("opacity",0);this._activeShim=this._showShim;this._showShim()},_showShim:function(){this._shim.css({display:"",
height:l.docHeight()})},_registerEvent:function(){n.on(o,"mouseup",this._end,this);n.on(o,"mousemove",this._showShimMove,this)},_unregisterEvent:function(){n.remove(o,"mousemove",this._showShimMove,this);n.remove(o,"mouseup",this._end,this)}});h=new b;h.inRegion=e;h.region=c;return h},{requires:["dom","event","node","base"]});
KISSY.add("dd/draggable",function(k,l,n,g,h){function b(){b.superclass.constructor.apply(this,arguments);this._init()}b.POINT="point";b.INTERSECT="intersect";b.STRICT="strict";b.ATTRS={node:{setter:function(a){return n.one(a)}},dragNode:{},shim:{value:true},handlers:{value:[]},cursor:{value:"move"},mode:{value:"point"}};k.extend(b,g,{_init:function(){var a=this.get("node"),c=this.get("handlers");this.set("dragNode",a);if(c.length==0)c[0]=a;for(var e=0;e<c.length;e++){var j=c[e];j=n.one(j);j.unselectable();
this.get("cursor")&&j.css("cursor",this.get("cursor"))}a.on("mousedown",this._handleMouseDown,this)},destroy:function(){for(var a=this.get("dragNode"),c=this.get("handlers"),e=0;e<c.length;e++){var j=c[e];j.css("cursor")==this.get("cursor")&&j.css("cursor","auto")}a.detach("mousedown",this._handleMouseDown,this);this.detach()},_check:function(a){for(var c=this.get("handlers"),e=0;e<c.length;e++){var j=c[e];if(j.contains(a)||j[0]==a[0])return true}return false},_handleMouseDown:function(a){if(this._check(new n(a.target))){a.preventDefault();
this._prepare(a)}},_prepare:function(a){h._start(this);var c=this.get("node"),e=a.pageX;a=a.pageY;c=c.offset();this.startMousePos=this.mousePos={left:e,top:a};this.startNodePos=c;this._diff={left:e-c.left,top:a-c.top};this.set("diff",this._diff)},_move:function(a){var c=this.get("diff"),e=a.pageX-c.left;c=a.pageY-c.top;this.mousePos={left:a.pageX,top:a.pageY};a={left:e,top:c,pageX:a.pageX,pageY:a.pageY,drag:this};this.fire("drag",a);h.fire("drag",a)},_end:function(){this.fire("dragend",{drag:this});
h.fire("dragend",{drag:this})},_start:function(){this.fire("dragstart",{drag:this});h.fire("dragstart",{drag:this})}});return b},{requires:["ua","node","base","./ddm"]});
KISSY.add("dd/droppable",function(k,l,n,g){function h(){h.superclass.constructor.apply(this,arguments);this._init()}h.ATTRS={node:{setter:function(b){if(b){b=l.one(b);b.addClass(g.get("prefixCls")+"drop");return b}}}};k.extend(h,n,{getNodeFromTarget:function(b,a,c){b=this.get("node");var e=b[0];return e==a||e==c?null:b},_init:function(){g._regDrop(this)},_handleOut:function(){var b=g.get("activeDrag");this.get("node").removeClass(g.get("prefixCls")+"drop-over");var a={drop:this,drag:b};this.fire("dropexit",
a);g.fire("dropexit",a);b.get("node").removeClass(g.get("prefixCls")+"drag-over");b.fire("dragexit",a);g.fire("dragexit",a)},_handleOver:function(b){var a=g.get("activeDrop");g.set("activeDrop",this);var c=g.get("activeDrag");this.get("node").addClass(g.get("prefixCls")+"drop-over");b=k.mix({drag:c,drop:this},b);if(this!=a){c.get("node").addClass(g.get("prefixCls")+"drag-over");c.fire("dragenter",b);this.fire("dropenter",b);g.fire("dragenter",b);g.fire("dropenter",b)}else{c.fire("dragover",b);this.fire("dropover",
b);g.fire("dragover",b);g.fire("dropover",b)}},destroy:function(){g._unregDrop(this)}});return h},{requires:["node","base","./ddm"]});
KISSY.add("dd/proxy",function(k,l){function n(){n.superclass.constructor.apply(this,arguments);this[g]={}}var g="__proxy_destructors",h="__proxy";n.ATTRS={node:{value:function(b){return new l(b.get("node")[0].cloneNode(true))}},destroyOnEnd:{value:false}};k.extend(n,k.Base,{attach:function(b){function a(){var i=e.get("node"),o=b.get("node");if(!e[h]&&k.isFunction(i)){i=i(b);i.addClass("ks-dd-proxy");i.css("position","absolute");e[h]=i}o.parent().append(e[h]);e[h].show();e[h].offset(o.offset());b.set("dragNode",
o);b.set("node",e[h])}function c(){var i=e[h];b.get("dragNode").offset(i.offset());i.hide();if(e.get("destroyOnEnd")){i.remove();e[h]=null}b.set("node",b.get("dragNode"))}if(!b.__proxy_id){var e=this;b.on("dragstart",a);b.on("dragend",c);var j=b.__proxy_id=k.guid("dd-proxyid-");e[g][j]={drag:b,fn:function(){b.detach("dragstart",a);b.detach("dragend",c)}}}},unAttach:function(b){var a=b.__proxy_id;if(a){this[g][a].fn();delete this[g][a];delete b.__proxy_id}},destroy:function(){var b=this.get("node");
b&&!k.isFunction(b)&&b.remove();for(var a in this[g])this.unAttach(this[g][a].drag)}});return n},{requires:["node"]});
KISSY.add("dd/draggable-delegate",function(k,l,n,g,h){function b(){b.superclass.constructor.apply(this,arguments)}k.extend(b,n,{_init:function(){var a=this.get("handlers"),c=this.get("container");a.length==0&&a.push(this.get("selector"));c.on("mousedown",this._handleMouseDown,this)},_getHandler:function(a){for(var c=this.get("container"),e=this.get("handlers");a&&a[0]!==c[0];){for(var j=0;j<e.length;j++)if(g.test(a[0],e[j],c[0]))return a;a=a.parent()}},_getNode:function(a){for(var c=this.get("container"),
e=this.get("selector");a&&a[0]!=c[0];){if(g.test(a[0],e,c[0]))return a;a=a.parent()}},_handleMouseDown:function(a){var c=new h(a.target);if(c=c&&this._getHandler(c))if(c=this._getNode(c)){a.preventDefault();this.set("node",c);this.set("dragNode",c);this._prepare(a)}},destroy:function(){this.get("container").detach("mousedown",this._handleMouseDown,this);this.detach()}},{ATTRS:{container:{setter:function(a){return h.one(a)}},selector:{}}});return b},{requires:["./ddm","./draggable","dom","node"]});
KISSY.add("dd/droppable-delegate",function(k,l,n,g,h){function b(){b.superclass.constructor.apply(this,arguments)}k.extend(b,n,{getNodeFromTarget:function(a,c,e){a={left:a.pageX,top:a.pageY};var j=this.get("container"),i=this.get("selector");j=j.all(i);for(i=0;i<j.length;i++){var o=j[i],d=new h(o);if(!(o==e||o==c))if(l.inRegion(l.region(d),a)){this.set("lastNode",this.get("node"));this.set("node",d);return d}}return null},_handleOut:function(){b.superclass._handleOut.call(this);this.set("node",null);
this.set("lastNode",null)},_handleOver:function(a){var c=l.get("activeDrop");l.set("activeDrop",this);var e=l.get("activeDrag");this.get("node").addClass(l.get("prefixCls")+"drop-over");a=k.mix({drag:e,drop:this},a);var j=this.get("node"),i=this.get("lastNode");if(this!=c||!i||i&&i[0]!==j[0]){if(i){this.set("node",i);b.superclass._handleOut.call(this)}this.set("node",j);e.get("node").addClass(l.get("prefixCls")+"drag-over");e.fire("dragenter",a);this.fire("dropenter",a);l.fire("dragenter",a);l.fire("dropenter",
a)}else{e.fire("dragover",a);this.fire("dropover",a);l.fire("dragover",a);l.fire("dropover",a)}}},{ATTRS:{lastNode:{},selector:{},container:{setter:function(a){return h.one(a)}}}});return b},{requires:["./ddm","./droppable","dom","node"]});
KISSY.add("dd/scroll",function(k,l,n,g){function h(){h.superclass.constructor.apply(this,arguments);this[b]={}}var b="__dd_scrolls";h.ATTRS={node:{setter:function(a){return n.one(a)}},rate:{value:[10,10]},diff:{value:[20,20]}};k.extend(h,l,{getRegion:function(a){return!a||a==window?{width:g.viewportWidth(),height:g.viewportHeight()}:{width:a[0].offsetWidth,height:a[0].offsetHeight}},getOffset:function(a){return!a||a==window?{left:g.scrollLeft(),top:g.scrollTop()}:a.offset()},getScroll:function(a){return!a||
a==window?{left:g.scrollLeft(),top:g.scrollTop()}:{left:a[0].scrollLeft,top:a[0].scrollTop}},setScroll:function(a,c){if(!a||a==window)window.scrollTo(c.left,c.top);else{a[0].scrollLeft=c.left;a[0].scrollTop=c.top}},unAttach:function(a){var c=a["__dd-scroll-id-"];if(c){this[b][c].fn();delete a["__dd-scroll-id-"];delete this[b][c]}},destroy:function(){for(var a in this[b])this.unAttach(this[b][a].drag)},attach:function(a){function c(p){if(!p.fake){var u=i.get("node");f=p;m=k.clone(a.mousePos);p=i.getOffset(u);
m.left-=p.left;m.top-=p.top;r||j()}}function e(){clearTimeout(r);r=null}function j(){var p=i.get("node"),u=i.getRegion(p),w=u.width;u=u.height;var q=i.getScroll(p),t=k.clone(q),v=false;if(m.top-u>=-d[1]){q.top+=o[1];v=true}if(m.top<=d[1]){q.top-=o[1];v=true}if(m.left-w>=-d[0]){q.left+=o[0];v=true}if(m.left<=d[0]){q.left-=o[0];v=true}if(v){i.setScroll(p,q);r=setTimeout(arguments.callee,100);f.fake=true;if(!p||p==window){q=i.getScroll(p);f.left+=q.left-t.left;f.top+=q.top-t.top}a.fire("drag",f)}else r=
null}if(!a["__dd-scroll-id-"]){var i=this,o=i.get("rate"),d=i.get("diff"),f,m,r=null;a.on("drag",c);a.on("dragend",e);var s=a["__dd-scroll-id-"]=k.guid("__dd-scroll-id-");i[b][s]={drag:a,fn:function(){a.detach("drag",c);a.detach("dragend",e)}}}}});return h},{requires:["base","node","dom"]});
KISSY.add("dd",function(k,l,n,g,h,b,a,c){l={Draggable:n,Droppable:g,DDM:l,Proxy:h,DraggableDelegate:b,DroppableDelegate:a,Scroll:c};k.mix(k,l);return l},{requires:["dd/ddm","dd/draggable","dd/droppable","dd/proxy","dd/draggable-delegate","dd/droppable-delegate","dd/scroll"]});
