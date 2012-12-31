/**
 * @author tianyun
 */
/*
 *
 *
 * */

function fnChangeState(evt) {
	/*
	 * \u5904\u7406\u5404\u72B6\u6001\u95F4\u53D8\u5316\u7684\u52A8\u753B
	 */
	var minBoxHeight = 120;
	// \u6700\u5C0F\u89C6\u56FE\u7684\u9AD8\u5EA6
	var margin = 10;
	var dur = 800;
	// \u52A8\u753B\u6301\u7EED\u65F6\u95F4
	// \u627E\u5230\u6240\u70B9\u51FB\u7684\u533A\u5757
	var box = evt.target;
	while(box && box.className !== "widget")
	box = box.parentNode;
	if(!box)
		return;
	var con = box.parentNode;
	// \u6574\u4E2A\u5BB9\u5668
	var box1 = tar = dojo.byId("box1");
	// \u6700\u5927\u5316\u7684\u533A\u5757
	if(dojo.hasClass(con, "zoom")) {
		if(dojo.hasClass(dojo.byId("myviewtable"), "shenpi") && box.id === "box1") {
			dojo.animateProperty({
				node : "myviewtable",
				properties : {
					width : {
						end : dojo.marginBox("inner-main").w,
						start : dojo.marginBox("myviewtable").w
					},
					duration : 600 // beware of stray comma's
				},
				onBegin : function() {

					var anim = dojo.fadeOut({
						node : 'frmContent',
						duration : 600,

						easing : dojo.fx.easing.bounceIn,
						onEnd : function() {
							dojo.byId("iframe").src = "";

							dojo.byId("frmContent").style.display = "none";
						}
					}).play();

				},
				onEnd : function() {

					dojo.removeClass(dojo.byId("myviewtable"), "shenpi");
					dojo.byId("myviewtable").style.width = "";
				}
			}).play();
		}
		// \u5982\u679C\u5DF2\u7ECF\u662F\u6700\u5927\u5316\u72B6\u6001
		if(box.id === "box1") {
			// \u70B9\u51FB\u6700\u5927\u7684\u533A\u5757\u5219\u6062\u590D\u4E00\u822C\u72B6\u6001
			var boxAnims = [];
			// \u5404\u5757\u7684\u52A8\u753B
			dojo.forEach(["box1", "box2", "box3", "box4"], function(item, index) {
				var box = dojo.byId(item);
				// \u6839\u636E\u539F\u59CB\u7684id\u56DE\u5230\u539F\u6765\u7684\u4F4D\u7F6E
				oid = parseInt(dojo.attr(box, "oid"));
				boxAnims.push(dojo.animateProperty({
					node : box,
					duration : dur,
					properties : {
						left : {
							start : dojo.marginBox(box).l,
							end : oid % 2 ? 0 : dojo.contentBox(con).w / 2
						},
						top : {
							start : index ? dojo.marginBox(con).h - dojo.marginBox(box).h : 0,
							end : oid > 2 ? dojo.contentBox(con).h / 2 : 0
						},
						height : {
							start : dojo.contentBox(box).h,
							end : dojo.contentBox(con).h / 2 - margin
						},
						width : {
							start : dojo.contentBox(box).w,
							end : dojo.contentBox(con).w / 2 - margin
						}
					},
					onEnd : function() {
						box.style.cssText = "";
					}
				}));
			});
			var anim = dojo.fx.combine(boxAnims);
			dojo.connect(anim, "onEnd", function(n1, n2) {
				// \u8FD8\u539F\u5404\u5757\u7684\u539F\u59CBID
				dojo.forEach(dojo.query("#box1,#box2,#box3,#box4"), function(item, index) {
					var box = dojo.byId(item);
					box.id = "box" + dojo.attr(box, "oid");
				});
				saveState();
			});
			// \u53D6\u6D88\u6700\u5927\u5316\u72B6\u6001
			dojo.removeClass(con, "zoom");
			anim.play();
		} else {
			// \u6700\u5927\u5316\u72B6\u6001\u70B9\u51FB\u5C0F\u7684\u533A\u5757\uFF0C\u4EA4\u6362\u6700\u5927\u533A\u5757\u4E0E\u5F53\u524D\u70B9\u51FB\u533A\u5757
			// \u5F53\u524D\u5757\u52A8\u753B
			var a1 = dojo.animateProperty({
				node : box,
				duration : dur,
				properties : {
					left : {
						start : dojo.marginBox(box).l,
						end : dojo.marginBox(tar).l
					},
					top : {
						start : dojo.marginBox(con).h - dojo.marginBox(box).h,
						end : dojo.marginBox(tar).t
					},
					height : {
						start : dojo.contentBox(box).h,
						end : dojo.contentBox(tar).h
					},
					width : {
						start : dojo.contentBox(box).w,
						end : dojo.contentBox(tar).w
					}
				}
			});
			// \u6700\u5927\u5757\u52A8\u753B
			var a2 = dojo.animateProperty({
				node : tar,
				duration : dur,
				properties : {
					left : {
						start : dojo.marginBox(tar).l,
						end : dojo.marginBox(box).l
					},
					top : {
						start : dojo.marginBox(tar).t,
						end : dojo.marginBox(con).h - dojo.marginBox(box).h
					},
					height : {
						start : dojo.contentBox(tar).h,
						end : dojo.contentBox(box).h
					},
					width : {
						start : dojo.contentBox(tar).w,
						end : dojo.contentBox(box).w
					}
				}
			});
			var anim = dojo.fx.combine([a1, a2]);
			dojo.connect(anim, "onEnd", function(n1, n2) {

				tar.style.cssText = "";
				box.style.cssText = "";
				saveState();
			});
			// \u4EA4\u6362ID
			tar.id = box.id;
			box.id = "box1";
			anim.play();
		}
	} else {
		// \u975E\u6700\u5927\u5316\u72B6\u6001\uFF0C\u5C06\u5F53\u524D\u533A\u5757\u6700\u5927\u5316\uFF0C\u5176\u4ED6\u533A\u5757\u53D8\u5C0F
		var boxAnims = [];
		// \u5F53\u524D\u5757\u52A8\u753B
		boxAnims.push(dojo.animateProperty({
			node : box,
			duration : dur,
			properties : {
				left : {
					start : dojo.marginBox(box).l,
					end : 0
				},
				top : {
					start : dojo.marginBox(box).t,
					end : 0
				},
				height : {
					start : dojo.contentBox(box).h,
					end : dojo.contentBox(con).h - minBoxHeight - 2 * margin
				},
				width : {
					start : dojo.contentBox(box).w,
					end : dojo.contentBox(con).w - margin
				}
			},
			onEnd : function() {

				box.style.cssText = "";
			}
		}));
		// \u53D6\u5F97\u9664\u4E86\u5F53\u524D\u5757\u4E4B\u5916\u76843\u5757
		var boxs = ["box1", "box2", "box3", "box4"];
		boxs = dojo.filter(boxs, function(x) {
			return x !== box.id;
		});
		// \u53E6\u59163\u5757\u7684\u52A8\u753B
		dojo.forEach(boxs, function(item, index) {
			var box = dojo.byId(item);
			boxAnims.push(dojo.animateProperty({
				node : box,
				duration : dur,
				properties : {
					left : {
						start : dojo.marginBox(box).l,
						end : dojo.contentBox(con).w * index / 3
					},
					top : {
						start : dojo.marginBox(box).t,
						end : dojo.marginBox(con).h - minBoxHeight - margin
					},
					height : {
						start : dojo.contentBox(box).h,
						end : minBoxHeight
					},
					width : {
						start : dojo.contentBox(box).w,
						end : dojo.contentBox(con).w / 3 - margin
					}
				},
				onEnd : function() {

					box.style.cssText = "";
					box.id = "box" + (index + 2);
				}
			}));
		});
		var anim = dojo.fx.combine(boxAnims);
		dojo.connect(anim, "onEnd", saveState);
		// \u4EA4\u6362ID
		box1.id = box.id;
		box.id = "box1";
		dojo.addClass(con, "zoom");
		anim.play();
	}
}

