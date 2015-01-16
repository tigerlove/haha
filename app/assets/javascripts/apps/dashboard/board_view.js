define(['app',
    'apps/common/chef',
    'hbs!apps/dashboard/tpl/board',
    'hbs!apps/dashboard/tpl/grid',
    'entities/chart',
    'entities/board',
    'gridster'
], function(App, Chef, boardTpl, gridTpl, Chart, Board) {
    var BoardView = Backbone.View.extend({
        template: boardTpl,
        events: {
            'click div.widget-head > div.js-del-chart': 'delChart'
        },
        delChart: function(e) {
            var li = $(e.target).parent().parent().parent().parent();

            this.gridster.remove_widget(li);
            var serializeData = this.gridster.serializeMore();
            this.model.set('data', JSON.stringify(serializeData));
            this.model.save();
            var chart = new Chart.ChartItem({
                id: li.attr('chartid')
            });
            chart.destroy();
            App.router.navigate('board/' + App.boards.selected.id, {
                trigger: true
            });
        },
        initialize: function() {

        },
        render: function() {
            console.log('board view render');
            var self = this;
            self.$el.html(this.template());
            if (this.model != null) {
                this.gridData = JSON.parse(this.model.get('data'));
            }

            self.gridster = this.$el.find('ul.dashboard_show_ul').gridster({
                widget_margins: [5, 5],
                min_cols: 1,
                max_cols: 25,
                widget_base_dimensions: [365, 220],
                autogrow_cols: true,
                draggable: {
                    stop: function(event, ui) {
                        self.model.set('data', JSON.stringify(self.gridster.serializeMore()));
                        self.model.save();
                    }
                },
                resize: {
                    enabled: true,
                    stop: function(e, ui, $widget) {}
                }

            }).data('gridster');
            var chartsMap = {};
            var gridMap = {};
            $.when(Chart.API.getCharts()).done(function(charts) {
                _.each(charts.models, function(m) {
                    chartsMap[m.id] = m;
                })
                $.each(self.gridData, function(i, widget) {
                    var tplData = {
                        'chartid': widget.chartid,
                        'gridid': new Date().getTime()
                    }
                    gridMap[tplData.gridid] = tplData.chartid;
                    self.gridster.add_widget.apply(self.gridster, [gridTpl(tplData), widget.size_x, widget.size_y, widget.col, widget.row]);

                });

                for (var id in Chef.intervals) {
                    console.log('clearInterval ' + id);
                    clearInterval(id);
                }

                $.each(gridMap, function(gridid, chartid) {
                    var $container = $("li[grid-id=" + gridid + " ]  div.widget-content");
                    if ((chartid in chartsMap) && (chartsMap[chartid].get('type') in Chef)) {
                        Chef[chartsMap[chartid].get('type')]($container, chartsMap[chartid]);
                    }
                });
            })

            return this;
        }

    })

    return BoardView;
})
