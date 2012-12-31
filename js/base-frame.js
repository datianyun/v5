/**
 * @author tianyun
 */
dojo.require("dojo.fx");

dojo.addOnLoad(function() {

	//常量保存
	//var FOCUSLENGTH = dojo.byId("contract-nav").offsetTop;

    var FOCUSLENGTH = dojo.byId("tabs").offsetTop;
    
    //tab切换
	dojo.query("#tabs a").connect("onclick", function(evt) {

		dojo.stopEvent(evt);
		var obja = evt.target;
        var content= dojo.byId("content");
        var widget = dojo.byId("widget");
        var business = dojo.byId("business-content");
        var ifr = dojo.byId("ifr-graph");
		
		if(dojo.hasClass(obja,"business")){
			if(dojo.hasClass(obja,"youarehere")){
				return null;
			}else{
				//返回操作业务区域
			ifr.src = "";
			ifr.style.display="none";
			business.style.display="block";
			dojo.animateProperty({
				node : widget,
				properties : {
					right : {
						end : 0,
						start : -dojo.marginBox(widget).w
					}
				},
				duration : 800
			}).play();
			dojo.animateProperty({
				node : content,
				properties : {
					right : {
						end : dojo.marginBox(widget).w,
						start : 0
					}
				},
				duration : 800
			}).play();
			
			}
		}else{
			if(dojo.hasClass(obja,"youarehere")){
				return null;
			}else{
				//返回操作业务区域
			ifr.src = "http://www.baidu.com";
			ifr.style.display="block";
			business.style.display="none";
			dojo.animateProperty({
				node : widget,
				properties : {
					right : {
						end : -dojo.marginBox(widget).w,
						start : 0
					}
				},
				duration : 800
			}).play();
			dojo.animateProperty({
				node : content,
				properties : {
					right : {
						end : 0,
						start : dojo.marginBox(widget).w
					}
				},
				duration : 800
			}).play();
			}
		}
		dojo.forEach(dojo.query("#tabs a"), function(item) {
			dojo.removeClass(item, "youarehere");
		});
		dojo.addClass(obja, "youarehere");		
	});
	//提示区域关闭
	dojo.query(".tip .close").connect("onclick", function(evt) {

		dojo.stopEvent(evt);
		var obja = evt.target;
        dojo.fx.wipeOut({
				node : dojo.query(".tip-info")[0],
				duration : 300
			}).play();
	});
	//导航条
    dojo.query(".fly-nav .close a").connect("onclick", function(evt) {
		dojo.stopEvent(evt);
		var obja = evt.target.parentNode.parentNode;
		if(dojo.hasClass(obja,"fold")){
			dojo.removeClass(obja,"fold");
		}else{
			dojo.addClass(obja,"fold");
		}

	});
	if(dojo.byId("comments_input")){
		dojo.connect(dojo.byId("comments_input"), "onclick", showPanel);
	}
	if(dojo.byId("operate_back")){
		dojo.connect(dojo.byId("operate_back"), "onclick", hidePanel);
	}
	
	dojo.connect(window.document, "scroll", function(evt) {
		var node1 = window.document.body;
		var node2 = dojo.byId("contract-nav");
		var length = node1.scrollTop;
        var flybar = dojo.query(".fly-nav")[0];
		if(length < FOCUSLENGTH) {
			if(!dojo.hasClass(flybar, "fold")) {

				dojo.addClass(flybar, "fold");

			}
			return;
		} else {
			dojo.removeClass(flybar, "fold");
		}
	     
		dojo.forEach(dojo.query(".sub-title  a"), function(item) {
			dojo.removeClass(item, "active");
		});

		dojo.forEach(dojo.query("#content section"), function(item) {
			var max = item.offsetTop + item.clientHeight;
			var min = item.offsetTop;
			var id = item.id;
			if(min < length+37&& length < max) {
				dojo.addClass(dojo.query(".sub-title ."+id)[0], "active");

			} else {
				return;
			}
		});
	});
     //操作区域滚动
	dojo.connect(dojo.byId("widget"), (!dojo.isMozilla ? "onmousewheel" : "DOMMouseScroll"), function(e) {

		dojo.stopEvent(e);
		var node = dojo.byId("operate_first");
		var scroll = e[(!dojo.isMozilla ? "wheelDelta" : "detail")] * (!dojo.isMozilla ? 1 : -1);
		var list = dojo.query(".accordion-heading", node);
		var length = list.length;
		var OFFSET_TOP = list[length - 1].offsetTop;
		var clientTop = 0;
		var width = dojo.marginBox(node).w;
		var marginTop;

		if(scroll > 0) {
			//没到最后一栏
			for(var i = 0, l = list.length; i < l ; i++) {
				if(list[i - 1]) {
					clientTop = clientTop + dojo.marginBox(list[i - 1]).h + 5;
					OFFSET_TOP = OFFSET_TOP + dojo.marginBox(list[i - 1]).h + 5;
				}

				if(list[i].offsetTop - 80 + node.offsetTop <= clientTop && !dojo.hasClass(list[i], "accordion-heading-fixed")) {
					list[i].style.width = width + "px";
					list[i].style.top = clientTop + "px";
					dojo.addClass(list[i], "accordion-heading-fixed");

					break;
				}

			}
			//最后一栏

			var childNodes = node.children;
			var num = childNodes.length;
			var height = 0;
			for(var i = 0; i < num - 1; i++) {
				height += dojo.marginBox(childNodes[i]).h;
			}
			if(node.offsetTop == (-height + 28 * (length - 1) + 5)) {
				return;
			}
			var end = node.offsetTop - 80 > (-OFFSET_TOP) ? node.offsetTop - 80 : (-height + 28 * (length - 1));
			dojo.animateProperty({
				node : node,
				properties : {
					marginTop : {
						start : node.offsetTop,
						end : end +5
					}
				},
				duration : 300
			}).play();

		}

		if(scroll < 0) {

			var a = list.length;
			for(a; a > 1 && node.offsetTop < 0; a--) {

				var _tar = dojo.query((".accordion-body"), list[a - 1].parentElement);
				var b = list[a - 1].offsetTop;
				var c = _tar.offsetTop;
				if(dojo.hasClass(list[a - 1], "accordion-heading-fixed")) {
					if(_tar[0].offsetTop + 100 > list[a - 1].offsetTop + dojo.marginBox(list[a - 1]).h + node.offsetTop) {
						dojo.removeClass(list[a - 1], "accordion-heading-fixed");
						break;
					}
				}
			}
			if(node.offsetTop < 0) {
				var end = node.offsetTop + 100 < 0 ? node.offsetTop + 100 : 0;
				dojo.animateProperty({
					node : node,
					properties : {
						marginTop : {
							start : node.offsetTop,
							end : end
						}
					},
					duration : 300
				}).play();
			}
		}

	});
	dojo.query(".accordion-toggle", dojo.byId("operate_first")).connect("onclick", function(e) {

		var target = e.target.parentElement.parentElement;
		var height = 0;
		var count = 0;
		while(target.previousElementSibling) {
			height += dojo.marginBox(target.previousElementSibling).h;
			target = target.previousElementSibling;
			count++;
		}
		var start = dojo.byId("operate_first").offsetTop;
		// var end =(start+height-e.target.parentElement.offsetHeight+39)<0?start+height-e.target.parentElement.offsetHeight+39:0;
		var end = -height + 33 * (count );
		;
		if(dojo.hasClass(e.target.parentElement, "accordion-heading-fixed")) {
			dojo.removeClass(e.target.parentElement, "accordion-heading-fixed");
			target = e.target.parentElement.parentElement;
			while(target) {
				if(dojo.hasClass(target.children[0], "accordion-heading-fixed")) {
					dojo.removeClass(target.children[0], "accordion-heading-fixed");
				}
				if(target.nextElementSibling) {
					target = target.nextElementSibling;
				} else {
					break;
				}

			}
			dojo.animateProperty({
				node : dojo.byId("operate_first"),
				properties : {
					marginTop : {
						start : start,
						end : end
					}
				},
				duration : 300
			}).play();

		}

	});
})