function restoreState() {
	var cookieName = "p_s";
	var ps = dojo.cookie(cookieName)
	if(!ps)
		return;
	dojo.query("#myviewtable").addClass("zoom");
	dojo.query(".widget", "myviewtable").forEach(function(o) {
		o.id = "box" + ps[dojo.attr(o, "oid") - 1];
	});
}

function saveState() {
	// \u4FDD\u5B58\u5404\u4E2A\u533A\u5757\u7684\u4F4D\u7F6E\u5230cookie\u4E2D
	var cookieName = "p_s";
	if(!dojo.hasClass("myviewtable", "zoom")) {
		dojo.cookie(cookieName, "");
		return;
	}
	var aID = [0, 0, 0, 0];
	dojo.query(".widget", dojo.byId("myviewtable")).forEach(function(o) {
		aID[dojo.attr(o, "oid") - 1] = o.id.substr(3);
	});
	dojo.cookie(cookieName, aID.join(""));
}

function showShenpi(url) {
	dojo.animateProperty({
		node : "myviewtable",
		properties : {
			width : {
				end : 220,
				start : dojo.marginBox("myviewtable").w
			},
			duration : 800 // beware of stray comma's
		},
		onBegin : function() {

			dojo.byId("frmContent").style.display = "block";
			dojo.byId("frmContent").style.opacity = "1";
			dojo.byId("iframe").src = url;
		},
		onEnd : function() {
			dojo.addClass(dojo.byId("myviewtable"), "shenpi");
			dojo.byId("myviewtable").style.width = "";
		}
	}).play();
}

