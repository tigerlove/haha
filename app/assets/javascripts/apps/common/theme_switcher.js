define(['app',
	'apps/common/themes'],function(App,themes){
	return function(style){
		var style = style || 'black'
		$("body").attr('class', style);

		//highchart theme
		themes[style]();
	}
})