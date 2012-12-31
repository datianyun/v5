/**
 * @author tianyun
 */

function showPanel(thisEvent) {
	//备用，切换栏多时可用
	dojo.stopEvent(thisEvent);
	if(thisEvent) {
		var a = thisEvent.target;
	}
	//处理兼容操作栏滚动问题  多余的操作 待以后处理
	var node = dojo.byId("operate_first");

	var list = dojo.query(".accordion-heading", node);
	if(dojo.hasClass(list[0], "accordion-heading-fixed")) {
		dojo.removeClass(list[0], "accordion-heading-fixed");
	}

	//切换
	var target = dojo.query(".first");
	if(target[0].previousElementSibling) {
		target[0].previousElementSibling.style.opacity = "1";
	};
	if(dojo.hasClass(target[0], "back")) {
		dojo.removeClass(target[0], "back");

	}
	dojo.addClass(target[0], "go");
}

function hidePanel(thisEvent) {
    dojo.stopEvent(thisEvent);
	
    var node = dojo.byId("operate_first");
 
	var list = dojo.query(".accordion-heading", node);
	
	var target = dojo.query(".first");
	dojo.removeClass(target[0], "go");
	dojo.addClass(target[0], "back");
	while(target[0].previousElementSibling) {
		target[0].previousElementSibling.style.opacity = "0";
		target[0] = target[0].previousElementSibling;
	}
    setTimeout(function(){

	//纠正css3动画时的bug 无实际意义
	if(!dojo.hasClass(list[0], "accordion-heading-fixed")) {
		dojo.addClass(list[0], "accordion-heading-fixed");
	}
    },2050);


}

function showNextTask() {

	if(window.parent) {
		var win = window.parent;
		win.refreshID();
	}

}

function rejectShowTask() {

	if(window.parent) {
		var win = window.parent;
		win.rejectTask();
	}

}
function anim_list() {
	if(window.parent) {
		var win = window.parent;
		win.list_dispear_Anim();
	}
}