function prOnStart() {

}

function prOnComplete() {

	var list = dojo.query("#box1 .mailList li");
	if(list.length !== 0) {
		var label = dojo.query(".ii label")[0];
		if(label) {
			dojo.animateProperty({
				node : label,
				properties : {
					top : {
						start : -50,
						end : 0
					},
					opacity : {
						start : 0,
						end : 1
					}
				},
				duration : 800
			}).play();
		}
		dojo.query(" a", dojo.byId("myviewtable")).connect("onclick", function(evt) {
			evt.preventDefault();

			var url = evt.target.href;
			var node = dojo.byId("myviewtable");
			if(dojo.hasClass(node, "shenpi")) {
				if(dojo.byId("iframe")) {
					dojo.byId("iframe").src = url;
				} else {
					dojo.byId("frmContent").innerHTML = '<iframe id="iframe" src="" style="width:100%;height:100%;border:none;"></iframe>';
					dojo.byId("iframe").src = url;
				}

			} else {
				if(dojo.hasClass(node, "zoom")) {
					showShenpi(url);
				} else {
					fnChangeState(evt);
					showShenpi(url)
				}

			}
		});
	}
}

function refreshID() {
	var target = dojo.query("#box1 .mailList li.selected")[0] ? dojo.query("#box1 .mailList li.selected")[0] : dojo.query("#box1 #mailList li.newselected")[0];
	var list = dojo.query("#box1 .mailList li");
	var frameContent = dojo.byId("frameContent");
	var iframe = dojo.byId("iframe");
	var link = dojo.query("a", list[0]);
	var href = link[0].href;
	dojo.addClass(target, "fold");

	setTimeout(function() {
		dojo.destroy(target);
		var extraA = dojo.query("#box1 .mailList li a")[0];
		if(extraA) {
			extraA.click();
		} else {
			iframe.src = "";
		}

		//dojo.destroy(iframe);
		dojo.query('.refreshTask')[0].click();
	}, 800);
}

function rejectTask() {
	dojo.query(".rejectTask")[0].click();
}

function rejectComplete() {
	var taskList = dojo.query("[oid='1']")[0];
	var icon = dojo.query(".sub_ico",taskList)[0];
	icon.click();

	dojo.query(" a", dojo.byId("myviewtable")).connect("onclick", function(evt) {
		evt.preventDefault();

		var url = evt.target.href;
		var node = dojo.byId("myviewtable");
		if(dojo.hasClass(node, "shenpi")) {
			if(dojo.byId("iframe")) {
				dojo.byId("iframe").src = url;
			} else {
				dojo.byId("frmContent").innerHTML = '<iframe id="iframe" src="" style="width:100%;height:100%;border:none;"></iframe>';
				dojo.byId("iframe").src = url;
			}

		} else {
			if(dojo.hasClass(node, "zoom")) {
				showShenpi(url);
			} else {
				fnChangeState(evt);
				showShenpi(url)
			}

		}
	});
	dojo.query("#box1 .mailList li a")[0].click();
}

function list_dispear_Anim() {
	dojo.stopEvent(e);
	var target = dojo.query("#box1 .mailList .selected")[0];

	var box = dojo.marginBox(target);
	var iframe = dojo.byId("iframe");
	dojo.animateProperty({
		node : target,
		properties : {
			left : {
				end : dojo.marginBox(target).w,
				start : 0
			},
			opacity:{
				start:1,
				end:0
			}

		},
		duration : 800,
		onEnd : function() {
			dojo.animateProperty({
				node : target,
				properties : {
					padding : {
						end : 0,
						start : 10
					},
					height : {
						end : 0,
						start : box.h
					}
				},
				delay : 300,
				duration : 800,
				onEnd : function() {
					dojo.destroy(target);
					var extraA = dojo.query("#box1 .mailList a")[0];
					if(extraA) {
						extraA.click();
					} else {
						iframe.src = "";
					}
				}
			}).play();
		}
	}).play();

}