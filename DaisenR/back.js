var rs;
chrome.runtime.onMessage.addListener(function(mes,sender){
	chrome.pageAction.show(sender.tab.id);
	startNetCheck(sender.tab.id);
})
var debugee;
function startNetCheck(id){
	debugee={tabId:id}
	var flg=false;
	chrome.debugger.getTargets(function(res){
		for(var k in res){
			if(res[k].url=="http://yahoo-mbga.jp/game/12006124/play"){
				if(res[k].attached){
					onAttach(id)
				}else{
					chrome.debugger.attach(debugee, "1.2", onAttach.bind(null, id));
				}
				break;
			}
		}
	})
/*	
	*/
}
function onAttach(tabId) {
	if (chrome.runtime.lastError) {
		alert(chrome.runtime.lastError.message);
		return;
	}
	chrome.debugger.sendCommand( debugee,"Network.enable", {},function(){
	})

}
var request={};
chrome.debugger.onEvent.addListener(function(src,method,params){
	switch(method){
	  case"Network.requestWillBeSent":
		var tg=params.request.url.split("/")
		if(tg[2]=="dsr-mbga10.gameserver.hangame.co.jp"){
			if(tg[3].split(".")[1]=="nhn"){
				request[params.requestId]={url:tg[3],post:params.request.postData};
			}
		}
		break;
	  case"Network.loadingFinished":
		if(request[params.requestId]){
			chrome.debugger.sendCommand( debugee,"Network.getResponseBody", {requestId:params.requestId},fcb.bind(null,request[params.requestId]))
		}
		break;
	}
})

function fcb(req,res){

	console.log(req.url)
	console.log(decodeURIComponent(req.post))
	rs=$($.parseXML(res.body));
	console.log(rs[0])
	delete req;
}
