define(['apps/common/loadJson',
    'hbs!chartoption/pie',
    'hbs!chartoption/area',
    'hbs!chartoption/line',
    'hbs!chartoption/column',
    'hbs!chartoption/bar',
    'hbs!chartoption/num',
    'highchart',
    'highchart/exporting'
], function(
    loadJson,
    pieTpl,
    areaTpl,
    lineTpl,
    columnTpl,
    barTpl,
    numTpl
) {
    var Chef = {};
    Chef.intervals = [];
    var simple = function($container, model, option) {
        var chartData = JSON.parse(model.get('data'));
        var draw = function() {
            $.ajax({
                url: chartData.dataUrl,
                dataType: 'jsonp'
            }).done(
                function(data) {
                    var result = loadJson(data);
                    var seriesData = result.seriesData;
                    var cate = result.cate;
                    var pieJson = result.pieJson;
                    var numSeriesData = result.numSeriesData;
                    if (chartData.limit != '') {
                        var limit = parseInt(chartData.limit);
                        if (cate.length > limit) {
                            cate = cate.splice(0, limit);
                            for (var i in seriesData) {
                                seriesData[i].data = seriesData[i].data.splice(0, limit);
                            }
                            for (var i in numSeriesData) {
                                numSeriesData[i].data = numSeriesData[i].data.splice(0, limit);
                            }
                        }
                    }
                    eval("var op = " + option);
                    $container.highcharts(op);
                })
        }

        if ('interval' in chartData) {
            var interval = parseInt(chartData['interval']);
            draw();
            var intervalId = setInterval(draw, interval);
            Chef.intervals.push(intervalId);
        } else {
            draw();
        }

    }

    var num = function($container, model, tpl) {
        var chartData = JSON.parse(model.get('data'));
        var draw = function() {
            $.ajax({
                url: chartData.dataUrl,
                dataType: 'jsonp'
            }).done(
                function(data) {
                    
                    $container.empty();
                    $container.append(tpl);
                    $container.find('.hd').text(chartData.title);
                    $container.find('.num').text(data.value);
                })
        }
        if ('interval' in chartData) {
            var interval = parseInt(chartData['interval']);
            draw();
            var intervalId = setInterval(draw, interval);
            Chef.intervals.push(intervalId);
        } else {
            draw();
        }
    }
    Chef['pie'] = function(container, model) {
        simple(container, model, pieTpl());
    };

    Chef['line'] = function(container, model) {
        simple(container, model, lineTpl());
    };

    Chef['area'] = function(container, model) {
        simple(container, model, areaTpl());
    };

    Chef['column'] = function(container, model) {
        simple(container, model, columnTpl());
    };

    Chef['bar'] = function(container, model) {
        simple(container, model, barTpl());
    };
    Chef['num'] = function(container, model) {
        num(container, model, numTpl());
    };
    return Chef;
})
