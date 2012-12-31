/**
 * @author tianyun
 */
//页面加载时需要加载此JS文件
dojo.require("dojo.fx");
dojo.require("dojo.fx.easing");
dojo.require("dojo.cookie");
dojo.addOnLoad(function() {
	/**
	 * 处理导航条的点击下拉列表事件
	 */
	
	dojo.query(".dropdown-toggle").connect("onclick", function(evt) {
		dojo.stopEvent(evt);
		var obja = evt.target;
		var target = obja.parentNode;
		if(dojo.hasClass(target, "open")) {
			target.className = "dropdown";
		} else {
			target.className = "dropdown open";
		}
	});
	dojo.connect(window.document, "onclick", function(evt) {
		var targetList = dojo.query(".dropdown").removeClass("open");
		var a = 2;
	});
	/**
	 * 导航事件结束
	 */
	/**
	 * 退出用户事件
	 */
	dojo.query(".megaCard").connect("onclick", function(evt) {
		var obja = evt.target;
		var megaMenu = dojo.byId("megaMenu");
		if(dojo.hasClass(obja, "active")) {

			dojo.fx.wipeOut({
				node : megaMenu,
				duration : 300
			}).play();
			dojo.removeClass(obja, "active");

		} else {
			dojo.fx.wipeIn({
				node : megaMenu,
				duration : 500
			}).play();
			dojo.addClass(obja, "active");
		}

	});
		/**
	 * 退出用户事件结束
	 */
	
	/**
	 * 九宫格切换
	 */
	dojo.query(".sub_ico",dojo.byId("myviewtable")).connect("onclick",fnChangeState);
		/**
	 * 九宫格切换结束
	 */
	
	
dojo.query(".mailList").connect("onclick",function(evt){
	
	var target = evt.target;
	
	while(target&&target.nodeName!=="LI"){
		target =target.parentElement;
	}
	dojo.query(".mailList li").removeClass("selected");

	dojo.addClass(target,"selected");
});
dojo.query(".slide-btn").connect("onclick",function(evt){
	    	     
	    
		if(dojo.hasClass(dojo.byId("myviewtable"), "shenpi")&&!dojo.hasClass(dojo.query(".slide-btn")[0], "expand")) {
			dojo.animateProperty({
				node : "myviewtable",
				properties : {
					width : {
						end : 80,
						start : dojo.marginBox("myviewtable").w
					},
					duration : 600 // beware of stray comma's
				},

				onEnd : function() {

					dojo.addClass(dojo.byId("myviewtable"), "fold");
			        dojo.byId("myviewtable").style.width="";
				}
			}).play();
			dojo.animateProperty({
				node : "frmContent",
				properties : {
					left : {
						end : 80,
						start : dojo.marginBox("myviewtable").w
					},
					duration : 600 // beware of stray comma's
				},

				onEnd : function() {

					dojo.addClass(dojo.query(".slide-btn")[0],"expand");
			    
				}
			}).play();
		}else{
			dojo.animateProperty({
				node : "myviewtable",
				properties : {
					width : {
						end : 220,
						start : 80
					},
					duration : 600 // beware of stray comma's
				},

				onEnd : function() {

					dojo.removeClass(dojo.byId("myviewtable"), "fold");
			        dojo.byId("myviewtable").style.width="";
				}
			}).play();
			dojo.animateProperty({
				node : "frmContent",
				properties : {
					left : {
						end : dojo.marginBox("inner-main").w/5,
						start : dojo.marginBox("frmContent").l
					},
					duration : 600 // beware of stray comma's
				},

				onEnd : function() {

					dojo.removeClass(dojo.query(".slide-btn")[0],"expand");
			        dojo.byId("frmContent").style.left="";
				}
			}).play();
		}
});
dojo.query(".mailList li",dojo.byId("myviewtable")).connect("onclick",function(evt){
	evt.preventDefault();
	var parentNode = evt.target;
	
	while(parentNode.localName!=="li"){
		parentNode = parentNode.parentElement;
	}
	var target = dojo.query(".post_title",parentNode)[0];
	var url = target.href;
    var node =dojo.byId("myviewtable");
    if(dojo.hasClass(node,"shenpi")){
    	if(dojo.byId("iframe")){
    		dojo.byId("iframe").src=url;
    	}else{
    	dojo.byId("frmContent").innerHTML='<iframe id="iframe" src="" style="width:100%;height:100%;border:none;"></iframe>';
    	    	 dojo.byId("iframe").src=url;
    	}
	     
    }else{
    	if(dojo.hasClass(node,"zoom")){
    		showShenpi(url);
    	}else{
    		fnChangeState(evt);
    		showShenpi(url)
    	}
	
    }
});

dojo.query("#main-nav>li").connect("onclick", function(evt){
	   dojo.stopEvent(evt);
      
       var obja = evt.target;
       var ulNode = dojo.byId("main-nav");
       /*
       var target = dojo.byId("page_title"); 
       target.innerHTML = obja.innerHTML;
       */
       var target = (dojo.query("#main-nav>li.active"))[0];
       
       if(target.nodeName=="A"){
    	   var startTop = (dojo.query("#main-nav .active"))[0].parentElement.offsetTop+15;

       }else{
    	   var startTop = (dojo.query("#main-nav .active"))[0].offsetTop+15;
       }
      
       
       var endTop = evt.target.parentElement.offsetTop+15;
       
       var scrollDIV = dojo.byId("scrollDIV");
       dojo.animateProperty({
						node: scrollDIV,
						properties: {
							top: { start: startTop, end: endTop },
							opacity: { start: 1, end: 1 }
						},
						duration:800
					}).play();
       
     
      dojo.forEach(ulNode.childNodes,function(item){
         dojo.removeClass(item,"active");
      });
      if(obja.parentElement.nodeName=="A"){
      dojo.addClass(obja.parentElement.parentElement,"active");
      }else{
    	  dojo.addClass(obja.parentElement,"active");
      }
    
      
});

dojo.query(".box h4").connect("onclick", function(evt){
	dojo.stopEvent(evt);
	 var item = evt.target;

	var obja=item.firstElementChild.firstElementChild;
		
	  var target = item.nextElementSibling;

	  if(dojo.hasClass(obja,"icon-minus")){
		    dojo.fx.wipeOut({ node: target,duration: 300}).play();
		    dojo.removeClass(obja,"icon-minus");
		    dojo.addClass(obja,"icon-plus");
		  }else{
	        dojo.fx.wipeIn({ node: target,duration: 300 }).play();
	        dojo.removeClass(obja,"icon-plus");
		    dojo.addClass(obja,"icon-minus");
		  }

		 });



})