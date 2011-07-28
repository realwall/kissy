/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Jul 28 15:35
*/
KISSY.add("menu/delmenuitem",function(h,g,f,i,b,a){var c=g.all;h=a.CLS;var d=a.DEL_CLS;f=f.create(b,{_performInternal:function(e){if(c(e.target).hasClass(this.getCls(d))){this.get("parent").removeChild(this,true);this.get("parent").set("highlightedItem",null);this.get("parent").fire("delete",{target:this});return true}return b.prototype._performInternal.call(this,e)},_handleKeydown:function(e){if(e.keyCode==68){this.get("parent").removeChild(this,true);this.get("parent").set("highlightedItem",null);
this.get("parent").fire("delete",{target:this});return true}}},{ATTRS:{delTooltip:{view:true}},DefaultRender:a});i.UIStore.setUIByClass(h,{priority:40,ui:f});return f},{requires:["node","uibase","component","./menuitem","./delmenuitemrender"]});
KISSY.add("menu/delmenuitemrender",function(h,g,f,i,b){function a(d){d.get("contentEl").append(h.substitute(c,{prefixCls:d.get("prefixCls"),tooltip:d.get("delTooltip")}))}var c='<span class="{prefixCls}menuitem-delete" title="{tooltip}">X</span>';return f.create(b,{renderUI:function(){this.get("el").addClass(this.getCls("menuitem-deletable"))},createDom:function(){a(this)},_uiSetContent:function(d){b.prototype._uiSetContent.call(this,d);a(this)},_uiSetDelTooltip:function(){this._uiSetContent(this.get("content"))}},
{ATTRS:{delTooltip:{}},HTML_PARSER:{delEl:function(d){return d.one("."+this.getCls("menuitem-delete"))}},CLS:"menuitem-deletable",DEL_CLS:"menuitem-delete"})},{requires:["node","uibase","component","./menuitemrender"]});
KISSY.add("menu/filtermenu",function(h,g,f,i){return g.create(f,{bindUI:function(){this.get("view").get("filterInput").on("keyup",this.handleFilterEvent,this)},handleFilterEvent:function(){var b=this.get("view").get("filterInput"),a=this.get("highlightedItem");this.set("filterStr",b.val());if(!a||!a.get("visible"))this.set("highlightedItem",this._getNextEnabledHighlighted(0,1))},_uiSetFilterStr:function(b){this.filterItems(b)},filterItems:function(b){var a=this.get("view"),c=a.get("labelEl");a=a.get("filterInput");
c[b?"hide":"show"]();if(this.get("allowMultiple")){c=[];var d;d=b.match(/(.+)[,\uff0c]\s*([^\uff0c,]*)/);var e=[];if(d)e=d[1].split(/[,\uff0c]/);if(/[,\uff0c]$/.test(b)){c=[];if(d){c=e;d=e[e.length-1];if((e=(e=this.get("highlightedItem"))&&e.get("caption"))&&e.indexOf(d)>-1&&d)c[c.length-1]=e;a.val(c.join(",")+",")}b=""}else{if(d)b=d[2]||"";c=e}this.get("enteredItems").length!=c.length&&this.set("enteredItems",c)}a=this.get("children");var j=b&&RegExp(b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,
"\\x08"),"ig"),l=this.getCls("menuitem-hit");h.each(a,function(k){var m=k.get("caption"),n=k.get("view");if(b)if(m.indexOf(b)>-1){k.set("visible",true);n.set("content",m.replace(j,function(o){return"<span class='"+l+"'>"+o+"</span>"}))}else k.set("visible",false);else{n.set("content",m);k.set("visible",true)}})},decorateInternal:function(b){this.set("el",b);this.decorateChildren(b.one("."+this.getCls("menu-content")))},destructor:function(){var b=this.get("view");(b=b&&b.get("filterInput"))&&b.detach()}},
{ATTRS:{label:{view:true},filterStr:{},enteredItems:{value:[]},allowMultiple:{value:false}},DefaultRender:i})},{requires:["uibase","./menu","./filtermenurender"]});
KISSY.add("menu/filtermenurender",function(h,g,f,i){var b=g.all;return f.create(i,{getContentElement:function(){return this.get("menuContent")},getKeyEventTarget:function(){return this.get("filterInput")},createDom:function(){var a=i.prototype.getContentElement.call(this),c=this.get("filterWrap");c||this.set("filterWrap",c=b("<div class='"+this.getCls("menu-filter")+"'/>").appendTo(a));this.get("labelEl")||this.set("labelEl",b("<div class='"+this.getCls("menu-filter-label")+"'/>").appendTo(c));this.get("filterInput")||
this.set("filterInput",b("<input autocomplete='off'/>").appendTo(c));this.get("menuContent")||this.set("menuContent",b("<div class='"+this.getCls("menu-content")+"'/>").appendTo(a))},_uiSetLabel:function(a){this.get("labelEl").html(a)}},{ATTRS:{label:{}},HTML_PARSER:{labelEl:function(a){return a.one("."+this.getCls("menu-filter")).one("."+this.getCls("menu-filter-label"))},filterWrap:function(a){return a.one("."+this.getCls("menu-filter"))},menuContent:function(a){return a.one("."+this.getCls("menu-content"))},
filterInput:function(a){return a.one("."+this.getCls("menu-filter")).one("input")}}})},{requires:["node","uibase","./menurender"]});
KISSY.add("menu/menu",function(h,g,f,i){var b=g.create(f.Container,{_uiSetHighlightedItem:function(a,c){var d=c&&c.prevVal;d&&d.set("highlighted",false);a&&a.set("highlighted",true);this.set("activeItem",a)},_handleBlur:function(a){b.superclass._handleBlur.call(this,a);this.set("highlightedItem",undefined)},_getNextEnabledHighlighted:function(a,c){var d=this.get("children"),e=d.length,j=a;do{var l=d[a];if(!l.get("disabled")&&l.get("visible")!==false)return d[a];a=(a+c+e)%e}while(a!=j)},_handleKeydown:function(a){if(this._handleKeyEventInternal(a)){a.halt();
return true}},_handleKeyEventInternal:function(a){var c=this.get("highlightedItem");if(c&&c._handleKeydown(a))return true;var d=this.get("children"),e=d.length;if(e!=0){switch(a.keyCode){case 27:return;case 36:this.set("highlightedItem",this._getNextEnabledHighlighted(0,1));break;case 35:this.set("highlightedItem",this._getNextEnabledHighlighted(e-1,-1));break;case 38:if(c){a=h.indexOf(c,d);e=(a-1+e)%e}else e=e-1;this.set("highlightedItem",this._getNextEnabledHighlighted(e,-1));break;case 40:if(c){a=
h.indexOf(c,d);e=(a+1+e)%e}else e=0;this.set("highlightedItem",this._getNextEnabledHighlighted(e,1));break;default:return}return true}},bindUI:function(){var a=this;a.on("hide",function(){a.set("highlightedItem",undefined)})},containsElement:function(a){if(this.get("view").containsElement(a))return true;for(var c=this.get("children"),d=0,e=c.length;d<e;d++){var j=c[d];if(typeof j.containsElement=="function"&&j.containsElement(a))return true}return false}},{ATTRS:{highlightedItem:{},activeItem:{view:true}},
DefaultRender:i});f.UIStore.setUIByClass("menu",{priority:10,ui:b});return b},{requires:["uibase","component","./menurender","./submenu"]});
KISSY.add("menu/menuitem",function(h,g,f,i){var b=g.create(f.ModelControl,[g.Contentbox],{_handleMouseEnter:function(a){if(b.superclass._handleMouseEnter.call(this,a))return true;this.get("parent").set("highlightedItem",this)},_handleMouseLeave:function(a){if(b.superclass._handleMouseLeave.call(this,a))return true;this.get("parent").set("highlightedItem",undefined)},_performInternal:function(){this.get("selectable")&&this.set("selected",true);this.get("checkable")&&this.set("checked",!this.get("checked"));
this.get("parent").fire("click",{target:this});return true},_uiSetHighlighted:function(a){if(a){var c=this.get("el");a=this.get("parent").get("el");var d=c.offset().top;c=c[0].offsetHeight;var e=a.offset().top,j=a[0].offsetHeight;if(d-e>=j)a[0].scrollTop+=d-e+c-j;else if(d-e<0)a[0].scrollTop+=d-e}},containsElement:function(a){return this.get("view").containsElement(a)}},{ATTRS:{handleMouseEvents:{value:false},selectable:{view:true},checkable:{view:true},caption:{getter:function(a){a||this.__set("caption",
a=this.get("content"));return a}},value:{},checked:{view:true},selected:{view:true}}});b.DefaultRender=i;f.UIStore.setUIByClass("menuitem",{priority:10,ui:b});return b},{requires:["uibase","component","./menuitemrender"]});
KISSY.add("menu/menuitemrender",function(h,g,f,i){return f.create(i.Render,[f.Contentbox.Render],{renderUI:function(){var b=this.get("el");this.getCls("contentbox");b.addClass(this.getCls("menuitem")).attr("role","menuitem");this.get("contentEl").addClass(this.getCls("menuitem-content"));b.attr("id")||b.attr("id",h.guid("ks-menuitem"))},_uiSetDisabled:function(b){var a=this.get("el").attr("aria-disabled",!!b);b?a.addClass(this.getCls("menuitem-disabled")):a.removeClass(this.getCls("menuitem-disabled"))},
_uiSetHighlighted:function(b){var a=this.get("el");b?a.addClass(this.getCls("menuitem-highlight")):a.removeClass(this.getCls("menuitem-highlight"))},_uiSetSelected:function(b){this.get("el")[b?"addClass":"removeClass"](this.getCls("menuitem-selected"))},_uiSetChecked:function(b){this.get("el")[b?"addClass":"removeClass"](this.getCls("menuitem-checked"));if(b){b=this.get("el");var a=this.getCls("menuitem-checkbox"),c=b.one("."+a);if(!c){c=(new g("<div class='"+a+"'/>")).prependTo(b);c.unselectable()}}},
_uiSetSelectable:function(b){this.get("el").attr("role",b?"menuitemradio":"menuitem")},_uiSetCheckable:function(b){this.get("el").attr("role",b?"menuitemcheckbox":"menuitem")},_uiSetActive:function(b){this.get("el")[b?"addClass":"removeClass"](this.getCls("menuitem-active")).attr("aria-pressed",b)},containsElement:function(b){var a=this.get("el");return a[0]==b||a.contains(b)}},{ATTRS:{focusable:{value:false},selected:{},checked:{},visibleMode:{value:"display"}}})},{requires:["node","uibase","component"]});
KISSY.add("menu/menurender",function(h,g,f,i){return f.create(i.Render,[f.Contentbox.Render],{renderUI:function(){var b=this.get("el");b.addClass(this.getCls("menu  menu-vertical")).attr("role","menu").attr("aria-haspopup",true);b.attr("id")||b.attr("id",h.guid("ks-menu"))},_uiSetActiveItem:function(b){var a=this.get("el");if(b){b=b.get("el").attr("id");a.attr("aria-activedescendant",b)}else a.attr("aria-activedescendant","")},containsElement:function(b){var a=this.get("el");return a[0]===b||a.contains(b)}},
{ATTRS:{focusable:{value:true},activeItem:{},visibleMode:{value:"display"}}})},{requires:["ua","uibase","component"]});KISSY.add("menu/popupmenu",function(h,g,f,i,b){h=g.create(i,[g.Position,g.Align],{},{DefaultRender:b});f.UIStore.setUIByClass("popupmenu",{priority:20,ui:h});return h},{requires:["uibase","component","./menu","./popupmenurender"]});
KISSY.add("menu/popupmenurender",function(h,g,f,i){return f.create(i,[f.Position.Render,g.ie===6?f.Shim.Render:null],{renderUI:function(){this.get("el").addClass(this.getCls("popmenu"))}},{ATTRS:{focusable:{value:false},visibleMode:{value:"visibility"}}})},{requires:["ua","uibase","./menurender"]});
KISSY.add("menu/separator",function(h,g,f,i){h=g.create(f.ModelControl,{},{ATTRS:{handleMouseEvents:{value:false}},DefaultRender:i});f.UIStore.setUIByClass("menuseparator",{priority:20,ui:h});return h},{requires:["uibase","component","./separatorrender"]});
KISSY.add("menu/separatorrender",function(h,g,f){return g.create(f.Render,{createDom:function(){this.get("el").attr("role","separator").addClass(this.getCls("menuseparator"))}},{ATTRS:{focusable:{value:false},disabled:{value:true}}})},{requires:["uibase","component"]});
KISSY.add("menu/submenu",function(h,g,f,i,b){var a=g.create(i,{_onParentHide:function(){this.get("menu")&&this.get("menu").hide()},bindUI:function(){var c=this.get("parent"),d=this.get("menu");if(c){c.on("hide",this._onParentHide,this);d.on("click",function(e){c.fire("click",{target:e.target})});d.on("afterActiveItemChange",function(e){c.set("activeItem",e.newVal)})}d.on("beforeHighlightedItemChange",this.onChildHighlight_,this)},_handleMouseEnter:function(c){if(a.superclass._handleMouseEnter.call(this,
c))return true;this.clearTimers();this.showTimer_=h.later(this.showMenu,this.get("menuDelay"),false,this)},showMenu:function(){var c=this.get("menu");c.set("align",{node:this.get("el"),points:["tr","tl"]});c.render();this.get("el").attr("aria-haspopup",c.get("el").attr("id"));c.show()},clearTimers:function(){if(this.dismissTimer_){this.dismissTimer_.cancel();this.dismissTimer_=null}if(this.showTimer_){this.showTimer_.cancel();this.showTimer_=null}},onChildHighlight_:function(c){if(c.newVal)if(this.get("menu").get("parent")==
this){this.clearTimers();this.get("parent").set("highlightedItem",this)}},hideMenu:function(){var c=this.get("menu");c&&c.hide()},_performInternal:function(){this.clearTimers();this.showMenu()},_handleKeydown:function(c){var d=this.get("menu"),e=d&&d.get("visible"),j=c.keyCode;if(e){if(!d._handleKeydown(c))if(j==37){this.hideMenu();this.get("parent").set("activeItem",this)}else return}else if(j==39){this.showMenu();c=d.get("children");c[0]&&d.set("highlightedItem",c[0])}else return;return true},_uiSetHighlighted:function(c,
d){a.superclass._uiSetHighlighted.call(this,c,d);if(!c){this.dismissTimer_&&this.dismissTimer_.cancel();this.dismissTimer_=h.later(this.hideMenu,this.get("menuDelay"),false,this)}},containsElement:function(c){var d=this.get("menu");return d&&d.containsElement(c)},decorateInternal:function(c){var d=this.get("prefixCls");this.set("el",c);var e=c.one("."+this.getCls("popupmenu"));if(e){e.hide();h.one(c[0].ownerDocument.body).prepend(e);this.set("menu",new (f.UIStore.getUIByClass("popupmenu"))({srcNode:e,
prefixCls:d}))}},destructor:function(){var c=this.get("parent"),d=this.get("menu");this.clearTimers();c&&c.detach("hide",this._onParentHide,this);!this.get("externalSubMenu")&&d&&d.destroy()}},{ATTRS:{menuDelay:{value:300},externalSubMenu:{value:false},menu:{setter:function(c){c.set("parent",this)}}},DefaultRender:b});f.UIStore.setUIByClass("submenu",{priority:20,ui:a});return a},{requires:["uibase","component","./menuitem","./submenurender"]});
KISSY.add("menu/submenurender",function(h,g,f){var i;return i=g.create(f,{renderUI:function(){var b=this.get("el"),a=this.get("contentEl");b.addClass(this.get("prefixCls")+"submenu").attr("aria-haspopup","true");a.append(h.substitute('<span class="{prefixCls}submenu-arrow">\u25ba</span>',{prefixCls:this.get("prefixCls")}))},_uiSetContent:function(b){i.superclass._uiSetContent.call(this,b);this.get("contentEl").append(h.substitute('<span class="{prefixCls}submenu-arrow">\u25ba</span>',{prefixCls:this.get("prefixCls")}))}})},
{requires:["uibase","./menuitemrender"]});KISSY.add("menu",function(h,g,f,i,b,a,c,d,e,j,l,k){g.Render=f;g.Item=i;g.Item.Render=b;g.SubMenu=a;a.Render=c;g.Separator=d;g.PopupMenu=j;g.FilterMenu=l;g.DelMenuItem=k;return g},{requires:["menu/menu","menu/menurender","menu/menuitem","menu/menuitemrender","menu/submenu","menu/submenurender","menu/separator","menu/separatorrender","menu/popupmenu","menu/filtermenu","menu/delmenuitem","menu/delmenuitemrender"]});
