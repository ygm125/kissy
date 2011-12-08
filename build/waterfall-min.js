/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Dec 8 19:30
*/
KISSY.add("waterfall/base",function(g,l,p){function e(){e.superclass.constructor.apply(this,arguments);this._init()}function q(a,b,c,d){var f=[].concat(a),m={},n;if(f.length>0)n=setTimeout(function(){var o=+new Date;do{var j=f.shift();b.call(c,j)}while(f.length>0&&+new Date-o<50);if(f.length>0)n=setTimeout(arguments.callee,25);else d&&d.call(c,a)},25);else d&&g.later(d,0,false,c,[a]);m.stop=function(){if(n){clearTimeout(n);f=[]}};return m}function r(){var a=this._containerRegion;a&&this.get("container").width()===
a.width||this.adjust()}function k(){var a=this.get("container").width(),b=this.get("curColHeights");b.length=Math.max(parseInt(a/this.get("colWidth")),this.get("minColCount"));this._containerRegion={width:a};g.each(b,function(c,d){b[d]=0})}function h(a){var b=this.get("effect");a=i(a);for(var c=this.get("curColHeights"),d=this.get("container"),f=c.length,m=0,n=this._containerRegion,o=Number.MAX_VALUE,j=0;j<f;j++)if(c[j]<o){o=c[j];m=j}f||(o=0);f=Math.max(n.width-f*this.get("colWidth"),0)/2;a.css({left:m*
this.get("colWidth")+f,top:o});if(!d.contains(a)){b&&b.effect=="fadeIn"&&a.css("opacity",0);d.append(a)}c[m]+=a.outerHeight(true);return a}var i=l.all;e.ATTRS={container:{setter:function(a){return i(a)}},curColHeights:{value:[]},minColCount:{value:1},effect:{value:{effect:"fadeIn",duration:1}},colWidth:{}};g.extend(e,p,{isAdjusting:function(){return!!this._adjuster},_init:function(){r.call(this);this.__onResize=g.buffer(r,50,this);i(window).on("resize",this.__onResize)},adjust:function(a){var b=this,
c=b.get("container").all(".ks-waterfall"),d=c.length;b.isAdjusting()&&b._adjuster.stop();k.call(b);return b._adjuster=q(c,b._addItem,b,function(){b.get("container").height(Math.max.apply(Math,b.get("curColHeights")));b._adjuster=0;a&&a.call(b);d&&b.fire("adjustComplete",{items:c})})},addItems:function(a,b){var c=this,d=a.length;c._adder=q(a,c._addItem,c,function(){c.get("container").height(Math.max.apply(Math,c.get("curColHeights")));c._adder=0;b&&b.call(c);d&&c.fire("addComplete",{items:a})});return c._adder},
_addItem:function(a){this.get("curColHeights");this.get("container");var b=h.call(this,a);a=this.get("effect");!a.effect||a.effect!=="fadeIn"||b.animate({opacity:1},{duration:a.duration,easing:a.easing,complete:function(){b.css("opacity","")}})},destroy:function(){i(window).detach("resize",this.__onResize)}});return e},{requires:["node","base"]});
KISSY.add("waterfall/loader",function(g,l,p){function e(){e.superclass.constructor.apply(this,arguments)}function q(){if(!this.__pause)if(!this.__loading)if(this.isAdjusting())this.__onScroll();else{var h=this.get("container").offset().top,i=this.get("diff"),a=this.get("curColHeights");if(a.length)h+=Math.min.apply(Math,a);i+k(window).scrollTop()+k(window).height()>h&&r.call(this)}}function r(){function h(c){a.__loading=0;a.addItems(c)}function i(){a.end()}var a=this;this.get("container");a.__loading=
1;var b=a.get("load");b&&b(h,i)}var k=l.all;e.ATTRS={diff:{getter:function(h){return h||0}}};g.extend(e,p,{_init:function(){e.superclass._init.apply(this,arguments);this.__onScroll=g.buffer(q,50,this);k(window).on("scroll",this.__onScroll);q.call(this)},end:function(){k(window).detach("scroll",this.__onScroll)},pause:function(){this.__pause=1},resume:function(){this.__pause=0},destroy:function(){e.superclass.destroy.apply(this,arguments);k(window).detach("scroll",this.__onScroll)}});return e},{requires:["node",
"./base"]});KISSY.add("waterfall",function(g,l,p){l.Loader=p;return l},{requires:["waterfall/base","waterfall/loader"]});