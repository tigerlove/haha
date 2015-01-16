define(['app'],function(App){
	return function(style){
		style = style || 'black'
		$("body").attr('class', style);
	}
})