define(["app",
    "hbs!apps/directory/pie/tpl/pie",
    'entities/chart',
    "backbone.syphon"
], function (App, createTpl,Chart) {
        var View = Backbone.View.extend({
            tagName: "div",
            className: "m-directory",
            title: '编辑插件',
            template: createTpl,
            events: {
                'click button.btn-submit': 'submitClicked'
            },
            submitClicked: function (e) {
                e.preventDefault();
                var self = this;
                var formData = Backbone.Syphon.serialize(this);
                var chart = new Chart.ChartItem();
                var size = formData.size;
   
                var data = {};
                data.title = formData.title;
                data.dataUrl = formData.dataUrl;
                data.subtitle = formData.subtitle;
                chart.set('type','pie');
                data.interval = formData.interval;
                chart.set('data', JSON.stringify(data));
                $.when(chart.save()).done(function (chart) {
                    var serializeData = JSON.parse(App.boards.selected.get('data'));
                    serializeData.push({"col": 1, "row": 1, "size_x":size.split("_")[1], "size_y": size.split("_")[0], "chartid": chart.id})
                    App.boards.selected.set('data', JSON.stringify(serializeData));
                    App.boards.selected.save();
                    self.trigger("dialog:close");
                    App.router.navigate('board/' + App.boards.selected.id, {trigger: true});
                })
            },
            render: function () {
                this.$el.html(this.template());
                return this;
            }
        })


    return View;

})