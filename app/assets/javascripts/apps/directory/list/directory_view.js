define(["backbone",
    "hbs!apps/directory/list/tpl/directory_list",
    'slick'
], function (Backbone, driectoryTpl) {

        var WidgetListView = Backbone.View.extend({
            tagName: "div",
            className: "m-directory",
            title:'添加一个插件',
            template: driectoryTpl,
            render: function () {
                console.log('widgets list view render');
                this.$el.html(this.template());
                this.slick=this.$el.find('.slider').slick({
                    slidesToShow: 3,
                    width:'900px',
                    slidesToScroll: 3,
                    infinite: false,
                    variableWidth: true,
                    dots: false
                });
                return this;
            }
        })


    return WidgetListView;
});