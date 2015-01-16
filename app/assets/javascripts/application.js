require(['ba-debug','domReady','app'], function (console,domReady,App) {
	domReady(function(){
		Backbone.history.start();
	    var path = Backbone.history.fragment;
	    if (path === '') {
	        App.api.board();
	    }
	});
    
})
