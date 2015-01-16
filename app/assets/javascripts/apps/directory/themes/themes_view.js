define(["app",
    "hbs!apps/directory/themes/tpl/themes",
    'apps/common/theme_switcher',
    "backbone.syphon"

], function (App, selectTpl, themeSwitcher) {
        var ThemesView = Backbone.View.extend({
            tagName: "div",
            className: "m-directory",
            title:'选择主题',
            template: selectTpl,
            events:{
                'click li':'themeSelect',
                'click button':'switch'
            },
            render: function () {
                console.log('themes view render');
                this.$el.html(this.template());
                return this;
            },
            themeSelect:function(e){
                this.$el.find('li a.active').removeClass('active');
                var $target =$(e.target).parent().parent();
                $(e.target).parent().addClass('active');
                var style = $target.attr('chartstyle');
                this.theme=style;

            },
            switch:function(){
                themeSwitcher(this.theme);
                App.boards.selected.save({'style':this.theme});
                this.trigger("dialog:close");

            }
        })


    return ThemesView;
})
