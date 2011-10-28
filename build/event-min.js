/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Oct 28 16:31
*/
KISSY.add("event/base",function(a,c,e,q){function l(g,i,m){if((m=a.trim(m))&&m.indexOf(p)>0){var r=j(arguments);s(m.split(/\s+/),function(u){var o=[].concat(r);o.splice(0,3,i,u);v[g].apply(v,o)});return true}return 0}function d(g){return g&&g.nodeType!==3&&g.nodeType!==8}function k(g,i,m,r,u){var o=B[i]||{};if(!r.length&&(!o.setup||o.setup.call(g)===false))f(g,i,m);o.add&&o.add.call(g,u)}var h=document,b=c._nodeName,j=a.makeArray,f=h.addEventListener?function(g,i,m,r){g.addEventListener&&g.addEventListener(i,
m,!!r)}:function(g,i,m){g.attachEvent&&g.attachEvent("on"+i,m)},n=h.removeEventListener?function(g,i,m,r){g.removeEventListener&&g.removeEventListener(i,m,!!r)}:function(g,i,m){g.detachEvent&&g.detachEvent("on"+i,m)},p=" ",s=a.each,t="",x="trigger-none-"+a.now(),B={},F="ksEventTargetId"+a.now(),v={_clone:function(g,i){if(!(i.nodeType!==c.ELEMENT_NODE||!v._hasData(g))){var m=v._data(g).events;s(m,function(r,u){s(r,function(o){v.on(i,u,o.fn,o.scope,o.data)})})}},_hasData:function(g){return c.hasData(g,
F)},_data:function(){var g=j(arguments);g.splice(1,0,F);return c.data.apply(c,g)},_removeData:function(){var g=j(arguments);g.splice(1,0,F);return c.removeData.apply(c,g)},special:B,__add:function(g,i,m,r,u,o){var w;if(!(!i||!a.isFunction(r)||g&&!d(i))){(w=v._data(i))||v._data(i,w={});var y=w.events=w.events||{};y=y[m]=y[m]||[];r={fn:r,scope:u,data:o};var A=w.handler;if(!A){A=w.handler=function(z,C){if(!(z&&z.type==t)){var D=A.target;if(!z||!z.fixed)z=new e(D,z);a.isPlainObject(C)&&a.mix(z,C);return v._handle(D,
z)}};A.target=i}if(g){k(i,m,A,y,r);i=null}y.push(r)}},add:function(g,i,m,r,u){if(l("add",g,i,m,r,u))return g;c.query(g).each(function(o){v.__add(true,o,i,m,r,u)});return g},__getListeners:function(g,i){return(v.__getEvents(g)||{})[i]||[]},__getEvents:function(g){return(g=v._data(g))&&g.events},__remove:function(g,i,m,r,u,o){if(!(!i||g&&!d(i))){var w=v._data(i),y=w&&w.events,A,z,C,D,G,I=g&&B[m]||{};if(y)if(m===q)for(m in y)v.remove.call(v,i,m);else{u=u||i;if(A=y[m]){z=A.length;if(r&&z){D=C=0;for(G=
[];C<z;++C){var J=false,E=A[C],K=E.scope||i;if(r!==E.fn||u!==K){G[D++]=E;J=true}else if(o!==H){var H=E.data;if(!o&&H||H&&!o){G[D++]=E;J=true}else if(o&&H)if(o.equals&&H.equals)if(!H.equals(o)){G[D++]=E;J=true}}!J&&I.remove&&I.remove.call(i,E)}y[m]=G;z=G.length}if(r===q||z===0){if(g&&(!I.tearDown||I.tearDown.call(i)===false))n(i,m,w.handler);delete y[m]}}if(a.isEmptyObject(y)){w.handler.target=null;delete w.handler;delete w.events;v._removeData(i)}}}},remove:function(g,i,m,r,u){if(l("remove",g,i,m,
r))return g;c.query(g).each(function(o){v.__remove(true,o,i,m,r,u)});return g},_handle:function(g,i){for(var m=v.__getListeners(g,i.type).slice(0),r,u,o=0,w=m.length;o<w;++o){r=m[o];r=r.fn.call(r.scope||g,i,r.data);if(r!==q){if(u!==false)u=r;r===false&&i.halt()}if(i.isImmediatePropagationStopped)break}return u},fire:function(g,i,m,r){if(!l("fire",g,i,m,r)){m=m||{};m.type=i;c.query(g).each(function(u){var o=m;if(d(u)){var w=new e(u,q,i);a.mix(w,o);r&&w.halt();o=u;var y="on"+i;do{w.currentTarget=o;
v._handle(o,w);o[y]&&o[y].call(o)===false&&w.preventDefault();o=o.parentNode||o.ownerDocument||o===u.ownerDocument&&window}while(o&&!w.isPropagationStopped);if(!w.isDefaultPrevented)if(!(i==="click"&&b(u,"a"))){var A;try{if(y&&u[i]){if(A=u[y])u[y]=null;t=i;u[i]()}}catch(z){}if(A)u[y]=A;t=x}}})}},__batchForType:l,__simpleAdd:f,__simpleRemove:n};v.on=v.add;v.detach=v.remove;return v},{requires:["dom","event/object"]});
KISSY.add("event/change",function(a,c,e,q){a=document.documentMode;if(c.ie&&(c.ie<9||a&&a<9)){var l=/^(?:textarea|input|select)$/i,d=function(f){f=f.type;return f=="checkbox"||f=="radio"};e.special.change={setup:function(){if(l.test(this.nodeName))if(d(this)){e.on(this,"propertychange",k);e.on(this,"click",h)}else return false;else e.on(this,"beforeactivate",b)},tearDown:function(){if(l.test(this.nodeName))if(d(this)){e.remove(this,"propertychange",k);e.remove(this,"click",h)}else return false;else{e.remove(this,
"beforeactivate",b);q.query("textarea,input,select",this).each(function(f){if(f.__changeHandler){f.__changeHandler=0;e.remove(f,"change",j)}})}}};var k=function(f){if(f.originalEvent.propertyName=="checked")this.__changed=1},h=function(f){if(this.__changed){this.__changed=0;e.fire(this,"change",f)}},b=function(f){f=f.target;if(l.test(f.nodeName)&&!f.__changeHandler){f.__changeHandler=1;e.on(f,"change",j)}},j=function(f){if(!d(this)){var n;if(n=this.parentNode)e.fire(n,"change",f)}}}},{requires:["ua",
"./base","dom"]});
KISSY.add("event/delegate",function(a,c,e){function q(b){return b.fn===undefined&&b.selector===undefined?true:b.fn===undefined?this.selector==b.selector:this.fn==b.fn&&this.selector==b.selector&&this.scope==b.scope}function l(b,j){var f=c.closest(b.target,[j.selector],this);if(f){for(var n=b.currentTarget,p=0;p<f.length;p++){b.currentTarget=f[p];j.fn.call(j.scope||this,b)===false&&b.halt();if(b.isPropagationStopped)break}b.currentTarget=n}}function d(b,j){var f,n=b.target,p=b.relatedTarget;b.type=
j.preType;if(n=c.closest(n,j.selector,this))if(n!==p&&(!p||!c.contains(n,p))){p=b.currentTarget;b.currentTarget=n;f=j.fn.call(j.scope||this,b);b.currentTarget=p}return f}var k=e.__batchForType,h={focus:{type:"focusin"},blur:{type:"focusout"},mouseenter:{type:"mouseover",handler:d},mouseleave:{type:"mouseout",handler:d}};a.mix(e,{delegate:function(b,j,f,n,p){if(k("delegate",b,j,f,n,p))return b;c.query(b).each(function(s){var t=j,x=l;if(h[j]){j=h[t].type;x=h[t].handler||x}e.on(s,j,x,s,{fn:n,selector:f,
preType:t,scope:p,equals:q})});return b},undelegate:function(b,j,f,n,p){if(k("undelegate",b,j,f,n,p))return b;c.query(b).each(function(s){var t=j,x=l;if(h[j]){j=h[t].type;x=h[t].handler||x}e.remove(s,j,x,s,{fn:n,selector:f,preType:t,scope:p,equals:q})});return b}});return e},{requires:["dom","./base"]});
KISSY.add("event/focusin",function(a,c,e){c.ie||a.each([{name:"focusin",fix:"focus"},{name:"focusout",fix:"blur"}],function(q){function l(k){return e.fire(k.target,q.name)}var d=0;e.special[q.name]={setup:function(){d++===0&&document.addEventListener(q.fix,l,true)},tearDown:function(){--d===0&&document.removeEventListener(q.fix,l,true)}}});return e},{requires:["ua","./base"]});
KISSY.add("event/hashchange",function(a,c,e,q){q=k||q.ie;if(!("onhashchange"in window)||q<8){k=document;var l=window,d="<html><title>"+(k.title||"")+" - {hash}</title><body>{hash}</body></html>",k=k.documentMode,h=function(){return"#"+location.href.replace(/^[^#]*#?(.*)$/,"$1")},b,j,f=function(){var x=h();if(x!==j){n(x);j=x}b=setTimeout(f,50)},n=q<8?function(x){x=a.substitute(d,{hash:x});var B=t.contentWindow.document;try{B.open();B.write(x);B.close();return true}catch(F){return false}}:function(){c.fire(l,
"hashchange")},p=function(){b||f()},s=function(){b&&clearTimeout(b);b=null},t;if(q<8){p=function(){if(!t){t=e.create('<iframe style="display: none" height="0" width="0" tabindex="-1" title="empty"/>');e.prepend(t,document.documentElement);c.add(t,"load",function(){c.remove(t,"load");n(h());c.add(t,"load",x);f()});var x=function(){var B=a.trim(e.html(t.contentWindow.document.body)),F=h();if(B!=F)j=location.hash=B;c.fire(l,"hashchange")}}};s=function(){b&&clearTimeout(b);b=null;c.detach(t);e.remove(t);
t=null}}c.special.hashchange={setup:function(){if(this===l){j=h();p()}},tearDown:function(){this===l&&s()}}}},{requires:["./base","dom","ua"]});
KISSY.add("event/keycodes",function(){var a={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,
WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,
MAC_FF_META:224,WIN_IME:229};a.isTextModifyingKeyEvent=function(c){if(c.altKey&&!c.ctrlKey||c.metaKey||c.keyCode>=a.F1&&c.keyCode<=a.F12)return false;switch(c.keyCode){case a.ALT:case a.CAPS_LOCK:case a.CONTEXT_MENU:case a.CTRL:case a.DOWN:case a.END:case a.ESC:case a.HOME:case a.INSERT:case a.LEFT:case a.MAC_FF_META:case a.META:case a.NUMLOCK:case a.NUM_CENTER:case a.PAGE_DOWN:case a.PAGE_UP:case a.PAUSE:case a.PHANTOM:case a.PRINT_SCREEN:case a.RIGHT:case a.SHIFT:case a.UP:case a.WIN_KEY:case a.WIN_KEY_RIGHT:return false;
default:return true}};a.isCharacterKey=function(c){if(c>=a.ZERO&&c<=a.NINE)return true;if(c>=a.NUM_ZERO&&c<=a.NUM_MULTIPLY)return true;if(c>=a.A&&c<=a.Z)return true;if(goog.userAgent.WEBKIT&&c==0)return true;switch(c){case a.SPACE:case a.QUESTION_MARK:case a.NUM_PLUS:case a.NUM_MINUS:case a.NUM_PERIOD:case a.NUM_DIVISION:case a.SEMICOLON:case a.DASH:case a.EQUALS:case a.COMMA:case a.PERIOD:case a.SLASH:case a.APOSTROPHE:case a.SINGLE_QUOTE:case a.OPEN_SQUARE_BRACKET:case a.BACKSLASH:case a.CLOSE_SQUARE_BRACKET:return true;
default:return false}};return a});KISSY.add("event/mouseenter",function(a,c,e,q){q.ie||a.each([{name:"mouseenter",fix:"mouseover"},{name:"mouseleave",fix:"mouseout"}],function(l){function d(k){var h=k.relatedTarget;k.type=l.name;try{if(!(h&&h!==document&&!h.parentNode))if(h!==this&&(!h||!e.contains(this,h)))c._handle(this,k)}catch(b){}}c.special[l.name]={setup:function(){c.add(this,l.fix,d)},tearDown:function(){c.remove(this,l.fix,d)}}});return c},{requires:["./base","dom","ua"]});
KISSY.add("event/mousewheel",function(a,c,e){function q(d){var k=c._data(this).handler,h,b,j,f=d.detail;if(d.wheelDelta)j=d.wheelDelta/120;if(d.detail)j=-(f%3==0?f/3:f);if(d.axis!==undefined)if(d.axis===d.HORIZONTAL_AXIS){b=0;h=-1*j}else if(d.axis===d.VERTICAL_AXIS){h=0;b=j}if(d.wheelDeltaY!==undefined)b=d.wheelDeltaY/120;if(d.wheelDeltaX!==undefined)h=-1*d.wheelDeltaX/120;if(!h&&!b)b=j;return k(d,{deltaY:b,delta:j,deltaX:h,type:"mousewheel"})}var l=e.gecko?"DOMMouseScroll":"mousewheel";c.special.mousewheel=
{setup:function(){var d;d=c._data(this)[d]=a.bind(q,this);c.__simpleAdd(this,l,d)},tearDown:function(){var d,k=c._data(this);d=k[d];c.__simpleRemove(this,l,d);delete k[d]}}},{requires:["./base","ua","./object"]});
KISSY.add("event/object",function(a,c){function e(d,k,h){this.currentTarget=d;this.originalEvent=k||{};if(k){this.type=k.type;this._fix()}else{this.type=h;this.target=d}this.currentTarget=d;this.fixed=true}var q=document,l="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which axis".split(" ");a.augment(e,
{_fix:function(){var d=this.originalEvent,k=l.length,h,b=this.currentTarget;for(b=b.nodeType===9?b:b.ownerDocument||q;k;){h=l[--k];this[h]=d[h]}if(!this.target)this.target=this.srcElement||q;if(this.target.nodeType===3)this.target=this.target.parentNode;if(!this.relatedTarget&&this.fromElement)this.relatedTarget=this.fromElement===this.target?this.toElement:this.fromElement;if(this.pageX===c&&this.clientX!==c){d=b.documentElement;k=b.body;this.pageX=this.clientX+(d&&d.scrollLeft||k&&k.scrollLeft||
0)-(d&&d.clientLeft||k&&k.clientLeft||0);this.pageY=this.clientY+(d&&d.scrollTop||k&&k.scrollTop||0)-(d&&d.clientTop||k&&k.clientTop||0)}if(this.which===c)this.which=this.charCode===c?this.keyCode:this.charCode;if(this.metaKey===c)this.metaKey=this.ctrlKey;if(!this.which&&this.button!==c)this.which=this.button&1?1:this.button&2?3:this.button&4?2:0},preventDefault:function(){var d=this.originalEvent;if(d.preventDefault)d.preventDefault();else d.returnValue=false;this.isDefaultPrevented=true},stopPropagation:function(){var d=
this.originalEvent;if(d.stopPropagation)d.stopPropagation();else d.cancelBubble=true;this.isPropagationStopped=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=true;this.stopPropagation()},halt:function(d){d?this.stopImmediatePropagation():this.stopPropagation();this.preventDefault()}});return e});
KISSY.add("event/submit",function(a,c,e,q){a=document.documentMode;if(c.ie&&(c.ie<9||a&&a<9)){var l=q._nodeName;e.special.submit={setup:function(){if(l(this,"form"))return false;e.on(this,"click keypress",d)},tearDown:function(){if(l(this,"form"))return false;e.remove(this,"click keypress",d);q.query("form",this).each(function(h){if(h.__submit__fix){h.__submit__fix=0;e.remove(h,"submit",k)}})}};var d=function(h){h=h.target;if((h=l(h,"input")||l(h,"button")?h.form:null)&&!h.__submit__fix){h.__submit__fix=
1;e.on(h,"submit",k)}},k=function(h){this.parentNode&&e.fire(this.parentNode,"submit",h)}}},{requires:["ua","./base","dom"]});
KISSY.add("event/target",function(a,c,e){function q(b){b[k]=b[k]||{};return b[k]}function l(b){b[h]=b[h]||{};return b[h]}function d(b){return function(j,f,n){var p=this;a.each(a.trim(j).split(/\s+/),function(s){c["__"+b](false,p,s,f,n)});return p}}var k="__~ks_publish",h="__~ks_bubble_targets";return{fire:function(b,j){var f,n;if(j instanceof e){j.currentTarget=this;n=j}else{f=new e(this,undefined,b);a.isPlainObject(j)&&a.mix(f,j);n=f}f=c._handle(this,n);var p;if(p=!n.isPropagationStopped){p=q(this);
p=p[b]&&p[b].bubbles||p["*"]&&p["*"].bubbles}if(p){n=this.bubble(b,n);if(n===false)f=n}return f},publish:function(b,j){q(this)[b]=j},bubble:function(b,j){var f,n=l(this);a.each(n,function(p){p=p.fire(b,j);if(f!==false)f=p});return f},addTarget:function(b){l(this)[a.stamp(b)]=b},removeTarget:function(b){delete l(this)[a.stamp(b)]},on:d("add"),detach:d("remove")}},{requires:["./base","./object"]});
KISSY.add("event/valuechange",function(a,c,e){function q(s){e.removeData(s,f);if(e.hasData(s,n)){var t=e.data(s,n);clearTimeout(t);e.removeData(s,n)}}function l(s){q(s.target)}function d(s){e.hasData(s,n)||e.data(s,n,setTimeout(function(){var t=s.value,x=e.data(s,f);if(t!==x){c.fire(s,b,{prevVal:x,newVal:t},true);e.data(s,f,t)}e.data(s,n,setTimeout(arguments.callee,p))},p))}function k(s){var t=s.target;s.type=="focus"&&e.data(t,f,t.value);d(t)}function h(s){q(s);c.remove(s,"blur",l);c.remove(s,"mousedown keyup keydown focus",
k)}var b="valuechange",j=e._nodeName,f="event/valuechange/history",n="event/valuechange/poll",p=50;c.special[b]={setup:function(){if(j(this,"input")||j(this,"textarea")){h(this);c.on(this,"blur",l);c.on(this,"mousedown keyup keydown focus",k)}},tearDown:function(){h(this)}};return c},{requires:["./base","dom"]});
KISSY.add("event",function(a,c,e,q,l){e.KeyCodes=c;e.Target=q;e.Object=l;return e},{requires:["event/keycodes","event/base","event/target","event/object","event/focusin","event/hashchange","event/valuechange","event/delegate","event/mouseenter","event/submit","event/change","event/mousewheel"]});
