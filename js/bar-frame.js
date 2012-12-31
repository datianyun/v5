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
		var content = dojo.byId("content");
		var widget = dojo.byId("widget");
		var business = dojo.byId("business-content");
		var ifr = dojo.byId("ifr-graph");

		if(dojo.hasClass(obja, "business")) {
			if(dojo.hasClass(obja, "youarehere")) {
				return null;
			} else {
				//返回操作业务区域
				ifr.src = "";
				ifr.style.display = "none";
				business.style.display = "block";
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
		} else {
			if(dojo.hasClass(obja, "youarehere")) {
				return null;
			} else {
				//返回操作业务区域
				ifr.src = "http://www.baidu.com";
				ifr.style.display = "block";
				business.style.display = "none";
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
		if(dojo.hasClass(obja, "fold")) {
			dojo.removeClass(obja, "fold");
		} else {
			dojo.addClass(obja, "fold");
		}

	});
	dojo.connect(dojo.byId("comments_input"), "onclick", showPanel);
	dojo.connect(dojo.byId("operate_back"), "onclick", hidePanel);
	dojo.connect(dojo.byId("submit"), "onclick", anim_list);
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
			if(min < length + 37 && length < max) {
				dojo.addClass(dojo.query(".sub-title ."+id)[0], "active");

			} else {
				return;
			}
		});
	});
	//操作区域滚动

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
	dojo.query(".branch .radio").connect("onclick", function(evt) {

		var obja = evt.target;
		if(obja.parentNode.localName === "li") {
			var li = obja.parentNode;
			var ul = li.parentNode;
			dojo.forEach(dojo.query("li", ul), function(item) {
				if(dojo.hasClass(item, "selected")) {
					dojo.removeClass(item, "selected");
				}
				if(dojo.query(".to",item)[0]) {
					dojo.query(".to",item)[0].style.opacity = 0;
				}
				if(dojo.query(".process",item)[0]) {
					dojo.query(".process",item)[0].style.opacity = 0;
				}

			});
			if(dojo.query(".process",li)[0] && dojo.query(".to",li)[0]) {
				dojo.animateProperty({
					node : dojo.query(".process",li)[0],
					delay : 300,
					duration : 300,
					properties : {
						opacity : {
							start : 0,
							end : 1
						}
					},
					onBegin : function() {
						dojo.animateProperty({
							node : dojo.query(".to",li)[0],
							properties : {
								opacity : {
									start : 0,
									end : 1
								}
							},
							duration : 300
						}).play();
					},
					onEnd : function() {

						dojo.addClass(li, "selected");
						evt.stopPropagation();
					}
				}).play();
			} else {
				dojo.addClass(li, "selected");
				evt.stopPropagation();
			}

		}

	});
})