chrome.runtime.onMessage.addListener(function(mes,sender){
	chrome.pageAction.show(sender.tab.id);
})

