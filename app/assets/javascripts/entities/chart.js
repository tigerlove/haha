define(["backbone"], function (Backbone) {
    var Chart = {};
    Chart.ChartItem = Backbone.Model.extend({
        urlRoot: "chart"
    });

    Chart.ChartCollection = Backbone.Collection.extend({
        url: "chart",
        model: Chart.ChartItem
    });

    Chart.API = {
        getCharts: function () {
            var charts = new Chart.ChartCollection();
            var defer = $.Deferred();
            charts.fetch({
                success: function (data) {
                    defer.resolve(data);
                }
            });
            var promise = defer.promise();
            return promise;
        },

        getChart: function (chartId) {
            var charts = new Chart.ChartItem({id: chartId});
            var defer = $.Deferred();
            return defer.promise();
        },
        deleteChart: function (chartId) {
            var chart = new Chart.ChartItem({id: chartId});
            chart.destroy();
        }
    };
    return Chart;
});