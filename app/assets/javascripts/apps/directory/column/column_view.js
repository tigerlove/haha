define(["app",
    "hbs!apps/directory/column/tpl/column",
    'entities/chart',
    "backbone.syphon"
], function (App, createTpl,Chart) {
        var View = Backbone.View.extend({
            tagName: "div",
            className: "m-directory",
            title: '编辑插件',
            template: createTpl,
            events: {
                'click button.btn-submit': 'submitClicked',
                'click a.js-tab1': 'tab1',
                'click a.js-tab2': 'tab2'
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
                data.xtitle = formData.xtitle;
                data.ytitle = formData.ytitle;
                data.limit = formData.limit;
                data.isDataLabels = formData.isDataLabels;
                data.labelsRotation = formData.labelsRotation;
                data.subtitle = formData.subtitle;
                chart.set('type','column');
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
            tab1: function () {
                console.log('tab1');
                this.$el.find("a.js-tab2").removeClass('active');
                this.$el.find("a.js-tab1").addClass('active');
                this.$el.find("div.js-tab1-div").show();
                this.$el.find("div.js-tab2-div").hide();
            },
            tab2: function () {
                console.log('tab2');
                this.$el.find("a.js-tab1").removeClass('active');
                this.$el.find("a.js-tab2").addClass('active');
                this.$el.find("div.js-tab1-div").hide();
                this.$el.find("div.js-tab2-div").show();

            },
            render: function () {
                this.$el.html(this.template());
                return this;
            }
        })


    return View;

})