chrome.runtime.sendMessage({"mes":"on"});
pageOn()
function pageOn(){
	$(".head-bg").css("display","none")
	$(".footer-bg").css("display","none")
	$(".content-bg").css("padding","0")
	$(".play-wide-head-lay").css("display","none")
	$("#game_main").css("text-align","left")
	$("#ymbga_app").css("margin","0")
	$("#game_play_side_tabs").css("display","none")
	$("#ymbga_app").attr("height","640")
	$("#ymbga_app").height("640px")
	$("#search_main").css("display","none")
	$("#secound-footer-sec").css("display","none");
}
